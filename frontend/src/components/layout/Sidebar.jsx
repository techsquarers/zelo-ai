import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, TrendingUp, User, Flame, Zap, LogOut, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

export const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const summary = useAppStore((s) => s.summary);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Today Tasks', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Career Roadmap', path: '/roadmap', icon: Map },
    { label: 'Progress & Stats', path: '/progress', icon: TrendingUp },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  const streakCount = summary?.streak?.current_streak || 0;
  const totalXp = summary?.xp?.total_xp || 0;
  const level = summary?.xp?.level || 1;

  return (
    <aside
      style={{
        width: '260px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'rgba(15, 20, 28, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        zIndex: 50,
      }}
    >
      <div>
        {/* Brand */}
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            marginBottom: '28px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={22} color="#0B0F14" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#F3F4F6' }}>
              Zilo<span style={{ color: '#22D3EE' }}>.ai</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Tech Career Coach</p>
          </div>
        </div>

        {/* Gamification Stats Card */}
        <div
          style={{
            background: 'rgba(22, 31, 44, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '12px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {/* Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={20} color="#F97316" fill="#F97316" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F97316' }}>
                {streakCount} d
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Streak</div>
            </div>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

          {/* XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="#34D399" fill="#34D399" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34D399' }}>
                {totalXp} XP
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Lvl {level}</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 16px',
                  borderRadius: '14px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  color: isActive ? '#22D3EE' : '#9CA3AF',
                  background: isActive ? 'rgba(34, 211, 238, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(34, 211, 238, 0.3)' : '1px solid transparent',
                })}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '14px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#F87171',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
