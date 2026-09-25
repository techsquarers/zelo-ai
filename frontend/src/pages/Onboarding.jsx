import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Code2,
  Terminal,
  Layers,
  Database,
  Cpu,
  Clock,
  BookOpen,
  Video,
  Shield,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { onboardingApi } from '../api/profile';
import { generateRoadmapApi } from '../api/roadmaps';
import { useAppStore } from '../store/appStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { showToast } from '../components/ui/Toast';

export const Onboarding = () => {
  const navigate = useNavigate();
  const summary = useAppStore((s) => s.summary);
  const fetchSummary = useAppStore((s) => s.fetchSummary);

  useEffect(() => {
    if (summary?.has_profile) {
      navigate('/dashboard', { replace: true });
    }
  }, [summary, navigate]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [targetRoles, setTargetRoles] = useState(['SDE']);
  const [year, setYear] = useState(3);
  const [branch, setBranch] = useState('CSE');
  const [dailyHours, setDailyHours] = useState(3);
  const [preferredStyle, setPreferredStyle] = useState('video');
  const [skillLevels, setSkillLevels] = useState({ dsa: 2, system_design: 1, python: 3 });
  const [weakAreas, setWeakAreas] = useState(['system design', 'os']);

  const rolesOptions = [
    { title: 'SDE', icon: Code2, desc: 'Software Development Engineer' },
    { title: 'Backend', icon: Terminal, desc: 'APIs, Databases & Microservices' },
    { title: 'Frontend', icon: Layers, desc: 'UI/UX & Web Performance' },
    { title: 'Full-stack', icon: Sparkles, desc: 'Complete Web Applications' },
    { title: 'Data', icon: Database, desc: 'Data Engineering & Analytics' },
    { title: 'DevOps', icon: Cpu, desc: 'CI/CD, Cloud & Infrastructure' },
  ];

  const branches = ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];
  const weakAreaOptions = ['system design', 'os', 'dbms', 'networks', 'dsa', 'web dev', 'oops', 'python'];

  const toggleTargetRole = (role) => {
    if (targetRoles.includes(role)) {
      if (targetRoles.length > 1) {
        setTargetRoles(targetRoles.filter((r) => r !== role));
      }
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        year,
        branch,
        target_roles: targetRoles,
        daily_hours: Number(dailyHours),
        skill_levels: skillLevels,
        weak_areas: weakAreas,
        preferred_style: preferredStyle,
      };

      await onboardingApi(payload);
      showToast('Warrior profile forged!', 'success');

      await generateRoadmapApi(targetRoles[0]);
      showToast('Campaign roadmap generated!', 'success');

      await fetchSummary();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Onboarding submit error:', err);
      showToast(err?.response?.data?.detail || 'Failed to initialize campaign.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        position: 'relative',
        fontFamily: 'var(--font-ui)',
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '640px', position: 'relative', zIndex: 10 }}>
        {/* Header & Step Indicator */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              marginBottom: '14px',
            }}
          >
            <Shield size={16} color="var(--accent)" />
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Campaign Setup · Step {currentStep} of 3
            </span>
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {currentStep === 1 && 'Target Role & Academic Rank'}
            {currentStep === 2 && 'Daily Discipline & Style'}
            {currentStep === 3 && 'Skill Matrix & Target Focus'}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            {currentStep === 1 && 'Select your target engineering domain and current college standing.'}
            {currentStep === 2 && 'Set your daily available execution hours and resource preferences.'}
            {currentStep === 3 && 'Rate your foundation and select areas requiring discipline boost.'}
          </p>

          <div style={{ marginTop: '20px', width: '100%' }}>
            <ProgressBar progress={(currentStep / 3) * 100} variant="cyan" height="4px" />
          </div>
        </div>

        {/* Step Card */}
        <Card padding="32px" accent>
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                {/* Target Role selection */}
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Target Tech Role <span style={{ color: 'var(--accent)' }}>*</span>
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    {rolesOptions.map((role) => {
                      const Icon = role.icon;
                      const isSelected = targetRoles.includes(role.title);
                      return (
                        <div
                          key={role.title}
                          onClick={() => toggleTargetRole(role.title)}
                          style={{
                            padding: '12px 14px',
                            borderRadius: 'var(--radius-lg)',
                            background: isSelected ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                            border: `1px solid ${isSelected ? 'var(--accent-border)' : 'var(--border)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all var(--t-fast)',
                          }}
                        >
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-md)',
                              background: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isSelected ? '#0C0E11' : 'var(--text-secondary)',
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                              {role.title}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{role.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* College Year & Branch */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      Current Year
                    </label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4].map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => setYear(y)}
                          style={{
                            flex: 1,
                            padding: '8px 0',
                            borderRadius: 'var(--radius-md)',
                            background: year === y ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                            border: `1px solid ${year === y ? 'var(--accent-border)' : 'var(--border)'}`,
                            color: year === y ? 'var(--accent)' : 'var(--text-secondary)',
                            fontWeight: 700,
                            fontSize: 'var(--text-sm)',
                            cursor: 'pointer',
                          }}
                        >
                          Yr {y}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      Engineering Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: 'var(--text-sm)',
                        outline: 'none',
                      }}
                    >
                      {branches.map((b) => (
                        <option key={b} value={b} style={{ background: '#111418', color: '#F1F3F5' }}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                {/* Daily hours slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      Daily Available Execution Time
                    </label>
                    <Badge variant="cyan" icon={Clock}>
                      {dailyHours} Hours / Day
                    </Badge>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={1}
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                    <span>1h (Light)</span>
                    <span>3h (Recommended)</span>
                    <span>8h (Intensive)</span>
                  </div>
                </div>

                {/* Preferred style */}
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Preferred Learning Style
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div
                      onClick={() => setPreferredStyle('video')}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-lg)',
                        background: preferredStyle === 'video' ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                        border: `1px solid ${preferredStyle === 'video' ? 'var(--accent-border)' : 'var(--border)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <Video size={20} color={preferredStyle === 'video' ? 'var(--accent)' : 'var(--text-tertiary)'} />
                      <div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: preferredStyle === 'video' ? 'var(--accent)' : 'var(--text-primary)' }}>
                          Video Tutorials
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Visual walkthroughs & YouTube</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPreferredStyle('text')}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-lg)',
                        background: preferredStyle === 'text' ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                        border: `1px solid ${preferredStyle === 'text' ? 'var(--accent-border)' : 'var(--border)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <BookOpen size={20} color={preferredStyle === 'text' ? 'var(--accent)' : 'var(--text-tertiary)'} />
                      <div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: preferredStyle === 'text' ? 'var(--accent)' : 'var(--text-primary)' }}>
                          Text & Documentation
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Articles, docs & guides</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                {/* Skill Ratings */}
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Rate Current Foundation (1 - 5)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { key: 'dsa', label: 'Data Structures & Algorithms' },
                      { key: 'system_design', label: 'System Design & Architecture' },
                      { key: 'python', label: 'Core Language Competency' },
                    ].map((item) => (
                      <div
                        key={item.key}
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-md)',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setSkillLevels({ ...skillLevels, [item.key]: level })}
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: 'var(--radius-sm)',
                                background: skillLevels[item.key] >= level ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                                color: skillLevels[item.key] >= level ? '#0C0E11' : 'var(--text-tertiary)',
                                border: 'none',
                                fontWeight: 800,
                                fontSize: 'var(--text-xs)',
                                cursor: 'pointer',
                              }}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weak Areas multi-select */}
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Areas Requiring Focus & Refinement
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {weakAreaOptions.map((area) => {
                      const isSelected = weakAreas.includes(area);
                      return (
                        <Badge
                          key={area}
                          variant={isSelected ? 'accent' : 'muted'}
                          onClick={() => toggleWeakArea(area)}
                          active={isSelected}
                        >
                          {area.toUpperCase()}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            {currentStep > 1 ? (
              <Button
                variant="secondary"
                size="md"
                leftIcon={ArrowLeft}
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowRight}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                rightIcon={CheckCircle2}
                isLoading={isSubmitting}
                onClick={handleSubmit}
              >
                Forge Campaign & Roadmap
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
