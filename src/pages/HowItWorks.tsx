import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Link2, Search, MessageSquare, Terminal, ChevronRight, Share2, ShieldCheck, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const pipeline = [
    {
      icon: <Link2 className="h-8 w-8" />,
      title: "Repository Handshake",
      description: "Secure connection via GitHub OAuth or public URL ingestion. We immediately verify access and branches.",
      tech: "OAuth 2.0 / REST API / GraphQL"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Structural Tokenization",
      description: "Our proprietary crawler parses the entire file tree, identifying languages and module relationships.",
      tech: "Tree-sitter / Fast Crawl Engine"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Vector Embedding",
      description: "Code snippets are transformed into high-dimensional vectors, enabling semantic search and context retrieval.",
      tech: "Gemini 1.5 Pro / VectorDB"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Intelligence Activation",
      description: "The AI agent is initialized with your project's unique context, ready to provide expert-level insights.",
      tech: "Neural Reasoning / LLM Agents"
    }
  ];

  return (
    <PageLayout 
      category="The Engine"
      title="How CodebaseGPT Reasons" 
      subtitle="Discover the sophisticated pipeline that transforms raw source code into an interactive, intelligent knowledge base."
    >
      {/* The Pipeline Visualization */}
      <section className="relative py-12">
        <div className="absolute left-[3.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent hidden md:block" />
        
        <div className="space-y-24">
          {pipeline.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row gap-12 group"
            >
              <div className="relative shrink-0 z-10">
                 <div className="absolute -inset-4 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                 <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    {p.icon}
                 </div>
                 <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-xs font-black">
                    {i + 1}
                 </div>
              </div>

              <div className="flex-grow pt-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                   <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{p.title}</h3>
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-mono font-bold tracking-widest text-muted-foreground uppercase h-fit">
                      {p.tech}
                   </span>
                </div>
                <p className="text-lg text-muted-foreground/80 leading-relaxed italic max-w-2xl">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Deep Dive Section */}
      <section className="mt-48 p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-[#0f172a] to-background border border-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
         <div className="relative grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <div className="flex items-center gap-3 text-emerald-500 font-bold tracking-[0.2em] uppercase text-xs">
                  <ShieldCheck className="h-5 w-5" />
                  Security Architecture
               </div>
               <h2 className="text-4xl font-black tracking-tighter">Your Code Stays Yours. Always.</h2>
               <p className="text-muted-foreground leading-relaxed italic">
                  We built CodebaseGPT with a "Security-First" philosophy. Our architecture ensures that indexing is temporary and data is handled with maximum privacy.
               </p>
               <ul className="grid gap-4">
                  {[
                    "TLS 1.3 / AES-256 Encryption at all stages",
                    "Ephemeral storage: Source code is purged after indexing",
                    "Privacy-compliant vectorization (No PII leakage)",
                    "Audit logs for every repository interaction"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
               </ul>
            </div>
            <div className="relative">
               <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-12 overflow-hidden">
                  <Terminal className="h-full w-full text-muted-foreground/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-1/2 h-1/2 bg-primary/20 blur-[80px] rounded-full" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rounded-full opacity-20" />
               </div>
            </div>
         </div>
      </section>

      {/* Final Summary Card */}
      <section className="mt-48 text-center space-y-12">
        <h2 className="text-4xl font-black tracking-tighter">Scalable Intelligence</h2>
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Personal", limit: "5 Repos", price: "Free" },
             { title: "Pro", limit: "Unlimited", price: "$29/mo" },
             { title: "Enterprise", limit: "Custom", price: "Contact" }
           ].map((plan, i) => (
             <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/40 transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4 block">{plan.title}</span>
                <div className="text-3xl font-black mb-2">{plan.limit}</div>
                <div className="text-primary font-bold text-sm mb-6">{plan.price}</div>
                <button className="w-full py-4 rounded-xl bg-background border border-white/10 text-xs font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shadow-xl">Select Plan</button>
             </div>
           ))}
        </div>
      </section>
    </PageLayout>
  );
}
