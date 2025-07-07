
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Target, 
  DollarSign, 
  BarChart3,
  Zap,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Activity,
  Clock,
  Briefcase,
  Calendar,
  Award,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { useBusiness } from '@/contexts/BusinessContext';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  description: string;
  trend?: number[];
}

const mockMetrics: MetricCard[] = [
  {
    title: 'Revenue Total',
    value: '$127,450',
    change: '+23.5%',
    changeType: 'positive',
    icon: DollarSign,
    description: 'vs mes anterior',
    trend: [65, 72, 68, 85, 95, 88, 92]
  },
  {
    title: 'Leads Activos',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    description: 'nuevos este mes',
    trend: [45, 52, 48, 65, 75, 68, 72]
  },
  {
    title: 'Conversión',
    value: '24.8%',
    change: '+3.2%',
    changeType: 'positive',
    icon: Target,
    description: 'tasa promedio',
    trend: [20, 22, 21, 24, 26, 24, 25]
  },
  {
    title: 'ROAS Campañas',
    value: '4.2x',
    change: '+0.8%',
    changeType: 'positive',
    icon: TrendingUp,
    description: 'retorno ads',
    trend: [3.5, 3.8, 3.6, 4.0, 4.3, 4.1, 4.2]
  }
];

const quickActions = [
  { title: 'Nuevo Lead', icon: Users, color: 'bg-blue-500', action: () => console.log('Nuevo Lead') },
  { title: 'Crear Campaña', icon: Target, color: 'bg-green-500', action: () => console.log('Nueva Campaña') },
  { title: 'Generar Post', icon: MessageCircle, color: 'bg-purple-500', action: () => console.log('Nuevo Post') },
  { title: 'Ver Reportes', icon: BarChart3, color: 'bg-orange-500', action: () => console.log('Reportes') }
];

const recentActivities = [
  { 
    type: 'lead', 
    title: 'Nuevo lead calificado',
    description: 'María García - Interés en servicio premium',
    time: '5 min',
    value: '$2,500',
    color: 'text-green-600'
  },
  { 
    type: 'campaign', 
    title: 'Campaña Meta optimizada',
    description: 'CPM reducido en 15% - Alcance +1.2k',
    time: '12 min',
    value: '+15%',
    color: 'text-blue-600'
  },
  { 
    type: 'automation', 
    title: 'Workflow ejecutado',
    description: 'Seguimiento automático a 45 leads',
    time: '18 min',
    value: '45 leads',
    color: 'text-purple-600'
  },
  { 
    type: 'content', 
    title: 'Post viral en Instagram',
    description: '2.5k interacciones, 340 comentarios',
    time: '1 hora',
    value: '2.5k',
    color: 'text-pink-600'
  }
];

const monthlyGoals = [
  { title: 'Revenue Goal', current: 127450, target: 150000, percentage: 85, color: 'bg-green-500' },
  { title: 'Leads Goal', current: 2847, target: 3200, percentage: 89, color: 'bg-blue-500' },
  { title: 'Conversión Goal', current: 24.8, target: 28, percentage: 89, color: 'bg-purple-500' }
];

const topPerformingCampaigns = [
  { name: 'Black Friday 2024', roi: '5.2x', spend: '$12,450', leads: 340, status: 'active' },
  { name: 'Lead Magnet Q4', roi: '4.8x', spend: '$8,200', leads: 280, status: 'active' },
  { name: 'Retargeting Premium', roi: '6.1x', spend: '$5,600', leads: 156, status: 'paused' }
];

const alerts = [
  { type: 'warning', title: 'Presupuesto al 85%', description: 'Campaña Black Friday', priority: 'medium' },
  { type: 'success', title: 'Objetivo superado', description: 'Conversiones +12%', priority: 'low' },
  { type: 'info', title: 'Nuevo lead VIP', description: 'Requiere seguimiento', priority: 'high' }
];

export const ModernExecutiveDashboard = () => {
  const { currentBusiness } = useBusiness();

  if (!currentBusiness) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Header Moderno - SIN EFECTO GLOW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
            <h1 className="text-4xl font-bold text-foreground">
              Dashboard Ejecutivo
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground">
              {currentBusiness.name} · {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
              {currentBusiness.plan.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Clock className="w-4 h-4" />
            Último sync: 2 min
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Nueva Acción
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${
                    metric.changeType === 'positive' ? 'bg-green-100 text-green-600' :
                    metric.changeType === 'negative' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                    metric.changeType === 'positive' ? 'text-green-600 bg-green-50' :
                    metric.changeType === 'negative' ? 'text-red-600 bg-red-50' :
                    'text-blue-600 bg-blue-50'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : metric.changeType === 'negative' ? (
                      <ArrowDownRight className="w-3 h-3" />
                    ) : null}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                  <p className="text-sm font-medium text-foreground mt-1">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
                
                {/* Mini gráfico de tendencia */}
                <div className="flex items-end gap-1 h-8">
                  {metric.trend?.map((value, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-sm ${
                        metric.changeType === 'positive' ? 'bg-green-200' :
                        metric.changeType === 'negative' ? 'bg-red-200' :
                        'bg-blue-200'
                      }`}
                      style={{ height: `${(value / Math.max(...metric.trend!)) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grid de contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actividad Reciente */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <CardTitle>Actividad en Tiempo Real</CardTitle>
                </div>
                <Button variant="ghost" size="sm">Ver todo</Button>
              </div>
              <CardDescription>
                Últimas acciones importantes en tu negocio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors group">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.type === 'lead' ? 'bg-green-500' :
                    activity.type === 'campaign' ? 'bg-blue-500' :
                    activity.type === 'automation' ? 'bg-purple-500' :
                    'bg-pink-500'
                  }`}></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{activity.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${activity.color}`}>
                          {activity.value}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-20 flex-col gap-2 hover:scale-105 transition-all duration-200 border border-dashed border-muted-foreground/20 hover:border-primary/40"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{action.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Estado del Sistema */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Estado del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Workflows Activos</span>
                  <span className="text-sm text-green-600 font-semibold">23/25</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Uso de API</span>
                  <span className="text-sm text-blue-600 font-semibold">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Almacenamiento</span>
                  <span className="text-sm text-orange-600 font-semibold">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Nueva sección inferior con contenido adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Objetivos Mensuales */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Objetivos del Mes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{goal.title}</span>
                  <span className="text-sm font-semibold">{goal.percentage}%</span>
                </div>
                <Progress value={goal.percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{typeof goal.current === 'number' && goal.current > 1000 ? `$${goal.current.toLocaleString()}` : goal.current}</span>
                  <span>{typeof goal.target === 'number' && goal.target > 1000 ? `$${goal.target.toLocaleString()}` : goal.target}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Campañas */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Top Campañas Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPerformingCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <p className="font-medium text-sm">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.spend} • {campaign.leads} leads</p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary">
                  ROI {campaign.roi}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alertas y Notificaciones */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border-l-4 border-l-primary/20 bg-muted/20">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.priority === 'high' ? 'bg-red-500' :
                  alert.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sección final: Próximas tareas programadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Próximas Tareas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Seguimiento leads premium</p>
                <p className="text-xs text-muted-foreground">Hoy - 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Reporte semanal</p>
                <p className="text-xs text-muted-foreground">Mañana - 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Optimizar campañas</p>
                <p className="text-xs text-muted-foreground">Viernes - 11:30 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              Performance Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="font-bold text-lg">¡Récord del mes!</p>
              <p className="text-sm text-muted-foreground">127% del objetivo de revenue</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="font-semibold text-sm">+23.5%</p>
                <p className="text-xs text-muted-foreground">Crecimiento</p>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="font-semibold text-sm">2,847</p>
                <p className="text-xs text-muted-foreground">Nuevos leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
