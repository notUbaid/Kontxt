---
title: Store Economics
slug: store-economics
phase: Phase 0
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Store Economics

If you write flawless code but your financial architecture is flawed, the business will scale itself into bankruptcy. 

In production e-commerce, **Store Economics** is the rigorous modeling of Unit Economics—understanding exactly how cash flows through a single order, accounting for every hidden fee, shipping zone variance, and return risk. 

---

## 1. The Unit Economics Waterfall

You must calculate the **Contribution Margin** of a standard order. This is the amount of cash left over to pay for marketing, salaries, and profit *after* the item is fulfilled.

**The Example Breakdown (A $100 Order):**
1. **Gross Revenue:** $100.00
2. **COGS (Cost of Goods Sold):** -$30.00 (The manufacturing cost of the item).
3. **Gateway Fee (Stripe):** -$3.20 (Typically 2.9% + 30¢).
4. **Fulfillment (Pick & Pack):** -$2.50 (What the 3PL charges to put the item in a box).
5. **Shipping Cost (FedEx/USPS):** -$8.00 (The actual carrier label cost).
6. **Return Allocation (Risk):** -$5.00 (If your return rate is 10%, you must subtract 10% of the COGS/Shipping risk upfront).

**The Result:** The Contribution Margin is **$51.30**. 
This is the single most important number in the business. It means your absolute maximum Customer Acquisition Cost (CAC) is $51.30. If you spend $52 on Facebook ads to acquire a customer, you are losing money on every sale.

---

## 2. Shipping Economics (The Silent Killer)

Shipping is the easiest way to destroy your margins.

**The Anti-Pattern:**
Offering universal "Free Shipping on All Orders" without a mathematical threshold. If a customer buys a $15 t-shirt and you pay $8 for shipping and $2 for fulfillment, your Contribution Margin is annihilated. 

**The Production Strategy (Threshold Engineering):**
You must set a Free Shipping Threshold that forces the customer to increase their Average Order Value (AOV) to protect your margins.
- **The Math:** If your target Contribution Margin is $40, and your average shipping cost is $8, you set the threshold at a cart value where the $40 margin is mathematically guaranteed (e.g., "Free Shipping over $75").
- **The UX:** The frontend must dynamically calculate the delta and display it prominently: "You are $15 away from Free Shipping!"

---

## 3. Cash Flow Cycle (The Working Capital Gap)

E-commerce is highly cash-intensive. You have to pay the factory for inventory long before the customer pays you.

**The Flow:**
1. Day 1: Pay factory $30,000 for 1,000 units.
2. Day 30: Inventory arrives at 3PL.
3. Day 35: You spend $5,000 on ads to sell the first 200 units.
4. Day 37: Stripe finally transfers the customer cash into your bank account.

**The Risk:** There is a 37-day gap where you are out $35,000. If you scale too fast and do not have a cash reserve (or favorable Net-30 payment terms with your factory), you will run out of working capital and go bankrupt, even if your store is technically profitable on paper.

---

## AI Prompt — Model Your Economics

```prompt
I am modeling the Unit Economics for a production e-commerce store to establish our baseline profitability targets.

Business Context:
- Target Product Price (AOV): [e.g., $85]
- Target COGS (Manufacturing): [e.g., $25]
- Fulfillment Model: [e.g., Domestic 3PL]

Act as a Principal Financial Analyst:
1. Build a strict Unit Economics Waterfall table for this $85 order. Factor in standard Stripe Gateway fees (2.9% + 30¢), estimated 3PL Pick/Pack fees ($3.00), average Zone 4 shipping costs ($8.50), and a 12% Return Risk Allocation.
2. Based on the resulting Contribution Margin, what is our absolute maximum allowable Customer Acquisition Cost (CAC) to break even on the first purchase?
3. Mathematically calculate the optimal "Free Shipping Threshold" we should implement to incentivize users to add a second item to their cart, protecting our margin.
```

---

## Store Economics Checklist

- [ ] Unit Economics Waterfall mapped out for the primary hero product
- [ ] Contribution Margin mathematically defined, establishing the absolute maximum CAC limit
- [ ] Free Shipping Threshold calculated to actively drive up Average Order Value (AOV)
- [ ] Stripe Gateway fees and 3PL Pick/Pack fees accounted for (avoiding hidden margin bleed)
- [ ] Working Capital Gap mapped out to ensure the business can survive the cash flow cycle of inventory purchasing
