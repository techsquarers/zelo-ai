import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

let toastListener = null;

export const showToast = (message, type = 'info', duration = 3000) => {
  if (toastListener) {
    toastListener({ id: Date.now(), message, type, duration });
  }
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastListener = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration);
    };

    return () => {
      toastListener = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const Icon = isSuccess ? CheckCircle2 : isError ? AlertCircle : Info;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: 'rgba(15, 20, 28, 0.95)',
                border: isSuccess
                  ? '1px solid rgba(52, 211, 153, 0.4)'
                  : isError
                  ? '1px solid rgba(248, 113, 113, 0.4)'
                  : '1px solid rgba(34, 211, 238, 0.4)',
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                color: '#F3F4F6',
                fontSize: '0.9rem',
              }}
            >
              <Icon
                size={20}
                style={{
                  color: isSuccess ? '#34D399' : isError ? '#F87171' : '#22D3EE',
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '2px',
                }}
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
