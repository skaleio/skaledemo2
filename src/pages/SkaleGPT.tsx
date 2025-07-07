
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Send, Bot, User, Zap, Copy, RefreshCw, Video, MessageCircle, Instagram, Calendar, TrendingUp, Sparkles, Target, Clock, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SkaleGPTContent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu Asistente de Crecimiento IA de Skale. Estoy aquí para ayudarte a optimizar tu negocio local con estrategias probadas y contenido que convierte.\n\n¿En qué puedo ayudarte hoy? Puedo crear guiones de reels, simular atención por WhatsApp, optimizar tu agenda, generar copies persuasivos y mucho más.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const skaleResponses = [
    "Perfecto para tu spa. Te recomiendo crear un reel mostrando una transformación de 30 segundos: 'Antes vs Después de nuestro tratamiento facial premium'. Hook: '¿Sabías que puedes rejuvenecer 5 años en 60 minutos?' + música trending + call to action claro: 'Agenda tu cita por WhatsApp'.",
    
    "Para manejar esa objeción en WhatsApp, usa esta respuesta: 'Entiendo tu preocupación por el precio 😊 Nuestros clientes dicen lo mismo al inicio, pero después nos agradecen porque [beneficio específico]. Te ofrezco esto: agenda una evaluación gratuita y si no quedas 100% convencida, no hay compromiso. ¿Qué día te viene mejor?'",
    
    "Tu historia destacada de 'Promociones' necesita estos elementos: 1) Oferta clara y limitada en tiempo, 2) Antes/después real de clientes, 3) Testimonios en video corto, 4) Call to action directo al WhatsApp. Usa colores de tu marca y mantén máximo 7 stories para que se vea todo.",
    
    "Para optimizar tu agenda: Bloquea lunes para planificación, martes a viernes atención 9-18hrs, sábados hasta 14hrs. Reserva 30 min entre citas para limpieza y preparación. Implementa confirmación automática 24hrs antes y recordatorio 2hrs antes por WhatsApp.",
    
    "Promoción perfecta para San Valentín: 'Paquete Parejas: 2x1 en tratamientos relajantes + botella de vino. Solo 20 cupos disponibles del 10-14 Feb.' Súbelo a stories, post en feed, y envía por WhatsApp a tu base de datos. Precio especial por reserva anticipada.",
    
    "Simulemos la atención: Cliente dice 'Hola, quisiera saber precios'. Tu respuesta: 'Hola [nombre]! 😊 Gracias por contactarnos. Para darte el mejor precio necesito conocer qué tratamiento te interesa. ¿Es para relajación, problema específico o mantenimiento? Así te armo un plan personalizado.'",
    
    "Este contenido funciona porque: 1) Hook fuerte en primeros 3 segundos ✅, 2) Transformación visual clara ✅, 3) Música trending ✅, 4) Call to action específico ✅. Para mejorarlo: agrega testimonial corto al final y precio/oferta especial.",
    
    "Copy para tu próximo post: 'POV: Llegas estresada del trabajo y en 1 hora sales como nueva ✨ Nuestro facial premium no solo mejora tu piel, transforma tu energía. [Emoji de corazón] ¿Cuándo fue la última vez que te diste este regalo? Agenda: [link WhatsApp]'"
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simular respuesta de Skale GPT
    setTimeout(() => {
      const skaleResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: skaleResponses[Math.floor(Math.random() * skaleResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, skaleResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu Asistente de Crecimiento IA de Skale. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }]);
  };

  const quickActions = [
    {
      title: 'Generar ideas de reel',
      icon: Video,
      prompt: 'Crea 3 ideas de reels para mi negocio que generen engagement y ventas',
      color: 'text-red-600'
    },
    {
      title: 'Simular atención por WhatsApp',
      icon: MessageCircle,
      prompt: 'Simula una conversación de WhatsApp donde un cliente pregunta precios y quiere negociar',
      color: 'text-green-600'
    },
    {
      title: 'Crear historia destacada',
      icon: Instagram,
      prompt: 'Ayúdame a crear una historia destacada de promociones que convierta',
      color: 'text-purple-600'
    },
    {
      title: 'Mejorar agenda semanal',
      icon: Calendar,
      prompt: 'Optimiza mi agenda semanal para maximizar ingresos y eficiencia',
      color: 'text-blue-600'
    },
    {
      title: 'Copy persuasivo',
      icon: Target,
      prompt: 'Redacta un copy persuasivo para promocionar mi servicio estrella',
      color: 'text-orange-600'
    },
    {
      title: 'Promoción estacional',
      icon: Gift,
      prompt: 'Crea una promoción especial para la próxima fecha importante',
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-lg animate-pulse">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Asistente de Crecimiento IA</h1>
            <p className="text-muted-foreground">
              Tu consultor experto en marketing local y automatización
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Sparkles className="w-3 h-3 mr-1" />
            Skale GPT Activo
          </Badge>
          <Button variant="outline" size="sm" onClick={clearChat}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Nueva Conversación
          </Button>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>Asistente Skale GPT</span>
          </CardTitle>
          <CardDescription>
            Entrenado exclusivamente con la metodología Skale para negocios locales
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-primary' : 'bg-gradient-primary'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Brain className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-4 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted border border-primary/20'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.role === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => navigator.clipboard.writeText(message.content)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="bg-muted rounded-lg p-4 border border-primary/20">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-sm text-muted-foreground ml-2">Analizando con metodología Skale...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Input Area */}
          <div className="p-4">
            <div className="flex space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe tu situación o pregunta sobre marketing local..."
                className="resize-none min-h-[60px]"
                rows={2}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isLoading}
                className="px-4 bg-gradient-primary hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Enter para enviar • Shift + Enter para nueva línea</span>
              <span>{input.length}/2000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 border-l-4 border-l-primary" 
            onClick={() => setInput(action.prompt)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className="text-sm font-medium">{action.title}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skale Info */}
      <Card className="bg-gradient-primary text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-lg font-bold">Potenciado por Skale.cl</h3>
          </div>
          <p className="text-sm opacity-90">
            Este asistente está entrenado con nuestra metodología exclusiva para negocios locales. 
            Obtén respuestas 10x más específicas y actionables que ChatGPT normal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const SkaleGPT = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <SkaleGPTContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default SkaleGPT;
