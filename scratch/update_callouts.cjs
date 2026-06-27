const fs = require('fs');
const path = require('path');
const dir = './src/data/content/SaaS/Hackathon';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let processed = 0;

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  
  // Convert > **Warning** to > [!WARNING]
  content = content.replace(/^>\s*\*\*(Warning|WARNING)\*\*\s*(\n>)?/gm, '> [!WARNING]\n>');
  
  // Convert > **Tip** to > [!TIP]
  content = content.replace(/^>\s*\*\*(Tip|TIP)\*\*\s*(\n>)?/gm, '> [!TIP]\n>');
  
  // Convert > **Rule** to > [!IMPORTANT]
  content = content.replace(/^>\s*\*\*(Rule|RULE)\*\*\s*(\n>)?/gm, '> [!IMPORTANT]\n>');
  
  // Clean up any double empty blockquote lines `> \n> \n`
  content = content.replace(/(>\s*\n){2,}/g, '>\n');
  
  fs.writeFileSync(p, content, 'utf8');
  processed++;
});

console.log(`Processed ${processed} files.`);
