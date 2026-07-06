import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { Mode } from './components/TopNav';
import { getSupabase } from './lib/supabase';
import { useProjectStore } from './hooks/useProjectStore';
import type { CustomLink } from './data/taxonomies/types';
import { scheduleIdleTask } from './utils/idle';
import { syncLocalDataToSupabase } from './lib/sync';

export type AppType = 
  | 'SaaS' 
  | 'Mobile App' 
  | 'Web App' 
  | 'AI Tool' 
  | 'Browser Extension' 
  | 'Desktop App' 
  | 'API Product' 
  | 'Internal Tool' 
  | 'Marketplace' 
  | 'E-commerce' 
  | 'Game'
  | 'Cyber Security (Offensive)'
  | 'Cyber Security (Defensive)'
  | 'Cyber Security (DevSecOps)'
  | 'Web3 dApp'
  | 'Data Pipeline'
  | 'CLI'
  | 'IoT'
  | 'Open Source'
  | 'Custom';

export interface Project {
  id: string;
  name: string;
  mode: Mode;
  type?: AppType;
  customLinks?: CustomLink[];
  hiddenLinks?: string[];
  completedTopics?: string[];
  customTopics?: string[];
  progressEnabled?: boolean;
  lastViewedTopic?: string;
}

import Home from './pages/Home';

// Lazy load pages for code splitting
const Editor = lazy(() => import('./pages/Editor'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-medium">
    Loading...
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Auth listener
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const cancelIdleTask = scheduleIdleTask(() => {
      getSupabase().then(async (supabase) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!cancelled) {
          setIsAuthenticated(!!session);
          if (session?.user) {
            syncLocalDataToSupabase(session.user.id);
          }
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setIsAuthenticated(!!session);
          if (session?.user) {
            syncLocalDataToSupabase(session.user.id);
          }
        });

        unsubscribe = () => subscription.unsubscribe();
      });
    }, 800);

    return () => {
      cancelled = true;
      cancelIdleTask();
      unsubscribe?.();
    };
  }, []);

  const { projects, loading, addProject, updateProject, deleteProject } = useProjectStore(!!isAuthenticated);

  // Removed the blocking auth screen to allow Home to render immediately for better LCP

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              projects={projects} 
              addProject={addProject} 
              isAuthenticated={!!isAuthenticated} 
              setIsAuthenticated={setIsAuthenticated} 
            />
          } 
        />
        
        <Route 
          path="/project/:projectId/topic/:topicId" 
          element={
            <Editor 
              projects={projects}
              loading={loading}
              updateProject={updateProject}
              deleteProject={deleteProject}
              isAuthenticated={!!isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } 
        />

        <Route 
          path="/project/:projectId" 
          element={
            <Editor 
              projects={projects}
              loading={loading}
              updateProject={updateProject}
              deleteProject={deleteProject}
              isAuthenticated={!!isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          } 
        />

        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
