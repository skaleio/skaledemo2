
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Zap,
  Eye,
  AlertTriangle,
  Star,
  Clock
} from 'lucide-react';

interface CounterMetric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
  color: string;
  glowColor: string;
  priority: 'high' | 'medium' | 'low';
}

const useAnimatedCounter = (targetValue: number, duration: number = 1000) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.floor(targetValue * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration]);

  return currentValue;
};

const CounterCard: React.FC<{ metric: CounterMetric }> = ({ metric }) => {
  const animatedValue = useAnimatedCounter(metric.value);
  const Icon = metric.icon;

  return (
    <Card className={`
      relative overflow-hidden border-0 bg-black/40 backdrop-blur-sm
      hover:bg-black/50 transition-all duration-300
      ${metric.priority === 'high' ? 'animate-pulse' : ''}
    `}>
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 opacity-20 blur-xl`}
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${metric.glowColor}, transparent 70%)` 
        }}
      />
      
      {/* Content */}
      <div className="relative p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className={`
            p-2 rounded-lg backdrop-blur-sm border
            ${metric.color} border-current/20
          `}>
            <Icon className="w-5 h-5" />
          </div>
          
          <Badge 
            className={`
              text-xs font-mono backdrop-blur-sm
              ${metric.trend === 'up' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                metric.trend === 'down' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }
            `}
          >
            {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} 
            {metric.trendValue}%
          </Badge>
        </div>

        {/* Value */}
        <div>
          <div className={`
            text-2xl font-mono font-bold ${metric.color}
            drop-shadow-lg
          `}>
            {metric.prefix}{animatedValue.toLocaleString()}{metric.suffix}
          </div>
          <p className="text-sm text-gray-300 font-medium mt-1">
            {metric.label}
          </p>
        </div>

        {/* Border glow */}
        <div 
          className="absolute inset-0 rounded-lg border opacity-30"
          style={{ borderColor: metric.glowColor }}
        />
      </div>
    </Card>
  );
};

export const FuturistCounter: React.FC = () => {
  const [metrics, setMetrics] = useState<CounterMetric[]>([
    {
      id: 'people-in-store',
      label: 'Personas en Tienda',
      value: 47,
      icon: Users,
      trend: 'up',
      trendValue: 12,
      color: 'text-cyan-400',
      glowColor: '#00bcd4',
      priority: 'high'
    },
    {
      id: 'daily-sales',
      label: 'Ventas del Día',
      value: 2840,
      prefix: '$',
      icon: DollarSign,
      trend: 'up',
      trendValue: 8,
      color: 'text-green-400',
      glowColor: '#4caf50',
      priority: 'high'
    },
    {
      id: 'weekly-sales',
      label: 'Ventas Semanales',
      value: 18750,
      prefix: '$',
      icon: TrendingUp,
      trend: 'up',
      trendValue: 15,
      color: 'text-emerald-400',
      glowColor: '#10b981',
      priority: 'medium'
    },
    {
      id: 'total-revenue',
      label: 'Ingresos Totales',
      value: 127450,
      prefix: '$',
      icon: Activity,
      trend: 'up',
      trendValue: 23,
      color: 'text-purple-400',
      glowColor: '#9c27b0',
      priority: 'medium'
    },
    {
      id: 'orders-today',
      label: 'Pedidos Hoy',
      value: 89,
      icon: ShoppingCart,
      trend: 'up',
      trendValue: 5,
      color: 'text-orange-400',
      glowColor: '#ff9800',
      priority: 'medium'
    },
    {
      id: 'conversion-rate',
      label: 'Tasa Conversión',
      value: 24,
      suffix: '%',
      icon: Zap,
      trend: 'up',
      trendValue: 3,
      color: 'text-yellow-400',
      glowColor: '#ffc107',
      priority: 'low'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar datos cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => ({
          ...metric,
          value: metric.value + Math.floor(Math.random() * 10) - 5, // Variación aleatoria
          trendValue: Math.max(0, metric.trendValue + Math.floor(Math.random() * 6) - 3)
        }))
      );
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header futurista */}
      <div className="flex items-center justify-between p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-cyan-500/20">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-mono">
              DASHBOARD REAL-TIME
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              Última actualización: {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 font-mono text-sm">ONLINE</span>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <CounterCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Alertas */}
      <div className="p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/30">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
          <div>
            <p className="text-red-400 font-semibold">Alerta: Stock Bajo</p>
            <p className="text-gray-400 text-sm">3 productos necesitan reabastecimiento</p>
          </div>
        </div>
      </div>
    </div>
  );
};
