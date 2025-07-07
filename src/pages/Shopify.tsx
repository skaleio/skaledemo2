
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp,
  Users,
  Settings,
  Plus,
  ExternalLink,
  Zap,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const ShopifyContent = () => {
  const { businessData } = useBusiness();
  const [isConnected, setIsConnected] = useState(true);

  const shopifyData = businessData?.shopify;

  if (!shopifyData) return <div>Cargando datos de Shopify...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shopify Control Center</h1>
          <p className="text-muted-foreground mt-1">
            Controla tu tienda Shopify directamente desde SKALE
          </p>
        </div>
        {!isConnected ? (
          <Button onClick={() => setIsConnected(true)}>
            <Zap className="w-4 h-4 mr-2" />
            Conectar Shopify
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Sincronizar Datos
            </Button>
          </div>
        )}
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Conecta tu tienda Shopify</CardTitle>
            <CardDescription>
              Integra tu tienda para gestionar productos, pedidos y más desde SKALE
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">URL de tu tienda</label>
              <Input placeholder="mi-tienda.myshopify.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <Input placeholder="Ingresa tu API Key de Shopify" type="password" />
            </div>
            <Button className="w-full" onClick={() => setIsConnected(true)}>
              Conectar Tienda
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-muted-foreground">Pedidos Hoy</span>
                    </div>
                    <div className="text-2xl font-bold">{shopifyData.orders}</div>
                    <div className="text-xs text-green-600">+12% vs ayer</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: 300</div>
                    <Progress value={(shopifyData.orders / 300) * 100} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-muted-foreground">Ventas Hoy</span>
                    </div>
                    <div className="text-2xl font-bold">{shopifyData.revenue}</div>
                    <div className="text-xs text-green-600">+8.5% vs ayer</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Meta: $20K</div>
                    <Progress value={65} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-muted-foreground">Productos</span>
                    </div>
                    <div className="text-2xl font-bold">{shopifyData.products.toLocaleString()}</div>
                    <div className="text-xs text-blue-600">156 sin stock</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Activos</div>
                    <Progress value={89} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-muted-foreground">Clientes</span>
                    </div>
                    <div className="text-2xl font-bold">{shopifyData.customers.toLocaleString()}</div>
                    <div className="text-xs text-green-600">+45 nuevos hoy</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Activos</div>
                    <Progress value={92} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas y notificaciones */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-semibold text-red-800">Stock Bajo</div>
                    <div className="text-sm text-red-600">23 productos necesitan restock</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-semibold text-yellow-800">Pedidos Pendientes</div>
                    <div className="text-sm text-yellow-600">47 pedidos por procesar</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">Sincronización OK</div>
                    <div className="text-sm text-green-600">Última sync: hace 2 min</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pedidos Recientes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Pedidos Recientes</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver en Shopify
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shopifyData.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">Hace 2h</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <Badge 
                          variant={
                            order.status === 'Completado' ? 'default' :
                            order.status === 'Pendiente' ? 'secondary' :
                            order.status === 'Enviado' ? 'outline' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Productos Top */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Productos Más Vendidos</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Gestionar Inventario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shopifyData.topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{product.sold} vendidos</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>4.{Math.floor(Math.random() * 9) + 1}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{product.price}</p>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas de rendimiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Análisis de Rendimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">92.5%</div>
                  <div className="text-sm text-muted-foreground">Tasa de Conversión</div>
                  <Progress value={92.5} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$127</div>
                  <div className="text-sm text-muted-foreground">Valor Promedio Pedido</div>
                  <Progress value={78} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.7</div>
                  <div className="text-sm text-muted-foreground">Rating Promedio</div>
                  <Progress value={94} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">2.3</div>
                  <div className="text-sm text-muted-foreground">Productos por Pedido</div>
                  <Progress value={65} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

const Shopify = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <ShopifyContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Shopify;
