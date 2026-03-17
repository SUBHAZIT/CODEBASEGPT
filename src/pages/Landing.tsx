import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight, Zap, MessageSquare, FileCode, Code2, Lock, ChevronDown,
  Shield, GitBranch, Search, Brain, BarChart3, Bug, Sun, Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useCompactMode } from "@/hooks/use-compact-mode";
import { useTheme } from "@/hooks/use-theme";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FEATURES = [
  {
    icon: Search,
    title: "AI-Powered Code Chat",
    desc: "Ask natural language questions about any codebase. Get precise answers with file references and line numbers.",
  },
  {
    icon: Brain,
    title: "Instant Onboarding Docs",
    desc: "Auto-generate comprehensive onboarding documentation so new developers can ramp up in minutes.",
  },
  {
    icon: Shield,
    title: "Security Scanning",
    desc: "Detect vulnerabilities, misconfigurations, and security anti-patterns across the entire repository.",
  },
  {
    icon: BarChart3,
    title: "Architecture Overview",
    desc: "Visualize dependency graphs, understand system design, and map the full project structure.",
  },
  {
    icon: Bug,
    title: "Issue Solver",
    desc: "Fetch GitHub issues and get AI-generated solutions with exact code changes and root cause analysis.",
  },
  {
    icon: GitBranch,
    title: "Private Repo Support",
    desc: "Securely index private repositories using a personal access token stored only in your browser.",
  },
];

const FAQ = [
  {
    q: "How does CodebaseGPT index my repository?",
    a: "We fetch the file tree and contents via the GitHub API, chunk them intelligently, and build a context model. This lets the AI answer questions with precise file and line references.",
  },
  {
    q: "Is my code stored on your servers?",
    a: "Code is processed in-memory during your session. We don't persist raw source code. Chat sessions can optionally be saved for your convenience.",
  },
  {
    q: "Does it work with private repositories?",
    a: "Yes. Provide a GitHub Personal Access Token (classic or fine-grained) and it's stored only in your browser's localStorage. The token is sent directly to GitHub's API — we never store it server-side.",
  },
  {
    q: "What languages and frameworks are supported?",
    a: "CodebaseGPT is language-agnostic. It works with any GitHub repository regardless of language, framework, or project structure.",
  },
  {
    q: "How accurate are the AI responses?",
    a: "Answers are grounded in your actual codebase context. The AI cites specific files and line numbers, so you can always verify. Complex or ambiguous questions may require follow-up prompts.",
  },
];

const Landing = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const navigate = useNavigate();
  const compact = useCompactMode();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const navBg = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    const saved = localStorage.getItem("github_pat");
    if (saved) {
      setGithubToken(saved);
      setShowToken(true);
    }
  }, []);

  const handleIndex = () => {
    if (!repoUrl.includes("github.com")) {
      toast({ title: "Invalid URL", description: "Please enter a valid GitHub repository URL.", variant: "destructive" });
      return;
    }
    if (githubToken) localStorage.setItem("github_pat", githubToken);
    navigate(`/index/custom-repo`, { state: { githubUrl: repoUrl, githubToken: githubToken || undefined } });
  };

  if (compact) {
    return (
      <div className="h-screen flex flex-col bg-background p-3">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs font-medium text-foreground">CodebaseGPT</span>
        </div>
        <div className="mb-3">
          <div className="flex gap-1.5">
            <Input
              placeholder="github.com/owner/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleIndex()}
              className="h-8 font-mono text-xs bg-card border-border"
            />
            <Button onClick={handleIndex} size="sm" className="h-8 px-3 text-xs shrink-0">
              Go
            </Button>
          </div>
          <Collapsible open={showToken} onOpenChange={setShowToken}>
            <CollapsibleTrigger className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors mt-1.5">
              <Lock className="h-2.5 w-2.5" /> Private repo?
              <ChevronDown className={`h-2.5 w-2.5 transition-transform ${showToken ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Input
                type="password"
                placeholder="GitHub Personal Access Token"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                className="h-7 font-mono text-[10px] bg-card border-border mt-1.5"
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <p className="text-[10px] text-muted-foreground">Paste any GitHub URL to get started.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-sm"
        style={{ backgroundColor: `hsl(var(--background) / ${navBg})` }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-12 px-6">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm font-medium text-foreground">CodebaseGPT</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">Features</a>
            <a href="#how-it-works" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">How it works</a>
            <a href="#faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">FAQ</a>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md flex items-center justify-center border border-border bg-card hover:bg-accent/40 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5 text-muted-foreground" /> : <Moon className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-[11px] text-muted-foreground mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              AI-powered codebase intelligence
            </div>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] mb-5">
              Chat, Debug, Secure.{" "}
              <br />
              <span className="text-muted-foreground">All Codebases in One.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Paste any GitHub repository. AI indexes the entire codebase and lets you ask questions, generate docs, scan for vulnerabilities, and solve issues — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-3">
              <Input
                placeholder="https://github.com/owner/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleIndex()}
                className="font-mono text-sm bg-card border-border h-11 flex-1"
              />
              <Button onClick={handleIndex} className="shrink-0 h-11 px-6 text-sm font-medium">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <Collapsible open={showToken} onOpenChange={setShowToken}>
              <CollapsibleTrigger className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors mt-3">
                <Lock className="h-3 w-3" /> Private repository?
                <ChevronDown className={`h-3 w-3 transition-transform ${showToken ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Input
                  type="password"
                  placeholder="GitHub Personal Access Token (fine-grained or classic)"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="font-mono text-xs bg-card border-border h-9 mt-2 max-w-xl"
                />
                <p className="text-[10px] text-muted-foreground mt-1.5">Stored locally in your browser. Never sent to our servers.</p>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Capabilities</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Everything you need to understand code
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mb-12">
              From onboarding to debugging to security — one tool that replaces hours of manual code reading.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-5 rounded-lg border border-border bg-card hover:bg-accent/20 hover:border-primary/30 transition-colors group cursor-default"
              >
                <div className="w-9 h-9 rounded-md flex items-center justify-center bg-accent mb-4 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">How it works</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
              Three steps. Zero setup.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: FileCode,
                title: "Paste a GitHub URL",
                desc: "Public or private — we securely fetch the file tree and contents via the GitHub API.",
              },
              {
                step: "02",
                icon: Zap,
                title: "AI indexes your code",
                desc: "Intelligent chunking, dependency analysis, and full context extraction in seconds.",
              },
              {
                step: "03",
                icon: MessageSquare,
                title: "Ask anything",
                desc: "Chat, generate docs, scan for security issues, solve GitHub issues — all with cited answers.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                <span className="text-5xl font-bold text-muted/60 font-mono mb-4 block">{step.step}</span>
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Everything you need to know about CodebaseGPT.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-2">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                viewport={{ once: true, margin: "-30px" }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border rounded-lg bg-card px-4"
                >
                  <AccordionTrigger className="text-sm text-foreground hover:no-underline py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Start understanding code faster
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Paste any GitHub repository URL and start exploring with AI.
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="h-11 px-8 text-sm font-medium"
            >
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="font-mono text-sm font-medium text-foreground">CodebaseGPT</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                AI-powered codebase intelligence. Understand, debug, and secure any repository in minutes.
              </p>
            </div>

            {/* Product */}
            <div>
              <p className="text-xs font-medium text-foreground mb-3 uppercase tracking-wider">Product</p>
              <ul className="space-y-2">
                <li><a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-xs text-muted-foreground hover:text-foreground transition-colors">How it works</a></li>
                <li><a href="#faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-xs font-medium text-foreground mb-3 uppercase tracking-wider">Resources</p>
              <ul className="space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-medium text-foreground mb-3 uppercase tracking-wider">Legal</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-muted-foreground">
              © {new Date().getFullYear()} CodebaseGPT. All rights reserved.
            </p>
            <p className="text-[11px] text-muted-foreground">
              Built with AI · Open for contributions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
