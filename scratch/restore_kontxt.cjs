const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src/data/content');

const replacements = [
    { from: /Welcome to Claude/gi, to: 'Welcome to Kontxt' },
    { from: /Claude is a SaaS platform/gi, to: 'Kontxt is a SaaS platform' },
    { from: /In Hackathon Mode, Claude won't lecture you/gi, to: 'In Hackathon Mode, Kontxt won\'t lecture you' },
    { from: /Claude will force you to/gi, to: 'Kontxt will force you to' },
    { from: /Claude is not documentation/gi, to: 'Kontxt is not documentation' },
    { from: /How to Move Through Claude Right Now/gi, to: 'How to Move Through Kontxt Right Now' },
    { from: /Claude is a guide, not a gatekeeper/gi, to: 'Kontxt is a guide, not a gatekeeper' },
    { from: /prompts in Claude are designed/gi, to: 'prompts in Kontxt are designed' },
    { from: /outsource your thinking to Claude/gi, to: 'outsource your thinking to Kontxt' },
    { from: /Claude will help you look like the former/gi, to: 'Kontxt will help you look like the former' },
    { from: /What Claude Does/gi, to: 'What Kontxt Does' },
    { from: /Claude guides you through/gi, to: 'Kontxt guides you through' },
    { from: /What Claude teaches is/gi, to: 'What Kontxt teaches is' },
    { from: /Claude is not a lawyer/gi, to: 'Kontxt is not a lawyer' },
    { from: /Claude exists so that/gi, to: 'Kontxt exists so that' }
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    for (const { from, to } of replacements) {
        if (from.test(content)) {
            content = content.replace(from, to);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
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
console.log(`Processed files to restore Kontxt product name.`);
