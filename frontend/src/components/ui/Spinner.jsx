import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 24, className = '', color = '#22D3EE' }) => {
  return (
    <Loader2
      size={size}
      style={{
        color: color,
        animation: 'spin 1s linear infinite',
      }}
      className={className}
    />
  );
};

export const Skeleton = ({ height = '20px', width = '100%', borderRadius = '8px', className = '' }) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        borderRadius: borderRadius,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
      className={className}
    />
  );
};
