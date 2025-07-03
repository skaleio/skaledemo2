
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Eye, Target } from 'lucide-react';

const SEO = () => {
  console.log('SEO Component: Renderizando SEO Manager');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">SEO Manager</h1>
              <p className="text-muted-foreground mt-1">
                Optimiza tu posicionamiento en buscadores
              </p>
            </div>
            <Badge variant="outline">Score: 78/100</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">247</div>
                    <p className="text-sm text-muted-foreground">Keywords</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-sm text-muted-foreground">Top 10</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">12.4K</div>
                    <p className="text-sm text-muted-foreground">Tráfico Orgánico</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">78</div>
                    <p className="text-sm text-muted-foreground">SEO Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Keywords Principales</CardTitle>
                <CardDescription>Posicionamiento de palabras clave</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { keyword: 'servicios digitales', position: 3, volume: 12000, trend: 'up' },
                    { keyword: 'marketing online', position: 7, volume: 8500, trend: 'up' },
                    { keyword: 'desarrollo web', position: 12, volume: 15600, trend: 'down' },
                    { keyword: 'consultoría digital', position: 5, volume: 6200, trend: 'up' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.keyword}</div>
                        <div className="text-sm text-muted-foreground">{item.volume} búsquedas/mes</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">#{item.position}</Badge>
                        <TrendingUp className={`w-4 h-4 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auditoría SEO</CardTitle>
                <CardDescription>Estado actual del sitio web</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Técnico', score: 85, color: 'bg-green-500' },
                    { category: 'Contenido', score: 72, color: 'bg-yellow-500' },
                    { category: 'Enlaces', score: 68, color: 'bg-orange-500' },
                    { category: 'Velocidad', score: 91, color: 'bg-green-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.score}/100</span>
                      </div>
                      <Progress value={item.score} className="h-2" />
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

export default SEO;
