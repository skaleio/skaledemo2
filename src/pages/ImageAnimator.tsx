import React, { useState, useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploadZone } from '@/components/image-animator/ImageUploadZone';
import { AnimationQueue } from '@/components/image-animator/AnimationQueue';
import { AnimationHistory } from '@/components/image-animator/AnimationHistory';
import { ExampleGallery } from '@/components/image-animator/ExampleGallery';
import { ConfigurationModal } from '@/components/image-animator/ConfigurationModal';
import { CreditsDisplay } from '@/components/image-animator/CreditsDisplay';
import { useImageAnimator } from '@/hooks/useImageAnimator';
import { Sparkles, Clock, Zap } from 'lucide-react';

const ImageAnimator = () => {
  const {
    animations,
    credits,
    isProcessing,
    uploadImage,
    processAnimation,
    getAnimationHistory
  } = useImageAnimator();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    setSelectedImage(file);
    uploadImage(file);
  }, [uploadImage]);

  const handleStartAnimation = useCallback(() => {
    if (selectedImage) {
      setShowConfig(true);
    }
  }, [selectedImage]);

  const handleConfigSubmit = useCallback((config: any) => {
    if (selectedImage) {
      processAnimation(selectedImage, config);
      setShowConfig(false);
      setSelectedImage(null);
    }
  }, [selectedImage, processAnimation]);

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="container mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Animador de Imágenes</h1>
                <p className="text-muted-foreground">
                  Transforma tus imágenes estáticas en videos animados usando IA
                </p>
              </div>
            </div>
            <CreditsDisplay credits={credits} />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="animator" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="animator" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Animador</span>
              </TabsTrigger>
              <TabsTrigger value="queue" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Cola de Proceso</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Historial</span>
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Ejemplos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="animator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Nueva Animación</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUploadZone
                    onImageUpload={handleImageUpload}
                    selectedImage={selectedImage}
                    onStartAnimation={handleStartAnimation}
                    isProcessing={isProcessing}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="queue">
              <AnimationQueue animations={animations.filter(a => a.status !== 'completed')} />
            </TabsContent>

            <TabsContent value="history">
              <AnimationHistory animations={animations.filter(a => a.status === 'completed')} />
            </TabsContent>

            <TabsContent value="examples">
              <ExampleGallery />
            </TabsContent>
          </Tabs>

          {/* Configuration Modal */}
          <ConfigurationModal
            open={showConfig}
            onOpenChange={setShowConfig}
            onSubmit={handleConfigSubmit}
            selectedImage={selectedImage}
          />
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default ImageAnimator;