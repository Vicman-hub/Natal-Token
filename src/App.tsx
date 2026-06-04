
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Roadmap from "./pages/Roadmap.tsx";
import { Web3PageLayout } from "./components/Web3PageLayout";

// Lazy load Web3-dependent pages
const Presale = lazy(() => import("./pages/Presale.tsx"));
const Airdrop = lazy(() => import("./pages/Airdrop.tsx"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/presale" 
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <Web3PageLayout>
                <Presale />
              </Web3PageLayout>
            </Suspense>
          } 
        />
        <Route 
          path="/airdrop" 
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <Web3PageLayout>
                <Airdrop />
              </Web3PageLayout>
            </Suspense>
          } 
        />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;