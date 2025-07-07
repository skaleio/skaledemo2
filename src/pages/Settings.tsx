
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider, useBusiness } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Zap,
  MessageSquare,
  Globe,
  CreditCard,
  Users,
  BarChart3,
  Bot,
  Phone
} from 'lucide-react';

const SettingsContent = () => {
  const { currentBusiness } = useBusiness();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    whatsapp: true
  });

  const [automations, setAutomations] = useState({
    autoResponder: true,
    leadScoring: false,
    followUp: true,
    retellVoice: true
  });

  if (!currentBusiness) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuración Avanzada</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona la configuración completa de {currentBusiness.name}
          </p>
        </div>
        <Button>
          <SettingsIcon className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Perfil y Branding */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Perfil del Negocio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Nombre del Negocio</Label>
                <Input id="business-name" defaultValue={currentBusiness.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industria</Label>
                <Select defaultValue={currentBusiness.industry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Tecnología</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Healthcare">Salud</SelectItem>
                    <SelectItem value="Finance">Finanzas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" placeholder="Describe tu negocio..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Branding & Personalización</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color Primario</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: currentBusiness.settings.branding.primaryColor }}
                    ></div>
                    <Input value={currentBusiness.settings.branding.primaryColor} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color Secundario</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: currentBusiness.settings.branding.secondaryColor }}
                    ></div>
                    <Input value={currentBusiness.settings.branding.secondaryColor} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input placeholder="https://tu-logo.com/logo.png" />
              </div>
              <div className="space-y-2">
                <Label>Fuente Personalizada</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna 2: Integraciones y Automatizaciones */}
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
                { name: 'WhatsApp Business', icon: MessageSquare, status: currentBusiness.settings.integrations.whatsapp, color: 'green' },
                { name: 'Meta Ads', icon: Globe, status: currentBusiness.settings.integrations.meta, color: 'blue' },
                { name: 'Google Ads', icon: BarChart3, status: currentBusiness.settings.integrations.google, color: 'red' },
                { name: 'HeyGen AI', icon: Bot, status: currentBusiness.settings.integrations.heygen, color: 'purple' },
                { name: 'Retell AI', icon: Phone, status: true, color: 'orange' },
                { name: 'Shopify', icon: CreditCard, status: true, color: 'green' }
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <integration.icon className="w-5 h-5" />
                    <span className="font-medium">{integration.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={integration.status ? `bg-${integration.color}-100 text-${integration.color}-800` : 'bg-gray-100 text-gray-800'}>
                      {integration.status ? 'Conectado' : 'Desconectado'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {integration.status ? 'Configurar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span>Automatizaciones IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-responder">Auto-Responder WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">Respuestas automáticas 24/7</p>
                </div>
                <Switch 
                  id="auto-responder" 
                  checked={automations.autoResponder}
                  onCheckedChange={(checked) => setAutomations({...automations, autoResponder: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lead-scoring">Lead Scoring Automático</Label>
                  <p className="text-sm text-muted-foreground">Calificación inteligente de leads</p>
                </div>
                <Switch 
                  id="lead-scoring" 
                  checked={automations.leadScoring}
                  onCheckedChange={(checked) => setAutomations({...automations, leadScoring: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="follow-up">Follow-up Inteligente</Label>
                  <p className="text-sm text-muted-foreground">Seguimiento automatizado</p>
                </div>
                <Switch 
                  id="follow-up" 
                  checked={automations.followUp}
                  onCheckedChange={(checked) => setAutomations({...automations, followUp: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="retell-voice">Llamadas Retell AI</Label>
                  <p className="text-sm text-muted-foreground">Asistente de voz automatizado</p>
                </div>
                <Switch 
                  id="retell-voice" 
                  checked={automations.retellVoice}
                  onCheckedChange={(checked) => setAutomations({...automations, retellVoice: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna 3: Notificaciones y Seguridad */}
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
                  <Label htmlFor="email-notifications">Email</Label>
                  <p className="text-sm text-muted-foreground">Reportes y alertas</p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notificaciones en tiempo real</p>
                </div>
                <Switch 
                  id="push-notifications" 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS</Label>
                  <p className="text-sm text-muted-foreground">Alertas críticas por SMS</p>
                </div>
                <Switch 
                  id="sms-notifications" 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="whatsapp-notifications">WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">Resúmenes diarios</p>
                </div>
                <Switch 
                  id="whatsapp-notifications" 
                  checked={notifications.whatsapp}
                  onCheckedChange={(checked) => setNotifications({...notifications, whatsapp: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Seguridad Avanzada</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button className="w-full">Cambiar Contraseña</Button>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <Label>Autenticación de 2 Factores</Label>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Añade una capa extra de seguridad
                </p>
                <Button variant="outline" className="w-full">
                  Configurar 2FA
                </Button>
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
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">Plan {currentBusiness.plan.toUpperCase()}</div>
                  <Badge>{currentBusiness.plan === 'enterprise' ? '€299/mes' : currentBusiness.plan === 'pro' ? '€99/mes' : '€29/mes'}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Próximo pago: 15 de Marzo, 2024
                </div>
              </div>
              <Button className="w-full">Actualizar Plan</Button>
              <Button variant="outline" className="w-full">Ver Historial de Pagos</Button>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Uso del Plan</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Usuarios:</span>
                    <span>3/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Integraciones:</span>
                    <span>6/∞</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Llamadas IA:</span>
                    <span>1,247/5,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  console.log('Settings Component: Renderizando configuración avanzada');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <SettingsContent />
      </MainLayout>
    </BusinessProvider>
  );
};

export default Settings;
