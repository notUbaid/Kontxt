const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src/data/content');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2B50}\u{1F004}\u{1F0CF}\u{1F1E6}-\u{1F1FF}]/gu;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(emojiRegex, '');
    content = content.replace(/\bClaude\b/g, 'Kontxt');
    content = content.replace(/\bclaude\b/g, 'kontxt');
    content = content.replace(/\bCLAUDE\b/g, 'KONTXT');
    
    // Convert callouts
    content = content.replace(/^>\s*\*\*Note\*?\*?:?/gmi, '> [!NOTE]');
    content = content.replace(/^>\s*\*\*Tip\*?\*?:?/gmi, '> [!TIP]');
    content = content.replace(/^>\s*\*\*Important\*?\*?:?/gmi, '> [!IMPORTANT]');
    content = content.replace(/^>\s*\*\*Warning\*?\*?:?/gmi, '> [!WARNING]');
    content = content.replace(/^>\s*\*\*Caution\*?\*?:?/gmi, '> [!CAUTION]');

    // Prompts
    content = content.replace(/```(?:text|markdown)?\s*\n((?:Act as|You are|I need|Generate|Write|Create|Help me)[^`]+)```/gi, '```prompt\n$1```');

    // Remove clock emoji replacements
    content = content.replace(/🕒/g, '');

    // Convert chevron lists to standard bullets
    content = content.replace(/^>\s+-/gm, '-');

    // Empty list items
    content = content.replace(/^- \s*$/gm, '');

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
console.log(`Processed ${totalProcessed} files recursively.`);
