import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';

export const AppShell = ({ children, title = 'Dashboard' }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F14', color: '#F3F4F6' }}>
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* Main Content Area */}
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
        <main style={{ flex: 1, padding: '28px 28px 80px 28px' }}>{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Mobile / Responsive CSS Overrides */}
      <style>{`
        @media (min-width: 769px) {
          .app-main-content {
            margin-left: 260px;
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
};
