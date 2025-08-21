'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function ImageWithFallback({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '',
  style = {},
  onClick
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      onClick={onClick}
    />
  );
}