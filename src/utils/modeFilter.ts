import type { Mode } from '../components/TopNav';

export function filterModeContent(markdown: string, activeMode: Mode): string {
  if (!markdown) return markdown;

  // Find the Strategic Guidance or Mode-Specific Guidance block up to the next heading or end of string
  const modeRegex = /## (Mode-Specific Guidance|Strategic Guidance)([\s\S]*?)(?=\n## |\n*$)/;
  
  return markdown.replace(modeRegex, (match, _title, content) => {
    // Check if we are using the new deep H3 syntax or the old bullet point syntax
    if (content.includes('\n### ')) {
      // New H3 Syntax
      const h3Sections = content.split(/(?=\n### )/);
      let activeSection = '';
      
      for (const section of h3Sections) {
        if (section.trim() === '') continue;
        
        // If it doesn't start with an H3, keep it (intro text)
        if (!section.startsWith('\n### ') && !section.startsWith('### ')) {
          activeSection += section;
          continue;
        }
        
        const isHackathon = section.includes('Hackathon');
        const isPersonal = section.includes('Personal');
        const isProduction = section.includes('Production');
        const isCustom = section.includes('Custom');
        
        if (activeMode === 'Hackathon' && isHackathon) activeSection += section;
        if (activeMode === 'Personal' && isPersonal) activeSection += section;
        if (activeMode === 'Production' && isProduction) activeSection += section;
        if (activeMode === 'Custom' && isCustom) activeSection += section;
      }
      
      // Clean up the output. Remove the H3 tag of the active section to make it look native.
      activeSection = activeSection.replace(/\n?### .*?\n/, '\n');
      
      if (!activeSection.trim()) return '';
      return `## Strategic Guidance\n${activeSection}`;
      
    } else {
      // Old Bullet Point Syntax (Backwards Compatibility)
      const lines = match.split('\n');
      const filteredLines = lines.filter(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ')) {
          const isHackathon = trimmed.includes('Hackathon');
          const isPersonal = trimmed.includes('Personal');
          const isProduction = trimmed.includes('Production');
          const isCustom = trimmed.includes('Custom');
          
          if (isHackathon && activeMode !== 'Hackathon') return false;
          if (isPersonal && activeMode !== 'Personal') return false;
          if (isProduction && activeMode !== 'Production') return false;
          if (isCustom && activeMode !== 'Custom') return false;
        }
        return true;
      });

      const hasBullets = filteredLines.some(line => line.trim().startsWith('- '));
      if (!hasBullets) return '';

      return filteredLines.join('\n').replace('## Mode-Specific Guidance', '## Strategic Guidance');
    }
  });
}
