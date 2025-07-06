
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp,
  Users,
  Settings,
  Plus,
  ExternalLink,
  Zap
} from 'lucide-react';

const Shopify = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Shopify Integration</h1>
              <p className="text-muted-foreground mt-1">
                Controla tu tienda Shopify directamente desde SKALE
              </p>
            </div>
            {!isConnected && (
              <Button onClick={() => setIsConnected(true)}>
                <Zap className="w-4 h-4 mr-2" />
                Conectar Shopify
              </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold">247</div>
                        <p className="text-sm text-muted-foreground">Pedidos Hoy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">$12,450</div>
                        <p className="text-sm text-muted-foreground">Ventas Hoy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-2xl font-bold">1,248</div>
                        <p className="text-sm text-muted-foreground">Productos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="text-2xl font-bold">3,421</div>
                        <p className="text-sm text-muted-foreground">Clientes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Pedidos Recientes</CardTitle>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver en Shopify
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((order) => (
                        <div key={order} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">#100{order}</p>
                            <p className="text-sm text-muted-foreground">Cliente {order}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                            <Badge variant="secondary">Pendiente</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Productos Top</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo Producto
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'].map((product, index) => (
                        <div key={product} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{product}</p>
                            <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)} vendidos</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(Math.random() * 100 + 20).toFixed(2)}</p>
                            <Badge className="bg-green-100 text-green-800">Activo</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Shopify;
