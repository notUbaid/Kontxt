const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data/content/SaaS/Production');

// Emojis regex (very comprehensive for standard emojis, ignoring digits/basic punctuation)
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2B50}\u{1F004}\u{1F0CF}\u{1F1E6}-\u{1F1FF}]/gu;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Strip emojis
    content = content.replace(emojiRegex, '');

    // 2. Replace Claude with Kontxt (case insensitive)
    content = content.replace(/\bClaude\b/gi, 'Kontxt');
    content = content.replace(/\bclaude\b/gi, 'Kontxt');

    // 3. Convert callouts
    content = content.replace(/^>\s*\*\*Note\*?\*?:?/gmi, '> [!NOTE]');
    content = content.replace(/^>\s*\*\*Tip\*?\*?:?/gmi, '> [!TIP]');
    content = content.replace(/^>\s*\*\*Important\*?\*?:?/gmi, '> [!IMPORTANT]');
    content = content.replace(/^>\s*\*\*Warning\*?\*?:?/gmi, '> [!WARNING]');
    content = content.replace(/^>\s*\*\*Caution\*?\*?:?/gmi, '> [!CAUTION]');

    // 4. Fix Prompts (if any use generic ``` instead of ```prompt)
    content = content.replace(/```(?:text|markdown)?\s*\n((?:Act as|You are|I need|Generate|Write|Create|Help me)[^`]+)```/gi, '```prompt\n$1```');

    // Remove the clock emoji replacement just in case it was missed by regex
    content = content.replace(/🕒/g, '');

    // Convert chevron lists to standard bullets if they accidentally used `> -`
    content = content.replace(/^>\s+-/gm, '-');

    // Fix empty checklist items that aren't under "## Checklist"
    // (This is harder to do safely with a simple regex, so we'll just fix standard markdown artifacts)
    content = content.replace(/^- \s*$/gm, '');

    fs.writeFileSync(filePath, content, 'utf8');
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let count = 0;
for (const file of files) {
    processFile(path.join(dir, file));
    count++;
}
console.log(`Processed ${count} files.`);
