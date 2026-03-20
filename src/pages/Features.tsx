import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { 
  Zap, Shield, Search, Cpu, Globe, Code2, 
  Layers, Terminal, Share2, Sparkles, BarChart3, Lock 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const coreFeatures = [
    {
      icon: <Cpu className="h-6 w-6 text-blue-500" />,
      title: "Neural Code Reasoning",
      description: "Harness Gemini 1.5 Pro's 1M+ token context window to reason about your entire codebase simultaneously.",
      details: ["Cross-file dependency mapping", "Complex architectural reasoning", "Logic flow visualization"]
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Hyper-Speed Indexing",
      description: "Our proprietary vector engine processes 10,000+ lines per second without sacrificing precision.",
      details: ["Incremental background sync", "Deltas-only processing", "Low-latency retrieval"]
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-500" />,
      title: "Autonomous Security",
      description: "Security scanning that actually understands the context, reducing false positives by 85%.",
      details: ["Zero-day vulnerability detection", "Secret leak prevention", "Compliance-ready auditing"]
    }
  ];

  const advancedTools = [
    {
      icon: <Share2 className="h-5 w-5" />,
      title: "Collaborative Intelligence",
      description: "Share live AI-indexed sessions with team members for instant onboarding and peer review."
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      title: "Interactive System Design",
      description: "Generate live Mermaid.js architecture diagrams directly from your current file structure."
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Code Health Metrics",
      description: "Track complexity, technical debt, and test coverage trends with AI-calculated scores."
    }
  ];

  return (
    <PageLayout 
      category="Capabilities"
      title="The Future of Codebase Intelligence" 
      subtitle="CodebaseGPT combines massive context windows with high-precision vector search to give you a god-mode view of your software."
    >
      {/* Core Features Grid */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          Core Intelligence
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {coreFeatures.map((f, i) => (
            <div key={i} className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="relative">
                <div className="p-3 w-fit rounded-2xl bg-background/80 border border-white/5 mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-xl">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">{f.description}</p>
                <ul className="space-y-2">
                  {f.details.map((d, di) => (
                    <li key={di} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary/40" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Resolution Diagram Placeholder (Visual Mockup) */}
      <section className="my-32 p-1 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-white/5 to-transparent border border-white/5 overflow-hidden">
        <div className="bg-[#0a0f1d]/60 rounded-[2.4rem] p-12 overflow-hidden relative group">
          <div className="relative flex flex-col md:flex-row items-center gap-16">
            <div className="flex-grow space-y-6">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest w-fit">
                Technology Stacks
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-none">Global Semantic Understanding</h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl font-medium italic">
                Our engine treats your repository as a single multidimensional entity. 
                Instead of searching for keywords, we find concepts.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {['TypeScript', 'Go', 'Rust', 'Java', 'Python', 'C++'].map(lang => (
                  <span key={lang} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-mono font-bold text-muted-foreground/80 hover:text-foreground hover:bg-white/10 transition-all cursor-default">{lang}</span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 relative">
               <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20" />
               <div className="relative w-64 h-64 border border-white/10 rounded-3xl bg-white/5 flex items-center justify-center p-8">
                  <Globe className="h-32 w-32 text-primary/40" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tools List */}
      <section className="space-y-12">
        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <Layers className="h-6 w-6 text-primary" />
          Advanced Tooling
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {advancedTools.map((t, i) => (
            <div key={i} className="flex flex-col gap-4 p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-all">
              <div className="text-primary/60">{t.icon}</div>
              <h4 className="font-bold text-foreground tracking-tight">{t.title}</h4>
              <p className="text-sm text-muted-foreground/80 leading-relaxed italic">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-32 pt-24 border-t border-white/5 text-center px-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent"> Ready to index the future?</h2>
        <p className="text-muted-foreground font-medium mb-12 max-w-lg mx-auto">
          Start your transformation today. Connect your first repository and see the difference AI intelligence makes.
        </p>
        <button className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(var(--primary),0.3)]">
          Index First Repository
        </button>
      </section>
    </PageLayout>
  );
}
