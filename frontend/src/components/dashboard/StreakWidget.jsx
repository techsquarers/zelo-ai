import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ShieldCheck, Award } from 'lucide-react';
import { Card } from '../ui/Card';

export const StreakWidget = ({ streak }) => {
  const currentStreak = streak?.current_streak || 0;
  const longestStreak = streak?.longest_streak || 0;
  const freezes = streak?.freezes_remaining ?? 1;

  return (
    <Card padding="20px" glow glowColor="streak">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)',
          }}
        >
          <Flame size={28} color="#0B0F14" fill="#0B0F14" />
        </motion.div>

        <div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F97316', lineHeight: 1.1 }}>
            {currentStreak} Day Streak
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '2px' }}>
            {currentStreak > 0 ? "You're on fire!" : 'Complete a task today to start!'}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '14px',
          padding: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={16} color="#FBBF24" />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F3F4F6' }}>
              {longestStreak} d
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Best Streak</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={16} color="#22D3EE" />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F3F4F6' }}>
              {freezes} Left
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Streak Freezes</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
