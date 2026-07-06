const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'src', 'data', 'content');

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p, callback);
    } else if (p.endsWith('.md')) {
      callback(p);
    }
  }
}

function cleanupContent(content) {
  let newContent = content;

  // 1. Strip Emojis (basic regex for common emojis, skipping ASCII ones)
  newContent = newContent.replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/gu, '');

  // 2. Fix callouts (e.g. > **Warning** to > [!WARNING])
  newContent = newContent.replace(/^>\s*\*\*Warning\*\*:?\s*/gmi, '> [!WARNING]\n> ');
  newContent = newContent.replace(/^>\s*\*\*Tip\*\*:?\s*/gmi, '> [!TIP]\n> ');
  newContent = newContent.replace(/^>\s*\*\*Note\*\*:?\s*/gmi, '> [!NOTE]\n> ');
  newContent = newContent.replace(/^>\s*\*\*Important\*\*:?\s*/gmi, '> [!IMPORTANT]\n> ');
  newContent = newContent.replace(/^>\s*\*\*Caution\*\*:?\s*/gmi, '> [!CAUTION]\n> ');
  
  // Also catch lines that just had > **Warning** without content on same line
  newContent = newContent.replace(/^>\s*\*\*Warning\*\*$/gmi, '> [!WARNING]');
  newContent = newContent.replace(/^>\s*\*\*Tip\*\*$/gmi, '> [!TIP]');
  newContent = newContent.replace(/^>\s*\*\*Note\*\*$/gmi, '> [!NOTE]');
  newContent = newContent.replace(/^>\s*\*\*Important\*\*$/gmi, '> [!IMPORTANT]');
  newContent = newContent.replace(/^>\s*\*\*Caution\*\*$/gmi, '> [!CAUTION]');

  // 3. Fix prompt blocks (replace ``` with ```prompt if it says prompt)
  // Assuming prompts might be wrapped in ``` followed by prompt content.
  // We'll replace generic prompt wrappers if they say > **Copy Prompt** or something similar.
  newContent = newContent.replace(/> \*\*Copy Prompt\*\*\s*```(\w*)\n/gi, '```prompt\n');
  newContent = newContent.replace(/```\s*prompt\n/gi, '```prompt\n'); // ensure no space

  // 4. Ensure `- [ ]` is only under `## Checklist` or `### Checklist`
  // Actually, since the rule says "never use chevron arrows for bullets, use standard bullet points" we might want to fix lists.
  newContent = newContent.replace(/^\s*>\s+- /gmi, '- '); // fix blockquoted lists if any

  return newContent;
}

let modifiedCount = 0;
walk(contentDir, (p) => {
  const content = fs.readFileSync(p, 'utf8');
  const cleaned = cleanupContent(content);
  if (content !== cleaned) {
    fs.writeFileSync(p, cleaned, 'utf8');
    modifiedCount++;
  }
});
console.log(`Cleaned ${modifiedCount} files.`);
