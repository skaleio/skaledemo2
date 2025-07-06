
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';

const Products = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Gestión de Productos</h1>
              <p className="text-muted-foreground mt-1">
                Administra tu catálogo de productos
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Catálogo de Productos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Gestiona todos tus productos desde aquí
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Products;
