
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Phone, Clock, Send, User, CheckCheck } from 'lucide-react';

const mockConversations = [
  {
    id: 1,
    name: 'María González',
    lastMessage: 'Hola, me interesa el servicio...',
    time: '10:30',
    unread: 2,
    status: 'online'
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    lastMessage: '¿Podrían enviarme más información?',
    time: '09:45',
    unread: 0,
    status: 'offline'
  },
  {
    id: 3,
    name: 'Ana López',
    lastMessage: 'Perfecto, quedamos entonces...',
    time: '08:15',
    unread: 1,
    status: 'online'
  }
];

const WhatsApp = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">WhatsApp Business</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona todas tus conversaciones desde un solo lugar
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Conectado
              </Badge>
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                Nueva Conversación
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Conversaciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Pendientes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCheck className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-sm text-muted-foreground">Tasa respuesta</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">3.2min</div>
                    <p className="text-sm text-muted-foreground">Tiempo resp.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Conversaciones Activas</CardTitle>
                <div className="flex items-center justify-between">
                  <Input placeholder="Buscar conversaciones..." className="max-w-sm" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {mockConversations.map((conversation) => (
                    <div key={conversation.id} className="flex items-center p-4 hover:bg-muted/50 cursor-pointer border-b">
                      <div className="relative">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        {conversation.status === 'online' && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{conversation.name}</p>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-green-500 text-white text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>María González</span>
                  <Badge className="bg-green-100 text-green-600 text-xs">Online</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 h-96 overflow-y-auto p-4 bg-muted/20 rounded-lg">
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                      <p className="text-sm">Hola, me interesa el servicio que ofrecen</p>
                      <span className="text-xs text-muted-foreground">10:25</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-green-500 text-white p-3 rounded-lg shadow-sm max-w-xs">
                      <p className="text-sm">¡Hola María! Gracias por contactarnos. ¿En qué podemos ayudarte?</p>
                      <span className="text-xs opacity-70">10:26</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                      <p className="text-sm">Necesito más información sobre los precios</p>
                      <span className="text-xs text-muted-foreground">10:30</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Input placeholder="Escribe tu mensaje..." className="flex-1" />
                  <Button size="sm">
                    <Send className="w-4 h-4" />
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

export default WhatsApp;
