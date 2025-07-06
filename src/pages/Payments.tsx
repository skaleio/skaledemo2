
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const Payments = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Pagos y Facturación</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona pagos, facturas y transacciones
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Centro de Pagos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Administra todos tus pagos y facturación
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Payments;
