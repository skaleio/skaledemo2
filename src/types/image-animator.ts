export interface Animation {
  id: string;
  fileName: string;
  originalImage: string;
  resultVideo?: string;
  status: 'pending' | 'uploading' | 'processing_pika' | 'processing_higgsfield' | 'processing_kling' | 'completed' | 'error';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  config: AnimationConfig;
  errorMessage?: string;
  estimatedCompletionTime?: Date;
  userId: string;
}

export interface AnimationConfig {
  duration: number; // 2-10 seconds
  style: 'smooth' | 'cinematic' | 'dynamic' | 'artistic';
  speed: number; // 0.5x to 2x
  quality: '720p' | '1080p' | '4k';
  enhancePeople: boolean;
  stabilization: boolean;
}

export interface AnimationQueue {
  id: string;
  animations: Animation[];
  isProcessing: boolean;
  currentAnimation?: string;
  estimatedTimeRemaining: number;
}

export interface UserCredits {
  userId: string;
  availableCredits: number;
  totalUsed: number;
  lastUpdated: Date;
  subscriptionType?: 'basic' | 'premium' | 'enterprise';
}

export interface ProcessingStage {
  stage: 'upload' | 'pika' | 'higgsfield' | 'kling' | 'complete';
  status: 'pending' | 'processing' | 'completed' | 'error';
  startTime?: Date;
  endTime?: Date;
  progress: number;
  errorMessage?: string;
}

export interface AnimationExample {
  id: string;
  title: string;
  beforeImage: string;
  afterVideo: string;
  thumbnail: string;
  style: string;
  duration: number;
  likes: number;
  views: number;
  category: string;
  tags: string[];
  featured: boolean;
}

export interface BillingInfo {
  costPerCredit: number;
  packagePricing: {
    basic: { credits: number; price: number; savings?: number };
    premium: { credits: number; price: number; savings?: number };
    enterprise: { credits: number; price: number; savings?: number };
  };
}