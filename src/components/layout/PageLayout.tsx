import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import SystemHealth from "@/components/layout/SystemHealth";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  category?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children, category }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground relative">
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link 
          to="/"
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Homepage
        </Link>
      </div>

      {/* Hero Header */}
      <header className="pt-32 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            {category && (
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                {category}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent max-w-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground/80 max-w-2xl font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      {/* Content Container */}
      <main className="flex-grow relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <div className="relative bg-[#0a0f1d]/40 backdrop-blur-lg rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="relative p-8 md:p-14 prose prose-invert max-w-none">
              {children}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
               <SystemHealth />
               <p className="text-[10px] text-muted-foreground/40 font-medium tracking-wide">
                 © 2026 INNOFUSION RESEARCH · ALL RIGHTS RESERVED
               </p>
            </div>
            
            <div className="flex gap-8">
              <Link to="/features" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Principles</Link>
              <Link to="/docs" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Framework</Link>
              <Link to="/changelog" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Signals</Link>
              <Link to="/contact" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Network</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
