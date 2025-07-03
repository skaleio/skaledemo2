
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

const SocialMetrics = () => {
  const platforms = [
    { name: 'Instagram', followers: 12450, growth: 8.5, engagement: 4.2, posts: 156 },
    { name: 'Facebook', followers: 8920, growth: 5.2, engagement: 3.8, posts: 89 },
    { name: 'LinkedIn', followers: 3420, growth: 12.1, engagement: 6.1, posts: 67 },
    { name: 'TikTok', followers: 25600, growth: 25.4, engagement: 8.9, posts: 234 }
  ];

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Métricas RRSS</h1>
              <p className="text-muted-foreground mt-1">
                Analiza el rendimiento de tus redes sociales
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
                    <div className="text-2xl font-bold">
                      {platforms.reduce((acc, p) => acc + p.followers, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Seguidores Totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">12.8%</div>
                    <p className="text-sm text-muted-foreground">Crecimiento Promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold">5.75%</div>
                    <p className="text-sm text-muted-foreground">Engagement Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {platforms.reduce((acc, p) => acc + p.posts, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Posts Publicados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Plataforma</CardTitle>
                <CardDescription>Métricas detalladas de cada red social</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{platform.name}</span>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{platform.followers.toLocaleString()} seguidores</span>
                          <span className={platform.growth > 10 ? 'text-green-600' : 'text-blue-600'}>
                            +{platform.growth}%
                          </span>
                        </div>
                      </div>
                      <Progress value={platform.engagement * 10} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Engagement: {platform.engagement}%</span>
                        <span>{platform.posts} posts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Interacción</CardTitle>
                <CardDescription>Análisis de engagement de la última semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="font-medium">Likes</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">2,847</div>
                      <div className="text-xs text-green-600">+15%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Comentarios</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">456</div>
                      <div className="text-xs text-green-600">+8%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Share2 className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Compartidos</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">189</div>
                      <div className="text-xs text-green-600">+22%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Alcance</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">15.2K</div>
                      <div className="text-xs text-green-600">+12%</div>
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

export default SocialMetrics;
