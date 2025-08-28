import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, History, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

interface CreditsDisplayProps {
  credits: number;
}

export const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ credits }) => {
  const getCreditsColor = (credits: number) => {
    if (credits >= 10) return 'text-green-600';
    if (credits >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCreditsStatus = (credits: number) => {
    if (credits >= 10) return { status: 'Suficientes', color: 'bg-green-100 text-green-700' };
    if (credits >= 5) return { status: 'Moderados', color: 'bg-yellow-100 text-yellow-700' };
    if (credits > 0) return { status: 'Pocos', color: 'bg-orange-100 text-orange-700' };
    return { status: 'Agotados', color: 'bg-red-100 text-red-700' };
  };

  const creditsStatus = getCreditsStatus(credits);

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Créditos Disponibles
                </span>
                <Badge variant="outline" className={creditsStatus.color}>
                  {creditsStatus.status}
                </Badge>
              </div>
              <motion.div
                key={credits}
                initial={{ scale: 1.2, color: '#10b981' }}
                animate={{ scale: 1, color: 'inherit' }}
                className={`text-2xl font-bold ${getCreditsColor(credits)}`}
              >
                {credits}
              </motion.div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              Historial
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Comprar Créditos
            </Button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Animación Básica</div>
              <div className="font-semibold text-sm">1 crédito</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Animación Premium</div>
              <div className="font-semibold text-sm">2-3 créditos</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">4K Ultra HD</div>
              <div className="font-semibold text-sm">+2 créditos</div>
            </div>
          </div>
        </div>

        {/* Low credits warning */}
        {credits < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <div className="flex items-start space-x-2">
              <Gift className="w-4 h-4 text-orange-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-orange-800">Créditos bajos</div>
                <div className="text-orange-600 mt-1">
                  ¡Recarga tu cuenta para seguir creando animaciones increíbles!
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Ver Paquetes de Créditos
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};