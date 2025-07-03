
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Video, 
  Play, 
  Download, 
  Share2, 
  Search, 
  Filter,
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Video de Bienvenida',
    duration: '2:34',
    avatar: 'Avatar Ejecutivo',
    date: '2024-07-03',
    views: 245,
    status: 'published',
    category: 'Marketing'
  },
  {
    id: 2,
    title: 'Presentación de Servicios',
    duration: '1:45',
    avatar: 'Avatar Presentador',
    date: '2024-07-02',
    views: 189,
    status: 'published',
    category: 'Ventas'
  },
  {
    id: 3,
    title: 'Testimonio de Cliente',
    duration: '3:12',
    avatar: 'Avatar Casual',
    date: '2024-07-01',
    views: 312,
    status: 'published',
    category: 'Testimonios'
  },
  {
    id: 4,
    title: 'Tutorial de Producto',
    duration: '4:28',
    avatar: 'Avatar Ejecutivo',
    date: '2024-06-30',
    views: 156,
    status: 'draft',
    category: 'Educativo'
  }
];

const VideoLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Biblioteca de Videos</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona y organiza todos tus videos generados con IA
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
                    <div className="text-2xl font-bold">
                      {videos.reduce((acc, video) => acc + video.views, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Visualizaciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {new Set(videos.map(v => v.category)).size}
                    </div>
                    <p className="text-sm text-muted-foreground">Categorías</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Biblioteca de Videos</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Buscar videos..." 
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Ventas">Ventas</SelectItem>
                      <SelectItem value="Testimonios">Testimonios</SelectItem>
                      <SelectItem value="Educativo">Educativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
                      <Play className="w-12 h-12 text-gray-400" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{video.title}</CardTitle>
                        <Badge className={getStatusColor(video.status)}>
                          {video.status === 'published' ? 'Publicado' : 
                           video.status === 'draft' ? 'Borrador' : 'Procesando'}
                        </Badge>
                      </div>
                      <CardDescription>
                        {video.avatar} • {video.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{video.views} vistas</span>
                        </div>
                        <span>{new Date(video.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Play className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default VideoLibrary;
