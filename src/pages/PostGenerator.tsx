
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bot, Wand2, Copy, Download, Share2, RefreshCw } from 'lucide-react';

const PostGenerator = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('');
  const [tone, setTone] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePost = async () => {
    setIsGenerating(true);
    // Simular generación de post con IA
    setTimeout(() => {
      const mockPost = `🚀 ${topic}

¿Sabías que el marketing digital puede transformar completamente tu negocio? 

✨ Beneficios clave:
• Mayor alcance y visibilidad
• Segmentación precisa de audiencia  
• Medición de resultados en tiempo real
• ROI optimizado

💡 Consejo: Comienza con una estrategia clara y objetivos medibles.

¿Qué estrategia te ha funcionado mejor? ¡Comparte en los comentarios! 👇

#MarketingDigital #Estrategia #Negocios #Emprendimiento`;
      
      setGeneratedPost(mockPost);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Generador de Posts</h1>
              <p className="text-muted-foreground mt-1">
                Crea contenido atractivo para redes sociales con IA
              </p>
            </div>
            <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Bot className="w-4 h-4 mr-1" />
              IA Activada
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5" />
                  <span>Configuración del Post</span>
                </CardTitle>
                <CardDescription>
                  Define los parámetros para generar tu contenido
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tema o palabra clave</label>
                  <Input
                    placeholder="Ej: Marketing digital, Productividad, Ventas..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Plataforma</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tono de comunicación</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profesional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Amigable</SelectItem>
                      <SelectItem value="inspirational">Inspiracional</SelectItem>
                      <SelectItem value="educational">Educativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generatePost}
                  disabled={!topic || !platform || !tone || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generar Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post Generado</CardTitle>
                <CardDescription>
                  Tu contenido listo para publicar
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedPost ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg min-h-[300px]">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedPost}
                      </pre>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Programar
                      </Button>
                    </div>

                    <div className="text-center">
                      <Button 
                        variant="ghost" 
                        onClick={generatePost}
                        disabled={isGenerating}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Generar otra versión
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    <div className="text-center">
                      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Configure los parámetros y genere su post</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Posts Recientes</CardTitle>
              <CardDescription>Historial de contenido generado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { platform: 'Instagram', topic: 'Marketing Digital', date: '2024-07-03' },
                  { platform: 'LinkedIn', topic: 'Productividad', date: '2024-07-02' },
                  { platform: 'Facebook', topic: 'Ventas', date: '2024-07-01' }
                ].map((post, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.platform}</Badge>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h4 className="font-medium text-sm mb-2">{post.topic}</h4>
                    <Button variant="ghost" size="sm" className="w-full">
                      Ver post
                    </Button>
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

export default PostGenerator;
