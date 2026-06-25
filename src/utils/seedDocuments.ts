import type { Project } from '../App';
import { getTaxonomy } from '../data/taxonomyRegistry';
import { fallbackContent } from '../data/content/fallback';
import { filterModeContent } from './modeFilter';

export interface SeedDocumentRow {
  project_id: string;
  topic_id: string;
  content: string;
  last_modified: string;
  user_id: string;
}

export function buildSeedDocuments(project: Project, userId: string): SeedDocumentRow[] {
  const taxonomy = getTaxonomy(project.type || 'SaaS', project.mode);
  const lastModified = new Date().toISOString();

  return taxonomy.flatMap((category) =>
    category.topics.map((topic) => ({
      project_id: project.id,
      topic_id: topic.id,
      content: filterModeContent(fallbackContent[topic.id] || '', project.mode),
      last_modified: lastModified,
      user_id: userId,
    }))
  );
}
