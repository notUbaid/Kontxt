---
title: PRD
slug: prd
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 45–60 min
---

# Product Requirements Document

The PRD is the single source of truth for what you're building and why. It translates Phase 0 decisions into specifications that engineering, design, and any collaborator can work from without asking you to clarify your intent every hour.

A PRD written before building saves multiples of its time in rework avoided.

---

## What a Production PRD Is Not

**Not a feature list.** A feature list tells you what to build. A PRD tells you what to build, why it exists, who it's for, how success is measured, and what constraints apply.

**Not a design spec.** Wireframes and flows come after the PRD. The PRD establishes requirements; design solves them.

**Not permanent.** A PRD is a living document. It changes as you learn. But changes must be deliberate — not because someone had a new idea in a meeting.

---

## PRD Structure

A production PRD has eight sections. Complete them in order.

---

### 1. Overview

```
Product name: 
One-line description: 
Author: 
Last updated: 
Status: Draft / Review / Approved
```

**Problem statement** (from Idea Definition):
> [2–3 sentences describing the specific problem and who it affects]

**Solution summary:**
> [2–3 sentences describing what you're building and the core mechanism]

**USP:**
> [Your positioning statement from the USP module]

---

### 2. Goals and Success Metrics

Every goal must have a metric. Unmetered goals are wishes.

```
| Goal | Metric | Target | Timeframe |
|---|---|---|---|
| Activate new users | % who complete core action on day 1 | >60% | 90 days post-launch |
| Drive retention | % of users active in week 4 | >30% | 90 days post-launch |
| Generate revenue | MRR | $X | 6 months post-launch |
| Deliver reliability | Uptime | >99.5% | Ongoing |
| Deliver performance | p95 API response time | <500ms | Ongoing |
```

Also define explicit non-goals — things this product is explicitly not trying to accomplish in v1.

```
Non-goals:
- [X] We are not optimising for [metric] in v1
- [X] We are not targeting [user segment] in v1
- [X] We are not building [feature category] in v1
```

---

### 3. Users

**Primary user persona:**

```
Name: [give them a name — makes discussions concrete]
Role: 
Context: When and where they use the product
Technical level: 
Current solution: How they solve the problem today
Key frustration: The specific thing they hate about the current solution
Decision trigger: What makes them evaluate a new tool
```

**Secondary users** (if applicable):

```
[Name] — [role] — [what they need from the product]
```

**Out-of-scope users:**
> [Explicitly name user types this product is not designed for in v1]

---

### 4. Features and Requirements

This is the heart of the PRD. For each Core feature from your MVP module, write a complete requirement.

**Requirement format:**

```
## Feature: [Name]
Priority: Core / Important / Nice-to-have
User story: As a [user], I want to [action] so that [outcome].

### Functional Requirements
- FR-001: [specific, testable requirement]
- FR-002: [specific, testable requirement]
- FR-003: [specific, testable requirement]

### Non-Functional Requirements
- Performance: [response time, throughput, load expectation]
- Security: [auth requirement, data access constraint]
- Accessibility: [WCAG level, specific considerations]

### Acceptance Criteria
- [ ] [Observable, testable condition that proves this works]
- [ ] [Observable, testable condition that proves this works]

### Edge Cases
- [What happens when X is empty]
- [What happens when Y exceeds limit]
- [What happens when Z fails]

### Out of Scope
- [Related thing explicitly not included in this feature]
```

> [!WARNING]
> Vague requirements produce vague software. "Users can manage their profile" is not a requirement. "Users can update their display name (max 50 characters), email address (with re-verification), and avatar image (max 5MB, JPG/PNG only)" is a requirement.

---

### 5. User Flows

For each Core feature, describe the primary user flow as a sequence of steps.

```
## Flow: [Feature Name] — Happy Path

Trigger: [What initiates this flow]

Steps:
1. User [action]
2. System [response]
3. User [action]
4. System [response — including what happens asynchronously]
5. User sees [end state]

Error states:
- If [condition]: System shows [specific error] and [recovery path]
- If [condition]: System [fallback behaviour]

Empty state:
- First-time state: [what the user sees before any data exists]
```

This is not a wireframe. It's a narrative description. Wireframes come in the next module.

---

### 6. Technical Constraints

Document the constraints engineering must work within.

```
Performance:
- Page load (LCP): < [X]s on [connection type]
- API response (p95): < [X]ms
- Uptime target: [X]%

Security:
- Auth required on: [list of routes / actions]
- Data isolation: [how user data is separated]
- Sensitive fields: [fields that must not be exposed in API responses]
- Compliance: [GDPR / CCPA / SOC 2 / HIPAA if applicable]

Platform:
- Browser support: [modern evergreen / IE11 / Safari minimum version]
- Device support: [mobile-first / desktop-first / both]
- Offline support: [required / not required]

Integrations:
- Required: [list of third-party services that must work at launch]
- Planned: [list of integrations planned for near horizon]
```

---

### 7. Out of Scope

Explicit exclusions. This section prevents scope creep more than any process.

```
The following are explicitly out of scope for v1:

Features:
- [Feature]: [one-line reason]
- [Feature]: [one-line reason]

User types:
- [Segment]: Not targeted until [condition]

Platforms:
- [Platform]: Planned for [horizon]

Integrations:
- [Integration]: [reason for deferral]
```

---

### 8. Open Questions

Every PRD has unresolved questions. Document them rather than making silent assumptions.

```
| Question | Owner | Target Resolution Date | Impact if Unresolved |
|---|---|---|---|
| [Question] | [Name] | [Date] | [What breaks or gets blocked] |
```

Unanswered questions don't disappear. They become silent assumptions that cause bugs.

---

## Prompt: Generate a PRD Draft

```
Copy Prompt
```

```
I'm building a production web app. Generate a complete PRD draft based on 
the following Phase 0 outputs:

Product name: [name]
Problem statement: [paste]
Target user: [paste]
USP: [paste]
Core features (MVP): [paste]
Monetization model: [paste]
Technical constraints: [any known constraints]

Generate a complete PRD following this structure:
1. Overview (problem, solution summary, USP)
2. Goals and success metrics (with specific measurable targets)
3. User persona (primary, with name, context, and frustrations)
4. Features and requirements (for each Core feature: user story, 
   functional requirements as FR-001 etc., acceptance criteria, edge cases)
5. Technical constraints (performance, security, platform)
6. Out of scope (at least 5 explicit exclusions with reasons)
7. Open questions (at least 3 genuine unresolved questions)

Requirements must be specific and testable — not vague descriptions.
Acceptance criteria must be observable — something a QA engineer could verify.
Do not pad. If a section is short because the product is simple, keep it short.
```

---

## Reviewing a PRD

Before treating a PRD as approved, review it against these standards.

**Every requirement is testable.** If you can't write a test or an acceptance criterion for it, it's not a requirement — it's a description. Rewrite it.

**Every goal has a metric.** If you can't measure whether you've achieved it, it's not a goal.

**Edge cases are documented.** What happens on empty state? On error? On rate limit? On concurrent modification? Undocumented edge cases become bugs.

**Out-of-scope is explicit.** For every feature that will be requested, it's either in scope or explicitly out of scope. There is no middle ground.

**Open questions are assigned.** Every unresolved question has an owner and a deadline. Unowned questions stay unresolved.

---

## PRD Checklist

- [ ] Problem statement is specific and references a named user type
- [ ] All Phase 0 outputs (USP, target user, MVP features) are reflected
- [ ] Every goal has a measurable metric and a target
- [ ] Non-goals are explicitly listed
- [ ] Primary user persona is named and described behaviourally
- [ ] Every Core feature has functional requirements written as FR-NNN
- [ ] Every Core feature has acceptance criteria that are observable and testable
- [ ] Edge cases documented for every Core feature
- [ ] Technical constraints specify actual numbers (response times, file size limits, etc.)
- [ ] Out-of-scope section has at least 5 explicit exclusions
- [ ] Open questions have owners and resolution dates
- [ ] PRD has been reviewed by at least one other person (or stress-tested with AI)

---

## What Comes Next

**User Flows** — turning the flow descriptions in your PRD into detailed, step-by-step interaction maps for every Core feature, including all error and edge case paths.

The PRD defines what. User flows define how users move through it. Together they are the complete specification that wireframes and engineering can execute against.
