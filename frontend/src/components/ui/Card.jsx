import React from 'react';
import { motion } from 'framer-motion';

/**
 * Panel / Card — Zilo-AI Warrior Design System
 * Surface panel, not a glowing neon box.
 * Use glow sparingly for hero moments (dashboard header, current phase).
 */
export const Card = ({
  children,
  className = '',
  hoverable = false,
  glow = false,
  glowColor = 'accent',
  padding = '20px',
  accent = false,    // left-edge blade accent line
  onClick,
  style,
  ...props
}) => {
  const glowMap = {
    accent:  'rgba(56,  189, 248, 0.12)',
    streak:  'rgba(249, 115, 22,  0.12)',
    success: 'rgba(34,  197, 94,  0.1)',
    rank:    'rgba(220, 38,  38,  0.1)',
    cyan:    'rgba(56,  189, 248, 0.12)',
    violet:  'rgba(167, 139, 250, 0.1)',
  };

  const glowShadow = glow
    ? `0 0 32px ${glowMap[glowColor] ?? glowMap.accent}, var(--shadow-md)`
    : 'var(--shadow-sm)';

  return (
    <motion.div
      whileHover={hoverable ? { y: -2, transition: { duration: 0.18 } } : {}}
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding,
        boxShadow: glowShadow,
        transition: `border-color var(--t-base), box-shadow var(--t-base)`,
        cursor: onClick ? 'pointer' : 'default',
        overflow: accent ? 'visible' : undefined,
        ...style,
      }}
      className={className}
      {...props}
    >
      {/* Warrior blade-edge accent — left 1px line */}
      {accent && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: '16px',
          bottom: '16px',
          width: '1px',
          background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)',
          borderRadius: '1px',
        }} />
      )}
      {children}
    </motion.div>
  );
};
