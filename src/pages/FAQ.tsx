import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { HelpCircle, Search, Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "Platform Access",
      questions: [
        {
          q: "What are the repository indexing limits?",
          a: "Free users can index up to 5 repositories without authentication. Authenticated users enjoy unlimited public repository indexing. For private repositories, the limit depends on your subscription tier."
        },
        {
          q: "How do I connect my private GitHub repositories?",
          a: "Simply sign in with your GitHub account. We use secure OAuth 2.0 scopes (`repo` and `read:user`) to list and clone your private projects for analysis. We never see your password."
        }
      ]
    },
    {
      category: "Technology & AI",
      questions: [
        {
          q: "Which AI model powers CodebaseGPT?",
          a: "Everything is powered by Google's Gemini 1.5 Pro. Its 1M+ token context window allows it to digest entire codebases and maintain global architectural awareness."
        },
        {
          q: "Does it support monorepos or complex structures?",
          a: "Yes. Our structural tokenization engine can navigate complex monorepo patterns, identifying boundaries between packages and mapping internal dependencies across workspace links."
        }
      ]
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          q: "Is my code stored on your servers?",
          a: "No. Your source code is ingested into our ephemeral indexing engine, vectorized, and then purged. We only store the high-dimensional embeddings and structural metadata required to answer your queries."
        },
        {
          q: "Does the AI learn from my private data?",
          a: "Absolutely not. Your code is processed within private tenant boundaries. We do not use your private repository data to train or fine-tune our global AI models."
        }
      ]
    }
  ];

  return (
    <PageLayout 
      category="Support"
      title="Common Enquiries" 
      subtitle="Detailed answers to technical, security, and billing questions from the CodebaseGPT community."
    >
      <div className="max-w-5xl mx-auto">
        {/* Search Bar Visual */}
        <div className="relative mb-24 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input 
             type="text" 
             disabled 
             placeholder="Search the knowledge base..." 
             className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-16 text-lg font-medium text-foreground placeholder:text-muted-foreground/40"
          />
          <div className="absolute inset-y-0 right-4 flex items-center">
            <kbd className="hidden sm:inline-flex px-2 py-1 bg-white/10 rounded uppercase font-black text-[10px] text-muted-foreground tracking-widest border border-white/10">/</kbd>
          </div>
        </div>

        <div className="grid gap-20">
          {faqs.map((group, gi) => (
            <div key={gi} className="space-y-8">
               <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4">
                  <div className="h-px w-8 bg-primary/40" />
                  {group.category}
               </h2>
               <div className="grid gap-4">
                  {group.questions.map((f, i) => (
                    <div key={i} className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex gap-6 items-start">
                        <div className="h-10 w-10 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                           <HelpCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-4">
                           <h3 className="text-xl font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">{f.q}</h3>
                           <p className="text-muted-foreground leading-relaxed italic max-w-3xl">
                             {f.a}
                           </p>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 flex flex-col items-center text-center gap-8">
           <h3 className="text-2xl font-black italic">Still need clarification?</h3>
           <p className="text-muted-foreground max-w-md">Our technical engineers are available for specialized consultations for enterprise customers.</p>
           <button className="px-8 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Support Center</button>
        </div>
      </div>
    </PageLayout>
  );
}
