
import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@/components/ui/loading-screen";

// Lazy load all pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const CRM = React.lazy(() => import("./pages/CRM"));
const Metrics = React.lazy(() => import("./pages/Metrics"));
const WhatsApp = React.lazy(() => import("./pages/WhatsApp"));
const Leads = React.lazy(() => import("./pages/Leads"));
const SalesReports = React.lazy(() => import("./pages/SalesReports"));
const Workflows = React.lazy(() => import("./pages/Workflows"));
const BotsStatus = React.lazy(() => import("./pages/BotsStatus"));
const Logs = React.lazy(() => import("./pages/Logs"));
const Content = React.lazy(() => import("./pages/Content"));
const PostGenerator = React.lazy(() => import("./pages/PostGenerator"));
const SocialMetrics = React.lazy(() => import("./pages/SocialMetrics"));
const Avatars = React.lazy(() => import("./pages/Avatars"));
const VideoGenerator = React.lazy(() => import("./pages/VideoGenerator"));
const VideoLibrary = React.lazy(() => import("./pages/VideoLibrary"));
const MetaAds = React.lazy(() => import("./pages/MetaAds"));
const GoogleAds = React.lazy(() => import("./pages/GoogleAds"));
const SEO = React.lazy(() => import("./pages/SEO"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Shopify = React.lazy(() => import("./pages/Shopify"));
const Products = React.lazy(() => import("./pages/Products"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Payments = React.lazy(() => import("./pages/Payments"));
const Retell = React.lazy(() => import("./pages/Retell"));
const GPT = React.lazy(() => import("./pages/GPT"));
const SkaleGPT = React.lazy(() => import("./pages/SkaleGPT"));
const AIPresentations = React.lazy(() => import("./pages/AIPresentations"));
const Email = React.lazy(() => import("./pages/Email"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  console.log('App Component: Iniciando aplicación');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/whatsapp" element={<WhatsApp />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/sales-reports" element={<SalesReports />} />
              <Route path="/skale-gpt" element={<SkaleGPT />} />
              <Route path="/gpt" element={<GPT />} />
              <Route path="/ai-presentations" element={<AIPresentations />} />
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
              <Route path="/email" element={<Email />} />
              <Route path="/shopify" element={<Shopify />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/retell" element={<Retell />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
