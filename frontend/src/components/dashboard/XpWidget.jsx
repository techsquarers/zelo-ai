import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export const XpWidget = ({ xpData }) => {
  const totalXp = xpData?.total_xp || 0;
  const level = Math.floor(totalXp / 100) + 1;
  const xpInCurrentLevel = totalXp % 100;
  const progressToNextLevel = (xpInCurrentLevel / 100) * 100;

  return (
    <Card padding="20px">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={22} color="#34D399" fill="#34D399" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>
              Level {level}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{totalXp} Total XP</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#34D399', fontWeight: 600 }}>
          <TrendingUp size={16} />
          <span>+{100 - xpInCurrentLevel} XP to Lv {level + 1}</span>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280', marginBottom: '6px' }}>
          <span>Level {level} Progress</span>
          <span>{xpInCurrentLevel} / 100 XP</span>
        </div>
        <ProgressBar progress={progressToNextLevel} variant="success" height="8px" />
      </div>
    </Card>
  );
};
