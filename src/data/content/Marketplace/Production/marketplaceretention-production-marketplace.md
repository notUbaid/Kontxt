---
title: Retention
slug: retention
phase: Phase 6
mode: production
projectType: marketplace
estimatedTime: 15-20 min
---

# Retention

Getting someone to complete one transaction is the easy part â€” your launch checklist proved that path works. Retention is the harder question: does a buyer come back for a second purchase, and does a seller list a second item? A marketplace that only ever sees first-time transactions never builds the liquidity that makes it actually useful.

## The Decision You're Actually Making

Not "how do we get people to come back." It's: **which side of the marketplace is leaking first â€” buyers or sellers â€” and what's the actual reason, not the assumed one?**

Marketplaces have two distinct retention problems, not one. Solving the wrong side wastes effort on a problem that isn't actually your biggest leak.

## Buyer Retention vs Seller Retention Are Different Problems

| | Buyer retention | Seller retention |
|---|---|---|
| What makes them come back | Found something good, transaction was easy, trust was confirmed | Sold something, got paid reliably, listing process wasn't a hassle |
| What makes them leave | Couldn't find what they wanted, bad experience with a seller, payment friction | Item didn't sell, payout was slow/confusing, relisting felt like starting over |
| Where to look for the leak | Search/browse usage after first purchase, repeat purchase rate | Time between listings, listing abandonment rate, re-engagement after a sale |

> **âš ï¸ Warning:** Don't assume buyer churn and seller churn have the same root cause just because they're both "retention." A buyer who leaves because search didn't surface relevant items has nothing to do with a seller who leaves because payouts felt slow â€” treating them as one problem means your fix helps neither.

## Find the Actual Leak Before Designing a Fix

- What percentage of buyers who complete one purchase return within 30 days?
- What percentage of sellers who list once, list again within 30 days?
- Of buyers who don't return, did they search and find nothing, or did they never search again at all?
- Of sellers who don't relist, did their first item sell, or sit unsold?

> **âœ… Best Practice:** A seller whose first item never sold has a completely different problem than a seller whose item sold quickly and who simply never came back to list again. The first is a liquidity/demand problem; the second might be a UX friction problem in the relisting flow. Don't design a single "seller retention fix" without knowing which one you actually have.

## Decision: What to Build First

| Signal in your data | Likely fix to prioritize |
|---|---|
| Buyers search but find nothing relevant | Supply growth or search relevance â€” not a retention feature at all |
| Buyers found something but didn't return after purchase | Post-purchase experience â€” notifications, easy reorder, follow-seller |
| Sellers' items aren't selling | Demand-side problem â€” more buyers, better discovery, not a seller-facing fix |
| Sellers' items sell but they don't relist | Relisting friction â€” make posting a second item dramatically easier than the first |

> **ðŸ’¡ Tip:** "Make relisting one click" is one of the highest-leverage retention features for the supply side of a marketplace â€” a seller who already knows your platform works shouldn't have to fill out a full listing form from scratch a second time. Pre-fill from their previous listing and let them adjust, not start over.

## Notifications: The Cheapest Retention Lever You Likely Haven't Maximized

- Buyer gets notified when an item similar to a past purchase or search is newly listed
- Seller gets notified promptly when their item sells (this alone often drives the fastest relist)
- Seller gets a gentle nudge if a listing has had views but no sale, with a clear next action (lower price, improve photos)
- Neither side is over-notified to the point of disabling notifications entirely

> **âš ï¸ Warning:** It's easy to over-correct into notification fatigue. A user who mutes all notifications because you sent too many low-value ones loses access to the few high-value ones (sold! someone messaged you!) that actually drive retention. Be deliberately sparing â€” every notification should justify its own existence.

## Use AI to Diagnose Your Specific Retention Pattern

**Prompt â€” Retention Leak Analysis**
```
Here's my marketplace's retention data:
[paste: % of buyers returning within 30 days, % of sellers relisting 
within 30 days, and any data on whether non-returning users had 
successful or unsuccessful first transactions]

Based only on this data:
1. Which side (buyer or supply) has the bigger retention problem 
   right now?
2. Is this more likely a liquidity/discovery problem or a UX friction 
   problem, based on the pattern in the numbers?
3. What's the single highest-leverage thing to fix first, given this 
   is a personal project with limited time?

Don't suggest generic retention tactics â€” reason from the specific 
numbers provided.
```

> **ðŸ’¡ Token Efficiency:** Bring real numbers, even rough ones, rather than asking for general retention advice â€” vague prompts produce a generic "send more emails, add gamification" list that doesn't tell you what's actually wrong with your specific marketplace.

## Validate Before Investing Further

- You know your actual buyer and seller 30-day return rates, not a guess
- You've identified which side is leaking more severely
- You've distinguished a liquidity problem from a friction problem before building a fix
- Any new notification you add has a clear, specific reason tied to a known retention leak

## Common Mistakes

- Building generic "engagement" features (badges, streaks) before understanding which specific leak exists
- Treating buyer and seller retention as the same problem with the same fix
- Adding notifications without limit until users disable them entirely
- Fixing relisting friction when the real problem is that items aren't selling at all
- No baseline retention numbers tracked, making it impossible to know if any fix actually worked

## Quick Reference

| Diagnose first | Common high-leverage fixes | Avoid building prematurely |
|---|---|---|
| Buyer vs seller leak, separately | One-click relisting from past listing | Loyalty points / gamification systems |
| Liquidity problem vs friction problem | "Item sold" instant notification | Complex personalized recommendation engine |
| First-transaction outcome (sold vs unsold) | Similar-item alerts for buyers | Aggressive re-engagement email sequences |
| Notification fatigue risk | Sparse, high-value-only notifications | Referral programs (separate module, separate problem) |

## What's Next

With your retention leak diagnosed, the next module covers Referral Programs â€” a tool for growth, not retention, and one that only works well once you actually know retention is solid enough that new users you acquire will actually stick.

