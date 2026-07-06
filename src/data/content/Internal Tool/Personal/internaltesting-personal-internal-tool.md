---
title: Testing
slug: testing
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 20-30 min
---

# Testing

This closes out Phase 3. You've built CRUD, forms, tables, automation, notifications, reports, admin, search, files, import/export, bulk actions, and validation. Testing isn't about proving all of that in one heroic pass — it's about deciding, deliberately, what actually deserves a test at personal-mode scale.

---

## The Personal-Mode Testing Question

Not "how do I get full test coverage" — that's the wrong goal for a solo internal tool. The right question is:

**"Which parts of this tool, if silently broken, would I not notice until real damage was done?"**

That list is usually short, and it's exactly what deserves tests. Everything else can be validated by using the tool.

>  **Tip:** For a personal internal tool, comprehensive test suites are often a worse use of time than the features they'd protect. Test the few things that are expensive to get wrong, skip the rest, and rely on manual use for everything else.

---

## What Actually Deserves a Test Here

Based on what you've built across Phase 3, prioritize tests in this order:

| Priority | What | Why |
|---|---|---|
| High | Validation logic (from the Data Validation module) | Silent drift here corrupts data without any visible error |
| High | Automations with side effects (Workflow Automation module) | A silently broken automation looks identical to a working one — you won't notice until something didn't happen |
| High | Bulk operations, especially destructive ones | The blast radius of a bug here is large |
| Medium | Report calculations (Reports module) | Wrong numbers look just as credible as right ones |
| Medium | Import validation and failure handling | Bad data entering silently is expensive to clean up later |
| Low | Basic CRUD happy paths | Usually caught immediately just by using the tool |
| Low | UI layout/styling | Visual bugs are obvious on sight, not worth automated tests at this scale |

---

## The Test Types Worth Using

**Unit tests** — for pure logic with no database/network involved: validation schemas, report calculation functions, any business rule logic. Fast to write, fast to run, catch regressions cheaply.

**Integration tests** — for anything that touches your database: CRUD functions, automations that write data, bulk operations. Slower, but this is where the bugs that actually matter tend to live (an automation that doesn't fire, a bulk update that affects the wrong rows).

For personal-mode scale, skip end-to-end browser testing (Playwright/Cypress) unless you've been burned by a UI regression more than once — it's the highest-effort, highest-maintenance test type, and manual use catches most of what it would too.

---

## AI Prompt: Generate Tests for a Specific Risk

Scope this to one thing you identified as high-priority, not "write tests for my app."

```
Write [unit/integration] tests for [the specific function/flow — e.g., "the bulk status update function" or "the Order validation schema"].

Here's the code:
[paste the relevant function/schema]

Cover:
- The expected/happy path
- The specific edge cases that would be expensive to get wrong: [list them — e.g., "what happens when 0 rows are selected", "a row that fails validation mid-batch", "a negative price value"]
- The failure/error path, not just success

Use [your test framework — e.g., Vitest, Jest] following the existing conventions in this codebase.
```

Listing specific edge cases yourself, rather than asking the AI to "think of edge cases," produces tests that actually reflect what you know is risky about this particular piece of logic.

---

## Validating the Generated Tests

-  **Confirm each test actually fails when you break the code on purpose** — comment out a validation check or introduce a bug, and confirm the corresponding test catches it. A test that passes regardless of whether the code is correct is worse than no test — it's false confidence.
-  **Check tests aren't just re-asserting the implementation** — a test that mirrors the function's logic line-for-line will pass even if the logic itself is wrong; it should assert the expected *outcome*, not mimic the *method*
-  **Confirm edge cases you specified are actually covered**, not just a generic happy-path test with a different name
-  **Run the full test suite after writing new tests** — confirm nothing you added broke something else, and that run time stays fast enough that you'll actually keep running it

> ️ **Warning:** A test suite you don't run isn't protecting anything. If tests take long enough that you start skipping them, that's a sign to prune down to the high-priority list above rather than let the suite quietly become dead weight.

---

## A Lightweight Alternative: Manual Verification Checklists

For the "Low priority" items in the table above, a written manual checklist you run through before any significant change is often better ROI than an automated test for a solo tool:

```
Before deploying a change:
- [ ] Create a new record through the main form
- [ ] Edit and delete that record
- [ ] Run one bulk action on a small selection
- [ ] Check the most-used report still shows correct numbers
- [ ] Trigger the most important automation and confirm it fires
```

This isn't a replacement for testing the high-priority items — it's a fast, honest way to cover the rest without the maintenance cost of a full automated suite.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Trying for full test coverage on a solo internal tool | Time spent testing low-risk code is time not spent building |
| Tests that mirror the implementation instead of the expected outcome | Passes even when the underlying logic is wrong |
| Never verifying a test actually fails on broken code | False confidence — an untested test is not a safety net |
| Skipping tests on automations and bulk operations specifically | These are exactly where silent, high-impact bugs hide |
| Building E2E browser tests before unit/integration tests exist | Highest maintenance cost, often duplicating what manual use already catches |

---

## Before You Move On — Checklist

- [ ] I identified the specific high-risk logic (validation, automations, bulk ops, reports) rather than aiming for blanket coverage
- [ ] Tests were written for those high-priority items specifically, with edge cases I named myself
- [ ] I verified at least one test actually fails when the underlying code is broken on purpose
- [ ] Tests assert outcomes, not implementation details
- [ ] I have a lightweight manual checklist covering what isn't automated

---

## What's Next

Phase 3 is complete — your internal tool is functionally built. Phase 4 shifts focus from "does it work" to "is it safe and stable to actually run," starting with security.
