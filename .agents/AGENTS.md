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

## UI Structure
When generating content, structure the page using the following components when appropriate:
1. **Estimated Time**: (e.g. 🕒 Estimated Time: 15-20 min)
2. **Overview**: Short explanation, max 150 words.
3. **Think First**: Interactive fields for project memory. Force decisions, be specific, and ensure they are useful later. Avoid generic questions.
4. **Key Decisions**: Explain tradeoffs. Don't simply list options.
5. **Common Mistakes**: Show mistakes beginners and vibe coders commonly make. Explain why it happens, consequences, and prevention.
6. **Examples**: Include at least one realistic example whenever useful.
7. **AI Prompt Section**: Generate a high-quality prompt with a Copy button. It must use previous project memory, encourage critical thinking, challenge assumptions, and produce professional output.
8. **Validation Checklist**: Checkboxes that are practical and actionable.
9. **Deliverable**: Clearly define the File Name, Purpose, and Contents.
10. **Next Step**: Explain what comes next and why. (Never simply say "Go to next topic").

## Right Sidebar
Generate sidebar content. The sidebar should NEVER be empty. Choose the most relevant items for the topic and keep them concise:
- Quick Definitions
- Common Terms
- Decision Cheatsheet
- Recommended Resources
- Example Deliverables
- Useful Frameworks
- Warnings
- Related Topics
- Best Practices

## Mode Adaptation
- **Hackathon Mode**: Shorter content, focus on speed, MVP, judging criteria. Remove unnecessary complexity.
- **Personal Project Mode**: Focus on learning, maintainability, low-cost tools, realistic solo development.
- **Production Mode**: Cover security, scalability, long-term maintainability, monitoring and operations, advanced considerations.
- **Custom Mode**: Respect enabled modules.

## Content Quality Rules
- **Avoid**: Blog-style writing, corporate jargon, long introductions, academic explanations, generic advice.
- **Prefer**: Decision-making, practical examples, real-world tradeoffs, actionable guidance.
- *Every section must answer:* "How does this help me build better software?"

## Agent Execution Rules
- **Leverage Unfair Advantages:** Actively use all available tools, including MCP (Model Context Protocol) servers, search, and specialized plugins, to provide the best possible implementation and gather context.
- **Token Efficiency vs. Quality:** Strive to be token-efficient (be concise, avoid massive unrelated diffs), but **NEVER** even slightly sacrifice quality, correctness, or completeness for the sake of token efficiency. Quality and thoroughness are always the highest priority.

## Output Format & Interactive UI Components
Kontxt parses specific Markdown syntax to render interactive React components (like the AI Prompt box with a "Copy" button, and user input fields).

**CRITICAL RULE FOR TYPESCRIPT**: Because content is stored inside JavaScript/TypeScript template literals (using backticks ` ` `), you **MUST** escape the backticks when creating code blocks, otherwise you will break the build (`tsc` will fail). ALWAYS write `\`\`\`` instead of ` ``` `.

When generating a topic in `src/data/content/fallback.ts`, you MUST use this exact structure:

```markdown
# Topic Name

🕒 **Estimated Time:** X

---

## Overview
Text

---

## Think First
**Question 1?**
\`\`\`input
✏️ Type your answer here...
\`\`\`

---

## Key Decisions
- Bullets

---

## Common Mistakes
- Bullets

---

## AI Prompt
Use this prompt to generate your output.
\`\`\`prompt
Act as a Senior Developer...
\`\`\`

---

## Validation Checklist
- [ ] Checklist item

---

## How to Use AI's Output
1. Review the generated response.
2. If the task involves external platforms, send this follow-up prompt to your AI: **"I am a beginner. Provide a click-by-click guide on exactly how to set this up in the [Platform Name] dashboard."**
3. Paste the final architectural decision, code, or plan into the **Deliverable** section below to save it to your Master Context.

---

## Deliverable
**File Name:** ...
**Purpose:** ...
**Contents:** ...

\`\`\`input
✏️ Paste your deliverable here...
\`\`\`

---

## Next Step
Text
```

Ensure that every major section is separated by `---` with blank lines before and after.
