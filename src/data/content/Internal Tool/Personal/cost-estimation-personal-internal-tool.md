---
title: Cost Estimation
slug: cost-estimation
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 15-20 min
---

# Cost Estimation

An internal tool built solo has one job: solve your problem without becoming a second problem. The most common way that happens is a surprise bill from a service you forgot was metered.

This module gets you to a real number — what this tool will cost you per month — before you write a line of implementation code.

---

## Why This Matters More Than It Seems

Internal tools have a specific cost trap: **low usage, but not zero usage.**

You're not building for 10,000 users, so you assume cost isn't a concern. But internal tools often call metered services in a tight loop — an AI API on every action, a database query on every page load, a cron job every five minutes — and low user count doesn't mean low request count.

> **Reality check:** A tool used by exactly one person (you) can still rack up thousands of API calls a month if it polls, retries, or calls an LLM per interaction. Usage-based pricing cares about *requests*, not *users*.

---

## The Four Cost Categories

Every internal tool's cost lives in one of these buckets. Estimate each separately — lumping them together is how surprises hide.

### 1. Compute / Hosting
Where your backend and frontend actually run.

### 2. Data
Database, object storage, vector storage if you're doing RAG or search.

### 3. Third-Party APIs
LLM providers, auth providers, email/SMS, external data APIs.

### 4. Peripheral Services
Domain, monitoring, error tracking, CI/CD minutes.

---

## Personal Mode Default: Stay at $0 Until You Can't

For a solo internal tool, the goal isn't "cheap infrastructure." It's **zero infrastructure cost** until a specific, named constraint forces you off the free tier. Most internal tools never hit that constraint.

| Category | Free-tier-friendly default | When you'd outgrow it |
|---|---|---|
| Hosting | Vercel / Render / Railway free tier | Sustained traffic beyond hobby limits, background workers |
| Database | Supabase / Neon free tier (Postgres) | >500MB data or connection limits under concurrent use |
| Auth | Provider's built-in auth (Supabase Auth, Clerk free tier) | Need for SSO/enterprise features |
| LLM calls | Provider free/trial credits, or a cheap small model | Regular daily use pushes past trial credits |
| Monitoring | Free tier of Sentry / built-in platform logs | Rarely, for a single-user internal tool |

If your stack fits entirely inside this table, your realistic monthly cost is **$0–$5**, and this module is mostly about making sure it stays that way.

---

## The Cost Driver Most Beginners Miss: LLM API Calls

If your internal tool touches an LLM at all — summarization, classification, a chat interface, data extraction — this is very likely your **only real variable cost.** Hosting and databases are usually flat or free at internal-tool scale. AI APIs are billed per token, every time, forever.

**Estimate it like this:**

1. Identify every place in your tool that will call an LLM.
2. Estimate calls per day realistically (not "if I used it constantly" — how you'll *actually* use it).
3. Estimate average input + output tokens per call.
4. Multiply by the provider's per-token price.
5. Multiply by 30 for a monthly figure.

**Example — a personal internal tool that summarizes daily reports:**

| Variable | Estimate |
|---|---|
| Calls per day | 5 |
| Avg input tokens | 2,000 |
| Avg output tokens | 400 |
| Days per month (realistic use) | 20 |
| Monthly calls | 100 |

At most current small-model pricing tiers, 100 calls of this size lands well under $1/month. The number matters less than the habit of calculating it — **never assume, always compute.**

> ️ **Warning:** If your tool calls an LLM on every keystroke, every page load, or inside a loop (e.g., processing 500 rows one-by-one), your real usage is 10–100x higher than your mental estimate. Batch requests where possible instead of calling per-item.

---

## AI Prompt: Generate Your Cost Estimate

Use this once you've decided on a stack. It forces a structured, checkable estimate instead of a vague guess.

```
I'm building a personal internal tool. Here's my stack and expected usage:

- Hosting: [e.g., Vercel free tier]
- Database: [e.g., Supabase Postgres free tier]
- LLM provider/model: [e.g., Claude Haiku / GPT-4o-mini]
- Expected LLM calls per day: [number]
- Average tokens per call (input/output): [estimate]
- Other metered services: [list any]
- Expected usage pattern: [who uses it, how often, roughly how many actions/day]

Give me:
1. A monthly cost estimate broken down by service
2. Which service is most likely to become my actual cost driver
3. The specific usage threshold at which I'd need to upgrade from a free tier
4. One way I could reduce cost without reducing functionality
```

**Why this prompt works:** it forces the model to break costs down per-service instead of giving a single vague number, and it asks for the *threshold* — the actual trigger point for paying — which is the number you should actually track, not a generic "watch your usage" reminder.

---

## Validating the AI's Estimate

AI cost estimates are frequently wrong in one specific direction: **they underestimate token counts** for real-world prompts, especially once you add system prompts, retrieved context, or conversation history.

Before trusting an estimate:

-  Check the *current* pricing page for your provider — token prices change, and older training data may cite outdated rates
-  Confirm whether the estimate included system prompt tokens, not just your "message"
-  If using RAG or retrieved context, add that token count explicitly — it's easy to forget in a rough estimate
-  Ask "what's the worst-case, not average-case, monthly cost?"

>  **Tip:** Don't estimate once and forget it. Set a calendar reminder to check actual usage after your first real week of use. Estimates are a starting point, not a guarantee.

---

## Setting a Real Safety Net

Estimation only protects you if paired with an actual limit. For a personal project, don't rely on remembering to check a dashboard.

**Do these three things once, in this order:**

1. **Set a billing alert** at your platform/provider (most support this — set it at 2x your estimate, not 10x)
2. **Set a hard spend cap** where the provider allows it (some LLM providers support hard usage limits, not just alerts)
3. **Check your estimate against your first real invoice** — this is the only way to catch a bad estimate before it compounds

> ️ **Warning:** Alerts notify you after the charge often occurs, not before. A hard cap is the only mechanism that actually prevents overspend. Use one wherever the provider offers it.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Estimating cost per user instead of per request | Internal tools have few users but can have many requests per user |
| Ignoring egress/bandwidth fees | Free compute tiers often meter outbound data separately |
| Forgetting background jobs (cron, webhooks) | These run whether or not you're actively using the tool |
| Using a large/expensive model for a simple task | Classification, extraction, and summarization rarely need your most capable model |
| Never revisiting the estimate after launch | Real usage patterns almost always differ from planning-stage assumptions |

---

## Before You Move On — Checklist

- [ ] I've listed every metered service my tool will touch
- [ ] I've calculated a realistic monthly LLM cost, not a guess
- [ ] I know the specific free-tier threshold I need to stay under for each service
- [ ] I've set at least one billing alert or hard cap
- [ ] I've chosen the cheapest model that meets my accuracy needs, not the most capable one available

---

## What's Next

With a cost estimate in hand, you can now make an informed stack decision without discovering the price tag after you've already built on top of it. The next step is locking in the specific architecture choices this estimate was based on.
