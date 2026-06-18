import { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, Send, Star } from 'lucide-react';
import type { Mode } from './TopNav';
import { taxonomy, universalLinks, type QuickLink } from '../data/taxonomy';

interface RightSidebarProps {
  activePage: string; // Topic ID
  activeMode: Mode;
}

export const RightSidebar = ({ activePage, activeMode }: RightSidebarProps) => {
  const [chatInput, setChatInput] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites on mount
  useEffect(() => {
    const savedFavs = localStorage.getItem('kontxt_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  const toggleFavorite = (linkName: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating
    let newFavs = [...favorites];
    if (newFavs.includes(linkName)) {
      newFavs = newFavs.filter(f => f !== linkName);
    } else {
      newFavs.push(linkName);
    }
    setFavorites(newFavs);
    localStorage.setItem('kontxt_favorites', JSON.stringify(newFavs));
  };

  // Find current topic to get its specific quick links
  let activeTopicName = 'Unknown Topic';
  let activeTopicLinks: QuickLink[] = [];
  
  for (const cat of taxonomy) {
    const topic = cat.topics.find(t => t.id === activePage);
    if (topic) {
      activeTopicName = topic.name;
      activeTopicLinks = topic.quickLinks;
      break;
    }
  }

  // Sort universal links so favorites are at the top
  const sortedUniversalLinks = [...universalLinks].sort((a, b) => {
    const aFav = favorites.includes(a.name) ? 1 : 0;
    const bFav = favorites.includes(b.name) ? 1 : 0;
    return bFav - aFav;
  });

  return (
    <aside className="w-72 fixed right-0 top-14 h-[calc(100vh-3.5rem)] border-l border-muted bg-background/30 backdrop-blur-md flex flex-col">
      <div className="flex-1 overflow-y-auto">
        
        {/* Universal Links Section */}
        <div className="p-4 border-b border-muted/50">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Universal Links
          </h3>
          <div className="space-y-2">
            {sortedUniversalLinks.map((link) => {
              const isFav = favorites.includes(link.name);
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/60 transition-colors group text-sm"
                >
                  <span className="text-foreground font-medium flex items-center gap-2">
                    {link.name}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => toggleFavorite(link.name, e)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star size={14} className={isFav ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"} />
                    </button>
                    <ExternalLink size={12} className="text-muted-foreground" />
                  </div>
                  {/* Keep star visible if it's favorited even when not hovering */}
                  {isFav && <Star size={14} className="fill-accent text-accent absolute right-8 group-hover:hidden" />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Contextual Links Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Contextual Links
            </h3>
            <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded max-w-[100px] truncate" title={activeTopicName}>
              {activeTopicName}
            </span>
          </div>
          
          {activeTopicLinks.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {activeTopicLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-muted bg-background/50 hover:bg-muted/80 transition-all group relative"
                >
                  <span className="text-xs font-medium text-foreground text-center">
                    {link.name}
                  </span>
                  <ExternalLink size={12} className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 text-muted-foreground transition-opacity" />
                </a>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground text-center p-4 border border-dashed border-muted rounded-lg">
              No specific links for this topic.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Half: RAG Chatbot */}
      <div className="p-4 border-t border-muted bg-background/80 shrink-0">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
          <MessageSquare size={16} />
          <span>Ask Kontxt AI</span>
        </div>
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`How do I configure ${activeTopicName}?`}
            className="w-full bg-background border border-input rounded-2xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') setChatInput('');
            }}
          />
          <button 
            onClick={() => setChatInput('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Context: {activeMode} Mode • {activeTopicName}
        </p>
      </div>
    </aside>
  );
};
