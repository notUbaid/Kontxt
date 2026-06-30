---
title: Submission Checklist
slug: submission-checklist
phase: Phase 6
mode: production
projectType: ecommerce
estimatedTime: 15-20 min
filename: submission-checklist-personal-e-commerce.md
---

# Submission Checklist

Everything else in this phase was about building the story. This module is the final pass before you actually put that story — and the store behind it — in front of someone else.

This is deliberately not a creative module. It's a verification pass. The goal is catching the kind of small, embarrassing gap that's invisible to you because you've stared at this project for weeks, but instantly obvious to a stranger seeing it for the first time.

---

## Decision 1: What Are You Actually Submitting To?

Tailor the checklist below to your real context — not every category applies to every situation.

| Context | What gets extra scrutiny |
|---|---|
| Portfolio / personal site | Live link reliability, README quality, screenshots |
| Job application | Code readability, commit history, written case study |
| Course / capstone evaluation | Matches stated requirements exactly, documentation completeness |
| Public showcase / directory listing | First-impression polish, mobile experience, load speed |
| Sharing with a mentor or collaborator | Honest "what's not finished yet" notes, clear next-steps |

> **Tip:** Re-read whatever instructions or expectations came with your context (a job posting, a course rubric, a showcase's submission guidelines) one more time before this pass. Most submission failures aren't quality problems — they're missed requirements that were stated plainly somewhere you skimmed past.

---

## The Full Checklist

Work through these in order. Each category catches a different class of last-minute failure.

### Product Functionality

- [ ] Full purchase flow works end-to-end on a fresh browser session (not just your logged-in dev session)
- [ ] Checkout completes successfully with a test payment, right now, not "last week when I checked"
- [ ] Order confirmation actually arrives (email, on-screen, or both)
- [ ] Cart persists correctly across a page reload
- [ ] Mobile experience checked on an actual phone, not just a resized browser window
- [ ] No console errors visible in dev tools on your core pages

> **Common Mistake:** Verifying the happy path once, weeks ago, and assuming it still works. Dependencies update, test API keys expire, seed data gets stale. Re-test the full flow within 24 hours of submitting, not before.

### Content & Polish

- [ ] No placeholder text anywhere ("Lorem ipsum," "Product Name Here," "TODO")
- [ ] Product images are real, not broken links or generic stock photos that undercut credibility
- [ ] Empty states (empty cart, no orders yet) look intentional, not broken
- [ ] Error states (failed payment, invalid input) show a real message, not a raw stack trace
- [ ] Spelling and grammar checked on every customer-facing page, not just the homepage

### Technical Readiness

- [ ] Live URL is actually live — open it in an incognito window right now and confirm
- [ ] Environment variables and secrets are not exposed in your repo (check `.env` is gitignored)
- [ ] README explains what the project is, how to run it, and what's genuinely finished vs. in progress
- [ ] No debug/test code paths left active in production (test payment bypass, hardcoded admin access, console.logs dumping sensitive data)

> **Warning:** Check specifically for leftover debug shortcuts — a "skip payment" button, a hardcoded discount code, an admin route with no auth check. These get added during development for convenience and forgotten. Anyone evaluating your project who finds one will reasonably question what else was cut.

### Business & Presentation Materials

- [ ] Demo script (if presenting live) has been rehearsed out loud, timed, within the last few days
- [ ] Pitch deck or written case study claims match what the live product actually does — re-verify after any late changes
- [ ] Any stated numbers (orders processed, conversion rate) are current, not from an earlier, smaller version of the project
- [ ] You can answer "what would you build next" in one clear sentence — almost always asked

### Legal & Trust Basics

These matter even for a personal project that processes real or test payments — they're a baseline signal of competence, not bureaucracy.

- [ ] Privacy policy and terms of service exist and are linked, even if minimal
- [ ] Return/refund policy is stated somewhere visible
- [ ] If using real payment processing, you understand what's actually live vs. test mode — and you know which one is active right now

---

## Using AI Effectively Here

Use AI as a second pair of eyes against this exact checklist — not to write new content, but to systematically check what you might be too close to the project to see.

**📋 Copy this prompt:**

```
I'm doing a final pre-submission review of a solo e-commerce project before [your context: portfolio / job application / course submission / public showcase].

Here's my project: [paste your README, or describe the core flow and tech stack]

Go through this checklist and flag anything that's likely missing, inconsistent, or risky based on what I've described — don't just confirm everything looks fine:
- Placeholder content or broken states
- Claims in my presentation materials that might not match the actual product
- Common last-minute issues: exposed secrets, leftover debug code, untested mobile experience
- Anything a first-time evaluator would notice in the first 30 seconds that I might be missing because I'm too close to it

Be specific about what to check, not generic reassurance.
```

This prompt is structured to push for genuine scrutiny rather than validation — AI will default to being agreeable unless explicitly told to look for problems, so the instruction to flag issues rather than confirm correctness matters.

---

## Validating the Output

AI can flag likely issues from your description, but it cannot click through your actual live product. The final verification is yours:

- [ ] Personally walked the full purchase flow in an incognito window in the last 24 hours
- [ ] Personally opened the live URL fresh, not just trusted that deployment succeeded
- [ ] Personally re-read every claim in your presentation materials against what the product currently does
- [ ] Asked one other person, even informally, to try the core flow once before you submit

> **Tip:** That last step — one outside pair of eyes — catches more real problems than any amount of solo re-checking. You've built pattern blindness to your own project; someone seeing it fresh hasn't.

---

## Common Last-Minute Mistakes

| Mistake | Why it happens | Prevention |
|---|---|---|
| Live demo breaks because of an expired test API key | Keys set up weeks ago, never re-verified | Re-test the full flow within 24 hours of presenting |
| Deck claims a feature that got cut during a late refactor | Materials written before the final build, never updated | Re-verify every claim against the live product, last |
| Mobile layout broken | Only ever tested on desktop during development | Check on an actual phone, not a resized window |
| Submission misses a stated requirement | Requirements skimmed once early on, not re-read | Re-read the actual submission guidelines right before sending |

---

## Before You Submit

This is the final gate. Don't submit until every box here is genuinely checked, not assumed:

- [ ] Full purchase flow re-tested end-to-end, today
- [ ] No placeholder content, broken states, or leftover debug code anywhere
- [ ] Live URL confirmed working in a fresh incognito window
- [ ] All presentation materials re-verified against the actual current product
- [ ] At least one other person has tried the core flow
- [ ] Submission requirements re-read one final time

---

## What Comes After This

Submitting isn't the end of the project — it's the point where real feedback starts. Whatever response you get (interview questions, mentor feedback, user reactions), treat it as new input for the next iteration: revisit Retention, Analytics, or Conversion Optimization earlier in this phase based on what you actually learn, rather than treating this checklist as a finish line.
