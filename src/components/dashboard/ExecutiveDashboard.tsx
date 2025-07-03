
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  ArrowDownRight
} from 'lucide-react';
import { useBusiness } from '@/contexts/BusinessContext';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  description: string;
}

const mockMetrics: MetricCard[] = [
  {
    title: 'Leads Totales',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    description: 'vs mes anterior'
  },
  {
    title: 'Tasa de Conversión',
    value: '24.8%',
    change: '+3.2%',
    changeType: 'positive',
    icon: Target,
    description: 'desde WhatsApp'
  },
  {
    title: 'Revenue Mensual',
    value: '$45,670',
    change: '+8.1%',
    changeType: 'positive',
    icon: DollarSign,
    description: 'ingresos este mes'
  },
  {
    title: 'Posts Programados',
    value: '156',
    change: '-2.3%',
    changeType: 'negative',
    icon: MessageCircle,
    description: 'contenido activo'
  },
  {
    title: 'ROAS Promedio',
    value: '4.2x',
    change: '+0.8%',
    changeType: 'positive',
    icon: TrendingUp,
    description: 'retorno publicidad'
  },
  {
    title: 'Workflows Activos',
    value: '23',
    change: '+5',
    changeType: 'positive',
    icon: Zap,
    description: 'automatizaciones'
  }
];

const activeWorkflows = [
  { name: 'Lead Capture WhatsApp', status: 'active', executions: 847 },
  { name: 'Content Auto-Post', status: 'active', executions: 156 },
  { name: 'Meta ADS Optimizer', status: 'warning', executions: 23 },
  { name: 'Video Generator AI', status: 'active', executions: 67 },
];

const recentActivity = [
  { type: 'lead', message: 'Nuevo lead desde Facebook ADS', time: '2 min ago', value: '$1,200' },
  { type: 'content', message: 'Post publicado en Instagram', time: '15 min ago', engagement: '125 likes' },
  { type: 'automation', message: 'Workflow de seguimiento ejecutado', time: '32 min ago', leads: '8 contactados' },
  { type: 'campaign', message: 'Campaña Google ADS pausada', time: '1 hora ago', reason: 'presupuesto agotado' },
];

export const ExecutiveDashboard = () => {
  const { currentBusiness } = useBusiness();

  if (!currentBusiness) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Dashboard Ejecutivo
          </h1>
          <p className="text-muted-foreground mt-1">
            Resumen general de {currentBusiness.name}
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20">
          Plan {currentBusiness.plan.toUpperCase()}
        </Badge>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${
                    metric.changeType === 'positive' ? 'bg-green-100 text-green-600' :
                    metric.changeType === 'negative' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' :
                    metric.changeType === 'negative' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : metric.changeType === 'negative' ? (
                      <ArrowDownRight className="w-4 h-4" />
                    ) : null}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm font-medium text-foreground">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado de Workflows */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Workflows Activos</span>
            </CardTitle>
            <CardDescription>
              Estado de tus automatizaciones en tiempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeWorkflows.map((workflow, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    workflow.status === 'active' ? 'bg-green-500' :
                    workflow.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-sm">{workflow.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {workflow.executions} ejecuciones hoy
                    </p>
                  </div>
                </div>
                <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                  {workflow.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <span>Actividad Reciente</span>
            </CardTitle>
            <CardDescription>
              Últimas acciones en tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'lead' ? 'bg-green-500' :
                  activity.type === 'content' ? 'bg-blue-500' :
                  activity.type === 'automation' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    {activity.value && (
                      <Badge variant="outline" className="text-xs">
                        {activity.value}
                      </Badge>
                    )}
                    {activity.engagement && (
                      <Badge variant="outline" className="text-xs text-blue-600">
                        {activity.engagement}
                      </Badge>
                    )}
                    {activity.leads && (
                      <Badge variant="outline" className="text-xs text-purple-600">
                        {activity.leads}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Accede rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-lg border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all group">
            <Users className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium">Nuevo Lead</p>
          </button>
          <button className="p-4 rounded-lg border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all group">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium">Crear Post</p>
          </button>
          <button className="p-4 rounded-lg border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all group">
            <Target className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium">Nueva Campaña</p>
          </button>
          <button className="p-4 rounded-lg border border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all group">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium">Ver Reportes</p>
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
