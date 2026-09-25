import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: {
    background: 'var(--accent)',
    color: '#0C0E11',
    border: '1px solid transparent',
    fontWeight: 600,
    boxShadow: '0 0 0 0 var(--accent-glow)',
    '--hover-bg': 'var(--accent-strong)',
    '--hover-shadow': '0 4px 16px var(--accent-glow)',
  },
  secondary: {
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    fontWeight: 500,
  },
  outline: {
    background: 'transparent',
    color: 'var(--accent)',
    border: '1px solid var(--accent-border)',
    fontWeight: 500,
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent',
    fontWeight: 500,
  },
  danger: {
    background: 'var(--danger-dim)',
    color: 'var(--text-danger)',
    border: '1px solid var(--danger-border)',
    fontWeight: 500,
  },
  warrior: {
    background: 'var(--streak-dim)',
    color: 'var(--streak)',
    border: '1px solid var(--streak-border)',
    fontWeight: 600,
  },
};

const SIZES = {
  xs: { padding: '4px 10px',  fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)',  gap: '5px'  },
  sm: { padding: '6px 12px',  fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-md)',  gap: '6px'  },
  md: { padding: '9px 16px',  fontSize: 'var(--text-base)',borderRadius: 'var(--radius-lg)', gap: '7px'  },
  lg: { padding: '12px 22px', fontSize: 'var(--text-md)', borderRadius: 'var(--radius-lg)',  gap: '8px'  },
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const vStyle = VARIANTS[variant] || VARIANTS.primary;
  const sStyle = SIZES[size] || SIZES.md;
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      disabled={isDisabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sStyle.gap,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: `background var(--t-base), box-shadow var(--t-base), border-color var(--t-base)`,
        letterSpacing: '-0.01em',
        ...vStyle,
        ...sStyle,
        ...style,
      }}
      className={className}
      {...props}
    >
      {isLoading
        ? <Loader2 size={15} className="spin-icon" />
        : LeftIcon && <LeftIcon size={15} />
      }
      <span>{children}</span>
      {!isLoading && RightIcon && <RightIcon size={15} />}
    </motion.button>
  );
};
