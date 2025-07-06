
import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, Eye, Zap, TrendingUp, Activity } from 'lucide-react';

interface MonitorData {
  sales: number;
  revenue: number;
  visitors: number;
}

interface Activity {
  id: string;
  type: 'sale' | 'visitor' | 'revenue';
  timestamp: Date;
  value?: number;
}

export const RealTimeMonitor: React.FC = () => {
  const [data, setData] = useState<MonitorData>({
    sales: 0,
    revenue: 0,
    visitors: 0
  });
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simular datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Generar actividad aleatoria
      const activityTypes = ['sale', 'visitor', 'revenue'] as const;
      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: randomType,
        timestamp: new Date(),
        value: randomType === 'revenue' ? Math.floor(Math.random() * 100) + 10 : undefined
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Solo mantener las últimas 5

      // Actualizar contadores
      setData(prev => ({
        sales: randomType === 'sale' ? prev.sales + 1 : prev.sales,
        revenue: randomType === 'revenue' ? prev.revenue + (newActivity.value || 0) : prev.revenue,
        visitors: randomType === 'visitor' ? prev.visitors + 1 : prev.visitors
      }));
    }, 2000 + Math.random() * 3000); // Entre 2-5 segundos

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return <Zap className="w-3 h-3" />;
      case 'revenue':
        return <TrendingUp className="w-3 h-3" />;
      case 'visitor':
        return <Activity className="w-3 h-3" />;
    }
  };

  const getColor = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'revenue':  
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'visitor':
        return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    }
  };

  return (
    <div className="px-2 py-3">
      {/* Header con toggle */}
      <div 
        className="flex items-center justify-between mb-3 cursor-pointer hover:bg-sidebar-accent/50 rounded-lg p-1 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="text-xs font-bold text-sidebar-foreground/90 uppercase tracking-widest flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-orbitron">LIVE</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
          <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Estadísticas compactas futuristas */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="flex flex-col items-center p-2 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-400/20 rounded-lg backdrop-blur-sm">
              <Zap className="w-4 h-4 text-emerald-400 mb-1 animate-pulse" />
              <span className="text-xs font-bold text-sidebar-foreground font-mono">{data.sales}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-400/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-amber-400 mb-1 animate-pulse" />
              <span className="text-xs font-bold text-sidebar-foreground font-mono">${data.revenue}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-400/20 rounded-lg backdrop-blur-sm">
              <Activity className="w-4 h-4 text-cyan-400 mb-1 animate-pulse" />
              <span className="text-xs font-bold text-sidebar-foreground font-mono">{data.visitors}</span>
            </div>
          </div>

          {/* Feed de actividad en tiempo real futurista */}
          <div className="space-y-1">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-center space-x-2 p-1.5 rounded-md border backdrop-blur-sm transition-all duration-500 ${
                  index === 0 ? 'animate-fade-in scale-105 shadow-lg' : ''
                } ${getColor(activity.type)}`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex-shrink-0 relative">
                  {getIcon(activity.type)}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="w-full h-1 bg-current/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-current/60 to-current rounded-full animate-pulse"
                      style={{ 
                        width: `${Math.random() * 100}%`,
                        animation: 'pulse 1s ease-in-out infinite, shimmer 2s linear infinite'
                      }}
                    ></div>
                  </div>
                </div>
                {activity.value && (
                  <span className="text-xs font-bold font-mono">
                    ${activity.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Versión colapsada - solo iconos animados futuristas */}
      {isCollapsed && (
        <div className="flex justify-center space-x-1">
          {activities.slice(0, 3).map((activity, index) => (
            <div
              key={activity.id}
              className={`p-1 rounded-full border backdrop-blur-sm relative ${getColor(activity.type)} animate-bounce`}
              style={{
                animationDelay: `${index * 200}ms`,
                animationDuration: '1s'
              }}
            >
              {getIcon(activity.type)}
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
