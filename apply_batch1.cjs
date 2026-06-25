const fs = require('fs');
const { updateTopic } = require('./update_topic.cjs');

function processBatch(jsonFile) {
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  for (const [key, markdown] of Object.entries(data)) {
    updateTopic(key, markdown);
  }
}

processBatch('phase4_part1.json');
processBatch('phase4_part2.json');
console.log('Batch 1 successfully applied!');
