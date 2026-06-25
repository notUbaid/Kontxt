const fs = require('fs');
let content = fs.readFileSync('src/data/content/fallback.ts', 'utf8');

const marker = '## 📚 Context Links';
let updated = false;

while(content.includes(marker)) {
    const startIdx = content.indexOf(marker);
    // Find where the previous newlines are so we strip those too
    let actualStartIdx = startIdx;
    while(content[actualStartIdx - 1] === '\n' || content[actualStartIdx - 1] === '\r') {
        actualStartIdx--;
    }

    let endIdx = content.indexOf('`,', startIdx);
    if (endIdx === -1) {
        endIdx = content.indexOf('`\n}', startIdx);
    }
    if (endIdx === -1) {
        endIdx = content.indexOf('`\r\n}', startIdx);
    }
    
    if (endIdx !== -1) {
        content = content.slice(0, actualStartIdx) + content.slice(endIdx);
        updated = true;
    } else {
        console.error('Could not find end of string for marker at', startIdx);
        break;
    }
}

if (updated) {
    fs.writeFileSync('src/data/content/fallback.ts', content);
    console.log('Successfully stripped all Context Links.');
} else {
    console.log('No Context Links found or updated.');
}
