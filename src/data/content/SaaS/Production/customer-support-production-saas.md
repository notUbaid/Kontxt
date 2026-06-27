---
title: Customer Support
slug: customer-support
phase: Phase 5
mode: production
projectType: saas
estimatedTime: 20-25 min
---

# Customer Support

Customer support isn't a department you build later — at launch, it's you, possibly alone, handling every confused user, every bug report, and every billing question. The goal of this module isn't to build a support team. It's to build the minimum system that makes you fast and consistent instead of drowning in your inbox while also trying to fix the bugs people are reporting.

---

## The Core Idea: Support Load Is a Signal, Not Just a Cost

Every support ticket is one of two things: a UX problem you can fix, or a genuine question that reveals a documentation gap. Treat your early support inbox as your highest-signal source of product feedback — it tells you exactly where real users get confused, which is far more reliable than guessing.

> ** Tip**
> Tag every ticket by root cause as you handle it: "bug," "confusing UI," "missing docs," "billing question," "feature request." After two weeks, look at the distribution. If 40% of tickets are "confusing UI" on one specific screen, that's a roadmap item with actual evidence behind it — not a hunch.

---

## Step 1: Pick a Support Channel That Matches Your Stage

**Decision Card — Support Channel by Stage**

| Stage | Recommended Channel | Reasoning |
|---|---|---|
| Pre-launch / private beta | Direct email or a shared inbox | Low volume, personal touch builds trust with early users |
| Public launch, low volume | Helpdesk tool (e.g., Plain, Crisp, Help Scout) | Centralizes tickets, basic automation, still affordable solo |
| Growing volume | Helpdesk tool + in-app chat widget | Reduces friction for users to ask without leaving the product |
| Scale | Helpdesk + self-serve docs/help center + chat | Deflection becomes necessary — you can't read every ticket personally anymore |

Don't reach for an enterprise helpdesk platform on day one. A well-organized shared inbox handles the first few hundred users fine, and you'll have real usage patterns informing your tool choice by the time you outgrow it.

> **️ Warning**
> Don't put your only support contact behind a contact form with no visible email address and no response time expectation. Early users churn fast when they feel ignored, and "we'll get back to you eventually" with no signal of when reads as no one being there at all.

---

## Step 2: Write Down Response Time Expectations — Even Informal Ones

You don't need a formal SLA (see the Legal Documents module) to set an internal standard. Decide and write down:

- [ ] Target first-response time (e.g., "within 24 hours on business days")
- [ ] What counts as urgent (e.g., billing failures, account lockouts) and gets faster response
- [ ] Where this expectation is communicated to users — even a simple line on your support page

> ** Note**
> Having no stated expectation doesn't mean you're flexible — it means users assume the worst when they don't hear back quickly. A clear "we respond within 1 business day" line reduces anxious follow-up emails more than actually answering faster would.

---

## Step 3: Build a Lightweight Knowledge Base Before You Need One

The best time to write a help doc is right after you answer the same question for the second time. Waiting until you have "enough content for a real docs site" means repeating yourself dozens of times first.

**Best Practice Card — Minimum Viable Help Center**

```
Start with just these categories:
1. Getting Started (account setup, first key action)
2. Billing (how to upgrade/downgrade/cancel, refund policy)
3. Troubleshooting (the 3-5 most common issues you've already seen)
4. Contact Us (how to reach a human, response time expectation)

A single Markdown-based docs page or a simple FAQ section is enough
at launch. Don't build a fully-featured help center platform before
you have enough content to fill more than one page.
```

---

## Using AI to Handle Support Efficiently

AI is well-suited to support work in two specific ways: drafting consistent responses to common questions, and summarizing patterns across many tickets. It's poorly suited to handling ambiguous emotional situations or making refund/exception judgment calls on your behalf without a human reviewing first.

**Prompt: Draft a Response to a Common Question**

```
A user asked: "[paste their exact question/issue]"

Context about my product: [one or two sentences on what's relevant]
Our actual policy on this: [state your real policy, e.g., refund terms]

Draft a support response that:
- Directly answers their question first, no preamble
- Matches a warm but efficient tone, not corporate-formal
- Doesn't promise anything beyond our stated policy
- Is short enough to read in 15 seconds
```

> ** Why this prompt works**
> Supplying your *actual* policy in the prompt prevents the model from inventing a more generous (or stricter) answer than what you actually offer — a common failure mode when AI drafts support replies from general "helpful tone" instincts rather than your real rules. The length and tone constraints keep responses from reading like generic corporate copy-paste, which erodes trust faster than a slightly slower human reply would.

**Prompt: Find Patterns Across Tickets**

```
Here are support tickets from the past two weeks (subject + brief
summary for each):

[paste a list]

Group these into recurring themes. For each theme, estimate roughly
what fraction of tickets it represents, and suggest whether the root
cause is likely a bug, a missing feature, or a documentation/UX gap.
```

> ** Why this prompt works**
> This turns a pile of unstructured tickets into a prioritized signal for what to fix next — exactly the analysis that's tedious to do by hand but mechanical for a model once the raw ticket content is provided.

**Token efficiency note:** Don't paste your entire support history into one giant prompt. Batch by time period (e.g., every two weeks) so the model is finding patterns in a digestible, recent slice rather than trying to summarize months of unrelated context at once.

---

## Validating AI-Assisted Support Responses

- **Never auto-send AI-drafted responses for billing disputes, refund exceptions, or account security issues without human review.** These require judgment calls about your specific policy and the specific user's situation that a draft can't safely make for you.
- **Check that the draft doesn't invent a policy you don't have.** AI can confidently state "you can get a full refund within 30 days" if your prompt was vague about your actual terms — always supply your real policy explicitly, as shown above.
- **Watch for over-apologizing or over-promising tone in drafts.** A response that apologizes profusely for a minor issue, or promises a fix "right away" without you actually having scheduled one, sets expectations you may not meet.

---

## Quick Reference: Support Readiness at Launch

1. One clear, visible way to contact support
2. A stated (even informal) response time expectation
3. A short help doc covering your 3-5 most likely questions
4. A simple way to tag/categorize tickets so patterns become visible over time
5. A rule: no AI-drafted response involving money or account access goes out without your eyes on it first

---

## What's Next

With Phase 5 launch infrastructure complete, move into **Phase 6 — Growth**, starting with **Product Analytics**, where the events and support patterns you're now collecting become the foundation for deciding what to build next.
