---
title: Frontend
slug: frontend
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 25–30 min
---

# Frontend

## The Frontend's Real Job: Reflect the Backend's Truth, Not Replace It

Authorization already established the hard rule: the frontend hiding a button is UX, not security — the backend enforces every real boundary. That frees you up here. Your frontend's job is to make the system's actual rules *legible* to a real human — clear states, honest feedback, low friction — not to re-implement security logic in JavaScript.

This module covers the screens a personal-mode marketplace actually needs, mapped to entities and rules you've already fully specified.

---

## The Screen List, Mapped to What You've Already Designed

| Screen | Reflects |
|---|---|
| Browse/Search | Search Architecture's filters; only Active listings, per the status rule |
| Listing detail | Listing System's fields; visibility rules by status and viewer role |
| Create/edit listing | Seller Journey's friction map — minimal required fields, save-as-draft |
| Seller dashboard (minimal) | SellerProfile's listings, basic status overview |
| Checkout | Payments Architecture's flow, with held-vs-immediate-release reflected honestly |
| Messages | Messaging System's threads, tied to listings |
| Transaction/order status | The Transaction state machine, shown plainly |
| Dispute flag/status | Dispute Resolution's flow |
| Profile (own + public view) | User Architecture's public vs. private fields |

> 💡 **Tip:** Don't build screens for entities or actions you don't have yet. If there's no admin role beyond "you," don't build a full admin dashboard UI — Admin Panel, later in Phase 3, covers exactly how minimal that should be. Building ahead of need here is the same premature-scope trap flagged throughout Phase 2.

---

## Reflecting Status Honestly, Not Just Functionally

Every status field you built — Listing, Transaction — needs a corresponding, honest UI state. This directly serves the trust-building goal from your Buyer and Seller Journey modules: ambiguity erodes trust faster than a clearly-stated wait.

| Status | What the UI Should Communicate |
|---|---|
| Listing: Pending Approval | Clearly shown to the seller — "Under review," not silently absent |
| Listing: Rejected | The reason, if you recorded one — not just "rejected" with no context |
| Transaction: Payment Held | Explicitly state funds are held, and what triggers release — matches the Payments Architecture decision |
| Transaction: Disputed | Visible to both parties, with the 48-hour expectation stated, per Marketplace Policies |

> ⚠️ **Common mistake:** Building the happy-path UI thoroughly (browse, list, checkout) and treating "edge case" states like Rejected or Disputed as low priority, shown with generic or missing copy. These are exactly the moments a user's trust is most fragile — under-investing here undermines the careful Trust & Safety design from Phase 1.

---

## Loading, Empty, and Error States Are Not Optional Polish

These three states are listed as their own dedicated curriculum topics later in this phase precisely because they're commonly skipped — but a few principles apply now, while you're building the core screens:

- Every list view (browse, my listings, messages) needs a defined empty state — don't ship a blank page when there's simply no data yet
- Every async action (checkout, sending a message, flagging a dispute) needs a loading state — an unresponsive button reads as broken, not busy
- Every form needs inline validation errors tied to the specific field, not a generic banner

> ✅ A buyer staring at a blank "browse" screen with zero listings, and no explanation, will assume the marketplace is broken or dead — directly undermining the Discovery stage of the Buyer Journey you designed in Phase 1.

---

## Forms: Match the Friction Decisions You Already Made

Your listing creation form is not a place to "add a few more fields while you're at it." Build exactly the required/optional split decided in Listing System — no more.

| Decision Already Made | Frontend Implication |
|---|---|
| 3-4 required core fields | Keep the initial form short — don't pad it |
| Fixed category list | A select/dropdown, never freeform text |
| At least 1 required photo | Block submission without it, with a clear inline message |
| Draft status exists | Support save-and-resume — don't force one-shot completion |

---

## AI Prompt: Building Screens Against Your Existing API

```
I'm building the frontend for a personal-scale marketplace using
[your frontend framework from Tech Stack Selection], calling a
backend with these entities and statuses: [paste your Listing,
Transaction, and Thread status values].

Build these screens: Browse/Search, Listing Detail, Create/Edit
Listing (with draft support), Checkout, Messages, Transaction Status,
Dispute Flag.

For each:
1. Reflect every status value with clear, honest UI copy — not just
   functional handling
2. Include a defined empty state for any list view
3. Include loading states for async actions (checkout, send message,
   flag dispute)
4. Match the listing form exactly to my required/optional field split
   — don't add convenience fields I haven't specified

Do not implement client-side authorization as a security boundary —
hide UI elements for UX clarity only; the backend enforces real rules.
```

---

## Common Mistake: Re-Implementing Backend Logic in the Frontend

> ⚠️ Calculating whether a user "should" be able to edit a listing using frontend-side logic that duplicates backend authorization rules creates two sources of truth that can drift out of sync. Let the backend's response (success, or a specific error) drive what the UI shows — don't have the frontend independently decide permissions and then separately call an API that re-checks them. One source of truth, always the backend.

---

## What You Should Walk Away With

1. Screens built for every entity and flow already specified — no speculative extras
2. Every status value (Listing, Transaction) reflected with honest, specific UI copy
3. Empty, loading, and inline error states present on every list view and async action
4. A listing form matching your exact required/optional field decision, with draft support
5. No frontend-side authorization logic standing in for real backend enforcement

This is where the system becomes usable, not just functional. Payments, next, goes deeper into the checkout and seller payout UI specifically — building on the screen foundation you've just established here.
