import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          boxShadow: '0 0 24px var(--accent-glow)',
        }}
      >
        <Shield size={28} color="#0C0E11" strokeWidth={2.5} />
      </div>

      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em', margin: 0 }}>
        404
      </h1>
      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: '10px 0 6px', color: 'var(--text-primary)' }}>
        Sector Out of Bounds
      </h2>
      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', maxWidth: '380px', marginBottom: '24px' }}>
        The requested path does not exist in the Zilo-AI campaign terminal.
      </p>

      <Button variant="primary" leftIcon={Home} onClick={() => navigate('/dashboard')}>
        Return to Command Dashboard
      </Button>
    </div>
  );
};
