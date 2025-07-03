
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Target, DollarSign, Users, Eye } from 'lucide-react';

const Metrics = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Métricas Ejecutivas</h1>
              <p className="text-muted-foreground mt-1">
                Análisis detallado del rendimiento de tu negocio
              </p>
            </div>
            <Badge variant="outline">Tiempo Real</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <Badge className="bg-green-100 text-green-600">+12%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,231</div>
                <p className="text-sm text-muted-foreground">Ingresos del mes</p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Users className="w-5 h-5 text-purple-600" />
                  <Badge className="bg-blue-100 text-blue-600">+8%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-sm text-muted-foreground">Leads totales</p>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Target className="w-5 h-5 text-green-600" />
                  <Badge className="bg-green-100 text-green-600">+3.2%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.8%</div>
                <p className="text-sm text-muted-foreground">Tasa conversión</p>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Eye className="w-5 h-5 text-orange-600" />
                  <Badge className="bg-yellow-100 text-yellow-600">+15%</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.4K</div>
                <p className="text-sm text-muted-foreground">Visualizaciones</p>
                <Progress value={90} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Canal</CardTitle>
                <CardDescription>Comparativa de fuentes de leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Facebook Ads', 'Google Ads', 'WhatsApp', 'Referidos'].map((channel, index) => (
                    <div key={channel} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{channel}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={[75, 60, 45, 30][index]} className="w-20" />
                        <span className="text-sm text-muted-foreground">{[75, 60, 45, 30][index]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI por Campaña</CardTitle>
                <CardDescription>Retorno de inversión publicitaria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Campaña Q1', 'Campaña Black Friday', 'Campaña Navidad', 'Campaña Verano'].map((campaign, index) => (
                    <div key={campaign} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{campaign}</p>
                        <p className="text-xs text-muted-foreground">ROI: {[4.2, 3.8, 5.1, 2.9][index]}x</p>
                      </div>
                      <Badge variant={[4.2, 3.8, 5.1, 2.9][index] > 4 ? 'default' : 'secondary'}>
                        {[4.2, 3.8, 5.1, 2.9][index] > 4 ? 'Excelente' : 'Bueno'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Metrics;
