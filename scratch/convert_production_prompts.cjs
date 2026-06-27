const fs = require('fs');
const path = require('path');
const dir = './src/data/content/SaaS/Production';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let processed = 0;

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  let originalContent = content;
  
  // Find `> **Copy Prompt...**` and the following blockquote lines and convert to ```prompt
  // This regex matches `> **Copy Prompt` until the end of the blockquote (the first double newline not starting with `>`)
  // We can just iterate line by line to reliably parse blockquotes.
  
  let lines = content.split('\n');
  let newLines = [];
  let inPrompt = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.match(/^>\s*\*\*(Copy Prompt|Prompt).*\*\*/i)) {
      inPrompt = true;
      newLines.push('```prompt');
      continue;
    }
    
    if (inPrompt) {
      if (line.startsWith('>')) {
        // Remove the leading `> ` or `>`
        newLines.push(line.replace(/^>\s?/, ''));
      } else if (line.trim() === '') {
        // If it's empty, and the next line doesn't start with `>`, it's the end of the prompt
        if (i + 1 < lines.length && !lines[i + 1].startsWith('>')) {
          inPrompt = false;
          newLines.push('```');
          newLines.push('');
        } else {
          newLines.push('');
        }
      } else {
        // Broken out of blockquote without an empty line
        inPrompt = false;
        newLines.push('```');
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  // Just in case file ended while in prompt
  if (inPrompt) {
    newLines.push('```');
  }
  
  content = newLines.join('\n');
  
  if (content !== originalContent) {
    fs.writeFileSync(p, content, 'utf8');
    processed++;
  }
});

console.log(`Converted prompts in ${processed} files.`);
