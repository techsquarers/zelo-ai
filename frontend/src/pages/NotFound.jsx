import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B0F14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        color: '#F3F4F6',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <Sparkles size={36} color="#0B0F14" />
      </div>

      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#22D3EE', letterSpacing: '-0.03em' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '12px 0 8px' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#9CA3AF', maxWidth: '400px', marginBottom: '28px' }}>
        The route you are looking for doesn't exist or has been moved.
      </p>

      <Button variant="primary" leftIcon={Home} onClick={() => navigate('/')}>
        Back to Safety
      </Button>
    </div>
  );
};
