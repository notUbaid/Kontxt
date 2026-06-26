import type { Mode } from '../components/TopNav';

export function filterModeContent(markdown: string, activeMode: Mode): string {
  if (!markdown) return markdown;

  // Find the mode block. It might be under `## Strategic Guidance`, or it might just be the `### Hackathon Mode` etc.
  // We want to capture from either `## Strategic Guidance` or the first `### <Mode>` until the next `## `, `---`, or end of string.
  const modeRegex = /(?:## (?:Mode-Specific Guidance|Strategic Guidance)\n*)?(### (?:Hackathon Mode|Personal Project|Production SaaS|Hackathon|Personal|Production)[\s\S]*?)(?=\n## |\n---|\n*$)/i;
  
  return markdown.replace(modeRegex, (match, content) => {
    // Check if we are using the new deep H3 syntax
    if (content.includes('\n### ') || content.startsWith('### ')) {
      // Split into sections by H3
      // We prepend a newline to make splitting consistent if it starts with ###
      const normalizedContent = content.startsWith('### ') ? '\n' + content : content;
      const h3Sections = normalizedContent.split(/(?=\n### )/);
      let activeSection = '';
      
      for (const section of h3Sections) {
        if (section.trim() === '') continue;
        
        // If it doesn't start with an H3, keep it (intro text)
        if (!section.startsWith('\n### ') && !section.startsWith('### ')) {
          activeSection += section;
          continue;
        }
        
        const isHackathon = section.toLowerCase().includes('hackathon');
        const isPersonal = section.toLowerCase().includes('personal');
        const isProduction = section.toLowerCase().includes('production');
        
        if (activeMode === 'Hackathon' && isHackathon) activeSection += section;
        if (activeMode === 'Personal' && isPersonal) activeSection += section;
        if (activeMode === 'Production' && isProduction) activeSection += section;
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
          
          if (isHackathon && activeMode !== 'Hackathon') return false;
          if (isPersonal && activeMode !== 'Personal') return false;
          if (isProduction && activeMode !== 'Production') return false;
        }
        return true;
      });

      const hasBullets = filteredLines.some(line => line.trim().startsWith('- '));
      if (!hasBullets) return '';

      return filteredLines.join('\n').replace(/## (Mode-Specific Guidance|Strategic Guidance)/, '## Strategic Guidance');
    }
  });
}
