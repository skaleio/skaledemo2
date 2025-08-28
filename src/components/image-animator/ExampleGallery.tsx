import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Download, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Example {
  id: string;
  title: string;
  beforeImage: string;
  afterVideo: string;
  style: string;
  duration: number;
  likes: number;
  views: number;
  category: string;
}

const exampleData: Example[] = [
  {
    id: '1',
    title: 'Retrato Cinematográfico',
    beforeImage: '/api/placeholder/400/300',
    afterVideo: '/api/placeholder/400/300',
    style: 'cinematic',
    duration: 4,
    likes: 245,
    views: 1205,
    category: 'portraits'
  },
  {
    id: '2',
    title: 'Paisaje Natural',
    beforeImage: '/api/placeholder/400/300',
    afterVideo: '/api/placeholder/400/300',
    style: 'smooth',
    duration: 6,
    likes: 189,
    views: 892,
    category: 'landscapes'
  },
  {
    id: '3',
    title: 'Arte Abstracto',
    beforeImage: '/api/placeholder/400/300',
    afterVideo: '/api/placeholder/400/300',
    style: 'artistic',
    duration: 3,
    likes: 156,
    views: 743,
    category: 'art'
  },
  {
    id: '4',
    title: 'Arquitectura Urbana',
    beforeImage: '/api/placeholder/400/300',
    afterVideo: '/api/placeholder/400/300',
    style: 'dynamic',
    duration: 5,
    likes: 203,
    views: 967,
    category: 'architecture'
  },
  {
    id: '5',
    title: 'Naturaleza Muerta',
    beforeImage: '/api/placeholder/400/300',
    afterVideo: '/api/placeholder/400/300',
    style: 'smooth',
    duration: 4,
    likes: 134,
    views: 621,
    category: 'still-life'
  },
  {
    id: '6',
    title: 'Fotografía de Moda',
    beforeImage: '/api/placeholder/400/300',
    afterVideo: '/api/placeholder/400/300',
    style: 'cinematic',
    duration: 3,
    likes: 278,
    views: 1456,
    category: 'fashion'
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: '🎯' },
  { id: 'portraits', name: 'Retratos', icon: '👤' },
  { id: 'landscapes', name: 'Paisajes', icon: '🏔️' },
  { id: 'art', name: 'Arte', icon: '🎨' },
  { id: 'architecture', name: 'Arquitectura', icon: '🏢' },
  { id: 'still-life', name: 'Naturaleza Muerta', icon: '🌺' },
  { id: 'fashion', name: 'Moda', icon: '👗' }
];

const styleColors = {
  smooth: 'bg-blue-100 text-blue-700',
  cinematic: 'bg-purple-100 text-purple-700',
  dynamic: 'bg-green-100 text-green-700',
  artistic: 'bg-orange-100 text-orange-700'
};

export const ExampleGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filteredExamples = exampleData.filter(example => 
    selectedCategory === 'all' || example.category === selectedCategory
  );

  const handlePlayVideo = (exampleId: string) => {
    setPlayingVideo(playingVideo === exampleId ? null : exampleId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Galería de Ejemplos</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explora nuestra colección de animaciones creadas por otros usuarios. 
          Inspírate y descubre las posibilidades de nuestro animador de imágenes.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map((example, index) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-video">
                {/* Before/After Toggle */}
                <div className="relative w-full h-full">
                  {playingVideo === example.id ? (
                    <video
                      src={example.afterVideo}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      onLoadStart={() => setPlayingVideo(example.id)}
                    />
                  ) : (
                    <img
                      src={example.beforeImage}
                      alt={example.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handlePlayVideo(example.id)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{example.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{example.views}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    {example.duration}s
                  </Badge>
                </div>

                {/* Before/After indicator */}
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-white/90 text-black border-white/20">
                    {playingVideo === example.id ? 'Después' : 'Antes'}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {example.title}
                  </h3>

                  {/* Style and duration */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={styleColors[example.style as keyof typeof styleColors]}
                    >
                      {example.style}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {example.duration} segundos
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlayVideo(example.id)}
                      className="flex-1"
                    >
                      <Play className="w-3 h-3 mr-2" />
                      {playingVideo === example.id ? 'Ver Antes' : 'Ver Animación'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💡</span>
            <span>Consejos para Mejores Resultados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold">Imágenes Ideales:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Alta resolución (mín. 1024x1024px)</li>
                <li>• Sujeto principal bien definido</li>
                <li>• Buena iluminación y contraste</li>
                <li>• Formato PNG o JPG</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Mejores Prácticas:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Usa el estilo "Suave" para retratos</li>
                <li>• "Cinemático" funciona bien con paisajes</li>
                <li>• Evita imágenes muy borrosas</li>
                <li>• Experimenta con diferentes duraciones</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};