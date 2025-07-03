
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  TrendingUp, 
  Eye, 
  BarChart3, 
  Plus,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const keywords = [
  { keyword: 'marketing digital', position: 3, volume: 8900, difficulty: 65, trend: 'up' },
  { keyword: 'agencia marketing', position: 7, volume: 5400, difficulty: 72, trend: 'up' },
  { keyword: 'publicidad online', position: 12, volume: 3200, difficulty: 58, trend: 'down' },
  { keyword: 'SEO profesional', position: 5, volume: 2100, difficulty: 61, trend: 'stable' }
];

const seoTasks = [
  { id: 1, task: 'Optimizar meta descriptions', priority: 'high', status: 'pending', pages: 15 },
  { id: 2, task: 'Corregir enlaces rotos', priority: 'medium', status: 'in-progress', pages: 8 },
  { id: 3, task: 'Mejorar velocidad de carga', priority: 'high', status: 'completed', pages: 23 },
  { id: 4, task: 'Añadir alt text a imágenes', priority: 'low', status: 'pending', pages: 45 }
];

const SEO = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">SEO Manager</h1>
              <p className="text-muted-foreground mt-1">
                Optimiza tu posicionamiento en buscadores
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Auditoría
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{keywords.length}</div>
                    <p className="text-sm text-muted-foreground">Keywords Monitoreadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(keywords.reduce((acc, k) => acc + k.position, 0) / keywords.length)}
                    </div>
                    <p className="text-sm text-muted-foreground">Posición Promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {keywords.reduce((acc, k) => acc + k.volume, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Volumen Mensual</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">78</div>
                    <p className="text-sm text-muted-foreground">SEO Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Keywords Principales</CardTitle>
                <CardDescription>Posicionamiento de tus palabras clave</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{keyword.keyword}</span>
                          {getTrendIcon(keyword.trend)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Volumen: {keyword.volume.toLocaleString()} • Dificultad: {keyword.difficulty}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">#{keyword.position}</div>
                        <div className="text-xs text-muted-foreground">posición</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tareas de SEO</CardTitle>
                <CardDescription>Optimizaciones pendientes y completadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(task.status)}
                        <div>
                          <h4 className="font-medium text-sm">{task.task}</h4>
                          <p className="text-xs text-muted-foreground">{task.pages} páginas afectadas</p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Alta' :
                         task.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Auditoría SEO</CardTitle>
              <CardDescription>Estado general de la optimización del sitio web</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>SEO Técnico</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Contenido</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Enlaces</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default SEO;
