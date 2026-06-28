---
title: Monetization Strategy
slug: monetization-strategy
phase: Phase 0
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
---

# Monetization Strategy

Monetization is not a feature you add after product-market fit. It is a design decision that shapes your user experience, your retention mechanics, your acquisition strategy, and your technical architecture from day one.

The apps that monetize well didn't bolt on a paywall at the end. They built the business model into the product's core logic.

---

## Choose Your Model Before You Build

Every monetization model creates different user psychology, different churn dynamics, and different implementation requirements. Switching models post-launch is painful — it requires renegotiating the user relationship, repricing, and often a significant rebuild of the payment and entitlement system.

Decide now. Commit to it in v1.

---

## The Mobile Monetization Models

### Freemium
Free core experience. Premium features behind a paywall.

**How it works:** Users get enough value to build a habit, then hit a ceiling that makes upgrading feel natural rather than forced.

**Best for:** Apps where the core loop is genuinely useful for free but significantly better with premium. Productivity tools, utility apps, content apps.

**The freemium trap:** If free is too good, nobody upgrades. If free is too limited, nobody stays. The gate must be at a feature users want after they've already gotten value — not before.

**Revenue characteristics:** Lower conversion rates (2–5% of free users typically), but large free user base creates word-of-mouth and review volume.

---

### Subscription
Recurring payment (weekly / monthly / annual) for full access.

**How it works:** Users pay continuously for ongoing value. Annual plans improve retention and LTV significantly — users who've paid for a year are committed.

**Best for:** Apps that deliver ongoing, fresh value — fitness coaching, language learning, meditation, productivity suites. Any app where the value compounds over time.

**Pricing anchors:** Annual plan should be 40–60% cheaper than monthly equivalent. Weekly plans have high revenue but also high churn — use carefully.

**Revenue characteristics:** Predictable MRR, but requires continuous investment in the product to justify recurring payment. Churn is your enemy.

---

### One-Time Purchase
User pays once, owns the app forever.

**How it works:** Upfront payment, no recurring commitment.

**Best for:** Utility apps, games with a complete experience, tools where the core value doesn't depend on ongoing content.

**The sustainability problem:** Without recurring revenue, growth requires continuous new user acquisition. Existing users don't generate ongoing revenue unless you release paid upgrades.

**Revenue characteristics:** Spiky — high at launch, declines without marketing spend. Poor for building a long-term business unless combined with paid upgrades.

---

### Freemium + Subscription (Hybrid)
Free tier exists. Full access requires subscription.

This is the most common model for consumer apps in 2025. It combines the acquisition benefits of free with the revenue predictability of subscription.

**Implementation:** Define your free tier generously enough to demonstrate value, restrictively enough to create upgrade motivation.

---

### Consumables (In-App Purchases)
Users buy credits, tokens, or one-time unlocks that are consumed.

**Best for:** AI-powered features (API costs scale with usage), marketplace transaction fees, games.

**Revenue characteristics:** Variable, usage-dependent. Requires careful unit economics — your cost per API call must be below your revenue per credit.

---

### B2B / Team Plans
Organization-level subscription above the individual tier.

**When to add:** After individual subscription is working. B2B requires different onboarding, admin controls, invoicing, and support.

**Revenue characteristics:** Higher ACV, lower churn, longer sales cycles. Transforms the business model significantly.

---

## Pricing Architecture

### The Anchor Effect
Always show your highest tier first, or at minimum show a comparison that makes your target tier look reasonable.

```
┌────────────┐  ┌────────────┐  ┌────────────┐
│   Basic    │  │    Pro     │  │  Business  │
│   Free     │  │  $9.99/mo  │  │ $29.99/mo  │
│            │  │  ← BEST   │  │            │
└────────────┘  └────────────┘  └────────────┘
```

Users anchored to $29.99/month find $9.99/month easy to justify.

### Annual vs. Monthly Pricing
Offer both. Price the annual plan to represent 2–4 months free compared to monthly.

```
Monthly:  $9.99/month  ($119.88/year)
Annual:   $59.99/year  ($4.99/month equivalent — 50% off)
```

Most subscription apps derive 60–70% of revenue from annual plans. Prioritize converting users to annual — it reduces churn dramatically.

### Free Trial Design
A free trial is a sales tool. Design it deliberately.

| Decision | Options | Recommendation |
|---|---|---|
| Trial length | 3 / 7 / 14 / 30 days | 7 days for habit apps; 14 days for complex tools |
| Payment required upfront | Yes / No | No — reduces conversion barrier; add card at trial end |
| Trial for annual only | Yes / No | Yes — protects against trial abuse |
| Reminder notifications | 3 days before, 1 day before | Always send — recovers 15–25% of expiring trials |

---

## The Paywall Moment

Where you put the paywall is as important as what's behind it.

### Too Early (before value)
User hasn't experienced the app yet. Paywall feels like a tax on trying. Converts poorly. Produces 1-star reviews about "pay before you even see it."

### At the Right Moment (after first value, before repeated value)
User has experienced the core loop once or twice. Understands the value. The paywall appears when they try to go further. Converts well.

### Too Late (after extensive free use)
Users are habituated to free. Upgrading feels like a price increase on something they already have. Converts poorly.

**The optimal paywall placement:** after the user's second or third meaningful action, or after they've accumulated something worth keeping (data, progress, a streak).

---

## App Store Platform Considerations

### Apple In-App Purchase (IAP)
Apple takes 30% of all IAP revenue (15% for small businesses under $1M/year revenue, and for year 2+ subscribers). This is non-negotiable for digital goods delivered in the app.

**What requires IAP:** Subscriptions, one-time unlocks, consumable credits.
**What does not require IAP:** Physical goods, services rendered outside the app, B2B invoicing.

### Google Play Billing
Same 15–30% structure as Apple. Google has been slightly more flexible in enforcement but the trend is toward stricter compliance.

### Stripe / Direct Payment
Cannot be used for digital goods within the app (violates both store policies). Can be used for web-based subscription that also grants app access — but users must subscribe via the web, not via an in-app flow.

**The web subscription workaround:** Many apps offer a subscription page on their website (processed by Stripe) that's cheaper than the in-app price — passing the saved commission to the user. This is allowed but requires careful UX to avoid guiding users away from IAP within the app.

---

## Revenue Metrics to Define Now

Set these targets before launch. They determine whether your monetization is working.

| Metric | Definition | Target range (consumer apps) |
|---|---|---|
| Conversion rate | Free → paid users | 2–8% |
| Trial conversion | Trial starters → paid | 20–40% |
| Monthly churn | Paid users who cancel each month | < 5% |
| Annual plan mix | % of subscribers on annual vs monthly | > 50% |
| ARPU | Average revenue per user (all users) | Depends heavily on category |
| LTV | Avg revenue per paying user lifetime | > 3× CAC |

---

## Monetization Anti-Patterns

**Paywalling core functionality immediately**
Users need to experience value before they'll pay for it. Gating the core loop before first value is experienced converts at < 1%.

**No annual option**
Monthly-only subscriptions have high churn. Annual plans reduce churn by 3–5× and improve LTV dramatically.

**Dark patterns**
Auto-renewing without clear disclosure, hiding the cancel button, charging immediately without a trial warning. These produce chargebacks, regulatory risk, and 1-star reviews. Apple and Google now enforce disclosure requirements strictly.

**Underpricing**
Most indie apps underprice by 2–4×. Users who find an app valuable will pay for it. Price based on value delivered, not on what feels "safe." Test higher prices in limited markets before global launch.

**Feature parity between free and paid**
If paid users get the same experience as free users, nobody upgrades. The paid tier must be meaningfully better — not just "more storage" but genuinely superior in ways daily users feel.

---

## Technical Implementation Notes

Decide on your payment infrastructure before writing a line of feature code. The entitlement system (who has access to what) touches every feature.

**For iOS + Android:** RevenueCat is the standard solution. It handles IAP on both platforms, manages entitlements, provides webhooks for subscription events, and gives you a cross-platform source of truth for subscription status.

**What you need from your backend:**
- Webhook receiver for subscription events (created, renewed, cancelled, expired)
- Entitlement check on protected API endpoints
- User record with subscription status and expiry

**Do not:** Implement your own receipt validation. Apple and Google receipt validation has edge cases that are extremely hard to handle correctly. RevenueCat or a similar SDK handles this.

---

## AI Prompt — Monetization Model Design

```
I am building a [describe your app in one sentence].

Target user: [describe specifically]
Category: [App Store category]
Core value: [what users get from using the app daily]
Competitors' pricing: [list 3 competitors with their pricing models]

Design my monetization strategy:

1. Recommend the primary monetization model with reasoning specific to my app and category
2. Define my free tier — what's included and what's the ceiling
3. Define my premium tier(s) — what's included and why users will upgrade
4. Recommend pricing (monthly + annual) with reasoning
5. Recommend trial length and structure
6. Identify the optimal paywall moment in my user journey
7. Flag any features I've described that cannot be monetized via IAP (store policy)
8. Estimate realistic conversion rate and what that means for my revenue at [X] downloads/month

Then:
9. What is the single biggest monetization risk in my model?
10. What would I need to see in user behavior data to know my paywall placement is wrong?

Ground recommendations in category norms. Don't be generic.
```

---

## The Monetization Decision Output

From this module, commit to:

- **Primary model:** [freemium / subscription / one-time / hybrid]
- **Free tier definition:** [what's free, what's the ceiling]
- **Paid tier(s):** [what's included, price points]
- **Trial:** [length, credit card required, reminder strategy]
- **Paywall moment:** [specific trigger in user journey]
- **Payment infrastructure:** [RevenueCat or alternative]
- **Revenue targets:** [conversion rate, churn rate, LTV targets]

Write this down. Your paywall design, your feature gating decisions, and your onboarding flow all depend on it.
