import { mobileProductionTaxonomy, mobileHackathonTaxonomy, mobilePersonalTaxonomy, mobileCustomTaxonomy } from './src/data/taxonomies/mobile';
import fs from 'fs';
import path from 'path';

const taxonomies = {
  Production: mobileCustomTaxonomy,
  Hackathon: mobileHackathonTaxonomy,
  Personal: mobilePersonalTaxonomy
};

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const commands = [];

// Handle renames manually based on my analysis
const renames = [
  ['Mobile-App/Hackathon/authentication-hackathon-mobile-app.md', 'Mobile-App/Hackathon/auth-implementation-hackathon-mobile-app.md'],
  ['Mobile-App/Hackathon/backend-hackathon-mobile-app.md', 'Mobile-App/Hackathon/backend-integration-hackathon-mobile-app.md'],
  ['Mobile-App/Hackathon/database-hackathon-mobile-app.md', 'Mobile-App/Hackathon/database-setup-hackathon-mobile-app.md'],
  ['Mobile-App/Hackathon/loading-hackathon-mobile-app.md', 'Mobile-App/Hackathon/loading-states-hackathon-mobile-app.md'],
  ['Mobile-App/Hackathon/mvp-features-hackathon-mobile-app.md', 'Mobile-App/Hackathon/mvp-hackathon-mobile-app.md'],
  ['Mobile-App/Personal/feedback-personal-mobile-app.md', 'Mobile-App/Personal/user-feedback-personal-mobile-app.md'],
  ['Mobile-App/Personal/state-management-personal-mobile-app.md', 'Mobile-App/Personal/state-management-impl-personal-mobile-app.md']
];

for (const [src, dest] of renames) {
    if (fs.existsSync(path.join('src/data/content', src))) {
        fs.renameSync(path.join('src/data/content', src), path.join('src/data/content', dest));
    }
}

if (fs.existsSync('src/data/content/Mobile-App/Production/sitemap-production-mobile-app.md')) {
    fs.unlinkSync('src/data/content/Mobile-App/Production/sitemap-production-mobile-app.md');
}


for (const [mode, tax] of Object.entries(taxonomies)) {
  const dir = path.join('src/data/content/Mobile-App', mode);
  
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  let actual = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.md')));
  
  for (const cat of tax) {
    const phaseName = cat.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()); // e.g. Phase 3
    for (const topic of cat.topics) {
      const slug = toSlug(topic.name);
      const filename = `${slug}-${mode.toLowerCase()}-mobile-app.md`;
      if (!actual.has(filename)) {
        const filepath = path.join(dir, filename);
        // Create stub
        const content = `---
title: ${topic.name}
slug: ${slug}
phase: ${phaseName}
mode: ${mode.toLowerCase()}
projectType: mobile-app
estimatedTime: 15-25 min
---

# ${topic.name}

(Content coming soon)
`;
        fs.writeFileSync(filepath, content);
        console.log(`Created stub for ${filepath}`);
      }
    }
  }
}
