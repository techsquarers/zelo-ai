import React, { useId } from 'react';

/**
 * Input — Zilo-AI Warrior Design System
 * X/Grok form density: clear labels, strong focus rings, compact height.
 */
export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}
      className={className}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '11px',
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={16} />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          style={{
            width: '100%',
            padding: Icon ? '10px 12px 10px 36px' : '10px 12px',
            background: 'var(--bg-elevated)',
            border: error
              ? '1px solid var(--danger)'
              : '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-base)',
            letterSpacing: '-0.01em',
            transition: `border-color var(--t-base), box-shadow var(--t-base)`,
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = error
              ? 'var(--danger)'
              : 'var(--accent-border)';
            e.target.style.boxShadow = error
              ? '0 0 0 3px var(--danger-dim)'
              : '0 0 0 3px var(--accent-dim)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border)';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        />
      </div>

      {error ? (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-danger)', fontWeight: 500 }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
};
