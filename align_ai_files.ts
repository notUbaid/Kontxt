import * as ai from './src/data/taxonomies/ai';
import fs from 'fs';
import path from 'path';

const taxonomies = {
  Production: ai.aiCustomTaxonomy,
  Hackathon: ai.aiHackathonTaxonomy,
  Personal: ai.aiPersonalTaxonomy
};

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const renames = [
  ['AI-Tool/Hackathon/trust-and-transparency-hackathon-ai-tool.md', 'AI-Tool/Hackathon/trust-transparency-hackathon-ai-tool.md'],
  ['AI-Tool/Personal/trust-and-transparency-personal-ai-tool.md', 'AI-Tool/Personal/trust-transparency-personal-ai-tool.md'],
  ['AI-Tool/Personal/analytics-personal-ai-tool.md', 'AI-Tool/Personal/growth-analytics-personal-ai-tool.md']
];

for (const [src, dest] of renames) {
    if (fs.existsSync(path.join('src/data/content', src))) {
        fs.renameSync(path.join('src/data/content', src), path.join('src/data/content', dest));
    }
}

for (const [mode, tax] of Object.entries(taxonomies)) {
  const dir = path.join('src/data/content/AI-Tool', mode);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  let actual = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.md')));
  
  for (const cat of tax) {
    const phaseName = cat.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // e.g. Phase 0 Ai Discovery
    for (const topic of cat.topics) {
      const slug = toSlug(topic.name);
      const filename = `${slug}-${mode.toLowerCase()}-ai-tool.md`;
      if (!actual.has(filename)) {
        const filepath = path.join(dir, filename);
        // Create stub
        const content = `---
title: ${topic.name}
slug: ${slug}
phase: ${phaseName}
mode: ${mode.toLowerCase()}
projectType: ai-tool
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
