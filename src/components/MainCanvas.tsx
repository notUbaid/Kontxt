import { useState, useRef, useEffect } from 'react';
import type { Mode } from './TopNav';
import { getTaxonomy } from '../data/taxonomy';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { DocumentEditor } from './DocumentEditor';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStream } from '../utils/llm';
import { useSettingsStore } from '../hooks/useSettingsStore';

import type { Project } from '../App';

interface MainCanvasProps {
  activeType: string;
  activePage: string;
  activeMode: Mode;
  projectId: string;
  isAuthenticated: boolean;
  onRequestLogin: () => void;
  onNavigate: (page: string, markComplete?: boolean) => void;
  activeProject: Project;
  onProjectUpdate: (p: Project) => void;
}

export const MainCanvas = ({ activeType, activePage, activeMode, projectId, isAuthenticated, onRequestLogin, onNavigate, activeProject, onProjectUpdate }: MainCanvasProps) => {
  let activeTopicName = activePage;
  const taxonomy = getTaxonomy(activeType, activeMode);
  const allTopics = taxonomy.flatMap(cat => cat.topics);
  const currentIndex = allTopics.findIndex(t => t.id === activePage);
  const nextTopic = currentIndex !== -1 && currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const [prevIndex, setPrevIndex] = useState(currentIndex);
  const [direction, setDirection] = useState(1);

  if (currentIndex !== prevIndex) {
    setDirection(currentIndex > prevIndex ? 1 : -1);
    setPrevIndex(currentIndex);
  }

  for (const cat of taxonomy) {
    const topic = cat.topics.find(t => t.id === activePage);
    if (topic) {
      activeTopicName = topic.name;
      break;
    }
  }

  const { content, setContent, resetContent, isLoaded, saveStatus } = useDocumentStore(projectId, activePage, activeMode, isAuthenticated);
  const { settings } = useSettingsStore(isAuthenticated);
  const [isGenerating, setIsGenerating] = useState(false);

  const activePageRef = useRef(activePage);
  useEffect(() => {
    activePageRef.current = activePage;
    setIsGenerating(false);
  }, [activePage]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setContent('');
    
    const systemPrompt = `You are a world-class Staff Engineer and Product Manager assisting with planning a ${activeType} project. 
The project is currently in the "${activeMode}" phase, meaning you should tailor your advice and output strictly to the constraints and goals of a ${activeMode} approach (e.g., if Hackathon, prioritize speed over scale; if Production, prioritize reliability and tests).
Output MUST be in Markdown format. Keep your response highly structured, actionable, and directly relevant to the requested topic. Do not include introductory conversational filler.`;

    const userPrompt = `Draft the document for: "${activeTopicName}". This should act as the ground-truth technical or product document for this specific section of the playbook.`;

    let currentContent = '';
    const startPage = activePage;
    
    await generateStream({
      systemPrompt,
      userPrompt,
      isAuthenticated,
      onRequestLogin,
      providerOverride: settings.provider,
      modelOverride: settings.model,
      onChunk: (chunk) => {
        if (activePageRef.current !== startPage) return;
        currentContent += chunk;
        setContent(currentContent + '▌');
      },
      onComplete: () => {
        if (activePageRef.current !== startPage) return;
        setContent(currentContent);
        setIsGenerating(false);
      },
      onError: (err) => {
        if (activePageRef.current !== startPage) return;
        setContent(currentContent + '\n\n> **Error**: Generation halted. ' + err);
        setIsGenerating(false);
      }
    });
  };

  const handleTopicComplete = () => {
    const completedRaw = activeProject.completedTopics || [];
    const completedArray = (Array.isArray(completedRaw) ? completedRaw : Object.values(completedRaw).flat()) as string[];
    
    if (!completedArray.includes(activePage)) {
      onProjectUpdate({
        ...activeProject,
        completedTopics: [...completedArray, activePage]
      });
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 pt-8 pb-24 px-8 mx-auto max-w-4xl w-full h-[calc(100vh-4rem)]">
        <div className="animate-pulse space-y-6 w-full">
          <div className="h-8 bg-muted rounded w-1/3 mb-10"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/5"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

    const pageVariants = {
      initial: (dir: number) => ({
        opacity: 0,
        y: dir > 0 ? 20 : -20,
        scale: 0.99,
        filter: 'blur(2px)'
      }),
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)'
      },
      exit: (dir: number) => ({
        opacity: 0,
        y: dir > 0 ? -20 : 20,
        scale: 0.99,
        filter: 'blur(2px)'
      })
    };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.main 
        key={activePage} // Triggers animation on page change
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
          transition={{ 
            duration: 0.15,
            ease: "easeOut"
          }}
      className="flex-1 min-w-0 pt-8 pb-24 px-8 mx-auto max-w-4xl w-full h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth"
    >
      <div className="mb-4 inline-block px-3 py-1 bg-muted rounded-md text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Mode: <span className="text-accent">{activeMode}</span>
      </div>
      
      <DocumentEditor
        topicName={activeTopicName}
        content={content}
        onChange={setContent}
        onReset={resetContent}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        saveStatus={saveStatus}
        onNavigate={onNavigate}
        nextTopic={nextTopic}
        activeMode={activeMode}
        onTopicComplete={handleTopicComplete}
      />
    </motion.main>
    </AnimatePresence>
  );
};
