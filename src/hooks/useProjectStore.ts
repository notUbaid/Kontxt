import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../App';
import type { AppType } from '../App';
import type { Mode } from '../components/TopNav';

export const useProjectStore = (isAuthenticated: boolean) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated) {
      setProjects([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
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
      const mappedProjects: Project[] = data.map(p => ({
        id: p.id,
        name: p.name,
        mode: p.mode as Mode,
        type: p.type as AppType,
        customLinks: p.custom_links,
        hiddenLinks: p.hidden_links,
        completedTopics: p.completed_topics,
        customTopics: p.custom_topics,
        progressEnabled: p.progress_enabled,
        lastViewedTopic: p.last_viewed_topic
      }));
      setProjects(mappedProjects);
    }
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: Project) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update
    setProjects(prev => [...prev, project]);

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
      setProjects(prev => prev.filter(p => p.id !== project.id));
    }
  };

  const updateProject = async (project: Project) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));

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
  };

  const deleteProject = async (projectId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Optimistic update
    setProjects(prev => prev.filter(p => p.id !== projectId));

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting project:', error);
      // Might want to refetch on error to restore the project
      fetchProjects();
    }
  };

  return { projects, loading, addProject, updateProject, deleteProject, refetch: fetchProjects };
};
