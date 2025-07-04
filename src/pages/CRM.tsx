
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Plus,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { useBusiness } from '@/contexts/BusinessContext';

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
    assignedTo: 'Juan Pérez'
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
    assignedTo: 'Ana López'
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
    assignedTo: 'Juan Pérez'
  }
];

const LeadCard = ({ lead }: { lead: any }) => {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'facebook': return 'bg-blue-100 text-blue-800';
      case 'google': return 'bg-green-100 text-green-800';
      case 'referral': return 'bg-purple-100 text-purple-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-3 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{lead.name}</h4>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <Phone className="w-3 h-3" />
              <span>{lead.phone}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
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

const CRM = () => {
  const { currentBusiness } = useBusiness();

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Pipeline de Ventas</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus leads y oportunidades de venta
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Lead
            </Button>
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
                    <SelectValue placeholder="Fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las fuentes</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="referral">Referidos</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
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

          {/* Pipeline Kanban */}
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

                {/* Cards de leads */}
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
      </MainLayout>
    </BusinessProvider>
  );
};

export default CRM;
