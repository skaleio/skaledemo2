
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainSidebar } from './MainSidebar';
import { BusinessSelector } from './BusinessSelector';
import { Button } from '@/components/ui/button';
import { Bell, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoginDialog } from './LoginDialog';
import { useBusiness } from '@/contexts/BusinessContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { unreadNotifications } = useBusiness();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
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
              
              {/* Logo SKALE clickeable para ir al dashboard con animación de bombeo */}
              <div className="flex items-center">
                <button 
                  onClick={() => navigate('/')}
                  className="hover:scale-105 transition-transform cursor-pointer"
                >
                  <h1 className="text-2xl font-black font-orbitron text-primary tracking-wider animate-heartbeat">
                    SKALE
                  </h1>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Notificaciones con animación si hay notificaciones sin leer */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className={`w-5 h-5 ${unreadNotifications > 0 ? 'animate-pulse' : ''}`} />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-destructive animate-popout">
                      <span className="animate-popout">
                        {unreadNotifications}
                      </span>
                    </Badge>
                  )}
                </Button>
                
                {/* Usuario - clickeable para abrir login */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="space-x-2"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">Iniciar Sesión</span>
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

      {/* Dialog de Login */}
      <LoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen} 
      />
    </SidebarProvider>
  );
};
