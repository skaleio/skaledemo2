
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Play, Download, Share, Eye } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Presentación Empresa Q1',
    duration: '2:45',
    views: 1247,
    status: 'published',
    avatar: 'Avatar Ejecutivo',
    createdAt: '2024-07-01'
  },
  {
    id: 2,
    title: 'Tutorial de Producto',
    duration: '4:12',
    views: 892,
    status: 'draft',
    avatar: 'Avatar Casual',
    createdAt: '2024-06-28'
  },
  {
    id: 3,
    title: 'Testimonios de Clientes',
    duration: '3:28',
    views: 2156,
    status: 'published',
    avatar: 'Avatar Presentador',
    createdAt: '2024-06-25'
  }
];

const VideoLibrary = () => {
  console.log('VideoLibrary Component: Renderizando biblioteca de videos');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Biblioteca de Videos</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona todos tus videos generados con IA
              </p>
            </div>
            <Button>
              <Video className="w-4 h-4 mr-2" />
              Nuevo Video
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{videos.length}</div>
                    <p className="text-sm text-muted-foreground">Videos Totales</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">{videos.filter(v => v.status === 'published').length}</div>
                    <p className="text-sm text-muted-foreground">Publicados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">{videos.reduce((acc, v) => acc + v.views, 0).toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Visualizaciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">10:25</div>
                    <p className="text-sm text-muted-foreground">Duración Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                  <Video className="w-12 h-12 text-gray-400" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <Badge className={getStatusColor(video.status)}>
                      {video.status === 'published' ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                  <CardDescription>
                    {video.views.toLocaleString()} visualizaciones • {video.avatar}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Creado: {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default VideoLibrary;
