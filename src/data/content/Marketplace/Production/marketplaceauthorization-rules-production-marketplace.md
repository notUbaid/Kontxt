---
title: Authorization Rules
slug: authorization-rules
phase: Phase 3
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Authorization Rules

## The Line Between a Marketplace and a Liability

Authentication verifies *who* the user is. Authorization verifies *what they are allowed to do*. 

In a production marketplace, authorization is the single most critical security layer. If you rely on the frontend to hide the "Edit" button for users who don't own a listing, but fail to enforce that rule on the backend API, a malicious user will intercept the network request, change the `listing_id`, and edit someone else's product. 

This vulnerability is called **IDOR** (Insecure Direct Object Reference), and it is the cause of almost all major marketplace breaches.

---

## RBAC vs. ABAC

As your marketplace scales, simple `if (user.role === 'admin')` checks will collapse under their own weight.

| Authorization Model | How it Works | When to Use It |
|---|---|---|
| **Role-Based Access Control (RBAC)** | Users are assigned static roles (`Buyer`, `Seller`, `Support`). | Good for simple, platform-wide permissions (e.g., "Only Support can view the Admin Panel"). |
| **Attribute-Based Access Control (ABAC)** | Permissions depend on the attributes of the user *and* the resource. (e.g., "A User can edit a Listing IF `User.id === Listing.owner_id`"). | **Mandatory** for marketplace operations. Most marketplace authorization relies on resource ownership, not static roles. |

---

## The Production Standard: Policy Engines

Do not hardcode ABAC logic directly into your HTTP route handlers. If you write `if (req.user.id !== listing.seller_id) return 403;` inside every single route, you will eventually forget one, creating a critical vulnerability.

**The Solution:** Use a Policy Engine (like **CASL**, **Cerbos**, or **Oso**).
A Policy Engine allows you to define your authorization rules in one central file:

```javascript
// Example CASL Policy Definition
defineAbility((can, cannot) => {
  can('read', 'Listing', { status: 'ACTIVE' });
  can('update', 'Listing', { sellerId: user.id });
  can('manage', 'all', { role: 'SUPER_ADMIN' });
});
```

You then enforce these rules via strict middleware on every single API route:
`router.patch('/listings/:id', requireAbility('update', 'Listing'), updateListing);`

---

## B2B Marketplaces (Organizational Roles)

If you are building a B2B (Business-to-Business) marketplace, authorization is exponentially more complex. A single "Seller" is actually an "Organization" with multiple employees.

You must implement **Hierarchical RBAC**:
1. **Organization Admin:** Can invite users, update billing, and manage all listings.
2. **Organization Editor:** Can create and edit listings, but cannot view billing or invite users.
3. **Organization Viewer:** Can only view the dashboard metrics.

Your policy engine must evaluate: "Does this User belong to the Organization that owns this Listing, and does their Organization Role permit this action?"

---

## The Two-Layer Security Rule

Every protected action in your production marketplace needs **two separate checks**, executed in strict order:

1. **Identity Check (Authentication Middleware):** Is there a valid, unexpired, signed JWT? Does it match a real user in the database?
2. **Relationship Check (Authorization Middleware):** Does the User from Step 1 have the specific Ability (defined by your Policy Engine) to mutate the specific Resource requested in the URL payload?

> [!CAUTION]
> Never trust an `owner_id` or `seller_id` sent in the request body (e.g., `POST /api/listings { title: "Laptop", seller_id: 99 }`). A malicious user can pass someone else's ID. Always extract the actor's ID from the securely verified JWT on the server side.

---

## Do's and Don'ts of Production Authorization

- **DO fail closed by default.** If your authorization middleware crashes, or a rule is undefined, it must return `403 Forbidden`. Never default to `200 OK`.
- **DON'T perform authorization checks after mutating data.** `await db.listing.update(); if (user.id !== listing.sellerId) throw Error();` is a catastrophic failure. The update already occurred. AuthZ must precede Execution.
- **DO verify authorization on `DELETE` routes.** Developers frequently remember to protect `POST` and `PATCH`, but forget `DELETE`.
- **DON'T rely on obscure IDs as security.** Using UUIDs (e.g., `listing_1234abcd`) makes IDOR harder to guess than sequential integers (`listing_5`), but it is not a replacement for actual authorization checks. Security by obscurity always fails.

---

## AI Prompts You Can Use

````prompt
Act as a Principal Security Engineer. I am using Node.js and CASL (or a similar policy engine) for a B2B marketplace. Write a central `defineAbilities` factory function. It must define rules for an `OrganizationAdmin` (can manage all listings in their org), an `OrganizationEditor` (can update but not delete listings), and a `SuperAdmin` (can manage everything). Then, write an Express/Next.js middleware that takes an action and a resource, and strictly enforces these CASL abilities before the route executes.
````

````prompt
Write a comprehensive test suite (using Jest/Vitest) for my Authorization Policy Engine. Mock a user with a `Buyer` role, a user with a `Seller` role, and an `Admin`. Assert that the Buyer gets a 403 when attempting to update a listing, the Seller gets a 200 ONLY when updating their own listing (and 403 on others), and the Admin gets a 200 for all listings.
````

---

## Validating What AI Generates

- **Check for Trusting the Client:** If the AI writes code that determines authorization based on a hidden field in the frontend form or a `user_id` passed in the JSON body, reject it immediately. Identity must come from the server-validated session.
- **Verify Granularity:** Ensure the AI generated rules specifically check the relationship (ABAC), e.g., comparing the `listing.organization_id` to the `user.organization_id`, not just checking if the user is generically marked as an "Editor".

---

## Implementation Checklist

- [ ] Evaluated and integrated a Policy Engine (e.g., CASL, Cerbos) to centralize authorization rules.
- [ ] Implemented strict ABAC (Attribute-Based Access Control) for all user-owned resources (Listings, Messages, Orders).
- [ ] (If B2B) Architected the Organization table and hierarchical Organization Roles (Admin, Editor, Viewer).
- [ ] Audited every `PUT`, `PATCH`, and `DELETE` endpoint to ensure the AuthZ middleware is applied *before* any database execution.
- [ ] Wrote dedicated unit tests for the Policy Engine to mathematically prove the rules behave as expected.

---

## What's Next

Next: **Listings** — With our authorization perimeter secured, we will implement the core asset of the marketplace: the Listings API. We will handle high-performance reads, secure writes, and the complex state machine of listing visibility.
