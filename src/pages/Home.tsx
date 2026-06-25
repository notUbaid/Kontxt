import { useNavigate } from 'react-router-dom';
import { Onboarding } from '../components/Onboarding';
import type { Project, AppType } from '../App';
import type { Mode } from '../components/TopNav';
import { getTaxonomy } from '../data/taxonomyRegistry';

interface HomeProps {
  projects: Project[];
  addProject: (p: Project) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export default function Home({ projects, addProject, isAuthenticated, setIsAuthenticated }: HomeProps) {
  const navigate = useNavigate();

  const getFirstTopicId = (type: AppType | string = 'SaaS', mode: Mode = 'Production') => {
    const taxonomy = getTaxonomy(type, mode);
    for (const phase of taxonomy) {
      if (phase.topics.length > 0) {
        return phase.topics[0].id;
      }
    }
    return 'ideadefinition';
  };

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
    const firstTopic = getFirstTopicId(type, mode);
    navigate(`/project/${project.id}/topic/${firstTopic}`);
  };

  const handleSelectProject = (id: string) => {
    const p = projects.find(proj => proj.id === id);
    if (p) {
      const firstTopic = getFirstTopicId(p.type, p.mode);
      const targetPage = p.lastViewedTopic || firstTopic;
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
