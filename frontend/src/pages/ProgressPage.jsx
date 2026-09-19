import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Flame,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Target,
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

  // Deriving 7-day consistency strip cleanly
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
    <AppShell title="Progress Analytics">
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Quote Banner */}
        <Card padding="24px" glow glowColor="violet">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={24} color="#0B0F14" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
                  "Consistency beats talent."
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                  Keep moving forward every day, step by step.
                </p>
              </div>
            </div>

            <Badge variant="violet" icon={TrendingUp}>
              Real-time Analytics
            </Badge>
          </div>
        </Card>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <Skeleton height="140px" borderRadius="20px" />
            <Skeleton height="140px" borderRadius="20px" />
            <Skeleton height="140px" borderRadius="20px" />
          </div>
        ) : (
          <>
            {/* Top 3 Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {/* Streak Card */}
              <Card padding="24px" glow glowColor="streak">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: 'rgba(249, 115, 22, 0.15)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Flame size={24} color="#F97316" fill="#F97316" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F97316' }}>
                      {currentStreak} Days
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Current Active Streak</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                  <span>Longest Streak:</span>
                  <span style={{ color: '#F97316', fontWeight: 700 }}>{longestStreak} Days</span>
                </div>
              </Card>

              {/* XP Level Card */}
              <Card padding="24px">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: 'rgba(52, 211, 153, 0.15)',
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Zap size={24} color="#34D399" fill="#34D399" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399' }}>
                      Level {level}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{totalXp} Total XP</div>
                  </div>
                </div>
                <ProgressBar progress={(xpInCurrentLevel / 100) * 100} variant="success" height="6px" />
              </Card>

              {/* Today Completion Card */}
              <Card padding="24px">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: 'rgba(34, 211, 238, 0.15)',
                      border: '1px solid rgba(34, 211, 238, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle2 size={24} color="#22D3EE" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22D3EE' }}>
                      {today.completion_percentage || 0}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Today's Execution</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#D1D5DB', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                  <span>Tasks Completed:</span>
                  <span style={{ color: '#22D3EE', fontWeight: 700 }}>
                    {today.completed_tasks || 0} / {today.total_tasks || 0}
                  </span>
                </div>
              </Card>
            </div>

            {/* 7-Day Consistency Strip */}
            <Card padding="24px">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Calendar size={20} color="#22D3EE" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F3F4F6' }}>
                  7-Day Consistency Strip
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gap: '12px',
                  textAlign: 'center',
                }}
              >
                {consistencyDays.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: item.active
                        ? 'rgba(52, 211, 153, 0.15)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: item.isToday
                        ? '1.5px solid #22D3EE'
                        : item.active
                        ? '1px solid rgba(52, 211, 153, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '16px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: item.isToday ? '#22D3EE' : '#9CA3AF', fontWeight: 600 }}>
                      {item.day}
                    </span>
                    {item.active ? (
                      <CheckCircle2 size={20} color="#34D399" />
                    ) : (
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.1)',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Profile Skills & Weak Areas Overview */}
            {profile && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <Card padding="24px">
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#F3F4F6', marginBottom: '16px' }}>
                    Current Skill Levels
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {Object.entries(profile.skill_levels || {}).map(([skill, lvl]) => (
                      <div key={skill}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                          <span style={{ color: '#D1D5DB', textTransform: 'uppercase', fontWeight: 600 }}>{skill}</span>
                          <span style={{ color: '#22D3EE', fontWeight: 700 }}>Level {lvl} / 5</span>
                        </div>
                        <ProgressBar progress={(lvl / 5) * 100} variant="cyan" height="6px" />
                      </div>
                    ))}
                  </div>
                </Card>

                <Card padding="24px">
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#F3F4F6', marginBottom: '16px' }}>
                    Target Weak Areas
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(profile.weak_areas || []).map((area, idx) => (
                      <Badge key={idx} variant="streak" icon={Target}>
                        {area}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
};
