import fs from 'fs';
import path from 'path';

const files = ['cyber-blue.ts', 'cyber-devsecops.ts', 'cyber-red.ts', 'data-pipeline.ts', 'web3.ts'];
for (const f of files) {
  const p = path.join('src/data/taxonomies', f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/'\s*'Presentation Prep'/, "',\n    'Presentation Prep'");
  fs.writeFileSync(p, c);
}
console.log('Fixed commas');
