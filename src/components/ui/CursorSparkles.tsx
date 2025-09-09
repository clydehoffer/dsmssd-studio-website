'use client';

import { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  life: number;
  maxLife: number;
}

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const animationRef = useRef<number>();
  const lastMousePos = useRef({ x: 0, y: 0 });
  const sparkleId = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let isActive = true;

    const createSparkle = (x: number, y: number): Sparkle => {
      sparkleId.current += 1;
      return {
        id: sparkleId.current,
        x: x + (Math.random() - 0.5) * 20, // Random offset
        y: y + (Math.random() - 0.5) * 20,
        opacity: 1,
        scale: Math.random() * 0.8 + 0.4, // Random size between 0.4-1.2
        rotation: Math.random() * 360,
        life: 0,
        maxLife: 60 + Math.random() * 40 // 60-100 frames
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      lastMousePos.current = { x: clientX, y: clientY };

      // Adjust sparkle frequency based on screen size
      const isMobile = window.innerWidth <= 768;
      const sparkleChance = isMobile ? 0.85 : 0.7; // Less frequent on mobile
      const maxSparkles = isMobile ? 10 : 20; // Fewer sparkles on mobile

      // Create new sparkles on mouse movement
      if (Math.random() > sparkleChance) {
        setSparkles(prev => {
          const newSparkles = [...prev];
          
          // Add 1-3 new sparkles (fewer on mobile)
          const numNewSparkles = isMobile ? 1 : Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < numNewSparkles; i++) {
            newSparkles.push(createSparkle(clientX, clientY));
          }
          
          // Keep only the latest sparkles for performance
          return newSparkles.slice(-maxSparkles);
        });
      }
    };

    const animate = () => {
      if (!isActive) return;

      setSparkles(prev => 
        prev
          .map(sparkle => ({
            ...sparkle,
            life: sparkle.life + 1,
            opacity: Math.max(0, 1 - (sparkle.life / sparkle.maxLife)),
            scale: sparkle.scale * 0.98, // Gradually shrink
            rotation: sparkle.rotation + 2, // Rotate
            y: sparkle.y - 0.5 // Float upward slightly
          }))
          .filter(sparkle => sparkle.life < sparkle.maxLife) // Remove dead sparkles
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'screen' }}>
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            left: sparkle.x - 6,
            top: sparkle.y - 6,
            opacity: sparkle.opacity,
            transform: `scale(${sparkle.scale}) rotate(${sparkle.rotation}deg)`,
            transition: 'none',
            pointerEvents: 'none'
          }}
        >
          {/* Silver sparkle with multiple layers for depth */}
          <div className="relative w-3 h-3">
            {/* Main sparkle body */}
            <div 
              className="absolute inset-0 bg-white rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(192,192,192,0.7) 50%, transparent 100%)',
                filter: 'blur(0.5px)',
                boxShadow: '0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(192,192,192,0.4)'
              }}
            />
            {/* Cross sparkle effect */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '8px',
                lineHeight: 1,
                textShadow: '0 0 4px rgba(255,255,255,0.8)'
              }}
            >
              ✦
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
