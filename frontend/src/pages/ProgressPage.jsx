import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Flame,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  ShieldCheck,
  Shield,
} from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Skeleton } from '../components/ui/Spinner';
import { getProgressSummaryApi } from '../api/progress';
import { getProfileApi } from '../api/profile';

export const ProgressPage = () => {
  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['progressSummary'],
    queryFn: getProgressSummaryApi,
  });

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getProfileApi,
  });

  const streak = summary?.streak || {};
  const xp = summary?.xp || {};
  const today = summary?.today || {};

  const currentStreak = streak.current_streak || 0;
  const longestStreak = streak.longest_streak || 0;
  const totalXp = xp.total_xp || 0;
  const level = Math.floor(totalXp / 100) + 1;
  const xpInCurrentLevel = totalXp % 100;

  // 7-day consistency strip
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0-indexed Mon-Sun

  const consistencyDays = daysOfWeek.map((day, idx) => {
    let active = false;
    if (idx === todayIdx) {
      active = today.completed_tasks > 0;
    } else if (idx < todayIdx && currentStreak > (todayIdx - idx)) {
      active = true;
    }
    return { day, active, isToday: idx === todayIdx };
  });

  const isLoading = isSummaryLoading || isProfileLoading;

  return (
    <AppShell title="Progress & Rank Analytics">
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Quote Banner */}
        <Card padding="24px" glow glowColor="accent" accent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px var(--accent-glow)',
                }}
              >
                <Shield size={22} color="#0C0E11" strokeWidth={2.5} />
              </div>
              <div>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
                  "Relentless consistency beats talent."
                </h2>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  Execute daily missions to level up your engineering rank.
                </p>
              </div>
            </div>

            <Badge variant="cyan" icon={TrendingUp}>
              Live Metrics
            </Badge>
          </div>
        </Card>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <Skeleton height="140px" borderRadius="16px" />
            <Skeleton height="140px" borderRadius="16px" />
            <Skeleton height="140px" borderRadius="16px" />
          </div>
        ) : (
          <>
            {/* Top 3 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
              {/* Streak Card */}
              <Card padding="20px" glow glowColor="streak" accent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--streak-dim)',
                      border: '1px solid var(--streak-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Flame size={22} color="var(--streak)" fill="var(--streak)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--streak)' }}>
                      {currentStreak} Days
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Current Active Streak</div>
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                  <span>Longest Streak:</span>
                  <span style={{ color: 'var(--streak)', fontWeight: 700 }}>{longestStreak} Days</span>
                </div>
              </Card>

              {/* XP Level Card */}
              <Card padding="20px" accent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
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
                    <Zap size={22} color="var(--xp)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--xp)' }}>
                      Rank {level}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{totalXp} Total XP Earned</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                    <span>Rank {level} progress</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{xpInCurrentLevel} / 100 XP</span>
                  </div>
                  <ProgressBar progress={xpInCurrentLevel} variant="xp" height="5px" />
                </div>
              </Card>

              {/* Freezes & Protection */}
              <Card padding="20px" accent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShieldCheck size={22} color="var(--accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--accent)' }}>
                      {streak.freezes_remaining ?? 1} Freezes
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Streak Protection Shields</div>
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                  Prevents streak loss on emergency break days
                </div>
              </Card>
            </div>

            {/* 7-Day Consistency Strip */}
            <Card padding="24px" accent>
              <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                7-Day Discipline Strip
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                {consistencyDays.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      background: d.active
                        ? 'var(--accent-dim)'
                        : d.isToday
                        ? 'var(--bg-elevated)'
                        : 'var(--bg-base)',
                      border: `1px solid ${
                        d.active
                          ? 'var(--accent-border)'
                          : d.isToday
                          ? 'var(--accent)'
                          : 'var(--border)'
                      }`,
                      borderRadius: 'var(--radius-lg)',
                      padding: '12px 6px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 600 }}>{d.day}</span>
                    {d.active ? (
                      <CheckCircle2 size={18} color="var(--accent)" />
                    ) : (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid var(--border)' }} />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
};
