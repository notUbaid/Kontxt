import fs from 'fs';

let content = fs.readFileSync('src/data/taxonomies/ai.ts', 'utf8');

// Replace aiCustomTaxonomy logic
const newBottom = `export const aiCustomTaxonomy: Category[] = [
  ...aiProductionTaxonomy.map(cat => {
    if (cat.id === 'phase-5-ai-deploy') {
      return {
        ...cat,
        topics: [
          ...cat.topics,
          createTopic('Pitch Deck', Presentation),
          createTopic('Demo Script', FileText),
          createTopic('Submission Checklist', CheckSquare),
          createTopic('Presentation Prep', Presentation)
        ]
      };
    }
    return cat;
  })
];

export const aiPersonalTaxonomy: Category[] = filterTaxonomy(aiCustomTaxonomy, ['Welcome', 'Problem Definition', 'AI Suitability', 'Conversation Design', 'Trust & Transparency', 'Model Selection', 'Prompt Engineering', 'Conversation Memory', 'Structured Outputs', 'Retrieval Pipeline', 'Frontend', 'Backend', 'AI Integration', 'Streaming UX', 'AI Failure States', 'Security', 'Cost Controls', 'Hosting', 'User Documentation', 'Growth Analytics', 'Prompt Analytics', 'Model Upgrades', 'Presentation Prep', 'Pitch Deck', 'Demo Script', 'Submission Checklist'], []);

export const aiHackathonTaxonomy: Category[] = filterTaxonomy(aiCustomTaxonomy, ['Welcome', 'Problem Definition', 'Target Users', 'PRD', 'Conversation Design', 'AI Interaction Flows', 'Trust & Transparency', 'Model Selection', 'Prompt Engineering', 'Structured Outputs', 'RAG', 'Backend', 'Frontend', 'AI Integration', 'Streaming UX', 'AI Failure States', 'Pitch Deck', 'Demo Script', 'Submission Checklist', 'Presentation Prep'], []);
`;

// Replace everything from `export const aiPersonalTaxonomy` to the end of the file.
content = content.replace(/export const aiPersonalTaxonomy.*$/s, newBottom);

fs.writeFileSync('src/data/taxonomies/ai.ts', content);
