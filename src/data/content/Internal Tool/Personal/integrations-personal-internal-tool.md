---
title: Integrations
slug: integrations
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Integrations

Your tool likely doesn't exist in total isolation — it might need to send you an email, read from a spreadsheet you already use, or connect to a service like a bank or calendar. This module covers how to decide what actually needs to connect to what, without turning a simple personal tool into an integration project.

---

## Start From Automation Opportunities, Not From Scratch

Back in Phase 0, the Automation Opportunities module identified which requirements might be solved by connecting to something external rather than building custom logic. Revisit that list now — this is where those possibilities become concrete technical decisions.

- Did any requirement involve notifying you outside the tool itself (email, SMS)?
- Did any requirement involve pulling in data that already lives somewhere else (a spreadsheet, an existing service)?
- Did any requirement involve sending data out to another system?

If none apply, this module is short for you — confirm that and move on. Not every internal tool needs integrations, and adding one speculatively is exactly the kind of complexity Internal Tool Fundamentals warned against.

---

## The Three Common Integration Shapes

If you do need one, most personal-tool integrations fall into one of these categories:

| Shape | Example | Complexity |
|---|---|---|
| **Outbound notification** | Email yourself when something becomes overdue | Low — usually a single API call |
| **Data import** | Pull in existing data from a spreadsheet, once, to seed the tool | Low, one-time — not an ongoing integration |
| **Live external connection** | Continuously syncing with a bank, calendar, or third-party service | Higher — requires handling auth, rate limits, failures |

> **Rule of thumb**
> The further down this table you go, the more real engineering effort and ongoing maintenance you're taking on. Make sure the pain point actually justifies it — an outbound email notification is usually worth the effort; a live bank sync often isn't, for a v1.

---

## Outbound Notifications: The Highest-Value, Lowest-Cost Integration

For many internal tools, a simple "email me when X happens" integration delivers most of the practical benefit with the least engineering cost. This is often worth adding even in an MVP, if your top pain point (from Phase 0) was specifically about *forgetting* something.

> **Example**
> If your core pain point was "I forget to follow up on overdue invoices," an email sent when an invoice crosses the 7-day threshold directly addresses the *forgetting* — arguably more directly than the dashboard itself. Consider whether this integration deserves to be in scope for v1, even though it's technically an "integration."

- Does a simple outbound notification directly address my top Phase 0 pain point?
- Can this be implemented with a single, well-documented email-sending service, rather than something custom?

---

## Data Import: One-Time, Not Ongoing

If you have existing data (a spreadsheet of past invoices, for example), you likely don't need an ongoing sync — you need a one-time import to seed your new tool, after which the tool becomes the source of truth.

> **Best practice**
> Resist building a recurring import pipeline for data you'll only ever bring in once. A simple one-time script or manual copy-paste, run a single time, is proportionate — building reusable import infrastructure for a one-time task is effort spent on the wrong problem.

---

## Live External Connections: Justify the Ongoing Cost

If a requirement genuinely needs continuous connection to an external service (a live bank feed, a calendar sync), be honest about what that actually commits you to: handling authentication tokens, dealing with rate limits, and building for the case where the external service is temporarily unavailable.

> **Decision card**
> Ask: "Is a live connection actually necessary, or would checking manually and entering data myself be an acceptable v1?" For most personal tools, manual entry with occasional import is a legitimate, much simpler choice — live integrations are worth their complexity only when the manual alternative is genuinely too slow or too error-prone to be usable.

---

## Handle Credentials Correctly From the Start

Any integration that requires an API key or credential needs the same discipline as the Authentication module: never hardcoded, always in environment variables, never committed to version control.

- Is every API key or credential stored as an environment variable?
- Would accidentally publishing your code publicly expose any secret?

---

## Using AI to Scope Your Integration Needs

> **Copy this prompt**
> ```
> Here's my top pain point and requirements from Phase 0, and my
> tool's core function:
>
> [paste problem definition and must-have requirements]
>
> Help me decide on integrations:
> 1. Is there a simple outbound notification (email) that would
>    directly address my core pain point, worth including in v1?
> 2. Do I have existing data that needs a one-time import, rather
>    than an ongoing sync?
> 3. Is there any requirement that seems to call for a live external
>    connection — and if so, would manual entry be an acceptable
>    simpler alternative for v1?
>
> Bias toward the simplest integration approach that still solves
> the real problem.
> ```

---

## What You Should Have Now

- A confirmed list of any integrations actually needed, categorized as notification, one-time import, or live connection
- Confirmation that any live connection is genuinely justified, not just convenient
- A plan for storing any credentials securely, matching your Authentication module's standards

With external connections scoped, the next module — Reporting Architecture — covers how your tool surfaces summarized information back to you, beyond the primary list and detail views you've already designed.
