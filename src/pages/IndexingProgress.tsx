import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Loader2, GitBranch, Download, Cpu, Database, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { indexRepository, generateOverview } from "@/lib/api";
import { useRepoStore } from "@/lib/store";
import { useUserAuth } from "@/hooks/use-user-auth";
import { toast } from "@/hooks/use-toast";

const STAGES = [
  { label: "Fetching file tree", icon: GitBranch },
  { label: "Downloading files", icon: Download },
  { label: "Analyzing & chunking", icon: Cpu },
  { label: "Generating overview", icon: Database },
];

const IndexingProgress = () => {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setRepoData, setOverview, setIndexing } = useRepoStore();
  const { session } = useUserAuth();

  const [currentStage, setCurrentStage] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [githubToken, setGithubToken] = useState<string | undefined>();
  const started = useRef(false);

  useEffect(() => {
    const state = location.state as { githubUrl?: string; githubToken?: string } | null;
    if (state?.githubUrl) setGithubUrl(state.githubUrl);
    
    // Prioritize manual token from state, fallback to session provider token
    if (state?.githubToken) {
      setGithubToken(state.githubToken);
    } else if (session?.provider_token) {
      setGithubToken(session.provider_token);
    }
  }, [location.state, session]);

  useEffect(() => {
    // Wait for githubToken if we have a session but it hasn't loaded yet
    if (session && !githubToken) {
      console.log("Waiting for session provider_token...");
      return;
    }

    if (started.current) return;
    started.current = true;

    console.log("Starting indexing for:", githubUrl);
    console.log("GitHub Token present:", !!githubToken);

    const doIndex = async () => {
      try {
        setIndexing(true, 1, "Fetching file tree...");
        setCurrentStage(1);

        const stageTimer = setInterval(() => {
          setFileCount((c) => Math.min(c + Math.floor(Math.random() * 8 + 2), 500));
        }, 100);
        const stage2Timer = setTimeout(() => setCurrentStage(2), 2000);
        const stage3Timer = setTimeout(() => setCurrentStage(3), 5000);

        const data = await indexRepository(githubUrl, githubToken);

        clearInterval(stageTimer);
        clearTimeout(stage2Timer);
        clearTimeout(stage3Timer);

        setFileCount(data.totalFiles);
        setCurrentStage(3);

        setRepoData({
          repoId: data.repoId,
          meta: data.meta,
          fileTree: data.fileTree,
          fileContents: data.fileContents,
          repoContext: data.repoContext,
          githubToken,
        });

        setCurrentStage(4);
        try {
          const overview = await generateOverview(data.repoContext);
          setOverview(overview);
        } catch (e) {
          console.error("Overview generation failed:", e);
        }

        setDone(true);
        setIndexing(false);
        setTimeout(() => navigate(`/repo/${data.repoId}`), 1200);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to index repository");
        setIndexing(false);
        toast({ title: "Indexing failed", description: e instanceof Error ? e.message : "Unknown error", variant: "destructive" });
      }
    };

    doIndex();
  }, [githubUrl, githubToken, navigate, setRepoData, setOverview, setIndexing]);

  const displayUrl = githubUrl
    ? githubUrl.replace("https://github.com/", "")
    : repoId === "custom-repo" ? "user/repo" : `vercel/${repoId}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm w-full mx-6">
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-1">Indexing repository</p>
          <p className="text-xs font-mono text-muted-foreground truncate">{displayUrl}</p>
        </div>

        <div className="space-y-3 mb-6">
          {STAGES.map((stage, i) => {
            const stageNum = i + 1;
            const isActive = currentStage === stageNum;
            const isComplete = currentStage > stageNum;

            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors ${
                  isComplete ? "bg-success/15 text-success"
                  : isActive ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
                }`}>
                  {isComplete ? <Check className="h-3.5 w-3.5" />
                  : isActive ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  : <stage.icon className="h-3.5 w-3.5" />}
                </div>
                <p className={`text-xs transition-colors ${
                  isComplete ? "text-success" : isActive ? "text-foreground" : "text-muted-foreground"
                }`}>{stage.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
            <span>{fileCount} files</span>
            <span>{Math.min(Math.round((currentStage / 4) * 100), 100)}%</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full rounded-full bg-primary"
              animate={{ width: `${Math.min((currentStage / 4) * 100, 100)}%` }}
              transition={{ duration: 0.5 }} />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded border border-destructive/30 bg-destructive/5 flex items-start gap-2">
            <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-destructive">{error}</p>
              <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mt-1.5 text-[11px] h-6 px-2">
                ← Back
              </Button>
            </div>
          </div>
        )}

        {done && (
          <p className="text-xs text-success">Done — redirecting...</p>
        )}

        {!done && !error && (
          <Button variant="ghost" onClick={() => navigate("/")} className="text-[11px] text-muted-foreground h-7 px-2">
            Cancel
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default IndexingProgress;
