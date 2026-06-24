const fs = require('fs');

const fallbackPath = 'src/data/content/fallback.ts';
let content = fs.readFileSync(fallbackPath, 'utf8');

const keysToTransform = [
  'statemanagement', 'mobileauth', 'mobiledatabaseimplementation', 'mobilebackendimplementation', 
  'pushnotifications', 'frontendui', 'navigation', 'apis', 
  'mobilepayments', 'mediauploads', 'mapslocation', 'devicepermissions', 
  'offlinefeatures', 'analyticsevents', 'errorhandling', 'mobiletesting',
  'security', 'performanceoptimization', 'crashreporting', 'monitoring', 
  'logging', 'ratelimiting', 'backups', 'cicd', 
  'infrastructure', 'appsizeoptimization', 'batteryoptimization', 'scalability'
];

let changesMade = false;

keysToTransform.forEach(key => {
  const searchStr = "  '" + key + "': `";
  const startIndex = content.indexOf(searchStr);
  
  if (startIndex !== -1) {
    let endIndex = content.indexOf("\\n  '", startIndex + 5);
    if (endIndex === -1) endIndex = content.indexOf("\\n};", startIndex + 5);
    if (endIndex === -1) endIndex = content.indexOf("\`,\n", startIndex + 5);
    if (endIndex === -1) endIndex = content.indexOf("\`\n", startIndex + 5);

    if (endIndex !== -1) {
      let block = content.substring(startIndex, endIndex);
      
      // We only want to transform if it hasn't been transformed yet.
      if (block.includes('### Overview')) {
          
          // 1. Upgrade headers and add dividers
          block = block.replace(/\\n### /g, '\\n---\\n\\n## ');
          
          // 2. Fix AI Prompt format (ESCAPED BACKTICKS for TypeScript string)
          block = block.replace(/## AI Prompt\\n> "(.*?)"/gs, (match, p1) => {
              return `## AI Prompt\n\\\\\`\\\\\`\\\\\`prompt\n${p1}\n\\\\\`\\\\\`\\\\\``;
          });

          // 3. Transform Think First bullets into input blocks
          const thinkFirstStart = block.indexOf('## Think First');
          const nextSectionStart = block.indexOf('\\n---', thinkFirstStart + 10);
          
          if (thinkFirstStart !== -1 && nextSectionStart !== -1) {
              let thinkFirstContent = block.substring(thinkFirstStart, nextSectionStart);
              // Replace bullets with bold text + input fields
              thinkFirstContent = thinkFirstContent.replace(/- (.*?)(?=\\n- |\\n$|$)/gs, (match, p1) => {
                  return `**${p1.trim()}**\n\\\\\`\\\\\`\\\\\`input\n✏️ Type your answer here...\n\\\\\`\\\\\`\\\\\``;
              });
              block = block.substring(0, thinkFirstStart) + thinkFirstContent + block.substring(nextSectionStart);
          }

          // 4. Add "How to Use AI's Output" before "Deliverable"
          const deliverableStart = block.indexOf('## Deliverable');
          if (deliverableStart !== -1) {
              const howToUse = `## How to Use AI's Output\n1. Review the generated response.\n2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**\n3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.\n\n---\n\n`;
              block = block.substring(0, deliverableStart) + howToUse + block.substring(deliverableStart);
          }

          // 5. Add input block to Deliverable
          const nextAfterDeliverable = block.indexOf('\\n---', block.indexOf('## Deliverable') + 10);
          if (nextAfterDeliverable !== -1) {
             let deliverableContent = block.substring(block.indexOf('## Deliverable'), nextAfterDeliverable);
             deliverableContent += `\n\n\\\\\`\\\\\`\\\\\`input\n✏️ Paste your deliverable here...\n\\\\\`\\\\\`\\\\\``;
             block = block.substring(0, block.indexOf('## Deliverable')) + deliverableContent + block.substring(nextAfterDeliverable);
          } else {
             // If deliverable is the very last block
             let deliverableContent = block.substring(block.indexOf('## Deliverable'));
             deliverableContent += `\n\n\\\\\`\\\\\`\\\\\`input\n✏️ Paste your deliverable here...\n\\\\\`\\\\\`\\\\\``;
             block = block.substring(0, block.indexOf('## Deliverable')) + deliverableContent;
          }

          content = content.substring(0, startIndex) + block + content.substring(endIndex);
          changesMade = true;
          console.log('Transformed block for:', key);
      } else {
          console.log('Block already transformed or malformed:', key);
      }
    } else {
      console.log('Could not find end index for:', key);
    }
  } else {
    console.log('Could not find start index for:', key);
  }
});

if (changesMade) {
    fs.writeFileSync(fallbackPath, content);
    console.log('Successfully updated fallback.ts');
}
