import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_CHARS = 200_000;

function encodeGitHubPath(path: string) {
  return path
    .split("/")
    .map((p) => encodeURIComponent(p))
    .join("/");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { owner, repo, path, githubToken } = await req.json();

    if (!owner || !repo || !path) {
      return new Response(JSON.stringify({ error: "owner, repo and path are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "CodeOnboard-AI",
    };
    if (githubToken) headers.Authorization = `Bearer ${githubToken}`;

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGitHubPath(path)}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(
        JSON.stringify({ error: `GitHub API error: ${res.status}`, details: errText }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await res.json();

    // If it's a directory, GitHub returns an array.
    if (Array.isArray(data)) {
      return new Response(JSON.stringify({ error: "Path is a directory, not a file" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (data.encoding !== "base64" || !data.content) {
      return new Response(JSON.stringify({ error: "Unsupported file encoding" }), {
        status: 415,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const decoded = atob(String(data.content).replace(/\n/g, ""));
    const truncated = decoded.length > MAX_CHARS;

    return new Response(
      JSON.stringify({
        path,
        size: Number(data.size || decoded.length),
        truncated,
        content: truncated ? decoded.slice(0, MAX_CHARS) : decoded,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("repo-file error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
