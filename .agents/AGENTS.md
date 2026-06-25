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
- **Niche Topics**: Might just be a brief overview and a single input field.
- **Crucial Topics**: Might have massive amounts of content, 5 specific input fields, and multiple AI prompts.
- **Goal of Interactivity**: Input fields (` ```input `) are not for "boring questions" or "fill-in-the-blanks". They are designed to extract specific, highly-structured data that an AI will later read to understand the user's project state. Demand URLs, pricing data, feature lists, target demographics. Create an *accountability* check.
- **Multiple Prompts**: If a task requires multiple steps (e.g. "Prompt 1: Brainstorm", "Prompt 2: Refine"), use multiple ` ```prompt ` blocks!

## Output Format Syntax
Kontxt parses specific Markdown syntax to render interactive React components. 

**CRITICAL RULE FOR TYPESCRIPT**: Because content is stored inside JavaScript/TypeScript template literals (using backticks ` ` `), you **MUST** escape the backticks when creating code blocks (`\``). ALWAYS write `\`\`\`` instead of ` ``` `.

**Available Dynamic Components:**

1. **Input Fields (The Project Memory)**
Use these aggressively to extract specific data for the AI's future context.
\`\`\`input
✏️ Paste your top 3 competitor URLs here...
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
✏️ 1.
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
✏️ Angle:
Reason:
\`\`\`
```

Ensure logical sections are separated by `---` with blank lines before and after.

## Mode-Specific Guidance (Crucial)
Kontxt supports different project "Modes". When generating topic content, you MUST include a `## Mode-Specific Guidance` section if the strategic approach or technical implementation changes drastically based on the mode.

The structure should look like this:
```markdown
## Mode-Specific Guidance
Depending on what you are building, your approach here should drastically change:
- ⚡ **Hackathon Mode:** [Advice for speed, avoiding this step, faking the backend, etc.]
- 🏗️ **Personal Project:** [Advice for solo-devs, learning, zero-cost tools, maintainability.]
- 🏢 **Production SaaS:** [Advice for scalability, security, rigorous validation, charging money.]
```
Use this to ensure Hackathon users don't get bogged down in rigorous Production-level validation, and Production users don't skip critical security steps.
