
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business } from '@/types/business';

interface BusinessContextType {
  currentBusiness: Business | null;
  businesses: Business[];
  setCurrentBusiness: (business: Business) => void;
  isLoading: boolean;
  businessData: BusinessData;
  unreadNotifications: number;
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
    inventory: Array<{
      id: string;
      name: string;
      stock: number;
      price: string;
      status: 'En Stock' | 'Bajo Stock' | 'Agotado';
      image: string;
      category: string;
    }>;
    recentOrders: Array<{
      id: string;
      customer: string;
      amount: string;
      status: string;
      date: string;
      items: number;
    }>;
    topProducts: Array<{
      name: string;
      sold: number;
      price: string;
      status: string;
    }>;
    shipping: {
      pending: number;
      inTransit: number;
      delivered: number;
      returned: number;
    };
    payments: {
      totalProcessed: string;
      pending: string;
      failed: number;
      refunds: number;
    };
  };
  retell: {
    calls: number;
    duration: string;
    voices: number;
    successRate: string;
    voiceLibrary: Array<{
      id: string;
      name: string;
      language: string;
      gender: string;
      accent: string;
      sample: string;
      usage: number;
    }>;
  };
  seo: {
    organicTraffic: number;
    keywords: number;
    backlinks: number;
    ranking: number;
  };
  ads: {
    googleAds: {
      spent: string;
      impressions: number;
      clicks: number;
      ctr: string;
      conversions: number;
    };
    metaAds: {
      spent: string;
      reach: number;
      engagement: string;
      leads: number;
      roas: string;
    };
  };
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

// Mock data con datos específicos por negocio y logos
const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'TechStart Solutions',
    industry: 'Technology',
    plan: 'enterprise',
    status: 'active',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
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
    logo: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=100&h=100&fit=crop&crop=center',
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
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
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
      inventory: [
        { id: 'TECH001', name: 'Software License Pro', stock: 50, price: '$299.99', status: 'En Stock', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop', category: 'Software' },
        { id: 'TECH002', name: 'Cloud Storage 1TB', stock: 15, price: '$19.99', status: 'Bajo Stock', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop', category: 'Storage' },
        { id: 'TECH003', name: 'API Access Premium', stock: 0, price: '$99.99', status: 'Agotado', image: 'https://images.unsplash.com/photo-1555949963-ff9fe19c6ca9?w=200&h=200&fit=crop', category: 'API' },
        { id: 'TECH004', name: 'Development Tools', stock: 75, price: '$79.99', status: 'En Stock', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=200&fit=crop', category: 'Tools' }
      ],
      recentOrders: [
        { id: '#1001', customer: 'Tech Corp', amount: '$125.99', status: 'Completado', date: '2024-03-10', items: 3 },
        { id: '#1002', customer: 'StartUp LLC', amount: '$89.50', status: 'Pendiente', date: '2024-03-10', items: 1 },
        { id: '#1003', customer: 'Innovation Hub', amount: '$245.00', status: 'Enviado', date: '2024-03-09', items: 2 },
        { id: '#1004', customer: 'Dev Solutions', amount: '$67.25', status: 'Procesando', date: '2024-03-09', items: 1 },
        { id: '#1005', customer: 'Digital Agency', amount: '$156.80', status: 'Completado', date: '2024-03-08', items: 4 }
      ],
      topProducts: [
        { name: 'Software License Pro', sold: 45, price: '$299.99', status: 'Activo' },
        { name: 'Cloud Storage 1TB', sold: 32, price: '$19.99', status: 'Activo' },
        { name: 'API Access Premium', sold: 28, price: '$99.99', status: 'Activo' },
        { name: 'Tech Support Package', sold: 15, price: '$149.99', status: 'Activo' },
        { name: 'Development Tools', sold: 12, price: '$79.99', status: 'Activo' }
      ],
      shipping: { pending: 23, inTransit: 67, delivered: 456, returned: 8 },
      payments: { totalProcessed: '$23,456', pending: '$1,234', failed: 3, refunds: 7 }
    },
    retell: {
      calls: 1247,
      duration: '4.2min',
      voices: 4,
      successRate: '87.3%',
      voiceLibrary: [
        { id: 'voice_1', name: 'Alex Professional', language: 'Español', gender: 'Masculino', accent: 'Neutro', sample: 'audio_sample_1.mp3', usage: 45 },
        { id: 'voice_2', name: 'Sofia Executive', language: 'Español', gender: 'Femenino', accent: 'Madrid', sample: 'audio_sample_2.mp3', usage: 67 },
        { id: 'voice_3', name: 'Carlos Sales', language: 'Español', gender: 'Masculino', accent: 'Mexicano', sample: 'audio_sample_3.mp3', usage: 23 },
        { id: 'voice_4', name: 'Isabella Support', language: 'Español', gender: 'Femenino', accent: 'Argentino', sample: 'audio_sample_4.mp3', usage: 12 }
      ]
    },
    seo: { organicTraffic: 12500, keywords: 147, backlinks: 234, ranking: 15 },
    ads: {
      googleAds: { spent: '$2,847', impressions: 89420, clicks: 3247, ctr: '3.6%', conversions: 156 },
      metaAds: { spent: '$1,950', reach: 67890, engagement: '4.2%', leads: 234, roas: '3.8x' }
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
      inventory: [
        { id: 'MKT001', name: 'Logo Design Package', stock: 25, price: '$199.99', status: 'En Stock', image: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=200&h=200&fit=crop', category: 'Design' },
        { id: 'MKT002', name: 'Social Media Kit', stock: 8, price: '$89.99', status: 'Bajo Stock', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop', category: 'Marketing' },
        { id: 'MKT003', name: 'Brand Guidelines', stock: 30, price: '$149.99', status: 'En Stock', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop', category: 'Branding' },
        { id: 'MKT004', name: 'Video Content Pack', stock: 0, price: '$299.99', status: 'Agotado', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&h=200&fit=crop', category: 'Video' }
      ],
      recentOrders: [
        { id: '#2001', customer: 'Brand Studio', amount: '$299.99', status: 'Completado', date: '2024-03-10', items: 2 },
        { id: '#2002', customer: 'Creative Co', amount: '$189.50', status: 'Pendiente', date: '2024-03-09', items: 3 },
        { id: '#2003', customer: 'Design House', amount: '$445.00', status: 'Enviado', date: '2024-03-09', items: 1 },
        { id: '#2004', customer: 'Media Group', amount: '$167.25', status: 'Procesando', date: '2024-03-08', items: 2 },
        { id: '#2005', customer: 'Ad Agency', amount: '$356.80', status: 'Completado', date: '2024-03-08', items: 4 }
      ],
      topProducts: [
        { name: 'Logo Design Package', sold: 78, price: '$199.99', status: 'Activo' },
        { name: 'Social Media Kit', sold: 65, price: '$89.99', status: 'Activo' },
        { name: 'Brand Guidelines', sold: 42, price: '$149.99', status: 'Activo' },
        { name: 'Video Content Pack', sold: 28, price: '$299.99', status: 'Activo' },
        { name: 'Marketing Templates', sold: 35, price: '$49.99', status: 'Activo' }
      ],
      shipping: { pending: 15, inTransit: 34, delivered: 289, returned: 5 },
      payments: { totalProcessed: '$15,678', pending: '$567', failed: 2, refunds: 4 }
    },
    retell: {
      calls: 856,
      duration: '3.8min',
      voices: 6,
      successRate: '92.1%',
      voiceLibrary: [
        { id: 'voice_5', name: 'Emma Creative', language: 'Inglés', gender: 'Femenino', accent: 'American', sample: 'audio_sample_5.mp3', usage: 89 },
        { id: 'voice_6', name: 'David Pitch', language: 'Español', gender: 'Masculino', accent: 'Barcelona', sample: 'audio_sample_6.mp3', usage: 56 },
        { id: 'voice_7', name: 'Luna Friendly', language: 'Español', gender: 'Femenino', accent: 'Colombia', sample: 'audio_sample_7.mp3', usage: 34 },
        { id: 'voice_8', name: 'Max Energy', language: 'Inglés', gender: 'Masculino', accent: 'British', sample: 'audio_sample_8.mp3', usage: 23 }
      ]
    },
    seo: { organicTraffic: 8900, keywords: 89, backlinks: 156, ranking: 8 },
    ads: {
      googleAds: { spent: '$1,456', impressions: 45600, clicks: 1890, ctr: '4.1%', conversions: 89 },
      metaAds: { spent: '$2,340', reach: 89450, engagement: '5.7%', leads: 345, roas: '4.2x' }
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
      inventory: [
        { id: 'EC001', name: 'Wireless Headphones', stock: 156, price: '$79.99', status: 'En Stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', category: 'Electronics' },
        { id: 'EC002', name: 'Smart Watch', stock: 23, price: '$199.99', status: 'Bajo Stock', image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=200&h=200&fit=crop', category: 'Wearables' },
        { id: 'EC003', name: 'Phone Case Premium', stock: 0, price: '$24.99', status: 'Agotado', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop', category: 'Accessories' },
        { id: 'EC004', name: 'Bluetooth Speaker', stock: 89, price: '$49.99', status: 'En Stock', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop', category: 'Audio' }
      ],
      recentOrders: [
        { id: '#3001', customer: 'Fashion Lover', amount: '$45.99', status: 'Completado', date: '2024-03-10', items: 1 },
        { id: '#3002', customer: 'Style Queen', amount: '$78.50', status: 'Pendiente', date: '2024-03-10', items: 2 },
        { id: '#3003', customer: 'Trendy Buyer', amount: '$125.00', status: 'Enviado', date: '2024-03-09', items: 3 },
        { id: '#3004', customer: 'Shop Master', amount: '$34.25', status: 'Procesando', date: '2024-03-09', items: 1 },
        { id: '#3005', customer: 'Deal Hunter', amount: '$89.80', status: 'Completado', date: '2024-03-08', items: 2 }
      ],
      topProducts: [
        { name: 'Wireless Headphones', sold: 156, price: '$79.99', status: 'Activo' },
        { name: 'Smart Watch', sold: 134, price: '$199.99', status: 'Activo' },
        { name: 'Phone Case Premium', sold: 89, price: '$24.99', status: 'Activo' },
        { name: 'Bluetooth Speaker', sold: 67, price: '$49.99', status: 'Activo' },
        { name: 'Laptop Stand', sold: 45, price: '$39.99', status: 'Activo' }
      ],
      shipping: { pending: 67, inTransit: 123, delivered: 1234, returned: 23 },
      payments: { totalProcessed: '$67,890', pending: '$2,345', failed: 12, refunds: 34 }
    },
    retell: {
      calls: 2341,
      duration: '2.9min',
      voices: 3,
      successRate: '78.6%',
      voiceLibrary: [
        { id: 'voice_9', name: 'Ana Customer Care', language: 'Español', gender: 'Femenino', accent: 'Peruano', sample: 'audio_sample_9.mp3', usage: 156 },
        { id: 'voice_10', name: 'Roberto Sales', language: 'Español', gender: 'Masculino', accent: 'Chile', sample: 'audio_sample_10.mp3', usage: 89 },
        { id: 'voice_11', name: 'Carmen Support', language: 'Español', gender: 'Femenino', accent: 'España', sample: 'audio_sample_11.mp3', usage: 67 }
      ]
    },
    seo: { organicTraffic: 23400, keywords: 234, backlinks: 345, ranking: 24 },
    ads: {
      googleAds: { spent: '$3,456', impressions: 123450, clicks: 4567, ctr: '3.7%', conversions: 234 },
      metaAds: { spent: '$2,890', reach: 145600, engagement: '3.8%', leads: 456, roas: '3.2x' }
    }
  }
};

// Notificaciones simuladas por negocio
const notificationCounts: Record<string, number> = {
  '1': 3, // TechStart
  '2': 7, // Creative Agency  
  '3': 12 // E-commerce
};

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessData, setBusinessData] = useState<BusinessData>(businessDataMap['1']);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos de Airtable
    setTimeout(() => {
      setBusinesses(mockBusinesses);
      setCurrentBusiness(mockBusinesses[0]);
      setBusinessData(businessDataMap['1']);
      setUnreadNotifications(notificationCounts['1']);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSetCurrentBusiness = (business: Business) => {
    console.log('Cambiando a negocio:', business.name);
    setCurrentBusiness(business);
    setBusinessData(businessDataMap[business.id] || businessDataMap['1']);
    setUnreadNotifications(notificationCounts[business.id] || 0);
  };

  return (
    <BusinessContext.Provider value={{
      currentBusiness,
      businesses,
      setCurrentBusiness: handleSetCurrentBusiness,
      isLoading,
      businessData,
      unreadNotifications
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
