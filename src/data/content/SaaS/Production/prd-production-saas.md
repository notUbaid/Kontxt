---
title: PRD
slug: prd
phase: Phase 1
mode: production
projectType: saas
estimatedTime: 40–60 min
---

# PRD

The Product Requirements Document is the most important artifact you'll produce before writing code. Everything in Phase 0 was discovery and decision-making. The PRD is where those decisions become specifications precise enough to build from.

A PRD is not a vision document. It's not a pitch deck. It's not a wishlist. It's a contract between what you decided to build and what actually gets built — by you, by AI coding tools, or by any collaborator who joins later.

The quality of your PRD directly determines the quality of your AI-generated code. Vague requirements produce vague implementations. Precise requirements produce precise implementations. Every hour spent on your PRD saves multiple hours of debugging, rework, and course correction during development.

---

## What a PRD Is Not

Before writing yours, eliminate the common failure modes:

**Not a feature list.** A list of features without context, user flows, or acceptance criteria is not a PRD. It's a backlog.

**Not a design document.** The PRD defines what the product does and why. Wireframes and design systems define how it looks. These are separate artifacts produced after the PRD.

**Not exhaustive documentation.** A PRD that tries to specify every edge case before any code is written becomes outdated before it's useful. Specify the critical paths completely. Leave room for implementation decisions where they don't affect the user experience.

**Not permanent.** Your PRD is a living document through Phase 1 and Phase 2. Once development starts in Phase 3, it becomes a reference — not a source of truth. Real products diverge from their PRDs. That's healthy. Update it when significant decisions change.

---

## PRD Structure

A production SaaS PRD has seven sections. Write them in order — each section builds on the previous one.

---

### Section 1 — Product Overview

A crisp summary of what you're building and why. Anyone who reads this section should be able to explain the product accurately to someone else.

**Cover:**
- Product name and one-line description
- The problem being solved (from the user's perspective, not yours)
- Your value proposition (copy from Phase 0)
- Target user (copy from Phase 0, refined)
- MVP scope summary (what's in, what's explicitly out)
- Success definition (how you'll know the MVP worked — your North Star metric)

**Length:** One page maximum. If it's longer, it's not a summary.

---

### Section 2 — User Personas

Carry forward your ICP and persona work from Phase 0, but make it concrete enough to use as a design reference.

For each persona (one to two maximum for MVP):

```
Name:         [Give them a name — it helps]
Role:         [Job title or context]
Goal:         [The outcome they're trying to achieve]
Frustration:  [What their current approach fails at]
Context:      [Where and how they use the product]
Success:      [What does "this worked" look like for them?]
```

Every feature specification in Section 4 should be traceable back to a persona. If you write a feature that no persona needs, question whether it belongs in the MVP.

---

### Section 3 — Core User Flows

User flows are the narrative backbone of your PRD. They describe what users actually do — not what features exist, but how features connect into a coherent experience.

Write one flow for each critical path in your MVP:

**Required flows for most SaaS products:**

- Signup and onboarding flow
- Core value delivery flow (the primary workflow)
- Settings and account management flow
- Upgrade / billing flow
- Error and edge case flows (what happens when things go wrong)

**Flow format:**

Write each flow as a numbered sequence of user actions and system responses. Be specific about what the user sees and what the system does.

```
Signup Flow:
1. User lands on homepage and clicks "Start free trial"
2. System shows signup form: email, password, name
3. User submits form
4. System creates account, sends verification email, redirects to onboarding
5. User sees onboarding step 1: [specific prompt]
6. User completes onboarding step 1
7. System [specific action]
8. User reaches dashboard for the first time
9. Dashboard shows empty state with [specific prompt to take first action]
```

Do not skip steps. Do not use vague language like "user completes setup." Every step that is vague in the PRD will be ambiguous during implementation.

---

### Section 4 — Feature Specifications

This is the largest section. Take every feature from your MVP scope document and expand it into a full specification.

**Feature spec format:**

```
## [Feature Name]

**Purpose:** Why this feature exists. Which persona needs it. What outcome it enables.

**User story:** As a [persona], I want to [action] so that [outcome].

**Functional requirements:**
- [Specific behavior the feature must have]
- [Another specific behavior]
- [And another]

**Edge cases:**
- What happens if [X]?
- What happens if [Y]?
- What happens when data is empty / invalid / missing?

**Acceptance criteria:**
- Given [context], when [action], then [result]
- Given [context], when [action], then [result]

**Out of scope for v1:**
- [Specific things this feature explicitly does not do]
```

**On acceptance criteria:** Write them as Given/When/Then statements. This format is precise enough to be tested and precise enough for AI coding tools to understand what "done" looks like. Vague acceptance criteria ("it should work correctly") produce vague implementations.

---

### Section 5 — Data Model Overview

You don't need a complete database schema here — that's Phase 2. But your PRD should describe the core entities your product operates on, their relationships, and the key attributes that matter for behavior.

**Format:**

```
Entity: [Name]
Description: [What this represents]
Key attributes: [The fields that drive behavior — not every field]
Relationships: [How it connects to other entities]
```

**Example:**

```
Entity: Project
Description: The primary workspace unit users create to organize their work
Key attributes: name, status (active/archived), owner_id, created_at
Relationships: belongs to one User; has many Tasks; has many Members

Entity: Task
Description: An individual unit of work within a Project
Key attributes: title, status (todo/in_progress/done), assignee_id,
               due_date, priority
Relationships: belongs to one Project; belongs to one User (assignee)
```

Getting this right at the PRD stage prevents the most painful class of refactors — data model changes mid-development.

---

### Section 6 — Non-Functional Requirements

These are requirements about how the system behaves, not what it does. They're consistently under-specified in early PRDs and consistently expensive to retrofit.

**Performance:**
- Page load time target (e.g., under 2 seconds on a standard connection)
- API response time target (e.g., under 500ms for standard requests)
- Maximum acceptable latency for real-time features

**Reliability:**
- Uptime target (e.g., 99.5% for MVP — 99.9% is aspirational before you have infrastructure)
- Acceptable data loss window (e.g., RPO of 24 hours for MVP)
- Recovery time objective (e.g., RTO of 4 hours)

**Security:**
- Authentication requirements (email/password, OAuth, 2FA)
- Data sensitivity classification (what data is PII, what requires encryption)
- Access control requirements (who can see and do what)

**Scale:**
- Expected user count at launch and at 6 months
- Expected data volume (rows, files, events) at those user counts
- Any known scale constraints the architecture must account for

**Compliance:**
- GDPR requirements (if serving EU users)
- Data residency requirements
- Any industry-specific compliance (SOC 2, HIPAA, PCI)

You do not need to achieve all of these in MVP. You need to know which ones constrain your architecture decisions from the start.

---

### Section 7 — Open Questions

A PRD that has no open questions is either remarkably complete or remarkably dishonest. List every decision you haven't made yet that someone will need to make before or during development.

**Format:**

```
Question: [What needs to be decided?]
Impact: [What does this block or affect?]
Owner: [Who should decide this?]
Deadline: [When does this need to be resolved?]
Options: [What are the candidate answers?]
```

Open questions get resolved as you move through Phase 1 and Phase 2. They don't block you from continuing — they flag where you need to make decisions before development starts on affected features.

---

## Using AI to Write Your PRD

AI is excellent at PRD drafting when given the right inputs. The quality of the output is almost entirely determined by the quality of your inputs.

```prompt
I'm building a SaaS product. Generate a complete PRD using the
following context from my Phase 0 work:

Product name: [name]
Value proposition: [paste yours]
Target user: [describe precisely]
Core problem: [describe]
Primary competitor weakness being exploited: [describe]

MVP feature list with specifications:
[paste your MVP scope document — Section 2 feature specs]

Core user journey:
[paste your core user journey from MVP scope]

Key entities (from data model thinking):
[list your main entities and relationships]

Non-functional requirements:
[list your NFRs]

Generate a complete PRD with all seven sections:
1. Product Overview
2. User Personas
3. Core User Flows (signup, core workflow, billing)
4. Feature Specifications (Given/When/Then acceptance criteria)
5. Data Model Overview
6. Non-Functional Requirements
7. Open Questions

Write feature specifications precisely enough that an engineer
could implement them without asking clarifying questions.
Use Given/When/Then format for all acceptance criteria.
Flag any assumptions you're making.
```

After generation, review every section critically. AI will make assumptions — especially in user flows and edge cases. Every assumption it makes that you don't catch becomes a bug or a missing feature.

---

## Reviewing Your PRD

After writing your PRD (with or without AI), run it through these checks:

**The implementation test:** Pick any feature specification. Could an engineer implement exactly this feature, correctly, without asking you a single clarifying question? If not, the spec is underspecified.

**The edge case test:** For every feature, ask: what happens when the input is empty? Invalid? Too large? From an unexpected user? If these cases aren't covered, they'll be implemented inconsistently.

**The flow test:** Walk every user flow step by step. Does every step have a corresponding feature specification? Is there any step where the user would land on an unspecified screen?

**The data test:** For every piece of data your product needs to store, display, or process — is there an entity in Section 5 that holds it? Missing data model entries mean missing database tables, which means missing features.

**The NFR test:** For each non-functional requirement, is it specific enough to be testable? "Fast" is not testable. "API responses under 500ms at p95" is testable.

```prompt
Please review the following PRD for a production SaaS product.

[paste your full PRD]

Review it for:

1. Underspecified features — where would an engineer need to make
   assumptions to implement correctly?
2. Missing edge cases — what error states, empty states, or
   unexpected inputs aren't handled?
3. Gaps in user flows — are there any steps where a user would
   land on an unspecified screen or encounter undefined behavior?
4. Data model gaps — is there any data the product needs that
   isn't represented in the entity definitions?
5. Missing non-functional requirements — what performance, security,
   or reliability requirements are implied but not stated?
6. Internal contradictions — does any requirement conflict with another?

For each issue found, quote the relevant section and suggest a fix.
Do not be generous. This document goes directly to implementation.
```

---

## Validation Checklist

- [ ] All seven sections are complete
- [ ] Every MVP feature has a full specification with acceptance criteria
- [ ] All acceptance criteria use Given/When/Then format
- [ ] Every user flow is written step by step with no vague steps
- [ ] Core entities and relationships are defined
- [ ] Non-functional requirements are specific and testable
- [ ] Open questions are listed with owners and deadlines
- [ ] The PRD has passed the implementation, edge case, flow, data, and NFR tests
- [ ] The AI review prompt has been run and issues resolved

---

## Quick Reference

```
PRD Sections
────────────────────────────────────────────────
1. Product Overview     →  What, why, who, success definition
2. User Personas        →  Who uses this and what they need
3. Core User Flows      →  Step-by-step critical paths
4. Feature Specs        →  Requirements + edge cases + criteria
5. Data Model Overview  →  Entities, attributes, relationships
6. Non-Functional Reqs  →  Performance, security, scale, compliance
7. Open Questions       →  Unresolved decisions with owners

Acceptance Criteria Format
────────────────────────────────────────────────
Given [context/state]
When  [user action or system event]
Then  [specific, observable outcome]

PRD Review Tests
────────────────────────────────────────────────
Implementation test  →  Build without clarifying questions?
Edge case test       →  Empty, invalid, unexpected inputs covered?
Flow test            →  Every step has a spec?
Data test            →  Every data need has an entity?
NFR test             →  Every requirement is testable?
```
