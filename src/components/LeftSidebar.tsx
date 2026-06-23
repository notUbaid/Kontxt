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

  // Simple state to track which categories are expanded in the accordion
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    taxonomy.forEach(cat => { initialExpanded[cat.id] = true; });
    setExpandedCats(initialExpanded);
  }, [taxonomy]);

  const toggleCategory = (catId: string) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleTopicProgress = (e: React.MouseEvent, topicId: string) => {
    e.stopPropagation();
    const completed = activeProject.completedTopics || [];
    const isCompleted = completed.includes(topicId);
    
    let newCompleted;
    if (isCompleted) {
      newCompleted = completed.filter(id => id !== topicId);
    } else {
      newCompleted = [...completed, topicId];
    }
    
    onProjectUpdate({ ...activeProject, completedTopics: newCompleted });
  };

  return (
    <aside className="w-64 fixed top-14 left-0 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-muted bg-background/50 backdrop-blur-sm pb-10">
      <nav className="p-4 space-y-6">
        {taxonomy.map((category) => {
          // Filter topics for the active mode
          const modeTopics = category.topics.filter(t => t.modes.includes(activeMode));
          
          // If no topics for this mode in this category, don't show the category
          if (modeTopics.length === 0) return null;

          const isExpanded = expandedCats[category.id];

          return (
            <div key={category.id}>
              <button 
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3 py-1 hover:text-foreground transition-colors group"
              >
                {category.name}
                {isExpanded ? <ChevronDown size={14} className="opacity-50 group-hover:opacity-100" /> : <ChevronRight size={14} className="opacity-50 group-hover:opacity-100" />}
              </button>
              
              {isExpanded && (
                <ul className="space-y-1">
                  {modeTopics.map((topic) => {
                    const isActive = activePage === topic.id;
                    const isCompleted = (activeProject.completedTopics || []).includes(topic.id);
                    
                    return (
                      <li key={topic.id} className="relative group/item">
                        <button
                          onClick={() => setActivePage(topic.id)}
                          className={`w-full flex items-center justify-between py-1.5 pl-3 pr-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground font-medium shadow-sm'
                              : 'text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <topic.icon size={16} className={isActive ? 'text-accent-foreground' : 'text-muted-foreground'} />
                            <span>{topic.name}</span>
                          </div>
                          {activeProject.progressEnabled !== false && (
                            <div 
                              onClick={(e) => toggleTopicProgress(e, topic.id)}
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
