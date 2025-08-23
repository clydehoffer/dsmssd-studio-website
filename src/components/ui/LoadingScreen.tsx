'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ duration = 2000 }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // Increment to reach 100 within duration
      });
    }, duration / 25);

    // Loading dots animation
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(dotsInterval);
    };
  }, [duration]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes logoWiggle {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateX(3px) rotate(2deg);
          }
          75% {
            transform: translateX(-3px) rotate(-2deg);
          }
        }

        /* Mobile optimization for smoother animations */
        @media (max-width: 768px) {
          .logo-float-animation {
            will-change: transform;
            backface-visibility: hidden;
          }
          
          @keyframes logoFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes logoWiggle {
            0%, 100% {
              transform: translateX(0px) rotate(0deg);
            }
            25% {
              transform: translateX(2px) rotate(1deg);
            }
            75% {
              transform: translateX(-2px) rotate(-1deg);
            }
          }
        }
      `}}/>
      <div className="flex flex-col items-center justify-center p-8 max-w-md w-full">
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.3, rotate: -45 }}
          animate={{ 
            y: 0, // Initial position
            opacity: 1, 
            scale: 1, 
            rotate: 0,
          }}
          transition={{ 
            y: { duration: 0.8, ease: "easeOut", type: "spring", damping: 0.6 },
            opacity: { duration: 0.6 },
            scale: { duration: 0.8, ease: "backOut" },
            rotate: { duration: 0.8, ease: "easeOut" }
          }}
          className="mb-8"
          style={{
            // Force hardware acceleration on mobile for smoother animation
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        >
          <div
            className="logo-float-animation"
            style={{
              animation: 'logoFloat 3s ease-in-out infinite 1s, logoWiggle 4s ease-in-out infinite 1.5s'
            }}
          >
            <Image 
              src="/images/logo/logo-mark.png" 
              alt="DSMSSD STUDIO" 
              width={100}
              height={100}
              className="drop-shadow-lg"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                willChange: 'transform'
              }}
            />
          </div>
        </motion.div>
        
        <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-4">
          DSMSSD STUDIO
        </h1>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <motion.div 
            className="bg-primary-600 h-2"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <p className="text-center font-mono text-sm text-gray-600 dark:text-gray-400">
          Loading{dots}
        </p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 70 ? 1 : 0 }}
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Preparing an interactive experience...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen; 