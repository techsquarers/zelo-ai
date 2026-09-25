import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
  progress = 0,
  variant = 'accent',
  height = '6px',
  showPercentage = false,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const gradients = {
    accent:  'linear-gradient(90deg, var(--accent-strong) 0%, var(--accent) 100%)',
    cyan:    'linear-gradient(90deg, var(--accent-strong) 0%, var(--accent) 100%)',
    streak:  'linear-gradient(90deg, #EA580C 0%, var(--streak) 100%)',
    success: 'linear-gradient(90deg, #16A34A 0%, var(--success) 100%)',
    xp:      'linear-gradient(90deg, #7C3AED 0%, var(--xp) 100%)',
    violet:  'linear-gradient(90deg, #7C3AED 0%, var(--xp) 100%)',
  };

  const gradient = gradients[variant] ?? gradients.accent;

  return (
    <div style={{ width: '100%' }} className={className}>
      {showPercentage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            marginBottom: '5px',
          }}
        >
          <span>Progress</span>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
            {Math.round(clamped)}%
          </span>
        </div>
      )}

      <div
        style={{
          width: '100%',
          height,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: gradient,
            borderRadius: 'var(--radius-full)',
          }}
        />
      </div>
    </div>
  );
};
