const fs = require('fs');
let content = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

// Remove lines that start with 'Custom': in MODE_DESCRIPTIONS
content = content.replace(/\s+'Custom': '.*?',\n/g, '\n');

// Remove Custom mode option from getModeData()
const customModeRegex = /\s+{\s+id: 'Custom' as Mode,[\s\S]*?},\n/g;
content = content.replace(customModeRegex, '\n');

fs.writeFileSync('src/components/Onboarding.tsx', content);
console.log('Cleaned Onboarding.tsx');
