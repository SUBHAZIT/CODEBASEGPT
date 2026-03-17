import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import IndexingProgress from "./pages/IndexingProgress";
import RepoDashboard from "./pages/RepoDashboard";
import ChatInterface from "./pages/ChatInterface";
import OnboardingDoc from "./pages/OnboardingDoc";
import SharedChat from "./pages/SharedChat";
import SecurityScan from "./pages/SecurityScan";
import SystemDesign from "./pages/SystemDesign";
import RepoIssues from "./pages/RepoIssues";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index/:repoId" element={<IndexingProgress />} />
          <Route path="/repo/:repoId" element={<RepoDashboard />} />
          <Route path="/repo/:repoId/chat" element={<ChatInterface />} />
          <Route path="/repo/:repoId/onboarding" element={<OnboardingDoc />} />
          <Route path="/repo/:repoId/security" element={<SecurityScan />} />
          <Route path="/repo/:repoId/system-design" element={<SystemDesign />} />
          <Route path="/repo/:repoId/issues" element={<RepoIssues />} />
          <Route path="/shared/:sessionId" element={<SharedChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
