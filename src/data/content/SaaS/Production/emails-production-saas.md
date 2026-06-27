---
title: Emails
slug: emails
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Emails

Email feels simple until a password reset lands in spam, or a billing receipt fires twice. This module covers the deliverability and reliability decisions that determine whether your emails actually arrive — which matters more for a SaaS than almost any other secondary feature, because verification and password reset emails sit directly in your critical auth path.

---

## Decision 1: Provider

| Option | Best for |
|---|---|
| Resend | Modern developer experience, good for transactional + React Email templates |
| Postmark | Strong deliverability reputation specifically for transactional email |
| SendGrid | Mature, handles both transactional and marketing at scale |

> 💡 **Tip**
> Any of these work well for transactional SaaS email. Pick based on integration ease with your stack rather than agonizing over the choice — the deliverability setup below matters more than the provider choice itself.

---

## Decision 2: Separate Transactional from Marketing

> ⚠️ **Warning**
> If you send both critical transactional email (password resets, invoices) and marketing/newsletter email, **separate them by sending domain or subdomain** (e.g., `mail.yourapp.com` for transactional, `news.yourapp.com` for marketing). Marketing email has a higher chance of spam complaints and unsubscribes, which can damage sender reputation — if that reputation is shared with your password reset emails, a marketing campaign's poor performance can start landing your critical transactional emails in spam too.

---

## Decision 3: Deliverability Setup (Non-Negotiable)

> **Decision Card — DNS Records You Need**
> - **SPF** — declares which servers are allowed to send email on your domain's behalf
> - **DKIM** — cryptographically signs outgoing email so receiving servers can verify it wasn't tampered with
> - **DMARC** — tells receiving servers what to do with email that fails SPF/DKIM checks

> ⚠️ **Warning**
> Skipping SPF/DKIM/DMARC setup is the single most common reason transactional emails land in spam for new SaaS products. This is DNS configuration, not application code — set it up through your email provider's domain verification flow before you rely on email for anything user-facing, especially password resets and verification.

---

## Decision 4: Send Asynchronously

> ⚠️ **Warning**
> Never send an email inline, blocking the request the user is waiting on. If your email provider is slow or briefly down, you don't want that to delay account creation or any other user-facing action. Queue the email send as a background job (your async boundary from System Architecture Diagram) and let the user's request complete immediately.

---

## Decision 5: Idempotent Sending

Apply the same idempotency principle from Backend Architecture's background jobs: if a "send welcome email" job is retried after a transient failure, it should not result in the user receiving the email twice. Track sent-state (e.g., an `email_sent_at` field, or a dedupe key tied to the triggering event) so retries don't duplicate the send.

---

## Decision 6: Templating

> ✅ **Best Practice**
> Use a component-based email templating approach (React Email or similar) so templates live in your codebase, are versioned, and can be previewed locally — rather than hardcoded HTML strings scattered through your backend that are painful to edit and impossible to preview without actually sending a test email.

Required email types for most production SaaS:

- [ ] Email verification
- [ ] Password reset
- [ ] Team/workspace invite
- [ ] Billing receipts/invoices
- [ ] Critical notifications (payment failed, security alert)

---

## Decision 7: Preference Management

- [ ] Marketing emails include an unsubscribe link (legally required in most jurisdictions — CAN-SPAM, GDPR)
- [ ] Non-critical notification emails (digests, activity summaries) have a user-controllable preference to opt out
- [ ] Critical transactional emails (password reset, security alerts, billing) are never optional — don't let unsubscribe preferences accidentally suppress these

---

## Decision 8: Testing Without Spamming Real Inboxes

- [ ] Use your provider's test/sandbox mode, or a tool like Mailtrap, during development — don't send real emails to real addresses during routine testing
- [ ] Preview templates locally (React Email's preview server, for instance) before sending any test email at all

---

## Common AI Mistakes to Watch For

- **Sends email synchronously inline** in the request handler — always require the background job pattern.
- **No idempotency/dedupe handling** for retried sends — ask explicitly how a duplicate send is prevented.
- **Hardcodes email HTML as strings** instead of using a component-based templating approach — push back for maintainability.
- **Doesn't mention SPF/DKIM/DMARC at all** — this is a DNS setup step, easy for AI to skip since it's outside application code, but it's the most common real-world deliverability failure.
- **Suppresses critical transactional emails via a generic unsubscribe/preference system** — verify password resets and security alerts are never affected by notification preferences.

---

## AI Prompt: Implement Transactional Email Sending

```
Implement transactional email sending for a production SaaS using [Resend / Postmark / SendGrid] and [React Email or similar] for templates.

Requirements:
- Email types: verification, password reset, workspace invite, billing receipt
- All sends happen via a background job, never inline in the request handler
- Sends are idempotent — track sent-state to prevent duplicate sends on job retry
- Templates are component-based files in the codebase, previewable locally
- Critical emails (verification, password reset, billing, security alerts) are never affected by notification preference settings; only non-critical digest/summary emails respect an opt-out

Also list the DNS records (SPF, DKIM, DMARC) I need to configure with this provider for deliverability — this is a manual setup step, just tell me exactly what to add.
```

---

## Validate Before You Move On

- [ ] SPF, DKIM, and DMARC are configured and verified for your sending domain
- [ ] Transactional and marketing email use separate sending domains/reputations, if you send both
- [ ] Every email send happens via a background job, not inline in a request
- [ ] Sends are idempotent against job retries
- [ ] Templates are component-based, versioned, and previewable without sending a real email
- [ ] Critical emails are never suppressed by user notification preferences
- [ ] You've sent a real test email to an inbox you control and verified it didn't land in spam

> 💡 **Tip**
> Test deliverability with a tool like mail-tester.com before launch — it scores your actual sent email against SPF/DKIM/DMARC and common spam triggers, catching deliverability issues before real customers experience them.

---

**Next:** Notifications — build the in-app notification system that often pairs with (and sometimes replaces) email.
