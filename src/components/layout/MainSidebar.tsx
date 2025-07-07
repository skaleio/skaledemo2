
import React, { useState } from 'react';
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
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Phone,
  Mic,
  MessageSquare,
  Mail,
  Brain
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
import { Button } from '@/components/ui/button';
import { RealTimeMonitor } from '@/components/monitoring/RealTimeMonitor';

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
    label: 'E-commerce & Shopify',
    items: [
      { title: 'Tienda Shopify', url: '/shopify', icon: ShoppingCart },
      { title: 'Gestión de Productos', url: '/products', icon: Package },
      { title: 'Pedidos y Envíos', url: '/orders', icon: Truck },
      { title: 'Pagos y Facturación', url: '/payments', icon: CreditCard },
    ]
  },
  {
    label: 'IA & Automatizaciones',
    items: [
      { title: 'Asistente Skale GPT', url: '/skale-gpt', icon: Brain },
      { title: 'Chat GPT', url: '/gpt', icon: MessageSquare },
      { title: 'Workflows N8N', url: '/workflows', icon: Zap },
      { title: 'Estado de Bots', url: '/bots-status', icon: Bot },
      { title: 'Logs & Monitoreo', url: '/logs', icon: Target },
      { title: 'Retell AI Voices', url: '/retell', icon: Phone },
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
      { title: 'Email Marketing', url: '/email', icon: Mail },
    ]
  }
];

export const MainSidebar = () => {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const { currentBusiness } = useBusiness();
  
  // Estado para controlar qué secciones están expandidas
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>(() => {
    // Inicializar todas las secciones como expandidas
    const initial: {[key: string]: boolean} = {};
    menuSections.forEach(section => {
      initial[section.label] = true;
    });
    return initial;
  });

  const toggleSection = (sectionLabel: string) => {
    console.log('Toggling section:', sectionLabel);
    setExpandedSections(prev => ({
      ...prev,
      [sectionLabel]: !prev[sectionLabel]
    }));
  };

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

  const isCollapsed = state === 'collapsed';

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
        {/* Header del negocio actual - SIN BORDES */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Icono del negocio */}
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              {!isCollapsed && (
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
            
            {/* Botón para minimizar/expandir */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('Toggle sidebar clicked, current state:', state);
                toggleSidebar();
              }}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Logo SKALE en sidebar con animación de bombeo - SIN BORDES */}
          {!isCollapsed && (
            <div className="mt-3 pt-3">
              <p className="text-sm font-black font-orbitron text-center text-primary tracking-wider animate-heartbeat">
                SKALE
              </p>
            </div>
          )}
        </div>

        {/* Menú de navegación */}
        <div className="flex-1 px-2 py-4 space-y-1">
          {menuSections.map((section) => (
            <SidebarGroup key={section.label}>
              {!isCollapsed && (
                <div className="flex items-center justify-between mb-2">
                  <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60 font-semibold">
                    {section.label}
                  </SidebarGroupLabel>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(section.label)}
                    className="h-6 w-6 p-0 hover:bg-sidebar-accent"
                  >
                    {expandedSections[section.label] ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              )}
              
              {/* Contenido colapsable */}
              {(isCollapsed || expandedSections[section.label]) && (
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className="p-0">
                          <NavLink to={item.url} className={getNavClass(item.url)}>
                            <div className="flex items-center space-x-3 p-2 rounded-lg w-full">
                              <item.icon className="w-5 h-5 flex-shrink-0" />
                              {!isCollapsed && (
                                <span className="text-sm font-medium">{item.title}</span>
                              )}
                            </div>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          ))}
        </div>

        {/* Monitor en tiempo real - SIN BORDES */}
        <div className="px-2">
          <RealTimeMonitor />
        </div>

        {/* Configuración - SIN BORDES */}
        <div className="p-4">
          <SidebarMenuButton asChild>
            <NavLink to="/settings" className={getNavClass('/settings')}>
              <div className="flex items-center space-x-3 p-2 rounded-lg w-full">
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span className="text-sm font-medium">Configuración</span>}
              </div>
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
