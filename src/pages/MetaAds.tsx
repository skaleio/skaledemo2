
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
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
  MousePointer
} from 'lucide-react';

const campaigns = [
  {
    id: 1,
    name: 'Campaña Lead Generation Q1',
    status: 'active',
    budget: 1500,
    spent: 892,
    impressions: 45670,
    clicks: 1247,
    conversions: 89,
    ctr: 2.73,
    cpc: 0.72,
    platform: 'Facebook'
  },
  {
    id: 2,
    name: 'Instagram Stories Awareness',
    status: 'active',
    budget: 800,
    spent: 234,
    impressions: 23450,
    clicks: 567,
    conversions: 34,
    ctr: 2.42,
    cpc: 0.41,
    platform: 'Instagram'
  },
  {
    id: 3,
    name: 'Retargeting Campaign',
    status: 'paused',
    budget: 600,
    spent: 445,
    impressions: 18920,
    clicks: 423,
    conversions: 67,
    ctr: 2.24,
    cpc: 1.05,
    platform: 'Facebook'
  }
];

const MetaAds = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalBudget = campaigns.reduce((acc, campaign) => acc + campaign.budget, 0);
  const totalSpent = campaigns.reduce((acc, campaign) => acc + campaign.spent, 0);
  const totalImpressions = campaigns.reduce((acc, campaign) => acc + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((acc, campaign) => acc + campaign.clicks, 0);

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Meta ADS</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus campañas de Facebook e Instagram
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
                    <div className="text-2xl font-bold">€{totalSpent.toLocaleString()}</div>
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
                    <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
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
                    <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
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
                    <div className="text-2xl font-bold">
                      {campaigns.reduce((acc, c) => acc + c.conversions, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Conversiones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campañas Activas</CardTitle>
              <CardDescription>Rendimiento de tus campañas de Meta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Megaphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status === 'active' ? 'Activa' : 
                           campaign.status === 'paused' ? 'Pausada' : 'Finalizada'}
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
                        <div className="text-lg font-bold">€{campaign.cpc}</div>
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

export default MetaAds;
