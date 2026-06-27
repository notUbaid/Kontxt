---
title: Third Party Integrations
slug: third-party-integrations
phase: Phase 2
mode: production
projectType: saas
estimatedTime: 20–30 min
---

# Third Party Integrations

Every production SaaS depends on external services — payments, email, analytics, maybe more. This module isn't about choosing which providers (Payments and Emails get their own modules in Phase 3); it's about the patterns that keep those integrations secure and swappable, so a vendor outage or a future migration doesn't ripple through your entire codebase.

---

## Decision 1: Secrets Management

> ️ **Warning**
> **Never commit API keys or secrets to your repository** — not even temporarily, not even in a private repo. Git history is forever; a key committed and removed in the next commit is still in history and should be treated as compromised. Use environment variables loaded from your hosting platform's secret management, never hardcoded values.

- [ ] All API keys/secrets live in environment variables, not in code
- [ ] `.env` files are in `.gitignore` from the first commit
- [ ] Production secrets are managed through your hosting platform's secret store, not shared via chat/email
- [ ] Keys are scoped to minimum necessary permissions where the provider supports it (e.g., a restricted API key for a specific service, not your account's master key)

---

## Decision 2: Abstraction Layer

> **Decision Card — Wrap, Don't Sprinkle**
> Never call a third-party SDK directly from scattered places across your codebase. Wrap each integration behind your own interface in one place — e.g., an `EmailService` your code calls, which internally uses your chosen provider's SDK.

```
// Your code calls this:
emailService.sendWelcomeEmail(user)

// Not this, scattered everywhere:
resendClient.emails.send({ ... })
```

This means switching providers later (or adding a fallback provider) is a change in one file, not a search-and-replace across your entire codebase. It also makes testing easier — you can mock your own interface without mocking a third-party SDK's internals.

---

## Decision 3: Webhook Handling

Many integrations (payments, email delivery status) communicate back to you via webhooks. These need specific, non-obvious handling:

> ️ **Warning**
> **Always verify webhook signatures.** Every reputable provider signs webhook payloads with a secret you can verify. Skipping this means anyone who finds your webhook URL can send fake events — fake "payment succeeded" events, for instance, which is a direct path to a billing fraud vulnerability.

- [ ] Verify the provider's signature on every incoming webhook before processing it
- [ ] Handle webhook processing **idempotently** — providers retry webhooks on timeout, and you will receive the same event more than once. Processing the same "payment succeeded" event twice should not double-credit an account.
- [ ] Don't assume event ordering — a "subscription updated" event can theoretically arrive before or after a related "payment succeeded" event; design processing to tolerate this, not assume a strict sequence.
- [ ] Respond to the webhook quickly (acknowledge receipt) and do slow processing asynchronously via your background job system — providers often expect a fast response and will retry if you're slow.

---

## Decision 4: Handling Third-Party Downtime

You already flagged single points of failure in your System Architecture Diagram. Now decide what actually happens:

| Service down | Acceptable behavior |
|---|---|
| Payment provider | Show a clear "try again" error at checkout — don't silently fail or leave the user in an ambiguous state |
| Email provider | Queue and retry — don't block account creation or other core flows on email delivery succeeding |
| Analytics provider | Fail silently, log the failure — analytics should never block or degrade the core product experience |

>  **Best Practice**
> Categorize each integration as **critical-path** (the user is blocked if it fails) or **best-effort** (failure is logged but doesn't block the user). Most integrations should be best-effort; keep the critical-path list as short as possible.

---

## Common AI Mistakes to Watch For

- **Hardcodes API keys in example code** "for clarity" — always replace with environment variable references, even in examples.
- **Calls a third-party SDK directly throughout generated code** instead of through a wrapped interface — push back and ask for the abstraction layer.
- **Skips webhook signature verification** — explicitly require it; this is a security-critical step that's easy to silently omit.
- **Processes webhooks non-idempotently** — ask explicitly how a duplicate webhook event is handled.
- **Treats every integration as critical-path** — confirm which failures should actually block the user versus degrade gracefully.

---

## AI Prompt: Implement an Integration Wrapper

```
Implement an integration wrapper for [provider name, e.g., Stripe / Resend / PostHog] in a production SaaS.

Requirements:
- All API keys read from environment variables, never hardcoded
- Wrap the provider's SDK behind a [ServiceName] interface my application code calls — no direct SDK calls outside this wrapper
- If this integration receives webhooks: verify the provider's signature before processing, handle duplicate events idempotently, and respond quickly while deferring slow processing to a background job
- Classify this integration as critical-path or best-effort, and implement the failure behavior accordingly: [state which, and what should happen to the user if it fails]

Show me where in my codebase this wrapper should live, consistent with the domain-based folder structure from Backend Architecture.
```

---

## Validate Before You Move On

- [ ] No API keys or secrets exist in source code or committed `.env` files
- [ ] Every third-party SDK is called through your own wrapper interface, not directly from feature code
- [ ] Every webhook endpoint verifies the provider's signature
- [ ] Webhook processing is idempotent against duplicate events
- [ ] Each integration is explicitly classified as critical-path or best-effort, with defined failure behavior
- [ ] You could swap a provider by changing one file, not searching the whole codebase

> [!TIP]
> This wrapper pattern is what makes Payments, Emails, and Notifications (coming up in Phase 3) fast to implement — you're applying the same abstraction, not designing a new pattern per integration.

---

**Phase 2 progressing.** Next: AI Architecture (optional) — decide if and how AI capabilities fit into your product itself.
