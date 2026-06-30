---
title: Analytics Architecture
slug: analytics-architecture
phase: Phase 2
mode: production
projectType: e-commerce
estimatedTime: 20–30 min
---

# Analytics Architecture

Analytics tells you what's actually happening in your store — not what you assume is happening. Without it, every product and marketing decision is a guess.

The goal is not to collect everything. The goal is to collect the right things and actually use them.

---

## What E-Commerce Analytics Is Really For

Before picking tools, be clear on the questions you need to answer:

**Revenue questions**
- What is my revenue today / this week / this month?
- Which products generate the most revenue?
- What is my average order value?

**Conversion questions**
- What percentage of visitors add to cart?
- What percentage of carts become orders?
- Where in checkout do customers drop off?

**Product questions**
- Which products are viewed most but purchased least?
- Which search queries return zero results?
- Which products are frequently wishlisted but not purchased?

**Customer questions**
- Are customers returning or one-time buyers?
- What is my customer acquisition source?
- Which customers have the highest lifetime value?

Design your analytics to answer these questions. Nothing else matters until these are answered.

---

## The Two Layers of Analytics

```
Layer 1: Business Events (your database)
─────────────────────────────────────────
Orders, revenue, products, customers
Already exists if your schema is right
Query it directly — no extra tools needed

Layer 2: Behavioural Events (user actions)
───────────────────────────────────────────
Page views, clicks, scroll depth, add-to-cart
Requires event tracking
External tool or custom event log
```

Most builders jump to Layer 2 (Google Analytics, Mixpanel) and ignore Layer 1. Your order database already answers your most important questions. Start there.

---

## Layer 1: Database Analytics

You already have the data. Write the queries.

**Revenue dashboard queries (examples):**

```sql
-- Revenue today
SELECT SUM(total_amount) FROM orders
WHERE status = 'paid' AND created_at >= CURRENT_DATE;

-- Orders by status
SELECT status, COUNT(*), SUM(total_amount)
FROM orders GROUP BY status;

-- Top products by revenue (last 30 days)
SELECT p.name, SUM(oi.quantity) as units_sold, SUM(oi.total_price) as revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
JOIN orders o ON o.id = oi.order_id
WHERE o.status = 'paid' AND o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT 10;

-- Average order value
SELECT AVG(total_amount) FROM orders WHERE status = 'paid';

-- Repeat customer rate
SELECT
  COUNT(DISTINCT CASE WHEN order_count > 1 THEN user_id END) * 100.0
  / COUNT(DISTINCT user_id) AS repeat_rate
FROM (
  SELECT user_id, COUNT(*) as order_count
  FROM orders WHERE user_id IS NOT NULL
  GROUP BY user_id
) t;
```

Build a simple `/admin/analytics` page that runs these queries and displays results. This is your most valuable dashboard and it costs nothing extra.

---

## Layer 2: Behavioural Event Tracking

For understanding the customer journey — what people do before they buy — you need event tracking.

### Option A: Posthog (Recommended for personal projects)

Open-source, self-hostable, generous free cloud tier (1M events/month). Captures page views, custom events, session recordings, funnels, and retention analysis.

```js
// Install
npm install posthog-js

// Initialise (layout or _app)
import posthog from 'posthog-js'
posthog.init('YOUR_KEY', { api_host: 'https://app.posthog.com' })

// Track custom events
posthog.capture('product_viewed', { product_id: id, product_name: name })
posthog.capture('add_to_cart', { product_id: id, quantity, price })
posthog.capture('checkout_started', { cart_value: total })
posthog.capture('order_completed', { order_id: id, revenue: total })
```

### Option B: Google Analytics 4

Free, ubiquitous, powerful. Better for SEO/marketing attribution (UTM parameters, traffic sources). Weaker for product analytics (funnels, retention).

Use GA4 if traffic source analysis and SEO measurement matter more to you than conversion funnel analysis.

### Option C: Custom Event Log

If you want full data ownership and no third-party scripts:

```
AnalyticsEvent
├── id
├── type (product_viewed | add_to_cart | checkout_started | order_completed | search | ...)
├── sessionId
├── userId (nullable)
├── properties (jsonb)
└── createdAt
```

Log events server-side on API calls. No client-side JavaScript tracking, no ad blockers defeating your analytics, no third-party data sharing. Query your own table.

The tradeoff: you build your own dashboards. Acceptable for a personal project with a simple admin panel.

---

## The Events That Actually Matter

Track these. Ignore everything else until you've mastered these.

| Event | When to Fire | Key Properties |
|---|---|---|
| `product_viewed` | Product page load | product_id, product_name, category, price |
| `add_to_cart` | Add to cart action | product_id, quantity, price, cart_value |
| `checkout_started` | Checkout page load | cart_value, item_count |
| `address_entered` | Address step completed | country, state |
| `payment_initiated` | Payment form submitted | cart_value, shipping_cost |
| `order_completed` | Order confirmed (post-webhook) | order_id, revenue, item_count, coupon |
| `search_performed` | Search executed | query, result_count |
| `cart_abandoned` | Session ends with active cart | cart_value, item_count |

This is your conversion funnel. The drop-off between each step tells you where to focus.

---

## Conversion Funnel Analysis

The funnel is the most actionable analytics output for a store:

```
Product viewed          1,000 sessions    100%
Add to cart               250 sessions     25%    ← 75% drop — product pages not converting
Checkout started          180 sessions     18%    ← 28% cart abandonment
Address entered           160 sessions     16%
Payment initiated         140 sessions     14%    ← 12% drop at shipping/address
Order completed           120 sessions     12%    ← 14% drop at payment

Overall conversion: 12%
```

Each drop-off point tells you where to investigate. A 75% drop from viewed to add-to-cart suggests price, trust, or product presentation problems. A large drop at payment suggests payment method gaps or checkout friction.

You cannot see this without event tracking.

---

## UTM Parameters and Traffic Attribution

Knowing where your customers come from lets you invest in what works.

UTM parameters are query strings appended to links:

```
https://yourstore.com?utm_source=instagram&utm_medium=social&utm_campaign=launch
```

Capture and store UTMs when a session starts:

```js
// On page load
const params = new URLSearchParams(window.location.search)
const utm = {
  source: params.get('utm_source'),
  medium: params.get('utm_medium'),
  campaign: params.get('utm_campaign')
}
if (utm.source) sessionStorage.setItem('utm', JSON.stringify(utm))

// On order completion, attach to order
const utm = JSON.parse(sessionStorage.getItem('utm') || '{}')
// Send with order creation request
```

Store `utmSource`, `utmMedium`, `utmCampaign` on the Order table. Now you know which marketing channel generates revenue, not just traffic.

---

## Admin Dashboard Minimum Viable Metrics

Your `/admin/analytics` page should answer these at a glance:

```
Today          This Week       This Month
──────         ──────────      ──────────
Revenue        Revenue         Revenue
Orders         Orders          Orders
AOV            AOV             AOV

Top Products (by revenue, last 30 days)
──────────────────────────────────────
1. Product name    ₹X,XXX    XX units
2. ...

Recent Orders
─────────────
Order #1042  ₹1,299  Paid    2 min ago
Order #1041  ₹849    Shipped 1 hr ago
```

Build this before adding any third-party analytics. You'll use it daily.

---

## Privacy and Compliance

If you track behavioural events, you have obligations:

**Cookie consent:** If you use third-party analytics (GA4, Posthog cloud), you need a cookie consent banner for EU/UK visitors (GDPR) and California visitors (CCPA).

**Privacy policy:** Must disclose what you collect and why. Required regardless of geography if you sell internationally.

**Data minimisation:** Do not collect what you don't use. Every data point you store is a liability if you're breached.

**IP addresses:** Anonymise IP addresses in GA4 settings. Do not log raw IPs unless you have a specific security reason.

If your store is India-only and you use only server-side event logging to your own database, your compliance obligations are significantly simpler. No third-party cookie consent required.

---

## AI Prompt: Analytics Architecture Review

```
You are a senior product engineer reviewing an analytics architecture for a personal e-commerce project.

Here is my design:

BEHAVIOURAL TRACKING TOOL: [Posthog / GA4 / custom event log / none]
Reason: [brief explanation]

EVENTS I PLAN TO TRACK:
[list your events and key properties]

DATABASE ANALYTICS:
[list the queries or metrics you're computing from your orders/products tables]

ADMIN DASHBOARD:
[describe what your admin analytics page will show]

UTM ATTRIBUTION: [yes/no]

PRIVACY APPROACH:
[describe cookie consent and data collection disclosures]

Review for:
1. Missing events that would break funnel analysis
2. Events I'm tracking that I probably won't use
3. Database query gaps (important metrics I'm not computing)
4. Privacy/compliance oversights
5. Over-engineering for a personal project

Be specific. Flag critical gaps first.
```

---

## Validation Checklist

- [ ] Admin analytics page planned with revenue, orders, and AOV
- [ ] Top products by revenue query written
- [ ] Behavioural tracking tool chosen and initialised
- [ ] Core funnel events defined: product_viewed → add_to_cart → checkout_started → order_completed
- [ ] `search_performed` event logs query and result count
- [ ] UTM parameters captured and stored on Order
- [ ] Conversion funnel analysis possible from captured events
- [ ] Cookie consent in place if using third-party analytics
- [ ] Privacy policy updated to reflect data collection
- [ ] Data minimisation applied — not tracking what won't be used

---

## What to Build Next

Phase 2 architecture is complete. You have designed the full technical foundation of your store.

**Phase 3 — Development** begins with **Database** — translating every schema decision from Phase 2 into a real, migrated, seeded database ready for development.

---

> **Filename:** `analytics-architecture-personal-e-commerce.md`
