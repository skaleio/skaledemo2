
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, Heart, MessageCircle, Plus, Share2 } from 'lucide-react';

const contentCalendar = [
  {
    id: 1,
    title: 'Post sobre nuevo servicio',
    platform: 'Instagram',
    scheduledDate: '2024-07-04T10:00:00',
    status: 'scheduled',
    type: 'image',
    engagement: { likes: 0, comments: 0, shares: 0 }
  },
  {
    id: 2,
    title: 'Testimonial de cliente',
    platform: 'Facebook',
    scheduledDate: '2024-07-04T15:30:00',
    status: 'scheduled',
    type: 'video',
    engagement: { likes: 0, comments: 0, shares: 0 }
  },
  {
    id: 3,
    title: 'Tips de marketing digital',
    platform: 'LinkedIn',
    scheduledDate: '2024-07-03T09:00:00',
    status: 'published',
    type: 'text',
    engagement: { likes: 45, comments: 12, shares: 8 }
  },
  {
    id: 4,
    title: 'Behind the scenes',
    platform: 'Instagram Stories',
    scheduledDate: '2024-07-03T12:00:00',
    status: 'published',
    type: 'story',
    engagement: { likes: 89, comments: 23, shares: 15 }
  }
];

const Content = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-800';
      case 'Facebook': return 'bg-blue-100 text-blue-800';
      case 'LinkedIn': return 'bg-indigo-100 text-indigo-800';
      case 'Instagram Stories': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Calendario de Contenido</h1>
              <p className="text-muted-foreground mt-1">
                Planifica y programa tu contenido en redes sociales
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear Post
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{contentCalendar.filter(c => c.status === 'scheduled').length}</div>
                    <p className="text-sm text-muted-foreground">Posts Programados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">{contentCalendar.filter(c => c.status === 'published').length}</div>
                    <p className="text-sm text-muted-foreground">Posts Publicados</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {contentCalendar.reduce((acc, content) => acc + content.engagement.likes, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {contentCalendar.reduce((acc, content) => acc + content.engagement.comments, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Comentarios</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenido Programado</CardTitle>
                <CardDescription>Posts próximos a publicar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentCalendar.filter(c => c.status === 'scheduled').map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{content.title}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(content.scheduledDate).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPlatformColor(content.platform)}>
                          {content.platform}
                        </Badge>
                        <Badge className={getStatusColor(content.status)}>
                          Programado
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contenido Publicado</CardTitle>
                <CardDescription>Posts recientes con métricas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentCalendar.filter(c => c.status === 'published').map((content) => (
                    <div key={content.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Eye className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{content.title}</h4>
                            <Badge className={getPlatformColor(content.platform)} variant="outline">
                              {content.platform}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-red-500" />
                            <span>{content.engagement.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-3 h-3 text-blue-500" />
                            <span>{content.engagement.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="w-3 h-3 text-green-500" />
                            <span>{content.engagement.shares}</span>
                          </div>
                        </div>
                        <span className="text-muted-foreground">
                          {new Date(content.scheduledDate).toLocaleDateString()}
                        </span>
                      </div>
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

export default Content;
