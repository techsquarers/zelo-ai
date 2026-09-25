import React from 'react';

const BADGE_STYLES = {
  accent: {
    background: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)',
  },
  cyan: {
    background: 'var(--accent-dim)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)',
  },
  streak: {
    background: 'var(--streak-dim)',
    border: '1px solid var(--streak-border)',
    color: 'var(--streak)',
  },
  rank: {
    background: 'var(--rank-dim)',
    border: '1px solid var(--rank-border, rgba(220,38,38,0.3))',
    color: 'var(--rank)',
  },
  success: {
    background: 'var(--success-dim)',
    border: '1px solid var(--success-border)',
    color: 'var(--success)',
  },
  xp: {
    background: 'var(--xp-dim)',
    border: '1px solid rgba(167,139,250,0.3)',
    color: 'var(--xp)',
  },
  violet: {
    background: 'var(--xp-dim)',
    border: '1px solid rgba(167,139,250,0.3)',
    color: 'var(--xp)',
  },
  muted: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
  },
  danger: {
    background: 'var(--danger-dim)',
    border: '1px solid var(--danger-border)',
    color: 'var(--text-danger)',
  },
};

export const Badge = ({
  children,
  variant = 'accent',
  active = false,
  onClick,
  icon: Icon,
  className = '',
  style,
}) => {
  const baseStyle = BADGE_STYLES[variant] ?? BADGE_STYLES.muted;

  const activeStyle = active
    ? {
        background: 'var(--accent-dim)',
        border: '1px solid var(--accent)',
        color: 'var(--accent)',
      }
    : baseStyle;

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.01em',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        transition: `all var(--t-fast)`,
        ...activeStyle,
        ...style,
      }}
      className={className}
    >
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
};
