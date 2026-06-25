import { getSupabase } from './supabase';
import type { Project } from '../App';
import type { UserSettings } from '../hooks/useSettingsStore';

export async function syncLocalDataToSupabase(userId: string) {
  const supabase = await getSupabase();
  let syncOccurred = false;

  // 1. Sync Projects
  const localProjectsStr = localStorage.getItem('kontxt_local_projects');
  if (localProjectsStr) {
    try {
      const projects: Project[] = JSON.parse(localProjectsStr);
      for (const p of projects) {
        await supabase.from('projects').upsert({
          id: p.id,
          user_id: userId,
          name: p.name,
          mode: p.mode,
          type: p.type,
          custom_links: p.customLinks || [],
          hidden_links: p.hiddenLinks || [],
          completed_topics: p.completedTopics || [],
          custom_topics: p.customTopics || [],
          progress_enabled: p.progressEnabled || false,
          last_viewed_topic: p.lastViewedTopic || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      }
      localStorage.removeItem('kontxt_local_projects');
      syncOccurred = true;
    } catch (e) {
      console.error('Error syncing projects:', e);
    }
  }

  // 2. Sync Settings
  const localSettingsStr = localStorage.getItem('kontxt_local_settings');
  if (localSettingsStr) {
    try {
      const settings: Partial<UserSettings> = JSON.parse(localSettingsStr);
      const { data } = await supabase.from('user_settings').select('*').eq('user_id', userId).maybeSingle();
      
      await supabase.from('user_settings').upsert({
        user_id: userId,
        provider: settings.provider ?? data?.provider,
        model: settings.model ?? data?.model,
        favorites: settings.favorites ?? data?.favorites ?? [],
        global_custom_links: settings.globalCustomLinks ?? data?.global_custom_links ?? [],
        global_hidden_links: settings.globalHiddenLinks ?? data?.global_hidden_links ?? [],
        custom_links: settings.customLinks ?? data?.custom_links ?? {},
      }, { onConflict: 'user_id' });
      
      localStorage.removeItem('kontxt_local_settings');
      syncOccurred = true;
    } catch (e) {
      console.error('Error syncing settings:', e);
    }
  }

  // 3. Sync Documents
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('kontxt_doc_')) {
      const parts = key.split('_'); // kontxt_doc_projectId_topicId
      if (parts.length >= 4) {
        const projectId = parts[2];
        const topicId = parts.slice(3).join('_');
        const content = localStorage.getItem(key);
        
        if (content) {
          await supabase.from('documents').upsert({
            project_id: projectId,
            topic_id: topicId,
            content: content,
            last_modified: new Date().toISOString(),
            user_id: userId
          }, { onConflict: 'project_id, topic_id' });
          keysToRemove.push(key);
          syncOccurred = true;
        }
      }
    }
  }
  
  keysToRemove.forEach(k => localStorage.removeItem(k));

  return syncOccurred;
}
