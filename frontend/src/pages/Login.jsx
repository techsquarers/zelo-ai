import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { loginApi, getMeApi } from '../api/auth';
import { getProgressSummaryApi } from '../api/progress';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { showToast } from '../components/ui/Toast';

export const Login = () => {
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
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Call login API
      const tokenData = await loginApi(email, password);
      const token = tokenData.access_token;

      // Save token temporarily to trigger client headers
      localStorage.setItem('access_token', token);

      // 2. Fetch user profile & summary
      const [user, summary] = await Promise.all([getMeApi(), getProgressSummaryApi()]);

      setAuth(token, user);
      setSummary(summary);
      showToast('Welcome back to Zilo-AI!', 'success');

      // 3. Route by rules
      if (!summary.has_profile) {
        navigate('/onboarding', { replace: true });
      } else if (!summary.has_roadmap) {
        navigate('/dashboard', { replace: true }); // ProtectedRoute auto-generates
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      const detail = err?.response?.data?.detail;
      if (typeof detail === 'string') {
        setErrorMsg(detail);
      } else if (err.code === 'ERR_NETWORK') {
        setErrorMsg('Unable to connect to Zilo backend server. Check server connection.');
      } else {
        setErrorMsg('Invalid email or password. Please try again.');
      }
      showToast('Login failed. Check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B0F14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 10 }}
      >
        <Card padding="36px">
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Sparkles size={26} color="#0B0F14" />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
              Welcome back
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '6px' }}>
              Sign in to execute your daily tech roadmap
            </p>
          </div>

          {errorMsg && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#F87171',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                marginBottom: '20px',
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
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
              style={{ marginTop: '8px', width: '100%' }}
            >
              Sign In
            </Button>
          </form>

          <div
            style={{
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '0.9rem',
              color: '#9CA3AF',
            }}
          >
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#22D3EE', fontWeight: 600 }}>
              Create one now
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
