
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SalesReports = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Reportes de Ventas</h1>
              <p className="text-muted-foreground mt-1">
                Análisis detallado del rendimiento comercial
              </p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar Reporte
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">₹45,231</div>
                    <p className="text-sm text-muted-foreground">Ventas mes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">24.8%</div>
                    <p className="text-sm text-muted-foreground">Crecimiento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Oportunidades</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-sm text-muted-foreground">Cierres mes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Vendedor</CardTitle>
                <CardDescription>Comparativa del equipo de ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Juan Pérez', sales: 25000, target: 30000, progress: 83 },
                    { name: 'Ana López', sales: 22000, target: 25000, progress: 88 },
                    { name: 'Carlos Ruiz', sales: 18000, target: 20000, progress: 90 },
                    { name: 'María García', sales: 15000, target: 18000, progress: 83 }
                  ].map((seller, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{seller.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ₹{seller.sales.toLocaleString()} / ₹{seller.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={seller.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{seller.progress}% del objetivo</span>
                        <Badge variant={seller.progress >= 85 ? 'default' : 'secondary'}>
                          {seller.progress >= 85 ? 'Excelente' : 'En progreso'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ventas por Período</CardTitle>
                <CardDescription>Evolución mensual de las ventas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: 'Enero', amount: 35000, growth: 12 },
                    { month: 'Febrero', amount: 42000, growth: 20 },
                    { month: 'Marzo', amount: 38000, growth: -9 },
                    { month: 'Abril', amount: 45000, growth: 18 }
                  ].map((period, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{period.month}</p>
                        <p className="text-2xl font-bold">₹{period.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${period.growth > 0 ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`font-medium ${period.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {period.growth > 0 ? '+' : ''}{period.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversión por Fuente</CardTitle>
              <CardDescription>Análisis de efectividad por canal de adquisición</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { source: 'Facebook Ads', leads: 450, sales: 67, rate: 14.9, color: 'bg-blue-100 text-blue-600' },
                  { source: 'Google Ads', leads: 320, sales: 58, rate: 18.1, color: 'bg-green-100 text-green-600' },
                  { source: 'WhatsApp', leads: 280, sales: 42, rate: 15.0, color: 'bg-green-100 text-green-600' },
                  { source: 'Referidos', leads: 150, sales: 35, rate: 23.3, color: 'bg-purple-100 text-purple-600' }
                ].map((channel, index) => (
                  <Card key={index} className="border-l-4 border-l-primary/20">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Badge className={channel.color}>{channel.source}</Badge>
                        <div>
                          <div className="text-lg font-bold">{channel.rate}%</div>
                          <p className="text-sm text-muted-foreground">Tasa de conversión</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {channel.sales} ventas de {channel.leads} leads
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default SalesReports;
