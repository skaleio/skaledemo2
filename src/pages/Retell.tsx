
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, 
  Mic, 
  Play, 
  Pause, 
  Settings,
  Plus,
  Volume2,
  Zap,
  Users,
  Clock,
  Bot,
  MessageSquare,
  PhoneCall,
  Database,
  BarChart3,
  Upload,
  Download,
  Trash2,
  Edit,
  Copy
} from 'lucide-react';

const voiceLibrary = [
  { id: 1, name: 'Sarah Professional', language: 'Español', type: 'Femenina', accent: 'España', status: 'active', usage: 1247, rating: 4.8 },
  { id: 2, name: 'Carlos Business', language: 'Español', type: 'Masculina', accent: 'México', status: 'active', usage: 856, rating: 4.6 },
  { id: 3, name: 'Ana Friendly', language: 'Español', type: 'Femenina', accent: 'Argentina', status: 'testing', usage: 234, rating: 4.9 },
  { id: 4, name: 'Miguel Support', language: 'Español', type: 'Masculina', accent: 'Colombia', status: 'inactive', usage: 0, rating: 0 },
  { id: 5, name: 'Elena Premium', language: 'Español', type: 'Femenina', accent: 'España', status: 'active', usage: 578, rating: 4.7 },
  { id: 6, name: 'Diego Tech', language: 'Español', type: 'Masculina', accent: 'Chile', status: 'testing', usage: 123, rating: 4.5 },
];

const campaignTemplates = [
  { id: 1, name: 'Seguimiento de Ventas', type: 'Ventas', calls: 1247, conversion: '15.8%', status: 'Activa' },
  { id: 2, name: 'Encuesta de Satisfacción', type: 'Encuesta', calls: 856, conversion: '78.3%', status: 'Activa' },
  { id: 3, name: 'Recordatorio de Cita', type: 'Recordatorio', calls: 2341, conversion: '92.1%', status: 'Activa' },
  { id: 4, name: 'Oferta Especial', type: 'Marketing', calls: 567, conversion: '23.4%', status: 'Pausada' },
];

const RetellContent = () => {
  const { businessData } = useBusiness();
  const [isConnected, setIsConnected] = useState(true);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);

  const retellData = businessData?.retell;

  const handlePlayVoice = (voiceId: number) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!retellData) return <div>Cargando datos de Retell...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Retell AI - Centro de Control</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona voces de IA, campañas telefónicas y configuraciones avanzadas
          </p>
        </div>
        {!isConnected ? (
          <Button onClick={() => setIsConnected(true)}>
            <Zap className="w-4 h-4 mr-2" />
            Conectar Retell AI
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Campaña
            </Button>
          </div>
        )}
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Conecta Retell AI</CardTitle>
            <CardDescription>
              Integra Retell AI para gestionar voces y llamadas automatizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="retell-api">API Key de Retell</Label>
              <Input id="retell-api" placeholder="Ingresa tu API Key de Retell AI" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL (Opcional)</Label>
              <Input id="webhook-url" placeholder="https://tu-webhook.com/retell" />
            </div>
            <Button className="w-full" onClick={() => setIsConnected(true)}>
              Conectar Retell AI
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-muted-foreground">Llamadas Hoy</span>
                    </div>
                    <div className="text-2xl font-bold">{retellData.calls.toLocaleString()}</div>
                    <div className="text-xs text-green-600">+15% vs ayer</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: 1,500</div>
                    <Progress value={(retellData.calls / 1500) * 100} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-muted-foreground">Duración Promedio</span>
                    </div>
                    <div className="text-2xl font-bold">{retellData.duration}</div>
                    <div className="text-xs text-blue-600">Óptimo</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: 5min</div>
                    <Progress value={84} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Mic className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-muted-foreground">Voces Activas</span>
                    </div>
                    <div className="text-2xl font-bold">{retellData.voices}</div>
                    <div className="text-xs text-purple-600">2 en testing</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Premium</div>
                    <Progress value={100} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-muted-foreground">Tasa de Éxito</span>
                    </div>
                    <div className="text-2xl font-bold">{retellData.successRate}</div>
                    <div className="text-xs text-green-600">+2.1% este mes</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: 90%</div>
                    <Progress value={87} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="voices" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="voices">Biblioteca de Voces</TabsTrigger>
              <TabsTrigger value="campaigns">Campañas Masivas</TabsTrigger>
              <TabsTrigger value="agent">Configuración Agente</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Biblioteca de Voces */}
            <TabsContent value="voices" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Mic className="w-5 h-5" />
                      <span>Biblioteca de Voces IA</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Importar Voz
                      </Button>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Voz Personalizada
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {voiceLibrary.map((voice) => (
                      <div 
                        key={voice.id} 
                        className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                          selectedVoice === voice.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Mic className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{voice.name}</h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <span>{voice.language}</span>
                                <span>•</span>
                                <span>{voice.type}</span>
                                <span>•</span>
                                <span>{voice.accent}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(voice.status)}>
                              {voice.status === 'active' ? 'Activa' : 
                               voice.status === 'testing' ? 'Testing' : 'Inactiva'}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Uso total:</span>
                            <span className="font-medium">{voice.usage.toLocaleString()} llamadas</span>
                          </div>
                          {voice.rating > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Rating:</span>
                              <div className="flex items-center space-x-1">
                                <span className="font-medium">{voice.rating}</span>
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3 h-3 rounded-full ${
                                        i < Math.floor(voice.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayVoice(voice.id);
                            }}
                            className="flex items-center space-x-2"
                          >
                            {playingVoice === voice.id ? (
                              <>
                                <Pause className="w-4 h-4" />
                                <span>Pausar</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                <span>Probar</span>
                              </>
                            )}
                          </Button>
                          
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Campañas Masivas */}
            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <PhoneCall className="w-5 h-5" />
                      <span>Campañas de Llamadas Masivas</span>
                    </CardTitle>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Campaña
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaignTemplates.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <PhoneCall className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{campaign.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Tipo: {campaign.type}</span>
                              <span>•</span>
                              <span>{campaign.calls.toLocaleString()} llamadas</span>
                              <span>•</span>
                              <span>Conversión: {campaign.conversion}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={campaign.status === 'Activa' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Configurar
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Ejecutar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración del Agente */}
            <TabsContent value="agent" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5" />
                      <span>Prompt del Agente</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-name">Nombre del Agente</Label>
                      <Input id="agent-name" defaultValue="Asistente SKALE" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-role">Rol del Agente</Label>
                      <Select defaultValue="sales">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Agente de Ventas</SelectItem>
                          <SelectItem value="support">Soporte Técnico</SelectItem>
                          <SelectItem value="survey">Encuestador</SelectItem>
                          <SelectItem value="reminder">Recordatorios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="system-prompt">Prompt del Sistema</Label>
                      <Textarea 
                        id="system-prompt" 
                        rows={8}
                        defaultValue="Eres un asistente de ventas profesional y amigable. Tu objetivo es ayudar a los clientes potenciales a conocer nuestros productos y servicios. Mantén un tono conversacional pero profesional. Siempre escucha activamente y haz preguntas relevantes para entender las necesidades del cliente."
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-interruptions">Permitir Interrupciones</Label>
                      <Switch id="enable-interruptions" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Configuración Avanzada</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="response-time">Tiempo de Respuesta (ms)</Label>
                      <Input id="response-time" type="number" defaultValue="800" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-duration">Duración Máxima (min)</Label>
                      <Input id="max-duration" type="number" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language-model">Modelo de Lenguaje</Label>
                      <Select defaultValue="gpt-4">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (Recomendado)</SelectItem>
                          <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sentiment-analysis">Análisis de Sentimientos</Label>
                        <Switch id="sentiment-analysis" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="call-recording">Grabación de Llamadas</Label>
                        <Switch id="call-recording" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="transcription">Transcripción en Tiempo Real</Label>
                        <Switch id="transcription" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Métricas de Rendimiento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tasa de Conexión</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={78} className="w-20" />
                          <span className="text-sm font-bold">78%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tasa de Conversión</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={23} className="w-20" />
                          <span className="text-sm font-bold">23%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Satisfacción Cliente</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={91} className="w-20" />
                          <span className="text-sm font-bold">91%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Eficiencia de Voz</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={87} className="w-20" />
                          <span className="text-sm font-bold">87%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Database className="w-5 h-5" />
                      <span>Datos de Uso</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total de Llamadas:</span>
                        <span className="font-medium">{retellData.calls.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Minutos Consumidos:</span>
                        <span className="font-medium">5,234 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Costo Total:</span>
                        <span className="font-medium">$156.78</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ahorro vs Humano:</span>
                        <span className="font-medium text-green-600">$2,341.20</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

const Retell = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <RetellContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Retell;
