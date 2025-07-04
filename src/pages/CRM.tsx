
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  MessageCircle,
  Send,
  User,
  CheckCheck,
  Clock
} from 'lucide-react';

// Mock data para el pipeline de ventas
const pipelineStages = [
  { id: 'prospect', name: 'Prospectos', color: 'bg-gray-100', count: 23 },
  { id: 'contacted', name: 'Contactados', color: 'bg-blue-100', count: 18 },
  { id: 'demo', name: 'Demo Agendada', color: 'bg-yellow-100', count: 12 },
  { id: 'post-demo', name: 'Post-Demo', color: 'bg-orange-100', count: 8 },
  { id: 'closed', name: 'Cerrados', color: 'bg-green-100', count: 15 }
];

const mockLeads = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@email.com',
    phone: '+34 600 123 456',
    stage: 'prospect',
    value: 1200,
    source: 'facebook',
    lastContact: '2024-01-15',
    probability: 25,
    assignedTo: 'Juan Pérez',
    whatsappStatus: 'active',
    lastMessage: 'Hola, me interesa el servicio...',
    unreadMessages: 2
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos@email.com',
    phone: '+34 600 234 567',
    stage: 'contacted',
    value: 2500,
    source: 'google',
    lastContact: '2024-01-14',
    probability: 50,
    assignedTo: 'Ana López',
    whatsappStatus: 'active',
    lastMessage: '¿Podrían enviarme más información?',
    unreadMessages: 0
  },
  {
    id: '3',
    name: 'Laura Martín',
    email: 'laura@email.com',
    phone: '+34 600 345 678',
    stage: 'demo',
    value: 1800,
    source: 'referral',
    lastContact: '2024-01-13',
    probability: 75,
    assignedTo: 'Juan Pérez',
    whatsappStatus: 'active',
    lastMessage: 'Perfecto, quedamos entonces...',
    unreadMessages: 1
  }
];

const LeadCard = ({ lead }: { lead: any }) => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [message, setMessage] = useState('');

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'google': return 'bg-green-100 text-green-800';
      case 'referral': return 'bg-purple-100 text-purple-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    console.log(`Enviando mensaje a ${lead.name}: ${message}`);
    setMessage('');
    setShowWhatsApp(false);
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-semibold text-sm">{lead.name}</h4>
              {lead.unreadMessages > 0 && (
                <Badge className="bg-green-500 text-white text-xs px-1.5 py-0.5">
                  {lead.unreadMessages}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <Phone className="w-3 h-3" />
              <span>{lead.phone}</span>
            </div>
            {lead.lastMessage && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1 bg-green-50 p-2 rounded">
                <MessageCircle className="w-3 h-3 text-green-600" />
                <span className="truncate">{lead.lastMessage}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowWhatsApp(!showWhatsApp)}
              className="h-8 w-8 p-0"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-semibold text-sm">${lead.value}</span>
          </div>
          <Badge className={`text-xs ${getSourceColor(lead.source)}`}>
            {lead.source}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Probabilidad</span>
            <span className="font-medium">{lead.probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${lead.probability}%` }}
            ></div>
          </div>
        </div>

        {showWhatsApp && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">WhatsApp Activo</span>
              </div>
              <Textarea
                placeholder="Escribe tu mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex-1 h-8 text-xs"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Enviar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowWhatsApp(false)}
                  className="h-8 text-xs"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Asignado: {lead.assignedTo}</span>
            <span>{new Date(lead.lastContact).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CRMContent = () => {
  console.log('CRM Component: Renderizando CRM content');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CRM WhatsApp</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona tu pipeline de ventas con WhatsApp integrado
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Lead
        </Button>
      </div>

      {/* WhatsApp Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">156</div>
                <p className="text-sm text-muted-foreground">Conversaciones activas</p>
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
                <p className="text-sm text-muted-foreground">Mensajes pendientes</p>
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
                <p className="text-sm text-muted-foreground">Tasa de respuesta</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">$15,420</div>
                <p className="text-sm text-muted-foreground">Ventas por WhatsApp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar leads por nombre, email o teléfono..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Estado WhatsApp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="juan">Juan Pérez</SelectItem>
                <SelectItem value="ana">Ana López</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Kanban con WhatsApp */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[600px]">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="space-y-4">
            {/* Header de la columna */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    {stage.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {stage.count}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Cards de leads con WhatsApp */}
            <div className="space-y-3 min-h-[500px] pb-4">
              {mockLeads
                .filter(lead => lead.stage === stage.id)
                .map(lead => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              
              {/* Botón para agregar lead */}
              <Button 
                variant="outline" 
                className="w-full h-20 border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
              >
                <Plus className="w-5 h-5 text-primary" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CRM = () => {
  console.log('CRM Component: Iniciando componente CRM');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <CRMContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default CRM;
