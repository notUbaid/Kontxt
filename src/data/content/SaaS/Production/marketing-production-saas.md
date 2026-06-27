---
title: Marketing
slug: marketing
phase: Phase 6
mode: production
projectType: saas
estimatedTime: 25-30 min
---

# Marketing

This module is here because most engineers building their own SaaS skip marketing entirely until they realize a great product with zero distribution gets zero users. You don't need to become a marketer — you need to understand the engineering-adjacent parts of marketing well enough to not waste effort, and to know which channels are worth instrumenting properly.

The goal isn't to make you a growth hacker. It's to keep you from either ignoring distribution completely, or burning months on a channel that was never going to fit your product.

---

## The Core Idea: Channel Fit Beats Channel Popularity

Every channel works for someone. Most don't work for you. The mistake isn't picking the "wrong" channel in some absolute sense — it's picking a channel that's mismatched to your product's actual sales motion, price point, and buyer behavior.

> ** Tip**
> Match your channel to how your buyer actually makes decisions. A $15/month tool with self-serve signup fits content marketing and SEO (buyers self-educate, then try it). A $50,000/year enterprise tool does not — that buyer needs a sales conversation, case studies, and outbound outreach, not a blog post.

---

## Decision Card: Channel Fit by Product Type

| Your Product | Typically Fits | Typically Doesn't Fit |
|---|---|---|
| Low price, self-serve, broad audience | SEO/content, paid ads, product-led virality | Enterprise sales outreach |
| Mid-price, small team buyer | Communities, partnerships, targeted content | Mass-market paid ads |
| High price, enterprise buyer | Outbound sales, case studies, conferences, referrals | SEO/content alone (too slow, wrong buyer) |
| Developer tool | Open source presence, technical content, developer communities (GitHub, Hacker News, dev Twitter/X) | Generic social media ads |

This table is directional, not exhaustive — but if you're investing in a channel that's a structural mismatch for your buyer, that's worth catching before you sink months into it.

---

## The Engineering Tasks Marketing Actually Needs From You

Marketing effectiveness depends on infrastructure you control. These are worth doing regardless of which channels you ultimately pursue.

- [ ] **UTM parameters on every campaign link**, so traffic sources are distinguishable in analytics instead of all landing in "direct" or "unknown"
- [ ] **A clean attribution path from ad click → signup → activation → paid conversion**, so you can tell which channel produces customers, not just clicks (see the Product Analytics module for the funnel side of this)
- [ ] **Fast-loading, SEO-correct landing pages** for any paid campaign, since slow pages waste ad spend on traffic that bounces before converting (see the SEO module)
- [ ] **A working referral or sharing mechanism**, if your product has natural virality potential — this is often more cost-effective than any paid channel, but only if the actual sharing flow is frictionless

> **️ Warning**
> Spending on paid ads before your attribution tracking works is spending blind. You'll generate clicks and signups but won't be able to tell which ad, audience, or channel actually produced a paying customer — meaning you can't tell what to scale up versus cut. Fix tracking before scaling spend, not after.

---

## Content Marketing: The Compounding Channel

Unlike paid ads, content marketing (blog posts, guides, comparison pages) compounds — a good piece written once can drive traffic for years. The tradeoff is speed: it's slow to start working, often taking months before meaningful organic traffic arrives.

**Best Practice Card — Content That Actually Converts**

```
Effective SaaS content usually falls into one of three categories:

1. "How to [task]" guides where your product is a natural part of
   the solution (not a thinly-disguised ad for your product)
2. Comparison pages ("[Your Product] vs [Competitor]") for buyers
   actively evaluating options
3. Use-case pages targeting a specific job-to-be-done your product
   solves, matching how your buyer actually searches

Avoid: generic "thought leadership" posts with no search intent
behind them and no clear connection to what your product does.
```

---

## Using AI for Marketing Work

AI is strong at drafting content quickly and at generating channel/messaging ideas to evaluate. It's weak at knowing your actual market — current competitor positioning, real search volume, and what your specific buyers respond to require real research, not the model's general knowledge.

**Prompt: Channel Fit Assessment**

```
My product: [one or two sentences]
Price point: [e.g., "$29/month per seat"]
Buyer: [who actually makes the purchase decision — an individual, a
        team lead, a procurement department, etc.]
Sales motion: [self-serve signup / sales-assisted / enterprise sales]

Based on these specifics, which 2-3 marketing channels are most
likely to fit my product, and which common channels should I
probably avoid given my price point and buyer type? Justify each
recommendation using the specific facts above, not generic "SaaS
marketing channels" advice.
```

> ** Why this prompt works**
> Forcing justification tied to your specific price point and buyer type filters out generic channel lists that would apply to any SaaS — the kind of advice that sounds reasonable but doesn't actually help you prioritize. This mirrors the same principle from the Retention and Product Analytics modules: ground every AI recommendation in your specific numbers and facts, not category-level patterns.

**Token efficiency note:** Use AI for channel strategy and content drafting, but verify actual market specifics (competitor pricing, current search volume, what messaging resonates) through real research — web search, talking to actual customers, looking at competitor sites directly — rather than trusting the model's general knowledge, which may be outdated or simply wrong about your specific niche.

---

## Validating AI's Marketing Output

- **Don't trust competitor comparisons drafted without current research.** Verify competitor pricing, features, and positioning directly before publishing a comparison page — an inaccurate comparison damages your credibility with exactly the buyers you're trying to win.
- **Check that draft content doesn't overclaim.** AI-drafted marketing copy sometimes states benefits more confidently than your product actually delivers ("instantly," "guaranteed," "the only tool that...") — these claims create support burden and trust problems later if they're not literally true.
- **Verify any cited statistic or "industry data point" before publishing it.** Models can generate plausible-sounding statistics that aren't real — never publish a number you haven't verified against an actual source.

---

## Quick Reference: Marketing Foundations Before Spending Money

1. Attribution tracking works end-to-end (click → signup → activation → paid)
2. Landing pages load fast and don't have basic SEO problems
3. Channel choice matches your actual buyer's decision-making process, not just what's popular
4. Any AI-drafted content or claims have been fact-checked against your actual product and real market data

---

## What's Next

With distribution strategy grounded in your actual buyer and verified channels, move to **Referral Systems** — a specific growth mechanism worth a dedicated look, since it can outperform every paid channel when implemented well.
