---
title: Authorization Rules
slug: authorization-rules
phase: Phase 3
mode: personal
projectType: marketplace
estimatedTime: 15–20 min
---

# Authorization Rules

Authentication answers "who is this?" Authorization answers "what are they allowed to do?" Most beginner marketplace bugs — and most real-world marketplace breaches — happen because teams nail the first and skip the second.

In a marketplace, this isn't optional. Buyers, sellers, and admins all share the same database tables. Without solid authorization, a logged-in buyer can edit someone else's listing just by changing an ID in the URL. This is called **IDOR** (Insecure Direct Object Reference), and it's the most common vulnerability in marketplace apps built fast.

> ** Core rule:** Authentication happens once, at login. Authorization happens on *every single request* that touches a resource.

---

## The Permission Surface

Map this out before writing any middleware. Every marketplace has roughly the same shape:

| Resource | Guest | Buyer | Seller (non-owner) | Owner | Admin |
|---|---|---|---|---|---|
| View active listing |  |  |  |  |  |
| Edit/delete listing |  |  |  |  |  |
| Send message in thread |  | Participant only |  | Participant only |  |
| Leave review |  | After completed order only |  |  |  |
| View dispute |  | Party only |  | Party only |  |
| Suspend a user |  |  |  |  |  |

Notice the pattern: most rules aren't really about *role*. They're about **ownership** or **participation**. "Seller" alone doesn't grant edit access — being *the* seller on *that specific listing* does. This distinction is the most important decision on this topic.

---

## Decision: How to Model This in Personal Mode

> ** Decision Card — Authorization Strategy**
>
> **Option A: Role-only checks** (`if user.role === 'seller'`)
> Fast to write, wrong for marketplaces. A seller could edit *any* listing, not just their own.
>
> **Option B: Ownership + Role checks** (recommended)
> Check role *and* ownership/participation together. Slightly more code, correct behavior.
>
> **Option C: Full policy engine** (e.g. CASL, Oso)
> Powerful, but overkill for a solo personal project. Revisit if you add team accounts or complex permission tiers later.
>
> **For Personal Mode: use Option B.** It's simple enough to reason about by yourself and correct enough to actually be safe.

---

## The Two-Layer Rule

Every protected action needs **two separate checks**, not one:

1. **Identity check** — Is there a valid logged-in user? (Authentication middleware)
2. **Relationship check** — Does *this* user have a valid relationship to *this* resource? (Authorization logic)

```js
// Layer 1: Authentication (runs on every protected route)
function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  next();
}

// Layer 2: Authorization (runs per-resource)
async function requireListingOwner(req, res, next) {
  const listing = await db.listing.findUnique({ where: { id: req.params.id } });

  if (!listing) return res.status(404).json({ error: "Listing not found" });
  if (listing.sellerId !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Not authorized" });
  }

  req.listing = listing; // avoid refetching in the route handler
  next();
}

router.put("/listings/:id", requireAuth, requireListingOwner, updateListing);
```

> **️ Warning:** Never trust an `ownerId` or `sellerId` sent from the client in the request body. Always fetch the resource from the database and compare server-side. Client data is a suggestion, not a fact.

---

## Where Authorization Bugs Actually Hide

| Mistake | Why it's dangerous |
|---|---|
| Checking ownership only in the frontend (hiding the "Edit" button) | API endpoint still accepts the request — trivially bypassed with curl/Postman |
| Checking auth on `GET /listings/:id` but not `DELETE /listings/:id` | Easy to forget — deletes are often added later and skipped during review |
| Using the listing ID from the route but the user ID from the request body | Client can lie about which user it is |
| Forgetting message threads need *participant* checks, not just *authenticated* checks | Any logged-in user could read strangers' DMs |
| No admin override path, so admins can't moderate without direct DB access | Forces unsafe manual database edits in production |

---

## Reviews: A Special Case Worth Calling Out

Review authorization is uniquely tricky because it depends on **transaction history**, not just identity:

- Only a buyer who **completed an order** with that seller can review them.
- A seller should never be able to review themself or fabricate reviews.
- One review per completed order — not per user — to prevent review spam.

```js
async function requireCompletedOrder(req, res, next) {
  const order = await db.order.findFirst({
    where: {
      buyerId: req.user.id,
      sellerId: req.params.sellerId,
      status: "completed",
    },
  });

  if (!order) {
    return res.status(403).json({ error: "No completed order with this seller" });
  }

  req.order = order;
  next();
}
```

---

## AI Prompt: Generate Your Authorization Middleware

> ** Copy Prompt**
>
> ```
> I'm building authorization middleware for a personal marketplace project.
> Stack: [YOUR STACK — e.g. Node.js/Express, Prisma, PostgreSQL].
>
> Generate middleware functions for these rules:
> 1. requireAuth — user must be logged in
> 2. requireListingOwner — user must own the listing OR be admin
> 3. requireThreadParticipant — user must be buyer or seller in a message thread
> 4. requireCompletedOrder — user must have a completed order with the target seller before reviewing
>
> Requirements:
> - Always fetch the resource from the database; never trust IDs from the request body
> - Return 401 for missing auth, 403 for valid auth but insufficient permission, 404 if resource doesn't exist
> - Keep functions composable so I can chain them in route definitions
> - Add a short comment above each function explaining what it protects against
> ```
>
> **Why this prompt works:** it names the exact rules instead of asking AI to "add authorization," which prevents generic, incomplete output. It also forces correct HTTP status codes (401 vs 403 vs 404), a detail beginners often get wrong and that affects how your frontend handles errors.

---

## Validating AI-Generated Authorization Code

AI-generated auth middleware looks correct far more often than it *is* correct. Check for these specific failure patterns before merging:

> ** Validation Checklist**
> - [ ] Does every check fetch the resource from the **database**, not trust client-sent IDs?
> - [ ] Does the admin override actually work, or did AI forget to add it?
> - [ ] Are 401 (not logged in) and 403 (logged in, not allowed) used correctly — not just always 403?
> - [ ] Is there a check on *every* mutating route (`POST`, `PUT`, `PATCH`, `DELETE`), not just the obvious ones?
> - [ ] Does the thread/message check verify *participation*, not just authentication?
> - [ ] Did AI accidentally check `role === 'seller'` instead of `listing.sellerId === user.id`? (The single most common AI mistake on this exact topic.)

> ** Common Hallucination:** AI frequently writes `if (user.role === 'seller')` when you asked for ownership-based authorization. This compiles, looks reasonable, and is completely wrong for a multi-seller marketplace. Always read the diff line by line on auth code — this is not a place to skim.

---

## Token Efficiency Tip

Don't paste your entire schema and every route file into one prompt. Authorization logic only needs:

- The relevant table shapes (e.g. `listing`, `order`, `message` — not your whole schema)
- The specific rule you're implementing
- Your existing `requireAuth` function, if you already have one, so AI extends rather than duplicates it

Keep this as its own focused conversation, separate from UI work — mixing concerns makes it easy for AI to silently drop a security check while "helping" with something else.

---

## What You've Decided

By the end of this module you should have:

- A two-layer pattern (authentication + authorization) applied consistently
- Ownership-based checks for listings, not role-only checks
- Participant checks for messaging
- Completed-order checks for reviews
- Correct 401/403/404 status codes across your protected routes

**Next:** Listings — where these authorization rules get wired into actual CRUD endpoints.
