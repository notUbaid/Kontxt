---
title: Buyer Journey
slug: buyer-journey
phase: Phase 1
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: buyer-journey-hackathon-marketplace.md
---

# Buyer Journey

Your PRD sketched the buyer side at a high level. This module goes one level deeper: the actual screen-by-screen path a buyer takes, and the specific moments where a demo either earns trust or loses it.

---

## Why the Buyer Side Gets Demoed First, Almost Always

In a 3-minute demo, you typically show the buyer experience before the seller experience — judges relate to "finding and getting something" more intuitively than "listing something for sale." This isn't a hard rule, but it's worth deciding deliberately rather than defaulting into it.

> **Reframe:** The buyer journey is your demo's opening act. If it's confusing or slow in the first 30 seconds, you've lost attention before you've shown your best work.

---

## The Five Moments That Matter

Every buyer journey, regardless of marketplace type, passes through these moments. Each one is a place where a hackathon build commonly drops quality — know which ones you're prioritizing.

### 1. Landing / First Impression
The buyer's first screen has to communicate what this marketplace is for, instantly, without explanation. If a judge has to ask "wait, what is this for?" you've lost time you don't get back.

> **Best Practice:** Show real-feeling listings immediately on landing — not a generic hero section with a "browse now" button. A marketplace that opens to populated, specific listings (from your Demo Marketplace Data work later) communicates what it does faster than any headline copy could.

### 2. Discovery (Search/Browse)
This is where your MVP Scope decision (search vs. browse, pick one) gets implemented. Don't build both under time pressure — a single, well-executed discovery method beats two half-working ones.

> **Tip:** If your marketplace is narrow in scope (per Marketplace Type), browsing a short, well-curated list often demos better than search — search implies a large catalog, and a search bar returning 4 results looks broken even when it's working correctly.

### 3. Listing Detail
The moment a buyer evaluates a specific item. This is where trust signals (from Marketplace Fundamentals) earn their place — a listing with a price, a clear description, and a fake-but-plausible rating reads as real. A listing with just a title and price reads as a database record.

### 4. Transaction Initiation
The actual "buy" or "reserve" moment — your core loop's critical step. This needs to feel instant and certain. A spinner that hangs for more than a second or two, even briefly, reads as broken in a live demo regardless of what's happening technically behind it.

### 5. Confirmation
The moment that closes the loop. Skipping a clear confirmation state is one of the most common ways a working transaction *feels* unfinished even when the backend logic succeeded — the buyer (and the judge watching) needs visible proof the loop closed.

> **Warning:** A transaction that succeeds in the database but shows no clear confirmation on screen is, for demo purposes, indistinguishable from a transaction that failed. Build the confirmation state with the same priority as the transaction logic itself — it's not a polish item, it's part of the loop.

---

## Mapping Your Journey

Use this as a working template — fill in your actual screens, not generic placeholders:

| Moment | Screen/Component | What must be true for this to feel real |
|---|---|---|
| Landing | [your homepage] | Shows populated listings immediately, no empty state |
| Discovery | [your browse/search page] | Returns results that look genuinely curated, not random test data |
| Listing Detail | [your listing page] | Has at least one trust signal beyond price/title |
| Transaction | [your buy/reserve action] | Responds in under 1-2 seconds, visibly |
| Confirmation | [your confirmation screen/state] | Unmistakably signals success, not ambiguous |

---

## Common Mistakes

| Mistake | Why it hurts the demo |
|---|---|
| Buyer lands on a login wall before seeing any listings | Judges want to see the product, not your auth flow, in the first 10 seconds |
| Search/browse returns 1-2 sparse results | Reads as an empty, unfinished marketplace even if the logic is correct |
| Listing detail page is identical to a generic product page | Misses the chance to show marketplace-specific trust signals |
| No loading or confirmation feedback on the buy action | Judges can't tell if it worked, and will ask — costing demo time |

> **Common Mistake:** Requiring account creation before a buyer can browse at all. Unless your concept specifically requires it, let buyers see listings immediately — gate the actual transaction step behind auth if you need to, not the entire browsing experience. Judges should see your product before they see your login form.

---

## Using AI Effectively Here

Use AI to pressure-test your specific screen sequence against these five moments, and to catch where your plan might create dead time in the demo.

** Copy this prompt:**

```
Here's my planned buyer journey for a hackathon marketplace: [list your actual screens/steps in order]

My marketplace: [one-sentence definition from MVP Scope]

Walk through this as if you were a judge watching a 3-minute demo:
1. Where would I lose attention or feel confused in the first 10 seconds?
2. Is there a point where I'm gating the core experience behind something unnecessary (login, an empty state, a multi-step form) before showing real value?
3. Where does the journey lack a clear trust signal that would make it feel like a real, populated marketplace rather than a test build?
4. Is the transaction-to-confirmation moment unambiguous, or could it read as broken even if it technically worked?

Be specific about what you'd actually flag while watching, not generic UX advice.
```

---

## Validating the Output

- Does the buyer see real-feeling listings within the first few seconds, with no login wall in front of browsing?
- Is discovery (search or browse — pick one) implemented well rather than both implemented halfway?
- Does the listing detail page include at least one trust signal beyond price and title?
- Does the transaction step respond visibly within 1-2 seconds?
- Is the confirmation state unambiguous — would a judge instantly know it succeeded?

---

## Before You Continue

- All five moments (landing, discovery, detail, transaction, confirmation) mapped to actual screens
- No login wall blocking the initial browsing experience
- At least one trust signal planned for the listing detail moment
- Confirmation state designed with the same priority as the transaction logic itself

**Next up:** Seller Journey — the other half of the loop, and where it needs to connect back to what you just mapped.
