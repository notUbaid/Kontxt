---
title: Documentation
slug: documentation
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 15-20 min
---

# Documentation

In three months, you will not remember why your discount logic has a weird edge case for orders under $5, or why the inventory webhook has a 2-second delay built in. This module is about writing down the things future-you and AI tools will actually need — not producing a comprehensive manual nobody will read.

---

## Who Is This Documentation Actually For?

Be honest about your audience. For a personal project, it's:

1. **Future you**, returning after weeks away from the codebase
2. **AI coding tools**, that work dramatically better with good context (this is the whole premise behind Kontxt)
3. **Possibly one collaborator**, if someone else ever touches this project

It is **not** for the public, not for a team of ten engineers, and not for compliance auditors. Write accordingly — skip the formality, keep the substance.

> **Reframe:** Good documentation here isn't about thoroughness. It's about reducing the time it takes you (or an AI tool) to safely make a change six weeks from now.

---

## What Actually Needs Documenting

<table>
<tr><th>Document</th><th>Needed?</th><th>Why</th></tr>
<tr><td>README (setup + run instructions)</td><td><strong>Yes — essential</strong></td><td>You will forget your own setup steps</td></tr>
<tr><td>Environment variables reference</td><td><strong>Yes — essential</strong></td><td>Missing env vars are the #1 "why won't this run" problem</td></tr>
<tr><td>Architecture overview</td><td><strong>Yes — important</strong></td><td>Gives AI tools and future-you the mental model fast</td></tr>
<tr><td>Non-obvious business logic (discounts, tax rules, inventory rules)</td><td><strong>Yes — important</strong></td><td>This logic looks arbitrary without context</td></tr>
<tr><td>API endpoint reference</td><td>Light version</td><td>Useful but don't hand-maintain exhaustively</td></tr>
<tr><td>Full API spec (OpenAPI/Swagger)</td><td>No, not yet</td><td>Overhead not justified for a solo project</td></tr>
<tr><td>Contribution guidelines</td><td>No</td><td>You're not expecting outside contributors</td></tr>
<tr><td>Changelog</td><td>Optional, lightweight</td><td>Nice for tracking what shipped when</td></tr>
</table>

---

## The README: Your Most Important File

This is the file that gets read first — by you, by AI tools, by anyone who clones the repo. It should answer five questions in under two minutes of reading.

**Required README sections:**

1. **What this is** — one or two sentences, plain language
2. **Tech stack** — list it, don't make someone infer it from `package.json`
3. **Setup instructions** — exact commands, in order, that take someone from clone to running locally
4. **Environment variables** — what's needed, where to get each value (link to the provider's dashboard)
5. **Project structure** — a short tree of key folders and what lives in each

```markdown
# [Store Name]

A personal e-commerce store for [what you sell], built to learn full-stack 
development with a real payment flow.

## Stack
- Next.js 14 (App Router)
- Supabase (Postgres + Auth)
- Stripe (Payments)
- Resend (Transactional email)
- Tailwind CSS

## Setup

1. Clone and install
   \`\`\`
   git clone [repo-url]
   cd [project-name]
   npm install
   \`\`\`

2. Copy environment variables
   \`\`\`
   cp .env.example .env.local
   \`\`\`
   See [Environment Variables](#environment-variables) below for where to get each value.

3. Run database migrations
   \`\`\`
   npx supabase db push
   \`\`\`

4. Start the dev server
   \`\`\`
   npm run dev
   \`\`\`

## Environment Variables

| Variable | Where to get it |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project settings → API |
| SUPABASE_SERVICE_ROLE_KEY | Supabase project settings → API |
| STRIPE_SECRET_KEY | Stripe dashboard → Developers → API keys |
| STRIPE_WEBHOOK_SECRET | Stripe dashboard → Developers → Webhooks |
| RESEND_API_KEY | Resend dashboard → API Keys |

## Project Structure
\`\`\`
/app          → Next.js routes and pages
/components   → React components
/lib          → Business logic (cart, pricing, inventory)
/lib/stripe   → Payment + webhook handling
\`\`\`
```

> **Best Practice:** Never put real values in `.env.example` — only variable names and a comment on where to get them. Commit `.env.example`, never commit `.env.local`.

---

## Documenting Non-Obvious Business Logic

This is the highest-value documentation you'll write, and the easiest to skip. Any rule that isn't immediately obvious from reading the code deserves a comment explaining the *why*, not the *what*.

**Good candidates for inline documentation:**
- Discount/coupon edge cases ("why can't this go below $0")
- Tax calculation assumptions (which regions, which rates, why)
- Inventory reservation logic (does stock get held during checkout, or only on payment success?)
- Webhook idempotency handling (why you check for an existing order before creating one)
- Any "magic number" (why is the cart abandonment threshold 24 hours and not 12?)

```javascript
// Stock is decremented only after Stripe confirms payment (not at "add to cart"
// or "checkout started"). This avoids holding inventory hostage from users who 
// abandon checkout, at the cost of occasional overselling on high-demand items.
// If overselling becomes a real problem, revisit with a temporary stock reservation.
function decrementStockOnPaymentSuccess(order) { ... }
```

> **Why this matters for AI specifically:** When you later ask an AI tool to "add a flash sale feature," it will read this comment and understand your stock model immediately — instead of guessing, and possibly suggesting something that conflicts with how your system actually works. This is context engineering, not just documentation.

---

## Architecture Overview (One Page, Not a Wiki)

A single markdown file, `ARCHITECTURE.md`, that explains how the major pieces fit together. Keep it to roughly one page.

**What to include:**
- A simple diagram or list of major components (frontend, backend, database, third-party services)
- How a purchase flows through the system, end to end
- Where state lives (what's in the database vs. session vs. client state)
- Key architectural decisions and why you made them (e.g., "Postgres full-text search instead of Algolia — see Search module reasoning")

```markdown
# Architecture Overview

## Purchase Flow
1. Customer browses products (Next.js pages, data from Supabase)
2. Add to cart → stored in client-side state (Zustand), not persisted to DB until checkout
3. Checkout → Stripe Checkout Session created server-side
4. Stripe webhook confirms payment → order created, stock decremented, emails sent
5. Customer redirected to confirmation page (display only — not the source of truth)

## Key Decisions
- **Cart is client-side only until checkout.** Reduces DB writes for casual browsers.
  Tradeoff: cart doesn't persist across devices. Acceptable for a personal store.
- **Stock decrements on payment confirmation, not at cart/checkout start.**
  See inline comment in lib/orders/createOrder.ts for reasoning.
- **Search uses Postgres full-text + pg_trgm fallback**, not a dedicated search 
  service. Revisit if catalog exceeds ~1,000 products.
```

> **Tip:** Update this file when you make a significant architectural change — not on a schedule, just when something here would otherwise go stale and mislead future-you.

---

## API Reference: Keep It Light

You don't need full OpenAPI specs for a personal project's internal API. A simple markdown table per route group is enough.

```markdown
## Orders API

| Method | Route | Purpose | Auth required |
|---|---|---|---|
| POST | /api/orders | Create order from cart (internal — called post-payment) | Yes (system) |
| GET | /api/orders/:id | Fetch order details | Yes (owner or admin) |
| PATCH | /api/orders/:id/status | Update order status (admin only) | Yes (admin) |
```

If your API stays internal (only your own frontend calls it), this level of detail is sufficient. Only invest in full OpenAPI documentation if you plan to expose this API to external developers — which, for a personal store, you likely won't.

---

## AI Prompt: Generate Documentation From Your Codebase

```
I need documentation generated for my personal e-commerce project.

Generate:
1. A README.md following this structure: what it is, tech stack, setup instructions, 
   environment variables table, project structure
2. An ARCHITECTURE.md covering: the purchase flow end-to-end, where state lives, 
   and key architectural decisions with brief reasoning

Here's my project structure and key files:
[paste folder structure, package.json, and any core business logic files — 
cart, checkout, webhook handler]

Keep it concise — this is for a solo developer and AI tools to reference later, 
not a public-facing manual. Don't pad sections with generic advice; only include 
what's specific to this actual codebase.
```

> **Token efficiency tip:** Paste your real `package.json` and folder structure rather than describing your stack from memory — AI will produce a setup guide that actually matches your project instead of a generic Next.js template guide.

---

## Validating AI-Generated Documentation

Documentation has a unique failure mode: it can be confidently wrong and you won't notice until you follow it and it breaks.

- [ ] Do the setup commands actually match your `package.json` scripts? (AI sometimes assumes `npm run build` when your project uses a different script name.)
- [ ] Are all environment variables your code actually reads included — none missing, none invented?
- [ ] Does the architecture description match what your code actually does, or what's "typical" for this kind of app? (AI can generate plausible-sounding architecture docs that don't reflect your actual implementation.)
- [ ] Try following the README setup steps on a fresh clone (or mentally walk through them) — do they actually work in order?

> **Common AI mistake:** AI often generates a generic "Contributing" or "License" section out of habit, even when you didn't ask for one and it doesn't apply to a personal closed project. Remove sections that don't serve your actual use case.

---

## Keeping Documentation From Going Stale

The realistic plan for a solo project isn't "update docs with every commit." It's:

- Update the README whenever setup steps change (new env var, new dependency)
- Update `ARCHITECTURE.md` whenever you make a decision you'd want to remember the reasoning for
- Leave inline comments on business logic *as you write it*, not as a cleanup pass later (you won't do the cleanup pass)

> **Tip:** If you're about to start a new AI coding session and find yourself re-explaining your stock model or pricing rules in the prompt every time, that's a signal the explanation belongs in a comment or `ARCHITECTURE.md` instead — write it once, reference it forever.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Full OpenAPI/Swagger specifications
- Auto-generated API docs tooling
- Contribution guidelines, code of conduct
- A documentation site (Docusaurus, GitBook) — markdown files in the repo are enough
- Exhaustive JSDoc/TSDoc comments on every function

---

## Implementation Checklist

- [ ] README.md written: what it is, stack, setup steps, env vars table, project structure
- [ ] `.env.example` created with variable names only, no real values
- [ ] ARCHITECTURE.md written: purchase flow, state locations, key decisions
- [ ] Non-obvious business logic (discounts, tax, inventory timing, idempotency) has inline comments explaining *why*
- [ ] Light API reference table for internal routes (optional but recommended)
- [ ] README setup steps verified to actually work from a fresh clone
- [ ] Generic/unused sections (Contributing, License boilerplate) removed if not applicable

---

## What's Next

With your core engineering work documented, it's time to start building the actual customer-facing catalog — that's **Products**, next in this phase.
