---
title: Webhooks
slug: webhooks
phase: Phase 3
mode: personal
projectType: api-product
estimatedTime: 25-35 min
---

# Webhooks

So far, every module has covered your API responding to requests. Webhooks flip the direction: when something happens in your system, *you* make the request — to a URL your user configured, notifying their system in real time instead of making them poll you constantly.

This is table-stakes for a serious API product. It's also a genuine security surface: you're making outbound HTTP requests to URLs supplied by users, and the receiving end needs a way to verify the request actually came from you.

---

## Event Design

Before writing delivery code, define what events actually exist. Vague or overly granular events make your API painful to integrate with.

```typescript
type WebhookEvent =
  | "order.created"
  | "order.fulfilled"
  | "order.cancelled"
  | "payment.succeeded"
  | "payment.failed";
```

> **Tip — naming convention**
> Use `resource.action` naming (Stripe's convention). It's immediately scannable, groups naturally in documentation, and lets consumers subscribe to a whole resource's events with a prefix match if your system supports it later.

---

## Payload Structure

Every webhook payload should be self-describing and independently verifiable — a consumer should be able to look at one payload and know exactly what happened, without needing to have received every prior event.

```json
{
  "id": "evt_8f2a1c3d",
  "type": "order.fulfilled",
  "createdAt": "2026-07-01T09:12:00Z",
  "data": {
    "orderId": "ord_123",
    "fulfilledAt": "2026-07-01T09:11:58Z"
  }
}
```

> **Decision card**
> Always include a unique `id` per event. This is what lets the receiving end deduplicate — webhooks are delivered **at least once**, never exactly once, because your retry logic can't distinguish "they received it but their ack was lost" from "they never received it." The consumer's dedup responsibility depends entirely on you giving them a stable ID to dedup against.

---

## Signing Payloads

Anyone can send a POST request to a public URL claiming to be you. Signing lets the receiver verify the payload genuinely came from your API and wasn't tampered with in transit.

```typescript
// lib/webhooks.ts
import crypto from "crypto";

export function signPayload(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}
```

```typescript
// When delivering:
const payload = JSON.stringify(event);
const signature = signPayload(payload, webhookSubscription.secret);

await fetch(webhookSubscription.url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Webhook-Signature": signature,
    "X-Webhook-Id": event.id,
  },
  body: payload,
});
```

Document the verification code for your users to paste into their own systems:

```typescript
// Snippet for YOUR API DOCUMENTATION — this runs on the receiver's side
function verifyWebhook(payload: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
```

> **Warning — use a timing-safe comparison**
> Comparing signatures with `===` leaks timing information an attacker can use to guess the correct signature byte-by-byte. `crypto.timingSafeEqual` takes constant time regardless of where the strings first differ. Include this detail in your docs — most integrators won't know to ask for it.

---

## Delivery: Reuse Your Queue

Webhook delivery is exactly the "high-stakes, needs retries" case the **Queues** module built for. A webhook endpoint that's temporarily down shouldn't mean the event is lost — it should retry with backoff and land in your dead-letter table if it never succeeds.

```typescript
// When an event occurs in your system:
await jobQueue.add(
  "deliverWebhook",
  { subscriptionId, event },
  { attempts: 8, backoff: { type: "exponential", delay: 5000 } }
);
```

```typescript
// worker.ts — add this case to the switch from the Queues module
case "deliverWebhook":
  return deliverWebhook(job.data.subscriptionId, job.data.event);
```

```typescript
async function deliverWebhook(subscriptionId: string, event: WebhookEvent) {
  const sub = await db.webhookSubscription.findUnique({ where: { id: subscriptionId } });
  const payload = JSON.stringify(event);
  const signature = signPayload(payload, sub.secret);

  const res = await fetch(sub.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Webhook-Signature": signature },
    body: payload,
  });

  if (!res.ok) {
    throw new Error(`Webhook delivery failed: ${res.status}`); // triggers BullMQ retry
  }
}
```

> **Tip — 8 attempts, longer backoff than internal jobs**
> Webhook endpoints are third-party infrastructure you don't control — they may be down for minutes, not seconds. A longer retry window (attempts spread over ~10+ minutes with exponential backoff) gives transient outages on the receiving end time to resolve before you give up.

---

## Security: SSRF Protection

You're accepting a URL from users and having your server make requests to it. Without safeguards, this lets an attacker point your webhook at internal infrastructure (`http://localhost:6379`, cloud metadata endpoints, internal admin panels) and use your server as a proxy to reach them.

```typescript
import { URL } from "url";
import dns from "dns/promises";

const BLOCKED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "169.254.169.254"];

async function isUrlSafeForWebhook(rawUrl: string): Promise<boolean> {
  const url = new URL(rawUrl);
  if (url.protocol !== "https:") return false;
  if (BLOCKED_HOSTS.includes(url.hostname)) return false;

  const { address } = await dns.lookup(url.hostname);
  const isPrivateIp = /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.)/.test(address);
  return !isPrivateIp;
}
```

> **Warning — validate at both registration time AND delivery time**
> Checking the URL when the user first registers it isn't enough — DNS can be re-pointed after registration (DNS rebinding). Re-validate immediately before each delivery attempt, not just once at setup.

---

## Managing Subscriptions

```typescript
router.post("/webhooks", authenticate, async (req, res) => {
  if (!(await isUrlSafeForWebhook(req.body.url))) {
    return res.status(400).json({ error: "URL not allowed" });
  }

  const secret = crypto.randomBytes(24).toString("hex");
  const subscription = await db.webhookSubscription.create({
    data: { userId: req.user.id, url: req.body.url, events: req.body.events, secret },
  });

  // Secret shown once, same principle as API keys
  res.status(201).json({ id: subscription.id, secret });
});
```

---

## AI Prompt: Implement Webhook Delivery

```
I'm implementing outbound webhooks for a [framework] API. I already
have a BullMQ queue set up (see previous module).

Requirements:
- Each event has a stable unique ID, type, and timestamp
- Payloads are signed with HMAC-SHA256 using a per-subscription secret
- Delivery goes through the existing job queue with 8 retry attempts
  and exponential backoff
- Non-2xx responses from the receiving URL trigger a retry
- Include SSRF protection: reject non-HTTPS URLs, localhost, private
  IP ranges, and cloud metadata endpoints — re-validated at delivery
  time, not just at registration
- Show subscription creation, signing, delivery via the queue worker,
  and the verification snippet to include in API docs
```

---

## Validating AI Output

- **Confirm signing uses a timing-safe comparison in the verification example** — this is the detail most commonly missing from AI-generated docs snippets.
- **Confirm SSRF checks run at delivery time, not just registration.** A common gap: the check exists on the `POST /webhooks` route and nowhere else.
- **Confirm the event `id` is unique per event, not per delivery attempt.** Retries of the same event must carry the same ID so the receiver can dedupe correctly.
- **Confirm failed deliveries actually retry through the queue** rather than being caught and swallowed inside `deliverWebhook`.

---

## Common Mistakes

- Signing with `===` string comparison instead of a timing-safe method.
- Validating webhook URLs once at registration and never again.
- Reusing the same secret across all of a user's webhook subscriptions instead of one secret per subscription — a leaked secret from one integration shouldn't compromise all of them.
- Not exposing delivery logs/status to users, leaving them unable to debug why a webhook "isn't working" on their end.

---

## Validation Checklist

- [ ] Every webhook event has a unique, stable `id`
- [ ] Payloads are signed with HMAC and verification uses a timing-safe comparison
- [ ] Delivery goes through the durable queue with retries, not a synchronous `fetch` in the request path
- [ ] SSRF protections run at both registration and delivery time
- [ ] Each subscription has its own secret, not a shared one
- [ ] Failed deliveries land in a dead-letter/reviewable state after exhausting retries
- [ ] Verification code is documented clearly enough for a third-party developer to implement without asking you questions

---

## What's Next

With both directions of API communication covered, the next module — **SDK Development** — wraps your endpoints, authentication, and error handling into a client library so developers don't have to hand-write HTTP requests against your API.
