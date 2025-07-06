
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';

const Orders = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Pedidos y Envíos</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona pedidos y seguimiento de envíos
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>Centro de Pedidos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Administra todos tus pedidos y envíos
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Orders;
