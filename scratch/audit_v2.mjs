/**
 * Focused audit: Only SaaS + Web App issues, written to a file for readability.
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
    
    // Handle multi-line createTopic calls
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

// Simulate the exact content loader logic from useDocumentStore.ts
function simulateContentLoader(topicId, mode, appType, mdFiles, dirPath) {
  const normalizedType = appType.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedMode = mode.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normalizedTopicId = topicId.toLowerCase().replace(/[^a-z0-9]/g, '');
  const exactMatchString = `${normalizedTopicId}${normalizedMode}${normalizedType}md`;
  
  let matchedFile = null;
  let matchType = null;
  
  for (const file of mdFiles) {
    const normalizedFilename = file.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Simulate: path includes mode AND type (directory already handles this)
    // Then check filename match
    if (normalizedFilename === exactMatchString) {
      matchedFile = file;
      matchType = 'exact';
      break;
    } else if (normalizedFilename.includes(exactMatchString)) {
      matchedFile = file;
      matchType = 'substring';
      break;  // First match wins (order dependent!)
    }
  }
  
  return { matchedFile, matchType, exactMatchString };
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
const output = [];

for (const appType of appTypes) {
  output.push(`\n${'='.repeat(70)}`);
  output.push(`AUDITING: ${appType.name}`);
  output.push(`${'='.repeat(70)}`);
  
  const taxonomyPath = path.join(taxonomyDir, appType.taxonomyFile);
  const allExports = extractTaxonomyExports(taxonomyPath);
  
  for (const mode of modes) {
    output.push(`\n--- ${appType.name} / ${mode} ---`);
    
    const varName = appType.taxonomyVars[mode];
    const topics = allExports[varName] || [];
    
    const contentDirPath = path.join(contentDir, appType.dirName, mode);
    const mdFiles = listMdFiles(contentDirPath);
    
    output.push(`  Topics: ${topics.length} | MD Files: ${mdFiles.length}`);
    
    const matchedFiles = new Set();
    const missingTopics = [];
    const wrongMatches = [];
    
    for (const topic of topics) {
      const result = simulateContentLoader(topic.id, mode, appType.name, mdFiles, contentDirPath);
      
      if (result.matchedFile) {
        matchedFiles.add(result.matchedFile);
        if (result.matchType === 'substring') {
          wrongMatches.push({ topic, file: result.matchedFile, expected: result.exactMatchString });
        }
      } else {
        missingTopics.push({ topic, expected: result.exactMatchString });
      }
    }
    
    if (missingTopics.length > 0) {
      output.push(`  MISSING (${missingTopics.length}):`);
      for (const { topic, expected } of missingTopics) {
        const closeMatches = mdFiles.filter(f => {
          const nf = f.toLowerCase().replace(/[^a-z0-9]/g, '');
          const nid = topic.id.toLowerCase().replace(/[^a-z0-9]/g, '');
          return nf.includes(nid);
        });
        output.push(`    Topic: "${topic.name}" (id=${topic.id})`);
        output.push(`      Loader looks for: ${expected}`);
        if (closeMatches.length > 0) {
          output.push(`      Close files: ${closeMatches.join(', ')}`);
        }
      }
    }
    
    if (wrongMatches.length > 0) {
      output.push(`  SUBSTRING MATCHES (risky) (${wrongMatches.length}):`);
      for (const { topic, file, expected } of wrongMatches) {
        output.push(`    Topic: "${topic.name}" matched "${file}" via substring`);
      }
    }
    
    const orphans = mdFiles.filter(f => !matchedFiles.has(f));
    if (orphans.length > 0) {
      output.push(`  ORPHAN FILES (${orphans.length}):`);
      for (const f of orphans) {
        output.push(`    - ${f}`);
      }
    }
    
    if (missingTopics.length === 0 && wrongMatches.length === 0 && orphans.length === 0) {
      output.push(`  ✓ All topics match correctly!`);
    }
  }
}

// Content quality checks
output.push(`\n${'='.repeat(70)}`);
output.push(`CONTENT QUALITY CHECKS`);
output.push(`${'='.repeat(70)}`);

for (const appType of appTypes) {
  for (const mode of modes) {
    const contentDirPath = path.join(contentDir, appType.dirName, mode);
    const mdFiles = listMdFiles(contentDirPath);
    
    for (const file of mdFiles) {
      const filePath = path.join(contentDirPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Check for emojis
      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{231A}\u{231B}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{25AA}\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2614}\u{2615}\u{2648}-\u{2653}\u{267F}\u{2693}\u{26A1}\u{26AA}\u{26AB}\u{26BD}\u{26BE}\u{26C4}\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}]/gu;
      const emojiMatches = content.match(emojiRegex);
      if (emojiMatches) {
        output.push(`  EMOJIS in ${appType.dirName}/${mode}/${file}: ${[...new Set(emojiMatches)].join(' ')}`);
      }
      
      // Check for frontmatter
      if (!content.startsWith('---')) {
        output.push(`  NO FRONTMATTER: ${appType.dirName}/${mode}/${file}`);
      }
      
      // Check for empty files or very small
      if (content.length < 100) {
        output.push(`  VERY SHORT: ${appType.dirName}/${mode}/${file} (${content.length} chars)`);
      }
      
      // Check for clock emoji specifically
      if (content.includes('🕒')) {
        output.push(`  CLOCK EMOJI: ${appType.dirName}/${mode}/${file}`);
      }
      
      // Check for broken prompt blocks
      if (content.includes('```prompt') || content.includes('````prompt')) {
        // This is fine
      }
      if (content.includes('> **Copy Prompt**')) {
        output.push(`  LEGACY PROMPT BLOCK: ${appType.dirName}/${mode}/${file}`);
      }
      
      // Check for missing H1
      if (!content.match(/^# .+/m)) {
        output.push(`  NO H1: ${appType.dirName}/${mode}/${file}`);
      }

      // Check for estimated time
      if (!content.match(/\*\*Estimated Time/i)) {
        output.push(`  NO ESTIMATED TIME: ${appType.dirName}/${mode}/${file}`);
      }
      
      // Check for checklist vs bullet misuse
      // Checklist outside of ## Checklist heading
      const lines = content.split('\n');
      let inChecklistSection = false;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^##\s+.*checklist/i)) {
          inChecklistSection = true;
        } else if (lines[i].match(/^##\s/) && inChecklistSection) {
          inChecklistSection = false;
        }
        if (!inChecklistSection && lines[i].match(/^- \[[ x]\]/)) {
          // Found checklist item outside of checklist section
          // Only flag first occurrence
          output.push(`  CHECKLIST OUTSIDE SECTION: ${appType.dirName}/${mode}/${file} line ${i+1}: ${lines[i].substring(0, 60)}`);
          break;
        }
      }
    }
  }
}

const result = output.join('\n');
fs.writeFileSync('scratch/audit_results.txt', result);
console.log(result);
console.log(`\nFull results written to scratch/audit_results.txt`);
