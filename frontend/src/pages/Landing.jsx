import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Flame,
  Zap,
  ArrowRight,
  Code2,
  Terminal,
  Layers,
  Database,
  Cpu,
  Shield,
  CheckCircle2,
  Map,
  Target,
  Crosshair,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Landing = () => {
  const navigate = useNavigate();

  const targetRoles = [
    { title: 'SDE Warrior', icon: Code2, tag: 'DSA + Systems' },
    { title: 'Backend Core', icon: Terminal, tag: 'APIs & Arch' },
    { title: 'Frontend Craft', icon: Layers, tag: 'UI & Perf' },
    { title: 'Full-Stack', icon: Sparkles, tag: 'End-to-End' },
    { title: 'Data Engine', icon: Database, tag: 'Pipelines' },
    { title: 'DevOps Ops', icon: Cpu, tag: 'Cloud & CI/CD' },
  ];

  const features = [
    {
      icon: Map,
      title: 'Campaign Path',
      subtitle: 'PHASED ROADMAP',
      description:
        'A battle-tested tech roadmap dynamically generated for your target role, college year, and daily available study hours.',
      badgeVariant: 'cyan',
    },
    {
      icon: Crosshair,
      title: 'Daily Missions',
      subtitle: 'ZERO OVERWHELM',
      description:
        'No endless tutorial hell. Direct daily executable missions with handpicked resources to complete and gain rank.',
      badgeVariant: 'accent',
    },
    {
      icon: Flame,
      title: 'Flame of Discipline',
      subtitle: 'STREAKS & RANKS',
      description:
        'Level up your XP rank every time you finish tasks. Protect your daily streak flame with discipline freezes.',
      badgeVariant: 'streak',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-ui)',
      }}
    >
      {/* Background Blade Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background:
            'radial-gradient(ellipse at top, rgba(56, 189, 248, 0.12) 0%, rgba(249, 115, 22, 0.05) 45%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Grid Pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        }}
      />

      {/* Header Navigation */}
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px var(--accent-glow)',
            }}
          >
            <Shield size={20} color="#0C0E11" strokeWidth={2.5} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
              ZILO<span style={{ color: 'var(--accent)' }}>.AI</span>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/register')} rightIcon={ArrowRight}>
            Initialize Campaign
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: '960px',
          margin: '50px auto 70px',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="streak" icon={Flame} style={{ marginBottom: '20px' }}>
            DAILY EXECUTION SYSTEM FOR ENGINEERING STUDENTS
          </Badge>

          <h1
            style={{
              fontSize: '3.4rem',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            Master your tech path with{' '}
            <span style={{ color: 'var(--accent)', textShadow: '0 0 24px var(--accent-glow)' }}>
              relentless daily discipline.
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            No last-minute placement panic. Zilo-AI turns your target engineering role into daily actionable missions, tracked streaks, and rank progression.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register')}
              rightIcon={ArrowRight}
            >
              Start Free Campaign
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
              Resume Mission
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Interactive Mock Dashboard Snippet */}
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto 80px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card padding="24px" accent style={{ background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
                  DAILY MISSION TERMINAL
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Badge variant="streak" icon={Flame}>7d Streak</Badge>
                <Badge variant="xp" icon={Zap}>Rank 3 SDE</Badge>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={18} color="var(--success)" />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                      Binary Search & Two Pointers Fundamentals
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>DSA Core · 45 mins</div>
                  </div>
                </div>
                <Badge variant="success">+50 XP</Badge>
              </div>

              <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 0 16px var(--accent-dim)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--accent)' }} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Build REST API Middleware in Express & Node
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)' }}>Active Mission · 60 mins</div>
                  </div>
                </div>
                <Badge variant="cyan">+60 XP</Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Target Roles Banner */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto 80px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', fontWeight: 700 }}>
            TAILORED ROADMAPS FOR TARGET CAREER RANKS
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
          }}
        >
          {targetRoles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  transition: 'all var(--t-fast)',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={16} color="var(--accent)" />
                </div>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>{role.title}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{role.tag}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto 100px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card hoverable padding="24px" style={{ height: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-lg)',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color="var(--accent)" />
                    </div>
                    <Badge variant={feat.badgeVariant}>{feat.subtitle}</Badge>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {feat.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '32px 24px',
          textAlign: 'center',
          color: 'var(--text-tertiary)',
          fontSize: 'var(--text-xs)',
        }}
      >
        <p>© 2026 Zilo-AI. Empowering engineering students to build true career discipline.</p>
      </footer>
    </div>
  );
};
