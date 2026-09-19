import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Flame,
  Zap,
  MapPin,
  Clock,
} from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Spinner, Skeleton } from '../components/ui/Spinner';
import { showToast } from '../components/ui/Toast';
import { getProgressSummaryApi } from '../api/progress';
import { getTodayTasksApi, completeTaskApi } from '../api/tasks';
import { getCurrentRoadmapApi, generateRoadmapApi } from '../api/roadmaps';
import { useAppStore } from '../store/appStore';
import { TaskCard } from '../components/dashboard/TaskCard';
import { StreakWidget } from '../components/dashboard/StreakWidget';
import { XpWidget } from '../components/dashboard/XpWidget';
import { RoadmapPhaseWidget } from '../components/dashboard/RoadmapPhaseWidget';
import { CelebrationModal } from '../components/dashboard/CelebrationModal';

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const setSummary = useAppStore((s) => s.setSummary);

  const [pendingTaskId, setPendingTaskId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Today's formatted date string
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // 1. Parallel Data Queries using TanStack Query
  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ['progressSummary'],
    queryFn: getProgressSummaryApi,
    onSuccess: (data) => setSummary(data),
  });

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ['todayTasks'],
    queryFn: getTodayTasksApi,
  });

  const {
    data: roadmapData,
    isLoading: isRoadmapLoading,
    refetch: refetchRoadmap,
  } = useQuery({
    queryKey: ['currentRoadmap'],
    queryFn: getCurrentRoadmapApi,
    retry: false,
  });

  // Sync summary to appStore when query completes
  useEffect(() => {
    if (summaryData) {
      setSummary(summaryData);
    }
  }, [summaryData, setSummary]);

  // 2. Complete Task Mutation with Optimistic Updates
  const completeMutation = useMutation({
    mutationFn: ({ taskId, status }) => completeTaskApi(taskId, status),
    onMutate: async ({ taskId, status }) => {
      setPendingTaskId(taskId);
      await queryClient.cancelQueries({ queryKey: ['todayTasks'] });
      const previousTasks = queryClient.getQueryData(['todayTasks']);

      // Optimistically update tasks list
      if (previousTasks?.tasks) {
        const updatedTasks = previousTasks.tasks.map((t) =>
          t.id === taskId ? { ...t, status } : t
        );
        queryClient.setQueryData(['todayTasks'], { ...previousTasks, tasks: updatedTasks });
      }

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['todayTasks'], context.previousTasks);
      }
      showToast(err?.response?.data?.detail || 'Failed to update task status.', 'error');
    },
    onSuccess: async (data, variables) => {
      // Refetch summary & tasks to synchronize server state
      const [newSummary, newTasksData] = await Promise.all([
        refetchSummary(),
        refetchTasks(),
      ]);

      const tasksList = newTasksData?.data?.tasks || [];
      const allCompleted =
        tasksList.length > 0 && tasksList.every((t) => t.status === 'done');

      if (variables.status === 'done') {
        showToast(`+${data.xp_value} XP Earned!`, 'success');
      }

      if (allCompleted) {
        setShowCelebration(true);
      }
    },
    onSettled: () => {
      setPendingTaskId(null);
    },
  });

  const handleTaskComplete = (taskId, status) => {
    completeMutation.mutate({ taskId, status });
  };

  // Extract task metrics
  const tasksList = tasksData?.tasks || [];
  const sortedTasks = [...tasksList].sort((a, b) => (a.order || 0) - (b.order || 0));

  const completedCount = sortedTasks.filter((t) => t.status === 'done').length;
  const totalCount = sortedTasks.length;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const firstPendingTask = sortedTasks.find((t) => t.status === 'pending');

  const scrollToFirstPending = () => {
    if (firstPendingTask) {
      const elem = document.getElementById(`task-card-${firstPendingTask.id}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      showToast('All tasks for today are already complete!', 'success');
    }
  };

  const isInitialLoading = isSummaryLoading || isTasksLoading;

  return (
    <AppShell title="Daily Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Header Card */}
        <Card padding="28px" glow glowColor="cyan">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Calendar size={18} color="#22D3EE" />
                <span style={{ fontSize: '0.85rem', color: '#22D3EE', fontWeight: 600 }}>
                  {todayFormatted}
                </span>
              </div>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#F3F4F6',
                  letterSpacing: '-0.02em',
                }}
              >
                Let’s lock in today.
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#9CA3AF', marginTop: '4px' }}>
                Execute today’s handpicked learning tasks to stay consistent.
              </p>
            </div>

            {/* Quick Completion Gauge Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '12px 20px',
              }}
            >
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34D399' }}>
                  {completedCount} / {totalCount} Done
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Today's Tasks</div>
              </div>
              <div style={{ width: '80px' }}>
                <ProgressBar progress={completionPercentage} variant="success" height="8px" />
              </div>
            </div>
          </div>
        </Card>

        {/* Main Grid Layout (70% Left / 30% Right) */}
        <div className="dashboard-grid">
          {/* LEFT COLUMN (70%) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Task Section Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F3F4F6' }}>
                  Today’s Executable Tasks
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                  Ordered by priority and time commitment
                </p>
              </div>

              {firstPendingTask && (
                <Button
                  size="sm"
                  variant="primary"
                  leftIcon={Play}
                  onClick={scrollToFirstPending}
                >
                  Continue Learning
                </Button>
              )}
            </div>

            {/* Loading Skeleton State */}
            {isInitialLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Skeleton height="110px" borderRadius="20px" />
                <Skeleton height="110px" borderRadius="20px" />
                <Skeleton height="110px" borderRadius="20px" />
              </div>
            ) : isTasksError ? (
              <Card padding="32px">
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#F87171', marginBottom: '16px' }}>
                    {tasksError?.response?.data?.detail || 'Failed to load today’s tasks.'}
                  </p>
                  <Button variant="outline" leftIcon={RotateCcw} onClick={() => refetchTasks()}>
                    Retry Fetch
                  </Button>
                </div>
              </Card>
            ) : sortedTasks.length === 0 ? (
              <Card padding="36px">
                <div style={{ textAlign: 'center' }}>
                  <Clock size={40} color="#22D3EE" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F3F4F6' }}>
                    Generating today’s plan...
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '6px', marginBottom: '20px' }}>
                    Your customized tasks are being constructed from your active roadmap.
                  </p>
                  <Button variant="primary" leftIcon={RotateCcw} onClick={() => refetchTasks()}>
                    Fetch Today's Plan
                  </Button>
                </div>
              </Card>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AnimatePresence>
                  {sortedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={handleTaskComplete}
                      isPendingAction={pendingTaskId === task.id}
                      isFirstPending={firstPendingTask?.id === task.id}
                    />
                  ))}
                </AnimatePresence>

                {/* Day Completed Banner */}
                {completedCount === totalCount && totalCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: 'rgba(52, 211, 153, 0.12)',
                      border: '1.5px solid #34D399',
                      borderRadius: '20px',
                      padding: '24px',
                      textAlign: 'center',
                      boxShadow: '0 0 25px rgba(52, 211, 153, 0.25)',
                    }}
                  >
                    <CheckCircle2 size={36} color="#34D399" style={{ margin: '0 auto 8px' }} />
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F3F4F6' }}>
                      All Tasks Completed For Today! 🎉
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#9CA3AF', marginTop: '4px' }}>
                      Great work! Come back tomorrow to keep your streak burning strong.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (30%) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Streak Widget */}
            <StreakWidget streak={summaryData?.streak} />

            {/* XP Level Widget */}
            <XpWidget xpData={summaryData?.xp} />

            {/* Roadmap Phase Widget */}
            <RoadmapPhaseWidget roadmap={roadmapData} />
          </div>
        </div>
      </div>

      {/* Confetti Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        streakCount={summaryData?.streak?.current_streak || 1}
        xpEarned={sortedTasks.reduce((acc, t) => acc + (t.status === 'done' ? t.xp_value : 0), 0)}
      />

      {/* Grid CSS for 70/30 layout */}
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 28px;
        }
        @media (max-width: 992px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AppShell>
  );
};
