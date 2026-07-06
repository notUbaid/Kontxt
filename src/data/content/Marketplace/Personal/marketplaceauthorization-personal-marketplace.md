---
title: Authorization
slug: authorization
phase: Phase 2
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Authorization

## Authentication Answers "Who." Authorization Answers "What Can They Do."

These get conflated constantly by beginners. Authentication (already built) confirms identity — this person is genuinely user #4521. Authorization is a separate system entirely: given that identity, what are they allowed to see, edit, or do *on this specific record*?

This distinction matters more in a marketplace than almost any other app type, because of the two-sided truth from Architecture Fundamentals: most records involve two different users, and the question is rarely "do you own this" — it's "are you one of the two parties involved."

---

## The Permission Pattern That Covers Most of Your App

Forget complex role-based permission systems for now. Most marketplace authorization reduces to one repeated pattern:

> **"Is the current user the owner, a party to this transaction, or neither?"**

| Resource | Who Can View | Who Can Edit |
|---|---|---|
| Listing | Anyone (if active/approved) | Only the seller who created it |
| Transaction | Only the buyer and seller involved | Neither edits directly — status changes via defined actions (cancel, complete, dispute) |
| Message thread | Only the two participants | Either participant can send, neither can edit/delete the other's messages |
| Review | Anyone (once published) | Only the author, and only before publishing if you allow drafts |
| User profile | Anyone (public fields only) | Only the account owner |

>  **Best practice:** Write this as a single reusable check — "is current_user_id one of [owner_id] or [party_ids] for this record" — and apply it consistently, rather than writing custom permission logic per feature. Inconsistent authorization logic across different parts of your app is one of the most common sources of real security bugs in solo-built marketplaces.

---

## Account Status Gates Everything Else

Before any ownership/party check even runs, account status (from User Architecture) should be the first gate.

| Status | Can Browse | Can List | Can Message | Can Transact |
|---|---|---|---|---|
| Active | Yes | Yes | Yes | Yes |
| Suspended | Yes | No | No | No |
| Banned | No (cannot log in) | No | No | No |

> ️ **Common mistake:** Implementing account status as a field that exists but isn't actually checked everywhere it should be. A suspended seller who can still technically create a listing because the listing-creation code path never checks account status isn't a documentation gap — it's a real bypass of your Trust & Safety enforcement ladder. Every action listed in your Marketplace Policies enforcement section needs a corresponding status check in code, not just in the schema.

---

## Listing Approval Status Is an Authorization Concern Too

This connects directly to the approval model you chose in Marketplace Policies. "Pending approval" listings shouldn't be visible to buyers at all — that's not a UI nicety, it's an authorization rule.

| Listing Status | Visible to Public Buyers | Visible to the Seller | Visible to You (Admin) |
|---|---|---|---|
| Draft | No | Yes | Yes |
| Pending approval | No | Yes (with status shown) | Yes |
| Active | Yes | Yes | Yes |
| Removed | No | Yes (with reason shown) | Yes |

>  If your approval model from Phase 1 was pre-approval, this table is non-negotiable — a pending listing leaking into public search results defeats the entire point of manual review.

---

## You Are the Admin Role — Don't Build a Separate One Yet

Echoing the point from Authentication: at personal-mode scale, "admin" isn't a role other users have, it's you, accessing the system directly or through a minimal internal tool. Build the smallest possible admin capability — enough to approve listings, change account status, and resolve disputes — not a full role-based admin panel. That's covered properly in Admin Panel during Phase 3, once you know what you actually need from using the system yourself.

---

## Where to Enforce Authorization: Never Just the Frontend

> ️ **This is a hard rule, not a preference:** every authorization check must exist on the backend, regardless of what the frontend hides or disables. Hiding an "edit" button for non-owners is a UX nicety — it is not security. Anyone can call your API directly, bypassing your UI entirely. If the backend doesn't independently verify the user is the listing owner before processing an edit, your authorization doesn't actually exist, no matter how the frontend looks.

---

## AI Prompt: Auditing Your Authorization Coverage

```
I'm building a personal-scale marketplace for [your niche] using
[your chosen stack]. Here are my core resources: Listing, Transaction,
Message, Review, User profile.

For each of these API endpoints/actions: [list your actual endpoints
or planned actions, e.g. "edit listing," "send message," "view
transaction," "create review"]

Audit each one and tell me:
1. What backend authorization check it needs (ownership, party-to-
   transaction, or public)
2. Whether account status (active/suspended/banned) needs to gate it
3. Whether listing approval status needs to gate it
4. Any endpoint where I'm likely to have only checked this on the
   frontend and forgotten the backend check

Flag this as a security review, not a style review — be direct about
gaps, don't soften findings.
```

---

## Common Mistake: Role-Based Permissions Before You Need Them

> ️ Granular role-based access control (RBAC) with custom permission sets is solving a problem you don't have yet — multiple admin-tier users with different responsibilities. At personal-mode scale, the ownership/party-to-transaction pattern above covers nearly everything. Add RBAC complexity only when a second person actually needs admin-level access with boundaries.

---

## What You Should Walk Away With

1. A single, reusable ownership/party-to-transaction check applied consistently across resources
2. Account status gating every action it should — verified for each, not assumed
3. Listing approval status correctly gating public visibility
4. Confirmation that every authorization check exists on the backend, not just hidden in the frontend UI

This authorization layer is what makes every feature in Phase 3 — Listing System, Messaging, Reviews — actually safe to ship. Build it before, or alongside, those features, not after.
