
export interface Business {
  id: string;
  name: string;
  industry: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  logo?: string;
  createdAt: string;
  settings: BusinessSettings;
}

export interface BusinessSettings {
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo?: string;
  };
  integrations: {
    whatsapp: boolean;
    meta: boolean;
    google: boolean;
    heygen: boolean;
  };
  permissions: UserPermission[];
}

export interface UserPermission {
  userId: string;
  role: 'super-admin' | 'business-admin' | 'manager' | 'seller' | 'content-creator' | 'viewer';
  businessId: string;
}

export interface Lead {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  email: string;
  status: 'prospect' | 'contacted' | 'demo' | 'post-demo' | 'disqualified';
  source: 'facebook' | 'google' | 'referral' | 'cold-call' | 'whatsapp';
  estimatedValue: number;
  probability: number;
  assignedTo?: string;
  createdAt: string;
  lastContact?: string;
  notes: string;
  tags: string[];
}

export interface ContentPost {
  id: string;
  businessId: string;
  title: string;
  content: string;
  type: 'image' | 'video' | 'carousel' | 'story' | 'reel';
  platforms: string[];
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  hashtags: string;
  mediaFiles: string[];
  createdBy: string;
}

export interface Campaign {
  id: string;
  businessId: string;
  name: string;
  platform: 'meta' | 'google';
  objective: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    cpc: number;
    ctr: number;
    roas: number;
  };
}
