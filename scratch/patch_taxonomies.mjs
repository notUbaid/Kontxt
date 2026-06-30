import fs from 'fs';
import path from 'path';

const dir = path.resolve('src/data/taxonomies');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let original = content;

  // 1. HelpCircle import
  if (!content.includes('HelpCircle')) {
    content = content.replace(/}\s*from\s*'lucide-react';/, ", HelpCircle } from 'lucide-react';");
  }

  // 2. Welcome in first topics array
  if (!content.includes("'Welcome'")) {
    content = content.replace(/topics:\s*\[/, "topics: [\n      createTopic('Welcome', HelpCircle),");
  }

  // 3. Demo Script and Submission Checklist
  if (!content.includes("'Demo Script'") && content.includes("'Pitch Deck'")) {
    content = content.replace(/createTopic\('Pitch Deck',\s*\w+\),/g, "createTopic('Pitch Deck', Presentation),\n      createTopic('Presentation Prep', Presentation),\n      createTopic('Demo Script', FileText),\n      createTopic('Submission Checklist', CheckSquare),");
    
    if (!content.includes('Presentation')) content = content.replace(/}\s*from\s*'lucide-react';/, ", Presentation } from 'lucide-react';");
    if (!content.includes('FileText')) content = content.replace(/}\s*from\s*'lucide-react';/, ", FileText } from 'lucide-react';");
    if (!content.includes('CheckSquare')) content = content.replace(/}\s*from\s*'lucide-react';/, ", CheckSquare } from 'lucide-react';");
  }

  // 4. Ensure Welcome, Demo Script, etc. are in Hackathon filter keep array
  const hackathonRegex = /(export const \w+HackathonTaxonomy[\s\S]*?filterTaxonomy\(\s*\[)([\s\S]*?)(\])/g;
  content = content.replace(hackathonRegex, (match, p1, keepArrayStr, p3) => {
    let newKeep = keepArrayStr;
    if (!newKeep.includes("'Welcome'")) newKeep = "\n    'Welcome'," + newKeep;
    if (!newKeep.includes("'Demo Script'")) newKeep += " 'Presentation Prep', 'Demo Script', 'Submission Checklist',";
    return p1 + newKeep + p3;
  });

  if (content !== original) {
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed', file);
  }
}
