
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle, 
  Activity,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

const bots = [
  {
    id: 1,
    name: 'WhatsApp Support Bot',
    status: 'online',
    uptime: 99.8,
    messages: 1247,
    users: 342,
    platform: 'WhatsApp'
  },
  {
    id: 2,
    name: 'Facebook Messenger Bot',
    status: 'online',
    uptime: 98.5,
    messages: 892,
    users: 156,
    platform: 'Facebook'
  },
  {
    id: 3,
    name: 'Instagram DM Bot',
    status: 'warning',
    uptime: 87.3,
    messages: 234,
    users: 89,
    platform: 'Instagram'
  },
  {
    id: 4,
    name: 'Telegram Support Bot',
    status: 'offline',
    uptime: 0,
    messages: 0,
    users: 0,
    platform: 'Telegram'
  }
];

const BotsStatus = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'offline': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Estado de Bots</h1>
              <p className="text-muted-foreground mt-1">
                Monitorea el rendimiento y estado de tus bots conversacionales
              </p>
            </div>
            <Button>
              <Bot className="w-4 h-4 mr-2" />
              Configurar Bot
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{bots.filter(b => b.status === 'online').length}</div>
                    <p className="text-sm text-muted-foreground">Bots Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">{bots.reduce((acc, bot) => acc + bot.messages, 0).toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Mensajes Hoy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">{bots.reduce((acc, bot) => acc + bot.users, 0)}</div>
                    <p className="text-sm text-muted-foreground">Usuarios Atendidos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">96.4%</div>
                    <p className="text-sm text-muted-foreground">Uptime Promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Bots</CardTitle>
                <CardDescription>Monitoreo en tiempo real de todos los bots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bots.map((bot) => (
                    <div key={bot.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{bot.name}</h4>
                          <p className="text-sm text-muted-foreground">{bot.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(bot.status)}
                        <Badge className={getStatusColor(bot.status)}>
                          {bot.status === 'online' ? 'En línea' : 
                           bot.status === 'warning' ? 'Advertencia' : 'Desconectado'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
                <CardDescription>Uptime y estadísticas de uso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {bots.map((bot) => (
                    <div key={bot.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{bot.name}</span>
                        <span className="text-sm text-muted-foreground">{bot.uptime}% uptime</span>
                      </div>
                      <Progress value={bot.uptime} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{bot.messages} mensajes</span>
                        <span>{bot.users} usuarios</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default BotsStatus;
