---
title: Listings
slug: listings
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 20–25 min
---

# Listings

The listing is the core unit of value in any marketplace. Everything else — search, messaging, payments, reviews — exists to get a buyer to a listing and help them act on it. If your listing system is fragile, every feature built on top inherits that fragility.

This module covers building the CRUD layer for listings: the data model, the API, status transitions, and the validation gaps AI tends to leave behind.

---

## The Listing Lifecycle

Before writing code, define the states a listing can be in. Skipping this is the #1 reason personal marketplace projects end up with bugs like "sold items still showing in search."

```
draft → active → (paused) → sold/completed → archived
                     ↓
                  removed (by admin/moderation)
```

> **🔑 Why this matters:** Each state changes what's allowed. A `sold` listing shouldn't accept new messages asking "is this available?" A `draft` listing shouldn't appear in search. If you only have a boolean `isActive`, you can't express this — you need a proper status field.

| Status | Visible in search | Buyer can message | Buyer can purchase |
|---|---|---|---|
| `draft` | ❌ | ❌ | ❌ |
| `active` | ✅ | ✅ | ✅ |
| `paused` | ❌ | ✅ (existing threads only) | ❌ |
| `sold` | ❌ | ❌ | ❌ |
| `removed` | ❌ | ❌ | ❌ |

---

## Decision: Data Model Shape

> **🧩 Decision Card — Listing Schema**
>
> **Option A: One flat `listings` table**
> Simple, fast to build. Works well when every listing type (physical goods, services, digital items) shares roughly the same fields.
>
> **Option B: Base table + category-specific tables**
> More correct for very different listing types (e.g. "car for sale" vs "tutoring service" need different fields). Significantly more complexity.
>
> **For Personal Mode: use Option A** unless your marketplace genuinely spans wildly different item types. Use a flexible `attributes` JSON column for category-specific fields instead of new tables — Postgres and SQLite both support this well, and it avoids a migration every time you add a category.

```prisma
model Listing {
  id          String   @id @default(cuid())
  sellerId    String
  title       String
  description String
  price       Int      // store cents, never floats
  category    String
  status      ListingStatus @default(draft)
  attributes  Json?    // category-specific fields, e.g. { "condition": "used" }
  images      String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  seller      User     @relation(fields: [sellerId], references: [id])

  @@index([status, category])
}

enum ListingStatus {
  draft
  active
  paused
  sold
  removed
}
```

> **⚠️ Warning:** Always store price as an integer (cents), never a float. `0.1 + 0.2` famously doesn't equal `0.3` in floating point — and in a marketplace, rounding errors mean either you or your users lose money.

---

## API Surface

Keep the route shape boring and predictable. Marketplaces don't need clever routing — they need correct routing.

```
POST   /listings              create (status defaults to draft)
GET    /listings              search/browse (active only, public)
GET    /listings/:id          view one (active, or owner/admin for any status)
PUT    /listings/:id          update (owner/admin only)
PATCH  /listings/:id/status   status transition (owner/admin only)
DELETE /listings/:id          soft delete → status = removed
```

> **🚩 Common Hallucination:** AI often implements `DELETE` as a hard delete (`DB.delete()`). For marketplaces, prefer a soft delete (set status to `removed`) so order history, reviews, and message threads referencing that listing don't break with dangling foreign keys.

---

## Validating Listing Input

This is where most beginner marketplaces get exploited or break in production. Validate on the server — client-side validation is UX, not security.

> **✅ Validation Checklist**
> - [ ] Title and description have sane length limits (prevents UI breakage and storage abuse)
> - [ ] Price is a positive integer within a realistic range (catch `-50` or `99999999` typos/abuse)
> - [ ] Category is restricted to an enum/allowlist, not free text (keeps search and filtering reliable)
> - [ ] Image URLs are validated as actual uploaded assets, not arbitrary external URLs (prevents hotlinking/abuse)
> - [ ] Status transitions are restricted — a listing can't jump from `draft` straight to `sold` (build a transition map, don't allow any-to-any)
> - [ ] `sellerId` is taken from the authenticated session, never from the request body

```js
const ALLOWED_TRANSITIONS = {
  draft: ["active"],
  active: ["paused", "sold", "removed"],
  paused: ["active", "removed"],
  sold: ["archived"],
  removed: [],
};

function canTransition(from, to) {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}
```

---

## AI Prompt: Generate the Listing CRUD Layer

> **📋 Copy Prompt**
>
> ```
> Build the CRUD API for a "Listing" resource in a personal marketplace project.
> Stack: [YOUR STACK — e.g. Node.js/Express, Prisma, PostgreSQL/SQLite].
>
> Schema:
> [PASTE YOUR LISTING SCHEMA HERE]
>
> Requirements:
> - Routes: POST /listings, GET /listings (search/browse), GET /listings/:id,
>   PUT /listings/:id, PATCH /listings/:id/status, DELETE /listings/:id (soft delete)
> - sellerId always comes from the authenticated session, never the request body
> - Server-side validation: price as positive integer, title/description length limits,
>   category restricted to an allowlist
> - Status transitions restricted to a defined transition map (draft → active → paused/sold → archived)
> - GET routes only return `active` listings unless the requester is the owner or an admin
> - Use the existing requireAuth and requireListingOwner middleware if I've shared it — don't recreate auth logic
> ```
>
> **Why this prompt works:** it explicitly tells AI to reuse existing middleware instead of duplicating authorization logic inline — a frequent source of drift where two different auth checks slowly diverge over time.

---

## Token Efficiency Tip

If you already generated authorization middleware in a previous module, paste the **function signatures only** (not the full implementation) into this prompt. AI needs to know `requireListingOwner` exists and what it does — it doesn't need the full body to call it correctly. This keeps the prompt focused and avoids token waste re-explaining auth logic that's already decided.

---

## Search Preview: Don't Over-Build Yet

You'll build full search architecture in a later module — for now, `GET /listings` just needs basic filtering (category, price range, status=active) and pagination. Resist the urge to add full-text search or relevance ranking here; that's premature for a personal project at this stage and will be revisited properly.

---

## What You've Decided

By the end of this module you should have:

- A defined listing lifecycle with explicit status transitions
- A flat schema with a flexible `attributes` field for category-specific data
- Server-side validation that doesn't trust client input
- Soft deletes instead of hard deletes
- A CRUD API that reuses your existing authorization middleware

**Next:** Messaging — connecting buyers and sellers around a specific listing.
