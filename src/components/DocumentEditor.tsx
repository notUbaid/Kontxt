import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Eye, Sparkles, FileEdit } from 'lucide-react';

interface DocumentEditorProps {
  topicName: string;
  content: string;
  onChange: (content: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const DocumentEditor = ({ 
  topicName, 
  content, 
  onChange, 
  onGenerate, 
  isGenerating 
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
