/**
 * Audit Script: Checks that every topic in the SaaS and Web App taxonomies
 * has a corresponding .md file, and that every .md file is referenced by a topic.
 * Also checks for duplicate files in wrong directories.
 */
import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('src/data/content');
const taxonomyDir = path.resolve('src/data/taxonomies');

// ---------- Helpers ----------

function generateId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function buildExpectedFilename(topicId, mode, appType) {
  return `${topicId}-${mode}-${appType}.md`;
}

// ---------- Parse Taxonomy Files ----------

function extractTopicsFromTaxonomy(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract createTopic calls
  const topicRegex = /createTopic\(\s*'([^']+)'\s*,\s*\w+(?:\s*,\s*\[.*?\])?\s*(?:,\s*'([^']*)')?\s*\)/gs;
  
  const topics = [];
  let match;
  while ((match = topicRegex.exec(content)) !== null) {
    const name = match[1];
    const explicitId = match[2] || null;
    const id = explicitId || generateId(name);
    topics.push({ name, id, explicitId });
  }
  return topics;
}

function extractTaxonomyExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all exported taxonomy arrays and which createTopic calls belong to each
  const results = {};
  
  // Split by export const 
  const exportBlocks = content.split(/export const (\w+)/);
  
  for (let i = 1; i < exportBlocks.length; i += 2) {
    const varName = exportBlocks[i];
    const block = exportBlocks[i + 1];
    
    const topicRegex = /createTopic\(\s*'([^']+)'\s*,\s*\w+(?:\s*,\s*\[[^\]]*\])?\s*(?:,\s*'([^']*)')?\s*\)/gs;
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

// ---------- List MD Files ----------

function listMdFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
}

// ---------- Main Audit ----------

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
const allIssues = [];

for (const appType of appTypes) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`AUDITING: ${appType.name}`);
  console.log(`${'='.repeat(60)}`);
  
  const taxonomyPath = path.join(taxonomyDir, appType.taxonomyFile);
  const allExports = extractTaxonomyExports(taxonomyPath);
  
  for (const mode of modes) {
    console.log(`\n--- ${appType.name} / ${mode} ---`);
    
    const varName = appType.taxonomyVars[mode];
    const topics = allExports[varName] || [];
    
    if (topics.length === 0) {
      console.log(`  WARNING: No topics found for ${varName}`);
      allIssues.push({ type: 'MISSING_TAXONOMY', appType: appType.name, mode, message: `No topics in ${varName}` });
      totalIssues++;
      continue;
    }
    
    console.log(`  Topics in taxonomy: ${topics.length}`);
    
    const contentDirPath = path.join(contentDir, appType.dirName, mode);
    const mdFiles = listMdFiles(contentDirPath);
    console.log(`  MD files on disk: ${mdFiles.length}`);
    
    // Build normalized filename lookup
    const normalizedType = appType.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedMode = mode.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // For each topic, simulate the loader logic
    const matchedFiles = new Set();
    
    for (const topic of topics) {
      const normalizedTopicId = topic.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      const exactMatchString = `${normalizedTopicId}${normalizedMode}${normalizedType}md`;
      
      let foundFile = null;
      for (const file of mdFiles) {
        const normalizedFilename = file.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedFilename === exactMatchString || normalizedFilename.includes(exactMatchString)) {
          foundFile = file;
          break;
        }
      }
      
      if (foundFile) {
        matchedFiles.add(foundFile);
      } else {
        console.log(`  MISSING FILE for topic "${topic.name}" (id: ${topic.id})`);
        console.log(`    Expected normalized: ${exactMatchString}`);
        
        // Try to find close matches
        const closeMatches = mdFiles.filter(f => {
          const nf = f.toLowerCase().replace(/[^a-z0-9]/g, '');
          return nf.includes(normalizedTopicId);
        });
        if (closeMatches.length > 0) {
          console.log(`    Close matches: ${closeMatches.join(', ')}`);
        }
        
        allIssues.push({ type: 'MISSING_FILE', appType: appType.name, mode, topic: topic.name, id: topic.id, expected: exactMatchString });
        totalIssues++;
      }
    }
    
    // Check for orphan files (files not referenced by any topic)
    const orphanFiles = mdFiles.filter(f => !matchedFiles.has(f));
    if (orphanFiles.length > 0) {
      console.log(`  ORPHAN FILES (not referenced by any topic):`);
      for (const f of orphanFiles) {
        console.log(`    - ${f}`);
        allIssues.push({ type: 'ORPHAN_FILE', appType: appType.name, mode, file: f });
        totalIssues++;
      }
    }
  }
}

// ---------- Cross-check for duplicate files ----------
console.log(`\n${'='.repeat(60)}`);
console.log(`CROSS-DIRECTORY DUPLICATE CHECK`);
console.log(`${'='.repeat(60)}`);

for (const appType of appTypes) {
  for (const mode of modes) {
    const dirPath = path.join(contentDir, appType.dirName, mode);
    const files = listMdFiles(dirPath);
    
    for (const file of files) {
      // Check if file belongs to a different mode based on filename
      for (const otherMode of modes) {
        if (otherMode === mode) continue;
        const otherModeNorm = otherMode.toLowerCase();
        if (file.toLowerCase().includes(otherModeNorm)) {
          // It's in the wrong directory
          if (!file.toLowerCase().includes(mode.toLowerCase())) {
            console.log(`  WRONG DIR: ${appType.dirName}/${mode}/${file} seems to belong in ${otherMode}`);
            allIssues.push({ type: 'WRONG_DIRECTORY', appType: appType.name, mode, file, expectedMode: otherMode });
            totalIssues++;
          }
        }
      }
      
      // Check for other app types in filename
      for (const otherApp of appTypes) {
        if (otherApp.name === appType.name) continue;
        const otherAppNorm = otherApp.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const fileNorm = file.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (fileNorm.includes(otherAppNorm)) {
          console.log(`  WRONG APP TYPE: ${appType.dirName}/${mode}/${file} contains "${otherApp.name}" but is in ${appType.name} directory`);
          allIssues.push({ type: 'WRONG_APP_TYPE', appType: appType.name, mode, file, containsType: otherApp.name });
          totalIssues++;
        }
      }
    }
  }
}

// ---------- Check for ambiguous ID matches (substring collision) ----------
console.log(`\n${'='.repeat(60)}`);
console.log(`AMBIGUOUS ID COLLISION CHECK`);
console.log(`${'='.repeat(60)}`);

for (const appType of appTypes) {
  const taxonomyPath = path.join(taxonomyDir, appType.taxonomyFile);
  const allExports = extractTaxonomyExports(taxonomyPath);
  
  for (const mode of modes) {
    const varName = appType.taxonomyVars[mode];
    const topics = allExports[varName] || [];
    
    const contentDirPath = path.join(contentDir, appType.dirName, mode);
    const mdFiles = listMdFiles(contentDirPath);
    const normalizedType = appType.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalizedMode = mode.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if any topic ID is a substring of another
    for (let i = 0; i < topics.length; i++) {
      for (let j = 0; j < topics.length; j++) {
        if (i === j) continue;
        const idA = topics[i].id;
        const idB = topics[j].id;
        if (idB.includes(idA) && idA !== idB) {
          // Now check if this actually causes a matching problem
          const exactMatchA = `${idA}${normalizedMode}${normalizedType}md`;
          const exactMatchB = `${idB}${normalizedMode}${normalizedType}md`;
          
          // The loader does: normalizedFilename === exactMatchString || normalizedFilename.includes(exactMatchString)
          // So if fileB.includes(exactMatchA), topicA might match fileB
          for (const file of mdFiles) {
            const normalizedFilename = file.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (normalizedFilename.includes(exactMatchA) && normalizedFilename !== exactMatchA) {
              console.log(`  COLLISION: "${topics[i].name}" (${idA}) could wrongly match file "${file}"`);
              console.log(`    because "${exactMatchA}" is substring of "${normalizedFilename}"`);
              console.log(`    Intended for: "${topics[j].name}" (${idB})`);
              allIssues.push({ 
                type: 'ID_COLLISION', 
                appType: appType.name, 
                mode, 
                topicA: topics[i].name, 
                topicB: topics[j].name,
                idA, idB, file 
              });
              totalIssues++;
            }
          }
        }
      }
    }
  }
}

// ---------- Summary ----------
console.log(`\n${'='.repeat(60)}`);
console.log(`SUMMARY: ${totalIssues} issues found`);
console.log(`${'='.repeat(60)}`);

const issuesByType = {};
for (const issue of allIssues) {
  issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
}
for (const [type, count] of Object.entries(issuesByType)) {
  console.log(`  ${type}: ${count}`);
}
