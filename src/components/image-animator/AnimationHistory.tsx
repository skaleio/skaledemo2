import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Play, Search, Calendar, Filter, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Animation } from '@/types/image-animator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface AnimationHistoryProps {
  animations: Animation[];
}

export const AnimationHistory: React.FC<AnimationHistoryProps> = ({ animations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAnimations = animations
    .filter(animation => {
      const matchesSearch = animation.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || animation.config.style === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'name') {
        return a.fileName.localeCompare(b.fileName);
      }
      return 0;
    });

  const handleDownload = async (animation: Animation, quality: '720p' | '1080p') => {
    try {
      // Simulate download
      toast.success(`Descargando video en ${quality}...`);
      
      // In a real implementation, this would fetch the video from storage
      const link = document.createElement('a');
      link.href = animation.resultVideo || '';
      link.download = `${animation.fileName}_${quality}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Error al descargar el video');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (animations.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">No hay animaciones completadas</h3>
              <p className="text-muted-foreground">
                Tus animaciones completadas aparecerán aquí
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Historial de Animaciones</h2>
          <p className="text-muted-foreground">
            {animations.length} animación{animations.length !== 1 ? 'es' : ''} completada{animations.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtrar por estilo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estilos</SelectItem>
              <SelectItem value="smooth">Suave</SelectItem>
              <SelectItem value="cinematic">Cinemático</SelectItem>
              <SelectItem value="dynamic">Dinámico</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más reciente</SelectItem>
              <SelectItem value="oldest">Más antiguo</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Animation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAnimations.map((animation) => (
            <motion.div
              key={animation.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video bg-muted">
                  {animation.resultVideo ? (
                    <video
                      src={animation.resultVideo}
                      className="w-full h-full object-cover"
                      poster={animation.originalImage}
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={animation.originalImage}
                      alt={animation.fileName}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Overlay with play button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {animation.config.duration}s
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Title and date */}
                    <div>
                      <h3 className="font-semibold text-foreground truncate">
                        {animation.fileName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(animation.createdAt)}
                      </p>
                    </div>

                    {/* Configuration tags */}
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {animation.config.style}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {animation.config.speed}x
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(animation, '720p')}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          720p
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(animation, '1080p')}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          1080p
                        </Button>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Compartir</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAnimations.length === 0 && searchTerm && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Filter className="mx-auto w-8 h-8 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">No se encontraron resultados</h3>
                <p className="text-muted-foreground">
                  Intenta cambiar los filtros o el término de búsqueda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};