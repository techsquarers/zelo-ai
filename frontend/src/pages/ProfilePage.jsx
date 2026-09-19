import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Flame,
  Zap,
  ShieldCheck,
  Save,
  LogOut,
  Sparkles,
  BookOpen,
  Video,
  Rocket,
  Check,
} from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Spinner';
import { showToast } from '../components/ui/Toast';
import { getProfileApi, updateProfileApi } from '../api/profile';
import { getProgressSummaryApi } from '../api/progress';
import { getMeApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: getMeApi });
  const { data: summary } = useQuery({ queryKey: ['progressSummary'], queryFn: getProgressSummaryApi });
  const { data: profile, isLoading } = useQuery({ queryKey: ['userProfile'], queryFn: getProfileApi });

  // Form State
  const [year, setYear] = useState(3);
  const [branch, setBranch] = useState('CSE');
  const [targetRoles, setTargetRoles] = useState(['SDE']);
  const [dailyHours, setDailyHours] = useState(3);
  const [preferredStyle, setPreferredStyle] = useState('video');
  const [skillLevels, setSkillLevels] = useState({ dsa: 2, system_design: 1, python: 3 });
  const [weakAreas, setWeakAreas] = useState(['system design', 'os']);

  useEffect(() => {
    if (profile) {
      if (profile.year) setYear(profile.year);
      if (profile.branch) setBranch(profile.branch);
      if (profile.target_roles) setTargetRoles(profile.target_roles);
      if (profile.daily_hours) setDailyHours(profile.daily_hours);
      if (profile.preferred_style) setPreferredStyle(profile.preferred_style);
      if (profile.skill_levels) setSkillLevels(profile.skill_levels);
      if (profile.weak_areas) setWeakAreas(profile.weak_areas);
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateProfileApi(data),
    onSuccess: () => {
      showToast('Profile updated successfully!', 'success');
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (err) => {
      showToast(err?.response?.data?.detail || 'Failed to update profile.', 'error');
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      year: Number(year),
      branch,
      target_roles: targetRoles,
      daily_hours: Number(dailyHours),
      preferred_style: preferredStyle,
      skill_levels: skillLevels,
      weak_areas: weakAreas,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const rolesOptions = ['SDE', 'Backend', 'Frontend', 'Full-stack', 'Data', 'DevOps'];
  const branches = ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];
  const weakAreaOptions = ['system design', 'os', 'dbms', 'networks', 'dsa', 'web dev', 'oops', 'python'];

  const toggleTargetRole = (role) => {
    if (targetRoles.includes(role)) {
      if (targetRoles.length > 1) setTargetRoles(targetRoles.filter((r) => r !== role));
    } else {
      setTargetRoles([...targetRoles, role]);
    }
  };

  const toggleWeakArea = (area) => {
    if (weakAreas.includes(area)) {
      setWeakAreas(weakAreas.filter((a) => a !== area));
    } else {
      setWeakAreas([...weakAreas, area]);
    }
  };

  const streakCount = summary?.streak?.current_streak || 0;
  const totalXp = summary?.xp?.total_xp || 0;
  const level = Math.floor(totalXp / 100) + 1;
  const freezes = summary?.streak?.freezes_remaining ?? 1;

  return (
    <AppShell title="My Profile & Settings">
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Profile Stats Header Card */}
        <Card padding="28px" glow glowColor="cyan">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={32} color="#0B0F14" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
                  {user?.email || 'Engineering Student'}
                </h1>
                <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '2px' }}>
                  Student Member • Zilo-AI Workspace
                </p>
              </div>
            </div>

            <Button variant="danger" leftIcon={LogOut} onClick={handleLogout}>
              Sign Out
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
              <div style={{ color: '#F97316', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Flame size={18} fill="#F97316" /> {streakCount} Days
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Streak</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
              <div style={{ color: '#34D399', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Zap size={18} fill="#34D399" /> Lvl {level} ({totalXp} XP)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Level</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
              <div style={{ color: '#22D3EE', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <ShieldCheck size={18} /> {freezes} Left
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Freezes</div>
            </div>
          </div>
        </Card>

        {isLoading ? (
          <Skeleton height="300px" borderRadius="24px" />
        ) : (
          /* Profile Edit Form */
          <form onSubmit={handleSave}>
            <Card padding="32px">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F3F4F6', marginBottom: '24px' }}>
                Edit Career Preferences
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Year & Branch */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '8px' }}>
                      Current Year
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {[1, 2, 3, 4].map((y) => (
                        <div
                          key={y}
                          onClick={() => setYear(y)}
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: year === y ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                            border: year === y ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: year === y ? '#C084FC' : '#F3F4F6',
                          }}
                        >
                          {y}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '8px' }}>
                      Engineering Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(15, 20, 28, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: '#F3F4F6',
                        fontSize: '0.95rem',
                      }}
                    >
                      {branches.map((b) => (
                        <option key={b} value={b} style={{ background: '#0F141C' }}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Target Roles */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '8px' }}>
                    Target Roles
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {rolesOptions.map((role) => {
                      const selected = targetRoles.includes(role);
                      return (
                        <Badge
                          key={role}
                          variant={selected ? 'cyan' : 'muted'}
                          active={selected}
                          onClick={() => toggleTargetRole(role)}
                        >
                          {role}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Daily Hours Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#D1D5DB' }}>Daily Commitment</span>
                    <span style={{ color: '#22D3EE', fontWeight: 700 }}>{dailyHours} Hours / Day</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                    style={{ width: '100%', accentColor: '#22D3EE', cursor: 'pointer' }}
                  />
                </div>

                {/* Preferred Learning Style */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '8px' }}>
                    Preferred Learning Style
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {[
                      { id: 'video', label: 'Video Lessons', icon: Video },
                      { id: 'reading', label: 'Reading & Docs', icon: BookOpen },
                      { id: 'projects', label: 'Projects', icon: Rocket },
                    ].map((style) => {
                      const Icon = style.icon;
                      const active = preferredStyle === style.id;
                      return (
                        <div
                          key={style.id}
                          onClick={() => setPreferredStyle(style.id)}
                          style={{
                            background: active ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: active ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: active ? '#34D399' : '#D1D5DB',
                          }}
                        >
                          <Icon size={16} />
                          <span>{style.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skill Levels */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '12px' }}>
                    Skill Levels (1-5)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { key: 'dsa', name: 'DSA & Algorithms' },
                      { key: 'system_design', name: 'System Design' },
                      { key: 'python', name: 'Python / Code Proficiency' },
                    ].map((skill) => (
                      <div key={skill.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                          <span style={{ color: '#D1D5DB' }}>{skill.name}</span>
                          <span style={{ color: '#8B5CF6', fontWeight: 700 }}>Level {skillLevels[skill.key] || 1}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={skillLevels[skill.key] || 1}
                          onChange={(e) =>
                            setSkillLevels({ ...skillLevels, [skill.key]: Number(e.target.value) })
                          }
                          style={{ width: '100%', accentColor: '#8B5CF6', cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weak Areas */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '8px' }}>
                    Weak Areas to Focus
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {weakAreaOptions.map((area) => {
                      const selected = weakAreas.includes(area);
                      return (
                        <Badge
                          key={area}
                          variant={selected ? 'streak' : 'muted'}
                          active={selected}
                          onClick={() => toggleWeakArea(area)}
                        >
                          {area}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Save Button */}
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    leftIcon={Save}
                    isLoading={updateMutation.isPending}
                  >
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            </Card>
          </form>
        )}
      </div>
    </AppShell>
  );
};
