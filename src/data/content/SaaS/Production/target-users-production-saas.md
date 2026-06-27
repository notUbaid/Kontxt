---
title: Target Users
slug: target-users
phase: Phase 0
mode: production
projectType: saas
estimatedTime: 25–35 min
---

# Target Users

Knowing your target users is not the same as knowing your ICP.

Target users are the people who will use your product. The ICP is the subset of those users your business should acquire first. This module covers target users. The ICP module will narrow the field.

Here you are answering: who are all the people this product could serve, and which of them should you design for first?

---

## Why This Decision Shapes Everything

Your target user definition directly determines:

- **Schema design** — what entities exist, what data you store
- **Auth and permissions** — individual accounts, teams, organisations, roles
- **Pricing model** — per seat, per usage, flat rate, freemium threshold
- **Onboarding flow** — what a new user needs to understand before they see value
- **Support model** — what kind of help they will need and how they will ask for it
- **Marketing channels** — where they are and what they respond to

Getting this wrong at Phase 0 means refactoring more than your codebase. It means refactoring your go-to-market, your pricing, and your architecture simultaneously — under pressure, after launch.

---

## User Types in a SaaS Context

Most SaaS products have more than one type of user. Name all of them before designing for any of them.

| User Type | Definition | Example |
|---|---|---|
| **Primary user** | Does the core job the product is built for | The freelancer tracking time |
| **Secondary user** | Benefits from the output but does not do the core job | The client reviewing an invoice |
| **Admin user** | Manages the account, team, or configuration | The studio owner managing their team's projects |
| **Decision maker** | Approves the purchase but may not use the product | The CFO approving the SaaS subscription |
| **Integration user** | A system or service that interacts with your product via API | A billing system pulling invoice data |

In a solo personal SaaS, primary and admin are often the same person. In a B2B production SaaS, they are almost always different — and confusing them causes auth, permissions, and onboarding bugs that are expensive to fix.

Map every user type your product has, even if some of them do not exist yet.

---

## Defining Your Primary User

Go beyond demographics. Define your primary user by the three things that actually matter for product decisions.

### 1. Their Job

Not their job title. The job they are trying to accomplish when they use your product.

A "freelance designer" is a job title. "Bill a client accurately for a completed project without spending 45 minutes reconstructing hours" is the job.

The job defines the entry point into your product, the success state, and the exit point. It is the unit your entire UX should be designed around.

### 2. Their Context

The environment in which they use your product.

- What device are they on?
- Are they in flow (working) or in admin mode (doing business tasks)?
- Are they interrupted often or in focused sessions?
- Do they use your product alone or alongside colleagues?
- What other tools are open when they use yours?

Context determines interface decisions. A product used on mobile during fieldwork is not designed like a product used on a desktop in focused admin time — even if the underlying data model is identical.

### 3. Their Technical Sophistication

How much can you assume they know?

| Level | Characteristics | Product Implications |
|---|---|---|
| **Non-technical** | Avoids settings, expects things to work, needs guidance at every step | Minimal configuration, strong defaults, inline help |
| **Moderately technical** | Uses SaaS tools daily, can follow setup docs, comfortable with integrations | Setup wizard acceptable, API access optional |
| **Technical** | Developer or power user, reads documentation, expects control | CLI or API access expected, deep customisation available |

Most SaaS products over-estimate the technical sophistication of their early users and under-invest in onboarding as a result.

---

## User Segments

Within your target users, there are likely multiple segments — groups with meaningfully different needs, constraints, or behaviours.

Identifying segments now prevents you from building one-size-fits-none features.

**How to identify segments:**

Ask whether users differ meaningfully across these axes:

- **Scale** — solo vs team vs enterprise
- **Workflow** — how they currently do the job without your product
- **Urgency** — how acute the pain is for them
- **Budget** — what they will pay and who approves it
- **Technical sophistication** — how much setup they can handle

If two groups would give meaningfully different answers on more than two of these axes, they are separate segments.

**What to do with segments:**

Name them. Give each one a one-sentence description. Then decide which segment you are designing your v1 for.

You cannot design for all segments simultaneously without ending up with a product that serves none of them well. The ICP module will formalise this choice. For now, just name what you see.

---

## Users You Are Explicitly Not Serving

This is as important as defining who you are serving.

Explicitly naming who your product is not for does three things:

- Prevents scope creep from "well, what if we also supported..."
- Clarifies your positioning to users who self-select in or out
- Gives you permission to make opinionated product decisions

**Format:**

> This product is not designed for [user type] because [reason]. If they need [X], they should use [alternative].

Examples:
> "This product is not designed for agencies managing client accounts. They need a multi-client workspace with sub-accounts. We do not build that."

> "This product is not designed for developers who want API-first access. Our UI is the product. We do not build for power users who want to bypass it."

Writing these down prevents months of misaligned feature requests from pulling your roadmap in the wrong direction.

---

## AI Prompt: Target User Definition

```
I am defining the target users for a SaaS product that [describe what your product does in one sentence].

My primary user as I currently understand them: [describe]
Other user types I think exist: [list]

Help me:
1. Identify any user types I may have missed — including secondary users, admin users, decision makers, or integration surfaces
2. For my primary user, write a precise definition covering: the job they are doing, the context they are in when they use the product, and their likely technical sophistication
3. Identify 2–3 likely user segments within my primary user group and describe how their needs differ
4. Suggest which segment I should design v1 for, and why — based on likelihood of early adoption, willingness to pay, and feedback quality
5. Write one "not for" statement for each user type or segment I should explicitly exclude from v1 scope

Flag any assumptions in my current user definition that should be validated before I begin architecture decisions.
```

---

## Mapping Users to Architecture Decisions

Once you have named your user types and segments, map them to the architectural questions they raise.

| User Type / Segment | Architecture Question |
|---|---|
| Solo primary user only | Single-user account model — no teams, no roles |
| Primary + admin user (same person) | Admin features in user settings, no org layer needed |
| Primary + admin user (different people) | Organisation entity required, role-based access from day one |
| Secondary user (client, reviewer) | Guest access or limited portal — scoped permissions |
| Decision maker who does not use the product | Billing and reporting features must be accessible without product expertise |
| Multiple segments with different workflows | Feature flags or plan gating required at launch |

Do not wait for the architecture phase to think about these. Discovering in Phase 2 that you need an org layer when you designed a single-user schema is an expensive refactor.

---

## Validating Your Target User Definition

Before treating this as settled, check it against your research.

**The recognition test:** Show your primary user definition to 3 people who fit it. Do they say "yes, that's me" or do they identify exceptions and edge cases that contradict your definition?

**The edge case test:** Name three users who are close to your target but not quite in it. Can you explain clearly why they are outside the boundary? If you cannot, the boundary is not drawn yet.

**The architecture test:** Hand your user type map to a developer (or use it yourself) and ask: "What does the auth and permissions model look like for this product?" If the answer is ambiguous, your user types are not specific enough.

---

## Checklist: Target Users Complete

**User types**
- [ ] All user types are named — primary, secondary, admin, decision maker, integration
- [ ] Each user type has a one-sentence definition
- [ ] The relationship between user types is clear (who manages whom, who sees what)

**Primary user definition**
- [ ] The job is defined — not just a job title
- [ ] The context is described — device, environment, workflow state
- [ ] Technical sophistication is rated and its product implications are noted

**Segments**
- [ ] At least two segments are identified within the primary user group
- [ ] The v1 target segment is chosen with explicit reasoning
- [ ] Excluded segments are named with "not for" statements

**Architecture readiness**
- [ ] Each user type maps to at least one architecture question
- [ ] The auth and permissions model is clear enough to sketch

**Validation**
- [ ] Primary user definition has been confirmed by at least 3 real people who fit it
- [ ] Edge cases have been tested and resolved

---

## What Comes Next

Project Assumptions surfaces everything you are taking for granted — about your users, your market, your technology, and your business — so that the rest of Phase 0 is built on explicit ground rather than invisible guesses.
