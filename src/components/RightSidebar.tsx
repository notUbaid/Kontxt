import { useState, useEffect, useRef } from 'react';
import { ExternalLink, MessageSquare, Send, Star, Bot, User, Edit2 } from 'lucide-react';
import type { Mode } from './TopNav';
import { getTaxonomy, universalLinks, type QuickLink } from '../data/taxonomy';
import { motion, AnimatePresence } from 'framer-motion';

import type { Project } from '../App';

interface RightSidebarProps {
  activeProject?: Project;
  activeType: string;
  activePage: string; // Topic ID
  activeMode: Mode;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export const RightSidebar = ({ activeProject, activeType, activePage, activeMode }: RightSidebarProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customLinks, setCustomLinks] = useState<Record<string, string>>({});
  
  // Read from localStorage to sync with Settings
  const [globalCustomLinks, setGlobalCustomLinks] = useState<QuickLink[]>([]);
  const [globalHiddenLinks, setGlobalHiddenLinks] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'ai',
      content: "Hi! I'm Kontxt AI. I have full context of your current playbook. Ask me anything!",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load favorites and custom links on mount
  useEffect(() => {
    const savedFavs = localStorage.getItem('kontxt_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
    const savedCustomLinks = localStorage.getItem('kontxt_custom_links');
    if (savedCustomLinks) {
      setCustomLinks(JSON.parse(savedCustomLinks));
    }
    
    // Periodically poll or sync global links from localStorage if they change across tabs/modals
    const updateLinksState = () => {
      const gl = localStorage.getItem('kontxt_global_custom_links');
      if (gl) setGlobalCustomLinks(JSON.parse(gl));
      
      const hl = localStorage.getItem('kontxt_global_hidden_links');
      if (hl) setGlobalHiddenLinks(JSON.parse(hl));
    };
    
    updateLinksState();
    // Optional: add interval or listen to storage event to sync instantly if changed in SettingsModal
    window.addEventListener('storage', updateLinksState);
    const interval = setInterval(updateLinksState, 1000);
    return () => {
      window.removeEventListener('storage', updateLinksState);
      clearInterval(interval);
    };
  }, []);

  const getDomainColor = (url: string) => {
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      if (hostname.includes('youtube')) return 'rgba(255, 0, 0, 0.15)';
      if (hostname.includes('play.google')) return 'rgba(0, 150, 255, 0.15)';
      if (hostname.includes('github')) return 'rgba(128, 128, 128, 0.15)';
      if (hostname.includes('google')) return 'rgba(255, 165, 0, 0.15)';
      if (hostname.includes('vercel')) return 'rgba(128, 128, 128, 0.15)';
      if (hostname.includes('figma')) return 'rgba(255, 100, 100, 0.15)';
      if (hostname.includes('supabase')) return 'rgba(63, 207, 142, 0.15)';
      if (hostname.includes('clerk')) return 'rgba(100, 100, 255, 0.15)';
      if (hostname.includes('sentry')) return 'rgba(255, 50, 50, 0.15)';
      
      let hash = 0;
      for (let i = 0; i < hostname.length; i++) {
        hash = hostname.charCodeAt(i) + ((hash << 5) - hash);
      }
      const h = Math.abs(hash) % 360;
      return `hsla(${h}, 70%, 50%, 0.15)`;
    } catch {
      return 'rgba(128, 128, 128, 0.15)';
    }
  };

  const handleEditLink = (linkName: string, currentUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newUrl = window.prompt(`Edit URL for ${linkName}:`, currentUrl);
    if (newUrl !== null && newUrl.trim() !== '') {
      const updated = { ...customLinks, [linkName]: newUrl.trim() };
      setCustomLinks(updated);
      localStorage.setItem('kontxt_custom_links', JSON.stringify(updated));
    }
  };

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

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  let activeTopicName = 'Unknown Topic';
  let activeTopicLinks: QuickLink[] = [];
  
  const taxonomy = getTaxonomy(activeType, activeMode);
  for (const cat of taxonomy) {
    const topic = cat.topics.find(t => t.id === activePage);
    if (topic) {
      activeTopicName = topic.name;
      activeTopicLinks = topic.quickLinks;
      break;
    }
  }

  const visibleUniversalLinks = universalLinks.filter(l => !globalHiddenLinks.includes(l.name));
  
  const allUniversalLinks = [
    ...globalCustomLinks,
    ...(activeProject?.customLinks || []),
    ...visibleUniversalLinks
  ];

  // Remove duplicates by name (custom overrides default)
  const uniqueUniversalLinks = Array.from(new Map(allUniversalLinks.map(item => [item.name, item])).values());

  const sortedUniversalLinks = uniqueUniversalLinks.sort((a, b) => {
    const aFav = favorites.includes(a.name) ? 1 : 0;
    const bFav = favorites.includes(b.name) ? 1 : 0;
    return bFav - aFav;
  });

  const handleSendMessage = () => {
    if (!chatInput.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: chatInput.trim()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsgId = crypto.randomUUID();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: '' }]);
      
      const mockResponse = `Looking at the ${activeTopicName} for a ${activeMode} project, you should focus on minimizing scope and maximizing speed. Don't over-engineer!`;
      
      let i = 0;
      const interval = setInterval(() => {
        i += Math.floor(Math.random() * 3) + 1;
        if (i >= mockResponse.length) {
          clearInterval(interval);
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: mockResponse } : m));
          setIsTyping(false);
        } else {
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: mockResponse.slice(0, i) + '▌' } : m));
        }
      }, 30);
      
    }, 600);
  };

  return (
    <aside className="w-80 fixed right-0 top-14 h-[calc(100vh-3.5rem)] border-l border-muted bg-background/30 backdrop-blur-md flex flex-col z-40">
      
      {/* Top Half: Links Section */}
      <div className="h-1/2 overflow-y-auto border-b border-muted/50 flex flex-col shrink-0">
        <div className="p-4 border-b border-muted/20">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Universal Links
          </h3>
          <div className="space-y-1">
            {sortedUniversalLinks.map((link) => {
              const isFav = favorites.includes(link.name);
              const actualUrl = customLinks[link.name] || link.url;
              const bgColor = getDomainColor(actualUrl);

              return (
                <a
                  key={link.name}
                  href={actualUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ backgroundColor: bgColor }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:brightness-95 dark:hover:brightness-125 transition-all group text-sm border border-transparent hover:border-border/50 relative overflow-hidden"
                >
                  <span className="text-foreground font-medium truncate pr-2">
                    {link.name}
                  </span>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => toggleFavorite(link.name, e)}
                        className="hover:scale-110 transition-transform p-1"
                        title="Toggle Favorite"
                      >
                        <Star size={14} className={isFav ? "fill-accent text-accent" : "text-muted-foreground hover:text-accent"} />
                      </button>
                      <button 
                        onClick={(e) => handleEditLink(link.name, actualUrl, e)}
                        className="hover:scale-110 transition-transform p-1"
                        title="Edit Link"
                      >
                        <Edit2 size={12} className="text-muted-foreground hover:text-foreground" />
                      </button>
                      <ExternalLink size={12} className="text-muted-foreground ml-0.5" />
                    </div>
                    
                    {isFav && <Star size={12} className="fill-accent text-accent absolute right-9 group-hover:opacity-0 transition-opacity pointer-events-none" />}
                    
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${new URL(actualUrl).hostname}&sz=32`} 
                      alt="" 
                      className="w-4 h-4 rounded-sm opacity-70 group-hover:opacity-100 transition-opacity object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Context Links
            </h3>
            <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded max-w-[120px] truncate" title={activeTopicName}>
              {activeTopicName}
            </span>
          </div>
          
          {activeTopicLinks.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {activeTopicLinks.map((link) => {
                const actualUrl = customLinks[link.name] || link.url;
                const bgColor = getDomainColor(actualUrl);

                return (
                  <a
                    key={link.name}
                    href={actualUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: bgColor }}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border/50 hover:brightness-95 dark:hover:brightness-125 transition-all group relative overflow-hidden"
                  >
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${new URL(actualUrl).hostname}&sz=32`} 
                      alt="" 
                      className="w-5 h-5 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity object-contain drop-shadow-sm"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-[11px] font-semibold text-foreground text-center leading-tight line-clamp-2 px-1">
                      {link.name}
                    </span>
                    <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-md rounded p-0.5 border border-border/50">
                      <button 
                        onClick={(e) => handleEditLink(link.name, actualUrl, e)}
                        className="p-1 hover:scale-110 transition-transform"
                        title="Edit Link"
                      >
                        <Edit2 size={10} className="text-foreground" />
                      </button>
                      <div className="p-1">
                        <ExternalLink size={10} className="text-foreground" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-[11px] text-muted-foreground text-center p-3 border border-dashed border-muted rounded-lg">
              No specific links for this topic.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Half: RAG Chatbot */}
      <div className="h-1/2 flex flex-col bg-background/80">
        <div className="px-4 py-2 border-b border-muted flex items-center justify-between bg-muted/20 shrink-0">
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <MessageSquare size={16} />
            <span>Kontxt AI</span>
          </div>
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-background' : 'bg-accent/20 text-accent'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`text-sm p-3 rounded-2xl max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted/60 text-foreground rounded-tl-none border border-muted'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-muted shrink-0">
          <div className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ask about ${activeTopicName}...`}
              className="w-full bg-background border border-input rounded-2xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!chatInput.trim() || isTyping}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
