'use client';

import { useRef, useEffect } from 'react';

export default function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Logo animation video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full object-cover"
        style={{ objectPosition: 'center center' }}
      >
        {/* MP4 is more widely supported across browsers */}
        <source src="/videos/dsmssd%20animation.mp4" type="video/mp4" />
        {/* MOV fallback */}
        <source src="/videos/dsmssd%20animation.mov" type="video/quicktime" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
    </div>
  );
} 