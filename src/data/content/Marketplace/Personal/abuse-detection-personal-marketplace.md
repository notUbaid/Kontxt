---
title: Abuse Detection
slug: abuse-detection
phase: Phase 4
mode: personal
projectType: marketplace
estimatedTime: 15 min
---

# Abuse Detection

Fraud Prevention covered dishonest *transactions* — fake listings, non-delivery, payment scams. This module covers a different category: behavioral abuse that doesn't necessarily involve money at all. Harassment in messages, spam listings, scraping your catalog, and banned users coming back under new accounts. These erode a marketplace just as effectively as financial fraud, just more slowly and less visibly.

---

## Abuse vs. Fraud: A Quick Distinction

> ** Core rule:** fraud targets money and transactions. Abuse targets *people and the platform itself* — your other users' experience, your infrastructure, your moderation capacity. A harassing message costs no one a cent, but it can drive a user off your marketplace permanently.

| Pattern | Category | Where it's handled |
|---|---|---|
| Fake listing to collect payment | Fraud | Fraud Prevention module |
| Harassing messages in a thread | Abuse | This module |
| Scraping your entire listing catalog | Abuse | This module (partially covered in Security) |
| Banned user creates a new account | Abuse (ban evasion) | This module |
| Spam listings (same item posted 50 times) | Abuse | This module |
| Coordinated fake reviews | Overlaps both | Reviews + this module |

---

## Decision: Detection Approach

> ** Decision Card — Abuse Detection Strategy**
>
> **Option A: Reactive — respond to user reports only**
> Zero proactive infrastructure, relies entirely on your reporting tools from Fraud Prevention. Works at low volume, but misses abuse no one reports (e.g. a user scraping silently).
>
> **Option B: Pattern-based automated flags + manual review**
> A handful of simple rules (rate-based, content-based) flag suspicious activity for your review — no auto-punishment, just earlier visibility.
>
> **Option C: ML-based abuse detection**
> What large platforms eventually build. Requires data volume and tuning that doesn't make sense for a personal project.
>
> **For Personal Mode: combine A and B.** User reports remain your primary signal — but a few cheap, rule-based flags catch the abuse patterns no one would think to report (like scraping or spam-listing bursts).

---

## Message Abuse: Harassment and Spam

You already rate-limited message sending in Rate Limiting — that throttles volume but doesn't catch *content*. A user can harass someone slowly, well within rate limits.

> ** Validation Checklist**
> - [ ] Can a recipient block a sender, preventing further messages without needing to report and wait for admin action?
> - [ ] Does reporting a message (from Fraud Prevention's `Report` model) surface the message content to you, not just a reference ID — you need to actually see what was said to act on it?
> - [ ] Is there a simple keyword/pattern flag for obviously abusive content (slurs, threats) that surfaces a report automatically, even before the recipient reports it themselves?

```js
// Simple, transparent content flagging — not a black-box ML model
const FLAGGED_PATTERNS = [/* maintain your own list, keep it reviewable */];

function flagIfAbusive(messageBody) {
  const matched = FLAGGED_PATTERNS.some((pattern) => pattern.test(messageBody));
  if (matched) {
    logEvent("message_auto_flagged", { reason: "pattern_match" });
  }
  return matched;
}
```

> **️ Warning:** auto-flagging should surface content for your review, not auto-delete or auto-block. False positives on keyword matching are common and frustrating for legitimate users — treat this as triage assistance, not enforcement.

---

## Spam Listings

A user posting the same listing dozens of times (common with bots, or sellers trying to dominate search results) degrades your marketplace's quality for everyone browsing it.

```js
async function checkForSpamListing(sellerId, title, description) {
  const recentSimilar = await db.listing.count({
    where: {
      sellerId,
      title: { equals: title }, // exact match is a cheap, effective first filter
      createdAt: { gt: hoursAgo(24) },
    },
  });

  return recentSimilar >= 3; // same title posted 3+ times in 24h — flag, don't auto-block
}
```

> ** Validation Checklist**
> - [ ] Does listing creation check for near-duplicate recent listings from the same seller?
> - [ ] Is the threshold for flagging set conservatively (favoring missed detection over false positives), appropriate for a personal project where you'd rather under-flag than annoy legitimate sellers re-listing similar items?
> - [ ] Are flagged listings still published (not blocked), just surfaced for your review?

---

## Ban Evasion

Suspending an account is meaningless if the same person creates a new one in minutes. This is genuinely hard to solve completely — but a few low-cost signals catch the common case without building serious fingerprinting infrastructure.

> ** Validation Checklist**
> - [ ] Is email verification required before an account can create listings or send messages? (The single cheapest ban-evasion deterrent — raises the cost of creating throwaway accounts)
> - [ ] When suspending a user, do you log identifying signals available to you (IP at signup, IP at time of suspension) so a clear repeat pattern is visible if it happens again?
> - [ ] Are you avoiding building invasive device fingerprinting? (Disproportionate for a personal project, and a real privacy concern — simple signals are enough at this scale)

> ** Rule of thumb:** perfect ban evasion prevention isn't achievable even for large platforms. Your goal is raising the cost of evasion enough that casual bad actors don't bother — not building a forensic-grade detection system.

---

## Catalog Scraping

Partially addressed in Security (pagination caps, hiding contact info) — this section is about *detecting* scraping in progress, not just limiting its damage.

> ** Validation Checklist**
> - [ ] Are you logging request patterns that suggest scraping — e.g. one IP making hundreds of sequential `GET /listings/:id` requests in a short window?
> - [ ] Does your rate limiting on search/browse endpoints (from Rate Limiting) actually catch this, or is the limit too generous to matter?
> - [ ] If scraping is detected, is the response a clear rate-limit message, not a silent block that leaves you wondering if your own monitoring broke?

---

## AI Prompt: Add Abuse Flagging

> ** Copy Prompt**
>
> ```
> Add lightweight abuse detection to my marketplace project. This is a personal
> project — flag for manual review, never auto-punish.
> Stack: [YOUR STACK].
>
> Requirements:
> 1. Spam listing check: flag (don't block) when a seller posts 3+ listings with an
>    identical title within 24 hours
> 2. Message blocking: let a user block another user, preventing further messages
>    between them without needing a report
> 3. A simple, maintainable keyword-pattern check on message content that creates an
>    auto-report (using my existing Report model) for review — transparent rules I
>    can edit, not a black-box classifier
> 4. Log signup IP and suspension-time IP on user suspension, for pattern visibility
>    if a banned user reappears — no device fingerprinting
>
> Existing Listing, Message, and Report schemas:
> [PASTE YOUR SCHEMAS]
> ```
>
> **Why this prompt works:** "flag for manual review, never auto-punish" is repeated as a hard constraint because AI's default instinct for abuse detection often includes automatic enforcement actions (auto-ban, auto-delete) that are too risky to deploy without human judgment at a scale where false positives directly damage real relationships with real users.

---

## Validating AI Output Here

> ** Common Hallucination:** AI will sometimes implement keyword-based abuse detection as an opaque scoring system with thresholds that auto-act (e.g. "score > 5, auto-suspend"). Insist on a transparent, editable pattern list and confirm the action taken is always "flag for review," not an automatic consequence — opaque auto-enforcement is exactly what creates the false-positive disasters that erode trust in moderation systems, even well-intentioned ones.

---

## Token Efficiency Tip

Abuse detection rules will need tuning over time as you see real (mis)use of your platform — don't try to get the thresholds perfect upfront. Treat this as a short, revisitable prompt: paste only the specific detection function you're adjusting, with a couple of real examples of what you want flagged vs. not, rather than redesigning the whole system each time.

---

## What You've Decided

By the end of this module you should have:

- A clear mental separation between fraud (financial) and abuse (behavioral) patterns
- Spam-listing detection that flags without blocking
- User-level message blocking, independent of the reporting flow
- Transparent, editable content flagging — not an opaque auto-enforcement system
- Lightweight ban-evasion signals appropriate to a personal project's scale and privacy obligations

**Next:** Phase 5 — Launch, starting with Privacy Policy: the legal foundation your marketplace needs before real users sign up.
