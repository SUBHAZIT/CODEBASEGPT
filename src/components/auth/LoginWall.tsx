import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Zap, Shield, History, Lock, Sparkles, Star } from "lucide-react";
import { useUserAuth } from "@/hooks/use-user-auth";
import { motion, AnimatePresence } from "framer-motion";

interface LoginWallProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PREMIUM_FEATURES = [
  {
    icon: Lock,
    title: "Private Repos",
    desc: "Index your most secure code",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: History,
    title: "Full History",
    desc: "Infinite session storage",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "V-Pro Speed",
    desc: "10x faster indexing engine",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Advanced SEO",
    desc: "Automated security audits",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export function LoginWall({ open, onOpenChange }: LoginWallProps) {
  const { loginWithGitHub, loading } = useUserAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none bg-background/60 backdrop-blur-xl shadow-2xl">
        <div className="relative h-48 flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-[80px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" 
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent scale-150" />
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative p-2 rounded-3xl bg-background/50 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center p-3">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            </div>
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Premium Upgrade</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="px-8 pt-2 pb-8 relative">
          <div className="text-center mb-8">
            <DialogTitle className="text-3xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Fuel Your Workflow
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
              You've mastered the basics. Now unlock the full power of AI codebase intelligence.
            </DialogDescription>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {PREMIUM_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="group flex flex-col gap-2 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{feature.title}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <DialogFooter className="flex justify-center sm:justify-center">
            <Button 
              onClick={() => loginWithGitHub()} 
              disabled={loading}
              className="relative w-full max-w-xs h-14 text-sm font-bold gap-3 rounded-2xl shadow-[0_20px_40px_-12px_rgba(var(--primary),0.3)] hover:shadow-[0_25px_50px_-12px_rgba(var(--primary),0.4)] transition-all overflow-hidden group mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-foreground/10 to-primary opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
              <Github className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Sign in with GitHub</span>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
