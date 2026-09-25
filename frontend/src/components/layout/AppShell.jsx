import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';

export const AppShell = ({ children, title = 'Dashboard' }) => (
  <div
    style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-base)',
      color: 'var(--text-primary)',
    }}
  >
    {/* Desktop Sidebar */}
    <div className="desktop-sidebar">
      <Sidebar />
    </div>

    {/* Main content */}
    <div
      className="app-main-content"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}
    >
      <Topbar title={title} />
      <main style={{ flex: 1, padding: '24px 24px 72px' }}>
        {children}
      </main>
    </div>

    {/* Mobile bottom nav */}
    <BottomNav />

    <style>{`
      @media (min-width: 769px) {
        .app-main-content {
          margin-left: var(--sidebar-width);
        }
        .mobile-bottom-nav {
          display: none !important;
        }
      }
      @media (max-width: 768px) {
        .desktop-sidebar {
          display: none !important;
        }
        .app-main-content {
          margin-left: 0 !important;
        }
        .mobile-bottom-nav {
          display: flex !important;
        }
      }
    `}</style>
  </div>
);
