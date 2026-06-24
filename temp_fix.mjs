import { readFileSync, writeFileSync } from 'fs';

const path = 'src/data/content/fallback.ts';
let text = readFileSync(path, 'utf8');
const lines = text.split(/\r?\n/);

const BT = '`';
const BS = '\\';

let openingCount = 0;
let closingCount = 0;
let contentEscaped = 0;
const openPattern = /^\s+'[^']*':\s*`/;

const newLines = lines.map((line) => {
  // Find positions of all unescaped backticks on this line
  const positions = [];
  for (let j = 0; j < line.length; j++) {
    if (line[j] === BT && !(j > 0 && line[j - 1] === BS)) {
      positions.push(j);
    }
  }
  if (positions.length === 0) return line;

  // Classify each unescaped backtick
  const structural = new Set();
  const isOpeningLine = openPattern.test(line);

  for (let j = 0; j < positions.length; j++) {
    const pos = positions[j];
    // Opening: first backtick on a line matching the key-pattern
    if (j === 0 && isOpeningLine) {
      structural.add(pos);
      openingCount++;
      continue;
    }
    // Closing: last backtick followed by ',' or '}' then only whitespace to EOL,
    // OR backtick is the only non-whitespace char on the line
    const after = line.slice(pos + 1);
    const afterTrim = after.trim();
    const isEOLCommaOrBrace = (afterTrim === ',' || afterTrim === '};' || afterTrim === '}');
    const aloneOnLine = line.trim() === BT;
    if ((j === positions.length - 1) && (isEOLCommaOrBrace || aloneOnLine)) {
      structural.add(pos);
      closingCount++;
      continue;
    }
  }

  // Escape all non-structural unescaped backticks
  if (structural.size === positions.length) return line;
  let result = '';
  for (let k = 0; k < line.length; k++) {
    if (line[k] === BT && positions.includes(k) && !structural.has(k)) {
      result += BS + BT;
      contentEscaped++;
    } else {
      result += line[k];
    }
  }
  return result;
});

writeFileSync(path, newLines.join('\n'), 'utf8');

console.log('Opening delimiters:', openingCount);
console.log('Closing delimiters:', closingCount);
console.log('Content backticks escaped:', contentEscaped);
