
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Plus, Play, Settings, Trash2 } from 'lucide-react';

const avatars = [
  {
    id: 1,
    name: 'Avatar Ejecutivo',
    status: 'active',
    videos: 12,
    lastUsed: '2024-07-03',
    quality: 'HD'
  },
  {
    id: 2,
    name: 'Avatar Casual',
    status: 'training',
    videos: 0,
    lastUsed: null,
    quality: 'HD'
  },
  {
    id: 3,
    name: 'Avatar Presentador',
    status: 'active',
    videos: 8,
    lastUsed: '2024-07-02',
    quality: '4K'
  }
];

const Avatars = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Mis Avatares</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus clones de IA para crear videos personalizados
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Avatar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{avatars.length}</div>
                    <p className="text-sm text-muted-foreground">Avatares Creados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {avatars.reduce((acc, avatar) => acc + avatar.videos, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Videos Generados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {avatars.filter(a => a.status === 'active').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Avatares Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">4K</div>
                    <p className="text-sm text-muted-foreground">Calidad Máxima</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avatars.map((avatar) => (
              <Card key={avatar.id} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Video className="w-16 h-16 text-gray-400" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{avatar.name}</CardTitle>
                    <Badge className={getStatusColor(avatar.status)}>
                      {avatar.status === 'active' ? 'Activo' : 
                       avatar.status === 'training' ? 'Entrenando' : 'Inactivo'}
                    </Badge>
                  </div>
                  <CardDescription>
                    {avatar.videos} videos generados • Calidad {avatar.quality}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Usar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {avatar.lastUsed && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Último uso: {new Date(avatar.lastUsed).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Avatars;
