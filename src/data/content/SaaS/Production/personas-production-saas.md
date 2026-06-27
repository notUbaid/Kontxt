---
title: Personas
slug: personas
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Personas

A persona is not a character profile. It is not a stock photo with a name and a list of hobbies.

A persona is a decision-making tool. It exists to make product decisions faster and more consistent — to replace "what should this button say?" with "what would Maya do here?" and get a useful answer.

If your personas cannot answer product questions, they are decoration.

---

## Personas vs ICP

These serve different purposes and should not be collapsed into one.

| ICP | Persona |
|---|---|
| Business tool | Design and UX tool |
| Who to acquire | How to design for them |
| Attributes and segments | Goals, behaviours, and mental models |
| Used in marketing and sales | Used in product and engineering |
| One profile per segment | One character per user type |

Your ICP tells you who to target. Your personas tell you how to build for them.

Both are needed. Neither replaces the other.

---

## How Many Personas

One per distinct user type in your product. No more.

If your product has a primary user, an admin user, and a secondary user who views outputs — three personas. If your product is single-user with no meaningful variation — one persona.

The mistake is creating multiple personas for the same user type to represent different sub-segments. That produces a persona library no one uses. One primary persona, grounded in your ICP, is more useful than five personas that represent edge cases.

> If you genuinely have two primary user types with meaningfully different goals and mental models, create two. If you are creating a second persona because you are unsure who your primary user is, go back to the ICP module first.

---

## What a Useful Persona Contains

Forget demographics. The fields that actually drive product decisions are these.

### Goals

What is this person trying to accomplish — not in your product, but in their work and life?

Not "use the dashboard efficiently." That is a product goal. Real goals sound like:

- "Get paid accurately and on time without administrative overhead eating into project time"
- "Maintain a professional reputation with clients without needing a dedicated operations person"

Goals drive feature prioritisation. When two features compete for the same sprint, the one that more directly serves the primary goal ships first.

### Frustrations

The specific friction points this person encounters today — with the problem, with existing tools, and with their current workaround.

These should be pulled directly from your User Pain Points module. Do not invent frustrations for a persona. Ground them in what real users told you.

### Behaviours

How this person actually works. Not how they say they work — how they behave.

- What tools are open on their desktop right now?
- Do they work in focused blocks or fragmented sessions?
- How do they handle something they do not understand — Google it, ask a colleague, ignore it?
- Do they explore product features or use only what they need?

Behaviours determine UX patterns. A user who works in fragmented sessions needs a product that is recoverable — easy to re-enter mid-task without losing context. A user who never explores settings needs strong defaults.

### Mental Model

How does this person currently think about the problem domain?

A mental model is not what they know — it is the framework they use to make sense of things. Your product's information architecture should map to their mental model, not to your data model.

Example: a freelancer thinks about their work in terms of clients and projects, not in terms of time entries and line items. An invoicing product that surfaces clients and projects first — and generates time entries and line items as outputs — maps to the mental model. One that leads with a timer and a log does not.

Getting the mental model right is why some products feel immediately intuitive and others require documentation to use.

### Technical Comfort

Not a rating from 1–10. A specific description of what they will and will not do.

- Will they complete a 5-step onboarding flow?
- Will they read a tooltip?
- Will they connect a third-party integration?
- Will they contact support or abandon if something breaks?
- Will they use a keyboard shortcut if they know it exists?

This determines where in your UX you can use progressive disclosure and where you cannot.

### Quote

One sentence, in their voice, that captures their relationship with the problem.

Not invented. Taken directly from a user interview or a review you read.

This is the line you put at the top of the persona. It re-grounds the team every time the persona is referenced.

---

## What a Persona Does Not Contain

Remove these from any persona template you find online. They do not drive product decisions.

- Age (unless your product is age-gated or age-specific)
- Marital status or family situation (unless directly relevant)
- Stock photo
- Myers-Briggs or personality type
- Generic hobbies unrelated to the problem domain
- A fictional backstory
- A motivational summary written in marketing language

Every field in a persona should be able to answer the question: "which product decision does this inform?" If the answer is none, the field should not exist.

---

## AI Prompt: Persona Generation

```
I am creating product personas for a SaaS product.

My ICP: [paste your ICP summary from the ICP module]
User types in my product: [list from Target Users module]
Top pain points: [list from User Pain Points module]
Key behaviours I have observed or learned in research: [describe]

For each user type, generate a persona containing only these fields:
- Name and role (fictional but grounded in the ICP)
- One quote (in their voice, about the problem — not about your product)
- Goals (2–3, work-level, not product-level)
- Frustrations (3–4, pulled from the pain points I provided)
- Behaviours (3–4 specific behavioural traits that affect UX decisions)
- Mental model (how they currently think about this problem domain)
- Technical comfort (specific description of what they will and will not do in a product)

Do not include demographics, hobbies, stock photo descriptions, or personality types.
Do not invent frustrations that are not in my pain points list.
Do not write goals in product language — goals should be about their work, not about features.

After generating each persona, list 3 specific product decisions this persona makes easier to answer.
```

---

## Using Personas in Product Decisions

A persona is only useful if it is referenced. Build the habit of invoking them explicitly.

**Feature prioritisation:**
> "Feature A serves Maya's primary goal directly. Feature B serves an edge case she encounters once a month. Feature A ships first."

**UX copy:**
> "Maya does not think in terms of 'time entries.' She thinks in terms of 'hours on a project.' The label changes."

**Onboarding design:**
> "Maya has moderate technical comfort — she will complete a 3-step onboarding but will not connect a calendar integration on day one unless it is framed as optional and clearly valuable. We gate the integration to step 2, after she has seen value."

**Navigation decisions:**
> "Maya's mental model is client → project → hours. The sidebar hierarchy should reflect this, not our data model."

**Error messages:**
> "Maya will not read a technical error code. She needs a plain-language explanation and a next action. 'Something went wrong (Error 403)' is a support ticket waiting to happen."

---

## Validating Your Personas

Personas built from assumptions are hypotheses. Personas built from real user research are tools.

**The recognition test:** Show the persona to 3 users who fit the profile. Do they say "that's me" or do they correct specific details? Update accordingly.

**The decision test:** Present your team (or yourself) with a product decision and invoke the persona. Does the persona give a clear answer? If the persona is too vague to resolve a real decision, it needs more specificity.

**The quote test:** Is the quote on your persona something a real user said, or something you wrote in their voice? If it is the latter, replace it. The difference in authenticity is felt in how the persona is used — a real quote carries weight; an invented one does not.

---

## Checklist: Personas Complete

**Coverage**
- [ ] One persona exists for each distinct user type
- [ ] Personas are not duplicated for sub-segments of the same user type

**Content quality**
- [ ] Every field can answer "which product decision does this inform?"
- [ ] No demographic fields that do not drive decisions
- [ ] Goals are work-level, not product-level
- [ ] Frustrations are grounded in User Pain Points research — not invented
- [ ] Mental model is described and mapped to at least one UX decision
- [ ] Technical comfort is specific, not a rating
- [ ] Quote is from a real user, not written in their voice

**Usability**
- [ ] Each persona resolves at least 3 specific product decisions
- [ ] Personas are stored somewhere the whole project can reference them
- [ ] At least one persona has been validated by real users recognising themselves in it

---

## What Comes Next

Solution Statement takes everything you have defined — problem, users, ICP, personas — and synthesises it into a precise articulation of what you are building and why it works. It is the document that keeps your product coherent as complexity grows.
