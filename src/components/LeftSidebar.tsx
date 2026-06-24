import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getTaxonomy } from '../data/taxonomy';
import type { Mode } from './TopNav';
import type { Project } from '../App';

interface LeftSidebarProps {
  activeProject: Project;
  activeType: string;
  activeMode: Mode;
  activePage: string; // The topic ID
  setActivePage: (page: string) => void;
  onProjectUpdate: (project: Project) => void;
}

export const LeftSidebar = ({ activeProject, activeType, activeMode, activePage, setActivePage, onProjectUpdate }: LeftSidebarProps) => {
  const taxonomy = getTaxonomy(activeType, activeMode);
  
  // In custom mode, filter out topics the user didn't select
  let filteredTaxonomy = taxonomy;
  if (activeMode === 'Custom' && activeProject.customTopics && activeProject.customTopics.length > 0) {
    const customFiltered = taxonomy.map(cat => ({
      ...cat,
      topics: cat.topics.filter(t => activeProject.customTopics!.includes(t.id))
    })).filter(cat => cat.topics.length > 0);
    
    if (customFiltered.length > 0) {
      filteredTaxonomy = customFiltered;
    }
  }

  // Simple state to track which categories are expanded in the accordion
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    filteredTaxonomy.forEach(cat => { initialExpanded[cat.id] = true; });
    setExpandedCats(initialExpanded);
  }, [taxonomy, activeProject.customTopics]);

  const toggleCategory = (catId: string) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleTopicProgress = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation();
    const completedRaw = activeProject.completedTopics || [];
    const completed = Array.isArray(completedRaw) ? completedRaw : Object.values(completedRaw).flat();
    const isCompleted = completed.includes(topicId);
    
    let newCompleted;
    if (isCompleted) {
      newCompleted = completed.filter(id => id !== topicId);
    } else {
      newCompleted = [...completed, topicId];
    }
    
    // We keep all completed topics, regardless of mode. 
    // They are filtered when calculating progress.
    onProjectUpdate({ ...activeProject, completedTopics: newCompleted as any });
  };

  const toggleCategoryProgress = (e: React.MouseEvent, modeTopics: any[]) => {
    e.stopPropagation();
    const completedRaw = activeProject.completedTopics || [];
    const completed = Array.isArray(completedRaw) ? completedRaw : Object.values(completedRaw).flat();
    
    const topicIds = modeTopics.map(t => t.id);
    const isAllCompleted = topicIds.every(id => completed.includes(id));
    
    let newCompleted;
    if (isAllCompleted) {
      // Remove all topics in this category
      newCompleted = completed.filter(id => !topicIds.includes(id));
    } else {
      // Add all topics in this category
      const toAdd = topicIds.filter(id => !completed.includes(id));
      newCompleted = [...completed, ...toAdd];
    }
    
    onProjectUpdate({ ...activeProject, completedTopics: newCompleted as any });
  };

  let totalTopics = 0;
  let completedTopicsCount = 0;
  const globalCompletedArray = Array.isArray(activeProject.completedTopics) 
    ? activeProject.completedTopics 
    : (activeProject.completedTopics ? Object.values(activeProject.completedTopics).flat() : []);

  filteredTaxonomy.forEach((category) => {
    const modeTopics = category.topics.filter(t => !t.modes || t.modes.includes(activeMode));
    totalTopics += modeTopics.length;
    modeTopics.forEach(t => {
      if (globalCompletedArray.includes(t.id)) {
        completedTopicsCount++;
      }
    });
  });

  const progressPercentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  return (
    <aside className="w-72 shrink-0 h-[calc(100vh-4rem)] overflow-y-auto border-r border-muted bg-background/95 backdrop-blur-sm pb-10 flex flex-col">
      {activeProject.progressEnabled !== false && totalTopics > 0 && (
        <div className="p-5 pb-2 border-b border-muted/50 bg-muted/10 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Progress</span>
            <span className="text-xs font-bold text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
      <nav className="p-4 space-y-6 flex-1 overflow-y-auto">
        {filteredTaxonomy.map((category) => {
          // Filter topics for the active mode
          const modeTopics = category.topics.filter(t => !t.modes || t.modes.includes(activeMode));
          
          // If no topics for this mode in this category, don't show the category
          if (modeTopics.length === 0) return null;

          const isExpanded = expandedCats[category.id];
          
          const completedRaw = activeProject.completedTopics || [];
          const completedArray = Array.isArray(completedRaw) ? completedRaw : Object.values(completedRaw).flat();
          const isAllCompleted = modeTopics.every(t => completedArray.includes(t.id));

          return (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-2 px-3 py-1 group/cat">
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center flex-1 text-xs font-bold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors text-left"
                >
                  <span className="truncate">{category.name}</span>
                  {isExpanded ? <ChevronDown size={14} className="ml-1 opacity-50 shrink-0" /> : <ChevronRight size={14} className="ml-1 opacity-50 shrink-0" />}
                </button>
                <button
                  onClick={(e) => toggleCategoryProgress(e, modeTopics)}
                  className={`ml-2 shrink-0 p-1 rounded-full transition-all ${
                    isAllCompleted 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground/30 hover:bg-muted opacity-0 group-hover/cat:opacity-100 hover:text-muted-foreground'
                  }`}
                  title={isAllCompleted ? "Mark phase as incomplete" : "Mark phase as complete"}
                >
                  <CheckCircle2 size={14} />
                </button>
              </div>
              
              {isExpanded && (
                <ul className="space-y-1">
                  {modeTopics.map((topic) => {
                    const topicId = topic.id;
                    const isActive = activePage === topic.id;
                    const completedRaw = activeProject.completedTopics || [];
                    const completedArray = Array.isArray(completedRaw) ? completedRaw : Object.values(completedRaw).flat();
                    const isCompleted = completedArray.includes(topicId);
                    
                    return (
                      <li key={topicId} className="relative group/item">
                        <button
                          onClick={() => setActivePage(topic.id)}
                          className={`w-full flex items-center justify-between py-1.5 pl-3 pr-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground font-medium shadow-sm'
                              : 'text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <div className="flex items-center gap-3 w-full pr-2">
                            <topic.icon size={16} className={`shrink-0 ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                            <span className="text-left leading-tight">{topic.name}</span>
                          </div>
                          {activeProject.progressEnabled !== false && (
                            <div 
                              onClick={(e) => toggleTopicProgress(e, topicId)}
                              className={`p-1 rounded-full transition-all ${isCompleted ? 'text-green-500 opacity-100' : 'text-muted-foreground opacity-0 group-hover/item:opacity-40 hover:!opacity-100 hover:bg-muted/50'}`}
                              title={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
                            >
                              <CheckCircle2 size={16} className={isCompleted ? 'fill-green-500/20' : ''} />
                            </div>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
