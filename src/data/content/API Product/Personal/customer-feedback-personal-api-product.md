---
title: Customer Feedback
slug: customer-feedback
phase: Phase 6
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Customer Feedback

Beta feedback was structured and small — a handful of people you could talk to directly. Past beta, feedback becomes ongoing and messier: bug reports, confused questions, feature requests, and the occasional rant, all arriving through whatever channel someone happened to reach for. Without a system, this either gets ignored (real problems go unfixed) or over-weighted toward whoever's loudest (you build for one vocal user instead of your actual market). This module is that system — lightweight enough for a solo maintainer to actually sustain.

This is separate from the next module, **Pricing Evolution**, and from **Feature Requests** later in this phase — this module is about the collection and triage process itself, not what to do with any specific request.

---

## The Decision: Which Channels to Support

| Channel | Good For | Maintenance Cost |
|---|---|---|
| A single support email/shared inbox | Everything — bugs, questions, feedback | Low |
| Public GitHub issues | Bug reports and feature discussion from a technical audience | Low-medium, searchable and transparent |
| Discord/Slack community | Real-time discussion, community building | High — needs active presence to not feel dead |
| Twitter/X DMs | Casual, low-friction | Fragments easily, hard to track |

> ** Best Practice:** Support one or two channels well rather than five poorly. For a solo-built API product, a support email as the canonical channel plus public GitHub issues for bugs and feature discussion covers nearly everything, without the ongoing presence a community server demands.

---

## Triage System

Every incoming message gets one of four labels, applied as soon as you read it:

| Label | Routes To |
|---|---|
| Bug | Your error tracking / issue tracker (Phase 4) |
| Confusion / DX friction | A note on which doc needs improving (Quick Start, Example Requests) |
| Feature Request | Backlog for the next module |
| Question | Direct reply, and a signal that your docs may need to cover this |

> ** Tip:** "Confusion" reports are the highest-leverage category and the easiest to under-value. Every developer who got confused and asked is one who got confused and *didn't* ask. Each one is a direct, free signal about exactly which doc to improve next.

---

## Response Expectations

Set a realistic bar and be transparent about it rather than implying a formal SLA you can't back at solo scale:

- Acknowledge within 24–48 hours, even if the full answer takes longer
- If something will take a while to fix, say so and give a rough timeframe rather than going silent
- It's fine to say "this is a one-person project, response times may vary" — most developers respect honesty about scale more than a polished-sounding promise you can't keep

---

## Closing the Loop

When you ship something that came from a piece of feedback, tell the person who asked. This is disproportionately high-leverage for almost no cost — a two-line "shipped the thing you asked about, thanks for flagging it" turns a one-time reporter into someone who keeps giving you signal, because they've seen it actually matters.

> **️ Warning:** Feedback that goes into a void — collected but never acknowledged as acted on — trains your most engaged users to stop bothering. The loop-closing message costs you almost nothing and is one of the few feedback-related actions with a near-guaranteed positive return.

---

## Avoiding the Loudest-Voice Trap

One person asking persistently for a feature is not the same signal as broad demand. Before prioritizing based on a request, cross-check it against your usage analytics from the previous module — is this something your active, retained users would plausibly use, or a niche need specific to one integration?

> **️ Warning:** Building whatever the most vocal user asks for, without checking it against real usage patterns, is how solo API products end up with a feature surface shaped by whoever emails the most rather than by what actually drives adoption.

---

## AI Prompts

**Prompt: Triage a batch of feedback**

```text
Here's a batch of raw feedback messages/emails I received this week: [paste messages].

Categorize each one as: Bug, Confusion/DX friction, Feature Request, or Question.

For each "Confusion/DX friction" item, name which specific doc (Quick Start, Example Requests, SDK README, etc.) is most likely to need improvement based on what confused them.

Output as a simple table: message summary | category | suggested action.
```

**Prompt: Draft a personal, non-templated response**

```text
A user reported this: [paste feedback/bug report].

Draft a short reply that:
- Acknowledges the specific issue they raised, not a generic thank-you
- States what happens next (investigating / already fixed in next release / not planned and why)
- Sounds like a real person wrote it, not a support macro

Keep it under 80 words.
```

---

## Validation Checklist

- [ ] One or two feedback channels chosen and actively monitored, not five half-maintained ones
- [ ] Every incoming item gets triaged into Bug / Confusion / Feature Request / Question
- [ ] Response time expectations are stated honestly, not implied as a formal SLA
- [ ] Shipped fixes/features are looped back to the people who originally reported them
- [ ] Feature requests are cross-checked against usage data before being prioritized

---

## Common Mistakes

> **️ Warning:** Spreading feedback across too many channels. If bugs come in via email, Discord, GitHub, and Twitter simultaneously, nothing gets a consistent triage pass — pick one or two and redirect the rest.

> **️ Warning:** Never closing the loop. Feedback that disappears into an inbox with no visible outcome teaches your best users that reporting things is pointless.

> **️ Warning:** No triage labels at all — an unsorted inbox that "gets reviewed sometime" reliably becomes an inbox that doesn't get reviewed at all once volume grows past a handful of messages a week.

---

## Security Note

Bug reports frequently include pasted API keys, tokens, or request/response payloads containing customer data. Treat anything submitted through a feedback channel as potentially sensitive — don't paste it into shared tools (public GitHub issues, group chat) without redacting, and rotate any key a user pastes into a bug report, since it should be considered compromised once it's left their environment.

---

## Implementation Checklist

- [ ] Primary support channel (email or shared inbox) set up and monitored
- [ ] GitHub issues enabled if the audience is technical enough to use them
- [ ] Triage labels defined and applied consistently
- [ ] A simple process for looping back to users when their feedback ships
- [ ] Feature requests logged somewhere durable, ready to feed into the next module

---

## What's Next

Next in Phase 6: **Pricing Evolution** — using what you've learned from beta, usage data, and feedback to revisit your original pricing model.
