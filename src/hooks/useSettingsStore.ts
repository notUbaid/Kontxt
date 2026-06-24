import { useState, useEffect, useRef, useCallback } from 'react';
import { getSupabase } from '../lib/supabase';
import type { CustomLink } from '../data/taxonomies/types';

export interface UserSettings {
  provider: string;
  model: string;
  favorites: string[];
  globalCustomLinks: CustomLink[];
  globalHiddenLinks: string[];
  customLinks: Record<string, string>;
}

const defaultSettings: UserSettings = {
  provider: 'Groq',
  model: 'llama3-8b-8192',
  favorites: [],
  globalCustomLinks: [],
  globalHiddenLinks: [],
  customLinks: {},
};

export function useSettingsStore(isAuthenticated: boolean) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchSettings = useCallback(async () => {
    if (!isAuthenticated) {
      setSettings(defaultSettings);
      setIsLoaded(true);
      return;
    }

    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsLoaded(true);
      return;
    }

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching settings:', error);
    } else if (data) {
      setSettings({
        provider: data.provider || defaultSettings.provider,
        model: data.model || defaultSettings.model,
        favorites: data.favorites || defaultSettings.favorites,
        globalCustomLinks: data.global_custom_links || defaultSettings.globalCustomLinks,
        globalHiddenLinks: data.global_hidden_links || defaultSettings.globalHiddenLinks,
        customLinks: data.custom_links || defaultSettings.customLinks,
      });
    } else {
      // No rows exist yet, but we have defaultSettings loaded
    }
    setIsLoaded(true);
  }, [isAuthenticated]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      if (!isAuthenticated) return updated;

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        const supabase = await getSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            provider: updated.provider,
            model: updated.model,
            favorites: updated.favorites,
            global_custom_links: updated.globalCustomLinks,
            global_hidden_links: updated.globalHiddenLinks,
            custom_links: updated.customLinks,
          }, { onConflict: 'user_id' });

        if (error) {
          console.error("Error saving settings:", error);
        }
      }, 1000);

      return updated;
    });
  }, [isAuthenticated]);

  return {
    settings,
    updateSettings,
    isLoaded,
    refetch: fetchSettings
  };
}
