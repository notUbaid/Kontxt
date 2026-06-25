import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Key, User, Trash2, FolderOpen, Tag, Link2, Globe, EyeOff, Eye, Folder, PenLine, Plus, BookOpen, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../App';
import type { Mode } from './TopNav';
import { universalLinks, getTaxonomy } from '../data/taxonomy';
import type { CustomLink } from '../data/taxonomies/types';
import { getSupabase } from '../lib/supabase';
import { useSettingsStore } from '../hooks/useSettingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject?: Project;
  projects?: Project[];
  onModeChange?: (mode: Mode) => void;
  isAuthenticated?: boolean;
  onRequestLogin?: () => void;
  onProjectUpdate?: (project: Project) => void;
  onProjectDelete?: (projectId: string) => void;
}

type Tab = 'project' | 'profile' | 'apikeys' | 'links' | 'tutorial';
export type Provider = 'OpenAI' | 'Google' | 'Groq' | 'OpenRouter' | 'Together' | 'Mistral' | 'DeepSeek';

// eslint-disable-next-line react-refresh/only-export-components
export const MODELS: Record<Provider, string[]> = {
  OpenAI: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  Google: ['gemini-1.5-pro', 'gemini-1.5-flash'],
  Groq: ['llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768'],
  OpenRouter: ['anthropic/claude-3.5-sonnet', 'meta-llama/llama-3-70b-instruct', 'google/gemini-1.5-pro'],
  Together: ['meta-llama/Llama-3-70b-chat-hf', 'mistralai/Mixtral-8x7B-Instruct-v0.1'],
  Mistral: ['mistral-large-latest', 'open-mixtral-8x22b'],
  DeepSeek: ['deepseek-chat', 'deepseek-coder']
};

export const SettingsModal = ({ isOpen, onClose, activeProject, projects, onModeChange, isAuthenticated, onRequestLogin, onProjectUpdate, onProjectDelete }: SettingsModalProps) => {
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
  const [userEmail, setUserEmail] = useState<string>('');

  const { settings, updateSettings } = useSettingsStore(isAuthenticated || false);

  // Link Management State
  const globalCustomLinks = settings.globalCustomLinks;
  const globalHiddenLinks = settings.globalHiddenLinks;
  
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkScope, setNewLinkScope] = useState<'global' | 'project'>('global');
  const [newLinkProjectId, setNewLinkProjectId] = useState<string>('');
  const [newLinkTargetType, setNewLinkTargetType] = useState<'universal' | 'topic'>('universal');
  const [newLinkTopics, setNewLinkTopics] = useState<string[]>([]);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  // Get all unique topics for the active project's type
  const activeTaxonomy = getTaxonomy(activeProject?.type || 'SaaS', 'Production');
  const allTopics = Array.from(new Map(
    activeTaxonomy.flatMap(cat => cat.topics.map(t => [t.id, t]))
  ).values());

  useEffect(() => {
    if (isOpen) {
      const savedKeys = localStorage.getItem('kontxt_api_keys');
      if (savedKeys) {
        try {
          setApiKeys({ ...apiKeys, ...JSON.parse(savedKeys) });
        } catch {
          // ignore
        }
      }

      // Fetch user email
      if (isAuthenticated) {
        getSupabase().then((supabase) => supabase.auth.getUser()).then(({ data: { user } }) => {
          if (user?.email) setUserEmail(user.email);
        });
      }
      if (settings.provider && MODELS[settings.provider as Provider]) {
        setProvider(settings.provider as Provider);
      }
      
      if (settings.model) {
        setModel(settings.model);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, settings.provider, settings.model]);

  const handleSaveKey = () => {
    localStorage.setItem('kontxt_api_keys', JSON.stringify(apiKeys));
    updateSettings({ provider, model });
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
      id: editingLinkId || crypto.randomUUID(),
      name: newLinkName.trim(), 
      url,
      scope: newLinkScope,
      projectId: newLinkScope === 'project' ? newLinkProjectId : undefined,
      targetType: newLinkTargetType,
      targetTopics: newLinkTargetType === 'topic' ? newLinkTopics : undefined
    };
    
    if (newLinkScope === 'global') {
      const updated = editingLinkId 
        ? globalCustomLinks.map(l => l.id === editingLinkId ? newLink : l)
        : [...globalCustomLinks, newLink];
      updateSettings({ globalCustomLinks: updated });
    } else {
      const targetProject = projects?.find(p => p.id === newLinkProjectId);
      if (targetProject && onProjectUpdate) {
        const existingLinks = targetProject.customLinks || [];
        const customLinks = editingLinkId
          ? existingLinks.map(l => l.id === editingLinkId ? newLink : l)
          : [...existingLinks, newLink];
        onProjectUpdate({ ...targetProject, customLinks });
      }
    }
    
    setNewLinkName('');
    setNewLinkUrl('');
    setNewLinkTopics([]);
    setEditingLinkId(null);
  };
  
  const handleEditCustomLink = (link: CustomLink) => {
    setEditingLinkId(link.id);
    setNewLinkName(link.name);
    setNewLinkUrl(link.url);
    setNewLinkScope(link.scope);
    setNewLinkProjectId(link.projectId || (projects && projects.length > 0 ? projects[0].id : ''));
    setNewLinkTargetType(link.targetType);
    setNewLinkTopics(link.targetTopics || []);
  };
  
  const handleCancelEdit = () => {
    setEditingLinkId(null);
    setNewLinkName('');
    setNewLinkUrl('');
    setNewLinkTopics([]);
  };

  const handleRemoveGlobalCustomLink = (linkId: string) => {
    const updated = globalCustomLinks.filter(l => l.id !== linkId);
    updateSettings({ globalCustomLinks: updated });
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
    updateSettings({ globalHiddenLinks: updated });
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
                <div className="my-2 border-t border-muted/50"></div>
                <button 
                  onClick={() => setActiveTab('tutorial')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tutorial' ? 'bg-accent text-accent-foreground' : 'text-accent/80 hover:bg-accent/10 hover:text-accent'}`}
                >
                  <BookOpen size={16} /> How to use Kontxt
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
                          <p className="font-bold text-foreground">Project Name</p>
                          <p className="text-sm text-muted-foreground">The display name of your project.</p>
                        </div>
                        <input 
                          type="text"
                          value={activeProject.name}
                          onChange={(e) => {
                            if (onProjectUpdate) {
                              onProjectUpdate({ ...activeProject, name: e.target.value });
                            }
                          }}
                          className="bg-background border border-input rounded-lg px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground w-64"
                        />
                      </div>

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
                          <option value="Production">Production SaaS</option>
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

                      <div className="p-4 mt-8 border border-destructive/20 bg-destructive/5 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-destructive">Danger Zone</p>
                          <p className="text-sm text-destructive/80">Permanently delete this project and all its documents.</p>
                        </div>
                        <button 
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
                              if (onProjectDelete) {
                                onProjectDelete(activeProject.id);
                                onClose();
                              }
                            }
                          }}
                          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium text-sm hover:opacity-90 flex items-center gap-2"
                        >
                          <Trash2 size={16} /> Delete Project
                        </button>
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
                            {userEmail ? userEmail.charAt(0).toUpperCase() : 'K'}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-lg">{userEmail || 'Loading...'}</p>
                            <p className="text-muted-foreground text-sm">Signed in with Supabase</p>
                          </div>
                        </div>
                        <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-destructive">Sign Out</p>
                            <p className="text-sm text-destructive/80">Log out of this device.</p>
                          </div>
                          <button 
                            onClick={async () => {
                              const supabase = await getSupabase();
                              await supabase.auth.signOut();
                              onClose();
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium text-sm hover:opacity-90"
                          >
                            <User size={16} /> Sign Out
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
                      <h4 className="font-bold text-foreground">{editingLinkId ? 'Edit Link' : 'Add New Link'}</h4>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-3">
                            <input 
                              value={newLinkName}
                              onChange={e => setNewLinkName(e.target.value)}
                              placeholder="Link Name (e.g. My Backend Repo)" 
                              className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground min-w-0"
                            />
                            <input 
                              value={newLinkUrl}
                              onChange={e => setNewLinkUrl(e.target.value)}
                              placeholder="https://github.com/..." 
                              className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground min-w-0"
                            />
                          </div>
                          
                          <div className="flex gap-3">
                            <select 
                              value={newLinkScope}
                              onChange={e => {
                                setNewLinkScope(e.target.value as 'global' | 'project');
                                if (e.target.value === 'project' && projects?.length && !newLinkProjectId) {
                                  setNewLinkProjectId(projects[0].id);
                                }
                              }}
                              className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer min-w-0"
                            >
                              <option value="global">Global Scope</option>
                              <option value="project">Project Scope</option>
                            </select>
                            
                            {newLinkScope === 'project' && (
                              <select 
                                value={newLinkProjectId}
                                onChange={e => setNewLinkProjectId(e.target.value)}
                                className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer min-w-0"
                              >
                                {projects?.map(p => (
                                  <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                              </select>
                            )}
                            
                            <select 
                              value={newLinkTargetType}
                              onChange={e => setNewLinkTargetType(e.target.value as 'universal' | 'topic')}
                              className="flex-1 bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground cursor-pointer min-w-0"
                            >
                              <option value="universal">Universal</option>
                              <option value="topic">Specific Topics</option>
                            </select>
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
                                    className={`px-2 py-1 text-xs rounded-full border transition-colors ${isSelected ? 'bg-primary text-background border-primary' : 'bg-transparent border-muted hover:border-primary/50 text-foreground'}`}
                                  >
                                    {topic.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end mt-4 gap-2">
                          {editingLinkId && (
                            <button 
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg text-sm font-semibold transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          <button 
                            onClick={handleAddLink}
                            disabled={!newLinkName.trim() || !newLinkUrl.trim() || (newLinkScope === 'project' && !newLinkProjectId) || (newLinkTargetType === 'topic' && newLinkTopics.length === 0)}
                            className="px-4 py-2 bg-primary text-background hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                          >
                            <Plus size={16} />
                            {editingLinkId ? 'Update Link' : 'Add Link'}
                          </button>
                        </div>
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
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleEditCustomLink(link)} className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
                                <PenLine size={16} />
                              </button>
                              <button onClick={() => handleRemoveGlobalCustomLink(link.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
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
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleEditCustomLink(link)} className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
                                  <PenLine size={16} />
                                </button>
                                <button onClick={() => handleRemoveProjectCustomLink(p.id, link.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              </div>
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

                {activeTab === 'tutorial' && (
                  <div className="animate-in fade-in space-y-6 pb-12">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <BookOpen size={24} className="text-accent" /> How to use Kontxt
                      </h3>
                      <p className="text-muted-foreground mt-1">Master the AI-Assisted Workflow to build mass-production applications.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <h4 className="font-bold text-foreground text-lg mb-2">The Goal: Build Your Master Project Context</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          Kontxt is your command center. We provide the expert guidance and the exact prompts you need. You take these prompts to AI tools like ChatGPT or Claude, get the refined output, and save it back here. By the end, you'll have a complete, structured Master Document of your entire project.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-bold text-foreground uppercase tracking-widest text-xs">The Workflow Loop</h4>
                        
                        <div className="flex gap-4 p-4 border border-muted rounded-xl bg-background">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">1</div>
                          <div>
                            <p className="font-bold text-foreground text-sm">Read the Guide</p>
                            <p className="text-xs text-muted-foreground mt-1">Each topic in the left sidebar contains expert guidance on why this phase is critical to your app's success.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-4 border border-muted rounded-xl bg-background">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">2</div>
                          <div>
                            <p className="font-bold text-foreground text-sm">Answer the "Think First" Questions</p>
                            <p className="text-xs text-muted-foreground mt-1">Fill out the inline text boxes. You don't need to be perfect. Just get your raw thoughts down.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-4 border border-primary/30 rounded-xl bg-primary/5">
                          <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold shrink-0"><Sparkles size={16} /></div>
                          <div>
                            <p className="font-bold text-foreground text-sm">Use the AI Prompt Template</p>
                            <p className="text-xs text-muted-foreground mt-1">Click "Copy Prompt" and paste it into ChatGPT, Claude, or Gemini alongside your raw answers. Let the AI do the heavy lifting of refining and structuring your thoughts.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-4 border border-muted rounded-xl bg-background">
                          <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold shrink-0"><CheckCircle2 size={16} /></div>
                          <div>
                            <p className="font-bold text-foreground text-sm">Save the Deliverable</p>
                            <p className="text-xs text-muted-foreground mt-1">Paste the final AI response back into the Deliverable box in Kontxt. We will automatically mark the topic as complete and tick up your progress bar.</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-4 border border-accent/30 rounded-xl bg-accent/5">
                          <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold shrink-0"><Download size={16} /></div>
                          <div>
                            <p className="font-bold text-foreground text-sm">The Master Document Export</p>
                            <p className="text-xs text-muted-foreground mt-1">Once your progress bar is full, hit <strong>Export</strong> in the top nav. You now have a beautifully formatted Markdown file of your entire project context. Provide this file to any AI assistant in the future whenever you want to build a feature or write code.</p>
                          </div>
                        </div>
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
