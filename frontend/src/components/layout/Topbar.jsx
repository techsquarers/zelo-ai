import React from 'react';
import { Flame, Zap, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

export const Topbar = ({ title }) => {
  const user = useAuthStore((s) => s.user);
  const summary = useAppStore((s) => s.summary);

  const streak = summary?.streak?.current_streak || 0;
  const level = summary?.xp?.level || 1;
  const totalXp = summary?.xp?.total_xp || 0;

  return (
    <header
      style={{
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(11, 15, 20, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
      }}
    >
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F3F4F6' }}>
        {title}
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Streak Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(249, 115, 22, 0.12)',
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#F97316',
          }}
        >
          <Flame size={16} fill="#F97316" />
          <span>{streak} Day Streak</span>
        </div>

        {/* Level & XP Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(52, 211, 153, 0.12)',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#34D399',
          }}
        >
          <Zap size={16} fill="#34D399" />
          <span>Lvl {level} ({totalXp} XP)</span>
        </div>

        {/* User Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '0.85rem',
            color: '#D1D5DB',
          }}
        >
          <UserIcon size={16} />
          <span>{user?.email || 'Student'}</span>
        </div>
      </div>
    </header>
  );
};
