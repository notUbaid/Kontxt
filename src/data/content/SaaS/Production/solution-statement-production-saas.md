---
title: Solution Statement
slug: solution-statement
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Solution Statement

You have defined the problem precisely. You have mapped your users, their pain, and the profile of who you are building for first.

Now you need to define what you are building — not as a feature list, not as a pitch, but as a precise statement of mechanism, differentiation, and fit.

The solution statement is the document that keeps your product coherent under pressure. When a new feature request arrives, when a competitor ships something similar, when you are three months into development and questioning a decision — the solution statement is what you return to.

---

## What a Solution Statement Is Not

**Not a tagline.**
"The fastest way to invoice clients" is marketing copy. It tells you nothing about how the product works or why it works for a specific user.

**Not a feature list.**
"Time tracking, project management, invoicing, and client portals" is a backlog. It describes what you plan to build, not what you are solving or why your approach works.

**Not a vision statement.**
"We believe every freelancer deserves to be paid fairly" is a value. Values are important but they do not constrain product decisions.

A solution statement is a precise, technical claim about what your product does, how it does it, who it does it for, and why that approach works better than the alternative.

---

## The Four Components

```
1   MECHANISM       How your solution actually works
2   USER FIT        Who it works for and why it fits their context
3   DIFFERENTIATION What makes your approach distinct
4   OUTCOME         What changes for the user when it works
```

Every component must be present. A statement missing any one of them is incomplete.

---

## Component 1 — Mechanism

The mechanism is the core technical or design insight that makes your solution work.

It is not what the product does. It is how it does it in a way that solves the failure point identified in your problem statement.

Return to your problem statement. Find the failure point — the specific moment where the current approach breaks down. Your mechanism should interrupt that failure.

**Problem failure point:** "Users do not sustain timer behaviour because starting a timer requires deliberate action before beginning work."

**Mechanism:** "The product infers project context from calendar events and running applications, logging time passively without requiring the user to start or stop a timer."

The mechanism is the answer to: why does this work when the alternatives have failed?

If you cannot state the mechanism in two sentences, you do not yet understand your own solution well enough to build it.

---

## Component 2 — User Fit

Why does your mechanism fit this specific user's context?

Connect your mechanism to the behaviours, mental model, and technical comfort level you defined in your persona. A mechanism that works technically but conflicts with how your user actually works will fail in the field.

**Weak user fit statement:** "This works for freelancers who want to track their time."

**Strong user fit statement:** "Because the tracking is passive and requires no behaviour change, it fits designers who work in focused, uninterrupted sessions and have failed to sustain active timer habits in every previous tool they have tried."

The strong version explains *why* the mechanism matches this user — not just that it does.

---

## Component 3 — Differentiation

What is distinct about your approach?

Differentiation is not about features. It is about the angle of attack — the specific way your solution addresses the problem that competitors do not.

Differentiation comes from four sources:

| Source | Description | Example |
|---|---|---|
| **Mechanism** | You solve it differently | Passive tracking vs active timers |
| **User segment** | You solve it for someone competitors ignore | Solo designers vs agencies |
| **Integration point** | You solve it where they already are | Inside Figma vs a separate app |
| **Business model** | You make the economics work differently | Per-project pricing vs per-seat |

You do not need differentiation on all four. You need at least one that is real, defensible, and relevant to your ICP.

Avoid claiming differentiation on quality ("we do it better"), speed ("we do it faster"), or simplicity ("we are easier to use") without a specific mechanism behind the claim. These are not differentiators — they are aspirations.

---

## Component 4 — Outcome

What is measurably different about the user's situation after your product works?

Outcomes are not features delivered. They are changes in the user's work or life.

**Not an outcome:** "Users can generate invoices in one click."
**Outcome:** "Freelancers recover 15–30% of revenue they were previously leaving on the table through inaccurate time reconstruction."

The outcome should connect directly to the consequences you named in your problem statement. If you described financial loss as a consequence of the problem, your outcome should describe financial recovery. If you described administrative stress, your outcome should describe reduced administrative burden.

Outcomes also serve as your success metrics. If you cannot measure whether the outcome occurred, you cannot know if your product is working.

---

## Writing Your Solution Statement

Combine all four components into a single coherent paragraph.

**Structure:**

> [Product name] helps [specific user] [achieve outcome] by [mechanism]. Unlike [alternative approach], [differentiation]. It is designed for [user fit context].

This is a starting structure, not a rigid template. The goal is a statement that is technically precise, grounded in your user research, and honest about what is distinct.

**Example:**

> Timely helps independent designers recover accurate billing for every project by inferring project context from calendar events and open applications, logging time passively without requiring behaviour change. Unlike active timer tools that fail because designers do not sustain the habit of starting and stopping a timer, Timely removes the habit requirement entirely. It is designed for designers who work in focused sessions and have historically reconstructed hours from memory at invoice time.

Every sentence in this example is doing work. The mechanism is named. The user fit is explicit. The differentiation is specific. The outcome is implied in "recover accurate billing."

---

## AI Prompt: Solution Statement Draft

```
I am writing a solution statement for a production SaaS product.

Here is my research foundation:

Problem statement: [paste from Problem Statement module]
Primary persona: [paste from Personas module]
ICP: [paste ICP summary]
Top pain points: [list]
My current solution idea: [describe]

Write a solution statement that includes all four components:
1. Mechanism — how the solution works, specifically addressing the failure point in the problem statement
2. User fit — why the mechanism matches this user's context, behaviour, and mental model
3. Differentiation — what is genuinely distinct about this approach (not quality, speed, or simplicity without a mechanism behind the claim)
4. Outcome — what measurably changes for the user when the product works

Then:
5. Identify the weakest component in the statement and rewrite it
6. Flag any differentiation claim that is not defensible — where a competitor could reasonably say the same thing
7. Suggest one outcome metric I could use to measure whether the product is actually working

Length: 150–200 words. No marketing language. No feature lists.
```

---

## Testing Your Solution Statement

### The Competitor Test

Read your solution statement and ask: could a competitor write this exact statement about their product?

If yes, your differentiation component is not specific enough. The mechanism or user fit must be sharper.

### The Engineer Test

Hand your solution statement to a developer with no prior context. Can they sketch a rough system architecture from it? If not, the mechanism is still too vague to build from.

### The User Test

Read the outcome component to three users who fit your ICP. Do they say "yes, that is exactly what I need" — or do they look confused, or suggest a different outcome that matters more to them?

If users identify a different outcome as more compelling, your outcome component is either wrong or underselling what they actually care about.

### The Constraint Test

For every feature idea that arises during development, test it against the solution statement: does this feature serve the mechanism, reinforce the user fit, sharpen the differentiation, or improve the outcome?

If no, the feature is scope creep. The solution statement is the constraint that keeps your product from becoming everything to everyone.

---

## Solution Statement as a Living Document

The solution statement is stable but not immutable.

Update it when:
- User research reveals a different failure point than the one you identified
- A competitor enters with the same mechanism, eliminating your differentiation
- Early retention data shows users value a different outcome than the one you optimised for
- A technical constraint makes your mechanism unviable and you pivot to a different approach

When you update it, record what changed and why. The history of your solution statement is the history of your product thinking.

---

## Checklist: Solution Statement Complete

**Components**
- [ ] Mechanism is named — specifically addresses the failure point from the problem statement
- [ ] User fit explains why the mechanism matches this user's context and behaviour
- [ ] Differentiation names a specific angle of attack — not quality, speed, or simplicity without a mechanism
- [ ] Outcome describes a measurable change in the user's situation

**Quality**
- [ ] No competitor could write this exact statement about their product
- [ ] A developer could sketch a rough architecture from the mechanism component alone
- [ ] At least one user confirmed the outcome component describes what they actually want
- [ ] No feature language anywhere in the statement

**Utility**
- [ ] At least one outcome metric is identified
- [ ] The statement has been used to reject at least one feature that did not serve it
- [ ] The statement is stored where it will be referenced throughout development

---

## What Comes Next

The Elevator Pitch translates your solution statement into the version you say out loud — calibrated for a specific audience, stripped to its essential logic, and rehearsed enough to be natural under pressure.
