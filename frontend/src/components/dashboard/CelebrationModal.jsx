import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const CelebrationModal = ({ isOpen, onClose, streakCount = 1, xpEarned = 0 }) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti explosion
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#22D3EE', '#8B5CF6', '#34D399', '#F97316'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22D3EE', '#8B5CF6', '#34D399', '#F97316'],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
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
              background: 'rgba(5, 8, 12, 0.85)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'relative',
              zIndex: 2001,
              width: '100%',
              maxWidth: '460px',
              background: 'rgba(15, 20, 28, 0.95)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              borderRadius: '28px',
              padding: '36px 28px',
              textAlign: 'center',
              boxShadow: '0 0 50px rgba(52, 211, 153, 0.25)',
            }}
          >
            {/* Trophy Icon Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 0 30px rgba(249, 115, 22, 0.5)',
              }}
            >
              <Trophy size={40} color="#0B0F14" />
            </motion.div>

            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
              Day Complete! 🎉
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#9CA3AF', marginTop: '6px' }}>
              You crushed all your target tasks today. Consistency is your superpower!
            </p>

            {/* Metrics Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                margin: '28px 0',
              }}
            >
              <div
                style={{
                  background: 'rgba(249, 115, 22, 0.12)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '16px',
                  padding: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#F97316', fontWeight: 800, fontSize: '1.25rem' }}>
                  <Flame size={22} fill="#F97316" /> {streakCount} Days
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Streak Extended
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(52, 211, 153, 0.12)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  borderRadius: '16px',
                  padding: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#34D399', fontWeight: 800, fontSize: '1.25rem' }}>
                  <Zap size={22} fill="#34D399" /> +{xpEarned} XP
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Earned Today
                </div>
              </div>
            </div>

            <Button
              variant="glow"
              size="lg"
              rightIcon={ArrowRight}
              onClick={onClose}
              style={{ width: '100%' }}
            >
              Keep Up The Momentum
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
