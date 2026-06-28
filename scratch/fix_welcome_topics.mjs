import fs from 'fs';
import path from 'path';

function addWelcome(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure HelpCircle is imported
  if (!content.includes('HelpCircle')) {
    content = content.replace(/import \{([\s\S]+?)\} from 'lucide-react';/, "import { HelpCircle, $1 } from 'lucide-react';");
  }

  // Add Welcome to Phase 0 topics array if not there
  if (!content.includes("createTopic('Welcome', HelpCircle")) {
    content = content.replace(
      /topics: \[\s+createTopic\(/,
      "topics: [\n      createTopic('Welcome', HelpCircle),\n      createTopic("
    );
  }

  // Add Welcome to keep lists for Hackathon
  if (!content.includes("'Welcome'")) {
    content = content.replace(
      /base[A-Za-z]+Taxonomy,\s+\[/,
      "$&'Welcome', "
    );
    // For ecommerce where there is no baseTaxonomy:
    content = content.replace(
      /filterTaxonomy\(\s+\[/,
      "$&'Welcome', "
    );
  }
  
  fs.writeFileSync(filePath, content);
}

const ecommercePath = path.resolve('src/data/taxonomies/ecommerce.ts');
const marketplacePath = path.resolve('src/data/taxonomies/marketplace.ts');

addWelcome(ecommercePath);
addWelcome(marketplacePath);

console.log("Welcome topics added successfully.");
