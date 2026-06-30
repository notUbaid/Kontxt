import fs from 'fs';
const files = ['ai.ts', 'mobile.ts'];

for (const file of files) {
  const path = 'src/data/taxonomies/' + file;
  let code = fs.readFileSync(path, 'utf8');
  if (!code.includes('HelpCircle')) {
    code = code.replace(/}\s*from\s*'lucide-react';/, ", HelpCircle } from 'lucide-react';");
    fs.writeFileSync(path, code);
  }
}
console.log('Fixed imports');
