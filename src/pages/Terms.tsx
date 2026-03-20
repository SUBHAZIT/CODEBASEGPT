import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { FileText, Scale, Gavel, AlertCircle } from "lucide-react";

export default function Terms() {
  const clauses = [
    {
      title: "Platform Authorization",
      text: "By utilizing the CodebaseGPT indexing engine, you represent and warrant that you hold legitimate administrative rights or express permission to analyze the code contained within the repositories you connect."
    },
    {
      title: "Fair Usage Thresholds",
      text: "Users on the Enterprise and Professional tiers are subject to fair usage policies regarding high-frequency API calls. Excessive automated indexing that attempts to scrape our internal vector embeddings is strictly prohibited."
    },
    {
      title: "AI Analysis Disclaimer",
      text: "While Gemini 1.5 Pro provides industry-leading reasoning, CodebaseGPT makes no guarantees regarding the absolute correctness of any AI-generated explanation, bug-fix, or security audit. Final implementation remains the responsibility of the human architect."
    },
    {
      title: "Intellectual Sovereignty",
      text: "You retain 100% ownership of your source code and all intellectual property derived from its analysis. CodebaseGPT claims no rights to your data, insights, or architectures generated through our platform."
    }
  ];

  return (
    <PageLayout 
      category="Agreement"
      title="Terms of Interaction" 
      subtitle="Operational guidelines for the use of the CodebaseGPT Intelligence Network."
    >
      <div className="max-w-4xl mx-auto space-y-32">
        <section className="p-12 md:p-16 rounded-[3rem] bg-[#0a0f1d] border border-white/10 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="relative flex flex-col md:flex-row gap-12 items-center">
              <div className="h-20 w-20 shrink-0 rounded-[2rem] bg-background border border-white/10 flex items-center justify-center text-primary shadow-2xl">
                 <Scale className="h-10 w-10" />
              </div>
              <div className="space-y-4">
                 <h2 className="text-3xl font-black tracking-tight italic m-0">Foundational Principles</h2>
                 <p className="text-muted-foreground/80 leading-relaxed font-medium italic m-0">
                    Our terms are designed to protect both the user and the platform. We prioritize clarity, performance, and mutual respect for intellectual property.
                 </p>
              </div>
           </div>
        </section>

        <section className="grid gap-24">
           {clauses.map((c, i) => (
             <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0 pt-1">
                   <div className="text-xs font-black font-mono text-primary/60 tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/5 uppercase italic">Module.{String(i+1).padStart(2, '0')}</div>
                </div>
                <div className="space-y-4 max-w-3xl">
                   <h3 className="text-2xl font-black italic m-0 tracking-tight">{c.title}</h3>
                   <p className="text-lg text-muted-foreground/70 leading-relaxed font-medium italic m-0">{c.text}</p>
                </div>
             </div>
           ))}
        </section>

        <div className="p-12 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex gap-6 items-start italic">
           <AlertCircle className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
           <p className="text-sm text-amber-500/80 m-0 font-medium">
             Violation of these terms, including attempting to reverse-engineer our vector mapping algorithms, will result in immediate termination of neural access and revocation of API credentials.
           </p>
        </div>
      </div>
    </PageLayout>
  );
}
