
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BusinessProvider } from '@/contexts/BusinessContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Target, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Search, 
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const logs = [
  {
    id: 1,
    timestamp: '2024-07-03T11:45:32',
    level: 'info',
    service: 'WhatsApp Bot',
    message: 'Message sent successfully to user +34600123456',
    details: 'Lead qualification workflow executed'
  },
  {
    id: 2,
    timestamp: '2024-07-03T11:44:15',
    level: 'error',
    service: 'Email Service',
    message: 'Failed to send email to maria@email.com',
    details: 'SMTP server connection timeout'
  },
  {
    id: 3,
    timestamp: '2024-07-03T11:43:28',
    level: 'warning',
    service: 'CRM Sync',
    message: 'Lead data partially synchronized',
    details: 'Missing phone number field for lead ID 1247'
  },
  {
    id: 4,
    timestamp: '2024-07-03T11:42:44',
    level: 'success',
    service: 'Payment Gateway',
    message: 'Payment processed successfully',
    details: 'Transaction ID: TXN_789456123 - Amount: €1,250'
  },
  {
    id: 5,
    timestamp: '2024-07-03T11:41:59',
    level: 'info',
    service: 'Analytics',
    message: 'Daily report generated',
    details: 'Report includes 247 new leads and 12 conversions'
  }
];

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <BusinessProvider>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Logs & Monitoreo</h1>
              <p className="text-muted-foreground mt-1">
                Sistema de monitoreo y logs en tiempo real
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold">{logs.filter(l => l.level === 'error').length}</div>
                    <p className="text-sm text-muted-foreground">Errores</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold">{logs.filter(l => l.level === 'warning').length}</div>
                    <p className="text-sm text-muted-foreground">Advertencias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">{logs.filter(l => l.level === 'success').length}</div>
                    <p className="text-sm text-muted-foreground">Éxitos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">99.2%</div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Logs del Sistema</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Buscar en logs..." 
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="error">Errores</SelectItem>
                      <SelectItem value="warning">Advertencias</SelectItem>
                      <SelectItem value="success">Éxitos</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getLevelIcon(log.level)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{log.service}</span>
                            <Badge className={getLevelColor(log.level)}>
                              {log.level.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-1">{log.message}</p>
                          <p className="text-xs text-muted-foreground">{log.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </BusinessProvider>
  );
};

export default Logs;
