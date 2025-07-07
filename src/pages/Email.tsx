
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Send, 
  Users, 
  TrendingUp, 
  Calendar, 
  Settings, 
  Eye, 
  MousePointer, 
  UserCheck,
  ShoppingCart,
  Clock,
  Star,
  Zap,
  Plus,
  Edit3,
  Play,
  Pause,
  BarChart3,
  Target,
  Gift,
  Heart,
  MessageCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const EmailContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Datos simulados
  const emailStats = {
    sent: 15420,
    opened: 9252,
    clicked: 1847,
    converted: 312
  };

  const campaigns = [
    {
      id: 1,
      name: 'Bienvenida Nuevos Clientes',
      type: 'Automático',
      status: 'Activo',
      sent: 234,
      openRate: 68,
      clickRate: 12,
      lastSent: '2 horas'
    },
    {
      id: 2,
      name: 'Recordatorio de Cita',
      type: 'Automático',
      status: 'Activo',
      sent: 89,
      openRate: 85,
      clickRate: 25,
      lastSent: '30 min'
    },
    {
      id: 3,
      name: 'Promoción San Valentín',
      type: 'Manual',
      status: 'Programado',
      sent: 0,
      openRate: 0,
      clickRate: 0,
      lastSent: 'Mañana 10:00'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Email de Bienvenida',
      category: 'Automático',
      description: 'Primer contacto con nuevos suscriptores',
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      id: 2,
      name: 'Carrito Abandonado',
      category: 'E-commerce',
      description: 'Recupera ventas perdidas',
      icon: ShoppingCart,
      color: 'text-orange-600'
    },
    {
      id: 3,
      name: 'Confirmación de Reserva',
      category: 'Agenda',
      description: 'Confirma citas automáticamente',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      id: 4,
      name: 'Re-engagement',
      category: 'Retención',
      description: 'Reactiva clientes inactivos',
      icon: Zap,
      color: 'text-purple-600'
    },
    {
      id: 5,
      name: 'Promoción Mensual',
      category: 'Ventas',
      description: 'Ofertas especiales regulares',
      icon: Gift,
      color: 'text-green-600'
    },
    {
      id: 6,
      name: 'Feedback Post-Servicio',
      category: 'Calidad',
      description: 'Solicita reseñas y opiniones',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  const segments = [
    { name: 'Nuevos Leads', count: 156, growth: '+12%' },
    { name: 'Clientes Activos', count: 89, growth: '+5%' },
    { name: 'Clientes Inactivos', count: 45, growth: '-8%' },
    { name: 'VIP Premium', count: 23, growth: '+15%' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Email Marketing</h1>
            <p className="text-muted-foreground">
              Automatiza y potencia tus comunicaciones por email
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Zap className="w-3 h-3 mr-1" />
            Sistema Activo
          </Badge>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="segments">Segmentos</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Send className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{emailStats.sent.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Emails Enviados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round((emailStats.opened / emailStats.sent) * 100)}%</p>
                    <p className="text-sm text-muted-foreground">Tasa de Apertura</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <MousePointer className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round((emailStats.clicked / emailStats.opened) * 100)}%</p>
                    <p className="text-sm text-muted-foreground">Tasa de Clic</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round((emailStats.converted / emailStats.clicked) * 100)}%</p>
                    <p className="text-sm text-muted-foreground">Conversión</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Campañas Recientes</CardTitle>
              <CardDescription>Rendimiento de tus últimas campañas de email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${campaign.status === 'Activo' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.type} • {campaign.lastSent}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold">{campaign.sent}</p>
                        <p className="text-muted-foreground">Enviados</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{campaign.openRate}%</p>
                        <p className="text-muted-foreground">Apertura</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{campaign.clickRate}%</p>
                        <p className="text-muted-foreground">Clic</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Plantillas de Email</h2>
            <Button variant="outline">
              <Edit3 className="w-4 h-4 mr-2" />
              Editor Personalizado
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <template.icon className={`w-6 h-6 ${template.color}`} />
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline" className="text-xs">{template.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Vista Previa
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Segmentos de Audiencia</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Segmento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {segments.map((segment, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{segment.name}</h3>
                    </div>
                    <Badge className={segment.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {segment.growth}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{segment.count}</p>
                      <p className="text-sm text-muted-foreground">Contactos</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Ajusta las configuraciones de tu sistema de email marketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Emails Automáticos</p>
                  <p className="text-sm text-muted-foreground">Enviar emails de bienvenida automáticamente</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Recordatorios de Cita</p>
                  <p className="text-sm text-muted-foreground">Enviar confirmaciones y recordatorios</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <label className="font-medium">Frecuencia de Newsletter</label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="font-medium">Email de Remitente</label>
                <Input defaultValue="hola@tunegocio.com" />
              </div>
              
              <div className="space-y-2">
                <label className="font-medium">Nombre de Remitente</label>
                <Input defaultValue="Tu Negocio" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Email = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <EmailContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Email;
