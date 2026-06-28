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

const customContentModules = import.meta.glob('../data/content/**/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

export function useDocumentStore(projectId: string | null, topicId: string, activeMode: Mode = 'Production', isAuthenticated: boolean = true, activeType: string = 'SaaS') {
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
        // Find if there is a custom markdown file for this specific mode and topic
        let customContent: string | null = null;
        const normalizedType = activeType.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedMode = activeMode.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedTopicId = topicId.toLowerCase().replace(/[^a-z0-9]/g, '');

        for (const [path, importFn] of Object.entries(customContentModules)) {
          const normalizedPath = path.toLowerCase().replace(/[^a-z0-9\/]/g, '');
          
          if (normalizedPath.includes(normalizedMode) && normalizedPath.includes(normalizedType)) {
            const filename = path.split('/').pop() || '';
            const normalizedFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '');
            const exactMatchString = `${normalizedTopicId}${normalizedMode}${normalizedType}md`;
            
            // e.g. "techstackproductionsaasmd" will exactly match the target file and avoid substrings like "techstackselectionproductionsaasmd"
            if (normalizedFilename === exactMatchString || normalizedFilename.includes(exactMatchString)) {
              try {
                const mod = await importFn();
                // Depending on the bundler configuration, dynamic import of raw strings 
                // might return the string directly or an object with a default export.
                customContent = typeof mod === 'string' ? mod : (mod as any).default;
              } catch (e) {
                console.error('Failed to dynamically load markdown:', e);
              }
              break;
            }
          }
        }

        if (customContent) {
          // Strip YAML frontmatter at runtime so it doesn't bleed into the UI
          const strippedContent = customContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
          setContent(strippedContent);
        } else {
          const rawFallback = fallbackContent[topicId] || '';
          setContent(filterModeContent(rawFallback, activeMode));
        }
        setIsLoaded(true);
      }

      if (!isAuthenticated) {
        // Offline / Guest mode
        const localKey = `kontxt_doc_${projectId}_${topicId}`;
        const localData = localStorage.getItem(localKey);
        if (localData && isMounted && localData.trim() !== '') {
          const strippedContent = localData.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
          setContent(strippedContent);
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
          if (!error && data && data.content && data.content.trim() !== '') {
            // Only update if there is meaningful custom content in the database
            const strippedContent = data.content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
            setContent(strippedContent);
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
  }, [projectId, topicId, activeMode, isAuthenticated, activeType]);

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

  const resetContent = async () => {
    let customContent: string | null = null;
    const normalizedType = activeType.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedMode = activeMode.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedTopicId = topicId.toLowerCase().replace(/[^a-z0-9]/g, '');

    for (const [path, importFn] of Object.entries(customContentModules)) {
      const normalizedPath = path.toLowerCase().replace(/[^a-z0-9\/]/g, '');
      if (normalizedPath.includes(normalizedMode) && normalizedPath.includes(normalizedType)) {
        const filename = path.split('/').pop() || '';
        const normalizedFilename = filename.toLowerCase().replace(/[^a-z0-9]/g, '');
        const exactMatchString = `${normalizedTopicId}${normalizedMode}${normalizedType}md`;
        
        if (normalizedFilename === exactMatchString || normalizedFilename.includes(exactMatchString)) {
          try {
            const mod = await importFn();
            customContent = typeof mod === 'string' ? mod : (mod as any).default;
          } catch (e) {
            console.error('Failed to dynamically load markdown:', e);
          }
          break;
        }
      }
    }
    
    const newContent = customContent 
      ? customContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '') 
      : filterModeContent(fallbackContent[topicId] || '', activeMode);
      
    saveContent(newContent);
  };

  return {
    content,
    setContent: saveContent,
    resetContent,
    isLoaded,
    saveStatus
  };
}
