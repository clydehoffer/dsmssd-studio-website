'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoLightbox from './VideoLightbox';

interface VideoPlayerButtonProps {
  videoUrl: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  className?: string;
}

export default function VideoPlayerButton({ 
  videoUrl, 
  title, 
  description, 
  thumbnailUrl,
  className = "" 
}: VideoPlayerButtonProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsLightboxOpen(true)}
        className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 hover:border-accent/50 transition-all duration-300 ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background Image/Thumbnail */}
        {thumbnailUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        )}
        
        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Play Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent text-white shadow-lg group-hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Play className="w-6 h-6 ml-1" />
          </motion.div>

          {/* Text */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Watch Video
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description || 'Click to play the video'}
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Video Lightbox */}
      <VideoLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        videoUrl={videoUrl}
        title={title}
        description={description}
      />
    </>
  );
}
