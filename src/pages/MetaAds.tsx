
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Megaphone,
  DollarSign, 
  Users, 
  TrendingUp, 
  Play, 
  Pause, 
  Plus,
  Eye,
  Target,
  Settings,
  BarChart3,
  Zap,
  Heart,
  MessageCircle,
  Share
} from 'lucide-react';

const MetaAdsContent = () => {
  const { businessData } = useBusiness();
  const metaAdsData = businessData?.ads?.metaAds;

  if (!metaAdsData) return <div>Cargando datos de Meta Ads...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meta ADS Manager</h1>
          <p className="text-muted-foreground mt-1">
            Controla Facebook e Instagram Ads con inteligencia artificial
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Pixel Manager
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Campaña
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-muted-foreground">Inversión Total</span>
                </div>
                <div className="text-2xl font-bold">{metaAdsData.spent}</div>
                <div className="text-xs text-blue-600">ROAS: {metaAdsData.roas}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Meta: €3K</div>
                <Progress value={65} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-muted-foreground">Alcance</span>
                </div>
                <div className="text-2xl font-bold">{metaAdsData.reach.toLocaleString()}</div>
                <div className="text-xs text-purple-600">+23% vs semana</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Únicos</div>
                <Progress value={78} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Heart className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Engagement</span>
                </div>
                <div className="text-2xl font-bold">{metaAdsData.engagement}</div>
                <div className="text-xs text-green-600">+18% interacción</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">CTR: 2.8%</div>
                <Progress value={82} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-muted-foreground">Leads</span>
                </div>
                <div className="text-2xl font-bold">{metaAdsData.leads}</div>
                <div className="text-xs text-orange-600">CPL: €8.50</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Calidad: 92%</div>
                <Progress value={92} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campañas Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Megaphone className="w-5 h-5" />
              <span>Campañas Meta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'FB - Lead Generation IA',
                  platform: 'Facebook',
                  status: 'active',
                  budget: 800,
                  spent: 567,
                  reach: 25600,
                  engagement: '4.2%',
                  leads: 89,
                  roas: '4.1x',
                  objective: 'Leads'
                },
                {
                  name: 'IG - Awareness Retell',
                  platform: 'Instagram',
                  status: 'active',
                  budget: 600,
                  spent: 345,
                  reach: 18900,
                  engagement: '5.7%',
                  leads: 67,
                  roas: '3.8x',
                  objective: 'Tráfico'
                },
                {
                  name: 'FB - Remarketing CRM',
                  platform: 'Facebook',
                  status: 'paused',
                  budget: 400,
                  spent: 289,
                  reach: 12400,
                  engagement: '3.4%',
                  leads: 34,
                  roas: '2.9x',
                  objective: 'Conversiones'
                }
              ].map((campaign, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        campaign.platform === 'Facebook' ? 'bg-blue-100' : 'bg-pink-100'
                      }`}>
                        <Megaphone className={`w-5 h-5 ${
                          campaign.platform === 'Facebook' ? 'text-blue-600' : 'text-pink-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{campaign.platform}</span>
                          <span>•</span>
                          <span>{campaign.objective}</span>
                          <span>•</span>
                          <span>ROAS: {campaign.roas}</span>
                        </div>
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
                      <div className="text-lg font-bold">{campaign.reach.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Alcance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{campaign.engagement}</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{campaign.leads}</div>
                      <div className="text-xs text-muted-foreground">Leads</div>
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

        {/* Creative Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Creative Performance</span>
            </CardTitle>
            <CardDescription>
              Rendimiento de anuncios y creatividades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: 'Video',
                  title: 'Demo Automatización IA',
                  platform: 'Instagram',
                  impressions: 45600,
                  engagement: '6.2%',
                  ctr: '3.8%',
                  performance: 'Excelente'
                },
                {
                  type: 'Carousel',
                  title: 'Casos de Éxito Clientes',
                  platform: 'Facebook',
                  impressions: 23400,
                  engagement: '4.9%',
                  ctr: '2.7%',
                  performance: 'Bueno'
                },
                {
                  type: 'Imagen',
                  title: 'Oferta WhatsApp Bot',
                  platform: 'Facebook',
                  impressions: 18900,
                  engagement: '3.4%',
                  ctr: '2.1%',
                  performance: 'Medio'
                },
                {
                  type: 'Video',
                  title: 'Testimonial Retell AI',
                  platform: 'Instagram',
                  impressions: 34500,
                  engagement: '5.8%',
                  ctr: '3.5%',
                  performance: 'Excelente'
                }
              ].map((creative, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      creative.platform === 'Facebook' ? 'bg-blue-100' : 'bg-pink-100'
                    }`}>
                      {creative.type === 'Video' ? (
                        <Eye className={`w-4 h-4 ${creative.platform === 'Facebook' ? 'text-blue-600' : 'text-pink-600'}`} />
                      ) : creative.type === 'Carousel' ? (
                        <BarChart3 className={`w-4 h-4 ${creative.platform === 'Facebook' ? 'text-blue-600' : 'text-pink-600'}`} />
                      ) : (
                        <Target className={`w-4 h-4 ${creative.platform === 'Facebook' ? 'text-blue-600' : 'text-pink-600'}`} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{creative.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {creative.type} • {creative.platform}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      creative.performance === 'Excelente' ? 'bg-green-100 text-green-800' :
                      creative.performance === 'Bueno' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {creative.performance}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      CTR: {creative.ctr} • Engagement: {creative.engagement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Audience Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Demografía</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>25-34 años</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={35} className="w-20 h-2" />
                    <span className="text-sm">35%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>35-44 años</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={28} className="w-20 h-2" />
                    <span className="text-sm">28%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>45-54 años</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={22} className="w-20 h-2" />
                    <span className="text-sm">22%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>55+ años</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={15} className="w-20 h-2" />
                    <span className="text-sm">15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Ubicaciones Top</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>España</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={45} className="w-20 h-2" />
                    <span className="text-sm">45%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>México</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={25} className="w-20 h-2" />
                    <span className="text-sm">25%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Argentina</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={18} className="w-20 h-2" />
                    <span className="text-sm">18%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Colombia</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={12} className="w-20 h-2" />
                    <span className="text-sm">12%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Intereses</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Emprendimiento</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={38} className="w-20 h-2" />
                    <span className="text-sm">38%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Marketing Digital</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={32} className="w-20 h-2" />
                    <span className="text-sm">32%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Tecnología</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={28} className="w-20 h-2" />
                    <span className="text-sm">28%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Automatización</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={24} className="w-20 h-2" />
                    <span className="text-sm">24%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MetaAds = () => {
  console.log('MetaAds Component: Renderizando Meta ADS Manager');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <MetaAdsContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default MetaAds;
