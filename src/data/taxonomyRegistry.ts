import type { Mode } from '../components/TopNav';
import type { AppType } from '../App';
import type { Category } from './taxonomies/types';
import { 
  saasProductionTaxonomy, 
  saasHackathonTaxonomy, 
  saasPersonalTaxonomy
} from './taxonomies/saas';
import {
  mobileProductionTaxonomy,
  mobileHackathonTaxonomy,
  mobilePersonalTaxonomy
} from './taxonomies/mobile';
import {
  aiProductionTaxonomy,
  aiHackathonTaxonomy,
  aiPersonalTaxonomy
} from './taxonomies/ai';
import {
  extensionProductionTaxonomy,
  extensionHackathonTaxonomy,
  extensionPersonalTaxonomy
} from './taxonomies/browser-extension';
import {
  desktopProductionTaxonomy,
  desktopHackathonTaxonomy,
  desktopPersonalTaxonomy
} from './taxonomies/desktop';
import {
  apiProductionTaxonomy,
  apiHackathonTaxonomy,
  apiPersonalTaxonomy
} from './taxonomies/api';
import {
  internalToolProductionTaxonomy,
  internalToolHackathonTaxonomy,
  internalToolPersonalTaxonomy
} from './taxonomies/internal-tool';
import {
  marketplaceProductionTaxonomy,
  marketplaceHackathonTaxonomy,
  marketplacePersonalTaxonomy
} from './taxonomies/marketplace';
import {
  ecommerceProductionTaxonomy,
  ecommerceHackathonTaxonomy,
  ecommercePersonalTaxonomy
} from './taxonomies/ecommerce';
import {
  gameProductionTaxonomy,
  gameHackathonTaxonomy,
  gamePersonalTaxonomy
} from './taxonomies/game';
import {
  webProductionTaxonomy,
  webHackathonTaxonomy,
  webPersonalTaxonomy
} from './taxonomies/web';
import {
  cyberRedProductionTaxonomy,
  cyberRedHackathonTaxonomy,
  cyberRedPersonalTaxonomy
} from './taxonomies/cyber-red';
import {
  cyberBlueProductionTaxonomy,
  cyberBlueHackathonTaxonomy,
  cyberBluePersonalTaxonomy
} from './taxonomies/cyber-blue';
import {
  cyberDevSecOpsProductionTaxonomy,
  cyberDevSecOpsHackathonTaxonomy,
  cyberDevSecOpsPersonalTaxonomy
} from './taxonomies/cyber-devsecops';
import {
  web3ProductionTaxonomy,
  web3HackathonTaxonomy,
  web3PersonalTaxonomy
} from './taxonomies/web3';
import {
  dataPipelineProductionTaxonomy,
  dataPipelineHackathonTaxonomy,
  dataPipelinePersonalTaxonomy
} from './taxonomies/data-pipeline';

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
    case 'Cyber Security (Offensive)':
      switch (resolvedMode) {
        case 'Hackathon': return cyberRedHackathonTaxonomy;
        case 'Personal': return cyberRedPersonalTaxonomy;
        case 'Production': return cyberRedProductionTaxonomy;
        default: return cyberRedProductionTaxonomy;
      }
    case 'Cyber Security (Defensive)':
      switch (resolvedMode) {
        case 'Hackathon': return cyberBlueHackathonTaxonomy;
        case 'Personal': return cyberBluePersonalTaxonomy;
        case 'Production': return cyberBlueProductionTaxonomy;
        default: return cyberBlueProductionTaxonomy;
      }
    case 'Cyber Security (DevSecOps)':
      switch (resolvedMode) {
        case 'Hackathon': return cyberDevSecOpsHackathonTaxonomy;
        case 'Personal': return cyberDevSecOpsPersonalTaxonomy;
        case 'Production': return cyberDevSecOpsProductionTaxonomy;
        default: return cyberDevSecOpsProductionTaxonomy;
      }
    case 'Web3 dApp':
      switch (resolvedMode) {
        case 'Hackathon': return web3HackathonTaxonomy;
        case 'Personal': return web3PersonalTaxonomy;
        case 'Production': return web3ProductionTaxonomy;
        default: return web3ProductionTaxonomy;
      }
    case 'Data Pipeline':
      switch (resolvedMode) {
        case 'Hackathon': return dataPipelineHackathonTaxonomy;
        case 'Personal': return dataPipelinePersonalTaxonomy;
        case 'Production': return dataPipelineProductionTaxonomy;
        default: return dataPipelineProductionTaxonomy;
      }
    default:
      return saasProductionTaxonomy;
  }
};
