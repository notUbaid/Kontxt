---
title: Customer Accounts
slug: customer-accounts
phase: Phase 2
mode: personal
projectType: e-commerce
estimatedTime: 20–30 min
---

# Customer Accounts

Customer accounts are optional infrastructure that unlocks order history, saved addresses, wishlists, and re-ordering. Done well, they improve retention. Done poorly, they add friction and become a security liability.

The key decision: **build accounts around your customers, not around your convenience.**

---

## The Core Question: What Do Accounts Actually Unlock?

Before designing anything, list what authenticated customers can do that guests cannot.

For a personal e-commerce store, the realistic list is:

| Feature | Guest | Account Holder |
|---|---|---|
| Browse and purchase |  |  |
| Order confirmation email |  |  |
| View order history | — |  |
| Track current orders | — |  |
| Save shipping addresses | — |  |
| Wishlist | — |  |
| Faster re-checkout | — |  |
| Return / refund requests | Email only | Self-serve |

If your store has fewer than 3 meaningful account features, don't build accounts yet. Add them when customers actually ask for them.

---

## Authentication Strategy

Do not build authentication from scratch. The attack surface is too large and the maintenance burden is permanent.

**Recommended options for personal projects:**

| Option | Best For | Tradeoff |
|---|---|---|
| **NextAuth.js / Auth.js** | Next.js projects, full control | Self-hosted, more config |
| **Clerk** | Fastest setup, best UX | Paid after free tier, vendor lock-in |
| **Supabase Auth** | Already using Supabase | Tied to Supabase ecosystem |
| **Firebase Auth** | Already using Firebase | Tied to Firebase ecosystem |

**Do not roll your own password hashing, session management, or token handling.** These are solved problems with serious consequences when done wrong.

Whatever you choose, it must support:
- Email + password login
- Email verification
- Password reset via email
- Session expiry and refresh
- Secure httpOnly session cookies

---

## Account Data Model

Keep the account model lean. Only store what you actively use.

```
User
├── id (uuid)
├── email (unique, indexed)
├── emailVerified (boolean)
├── name
├── passwordHash (if managing auth yourself — otherwise omit)
├── role (customer | admin)
├── createdAt
└── updatedAt

Address
├── id (uuid)
├── userId (foreign key)
├── label (e.g. "Home", "Office" — optional)
├── fullName
├── phone
├── line1
├── line2 (nullable)
├── city
├── state
├── postalCode
├── country (ISO 3166-1 alpha-2)
├── isDefault (boolean)
└── createdAt

Order (already designed — add userId foreign key)
├── userId (nullable — null for guest orders)
├── guestEmail (nullable — set for guest orders)
```

### Linking guest orders to accounts

When a guest creates an account after purchasing, link their historical orders by email:

```js
// On account creation
await db.orders.updateMany({
  where: { guestEmail: newUser.email, userId: null },
  data: { userId: newUser.id }
})
```

This gives new account holders immediate access to their order history without any manual support ticket.

---

## Session Architecture

Sessions are how your server knows who is making a request.

**Use httpOnly cookies for session tokens.** Never store session tokens in localStorage — they are readable by any JavaScript on the page, including injected scripts.

```
User logs in
    ↓
Server verifies credentials
    ↓
Server creates session (JWT or opaque token)
    ↓
Server sets httpOnly, Secure, SameSite=Strict cookie
    ↓
Every subsequent request automatically sends the cookie
    ↓
Server reads cookie, verifies session, identifies user
```

**Session expiry:** Set a reasonable expiry — 30 days with sliding renewal is standard for e-commerce. Financial apps use shorter windows. Match the sensitivity to the context.

**Admin sessions:** If you have an admin role, give admin sessions a shorter expiry and consider requiring re-authentication for destructive actions.

---

## What the Account Dashboard Shows

Design the account area around tasks, not data dumps.

**Recommended account pages:**

```
/account
    ├── /orders              → order history, status, tracking
    ├── /orders/:id          → order detail, items, invoice
    ├── /addresses           → saved addresses, add/edit/delete
    ├── /profile             → name, email, password change
    └── /wishlist            → saved items (if implemented)
```

### Order history page

Show the minimum needed to recognise an order:

- Order number
- Date placed
- Status (paid, shipped, delivered, cancelled)
- Total
- Thumbnail of first item
- Link to order detail

Do not show 15 columns of data. Customers want to find their order and check its status.

### Order detail page

Show everything relevant to that order:

- All items with images, names, quantities, prices
- Shipping address used
- Payment method summary (last 4 digits, card brand)
- Order timeline (placed → paid → shipped → delivered)
- Tracking number / link if available
- Return / refund request option

---

## Password Security

If you manage passwords yourself (not using a third-party auth provider):

- Hash with **bcrypt** (cost factor 12) or **Argon2id**
- Never store plaintext passwords
- Never store reversible encrypted passwords
- Never log passwords, even accidentally
- Rate limit login attempts (5 attempts, then 15-minute lockout)
- Require email verification before allowing login
- Password reset links must expire (15–60 minutes is standard)
- Password reset links must be single-use

If you are using Clerk, NextAuth, Supabase Auth, or Firebase Auth — they handle all of this. Trust the library. Do not add your own password layer on top.

---

## Email Verification

Unverified email addresses are a spam and fraud vector. Require verification before:

- Allowing checkout (prevents fake account creation)
- Showing order history (prevents account enumeration)
- Sending marketing emails

```
User registers
    ↓
Account created with emailVerified: false
    ↓
Verification email sent with signed token (expires in 24h)
    ↓
User clicks link → token verified → emailVerified: true
    ↓
User can now access account features
```

If a user tries to log in with an unverified email, show a clear message with a "Resend verification email" option. Do not silently block them.

---

## Security Considerations

**Account enumeration:** When a user enters an email for password reset, always respond with "If this email exists, you'll receive a reset link" — even if the email is not in your database. Responding differently for found vs. not-found emails lets attackers discover which emails are registered.

**IDOR on account data:** Every account API route must verify the requesting user owns the resource:

```js
// Vulnerable
GET /api/addresses/42  → returns address 42 regardless of who asks

// Secure
GET /api/addresses/42  → verifies address 42.userId === session.userId
```

**Admin role protection:** Any route or page that requires admin must verify `user.role === 'admin'` server-side. Never gate admin features only on the frontend — frontend checks are trivially bypassed.

---

## AI Prompt: Account Architecture Review

```
You are a senior backend engineer reviewing a customer account system for a personal e-commerce project.

Here is my design:

AUTH PROVIDER: [Clerk / NextAuth / Supabase Auth / custom]

DATA MODEL:
[paste your User and Address schema]

SESSION STRATEGY:
[describe how sessions are stored and how expiry works]

GUEST ORDER LINKING:
[describe how guest orders connect to new accounts]

ACCOUNT PAGES:
[list your planned account routes and what each shows]

Review for:
1. Security vulnerabilities (account enumeration, IDOR, session handling)
2. Missing features customers will definitely ask for
3. Over-engineering for a personal project
4. Auth provider misuse or unnecessary custom implementation
5. Schema problems

Be specific. Flag critical issues first.
```

---

## Validation Checklist

- [ ] Auth provider chosen — not rolling custom auth
- [ ] Sessions stored in httpOnly, Secure, SameSite cookies
- [ ] Email verification required before account features are accessible
- [ ] Password reset links expire and are single-use (if managing auth yourself)
- [ ] Login attempts rate limited (if managing auth yourself)
- [ ] Guest orders linked to account on registration by email
- [ ] All account API routes verify ownership before returning data
- [ ] Admin role verified server-side on every admin route
- [ ] Account enumeration prevented on password reset endpoint
- [ ] Account dashboard focused on order history and address management

---

## What to Build Next

**Shipping Architecture** — shipping costs, zones, and carrier integration need to be designed before development. Your checkout depends on knowing how shipping options are calculated and presented at the right moment.

---

> **Filename:** `customer-accounts-personal-e-commerce.md`
