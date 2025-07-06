
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Clock
} from 'lucide-react';

const voices = [
  { id: 1, name: 'Sarah Professional', language: 'Español', type: 'Femenina', status: 'active' },
  { id: 2, name: 'Carlos Business', language: 'Español', type: 'Masculina', status: 'active' },
  { id: 3, name: 'Ana Friendly', language: 'Español', type: 'Femenina', status: 'testing' },
  { id: 4, name: 'Miguel Support', language: 'Español', type: 'Masculina', status: 'inactive' },
];

const Retell = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);

  const handlePlayVoice = (voiceId: number) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simular reproducción por 3 segundos
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

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Retell AI Voices</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona y prueba voces de IA para tus llamadas automatizadas
              </p>
            </div>
            {!isConnected ? (
              <Button onClick={() => setIsConnected(true)}>
                <Zap className="w-4 h-4 mr-2" />
                Conectar Retell AI
              </Button>
            ) : (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Voz
              </Button>
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
                  <label className="text-sm font-medium">API Key de Retell</label>
                  <Input placeholder="Ingresa tu API Key de Retell AI" type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Webhook URL (Opcional)</label>
                  <Input placeholder="https://tu-webhook.com/retell" />
                </div>
                <Button className="w-full" onClick={() => setIsConnected(true)}>
                  Conectar Retell AI
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-sm text-muted-foreground">Llamadas Hoy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">4.2min</div>
                        <p className="text-sm text-muted-foreground">Duración Promedio</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Mic className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold">{voices.length}</div>
                        <p className="text-sm text-muted-foreground">Voces Activas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold">87.3%</div>
                        <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Mis Voces de IA</CardTitle>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {voices.map((voice) => (
                      <div key={voice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mic className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{voice.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{voice.language}</span>
                              <span>Voz {voice.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePlayVoice(voice.id)}
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
                          <Badge className={getStatusColor(voice.status)}>
                            {voice.status === 'active' ? 'Activa' : 
                             voice.status === 'testing' ? 'Probando' : 'Inactiva'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Retell;
