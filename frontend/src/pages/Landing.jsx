import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Flame,
  Zap,
  ArrowRight,
  Code2,
  Terminal,
  Layers,
  Database,
  Cpu,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const Landing = () => {
  const navigate = useNavigate();

  const targetRoles = [
    { title: 'SDE', icon: Code2 },
    { title: 'Backend', icon: Terminal },
    { title: 'Frontend', icon: Layers },
    { title: 'Full-stack', icon: Sparkles },
    { title: 'Data', icon: Database },
    { title: 'DevOps', icon: Cpu },
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Personalized Roadmap',
      description:
        'A structured career path crafted around your year, branch, daily available hours, and target tech role.',
      color: '#22D3EE',
    },
    {
      icon: CheckCircle2,
      title: 'Daily Executable Tasks',
      description:
        'No overwhelm. Get handpicked, high-value free video and reading tasks to complete every single day.',
      color: '#8B5CF6',
    },
    {
      icon: Flame,
      title: 'Streaks & XP Gamification',
      description:
        'Build unstoppable consistency. Earn XP, maintain daily streaks, and stay motivated like Duolingo.',
      color: '#F97316',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B0F14',
        color: '#F3F4F6',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header Navigation */}
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={22} color="#0B0F14" />
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Zilo<span style={{ color: '#22D3EE' }}>.ai</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="primary" onClick={() => navigate('/register')} rightIcon={ArrowRight}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '60px auto 80px',
          padding: '0 32px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="violet" icon={Sparkles} className="mb-4">
            AI-Powered Career Execution
          </Badge>

          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '24px 0',
            }}
          >
            Your personalized tech roadmap +{' '}
            <span className="text-gradient-cyan">daily execution system</span>
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              color: '#9CA3AF',
              maxWidth: '720px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            Stop last-minute placement panic. Get a daily plan, streaks, and a career path built
            around your skills and available time.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register')}
              rightIcon={ArrowRight}
            >
              Start Free Today
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
              Log Into Account
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Target Roles Banner */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto 90px',
          padding: '0 32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', fontWeight: 600 }}>
            tailored for target engineering roles
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {targetRoles.map((role) => {
            const Icon = role.icon;
            return (
              <Badge key={role.title} variant="muted" icon={Icon}>
                <span style={{ fontSize: '0.95rem', padding: '4px 6px' }}>{role.title}</span>
              </Badge>
            );
          })}
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto 120px',
          padding: '0 32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card hoverable padding="32px">
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: `${feat.color}15`,
                      border: `1px solid ${feat.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={24} color={feat.color} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F3F4F6', marginBottom: '12px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#9CA3AF', lineHeight: 1.6 }}>
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
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '40px 32px',
          textAlign: 'center',
          color: '#6B7280',
          fontSize: '0.9rem',
        }}
      >
        <p>© 2026 Zilo-AI. Empowering engineering students to build real tech consistency.</p>
      </footer>
    </div>
  );
};
