import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, Moon, Sun, Settings, X, Download, ChevronDown, ArchiveRestore, Link2, BookOpen } from 'lucide-react';
import { getTaxonomy } from '../data/taxonomy';
import type { Project } from '../App';
import { SettingsModal } from './SettingsModal';
import { supabase } from '../lib/supabase';
import { fallbackContent } from '../data/content/fallback';

export type Mode = 'Hackathon' | 'Personal' | 'Production' | 'Custom';

interface TopNavProps {
  activeProject: Project;
  projects: Project[];
  activePage: string;
  onModeChange: (mode: Mode) => void;
  onProjectUpdate?: (project: Project) => void;
  onProjectDelete?: (projectId: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  onGoHome: () => void;
  onNavigate: (topicId: string) => void;
  onSelectProject: (id: string) => void;
  onRequestLogin: () => void;
  toggleLeftSidebar?: () => void;
  toggleRightSidebar?: () => void;
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
  onNavigate,
  onSelectProject,
  onRequestLogin,
  toggleLeftSidebar,
  toggleRightSidebar,
  onProjectDelete
}: TopNavProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{id: string, name: string, snippet: string, projectId: string, projectName: string}[]>([]);
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

  const handleExport = async () => {
    // Fetch all documents for this project from Supabase
    const { data: docs } = await supabase
      .from('documents')
      .select('topic_id, content')
      .eq('project_id', activeProject.id);

    const docMap = new Map<string, string>();
    if (docs) {
      for (const doc of docs) {
        if (doc.content?.trim()) docMap.set(doc.topic_id, doc.content);
      }
    }

    let combinedMarkdown = `> **MASTER PROJECT CONTEXT:**\n> This document contains the complete, structured blueprint for this application.\n> It includes the target audience, value propositions, technical architecture, and UI/UX flows.\n> Use this document to maintain strict context when writing code, designing features, or planning marketing strategies.\n\n---\n\n# Project: ${activeProject.name}\nMode: ${activeProject.mode}\n\n`;
    
    const taxonomy = getTaxonomy(activeProject.type || 'SaaS', activeProject.mode);
    for (const cat of taxonomy) {
      const modeTopics = cat.topics;
      if (modeTopics.length === 0) continue;
      
      combinedMarkdown += `## ${cat.name}\n\n`;
      for (const topic of modeTopics) {
        const content = docMap.get(topic.id) || fallbackContent[topic.id] || "_No content drafted yet._";
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

  // Keyboard shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    
    const doSearch = async () => {
      const results: {id: string, name: string, snippet: string, projectId: string, projectName: string}[] = [];
      
      for (const project of projects) {
        const taxonomy = getTaxonomy(project.type || 'SaaS', project.mode);
        
        // Fetch all documents for this project
        const { data: docs } = await supabase
          .from('documents')
          .select('topic_id, content')
          .eq('project_id', project.id);
        
        const docMap = new Map<string, string>();
        if (docs) {
          for (const doc of docs) {
            if (doc.content) docMap.set(doc.topic_id, doc.content);
          }
        }

        for (const cat of taxonomy) {
          for (const topic of cat.topics) {
            let snippet = '';
            let matched = false;

            if (topic.name.toLowerCase().includes(query)) {
              matched = true;
              snippet = "Matched in topic name";
            } else {
              const docContent = docMap.get(topic.id);
              if (docContent) {
                const lowerContent = docContent.toLowerCase();
                const idx = lowerContent.indexOf(query);
                if (idx !== -1) {
                  matched = true;
                  const start = Math.max(0, idx - 20);
                  const end = Math.min(docContent.length, idx + query.length + 20);
                  snippet = "..." + docContent.substring(start, end).replace(/\n/g, ' ') + "...";
                }
              }
            }
            
            if (matched) {
              results.push({ 
                id: topic.id, 
                name: topic.name, 
                snippet, 
                projectId: project.id, 
                projectName: project.name 
              });
            }
          }
        }
      }
      setSearchResults(results);
    };

    const debounce = setTimeout(doSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, projects]);
  
  const baseTaxonomy = getTaxonomy(activeProject.type || 'SaaS', activeProject.mode);
  
  // In custom mode, filter out topics the user didn't select
  const taxonomy = activeProject.mode === 'Custom' && activeProject.customTopics
    ? baseTaxonomy.map(cat => ({
        ...cat,
        topics: cat.topics.filter(t => activeProject.customTopics!.includes(t.id))
      })).filter(cat => cat.topics.length > 0)
    : baseTaxonomy;

  let totalTopics = 0;
  
  let maxPhaseNum = -1;
  let activePhaseNum = -1;
  let activeCatIndex = -1;
  
  let totalCatsWithTopics = 0;
  
  taxonomy.forEach((cat) => {
    const modeTopics = cat.topics.filter(t => !t.modes || t.modes.includes(activeProject.mode));
    if (modeTopics.length > 0) {
      totalCatsWithTopics++;
      totalTopics += modeTopics.length;
      
      const match = cat.name.match(/PHASE\s+(\d+)/i);
      let thisCatPhaseNum = -1;
      if (match) {
        thisCatPhaseNum = parseInt(match[1], 10);
        if (thisCatPhaseNum > maxPhaseNum) maxPhaseNum = thisCatPhaseNum;
      }

      // If the current active page is in this category, set it as the active phase
      if (modeTopics.some(t => t.id === activePage)) {
        activeCatIndex = totalCatsWithTopics;
        activePhaseNum = thisCatPhaseNum;
      }
    }
  });

  // Fallback if activePage isn't found in taxonomy (e.g. invalid state)
  if (activePhaseNum === -1 && totalCatsWithTopics > 0) {
    activeCatIndex = 1;
    activePhaseNum = taxonomy[0].name.match(/PHASE\s+(\d+)/i) ? parseInt(taxonomy[0].name.match(/PHASE\s+(\d+)/i)![1], 10) : -1;
  }

  let currentPhaseStr = '';
  if (maxPhaseNum >= 0 && activePhaseNum >= 0) {
    currentPhaseStr = `Phase ${activePhaseNum} of ${maxPhaseNum}`;
  } else {
    currentPhaseStr = `Phase ${activeCatIndex > 0 ? activeCatIndex : 1} of ${totalCatsWithTopics}`;
  }

  const getCompletedForMode = () => {
    const completed = activeProject.completedTopics || [];
    // If it's somehow an object from the previous migration, convert it to array
    const completedArray = Array.isArray(completed) ? completed : Object.values(completed).flat();
    
    // Only count completed topics that are actively part of the current mode's taxonomy AND are not filtered out by modes
    const validTopicIds = taxonomy.flatMap(c => 
      c.topics
        .filter(t => !t.modes || t.modes.includes(activeProject.mode))
        .map(t => t.id)
    );
    return completedArray.filter(id => validTopicIds.includes(id as string));
  };

  const completedCount = getCompletedForMode().length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  
  return (
    <nav className="h-16 border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 sticky top-0 z-50 shrink-0">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 h-full">
        {/* Mobile Left Sidebar Toggle */}
        <button 
          onClick={toggleLeftSidebar}
          className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        {/* Logo */}
        <button 
          onClick={onGoHome}
          className="font-black text-2xl tracking-tighter flex items-center select-none hover:opacity-80 transition-opacity"
          title="Go back to projects"
        >
          <span className="text-accent">Kon</span>
          <span className="text-primary">txt</span>
        </button>

        <div className="hidden md:block w-px h-8 bg-muted/80"></div>

        {/* Project Selector */}
        <div className="hidden md:flex flex-col justify-center relative">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Project</span>
          <button 
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="text-sm font-bold text-foreground flex items-center gap-1 hover:text-accent transition-colors"
          >
            {activeProject.name} <ChevronDown size={14} className={`text-muted-foreground transition-transform ${isProjectDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {isProjectDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsProjectDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-muted shadow-xl rounded-xl py-2 z-50 overflow-hidden flex flex-col">
                <div className="px-3 pb-2 mb-2 border-b border-muted/50">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Switch Project</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {projects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p.id);
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted/50 ${p.id === activeProject.id ? 'text-accent font-semibold bg-accent/5' : 'text-foreground'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-muted/50 px-2">
                  <button 
                    onClick={() => {
                      onGoHome();
                      setIsProjectDropdownOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    View All Projects
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hidden lg:block w-px h-8 bg-muted/80"></div>

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
              <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">{currentPhaseStr}</span>
            </div>
          </div>
        )}
      </div>

      {/* CENTER SECTION - Search */}
      <div className="hidden xl:flex items-center justify-center">
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
      <div className="flex items-center gap-2 h-full">
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

        <div className="hidden lg:block w-px h-8 bg-muted/80"></div>

        {/* Global Utilities */}
        <div className="flex items-center gap-1 md:gap-3">
          <button 
            onClick={toggleDarkMode}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/30"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={handleExport}
            className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors items-center gap-1.5 text-xs font-semibold bg-background px-3 py-1.5 rounded-full border border-muted hover:border-primary/30 hover:bg-muted/20"
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

          {/* Mobile Right Sidebar Toggle (Chatbot) */}
          <button 
            onClick={toggleRightSidebar}
            className="md:hidden p-2 text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>

          {isAuthenticated ? (
            <button onClick={() => setIsAuthenticated(false)} className="w-8 h-8 rounded-full bg-primary text-background font-bold text-sm flex items-center justify-center hover:opacity-90 transition-opacity ml-1 shadow-sm" title="Sign Out">
              K
            </button>
          ) : (
            <button 
              onClick={onRequestLogin}
              className="text-xs font-bold bg-primary text-background px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm ml-1"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && createPortal(
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
                    {searchResults.map((result, i) => (
                      <button
                        key={`${result.projectId}-${result.id}-${i}`}
                        onClick={() => {
                          if (activeProject.id !== result.projectId) {
                            onSelectProject(result.projectId);
                          }
                          onNavigate(result.id);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-muted/50 border border-transparent hover:border-muted transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{result.projectName}</span>
                            <p className="font-bold text-foreground text-sm">{result.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate max-w-lg">{result.snippet}</p>
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
        </div>,
        document.body
      )}

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        activeProject={activeProject}
        projects={projects}
        onModeChange={onModeChange}
        onProjectUpdate={onProjectUpdate}
        onProjectDelete={onProjectDelete}
        isAuthenticated={isAuthenticated}
        onRequestLogin={() => {
          setIsSettingsOpen(false);
          onRequestLogin();
        }}
      />
    </nav>
  );
};
