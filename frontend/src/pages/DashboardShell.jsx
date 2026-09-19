import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { Flame, Zap, CheckCircle2, MapPin, Sparkles, Clock } from 'lucide-react';

export const DashboardShell = () => {
  const summary = useAppStore((s) => s.summary);
  const user = useAuthStore((s) => s.user);

  const streak = summary?.streak?.current_streak || 0;
  const totalXp = summary?.xp?.total_xp || 0;
  const level = summary?.xp?.level || 1;
  const today = summary?.today || { total_tasks: 0, completed_tasks: 0, completion_percentage: 0 };

  return (
    <AppShell title="Today's Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1100px' }}>
        {/* Welcome Header */}
        <Card padding="28px" glow glowColor="cyan">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={20} color="#22D3EE" />
                <Badge variant="cyan">Career Roadmap Active</Badge>
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
                Welcome back, {user?.email?.split('@')[0] || 'Student'}!
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#9CA3AF', marginTop: '4px' }}>
                You are on track. Complete today’s tasks to keep your streak alive!
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Streak Card */}
              <div
                style={{
                  background: 'rgba(249, 115, 22, 0.15)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F97316', fontWeight: 800, fontSize: '1.2rem' }}>
                  <Flame size={20} fill="#F97316" /> {streak} Days
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>Current Streak</div>
              </div>

              {/* XP Card */}
              <div
                style={{
                  background: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  borderRadius: '16px',
                  padding: '12px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', fontWeight: 800, fontSize: '1.2rem' }}>
                  <Zap size={20} fill="#34D399" /> {totalXp} XP
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '2px' }}>Level {level}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily Tasks Main Container Placeholder */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
          {/* Main Execution Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card padding="24px">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F3F4F6' }}>
                  Today's Execution Plan
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                  {today.completed_tasks} / {today.total_tasks} completed
                </span>
              </div>

              <ProgressBar progress={today.completion_percentage} variant="cyan" height="10px" showPercentage />

              <div
                style={{
                  marginTop: '24px',
                  padding: '32px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                }}
              >
                <Clock size={36} color="#22D3EE" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F3F4F6' }}>
                  Daily Tasks Engine Initialized
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '6px', maxWidth: '400px', margin: '6px auto 0' }}>
                  Your roadmap has been generated. Ready to render daily executable tasks in Step 2.
                </p>
              </div>
            </Card>
          </div>

          {/* Side Overview Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card padding="20px">
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#F3F4F6', marginBottom: '12px' }}>
                Quick Stats
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                  <span>Freezes Left:</span>
                  <span style={{ color: '#F3F4F6', fontWeight: 600 }}>
                    {summary?.streak?.freezes_remaining ?? 1}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                  <span>Longest Streak:</span>
                  <span style={{ color: '#F97316', fontWeight: 600 }}>
                    {summary?.streak?.longest_streak ?? 0} days
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                  <span>Roadmap Status:</span>
                  <span style={{ color: '#34D399', fontWeight: 600 }}>Active</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
