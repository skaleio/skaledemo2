
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Zap,
  MessageSquare,
  Globe,
  BarChart3,
  Bot,
  Phone,
  CreditCard,
  Users,
  Target,
  TrendingUp,
  Shield,
  Database,
  Webhook,
  Mail,
  Smartphone,
  Calendar,
  DollarSign
} from 'lucide-react';

const SettingsContent = () => {
  const { currentBusiness } = useBusiness();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    whatsapp: true,
    slack: false
  });

  const [automations, setAutomations] = useState({
    autoResponder: true,
    leadScoring: false,
    followUp: true,
    retellVoice: true,
    emailSequences: true,
    adOptimization: false
  });

  const [apiSettings, setApiSettings] = useState({
    webhookUrl: 'https://skale.ai/webhook/business-' + currentBusiness?.id,
    rateLimiting: true,
    encryption: true,
    backups: true
  });

  if (!currentBusiness) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Centro de Control SKALE</h1>
          <p className="text-muted-foreground mt-1">
            Configuración avanzada para maximizar los resultados de {currentBusiness.name}
          </p>
        </div>
        <Button>
          <SettingsIcon className="w-4 h-4 mr-2" />
          Guardar Todo
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Integraciones y APIs */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Integraciones Activas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'WhatsApp Business', icon: MessageSquare, status: currentBusiness.settings.integrations.whatsapp, color: 'green', revenue: '+25%' },
                { name: 'Meta Ads', icon: Globe, status: currentBusiness.settings.integrations.meta, color: 'blue', revenue: '+40%' },
                { name: 'Google Ads', icon: BarChart3, status: currentBusiness.settings.integrations.google, color: 'red', revenue: '+35%' },
                { name: 'HeyGen AI', icon: Bot, status: currentBusiness.settings.integrations.heygen, color: 'purple', revenue: '+60%' },
                { name: 'Retell AI', icon: Phone, status: true, color: 'orange', revenue: '+80%' },
                { name: 'Shopify', icon: CreditCard, status: true, color: 'green', revenue: '+90%' },
                { name: 'Zapier', icon: Webhook, status: true, color: 'orange', revenue: '+30%' },
                { name: 'Slack', icon: MessageSquare, status: false, color: 'purple', revenue: '+15%' }
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <integration.icon className="w-5 h-5" />
                    <div>
                      <span className="font-medium">{integration.name}</span>
                      <div className="text-xs text-muted-foreground">Impacto: {integration.revenue}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={integration.status ? `bg-${integration.color}-100 text-${integration.color}-800` : 'bg-gray-100 text-gray-800'}>
                      {integration.status ? 'Activo' : 'Inactivo'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {integration.status ? 'Config' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>APIs & Webhooks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input value={apiSettings.webhookUrl} readOnly />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">1000 req/min</p>
                </div>
                <Switch 
                  checked={apiSettings.rateLimiting}
                  onCheckedChange={(checked) => setApiSettings({...apiSettings, rateLimiting: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Encriptación SSL</Label>
                  <p className="text-sm text-muted-foreground">Seguridad empresarial</p>
                </div>
                <Switch 
                  checked={apiSettings.encryption}
                  onCheckedChange={(checked) => setApiSettings({...apiSettings, encryption: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Backups Automáticos</Label>
                  <p className="text-sm text-muted-foreground">Cada 6 horas</p>
                </div>
                <Switch 
                  checked={apiSettings.backups}
                  onCheckedChange={(checked) => setApiSettings({...apiSettings, backups: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna 2: Automatizaciones IA */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span>Automatizaciones IA</span>
              </CardTitle>
              <CardDescription>
                Sistemas que trabajan 24/7 para incrementar tus ganancias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Responder WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">Respuestas instantáneas +40% conversión</p>
                </div>
                <Switch 
                  checked={automations.autoResponder}
                  onCheckedChange={(checked) => setAutomations({...automations, autoResponder: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Lead Scoring IA</Label>
                  <p className="text-sm text-muted-foreground">Priorización automática +60% cierre</p>
                </div>
                <Switch 
                  checked={automations.leadScoring}
                  onCheckedChange={(checked) => setAutomations({...automations, leadScoring: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Follow-up Inteligente</Label>
                  <p className="text-sm text-muted-foreground">Secuencias personalizadas +80% engagement</p>
                </div>
                <Switch 
                  checked={automations.followUp}
                  onCheckedChange={(checked) => setAutomations({...automations, followUp: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Retell Voice AI</Label>
                  <p className="text-sm text-muted-foreground">Llamadas automáticas +120% leads</p>
                </div>
                <Switch 
                  checked={automations.retellVoice}
                  onCheckedChange={(checked) => setAutomations({...automations, retellVoice: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Sequences</Label>
                  <p className="text-sm text-muted-foreground">Nurturing automático +90% LTV</p>
                </div>
                <Switch 
                  checked={automations.emailSequences}
                  onCheckedChange={(checked) => setAutomations({...automations, emailSequences: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Optimización de Ads</Label>
                  <p className="text-sm text-muted-foreground">IA ajusta campañas +200% ROAS</p>
                </div>
                <Switch 
                  checked={automations.adOptimization}
                  onCheckedChange={(checked) => setAutomations({...automations, adOptimization: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Métricas de Rendimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-700">↑347%</div>
                  <div className="text-sm text-green-600">ROI General</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700">↑280%</div>
                  <div className="text-sm text-blue-600">Conversiones</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-700">↑156%</div>
                  <div className="text-sm text-purple-600">Leads Quality</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-700">↑420%</div>
                  <div className="text-sm text-orange-600">Customer LTV</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna 3: Notificaciones y Facturación */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Centro de Notificaciones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Reports</Label>
                  <p className="text-sm text-muted-foreground">Reportes diarios y semanales</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Alertas en tiempo real</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Críticos</Label>
                  <p className="text-sm text-muted-foreground">Solo emergencias</p>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>WhatsApp Business</Label>
                  <p className="text-sm text-muted-foreground">Resúmenes y alertas</p>
                </div>
                <Switch 
                  checked={notifications.whatsapp}
                  onCheckedChange={(checked) => setNotifications({...notifications, whatsapp: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Slack Integration</Label>
                  <p className="text-sm text-muted-foreground">Notificaciones de equipo</p>
                </div>
                <Switch 
                  checked={notifications.slack}
                  onCheckedChange={(checked) => setNotifications({...notifications, slack: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Plan y Facturación</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">Plan {currentBusiness.plan.toUpperCase()}</div>
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {currentBusiness.plan === 'enterprise' ? '€599/mes' : currentBusiness.plan === 'pro' ? '€199/mes' : '€49/mes'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  ROI promedio: {currentBusiness.plan === 'enterprise' ? '8.2x' : currentBusiness.plan === 'pro' ? '5.7x' : '3.4x'}
                </div>
                <div className="text-xs bg-white/50 p-2 rounded">
                  Próximo pago: 15 de Marzo, 2024
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
              <Button variant="outline" className="w-full">Ver Historial</Button>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Uso del Plan</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Usuarios activos:</span>
                    <span className="font-medium">
                      {currentBusiness.plan === 'enterprise' ? '12/∞' : currentBusiness.plan === 'pro' ? '5/25' : '2/5'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Llamadas IA/mes:</span>
                    <span className="font-medium">
                      {currentBusiness.plan === 'enterprise' ? '8,247/∞' : currentBusiness.plan === 'pro' ? '1,847/10K' : '347/1K'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Leads procesados:</span>
                    <span className="font-medium">
                      {currentBusiness.plan === 'enterprise' ? '15,678/∞' : currentBusiness.plan === 'pro' ? '3,247/25K' : '892/5K'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage (GB):</span>
                    <span className="font-medium">
                      {currentBusiness.plan === 'enterprise' ? '847/∞' : currentBusiness.plan === 'pro' ? '23/500' : '4.2/50'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Soporte Premium</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat con Experto
              </Button>
              <Button className="w-full" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Llamada Estratégica
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consultoría
              </Button>
              <div className="text-xs text-center text-muted-foreground pt-2">
                Respuesta garantizada en menos de 2 horas
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  console.log('Settings Component: Renderizando centro de control SKALE');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <SettingsContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Settings;
