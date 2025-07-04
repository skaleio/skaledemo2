
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Wand2, Copy, Send } from 'lucide-react';

const PostGenerator = () => {
  console.log('PostGenerator Component: Renderizando generador de posts');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Generador de Posts</h1>
              <p className="text-muted-foreground mt-1">
                Crea contenido automático con IA para tus redes sociales
              </p>
            </div>
            <Button>
              <Bot className="w-4 h-4 mr-2" />
              Generar Post
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="w-5 h-5" />
                  <span>Generador IA</span>
                </CardTitle>
                <CardDescription>Describe el tema y deja que la IA cree el contenido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Describe el tema del post..." 
                  className="min-h-[100px]"
                />
                <Button className="w-full">
                  <Bot className="w-4 h-4 mr-2" />
                  Generar Contenido
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post Generado</CardTitle>
                <CardDescription>Resultado de la IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg min-h-[100px]">
                  <p className="text-sm">
                    🚀 ¿Sabías que el 80% de las empresas que usan IA aumentan su productividad?
                    
                    En nuestra empresa, hemos implementado soluciones de inteligencia artificial que nos permiten:
                    ✅ Automatizar procesos repetitivos
                    ✅ Mejorar la atención al cliente 
                    ✅ Analizar datos en tiempo real
                    
                    #IA #Productividad #Innovación #Empresa
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                  <Button className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Publicar
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

export default PostGenerator;
