import { useState, useEffect, useRef } from 'react';
import { getSupabase } from '../lib/supabase';
import { fallbackContent } from '../data/content/fallback';
import { filterModeContent } from '../utils/modeFilter';
import type { Mode } from '../components/TopNav';

export interface DocumentData {
  projectId: string;
  topicId: string;
  content: string;
  lastModified: number;
}

export type SaveStatus = 'saved' | 'saving' | 'error' | 'idle';

export function useDocumentStore(projectId: string | null, topicId: string, activeMode: Mode = 'Production', isAuthenticated: boolean = true) {
  const [content, setContent] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Load document
  useEffect(() => {
    if (!projectId || !topicId) {
      setContent('');
      setIsLoaded(true);
      return;
    }

    let isMounted = true;
    setIsLoaded(false);

    const loadDoc = async () => {
      // SWR: Show fallback content immediately so LCP is not blocked by network
      if (isMounted) {
        const rawFallback = fallbackContent[topicId] || '';
        setContent(filterModeContent(rawFallback, activeMode));
        setIsLoaded(true);
      }

      if (!isAuthenticated) {
        // Offline / Guest mode
        const localKey = `kontxt_doc_${projectId}_${topicId}`;
        const localData = localStorage.getItem(localKey);
        if (localData && isMounted) {
          setContent(localData);
        }
        if (isMounted) setSaveStatus('saved');
        return;
      }

      try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
          .from('documents')
          .select('content')
          .eq('project_id', projectId)
          .eq('topic_id', topicId)
          .maybeSingle(); 
        
        if (isMounted) {
          if (!error && data && data.content) {
            // Only update if there is custom content in the database
            setContent(data.content);
          }
          setSaveStatus('saved');
        }
      } catch (err) {
        console.error('Failed to load document:', err);
        if (isMounted) {
          setSaveStatus('error');
        }
      }
    };

    loadDoc();

    return () => { isMounted = false; };
  }, [projectId, topicId, activeMode, isAuthenticated]);

  // Save document
  const saveContent = (newContent: string) => {
    setContent(newContent);
    setSaveStatus('saving');
    if (!projectId || !topicId) return;

    if (!isAuthenticated) {
      const localKey = `kontxt_doc_${projectId}_${topicId}`;
      localStorage.setItem(localKey, newContent);
      setSaveStatus('saved');
      return;
    }

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      const supabase = await getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setSaveStatus('error');
        return;
      }

      const { error } = await supabase
        .from('documents')
        .upsert({
          project_id: projectId,
          topic_id: topicId,
          content: newContent,
          last_modified: new Date().toISOString(),
          user_id: user.id
        }, { onConflict: 'project_id, topic_id' });

      if (error) {
        console.error("Error saving document:", error);
        setSaveStatus('error');
      } else {
        setSaveStatus('saved');
      }
    }, 1000);
  };

  return {
    content,
    setContent: saveContent,
    isLoaded,
    saveStatus
  };
}
