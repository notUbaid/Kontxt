import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Key, User, Trash2, FolderOpen, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../App';
import type { Mode } from './TopNav';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProject?: Project;
  onModeChange?: (mode: Mode) => void;
  isAuthenticated?: boolean;
  onRequestLogin?: () => void;
}

type Tab = 'project' | 'profile' | 'apikeys';
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

export const SettingsModal = ({ isOpen, onClose, activeProject, onModeChange, isAuthenticated, onRequestLogin }: SettingsModalProps) => {
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
    }
  }, [isOpen]);

  const handleSaveKey = () => {
    localStorage.setItem('kontxt_api_keys', JSON.stringify(apiKeys));
    localStorage.setItem('kontxt_provider', provider);
    localStorage.setItem('kontxt_model', model);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
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
                        <div className="px-4 py-2 bg-muted text-muted-foreground font-semibold rounded-lg text-sm uppercase tracking-widest">
                          {activeProject.mode}
                        </div>
                      </div>
                      
                      {activeProject.mode !== 'Custom' && (
                        <div className="p-5 border-2 border-accent/20 bg-accent/5 rounded-xl flex flex-col gap-4 mt-8">
                          <div>
                            <p className="font-bold text-accent text-lg flex items-center gap-2">
                              <Zap size={20} className="fill-accent" /> Unlock Custom Mode
                            </p>
                            <p className="text-sm text-foreground/80 mt-1">
                              Need more flexibility? Convert this project to Custom Mode. This will permanently unlock all topics and phases from the master Production blueprint for you to mix and match as you see fit. <strong>This action cannot be undone.</strong>
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              if (onModeChange) onModeChange('Custom');
                            }}
                            className="w-fit px-6 py-2.5 bg-accent text-accent-foreground font-bold rounded-lg hover:brightness-110 transition-all shadow-lg"
                          >
                            Convert to Custom Mode
                          </button>
                        </div>
                      )}
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
