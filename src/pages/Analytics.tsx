
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Eye, Clock } from 'lucide-react';

const Analytics = () => {
  console.log('Analytics Component: Renderizando Analytics');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground mt-1">
                Análisis completo del rendimiento web
              </p>
            </div>
            <Badge variant="outline">Actualizado hace 1 hora</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">15,247</div>
                    <p className="text-sm text-muted-foreground">Usuarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">42,891</div>
                    <p className="text-sm text-muted-foreground">Páginas vistas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">3:42</div>
                    <p className="text-sm text-muted-foreground">Tiempo promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">68.4%</div>
                    <p className="text-sm text-muted-foreground">Tasa de rebote</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Páginas Principales</CardTitle>
                <CardDescription>Páginas más visitadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { page: '/', views: 8420, percentage: 45 },
                    { page: '/servicios', views: 3240, percentage: 22 },
                    { page: '/blog', views: 2180, percentage: 18 },
                    { page: '/contacto', views: 1890, percentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.page}</div>
                        <div className="text-sm text-muted-foreground">{item.views.toLocaleString()} vistas</div>
                      </div>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuentes de Tráfico</CardTitle>
                <CardDescription>Origen de las visitas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { source: 'Búsqueda Orgánica', visits: 6840, color: 'bg-green-100 text-green-600' },
                    { source: 'Directo', visits: 4230, color: 'bg-blue-100 text-blue-600' },
                    { source: 'Redes Sociales', visits: 2890, color: 'bg-purple-100 text-purple-600' },
                    { source: 'Referidos', visits: 1287, color: 'bg-orange-100 text-orange-600' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.source}</div>
                        <div className="text-sm text-muted-foreground">{item.visits.toLocaleString()} visitas</div>
                      </div>
                      <Badge className={item.color}>
                        {Math.round(item.visits / 15247 * 100)}%
                      </Badge>
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

export default Analytics;
