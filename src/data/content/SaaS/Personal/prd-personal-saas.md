# PRD

 **Estimated Time:** 20 Minutes

---

A Product Requirements Document is not a formal deliverable.

It's a decision record.

It captures what you're building, for whom, why, and what done looks like — so that when you're deep in development at midnight and you can't remember what you decided, you have something to refer back to.

For a solo personal project, a PRD does one more thing: it forces you to make decisions before you're in the middle of code. Decisions made under pressure, mid-implementation, are almost always worse than decisions made upfront with a clear head.

Write the PRD before you touch the tech stack. Before you write a schema. Before you pick a framework.

---

## What a Solo PRD Is Not

Not this:

- A 40-page requirements spec written for a team of engineers
- A formal document that needs stakeholder sign-off
- A complete feature specification for every edge case
- Something that lives in a wiki and never gets read

A solo PRD is a living document. It lives wherever you'll actually open it — a Notion page, a Markdown file in your repo, a Google Doc. It gets updated as you learn. It earns its existence by being useful, not by being complete.

---

## The Six Sections

Every useful solo PRD has these six sections. No more are required.

---

### 1. Problem

One paragraph. What is broken. Who it's broken for. Why existing solutions fail.

You've already written this. Pull from your Idea module.

> **Example**
>
> *Freelance designers manage client work across Notion, Google Sheets, and WhatsApp. There's no single place to track deliverable status and invoice automatically. As a result, invoices go out late and payments get missed. Existing tools like HoneyBook are too expensive and complex for designers managing fewer than 20 clients.*

---

### 2. Persona

Three to five sentences. Who you're building for. Their situation. Their current workaround. Their bar for switching.

You've already written this. Pull from your Personas module.

This section exists in the PRD so that anyone reading a feature description can ask "does this serve the persona?" and have the answer in the same document.

---

### 3. Goals

What does success look like at launch?

Write two to four specific, measurable goals. Not "users love it." Something you can actually check.

| Goal | How to measure |
|------|---------------|
| A user can complete the core flow without assistance | Test with one person who matches the persona |
| Core features work on mobile | Manual test on iOS and Android |
| Invoice sends successfully end-to-end | Integration test passes |
| Page load under 2 seconds on a standard connection | Lighthouse score |

These become your acceptance criteria. When all goals are met, v1 is shippable.

---

### 4. Features

Your v1 feature list. Pull from the Features module.

Format each one as a user story:

```
[Feature name]
As [persona], I need to [action] so that [outcome].
Status: Core / Supporting / Later
```

List Core features first. Supporting second. Later third — but include them so you remember what's deferred and why.

---

### 5. Out of Scope

Explicitly name what v1 does not include.

This section is as important as the features list. It prevents scope creep by making the decision explicit rather than implicit.

> **Example**
>
> *V1 does not include: team collaboration, invoice PDF customization, payment processing, client portal, Stripe integration, mobile app, email notifications, analytics dashboard.*

When you feel the urge to add something mid-development, check this list. If it's here, the decision was already made. Adding it requires a conscious decision to change the scope — not just a late-night impulse.

---

### 6. Open Questions

Every PRD has things you don't know yet. Write them down.

> **Example**
- Do users need to send invoices via email from inside the app, or is a shareable link enough?
- Should milestones be time-based or manually marked complete?
- What happens if a user sends an invoice and the client email bounces?

An open question in the PRD is better than a hidden assumption in the code.

As you make decisions on these, update the PRD. The document evolves as you learn.

---

## AI Prompt — Generate Your PRD Draft

Use this after completing your Personas, Idea, and Features modules.

```prompt
I'm building a personal SaaS product and I need to write a PRD.

**Persona:**
[paste persona summary]

**Problem:**
[paste problem statement from Idea module]

**Positioning statement:**
[paste positioning statement]

**Core features (with user stories):**
[paste Core and Supporting features]

**What's explicitly out of scope for v1:**
[paste Later features list]

Generate a complete PRD with these six sections:
1. Problem
2. Persona
3. Goals (with measurable acceptance criteria)
4. Features (formatted as user stories, Core first)
5. Out of Scope
6. Open Questions

Write it as a clean, scannable Markdown document.
Use plain language. No corporate jargon.
The audience is me — a solo developer who will reference this throughout development.
```


---

## Keeping the PRD Alive

A PRD written once and never touched is a PRD that stops being useful.

Update it when:

- A feature moves from Later to v1
- An open question gets answered
- A decision changes based on what you learn building
- A user test reveals something you got wrong

You don't need a change log. Just update the document and keep building.

The PRD is not a contract. It's a current best understanding. Treat it that way.

---

## Validation: Is Your PRD Ready?

Before moving to Design, check your PRD against this:

- [ ] Problem is specific — a real moment of failure, not a category
- [ ] Persona is concrete — situation, friction, and switching bar all present
- [ ] Goals are measurable — you'll know when each one is met
- [ ] Features are in user story format — Core, Supporting, Later all labeled
- [ ] Out of Scope section exists and names at least five things
- [ ] Open Questions captured — no hidden assumptions in the document
- [ ] PRD lives somewhere you'll actually open it during development
- [ ] AI draft generated and reviewed — nothing important missing

---

## One More Thing

The PRD will be wrong in places. That's expected.

You'll build something and discover that a feature works differently than you imagined. An open question will get answered in a way that changes something. A persona assumption will turn out to be off.

None of that means the PRD failed. It means you learned something. Update the document and keep going.

The alternative — building without a PRD — produces the same amount of wrong decisions, but you make them under pressure mid-development instead of calmly upfront.

The PRD doesn't eliminate uncertainty. It makes uncertainty visible so you can deal with it deliberately.

---

## Next

**Design →** Your PRD defines what you're building. Now figure out what it looks like and how users move through it.
