import { useState, useEffect } from 'react';
import { X, Save, CheckSquare, Square, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import type { Project } from '../App';
import { getTaxonomy } from '../data/taxonomy';

interface CustomizeTopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject: Project;
  onProjectUpdate: (project: Project) => void;
}
const detectSaasModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('billing') || name.includes('subscription') || name.includes('stripe') || name.includes('payment')) {
    return { type: 'Billing SaaS', topics: ['billing', 'payments', 'pricing'] };
  }
  if (name.includes('auth') || name.includes('login') || name.includes('identity') || name.includes('sso')) {
    return { type: 'Auth Platform', topics: ['auth', 'rbac', 'sso'] };
  }
  if (name.includes('analytics') || name.includes('metrics') || name.includes('tracking')) {
    return { type: 'Analytics SaaS', topics: ['analytics', 'dashboards', 'reporting'] };
  }
  if (name.includes('crm') || name.includes('lead') || name.includes('pipeline')) {
    return { type: 'CRM SaaS', topics: ['multitenancy', 'integrations', 'workflows'] };
  }
  if (name.includes('project') || name.includes('task') || name.includes('collaborate') || name.includes('team')) {
    return { type: 'Collaboration SaaS', topics: ['realtimecollaboration', 'notifications', 'permissions'] };
  }
  
  return null;
};

const detectMobileModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('fitness') || name.includes('health') || name.includes('workout') || name.includes('gym')) {
    return { type: 'Fitness App', topics: ['healthkit', 'notifications', 'offlinefirst'] };
  }
  if (name.includes('social') || name.includes('chat') || name.includes('community') || name.includes('network')) {
    return { type: 'Social App', topics: ['realtime', 'pushnotifications', 'feeds', 'messaging'] };
  }
  if (name.includes('delivery') || name.includes('food') || name.includes('ride') || name.includes('logistics')) {
    return { type: 'Delivery App', topics: ['maps', 'realtime', 'payments', 'pushnotifications'] };
  }
  if (name.includes('fintech') || name.includes('bank') || name.includes('wallet') || name.includes('pay')) {
    return { type: 'FinTech App', topics: ['security', 'payments', 'biometrics'] };
  }
  if (name.includes('camera') || name.includes('photo') || name.includes('video') || name.includes('edit')) {
    return { type: 'Media App', topics: ['mediapicker', 'storage', 'permissions'] };
  }
  
  return null;
};

const detectWebAppModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('blog') || name.includes('content') || name.includes('news') || name.includes('magazine')) {
    return { type: 'Content Website', topics: ['seo', 'sitemap', 'blog', 'analytics'] };
  }
  if (name.includes('dashboard') || name.includes('admin') || name.includes('panel') || name.includes('crm')) {
    return { type: 'Dashboard', topics: ['auth', 'roles', 'charts', 'admin-panel'] };
  }
  if (name.includes('book') || name.includes('reservation') || name.includes('appointment') || name.includes('schedule')) {
    return { type: 'Booking Platform', topics: ['payments', 'calendar', 'email-notifications'] };
  }
  if (name.includes('community') || name.includes('social') || name.includes('forum') || name.includes('network')) {
    return { type: 'Community Platform', topics: ['profiles', 'moderation', 'notifications', 'search'] };
  }
  if (name.includes('ai') || name.includes('llm') || name.includes('gpt') || name.includes('bot') || name.includes('assistant')) {
    return { type: 'AI Web App', topics: ['llm-architecture', 'prompt-engineering', 'cost-controls', 'rate-limits', 'rag'] };
  }
  
  return null;
};

const detectAiToolModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('chat') || name.includes('bot') || name.includes('assistant') || name.includes('support')) {
    return { type: 'AI Chatbot', topics: ['promptengineering', 'streamingresponses', 'conversationdesign', 'contextarchitecture', 'memory'] };
  }
  if (name.includes('search') || name.includes('research') || name.includes('doc') || name.includes('knowledge')) {
    return { type: 'AI Search', topics: ['ragdesign', 'embeddings', 'retrievalstrategy', 'vectordatabase', 'chunkingstrategy'] };
  }
  if (name.includes('agent') || name.includes('workflow') || name.includes('auto')) {
    return { type: 'AI Agent', topics: ['toolcalling', 'mcp', 'agents', 'workflowautomation', 'multiagent'] };
  }
  if (name.includes('voice') || name.includes('speech') || name.includes('audio')) {
    return { type: 'AI Voice Assistant', topics: ['voice', 'streamingresponses', 'latency'] };
  }
  if (name.includes('vision') || name.includes('image') || name.includes('ocr')) {
    return { type: 'AI Vision Tool', topics: ['vision', 'ocr', 'fileprocessing'] };
  }
  
  return null;
};

const detectExtensionModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('ai') || name.includes('gpt') || name.includes('assistant') || name.includes('llm') || name.includes('summary')) {
    return { type: 'AI Assistant Extension', topics: ['llmintegration', 'pageanalysis', 'summarization', 'aifeatures'] };
  }
  if (name.includes('scrape') || name.includes('extract') || name.includes('data')) {
    return { type: 'Web Scraper Extension', topics: ['contentscripts', 'backgroundlogic', 'datastorage'] };
  }
  if (name.includes('dev') || name.includes('debug') || name.includes('tool')) {
    return { type: 'Developer Extension', topics: ['backgroundserviceworker', 'apis'] };
  }
  
  return null;
};

const detectDesktopModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('note') || name.includes('write') || name.includes('editor')) {
    return { type: 'Productivity App', topics: ['localstorage', 'filesystemoperations', 'cloudsync', 'offlinefirst'] };
  }
  if (name.includes('dev') || name.includes('tool') || name.includes('terminal')) {
    return { type: 'Developer Tool', topics: ['pluginecosystem', 'nativeintegrations', 'filesystemaccess'] };
  }
  if (name.includes('ai') || name.includes('assistant') || name.includes('bot')) {
    return { type: 'AI Assistant', topics: ['aifeatures', 'localmodels', 'rag'] };
  }
  if (name.includes('video') || name.includes('audio') || name.includes('creative') || name.includes('media')) {
    return { type: 'Creative Tool', topics: ['nativeintegrations', 'performanceoptimization', 'memoryoptimization'] };
  }
  if (name.includes('auto') || name.includes('script') || name.includes('bot')) {
    return { type: 'Automation Tool', topics: ['backgroundservices', 'nativeintegrations'] };
  }
  
  return null;
};

const detectApiModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('ai') || name.includes('gpt') || name.includes('llm')) {
    return { type: 'AI API', topics: ['modelselection', 'costcontrols', 'streaming'] };
  }
  if (name.includes('pay') || name.includes('bill') || name.includes('stripe')) {
    return { type: 'Payment API', topics: ['billing', 'webhooks'] };
  }
  if (name.includes('auth') || name.includes('login') || name.includes('identity')) {
    return { type: 'Authentication API', topics: ['oauth', 'security'] };
  }
  if (name.includes('mail') || name.includes('sms') || name.includes('chat') || name.includes('message')) {
    return { type: 'Communication API', topics: ['webhooks', 'queues'] };
  }
  
  return null;
};

const detectInternalToolModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('crm') || name.includes('lead') || name.includes('sales')) {
    return { type: 'CRM', topics: ['reporting', 'integrations'] };
  }
  if (name.includes('hr') || name.includes('employee') || name.includes('leave')) {
    return { type: 'HRMS', topics: ['workflowengine', 'notifications'] };
  }
  if (name.includes('inventory') || name.includes('stock') || name.includes('supply')) {
    return { type: 'Inventory', topics: ['reporting', 'auditlogs'] };
  }
  if (name.includes('analytics') || name.includes('dashboard') || name.includes('data')) {
    return { type: 'Analytics Dashboard', topics: ['reporting', 'analytics'] };
  }
  if (name.includes('approve') || name.includes('workflow') || name.includes('request')) {
    return { type: 'Approval System', topics: ['workflowengine', 'auditlogs'] };
  }
  
  return null;
};

const detectMarketplaceModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('service') || name.includes('freelance') || name.includes('hire')) {
    return { type: 'Service Marketplace', topics: ['messaging', 'reviews', 'payments'] };
  }
  if (name.includes('rent') || name.includes('book') || name.includes('stay')) {
    return { type: 'Rental Marketplace', topics: ['bookingsystem'] };
  }
  if (name.includes('product') || name.includes('shop') || name.includes('store')) {
    return { type: 'Product Marketplace', topics: ['inventory', 'shipping'] };
  }
  if (name.includes('digital') || name.includes('download') || name.includes('theme') || name.includes('asset')) {
    return { type: 'Digital Products', topics: ['digitalproducts'] };
  }
  
  return null;
};

const detectEcommerceModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('digital') || name.includes('download')) {
    return { type: 'Digital Products', topics: ['digitaldownloads', 'ai_recommendations'] };
  }
  if (name.includes('food') || name.includes('beverage') || name.includes('eat') || name.includes('drink')) {
    return { type: 'Food & Beverage', topics: ['shipping', 'taxes'] };
  }
  if (name.includes('sub') || name.includes('box')) {
    return { type: 'Subscription Commerce', topics: ['subscriptionbilling', 'loyaltyprograms'] };
  }
  if (name.includes('fashion') || name.includes('cloth') || name.includes('apparel')) {
    return { type: 'Fashion Store', topics: ['variants', 'inventory', 'wishlist'] };
  }
  if (name.includes('d2c') || name.includes('brand')) {
    return { type: 'D2C Brand', topics: ['analytics', 'referrals'] };
  }
  
  return null;
};

const detectGameModules = (projectName: string): { type: string; topics: string[] } | null => {
  const name = projectName.toLowerCase();
  
  if (name.includes('multi') || name.includes('mmo') || name.includes('online') || name.includes('coop')) {
    return { type: 'Multiplayer', topics: ['multiplayerarchitecture', 'matchmaking', 'anticheat', 'servercosts'] };
  }
  if (name.includes('card') || name.includes('deck') || name.includes('tcg')) {
    return { type: 'Card Game', topics: ['decksystem', 'balancing', 'matchlogic'] };
  }
  if (name.includes('ai') || name.includes('smart') || name.includes('llm')) {
    return { type: 'AI Game', topics: ['npcai', 'llmintegration', 'dynamicstorytelling'] };
  }
  if (name.includes('hyper') || name.includes('casual')) {
    return { type: 'Hyper Casual', topics: ['ads', 'retention', 'leveldesign'] };
  }
  
  return null;
};

export const CustomizeTopicsModal = ({ isOpen, onClose, activeProject, onProjectUpdate }: CustomizeTopicsModalProps) => {
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
  const [detectedType, setDetectedType] = useState<string | null>(null);
  
  // Always use the taxonomy for the current mode
  const taxonomy = getTaxonomy(activeProject.type || 'SaaS', activeProject.mode);

  useEffect(() => {
    if (isOpen) {
      if (activeProject.customTopics && activeProject.customTopics.length > 0) {
        setSelectedTopicIds(new Set(activeProject.customTopics));
        setDetectedType(null); // Already configured
      } else {
        // By default, select topics that are part of Production mode as a starting point
        const defaultTopics = getTaxonomy(activeProject.type || 'SaaS', 'Production')
          .flatMap(c => c.topics.map(t => t.id));
        
        const initialSet = new Set(defaultTopics);
        
        if (activeProject.type === 'SaaS') {
          const detected = detectSaasModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Mobile App') {
          const detected = detectMobileModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Web App') {
          const detected = detectWebAppModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'AI Tool') {
          const detected = detectAiToolModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Browser Extension') {
          const detected = detectExtensionModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Desktop App') {
          const detected = detectDesktopModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'API Product') {
          const detected = detectApiModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Internal Tool') {
          const detected = detectInternalToolModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Marketplace') {
          const detected = detectMarketplaceModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'E-commerce') {
          const detected = detectEcommerceModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else if (activeProject.type === 'Game') {
          const detected = detectGameModules(activeProject.name);
          if (detected) {
            setDetectedType(detected.type);
            detected.topics.forEach(tId => initialSet.add(tId));
          } else {
            setDetectedType(null);
          }
        } else {
          setDetectedType(null);
        }
        
        setSelectedTopicIds(initialSet);
      }
    }
  }, [isOpen, activeProject]);

  const handleToggleTopic = (topicId: string) => {
    const newSet = new Set(selectedTopicIds);
    if (newSet.has(topicId)) {
      newSet.delete(topicId);
    } else {
      newSet.add(topicId);
    }
    setSelectedTopicIds(newSet);
  };

  const handleToggleCategory = (topicIds: string[]) => {
    const newSet = new Set(selectedTopicIds);
    const allSelected = topicIds.every(id => newSet.has(id));
    
    if (allSelected) {
      topicIds.forEach(id => newSet.delete(id));
    } else {
      topicIds.forEach(id => newSet.add(id));
    }
    setSelectedTopicIds(newSet);
  };

  const handleSave = () => {
    if (selectedTopicIds.size === 0) {
      alert("Please select at least one topic.");
      return;
    }
    onProjectUpdate({
      ...activeProject,
      customTopics: Array.from(selectedTopicIds)
    });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-primary/20 flex flex-col overflow-hidden h-[800px] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-muted flex items-center justify-between bg-muted/20">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Custom Mode Builder</h2>
                <p className="text-muted-foreground mt-1">Select the topics you want to include in your custom playground.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {detectedType && (
                <div className="bg-primary/10 border-2 border-primary/20 text-primary p-4 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Auto-detected: {detectedType}</h3>
                    <p className="opacity-80 font-medium">We've automatically unlocked and pre-selected the recommended modules for your app type.</p>
                  </div>
                </div>
              )}
              
              {taxonomy.map(cat => {
                const topicIds = cat.topics.map(t => t.id);
                const allSelected = topicIds.length > 0 && topicIds.every(id => selectedTopicIds.has(id));
                const someSelected = topicIds.some(id => selectedTopicIds.has(id)) && !allSelected;

                return (
                  <div key={cat.id} className="bg-muted/10 border border-muted rounded-xl overflow-hidden">
                    <div 
                      className="flex items-center gap-3 p-4 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
                      onClick={() => handleToggleCategory(topicIds)}
                    >
                      <div className="text-primary">
                        {allSelected ? <CheckSquare size={20} /> : someSelected ? <CheckSquare size={20} className="opacity-50" /> : <Square size={20} />}
                      </div>
                      <h3 className="font-bold text-lg tracking-wide uppercase text-foreground">{cat.name}</h3>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {cat.topics.map(topic => (
                        <div 
                          key={topic.id}
                          onClick={() => handleToggleTopic(topic.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${selectedTopicIds.has(topic.id) ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background border-muted hover:border-primary/20 hover:bg-muted/30 text-muted-foreground'}`}
                        >
                          {selectedTopicIds.has(topic.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                          <span className={`font-medium ${selectedTopicIds.has(topic.id) ? 'text-foreground' : ''}`}>{topic.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-muted bg-muted/20 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                Save Custom Playground
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
