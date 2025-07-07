
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import { useBusiness } from '@/contexts/BusinessContext';

export const BusinessSelector = () => {
  const { currentBusiness, businesses, setCurrentBusiness, isLoading } = useBusiness();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-muted rounded-lg"></div>
        <div className="w-32 h-4 bg-muted rounded"></div>
      </div>
    );
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-primary text-primary-foreground';
      case 'pro': return 'bg-accent text-accent-foreground';
      case 'basic': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Icono del negocio */}
      <div className="relative">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Building2 className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <div className="flex-1">
        <Select
          value={currentBusiness?.id}
          onValueChange={(value) => {
            const business = businesses.find(b => b.id === value);
            if (business) setCurrentBusiness(business);
          }}
        >
          <SelectTrigger className="w-[280px] border-0 bg-transparent font-medium">
            <SelectValue placeholder="Seleccionar negocio..." />
          </SelectTrigger>
          <SelectContent>
            {businesses.map((business) => (
              <SelectItem key={business.id} value={business.id}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                      <Building2 className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{business.name}</span>
                      <span className="text-xs text-muted-foreground">{business.industry}</span>
                    </div>
                  </div>
                  <Badge className={`ml-2 text-xs ${getPlanColor(business.plan)}`}>
                    {business.plan.toUpperCase()}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
