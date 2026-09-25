import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, ArrowRight, Target } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const RoadmapPhaseWidget = ({ roadmap }) => {
  const navigate = useNavigate();

  if (!roadmap) {
    return (
      <Card padding="18px">
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <Map size={28} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
          <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            No Active Campaign
          </h4>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
            Generate your personalized career path.
          </p>
          <button
            onClick={() => navigate('/roadmap')}
            style={{
              background: 'var(--accent)',
              color: '#0C0E11',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '6px 14px',
              fontWeight: 700,
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
            }}
          >
            Create Campaign
          </button>
        </div>
      </Card>
    );
  }

  const phases = roadmap.phases ?? [];
  const currentIdx = roadmap.current_phase ?? 0;
  const currentPhase = phases[currentIdx] ?? phases[0];

  return (
    <Card padding="18px" accent>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <Badge variant="accent" icon={Map}>
            Active Campaign
          </Badge>
          <h4 style={{
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginTop: '6px',
            letterSpacing: '-0.01em',
          }}>
            {roadmap.title}
          </h4>
        </div>
        <button
          onClick={() => navigate('/roadmap')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          Full view <ArrowRight size={12} />
        </button>
      </div>

      {/* Current phase block */}
      {currentPhase && (
        <div
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px',
          }}
        >
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 700,
            marginBottom: '3px',
          }}>
            Phase {currentPhase.phase ?? currentIdx + 1} of {phases.length}
          </div>
          <div style={{
            fontSize: 'var(--text-base)',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '-0.01em',
            marginBottom: '10px',
          }}>
            {currentPhase.title}
          </div>

          {currentPhase.focus && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {currentPhase.focus.slice(0, 3).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Target size={12} color="var(--accent)" />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
