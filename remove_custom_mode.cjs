const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'data', 'content', 'fallback.ts');
let content = fs.readFileSync(targetPath, 'utf8');

const lines = content.split('\n');
const result = [];
let insideCustomMode = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('### Custom Mode')) {
    insideCustomMode = true;
    continue;
  }
  
  if (insideCustomMode) {
    if (line.includes('### ') || line.includes('## ') || line.trim() === '```' || line.includes('```input') || line.includes('```prompt')) {
      insideCustomMode = false;
    } else {
      continue;
    }
  }
  
  result.push(line);
}

fs.writeFileSync(targetPath, result.join('\n'));
console.log('Removed Custom Mode sections from fallback.ts');
