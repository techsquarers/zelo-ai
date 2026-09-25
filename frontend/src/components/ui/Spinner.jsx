import React from 'react';

export const Spinner = ({ size = 20, color = 'var(--accent)' }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: `2px solid rgba(255,255,255,0.08)`,
      borderTopColor: color,
      animation: 'spin 0.75s linear infinite',
      flexShrink: 0,
    }}
  />
);

export const Skeleton = ({
  height = '20px',
  width = '100%',
  borderRadius = 'var(--radius-lg)',
  style,
}) => (
  <div
    className="skeleton-shimmer"
    style={{
      height,
      width,
      borderRadius,
      ...style,
    }}
  />
);

/** SkeletonGroup — multiple skeleton rows */
export const SkeletonGroup = ({ count = 3, height = '88px', gap = '12px', borderRadius = 'var(--radius-xl)' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} height={height} borderRadius={borderRadius} />
    ))}
  </div>
);
