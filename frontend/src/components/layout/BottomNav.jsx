import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, TrendingUp, User } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { label: 'Today', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'Progress', path: '/progress', icon: TrendingUp },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: 'rgba(15, 20, 28, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 50,
      }}
      className="mobile-bottom-nav"
    >
      {navItems.map((item) => {
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
              color: isActive ? '#22D3EE' : '#9CA3AF',
              fontSize: '0.7rem',
              fontWeight: 500,
              textDecoration: 'none',
            })}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
