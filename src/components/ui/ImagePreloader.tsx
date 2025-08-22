'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  onLoadComplete?: () => void;
}

export default function ImagePreloader({ images, onLoadComplete }: ImagePreloaderProps) {
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) {
      onLoadComplete?.();
      return;
    }

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            onLoadComplete?.();
          }
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // Preload all images
    images.forEach(preloadImage);
  }, [images, onLoadComplete]);

  return null; // This component doesn't render anything
}
