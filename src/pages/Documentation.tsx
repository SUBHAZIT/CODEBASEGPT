import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Book, Code, Terminal, Zap, BookOpen, Layers, Shield, Cpu } from "lucide-react";

export default function Documentation() {
  const sections = [
    {
      title: "Core Infrastructure",
      items: [
        { icon: <Cpu className="h-4 w-4" />, label: "Indexing Logic" },
        { icon: <Layers className="h-4 w-4" />, label: "Vector Embeddings" },
        { icon: <Code className="h-4 w-4" />, label: "Language Support" }
      ]
    },
    {
      title: "Security & Auditing",
      items: [
        { icon: <Shield className="h-4 w-4" />, label: "Secret Detection" },
        { icon: <Zap className="h-4 w-4" />, label: "Vulnerability Scan" }
      ]
    }
  ];

  return (
    <PageLayout 
      category="Technical Docs"
      title="The Unified Framework" 
      subtitle="Deep dive into the architecture, APIs, and operational layers that drive CodebaseGPT."
    >
      <div className="grid lg:grid-cols-12 gap-16">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-12">
           {sections.map((s, i) => (
             <div key={i} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">{s.title}</h4>
                <ul className="space-y-4">
                  {s.items.map((item, ii) => (
                    <li key={ii} className="group flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-all">
                       <span className="text-primary/40 group-hover:text-primary transition-colors">{item.icon}</span>
                       {item.label}
                    </li>
                  ))}
                </ul>
             </div>
           ))}
        </aside>
        
        {/* Main Content Area */}
        <div className="lg:col-span-9 prose prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <section className="mb-24">
             <div className="flex items-center gap-3 text-primary mb-6">
                <BookOpen className="h-8 w-8" />
                <h2 className="m-0 text-3xl font-black">System Architecture</h2>
             </div>
             <p className="text-lg font-medium italic mb-12 border-l-2 border-primary/20 pl-6">
                CodebaseGPT is built on a distributed indexing engine that treats repositories as coherent biological systems rather than collections of text files.
             </p>
             
             <p>
                Our platform leverages the <strong>distributed vectorization</strong> of source code. When you input a repository URL, the system initiates a multi-stage ingestion pipeline designed for speed, security, and semantic depth.
             </p>
             
             <div className="grid sm:grid-cols-2 gap-8 my-16">
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                   <h4 className="m-0 text-foreground">Global Context Awareness</h4>
                   <p className="text-sm m-0">Unlike traditional search tools, we maintain a global understanding of cross-file dependencies and module boundaries.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                   <h4 className="m-0 text-foreground">Semantic Tokenization</h4>
                   <p className="text-sm m-0">We use sophisticated AST parsers to understand the intent and structure of your logic before it ever reaches the LLM.</p>
                </div>
             </div>
          </section>

          <section className="mb-24">
             <div className="flex items-center gap-3 text-primary mb-6">
                <Terminal className="h-8 w-8" />
                <h2 className="m-0 text-3xl font-black">Environment Configuration</h2>
             </div>
             <p>
                Configure your environment for optimal indexing. The indexing agent follows `.gitignore` rules by default but can be customized via additional configuration.
             </p>
             
             <pre className="p-8 rounded-3xl bg-[#030712] border border-white/5 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl relative group">
                <div className="absolute top-4 right-6 text-[9px] font-black tracking-widest text-muted-foreground group-hover:text-primary transition-colors uppercase">bash</div>
                <div className="space-y-1">
                   <span className="text-emerald-500"># Install the CLI agent</span><br/>
                   <span className="text-primary">$</span> npm install -g @codebasegpt/cli<br/><br/>
                   <span className="text-emerald-500"># Authenticate with the primary node</span><br/>
                   <span className="text-primary">$</span> codebase-gpt login<br/><br/>
                   <span className="text-emerald-500"># Initiate high-depth scan</span><br/>
                   <span className="text-primary">$</span> codebase-gpt index ./project --mode high-depth
                </div>
             </pre>
          </section>

          <div className="mt-32 p-12 rounded-[2.5rem] bg-background border border-white/10 relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative text-center space-y-6">
                <h3 className="m-0 text-2xl font-black tracking-tight">Need specialized technical guidance?</h3>
                <p className="text-muted-foreground max-w-md mx-auto italic">Learn how to integrate CodebaseGPT into your CI/CD pipelines with custom GitHub actions.</p>
                <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 hover:border-primary/40 transition-all">Explore API Specs</button>
             </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
