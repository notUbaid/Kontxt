export const fallbackContent: Record<string, string> = {
  'ideadefinition': `# Idea Definition

**🕒 Estimated Time:** 15-20 min

---

## Overview
Welcome to Phase 0. Before writing any code or choosing a database, we must clearly define what you are building. This document serves as the foundational anchor for your project. A blurry idea leads to a blurry product.

---

## Think First
Before you ask AI to evaluate your idea, answer these questions honestly. Type your answers right here:

**Core Value Proposition** (If you could only do ONE thing, what is it?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Target Audience** (Who exactly needs this?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Existing Solution** (What do they use today?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Unfair Advantage** (Why are *you* the one to build this?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Why Now?** (Why does this idea make sense in 2026 but not 2022?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Key Decisions
- Hackathon vs Production: If Hackathon, prioritize a gimmick and speed. If Production, prioritize a clear path to revenue.
- Focus: Narrow your target audience. You cannot build for "everyone".

---

## Common Mistakes
- **Solution looking for a problem:** Building a cool AI wrapper without a real-world use case.
- **Overestimating the Unfair Advantage:** Thinking "better UI" is an unfair advantage. It's not. Distribution is an unfair advantage.

---

## AI Prompt
Use this prompt to stress-test your idea. It will automatically read the answers you typed above.

\`\`\`prompt
Act as a brutally honest Senior Product Manager and SaaS Founder.
Read my Idea Definition above.

Challenge my assumptions. Do not validate my idea automatically.
1. What is the biggest, most fatal flaw in this idea?
2. What feature am I likely overestimating the importance of?
3. What 3 difficult questions do I need to answer before writing any code?
\`\`\`

---

## What Good Looks Like

**A strong idea definition:**
✓ Hyper-specific target audience
✓ Solves an active, painful problem
✓ Clear path to monetization
✓ Has a real unfair advantage

**A weak idea definition:**
✗ "For everyone"
✗ A "nice to have" vitamin, not a painkiller
✗ Depends on achieving viral consumer scale
✗ Unfair advantage is just "better UI"

---

## Validation Checklist
- [ ] Can you explain the idea to a non-technical person in under 15 seconds?
- [ ] Does the idea solve a real pain point, or is it just cool tech?
- [ ] Is the scope narrow enough to actually launch within your timeline?

---

## Deliverable
At the bottom of this page, write a definitive 3-sentence summary of your idea. This will be referenced by Kontxt AI for all future phases.

\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Next Step
Move on to **Problem Statement** to validate that your idea actually solves something painful.
`,

  'elevatorpitch': `# Elevator Pitch

The Elevator Pitch is a highly condensed summary of your product's value proposition. You should be able to say it out loud in 15 seconds.

## Why It Matters
If you cannot explain your product quickly and clearly, you will lose the attention of investors, customers, and even your own team. A strong elevator pitch forces you to distill your idea down to its absolute core.

## The Formula
A great elevator pitch usually follows this structure:
**For** [target audience] 
**Who** [have this specific problem], 
**Our product is a** [category] 
**That provides** [core benefit/solution]. 
**Unlike** [competitor/alternative], 
**We** [unfair advantage/key differentiator].

## AI Prompt Guidance

If you are struggling to condense your idea, ask AI to help you draft options based on your Problem Statement and Value Proposition.

\`\`\`prompt
My product solves [PROBLEM] for [TARGET AUDIENCE]. 
Our main benefit is [BENEFIT] and our key differentiator from [COMPETITOR] is [DIFFERENTIATOR].

Act as a world-class copywriter. Draft 3 distinct elevator pitches using the standard formula. Keep them punchy, avoid jargon, and ensure they can be spoken aloud in under 15 seconds.
\`\`\`

## Deliverable Expectations
Draft your final 1-2 sentence Elevator Pitch below.
`,

  'problemstatement': `# Problem Statement

**🕒 Estimated Time:** 20-30 min

---

## Overview
Your product does not exist in a vacuum. It exists to eliminate a specific, painful problem. Founders often fall in love with their solution and ignore the problem. If the problem isn't painful enough, people won't pay for your SaaS, no matter how beautiful the UI is.

---

## Think First
Before using AI, answer these questions to capture project memory.

**Current Workflow** (What is the exact workflow that is broken?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Current Workaround** (How do they solve it today? e.g., Spreadsheets, Zapier)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Cost of Problem** (How much time/money does this cost them?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: Market Size**
- [ ] Thousands
- [ ] Tens of Thousands
- [ ] Millions
- [ ] Not Sure

**Reality Check: Willingness to Pay**
- [ ] Definitely
- [ ] Maybe
- [ ] Unlikely

---

## Key Decisions
- **Vitamin vs. Painkiller:** Does your app make things slightly better (vitamin) or does it cure a massive headache (painkiller)? SaaS products that are painkillers are much easier to sell.
- **Urgency:** How often does the user experience this problem? Daily? Annually?

---

## Common Mistakes: Symptoms vs Root Cause
Most founders solve symptoms, not causes. 
- **Symptom:** Students miss deadlines.
- **Root Cause:** Assignments are spread across 5 different learning platforms.

---

## AI Prompt
Use this prompt to expand your understanding of the problem space.

\`\`\`prompt
Act as a skeptical user research expert. Read my problem inputs above.

1. Tell me why this problem might actually NOT be as painful as I think it is.
2. What are the secondary or hidden pain points associated with this problem that I haven't considered?
3. Based on my "Symptom", what are 3 alternative "Root Causes" I might be ignoring?
\`\`\`

---

## What Good Looks Like

**A strong problem statement:**
✓ Specific
✓ Quantifiable
✓ Repeated frequently
✓ Expensive to ignore

**A weak problem statement:**
✗ Vague
✗ Rare
✗ No measurable impact

---

## Validation Checklist
- [ ] The problem exists independent of your proposed solution.
- [ ] You have identified a root cause, not just a symptom.
- [ ] Users are actively spending time or money attempting to fix this today.

---

## Deliverable
Write a 3-part Problem Statement below:
1. **The Current State:** How things are done today.
2. **The Flaw:** Why the current state is terrible.
3. **The Impact:** The cost (time, money, sanity) of the flaw.

\`\`\`input
✍️ Type your answer here...
\`\`\`

---

## Next Step
Move on to **Target Users** to define exactly who feels this problem the most.
`,

  'targetusers': `# Ideal Customer Profile (ICP) & Target Users

Who exactly is pulling out their credit card to pay for your software?

## Why It Matters
"Everyone" is not a target audience. If you build for everyone, you build for no one. A hyper-specific ICP allows you to build features faster, write better marketing copy, and ignore distractions.

## Decisions You Must Make
- [ ] Are you B2B (selling to businesses) or B2C (selling to consumers)?
- [ ] What is the specific job title or role of your buyer?
- [ ] What is their budget?
- [ ] Where do they hang out on the internet? (Reddit, LinkedIn, Discord?)

> [!TIP]
> **Example ICP:** "B2B SaaS founders doing $10k-$50k MRR who are actively running Facebook Ads but struggling with attribution."

## How to Use AI Effectively

AI is fantastic for generating hypothetical user personas that you can use to guide your design and feature prioritization.

\`\`\`prompt
My SaaS product does: [INSERT ELEVATOR PITCH].

Please generate 3 detailed Ideal Customer Profiles (ICPs). For each ICP, include:
- Demographics (Role, Company Size)
- Psychographics (Motivations, Frustrations)
- Where they currently spend money to solve this problem
- The specific marketing channel most likely to reach them
\`\`\`

## Deliverable Expectations
List 1 Primary ICP and 1 Secondary ICP below. Delete everything else. When you are tempted to build a feature, ask yourself: "Does my Primary ICP actually care about this?"
`,

  'icpidealcustomerprofile': `# Ideal Customer Profile (ICP) & Target Users

Who exactly is pulling out their credit card to pay for your software?

## Why It Matters
"Everyone" is not a target audience. If you build for everyone, you build for no one. A hyper-specific ICP allows you to build features faster, write better marketing copy, and ignore distractions.

## Decisions You Must Make
- [ ] Are you B2B (selling to businesses) or B2C (selling to consumers)?
- [ ] What is the specific job title or role of your buyer?
- [ ] What is their budget?
- [ ] Where do they hang out on the internet? (Reddit, LinkedIn, Discord?)

> [!TIP]
> **Example ICP:** "B2B SaaS founders doing $10k-$50k MRR who are actively running Facebook Ads but struggling with attribution."

## How to Use AI Effectively

AI is fantastic for generating hypothetical user personas that you can use to guide your design and feature prioritization.

\`\`\`prompt
My SaaS product does: [INSERT ELEVATOR PITCH].

Please generate 3 detailed Ideal Customer Profiles (ICPs). For each ICP, include:
- Demographics (Role, Company Size)
- Psychographics (Motivations, Frustrations)
- Where they currently spend money to solve this problem
- The specific marketing channel most likely to reach them
\`\`\`

## Deliverable Expectations
List 1 Primary ICP and 1 Secondary ICP below. Delete everything else. When you are tempted to build a feature, ask yourself: "Does my Primary ICP actually care about this?"
`,

  'mvpfeatures': `# MVP Features (Minimum Viable Product)

The MVP is the absolute minimum set of features required to prove that your solution solves the problem.

## Why It Matters
Feature creep is the #1 killer of software projects. You do not need a dark mode toggle, social login, or a complex notification system to validate your core hypothesis.

> [!CAUTION]
> **Common Mistake:** Building an admin dashboard before you even have a single user.

## Decisions You Must Make
- [ ] What is the **Core Loop**? (The 1-2 actions a user takes that delivers the value).
- [ ] What features are absolutely necessary for the Core Loop?
- [ ] What features can be manually done by you behind the scenes (Concierge MVP)?
- [ ] What are the "Nice to Haves" that must be cut?

## Feature Prioritization Matrix
When deciding what makes the cut, map your ideas on this matrix:
1. **High Impact, Low Effort:** Build immediately.
2. **High Impact, High Effort:** Build if it's the core differentiator.
3. **Low Impact, Low Effort:** Ignore for now.
4. **Low Impact, High Effort:** Never build.

## AI Prompt Guidance

Use AI to aggressively cut scope.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My current feature list is:
[PASTE FEATURE LIST]

Act as a ruthless CTO focused on shipping in 2 weeks. 
1. Categorize these features into "Must Have for MVP" and "Cut for Now".
2. For the "Must Haves", suggest the absolute simplest, most hard-coded way I can implement them to save time.
\`\`\`

## Deliverable Expectations
Create a checklist below of the 3 to 5 features that constitute your MVP. If there are more than 5, you are probably building too much.
`,

  'businessmodel': `# Business Model & Pricing

How will this product actually make money?

## Why It Matters
A great product with a fundamentally broken business model is a hobby, not a business. Your pricing dictates your marketing strategy, your feature set, and your architecture.

## Key Concepts
- **B2C vs B2B Pricing:** Consumers hate subscriptions and churn fast. Businesses expect subscriptions and churn slowly.
- **Freemium vs. Free Trial:** Freemium is a marketing expense; only do it if free users naturally invite paid users (like Slack or Zoom). Otherwise, use a 14-day Free Trial.
- **Pricing Tiers:** Usually 3 tiers: Basic (Anchor), Pro (What you want them to buy), and Enterprise (Decoy/Custom).

## Decisions You Must Make
- [ ] Will you charge Monthly/Annually (SaaS) or Pay-Per-Usage?
- [ ] What is the starting price point? (Don't underprice. $9/mo is often harder to sell than $29/mo because of perceived value).
- [ ] What is the "Value Metric"? (e.g., Mailchimp charges per subscriber, Stripe charges per transaction. What do you charge per?)

## AI Prompt Guidance

Pricing is hard. Use AI to generate pricing models based on competitor data.

\`\`\`prompt
My SaaS product is: [INSERT ELEVATOR PITCH].
My target users are: [INSERT ICP].

Act as a SaaS Pricing Strategist.
1. Suggest 3 distinct pricing models (e.g., Flat Rate, Usage-based, Per-seat).
2. Recommend the exact starting price for each, and explain the psychological reasoning behind the number.
3. What feature should be the "paywall trigger" that forces users to upgrade?
\`\`\`

## Deliverable Expectations
Define your Value Metric and draft your 3 pricing tiers below. Keep it simple. You will change this later anyway.
`
};
