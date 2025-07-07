
import React, { useState, useEffect } from 'react';
import { useBusiness } from '@/contexts/BusinessContext';
import { ShoppingCart, DollarSign, Eye, Zap, TrendingUp, Activity, Users, Package } from 'lucide-react';

interface MonitorData {
  sales: number;
  revenue: number;
  visitors: number;
  leads: number;
}

interface Activity {
  id: string;
  type: 'sale' | 'visitor' | 'revenue' | 'lead';
  timestamp: Date;
  value?: number;
  customer?: string;
}

export the RealTimeMonitor: React.FC = () => {
  const { businessData } = useBusiness();
  const [data, setData] = useState<MonitorData>({
    sales: 0,
    revenue: 0,
    visitors: 0,
    leads: 0
  });
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simular datos en tiempo real con datos del negocio actual
  useEffect(() => {
    const interval = setInterval(() => {
      const activityTypes = ['sale', 'visitor', 'revenue', 'lead'] as const;
      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      
      const customers = [
        'María González', 'Carlos Ruiz', 'Ana Martínez', 'José López', 'Laura Sánchez',
        'David García', 'Elena Rodríguez', 'Miguel Torres', 'Carmen Jiménez', 'Pablo Moreno'
      ];
      
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: randomType,
        timestamp: new Date(),
        value: randomType === 'revenue' ? Math.floor(Math.random() * 200) + 20 : 
               randomType === 'sale' ? Math.floor(Math.random() * 50) + 10 : undefined,
        customer: customers[Math.floor(Math.random() * customers.length)]
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);

      // Actualizar contadores basados en el negocio actual
      setData(prev => ({
        sales: randomType === 'sale' ? prev.sales + 1 : prev.sales,
        revenue: randomType === 'revenue' ? prev.revenue + (newActivity.value || 0) : prev.revenue,
        visitors: randomType === 'visitor' ? prev.visitors + 1 : prev.visitors,
        leads: randomType === 'lead' ? prev.leads + 1 : prev.leads
      }));
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [businessData]);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return <ShoppingCart className="w-3 h-3" />;
      case 'revenue':
        return <DollarSign className="w-3 h-3" />;
      case 'visitor':
        return <Eye className="w-3 h-3" />;
      case 'lead':
        return <Users className="w-3 h-3" />;
    }
  };

  const getColor = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'revenue':  
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'visitor':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'lead':
        return 'text-orange-700 bg-orange-50 border-orange-200';
    }
  };

  const getLabel = (type: Activity['type']) => {
    switch (type) {
      case 'sale':
        return 'Venta';
      case 'revenue':
        return 'Ingreso';
      case 'visitor':
        return 'Visita';
      case 'lead':
        return 'Lead';
    }
  };

  return (
    <div className="px-3 py-4 bg-gradient-to-br from-slate-50 to-gray-100 border-t border-sidebar-border/50">
      {/* Header profesional */}
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer hover:bg-white/50 rounded-lg p-2 transition-all duration-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Activity className="w-4 h-4 text-emerald-600" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-sm font-semibold text-gray-800">Monitor Live</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">EN VIVO</span>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Métricas principales - estilo más profesional */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <ShoppingCart className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-medium text-gray-600">Ventas</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{data.sales}</div>
                </div>
                <div className="text-xs text-emerald-600 font-medium">
                  +{Math.floor(Math.random() * 15) + 5}%
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <DollarSign className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-gray-600">Ingresos</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">${data.revenue}</div>
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  +{Math.floor(Math.random() * 20) + 8}%
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Eye className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-gray-600">Visitas</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{data.visitors}</div>
                </div>
                <div className="text-xs text-purple-600 font-medium">
                  +{Math.floor(Math.random() * 25) + 12}%
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gray-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    <Users className="w-3 h-3 text-orange-600" />
                    <span className="text-xs font-medium text-gray-600">Leads</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{data.leads}</div>
                </div>
                <div className="text-xs text-orange-600 font-medium">
                  +{Math.floor(Math.random() * 18) + 6}%
                </div>
              </div>
            </div>
          </div>

          {/* Feed de actividad más profesional */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Actividad Reciente</span>
            </div>
            
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-center justify-between p-2 rounded-md border transition-all duration-300 bg-white/60 backdrop-blur-sm shadow-sm ${
                  index === 0 ? 'animate-fade-in scale-[1.02] shadow-md' : ''
                } ${getColor(activity.type)}`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {getIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {getLabel(activity.type)} - {activity.customer}
                    </div>
                    <div className="text-xs opacity-70">
                      {activity.timestamp.toLocaleTimeString('es-ES', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
                {activity.value && (
                  <div className="text-xs font-bold">
                    {activity.type === 'revenue' ? `$${activity.value}` : activity.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Versión colapsada más elegante */}
      {isCollapsed && (
        <div className="flex justify-center space-x-2">
          {activities.slice(0, 3).map((activity, index) => (
            <div
              key={activity.id}
              className={`p-2 rounded-full border bg-white/80 backdrop-blur-sm shadow-sm ${getColor(activity.type)} animate-pulse`}
              style={{
                animationDelay: `${index * 300}ms`,
                animationDuration: '2s'
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
