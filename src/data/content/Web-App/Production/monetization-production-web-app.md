---
title: Monetization
slug: monetization
phase: Phase 0
mode: production
projectType: web-app
estimatedTime: 35–50 min
---

# Monetization

Monetization is not something you bolt on after launch. It is a structural decision that affects your database schema, your authentication model, your feature architecture, your onboarding flow, and your relationship with every user from day one.

Decide it now. Build it in from the start. Retrofitting a billing system into an existing codebase is one of the most painful refactors in software engineering.

---

## The Core Question

Before choosing a model, answer this:

```
What is the unit of value my product delivers?

Is it:
[ ] Time saved per task / session
[ ] Volume of output (documents, invoices, projects, messages)
[ ] Access to a capability (a feature, an integration, a level of quality)
[ ] Number of people using it (seats / team members)
[ ] Amount of data processed (storage, API calls, transactions)
[ ] Frequency of use (monthly active vs occasional)
```

Your pricing model should be proportional to this unit. When users get more value, they pay more. When pricing is disconnected from value, you get churn.

---

## The Main Models

### Freemium

A free tier that delivers real value, with paid tiers that unlock more.

```
Free:  Core features with meaningful limits
Pro:   Full features, higher limits — $X/month
Team:  Everything in Pro + collaboration — $X/seat/month
```

**Works when:**
- The free tier is genuinely useful (drives adoption and word of mouth)
- The paid tier addresses a real pain the free tier creates
- You can support a large free user base economically

**Fails when:**
- The free tier is too limited to demonstrate value (users churn before upgrading)
- The free tier is too generous (nobody upgrades)
- Infrastructure costs per free user are too high

**Technical implication:** Feature flags per user/plan from day one. Your database needs a `plan` or `subscription_status` field on users or organisations. Every gated feature checks this.

---

### Flat-Rate Subscription

One price. All features. Usually monthly or annual.

```
$X/month — everything included
Annual: $X/year (saves ~20%)
```

**Works when:**
- Your user segment has predictable, homogeneous usage
- You want simplicity as a selling point
- Differentiation is product quality, not feature tiers

**Fails when:**
- Usage varies wildly between customers (you subsidise heavy users)
- You want to grow revenue per customer without acquiring new ones

**Technical implication:** Simpler than freemium — binary active/inactive subscription state. Stripe Billing with a single product and price ID.

---

### Usage-Based

Charge based on what users consume: API calls, rows processed, emails sent, storage used.

```
$0.001 per API call
$0.05 per GB stored
First 1,000 calls/month free
```

**Works when:**
- Value is tightly correlated to consumption
- Usage varies significantly across customers
- You're building developer tools or infrastructure

**Fails when:**
- Users can't predict their bill (anxiety → churn)
- Your costs don't scale proportionally with usage
- It's hard to explain to non-technical buyers

**Technical implication:** You need metering infrastructure. Track usage in real time, store usage events, aggregate for billing. Stripe Meters or a dedicated system. This is significantly more complex than flat-rate.

---

### Per-Seat

Charge per user added to an account. Common in B2B.

```
$X per seat/month
Minimum 3 seats
Volume discount at 10+ seats
```

**Works when:**
- Value grows with team adoption
- Decision-makers (buyers) are different from end users
- You're selling to organisations, not individuals

**Fails when:**
- Users share accounts to reduce seat count (signals misaligned pricing)
- Individual users, not teams, are your primary buyer

**Technical implication:** Multi-tenancy is required. Organisations → seats → users hierarchy in your database. Billing is per organisation, not per user. Seat count must be tracked and enforced.

---

### One-Time Purchase

Pay once, use forever.

**Works when:**
- The product has a defined, stable scope (no ongoing infrastructure costs)
- Your market strongly prefers ownership over subscription
- Distribution is through app stores with existing payment rails

**Fails when:**
- You have ongoing server costs
- You need recurring revenue to fund development
- You want a sustainable business, not a product sale

**Technical implication:** Simpler billing, but no recurring revenue. Consider a one-time purchase + paid upgrades model if the product evolves.

---

## Choosing Your Model

| If your primary user is... | Consider... |
|---|---|
| Individual consumer | Freemium or flat-rate |
| Solo professional (freelancer, consultant) | Flat-rate or freemium |
| Small team | Per-seat or flat-rate |
| Enterprise | Per-seat with annual contracts |
| Developer / technical | Usage-based or flat-rate |
| Occasional user | Usage-based or one-time |

> [!WARNING]
> Don't choose your model based on what your competitors charge. Choose it based on your unit of value and your user's buying behaviour. A competitor on per-seat pricing is not evidence that per-seat is right for your user.

---

## Pricing Strategy

Once you've chosen a model, set your initial price.

**Anchor to value, not cost.** What is the problem worth to your user? If your tool saves a freelancer 3 hours per week at $75/hr, that's $900/month of value. Charging $29/month is not too expensive — it's extremely cheap relative to value.

**Start higher than you think.** You can always lower prices. Raising them on existing users is painful and generates churn. Most early-stage products underprice.

**Annual plans improve cash flow.** Offer a 15–20% discount for annual payment. This gives you predictable revenue and reduces churn (users who pay annually churn at a fraction of the rate of monthly subscribers).

**The free trial vs freemium decision:**

| Free Trial | Freemium |
|---|---|
| Full product for a limited time | Limited product forever |
| Creates urgency to convert | Creates habit before conversion |
| Better conversion rates | Better top-of-funnel volume |
| Simpler to implement | Requires maintaining two product tiers |

For a production v1, a time-limited free trial (14 days, no credit card) is usually faster to ship and produces higher conversion than a freemium model.

---

## The Billing Infrastructure Decision

For nearly every web app, **Stripe** is the right choice. It handles:

- Subscription management and billing cycles
- Failed payment recovery (dunning)
- Proration on plan changes
- Tax calculation (Stripe Tax)
- Invoice generation
- Customer portal (self-serve plan management)

```
Core Stripe concepts you must understand:

Customer     → one per user or organisation
Product      → what you sell (your app)
Price        → how you sell it ($29/month, $290/year)
Subscription → a customer on a price
Invoice      → a billing record
Webhook      → events Stripe sends to your backend
```

**The webhook is the most important part.** Stripe sends events to your backend when subscriptions are created, updated, cancelled, or when payments fail. Your application state must stay in sync with Stripe state via webhooks. This is where most billing implementations break.

```typescript
// The events you must handle
'customer.subscription.created'   → activate access
'customer.subscription.updated'   → update plan / seat count
'customer.subscription.deleted'   → revoke access
'invoice.payment_failed'          → notify user, begin grace period
'invoice.payment_succeeded'       → extend access, send receipt
```

---

## Database Schema Implications

Your chosen model directly shapes your schema. Decide this now — not after you've built your user model.

**Freemium / Flat-rate:**
```prisma
model User {
  id                 String    @id @default(cuid())
  stripeCustomerId   String?   @unique
  plan               Plan      @default(FREE)
  subscriptionId     String?   @unique
  subscriptionStatus String?   // active, past_due, cancelled
  trialEndsAt        DateTime?
  currentPeriodEnd   DateTime?
}

enum Plan {
  FREE
  PRO
  TEAM
}
```

**Per-seat (multi-tenant):**
```prisma
model Organisation {
  id                 String  @id @default(cuid())
  stripeCustomerId   String? @unique
  plan               Plan    @default(FREE)
  subscriptionId     String? @unique
  seatCount          Int     @default(1)
  members            Member[]
}

model Member {
  id             String       @id @default(cuid())
  userId         String
  organisationId String
  role           MemberRole
  organisation   Organisation @relation(fields: [organisationId], references: [id])
}
```

---

## Prompt: Design Your Monetization Model

```
Copy Prompt
```

```
I'm building a production web app and need to design my monetization model before I start building.

My product: [describe in 2–3 sentences]
My primary user: [paste from Target Audience module]
My USP: [paste from USP module]
My core features: [paste Core features from MVP module]

Help me design my monetization model:

1. Recommend the most appropriate pricing model for this product and user, 
   with your reasoning.

2. Suggest 2–3 pricing tiers with specific prices and what each tier includes. 
   Anchor prices to the value delivered, not to what feels cheap.

3. Identify the feature gate that will drive the most upgrades 
   — the thing free users will hit and decide to pay for.

4. Recommend: free trial or freemium? Why?

5. List the Stripe webhook events I must handle and what my application 
   should do in response to each.

6. Show me the database schema fields I need to add to support this model.

Be specific. Give me actual prices, not ranges.
```

---

## Monetization Checklist

- [ ] Pricing model chosen and documented with reasoning
- [ ] Unit of value identified — pricing is proportional to what users get
- [ ] Initial prices set (not "TBD") with rationale
- [ ] Annual plan discount defined
- [ ] Free trial or freemium decision made
- [ ] Stripe identified as billing provider (or alternative with justification)
- [ ] Stripe webhook events listed and handlers planned
- [ ] Database schema fields for billing defined
- [ ] Feature gates identified for each plan tier
- [ ] Grace period policy defined for failed payments

---

## What Comes Next

**Future Features** — mapping what comes after v1. Not to build it now, but to ensure your v1 architecture doesn't prevent it.

The features you defer to v2 and v3 must inform your v1 decisions. A database schema that can't support team collaboration is a full migration if you decide to add it later. A billing model that can't support usage-based pricing is a painful switch. Plan the future now, build for it in v1.
