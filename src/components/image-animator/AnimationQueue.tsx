import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Pause, Play, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Animation } from '@/types/image-animator';

interface AnimationQueueProps {
  animations: Animation[];
}

const getStatusColor = (status: Animation['status']) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500';
    case 'uploading': return 'bg-blue-500';
    case 'processing_pika': return 'bg-purple-500';
    case 'processing_higgsfield': return 'bg-green-500';
    case 'processing_kling': return 'bg-orange-500';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusText = (status: Animation['status']) => {
  switch (status) {
    case 'pending': return 'En Cola';
    case 'uploading': return 'Subiendo Imagen';
    case 'processing_pika': return 'Procesando en Pika Labs';
    case 'processing_higgsfield': return 'Mejorando en Higgsfield';
    case 'processing_kling': return 'Refinando en Kling AI';
    case 'error': return 'Error';
    default: return 'Desconocido';
  }
};

const EstimatedTimeLeft: React.FC<{ startTime: Date; estimatedDuration: number }> = ({
  startTime,
  estimatedDuration
}) => {
  const [timeLeft, setTimeLeft] = React.useState<number>(estimatedDuration);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.getTime();
      const remaining = Math.max(0, estimatedDuration - elapsed);
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, estimatedDuration]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span>{formatTime(timeLeft)} restante</span>
    </div>
  );
};

export const AnimationQueue: React.FC<AnimationQueueProps> = ({ animations }) => {
  if (animations.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">No hay animaciones en cola</h3>
              <p className="text-muted-foreground">
                Las animaciones que inicies aparecerán aquí para seguimiento en tiempo real
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Cola de Procesamiento</h2>
        <Badge variant="secondary">
          {animations.length} animación{animations.length !== 1 ? 'es' : ''} en proceso
        </Badge>
      </div>

      <AnimatePresence>
        {animations.map((animation) => (
          <motion.div
            key={animation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={animation.originalImage}
                        alt="Original"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      {animation.status !== 'pending' && animation.status !== 'error' && (
                        <div className="absolute -bottom-1 -right-1">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{animation.fileName}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(animation.status)}`} />
                        <span className="text-sm text-muted-foreground">
                          {getStatusText(animation.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {animation.status === 'pending' && (
                      <Button variant="ghost" size="sm">
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso de la animación</span>
                    <span>{animation.progress}%</span>
                  </div>
                  <Progress value={animation.progress} className="h-2" />
                </div>

                {/* Processing Stages */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { key: 'uploading', label: 'Subida', color: 'blue' },
                    { key: 'processing_pika', label: 'Pika Labs', color: 'purple' },
                    { key: 'processing_higgsfield', label: 'Higgsfield', color: 'green' },
                    { key: 'processing_kling', label: 'Kling AI', color: 'orange' }
                  ].map((stage, index) => {
                    const isActive = animation.status === stage.key;
                    const isCompleted = animation.progress > (index * 25);
                    
                    return (
                      <div
                        key={stage.key}
                        className={`p-2 rounded-lg text-center transition-all ${
                          isActive
                            ? `bg-${stage.color}-100 text-${stage.color}-700 border-${stage.color}-200 border`
                            : isCompleted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {stage.label}
                      </div>
                    );
                  })}
                </div>

                {/* Configuration Details */}
                <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Duración:</span> {animation.config.duration}s
                  </div>
                  <div>
                    <span className="font-medium">Estilo:</span> {animation.config.style}
                  </div>
                  <div>
                    <span className="font-medium">Velocidad:</span> {animation.config.speed}x
                  </div>
                </div>

                {/* Time Estimate */}
                {animation.status !== 'error' && animation.status !== 'pending' && (
                  <EstimatedTimeLeft
                    startTime={animation.createdAt}
                    estimatedDuration={5 * 60 * 1000} // 5 minutes
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};