import { useState } from 'react';
import { Rocket, User, Building2, Sliders, FolderOpen, Plus, ArrowRight } from 'lucide-react';
import { AuthModal } from './AuthModal';
import type { Mode } from './TopNav';
import type { Project, AppType } from '../App';

interface OnboardingProps {
  projects: Project[];
  onCreateProject: (name: string, mode: Mode, type: AppType) => void;
  onSelectProject: (id: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

export const Onboarding = ({ projects, onCreateProject, onSelectProject, isAuthenticated, setIsAuthenticated }: OnboardingProps) => {
  const [view, setView] = useState<'home' | 'new' | 'type'>('home');
  const [projectName, setProjectName] = useState('');
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const APP_TYPES: AppType[] = [
    'SaaS',
    'Mobile App',
    'Web App',
    'AI Tool',
    'Browser Extension',
    'Desktop App',
    'API Product',
    'Internal Tool',
    'Marketplace',
    'E-commerce',
    'Game',
    'Hackathon Project',
    'Open Source Project'
  ];

  const modes: { id: Mode; title: string; icon: any; desc: string; color: string }[] = [
    {
      id: 'Hackathon',
      title: 'Hackathon MVP',
      icon: Rocket,
      desc: 'Speed is everything. Skip CI/CD, use BaaS auth, ship in 48 hours.',
      color: 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
    },
    {
      id: 'Personal',
      title: 'Personal Project',
      icon: User,
      desc: 'Portfolio ready. Relational schemas, basic security, lightweight.',
      color: 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
    },
    {
      id: 'Production',
      title: 'Production App',
      icon: Building2,
      desc: 'The full gauntlet. E2E testing, rate limiting, connection pooling, CI/CD.',
      color: 'border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
    },
    {
      id: 'Custom',
      title: 'Custom Mode',
      icon: Sliders,
      desc: 'A la carte builder. Choose exactly what operational topics to focus on.',
      color: 'border-accent/40 text-accent hover:border-accent hover:bg-accent/5'
    }
  ];

  const handleModeSelect = (mode: Mode) => {
    if (!projectName.trim()) {
      alert("Please enter a project name first.");
      return;
    }
    setSelectedMode(mode);
    setView('type');
  };

  const handleTypeSelect = (type: AppType) => {
    if (selectedMode) {
      onCreateProject(projectName, selectedMode, type);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 pt-20 relative">
      <div className="absolute top-4 right-4">
        {!isAuthenticated ? (
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            Sign In
          </button>
        ) : (
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-medium text-muted-foreground/40 hover:text-muted-foreground transition-colors px-4 py-2"
          >
            Log out
          </button>
        )}
      </div>

      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="font-black text-5xl tracking-tighter flex items-center justify-center select-none mb-4">
            <span className="text-accent">Kon</span>
            <span className="text-primary">txt</span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Your Staff Engineer in a Box.
          </p>
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground/70">
              <button onClick={() => setIsAuthModalOpen(true)} className="underline hover:text-primary transition-colors">Sign in</button> to access and save your past projects.
            </p>
          )}
        </div>

        {view === 'home' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
            </div>

            {projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    className="p-4 rounded-xl border border-primary/20 text-left hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-muted rounded-lg text-primary">
                        <FolderOpen size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.mode} Mode {project.type && <span className="opacity-75">• {project.type}</span>}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                  </button>
                ))}
              </div>
            )}

            <div className="text-center p-12 border-2 border-dashed border-muted rounded-2xl">
              <FolderOpen size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {projects.length > 0 ? "Start another project" : "No projects yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {projects.length > 0 ? "Create a new project to keep building." : "Create your first project to get started."}
              </p>
              <button 
                onClick={() => setView('new')}
                className="bg-primary text-background px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <Plus size={18} /> Create Project
              </button>
            </div>
          </div>
        )}

        {view === 'new' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Create New Project</h2>
              <button 
                onClick={() => setView('home')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Acme SaaS Platform"
                autoFocus
                className="w-full bg-background border-2 border-primary/20 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>

            <h3 className="block text-sm font-bold text-primary mb-4 uppercase tracking-wider">Select Project Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-md bg-background group ${mode.color}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-background border-2 border-inherit">
                      <mode.icon size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">{mode.title}</h2>
                  </div>
                  <p className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                    {mode.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'type' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8 flex items-center gap-4">
              <button 
                onClick={() => setView('new')}
                className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors bg-muted/50"
              >
                <ArrowRight className="rotate-180" size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Select App Type</h2>
                <p className="text-muted-foreground">What kind of application are you building?</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {APP_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className="p-4 rounded-xl border-2 border-primary/10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground font-semibold hover:scale-[1.02] bg-background shadow-sm"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={() => setIsAuthenticated(true)} 
      />
    </div>
  );
};
