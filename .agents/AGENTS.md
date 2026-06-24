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

## Output Format
When generating topics, return the information cleanly so it feels like a premium software product, not a generated article:
1. Main Topic Content
2. Sidebar Content
3. Suggested Input Fields
4. Suggested Deliverable
5. Suggested AI Prompt
6. Suggested Validation Checklist
