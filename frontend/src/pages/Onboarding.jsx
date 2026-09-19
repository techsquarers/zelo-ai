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
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import { onboardingApi } from '../api/profile';
import { generateRoadmapApi } from '../api/roadmaps';
import { useAppStore } from '../store/appStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { showToast } from '../components/ui/Toast';

export const Onboarding = () => {
  const navigate = useNavigate();
  const summary = useAppStore((s) => s.summary);
  const fetchSummary = useAppStore((s) => s.fetchSummary);

  // Guard: if already completed onboarding, redirect to dashboard
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

      // 1. Post Onboarding Profile
      await onboardingApi(payload);
      showToast('Profile created successfully!', 'success');

      // 2. Generate initial roadmap based on primary target role
      await generateRoadmapApi(targetRoles[0]);
      showToast('Custom roadmap generated!', 'success');

      // 3. Refresh summary state
      await fetchSummary();

      // 4. Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Onboarding submit error:', err);
      showToast(err?.response?.data?.detail || 'Failed to submit onboarding.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B0F14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: '680px', position: 'relative', zIndex: 10 }}>
        {/* Header & Step Indicator */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(34, 211, 238, 0.1)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#22D3EE',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={16} /> Step {currentStep} of 4
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
            Build Your Career Blueprint
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#9CA3AF', marginTop: '6px' }}>
            Zilo configures your daily executable learning path based on your real availability
          </p>
          <div style={{ marginTop: '20px' }}>
            <ProgressBar progress={(currentStep / 4) * 100} variant="cyan" height="6px" />
          </div>
        </div>

        {/* Wizard Card */}
        <Card padding="36px">
          <AnimatePresence mode="wait">
            {/* STEP 1: Target Roles */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  What role(s) are you targeting?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '24px' }}>
                  Select one or more target roles for your placement preparation.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '14px',
                    marginBottom: '32px',
                  }}
                >
                  {rolesOptions.map((role) => {
                    const Icon = role.icon;
                    const selected = targetRoles.includes(role.title);
                    return (
                      <div
                        key={role.title}
                        onClick={() => toggleTargetRole(role.title)}
                        style={{
                          background: selected ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          border: selected ? '1.5px solid #22D3EE' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '16px',
                          padding: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          position: 'relative',
                        }}
                      >
                        {selected && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: '#22D3EE',
                              color: '#0B0F14',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                        <Icon size={24} color={selected ? '#22D3EE' : '#9CA3AF'} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: selected ? '#22D3EE' : '#F3F4F6' }}>
                            {role.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>
                            {role.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Year & Branch */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  What is your current college standing?
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '24px' }}>
                  This helps Zilo adjust timeline urgency and placement prep intensity.
                </p>

                {/* Year Selection */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '12px' }}>
                    Current Year
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {[1, 2, 3, 4].map((y) => (
                      <div
                        key={y}
                        onClick={() => setYear(y)}
                        style={{
                          background: year === y ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          border: year === y ? '1.5px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '14px',
                          padding: '16px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          fontWeight: 700,
                          color: year === y ? '#C084FC' : '#F3F4F6',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Year {y}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Branch Selection */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '12px' }}>
                    Engineering Branch
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {branches.map((b) => (
                      <div
                        key={b}
                        onClick={() => setBranch(b)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: branch === b ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          border: branch === b ? '1px solid #22D3EE' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: branch === b ? '#22D3EE' : '#9CA3AF',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Hours & Learning Style */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  Daily Commitment & Preferred Style
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '28px' }}>
                  How much time can you commit each day and how do you prefer to learn?
                </p>

                {/* Hours Slider */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#D1D5DB' }}>
                      Daily Hours
                    </label>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#22D3EE' }}>
                      {dailyHours} Hours / Day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                    style={{
                      width: '100%',
                      accentColor: '#22D3EE',
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280', marginTop: '6px' }}>
                    <span>1 hr (Light)</span>
                    <span>4 hrs (Balanced)</span>
                    <span>8 hrs (Intensive)</span>
                  </div>
                </div>

                {/* Preferred Style */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '12px' }}>
                    Preferred Learning Style
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { id: 'video', label: 'Video Lessons', icon: Video },
                      { id: 'reading', label: 'Reading & Docs', icon: BookOpen },
                      { id: 'projects', label: 'Hands-on Projects', icon: Rocket },
                    ].map((style) => {
                      const Icon = style.icon;
                      const active = preferredStyle === style.id;
                      return (
                        <div
                          key={style.id}
                          onClick={() => setPreferredStyle(style.id)}
                          style={{
                            background: active ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                            border: active ? '1.5px solid #34D399' : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '16px 12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <Icon size={20} color={active ? '#34D399' : '#9CA3AF'} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: active ? '#34D399' : '#F3F4F6' }}>
                            {style.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Skill Levels & Weak Areas */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  Current Skills & Weak Areas
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '24px' }}>
                  Rate your current proficiency (1-5) so Zilo starts at the right difficulty.
                </p>

                {/* Skill Sliders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
                  {[
                    { key: 'dsa', name: 'DSA & Algorithms' },
                    { key: 'system_design', name: 'System Design' },
                    { key: 'python', name: 'Python / Language Fundamentals' },
                  ].map((skill) => (
                    <div key={skill.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, color: '#D1D5DB' }}>{skill.name}</span>
                        <span style={{ color: '#22D3EE', fontWeight: 700 }}>
                          Level {skillLevels[skill.key] || 1} / 5
                        </span>
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

                {/* Weak Areas Chips */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '10px' }}>
                    Select Weak Areas to Reinforce
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {weakAreaOptions.map((area) => {
                      const selected = weakAreas.includes(area);
                      return (
                        <div
                          key={area}
                          onClick={() => toggleWeakArea(area)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            background: selected ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: selected ? '1px solid #F97316' : '1px solid rgba(255, 255, 255, 0.1)',
                            color: selected ? '#F97316' : '#9CA3AF',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {area}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {currentStep > 1 ? (
              <Button
                variant="ghost"
                leftIcon={ArrowLeft}
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                rightIcon={ArrowRight}
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="glow"
                isLoading={isSubmitting}
                rightIcon={CheckCircle2}
                onClick={handleSubmit}
              >
                Generate My Roadmap
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
