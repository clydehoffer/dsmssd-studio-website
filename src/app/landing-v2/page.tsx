'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LoadingScreen from '@/components/ui/LoadingScreen';
import WelcomeAnimation from '@/components/home/WelcomeAnimation';

import { galleryData } from '@/data/galleryData';

export default function LandingV2() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [openProjectWindows, setOpenProjectWindows] = useState<number[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [ambientPopups, setAmbientPopups] = useState<Array<{
    id: number;
    image: string;
    title: string;
    x: number;
    y: number;
    visible: boolean;
  }>>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [windowPositions, setWindowPositions] = useState<Record<number, { x: number; y: number; width: number; height: number }>>({});
  const [draggedWindow, setDraggedWindow] = useState<number | null>(null);
  const [resizedWindow, setResizedWindow] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Function to check if two rectangles overlap
  const doRectanglesOverlap = (rect1: { x: number; y: number; width: number; height: number }, 
                              rect2: { x: number; y: number; width: number; height: number }) => {
    return !(rect1.x + rect1.width < rect2.x || 
             rect2.x + rect2.width < rect1.x || 
             rect1.y + rect1.height < rect2.y || 
             rect2.y + rect2.height < rect1.y);
  };

  // Function to find non-overlapping position with TRUE full-page distribution
  const findNonOverlappingPosition = (index: number, existingPositions: Record<number, { x: number; y: number; width: number; height: number }>) => {
    const windowSizes = [
      { width: 280, height: 240 },
      { width: 320, height: 280 },
      { width: 300, height: 260 },
      { width: 340, height: 300 },
      { width: 260, height: 220 },
      { width: 360, height: 320 }
    ];
    
    const size = windowSizes[index % windowSizes.length];
    
    // Try positions across the full page until we find one that doesn't overlap
    const positions = [
      // TOP ROW - Full width spread
      { x: 50, y: 50 },
      { x: 400, y: 60 },
      { x: 800, y: 40 },
      { x: 1200, y: 80 },
      { x: 1600, y: 70 },
      
      // MIDDLE ROW - Full width spread
      { x: 100, y: 200 },
      { x: 450, y: 220 },
      { x: 850, y: 180 },
      { x: 1250, y: 200 },
      { x: 1650, y: 190 },
      
      // BOTTOM ROW - Full width spread (above navbar)
      { x: 80, y: 380 },
      { x: 420, y: 360 },
      { x: 780, y: 400 },
      { x: 1180, y: 380 },
      { x: 1580, y: 390 },
      
      // ADDITIONAL POSITIONS for better distribution
      { x: 200, y: 100 },
      { x: 600, y: 120 },
      { x: 1000, y: 110 },
      { x: 1400, y: 130 },
      { x: 1800, y: 140 },
      
      { x: 150, y: 300 },
      { x: 550, y: 320 },
      { x: 950, y: 310 },
      { x: 1350, y: 330 },
      { x: 1750, y: 340 }
    ];
    
    // Try each position until we find one that doesn't overlap
    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const newRect = {
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height
      };
      
      // Check if this position overlaps with any existing windows
      let overlaps = false;
      for (const existingRect of Object.values(existingPositions)) {
        if (doRectanglesOverlap(newRect, existingRect)) {
          overlaps = true;
          break;
        }
      }
      
      if (!overlaps) {
        return newRect;
      }
    }
    
    // If all positions overlap, find a random position that doesn't overlap
    let attempts = 0;
    const maxAttempts = 100;
    
    // Landing page constraints (above navbar, within viewport)
    const landingPageWidth = 1920; // Standard desktop width
    const landingPageHeight = 800; // Height above navbar
    const navbarHeight = 100; // Space for navbar
    
    while (attempts < maxAttempts) {
      const randomX = Math.floor(Math.random() * (landingPageWidth - size.width - 100)) + 50;
      const randomY = Math.floor(Math.random() * (landingPageHeight - size.height - 50)) + 50;
      
      const newRect = {
        x: randomX,
        y: randomY,
        width: size.width,
        height: size.height
      };
      
      let overlaps = false;
      for (const existingRect of Object.values(existingPositions)) {
        if (doRectanglesOverlap(newRect, existingRect)) {
          overlaps = true;
          break;
        }
      }
      
      if (!overlaps) {
        return newRect;
      }
      
      attempts++;
    }
    
    // Last resort: stack them vertically with spacing
    const fallbackY = 50 + (index * (size.height + 50));
    return {
      x: 50 + (index * 50),
      y: fallbackY,
      width: size.width,
      height: size.height
    };
  };

  useEffect(() => {
    // Always proceed after time, regardless of image preload status
    const timer = setTimeout(() => {
      setLoading(false);
      setShowWelcome(true); // Show welcome animation after loading
    }, 2500); // Slightly longer to allow loading animation to complete

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Handle image preload completion
  const handleImagesPreloaded = () => {
    setImagesPreloaded(true);
  };

  // Optional: check if user has seen the welcome animation recently
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('welcomeSeenV2');
    const lastSeen = parseInt(hasSeenWelcome || '0', 10);
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    // If they've seen it in the last hour, skip it
    if (hasSeenWelcome && now - lastSeen < oneHour) {
      setShowWelcome(false);
    }
    
    // Mark as seen
    if (showWelcome) {
      localStorage.setItem('welcomeSeenV2', now.toString());
    }
  }, [showWelcome]);

  // Mouse event handlers for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedWindow !== null) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        setWindowPositions(prev => ({
          ...prev,
          [draggedWindow]: {
            ...prev[draggedWindow],
            x: Math.max(0, Math.min(window.innerWidth - 300, newX)),
            y: Math.max(0, Math.min(window.innerHeight - 200, newY))
          }
        }));
      }
      
      if (resizedWindow !== null) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(200, Math.min(800, resizeStart.width + deltaX));
        const newHeight = Math.max(150, Math.min(600, resizeStart.height + deltaY));
        
        setWindowPositions(prev => ({
          ...prev,
          [resizedWindow]: {
            ...prev[resizedWindow],
            width: newWidth,
            height: newHeight
          }
        }));
      }
    };

    const handleMouseUp = () => {
      setDraggedWindow(null);
      setResizedWindow(null);
    };

    if (draggedWindow !== null || resizedWindow !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedWindow, resizedWindow, dragOffset, resizeStart]);

  // Close navigation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNavigation) {
        const target = event.target as HTMLElement;
        const logoButton = document.querySelector('[data-logo-nav]');
        const navContainer = document.querySelector('[data-nav-container]');
        
        if (logoButton && navContainer && 
            !logoButton.contains(target) && 
            !navContainer.contains(target)) {
          setShowNavigation(false);
        }
      }
    };

    if (showNavigation) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showNavigation]);

  // Ambient Portfolio Popup System (Desktop Only)
  useEffect(() => {
    if (loading) return;
    
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // Skip popups on mobile

    const getRandomImage = () => {
      const allImages: Array<{image: string, title: string, project: string}> = [];
      
      // Collect all images from gallery data
      Object.entries(galleryData).forEach(([projectId, images]) => {
        images.forEach((item, index) => {
          allImages.push({
            image: item.thumbnail,
            title: `${item.originalTitle || `Image ${index + 1}`}`,
            project: `Project ${projectId}`
          });
        });
      });

      return allImages[Math.floor(Math.random() * allImages.length)];
    };

    const getRandomPosition = () => {
      const popupWidth = 384; // w-96 = 384px
      const popupHeight = 400; // Estimated popup height
      const margin = 20; // Small margin from edges
      const logoZone = 200; // Avoid logo area at bottom
      
      // Calculate safe area bounds
      const maxX = window.innerWidth - popupWidth - margin;
      const maxY = window.innerHeight - popupHeight - logoZone;
      
      let x, y;
      do {
        x = Math.random() * (maxX - margin) + margin;
        y = Math.random() * (maxY - margin) + margin;
      } while (
        // Avoid bottom center logo area (wider zone)
        x > window.innerWidth / 2 - 400 &&
        x < window.innerWidth / 2 + 400 &&
        y > window.innerHeight - logoZone - 50
      );
      
      // Ensure popup stays within viewport
      x = Math.max(margin, Math.min(maxX, x));
      y = Math.max(margin, Math.min(maxY, y));
      
      return { x, y };
    };

    // Create multiple initial popups quickly to ensure overlap
    const createMultiplePopups = () => {
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          const randomImage = getRandomImage();
          const position = getRandomPosition();
          const popupId = Date.now() + i; // Ensure unique IDs

          const newPopup = {
            id: popupId,
            image: randomImage.image,
            title: `${randomImage.project} - ${randomImage.title}`,
            x: position.x,
            y: position.y,
            visible: true
          };

          setAmbientPopups(prev => [...prev, newPopup]);

          // Auto-remove after 6-10 seconds (longer duration) - INSTANT removal
          const displayTime = 6000 + Math.random() * 4000;
          setTimeout(() => {
            setAmbientPopups(current => current.filter(p => p.id !== popupId));
          }, displayTime);
        }, i * 1000); // Stagger by 1 second
      }
    };

    // Start creating popups after welcome animation
    const initialDelay = setTimeout(createMultiplePopups, 5000);

    // Create new popups every 2-4 seconds (faster intervals)
    const interval = setInterval(() => {
      // Limit to max 4 popups at once
      setAmbientPopups(prev => {
        if (prev.length < 4) {
          const randomImage = getRandomImage();
          const position = getRandomPosition();
          const popupId = Date.now();

          const newPopup = {
            id: popupId,
            image: randomImage.image,
            title: `${randomImage.project} - ${randomImage.title}`,
            x: position.x,
            y: position.y,
            visible: true
          };

          // Auto-remove after 6-10 seconds (longer duration for overlap) - INSTANT removal
          const displayTime = 6000 + Math.random() * 4000;
          setTimeout(() => {
            setAmbientPopups(current => current.filter(p => p.id !== popupId));
          }, displayTime);

          return [...prev, newPopup];
        }
        return prev;
      });
    }, 2000 + Math.random() * 2000); // Much faster intervals

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [loading]);

  // Keyboard support for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else if (enlargedImage) {
          setEnlargedImage(null);
        }
      }
    };

    if (lightboxImage || enlargedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [lightboxImage, enlargedImage]);

  if (loading) {
    return <LoadingScreen duration={2500} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* CSS Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes iconSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }

        @keyframes virusPopupInstant {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes virusPopupBlink {
          0%, 50% { 
            background: linear-gradient(90deg, #0053d4 0%, #0066ff 50%, #0053d4 100%); 
          }
          50.1%, 100% { 
            background: linear-gradient(90deg, #ff0000 0%, #ff3333 50%, #ff0000 100%); 
          }
        }
      `}}/>


      {/* Updated Visual Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/landing-page-visual-updated.mp4" type="video/mp4" />
          {/* Fallback to dark background if video fails to load */}
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-white">
        {showWelcome && <WelcomeAnimation />}
      </div>




      {/* Logo Navigation Hub */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        {/* Perfect 5-Icon Semicircle with Even Spacing */}
        {showNavigation && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" data-nav-container>
            
            {/* Mobile-Optimized 5-Icon Layout */}
            
            {/* 1. Resume (Far Left) */}
            <div className="absolute" style={{ left: window.innerWidth <= 768 ? '-120px' : '-240px', bottom: window.innerWidth <= 768 ? '80px' : '100px', animation: showNavigation ? 'iconSlideIn 0.6s ease-out 0.1s both' : 'none' }}>
              <button onClick={() => window.location.href = '/resume'} className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Page Title Hover Animation */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/25 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  <span className="text-white text-xs font-medium whitespace-nowrap">Resume</span>
                </div>
              </button>
            </div>

            {/* 2. Portfolio (Left) */}
            <div className="absolute" style={{ left: window.innerWidth <= 768 ? '-70px' : '-140px', bottom: window.innerWidth <= 768 ? '120px' : '160px', animation: showNavigation ? 'iconSlideIn 0.6s ease-out 0.2s both' : 'none' }}>
              <button onClick={() => window.location.href = '/portfolio'} className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25H8.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Page Title Hover Animation */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/25 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  <span className="text-white text-xs font-medium whitespace-nowrap">Portfolio</span>
                </div>
              </button>
            </div>

            {/* 3. About (Center Top) */}
            <div className="absolute" style={{ left: window.innerWidth <= 768 ? '-24px' : '-32px', bottom: window.innerWidth <= 768 ? '140px' : '180px', animation: showNavigation ? 'iconSlideIn 0.6s ease-out 0.3s both' : 'none' }}>
              <button onClick={() => window.location.href = '/about'} className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Page Title Hover Animation */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/25 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  <span className="text-white text-xs font-medium whitespace-nowrap">About</span>
                </div>
              </button>
            </div>

            {/* 4. Services (Right) */}
            <div className="absolute" style={{ right: window.innerWidth <= 768 ? '-70px' : '-140px', bottom: window.innerWidth <= 768 ? '120px' : '160px', animation: showNavigation ? 'iconSlideIn 0.6s ease-out 0.4s both' : 'none' }}>
              <button onClick={() => window.location.href = '/services'} className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-4.653c-.043-.44-.166-.855-.368-1.233M6.75 8.25l4.872-4.872c.885-.885 2.323-.885 3.208 0l4.422 4.422c.885.885.885 2.323 0 3.208l-4.872 4.872m0 0-.5.5a2.25 2.25 0 1 1-3.182-3.182l.5-.5m7.5-4.5 .5-.5a2.25 2.25 0 1 1 3.182 3.182l-.5.5" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-green-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Page Title Hover Animation */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/25 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  <span className="text-white text-xs font-medium whitespace-nowrap">Services</span>
                </div>
              </button>
            </div>

            {/* 5. Contact (Far Right) */}
            <div className="absolute" style={{ right: window.innerWidth <= 768 ? '-120px' : '-240px', bottom: window.innerWidth <= 768 ? '80px' : '100px', animation: showNavigation ? 'iconSlideIn 0.6s ease-out 0.5s both' : 'none' }}>
              <button onClick={() => window.location.href = '/contact'} className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-red-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Page Title Hover Animation */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/25 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
                  <span className="text-white text-xs font-medium whitespace-nowrap">Contact</span>
                </div>
              </button>
            </div>

          </div>
        )}
        
        {/* Main Logo Button - Mobile Responsive */}
        <button 
          onClick={() => setShowNavigation(!showNavigation)}
          className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-white/30"
          data-logo-nav
        >
          <Image 
            src="/images/logo/logo mark.svg" 
            alt="DSMSSD Studio" 
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 filter brightness-0 invert"
            priority={true}
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          
          {/* Hint text with glassmorphism */}
          <div className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/25 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
            <span className="text-white text-xs font-medium whitespace-nowrap">Click to navigate</span>
          </div>
        </button>
      </div>

      {/* Modern Glassmorphism Popups */}
      {activePopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
            {/* Modern Title Bar */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="text-white text-lg font-medium">{activePopup.charAt(0).toUpperCase() + activePopup.slice(1)}</div>
              <button 
                onClick={() => setActivePopup(null)}
                className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center transition-all duration-200"
                aria-label="Close"
              >
                <span className="text-white text-sm">×</span>
              </button>
            </div>
            
            {/* Content */}
             <div className="p-6">
               <div className="flex items-center space-x-3 mb-4">
                 <img 
                   src={`/images/visual-core/icons/${activePopup}.png`} 
                   alt={activePopup} 
                   className="w-16 h-16"
                 />
                 <div>
                   <h3 className="font-bold text-white text-xl">{activePopup.charAt(0).toUpperCase() + activePopup.slice(1)}</h3>
                   <p className="text-sm text-white/70">DSMSSD Studio {activePopup}</p>
                 </div>
               </div>
               
               <div className="space-y-3">
                 {activePopup === 'portfolio' && (
                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                     <div className="flex items-center space-x-2 mb-2">
                       <div className="w-4 h-4 bg-blue-600"></div>
                       <span className="text-sm font-medium text-white">Portfolio Projects</span>
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                       {Object.keys(galleryData).map((projectId) => (
                         <div 
                           key={projectId} 
                           className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 cursor-pointer transition-all duration-200"
                           onClick={() => {
                             setOpenProjectWindows([...openProjectWindows, parseInt(projectId)]);
                             setActivePopup(null);
                           }}
                         >
                           <div className="w-6 h-6 bg-yellow-400 flex items-center justify-center text-xs font-bold">📁</div>
                           <span className="text-xs text-white">Project {projectId}</span>
                         </div>
                       ))}
                     </div>
                     <p className="text-xs text-white/70 mt-3">
                       {Object.keys(galleryData).length} total projects available
                     </p>
                   </div>
                 )}
                 
                 {activePopup === 'services' && (
                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                     <div className="space-y-2">
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-green-600"></div>
                         <span className="text-sm font-medium text-white">Design Services</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-purple-600"></div>
                         <span className="text-sm font-medium text-white">Development Services</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-blue-600"></div>
                         <span className="text-sm font-medium text-white">Brand Identity</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-orange-600"></div>
                         <span className="text-sm font-medium text-white">Digital Marketing</span>
                       </div>
                     </div>
                   </div>
                 )}
                 
                 {activePopup === 'resume' && (
                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                     <div className="space-y-2">
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-blue-600"></div>
                         <span className="text-sm font-medium text-gray-800">Experience</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-green-600"></div>
                         <span className="text-sm font-medium text-gray-800">Skills</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-purple-600"></div>
                         <span className="text-sm font-medium text-gray-800">Education</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-yellow-600"></div>
                         <span className="text-sm font-medium text-gray-800">Certifications</span>
                       </div>
                     </div>
                   </div>
                 )}
                 
                 {activePopup === 'contact' && (
                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl">
                     <div className="space-y-2">
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-blue-600"></div>
                         <span className="text-sm font-medium text-gray-800">Email: hello@dsmssd.studio</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-green-600"></div>
                         <span className="text-sm font-medium text-gray-800">Phone: Available on request</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-purple-600"></div>
                         <span className="text-sm font-medium text-gray-800">Location: Remote / Worldwide</span>
                       </div>
                       <div className="flex items-center space-x-2">
                         <div className="w-4 h-4 bg-orange-600"></div>
                         <span className="text-sm font-medium text-gray-800">Response Time: 24 hours</span>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-white/20">
                <button 
                  onClick={() => setActivePopup(null)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button className="bg-blue-500/20 hover:bg-blue-500/30 text-white border border-blue-500/40 px-6 py-2 text-sm font-medium rounded-lg backdrop-blur-sm transition-all duration-200">
                  Open {activePopup.charAt(0).toUpperCase() + activePopup.slice(1)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Draggable and Resizable Project Windows */}
      {openProjectWindows.map((projectId, index) => {
        const projectData = galleryData[projectId.toString()];
        
        // Initialize window position - scattered across entire landing page like Image 1
        const currentPosition = windowPositions[projectId] || (() => {
          // Pre-defined positions that scatter windows across the ENTIRE landing page with NO overlap
          const scatteredPositions = [
            { x: 50, y: 50, width: 280, height: 240 },        // Top-left
            { x: 500, y: 80, width: 320, height: 280 },       // Top-center
            { x: 1000, y: 60, width: 300, height: 260 },      // Top-right
            { x: 1400, y: 100, width: 340, height: 300 },     // Far top-right
            { x: 100, y: 350, width: 260, height: 220 },      // Bottom-left
            { x: 600, y: 380, width: 360, height: 320 },      // Bottom-center
            { x: 1100, y: 400, width: 340, height: 300 },     // Bottom-right
            { x: 1500, y: 420, width: 280, height: 240 }      // Far bottom-right
          ];
          
          return scatteredPositions[index] || {
            x: 100 + (index * 50),
            y: 100 + (index * 30),
            width: 280 + (index * 20),
            height: 240 + (index * 15)
          };
        })();
        
        return (
          <div 
            key={projectId}
            className="fixed"
            style={{
              left: `${currentPosition.x}px`,
              top: `${currentPosition.y}px`,
              width: `${currentPosition.width}px`,
              height: `${currentPosition.height}px`,
              zIndex: 70 + index
            }}
          >
            <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl">
              {/* Modern Title Bar - Draggable */}
              <div 
                className="cursor-move bg-white/5 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex justify-between items-center"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggedWindow(projectId);
                  setDragOffset({
                    x: e.clientX - currentPosition.x,
                    y: e.clientY - currentPosition.y
                  });
                }}
              >
                <div className="text-white text-sm font-medium">
                  Project {projectId} - DSMSSD Studio
                </div>
                <button 
                  onClick={() => {
                    console.log('Closing window:', projectId);
                    setOpenProjectWindows(openProjectWindows.filter(id => id !== projectId));
                  }}
                  className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 flex items-center justify-center transition-all duration-200"
                  aria-label="Close"
                >
                  <span className="text-white text-xs">×</span>
                </button>
              </div>
              
              {/* Modern Content */}
              <div className="overflow-y-auto relative bg-white/5 backdrop-blur-sm" style={{ height: 'calc(100% - 52px)' }}>
                {/* Resize Handle */}
                <div 
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white/20 backdrop-blur-sm border-l border-t border-white/30 rounded-tl-lg hover:bg-white/30 transition-all duration-200"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setResizedWindow(projectId);
                    setResizeStart({
                      x: e.clientX,
                      y: e.clientY,
                      width: currentPosition.width,
                      height: currentPosition.height
                    });
                  }}
                />
                {/* Project Information */}
                <div className="mb-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <h3 className="font-bold text-sm text-white mb-3">Project {projectId} Details</h3>
                  <div className="text-xs text-white/80 space-y-2">
                    <p><strong>Type:</strong> {projectId === 1 ? 'Brand Identity & Apparel' : 
                                              projectId === 2 ? 'Fashion Photography' :
                                              projectId === 3 ? 'Event Photography' :
                                              projectId === 4 ? 'Portrait Photography' :
                                              projectId === 5 ? 'Commercial Photography' :
                                              projectId === 6 ? 'Product Photography' : 'Creative Project'}</p>
                    <p><strong>Images:</strong> {projectData?.length || 0} total</p>
                    <p><strong>Category:</strong> {projectId === 1 ? 'Branding & Design' :
                                                  projectId === 2 ? 'Fashion & Lifestyle' :
                                                  projectId === 3 ? 'Events & Entertainment' :
                                                  projectId === 4 ? 'Portraits & People' :
                                                  projectId === 5 ? 'Commercial & Advertising' :
                                                  projectId === 6 ? 'Product & Commercial' : 'Creative'}</p>
                  </div>
                  
                  {/* Project Summary */}
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <h4 className="font-bold text-xs text-white mb-2">Summary:</h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {projectId === 1 ? 'Comprehensive brand identity project featuring custom apparel design, logo development, and marketing materials. This project showcases the complete visual identity system including t-shirts, wall signs, and business cards.' :
                       projectId === 2 ? 'Fashion photography collection highlighting contemporary style and lifestyle imagery. Features portrait work with modern fashion elements and accessories, capturing the essence of current fashion trends.' :
                       projectId === 3 ? 'Event photography documenting live performances and entertainment venues. Captures the energy and atmosphere of various events with dynamic lighting and crowd interaction.' :
                       projectId === 4 ? 'Portrait photography series focusing on individual expression and character. Features both studio and environmental portraits showcasing diverse subjects and storytelling through imagery.' :
                       projectId === 5 ? 'Commercial photography project featuring vehicle and product photography. Includes stylized commercial shots with creative lighting and composition for advertising purposes.' :
                       projectId === 6 ? 'Product and commercial photography collection showcasing various products and commercial spaces. Features detailed product shots and architectural photography for commercial applications.' :
                       'Creative project showcasing innovative design and photography techniques.'}
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-white/60 mb-3">Scroll to view all images</div>
                <div className="grid grid-cols-2 gap-3">
                   {projectData?.map((item, itemIndex) => (
                     <div key={itemIndex} className="bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-lg cursor-pointer hover:bg-white/20 hover:border-white/30 transition-all duration-200">
                       <img 
                         src={item.thumbnail} 
                         alt={item.originalAlt}
                         className="w-full h-16 object-cover rounded-md"
                         onClick={() => {
                           // Open image in modal
                           setEnlargedImage(item.thumbnail);
                         }}
                       />
                     </div>
                   ))}
                 </div>
                

              </div>
            </div>
          </div>
        );
      })}

      {/* Modern Enlarged Image Modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-4xl bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setEnlargedImage(null);
              }}
              className="absolute -top-4 -right-4 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <span className="text-white text-lg">×</span>
            </button>
            <img 
              src={enlargedImage} 
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Portfolio Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          style={{ zIndex: 10000 }}
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-5xl bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              className="absolute -top-6 -right-6 w-12 h-12 bg-red-500/30 hover:bg-red-500/50 border border-red-500/40 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <span className="text-white text-xl font-bold">×</span>
            </button>
            <img 
              src={lightboxImage} 
              alt="Portfolio lightbox view"
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Lightbox Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
              <div className="text-white text-sm font-medium">Click image to view full size • Press ESC to close</div>
            </div>
          </div>
        </div>
      )}

      {/* Virus-style Ambient Popups */}
      {ambientPopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed bg-gray-200 border-2 border-gray-400 shadow-xl"
          style={{
            left: `${popup.x}px`,
            top: `${popup.y}px`,
            width: '384px', // w-96
            zIndex: 1000,
            animation: 'virusPopupInstant 0.1s ease-out',
            fontFamily: '"MS Sans Serif", sans-serif',
            fontSize: '11px'
          }}
        >
          {/* Title Bar with Blinking Effect */}
          <div 
            className="bg-blue-600 text-white px-2 py-1 flex justify-between items-center border-b border-gray-400"
            style={{ 
              background: 'linear-gradient(90deg, #0053d4 0%, #0066ff 50%, #0053d4 100%)',
              animation: 'virusPopupBlink 2s infinite'
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-yellow-300 text-sm">⚠️</span>
              <span className="font-bold text-xs">
                {popup.title.includes('Project 1') ? 'SYSTEM ERROR' :
                 popup.title.includes('Project 2') ? 'VIRUS DETECTED' :
                 popup.title.includes('Project 3') ? 'SECURITY ALERT' :
                 popup.title.includes('Project 4') ? 'WARNING' :
                 popup.title.includes('Project 5') ? 'CRITICAL ERROR' :
                 popup.title.includes('Project 6') ? 'MALWARE ALERT' : 'SYSTEM NOTIFICATION'}
              </span>
            </div>
            <button 
              onClick={() => setAmbientPopups(prev => prev.filter(p => p.id !== popup.id))}
              className="text-white hover:bg-red-500 w-4 h-4 flex items-center justify-center text-xs font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-3 bg-gray-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <span className="text-2xl">
                  {popup.title.includes('Project 1') ? '⚠️' :
                   popup.title.includes('Project 2') ? '🔥' :
                   popup.title.includes('Project 3') ? '🚨' :
                   popup.title.includes('Project 4') ? '⚡' :
                   popup.title.includes('Project 5') ? '💀' :
                   popup.title.includes('Project 6') ? '👁️' : '🔔'}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-black text-xs font-bold mb-1">
                  {popup.title.includes('Project 1') ? 'Creative.exe has exceeded expectations!' :
                   popup.title.includes('Project 2') ? 'Unauthorized talent infiltration!' :
                   popup.title.includes('Project 3') ? 'Suspicious activity detected!' :
                   popup.title.includes('Project 4') ? 'Dangerous levels of creativity detected!' :
                   popup.title.includes('Project 5') ? 'Fatal attraction to design!' :
                   popup.title.includes('Project 6') ? 'Malicious amounts of skill found!' : 'Creative overflow detected!'}
                </div>
                <div className="text-gray-600 text-xs mb-2">
                  {popup.title.includes('Project 1') ? 'File corrupted with pure talent.' :
                   popup.title.includes('Project 2') ? 'Portfolio quality exceeds system limits.' :
                   popup.title.includes('Project 3') ? 'Recommend immediate portfolio viewing.' :
                   popup.title.includes('Project 4') ? 'This creativity may cause inspiration overflow.' :
                   popup.title.includes('Project 5') ? 'Warning: Viewing may result in amazement.' :
                   popup.title.includes('Project 6') ? 'Skill level detected: LEGENDARY.' : 'Viewing recommended immediately.'}
                </div>
              </div>
            </div>

            {/* Image Display */}
            <img 
              src={popup.image} 
              alt={popup.title}
              className="w-full h-48 object-contain bg-black border border-gray-500 cursor-pointer hover:brightness-110 transition-all duration-200 pointer-events-auto"
              onClick={() => setLightboxImage(popup.image)}
              onError={(e) => {
                console.error('Failed to load image:', popup.image);
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* File Info */}
            <div className="mt-2 p-2 bg-gray-100 border border-gray-400 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-700">FILE:</span>
                <span className="text-black font-mono">{popup.title}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-700">STATUS:</span>
                <span className="text-red-600 font-bold">INFECTED WITH TALENT</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-3 flex justify-center">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-xs font-bold border border-red-800 transition-all duration-200"
                style={{ 
                  fontFamily: '"MS Sans Serif", sans-serif',
                  boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3), inset -1px -1px 0px rgba(0,0,0,0.3)'
                }}
              >
                ⚡ HIRE CREATOR
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 