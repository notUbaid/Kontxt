import * as ai from './src/data/taxonomies/ai';
import fs from 'fs';
import path from 'path';

const taxonomies = {};
if (ai.aiProductionTaxonomy) taxonomies['Production'] = ai.aiProductionTaxonomy;
if (ai.aiHackathonTaxonomy) taxonomies['Hackathon'] = ai.aiHackathonTaxonomy;
if (ai.aiPersonalTaxonomy) taxonomies['Personal'] = ai.aiPersonalTaxonomy;
if (ai.aiCustomTaxonomy) taxonomies['Production'] = ai.aiCustomTaxonomy;

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

for (const [mode, tax] of Object.entries(taxonomies)) {
  const expected = new Set();
  for (const cat of tax) {
    for (const topic of cat.topics) {
      expected.add(toSlug(topic.name) + '-' + mode.toLowerCase() + '-ai-tool.md');
    }
  }
  
  const dir = path.join('src/data/content/AI-Tool', mode);
  
  let actual = new Set();
  if (fs.existsSync(dir)) {
    actual = new Set(fs.readdirSync(dir).filter(f => f.endsWith('.md')));
  }
  
  const missing = [...expected].filter(x => !actual.has(x));
  const extra = [...actual].filter(x => !expected.has(x));
  
  console.log(`\n=== ${mode} ===`);
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
