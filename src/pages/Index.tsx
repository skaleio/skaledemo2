
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ModernExecutiveDashboard } from '@/components/dashboard/ModernExecutiveDashboard';
import { BusinessProvider } from '@/contexts/BusinessContext';

const Index = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <ModernExecutiveDashboard />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Index;
