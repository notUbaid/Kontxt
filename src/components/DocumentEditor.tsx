import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Eye, Sparkles, FileEdit, CheckCircle2, Loader2, AlertCircle, Copy, Check, ArrowRight, Info, AlertTriangle, Lightbulb, ShieldAlert, RotateCcw } from 'lucide-react';
import type { SaveStatus } from '../hooks/useDocumentStore';

interface DocumentEditorProps {
  topicName: string;
  content: string;
  onChange: (content: string) => void;
  onReset?: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  saveStatus?: SaveStatus;
  onNavigate: (page: string, markComplete?: boolean) => void;
  nextTopic?: { id: string; name: string } | null;
  activeMode: string;
  onTopicComplete?: () => void;
}

const cleanAlertText = (children: React.ReactNode): React.ReactNode => {
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return child.replace(/^\[!\w+\]\s*/, '');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (React.isValidElement(child) && child.props && 'children' in (child.props as any)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props = child.props as any;
      if (props.children) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(child as React.ReactElement<any>, {
          ...props,
          children: cleanAlertText(props.children)
        });
      }
    }
    return child;
  });
};

const StandardCodeBlock = ({ children, language }: { children: React.ReactNode, language?: string }) => {
  const [copied, setCopied] = useState(false);
  const rawText = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden bg-[#1e1e1e] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-muted/50 ring-1 ring-white/10 group/code">
      <div className="flex items-center justify-between px-4 py-2.5 bg-background/5 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          {language && <span className="ml-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{language}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover/code:opacity-100 focus:opacity-100"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="text-[13px] font-mono leading-relaxed">
        <SyntaxHighlighter
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={vscDarkPlus as any}
          language={language || 'text'}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
          }}
        >
          {rawText}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const PromptBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-10 group rounded-2xl overflow-hidden border border-primary/10 bg-gradient-to-br from-background to-muted/30 shadow-sm hover:shadow-md transition-all duration-150 ease-out">
      <div className="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 text-primary font-bold text-xs tracking-wider uppercase">
          <Sparkles size={16} className="text-primary/80" />
          <span>AI Prompt Template</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-95"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
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
  onReset,
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
            <div className="flex items-center gap-2">
              {onReset && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset this topic? Any edits you made will be lost and it will revert to the original playbook template.")) {
                      onReset();
                    }
                  }}
                  title="Reset to Template"
                  className="flex items-center justify-center p-2 rounded-lg bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              )}
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
            </div>
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
            transition={{ duration: 0.15, ease: "easeOut" }}
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
                className="px-6 py-3 rounded-full bg-primary text-background font-semibold hover:bg-primary/90 transition-all duration-150 ease-out shadow-sm flex items-center gap-2 group"
              >
                <Sparkles size={18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
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
            transition={{ duration: 0.15, ease: "easeOut" }}
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
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="prose prose-kontxt max-w-none hover:prose-a:opacity-80">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children, ...props }) => (
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60 mt-10 mb-8 pb-4 border-b border-muted" {...props}>{children}</h1>
                  ),
                  h2: ({ children, ...props }) => (
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-12 mb-6 flex items-center gap-3 relative" {...props}>
                      <span className="absolute -left-5 w-1.5 h-full bg-gradient-to-b from-accent to-accent/40 rounded-full opacity-80 inline-block"></span>
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground/80 mt-10 mb-4 flex items-center gap-2" {...props}>
                      <span className="text-accent/50 font-normal">#</span>
                      {children}
                    </h3>
                  ),
                  blockquote: ({ node, children, ...props }) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const firstChild = node?.children?.[0] as any;
                     
                    const firstTextNode = (firstChild?.type === 'element' && firstChild?.tagName === 'p') ? firstChild.children?.[0] : null;
                    const textContent = firstTextNode?.type === 'text' ? firstTextNode.value : '';
                    
                    const isAlert = textContent.startsWith('[!');
                    
                    if (isAlert) {
                      const alertTypeMatch = textContent.match(/^\[!(\w+)\]/);
                      const alertType = alertTypeMatch ? alertTypeMatch[1] : 'NOTE';
                      
                      let alertColor = 'border-blue-500/30 bg-blue-500/10 text-blue-500';
                      let Icon = Info;
                      
                      if (alertType === 'WARNING') {
                        alertColor = 'border-amber-500/30 bg-amber-500/10 text-amber-500';
                        Icon = AlertTriangle;
                      } else if (alertType === 'TIP') {
                        alertColor = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500';
                        Icon = Lightbulb;
                      } else if (alertType === 'IMPORTANT') {
                        alertColor = 'border-purple-500/30 bg-purple-500/10 text-purple-500';
                        Icon = AlertCircle;
                      } else if (alertType === 'CAUTION') {
                        alertColor = 'border-red-500/30 bg-red-500/10 text-red-500';
                        Icon = ShieldAlert;
                      }
                      
                      return (
                        <div className={`my-6 rounded-xl border ${alertColor} p-4 flex gap-4 items-start shadow-sm`}>
                          <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                          <div className="flex-1 text-foreground/90 text-sm leading-relaxed alert-content">
                            {cleanAlertText(children)}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="relative my-8 p-[1px] rounded-2xl bg-gradient-to-br from-primary/30 via-accent/20 to-transparent shadow-sm">
                        <blockquote className="relative bg-background/80 backdrop-blur-xl py-5 px-6 rounded-[15px] text-foreground/80 italic text-lg shadow-inner border border-white/5" {...props}>
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-accent rounded-l-[15px] opacity-80" />
                          {children}
                        </blockquote>
                      </div>
                    );
                  },
                  table: ({ children, ...props }) => (
                    <div className="my-8 w-full overflow-x-auto rounded-xl border border-muted shadow-sm">
                      <table className="w-full text-sm text-left border-collapse" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children, ...props }) => (
                    <thead className="bg-gradient-to-r from-muted/80 to-muted/30 backdrop-blur-md text-foreground/90 font-bold border-b border-muted uppercase tracking-wider text-xs" {...props}>
                      {children}
                    </thead>
                  ),
                  th: ({ children, ...props }) => (
                    <th className="px-6 py-4" {...props}>{children}</th>
                  ),
                  td: ({ children, ...props }) => (
                    <td className="px-6 py-4 border-b border-muted/50 group-hover:bg-muted/10 transition-colors" {...props}>{children}</td>
                  ),
                  tr: ({ children, ...props }) => (
                    <tr className="group" {...props}>{children}</tr>
                  ),
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
                    return <a {...props} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer" />;
                  },
                  ul: ({ children, ...props }) => (
                    <ul className="my-6 ml-2 space-y-3" {...props}>{children}</ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="my-6 ml-6 space-y-3 list-decimal marker:text-muted-foreground font-medium" {...props}>{children}</ol>
                  ),
                  strong: ({ children, ...props }) => (
                    <strong className="font-semibold text-foreground bg-primary/5 px-1 rounded-md" {...props}>{children}</strong>
                  ),
                  li: ({ node, className, children, ...props }) => {
                    if (className === 'task-list-item' && node?.position) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const inputChild = (node.children || []).find((c: any) => c.tagName === 'input' && c.properties?.type === 'checkbox');
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const checked = inputChild ? (inputChild as any).properties?.checked : false;
                      return (
                        <li 
                          className={`flex items-start gap-3 my-3 p-4 rounded-xl border transition-all duration-150 ease-out shadow-sm hover:shadow-md cursor-pointer ${checked ? 'bg-muted/30 border-muted-foreground/20' : 'bg-background border-muted'}`}
                          data-line={node.position.start.line}
                          onClick={(e) => {
                            if ((e.target as HTMLElement).tagName.toLowerCase() === 'input' || (e.target as HTMLElement).tagName.toLowerCase() === 'a') return;
                            
                            const lineAttr = e.currentTarget.getAttribute('data-line');
                            if (lineAttr) {
                              const lineIndex = parseInt(lineAttr, 10) - 1;
                              const lines = content.split('\n');
                              if (lines[lineIndex]) {
                                if (!checked) {
                                  lines[lineIndex] = lines[lineIndex].replace(/\[\s\]/, '[x]');
                                } else {
                                  lines[lineIndex] = lines[lineIndex].replace(/\[x\]/i, '[ ]');
                                }
                                onChange(lines.join('\n'));
                              }
                            }
                          }}
                          {...props}
                        >
                          <div className={`w-5 h-5 mt-0.5 shrink-0 rounded border flex items-center justify-center transition-all duration-200 ${checked ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.3)]' : 'bg-background/50 border-muted-foreground/30'}`}>
                            {checked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div className={`flex-1 -mt-1 prose-p:my-0 ${checked ? 'line-through text-muted-foreground opacity-70' : 'text-foreground'}`}>
                            {children}
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li className={`relative pl-7 flex items-start ${className || ''}`} {...props}>
                        <div className="absolute left-1.5 top-[0.7rem] w-1.5 h-1.5 bg-accent/70 rotate-45 ring-1 ring-accent/30 shadow-[0_0_8px_rgba(var(--accent),0.4)]" />
                        <span className="flex-1">{children}</span>
                      </li>
                    );
                  },
                  input: ({ node: _node, checked: _checked, disabled: _disabled, ...props }) => {
                    if (props.type === 'checkbox') {
                      return null; // Rendered manually inside the li component
                    }
                    return <input disabled={_disabled} {...props} />;
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
                    
                    if (!inline) {
                      // Standard Code Block
                      return <StandardCodeBlock language={match ? match[1] : undefined}>{children}</StandardCodeBlock>;
                    }

                    // Inline Code
                    return (
                      <code className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[0.9em] font-semibold" {...props}>
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
                  onClick={() => onNavigate(nextTopic.id, true)}
                  className="flex items-center justify-between w-full max-w-sm px-5 py-3 rounded-lg bg-primary hover:bg-primary/90 text-background font-semibold transition-all duration-150 shadow-sm hover:shadow group"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-background/70 group-hover:text-background transition-colors" />
                    Complete & Next
                  </span>
                  <span className="flex items-center gap-1 opacity-90 font-normal text-sm">
                    {nextTopic.name}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
