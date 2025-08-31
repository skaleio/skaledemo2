import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Download, RefreshCw, Settings, Image as ImageIcon, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [imageSize, setImageSize] = useState('1024x1024');
  const [numImages, setNumImages] = useState('1');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor ingresa una descripción para generar la imagen');
      return;
    }

    setIsGenerating(true);
    
    // Simulate image generation - replace with actual API call
    setTimeout(() => {
      const mockImages = Array.from({ length: parseInt(numImages) }, (_, i) => 
        `https://picsum.photos/512/512?random=${Date.now() + i}`
      );
      setGeneratedImages(prev => [...mockImages, ...prev]);
      setIsGenerating(false);
      toast.success(`${numImages} imagen(es) generada(s) exitosamente`);
    }, 3000);
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Imagen descargada');
  };

  const styles = [
    { value: 'realistic', label: 'Realista', description: 'Imágenes fotorrealistas' },
    { value: 'artistic', label: 'Artístico', description: 'Estilo artístico y creativo' },
    { value: 'anime', label: 'Anime', description: 'Estilo anime/manga' },
    { value: 'digital-art', label: 'Arte Digital', description: 'Arte digital moderno' },
    { value: 'oil-painting', label: 'Óleo', description: 'Estilo pintura al óleo' },
    { value: 'watercolor', label: 'Acuarela', description: 'Estilo acuarela suave' }
  ];

  const sizes = [
    { value: '512x512', label: '512×512', description: 'Cuadrado pequeño' },
    { value: '768x768', label: '768×768', description: 'Cuadrado mediano' },
    { value: '1024x1024', label: '1024×1024', description: 'Cuadrado grande' },
    { value: '1024x768', label: '1024×768', description: 'Horizontal' },
    { value: '768x1024', label: '768×1024', description: 'Vertical' }
  ];

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Generador de Imágenes IA</h1>
                <p className="text-muted-foreground">
                  Crea imágenes únicas con inteligencia artificial
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Sparkles className="w-4 h-4 mr-1" />
              Powered by AI
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Generation Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Configuración</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Prompt Input */}
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Descripción de la imagen</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe la imagen que quieres generar..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Style Selection */}
                  <div className="space-y-2">
                    <Label>Estilo</Label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            <div>
                              <div className="font-medium">{style.label}</div>
                              <div className="text-sm text-muted-foreground">{style.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Image Size */}
                  <div className="space-y-2">
                    <Label>Tamaño</Label>
                    <Select value={imageSize} onValueChange={setImageSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            <div>
                              <div className="font-medium">{size.label}</div>
                              <div className="text-sm text-muted-foreground">{size.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Images */}
                  <div className="space-y-2">
                    <Label htmlFor="numImages">Número de imágenes</Label>
                    <Select value={numImages} onValueChange={setNumImages}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 imagen</SelectItem>
                        <SelectItem value="2">2 imágenes</SelectItem>
                        <SelectItem value="4">4 imágenes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generar Imagen
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Prompts */}
              <Card>
                <CardHeader>
                  <CardTitle>Prompts Sugeridos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    'Un paisaje futurista con ciudades flotantes',
                    'Retrato de una persona elegante en estilo vintage',
                    'Un gato mágico con alas de mariposa',
                    'Paisaje natural con aurora boreal',
                    'Diseño de logo minimalista y moderno'
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto py-2 px-3"
                      onClick={() => setPrompt(suggestion)}
                    >
                      <span className="text-sm line-clamp-2">{suggestion}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5" />
                    <span>Imágenes Generadas</span>
                    {generatedImages.length > 0 && (
                      <Badge variant="secondary">{generatedImages.length}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 text-center">
                      <div className="p-4 bg-muted rounded-full mb-4">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No hay imágenes generadas</h3>
                      <p className="text-muted-foreground mb-4">
                        Escribe una descripción y genera tu primera imagen
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedImages.map((imageUrl, index) => (
                        <div key={index} className="group relative">
                          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                            <img
                              src={imageUrl}
                              alt={`Generated image ${index + 1}`}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              onClick={() => handleDownload(imageUrl, index)}
                              variant="secondary"
                              size="sm"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default ImageGenerator;