import { useState, useEffect, useCallback, useRef } from 'react';
import { getSupabase } from '../lib/supabase';
import type { Project, AppType } from '../App';
import type { Mode } from '../components/TopNav';
import { buildSeedDocuments } from '../utils/seedDocuments';

const LOCAL_STORAGE_KEY = 'kontxt_local_projects';

export const useProjectStore = (isAuthenticated: boolean) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    if (!isAuthenticated) {
      // Offline/Guest Mode
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        try {
          setProjects(JSON.parse(localData));
        } catch (e) {
          console.error('Error parsing local projects:', e);
          setProjects([]);
        }
      } else {
        setProjects([]);
      }
      setLoading(false);
      return;
    }
    
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else if (data) {
      // Map database snake_case columns to camelCase Project properties
      const mappedProjects: Project[] = data.map(p => {
        let mode = p.mode as Mode;
        if ((mode as string) === 'Custom') {
          mode = 'Production';
        }
        return {
          id: p.id,
          name: p.name,
          mode,
          type: p.type as AppType,
          customLinks: p.custom_links,
          hiddenLinks: p.hidden_links,
          completedTopics: p.completed_topics,
          customTopics: p.custom_topics,
          progressEnabled: p.progress_enabled,
          lastViewedTopic: p.last_viewed_topic
        };
      });
      setProjects(mappedProjects);
    }
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: Project) => {
    // Optimistic update
    setProjects(prev => {
      const newProjects = [...prev, project];
      if (!isAuthenticated) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProjects));
      }
      return newProjects;
    });

    if (!isAuthenticated) return;

    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('projects')
      .insert({
        id: project.id,
        user_id: user.id,
        name: project.name,
        mode: project.mode,
        type: project.type,
        custom_links: project.customLinks || [],
        hidden_links: project.hiddenLinks || [],
        completed_topics: project.completedTopics || [],
        custom_topics: project.customTopics || [],
        progress_enabled: project.progressEnabled || false,
        last_viewed_topic: project.lastViewedTopic || null
      });

    if (error) {
      console.error('Error adding project:', error);
      // Revert optimistic update on error if needed
      setProjects(prev => {
        const reverted = prev.filter(p => p.id !== project.id);
        if (!isAuthenticated) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reverted));
        return reverted;
      });
      return;
    }

    const seedDocuments = buildSeedDocuments(project, user.id);
    if (seedDocuments.length > 0) {
      const { error: seedError } = await supabase
        .from('documents')
        .upsert(seedDocuments, { onConflict: 'project_id, topic_id' });

      if (seedError) {
        console.error('Error seeding project documents:', seedError);
      }
    }
  };

  const updateProject = async (project: Project) => {
    // Optimistic update immediately
    setProjects(prev => {
      const newProjects = prev.map(p => p.id === project.id ? project : p);
      if (!isAuthenticated) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProjects));
      }
      return newProjects;
    });

    if (!isAuthenticated) return;

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(async () => {
      const supabase = await getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('projects')
        .update({
          name: project.name,
          mode: project.mode,
          type: project.type,
          custom_links: project.customLinks || [],
          hidden_links: project.hiddenLinks || [],
          completed_topics: project.completedTopics || [],
          custom_topics: project.customTopics || [],
          progress_enabled: project.progressEnabled || false,
          last_viewed_topic: project.lastViewedTopic || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating project:', error);
      }
    }, 1000);
  };

  const deleteProject = async (projectId: string) => {
    // Optimistic update
    setProjects(prev => {
      const newProjects = prev.filter(p => p.id !== projectId);
      if (!isAuthenticated) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProjects));
      }
      return newProjects;
    });

    if (!isAuthenticated) return;

    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting project:', error);
      fetchProjects();
    }
  };

  return { projects, loading, addProject, updateProject, deleteProject, refetch: fetchProjects };
};
