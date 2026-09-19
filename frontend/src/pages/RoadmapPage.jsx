import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  RotateCcw,
  Target,
  ArrowRight,
} from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Skeleton } from '../components/ui/Spinner';
import { showToast } from '../components/ui/Toast';
import { getCurrentRoadmapApi, generateRoadmapApi } from '../api/roadmaps';

export const RoadmapPage = () => {
  const queryClient = useQueryClient();

  const {
    data: roadmap,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['currentRoadmap'],
    queryFn: getCurrentRoadmapApi,
    retry: false,
  });

  const generateMutation = useMutation({
    mutationFn: () => generateRoadmapApi(),
    onSuccess: () => {
      showToast('New career roadmap generated!', 'success');
      queryClient.invalidateQueries({ queryKey: ['currentRoadmap'] });
      refetch();
    },
    onError: (err) => {
      showToast(err?.response?.data?.detail || 'Failed to generate roadmap.', 'error');
    },
  });

  const phases = roadmap?.phases || [];
  const currentPhaseIdx = roadmap?.current_phase || 0;
  const totalPhases = phases.length;
  const progressPercent =
    totalPhases > 0 ? Math.round(((currentPhaseIdx + 1) / totalPhases) * 100) : 0;

  return (
    <AppShell title="Career Roadmap">
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Roadmap Overview Header */}
        <Card padding="28px" glow glowColor="cyan">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={20} color="#22D3EE" />
                <Badge variant="cyan">Visual Tech Path</Badge>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F3F4F6', letterSpacing: '-0.02em' }}>
                {roadmap?.title || 'Personalized Tech Roadmap'}
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#9CA3AF', marginTop: '4px' }}>
                Targeting Role: <span style={{ color: '#22D3EE', fontWeight: 600 }}>{roadmap?.target_role?.toUpperCase() || 'SDE'}</span>
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255, 255, 255, 0.04)', padding: '14px 20px', borderRadius: '20px' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>
                  Phase {currentPhaseIdx + 1} of {totalPhases || 4}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Roadmap Progress</div>
              </div>
              <div style={{ width: '90px' }}>
                <ProgressBar progress={progressPercent} variant="cyan" height="8px" />
              </div>
            </div>
          </div>
        </Card>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Skeleton height="160px" borderRadius="24px" />
            <Skeleton height="160px" borderRadius="24px" />
            <Skeleton height="160px" borderRadius="24px" />
          </div>
        ) : isError || !roadmap ? (
          /* Empty / Generate Roadmap CTA */
          <Card padding="40px">
            <div style={{ textAlign: 'center', maxWidth: '440px', margin: '0 auto' }}>
              <MapPin size={48} color="#22D3EE" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F3F4F6' }}>
                No Active Roadmap Found
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#9CA3AF', margin: '8px 0 24px' }}>
                Build your structured, step-by-step career path based on your target role and study availability.
              </p>
              <Button
                variant="glow"
                size="lg"
                rightIcon={ArrowRight}
                isLoading={generateMutation.isPending}
                onClick={() => generateMutation.mutate()}
              >
                Generate Custom Roadmap
              </Button>
            </div>
          </Card>
        ) : (
          /* Vertical Phase Timeline */
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Timeline Vertical Connecting Line */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                bottom: '40px',
                left: '27px',
                width: '3px',
                background: 'linear-gradient(180deg, #22D3EE 0%, #8B5CF6 50%, rgba(255,255,255,0.08) 100%)',
                zIndex: 0,
              }}
            />

            {phases.map((phase, index) => {
              const isCurrent = index === currentPhaseIdx;
              const isCompleted = index < currentPhaseIdx;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Timeline Circle Marker */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: isCurrent
                        ? 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)'
                        : isCompleted
                        ? '#10B981'
                        : 'rgba(15, 20, 28, 0.9)',
                      border: isCurrent
                        ? '3px solid #22D3EE'
                        : isCompleted
                        ? '3px solid #34D399'
                        : '2px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCurrent || isCompleted ? '#0B0F14' : '#9CA3AF',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      boxShadow: isCurrent ? '0 0 25px rgba(34, 211, 238, 0.5)' : 'none',
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={28} color="#0B0F14" /> : index + 1}
                  </div>

                  {/* Phase Card */}
                  <div style={{ flex: 1 }}>
                    <Card
                      padding="28px"
                      glow={isCurrent}
                      glowColor="cyan"
                      style={{
                        opacity: isCompleted ? 0.75 : 1,
                        background: isCurrent ? 'rgba(34, 211, 238, 0.04)' : 'rgba(15, 20, 28, 0.75)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: isCurrent ? '#22D3EE' : '#9CA3AF' }}>
                              Phase {phase.phase || index + 1}
                            </span>
                            {isCurrent && (
                              <Badge variant="cyan" icon={Sparkles}>
                                Current Active Phase
                              </Badge>
                            )}
                            {isCompleted && (
                              <Badge variant="success" icon={CheckCircle2}>
                                Completed
                              </Badge>
                            )}
                          </div>

                          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F3F4F6' }}>
                            {phase.title}
                          </h3>
                        </div>

                        {/* Duration Pill */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '9999px',
                            padding: '6px 14px',
                            fontSize: '0.85rem',
                            color: '#D1D5DB',
                            fontWeight: 600,
                          }}
                        >
                          <Clock size={16} color="#9CA3AF" />
                          <span>{phase.duration_weeks} Weeks</span>
                        </div>
                      </div>

                      {/* Focus Tags */}
                      {phase.focus && (
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                            Core Focus Areas
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {phase.focus.map((tag, tIdx) => (
                              <Badge key={tIdx} variant={isCurrent ? 'cyan' : 'muted'}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Goals List */}
                      {phase.goals && (
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                            Milestones & Goals
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {phase.goals.map((goal, gIdx) => (
                              <div
                                key={gIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  fontSize: '0.9rem',
                                  color: '#D1D5DB',
                                }}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 size={18} color="#34D399" />
                                ) : isCurrent ? (
                                  <Target size={18} color="#22D3EE" />
                                ) : (
                                  <Circle size={18} color="#6B7280" />
                                )}
                                <span>{goal}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
};
