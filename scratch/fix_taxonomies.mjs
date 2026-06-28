import fs from 'fs';
import path from 'path';

// --- Fix ecommerce.ts ---
const ecommercePath = path.resolve('src/data/taxonomies/ecommerce.ts');
let ecom = fs.readFileSync(ecommercePath, 'utf8');

// 1. Fix the regex literal syntax errors that the previous script injected:
ecom = ecom.replace(/\/'Inventory', 'Payment & Fraud Protection', 'E-commerce SEO', 'Shipping',\//g, "'Inventory', 'Payment & Fraud Protection', 'E-commerce SEO', 'Shipping', ");
ecom = ecom.replace(/\/'Payment & Fraud Protection', 'Scalability Planning'\//g, "'Payment & Fraud Protection', 'Scalability Planning'");

// 2. Add 'Demo Script' and 'Submission Checklist' to Phase 6 if not already there
if (!ecom.includes("createTopic('Demo Script', FileText)")) {
  ecom = ecom.replace(
    "createTopic('Pitch Deck', Presentation),",
    "createTopic('Pitch Deck', Presentation),\n      createTopic('Demo Script', FileText),\n      createTopic('Submission Checklist', CheckSquare),"
  );
}

// 3. Update the Hackathon keep array so it works with the new topic names
// The new topic names from Production are: 'Business Definition', 'Store Fundamentals', 'Product Catalog Planning', 'PRD', 'Customer Journey', 'Product Page Design', 'Cart', 'Checkout', 'Payments', 'Products', 'Pitch Deck', 'Presentation Prep', 'Demo Script', 'Submission Checklist'
ecom = ecom.replace(
  /'Store Concept', 'Product Catalog Planning', 'PRD', 'Customer Journey', 'Product Page Design', \s*'Cart', 'Checkout', 'Payments', 'Demo Products', 'Pitch Deck', 'Demo Script', 'Submission Checklist',/g,
  `'Business Definition', 'Store Fundamentals', 'Product Catalog Planning', 'PRD', 'Customer Journey', 'Product Page Design', \n    'Cart', 'Checkout', 'Payments', 'Products', 'Pitch Deck', 'Presentation Prep', 'Demo Script', 'Submission Checklist',`
);

// Add missing lucide-react imports if we added FileText and CheckSquare
if (ecom.includes("Presentation, Compass") && !ecom.includes("FileText")) {
  ecom = ecom.replace(/Presentation, Compass/, "Presentation, Compass, FileText, CheckSquare");
}

fs.writeFileSync(ecommercePath, ecom);

// --- Fix marketplace.ts ---
const marketplacePath = path.resolve('src/data/taxonomies/marketplace.ts');
let market = fs.readFileSync(marketplacePath, 'utf8');

// Update Hackathon keep array to include Presentation Prep
if (!market.includes("'Presentation Prep'")) {
  market = market.replace(
    /'Pitch Deck', 'Demo Script', 'Submission Checklist',/g,
    `'Pitch Deck', 'Presentation Prep', 'Demo Script', 'Submission Checklist',`
  );
}

fs.writeFileSync(marketplacePath, market);

console.log("Fixes applied successfully.");
