import { HelpCircle } from 'lucide-react';
import { type Category, createTopic } from './types';

export const iotProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle)
    ]
  }
];

export const iotHackathonTaxonomy: Category[] = iotProductionTaxonomy;
export const iotPersonalTaxonomy: Category[] = iotProductionTaxonomy;
export const iotCustomTaxonomy: Category[] = iotProductionTaxonomy;
