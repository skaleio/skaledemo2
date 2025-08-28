import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Play, Loader2, Crop, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadZoneProps {
  onImageUpload: (file: File) => void;
  selectedImage: File | null;
  onStartAnimation: () => void;
  isProcessing: boolean;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  onImageUpload,
  selectedImage,
  onStartAnimation,
  isProcessing
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('El archivo es demasiado grande. Máximo 10MB permitido');
      return;
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Create preview
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
          
          onImageUpload(file);
          toast.success('Imagen subida correctamente');
          return 100;
        }
        return prev + 10;
      });
    }, 100);

  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    disabled: isUploading || isProcessing
  });

  const handleReset = () => {
    setImagePreview(null);
    setUploadProgress(0);
    setCropMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {!imagePreview ? (
        <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`cursor-pointer text-center space-y-4 ${
                isDragActive ? 'scale-105' : ''
              } transition-transform`}
            >
              <input {...getInputProps()} ref={fileInputRef} />
              
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {isDragActive ? 'Suelta tu imagen aquí' : 'Arrastra tu imagen o haz clic para seleccionar'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Formatos soportados: PNG, JPG, JPEG, WEBP (máx. 10MB)
                </p>
              </div>
              
              <Button variant="outline" className="mt-4">
                <ImageIcon className="w-4 h-4 mr-2" />
                Seleccionar Imagen
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Image Preview */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Imagen Lista
                    </Badge>
                    {selectedImage && (
                      <span className="text-sm text-muted-foreground">
                        {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCropMode(!cropMode)}
                    >
                      <Crop className="w-4 h-4 mr-2" />
                      {cropMode ? 'Aplicar Recorte' : 'Recortar'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Cambiar
                    </Button>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={`max-h-80 w-full object-contain ${cropMode ? 'cursor-crosshair' : ''}`}
                  />
                  {cropMode && (
                    <div className="absolute inset-4 border-2 border-dashed border-primary bg-black/10 rounded-lg pointer-events-none" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={onStartAnimation}
                disabled={!selectedImage || isProcessing}
                className="flex-1"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Animación
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span>Subiendo imagen...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </motion.div>
      )}
    </div>
  );
};