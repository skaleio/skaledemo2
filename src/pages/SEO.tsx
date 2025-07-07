
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  FileText, 
  Eye,
  Target,
  BarChart3,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

const SEOContent = () => {
  const { businessData } = useBusiness();
  const seoData = businessData?.seo;

  if (!seoData) return <div>Cargando datos de SEO...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SEO Manager</h1>
          <p className="text-muted-foreground mt-1">
            Optimiza tu posicionamiento orgánico y aumenta el tráfico web
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Auditoría SEO
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Estrategia
          </Button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Eye className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Tráfico Orgánico</span>
                </div>
                <div className="text-2xl font-bold">{seoData.organicTraffic.toLocaleString()}</div>
                <div className="text-xs text-green-600">+34% vs mes anterior</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Meta: 15K</div>
                <Progress value={(seoData.organicTraffic / 15000) * 100} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-muted-foreground">Keywords</span>
                </div>
                <div className="text-2xl font-bold">{seoData.keywords}</div>
                <div className="text-xs text-blue-600">+23 nuevas</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Top 10: 34</div>
                <Progress value={70} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-muted-foreground">Backlinks</span>
                </div>
                <div className="text-2xl font-bold">{seoData.backlinks}</div>
                <div className="text-xs text-purple-600">+12 este mes</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">DA: 45</div>
                <Progress value={78} className="w-16 h-2 mt-1" />
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
                  <span className="text-sm font-medium text-muted-foreground">Ranking Promedio</span>
                </div>
                <div className="text-2xl font-bold">#{seoData.ranking}</div>
                <div className="text-xs text-green-600">↑ 8 posiciones</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Top 3: 12</div>
                <Progress value={60} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keywords Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Keywords Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { keyword: 'automatización con IA', position: 3, volume: 1200, difficulty: 'Media', trend: 'up' },
                { keyword: 'software CRM español', position: 7, volume: 890, difficulty: 'Alta', trend: 'up' },
                { keyword: 'chatbot WhatsApp', position: 12, volume: 2100, difficulty: 'Baja', trend: 'down' },
                { keyword: 'leads automáticos', position: 5, volume: 650, difficulty: 'Media', trend: 'up' },
                { keyword: 'marketing automation', position: 15, volume: 3400, difficulty: 'Alta', trend: 'up' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.keyword}</span>
                      <Badge variant={item.trend === 'up' ? 'default' : 'secondary'}>
                        {item.trend === 'up' ? '↗' : '↘'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Vol: {item.volume}/mes • Dificultad: {item.difficulty}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">#{item.position}</div>
                    <div className="text-xs text-muted-foreground">Posición</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auditoría Técnica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Auditoría Técnica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Velocidad de Carga</div>
                    <div className="text-sm text-green-600">Excelente - 2.1s</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">97/100</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium">Meta Descriptions</div>
                    <div className="text-sm text-yellow-600">23 páginas sin optimizar</div>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Mejorar</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Mobile Friendly</div>
                    <div className="text-sm text-green-600">Completamente optimizado</div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Perfecto</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium">Enlaces Rotos</div>
                    <div className="text-sm text-red-600">7 enlaces necesitan revisión</div>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">Crítico</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Indexación</div>
                    <div className="text-sm text-blue-600">156/178 páginas indexadas</div>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">87%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Optimizer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Optimizador de Contenido</span>
          </CardTitle>
          <CardDescription>
            Mejora tu contenido basado en análisis de competencia y SEO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Contenido Pendiente</h4>
              {[
                { title: 'Guía: Automatización WhatsApp', status: 'En progreso', priority: 'Alta' },
                { title: 'Case Study: ROI 300%', status: 'Borrador', priority: 'Media' },
                { title: 'Tutorial: Setup Retell AI', status: 'Planificado', priority: 'Baja' }
              ].map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{content.title}</div>
                    <div className="text-sm text-muted-foreground">Estado: {content.status}</div>
                  </div>
                  <Badge variant={
                    content.priority === 'Alta' ? 'destructive' :
                    content.priority === 'Media' ? 'default' : 'secondary'
                  }>
                    {content.priority}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Oportunidades de Mejora</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium">Crear cluster de contenido</div>
                  <div className="text-sm text-blue-600">Tema: "IA en ventas"</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium">Actualizar contenido 2023</div>
                  <div className="text-sm text-green-600">12 artículos para refresh</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-medium">Optimizar para featured snippets</div>
                  <div className="text-sm text-purple-600">8 keywords objetivo</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SEO = () => {
  console.log('SEO Component: Renderizando SEO Manager');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <SEOContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default SEO;
