import type { Mode } from '../components/TopNav';
import type { AppType } from '../App';
import type { Category } from './taxonomies/types';
import { 
  saasProductionTaxonomy, 
  saasHackathonTaxonomy, 
  saasPersonalTaxonomy,
  saasCustomTaxonomy
} from './taxonomies/saas';
import {
  mobileProductionTaxonomy,
  mobileHackathonTaxonomy,
  mobilePersonalTaxonomy,
  mobileCustomTaxonomy
} from './taxonomies/mobile';
import {
  aiProductionTaxonomy,
  aiHackathonTaxonomy,
  aiPersonalTaxonomy,
  aiCustomTaxonomy
} from './taxonomies/ai';
import {
  extensionProductionTaxonomy,
  extensionHackathonTaxonomy,
  extensionPersonalTaxonomy,
  extensionCustomTaxonomy
} from './taxonomies/browser-extension';
import {
  desktopProductionTaxonomy,
  desktopHackathonTaxonomy,
  desktopPersonalTaxonomy,
  desktopCustomTaxonomy
} from './taxonomies/desktop';
import {
  apiProductionTaxonomy,
  apiHackathonTaxonomy,
  apiPersonalTaxonomy,
  apiCustomTaxonomy
} from './taxonomies/api';
import {
  internalToolProductionTaxonomy,
  internalToolHackathonTaxonomy,
  internalToolPersonalTaxonomy,
  internalToolCustomTaxonomy
} from './taxonomies/internal-tool';
import {
  marketplaceProductionTaxonomy,
  marketplaceHackathonTaxonomy,
  marketplacePersonalTaxonomy,
  marketplaceCustomTaxonomy
} from './taxonomies/marketplace';
import {
  ecommerceProductionTaxonomy,
  ecommerceHackathonTaxonomy,
  ecommercePersonalTaxonomy,
  ecommerceCustomTaxonomy
} from './taxonomies/ecommerce';
import {
  gameProductionTaxonomy,
  gameHackathonTaxonomy,
  gamePersonalTaxonomy,
  gameCustomTaxonomy
} from './taxonomies/game';
import {
  webProductionTaxonomy,
  webHackathonTaxonomy,
  webPersonalTaxonomy,
  webCustomTaxonomy
} from './taxonomies/web';

export const getTaxonomy = (appType: AppType | string, mode: Mode): Category[] => {
  const resolvedMode = mode;

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
      switch (mode) {
        case 'Hackathon': return mobileHackathonTaxonomy;
        case 'Personal': return mobilePersonalTaxonomy;

        case 'Production':
        default: return mobileProductionTaxonomy;
      }
    case 'AI Tool':
      switch (mode) {
        case 'Hackathon': return aiHackathonTaxonomy;
        case 'Personal': return aiPersonalTaxonomy;

        case 'Production':
        default: return aiProductionTaxonomy;
      }
    case 'Browser Extension':
      switch (mode) {
        case 'Hackathon': return extensionHackathonTaxonomy;
        case 'Personal': return extensionPersonalTaxonomy;

        case 'Production':
        default: return extensionProductionTaxonomy;
      }
    case 'Desktop App':
      switch (mode) {
        case 'Hackathon': return desktopHackathonTaxonomy;
        case 'Personal': return desktopPersonalTaxonomy;

        case 'Production':
        default: return desktopProductionTaxonomy;
      }
      case 'API Product':
      switch (mode) {
        case 'Hackathon': return apiHackathonTaxonomy;
        case 'Personal': return apiPersonalTaxonomy;

        case 'Production':
        default: return apiProductionTaxonomy;
      }
    case 'Internal Tool':
      switch (mode) {
        case 'Hackathon': return internalToolHackathonTaxonomy;
        case 'Personal': return internalToolPersonalTaxonomy;

        case 'Production':
        default: return internalToolProductionTaxonomy;
      }
    case 'Marketplace':
      switch (mode) {
        case 'Hackathon': return marketplaceHackathonTaxonomy;
        case 'Personal': return marketplacePersonalTaxonomy;

        case 'Production':
        default: return marketplaceProductionTaxonomy;
      }
    case 'E-commerce':
      switch (mode) {
        case 'Hackathon': return ecommerceHackathonTaxonomy;
        case 'Personal': return ecommercePersonalTaxonomy;

        case 'Production':
        default: return ecommerceProductionTaxonomy;
      }
    case 'Game':
      switch (mode) {
        case 'Hackathon': return gameHackathonTaxonomy;
        case 'Personal': return gamePersonalTaxonomy;

        case 'Production':
        default: return gameProductionTaxonomy;
      }
    case 'Web App':
      switch (resolvedMode) {
        case 'Hackathon': return webHackathonTaxonomy;
        case 'Personal': return webPersonalTaxonomy;
        case 'Production': return webProductionTaxonomy;

        default: return webProductionTaxonomy;
      }
    default:
      return saasProductionTaxonomy;
  }
};
