const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'src', 'data', 'content');
const taxonomiesDir = path.join(process.cwd(), 'src', 'data', 'taxonomies');

const appTypeMap = {
  'saas.ts': 'SaaS',
  'mobile.ts': 'Mobile-App',
  'web.ts': 'Web-App',
  'api.ts': 'API Product'
};

function generateId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}
function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

for (const [taxFile, appType] of Object.entries(appTypeMap)) {
  const tsContent = fs.readFileSync(path.join(taxonomiesDir, taxFile), 'utf-8');
  
  const allTaxonomiesMatches = [...tsContent.matchAll(/export const ([a-zA-Z]+)(Production|Hackathon|Personal|Agency|Technical|Mode)Taxonomy\s*:\s*Category\[\]\s*=\s*\[([\s\S]*?)\];/g)];
  
  for (const match of allTaxonomiesMatches) {
    const mode = match[2];
    const modeContent = match[3];
    const createTopicMatches = [...modeContent.matchAll(/createTopic\(\s*'([^']+)'/g)];
    const expectedIds = createTopicMatches.map(m => generateId(m[1]));
    const expectedNormals = createTopicMatches.map(m => normalizeName(m[1]));
    
    const modeDir = path.join(contentDir, appType, mode);
    if (!fs.existsSync(modeDir)) continue;
    
    const files = fs.readdirSync(modeDir).filter(f => f.endsWith('.md'));
    
    for (const f of files) {
      const isMapped = expectedIds.some(id => f.startsWith(id + '-')) || expectedNormals.some(norm => f.startsWith(norm + '-'));
      if (!isMapped) {
        console.log(`Unmapped file found: ${appType}/${mode}/${f}`);
      }
    }
  }
}
