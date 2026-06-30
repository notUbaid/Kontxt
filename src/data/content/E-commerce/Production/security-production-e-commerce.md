---
title: Security
slug: security
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 25-30 min
---

# Security

You've built a store that handles real payments and real customer data. This module isn't about adding new features — it's about auditing what you've already built, because security in e-commerce isn't a separate phase you bolt on at the end. It's mostly already been handled, decision by decision, throughout Phase 3. This module makes that implicit work explicit and closes the remaining gaps.

---

## The Good News: You've Already Done Most of This

Look back at what you built:

- Server-side pricing in Checkout (no client-trusted prices)
- Webhook signature verification
- Atomic stock decrements preventing race-condition exploits
- Row-Level Security on customer data
- Admin routes protected server-side

This module isn't starting from zero. It's a structured pass to confirm those decisions actually hold, plus the handful of security concerns that don't fit neatly into any single feature module.

> **Reframe:** Security review isn't "what's missing" — it's "what would a motivated, slightly knowledgeable attacker try first, and does my app actually stop them?" Walk through this module with that mindset.

---

## Security Audit: Revisit Each Module

Use this as a checklist against work you've already done, not a list of new things to build.

<table>
<tr><th>Area</th><th>Check</th><th>From module</th></tr>
<tr><td>Checkout pricing</td><td>Are line item prices ALWAYS looked up server-side, never trusted from client requests?</td><td>Checkout</td></tr>
<tr><td>Webhooks</td><td>Is the Stripe signature verified on every webhook request, with no bypass path?</td><td>Checkout</td></tr>
<tr><td>Inventory</td><td>Does stock decrement use atomic conditional updates, not read-then-write?</td><td>Inventory</td></tr>
<tr><td>Customer data</td><td>Is Row-Level Security actually enabled (not just defined) on orders and customers tables?</td><td>Customer Accounts</td></tr>
<tr><td>Admin routes</td><td>Is admin access checked server-side (middleware), not just hidden in the UI?</td><td>Admin Dashboard</td></tr>
<tr><td>Search</td><td>Are search queries parameterized, not concatenated into raw SQL?</td><td>Search</td></tr>
</table>

> **Tip:** Go through each row and actually re-test it, don't just trust your memory of having built it correctly. Code changes over time, and a refactor three weeks ago may have quietly broken something that was originally correct.

---

## New Ground: Environment Variables & Secrets

This is the most common way personal projects leak credentials — not through a sophisticated attack, but through an accidental commit.

```bash
# .gitignore — confirm these are actually present
.env
.env.local
.env*.local
```

**Run this check right now:**

```bash
git log --all --full-history -- .env .env.local
```

If this returns any commits, your secrets are in your git history — even if you've since deleted the file, they're still recoverable from history unless you specifically purge them.

> **Critical concept — if a secret was ever committed, rotating your `.gitignore` doesn't fix it.** Git history retains every previous version of a file. If a Stripe secret key, Supabase service role key, or any API key was ever committed, the only real fix is rotating that credential (generating a new one and invalidating the old one) — not just removing the file going forward. Treat any historically-committed secret as compromised.

**Secrets checklist:**
- [ ] `STRIPE_SECRET_KEY` — never in client code, never committed
- [ ] `STRIPE_WEBHOOK_SECRET` — server-only
- [ ] `SUPABASE_SERVICE_ROLE_KEY` — server-only, never sent to the browser (this key bypasses RLS entirely)
- [ ] `RESEND_API_KEY` — server-only
- [ ] Only `NEXT_PUBLIC_*` prefixed variables (or your framework's equivalent) should ever reach the client

> **Why `SUPABASE_SERVICE_ROLE_KEY` deserves special attention:** This key bypasses Row-Level Security entirely — it's meant for trusted server-side operations only. If it ever ends up in client-side code or a public bundle, every RLS policy you carefully set up in the Customer Accounts module becomes irrelevant; anyone with this key can read or write any row in any table. Triple-check this one specifically.

---

## Input Validation: Trust Nothing From the Client

Beyond pricing (already covered in Checkout), validate every piece of user input that reaches your database or business logic.

```javascript
// Example: validating a checkout request server-side
import { z } from 'zod';

const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    variantId: z.string().uuid().optional(),
    quantity: z.number().int().positive().max(50), // sane upper bound
  })).min(1).max(20), // reasonable cart size limits
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = checkoutSchema.safeParse(body);
  
  if (!result.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  // proceed with result.data, which is now type-safe and validated
}
```

> **Why bound quantity and cart size:** Without limits, nothing stops a malicious or malformed request from submitting a quantity of 999999999, which could cause integer overflow issues downstream, generate a nonsensical Stripe charge, or be used to probe your stock-check logic. Reasonable upper bounds cost nothing and close off an entire category of weird edge cases.

---

## Rate Limiting: Protect Endpoints That Cost You Money or Resources

Not every endpoint needs rate limiting, but a few specifically do — because abuse there has real cost (API usage, email sending limits, Stripe API calls).

| Endpoint | Why it needs rate limiting |
|---|---|
| `/api/checkout` | Prevents rapid repeated Checkout Session creation (API abuse) |
| Auth endpoints (login/signup) | Prevents brute-force or account enumeration attempts |
| `/api/search` | Prevents query spam against your database |
| Any endpoint sending email | Prevents abuse that could exhaust your Resend quota or get your domain flagged as spam |

```javascript
// Simple in-memory rate limiting for a personal project — use a library 
// like @upstash/ratelimit for production-grade durable rate limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  // proceed
}
```

> **Tip:** Upstash's free tier comfortably covers a personal project's rate limiting needs, and it's durable across serverless function instances (an in-memory counter in a serverless function resets on every cold start, which makes it nearly useless for real rate limiting on platforms like Vercel).

---

## XSS Prevention: Be Careful With User-Generated Content

If you allow any free-text input that gets displayed back (product reviews if you add them later, customer names, order notes), never render it as raw HTML.

```javascript
// DANGEROUS — never do this with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SAFE — React escapes this automatically
<div>{userInput}</div>
```

> **Why this matters even for a "trusted" personal store:** Your customer names and any free-text fields they submit (shipping instructions, gift messages) are user input, even though your customers aren't trying to attack you. A bug here isn't about distrust of your customers — it's about a script tag accidentally being interpreted as code because of how the data is rendered, regardless of intent.

---

## HTTPS & Security Headers

If you're deploying to Vercel (your stack's likely default), HTTPS is handled automatically. Add a few headers your framework may not set by default.

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

| Header | What it prevents |
|---|---|
| `X-Frame-Options: DENY` | Your site being embedded in an iframe on another site (clickjacking) |
| `X-Content-Type-Options: nosniff` | Browsers guessing/misinterpreting file types in ways that enable attacks |
| `Referrer-Policy` | Leaking full URLs (which may contain sensitive query params) to external sites via the Referer header |

---

## AI Prompt: Run a Security Pass

```
I'm doing a security review of a personal e-commerce store before launch, 
built with Next.js, Supabase, and Stripe.

Review this code for the following specific issues:
1. Any place client-submitted data (price, quantity, IDs) is trusted 
   without server-side validation or lookup
2. Any database query built via string concatenation instead of 
   parameterized queries
3. Any place a service-role or secret key might be exposed to client code
4. Missing input validation (no bounds checking on quantities, no schema 
   validation on request bodies)
5. Any user input rendered without escaping (dangerouslySetInnerHTML or 
   equivalent)

Here is my checkout endpoint, webhook handler, and search endpoint:
[paste the actual code]

For each issue found, explain the specific exploit scenario, not just 
that it's "a best practice violation."
```

> **Token efficiency tip:** Asking for the specific exploit scenario per issue, rather than a generic best-practices list, forces a more useful response — you'll understand *why* each fix matters, which helps you recognize the same pattern in future code you write without AI's help.

---

## Validating AI Security Recommendations

Security advice from AI deserves the same scrutiny as any other AI output — possibly more, since overconfidence here is costly.

- [ ] Does each flagged issue include a concrete exploit scenario, or just a generic "this could be a vulnerability" statement?
- [ ] Are the suggested fixes things you can verify yourself (e.g., "use parameterized queries" — check that the fix actually does this) rather than vague reassurances?
- [ ] Did AI flag anything that's actually a non-issue at your scale (e.g., recommending a full WAF or enterprise-grade DDoS protection for a personal store)? Push back on overkill recommendations.

> **Common AI mistake:** Security-focused AI responses sometimes lean toward over-recommending enterprise-grade solutions (Web Application Firewalls, dedicated security monitoring services, SOC2-style logging) that are real best practices at scale but genuine overkill for a personal store. Calibrate recommendations against your actual risk profile — a one-person store handling modest transaction volume has a different threat model than a Series B startup.

---

## What "Secure Enough" Looks Like for a Personal Store

You are not defending against nation-state attackers. A realistic, appropriate bar:

- No secrets in git history or client bundles
- Server-side validation on every endpoint that writes data or triggers a charge
- RLS enabled and verified on customer data
- Rate limiting on checkout, auth, and email-sending endpoints
- HTTPS (automatic via your host) + basic security headers
- Stripe and Supabase Auth handling the genuinely hard security problems (PCI compliance, password hashing) instead of you reimplementing them

Hit this bar, and you're meaningfully more secure than most live e-commerce side projects.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Web Application Firewall (WAF) services
- Dedicated security monitoring/SIEM tooling
- Penetration testing services
- SOC2/PCI-DSS compliance processes (Stripe Checkout already keeps you out of PCI scope for card data)
- Bug bounty programs

---

## Implementation Checklist

- [ ] Confirmed no secrets exist in git history (`git log --all --full-history -- .env*`)
- [ ] Any historically-committed secret has been rotated, not just removed going forward
- [ ] `.gitignore` correctly excludes all env files
- [ ] `SUPABASE_SERVICE_ROLE_KEY` confirmed server-only, never in client bundle
- [ ] Checkout, search, and any data-writing endpoints have server-side input validation with sane bounds
- [ ] Rate limiting added to checkout, auth, search, and email-sending endpoints
- [ ] No `dangerouslySetInnerHTML` (or equivalent) used with unescaped user input
- [ ] Security headers configured (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] RLS re-verified as actually enabled on customer-facing tables
- [ ] Admin route protection re-verified at the middleware/API level

---

## What's Next

With your security foundation confirmed, the next concern is making sure your store stays fast as real traffic arrives — that's **Performance Optimization**, next in this phase.
