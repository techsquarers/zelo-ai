import React from 'react';

export const Badge = ({
  children,
  variant = 'cyan',
  active = false,
  onClick,
  icon: Icon,
  className = '',
}) => {
  const getStyles = () => {
    if (active) {
      return {
        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)',
        border: '1px solid #22D3EE',
        color: '#22D3EE',
        boxShadow: '0 0 12px rgba(34, 211, 238, 0.3)',
      };
    }

    switch (variant) {
      case 'cyan':
        return {
          background: 'rgba(34, 211, 238, 0.12)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          color: '#22D3EE',
        };
      case 'violet':
        return {
          background: 'rgba(139, 92, 246, 0.12)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          color: '#C084FC',
        };
      case 'streak':
        return {
          background: 'rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          color: '#F97316',
        };
      case 'success':
        return {
          background: 'rgba(52, 211, 153, 0.12)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          color: '#34D399',
        };
      case 'muted':
      default:
        return {
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#9CA3AF',
        };
    }
  };

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        ...getStyles(),
      }}
      className={className}
    >
      {Icon && <Icon size={14} />}
      <span>{children}</span>
    </span>
  );
};
