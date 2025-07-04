
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  ShoppingBag,
  DollarSign,
  Users,
  Package,
  TrendingUp,
  AlertCircle,
  Download,
  Settings,
  RefreshCw,
  Eye,
  ShoppingCart,
  CreditCard,
  BarChart3
} from 'lucide-react';

// Tipos para datos de Shopify
interface ShopifyOrder {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: 'pending' | 'fulfilled' | 'cancelled';
  date: string;
}

interface ShopifyProduct {
  id: string;
  title: string;
  price: number;
  inventory: number;
  sales: number;
  status: 'active' | 'draft' | 'archived';
}

interface ShopifyMetrics {
  totalSales: number;
  ordersToday: number;
  conversionRate: number;
  averageOrderValue: number;
  totalCustomers: number;
  abandonedCarts: number;
}

// Hook para simular datos de Shopify (posteriormente conectar con API real)
const useShopifyData = () => {
  const [metrics, setMetrics] = useState<ShopifyMetrics>({
    totalSales: 45670,
    ordersToday: 23,
    conversionRate: 3.2,
    averageOrderValue: 67.50,
    totalCustomers: 1247,
    abandonedCarts: 8
  });

  const [orders, setOrders] = useState<ShopifyOrder[]>([
    {
      id: '1',
      orderNumber: '#1001',
      customer: 'María González',
      total: 156.99,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: '#1002',
      customer: 'Carlos Rodríguez',
      total: 89.50,
      status: 'fulfilled',
      date: '2024-01-15'
    }
  ]);

  const [products, setProducts] = useState<ShopifyProduct[]>([
    {
      id: '1',
      title: 'Camiseta Premium',
      price: 29.99,
      inventory: 45,
      sales: 156,
      status: 'active'
    },
    {
      id: '2',
      title: 'Jeans Clásicos',
      price: 79.99,
      inventory: 12,
      sales: 89,
      status: 'active'
    }
  ]);

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simular actualización de datos cada 60 segundos
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalSales: prev.totalSales + Math.floor(Math.random() * 100),
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 3),
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 0.5)
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const connectToShopify = async (apiKey: string, shopUrl: string) => {
    setIsLoading(true);
    // Simular conexión (aquí iría la lógica real de OAuth)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setIsLoading(false);
  };

  return {
    metrics,
    orders,
    products,
    isConnected,
    isLoading,
    connectToShopify
  };
};

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
}> = ({ title, value, change, icon: Icon, color }) => (
  <Card className="bg-black/20 backdrop-blur-sm border-gray-700/50">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        {change && (
          <Badge className={change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
            {change > 0 ? '+' : ''}{change}%
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-gray-400 text-sm">{title}</p>
    </CardContent>
  </Card>
);

const ShopifyConnection: React.FC<{
  onConnect: (apiKey: string, shopUrl: string) => void;
  isLoading: boolean;
}> = ({ onConnect, isLoading }) => {
  const [apiKey, setApiKey] = useState('');
  const [shopUrl, setShopUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey && shopUrl) {
      onConnect(apiKey, shopUrl);
    }
  };

  return (
    <Card className="max-w-md mx-auto bg-black/30 backdrop-blur-sm border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <ShoppingBag className="w-5 h-5 text-green-400" />
          <span>Conectar con Shopify</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="shopUrl" className="text-gray-300">URL de tu tienda</Label>
            <Input
              id="shopUrl"
              placeholder="mi-tienda.myshopify.com"
              value={shopUrl}
              onChange={(e) => setShopUrl(e.target.value)}
              className="bg-black/50 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="apiKey" className="text-gray-300">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Ingresa tu API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-black/50 border-gray-600 text-white"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Conectando...
              </>
            ) : (
              'Conectar Tienda'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export const ShopifyDashboard: React.FC = () => {
  const { metrics, orders, products, isConnected, isLoading, connectToShopify } = useShopifyData();

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Integración Shopify</h2>
          <p className="text-gray-400">Conecta tu tienda para ver métricas en tiempo real</p>
        </div>
        <ShopifyConnection onConnect={connectToShopify} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard Shopify</h2>
          <p className="text-gray-400">Métricas y análisis de tu tienda en tiempo real</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">Conectado</span>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Ventas Totales"
          value={`$${metrics.totalSales.toLocaleString()}`}
          change={15.3}
          icon={DollarSign}
          color="bg-green-500"
        />
        <MetricCard
          title="Pedidos Hoy"
          value={metrics.ordersToday}
          change={8.2}
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <MetricCard
          title="Tasa de Conversión"
          value={`${metrics.conversionRate}%`}
          change={-2.1}
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <MetricCard
          title="Valor Promedio Pedido"
          value={`$${metrics.averageOrderValue}`}
          change={5.7}
          icon={CreditCard}
          color="bg-orange-500"
        />
        <MetricCard
          title="Total Clientes"
          value={metrics.totalCustomers.toLocaleString()}
          change={12.4}
          icon={Users}
          color="bg-cyan-500"
        />
        <MetricCard
          title="Carritos Abandonados"
          value={metrics.abandonedCarts}
          icon={AlertCircle}
          color="bg-red-500"
        />
      </div>

      {/* Tabs para diferentes secciones */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="bg-black/30 border-gray-700">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-white/10">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-white/10">
            <Package className="w-4 h-4 mr-2" />
            Productos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 backdrop-blur-sm border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Rendimiento de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Meta Mensual</span>
                      <span className="text-white">75%</span>
                    </div>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Ventas vs Mes Anterior</span>
                      <span className="text-green-400">+15.3%</span>
                    </div>
                    <Progress value={85} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="bg-black/20 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Pedidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{order.orderNumber}</p>
                      <p className="text-gray-400 text-sm">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${order.total}</p>
                      <Badge className={
                        order.status === 'fulfilled' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card className="bg-black/20 backdrop-blur-sm border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Productos Principales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{product.title}</p>
                      <p className="text-gray-400 text-sm">Stock: {product.inventory}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">${product.price}</p>
                      <p className="text-gray-400 text-sm">{product.sales} vendidos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
