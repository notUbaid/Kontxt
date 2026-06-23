import { useState, useEffect, useRef } from 'react';
import { ExternalLink, MessageSquare, Send, Star, Bot, User } from 'lucide-react';
import type { Mode } from './TopNav';
import { taxonomy, universalLinks, type QuickLink } from '../data/taxonomy';
import { motion, AnimatePresence } from 'framer-motion';

interface RightSidebarProps {
  activePage: string; // Topic ID
  activeMode: Mode;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export const RightSidebar = ({ activePage, activeMode }: RightSidebarProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
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

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

  const sortedUniversalLinks = [...universalLinks].sort((a, b) => {
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
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted/60 transition-colors group text-sm"
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
                  {isFav && <Star size={14} className="fill-accent text-accent absolute right-8 group-hover:hidden" />}
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
              {activeTopicLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg border border-muted bg-background/50 hover:bg-muted/80 transition-all group relative"
                >
                  <span className="text-[11px] font-medium text-foreground text-center">
                    {link.name}
                  </span>
                  <ExternalLink size={10} className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-50 text-muted-foreground transition-opacity" />
                </a>
              ))}
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
