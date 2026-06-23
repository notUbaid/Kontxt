import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Key, User, Trash2, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../App';
import type { Mode } from './TopNav';
import { universalLinks } from '../data/taxonomy';
import type { CustomLink } from '../data/taxonomies/types';
import { saasProductionTaxonomy } from '../data/taxonomies/saas';
import { Link2, Plus, EyeOff, Eye, Globe, Folder, Tag } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject?: Project;
  projects?: Project[];
  onModeChange?: (mode: Mode) => void;
  isAuthenticated?: boolean;
  onRequestLogin?: () => void;
  onProjectUpdate?: (project: Project) => void;
}

type Tab = 'project' | 'profile' | 'apikeys' | 'links';
export type Provider = 'OpenAI' | 'Google' | 'Groq' | 'OpenRouter' | 'Together' | 'Mistral' | 'DeepSeek';

export const MODELS: Record<Provider, string[]> = {
  OpenAI: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  Google: ['gemini-1.5-pro', 'gemini-1.5-flash'],
  Groq: ['llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768'],
  OpenRouter: ['anthropic/claude-3.5-sonnet', 'meta-llama/llama-3-70b-instruct', 'google/gemini-1.5-pro'],
  Together: ['meta-llama/Llama-3-70b-chat-hf', 'mistralai/Mixtral-8x7B-Instruct-v0.1'],
  Mistral: ['mistral-large-latest', 'open-mixtral-8x22b'],
  DeepSeek: ['deepseek-chat', 'deepseek-coder']
};

export const SettingsModal = ({ isOpen, onClose, activeProject, projects, onModeChange, isAuthenticated, onRequestLogin, onProjectUpdate }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('project');
  
  const [provider, setProvider] = useState<Provider>('OpenAI');
  const [model, setModel] = useState<string>(MODELS['OpenAI'][0]);
  const [apiKeys, setApiKeys] = useState<Record<Provider, string>>({
    OpenAI: '',
    Google: '',
    Groq: '',
    OpenRouter: '',
    Together: '',
    Mistral: '',
    DeepSeek: ''
  });
  
  const [isSaved, setIsSaved] = useState(false);

  // Link Management State
  const [globalCustomLinks, setGlobalCustomLinks] = useState<CustomLink[]>([]);
  const [globalHiddenLinks, setGlobalHiddenLinks] = useState<string[]>([]);
  
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkScope, setNewLinkScope] = useState<'global' | 'project'>('global');
  const [newLinkProjectId, setNewLinkProjectId] = useState<string>('');
  const [newLinkTargetType, setNewLinkTargetType] = useState<'universal' | 'topic'>('universal');
  const [newLinkTopics, setNewLinkTopics] = useState<string[]>([]);

  // Get all unique topics
  const allTopics = Array.from(new Map(
    saasProductionTaxonomy.flatMap(cat => cat.topics.map(t => [t.id, t]))
  ).values());

  useEffect(() => {
    if (isOpen) {
      const savedKeys = localStorage.getItem('kontxt_api_keys');
      if (savedKeys) {
        try {
          setApiKeys({ ...apiKeys, ...JSON.parse(savedKeys) });
        } catch(e) {}
      }
      
      const savedProvider = localStorage.getItem('kontxt_provider') as Provider;
      if (savedProvider && MODELS[savedProvider]) {
        setProvider(savedProvider);
      }
      
      const savedModel = localStorage.getItem('kontxt_model');
      if (savedModel) {
        setModel(savedModel);
      }
      
      const savedGlobalLinks = localStorage.getItem('kontxt_global_custom_links');
      if (savedGlobalLinks) {
        try { setGlobalCustomLinks(JSON.parse(savedGlobalLinks)); } catch(e) {}
      }
      
      const savedHiddenLinks = localStorage.getItem('kontxt_global_hidden_links');
      if (savedHiddenLinks) {
        try { setGlobalHiddenLinks(JSON.parse(savedHiddenLinks)); } catch(e) {}
      }
    }
  }, [isOpen]);

  const handleSaveKey = () => {
    localStorage.setItem('kontxt_api_keys', JSON.stringify(apiKeys));
    localStorage.setItem('kontxt_provider', provider);
    localStorage.setItem('kontxt_model', model);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleAddLink = () => {
    if (!newLinkName.trim() || !newLinkUrl.trim()) return;
    if (newLinkScope === 'project' && !newLinkProjectId) return;
    if (newLinkTargetType === 'topic' && newLinkTopics.length === 0) return;
    
    let url = newLinkUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const newLink: CustomLink = { 
      id: crypto.randomUUID(),
      name: newLinkName.trim(), 
      url,
      scope: newLinkScope,
      projectId: newLinkScope === 'project' ? newLinkProjectId : undefined,
      targetType: newLinkTargetType,
      targetTopics: newLinkTargetType === 'topic' ? newLinkTopics : undefined
    };
    
    if (newLinkScope === 'global') {
      const updated = [...globalCustomLinks, newLink];
      setGlobalCustomLinks(updated);
      localStorage.setItem('kontxt_global_custom_links', JSON.stringify(updated));
    } else {
      const targetProject = projects?.find(p => p.id === newLinkProjectId);
      if (targetProject && onProjectUpdate) {
        const customLinks = [...(targetProject.customLinks || []), newLink];
        onProjectUpdate({ ...targetProject, customLinks });
      }
    }
    
    setNewLinkName('');
    setNewLinkUrl('');
    setNewLinkTopics([]);
  };

  const handleRemoveGlobalCustomLink = (linkId: string) => {
    const updated = globalCustomLinks.filter(l => l.id !== linkId);
    setGlobalCustomLinks(updated);
    localStorage.setItem('kontxt_global_custom_links', JSON.stringify(updated));
  };

  const handleRemoveProjectCustomLink = (projectId: string, linkId: string) => {
    const targetProject = projects?.find(p => p.id === projectId);
    if (targetProject && onProjectUpdate) {
      const customLinks = (targetProject.customLinks || []).filter(l => l.id !== linkId);
      onProjectUpdate({ ...targetProject, customLinks });
    }
  };

  const handleToggleHiddenUniversalLink = (linkName: string) => {
    const isHidden = globalHiddenLinks.includes(linkName);
    let updated;
    if (isHidden) {
      updated = globalHiddenLinks.filter(n => n !== linkName);
    } else {
      updated = [...globalHiddenLinks, linkName];
    }
    setGlobalHiddenLinks(updated);
    localStorage.setItem('kontxt_global_hidden_links', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-primary/20 flex overflow-hidden h-[600px] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar */}
            <div className="w-64 bg-muted/20 border-r border-muted p-4 flex flex-col">
              <h2 className="text-xl font-extrabold text-foreground mb-6 px-2">Settings</h2>
              
              <nav className="space-y-1 flex-1">
                <button 
                  onClick={() => setActiveTab('project')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'project' ? 'bg-primary text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <FolderOpen size={16} /> Project Settings
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <User size={16} /> Account Profile
                </button>
                <button 
                  onClick={() => setActiveTab('apikeys')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'apikeys' ? 'bg-primary text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Key size={16} /> AI Configuration
                </button>
                <button 
                  onClick={() => setActiveTab('links')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'links' ? 'bg-primary text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Link2 size={16} /> Quick Links
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto p-8">
                {activeTab === 'project' && activeProject && (
                  <div className="animate-in fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">Project Settings</h3>
                    <p className="text-muted-foreground">Manage your current active project parameters.</p>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-muted rounded-xl flex items-center justify-between bg-muted/10">
                        <div>
                          <p className="font-bold text-foreground">App Type</p>
                          <p className="text-sm text-muted-foreground">The architecture blueprint this project is based on.</p>
                        </div>
                        <div className="px-4 py-2 bg-muted text-muted-foreground font-semibold rounded-lg text-sm uppercase tracking-widest">
                          {activeProject.type || 'SaaS'}
                        </div>
                      </div>

                      <div className="p-4 border border-muted rounded-xl flex items-center justify-between bg-muted/10">
                        <div>
                          <p className="font-bold text-foreground">Current Mode</p>
                          <p className="text-sm text-muted-foreground">The current scope and phase of the blueprint.</p>
                        </div>
                        <select 
                          value={activeProject.mode}
                          onChange={(e) => {
                            if (onModeChange) onModeChange(e.target.value as Mode);
                          }}
                          className="bg-background border border-input rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground cursor-pointer"
                        >
                          <option value="Hackathon">Hackathon</option>
                          <option value="Personal">Personal</option>
                          <option value="Production">Production</option>
                          <option value="Custom">Custom</option>
                        </select>
                      </div>
                      
                      <div className="p-4 border border-muted rounded-xl flex items-center justify-between bg-muted/10">
                        <div>
                          <p className="font-bold text-foreground">Progress Tracking</p>
                          <p className="text-sm text-muted-foreground">Show progress bar and topic checkmarks.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={activeProject.progressEnabled !== false}
                            onChange={(e) => {
                              if (onProjectUpdate) {
                                onProjectUpdate({ ...activeProject, progressEnabled: e.target.checked });
                              }
                            }}
                          />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="animate-in fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">Account Profile</h3>
                    
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border border-muted rounded-xl">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                            K
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-lg">Kontxt User</p>
                            <p className="text-muted-foreground text-sm">user@kontxt.app</p>
                          </div>
                        </div>
                        <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-destructive">Danger Zone</p>
                            <p className="text-sm text-destructive/80">Permanently delete your account and all data.</p>
                          </div>
                          <button className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium text-sm hover:opacity-90">
                            <Trash2 size={16} /> Delete Account
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 border-2 border-dashed border-muted rounded-xl flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
                          <User size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2">You are not signed in</h4>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                          Create an account or sign in to sync your projects securely across devices.
                        </p>
                        <button 
                          onClick={onRequestLogin}
                          className="px-6 py-2.5 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          Sign In / Register
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'apikeys' && (
                  <div className="animate-in fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">AI Configuration</h3>
                    <p className="text-muted-foreground">
                      Kontxt runs locally. Bring your own API keys to power the AI generation feature. Your keys are stored locally in your browser and never leave your device.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-foreground">AI Provider</label>
                          <select 
                            value={provider}
                            onChange={(e) => {
                              const newProvider = e.target.value as Provider;
                              setProvider(newProvider);
                              setModel(MODELS[newProvider][0]);
                            }}
                            className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground appearance-none cursor-pointer"
                          >
                            {Object.keys(MODELS).map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-foreground">Model</label>
                          <select 
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground appearance-none cursor-pointer"
                          >
                            {MODELS[provider].map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-foreground">{provider} API Key</label>
                        <input 
                          type="password" 
                          value={apiKeys[provider] || ''}
                          onChange={(e) => setApiKeys({ ...apiKeys, [provider]: e.target.value })}
                          placeholder={`Enter your ${provider} API Key`}
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                        />
                      </div>
                      
                      <button 
                        onClick={handleSaveKey}
                        className="px-6 py-2.5 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        {isSaved ? 'Configuration Saved!' : 'Save Configuration'}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'links' && (
                  <div className="animate-in fade-in space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Quick Links Management</h3>
                      <p className="text-muted-foreground">Add new custom links globally or per-project, and hide default links you don't need.</p>
                    </div>

                    <div className="space-y-4 bg-muted/10 p-5 rounded-xl border border-muted">
                      <h4 className="font-bold text-foreground">Add New Link</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-4 items-start">
                          <div className="flex-1 space-y-3">
                            <input 
                              value={newLinkName}
                              onChange={e => setNewLinkName(e.target.value)}
                              placeholder="Link Name (e.g. My Backend Repo)" 
                              className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"
                            />
                            <input 
                              value={newLinkUrl}
                              onChange={e => setNewLinkUrl(e.target.value)}
                              placeholder="https://github.com/..." 
                              className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground"
                            />
                          </div>
                          <div className="w-48 space-y-3">
                            <select 
                              value={newLinkScope}
                              onChange={e => {
                                setNewLinkScope(e.target.value as 'global' | 'project');
                                if (e.target.value === 'project' && projects?.length && !newLinkProjectId) {
                                  setNewLinkProjectId(projects[0].id);
                                }
                              }}
                              className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                            >
                              <option value="global">Global Scope</option>
                              <option value="project">Project Scope</option>
                            </select>
                            
                            {newLinkScope === 'project' && (
                              <select 
                                value={newLinkProjectId}
                                onChange={e => setNewLinkProjectId(e.target.value)}
                                className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                              >
                                {projects?.map(p => (
                                  <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                          
                          <div className="w-48 space-y-3">
                            <select 
                              value={newLinkTargetType}
                              onChange={e => setNewLinkTargetType(e.target.value as 'universal' | 'topic')}
                              className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer"
                            >
                              <option value="universal">Universal (All)</option>
                              <option value="topic">Specific Topics</option>
                            </select>
                            
                            <button 
                              onClick={handleAddLink}
                              disabled={
                                !newLinkName.trim() || 
                                !newLinkUrl.trim() || 
                                (newLinkScope === 'project' && !newLinkProjectId) ||
                                (newLinkTargetType === 'topic' && newLinkTopics.length === 0)
                              }
                              className="w-full px-4 py-2 bg-primary text-background font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                              <Plus size={16} /> Add Link
                            </button>
                          </div>
                        </div>

                        {newLinkTargetType === 'topic' && (
                          <div className="space-y-2 p-3 bg-background rounded-lg border border-input">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Topics</p>
                            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                              {allTopics.map(topic => {
                                const isSelected = newLinkTopics.includes(topic.id);
                                return (
                                  <button
                                    key={topic.id}
                                    onClick={() => {
                                      if (isSelected) {
                                        setNewLinkTopics(newLinkTopics.filter(id => id !== topic.id));
                                      } else {
                                        setNewLinkTopics([...newLinkTopics, topic.id]);
                                      }
                                    }}
                                    className={`px-2 py-1 text-xs rounded-full border transition-colors ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent border-muted hover:border-primary/50 text-foreground'}`}
                                  >
                                    {topic.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-foreground">Custom Links</h4>
                      {globalCustomLinks.length === 0 && (!projects || !projects.some(p => p.customLinks && p.customLinks.length > 0)) && (
                        <p className="text-sm text-muted-foreground">No custom links added yet.</p>
                      )}
                      
                      <div className="space-y-2">
                        {globalCustomLinks.map(link => (
                          <div key={link.id} className="flex items-center justify-between p-3 bg-background border border-muted rounded-lg">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm text-foreground">{link.name}</p>
                                <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded flex items-center gap-1"><Globe size={10}/> Global</span>
                                {link.targetType === 'universal' ? (
                                  <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">Universal</span>
                                ) : (
                                  <span className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent rounded flex items-center gap-1" title={link.targetTopics?.join(', ')}>
                                    <Tag size={10}/> {link.targetTopics?.length} Topics
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate max-w-sm">{link.url}</p>
                            </div>
                            <button onClick={() => handleRemoveGlobalCustomLink(link.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        
                        {projects?.flatMap(p => 
                          (p.customLinks || []).map(link => (
                            <div key={link.id} className="flex items-center justify-between p-3 bg-background border border-muted rounded-lg">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-sm text-foreground">{link.name}</p>
                                  <span className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent rounded flex items-center gap-1"><Folder size={10}/> {p.name}</span>
                                  {link.targetType === 'universal' ? (
                                    <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">Universal</span>
                                  ) : (
                                    <span className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent rounded flex items-center gap-1" title={link.targetTopics?.join(', ')}>
                                      <Tag size={10}/> {link.targetTopics?.length} Topics
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate max-w-sm">{link.url}</p>
                              </div>
                              <button onClick={() => handleRemoveProjectCustomLink(p.id, link.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-foreground">Pre-existing Universal Links</h4>
                      <p className="text-xs text-muted-foreground mb-2">Hide universal links you don't use.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {universalLinks.map(link => {
                          const isHidden = globalHiddenLinks.includes(link.name);
                          return (
                            <div key={link.name} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${isHidden ? 'bg-muted/30 border-muted/50 opacity-60' : 'bg-background border-muted'}`}>
                              <span className="text-sm font-medium text-foreground">{link.name}</span>
                              <button 
                                onClick={() => handleToggleHiddenUniversalLink(link.name)}
                                className={`p-1.5 rounded transition-colors ${isHidden ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground hover:bg-muted'}`}
                                title={isHidden ? 'Restore Link' : 'Hide Link'}
                              >
                                {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </motion.div>
          {/* Click outside overlay */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
