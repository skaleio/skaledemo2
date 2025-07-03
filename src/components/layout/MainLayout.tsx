
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from './MainSidebar';
import { BusinessSelector } from './BusinessSelector';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider collapsedWidth={64}>
      <div className="min-h-screen flex w-full bg-background">
        <MainSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="h-full px-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="p-2 hover:bg-muted rounded-lg transition-colors" />
                <BusinessSelector />
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notificaciones */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-destructive">
                    3
                  </Badge>
                </Button>
                
                {/* Usuario */}
                <Button variant="ghost" size="sm" className="space-x-2">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">Admin</span>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Contenido principal */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
