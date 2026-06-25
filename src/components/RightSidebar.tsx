import { useState, useEffect, useRef } from 'react';
import { ExternalLink, MessageSquare, Send, Star, Bot, User, Edit2, Trash2, ChevronDown } from 'lucide-react';
import type { Mode } from './TopNav';
import { getTaxonomy } from '../data/taxonomy';
import { universalLinks, type QuickLink } from '../data/taxonomies/types';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStream } from '../utils/llm';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { useSettingsStore } from '../hooks/useSettingsStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { Project } from '../App';

interface RightSidebarProps {
  activeProject?: Project;
  activeType: string;
  activePage: string; // Topic ID
  activeMode: Mode;
  isAuthenticated: boolean;
  onRequestLogin: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export const RightSidebar = ({ activeProject, activeType, activePage, activeMode, isAuthenticated, onRequestLogin }: RightSidebarProps) => {
  const { settings, updateSettings } = useSettingsStore(isAuthenticated);
  
  const favorites = settings.favorites;
  const customLinks = settings.customLinks;
  const globalCustomLinks = settings.globalCustomLinks;
  const globalHiddenLinks = settings.globalHiddenLinks;
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'ai',
      content: "Hi! I'm Kontxt AI. I have full context of your current playbook. Ask me anything!",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const { content } = useDocumentStore(activeProject?.id || null, activePage, activeProject?.mode);

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
      const newLinks = { ...customLinks, [linkName]: newUrl.trim() };
      updateSettings({ customLinks: newLinks });
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavs = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    updateSettings({ favorites: newFavs });
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

  // Reset chat when topic changes
  useEffect(() => {
    setMessages([
      {
        id: 'init',
        role: 'ai',
        content: `Hi! I'm Kontxt AI. I have full context of your current playbook. Ask me anything about ${activeTopicName}!`,
      }
    ]);
    setChatInput('');
    setIsTyping(false);
  }, [activeProject?.id, activePage, activeTopicName]);

  const visibleUniversalLinks = universalLinks.filter(l => !globalHiddenLinks.includes(l.name));
  
  const allCustomLinks = [
    ...globalCustomLinks,
    ...(activeProject?.customLinks || [])
  ];

  const universalCustomLinks = allCustomLinks.filter(l => l.targetType === 'universal');
  const topicCustomLinks = allCustomLinks.filter(l => l.targetType === 'topic' && l.targetTopics?.includes(activePage));
  
  const allUniversalLinks = [
    ...universalCustomLinks,
    ...visibleUniversalLinks
  ];

  // Remove duplicates by name (custom overrides default)
  const uniqueUniversalLinks = Array.from(new Map(allUniversalLinks.map(item => [item.name, item])).values());

  const sortedUniversalLinks = uniqueUniversalLinks.sort((a, b) => {
    const aFav = favorites.includes(a.name) ? 1 : 0;
    const bFav = favorites.includes(b.name) ? 1 : 0;
    return bFav - aFav;
  });

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: chatInput.trim()
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setChatInput('');
    setIsTyping(true);

    const aiMsgId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: '▌' }]);

    // Format chat history for context
    const chatHistoryStr = newMessages
      .filter(m => m.id !== 'init') // Skip init message
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');

    const systemPrompt = `You are a world-class Staff Engineer and Product Manager acting as an interactive assistant for a user's project playbook.
The project is a ${activeType} app in ${activeMode} mode.
The user is currently viewing the topic: ${activeTopicName}.
Here is the current content of the document they are viewing:

<document_content>
${content || '(Empty document)'}
</document_content>

Use this context to answer their questions accurately. Keep your answers concise, practical, and formatted in markdown.`;

    let currentResponse = '';

    await generateStream({
      systemPrompt,
      userPrompt: chatHistoryStr + '\nAssistant:',
      isAuthenticated,
      onRequestLogin,
      providerOverride: settings.provider,
      modelOverride: settings.model,
      onChunk: (chunk) => {
        currentResponse += chunk;
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: currentResponse + '▌' } : m));
      },
      onComplete: () => {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: currentResponse } : m));
        setIsTyping(false);
      },
      onError: (err) => {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: currentResponse + `\n\n> **Error**: ${err}` } : m));
        setIsTyping(false);
      }
    });
  };

  return (
    <aside className="w-80 shrink-0 h-[calc(100vh-4rem)] border-l border-muted bg-background/95 backdrop-blur-md flex flex-col">
      
      {/* Top Half: Links Section */}
      <motion.div layout className="flex-1 overflow-y-auto border-b border-muted/50 flex flex-col">
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
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(link.name);
                        }}
                        className={`p-1.5 rounded-full transition-colors ${
                          isFav ? 'text-yellow-500 hover:bg-yellow-500/10' : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted'
                        }`}
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
            <AnimatePresence mode="wait">
              <motion.span 
                key={activeTopicName}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded max-w-[120px] truncate" 
                title={activeTopicName}
              >
                {activeTopicName}
              </motion.span>
            </AnimatePresence>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {(activeTopicLinks.length > 0 || topicCustomLinks.length > 0) ? (
                <div className="grid grid-cols-2 gap-2">
                  {[...topicCustomLinks, ...activeTopicLinks].map((link) => {
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom Half: RAG Chatbot */}
      <motion.div layout className={`flex flex-col bg-background/80 overflow-hidden ${isChatExpanded ? 'flex-1' : 'shrink-0'}`}>
        <motion.div 
          layout="position"
          className="px-4 py-2 border-b border-muted flex items-center justify-between bg-muted/20 shrink-0 cursor-pointer hover:bg-muted/30 transition-colors group"
          onClick={() => setIsChatExpanded(!isChatExpanded)}
        >
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <MessageSquare size={16} />
            <span>Kontxt AI</span>
            <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${isChatExpanded ? '' : 'rotate-180'}`} />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setMessages([{ id: 'init', role: 'ai', content: `Hi! I'm Kontxt AI. I have full context of your current playbook. Ask me anything about ${activeTopicName}!` }]);
              }}
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              title="Clear Chat"
            >
              <Trash2 size={14} />
            </button>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </motion.div>
        
        {/* Chat History & Input */}
        <AnimatePresence initial={false}>
          {isChatExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1 overflow-hidden"
            >
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
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-pre:border-muted/50">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
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
              name="kontxt-chat-input"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </aside>
  );
};
