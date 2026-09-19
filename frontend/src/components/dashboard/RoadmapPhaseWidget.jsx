import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const RoadmapPhaseWidget = ({ roadmap }) => {
  const navigate = useNavigate();

  if (!roadmap) {
    return (
      <Card padding="20px">
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <Map size={32} color="#22D3EE" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#F3F4F6' }}>No Active Roadmap</h4>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '4px 0 12px' }}>
            Generate a personalized career path to guide your daily tasks.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            style={{
              background: '#22D3EE',
              color: '#0B0F14',
              border: 'none',
              borderRadius: '10px',
              padding: '6px 14px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Create Roadmap
          </button>
        </div>
      </Card>
    );
  }

  const phases = roadmap.phases || [];
  const currentPhaseIndex = roadmap.current_phase || 0;
  const currentPhase = phases[currentPhaseIndex] || phases[0];

  return (
    <Card padding="20px">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <Badge variant="cyan" icon={Map} className="mb-2">
            Active Roadmap
          </Badge>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F3F4F6', marginTop: '6px' }}>
            {roadmap.title}
          </h4>
        </div>
        <button
          onClick={() => navigate('/roadmap')}
          style={{
            background: 'none',
            border: 'none',
            color: '#22D3EE',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: 0,
          }}
        >
          View Full <ArrowRight size={14} />
        </button>
      </div>

      {currentPhase && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '14px',
            marginTop: '12px',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Phase {currentPhase.phase || currentPhaseIndex + 1}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#22D3EE', marginTop: '2px' }}>
            {currentPhase.title}
          </div>

          {currentPhase.focus && (
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentPhase.focus.slice(0, 3).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>
                  <CheckCircle2 size={14} color="#34D399" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
