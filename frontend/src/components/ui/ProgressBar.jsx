import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
  progress = 0,
  variant = 'cyan',
  height = '8px',
  showPercentage = false,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const getGradient = () => {
    switch (variant) {
      case 'streak':
        return 'linear-gradient(90deg, #F97316 0%, #FBBF24 100%)';
      case 'violet':
        return 'linear-gradient(90deg, #8B5CF6 0%, #C084FC 100%)';
      case 'success':
        return 'linear-gradient(90deg, #10B981 0%, #34D399 100%)';
      case 'cyan':
      default:
        return 'linear-gradient(90deg, #0EA5E9 0%, #22D3EE 100%)';
    }
  };

  return (
    <div style={{ width: '100%' }} className={className}>
      {showPercentage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#9CA3AF',
            marginBottom: '6px',
          }}
        >
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: '#F3F4F6' }}>{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: height,
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: getGradient(),
            borderRadius: '9999px',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)',
          }}
        />
      </div>
    </div>
  );
};
