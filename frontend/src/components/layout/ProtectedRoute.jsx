import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { generateRoadmapApi } from '../../api/roadmaps';
import { Spinner } from '../ui/Spinner';

export const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const initAuth = useAuthStore((s) => s.initAuth);

  const summary = useAppStore((s) => s.summary);
  const fetchSummary = useAppStore((s) => s.fetchSummary);

  const [isInitializing, setIsInitializing] = useState(true);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkState = async () => {
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        // Init auth user if needed
        if (!user) {
          await initAuth();
        }

        // Fetch summary
        const summaryData = await fetchSummary();

        if (isMounted && summaryData) {
          // Rule 1: has_profile === false -> route /onboarding
          if (!summaryData.has_profile && location.pathname !== '/onboarding') {
            navigate('/onboarding', { replace: true });
          }
          // Rule 2: has_roadmap === false -> auto-generate roadmap then /dashboard
          else if (summaryData.has_profile && !summaryData.has_roadmap) {
            if (!isGeneratingRoadmap) {
              setIsGeneratingRoadmap(true);
              try {
                await generateRoadmapApi();
                await fetchSummary(); // refresh after generate
              } catch (e) {
                console.error('Auto roadmap generation error:', e);
              } finally {
                setIsGeneratingRoadmap(false);
                if (location.pathname !== '/dashboard') {
                  navigate('/dashboard', { replace: true });
                }
              }
            }
          }
          // Rule 3: user has profile and roadmap, but tries to visit /onboarding
          else if (summaryData.has_profile && summaryData.has_roadmap && location.pathname === '/onboarding') {
            navigate('/dashboard', { replace: true });
          }
        }
      } catch (err) {
        console.error('Protected route initialization error:', err);
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };

    checkState();

    return () => {
      isMounted = false;
    };
  }, [token, location.pathname]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isInitializing || isGeneratingRoadmap) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F14',
          color: '#F3F4F6',
          gap: '16px',
        }}
      >
        <Spinner size={36} color="#22D3EE" />
        <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>
          {isGeneratingRoadmap ? 'Generating your personalized roadmap...' : 'Preparing your workspace...'}
        </p>
      </div>
    );
  }

  return children;
};
