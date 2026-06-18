import { useState, useRef, useEffect } from 'react';
import { Search, Moon, UserCircle, Settings } from 'lucide-react';
import type { Project } from '../App';

export type Mode = 'Hackathon' | 'Personal' | 'Production' | 'Custom';

interface TopNavProps {
  activeProject: Project;
  onModeChange: (mode: Mode) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  onGoHome: () => void;
}

export const TopNav = ({ activeProject, onModeChange, isAuthenticated, setIsAuthenticated, onGoHome }: TopNavProps) => {
  const modes: Mode[] = ['Hackathon', 'Personal', 'Production', 'Custom'];
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <header className="h-14 sticky top-0 z-50 glassmorphism flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-6 w-1/3">
        <button 
          onClick={onGoHome}
          className="font-black text-2xl tracking-tighter flex items-center select-none hover:opacity-80 transition-opacity"
          title="Go back to projects"
        >
          <span className="text-accent">Kon</span>
          <span className="text-primary">txt</span>
        </button>
        <div className="hidden lg:flex flex-col border-l-2 border-muted pl-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">Active Project</span>
          <span className="text-sm font-medium text-foreground leading-none">{activeProject.name}</span>
        </div>
      </div>

      {/* Center - Mode Switcher */}
      <div className="hidden md:flex items-center justify-center w-1/3">
        <div className="flex bg-muted rounded-full p-1">
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                activeProject.mode === mode
                  ? 'bg-background text-accent shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-end gap-4 w-1/3">
        <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm bg-muted/50 px-3 py-1.5 rounded-full border border-muted">
          <Search size={16} />
          <span className="hidden lg:inline">Search...</span>
          <kbd className="hidden lg:inline font-sans text-[10px] bg-background px-1.5 py-0.5 rounded">⌘K</kbd>
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Moon size={20} />
        </button>
        <div className="relative" ref={settingsRef}>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="text-muted-foreground hover:text-foreground transition-colors mt-1"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          
          {isSettingsOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-background border-2 border-primary/20 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-primary/10 mb-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Settings</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/5 transition-colors">Account Profile</button>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/5 transition-colors">Appearance</button>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/5 transition-colors">Billing & Plans</button>
              <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/5 transition-colors">API Keys</button>
            </div>
          )}
        </div>
        {isAuthenticated ? (
          <button onClick={() => setIsAuthenticated(false)} className="text-primary hover:text-accent transition-colors" title="Sign Out">
            <UserCircle size={28} />
          </button>
        ) : (
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="text-sm font-medium bg-primary text-background px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
