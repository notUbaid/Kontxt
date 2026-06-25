const fs = require('fs');
let content = fs.readFileSync('src/data/content/fallback.ts', 'utf8');
// Replace \\` with \`
content = content.replace(/\\\\\`/g, '\\`');
fs.writeFileSync('src/data/content/fallback.ts', content);
console.log('Fixed double escaped backticks in fallback.ts');
