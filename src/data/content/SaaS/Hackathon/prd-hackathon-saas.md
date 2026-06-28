# PRD

 **Estimated Time:** 20 Minutes

---

A PRD — Product Requirements Document — is where your decisions become a document.

You have already made the hard decisions. In Idea Definition, you locked the user, the problem, and the demo moment. In MVP Features, you bucketed every feature. This page is where you write all of that down in a format the whole team agrees on, that AI can read and use, and that you can reference when someone suggests adding a feature at midnight.

A real company PRD can be 20 pages. Yours should fit on one. If it doesn't, you have not finished deciding — you are using the document to defer decisions rather than record them.

---

## This Document Does Two Jobs

Most people know the first job: team alignment. Everyone reads it, everyone agrees on what is being built, disagreements happen in the document instead of during the build.

The second job is specific to how you are building: **this document is the context block you paste into every AI coding session.**

Every time you open Cursor, Claude Code, or a new Claude conversation to build a feature, you paste the PRD first. The AI now knows what the product is, who it is for, what is in scope, and — critically — what is out of scope. That last part is what most people miss. A Non-Goals section actively prevents AI from suggesting features you decided not to build.

A well-written PRD improves AI output for the entire hackathon. That makes writing it now one of the highest-leverage things you can do before writing any code.

---

## The Sections

A lean hackathon PRD has eight sections. Here is what each one does and what goes in it.

---

### 1. Product Overview

**What it is:** Three to five sentences. The what, who, and why — written precisely enough that someone with no context can understand what you are building.

**What it is not:** A pitch. Not marketing copy. Not a vision statement.

**Example:**

> Shiftlog is a web app for café managers who build weekly staff schedules. Currently, managers create schedules in a group chat or a shared notes app, leading to constant confusion over shift swaps, no-shows, and last-minute coverage gaps. Shiftlog replaces that workflow with a simple drag-and-drop schedule builder that automatically notifies staff of their shifts and tracks swap requests in one place.

Notice: no buzzwords. No "AI-powered." No "seamlessly." Just what it does and for whom.

---

### 2. Target User

**What it is:** One specific person described in enough detail that the whole team would agree on whether a feature serves them.

**What it is not:** A demographic ("25–40 year old professionals"). Not a market segment. Not a persona with a fake name and a stock photo backstory.

**Example:**

> A café or small restaurant manager, typically not a technical person, who is personally responsible for building the weekly shift schedule for a team of 5–15 staff. They currently do this on WhatsApp, in a Notes app, or verbally. They do not use scheduling software because existing options feel too complex or too expensive for their operation.

If a proposed feature would not serve this person, it does not belong in the MVP.

---

### 3. Problem Statement

**What it is:** What the user experiences right now, without your product. Be specific about what is painful.

**What it is not:** A description of your solution. This section describes the world before your product exists.

**Example:**

> Managers spend 30–60 minutes building a schedule that staff immediately start changing via text messages. There is no single source of truth. Swap requests get lost. Managers cannot tell at a glance whether a shift is actually covered. Last-minute staffing gaps happen because the coverage breakdown was invisible until someone did not show up.

Good problem statements contain specific, observable friction. "It's inefficient" is not specific. "They cannot tell at a glance whether a shift is covered" is specific.

---

### 4. Goals

**What it is:** What success looks like for the demo. Three to five statements, written as outcomes, not features.

**The distinction:** "Users can drag and drop shifts" is a feature. "A manager can build a complete weekly schedule in under five minutes" is an outcome. Goals describe the experience, not the implementation.

**Example:**

- A manager can build a complete weekly schedule in under five minutes
- Staff can see their upcoming shifts without needing to ask
- A swap request reaches the right person without going through a group chat
- A judge who watches the demo understands the core value without explanation

That last goal is specifically a hackathon goal. It belongs here.

---

### 5. Non-Goals

This is the section most teams skip, and the most valuable section in a hackathon PRD.

Non-Goals is an explicit list of things you are not building, with a one-line reason for each. It is not a list of future features. It is a scope fence.

**Why this matters:**

When someone at 1am says "we should add email notifications," your answer is not "that's a good idea, let's think about it." Your answer is "that's in Non-Goals, we decided not to build it because it's not in the demo path." The decision is already made. You do not relitigate it under pressure.

When you paste the PRD into an AI session, the Non-Goals section actively prevents the model from suggesting features you deliberately cut. Without it, AI will suggest everything it can think of. With it, you get recommendations that stay in scope.

**Example:**

- **Email or SMS notifications** — not in the demo path, can be faked with an in-app toast
- **Mobile app or responsive layout** — the demo is on desktop, no time to build both
- **Payment or subscription billing** — will show the upgrade button, will not wire up Stripe
- **Admin panel** — no operational need during the demo
- **Multi-location support** — the target user has one location
- **Third-party calendar sync** — adds integration time with no demo value
- **Account creation flow** — will seed demo accounts, judges will not onboard live

Write a reason for each. The reason is what makes this a decision, not just a list.

---

### 6. Core Features

**What it is:** Your Must Demo and Must Work features from the Feature Triage, written as brief descriptions with acceptance criteria.

Acceptance criteria are the one-line answer to "how do we know this feature is done?" They are not test cases. They are team alignment on what done means.

**Format:**

> **[Feature name]**
> [One sentence describing what it does]
> Done when: [one line defining completion for demo purposes]

**Example:**

> **Schedule Builder**
> A drag-and-drop weekly grid where managers assign staff to shift slots.
> Done when: a manager can create a 5-day schedule with multiple staff and multiple shifts, and the schedule saves and displays correctly.
>
> **Staff View**
> A read-only view where staff see their own upcoming shifts for the current week.
> Done when: a staff account can log in and see only their assigned shifts for the week.
>
> **Swap Request**
> A staff member can request to swap a shift with another staff member. The manager sees the request and can approve or deny it.
> Done when: a swap request appears in the manager's dashboard with an approve/deny action.

Three features. That is a realistic MVP for a 24-hour hackathon. If your list has more than five features in this section, go back to Feature Triage.

---

### 7. Out of Scope

**What it is:** Your Can Fake and Cut features from the Feature Triage, listed here with a note on how each will be handled for the demo.

**Why list them at all:** Because "we thought about it and decided not to" is a completely different answer than "we didn't think about it." When judges ask why you don't have X, this section is your answer.

**Example:**

> | Feature | Handling |
> |---|---|
> | User profile page | Hardcoded name and avatar in the nav |
> | Email notifications | In-app toast only |
> | Payment flow | "Upgrade" button with a placeholder modal |
> | Settings page | Not built, not linked |
> | Password reset | Demo accounts have set passwords |
> | Mobile layout | Desktop only, not mentioned in the pitch |

---

### 8. Success Criteria

**What it is:** The specific things that need to be true for the demo to go well. More concrete than goals — this is your pre-demo checklist.

**Example:**

- Manager account can log in and reach the schedule builder in under 10 seconds
- A complete schedule for 5 staff across 5 days can be built live without errors
- Staff account can log in and see the correct shifts
- At least one swap request can be submitted and approved during the demo
- No loading spinners during the core demo path

If the success criteria are met, you are ready to demo. That is the only job this section has.

---

## AI Prompts

<!-- UI: each prompt block renders with a copy-to-clipboard button top-right -->

**Generate a first-draft PRD from your Phase 0 deliverables**

Paste everything from Idea Definition and MVP Features. Do not clean it up first.

```prompt
I am building a SaaS product for a hackathon. Below are my planning outputs from Phase 0.

---
IDEA STATEMENT: [your one sentence]

CONTEXT PARAGRAPH: [your 3-5 sentence context]

DEMO MOMENT: [your demo path paragraph]

FEATURE LIST:
Must Demo: [list]
Must Work: [list]
Can Fake: [list]
Cut: [list]

HACKATHON DURATION: [X hours]
TEAM SIZE: [X people]
---

Using this input, write a lean hackathon PRD with these exact sections:
1. Product Overview (3-5 sentences)
2. Target User (specific description, no fake persona names)
3. Problem Statement (current friction, no solution language)
4. Goals (3-5 outcome statements, not feature statements)
5. Non-Goals (every Cut and Can Fake item, with a one-line reason for each)
6. Core Features (Must Demo and Must Work only, each with a "Done when:" acceptance criterion)
7. Out of Scope (Can Fake items with how they will be handled in the demo)
8. Success Criteria (specific, observable conditions for a good demo)

Rules:
- No buzzwords
- No marketing language
- Everything in Non-Goals must have a reason
- Core Features should have a "Done when:" line
- The whole document should fit on one page
```

---

**Pressure-test your PRD for scope and clarity**

Use this after generating or writing your PRD. Before anyone writes code.

```prompt
Here is our hackathon PRD:

[paste full PRD]

Review it critically across these dimensions:

1. SCOPE: Are there any features in Core Features that realistically cannot be built in [X hours] by [X people]? Flag them.

2. GAPS: Is anything implied by the Product Overview or Goals that is not covered in Core Features? Identify missing pieces.

3. NON-GOALS: Are there any obvious features missing from Non-Goals that a judge might expect and ask about? List them.

4. CLARITY: Is every section specific enough that two developers could work from it independently without needing to ask clarifying questions? Flag any vague sections.

5. AI CONTEXT: If this PRD were pasted as context into a coding session, would an AI model have enough information to suggest relevant, in-scope implementations? What is missing?

Be direct. Do not compliment the document.
```

---

**Generate the AI context block from your PRD**

This produces a compressed version of the PRD optimized for pasting into coding sessions, where token efficiency matters.

```prompt
Here is our hackathon PRD:

[paste full PRD]

Produce a compressed "AI Context Block" version of this PRD for use at the start of coding sessions. It should:

- Be under 300 words
- Preserve the product overview, target user, core features, and non-goals
- Use bullet points and short lines, not prose paragraphs
- Include a one-line statement at the top: "We are building: [product name] — [one sentence description]"
- End with a "Do not suggest:" list derived from the Non-Goals section

This context block will be pasted into every coding session to orient the AI before implementation work begins.
```

---

## Reviewing AI Output

**The overview sounds like a pitch.** If words like "revolutionary," "powerful," or "cutting-edge" appeared, replace them with specific, plain descriptions. AI defaults to marketing language when describing products.

**Non-Goals is missing reasons.** A list without reasons is just a scope list. Reasons are what make it useful when scope is challenged. Add them manually if AI omitted them.

**Core Features have no acceptance criteria.** AI will write feature descriptions. Push it to add "Done when:" lines — those are the part that actually helps the team.

**Success Criteria are vague.** "The demo works smoothly" is not a success criterion. "No loading spinners during the core demo path" is. Make each item specific and observable.

**The document is longer than one page.** Cut anything that is not one of the eight sections. If a section is longer than five lines, you are over-specifying. A PRD records decisions — it does not document implementation.

---

## PRD Quality Checklist

Before you move to User Flows, run through this. Every unchecked item is a gap that will cost time later.

<!-- UI: interactive checklist — each item tappable, progress shown -->

**Completeness**
- [ ] All eight sections are present
- [ ] Product Overview is 3–5 sentences and contains no buzzwords
- [ ] Target User is specific enough that a feature could be evaluated against it
- [ ] Problem Statement describes the current state only, with no solution language
- [ ] Every Non-Goal has a reason
- [ ] Every Core Feature has a "Done when:" acceptance criterion
- [ ] Success Criteria are specific and observable

**Scope**
- [ ] The Core Features section has five or fewer features
- [ ] Every feature in Core Features was labeled Must Demo or Must Work in Feature Triage
- [ ] Nothing in the Can Fake or Cut columns appears in Core Features

**Team alignment**
- [ ] Every team member has read the PRD
- [ ] There is no feature a team member thinks is in scope that is not in the document
- [ ] The team agrees on what "Done when:" means for each core feature

**AI readiness**
- [ ] The document could be pasted into a coding session and give the AI enough context to make useful suggestions
- [ ] The Non-Goals section would prevent an AI from suggesting the features you cut

---

## Your Deliverable

The PRD is a living document, but it should not be a constantly changing one. Write it, review it together as a team, lock it, and then only update it if something genuinely breaks the plan — not because a new idea sounds interesting.

Store it somewhere every team member can access instantly. A shared Notion page, a pinned document in your project repo, a Google Doc linked in your team chat. The format does not matter. The access does.

<!-- UI: render as a structured fillable template with section headers, placeholder text, and an "Export as AI Context Block" button at the bottom that compresses and copies the document -->

When you open your first coding session, paste the PRD. When you open the second one, paste it again. The cost is a few seconds. The benefit is AI that builds what you actually decided to build.

The next topic is User Flows — how the specific paths through your product get documented before anyone designs or builds them.
