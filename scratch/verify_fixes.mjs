/**
 * Verification audit: uses the FIXED matching logic (dual-match strategy)
 */
import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('src/data/content');
const taxonomyDir = path.resolve('src/data/taxonomies');

function generateId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function extractTaxonomyExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const results = {};
  const exportBlocks = content.split(/export const (\w+)/);
  
  for (let i = 1; i < exportBlocks.length; i += 2) {
    const varName = exportBlocks[i];
    const block = exportBlocks[i + 1];
    const topicRegex = /createTopic\(\s*'([^']+)'\s*,\s*\w+(?:\s*,\s*\[[\s\S]*?\])?\s*(?:,\s*'([^']*)')?\s*\)/g;
    const topics = [];
    let match;
    while ((match = topicRegex.exec(block)) !== null) {
      const name = match[1];
      const explicitId = match[2] || null;
      const id = explicitId || generateId(name);
      topics.push({ name, id, explicitId });
    }
    results[varName] = topics;
  }
  return results;
}

function listMdFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
}

// Simulate the FIXED content loader logic
function simulateFixedLoader(topicId, mode, appType, mdFiles) {
  const normalizedType = appType.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedMode = mode.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedTopicId = topicId.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // NEW: dual match strategy
  const matchWithContext = `${normalizedTopicId}${normalizedMode}${normalizedType}md`;
  const matchDirect = `${normalizedTopicId}md`;
  
  for (const file of mdFiles) {
    const normalizedFilename = file.toLowerCase().replace(/[^a-z0-9]/g, '');
    // NEW: exact equality only, no .includes()
    if (normalizedFilename === matchWithContext || normalizedFilename === matchDirect) {
      return { matchedFile: file, matchType: normalizedFilename === matchWithContext ? 'context' : 'direct' };
    }
  }
  
  return { matchedFile: null, matchType: null };
}

const appTypes = [
  { name: 'SaaS', dirName: 'SaaS', taxonomyFile: 'saas.ts', taxonomyVars: {
    Production: 'saasProductionTaxonomy',
    Hackathon: 'saasHackathonTaxonomy',
    Personal: 'saasPersonalTaxonomy',
  }},
  { name: 'Web App', dirName: 'Web-App', taxonomyFile: 'web.ts', taxonomyVars: {
    Production: 'webProductionTaxonomy',
    Hackathon: 'webHackathonTaxonomy',
    Personal: 'webPersonalTaxonomy',
  }},
];

const modes = ['Production', 'Hackathon', 'Personal'];
let totalIssues = 0;

for (const appType of appTypes) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${appType.name}`);
  console.log(`${'='.repeat(60)}`);
  
  const taxonomyPath = path.join(taxonomyDir, appType.taxonomyFile);
  const allExports = extractTaxonomyExports(taxonomyPath);
  
  for (const mode of modes) {
    const varName = appType.taxonomyVars[mode];
    const topics = allExports[varName] || [];
    const contentDirPath = path.join(contentDir, appType.dirName, mode);
    const mdFiles = listMdFiles(contentDirPath);
    
    const matchedFiles = new Set();
    const issues = [];
    
    for (const topic of topics) {
      const result = simulateFixedLoader(topic.id, mode, appType.name, mdFiles);
      if (result.matchedFile) {
        matchedFiles.add(result.matchedFile);
      } else {
        issues.push(`  ❌ MISSING: "${topic.name}" (id=${topic.id})`);
      }
    }
    
    const orphans = mdFiles.filter(f => !matchedFiles.has(f));
    
    const status = issues.length === 0 && orphans.length === 0 ? '✅' : '⚠️';
    console.log(`\n${status} ${mode}: ${topics.length} topics, ${mdFiles.length} files, ${matchedFiles.size} matched`);
    
    for (const issue of issues) {
      console.log(issue);
      totalIssues++;
    }
    
    for (const f of orphans) {
      console.log(`  ⚠️  ORPHAN: ${f}`);
      totalIssues++;
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`TOTAL REMAINING ISSUES: ${totalIssues}`);
console.log(`${'='.repeat(60)}`);
