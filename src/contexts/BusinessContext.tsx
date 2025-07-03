
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business } from '@/types/business';

interface BusinessContextType {
  currentBusiness: Business | null;
  businesses: Business[];
  setCurrentBusiness: (business: Business) => void;
  isLoading: boolean;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

// Mock data - En producción esto vendría de Airtable
const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'TechStart Solutions',
    industry: 'Technology',
    plan: 'enterprise',
    status: 'active',
    logo: '',
    createdAt: '2024-01-15',
    settings: {
      branding: {
        primaryColor: '#0066CC',
        secondaryColor: '#FFB020'
      },
      integrations: {
        whatsapp: true,
        meta: true,
        google: true,
        heygen: true
      },
      permissions: []
    }
  },
  {
    id: '2',
    name: 'Creative Marketing Agency',
    industry: 'Marketing',
    plan: 'pro',
    status: 'active',
    logo: '',
    createdAt: '2024-02-01',
    settings: {
      branding: {
        primaryColor: '#8B5CF6',
        secondaryColor: '#F59E0B'
      },
      integrations: {
        whatsapp: true,
        meta: true,
        google: false,
        heygen: true
      },
      permissions: []
    }
  },
  {
    id: '3',
    name: 'E-commerce Plus',
    industry: 'E-commerce',
    plan: 'basic',
    status: 'active',
    logo: '',
    createdAt: '2024-02-15',
    settings: {
      branding: {
        primaryColor: '#059669',
        secondaryColor: '#DC2626'
      },
      integrations: {
        whatsapp: true,
        meta: false,
        google: true,
        heygen: false
      },
      permissions: []
    }
  }
];

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos de Airtable
    setTimeout(() => {
      setBusinesses(mockBusinesses);
      setCurrentBusiness(mockBusinesses[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <BusinessContext.Provider value={{
      currentBusiness,
      businesses,
      setCurrentBusiness,
      isLoading
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
