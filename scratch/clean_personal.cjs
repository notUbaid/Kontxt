const fs = require('fs');
const path = require('path');
const dir = './src/data/content/SaaS/Personal';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let processed = 0;

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  
  // Extract estimatedTime from frontmatter
  let estimatedTime = '15 Minutes';
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const timeMatch = fm.match(/estimatedTime:\s*(.*)/);
    if (timeMatch) estimatedTime = timeMatch[1].trim();
    // Remove frontmatter
    content = content.replace(/^---\r?\n[\s\S]*?\n---\r?\n+/, '');
  }
  
  // Remove emojis
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  content = content.replace(emojiRegex, '');
  
  // Inject estimated time if not already present
  if (!content.includes('**Estimated Time:**')) {
    content = content.replace(/^(# .*?\n+)/m, '$1**Estimated Time:** ' + estimatedTime + '\n\n---\n\n');
  }
  
  // Remove > **Copy Prompt** or similar
  content = content.replace(/>\s*\*\*Copy Prompt\*\*\r?\n?/g, '');
  content = content.replace(/>\s*\"Copy Prompt\"\r?\n?/g, '');
  
  // Fix un-tagged code blocks that look like prompts
  content = content.replace(/```\r?\n(Act as|You are)/g, '```prompt\n$1');
  
  fs.writeFileSync(p, content, 'utf8');
  processed++;
});
console.log('Processed ' + processed + ' Personal files.');
