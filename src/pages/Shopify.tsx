
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { ShopifyDashboard } from '@/components/shopify/ShopifyDashboard';

const Shopify = () => {
  console.log('Shopify Component: Renderizando dashboard de Shopify');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <ShopifyDashboard />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Shopify;
