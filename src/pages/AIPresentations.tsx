import React, { useState, memo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Brain,
  FileText,
  Download,
  Share,
  Edit,
  Filter,
  Search,
  Calendar,
  Folder,
  Sparkles,
  Presentation,
  Eye,
  Plus,
  Send,
  Copy,
  RefreshCw,
  User,
  BarChart,
  Target,
  Zap
} from 'lucide-react';
import { useBusiness } from '@/contexts/BusinessContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'presentation';
  presentationData?: {
    name: string;
    style: string;
    fileUrl: string;
    downloadUrl: string;
  };
}

interface Presentation {
  id: string;
  name: string;
  prompt: string;
  style: string;
  fileUrl: string;
  createdAt: string;
  thumbnail?: string;
  category?: string;
}

// Mock data para demostración
const mockPresentations: Presentation[] = [
  {
    id: '1',
    name: 'Propuesta Redes Sociales - Clínica Dental',
    prompt: 'Haz una presentación para una propuesta de redes sociales para clínicas dentales',
    style: 'corporativo',
    fileUrl: '/presentations/clinica-dental.pdf',
    createdAt: '2024-01-15',
    category: 'Propuestas'
  },
  {
    id: '2', 
    name: 'Plan Marketing Digital - Spa',
    prompt: 'Crear presentación de plan de marketing digital para spa y centro de bienestar',
    style: 'minimalista',
    fileUrl: '/presentations/spa-marketing.pdf',
    createdAt: '2024-01-10',
    category: 'Marketing'
  }
];

const styles = [
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'moderno', label: 'Moderno' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'oscuro', label: 'Oscuro' },
  { value: 'creativo', label: 'Creativo' }
];

// Respuestas simuladas de GenSpark
const genSparkResponses = [
  {
    text: "Perfecto! He generado una presentación profesional para tu spa. Incluye 15 slides con: portada con branding, análisis de mercado local, servicios destacados, paquetes promocionales, testimonios de clientes, y cronograma de implementación. El diseño minimalista usa colores relajantes y tipografía elegante.",
    presentation: {
      name: "Propuesta Marketing Digital - Spa Wellness",
      style: "minimalista",
      fileUrl: "/presentations/spa-wellness-proposal.pdf",
      downloadUrl: "https://drive.google.com/spa-presentation"
    }
  },
  {
    text: "¡Listo! Tu presentación para clínica dental está completa. Contiene 18 slides con: introducción profesional, casos antes/después, servicios odontológicos, plan de contenido mensual, estrategia de redes sociales, métricas de ROI esperado y presupuesto detallado.",
    presentation: {
      name: "Plan Marketing Digital - Clínica Dental",
      style: "corporativo",
      fileUrl: "/presentations/clinica-dental-marketing.pdf",
      downloadUrl: "https://drive.google.com/dental-presentation"
    }
  },
  {
    text: "Presentación generada exitosamente! He creado un pitch deck moderno para tu automotora con 20 slides: análisis del mercado automotriz, propuesta de valor única, casos de éxito, estrategia digital integral, plan de contenido y proyecciones de ventas.",
    presentation: {
      name: "Pitch Deck - Automotora Premium",
      style: "moderno",
      fileUrl: "/presentations/automotora-pitch.pdf",
      downloadUrl: "https://drive.google.com/auto-presentation"
    }
  }
];

const AIPresentations = memo(() => {
  const { currentBusiness } = useBusiness();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu Generador de Presentaciones IA de GenSpark. Estoy aquí para crear presentaciones profesionales y persuasivas para tu negocio.\n\n¿Qué tipo de presentación necesitas hoy? Puedo crear propuestas comerciales, planes de marketing, pitch decks, presentaciones corporativas y mucho más.',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [presentations, setPresentations] = useState<Presentation[]>(mockPresentations);
  const [input, setInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('corporativo');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Simular conexión a GenSpark API
    setTimeout(() => {
      const randomResponse = genSparkResponses[Math.floor(Math.random() * genSparkResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse.text,
        timestamp: new Date(),
        type: 'presentation',
        presentationData: randomResponse.presentation
      };

      // Agregar nueva presentación a la biblioteca
      const newPresentation: Presentation = {
        id: Date.now().toString(),
        name: randomResponse.presentation.name,
        prompt: userMessage.content,
        style: randomResponse.presentation.style,
        fileUrl: randomResponse.presentation.fileUrl,
        createdAt: new Date().toISOString().split('T')[0],
        category: 'Propuestas'
      };

      setPresentations(prev => [newPresentation, ...prev]);
      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 3000);
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
      content: '¡Hola! 👋 Soy tu Generador de Presentaciones IA de GenSpark. ¿Qué presentación necesitas crear hoy?',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  const filteredPresentations = presentations.filter(presentation => {
    const matchesSearch = presentation.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || presentation.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(presentations.map(p => p.category).filter(Boolean)));

  const quickActions = [
    {
      title: 'Propuesta Marketing Digital',
      icon: Target,
      prompt: 'Crea una propuesta completa de marketing digital para mi spa/clínica, incluyendo estrategia de redes sociales, presupuesto y cronograma de 6 meses',
      color: 'text-blue-600'
    },
    {
      title: 'Pitch Deck Empresarial',
      icon: BarChart,
      prompt: 'Genera un pitch deck profesional para presentar mi negocio a inversionistas, incluyendo modelo de negocio, mercado objetivo y proyecciones financieras',
      color: 'text-green-600'
    },
    {
      title: 'Plan de Servicios',
      icon: Zap,
      prompt: 'Diseña una presentación de mis servicios principales con precios, beneficios y casos de éxito para convencer nuevos clientes',
      color: 'text-purple-600'
    },
    {
      title: 'Reporte Anual',
      icon: FileText,
      prompt: 'Crea un reporte anual ejecutivo con métricas de crecimiento, logros principales y objetivos para el próximo año',
      color: 'text-orange-600'
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg animate-pulse">
              <Presentation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Generador de Presentaciones IA</h1>
              <p className="text-muted-foreground">
                Crea presentaciones profesionales con inteligencia artificial
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Sparkles className="w-3 h-3 mr-1" />
              GenSpark Conectado
            </Badge>
            <Button variant="outline" size="sm" onClick={clearChat}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Nueva Conversación
            </Button>
          </div>
        </div>

        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Generador IA
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Biblioteca
            </TabsTrigger>
          </TabsList>

          {/* Generador de Presentaciones */}
          <TabsContent value="generator" className="space-y-6">
            {/* Chat Interface */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Presentation className="w-5 h-5 text-primary" />
                  <span>GenSpark Presentations</span>
                  <div className="flex items-center space-x-2 ml-auto">
                    <span className="text-sm text-muted-foreground">Estilo:</span>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
                <CardDescription>
                  Conectado a GenSpark API - Generación automática de presentaciones profesionales
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
                              <Presentation className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-lg p-4 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted border border-primary/20'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            
                            {/* Mostrar datos de presentación si existe */}
                            {message.type === 'presentation' && message.presentationData && (
                              <div className="mt-4 p-3 bg-background rounded-lg border">
                                <div className="flex items-center gap-2 mb-2">
                                  <FileText className="w-4 h-4 text-primary" />
                                  <span className="font-medium text-sm">{message.presentationData.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                  <Badge variant="outline" className="text-xs">
                                    {message.presentationData.style}
                                  </Badge>
                                  <span>PDF generado</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="text-xs h-7">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Ver
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs h-7">
                                    <Download className="w-3 h-3 mr-1" />
                                    Descargar
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs h-7">
                                    <Share className="w-3 h-3 mr-1" />
                                    Compartir
                                  </Button>
                                </div>
                              </div>
                            )}
                            
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
                    
                    {isGenerating && (
                      <div className="flex justify-start">
                        <div className="flex space-x-3 max-w-[85%]">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                            <Presentation className="w-4 h-4 text-white animate-pulse" />
                          </div>
                          <div className="bg-muted rounded-lg p-4 border border-primary/20">
                            <div className="flex space-x-2 items-center">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <span className="text-sm text-muted-foreground ml-2">Generando con GenSpark API...</span>
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
                      placeholder="Describe qué presentación necesitas crear... Ej: 'Crea una propuesta de marketing digital para mi spa'"
                      className="resize-none min-h-[60px]"
                      rows={2}
                      disabled={isGenerating}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!input.trim() || isGenerating}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* GenSpark Info */}
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Potenciado por GenSpark API</h3>
                </div>
                <p className="text-sm opacity-90">
                  Conexión directa con GenSpark para generar presentaciones profesionales en tiempo real. 
                  Cada presentación se adapta automáticamente a tu industria y objetivos comerciales.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Biblioteca de Presentaciones */}
          <TabsContent value="library" className="space-y-6">
            {/* Filtros y búsqueda */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar presentaciones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <SelectValue placeholder="Filtrar por categoría" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de presentaciones */}
            <div className="grid gap-4">
              {filteredPresentations.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay presentaciones</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterCategory 
                        ? "No se encontraron presentaciones con los filtros aplicados"
                        : "Crea tu primera presentación usando el generador IA"
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredPresentations.map((presentation) => (
                  <Card key={presentation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{presentation.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(presentation.createdAt).toLocaleDateString()}
                                {presentation.category && (
                                  <>
                                    <span>•</span>
                                    <Badge variant="outline" className="text-xs">
                                      {presentation.category}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            <strong>Prompt:</strong> {presentation.prompt}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              Estilo: {presentation.style}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Vista previa
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Descargar
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Share className="w-4 h-4" />
                            Compartir
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
});

export default AIPresentations;