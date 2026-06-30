---
title: Growth Analytics
slug: growth-analytics
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Growth Analytics

Basic analytics (like Google Analytics) will tell you *how many* people visited your store. Growth Analytics tells you *who* is buying, *why* they are buying, and exactly how much you can afford to spend to acquire them.

At production scale, if you cannot calculate your unit economics in real-time, you cannot scale your advertising spend safely.

---

## 1. The LTV:CAC Ratio (The Golden Metric)

The health of an e-commerce business is defined by a single ratio: **Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC)**.

- **CAC (Customer Acquisition Cost):** If you spend $1,000 on Facebook ads and acquire 50 customers, your CAC is $20.
- **LTV (Lifetime Value):** If the average customer spends $100 over their entire relationship with your brand, and your gross margin is 50%, your LTV is $50.
- **The Ratio:** In this example, your LTV:CAC is $50:$20, or **2.5:1**.
- **The Target:** A healthy production e-commerce store aims for a **3:1** ratio. If it is 1:1, you are losing money. If it is 5:1, you are not spending enough on marketing to capture market share.

**The Implementation:**
You must build a real-time dashboard (using a BI tool like Looker, Metabase, or Tableau connected to your Postgres replica) that continuously calculates CAC from your marketing APIs (Meta/Google) against the real gross profit generated in your database.

---

## 2. Contribution Margin (Unit Economics)

Revenue is a vanity metric. Gross Profit is a vanity metric. Contribution Margin is the truth.

**The Math:**
To scale, you must know the exact contribution margin of every single order.
`Order Total - (COGS + Shipping Cost + Payment Gateway Fees + Pick/Pack Fees + Return Rate Allocation) = Contribution Margin`

If you sell a $50 shirt, and the COGS (Cost of Goods Sold) is $15, you might think you made $35. But after $8 shipping, a $1.75 Stripe fee, a $2.00 warehouse fee, and a $3.00 return risk allocation, your actual Contribution Margin is $20.25.
This means your maximum allowable CAC to break even on the first purchase is $20.25.

---

## 3. A/B Testing Infrastructure (Statistical Significance)

You cannot guess what will improve conversion. You must test it scientifically.

If you want to change the "Add to Cart" button from Black to Green, you must run an A/B test.

**The Implementation:**
Use a tool like **Optimizely**, **VWO**, or **GrowthBook**.
- The tool randomly assigns 50% of your traffic to the Black button (Control) and 50% to the Green button (Variant).
- **The Pitfall:** Do not look at the results after 1 day and declare the Green button a winner because it has 5 more clicks. You must wait until the test reaches **Statistical Significance** (usually 95% confidence), meaning the math proves the result is not due to random variance. This requires a minimum sample size of traffic.

---

## 4. Multi-Touch Attribution

Customers rarely buy on their first visit. 
1. They see a Facebook ad on Monday on their phone.
2. They click a Google Search ad on Wednesday on their laptop.
3. They receive a promotional email on Friday and finally purchase.

Which channel gets credit for the sale? 
- If you use "Last-Click Attribution", the Email gets 100% of the credit, and you might accidentally turn off your Facebook ads, causing your entire funnel to collapse.
- **The Implementation:** Implement Data-Driven or Multi-Touch Attribution modeling in your analytics platform to distribute fractional credit to all touchpoints, giving you a true picture of how your marketing channels work together.

---

## AI Prompt — Build Your Growth Data Engine

```prompt
I am establishing the growth analytics infrastructure for a production e-commerce store to scale our ad spend safely.

Tech Stack:
- Database: [e.g., Postgres Read Replica]
- BI Tool: [e.g., Metabase / Looker]
- A/B Testing: [e.g., GrowthBook / Vercel Edge Config]

Act as a Principal Data Scientist:
1. Write the SQL query required to calculate the exact Contribution Margin of an order, factoring in COGS, dynamic Shipping costs, and a fixed 2.9% + 30¢ Stripe fee.
2. Explain how to architect an A/B testing framework at the CDN Edge (using Next.js Middleware or Vercel Edge Config) to ensure that split-testing the homepage does not ruin our Core Web Vitals (LCP/CLS).
3. Outline the mathematical requirements for reaching 95% Statistical Significance in an A/B test. How do we calculate the required sample size before starting the test?
4. Define the architecture for a daily automated report that calculates our exact LTV:CAC ratio by joining database revenue metrics with Meta Ads API spend data.
```

---

## Growth Analytics Checklist

- [ ] LTV:CAC ratio dashboard built using real-time database and marketing API inputs
- [ ] Contribution Margin math strictly defined in the database (including COGS, shipping, and gateway fees)
- [ ] A/B Testing infrastructure (e.g., GrowthBook) deployed at the Edge to prevent UI flickering
- [ ] Statistical Significance thresholds established for all conversion rate experiments
- [ ] Multi-touch attribution modeling implemented to accurately value top-of-funnel ad spend
