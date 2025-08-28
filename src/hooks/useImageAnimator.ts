import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Animation, AnimationConfig, UserCredits } from '@/types/image-animator';
import { toast } from 'sonner';

export const useImageAnimator = () => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();

  // Get user credits
  const { data: credits = 0 } = useQuery({
    queryKey: ['userCredits'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      // Mock data - in real implementation, fetch from database
      return 15; // Default credits
    }
  });

  // Get animation history
  const { data: animationHistory = [] } = useQuery({
    queryKey: ['animationHistory'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Mock data - in real implementation, fetch from database
      return [];
    }
  });

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('image-animations')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('image-animations')
        .getPublicUrl(fileName);

      return publicUrl;
    },
    onSuccess: () => {
      toast.success('Imagen subida correctamente');
    },
    onError: (error) => {
      toast.error('Error al subir la imagen: ' + error.message);
    }
  });

  // Process animation mutation
  const processAnimationMutation = useMutation({
    mutationFn: async ({ 
      imageUrl, 
      config, 
      fileName 
    }: { 
      imageUrl: string; 
      config: AnimationConfig; 
      fileName: string; 
    }): Promise<Animation> => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) throw new Error('User not authenticated');

      // Create animation record
      const animation: Animation = {
        id: crypto.randomUUID(),
        fileName,
        originalImage: imageUrl,
        status: 'pending',
        progress: 0,
        createdAt: new Date(),
        config,
        userId: user.id
      };

      // Add to local state
      setAnimations(prev => [animation, ...prev]);

      // Start processing pipeline
      await simulateAnimationPipeline(animation);

      return animation;
    },
    onSuccess: () => {
      toast.success('Animación iniciada correctamente');
      queryClient.invalidateQueries({ queryKey: ['userCredits'] });
    },
    onError: (error) => {
      toast.error('Error al iniciar la animación: ' + error.message);
    }
  });

  // Simulate animation processing pipeline
  const simulateAnimationPipeline = async (animation: Animation) => {
    const stages = [
      { status: 'uploading' as const, progress: 25, duration: 2000 },
      { status: 'processing_pika' as const, progress: 50, duration: 30000 },
      { status: 'processing_higgsfield' as const, progress: 75, duration: 45000 },
      { status: 'processing_kling' as const, progress: 90, duration: 30000 },
      { status: 'completed' as const, progress: 100, duration: 5000 }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      
      setAnimations(prev => 
        prev.map(anim => 
          anim.id === animation.id
            ? { 
                ...anim, 
                status: stage.status, 
                progress: stage.progress,
                ...(stage.status === 'completed' && {
                  completedAt: new Date(),
                  resultVideo: '/api/placeholder/400/300' // Mock video URL
                })
              }
            : anim
        )
      );

      if (stage.status === 'completed') {
        toast.success('¡Animación completada!', {
          description: `${animation.fileName} está listo para descargar`
        });
        
        // Send push notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Animación Completada', {
            body: `Tu animación "${animation.fileName}" está lista`,
            icon: '/favicon.ico'
          });
        }
      }
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const getUserAndSubscribe = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

    // Subscribe to animation updates
    const channel = supabase
      .channel('animation-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'animations',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Animation update received:', payload);
          // Handle real-time updates
        }
      )
      .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };
    
    getUserAndSubscribe();
  }, []);

  const uploadImage = useCallback((file: File) => {
    return uploadImageMutation.mutateAsync(file);
  }, [uploadImageMutation]);

  const processAnimation = useCallback((file: File, config: AnimationConfig) => {
    setIsProcessing(true);
    
    uploadImageMutation.mutateAsync(file)
      .then((imageUrl) => {
        return processAnimationMutation.mutateAsync({
          imageUrl,
          config,
          fileName: file.name
        });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, [uploadImageMutation, processAnimationMutation]);

  const getAnimationHistory = useCallback(() => {
    return animations.filter(anim => anim.status === 'completed');
  }, [animations]);

  return {
    animations,
    credits,
    isProcessing,
    uploadImage,
    processAnimation,
    getAnimationHistory,
    isUploading: uploadImageMutation.isPending,
    isProcessingAnimation: processAnimationMutation.isPending
  };
};