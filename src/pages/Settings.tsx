
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

const Settings = () => {
  console.log('Settings Component: Renderizando configuración');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Configuración</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona la configuración de tu cuenta y preferencias
              </p>
            </div>
            <Button>
              <SettingsIcon className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Perfil</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" defaultValue="Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="juan@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" defaultValue="Mi Empresa" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notificaciones</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push notifications</Label>
                    <Switch id="push-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS notifications</Label>
                    <Switch id="sms-notifications" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Seguridad</span>
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
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="w-full">Cambiar Contraseña</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Datos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Exportar Datos
                  </Button>
                  <Button variant="outline" className="w-full">
                    Importar Datos
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Eliminar Cuenta
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Conecta con servicios externos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'WhatsApp Business', status: 'connected' },
                    { name: 'Google Analytics', status: 'connected' },
                    { name: 'Facebook Ads', status: 'disconnected' },
                    { name: 'Zapier', status: 'disconnected' }
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{integration.name}</span>
                      <Button 
                        variant={integration.status === 'connected' ? 'destructive' : 'default'}
                        size="sm"
                      >
                        {integration.status === 'connected' ? 'Desconectar' : 'Conectar'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan y Facturación</CardTitle>
                  <CardDescription>Gestiona tu suscripción</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="font-semibold">Plan Pro</div>
                    <div className="text-sm text-muted-foreground">€99/mes</div>
                  </div>
                  <Button className="w-full">Actualizar Plan</Button>
                  <Button variant="outline" className="w-full">Ver Facturas</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Settings;
