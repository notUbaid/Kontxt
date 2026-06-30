---
title: Notifications
slug: notifications
phase: Phase 3
mode: production
projectType: e-commerce
estimatedTime: 20-30 min
---

# Notifications

Your store needs to talk to two people: the customer who just bought something, and you, the owner who needs to know it happened. This module covers both — without building a notification system you don't need yet.

> **Scope check:** This module is about *transactional* notifications (order confirmed, shipped, etc.) and basic owner alerts. Marketing emails (abandoned cart, promotions) belong in Phase 6 — Growth. Don't build that now.

---

## The Two Notification Jobs

| Job | Who receives it | Why it matters |
|---|---|---|
| **Customer confirmations** | Buyer | Reduces "did my order go through?" anxiety and support messages |
| **Owner alerts** | You | You need to know a sale happened without refreshing a dashboard |

A personal e-commerce store needs both, but neither needs to be fancy. Email is enough. You do not need SMS, push notifications, or a dedicated notification microservice.

---

## What You're Actually Building

A small set of **transactional emails**, triggered by events in your order flow:

- Order confirmation (to customer) — sent the moment payment succeeds
- Shipping confirmation (to customer) — sent when you mark an order as shipped
- New order alert (to you) — sent the moment payment succeeds

That's it for a personal store. Three triggers, three templates.

> **Tip:** Resist the urge to add "order processing," "payment failed," "back in stock," and five other email types on day one. Ship the three above. Add more only when you actually feel the gap.

---

## Decision: Where Do Emails Get Sent From?

You have two real options.

### Option A — Email API service (Resend, Postmark, SendGrid)
Your backend calls an API with recipient, subject, and content. The service handles deliverability, bounces, and spam compliance.

### Option B — Your own SMTP / Supabase email
Lower-level, more setup, more deliverability risk (your emails are more likely to land in spam).

<table>
<tr><th></th><th>Email API (Resend)</th><th>Raw SMTP</th></tr>
<tr><td>Setup time</td><td>~15 min</td><td>1-2 hours</td></tr>
<tr><td>Deliverability</td><td>Good out of the box</td><td>You manage SPF/DKIM yourself</td></tr>
<tr><td>Free tier</td><td>Resend: 3,000 emails/month free</td><td>Depends on provider</td></tr>
<tr><td>Personal project fit</td><td>Excellent</td><td>Overkill</td></tr>
</table>

**Recommendation for Personal Mode:** Use **Resend**. It's built for developers, has a generous free tier, integrates cleanly with Node/Next.js/Supabase Edge Functions, and your emails won't end up in spam by default.

---

## Architecture: Where the Trigger Lives

Notifications should never be triggered from the frontend. A customer's browser closing mid-checkout shouldn't mean no confirmation email ever sends.

```
Payment Webhook (Stripe) 
        ↓
Backend confirms payment success
        ↓
Update order status in DB
        ↓
Trigger: send customer confirmation email
        ↓
Trigger: send owner alert email
```

> **Why this matters:** If you trigger the email from a "Thank You" page the user sees after checkout, and they close the tab early or their connection drops, no email ever sends — but the payment still went through. Always trigger from the **server-confirmed event** (the webhook), never from the client reaching a page.

This connects directly to what you built in the Payments module — the same Stripe webhook handler that marks an order as `paid` is the right place to fire these emails.

---

## Email Templates: Keep Them Simple

For a personal store, plain, clean HTML emails outperform "designed" ones. They load faster, render correctly across clients, and don't trigger spam filters as easily.

**Order Confirmation — required content:**
- Order number
- Items purchased (name, quantity, price)
- Total charged
- Shipping address
- Estimated delivery (if known)
- Support contact / reply-to address

**Shipping Confirmation — required content:**
- Order number
- Carrier + tracking number (if available)
- Tracking link
- Expected delivery window

**Owner Alert — required content:**
- Order number
- Customer name/email
- Items + total
- Link to view order in your admin dashboard

> **Best Practice:** Use a templating approach (React Email, or simple HTML string templates) rather than hardcoding HTML inline in your backend logic. It keeps email design changes isolated from order logic.

---

## AI Prompt: Generate Email Templates

Use this once you've decided on Resend (or your chosen provider) and have your order data shape defined.

```
I'm building transactional emails for a personal e-commerce store using [Resend / React Email].

Generate three email templates:
1. Order confirmation (sent to customer after successful payment)
2. Shipping confirmation (sent to customer when order ships)
3. New order alert (sent to store owner)

Order data shape:
[paste your order object/schema here]

Requirements:
- Clean, minimal HTML — no heavy design, mobile-friendly
- Must render correctly in Gmail, Outlook, and Apple Mail
- Include placeholders for: order number, items list, total, shipping address, tracking info
- Keep subject lines short and clear
- Do not include marketing language or upsells — these are transactional only

Output the templates as [React Email components / HTML strings], plus the function signatures I'd call to send each one.
```

> **Token efficiency tip:** Paste your actual order schema, not a description of it. AI generates noticeably better templates when it sees real field names instead of guessing them.

---

## Validating AI-Generated Email Code

Email code looks simple and is full of small landmines. Check for these before trusting the output:

- [ ] Does it handle a missing/optional field (e.g., no tracking number yet) without breaking the template?
- [ ] Is the "from" address using your verified domain, not a placeholder?
- [ ] Does the email send happen **after** the database write succeeds, not before? (If the DB write fails, you don't want a confirmation email for an order that doesn't exist.)
- [ ] Is there error handling if the email API call fails? (A failed email should never roll back a successful payment.)
- [ ] Are customer email addresses being logged anywhere insecurely (plain console.log in production)?

> **Common AI mistake:** AI often generates email-sending code that runs in the same try/catch as the payment/order logic, meaning if the email API has a hiccup, it can incorrectly mark the whole order as failed. Email sending should fail *silently* (logged, not thrown) — the order already succeeded.

---

## Decision: Sync or Async Sending?

| Approach | What happens | When to use |
|---|---|---|
| **Synchronous** | Backend waits for email API to respond before finishing the request | Fine for personal projects — simplicity wins |
| **Async (queue/background job)** | Email sending is queued, request returns immediately | Only needed at higher order volume |

**Recommendation for Personal Mode:** Synchronous is fine. Resend's API typically responds in under a second. Don't add a job queue (like BullMQ or a serverless queue) for this — it's solving a scale problem you don't have.

---

## Security & Privacy Notes

- Never put customer emails or order details in client-side logs or analytics events.
- Use environment variables for your email API key — never commit it.
- Set a proper `reply-to` address customers can actually respond to; don't send from `noreply@` if you're a one-person store — it feels colder and you lose easy feedback.
- Verify your sending domain (SPF/DKIM via your provider's dashboard) so emails don't land in spam — this takes 10 minutes and matters a lot for deliverability.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- SMS notifications
- Push notifications
- Notification preference settings ("email me about X but not Y")
- Abandoned cart email sequences (Growth phase)
- Multi-language email templates
- A dedicated notifications database table/log

These all solve real problems — just not problems a personal store has on launch day.

---

## Implementation Checklist

- [ ] Resend (or chosen provider) account created, domain verified
- [ ] API key stored in environment variables
- [ ] Order confirmation email template built
- [ ] Shipping confirmation email template built
- [ ] Owner alert email template built
- [ ] Email triggers wired to the Stripe webhook handler (not the frontend)
- [ ] Email sending wrapped in try/catch that logs failures without breaking order flow
- [ ] Test order placed end-to-end — confirmation email received
- [ ] Test order marked shipped — shipping email received
- [ ] Owner alert received and contains a working link to the order

---

## What's Next

With orders now triggering real communication, the next step is making sure you can actually find and search through your catalog and orders efficiently — that's **Search**, next in this phase.
