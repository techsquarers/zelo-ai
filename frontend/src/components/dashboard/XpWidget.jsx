import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export const XpWidget = ({ xpData }) => {
  const totalXp = xpData?.total_xp ?? 0;
  const level = Math.floor(totalXp / 100) + 1;
  const xpInLevel = totalXp % 100;
  const toNext = 100 - xpInLevel;

  return (
    <Card padding="18px">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--xp-dim)',
              border: '1px solid rgba(167,139,250,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={20} color="var(--xp)" />
          </div>
          <div>
            <div style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 800,
              color: 'var(--xp)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              Rank {level}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>
              {totalXp} total XP
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
          fontWeight: 600,
        }}>
          <TrendingUp size={13} color="var(--success)" />
          <span style={{ color: 'var(--success)' }}>+{toNext}</span>
          <span>to Rank {level + 1}</span>
        </div>
      </div>

      {/* XP Bar */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          marginBottom: '6px',
        }}>
          <span>Rank {level} progress</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{xpInLevel} / 100</span>
        </div>
        <ProgressBar progress={(xpInLevel / 100) * 100} variant="xp" height="5px" />
      </div>
    </Card>
  );
};
