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

    // Method 1: Browser-native preload via link tags (fastest)
    const linkElements: HTMLLinkElement[] = [];
    images.slice(0, 12).forEach(src => { // Only preload first 12 with link tags
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      linkElements.push(link);
    });

    // Method 2: JavaScript preload for the rest
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
        img.onerror = () => {
          // Don't fail completely if one image fails
          loadedCount++;
          if (loadedCount === totalImages) {
            onLoadComplete?.();
          }
          resolve();
        };
        img.src = src;
      });
    };

    // Start preloading
    images.forEach(preloadImage);

    // Cleanup function
    return () => {
      linkElements.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [images, onLoadComplete]);

  return null; // This component doesn't render anything
}
