const fs = require('fs');
const path = 'src/data/content/fallback.ts';

function escapeInternalBackticks(str) {
  return str.replace(/`/g, '\\`');
}

function updateTopic(key, newMarkdown) {
  let content = fs.readFileSync(path, 'utf8');
  const startPattern = `  '${key}': \``;
  const startIndex = content.indexOf(startPattern);
  const escapedMarkdown = escapeInternalBackticks(newMarkdown);
  
  if (startIndex === -1) {
    console.log(`Key ${key} not found. Appending to end.`);
    // Insert before the last `};\n`
    const insertPattern = `\n  '${key}': \`${escapedMarkdown}\`,`;
    const lastBraceIndex = content.lastIndexOf('};');
    if (lastBraceIndex === -1) {
      console.error('Could not find closing brace.');
      return false;
    }
    content = content.substring(0, lastBraceIndex) + insertPattern + '\n' + content.substring(lastBraceIndex);
    fs.writeFileSync(path, content);
    console.log(`Successfully added topic: ${key}`);
    return true;
  }
  
  const regex = /`,\r?\n(  '|};)/g;
  regex.lastIndex = startIndex + startPattern.length;
  const match = regex.exec(content);
  if (!match) {
    console.error(`Could not find end of block for ${key}.`);
    return false;
  }
  const endIndex = match.index; 
  const replacement = `${startPattern}${escapedMarkdown}`;
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  fs.writeFileSync(path, content);
  console.log(`Successfully updated topic: ${key}`);
  return true;
}

module.exports = { updateTopic };
