
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Video, Play, Download, Settings } from 'lucide-react';

const VideoGenerator = () => {
  console.log('VideoGenerator Component: Renderizando generador de videos');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Generar Videos</h1>
              <p className="text-muted-foreground mt-1">
                Crea videos con tus avatares IA de forma automática
              </p>
            </div>
            <Button>
              <Video className="w-4 h-4 mr-2" />
              Crear Video
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Video</CardTitle>
                <CardDescription>Define el contenido y configuración</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título del Video</label>
                  <Input placeholder="Ingresa el título..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Script</label>
                  <Textarea 
                    placeholder="Escribe el guión del video..." 
                    className="min-h-[120px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Avatar</label>
                  <select className="w-full p-2 border rounded">
                    <option>Avatar Ejecutivo</option>
                    <option>Avatar Casual</option>
                    <option>Avatar Presentador</option>
                  </select>
                </div>
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Generar Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>Resultado del video generado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-16 h-16 text-gray-400" />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Reproducir
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default VideoGenerator;
