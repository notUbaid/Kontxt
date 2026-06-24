import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { Mode } from './components/TopNav';
import { supabase } from './lib/supabase';
import { useProjectStore } from './hooks/useProjectStore';
import type { CustomLink } from './data/taxonomies/types';

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
  | 'Game';

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { projects, addProject, updateProject, deleteProject } = useProjectStore(!!isAuthenticated);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('kontxt_theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Removed the blocking auth screen to allow Home to render immediately for better LCP

  // Suspense fallback for lazy loaded components
  const LoadingFallback = () => (
    <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-medium">
      Loading...
    </div>
  );

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
