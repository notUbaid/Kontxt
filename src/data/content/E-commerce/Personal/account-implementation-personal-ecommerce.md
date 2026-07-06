---
title: Account Implementation
slug: account-implementation
phase: Phase 3
mode: personal
projectType: ecommerce
estimatedTime: 25-35 min
---

# Account Implementation

In Phase 2 you decided *how* customer accounts should work in your store — optional vs required, what data they hold, how they relate to orders. This module is where that decision becomes working code.

If you skipped or don't remember your Phase 2 Customer Accounts decisions, that's fine — the defaults below are the right call for a personal store either way.

---

## Where This Fits

Accounts touch almost everything else you've built so far:

- **Cart** needs to know if a session belongs to a logged-in user or a guest
- **Checkout** needs to optionally pre-fill saved addresses
- **Orders** need to be linked to a customer so order history works
- **Admin Dashboard** (later) needs to distinguish real customers from guests

Build accounts *after* cart and checkout are working, but *before* order history and wishlist — which is exactly where this sits in your sequence.

---

## What You're Building Today

- Sign up / log in / log out
- A session that persists across page loads
- A protected `/account` area guests can't access
- Profile basics (name, email, password change)
- A saved address book (reused at checkout)
- Order history pulled from the `orders` table
- Account deletion (even solo projects should have this — it's good practice and takes 20 minutes)

You are **not** building: social login, 2FA, magic links, or role-based admin permissions. Those are real features, but they're scope creep for a personal store. Skip them unless you have a specific reason not to.

---

## Choosing Your Auth Approach

This is the one real decision in this module. Don't build auth from scratch — rolling your own password hashing, session tokens, and reset-flow security is a well-known source of beginner vulnerabilities, and it teaches you very little that a managed provider doesn't teach you faster.

| Approach | Setup Time | Security Risk | Cost | Best For |
|---|---|---|---|---|
| Build it yourself (bcrypt + sessions) | High | High — easy to get subtly wrong | Free | Learning auth internals specifically |
| **Supabase Auth** | Low | Low — managed, audited | Free tier generous | Most personal stores (recommended) |
| Clerk | Low | Low — managed | Free tier limited | Apps wanting prebuilt UI components |

> ** Best Practice:** If your store's database is already on Supabase (common for personal e-commerce builds), use **Supabase Auth**. It shares the same Postgres instance, so linking `auth.users` to your `customers`/`orders` tables is a foreign key, not an integration project.

If you're on a different stack, the same logic applies — use whatever managed auth your database provider already gives you before reaching for a third-party service.

> **️ Warning:** Do not store passwords, even hashed ones, in your own `users` table if you're using a managed provider. That's the provider's job. Your job is storing *profile* data (name, addresses, preferences) linked by `user_id`.

---

## Data You Need to Store

Your auth provider handles credentials. You still need your own tables for store-specific data:

```sql
-- Extends the auth provider's user record — never duplicates it
create table profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  created_at timestamptz default now()
);

create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  label text, -- "Home", "Work"
  line1 text not null,
  line2 text,
  city text not null,
  state text,
  postal_code text not null,
  country text not null,
  is_default boolean default false
);
```

`orders` should already have a `user_id` column (nullable, to support guest checkout) from your Phase 3 Orders module. If it doesn't, add it now:

```sql
alter table orders add column user_id uuid references auth.users(id);
```

---

## The Account Experience

```
Guest browsing
   │
   ├─ Checks out as guest → order saved with user_id = null
   │
   └─ Signs up / logs in
         │
         ▼
   Protected /account area
         │
   ┌─────┼─────────┬──────────────┐
   ▼     ▼         ▼              ▼
Profile  Addresses  Order History  Delete Account
```

Keep guest checkout available even after accounts exist. Forcing account creation before purchase is one of the most well-documented causes of cart abandonment in e-commerce — there's no reason to import that mistake into a personal project.

---

## Implementation Steps

### Step 1 — Auth Provider Setup & Protected Routes

This is the highest-leverage prompt in this module. Get this right and everything downstream (dashboard, addresses, order history) just queries an already-authenticated user.

**Copy Prompt:**

```
I'm building a personal e-commerce store with [Next.js App Router / your framework]
and Supabase Auth. I need:

1. Email/password sign up and login forms with client-side validation
2. A server-side check that protects all routes under /account — unauthenticated
   users should be redirected to /login, not just hidden via CSS or client checks
3. A logout action that clears the session properly
4. Password reset flow using Supabase's built-in reset email

Show me the middleware/route protection first, since that's the part most
beginners get wrong by only checking auth status in the browser.

Stack: [your exact framework + version]
```

> **️ Common Mistake:** Hiding the `/account` link in the navbar for guests is not the same as protecting the route. If a guest can type `/account/orders` into the URL bar and see data, your "protection" is cosmetic. Always verify the session server-side, on every protected request.

### Step 2 — Account Dashboard with Order History

Once auth and protected routes exist, build the dashboard as one cohesive prompt rather than three separate ones — it shares context (the authenticated user object) that's wasteful to re-explain three times.

**Copy Prompt:**

```
Build an /account dashboard with three sections, all reading from the
authenticated user's session (no client-side user_id passing):

1. Profile — display name and email, with a form to update name and
   trigger a password change email
2. Addresses — list saved addresses from the `addresses` table, with
   add/edit/delete, and a way to mark one as default
3. Order History — list orders from the `orders` table filtered by
   user_id, showing date, status, total, and a link to order detail

Use [your UI library]. Keep each section as a separate component.
Order history should paginate after 10 orders.
```

### Step 3 — Account Deletion

Skip the temptation to skip this. It's a small addition now and a painful retrofit later if you ever onboard real users.

> ** Tip:** Don't hard-delete a customer's row if they have order history — you'll break your own sales records and any future analytics. Soft-delete (`deleted_at` timestamp) or anonymize (`full_name = 'Deleted User'`) instead, and let the auth provider's account remove the login credentials.

---

## Security Checklist

- [ ] All `/account/*` routes verified server-side, not just hidden in the UI
- [ ] Passwords never touch your own database — handled entirely by the auth provider
- [ ] Address and order queries always filter by the *session's* user ID, never a user ID passed from the client (URL, form field, etc.)
- [ ] Password reset emails use the provider's built-in expiring tokens — never roll your own
- [ ] Login error messages don't reveal whether an email exists ("Invalid email or password," not "No account found")
- [ ] Account deletion soft-deletes or anonymizes rather than breaking order history

> **️ Warning:** The most common real vulnerability in beginner-built account systems is an **insecure direct object reference** — fetching `/api/orders/:id` and returning the order without checking it belongs to the requesting user. Always add the `user_id` filter, even when it feels redundant.

---

## Common AI Mistakes to Watch For

When AI generates account/auth code, it tends to:

- Default to client-side-only route protection unless explicitly told to check server-side
- Forget to filter by `user_id` on list endpoints (orders, addresses), returning all rows instead of the current user's
- Suggest storing a copy of the password hash in your own table "for convenience" — never do this with a managed auth provider
- Skip token expiry on password reset links if not explicitly asked for it
- Use `confirm()` dialogs for account deletion instead of a proper confirmation step with re-typed email — fine for personal projects, but flag it as a shortcut, not a standard

None of these are reasons to avoid AI for this work. They're reasons to read the auth-related code it gives you more carefully than you'd read a button component.

---

## Validation Checklist

Before moving to Shipping, confirm:

- [ ] A guest can still complete checkout without an account
- [ ] A logged-in user can view, but not edit, another user's data (test by guessing a different order URL)
- [ ] Logging out actually invalidates the session — back button shouldn't restore access
- [ ] Order history correctly shows orders placed both before and after the account was created (if `user_id` was added to an existing order via email match — optional but nice)
- [ ] Deleting an account doesn't throw foreign-key errors on existing orders

---

## AI Review Prompt

Once implementation is done, paste this into a fresh AI conversation along with your auth and dashboard code — not the whole codebase, just these files:

```
Review this account implementation for an e-commerce store. Specifically check:

1. Is every protected route verified server-side?
2. Are there any queries that trust a user_id from the client instead of
   the authenticated session?
3. Is there any place a password, token, or session secret could leak
   into logs, error messages, or client-side state?
4. Does account deletion handle existing order references safely?

Flag anything that would fail a basic security review, even if it works
correctly in normal use.
```

A fresh conversation matters here — the AI that wrote the code is biased toward defending its own decisions. A clean context reviews more critically.

---

## What Comes Next

With accounts working, your store can recognize repeat customers and give them a faster checkout. Next: **Shipping** — calculating rates, defining zones, and deciding what "shipped" actually means for a one-person operation.
