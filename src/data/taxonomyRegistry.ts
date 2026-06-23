import type { Mode } from '../components/TopNav';
import type { AppType } from '../App';
import type { Category } from './taxonomies/types';
import { 
  saasProductionTaxonomy, 
  saasHackathonTaxonomy, 
  saasPersonalTaxonomy 
} from './taxonomies/saas';
import { emptyTaxonomy } from './taxonomies/stubs';

export const getTaxonomy = (appType: AppType | string, mode: Mode): Category[] => {
  // If a user selects "Custom" mode, we typically unlock the full Production blueprint
  // for that specific app type so they have access to everything.
  const resolvedMode = mode === 'Custom' ? 'Production' : mode;

  switch (appType) {
    case 'SaaS':
      switch (resolvedMode) {
        case 'Hackathon': return saasHackathonTaxonomy;
        case 'Personal': return saasPersonalTaxonomy;
        case 'Production': return saasProductionTaxonomy;
        default: return saasProductionTaxonomy;
      }
    
    // As the 12 new types are provided, they will be registered here.
    case 'Mobile App':
    case 'Web App':
    case 'AI Tool':
    case 'Browser Extension':
    case 'Desktop App':
    case 'API Product':
    case 'Internal Tool':
    case 'Marketplace':
    case 'E-commerce':
    case 'Game':
    case 'Hackathon Project':
    case 'Open Source Project':
      return emptyTaxonomy;
      
    default:
      return saasProductionTaxonomy;
  }
};
