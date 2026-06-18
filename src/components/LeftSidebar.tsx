import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { taxonomy } from '../data/taxonomy';
import type { Mode } from './TopNav';

interface LeftSidebarProps {
  activeMode: Mode;
  activePage: string; // The topic ID
  setActivePage: (page: string) => void;
}

export const LeftSidebar = ({ activeMode, activePage, setActivePage }: LeftSidebarProps) => {
  // Simple state to track which categories are expanded in the accordion
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({
    foundation: true,
    execution: true,
    ecosystem: true,
  });

  const toggleCategory = (catId: string) => {
    setExpandedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
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
                    return (
                      <li key={topic.id}>
                        <button
                          onClick={() => setActivePage(topic.id)}
                          className={`w-full flex items-center gap-3 py-1.5 px-3 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground font-medium shadow-sm'
                              : 'text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <topic.icon size={16} className={isActive ? 'text-accent-foreground' : 'text-muted-foreground'} />
                          {topic.name}
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
