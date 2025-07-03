
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Video, Wand2, Play, Download, Share2, RefreshCw } from 'lucide-react';

const VideoGenerator = () => {
  const [script, setScript] = useState('');
  const [avatar, setAvatar] = useState('');
  const [voice, setVoice] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVideo = async () => {
    setIsGenerating(true);
    // Simular generación de video
    setTimeout(() => {
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Generar Videos</h1>
              <p className="text-muted-foreground mt-1">
                Crea videos personalizados con tus avatares de IA
              </p>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Video className="w-4 h-4 mr-1" />
              IA Video
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5" />
                  <span>Configuración del Video</span>
                </CardTitle>
                <CardDescription>
                  Configure los parámetros para generar su video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Script del video</label>
                  <Textarea
                    placeholder="Escriba el texto que su avatar dirá en el video..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Avatar</label>
                  <Select value={avatar} onValueChange={setAvatar}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un avatar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive">Avatar Ejecutivo</SelectItem>
                      <SelectItem value="casual">Avatar Casual</SelectItem>
                      <SelectItem value="presenter">Avatar Presentador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Voz</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de voz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male-professional">Masculina Profesional</SelectItem>
                      <SelectItem value="female-professional">Femenina Profesional</SelectItem>
                      <SelectItem value="male-casual">Masculina Casual</SelectItem>
                      <SelectItem value="female-casual">Femenina Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Calidad del video</label>
                  <Select defaultValue="hd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hd">HD (1080p)</SelectItem>
                      <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generateVideo}
                  disabled={!script || !avatar || !voice || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generando video...
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Generar Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>
                  El video generado aparecerá aquí
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="bg-muted/50 rounded-lg h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                      <p className="text-muted-foreground">Generando video...</p>
                      <p className="text-sm text-muted-foreground mt-1">Esto puede tardar unos minutos</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">Configure los parámetros y genere su video</p>
                    </div>
                  </div>
                )}

                {!isGenerating && script && avatar && voice && (
                  <div className="mt-4 space-y-2">
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Play className="w-4 h-4 mr-2" />
                        Reproducir
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                    <Button className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartir
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Videos Recientes</CardTitle>
              <CardDescription>Historial de videos generados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Video de bienvenida', avatar: 'Avatar Ejecutivo', duration: '2:34', date: '2024-07-03' },
                  { title: 'Presentación de servicios', avatar: 'Avatar Presentador', duration: '1:45', date: '2024-07-02' },
                  { title: 'Testimonio cliente', avatar: 'Avatar Casual', duration: '3:12', date: '2024-07-01' }
                ].map((video, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="aspect-video bg-muted/50 rounded mb-3 flex items-center justify-center">
                      <Play className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{video.avatar} • {video.duration}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{video.date}</span>
                      <Button variant="ghost" size="sm">
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default VideoGenerator;
