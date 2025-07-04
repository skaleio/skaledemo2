
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from './MainSidebar';
import { BusinessSelector } from './BusinessSelector';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Aurora } from '@/components/effects/Aurora';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        {/* Aurora Background Effect */}
        <Aurora 
          colorStops={["#1a1a2e", "#16213e", "#0f3460"]}
          amplitude={0.8}
          blend={0.6}
          speed={0.5}
          className="fixed inset-0"
        />
        
        {/* Overlay for better content readability */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[0.5px]" style={{ zIndex: -1 }} />
        
        <MainSidebar />
        
        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-40">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white" />
                <BusinessSelector />
              </div>
              
              {/* Logo SKALE */}
              <div className="flex items-center">
                <h1 className="text-2xl font-black font-orbitron bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wider drop-shadow-lg">
                  SKALE
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notificaciones */}
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-cyan-500 border-0 text-black">
                    3
                  </Badge>
                </Button>
                
                {/* Usuario */}
                <Button variant="ghost" size="sm" className="space-x-2 text-white hover:bg-white/10">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">Admin</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Contenido principal */}
          <main className="flex-1 p-6 overflow-auto relative">
            <div className="animate-fade-in-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
