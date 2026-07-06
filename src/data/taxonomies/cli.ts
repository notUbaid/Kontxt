import { HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const cliProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle)
    ]
  }
];

export const cliHackathonTaxonomy: Category[] = cliProductionTaxonomy;
export const cliPersonalTaxonomy: Category[] = cliProductionTaxonomy;
export const cliCustomTaxonomy: Category[] = cliProductionTaxonomy;
