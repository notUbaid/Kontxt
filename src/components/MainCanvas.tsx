import { useState } from 'react';
import type { Mode } from './TopNav';
import { getTaxonomy } from '../data/taxonomy';
import { useDocumentStore } from '../hooks/useDocumentStore';
import { DocumentEditor } from './DocumentEditor';
import { motion } from 'framer-motion';
import { generateStream } from '../utils/llm';
import { useSettingsStore } from '../hooks/useSettingsStore';

interface MainCanvasProps {
  activeType: string;
  activePage: string;
  activeMode: Mode;
  projectId: string;
  isAuthenticated: boolean;
  onRequestLogin: () => void;
}

export const MainCanvas = ({ activeType, activePage, activeMode, projectId, isAuthenticated, onRequestLogin }: MainCanvasProps) => {
  let activeTopicName = activePage;
  const taxonomy = getTaxonomy(activeType, activeMode);
  for (const cat of taxonomy) {
    const topic = cat.topics.find(t => t.id === activePage);
    if (topic) {
      activeTopicName = topic.name;
      break;
    }
  }

  const { content, setContent, isLoaded, saveStatus } = useDocumentStore(projectId, activePage);
  const { settings } = useSettingsStore(isAuthenticated);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setContent('');
    
    const systemPrompt = `You are a world-class Staff Engineer and Product Manager assisting with planning a ${activeType} project. 
The project is currently in the "${activeMode}" phase, meaning you should tailor your advice and output strictly to the constraints and goals of a ${activeMode} approach (e.g., if Hackathon, prioritize speed over scale; if Production, prioritize reliability and tests).
Output MUST be in Markdown format. Keep your response highly structured, actionable, and directly relevant to the requested topic. Do not include introductory conversational filler.`;

    const userPrompt = `Draft the document for: "${activeTopicName}". This should act as the ground-truth technical or product document for this specific section of the playbook.`;

    let currentContent = '';
    
    await generateStream({
      systemPrompt,
      userPrompt,
      isAuthenticated,
      onRequestLogin,
      providerOverride: settings.provider,
      modelOverride: settings.model,
      onChunk: (chunk) => {
        currentContent += chunk;
        setContent(currentContent + '▌');
      },
      onComplete: () => {
        setContent(currentContent);
        setIsGenerating(false);
      },
      onError: (err) => {
        alert('Generation Error: ' + err);
        setContent(currentContent + '\n\n> **Error**: Generation halted. ' + err);
        setIsGenerating(false);
      }
    });
  };

  if (!isLoaded) return null;

  return (
    <motion.main 
      key={activePage} // Triggers animation on page change
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex-1 min-w-0 pt-8 pb-24 px-8 mx-auto max-w-3xl w-full h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth"
    >
      <div className="mb-4 inline-block px-3 py-1 bg-muted rounded-md text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Mode: <span className="text-accent">{activeMode}</span>
      </div>
      
      <DocumentEditor
        topicName={activeTopicName}
        content={content}
        onChange={setContent}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        saveStatus={saveStatus}
      />
    </motion.main>
  );
};
