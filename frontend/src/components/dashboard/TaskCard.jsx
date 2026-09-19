import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Zap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Circle,
  AlertCircle,
  SkipForward,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const TaskCard = ({ task, onComplete, isPendingAction = false, isFirstPending = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showXpToast, setShowXpToast] = useState(false);

  const isDone = task.status === 'done';
  const isPartial = task.status === 'partial';
  const isSkipped = task.status === 'skipped';

  const handleAction = (status) => {
    if (isPendingAction) return;

    if (status === 'done') {
      setShowXpToast(true);
      setTimeout(() => setShowXpToast(false), 1500);
    }
    onComplete(task.id, status);
  };

  return (
    <motion.div
      id={`task-card-${task.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        background: isDone
          ? 'rgba(52, 211, 153, 0.04)'
          : isSkipped
          ? 'rgba(255, 255, 255, 0.02)'
          : 'rgba(15, 20, 28, 0.75)',
        backdropFilter: 'blur(16px)',
        border: isFirstPending
          ? '1.5px solid #22D3EE'
          : isDone
          ? '1px solid rgba(52, 211, 153, 0.3)'
          : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '20px 24px',
        boxShadow: isFirstPending
          ? '0 0 20px rgba(34, 211, 238, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Floating +XP Micro-Animation */}
      <AnimatePresence>
        {showXpToast && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -45, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '16px',
              right: '24px',
              zIndex: 20,
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
              color: '#0B0F14',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.95rem',
              boxShadow: '0 4px 15px rgba(52, 211, 153, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              pointerEvents: 'none',
            }}
          >
            <Zap size={16} fill="#0B0F14" /> +{task.xp_value} XP!
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {/* Status Check Icon */}
        <div style={{ marginTop: '2px', cursor: 'pointer' }} onClick={() => !isDone && handleAction('done')}>
          {isDone ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle2 size={26} color="#34D399" fill="rgba(52, 211, 153, 0.2)" />
            </motion.div>
          ) : isPartial ? (
            <AlertCircle size={26} color="#FBBF24" />
          ) : isSkipped ? (
            <SkipForward size={26} color="#6B7280" />
          ) : (
            <Circle size={26} color="#6B7280" />
          )}
        </div>

        {/* Task Main Details */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: isDone ? '#9CA3AF' : '#F3F4F6',
                textDecoration: isDone ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </h4>

            {/* Badges: Minutes + XP */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Badge variant="muted" icon={Clock}>
                {task.estimated_minutes} min
              </Badge>

              <Badge variant={isDone ? 'success' : 'violet'} icon={Zap}>
                +{task.xp_value} XP
              </Badge>

              {task.resource_url && (
                <a
                  href={task.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#22D3EE',
                    background: 'rgba(34, 211, 238, 0.1)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    textDecoration: 'none',
                  }}
                >
                  <span>Resource</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Description with Expand/Collapse */}
          {task.description && (
            <div style={{ marginTop: '8px' }}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: isDone ? '#6B7280' : '#9CA3AF',
                  lineHeight: 1.5,
                  display: isExpanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: isExpanded ? 'unset' : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: isExpanded ? 'visible' : 'hidden',
                }}
              >
                {task.description}
              </p>

              {task.description.length > 90 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#22D3EE',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    marginTop: '4px',
                    padding: 0,
                  }}
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span> <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      <span>Read Full Details</span> <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* Actions Bar */}
          {!isDone && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
              <Button
                size="sm"
                variant="primary"
                leftIcon={CheckCircle2}
                isLoading={isPendingAction}
                onClick={() => handleAction('done')}
              >
                Mark Done
              </Button>

              <Button
                size="sm"
                variant="secondary"
                leftIcon={AlertCircle}
                isLoading={isPendingAction}
                onClick={() => handleAction('partial')}
              >
                Partial
              </Button>

              <Button
                size="sm"
                variant="ghost"
                leftIcon={SkipForward}
                isLoading={isPendingAction}
                onClick={() => handleAction('skipped')}
              >
                Skip
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
