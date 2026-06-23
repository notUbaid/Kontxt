import { useState } from 'react';
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { TopNav, type Mode } from '../components/TopNav';
import { LeftSidebar } from '../components/LeftSidebar';
import { MainCanvas } from '../components/MainCanvas';
import { RightSidebar } from '../components/RightSidebar';
import { CustomModeModal } from '../components/CustomModeModal';
import { AuthModal } from '../components/AuthModal';
import type { Project } from '../App';
import { getTaxonomy } from '../data/taxonomy';

interface EditorProps {
  projects: Project[];
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export default function Editor({ projects, updateProject, deleteProject, isAuthenticated, setIsAuthenticated }: EditorProps) {
  const { projectId, topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isCustomModeModalOpen, setIsCustomModeModalOpen] = useState(location.state?.openCustomModal || false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const activeProject = projects.find(p => p.id === projectId);

  // If no project found (and projects have loaded), redirect home
  if (!activeProject && projects.length > 0) {
    return <Navigate to="/" replace />;
  }

  if (!activeProject) return null; // Wait for projects to load

  const activePage = topicId || getFirstValidTopic(activeProject);

  function getFirstValidTopic(project: Project): string {
    const taxonomy = getTaxonomy(project.type || 'SaaS', project.mode);
    for (const cat of taxonomy) {
      const validTopics = cat.topics.filter(t => !t.modes || t.modes.includes(project.mode));
      if (project.mode === 'Custom' && project.customTopics && project.customTopics.length > 0) {
        const selected = validTopics.filter(t => project.customTopics!.includes(t.id));
        if (selected.length > 0) return selected[0].id;
      } else if (validTopics.length > 0) {
        return validTopics[0].id;
      }
    }
    return 'prd';
  }

  const handleSetActivePage = (page: string) => {
    updateProject({ ...activeProject, lastViewedTopic: page });
    navigate(`/project/${activeProject.id}/topic/${page}`);
    setIsLeftSidebarOpen(false); // Close sidebar on mobile after nav
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSelectProject = (id: string) => {
    const p = projects.find(proj => proj.id === id);
    if (p) {
      const targetPage = p.lastViewedTopic || getFirstValidTopic(p);
      navigate(`/project/${p.id}/topic/${targetPage}`);
    }
  };

  const handleModeChange = (mode: Mode) => {
    updateProject({ ...activeProject, mode });
    if (mode === 'Custom') setIsCustomModeModalOpen(true);
  };

  const handleProjectDelete = (id: string) => {
    deleteProject(id);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
      <TopNav 
        activeProject={activeProject}
        projects={projects}
        activePage={activePage}
        onModeChange={handleModeChange} 
        onProjectUpdate={updateProject}
        onProjectDelete={handleProjectDelete}
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
        onGoHome={handleGoHome}
        onNavigate={handleSetActivePage}
        onSelectProject={handleSelectProject}
        onRequestLogin={() => setIsAuthModalOpen(true)}
        toggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
        toggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
      />
      <div className="flex-1 flex max-w-[1536px] mx-auto w-full relative overflow-hidden">
        
        {/* Left Sidebar - Drawer on Mobile, Static on Desktop */}
        <div className={`
          absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0
          ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <LeftSidebar 
            activeProject={activeProject}
            activeType={activeProject.type || 'SaaS'} 
            activeMode={activeProject.mode} 
            activePage={activePage} 
            setActivePage={handleSetActivePage}
            onProjectUpdate={updateProject}
          />
        </div>

        {/* Overlay for mobile sidebars */}
        {(isLeftSidebarOpen || isRightSidebarOpen) && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => { setIsLeftSidebarOpen(false); setIsRightSidebarOpen(false); }}
          />
        )}

        <MainCanvas 
          activeType={activeProject.type || 'SaaS'} 
          activePage={activePage} 
          activeMode={activeProject.mode} 
          projectId={activeProject.id} 
          isAuthenticated={isAuthenticated}
          onRequestLogin={() => setIsAuthModalOpen(true)}
        />

        {/* Right Sidebar - Drawer on Mobile, Static on Desktop */}
        <div className={`
          absolute inset-y-0 right-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0
          ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <RightSidebar 
            activeProject={activeProject} 
            activeType={activeProject.type || 'SaaS'} 
            activePage={activePage} 
            activeMode={activeProject.mode} 
            isAuthenticated={isAuthenticated}
            onRequestLogin={() => setIsAuthModalOpen(true)}
          />
        </div>
      </div>

      <CustomModeModal
        isOpen={isCustomModeModalOpen}
        onClose={() => setIsCustomModeModalOpen(false)}
        activeProject={activeProject}
        onProjectUpdate={updateProject}
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={() => setIsAuthenticated(true)} 
      />
    </div>
  );
}
