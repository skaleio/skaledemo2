import React, { useState, memo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Brain,
  FileText,
  Download,
  Share,
  Edit,
  Filter,
  Search,
  Calendar,
  Folder,
  Sparkles,
  Presentation,
  Eye,
  Plus
} from 'lucide-react';
import { useBusiness } from '@/contexts/BusinessContext';

interface Presentation {
  id: string;
  name: string;
  prompt: string;
  style: string;
  fileUrl: string;
  createdAt: string;
  thumbnail?: string;
  category?: string;
}

// Mock data para demostración
const mockPresentations: Presentation[] = [
  {
    id: '1',
    name: 'Propuesta Redes Sociales - Clínica Dental',
    prompt: 'Haz una presentación para una propuesta de redes sociales para clínicas dentales',
    style: 'corporativo',
    fileUrl: '/presentations/clinica-dental.pdf',
    createdAt: '2024-01-15',
    category: 'Propuestas'
  },
  {
    id: '2', 
    name: 'Plan Marketing Digital - Spa',
    prompt: 'Crear presentación de plan de marketing digital para spa y centro de bienestar',
    style: 'minimalista',
    fileUrl: '/presentations/spa-marketing.pdf',
    createdAt: '2024-01-10',
    category: 'Marketing'
  }
];

const styles = [
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'moderno', label: 'Moderno' },
  { value: 'minimalista', label: 'Minimalista' },
  { value: 'oscuro', label: 'Oscuro' },
  { value: 'creativo', label: 'Creativo' }
];

const AIPresentations = memo(() => {
  const { currentBusiness } = useBusiness();
  const [presentations, setPresentations] = useState<Presentation[]>(mockPresentations);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [presentationName, setPresentationName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleGeneratePresentation = async () => {
    if (!prompt.trim() || !selectedStyle || !presentationName.trim()) return;

    setIsGenerating(true);
    
    // Simulación de llamada a GenSpark API
    setTimeout(() => {
      const newPresentation: Presentation = {
        id: Date.now().toString(),
        name: presentationName,
        prompt: prompt,
        style: selectedStyle,
        fileUrl: `/presentations/${Date.now()}.pdf`,
        createdAt: new Date().toISOString().split('T')[0],
        category: 'Propuestas'
      };
      
      setPresentations(prev => [newPresentation, ...prev]);
      setPrompt('');
      setPresentationName('');
      setSelectedStyle('');
      setIsGenerating(false);
    }, 3000);
  };

  const filteredPresentations = presentations.filter(presentation => {
    const matchesSearch = presentation.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || presentation.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(presentations.map(p => p.category).filter(Boolean)));

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Presentation className="w-6 h-6 text-primary" />
              </div>
              Presentaciones IA (GenSpark)
            </h1>
            <p className="text-muted-foreground">
              Genera presentaciones profesionales automáticas con inteligencia artificial
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Powered by GenSpark
          </Badge>
        </div>

        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generador IA
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Biblioteca
            </TabsTrigger>
          </TabsList>

          {/* Generador de Presentaciones */}
          <TabsContent value="generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Crear Nueva Presentación
                </CardTitle>
                <CardDescription>
                  Describe qué tipo de presentación necesitas y la IA la creará automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre de la presentación
                    </label>
                    <Input
                      placeholder="Ej: Propuesta Marketing Digital - Spa Relax"
                      value={presentationName}
                      onChange={(e) => setPresentationName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Descripción del contenido (Prompt)
                    </label>
                    <Textarea
                      placeholder="Ej: Haz una presentación para una propuesta de redes sociales para clínicas dentales, incluyendo estrategia de contenido, cronograma mensual y métricas esperadas..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Estilo de presentación
                    </label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleGeneratePresentation}
                  disabled={!prompt.trim() || !selectedStyle || !presentationName.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Generando presentación...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generar con IA
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Biblioteca de Presentaciones */}
          <TabsContent value="library" className="space-y-6">
            {/* Filtros y búsqueda */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar presentaciones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <SelectValue placeholder="Filtrar por categoría" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de presentaciones */}
            <div className="grid gap-4">
              {filteredPresentations.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay presentaciones</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterCategory 
                        ? "No se encontraron presentaciones con los filtros aplicados"
                        : "Crea tu primera presentación usando el generador IA"
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredPresentations.map((presentation) => (
                  <Card key={presentation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{presentation.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {new Date(presentation.createdAt).toLocaleDateString()}
                                {presentation.category && (
                                  <>
                                    <span>•</span>
                                    <Badge variant="outline" className="text-xs">
                                      {presentation.category}
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            <strong>Prompt:</strong> {presentation.prompt}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              Estilo: {presentation.style}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Vista previa
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Descargar
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Share className="w-4 h-4" />
                            Compartir
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
});

export default AIPresentations;