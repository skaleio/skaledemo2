
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
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
  Eye,
  Target,
  Settings,
  BarChart3,
  Zap
} from 'lucide-react';

const GoogleAdsContent = () => {
  const { businessData } = useBusiness();
  const googleAdsData = businessData?.ads?.googleAds;

  if (!googleAdsData) return <div>Cargando datos de Google Ads...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Google ADS Manager</h1>
          <p className="text-muted-foreground mt-1">
            Controla y optimiza tus campañas de Google Ads con IA
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Auto-Optimizer
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Inversión Total</span>
                </div>
                <div className="text-2xl font-bold">{googleAdsData.spent}</div>
                <div className="text-xs text-green-600">ROI: 4.2x</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Meta: €5K</div>
                <Progress value={60} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-muted-foreground">Impresiones</span>
                </div>
                <div className="text-2xl font-bold">{googleAdsData.impressions.toLocaleString()}</div>
                <div className="text-xs text-blue-600">+12% vs semana</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Alcance</div>
                <Progress value={75} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MousePointer className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-muted-foreground">Clicks</span>
                </div>
                <div className="text-2xl font-bold">{googleAdsData.clicks.toLocaleString()}</div>
                <div className="text-xs text-purple-600">CTR: {googleAdsData.ctr}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">CPC: €0.89</div>
                <Progress value={80} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-muted-foreground">Conversiones</span>
                </div>
                <div className="text-2xl font-bold">{googleAdsData.conversions}</div>
                <div className="text-xs text-orange-600">Tasa: 4.8%</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">CPA: €18.24</div>
                <Progress value={85) className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaña Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Campañas Activas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'Búsqueda - Automatización IA',
                  status: 'active',
                  budget: 1200,
                  spent: 678,
                  impressions: 34500,
                  clicks: 1247,
                  ctr: 3.61,
                  conversions: 89,
                  roas: '3.8x'
                },
                {
                  name: 'Display - Remarketing Leads',
                  status: 'active',
                  budget: 800,
                  spent: 234,
                  impressions: 28900,
                  clicks: 567,
                  ctr: 1.96,
                  conversions: 34,
                  roas: '2.4x'
                },
                {
                  name: 'Shopping - Software CRM',
                  status: 'paused',
                  budget: 600,
                  spent: 445,
                  impressions: 18400,
                  clicks: 423,
                  ctr: 2.30,
                  conversions: 23,
                  roas: '2.1x'
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
                        <p className="text-sm text-muted-foreground">ROAS: {campaign.roas}</p>
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">€{campaign.spent}</div>
                      <div className="text-xs text-muted-foreground">de €{campaign.budget}</div>
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
                      <div className="text-lg font-bold">{campaign.conversions}</div>
                      <div className="text-xs text-muted-foreground">Conversiones</div>
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

        {/* Optimización IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Optimización IA</span>
            </CardTitle>
            <CardDescription>
              Recomendaciones automáticas para mejorar performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Aumentar Presupuesto</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+25% ROI</Badge>
                </div>
                <p className="text-sm text-green-700">
                  La campaña "Automatización IA" está perdiendo impresiones por presupuesto limitado.
                </p>
                <Button size="sm" className="mt-2">Aplicar Cambio</Button>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Ajustar Pujas</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+18% CTR</Badge>
                </div>
                <p className="text-sm text-blue-700">
                  Reducir pujas en keywords de bajo rendimiento y aumentar en top performers.
                </p>
                <Button size="sm" variant="outline" className="mt-2">Ver Detalles</Button>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Nuevas Keywords</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">12 nuevas</Badge>
                </div>
                <p className="text-sm text-purple-700">
                  Encontramos keywords relevantes con alto volumen y baja competencia.
                </p>
                <Button size="sm" variant="outline" className="mt-2">Revisar</Button>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Extensiones de Anuncio</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">+30% Espacio</Badge>
                </div>
                <p className="text-sm text-orange-700">
                  Añadir extensiones de enlaces y llamadas para mayor visibilidad.
                </p>
                <Button size="sm" variant="outline" className="mt-2">Configurar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keywords Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Performance de Keywords</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { keyword: 'automatización whatsapp', impressions: 12500, clicks: 456, ctr: '3.65%', cpc: '€0.89', conversions: 23 },
              { keyword: 'software crm español', impressions: 8900, clicks: 289, ctr: '3.25%', cpc: '€1.23', conversions: 15 },
              { keyword: 'chatbot ia', impressions: 15600, clicks: 678, ctr: '4.35%', cpc: '€0.67', conversions: 34 },
              { keyword: 'leads automaticos', impressions: 6700, clicks: 234, ctr: '3.49%', cpc: '€1.45', conversions: 12 }
            ].map((keyword, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="font-medium mb-2">{keyword.keyword}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Impresiones:</span>
                    <span className="font-medium">{keyword.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clicks:</span>
                    <span className="font-medium">{keyword.clicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CTR:</span>
                    <span className="font-medium text-green-600">{keyword.ctr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPC:</span>
                    <span className="font-medium">{keyword.cpc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversiones:</span>
                    <span className="font-medium text-blue-600">{keyword.conversions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GoogleAds = () => {
  console.log('GoogleAds Component: Renderizando Google ADS Manager');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <GoogleAdsContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default GoogleAds;
