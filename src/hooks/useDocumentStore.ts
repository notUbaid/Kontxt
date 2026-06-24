import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { fallbackContent } from '../data/content/fallback';

export interface DocumentData {
  projectId: string;
  topicId: string;
  content: string;
  lastModified: number;
}

export type SaveStatus = 'saved' | 'saving' | 'error' | 'idle';

export function useDocumentStore(projectId: string | null, topicId: string) {
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
      try {
        const { data, error } = await supabase
          .from('documents')
          .select('content')
          .eq('project_id', projectId)
          .eq('topic_id', topicId)
          .maybeSingle(); 
        
        if (isMounted) {
          if (error || !data) {
            setContent(fallbackContent[topicId] || '');
          } else {
            setContent(data.content || fallbackContent[topicId] || '');
          }
          setSaveStatus('saved');
        }
      } catch (err) {
        console.error('Failed to load document:', err);
        if (isMounted) {
          setContent(fallbackContent[topicId] || '');
          setSaveStatus('error');
        }
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    };

    loadDoc();

    return () => { isMounted = false; };
  }, [projectId, topicId]);

  // Save document
  const saveContent = (newContent: string) => {
    setContent(newContent);
    setSaveStatus('saving');
    if (!projectId || !topicId) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

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
