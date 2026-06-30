---
title: Rate Limiting
slug: rate-limiting
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Rate Limiting

If you do not rate limit your e-commerce APIs, you will be exploited. 

Unlike a standard SaaS app where rate limiting just protects against server overload, e-commerce rate limiting protects against direct financial attacks, inventory scraping, and algorithmic manipulation.

---

## 1. Card Testing (The Checkout Attack)

The most devastating attack on an e-commerce store is Card Testing. 
Botnets use your checkout endpoint as an oracle to test lists of stolen credit cards. They will run 10,000 $1 transactions through your Stripe integration in 5 minutes to see which cards are valid.

**The Financial Impact:**
Stripe charges you ~30¢ for every failed transaction. A 10,000 card testing run costs you $3,000. Worse, your dispute ratio skyrockets, and Visa/Mastercard will permanently ban your merchant account.

**The Edge Implementation:**
You must protect the `/api/checkout` or `/api/payment-intent` endpoint aggressively.
- **Tool:** Upstash Redis (Serverless) or Cloudflare WAF.
- **Rule:** Limit the checkout endpoint to **5 requests per minute, per IP address**.
- **Action:** If the limit is exceeded, return a `429 Too Many Requests` and force the client to solve a CAPTCHA (e.g., Cloudflare Turnstile) to proceed.

---

## 2. Sneaker Bots (The Inventory Attack)

During high-demand product drops (e.g., limited edition apparel or consoles), automated "Sneaker Bots" will hit your Add to Cart endpoint thousands of times a second to hoard all the inventory before humans can buy it.

**The Implementation:**
1. **Dynamic Rate Limiting:** During normal traffic, the `/api/cart/add` endpoint might allow 30 requests/minute. During a scheduled product drop, your WAF must automatically tighten this to 2 requests/minute per IP.
2. **Behavioral Bot Management:** Simple IP rate limiting is defeated by botnets rotating through millions of residential proxy IPs. You must deploy advanced bot management (Cloudflare Bot Fight Mode or DataDome) that uses machine learning to detect non-human mouse movements and headless browser signatures.

---

## 3. The Scraping Attack

Competitors will scrape your `/api/products` endpoints constantly to monitor your pricing changes and inventory levels. While this isn't a direct financial theft, it costs you massive amounts of bandwidth and compute resources.

**The Implementation:**
- Implement a generous but firm rate limit on catalog read endpoints (e.g., 200 requests/minute per IP).
- **The "Honeypot":** Advanced production stores often inject hidden, invisible links in their HTML that normal users will never click, but scraper bots will automatically follow. If an IP requests the honeypot URL, automatically ban that IP at the firewall level for 24 hours.

---

## 4. Granular User-Based Limits

IP-based rate limiting is blunt. If 50 students on a college campus share the same IP address, aggressive IP limiting might block legitimate buyers.

**The Implementation:**
For authenticated endpoints (e.g., `/api/account/*`), rate limit based on the `user_id` inside the JWT token, rather than the IP address. This ensures that even if an attacker rotates their IP via a proxy network, they cannot brute-force a specific user's account or abuse their specific discount codes.

---

## AI Prompt — Architect Your Rate Limiting Defenses

```prompt
I am implementing rate limiting and bot defense for a production e-commerce store.

Tech Stack:
- Infrastructure: [e.g., Vercel / Cloudflare / AWS]
- Cache: [e.g., Upstash Redis]
- Backend: [e.g., Next.js Route Handlers]

Act as a Principal Edge Security Engineer:
1. Provide the exact Node.js/Redis (Upstash) code required to implement a strict rate limit of 5 requests per minute per IP on the `POST /api/checkout` endpoint to prevent Card Testing.
2. Outline the Cloudflare WAF rules I should configure to detect and block residential proxy networks used by Sneaker Bots during a flash sale.
3. Explain how to implement a sliding window rate limit based on an authenticated User ID (rather than an IP address) for a `/api/discounts/apply` endpoint to prevent brute-forcing promo codes.
4. Define the exact HTTP headers my APIs should return when a user is rate-limited, ensuring they align with REST best practices.
```

---

## Rate Limiting Checklist

- [ ] Strict rate limits (e.g., 5/min) deployed on all checkout and payment intent endpoints to prevent Card Testing
- [ ] Moderate rate limits deployed on cart mutation endpoints to mitigate inventory hoarding bots
- [ ] Cloudflare WAF (or equivalent) deployed with Bot Management heuristics to identify headless browsers and proxy networks
- [ ] User-based (JWT) rate limits applied to authenticated endpoints to prevent distributed brute-forcing
- [ ] `429 Too Many Requests` HTTP status codes correctly configured to return when limits are exceeded
