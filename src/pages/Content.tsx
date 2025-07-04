
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Eye, Plus } from 'lucide-react';

const Content = () => {
  console.log('Content Component: Renderizando calendario de contenido');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Calendario de Contenido</h1>
              <p className="text-muted-foreground mt-1">
                Planifica y gestiona tu contenido en redes sociales
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Post
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-sm text-muted-foreground">Posts Programados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-sm text-muted-foreground">Para Hoy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Publicados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">12.4K</div>
                    <p className="text-sm text-muted-foreground">Alcance Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calendario de Publicaciones</CardTitle>
              <CardDescription>Vista mensual de contenido programado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                  <div key={day} className="text-center font-semibold p-2 bg-muted rounded">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="h-20 border rounded p-2 hover:bg-muted/50">
                    <div className="text-sm font-medium">{(i % 31) + 1}</div>
                    {i % 3 === 0 && (
                      <Badge className="text-xs bg-blue-100 text-blue-600">Post</Badge>
                    )}
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

export default Content;
