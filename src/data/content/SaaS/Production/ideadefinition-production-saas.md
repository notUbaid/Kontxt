---
title: Idea Definition
slug: idea-definition
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Idea Definition

Most founders can describe their idea in 30 seconds. Most cannot describe it precisely enough to make a single architectural decision.

This module fixes that.

The goal is not to pitch your idea. The goal is to dissect it — expose the assumptions, name the constraints, identify what you actually know versus what you are guessing.

Everything built after this module depends on what you define here.

---

## Why Precision Matters at This Stage

Vague ideas produce vague products.

A vague idea becomes a vague PRD, which becomes a vague schema, which becomes a codebase that nobody — including you — can reason about six months later.

The discipline of defining your idea precisely is not a product management exercise. It is an engineering prerequisite.

| Vague | Precise |
|---|---|
| "An app for freelancers" | "A time-tracking and invoicing tool for independent designers who bill hourly" |
| "AI-powered productivity" | "A Slack bot that summarises unread threads for async teams in different timezones" |
| "Better project management" | "A lightweight task tracker for solo consultants who find Jira and Notion both too heavy" |
| "A marketplace for creatives" | "A commission marketplace connecting independent illustrators with indie game studios" |

Precise ideas make every downstream decision faster and cheaper. Vague ideas make every downstream decision a negotiation with yourself.

---

## The Six Dimensions of an Idea

A well-defined idea has answers to all six. Most first drafts have two or three.

```
1   WHO        The specific person with the problem
2   WHAT       The exact problem they have
3   WHEN       The moment the problem occurs
4   WHY NOW    Why this problem is worth solving today
5   HOW        The mechanism of your solution
6   WHY YOU    Why you are positioned to solve it
```

Work through each dimension before moving to the next module. Gaps here become expensive later.

---

## Dimension 1 — WHO

Not "small businesses." Not "developers." Not "people who want to be more productive."

A person. With a job title, a context, and a recognisable day.

**Ask yourself:**
- What is their job title or role?
- What industry or context are they in?
- How technical are they?
- What tools do they already use?
- What does their typical workday look like?

**The specificity test:** Can you picture one real person who fits this description? If yes, you are specific enough. If you are picturing a category of people, you are not.

> You will expand to other user types later. Start with one. The ICP module will formalise this. Here, just get specific enough to have a real person in mind.

---

## Dimension 2 — WHAT

The problem. Not the solution dressed up as a problem.

**Solution dressed as a problem:** "Freelancers don't have a good invoicing tool."  
**Actual problem:** "Freelancers consistently undercharge because they don't track time accurately while working, and estimate from memory when it's time to invoice."

The difference: the second version describes a behaviour and its consequence. The first describes the absence of your product.

**Ask yourself:**
- What does the user currently do instead of using your product?
- What goes wrong with that approach?
- What is the consequence — financial, time, emotional, reputational?
- How often does this problem occur?
- How much does it cost them (in time, money, or stress) each time?

---

## Dimension 3 — WHEN

The moment of friction. The specific trigger that makes the problem acute.

This is the scene. Be specific.

**Weak:** "When managing projects"  
**Strong:** "At the end of the month, when a freelancer opens their calendar to write an invoice and realises they have no idea how many hours they actually worked across three different clients"

The "when" determines your product's entry point — where the user first encounters your product in their workflow, and what they need to do immediately.

If you cannot describe the moment, you do not yet understand the problem well enough to design for it.

---

## Dimension 4 — WHY NOW

Every unsolved problem has a reason it has not been solved yet. Something has changed that makes now the right time.

Common catalysts:

| Catalyst | Example |
|---|---|
| New technology | AI makes personalisation cheap enough for solo products |
| Market shift | Remote work created demand for async collaboration tools |
| Regulatory change | GDPR created demand for data compliance tooling |
| Incumbent failure | A dominant tool raised prices, alienated a user segment |
| Underserved niche | A broad tool exists but ignores a specific vertical |
| Distribution shift | A new platform (mobile, Slack, Notion) opened a new surface |

If you cannot name a "why now," your idea is not wrong — but you need to think harder about what has changed. A problem that existed five years ago and has not been solved is either unsolvable, too small, or waiting for the right distribution.

---

## Dimension 5 — HOW

Your mechanism. Not your feature list — the core insight that makes your approach work.

**Feature list:** "We have time tracking, project management, invoicing, and a client portal."  
**Mechanism:** "We auto-detect project context from calendar events, so time is tracked passively without the user changing their behaviour."

The mechanism is the thing that makes your solution different from the alternative. It is also the thing you will defend in every architecture, design, and prioritisation decision.

One sentence. The mechanism of your solution.

---

## Dimension 6 — WHY YOU

Why are you specifically positioned to build and grow this?

This is not a vanity question. It is a risk question. Investors ask it. Your future self will ask it when things get hard.

Valid answers include:
- Domain expertise ("I worked in this industry for 5 years and know the problem intimately")
- Technical advantage ("I have specific knowledge that makes the hard part tractable")
- Distribution ("I have direct access to the target users")
- Lived experience ("I am the user — I built this because I needed it")
- Prior failed attempt ("I tried to solve this a different way and learned exactly where the real problem is")

"I think it's a good idea" is not a valid answer.

---

## AI Prompt: Idea Stress Test

Use this after you have drafted answers to all six dimensions.

```
I am defining a SaaS idea and want to stress-test it before moving into product and architecture decisions.

Here is my current idea definition:

WHO: [your answer]
WHAT: [your answer]
WHEN: [your answer]
WHY NOW: [your answer]
HOW: [your answer]
WHY YOU: [your answer]

For each dimension:
1. Identify any vagueness that would prevent someone from making a product decision based on this answer
2. Flag any dimension where I appear to be guessing rather than describing something I know
3. Rewrite any weak dimension with a sharper, more specific version based on what I've written

Then:
4. Name the single riskiest assumption in this idea — the one thing, if wrong, that invalidates the entire product
5. Suggest 2–3 questions I should be able to answer before moving to Problem Statement — things that would change this idea definition if the answer were different from what I'm assuming
```

---

## The Riskiest Assumption

Every idea contains one assumption that, if wrong, makes the rest irrelevant.

Name yours explicitly. Write it down.

**Examples:**
- "Freelance designers actually do undercharge because of poor time tracking — not because they choose to"
- "Teams using Slack actually want AI summaries — they don't just need better notification management"
- "Indie game studios have budget for commissioned illustration — they don't just use asset packs"

You are not expected to have validated this assumption yet. The Problem Statement and User Pain Points modules will do that work. But naming it now means every discovery activity between here and your first line of code is focused on answering the right question.

---

## What Changes as You Learn More

This definition is a starting point, not a contract.

Expect it to change. Specifically:

- WHO often narrows after user interviews
- WHAT often deepens once you understand the full workflow
- HOW often pivots once you learn what the alternatives actually do wrong
- WHY YOU may grow as you develop distribution or domain knowledge

Version your idea definition. When you update it, note what changed and why. This record becomes your product history — useful when you are explaining decisions to a co-founder, investor, or future team member.

---

## Validation Checklist

Before moving to Problem Statement:

**WHO**
- [ ] I can name a job title or specific role
- [ ] I can describe their existing workflow around this problem
- [ ] I can name at least one real person who fits this description

**WHAT**
- [ ] My problem statement describes a behaviour and its consequence, not the absence of my product
- [ ] I know what users currently do instead (the workaround)
- [ ] I can estimate how often this problem occurs and what it costs

**WHEN**
- [ ] I can describe the specific moment the problem becomes acute
- [ ] That moment tells me where in the user's workflow my product enters

**WHY NOW**
- [ ] I can name at least one thing that has changed to make this solvable or viable now
- [ ] That change is real, not just "AI is popular"

**HOW**
- [ ] I can describe my mechanism in one sentence
- [ ] That sentence explains what is different about my approach, not just what features I have

**WHY YOU**
- [ ] I have a specific, honest answer that is not "I think it's a good idea"

**Overall**
- [ ] I have named my riskiest assumption explicitly
- [ ] I know what question I need to answer before my next major decision

---

## What Comes Next

The Problem Statement module takes your WHAT dimension and deepens it — turning it from a sentence into a validated, evidence-backed foundation that your entire PRD and architecture will reference.

If your WHAT feels shaky, that is the right instinct. Problem Statement will pressure-test it.
