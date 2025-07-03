
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ExecutiveDashboard } from '@/components/dashboard/ExecutiveDashboard';
import { BusinessProvider } from '@/contexts/BusinessContext';

const Index = () => {
  return (
    <BusinessProvider>
      <MainLayout>
        <ExecutiveDashboard />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Index;
