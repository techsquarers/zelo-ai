import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)',
          color: '#0B0F14',
          border: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 14px rgba(34, 211, 238, 0.3)',
        };
      case 'glow':
        return {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          color: '#FFFFFF',
          border: 'none',
          fontWeight: 600,
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#F3F4F6',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(8px)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: '#22D3EE',
          border: '1px solid rgba(34, 211, 238, 0.4)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#9CA3AF',
          border: 'none',
        };
      case 'danger':
        return {
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#F87171',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 14px', fontSize: '0.85rem', borderRadius: '10px' };
      case 'lg':
        return { padding: '14px 28px', fontSize: '1.05rem', borderRadius: '16px' };
      case 'md':
      default:
        return { padding: '10px 20px', fontSize: '0.95rem', borderRadius: '12px' };
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        ...getVariantStyles(),
        ...getSizeStyles(),
      }}
      className={className}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={18} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
      ) : (
        LeftIcon && <LeftIcon size={18} />
      )}
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon size={18} />}
    </motion.button>
  );
};
