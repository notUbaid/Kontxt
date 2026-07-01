import fs from 'fs';
import path from 'path';

// Import all taxonomies
import * as saas from './src/data/taxonomies/saas';
import * as web from './src/data/taxonomies/web';
import * as ecommerce from './src/data/taxonomies/ecommerce';
import * as marketplace from './src/data/taxonomies/marketplace';
import * as api from './src/data/taxonomies/api';

const projects = [
  {
    name: 'SaaS',
    folder: 'SaaS',
    suffix: 'saas',
    taxonomies: {
      Production: saas.saasCustomTaxonomy || saas.saasProductionTaxonomy,
      Hackathon: saas.saasHackathonTaxonomy,
      Personal: saas.saasPersonalTaxonomy
    }
  },
  {
    name: 'Web-App',
    folder: 'Web-App',
    suffix: 'web-app',
    taxonomies: {
      Production: web.webCustomTaxonomy || web.webProductionTaxonomy,
      Hackathon: web.webHackathonTaxonomy,
      Personal: web.webPersonalTaxonomy
    }
  },
  {
    name: 'E-commerce',
    folder: 'E-commerce',
    suffix: 'e-commerce',
    taxonomies: {
      Production: ecommerce.ecommerceCustomTaxonomy || ecommerce.ecommerceProductionTaxonomy,
      Hackathon: ecommerce.ecommerceHackathonTaxonomy,
      Personal: ecommerce.ecommercePersonalTaxonomy
    }
  },
  {
    name: 'Marketplace',
    folder: 'Marketplace',
    suffix: 'marketplace',
    taxonomies: {
      Production: marketplace.marketplaceCustomTaxonomy || marketplace.marketplaceProductionTaxonomy,
      Hackathon: marketplace.marketplaceHackathonTaxonomy,
      Personal: marketplace.marketplacePersonalTaxonomy
    }
  },
  {
    name: 'API Product',
    folder: 'API Product',
    suffix: 'api-product',
    taxonomies: {
      Production: api.apiCustomTaxonomy || api.apiProductionTaxonomy,
      Hackathon: api.apiHackathonTaxonomy,
      Personal: api.apiPersonalTaxonomy
    }
  }
];

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

for (const proj of projects) {
  console.log(`\n\n========== ${proj.name} ==========`);
  
  for (const [mode, tax] of Object.entries(proj.taxonomies)) {
    if (!tax) {
      console.log(`[!] Taxonomy for ${proj.name} - ${mode} is undefined.`);
      continue;
    }
    
    const expected = new Set();
    for (const cat of tax) {
      for (const topic of cat.topics) {
        // Kontxt usually formats slugs like: slug-mode-projectType.md
        // but ecommerce is e-commerce, api is api-product
        let suffix = proj.suffix;
        if (proj.name === 'E-commerce' && mode === 'Personal') {
           // there's some inconsistencies with ecommerce vs e-commerce, but let's assume proj.suffix is standard
        }
        
        expected.add(toSlug(topic.name) + '-' + mode.toLowerCase() + '-' + suffix + '.md');
      }
    }
    
    const dir = path.join('src/data/content', proj.folder, mode);
    
    let actual = new Set();
    if (fs.existsSync(dir)) {
      actual = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.md')));
    }
    
    const missing = [...expected].filter(x => !actual.has(x));
    const extra = [...actual].filter(x => !expected.has(x));
    
    console.log(`\n--- ${mode} ---`);
    console.log(`Expected: ${expected.size}`);
    console.log(`Actual: ${actual.size}`);
    
    if (missing.length > 0) {
      console.log(`Missing (${missing.length}):`);
      missing.sort().forEach(x => console.log('  ' + x));
    }
    if (extra.length > 0) {
      console.log(`Extra (${extra.length}):`);
      extra.sort().forEach(x => console.log('  ' + x));
    }
  }
}
