import { filterModeContent } from './src/utils/modeFilter';
import { fallbackContent } from './src/data/content/fallback';

const content = fallbackContent['cyberredtargetselection'];
console.log('--- RAW CONTENT ---');
console.log(content.slice(0, 300) + '...');
console.log('\n--- FILTERED HACKATHON ---');
console.log(filterModeContent(content, 'Hackathon'));
console.log('\n--- FILTERED PRODUCTION ---');
console.log(filterModeContent(content, 'Production'));
