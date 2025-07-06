
import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, Eye } from 'lucide-react';

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
        return <ShoppingCart className="w-3 h-3" />;
      case 'revenue':
        return <DollarSign className="w-3 h-3" />;
      case 'visitor':
        return <Eye className="w-3 h-3" />;
    }
  };

  const getColor = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return 'text-green-400 bg-green-400/10';
      case 'revenue':  
        return 'text-yellow-400 bg-yellow-400/10';
      case 'visitor':
        return 'text-blue-400 bg-blue-400/10';
    }
  };

  return (
    <div className="px-2 py-3">
      {/* Header con toggle */}
      <div 
        className="flex items-center justify-between mb-3 cursor-pointer hover:bg-sidebar-accent/50 rounded-lg p-1 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="text-xs font-semibold text-sidebar-foreground/80 uppercase tracking-wider">
          Monitor
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {!isCollapsed && (
        <>
          {/* Estadísticas compactas */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="flex flex-col items-center p-2 bg-sidebar-accent/30 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-green-400 mb-1" />
              <span className="text-xs font-bold text-sidebar-foreground">{data.sales}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-sidebar-accent/30 rounded-lg">
              <DollarSign className="w-4 h-4 text-yellow-400 mb-1" />
              <span className="text-xs font-bold text-sidebar-foreground">${data.revenue}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-sidebar-accent/30 rounded-lg">
              <Eye className="w-4 h-4 text-blue-400 mb-1" />
              <span className="text-xs font-bold text-sidebar-foreground">{data.visitors}</span>
            </div>
          </div>

          {/* Feed de actividad en tiempo real */}
          <div className="space-y-1">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-center space-x-2 p-1.5 rounded-md transition-all duration-500 ${
                  index === 0 ? 'animate-fade-in scale-105' : ''
                } ${getColor(activity.type)}`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex-shrink-0">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="w-full h-1 bg-current/20 rounded-full">
                    <div 
                      className="h-full bg-current rounded-full animate-pulse"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
                {activity.value && (
                  <span className="text-xs font-medium">
                    ${activity.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Versión colapsada - solo iconos animados */}
      {isCollapsed && (
        <div className="flex justify-center space-x-1">
          {activities.slice(0, 3).map((activity, index) => (
            <div
              key={activity.id}
              className={`p-1 rounded-full ${getColor(activity.type)} animate-bounce`}
              style={{
                animationDelay: `${index * 200}ms`,
                animationDuration: '1s'
              }}
            >
              {getIcon(activity.type)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
