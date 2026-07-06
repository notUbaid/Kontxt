import { HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const customProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle)
    ]
  }
];

export const customHackathonTaxonomy: Category[] = customProductionTaxonomy;
export const customPersonalTaxonomy: Category[] = customProductionTaxonomy;
export const customCustomTaxonomy: Category[] = customProductionTaxonomy;
