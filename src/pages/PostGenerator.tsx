
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bot, Wand2, Copy, Send, Image, Palette, Download, Eye, Heart, MessageCircle, Share, Zap } from 'lucide-react';

const PostGeneratorContent = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const generateContent = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const posts = {
        instagram: {
          text: `🚀✨ ¡Descubre el poder de la IA para tu negocio!
          
¿Sabías que nuestros clientes han incrementado sus ventas en un 347% usando SKALE?

🎯 Automatización inteligente
📈 Leads de calidad premium  
💰 ROI garantizado
🤖 IA trabajando 24/7

¡Tu competencia ya está usando IA... ¿y tú?

#IA #Automatización #Ventas #SKALE #Emprendimiento #MarketingDigital #Innovación`,
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop'
        },
        facebook: {
          text: `🎯 ¿Quieres triplicar tus ventas con IA?

En SKALE, nuestros clientes han logrado resultados increíbles:
• +347% en ROI promedio
• +280% en conversiones  
• +156% en calidad de leads
• +420% en valor de vida del cliente

¿Cómo lo hacemos?
✅ Automatización inteligente de WhatsApp
✅ Llamadas de voz con IA (Retell)
✅ Optimización automática de anuncios
✅ Lead scoring predictivo
✅ Follow-up personalizado

¡La IA está cambiando las reglas del juego!

¿Listo para ser parte de la revolución?`,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
        },
        linkedin: {
          text: `La IA está transformando cómo las empresas generan ingresos.

En SKALE, hemos desarrollado un ecosistema que permite a nuestros clientes:

→ Automatizar completamente su proceso de ventas
→ Cualificar leads con precisión del 94%
→ Realizar follow-ups personalizados a escala
→ Optimizar campañas publicitarias en tiempo real

Resultado: ROI promedio del 347%

La pregunta no es si la IA va a cambiar tu industria.
La pregunta es: ¿vas a liderar el cambio o lo vas a seguir?

#ArtificialIntelligence #SalesAutomation #DigitalTransformation #BusinessGrowth`,
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'
        }
      };

      setGeneratedPost(posts[selectedPlatform].text);
      setGeneratedImage(posts[selectedPlatform].image);
      setIsGenerating(false);
    }, 2000);
  };

  const platforms = [
    { value: 'instagram', label: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { value: 'facebook', label: 'Facebook', color: 'bg-blue-600' },
    { value: 'linkedin', label: 'LinkedIn', color: 'bg-blue-700' },
    { value: 'twitter', label: 'Twitter/X', color: 'bg-black' },
    { value: 'tiktok', label: 'TikTok', color: 'bg-black' }
  ];

  const metrics = [
    { label: 'Posts generados hoy', value: 47, change: '+23%' },
    { label: 'Engagement promedio', value: '8.4%', change: '+15%' },
    { label: 'Alcance total', value: '45.2K', change: '+34%' },
    { label: 'Conversiones', value: 156, change: '+67%' }
  ];

  console.log('PostGenerator Content: Renderizando generador de posts con IA');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Generador de Posts IA</h1>
          <p className="text-muted-foreground mt-1">
            Crea contenido viral automáticamente con imágenes personalizadas
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
          <Button onClick={generateContent} disabled={isGenerating}>
            {isGenerating ? (
              <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Bot className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? 'Generando...' : 'Generar Post'}
          </Button>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel de generación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5" />
              <span>Generador IA</span>
            </CardTitle>
            <CardDescription>Describe el tema y selecciona la plataforma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Plataforma</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(platform => (
                    <SelectItem key={platform.value} value={platform.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                        <span>{platform.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tema del Post</label>
              <Textarea 
                placeholder="Ej: Beneficios de la automatización con IA para empresas..." 
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tono del Mensaje</label>
              <Select defaultValue="profesional">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profesional">Profesional</SelectItem>
                  <SelectItem value="casual">Casual y Amigable</SelectItem>
                  <SelectItem value="motivacional">Motivacional</SelectItem>
                  <SelectItem value="urgente">Urgente/Scarcity</SelectItem>
                  <SelectItem value="educativo">Educativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Call to Action</label>
              <Input placeholder="Ej: Reserva tu demo gratuita" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={generateContent} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Bot className="w-4 h-4 mr-2" />
                )}
                Generar Contenido
              </Button>
              <Button variant="outline" className="w-full">
                <Palette className="w-4 h-4 mr-2" />
                Solo Imagen
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Panel de resultado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image className="w-5 h-5" />
                <span>Post Generado</span>
              </div>
              {selectedPlatform && (
                <Badge className={platforms.find(p => p.value === selectedPlatform)?.color || 'bg-gray-500'}>
                  {platforms.find(p => p.value === selectedPlatform)?.label}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Imagen generada */}
            {generatedImage && (
              <div className="relative">
                <img 
                  src={generatedImage} 
                  alt="Post generado por IA" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Palette className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Texto del post */}
            <div className="space-y-2">
              <div className="p-4 bg-muted rounded-lg min-h-[200px]">
                {generatedPost ? (
                  <p className="text-sm whitespace-pre-line">{generatedPost}</p>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Genera contenido para ver el resultado</p>
                    </div>
                  </div>
                )}
              </div>

              {generatedPost && (
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{generatedPost.length} caracteres</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>847</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>123</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="w-3 h-3" />
                      <span>45</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {generatedPost && (
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Todo
                </Button>
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Publicar Ahora
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historial de posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Posts Recientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                platform: 'instagram',
                preview: '🚀 ¡Descubre el poder de la IA...',
                engagement: '8.4%',
                reach: '12.5K',
                date: 'Hace 2h'
              },
              {
                platform: 'facebook', 
                preview: '🎯 ¿Quieres triplicar tus ventas...',
                engagement: '6.7%',
                reach: '8.9K',
                date: 'Hace 5h'
              },
              {
                platform: 'linkedin',
                preview: 'La IA está transformando...',
                engagement: '12.1%',
                reach: '5.2K',
                date: 'Ayer'
              }
            ].map((post, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={platforms.find(p => p.value === post.platform)?.color || 'bg-gray-500'}>
                    {platforms.find(p => p.value === post.platform)?.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <p className="text-sm mb-3 line-clamp-2">{post.preview}</p>
                <div className="flex justify-between text-xs">
                  <span>Engagement: {post.engagement}</span>
                  <span>Alcance: {post.reach}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PostGenerator = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <PostGeneratorContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default PostGenerator;
