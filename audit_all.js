import fs from 'fs';
import path from 'path';

const taxonomiesDir = 'src/data/taxonomies';
const contentDir = 'src/data/content';

const taxFiles = fs.readdirSync(taxonomiesDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'fallback.ts');

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

console.log('--- TAXONOMY AUDIT ---');

// We will write a small script that transpiles/evaluates each taxonomy and checks its expected vs actual files.
// Since evaluating TS files with complex imports inside a generic script can be tricky, 
// let's create a dynamic TSX script that we can run.
