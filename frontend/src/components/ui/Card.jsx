import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverable = false,
  glow = false,
  glowColor = 'cyan',
  padding = '20px',
  onClick,
  ...props
}) => {
  const glowShadow =
    glowColor === 'cyan'
      ? '0 0 24px rgba(34, 211, 238, 0.25)'
      : glowColor === 'streak'
      ? '0 0 24px rgba(249, 115, 22, 0.25)'
      : glowColor === 'violet'
      ? '0 0 24px rgba(139, 92, 246, 0.25)'
      : '0 0 24px rgba(255, 255, 255, 0.15)';

  return (
    <motion.div
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      style={{
        background: 'rgba(15, 20, 28, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: padding,
        boxShadow: glow ? glowShadow : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
