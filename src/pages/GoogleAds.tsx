
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  DollarSign, 
  MousePointer, 
  TrendingUp, 
  Play, 
  Pause, 
  Plus,
  Eye
} from 'lucide-react';

const GoogleAds = () => {
  console.log('GoogleAds Component: Renderizando Google ADS');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Google ADS</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus campañas de Google Ads
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Campaña
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">€2,847</div>
                    <p className="text-sm text-muted-foreground">Gastado Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">89,420</div>
                    <p className="text-sm text-muted-foreground">Impresiones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MousePointer className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">3,247</div>
                    <p className="text-sm text-muted-foreground">Clicks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">3.6%</div>
                    <p className="text-sm text-muted-foreground">CTR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campañas de Google Ads</CardTitle>
              <CardDescription>Rendimiento de tus campañas activas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Búsqueda - Servicios Principales',
                    status: 'active',
                    budget: 1200,
                    spent: 678,
                    impressions: 34500,
                    clicks: 1247,
                    ctr: 3.61
                  },
                  {
                    name: 'Display - Remarketing',
                    status: 'active',
                    budget: 800,
                    spent: 234,
                    impressions: 28900,
                    clicks: 567,
                    ctr: 1.96
                  },
                  {
                    name: 'Shopping - Productos',
                    status: 'paused',
                    budget: 600,
                    spent: 445,
                    impressions: 18400,
                    clicks: 423,
                    ctr: 2.30
                  }
                ].map((campaign, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Search className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">Google Ads</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {campaign.status === 'active' ? 'Activa' : 'Pausada'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="w-3 h-3 mr-1" />
                              Pausar
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Activar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold">€{campaign.spent}</div>
                        <div className="text-xs text-muted-foreground">de €{campaign.budget}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{campaign.impressions.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Impresiones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{campaign.clicks}</div>
                        <div className="text-xs text-muted-foreground">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{campaign.ctr}%</div>
                        <div className="text-xs text-muted-foreground">CTR</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">€{(campaign.spent / campaign.clicks).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">CPC</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Presupuesto utilizado</span>
                        <span>{Math.round(campaign.spent / campaign.budget * 100)}%</span>
                      </div>
                      <Progress value={campaign.spent / campaign.budget * 100} className="h-2" />
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

export default GoogleAds;
