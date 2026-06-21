import { useState, useEffect } from 'react';
import { TopNav, type Mode } from './components/TopNav';
import { LeftSidebar } from './components/LeftSidebar';
import { MainCanvas } from './components/MainCanvas';
import { RightSidebar } from './components/RightSidebar';
import { Onboarding } from './components/Onboarding';

export interface Project {
  id: string;
  name: string;
  mode: Mode;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  const [activePage, setActivePage] = useState('prd'); // Using topic ID now
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('kontxt_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    const savedActive = localStorage.getItem('kontxt_active_project');
    if (savedActive) {
      setActiveProjectId(savedActive);
    }
    
    // Load theme
    if (localStorage.getItem('kontxt_theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleCreateProject = (name: string, mode: Mode) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      mode
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setActiveProjectId(newProject.id);
    
    localStorage.setItem('kontxt_projects', JSON.stringify(updatedProjects));
    localStorage.setItem('kontxt_active_project', newProject.id);
  };

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    localStorage.setItem('kontxt_active_project', id);
  };

  const handleGoHome = () => {
    setActiveProjectId(null);
    localStorage.removeItem('kontxt_active_project');
  };

  const handleModeChange = (mode: Mode) => {
    if (!activeProjectId) return;
    
    const updatedProjects = projects.map(p => 
      p.id === activeProjectId ? { ...p, mode } : p
    );
    setProjects(updatedProjects);
    localStorage.setItem('kontxt_projects', JSON.stringify(updatedProjects));
  };

  if (!activeProjectId) {
    return (
      <Onboarding 
        projects={projects} 
        onCreateProject={handleCreateProject} 
        onSelectProject={handleSelectProject} 
      />
    );
  }

  const activeProject = projects.find(p => p.id === activeProjectId);
  if (!activeProject) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <TopNav 
        activeProject={activeProject}
        onModeChange={handleModeChange} 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        onGoHome={handleGoHome}
      />
      <div className="flex-1 flex max-w-[1536px] mx-auto w-full relative">
        <LeftSidebar activeMode={activeProject.mode} activePage={activePage} setActivePage={setActivePage} />
        <MainCanvas activePage={activePage} activeMode={activeProject.mode} projectId={activeProjectId} />
        <RightSidebar activePage={activePage} activeMode={activeProject.mode} />
      </div>
    </div>
  );
}

export default App;
