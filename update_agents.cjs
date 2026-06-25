const fs = require('fs');

let content = fs.readFileSync('.agents/AGENTS.md', 'utf8');

// Remove straggler emoji
content = content.replace('✏️ 1.', '1.');

// The new learnings to append
const learnings = `
## Global Learning Protocol & Rules
*This section dictates how we build, who we build for, and how content must be generated.*

### 1. What We Are Building
Kontxt is a highly dynamic, guided playbook platform. It does not write the code for the user; it acts as a Senior Architect that guides the user through the process of building software. The core value of the product is its ability to morph its advice based on the user's "Mode" (Hackathon vs Production SaaS).

### 2. Who We Are Building For
The users of Kontxt are developers, founders, and product managers. They already have access to powerful AI coding assistants (like Cursor or Windsurf). Kontxt is not trying to compete with those tools. Kontxt exists to tell the user *what* to ask those tools, *how* to architect the system, and *when* to move to the next step.

### 3. The 4 Modes Philosophy
Every piece of advice in the platform must be filtered through one of 4 modes:
- **Hackathon Mode**: Optimize strictly for speed, visual "wow factor", and the demo. Cut corners, fake data, ignore scale.
- **Personal Project**: Optimize for learning, zero-cost maintenance (free tiers), and personal utility.
- **Production SaaS**: Optimize for revenue, scalability, security, and solving a highly painful "Hair on Fire" problem.
- **Custom Mode**: Optimize for massive enterprise scale, compliance (SOC2, HIPAA), buying committees, and architectural rigor.

### 4. Content Generation Rules (CRITICAL)
When writing content for new topics or phases (like Phase 3, Phase 4, etc.):
1. **NO EMOJIS**: They are strictly banned from all headings, bullets, and UI elements.
2. **DEEP CONTENT**: You must write robust, multi-paragraph educational content under the \`### [ModeName] Mode\` headings. Single sentence fragments are unacceptable.
3. **NO HOMEWORK**: Do not force the user to type in an input box unless that data is absolutely critical for future context. If it is just for execution, give them a \`prompt\` block to copy-paste.
4. **INTERNAL LINKS**: When referencing other topics, ALWAYS create a markdown anchor link to it (e.g., \`[MVP Features](#mvpfeatures)\`). The anchor is the lowercase, space-stripped name of the topic.
5. **ESCAPE BACKTICKS**: When writing markdown inside the TypeScript generation scripts (\`fallback.ts\`), you must escape code block backticks as \`\\\\\\\`\\\\\\\`\\\\\\\`\`.

### 5. Workflow Execution
Whenever a large-scale structural change is requested (like rewriting 40+ topics with Deep Content), the AI agent MUST batch the work sequentially (e.g., Batch 1, Batch 2...) to avoid token truncation and ensure maximum quality per mode.
`;

// Append only if not already there
if (!content.includes('Global Learning Protocol & Rules')) {
  content += learnings;
}

fs.writeFileSync('.agents/AGENTS.md', content);
console.log('AGENTS.md updated with Global Protocol.');
