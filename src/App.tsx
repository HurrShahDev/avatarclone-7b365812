import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import CreateAvatar from "./pages/CreateAvatar";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";
import AvatarVideoGeneration from "./pages/AvatarVideoGeneration";
import VoiceCloning from "./pages/VoiceCloning";
import TextToSpeech from "./pages/TextToSpeech";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/create" element={<CreateAvatar />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/products/avatar-video" element={<AvatarVideoGeneration />} />
          <Route path="/products/voice-cloning" element={<VoiceCloning />} />
          <Route path="/products/text-to-speech" element={<TextToSpeech />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
