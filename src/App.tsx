
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CRM from "./pages/CRM";
import Metrics from "./pages/Metrics";
import WhatsApp from "./pages/WhatsApp";
import Leads from "./pages/Leads";
import SalesReports from "./pages/SalesReports";
import Workflows from "./pages/Workflows";
import BotsStatus from "./pages/BotsStatus";
import Logs from "./pages/Logs";
import Content from "./pages/Content";
import PostGenerator from "./pages/PostGenerator";
import SocialMetrics from "./pages/SocialMetrics";
import Avatars from "./pages/Avatars";
import VideoGenerator from "./pages/VideoGenerator";
import VideoLibrary from "./pages/VideoLibrary";
import MetaAds from "./pages/MetaAds";
import GoogleAds from "./pages/GoogleAds";
import SEO from "./pages/SEO";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App Component: Iniciando aplicación');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/sales-reports" element={<SalesReports />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/bots-status" element={<BotsStatus />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/content" element={<Content />} />
            <Route path="/post-generator" element={<PostGenerator />} />
            <Route path="/social-metrics" element={<SocialMetrics />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/video-generator" element={<VideoGenerator />} />
            <Route path="/video-library" element={<VideoLibrary />} />
            <Route path="/meta-ads" element={<MetaAds />} />
            <Route path="/google-ads" element={<GoogleAds />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/shopify" element={<Shopify />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
