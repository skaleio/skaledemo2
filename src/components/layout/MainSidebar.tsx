
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Building2,
  Users,
  MessageCircle,
  TrendingUp,
  Bot,
  Calendar,
  Video,
  Megaphone,
  Search,
  Settings,
  BarChart3,
  Target,
  Zap,
  FileText
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useBusiness } from '@/contexts/BusinessContext';

const menuSections = [
  {
    label: 'Dashboard',
    items: [
      { title: 'Panel General', url: '/', icon: Building2 },
      { title: 'Métricas Ejecutivas', url: '/metrics', icon: BarChart3 },
    ]
  },
  {
    label: 'CRM & Ventas',
    items: [
      { title: 'Pipeline de Ventas', url: '/crm', icon: TrendingUp },
      { title: 'WhatsApp Business', url: '/whatsapp', icon: MessageCircle },
      { title: 'Gestión de Leads', url: '/leads', icon: Users },
      { title: 'Reportes de Ventas', url: '/sales-reports', icon: FileText },
    ]
  },
  {
    label: 'IA & Automatizaciones',
    items: [
      { title: 'Workflows N8N', url: '/workflows', icon: Zap },
      { title: 'Estado de Bots', url: '/bots-status', icon: Bot },
      { title: 'Logs & Monitoreo', url: '/logs', icon: Target },
    ]
  },
  {
    label: 'Content & Social Media',
    items: [
      { title: 'Calendario de Contenido', url: '/content', icon: Calendar },
      { title: 'Generador de Posts', url: '/post-generator', icon: Bot },
      { title: 'Métricas RRSS', url: '/social-metrics', icon: TrendingUp },
    ]
  },
  {
    label: 'Clones IA & Videos',
    items: [
      { title: 'Mis Avatares', url: '/avatars', icon: Video },
      { title: 'Generar Videos', url: '/video-generator', icon: Video },
      { title: 'Biblioteca Videos', url: '/video-library', icon: FileText },
    ]
  },
  {
    label: 'Advertising & SEO',
    items: [
      { title: 'Meta ADS', url: '/meta-ads', icon: Megaphone },
      { title: 'Google ADS', url: '/google-ads', icon: Target },
      { title: 'SEO Manager', url: '/seo', icon: Search },
      { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    ]
  }
];

export const MainSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { currentBusiness } = useBusiness();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const baseClass = "flex items-center space-x-3 w-full text-left transition-all duration-200";
    if (isActive(path)) {
      return `${baseClass} bg-primary/10 text-primary border-r-2 border-primary`;
    }
    return `${baseClass} text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`;
  };

  if (!currentBusiness) {
    return (
      <Sidebar className="gradient-sidebar border-r border-sidebar-border">
        <SidebarContent className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-sidebar-accent rounded w-3/4"></div>
            <div className="h-4 bg-sidebar-accent rounded w-1/2"></div>
            <div className="h-4 bg-sidebar-accent rounded w-2/3"></div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="gradient-sidebar border-r border-sidebar-border animate-slide-in-left">
      <SidebarContent>
        {/* Header del negocio actual */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentBusiness.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  {currentBusiness.industry}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Menú de navegación */}
        <div className="flex-1 px-2 py-4 space-y-6">
          {menuSections.map((section) => (
            <SidebarGroup key={section.label}>
              {!collapsed && (
                <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60 font-semibold mb-2">
                  {section.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="p-0">
                        <NavLink to={item.url} className={getNavClass(item.url)}>
                          <div className="flex items-center space-x-3 p-2 rounded-lg w-full">
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && (
                              <span className="text-sm font-medium">{item.title}</span>
                            )}
                          </div>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <SidebarMenuButton asChild>
            <NavLink to="/settings" className={getNavClass('/settings')}>
              <div className="flex items-center space-x-3 p-2 rounded-lg w-full">
                <Settings className="w-5 h-5" />
                {!collapsed && <span className="text-sm font-medium">Configuración</span>}
              </div>
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
