'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Simple welcome animation data
const welcomeAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 800,
  h: 600,
  nm: "Welcome Animation",
  layers: [
    {
      ty: 4,
      nm: "Welcome Text",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [100] },
            { t: 20, s: [100], e: [100] },
            { t: 70, s: [100], e: [0] },
            { t: 90, s: [0] }
          ]
        },
        p: { a: 0, k: [400, 300] },
        s: { 
          a: 1, 
          k: [
            { t: 0, s: [0, 0], e: [100, 100] },
            { t: 20, s: [100, 100], e: [100, 100] },
            { t: 70, s: [100, 100], e: [110, 110] },
            { t: 90, s: [110, 110] }
          ] 
        }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [300, 100] },
              r: { a: 0, k: 20 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 1, 1, 1] }
            }
          ]
        }
      ],
      op: 90
    }
  ]
};

export default function WelcomeAnimation() {
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Set a timer to mark the animation as complete
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isComplete) {
    return null;
  }

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      onAnimationComplete={() => setIsComplete(true)}
    >
      <div className="w-64 h-64 relative">
        <Lottie 
          animationData={welcomeAnimationData}
          loop={false}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white text-3xl font-display font-bold"
          >
            WELCOME
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 