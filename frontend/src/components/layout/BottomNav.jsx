import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, TrendingUp, User } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Missions', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Campaign', path: '/roadmap',   icon: Map },
  { label: 'Progress', path: '/progress',  icon: TrendingUp },
  { label: 'Profile',  path: '/profile',   icon: User },
];

export const BottomNav = () => (
  <nav
    className="mobile-bottom-nav"
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'rgba(12, 14, 17, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border)',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 50,
    }}
  >
    {/* Warrior edge top line */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
    }} />

    {NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            color: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
            fontSize: '0.6rem',
            fontWeight: isActive ? 700 : 500,
            textDecoration: 'none',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)',
            transition: 'color var(--t-fast)',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={17} />
              <span>{item.label}</span>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  width: '20px',
                  height: '2px',
                  background: 'var(--accent)',
                  borderRadius: '0 0 2px 2px',
                }} />
              )}
            </>
          )}
        </NavLink>
      );
    })}
  </nav>
);
