
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Zap, 
  Play, 
  Pause, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical
} from 'lucide-react';

const workflows = [
  {
    id: 1,
    name: 'Lead Qualification Automation',
    status: 'active',
    executions: 1247,
    lastRun: '2024-07-03T10:30:00',
    success: 98.5,
    category: 'CRM'
  },
  {
    id: 2,
    name: 'WhatsApp Auto Response',
    status: 'active',
    executions: 3421,
    lastRun: '2024-07-03T11:15:00',
    success: 99.2,
    category: 'Communication'
  },
  {
    id: 3,
    name: 'Social Media Content Sync',
    status: 'paused',
    executions: 892,
    lastRun: '2024-07-02T15:20:00',
    success: 95.8,
    category: 'Marketing'
  },
  {
    id: 4,
    name: 'Email Marketing Campaign',
    status: 'error',
    executions: 156,
    lastRun: '2024-07-03T08:45:00',
    success: 87.3,
    category: 'Marketing'
  }
];

const Workflows = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Workflows N8N</h1>
              <p className="text-muted-foreground mt-1">
                Automatiza tus procesos de negocio con workflows inteligentes
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Workflow
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{workflows.length}</div>
                    <p className="text-sm text-muted-foreground">Workflows Activos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">5,716</div>
                    <p className="text-sm text-muted-foreground">Ejecuciones Hoy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">97.8%</div>
                    <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">2.3s</div>
                    <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lista de Workflows</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Buscar workflows..." 
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{workflow.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Categoría: {workflow.category}</span>
                          <span>Ejecuciones: {workflow.executions.toLocaleString()}</span>
                          <span>Éxito: {workflow.success}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(workflow.status)}
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status === 'active' ? 'Activo' : 
                         workflow.status === 'paused' ? 'Pausado' : 'Error'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Workflows;
