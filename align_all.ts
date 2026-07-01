import fs from 'fs';
import path from 'path';

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
    suffix: 'e-commerce', // Notice: in the actual files it might be e-commerce or ecommerce.
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

const renames = [
  ['Web-App/Hackathon/backend-hackathon-web-app.md', 'Web-App/Hackathon/backend-integration-hackathon-web-app.md'],
  ['Marketplace/Personal/chicken-and-egg-strategy-personal-marketplace.md', 'Marketplace/Personal/chicken-egg-strategy-personal-marketplace.md']
];

for (const [src, dest] of renames) {
    if (fs.existsSync(path.join('src/data/content', src))) {
        fs.renameSync(path.join('src/data/content', src), path.join('src/data/content', dest));
    }
}

for (const proj of projects) {
  for (const [mode, tax] of Object.entries(proj.taxonomies)) {
    if (!tax) continue;
    
    const dir = path.join('src/data/content', proj.folder, mode);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    let actual = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.md')));
    
    for (const cat of tax) {
      const phaseName = cat.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      for (const topic of cat.topics) {
        
        let suffix = proj.suffix;
        // Handle E-commerce suffix weirdness
        if (proj.name === 'E-commerce' && mode === 'Personal') suffix = 'ecommerce'; // from previous git status
        else if (proj.name === 'E-commerce') suffix = 'e-commerce';

        const slug = toSlug(topic.name);
        const filename = `${slug}-${mode.toLowerCase()}-${suffix}.md`;
        
        if (!actual.has(filename)) {
          const filepath = path.join(dir, filename);
          const content = `---
title: ${topic.name}
slug: ${slug}
phase: ${phaseName}
mode: ${mode.toLowerCase()}
projectType: ${proj.suffix}
estimatedTime: 15-25 min
---

# ${topic.name}

(Content coming soon)
`;
          fs.writeFileSync(filepath, content);
          console.log(`Created stub: ${filepath}`);
        }
      }
    }
  }
}
