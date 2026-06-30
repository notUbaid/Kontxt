---
title: Admin Panel
slug: admin-panel
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Admin Panel

## You've Been Promised This Module Since Phase 1 — Here's the Minimal Version

Authorization and Marketplace Policies both deferred the full admin system to this exact module, with the same consistent message: you are the admin, build the smallest tool that lets you actually do the job. This is that tool — not a role-based permission system, not a general-purpose dashboard, just the specific actions your own earlier modules said you'd need to perform by hand.

---

## Build Only What Your Earlier Modules Require You to Do

This is a closed list, not a starting point to brainstorm from. Every row traces back to a decision already made.

| Action | Required By |
|---|---|
| Review and approve/reject pending listings | Marketplace Policies' pre-approval model |
| Suspend or ban a user account | Trust & Safety's enforcement ladder |
| View and act on reported listings/users | Trust & Safety's reporting flow |
| View and resolve disputed transactions | Dispute Resolution's mediation flow |
| View core business metrics | Analytics' four direct-database metrics |

> ✅ **Best practice:** If an admin action isn't directly traceable to an earlier module's requirement, don't build it yet. This mirrors the exact discipline applied to listing fields, search capabilities, and notification events throughout this curriculum — scope to what's actually needed, not what "admin panels" generically include.

---

## Listing Approval Queue: Your Most-Used Screen

Given your approval model from Marketplace Policies, this is likely the screen you'll open most often early on. Keep it efficient for repeated daily use, not just functionally correct.

- [ ] A list of all listings with status = "Pending Approval," sorted oldest-first
- [ ] Enough detail visible to make a decision without clicking into each one individually — title, category, price, photos, seller
- [ ] One-click approve and reject actions, with a required reason field on reject (so the seller-facing rejection notification, from Notifications, has real content)

> 💡 **Tip:** A rejection without a reason creates exactly the kind of frustrated, churned seller your Seller Journey module warned about. The few extra seconds to type a reason pays for itself in seller trust — and you already built the notification template to surface it.

---

## Dispute Queue: Surfacing What Dispute Resolution Defined

This is the literal UI for the manual mediation flow specified in Dispute Resolution — nothing new to design here, just to build.

- [ ] A list of transactions with status = "Disputed," with time-since-flagged visible (to track against your 48-hour commitment)
- [ ] A link into the relevant message thread for context, per the Messaging System integration already planned
- [ ] Resolution actions: refund, release, or partial split — each recorded with your reasoning, exactly as specified in Dispute Resolution

---

## Account Status Controls: Simple, Not Granular

- [ ] A way to search/find a specific user
- [ ] Actions to set account status: active, suspended, banned — directly writing to the field already defined in User Architecture
- [ ] A required reason field when suspending or banning, for your own future reference if patterns emerge

> ⚠️ **Common mistake:** Building this as a full user-management system with editable profile fields, role assignment, or bulk actions. You need exactly three state transitions on exactly one field. Anything more is solving a team-of-multiple-admins problem you don't have.

---

## Metrics View: Reuse What Analytics Already Computed

Don't rebuild query logic here — this screen displays the same direct-database metrics already defined in Analytics.

| Metric | Source |
|---|---|
| Total transaction volume | Analytics module's direct query |
| Net revenue after Stripe fees | Analytics module's direct query |
| Dispute rate | Analytics module's direct query |
| Listings per seller | Analytics module's direct query |
| Pending approval count | A simple count against Listing status |

---

## Access Control: The One Authorization Rule This Needs

This entire panel needs exactly one gate: is the current user you, specifically. At personal-mode scale, this can be as simple as checking the logged-in user's ID or email against a single hardcoded value or environment variable — not a role system.

> ✅ A hardcoded founder-check is not a hack at this scale, it's correctly-scoped engineering. Building a roles table, permission assignments, and an admin-invite flow for a panel only you will ever use is solving for a future team that doesn't exist yet.

---

## AI Prompt: Building the Minimal Admin Panel

```
I'm building a personal-scale marketplace using [your stack]. I'm the
sole admin — no other admin users exist or are planned soon.

Build an admin panel with exactly these screens:
1. Pending listing approval queue — list view with approve/reject
   (reject requires a reason), sorted oldest-first
2. Disputed transactions queue — list view with time-since-flagged,
   a link to the related message thread, and refund/release/partial
   resolution actions that record my reasoning
3. User account status control — search a user, set status to
   active/suspended/banned, with a required reason on suspend/ban
4. A metrics view displaying: total transaction volume, net revenue,
   dispute rate, listings per seller, pending approval count

Gate the entire panel behind a check that the logged-in user matches
my specific founder account — a simple ID/email check, not a roles
or permissions system.
```

---

## Common Mistake: Building This Before You've Used the System Manually

> ⚠️ If you haven't yet manually approved a real listing, mediated a real dispute, or banned a real user (even in test mode via Demo Transactions), you're designing this panel from theory rather than from what you actually needed to do. If you skipped ahead to this module, go back and run through Demo Transactions first — the friction you feel doing those actions manually is exactly what this panel should remove.

---

## What You Should Walk Away With

1. A listing approval queue with required-reason rejection
2. A dispute queue linked to message threads, with resolution actions
3. Simple account status controls with required reasoning
4. A metrics view reusing Analytics' existing queries
5. Access gated by a simple founder check, not a roles system

This closes the operational tooling needed to actually run the marketplace day to day. Testing, next, is where you verify all of Phase 3 — not just this panel — actually holds up under deliberate scrutiny before Production Readiness begins.
