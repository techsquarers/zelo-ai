import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

let confettiLoaded = false;
const loadConfetti = () => {
  if (confettiLoaded) return;
  confettiLoaded = true;
};

export const CelebrationModal = ({ isOpen, onClose, streakCount = 1, xpEarned = 0 }) => {
  useEffect(() => {
    if (isOpen) {
      // Import confetti dynamically to avoid heavy bundle
      import('canvas-confetti').then((m) => {
        const confetti = m.default;
        const end = Date.now() + 2000;
        const colors = ['#38BDF8', '#22C55E', '#F97316', '#A78BFA'];
        const frame = () => {
          confetti({ particleCount: 3, angle: 60,  spread: 50, origin: { x: 0 }, colors });
          confetti({ particleCount: 3, angle: 120, spread: 50, origin: { x: 1 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }).catch(() => {});
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 7, 10, 0.88)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{
              position: 'relative',
              zIndex: 2001,
              width: '100%',
              maxWidth: '420px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--success-border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 0 48px var(--success-dim), var(--shadow-xl)',
            }}
          >
            {/* Top edge line — earned */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--success), transparent)',
            }} />

            {/* Trophy mark */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--streak-dim)',
                border: '1px solid var(--streak-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Trophy size={32} color="var(--streak)" />
            </motion.div>

            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '6px',
              }}
            >
              Day Complete
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              All missions executed. Consistency compounds.
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                margin: '24px 0',
              }}
            >
              <div
                style={{
                  background: 'var(--streak-dim)',
                  border: '1px solid var(--streak-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: 'var(--streak)', fontWeight: 800, fontSize: 'var(--text-xl)' }}>
                  <Flame size={20} fill="var(--streak)" />
                  {streakCount}d
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '3px' }}>
                  Streak
                </div>
              </div>

              <div
                style={{
                  background: 'var(--success-dim)',
                  border: '1px solid var(--success-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: 'var(--success)', fontWeight: 800, fontSize: 'var(--text-xl)' }}>
                  <Zap size={20} fill="var(--success)" />
                  +{xpEarned}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '3px' }}>
                  XP earned
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              rightIcon={ArrowRight}
              onClick={onClose}
              style={{ width: '100%' }}
            >
              Keep The Flame Burning
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
