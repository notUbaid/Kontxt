const fs = require('fs');
const path = require('path');
const dir = './src/data/content/SaaS/Production';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  let originalContent = content;
  
  // Fix nested backticks introduced by previous script
  content = content.replace(/```prompt\n+\s*```/g, '```prompt');
  content = content.replace(/```\n+\s*```/g, '```');
  
  // Clean up legacy callouts that weren't caught (e.g. `> ⚠️ **"We're for everyone"**`)
  content = content.replace(/^>\s*(?:⚠️)?\s*\*\*(.*)\*\*\s*$/gm, '> [!WARNING]\n> **$1**');
  
  if (content !== originalContent) {
    fs.writeFileSync(p, content, 'utf8');
  }
});

console.log('Fixed nested backticks and remaining legacy callouts in Production.');
