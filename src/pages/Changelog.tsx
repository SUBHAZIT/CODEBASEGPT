import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { History, Calendar, Sparkles, Rocket, Bug, Cpu, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { CHANGELOG_DATA } from "@/lib/changelog-data";
import SystemHealth from "@/components/layout/SystemHealth";

export default function Changelog() {
  return (
    <PageLayout 
      category="Signals"
      title="Platform Evolution" 
      subtitle="Tracking every milestone in the development of the world's most advanced codebase intelligence engine."
    >
      <div className="max-w-4xl mx-auto">
        {/* Live Status Header */}
        <div className="mb-24 flex flex-col sm:flex-row items-center justify-between p-8 rounded-[2rem] bg-[#0a0f1d]/40 backdrop-blur-md border border-white/5 gap-8">
           <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Live Platform Synchronization</div>
              <SystemHealth />
           </div>
           <div className="hidden md:block text-[10px] font-black uppercase tracking-widest text-primary/60 border border-primary/20 px-4 py-2 rounded-full">
              Autonomous Monitoring Active
           </div>
        </div>

        <div className="space-y-24">
          {CHANGELOG_DATA.map((u, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-20"
            >
              {/* Timeline Connector */}
              <div className="absolute left-10 top-2 bottom-[-100px] w-px bg-gradient-to-b from-primary/40 via-white/5 to-transparent" />
              <div className={`absolute left-6 top-0 h-8 w-8 rounded-2xl bg-background border border-white/10 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(var(--primary),0.3)] ${u.isLatest ? 'border-primary/50' : ''}`}>
                 {u.type === "Major Update" ? <Rocket className="h-5 w-5 text-primary" /> : <Bug className="h-5 w-5 text-emerald-500" />}
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="text-3xl font-black font-mono tracking-tighter text-foreground m-0">{u.version}</h3>
                  {u.isLatest && (
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full animate-pulse">
                      Today's Update
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">{u.type}</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 bg-white/5 border border-white/5 px-3 py-1 rounded-full">
                     <Calendar className="h-3 w-3" />
                     {u.date}
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group hover:bg-white/5 transition-all">
                  <ul className="grid gap-4 m-0 p-0 list-none">
                    {u.changes.map((c, ci) => (
                      <li key={ci} className="text-muted-foreground flex items-start gap-4 italic group-hover:text-foreground/90 transition-colors">
                        <div className="h-2 w-2 rounded-full bg-primary/60 mt-2 shrink-0 shadow-[0_0_10px_rgba(var(--primary),1)]" />
                        <p className="m-0 text-sm leading-relaxed font-medium">{c}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-48 p-16 rounded-[3rem] bg-gradient-to-br from-primary/5 to-transparent border border-white/10 text-center relative group overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <h3 className="text-3xl font-black mb-6 flex items-center justify-center gap-4 tracking-tighter italic">
              <Sparkles className="h-7 w-7 text-primary" />
              What's arriving next?
           </h3>
           <p className="text-muted-foreground leading-relaxed italic max-w-sm mx-auto mb-12">
             Our R&D team is currently focused on <strong>Multimodal Neural Debugging</strong> and automated code-to-speech documentation generation.
           </p>
           <button className="px-10 py-4 rounded-xl bg-background border border-white/10 text-[10px] font-black uppercase tracking-widest hover:border-primary/50 hover:bg-white/5 transition-all">Follow Development Roadmap</button>
        </div>
      </div>
    </PageLayout>
  );
}
