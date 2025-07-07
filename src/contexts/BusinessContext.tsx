
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business } from '@/types/business';

interface BusinessContextType {
  currentBusiness: Business | null;
  businesses: Business[];
  setCurrentBusiness: (business: Business) => void;
  isLoading: boolean;
  businessData: BusinessData;
}

interface BusinessData {
  dashboard: {
    totalRevenue: string;
    monthlyGrowth: string;
    activeLeads: number;
    conversionRate: string;
    whatsappMessages: number;
    socialReach: string;
  };
  shopify: {
    orders: number;
    revenue: string;
    products: number;
    customers: number;
    recentOrders: Array<{
      id: string;
      customer: string;
      amount: string;
      status: string;
    }>;
    topProducts: Array<{
      name: string;
      sold: number;
      price: string;
      status: string;
    }>;
  };
  retell: {
    calls: number;
    duration: string;
    voices: number;
    successRate: string;
  };
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

// Mock data con datos específicos por negocio
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

const businessDataMap: Record<string, BusinessData> = {
  '1': { // TechStart Solutions
    dashboard: {
      totalRevenue: '$284,500',
      monthlyGrowth: '+12.5%',
      activeLeads: 342,
      conversionRate: '15.8%',
      whatsappMessages: 1247,
      socialReach: '45.2K'
    },
    shopify: {
      orders: 247,
      revenue: '$12,450',
      products: 1248,
      customers: 3421,
      recentOrders: [
        { id: '#1001', customer: 'Tech Corp', amount: '$125.99', status: 'Completado' },
        { id: '#1002', customer: 'StartUp LLC', amount: '$89.50', status: 'Pendiente' },
        { id: '#1003', customer: 'Innovation Hub', amount: '$245.00', status: 'Enviado' },
        { id: '#1004', customer: 'Dev Solutions', amount: '$67.25', status: 'Procesando' },
        { id: '#1005', customer: 'Digital Agency', amount: '$156.80', status: 'Completado' }
      ],
      topProducts: [
        { name: 'Software License Pro', sold: 45, price: '$299.99', status: 'Activo' },
        { name: 'Cloud Storage 1TB', sold: 32, price: '$19.99', status: 'Activo' },
        { name: 'API Access Premium', sold: 28, price: '$99.99', status: 'Activo' },
        { name: 'Tech Support Package', sold: 15, price: '$149.99', status: 'Activo' },
        { name: 'Development Tools', sold: 12, price: '$79.99', status: 'Activo' }
      ]
    },
    retell: {
      calls: 1247,
      duration: '4.2min',
      voices: 4,
      successRate: '87.3%'
    }
  },
  '2': { // Creative Marketing Agency
    dashboard: {
      totalRevenue: '$156,800',
      monthlyGrowth: '+8.3%',
      activeLeads: 189,
      conversionRate: '22.4%',
      whatsappMessages: 856,
      socialReach: '78.9K'
    },
    shopify: {
      orders: 189,
      revenue: '$8,750',
      products: 456,
      customers: 2156,
      recentOrders: [
        { id: '#2001', customer: 'Brand Studio', amount: '$299.99', status: 'Completado' },
        { id: '#2002', customer: 'Creative Co', amount: '$189.50', status: 'Pendiente' },
        { id: '#2003', customer: 'Design House', amount: '$445.00', status: 'Enviado' },
        { id: '#2004', customer: 'Media Group', amount: '$167.25', status: 'Procesando' },
        { id: '#2005', customer: 'Ad Agency', amount: '$356.80', status: 'Completado' }
      ],
      topProducts: [
        { name: 'Logo Design Package', sold: 78, price: '$199.99', status: 'Activo' },
        { name: 'Social Media Kit', sold: 65, price: '$89.99', status: 'Activo' },
        { name: 'Brand Guidelines', sold: 42, price: '$149.99', status: 'Activo' },
        { name: 'Video Content Pack', sold: 28, price: '$299.99', status: 'Activo' },
        { name: 'Marketing Templates', sold: 35, price: '$49.99', status: 'Activo' }
      ]
    },
    retell: {
      calls: 856,
      duration: '3.8min',
      voices: 6,
      successRate: '92.1%'
    }
  },
  '3': { // E-commerce Plus
    dashboard: {
      totalRevenue: '$89,200',
      monthlyGrowth: '+15.7%',
      activeLeads: 567,
      conversionRate: '11.2%',
      whatsappMessages: 2341,
      socialReach: '23.4K'
    },
    shopify: {
      orders: 456,
      revenue: '$15,670',
      products: 2847,
      customers: 5642,
      recentOrders: [
        { id: '#3001', customer: 'Fashion Lover', amount: '$45.99', status: 'Completado' },
        { id: '#3002', customer: 'Style Queen', amount: '$78.50', status: 'Pendiente' },
        { id: '#3003', customer: 'Trendy Buyer', amount: '$125.00', status: 'Enviado' },
        { id: '#3004', customer: 'Shop Master', amount: '$34.25', status: 'Procesando' },
        { id: '#3005', customer: 'Deal Hunter', amount: '$89.80', status: 'Completado' }
      ],
      topProducts: [
        { name: 'Wireless Headphones', sold: 156, price: '$79.99', status: 'Activo' },
        { name: 'Smart Watch', sold: 134, price: '$199.99', status: 'Activo' },
        { name: 'Phone Case Premium', sold: 89, price: '$24.99', status: 'Activo' },
        { name: 'Bluetooth Speaker', sold: 67, price: '$49.99', status: 'Activo' },
        { name: 'Laptop Stand', sold: 45, price: '$39.99', status: 'Activo' }
      ]
    },
    retell: {
      calls: 2341,
      duration: '2.9min',
      voices: 3,
      successRate: '78.6%'
    }
  }
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessData, setBusinessData] = useState<BusinessData>(businessDataMap['1']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos de Airtable
    setTimeout(() => {
      setBusinesses(mockBusinesses);
      setCurrentBusiness(mockBusinesses[0]);
      setBusinessData(businessDataMap['1']);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSetCurrentBusiness = (business: Business) => {
    setCurrentBusiness(business);
    setBusinessData(businessDataMap[business.id] || businessDataMap['1']);
  };

  return (
    <BusinessContext.Provider value={{
      currentBusiness,
      businesses,
      setCurrentBusiness: handleSetCurrentBusiness,
      isLoading,
      businessData
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
