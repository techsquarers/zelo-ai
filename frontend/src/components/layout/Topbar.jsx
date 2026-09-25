import React from 'react';
import { Flame, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

export const Topbar = ({ title }) => {
  const user = useAuthStore((s) => s.user);
  const summary = useAppStore((s) => s.summary);

  const streak = summary?.streak?.current_streak ?? 0;
  const level = summary?.xp?.level ?? 1;
  const totalXp = summary?.xp?.total_xp ?? 0;

  // Abbreviated email for display
  const displayUser = user?.email
    ? user.email.split('@')[0]
    : 'Warrior';

  return (
    <header
      style={{
        height: '56px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(12, 14, 17, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* Page title */}
      <h2
        style={{
          fontSize: 'var(--text-md)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>

      {/* Right: compact stat pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Streak */}
        {streak > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'var(--streak-dim)',
              border: '1px solid var(--streak-border)',
              borderRadius: 'var(--radius-md)',
              padding: '4px 10px',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              color: 'var(--streak)',
            }}
          >
            <Flame size={13} fill="var(--streak)" />
            <span>{streak}d</span>
          </div>
        )}

        {/* Rank */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '4px 10px',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--xp)',
          }}
        >
          <Shield size={12} />
          <span>Lv.{level}</span>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>·</span>
          <span style={{ color: 'var(--text-secondary)' }}>{totalXp} XP</span>
        </div>

        {/* User */}
        <div
          style={{
            padding: '4px 10px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayUser}
        </div>
      </div>
    </header>
  );
};
