import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Mail, Github, Twitter, MessageSquare, MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const socials = [
    { icon: <Mail className="h-5 w-5" />, label: "Protocol", info: "admin@codebasegpt.io", color: "text-blue-500" },
    { icon: <Twitter className="h-5 w-5" />, label: "Signal", info: "@CodebaseGPT", color: "text-sky-500" },
    { icon: <Github className="h-5 w-5" />, label: "Repository", info: "InnoFusion-HQ", color: "text-white" },
    { icon: <MapPin className="h-5 w-5" />, label: "Nexus", info: "San Francisco, CA", color: "text-emerald-500" },
  ];

  return (
    <PageLayout 
      category="Network"
      title="Establish Connection" 
      subtitle="Engage with our technical team to explore custom integrations, high-volume indexing, or neural feedback."
    >
      <div className="grid lg:grid-cols-2 gap-24">
        {/* Left Column: Info */}
        <div className="space-y-16">
          <div className="space-y-8">
            <h3 className="text-4xl font-black tracking-tighter m-0 italic">Technical Support & Global Inquiries</h3>
            <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium italic m-0">
               We prioritize high-depth engineering questions and enterprise partnership requests. Our typical response latency is under 12 hours.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {socials.map((s, i) => (
              <div key={i} className="group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-primary/40 transition-all cursor-pointer">
                <div className={s.color + " mb-4 transition-transform group-hover:scale-110"}>{s.icon}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">{s.label}</div>
                <div className="text-sm font-bold tracking-tight">{s.info}</div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[2rem] bg-[#0a0f1d] border border-white/5 space-y-4 italic">
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                Network Status: Active
             </div>
             <p className="text-xs text-muted-foreground/60">
                Support engineers are currently online in PST and UTC timezones.
             </p>
          </div>
        </div>

        {/* Right Column: High-Fidelity Form */}
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
           <div className="relative bg-[#030712]/60 backdrop-blur-3xl p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-3xl">
              <h4 className="text-2xl font-black italic mb-8 tracking-tight">Direct Terminal</h4>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic ml-2">Identity.First</label>
                      <input type="text" placeholder="ALEX" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all uppercase placeholder:opacity-20" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic ml-2">Identity.Last</label>
                      <input type="text" placeholder="VOLKOV" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all uppercase placeholder:opacity-20" />
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic ml-2">Channel.Email</label>
                   <input type="email" placeholder="ALEX@QUANTUM.TECH" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all uppercase placeholder:opacity-20" />
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic ml-2">Transmission.Data</label>
                   <textarea placeholder="DESCRIBE YOUR ARCHITECTURAL ENQUIRY..." className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all uppercase placeholder:opacity-20 resize-none leading-relaxed" />
                </div>

                <button className="group w-full py-5 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-[0.3em] overflow-hidden relative shadow-[0_20px_40px_rgba(var(--primary),0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                   <div className="relative flex items-center justify-center gap-3">
                      Initiate Handshake
                      <ArrowRight className="h-4 w-4" />
                   </div>
                </button>
              </form>
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
