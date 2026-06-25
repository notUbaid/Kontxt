const { updateTopic } = require('./update_topic.cjs');

const topics = [
  {
    key: 'prd',
    content: `# Product Requirements Document (PRD)\n\n🕒 **Estimated Time:** 30 min\n\n---\n\n## Why this matters\nThe PRD is the ultimate source of truth for your product. It bridges the gap between "what we want to build" (business) and "how we will build it" (engineering). Without a PRD, scope creep will kill your project.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip the formal PRD. Your PRD is just a bulleted list of the 3 features you need to build before the presentation. Do not waste time formatting a document that no one will read.\n\n### Personal Project\nA lightweight PRD is highly recommended. Write down exactly what you are building and, more importantly, what you are NOT building. When you get distracted by a shiny new feature on Sunday afternoon, look at the PRD to re-focus.\n\n### Production SaaS\nThe PRD is mandatory. It must define the core user flows, the acceptance criteria for every feature, and the exact metrics for success. If a feature is not in the PRD, it does not get built. The PRD is the contract between the founder and the engineering team.\n\n### Custom Mode\nIn enterprise, the PRD is a massive legal and technical document. It must include security requirements, SLA definitions, data retention policies, and compliance checklists. Every single stakeholder (Legal, Security, Engineering, Product) must sign off on the PRD before a single line of code is written.\n\n## PRD Generation\n\`\`\`prompt\nAct as a Senior Product Manager. Based on my project so far, draft a comprehensive PRD.\n\`\`\`\n- [ ] I have generated and saved my PRD.\n`
  },
  {
    key: 'userflows',
    content: `# User Flows\n\n🕒 **Estimated Time:** 20 min\n\n---\n\n## Why this matters\nUser flows map out the exact path a user takes to accomplish a goal. If the flow is confusing, the user will abandon your app. It dictates your UI layout.\n\n## Strategic Guidance\n\n### Hackathon Mode\nYou only need one user flow: The "Happy Path" that you will click through during your demo. Map it out so you know exactly which screens to build. Ignore edge cases and error states.\n\n### Personal Project\nMap out the core flow on a piece of paper. You don't need fancy software. Just ensure you know how to get from the landing page to the core value proposition.\n\n### Production SaaS\nYou must map out onboarding, core usage, and retention flows. Where do users drop off? How many clicks does it take to get to the "Aha!" moment? Your user flow should aggressively minimize friction during onboarding.\n\n### Custom Mode\nYou must map out complex, multi-role workflows. How does an Employee request a tool, a Manager approve it, and an Admin provision it? You need to document the state machine for every complex interaction, including all edge cases and error handling.\n\n## Flow Diagram Generation\n\`\`\`prompt\nGenerate a Mermaid.js user flow diagram for the onboarding process of my app.\n\`\`\`\n- [ ] I have mapped out my core user flows.\n`
  },
  {
    key: 'designsystem',
    content: `# Design System\n\n🕒 **Estimated Time:** 30 min\n\n---\n\n## Why this matters\nA design system ensures visual consistency across your app and radically speeds up development. If you don't define your colors and typography upfront, your CSS will become a chaotic mess of hardcoded hex values.\n\n## Strategic Guidance\n\n### Hackathon Mode\nDo not build a design system from scratch. Use an off-the-shelf component library like shadcn/ui, Chakra UI, or Tailwind UI. Pick one primary brand color, one font, and stick to the library's defaults for everything else.\n\n### Personal Project\nUse a component library, but take 10 minutes to customize the primary colors and border radiuses to make it feel unique. Don't spend hours tweaking button padding.\n\n### Production SaaS\nYou need a robust, scalable design system. You must define your color palette (primary, secondary, semantic success/error colors), typography scales, spacing tokens, and dark mode variants. Use Figma variables to sync your design tokens directly with your CSS or Tailwind config.\n\n### Custom Mode\nEnterprise design systems require rigorous accessibility standards (WCAG 2.1 AA compliance). Your color contrast ratios must be perfect. You must support internationalization (RTL text), high-contrast modes, and extensive keyboard navigation. The design system is a standalone product maintained by a dedicated team.\n\n## Design Token Generation\n\`\`\`prompt\nAct as a Lead UI/UX Designer. Generate a complete set of Tailwind CSS design tokens (colors, fonts, spacing) for my project.\n\`\`\`\n- [ ] I have established my design system.\n`
  }
];

let allSuccess = true;
for (const u of topics) {
  if (!updateTopic(u.key, u.content)) {
    allSuccess = false;
  }
}

if (allSuccess) {
  console.log("Batch 3 Deep Content applied!");
} else {
  console.error("Errors occurred in Batch 3.");
  process.exit(1);
}
