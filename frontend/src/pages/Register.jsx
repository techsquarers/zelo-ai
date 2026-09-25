import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import { registerApi, loginApi, getMeApi } from '../api/auth';
import { getProgressSummaryApi } from '../api/progress';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const setSummary = useAppStore((s) => s.setSummary);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Register API
      await registerApi(email, password);
      showToast('Account initialized successfully!', 'success');

      // 2. Auto-login
      const tokenData = await loginApi(email, password);
      const token = tokenData.access_token;
      localStorage.setItem('access_token', token);

      const [user, summary] = await Promise.all([getMeApi(), getProgressSummaryApi()]);

      setAuth(token, user);
      setSummary(summary);

      // 3. New registered user goes directly to onboarding
      navigate('/onboarding', { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      const detail = err?.response?.data?.detail;
      if (typeof detail === 'string') {
        setErrorMsg(detail);
      } else if (err.code === 'ERR_NETWORK') {
        setErrorMsg('Unable to connect to Zilo backend server.');
      } else {
        setErrorMsg('Failed to create account. Please try again.');
      }
      showToast('Registration failed.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        fontFamily: 'var(--font-ui)',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}
      >
        <Card padding="32px" accent>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 0 18px var(--accent-glow)',
              }}
            >
              <Shield size={24} color="#0C0E11" strokeWidth={2.5} />
            </div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Initialize Warrior Rank
            </h2>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              Create your account & build your tech discipline
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: 'var(--danger-dim)',
                border: '1px solid var(--danger-border)',
                color: 'var(--text-danger)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertTriangle size={15} flexShrink={0} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="warrior@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password (min 6 chars)"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              rightIcon={ArrowRight}
              style={{ marginTop: '6px', width: '100%' }}
            >
              Begin Onboarding
            </Button>
          </form>

          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-secondary)',
            }}
          >
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 700 }}>
              Sign in to account
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
