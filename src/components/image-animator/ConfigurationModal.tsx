import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Clock, Zap, Palette, Settings } from 'lucide-react';
import { AnimationConfig } from '@/types/image-animator';

interface ConfigurationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (config: AnimationConfig) => void;
  selectedImage: File | null;
}

const animationStyles = [
  {
    id: 'smooth',
    name: 'Suave',
    description: 'Movimientos fluidos y naturales',
    icon: '🌊',
    cost: 1
  },
  {
    id: 'cinematic',
    name: 'Cinemático',
    description: 'Efectos dramáticos y profesionales',
    icon: '🎬',
    cost: 2
  },
  {
    id: 'dynamic',
    name: 'Dinámico',
    description: 'Movimientos rápidos y energéticos',
    icon: '⚡',
    cost: 2
  },
  {
    id: 'artistic',
    name: 'Artístico',
    description: 'Efectos creativos y únicos',
    icon: '🎨',
    cost: 3
  }
];

export const ConfigurationModal: React.FC<ConfigurationModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  selectedImage
}) => {
  const [config, setConfig] = useState<AnimationConfig>({
    duration: 3,
    style: 'smooth',
    speed: 1,
    quality: '1080p',
    enhancePeople: true,
    stabilization: true
  });

  const [preview, setPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedImage && open) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  }, [selectedImage, open]);

  const selectedStyle = animationStyles.find(style => style.id === config.style);
  const estimatedCost = selectedStyle?.cost || 1;
  const estimatedTime = Math.ceil(config.duration * 1.5); // Rough estimate

  const handleSubmit = () => {
    onSubmit(config);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuración de Animación</span>
          </DialogTitle>
          <DialogDescription>
            Personaliza los parámetros de tu animación para obtener el mejor resultado
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Preview */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Vista Previa</Label>
              <p className="text-sm text-muted-foreground">
                Imagen que será animada
              </p>
            </div>
            
            {preview && (
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary">
                    {config.duration}s • {config.style}
                  </Badge>
                </div>
              </div>
            )}

            {/* Cost and Time Estimate */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Costo</span>
                </div>
                <p className="text-lg font-bold text-foreground">{estimatedCost} créditos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm font-medium">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Tiempo Est.</span>
                </div>
                <p className="text-lg font-bold text-foreground">{estimatedTime} min</p>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            {/* Duration */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold">Duración del Video</Label>
                <p className="text-sm text-muted-foreground">
                  Longitud de la animación en segundos
                </p>
              </div>
              <div className="space-y-2">
                <Slider
                  value={[config.duration]}
                  onValueChange={([value]) => setConfig(prev => ({ ...prev, duration: value }))}
                  min={2}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>2s</span>
                  <Badge variant="outline">{config.duration}s</Badge>
                  <span>10s</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Animation Style */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold">Estilo de Animación</Label>
                <p className="text-sm text-muted-foreground">
                  Tipo de efecto que se aplicará
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {animationStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setConfig(prev => ({ ...prev, style: style.id as AnimationConfig['style'] }))}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      config.style === style.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{style.icon}</span>
                        <div>
                          <div className="font-medium">{style.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {style.description}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{style.cost} crédito{style.cost !== 1 ? 's' : ''}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Speed */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold">Velocidad de Animación</Label>
                <p className="text-sm text-muted-foreground">
                  Qué tan rápidos son los movimientos
                </p>
              </div>
              <Select
                value={config.speed.toString()}
                onValueChange={(value) => setConfig(prev => ({ ...prev, speed: parseFloat(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">0.5x - Muy lento</SelectItem>
                  <SelectItem value="0.75">0.75x - Lento</SelectItem>
                  <SelectItem value="1">1x - Normal</SelectItem>
                  <SelectItem value="1.5">1.5x - Rápido</SelectItem>
                  <SelectItem value="2">2x - Muy rápido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quality */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-semibold">Calidad de Salida</Label>
                <p className="text-sm text-muted-foreground">
                  Resolución del video final
                </p>
              </div>
              <Select
                value={config.quality}
                onValueChange={(value: '720p' | '1080p' | '4k') => 
                  setConfig(prev => ({ ...prev, quality: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="720p">720p HD</SelectItem>
                  <SelectItem value="1080p">1080p Full HD</SelectItem>
                  <SelectItem value="4k">4K Ultra HD (+2 créditos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="min-w-32">
            <Zap className="w-4 h-4 mr-2" />
            Iniciar Animación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};