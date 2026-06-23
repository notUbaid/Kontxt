export const fallbackContent: Record<string, string> = {
  'welcome': `# Welcome to Kontxt

**🕒 Estimated Time:** 2 min

---

## The Master Plan

If you are a beginner, building a mass-production SaaS application can feel completely overwhelming. You might have tried asking ChatGPT to "Build me an app," only to realize it gives you a tiny script and gives up.

Kontxt is not just a text editor; it is your **educational and architectural guide**. Our goal is to guide you step-by-step to build a mass-production app. We will teach you:
- How to effectively use AI developers (like Antigravity and Cursor) to write your code.
- How to set up critical infrastructure like Supabase, Auth, and Databases.
- Architectural decision-making: We'll tell you if feature X is important, if you can safely leave out Y to save time, and why concept Z is significant for your project's success.

You are not writing code here. You are building your **Master Project Context**.

---

## Your Workflow

Follow this loop for every Phase in the left sidebar:

1. **Read the Guide:** Understand *why* the topic matters and the architectural trade-offs involved.
2. **Answer the Questions:** Fill in the text boxes under "Think First." Don't worry about being perfect.
3. **Use the AI Prompt:** Copy the provided prompt block, paste it into ChatGPT or Claude along with your answers, and let the AI generate a high-quality, structured response.
4. **Paste the Deliverable:** Paste the final AI response into the "Deliverable" box at the bottom. **Kontxt will automatically save your progress and mark the topic as complete.**

---

## The Master Document (The Magic)

Once the progress bar is completely full, hit **Export** in the top navigation.

Kontxt will generate a \`[project-name]-kontxt.md\` file. This is not a simple dump of your notes. It is a strictly formatted Master Document containing the complete structural blueprint of your app.

Whenever you want to build a feature, start a new chat with an AI Developer (like Antigravity) and simply say:
> *"I have attached my Master Project Context document. Please read it to understand the architecture, then build feature X."*

Let's begin. Scroll down and click the "Next Step" button to start defining your idea!
`,

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

  'personas': `# User Personas & Jobs to be Done

**🕒 Estimated Time:** 30-40 min

---

## Overview
A "Persona" tells you *who* the user is. A "Job to be Done" (JTBD) tells you *why* they buy. High-performing product teams use JTBD to drive the roadmap (what features to build) and Personas to build empathy (how to design and market it). Combining both ensures you build a product that is both useful and resonant.

---

## Think First
Before using AI, ground your personas in reality. Answer these questions based on actual user behavior, not assumptions.

**The "Hire" Trigger** (What specific event caused them to look for a solution today?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Fire" Trigger** (What specific frustration will cause them to abandon your product?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Context & Constraints** (Are they using this on their phone during a commute? Are they locked into strict IT policies?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: The "Vanity" Test**
- [ ] My persona includes irrelevant details (e.g., "likes long walks on the beach").
- [ ] My persona is based entirely on my imagination.
- [ ] My persona focuses heavily on the "Job" they are trying to accomplish.
- [ ] I can map this persona directly to my Ideal Customer Profile (ICP).

---

## Key Decisions
- **JTBD vs Persona:** Use JTBD ("When [situation], I want to [motivation], so I can [expected outcome]") to prioritize your backlog. Use Personas to write marketing copy and design the UI tone.
- **The Decision Maker vs. The End User:** In B2B SaaS, the person buying the software (e.g., VP of Sales) is often not the person using it (e.g., Account Executive). You must define both.

---

## Common Mistakes
- **Assumption-Driven Personas:** Creating fictional characters that don't match real data, leading to a false sense of empathy.
- **Feature-Obsessed Personas:** Defining a user solely by the features they use, rather than the problem they are trying to solve.

---

## AI Prompt
Use this prompt to bridge your ICP with actionable Jobs to be Done.

\`\`\`prompt
Act as a Principal Product Manager specializing in the Jobs to be Done framework.
My target ICP is: [INSERT ICP].
The problem they face is: [INSERT PROBLEM STATEMENT].

Generate 2 detailed User Personas. For each persona, provide:
1. A 1-sentence "Job Story" (When [situation], I want to [motivation], so I can [outcome]).
2. Their primary constraint (Time, Budget, Technical Literacy, Authority).
3. The exact emotion they feel before using the product, and the exact emotion they want to feel after.
\`\`\`

---

## What Good Looks Like

**A strong Persona/JTBD:**
✓ Focuses heavily on the triggering situation and desired outcome.
✓ Highlights real-world constraints (e.g., "Only has 5 minutes between meetings").
✓ Distinguishes between the buyer and the user.

**A weak Persona/JTBD:**
✗ Reads like a fictional biography.
✗ Has no actionable impact on the product roadmap.
✗ Assumes the user has unlimited time to learn a new interface.

---

## Validation Checklist
- [ ] Are these personas based on patterns observed in actual customer interviews?
- [ ] Can you point to a specific feature on your roadmap and explain exactly which "Job" it satisfies?
- [ ] Did you avoid demographic stereotypes in favor of behavioral patterns?

---

## Deliverable
Define your Primary User Persona and their core "Job to be Done" below.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,

  'solutionstatement': `# Solution Statement

**🕒 Estimated Time:** 20-30 min

---

## Overview
The Solution Statement bridges the gap between the Problem and the Product. Using Amazon's famous "Working Backwards" PR/FAQ methodology, this document forces you to articulate exactly *what* you are building, *how* it works, and *why* it is significantly better than the alternatives—all from the customer's perspective, before writing a single line of code.

---

## Think First
Before using AI, clearly define the mechanics of your solution.

**The "Aha!" Moment** (What is the exact moment the user realizes your product is magic?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The Core Mechanism** (How does your product actually solve the root cause of the problem?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The 10x Factor** (Why is this fundamentally better, faster, or cheaper than the workaround?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: Feasibility**
- [ ] Can this solution be built by my current team within 3 months?
- [ ] Does this solution rely on unproven or inaccessible technology?
- [ ] Is the solution completely dependent on massive network effects to work?
- [ ] Does the solution directly address the "Hair on Fire" pain point?

---

## Key Decisions
- **Narrative over Bullet Points:** A solution statement should read like a press release. It must be compelling, customer-centric, and completely devoid of technical jargon.
- **Verifiable Value:** Avoid vague claims like "it makes you more productive." Use verifiable claims like "it reduces the time to generate a report from 3 hours to 3 seconds."

---

## Common Mistakes
- **Focusing on Features, Not Benefits:** Customers don't care about your React frontend or your AI backend. They care about what the product *does for them*.
- **Building a Better Mousetrap:** If your solution solves the problem in the exact same way as existing products, but just looks slightly nicer, it will fail. You need a paradigm shift.

---

## AI Prompt
Use this prompt to draft a compelling, Amazon-style Press Release for your solution.

\`\`\`prompt
Act as a "Bar Raiser" at Amazon, an expert in the Working Backwards methodology.
My problem statement is: [INSERT PROBLEM STATEMENT].
My proposed solution mechanism is: [INSERT CORE MECHANISM].

Draft the "Solution Paragraph" of a PR/FAQ Press Release.
1. It must be written entirely from the customer's perspective.
2. It must clearly explain how the product works without using any technical jargon.
3. It must emphasize the "Aha!" moment and the specific, verifiable benefit over existing workarounds.
Make it punchy and persuasive.
\`\`\`

---

## What Good Looks Like

**A strong Solution Statement:**
✓ Customer-centric language (focuses on benefits, not features).
✓ Clearly maps back directly to the identified root cause of the pain point.
✓ Provides a concrete, verifiable outcome.

**A weak Solution Statement:**
✗ Reads like a technical spec sheet or an architecture diagram.
✗ Uses buzzwords ("AI-powered synergy platform").
✗ Solves a problem that wasn't previously identified.

---

## Validation Checklist
- [ ] If you read this statement to a non-technical user, would they instantly understand what the product does?
- [ ] Does the solution offer a meaningfully better experience than the current workaround?
- [ ] Are you excited to actually build this?

---

## Deliverable
Write your official 1-paragraph Solution Statement (Press Release style) below.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,

  'valueproposition': `# Value Proposition

**🕒 Estimated Time:** 20-30 min

---

## Overview
A Value Proposition is not a marketing slogan (like Nike's "Just Do It"). It is a clear, concise statement that explains exactly what measurable benefit your product delivers, and why the customer should buy it from you instead of a competitor. We use the **Value Proposition Canvas** by Strategyzer to guarantee problem-solution fit.

---

## Think First
Map your solution against the customer's actual reality.

**Pain Relievers** (How exactly does your product eliminate or minimize the customer's "Hair on Fire" pain?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Gain Creators** (What unexpected, magical outcomes does your product create that the customer didn't even know they wanted?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "So What?" Test** (If you list your best feature to a customer, and they rudely reply "So what?", what is your answer?)
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: The Differentiation Axis**
- [ ] My product is 10x Faster.
- [ ] My product is 10x Cheaper.
- [ ] My product provides a 10x Better Experience.
- [ ] (Warning: You cannot choose all three. Pick one).

---

## Key Decisions
- **Features vs. Benefits:** "256-bit AES Encryption" is a feature. "You will never get sued for a data breach" is a benefit. Your value proposition must only contain benefits.
- **The Core Differentiator:** If your value proposition sounds identical to a competitor's, you do not have a value proposition.

---

## Common Mistakes
- **Being a "Vitamin":** Selling nice-to-have improvements rather than "Painkiller" solutions that stop active bleeding.
- **Vague Promises:** Using phrases like "Increases productivity" or "Empowers teams." Use hard numbers and specific outcomes.

---

## AI Prompt
Use this prompt to build out a complete Value Proposition Canvas.

\`\`\`prompt
Act as a Product Strategist specializing in the Strategyzer Value Proposition Canvas.
My target customer is: [INSERT ICP].
My solution is: [INSERT SOLUTION STATEMENT].

Generate a Value Proposition Canvas:
1. Customer Profile: List 3 functional Jobs, 3 extreme Pains, and 3 desired Gains.
2. Value Map: List the specific Products/Services, 3 Pain Relievers, and 3 Gain Creators.
3. Finally, synthesize this into a single, punchy 2-sentence Value Proposition statement.
\`\`\`

---

## What Good Looks Like

**A strong Value Proposition:**
✓ Specific and measurable (e.g., "Cuts reporting time by 80%").
✓ Passes the "So What?" test instantly.
✓ Clearly differentiated from the status quo.

**A weak Value Proposition:**
✗ Loaded with adjectives ("The most innovative, seamless, scalable platform").
✗ Focuses on the company, not the customer.
✗ Completely interchangeable with a competitor's website copy.

---

## Validation Checklist
- [ ] Is there exactly ONE primary benefit highlighted?
- [ ] Have you removed all technical jargon?
- [ ] If a customer reads this, do they instantly know if it's for them or not?

---

## Deliverable
Write your official 1-2 sentence Value Proposition below.

\`\`\`input
✍️ Type your answer here...
\`\`\`
`,

  'elevatorpitch': `# Elevator Pitch

**🕒 Estimated Time:** 15-20 min

---

## Overview
The goal of an elevator pitch is not to explain every feature of your business. The goal is to be interesting enough that the listener says, "Tell me more." We use Geoffrey Moore's framework to *think* about our strategy, and the Y Combinator framework to actually *speak* to humans.

---

## Think First
Use Geoffrey Moore's "Crossing the Chasm" mad-libs format to clarify your internal strategy.

**For** (target customer) **who are dissatisfied with** (current workaround), **our product is a** (product category) **that provides** (key benefit). **Unlike** (the alternative), **we** (primary differentiator).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The YC "XYZ" Format** (We are doing [X] for [Y] that does [Z]).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**The "Mom Test"** (Explain it in one sentence. If your mom wouldn't understand it, rewrite it).
\`\`\`input
✍️ Type your answer here...
\`\`\`

**Reality Check: The "Jargon" Filter**
- [ ] I removed the word "AI-powered" (unless it is literally an AI infrastructure company).
- [ ] I removed the word "Platform".
- [ ] I removed the word "Synergy" or "Empower".
- [ ] I can say it out loud in less than 10 seconds without running out of breath.

---

## Key Decisions
- **Clarity over Comprehensiveness:** When someone asks what Airbnb does, they don't say "A two-sided marketplace utilizing dynamic pricing algorithms." They say, "We help you rent out your spare bedroom."
- **The "Why Now?":** Investors and smart hires will ask why this didn't exist 5 years ago. Is there a new technology? A regulatory shift? A cultural change?

---

## Common Mistakes
- **Pitching the Tech Stack:** Nobody cares that you are using Rust and WebSockets. They care about what the product does.
- **Explaining the "How" before the "What":** Say what the product is *before* you explain how it works under the hood.

---

## AI Prompt
Use this prompt to distill your strategy into a YC-style pitch.

\`\`\`prompt
Act as Michael Seibel from Y Combinator. You are ruthless about clarity and hate jargon.
My target customer is: [INSERT ICP].
My solution is: [INSERT SOLUTION STATEMENT].
My differentiator is: [INSERT KEY DIFFERENTIATOR].

Generate 3 different variations of a 10-second elevator pitch using the YC framework. 
They must be written in plain English, completely devoid of buzzwords, and immediately explain exactly what the product actually does.
\`\`\`

---

## What Good Looks Like

**A strong Elevator Pitch:**
✓ "We are Stripe. We provide an API that lets developers accept credit cards on the internet."
✓ Conversational, confident, and simple.

**A weak Elevator Pitch:**
✗ "We are a B2B SaaS synergistic platform that leverages machine learning to optimize enterprise workflows."
✗ Defensive, complex, and full of buzzwords.

---

## Validation Checklist
- [ ] Does it take less than 15 seconds to say out loud?
- [ ] Would a 12-year-old understand exactly what you do?
- [ ] Does it invite a follow-up question rather than confusion?

---

## Deliverable
Write your final, Y Combinator-style Elevator Pitch below. Memorize it.

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
