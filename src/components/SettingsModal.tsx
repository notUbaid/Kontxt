import { useState, useEffect } from 'react';
import { X, Key, Palette, User, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

type Tab = 'profile' | 'appearance' | 'apikeys';

export const SettingsModal = ({ isOpen, onClose, isDarkMode, toggleDarkMode }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('apikeys');
  const [openAiKey, setOpenAiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedKey = localStorage.getItem('kontxt_openai_key');
      if (savedKey) setOpenAiKey(savedKey);
    }
  }, [isOpen]);

  const handleSaveKey = () => {
    localStorage.setItem('kontxt_openai_key', openAiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
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
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <User size={16} /> Account Profile
                </button>
                <button 
                  onClick={() => setActiveTab('appearance')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Palette size={16} /> Appearance
                </button>
                <button 
                  onClick={() => setActiveTab('apikeys')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'apikeys' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Key size={16} /> API Keys
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
                {activeTab === 'profile' && (
                  <div className="animate-in fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">Account Profile</h3>
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
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="animate-in fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">Appearance</h3>
                    <p className="text-muted-foreground">Customize how Kontxt looks on your device.</p>
                    
                    <div className="p-6 border border-muted rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-foreground">Theme Preference</p>
                          <p className="text-sm text-muted-foreground">Toggle between Light and Dark mode.</p>
                        </div>
                        <button 
                          onClick={toggleDarkMode}
                          className="px-6 py-2 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'apikeys' && (
                  <div className="animate-in fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">API Keys</h3>
                    <p className="text-muted-foreground">
                      Kontxt runs locally. Bring your own API key to power the AI generation and chat features. Your key is stored locally in your browser and never leaves your device.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-foreground">OpenAI API Key</label>
                        <input 
                          type="password" 
                          value={openAiKey}
                          onChange={(e) => setOpenAiKey(e.target.value)}
                          placeholder="sk-..."
                          className="w-full bg-background border border-input rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                        />
                      </div>
                      
                      <button 
                        onClick={handleSaveKey}
                        className="px-6 py-2 bg-primary text-background font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        {isSaved ? 'Saved!' : 'Save Key'}
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
    </AnimatePresence>
  );
};
