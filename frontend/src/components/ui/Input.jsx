import React from 'react';

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
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }} className={className}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: '0.875rem', fontWeight: 500, color: '#D1D5DB' }}
        >
          {label}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          style={{
            width: '100%',
            padding: Icon ? '10px 14px 10px 40px' : '10px 14px',
            background: 'rgba(15, 20, 28, 0.8)',
            border: error ? '1px solid #F87171' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#F3F4F6',
            fontSize: '0.95rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)';
              e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.15)';
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
            }
          }}
          {...props}
        />
      </div>

      {error ? (
        <span style={{ fontSize: '0.8rem', color: '#F87171' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{helperText}</span>
      ) : null}
    </div>
  );
};
