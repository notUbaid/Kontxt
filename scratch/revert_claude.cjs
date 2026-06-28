const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src/data/content');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Revert Kontxt back to Claude
    content = content.replace(/\bKontxt\b/g, 'Claude');
    content = content.replace(/\bkontxt\b/g, 'claude');
    content = content.replace(/\bKONTXT\b/g, 'CLAUDE');
    
    fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(dir) {
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            count += processDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            processFile(fullPath);
            count++;
        }
    }
    return count;
}

const totalProcessed = processDirectory(rootDir);
console.log(`Reverted Kontxt to Claude in ${totalProcessed} files.`);
