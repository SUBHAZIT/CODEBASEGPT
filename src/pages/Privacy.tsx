import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Shield, Fingerprint, Lock, ShieldCheck } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      id: "01",
      title: "Philosophy of Privacy",
      content: "CodebaseGPT is architected on the principle of minimal data persistence. We believe that your source code is your most valuable intellectual asset, and we treat it with supreme confidentiality."
    },
    {
      id: "02",
      title: "Data Indexing Protocols",
      content: "When a repository is indexed, it passes through an ephemeral multi-tenant ingestion node. Once the high-dimensional vector embeddings are generated, the raw source files are immediately purged from our active processing memory. We do not store full copies of your code."
    },
    {
      id: "03",
      title: "Neural Engine Isolation",
      content: "We provide complete cryptographic isolation between repository contexts. Data indexed for one user or organization can never influence the neural responses or search results for another tenant."
    },
    {
      id: "04",
      title: "Sub-processor Disclosure",
      content: "We utilize Google Gemini 1.5 Pro via highly secure, enterprise-grade endpoints. Data sent for analysis is never used for training foundation models and is protected by the same rigorous privacy standards we uphold ourselves."
    }
  ];

  return (
    <PageLayout 
      category="Governance"
      title="Data & Privacy Framework" 
      subtitle="Professional standards for cryptographic security and repository isolation."
    >
      <div className="max-w-4xl mx-auto space-y-32">
        <section className="grid md:grid-cols-2 gap-16 items-start">
           <div className="space-y-8">
              <div className="p-4 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter m-0">Zero-Retention Ingestion</h2>
              <p className="text-muted-foreground leading-relaxed italic m-0">
                Your intellectual property is never at risk. Our zero-retention policy is hardcoded into the platform architecture.
              </p>
           </div>
           <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-primary">Compliance Status</div>
              <ul className="grid gap-4 list-none p-0 m-0">
                {['SOC 2 Type II Compliant Architectures', 'GDPR & CCPA Data Sovereignty', 'ISO/IEC 27001 Ready Infrastructure'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-xs font-bold text-foreground italic">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                   </li>
                ))}
              </ul>
           </div>
        </section>

        <section className="grid gap-16">
           {sections.map((s, i) => (
             <div key={i} className="group relative">
                <div className="absolute -left-12 top-0 text-5xl font-black text-white/5 italic select-none hidden md:block">{s.id}</div>
                <div className="space-y-4">
                   <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors italic m-0">{s.title}</h3>
                   <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium m-0">{s.content}</p>
                </div>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
             </div>
           ))}
        </section>

        <section className="text-center pt-24 border-t border-white/5 space-y-8">
           <h3 className="text-2xl font-black italic">Last Modified: March 20, 2026</h3>
           <p className="text-muted-foreground max-w-lg mx-auto italic">For specific legal inquiries regarding enterprise license agreements (ELAs), please contact our legal department directly.</p>
           <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:border-primary transition-all">Download PDF Version</button>
        </section>
      </div>
    </PageLayout>
  );
}
