import { useState, useEffect } from 'react';
import { Search, Moon, Sun, UserCircle, Settings, X, Download } from 'lucide-react';
import { getTaxonomy } from '../data/taxonomy';
import type { Project } from '../App';
import { SettingsModal } from './SettingsModal';
import { AuthModal } from './AuthModal';

export type Mode = 'Hackathon' | 'Personal' | 'Production' | 'Custom';

interface TopNavProps {
  activeProject: Project;
  onModeChange: (mode: Mode) => void;
  onProjectUpdate?: (project: Project) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  onGoHome: () => void;
  onNavigate: (topicId: string) => void;
}

export const TopNav = ({ activeProject, onModeChange, onProjectUpdate, isAuthenticated, setIsAuthenticated, onGoHome, onNavigate }: TopNavProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{id: string, name: string, snippet: string}[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

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

  const handleExport = () => {
    let combinedMarkdown = `# Project: ${activeProject.name}\nMode: ${activeProject.mode}\n\n`;
    
    const taxonomy = getTaxonomy(activeProject.type || 'SaaS', activeProject.mode);
    for (const cat of taxonomy) {
      const modeTopics = cat.topics;
      if (modeTopics.length === 0) continue;
      
      combinedMarkdown += `## ${cat.name}\n\n`;
      for (const topic of modeTopics) {
        const key = `kontxt_doc_${activeProject.id}_${topic.id}`;
        const savedData = localStorage.getItem(key);
        let content = "_No content drafted yet._";
        
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            if (parsed.content.trim()) {
              content = parsed.content;
            }
          } catch (e) {}
        }
        
        combinedMarkdown += `### ${topic.name}\n\n${content}\n\n---\n\n`;
      }
    }

    const blob = new Blob([combinedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeProject.name.replace(/\s+/g, '-').toLowerCase()}-kontxt.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results: {id: string, name: string, snippet: string}[] = [];
    
    const taxonomy = getTaxonomy(activeProject.type || 'SaaS', activeProject.mode);
    for (const cat of taxonomy) {
      for (const topic of cat.topics) {
        
        let snippet = '';
        let matched = false;

        if (topic.name.toLowerCase().includes(query)) {
          matched = true;
          snippet = "Matched in topic name";
        } else {
          const key = `kontxt_doc_${activeProject.id}_${topic.id}`;
          const savedData = localStorage.getItem(key);
          if (savedData) {
            try {
              const parsed = JSON.parse(savedData);
              const content = parsed.content.toLowerCase();
              const idx = content.indexOf(query);
              if (idx !== -1) {
                matched = true;
                const start = Math.max(0, idx - 20);
                const end = Math.min(parsed.content.length, idx + query.length + 20);
                snippet = "..." + parsed.content.substring(start, end).replace(/\n/g, ' ') + "...";
              }
            } catch (e) {}
          }
        }
        
        if (matched) {
          results.push({ id: topic.id, name: topic.name, snippet });
        }
      }
    }
    setSearchResults(results);
  }, [searchQuery, activeProject]);
  
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

      {/* Center - Mode & Type Badge */}
      <div className="hidden md:flex items-center justify-center w-1/3">
        <div className="flex bg-muted/50 rounded-full px-4 py-1.5 border border-muted items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{activeProject.type || 'SaaS'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
          <span className="text-sm font-semibold text-foreground">{activeProject.mode} Mode</span>
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
        <button 
          onClick={handleExport}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20"
          title="Export Project to Markdown"
        >
          <Download size={16} />
          <span className="hidden lg:inline font-semibold">Export</span>
        </button>
        <div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors mt-1"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
        {isAuthenticated ? (
          <button onClick={() => setIsAuthenticated(false)} className="text-primary hover:text-accent transition-colors" title="Sign Out">
            <UserCircle size={28} />
          </button>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
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
            <div className="p-4 max-h-96 overflow-y-auto bg-muted/10">
              {searchQuery ? (
                searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          onNavigate(result.id);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-muted/50 border border-transparent hover:border-muted transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-foreground">{result.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-lg">{result.snippet}</p>
                        </div>
                        <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Jump
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                )
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

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        activeProject={activeProject}
        onModeChange={onModeChange}
        onProjectUpdate={onProjectUpdate}
        isAuthenticated={isAuthenticated}
        onRequestLogin={() => {
          setIsSettingsOpen(false);
          setIsAuthOpen(true);
        }}
      />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={() => setIsAuthenticated(true)} 
      />
    </header>
  );
};
