import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Onboarding } from '../components/Onboarding';
import type { Project, AppType } from '../App';
import type { Mode } from '../components/TopNav';

interface HomeProps {
  projects: Project[];
  addProject: (p: Project) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export default function Home({ projects, addProject, isAuthenticated, setIsAuthenticated }: HomeProps) {
  const navigate = useNavigate();

  const handleCreateProject = (name: string, mode: Mode, type?: AppType) => {
    if (!isAuthenticated) {
      // Just a safeguard, the UI should encourage them to sign in
      alert("Please Sign In first to create and save projects.");
      return;
    }
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      mode,
      type
    };
    addProject(project);
    navigate(`/project/${project.id}/topic/prd`);
  };

  const handleSelectProject = (id: string) => {
    const p = projects.find(proj => proj.id === id);
    if (p) {
      const targetPage = p.lastViewedTopic || 'prd';
      navigate(`/project/${p.id}/topic/${targetPage}`);
    }
  };

  return (
    <Onboarding 
      projects={projects} 
      onCreateProject={handleCreateProject} 
      onSelectProject={handleSelectProject} 
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
    />
  );
}
