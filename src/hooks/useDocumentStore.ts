import { useState, useEffect } from 'react';

export interface DocumentData {
  projectId: string;
  topicId: string;
  content: string;
  lastModified: number;
}

export function useDocumentStore(projectId: string | null, topicId: string) {
  const [content, setContent] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Key for local storage
  const getStorageKey = (pId: string, tId: string) => `kontxt_doc_${pId}_${tId}`;

  // Load document
  useEffect(() => {
    if (!projectId || !topicId) {
      setContent('');
      setIsLoaded(true);
      return;
    }

    const key = getStorageKey(projectId, topicId);
    const savedData = localStorage.getItem(key);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as DocumentData;
        setContent(parsed.content);
      } catch (e) {
        console.error("Failed to parse document data", e);
        setContent('');
      }
    } else {
      setContent(''); // Reset to empty if no doc
    }
    
    setIsLoaded(true);
  }, [projectId, topicId]);

  // Save document
  const saveContent = (newContent: string) => {
    setContent(newContent);
    if (!projectId || !topicId) return;

    const key = getStorageKey(projectId, topicId);
    const data: DocumentData = {
      projectId,
      topicId,
      content: newContent,
      lastModified: Date.now(),
    };
    
    localStorage.setItem(key, JSON.stringify(data));
  };

  return {
    content,
    setContent: saveContent,
    isLoaded
  };
}
