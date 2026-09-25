import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

let toastListener = null;

export const showToast = (message, type = 'info', duration = 3200) => {
  if (toastListener) {
    toastListener({ id: Date.now(), message, type, duration });
  }
};

const ICON_MAP = { success: CheckCircle2, error: AlertCircle, info: Info };
const COLOR_MAP = {
  success: 'var(--success)',
  error:   'var(--text-danger)',
  info:    'var(--accent)',
};
const BORDER_MAP = {
  success: 'var(--success-border)',
  error:   'var(--danger-border)',
  info:    'var(--accent-border)',
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastListener = (t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id));
      }, t.duration);
    };
    return () => { toastListener = null; };
  }, []);

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '360px',
        width: 'calc(100vw - 40px)',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICON_MAP[toast.type] ?? Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                background: 'var(--bg-elevated)',
                border: `1px solid ${BORDER_MAP[toast.type] ?? 'var(--border)'}`,
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '-0.01em',
              }}
            >
              <Icon
                size={16}
                style={{ color: COLOR_MAP[toast.type] ?? 'var(--accent)', flexShrink: 0 }}
              />
              <span style={{ flex: 1, lineHeight: 1.45 }}>{toast.message}</span>
              <button
                onClick={() => remove(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  transition: 'color var(--t-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
