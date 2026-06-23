import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Settings, X, Download, ChevronDown, ArchiveRestore, Link2, BookOpen } from 'lucide-react';
import { getTaxonomy } from '../data/taxonomy';
import type { Project } from '../App';
import { SettingsModal } from './SettingsModal';
import { AuthModal } from './AuthModal';

export type Mode = 'Hackathon' | 'Personal' | 'Production' | 'Custom';

interface TopNavProps {
  activeProject: Project;
  projects: Project[];
  activePage: string;
  onModeChange: (mode: Mode) => void;
  onProjectUpdate?: (project: Project) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  onGoHome: () => void;
  onNavigate: (topicId: string) => void;
}

export const TopNav = ({ 
  activeProject, 
  projects,
  activePage,
  onModeChange, 
  onProjectUpdate,
  isAuthenticated,
  setIsAuthenticated,
  onGoHome,
  onNavigate
}: TopNavProps) => {
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
  
  const taxonomy = getTaxonomy(activeProject.type || 'SaaS', activeProject.mode);
  
  let totalTopics = 0;
  let currentPhase = 1;
  let totalPhases = 0;
  
  taxonomy.forEach((cat) => {
    const modeTopics = cat.topics.filter(t => t.modes.includes(activeProject.mode));
    if (modeTopics.length > 0) {
      totalPhases++;
      totalTopics += modeTopics.length;
      if (modeTopics.some(t => t.id === activePage)) {
        currentPhase = totalPhases;
      }
    }
  });

  const completedCount = activeProject.completedTopics?.length || 0;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  
  return (
    <header className="h-[4.5rem] sticky top-0 z-50 glassmorphism flex items-center justify-between px-6 bg-background/90">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-6 h-full">
        {/* Logo */}
        <button 
          onClick={onGoHome}
          className="font-black text-2xl tracking-tighter flex items-center select-none hover:opacity-80 transition-opacity"
          title="Go back to projects"
        >
          <span className="text-accent">Kon</span>
          <span className="text-primary">txt</span>
        </button>

        <div className="w-px h-8 bg-muted/80"></div>

        {/* Project Selector */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Project</span>
          <button className="text-sm font-bold text-foreground flex items-center gap-1 hover:text-accent transition-colors">
            {activeProject.name} <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </div>

        <div className="w-px h-8 bg-muted/80 hidden md:block"></div>

        {/* Progress Tracker */}
        {activeProject.progressEnabled !== false && (
          <div className="hidden lg:flex flex-col justify-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Progress</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-foreground w-8">{progressPercent}%</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">Phase {currentPhase} of {totalPhases}</span>
            </div>
          </div>
        )}
      </div>

      {/* CENTER SECTION - Search */}
      <div className="hidden xl:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 bg-background border border-muted hover:border-primary/30 hover:shadow-sm transition-all px-4 py-2 w-[400px] rounded-full text-left group"
        >
          <Search size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">Search docs, prompts, tools...</span>
          <div className="flex items-center justify-center bg-muted/50 rounded text-[10px] font-bold text-muted-foreground px-1.5 py-0.5 border border-muted group-hover:border-primary/20">
            ⌘K
          </div>
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6 h-full">
        {/* Button Group */}
        <div className="hidden 2xl:flex items-center">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-foreground bg-background border border-muted hover:bg-muted/30 transition-colors rounded-l-lg border-r-0 hover:text-accent">
            <ArchiveRestore size={14} className="text-accent" />
            Prompt Vault
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-foreground bg-background border border-muted hover:bg-muted/30 transition-colors hover:text-accent">
            <Link2 size={14} className="text-accent" />
            Quick Links
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-foreground bg-background border border-muted hover:bg-muted/30 transition-colors rounded-r-lg border-l-0 hover:text-accent">
            <BookOpen size={14} className="text-accent" />
            Project Journal
          </button>
        </div>

        <div className="w-px h-8 bg-muted/80 hidden lg:block"></div>

        {/* Global Utilities */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/30"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={handleExport}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs font-semibold bg-background px-3 py-1.5 rounded-full border border-muted hover:border-primary/30 hover:bg-muted/20"
            title="Export Project to Markdown"
          >
            <Download size={14} />
            <span>Export</span>
          </button>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/30"
            title="Settings"
          >
            <Settings size={18} />
          </button>

          {isAuthenticated ? (
            <button onClick={() => setIsAuthenticated(false)} className="w-8 h-8 rounded-full bg-primary text-background font-bold text-sm flex items-center justify-center hover:opacity-90 transition-opacity ml-1 shadow-sm" title="Sign Out">
              K
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="text-xs font-bold bg-primary text-background px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm ml-1"
            >
              Sign In
            </button>
          )}
        </div>
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
        projects={projects}
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
