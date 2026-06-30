import fs from 'fs';
import path from 'path';

const taxonomiesDir = path.resolve('src/data/taxonomies');
const files = fs.readdirSync(taxonomiesDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

let missingWelcome = [];
let missingDemoScript = [];

for (const file of files) {
  const text = fs.readFileSync(path.join(taxonomiesDir, file), 'utf8');
  if (!text.includes("'Welcome'")) missingWelcome.push(file);
  if (!text.includes("createTopic('Demo Script'")) missingDemoScript.push(file);
}

console.log('Missing Welcome:', missingWelcome);
console.log('Missing Demo Script:', missingDemoScript);
