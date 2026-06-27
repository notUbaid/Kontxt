# Kontxt AI Agent Rules

This file defines the behavior, content generation rules, and project context for Kontxt. Whenever generating content or modifying the codebase, AI agents MUST follow these instructions.

## Project Context
Kontxt is a guided software-building platform that teaches users how to think like a software architect and product builder. It assumes users already have access to AI tools (ChatGPT, Claude, Gemini, Cursor, Lovable, Windsurf, Replit, etc.). Do not replace those tools; instead, help users understand topics, make decisions, use AI effectively, validate outputs, and produce deliverables.

**Tech Stack**:
- React 19 + Vite
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

**Frequently Accessed Files**:
- `src/data/content/fallback.ts` (Contains main topic content generation logic - extremely large file, be mindful of token usage)
- `src/data/taxonomyRegistry.ts` & `src/data/taxonomies/*`
- `src/App.tsx` and core routing components
- `package.json`

## Page Objectives
Every page must guide the user through this workflow (this workflow is more important than the content itself):
**Learn → Think → Decide → Generate → Validate → Save → Continue**

## Content Structure & Interactivity (Accountability-Driven)
The rigid 10-step template is DEAD. Every topic is unique, so its structure must be entirely dynamic. Form follows function.

### The 3 Topic Archetypes
To avoid causing user fatigue and "homework," every topic must fall into one of these three archetypes:
1. 🧱 **Memory Topics (High Friction)**: Only use inputs (` ```input `) when the AI *absolutely needs* this specific data to generate code or architecture later (e.g., MVP Features, DB Schema).
2. ⚡ **Execution Topics (Low Friction)**: Provide an AI prompt (` ```prompt `) for the user to execute externally, but do NOT ask them to paste the result back unless it's critical. Use a simple `[ ] Done` checkbox.
3. 📖 **Reading Topics (Zero Friction)**: Purely educational. Zero inputs, zero prompts. Just beautifully written markdown and a `[ ] I understand` checkbox.

- **Multiple Prompts**: If a task requires multiple steps (e.g. "Prompt 1: Brainstorm", "Prompt 2: Refine"), use multiple ` ```prompt ` blocks!

## Output Format Syntax
Kontxt parses specific Markdown syntax to render interactive React components. 

**CRITICAL RULE FOR TYPESCRIPT**: Because content is stored inside JavaScript/TypeScript template literals (using backticks ` ` `), you **MUST** escape the backticks when creating code blocks (`\``). ALWAYS write `\`\`\`` instead of ` ``` `.

**Available Dynamic Components:**

1. **Input Fields (The Project Memory)**
Use these aggressively to extract specific data for the AI's future context.
\`\`\`input
Write Here...
\`\`\`

2. **AI Prompts (The Execution)**
Use these to give the user exactly what they need to paste into ChatGPT/Claude. You can have 0, 1, or 5 prompts depending on the topic.
\`\`\`prompt
Act as a Senior Architect...
\`\`\`

3. **Checkboxes (The Accountability)**
Standard markdown checkboxes. Use them for concrete actions the user must take.
- [ ] Checklist item 1

**Example of a Dynamic Topic Structure:**
(You don't have to follow this exactly; adapt to the topic's needs).

```markdown
# Topic Name

🕒 **Estimated Time:** X

---

## Why this matters
Explain the real-world impact. Why are we doing this?

## The Data We Need From You
Explain what decisions the user must make.
**List your top 3 direct competitors:**
\`\`\`input
1.
2.
3.
\`\`\`

## AI Brainstorming Phase
\`\`\`prompt
Based on my competitors, suggest 5 unique differentiation angles...
\`\`\`

## The Final Decision
**Which angle are you choosing and why?**
\`\`\`input
Write Here...
\`\`\`
```

Ensure logical sections are separated by `---` with blank lines before and after.

## Mode-Specific Guidance (Crucial)
Kontxt supports different project "Modes". When generating topic content, you MUST include a `## Strategic Guidance` section if the strategic approach or technical implementation changes drastically based on the mode.

**CRITICAL RULE - NO EMOJIS ALLOWED**: You are strictly banned from using emojis anywhere in this project. Do not use emojis in headings, bullet points, text, or code. Do not use the pen emoji for inputs. Do not use emojis for the Mode prefixes.
**CRITICAL RULE - DEEP CONTENT REQUIRED**: Single sentence advice is useless. You MUST write rich, robust, multi-paragraph educational content for each mode.

The structure should look like this:
```markdown
## Strategic Guidance

### Hackathon Mode
[Write a robust paragraph explaining the Hackathon philosophy for this specific topic.]
- Focus on speed.
- Build for the demo.

### Personal Project
[Write a robust paragraph explaining the Personal Project philosophy.]

### Production SaaS
[Write a robust paragraph detailing enterprise-grade concerns, performance, and best practices.]
```
Use this to ensure Hackathon users don't get bogged down in rigorous Production-level validation, and Production users don't skip critical security steps.

## Global Learning Protocol & Rules
*This section dictates how we build, who we build for, and how content must be generated.*

### 1. What We Are Building
Kontxt is a highly dynamic, guided playbook platform. It does not write the code for the user; it acts as a Senior Architect that guides the user through the process of building software. The core value of the product is its ability to morph its advice based on the user's "Mode" (Hackathon vs Production SaaS).

### 2. Who We Are Building For
The users of Kontxt are developers, founders, and product managers. They already have access to powerful AI coding assistants (like Cursor or Windsurf). Kontxt is not trying to compete with those tools. Kontxt exists to tell the user *what* to ask those tools, *how* to architect the system, and *when* to move to the next step.

### 3. The "Builds vs. Modes" Architecture
Kontxt organizes content into a strict two-tier hierarchy: **Builds** and **Modes**.

**A. Builds (The Taxonomy Tracks)**
A "Build" represents the high-level platform or architecture being developed (e.g., `SaaS Web App`, `Mobile App`). Each Build has its own distinct taxonomy file (e.g., `saas.ts`, `mobile.ts`) which defines the exact phases and topics the user will traverse. Topics between different Builds must never collide (e.g., use `mobile...` prefixes for Mobile topic IDs to isolate them from Web SaaS topics).

**B. Modes (The Strategic Lenses)**
Every Build is further filtered through one of 3 core "Modes". The Mode dictates the *Strategic Guidance* rendered within a single topic string. A topic string (e.g., `mobileauth` in `fallback.ts`) must support these 3 Modes via markdown headers (`### Hackathon Mode`, `### Personal Project`, `### Production SaaS`).

The 3 Core Modes are:
- **Hackathon Mode**: Optimize strictly for speed, visual "wow factor", and the demo. Cut corners, fake data, ignore scale.
- **Personal Project**: Optimize for learning, zero-cost maintenance (free tiers), and personal utility.
- **Production SaaS**: Optimize for revenue, scalability, security, and solving a highly painful "Hair on Fire" problem.

*Note on Custom Mode*: "Custom Mode" is **not** a distinct content mode. It is simply a taxonomy UI feature where the user hand-picks specific topics to see in their sidebar. When reading content in Custom Mode, the user is still reading the content based on their underlying selected base mode (Hackathon, Personal, or SaaS). Do not generate `### Custom Mode` content.

### 4. Content Generation Rules (CRITICAL)
When writing content for new topics or phases (like Phase 3, Phase 4, etc.):
1. **NO EMOJIS**: They are strictly banned from all headings, bullets, and UI elements.
2. **DEEP CONTENT**: You must write robust, multi-paragraph educational content under the `### [ModeName] Mode` headings. Single sentence fragments are unacceptable.
3. **NO HOMEWORK**: Do not force the user to type in an input box unless that data is absolutely critical for future context. If it is just for execution, give them a `prompt` block to copy-paste.
4. **INTERNAL LINKS**: When referencing other topics, ALWAYS create a markdown anchor link to it (e.g., `[MVP Features](#mvpfeatures)`). The anchor is the lowercase, space-stripped name of the topic.
5. **ESCAPE BACKTICKS**: When writing markdown inside the TypeScript generation scripts (`fallback.ts`), you must escape code block backticks as `\\\`\\\`\\\``.
6. **NO INLINE CONTEXT LINKS**: Do not inject 'Context Links' or 'External Links' directly into the markdown content of a topic. All context links must be managed strictly via the `quickLinks` array in the respective taxonomy file (e.g. `src/data/taxonomies/saas.ts`). The Right Sidebar UI is responsible for rendering these links.
7. **BEWARE OF TAXONOMY NAMESPACE COLLISIONS**: The `fallback.ts` file contains content for multiple different project taxonomies (e.g., SaaS vs Mobile App). Similar topics (like PRD, Wireframes, User Flows) exist in both tracks. SaaS topic IDs are typically un-prefixed (e.g., `prd`, `wireframes`), while Mobile App topic IDs are explicitly prefixed (e.g., `mobileprd`, `mobilewireframes`). When modifying or deleting content in `fallback.ts` or `types.ts`, **you MUST verify the specific taxonomy prefix** to ensure you do not overwrite or delete SaaS topics when working on Mobile App topics (and vice-versa).
8. **PROGRAMMATIC INJECTION**: `fallback.ts` is a massive file. Do NOT attempt to manually string-replace large blocks of content within it, as this often leads to `TS1160 (unterminated template literal)` errors due to unescaped backticks crashing the AST parser. Instead, write standalone Node injection scripts (e.g., `update_topic.cjs`) that require and modify the file programmatically. When passing markdown strings to these scripts, be explicitly careful with inline backticks (e.g., ` \`<Component />\` `); they must be escaped properly so they don't terminate the JavaScript template strings early.
9. **HIGH-QUALITY CONTEXTUAL LINKS**: When adding context links (`quickLinks` in the taxonomy files), DO NOT use generic, low-effort links (e.g., linking to basic React or Tailwind homepage). You MUST insert unique, lowkey, underrated, and highly useful tools, articles, or guides that are strictly relevant to the specific topic. Aim for 1-2 links for basic topics, and 3-4 links for deep, complex topics.

10. **NO YAML FRONTMATTER**: Do NOT include YAML frontmatter (`--- title: ... ---`) at the top of markdown files. The `DocumentEditor` parses raw text, so frontmatter will visually bleed into the UI as broken tables or horizontal lines.
11. **ESTIMATED TIME FORMATTING**: Every topic MUST include an estimated time exactly in this format right beneath the H1: `**Estimated Time:** X Minutes`. Do NOT use the clock emoji (`🕒`) as it violates the no-emoji rule.
12. **PROMPT BLOCKS & COPY BUTTONS**: When providing an AI prompt, ALWAYS use the ````prompt` language tag. Do NOT write `> **Copy Prompt**` or `"Copy Prompt"` anywhere near it. The `DocumentEditor` automatically parses the `prompt` tag and injects a premium UI block with a built-in interactive copy button.

### 5. Workflow Execution
Whenever a large-scale structural change is requested (like rewriting 40+ topics with Deep Content), the AI agent MUST batch the work sequentially (e.g., Batch 1, Batch 2...) to avoid token truncation and ensure maximum quality per mode.
