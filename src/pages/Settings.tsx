
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';
import { FuturistCounter } from '@/components/dashboard/FuturistCounter';

const Settings = () => {
  console.log('Settings Component: Renderizando configuración');
  
  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-8">
          {/* Contador Digital Futurista */}
          <FuturistCounter />
          
          {/* Separador visual */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          
          {/* Configuración */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Configuración</h1>
                <p className="text-gray-400 mt-1">
                  Gestiona la configuración de tu cuenta y preferencias
                </p>
              </div>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-6">
                <Card className="bg-black/30 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <User className="w-5 h-5" />
                      <span>Perfil</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Nombre</Label>
                      <Input id="name" defaultValue="Juan Pérez" className="bg-black/50 border-gray-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input id="email" type="email" defaultValue="juan@empresa.com" className="bg-black/50 border-gray-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">Empresa</Label>
                      <Input id="company" defaultValue="Mi Empresa" className="bg-black/50 border-gray-600 text-white" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Bell className="w-5 h-5" />
                      <span>Notificaciones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="text-gray-300">Email notifications</Label>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications" className="text-gray-300">Push notifications</Label>
                      <Switch id="push-notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications" className="text-gray-300">SMS notifications</Label>
                      <Switch id="sms-notifications" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/30 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Shield className="w-5 h-5" />
                      <span>Seguridad</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-gray-300">Contraseña actual</Label>
                      <Input id="current-password" type="password" className="bg-black/50 border-gray-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-300">Nueva contraseña</Label>
                      <Input id="new-password" type="password" className="bg-black/50 border-gray-600 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-300">Confirmar contraseña</Label>
                      <Input id="confirm-password" type="password" className="bg-black/50 border-gray-600 text-white" />
                    </div>
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Cambiar Contraseña</Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Database className="w-5 h-5" />
                      <span>Datos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-white/10">
                      Exportar Datos
                    </Button>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-white/10">
                      Importar Datos
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Eliminar Cuenta
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/30 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Integrations</CardTitle>
                    <CardDescription className="text-gray-400">Conecta con servicios externos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'WhatsApp Business', status: 'connected' },
                      { name: 'Google Analytics', status: 'connected' },
                      { name: 'Facebook Ads', status: 'disconnected' },
                      { name: 'Zapier', status: 'disconnected' }
                    ].map((integration, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-black/20">
                        <span className="font-medium text-white">{integration.name}</span>
                        <Button 
                          variant={integration.status === 'connected' ? 'destructive' : 'default'}
                          size="sm"
                          className={integration.status === 'connected' ? '' : 'bg-cyan-600 hover:bg-cyan-700'}
                        >
                          {integration.status === 'connected' ? 'Desconectar' : 'Conectar'}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-sm border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Plan y Facturación</CardTitle>
                    <CardDescription className="text-gray-400">Gestiona tu suscripción</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-black/30 rounded-lg border border-gray-700">
                      <div className="font-semibold text-white">Plan Pro</div>
                      <div className="text-sm text-gray-400">€99/mes</div>
                    </div>
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Actualizar Plan</Button>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-white/10">
                      Ver Facturas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Settings;
