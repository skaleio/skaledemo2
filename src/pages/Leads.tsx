
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Phone, Mail, Calendar, Plus, Search, Filter } from 'lucide-react';

const Leads = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestión de Leads</h1>
              <p className="text-muted-foreground mt-1">
                Administra y da seguimiento a todos tus prospectos
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Lead
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">2,847</div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Por contactar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-sm text-muted-foreground">Con seguimiento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">24.8%</div>
                    <p className="text-sm text-muted-foreground">Tasa conversión</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Leads</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Buscar leads..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'María González', email: 'maria@email.com', phone: '+34 600 123 456', source: 'Facebook', status: 'Nuevo' },
                  { name: 'Carlos Ruiz', email: 'carlos@email.com', phone: '+34 600 234 567', source: 'Google', status: 'Contactado' },
                  { name: 'Ana López', email: 'ana@email.com', phone: '+34 600 345 678', source: 'Referido', status: 'Calificado' },
                  { name: 'Luis Martín', email: 'luis@email.com', phone: '+34 600 456 789', source: 'WhatsApp', status: 'Seguimiento' },
                ].map((lead, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{lead.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{lead.source}</Badge>
                      <Badge className={
                        lead.status === 'Nuevo' ? 'bg-blue-100 text-blue-600' :
                        lead.status === 'Contactado' ? 'bg-yellow-100 text-yellow-600' :
                        lead.status === 'Calificado' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }>
                        {lead.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Ver detalles
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

export default Leads;
