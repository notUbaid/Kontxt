import type { Mode } from '../components/TopNav';

export function filterModeContent(markdown: string, activeMode: Mode): string {
  if (!markdown) return markdown;

  // Find the Mode-Specific Guidance block up to the next heading or end of string
  const modeRegex = /## Mode-Specific Guidance[\s\S]*?(?=\n## |\n*$)/;
  
  return markdown.replace(modeRegex, (match) => {
    const lines = match.split('\n');
    const filteredLines = lines.filter(line => {
      // Check if it's a list item that mentions a specific mode
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        const isHackathon = trimmed.includes('Hackathon Mode');
        const isPersonal = trimmed.includes('Personal Project');
        const isProduction = trimmed.includes('Production SaaS');
        const isCustom = trimmed.includes('Custom Mode');
        
        // If the line targets a mode but we are NOT in that mode, filter it out
        if (isHackathon && activeMode !== 'Hackathon') return false;
        if (isPersonal && activeMode !== 'Personal') return false;
        if (isProduction && activeMode !== 'Production') return false;
        if (isCustom && activeMode !== 'Custom') return false;
      }
      return true;
    });

    // If we filtered out all the bullets, remove the intro text and header too to keep it clean
    const hasBullets = filteredLines.some(line => line.trim().startsWith('- '));
    if (!hasBullets) {
      return '';
    }

    // Rename the section since it's no longer "mode-specific" if it only shows one
    return filteredLines.join('\n').replace('## Mode-Specific Guidance', '## Strategic Guidance');
  });
}
