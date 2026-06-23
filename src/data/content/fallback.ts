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

## Essential Reading
- [How to Get Startup Ideas](http://paulgraham.com/startupideas.html) by Paul Graham
- [How to Evaluate Startup Ideas](https://www.ycombinator.com/library/6e-how-to-evaluate-startup-ideas) by Kevin Hale (Y Combinator)

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

## Essential Reading
- [How to Validate Your Startup Idea](https://www.lennysnewsletter.com/p/validating-your-startup-idea) by Lenny Rachitsky
- [How to Get and Evaluate Startup Ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas) by Jared Friedman (Y Combinator)

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


`,

  'userpainpoints': `# User Pain Points

**🕒 Estimated Time:** 15-20 min

---

## Overview
A problem statement defines *what* is broken. User Pain Points define *how* it feels and *why* it matters. If you do not intimately understand the friction your users experience daily, you will build features they don't care about. Remember: users don't buy software, they buy a better version of themselves.

---

## Think First
Before relying on AI, document your actual conversations with real humans (or your own experience).

**The "Hair on Fire" Metric** (Is this a mild annoyance, or are they actively bleeding time/money?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Current Workaround** (How are they duct-taping a solution together today? Spreadsheets? Zapier?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Cost of Inaction** (What happens if they NEVER buy your product?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: The "Skin in the Game" Test**
- [ ] They have actively complained about this publicly (e.g., Reddit, Twitter).
- [ ] They are currently paying for a suboptimal tool just to handle this.
- [ ] They have tried to build an in-house tool to solve this.
- [ ] They just shrug when asked about it (Red flag!).

---

## Key Decisions
- **Focusing on the Root Cause:** Users often complain about a symptom ("This export takes too long"). The root cause is usually deeper ("We shouldn't need to export this to Excel in the first place"). 
- **Urgency vs. Importance:** A problem can be important but not urgent. Software that solves *urgent* problems sells 10x faster.

---

## Common Mistakes
- **Leading the Witness:** Asking users "Would you pay for a tool that does X?". People are polite and will say yes. Ask them: "Walk me through how you did X yesterday."
- **Assuming Everyone Has Your Pain:** Just because you hate a specific dev tool doesn't mean non-technical founders care.

---

## AI Prompt
Use this prompt to uncover blind spots in your pain point analysis.

\`\`\`prompt
Act as a skeptical User Researcher at Y Combinator.
My target audience is: [INSERT TARGET AUDIENCE].
The problem they face is: [INSERT PROBLEM STATEMENT].

1. Play Devil's Advocate: Why might this pain point actually NOT be severe enough to make them switch software?
2. What are the secondary or hidden pain points associated with this problem that I haven't considered?
3. Generate 3 specific, open-ended interview questions I should ask my next prospect to uncover their true pain.
\`\`\`

---

## Essential Reading
- [How to get startup ideas](https://www.ycombinator.com/library/8g-how-to-get-startup-ideas) by Y Combinator (Jared Friedman)
- [How to know if you've got product-market fit](https://www.lennysnewsletter.com/p/how-to-know-if-youve-got-productmarket) by Lenny Rachitsky

---

## What Good Looks Like

**Strong Pain Point Validation:**
✓ You have quotes from actual users experiencing the pain.
✓ The pain occurs frequently (daily or weekly).
✓ The user is actively searching for a solution.

**Weak Pain Point Validation:**
✗ You assume the pain based on a shower thought.
✗ The pain happens once a year.
✗ Users don't even realize they have a problem.

---

## Validation Checklist
- [ ] Can you describe the pain point using the exact words of your target user?
- [ ] Have you verified that this pain is attached to a specific budget line-item or time sink?
- [ ] Does solving this pain point directly lead to a measurable outcome (e.g., +20% revenue)?

---

## Deliverable
Summarize the Top 3 User Pain Points below, ranked by severity. For each, list the exact consequence of the pain point.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,

  'targetusers': `# Target Users & Ideal Customer Profile (ICP)

**🕒 Estimated Time:** 20-30 min

---

## Overview
"Everyone" is not a target audience. If you build for everyone, you build for no one. A hyper-specific ICP allows you to build features faster, write better marketing copy, and completely ignore distractions. The goal here is to find the "Bullseye" customer—the subset of people who are desperate for your solution.

---

## Think First
Before using AI, answer these core questions about who is actually pulling out their credit card:

**Demographics & Role** (Who are they exactly? E.g., "B2B SaaS Founders doing $10k-$50k MRR")
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Where do they hang out?** (Subreddits, LinkedIn groups, specific Discord servers)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Superhuman PMF Test** (Who would be "very disappointed" if your product disappeared?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: Budget**
- [ ] Enterprise / High Budget ($1,000+/mo)
- [ ] Mid-Market ($100-$500/mo)
- [ ] Prosumer ($20-$50/mo)
- [ ] Consumer (Reluctant to pay)

---

## Key Decisions
- **B2B vs B2C:** B2C requires massive viral scale because consumers churn fast and hate paying for software. B2B businesses expect to pay for software that saves them time or makes them money.
- **The Bullseye Approach:** Identify the concentric circles of your market. Start entirely focused on the absolute center (the Bullseye) before trying to expand outward.

---

## Common Mistakes
- **Vague Personas:** Saying your target is "Small Business Owners". That's millions of completely different businesses. Be specific: "Plumbing businesses in Texas with 5-10 employees."
- **Listening to the Wrong Users:** Taking feature requests from people who are not in your Bullseye ICP.

---

## AI Prompt
Use this prompt to generate actionable, hypothetical user personas to guide your feature prioritization.

\`\`\`prompt
My SaaS product does: [INSERT ELEVATOR PITCH].

Act as a world-class Product Marketing Manager.
Generate 3 detailed Ideal Customer Profiles (ICPs) for this product using the "Bullseye" framework.
For the Primary "Bullseye" ICP, include:
1. Demographics & Psychographics (Motivations, Frustrations)
2. Where they currently spend money to solve this problem today
3. The absolute best marketing channel to reach them with $0 budget
\`\`\`

---

## Essential Reading
- [How Superhuman Built an Engine to Find Product/Market Fit](https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/) by Rahul Vohra
- [How to find your target market](https://www.lennysnewsletter.com/p/how-to-find-your-target-market) by Lenny Rachitsky

---

## What Good Looks Like

**A strong ICP definition:**
✓ Role-specific and highly constrained
✓ Clear understanding of their budget
✓ Identifiable watering holes (where they hang out)
✓ They actively experience the pain point

**A weak ICP definition:**
✗ "Anyone who wants to save time"
✗ "Small to Medium Businesses (SMBs)"
✗ No clear acquisition channel

---

## Validation Checklist
- [ ] Can you find a list of 100 specific people who fit this profile right now?
- [ ] Do these users have the authority to make a purchasing decision?
- [ ] Have you manually spoken to at least 5 of them?

---

## Deliverable
Define your 1 Primary ICP below. Delete everything else. When you are tempted to build a feature, ask yourself: "Does this specific person actually care about this?"

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,

  'icpidealcustomerprofile': `# Target Users & Ideal Customer Profile (ICP)

**🕒 Estimated Time:** 20-30 min

---

## Overview
"Everyone" is not a target audience. If you build for everyone, you build for no one. A hyper-specific ICP allows you to build features faster, write better marketing copy, and completely ignore distractions. The goal here is to find the "Bullseye" customer—the subset of people who are desperate for your solution.

---

## Think First
Before using AI, answer these core questions about who is actually pulling out their credit card:

**Demographics & Role** (Who are they exactly? E.g., "B2B SaaS Founders doing $10k-$50k MRR")
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Where do they hang out?** (Subreddits, LinkedIn groups, specific Discord servers)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Superhuman PMF Test** (Who would be "very disappointed" if your product disappeared?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: Budget**
- [ ] Enterprise / High Budget ($1,000+/mo)
- [ ] Mid-Market ($100-$500/mo)
- [ ] Prosumer ($20-$50/mo)
- [ ] Consumer (Reluctant to pay)

---

## Key Decisions
- **B2B vs B2C:** B2C requires massive viral scale because consumers churn fast and hate paying for software. B2B businesses expect to pay for software that saves them time or makes them money.
- **The Bullseye Approach:** Identify the concentric circles of your market. Start entirely focused on the absolute center (the Bullseye) before trying to expand outward.

---

## Common Mistakes
- **Vague Personas:** Saying your target is "Small Business Owners". That's millions of completely different businesses. Be specific: "Plumbing businesses in Texas with 5-10 employees."
- **Listening to the Wrong Users:** Taking feature requests from people who are not in your Bullseye ICP.

---

## AI Prompt
Use this prompt to generate actionable, hypothetical user personas to guide your feature prioritization.

\`\`\`prompt
My SaaS product does: [INSERT ELEVATOR PITCH].

Act as a world-class Product Marketing Manager.
Generate 3 detailed Ideal Customer Profiles (ICPs) for this product using the "Bullseye" framework.
For the Primary "Bullseye" ICP, include:
1. Demographics & Psychographics (Motivations, Frustrations)
2. Where they currently spend money to solve this problem today
3. The absolute best marketing channel to reach them with $0 budget
\`\`\`

---

## Essential Reading
- [How Superhuman Built an Engine to Find Product/Market Fit](https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/) by Rahul Vohra
- [How to find your target market](https://www.lennysnewsletter.com/p/how-to-find-your-target-market) by Lenny Rachitsky

---

## What Good Looks Like

**A strong ICP definition:**
✓ Role-specific and highly constrained
✓ Clear understanding of their budget
✓ Identifiable watering holes (where they hang out)
✓ They actively experience the pain point

**A weak ICP definition:**
✗ "Anyone who wants to save time"
✗ "Small to Medium Businesses (SMBs)"
✗ No clear acquisition channel

---

## Validation Checklist
- [ ] Can you find a list of 100 specific people who fit this profile right now?
- [ ] Do these users have the authority to make a purchasing decision?
- [ ] Have you manually spoken to at least 5 of them?

---

## Deliverable
Define your 1 Primary ICP below. Delete everything else. When you are tempted to build a feature, ask yourself: "Does this specific person actually care about this?"

\`\`\`input
✍️ Type your answer here...
\`\`\`
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
