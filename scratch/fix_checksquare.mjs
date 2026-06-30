import fs from 'fs';
import path from 'path';

const files = ['cyber-blue.ts', 'cyber-devsecops.ts', 'cyber-red.ts'];
for (const f of files) {
  const p = path.join('src/data/taxonomies', f);
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('CheckSquare,')) {
    c = c.replace(/import\s*\{\s*/, "import { CheckSquare, ");
    fs.writeFileSync(p, c);
  }
}
console.log('Fixed CheckSquare');
