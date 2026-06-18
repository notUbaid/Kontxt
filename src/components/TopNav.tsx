import { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, UserCircle, Settings, X } from 'lucide-react';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const settingsRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('kontxt_theme', 'light');
      setIsDarkMode(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('kontxt_theme', 'dark');
      setIsDarkMode(true);
    }
  };

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
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm bg-muted/50 px-4 py-1.5 rounded-full border border-muted"
        >
          <Search size={16} />
          <span className="hidden lg:inline">Search...</span>
        </button>
        <button 
          onClick={toggleDarkMode}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-foreground/20 backdrop-blur-sm">
          <div className="bg-background w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-primary/20 overflow-hidden"
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center border-b border-primary/20 px-4 py-3">
              <Search size={20} className="text-muted-foreground mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search playbook topics..."
                className="flex-1 bg-transparent text-lg focus:outline-none text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 max-h-64 overflow-y-auto bg-muted/10">
              {searchQuery ? (
                <div className="text-center py-8 text-muted-foreground">
                  Press enter to search for "{searchQuery}"
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Type to start searching across the Kontxt Playbook.
                </div>
              )}
            </div>
          </div>
          {/* Click outside overlay */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
};
