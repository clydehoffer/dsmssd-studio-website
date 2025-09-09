'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LoadingScreen from '@/components/ui/LoadingScreen';
import WelcomeAnimation from '@/components/home/WelcomeAnimation';
import CursorSparkles from '@/components/ui/CursorSparkles';

import { galleryData } from '@/data/galleryData';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [openProjectWindows, setOpenProjectWindows] = useState<number[]>([]);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [windowPositions, setWindowPositions] = useState<Record<number, { x: number; y: number; width: number; height: number }>>({});
  const [draggedWindow, setDraggedWindow] = useState<number | null>(null);
  const [resizedWindow, setResizedWindow] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });


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
      {/* Silver Sparkle Cursor Trail */}
      <CursorSparkles />
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


        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
        }

        @keyframes logoPulseMobile {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
          }
        }

        /* Mobile-specific improvements */
        @media (max-width: 768px) {
          .mobile-pulse-enhanced {
            animation: logoPulseMobile 2.5s ease-in-out infinite !important;
          }
          
          /* Ensure navigation text is readable on mobile */
          .nav-tooltip {
            font-size: 10px;
            padding: 4px 8px;
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
                <div className="nav-tooltip absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 shadow-2xl z-[60]">
                  <span className="text-white text-xs font-bold whitespace-nowrap drop-shadow-lg">Resume</span>
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
                <div className="nav-tooltip absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 shadow-2xl z-[60]">
                  <span className="text-white text-xs font-bold whitespace-nowrap drop-shadow-lg">Portfolio</span>
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
                <div className="nav-tooltip absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 shadow-2xl z-[60]">
                  <span className="text-white text-xs font-bold whitespace-nowrap drop-shadow-lg">About</span>
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
                <div className="nav-tooltip absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 shadow-2xl z-[60]">
                  <span className="text-white text-xs font-bold whitespace-nowrap drop-shadow-lg">Services</span>
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
                <div className="nav-tooltip absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 shadow-2xl z-[60]">
                  <span className="text-white text-xs font-bold whitespace-nowrap drop-shadow-lg">Contact</span>
              </div>
            </button>
            </div>

          </div>
        )}
        
        {/* Main Logo Button - Mobile Responsive */}
        <button 
          onClick={() => setShowNavigation(!showNavigation)}
          className="group w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-white/30"
          style={{ 
            animation: showNavigation ? 'none' : window.innerWidth <= 768 ? 'logoPulseMobile 2.5s ease-in-out infinite' : 'logoPulse 3s ease-in-out infinite'
          }}
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
          <div className="nav-tooltip absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border-2 border-white/50 px-2 py-1 sm:px-3 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 shadow-2xl z-[60]">
            <span className="text-white text-xs font-bold whitespace-nowrap drop-shadow-lg">Click to navigate</span>
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
                         alt={item.title}
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

    </div>
  );
} 