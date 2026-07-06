import { HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const openSourceProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle)
    ]
  }
];

export const openSourceHackathonTaxonomy: Category[] = openSourceProductionTaxonomy;
export const openSourcePersonalTaxonomy: Category[] = openSourceProductionTaxonomy;
export const openSourceCustomTaxonomy: Category[] = openSourceProductionTaxonomy;
