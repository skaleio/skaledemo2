
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const Analytics = () => {
  const topPages = [
    { page: '/servicios', views: 15420, bounce: 32, time: '3:45' },
    { page: '/blog/marketing-digital', views: 12340, bounce: 28, time: '4:12' },
    { page: '/contacto', views: 8750, bounce: 45, time: '2:18' },
    { page: '/sobre-nosotros', views: 6890, bounce: 38, time: '2:56' }
  ];

  const trafficSources = [
    { source: 'Búsqueda Orgánica', visitors: 45.2, color: 'bg-blue-500' },
    { source: 'Directo', visitors: 28.1, color: 'bg-green-500' },
    { source: 'Redes Sociales', visitors: 15.7, color: 'bg-purple-500' },
    { source: 'Referencias', visitors: 11.0, color: 'bg-orange-500' }
  ];

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Análisis detallado del tráfico y comportamiento de usuarios
              </p>
            </div>
            <Badge variant="outline">Últimas 30 días</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">43,267</div>
                    <p className="text-sm text-muted-foreground">Visitantes Únicos</p>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">67,891</div>
                    <p className="text-sm text-muted-foreground">Páginas Vistas</p>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.3%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">3:24</div>
                    <p className="text-sm text-muted-foreground">Tiempo en Sitio</p>
                    <div className="flex items-center text-xs text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5.7%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">34.2%</div>
                    <p className="text-sm text-muted-foreground">Tasa de Rebote</p>
                    <div className="flex items-center text-xs text-red-600">
                      <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                      -2.1%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Páginas Más Visitadas</CardTitle>
                <CardDescription>Contenido con mayor tráfico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{page.page}</h4>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{page.views.toLocaleString()} vistas</span>
                          <span>{page.bounce}% rebote</span>
                          <span>{page.time} promedio</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuentes de Tráfico</CardTitle>
                <CardDescription>De dónde vienen tus visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{source.source}</span>
                        <span>{source.visitors}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${source.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${source.visitors}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="w-5 h-5" />
                  <span>Dispositivos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Desktop</span>
                    <span className="font-bold">52.3%</span>
                  </div>
                  <Progress value={52.3} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobile</span>
                    <span className="font-bold">39.7%</span>
                  </div>
                  <Progress value={39.7} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tablet</span>
                    <span className="font-bold">8.0%</span>
                  </div>
                  <Progress value={8.0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Países</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { country: 'España', percentage: 68.4 },
                    { country: 'México', percentage: 15.2 },
                    { country: 'Argentina', percentage: 8.7 },
                    { country: 'Colombia', percentage: 7.7 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.country}</span>
                      <span className="font-bold">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">2.8%</div>
                    <p className="text-sm text-muted-foreground">Tasa de Conversión</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Formularios</span>
                      <span>456</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Llamadas</span>
                      <span>189</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compras</span>
                      <span>78</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Analytics;
