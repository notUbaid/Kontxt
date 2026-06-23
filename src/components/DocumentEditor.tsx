import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Eye, Sparkles, FileEdit, CheckCircle2, Loader2, AlertCircle, Copy, Check } from 'lucide-react';
import type { SaveStatus } from '../hooks/useDocumentStore';

interface DocumentEditorProps {
  topicName: string;
  content: string;
  onChange: (content: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  saveStatus?: SaveStatus;
}

const PromptBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 group rounded-xl overflow-hidden border-2 border-primary/20 bg-muted/30">
      <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/10">
        <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase">
          <Sparkles size={14} />
          <span>AI Prompt Template</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-sm"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
};

const InlineTextarea = ({ 
  initialValue, 
  startLine, 
  endLine, 
  onSave 
}: { 
  initialValue: string, 
  startLine: number, 
  endLine: number, 
  onSave: (newText: string, startL: number, endL: number) => void 
}) => {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleBlur = () => {
    if (value !== initialValue) {
      onSave(value, startLine, endLine);
    }
  };

  const isPlaceholder = value.trim() === '✍️ Type your answer here...';

  return (
    <textarea
      ref={textareaRef}
      value={isPlaceholder ? '' : value}
      placeholder="✍️ Type your answer here..."
      onChange={e => setValue(e.target.value)}
      onBlur={handleBlur}
      className="w-full bg-muted/20 border border-muted/50 rounded-lg p-3 text-foreground placeholder:text-muted-foreground/50 resize-none outline-none focus:ring-2 focus:ring-primary/30 transition-all font-sans text-base leading-relaxed my-4 block shadow-sm hover:border-primary/30"
      style={{ minHeight: '80px' }}
    />
  );
};

export const DocumentEditor = ({ 
  topicName, 
  content, 
  onChange, 
  onGenerate, 
  isGenerating,
  saveStatus = 'idle'
}: DocumentEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content, isEditing]);

  const isEmpty = content.trim() === '';

  return (
    <div className="w-full relative min-h-[500px] flex flex-col">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-muted/50">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          {topicName}
          {isGenerating && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-md ml-2 flex items-center gap-1"
            >
              <Sparkles size={12} /> Generating
            </motion.div>
          )}
        </h1>
        <div className="flex items-center gap-4">
          {saveStatus !== 'idle' && !isEmpty && !isGenerating && (
            <div className="flex items-center text-xs font-medium">
              {saveStatus === 'saving' && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1 text-green-500/80">
                  <CheckCircle2 size={14} /> Saved
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="flex items-center gap-1 text-destructive">
                  <AlertCircle size={14} /> Error saving
                </span>
              )}
            </div>
          )}

          {!isEmpty && !isGenerating && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/40 hover:bg-muted text-sm font-medium transition-colors text-foreground"
            >
              {isEditing ? (
                <><Eye size={16} /> Read Mode</>
              ) : (
                <><Edit2 size={16} /> Edit Mode</>
              )}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isEmpty && !isGenerating ? (
          // Empty State
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted rounded-2xl bg-muted/10"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <FileEdit size={40} className="text-primary opacity-80" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Drafting {topicName}</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Start with a blank canvas or use Kontxt AI to instantly generate a robust baseline aligned with your project mode.
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 rounded-full bg-background border-2 border-primary/20 text-foreground font-semibold hover:border-primary/50 transition-colors shadow-sm"
              >
                Start Writing
              </button>
              <button 
                onClick={onGenerate}
                className="px-6 py-3 rounded-full bg-primary text-background font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 group"
              >
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                Generate with AI
              </button>
            </div>
          </motion.div>
        ) : isEditing ? (
          // Edit Mode
          <motion.div 
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full"
          >
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="# Start typing here..."
              className="w-full min-h-[500px] bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none outline-none font-mono text-base leading-relaxed"
              autoFocus
            />
          </motion.div>
        ) : (
          // Read Mode
          <motion.div 
            key="read"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 w-full"
          >
            <div className="prose prose-kontxt max-w-none hover:prose-a:opacity-80">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  input: ({ node, checked, disabled, ...props }) => {
                    if (props.type === 'checkbox' && node?.position) {
                      return (
                        <input
                          type="checkbox"
                          checked={checked}
                          className="cursor-pointer w-4 h-4 text-primary bg-background border-muted rounded focus:ring-primary focus:ring-2 mt-1 mr-2 inline-block shadow-sm transition-all hover:ring-2 hover:ring-primary/50 hover:border-primary/50"
                          onChange={(e) => {
                            const newChecked = e.target.checked;
                            const lineIndex = node.position!.start.line - 1;
                            const lines = content.split('\n');
                            if (lines[lineIndex]) {
                              if (newChecked) {
                                lines[lineIndex] = lines[lineIndex].replace(/\[\s\]/, '[x]');
                              } else {
                                lines[lineIndex] = lines[lineIndex].replace(/\[x\]/i, '[ ]');
                              }
                              onChange(lines.join('\n'));
                            }
                          }}
                        />
                      );
                    }
                    return <input disabled={disabled} {...props} />;
                  },
                  code: ({ node, inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    
                    if (!inline && match && match[1] === 'input') {
                      if (!node?.position) return <code className={className} {...props}>{children}</code>;
                      
                      const start = node.position.start.line - 1;
                      const end = node.position.end.line - 1;
                      const rawText = String(children).replace(/\n$/, '');

                      return (
                        <InlineTextarea
                          initialValue={rawText}
                          startLine={start}
                          endLine={end}
                          onSave={(newText, startL, endL) => {
                            const currentContentLines = content.split('\n');
                            const newLines = ['```input', newText, '```'];
                            currentContentLines.splice(startL, endL - startL + 1, ...newLines);
                            onChange(currentContentLines.join('\n'));
                          }}
                        />
                      );
                    }

                    if (!inline && match && match[1] === 'prompt') {
                      return <PromptBlock>{String(children).replace(/\n$/, '')}</PromptBlock>;
                    }
                    
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
