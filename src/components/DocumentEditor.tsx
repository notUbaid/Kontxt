import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Eye, Sparkles, FileEdit, CheckCircle2, Loader2, AlertCircle, Copy, Check, ArrowRight } from 'lucide-react';
import type { SaveStatus } from '../hooks/useDocumentStore';

interface DocumentEditorProps {
  topicName: string;
  content: string;
  onChange: (content: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  saveStatus?: SaveStatus;
  onNavigate: (page: string) => void;
  nextTopic?: { id: string; name: string } | null;
  activeMode: string;
  onTopicComplete?: () => void;
}

const PromptBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 group rounded-2xl overflow-hidden border border-primary/20 bg-background shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between px-5 py-3 bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase">
          <Sparkles size={14} />
          <span>AI Prompt Template</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-primary/20 text-xs font-semibold text-foreground hover:bg-primary/10 hover:border-primary/40 transition-all shadow-sm"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap bg-muted/5">
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
  const isUntouched = initialValue.includes('Write Here...');
  const [value, setValue] = useState(isUntouched ? '' : initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const untouched = initialValue.includes('Write Here...');
    setValue(untouched ? '' : initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (value) {
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }
  }, [value]);

  const handleBlur = () => {
    if (isUntouched && value === '') return;
    if (value !== initialValue) {
      onSave(value, startLine, endLine);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={isUntouched ? initialValue : "Write Here..."}
      rows={(isUntouched && value === '') ? initialValue.split('\n').length : 1}
      onChange={e => setValue(e.target.value)}
      onBlur={handleBlur}
      className="w-full bg-background border border-muted/60 rounded-xl p-5 text-foreground placeholder:text-muted-foreground/40 resize-none outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-sans text-base leading-relaxed my-4 block shadow-sm hover:border-muted-foreground/30 hover:shadow-md"
    />
  );
};

export const DocumentEditor = ({ 
  topicName, 
  content, 
  onChange, 
  onGenerate, 
  isGenerating,
  saveStatus = 'idle',
  onNavigate,
  nextTopic,
  activeMode,
  onTopicComplete
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
                  a: ({ node: _node, ...props }) => {
                    if (props.href?.startsWith('#')) {
                      return (
                        <a 
                          href={props.href}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(props.href!.slice(1));
                          }}
                          className="text-primary hover:text-primary/80 font-bold underline decoration-primary/30 underline-offset-4 transition-colors cursor-pointer"
                        >
                          {props.children}
                        </a>
                      );
                    }
                    return <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />;
                  },
                  li: ({ node, className, children, ...props }) => {
                    if (className === 'task-list-item' && node?.position) {
                      return (
                        <li 
                          className={className} 
                          data-line={node.position.start.line}
                          {...props}
                        >
                          {children}
                        </li>
                      );
                    }
                    return <li className={className} {...props}>{children}</li>;
                  },
                  input: ({ node: _node, checked, disabled, ...props }) => {
                    if (props.type === 'checkbox') {
                      return (
                        <input
                          type="checkbox"
                          checked={checked}
                          className="cursor-pointer w-4 h-4 text-primary bg-background border-muted rounded focus:ring-primary focus:ring-2 mt-1 mr-2 inline-block shadow-sm transition-all hover:ring-2 hover:ring-primary/50 hover:border-primary/50"
                          onChange={(e) => {
                            const newChecked = e.target.checked;
                            const li = e.target.closest('li');
                            const lineAttr = li?.getAttribute('data-line');
                            if (lineAttr) {
                              const lineIndex = parseInt(lineAttr, 10) - 1;
                              const lines = content.split('\n');
                              if (lines[lineIndex]) {
                                if (newChecked) {
                                  lines[lineIndex] = lines[lineIndex].replace(/\[\s\]/, '[x]');
                                } else {
                                  lines[lineIndex] = lines[lineIndex].replace(/\[x\]/i, '[ ]');
                                }
                                onChange(lines.join('\n'));
                              }
                            }
                          }}
                        />
                      );
                    }
                    return <input disabled={disabled} {...props} />;
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                            
                            // If the user typed something other than the placeholder, mark topic complete
                            if (newText.trim() !== '' && newText.trim() !== 'Type your answer here...' && onTopicComplete) {
                              onTopicComplete();
                            }
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
            {nextTopic && !isEmpty && (
              <div className="mt-16 pt-8 border-t border-muted/50 pb-8 flex flex-col items-start">
                <h3 className="text-xl font-bold text-foreground mb-4">Ready for the next step?</h3>
                <p className="text-muted-foreground mb-6">
                  Mark this topic as complete and move on to <span className="font-semibold text-foreground">{nextTopic.name}</span> to continue your {activeMode} playbook.
                </p>
                <button
                  onClick={() => {
                    if (onTopicComplete) onTopicComplete();
                    onNavigate(nextTopic.id);
                  }}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-background text-lg font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
                >
                  Next: {nextTopic.name} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
