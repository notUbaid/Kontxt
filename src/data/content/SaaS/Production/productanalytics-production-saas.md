---
title: Product Analytics
slug: product-analytics
phase: Phase 6
mode: production
projectType: saas
estimatedTime: 25-30 min
---

# Product Analytics

You set up event tracking before launch. Now you have actual data flowing — real users, real behavior, real drop-off points. Product Analytics is about turning that raw event stream into decisions: what to fix, what to build, what to ignore.

The shift from the earlier Analytics Setup module is important: that module was about instrumentation — making sure the right events fire correctly. This module is about interpretation — what the numbers actually mean, and what mistakes founders make when reading them.

---

## The Core Idea: Most Metrics Lie Without Context

A 60% signup-to-activation rate sounds bad in isolation. It might be excellent for a complex B2B tool, or alarming for a simple consumer app. Numbers without a comparison point — to your own past performance, to a cohort, to a benchmark — don't tell you anything actionable.

The fix is always the same: **compare the same metric across two slices** (this week vs. last week, paid users vs. free, mobile vs. desktop) rather than staring at a single absolute number and guessing whether it's good.

> [!TIP]
> The most useful question in analytics is rarely "is this number good?" It's "did this number change, and what changed right before it did?" Correlate metric shifts with your own deploy log, pricing change, or marketing push before assuming something organic happened.

---

## The Three Metrics That Actually Matter Early

Resist dashboard sprawl. At early stage, almost everything reduces to three questions.

**Decision Card — Core Metrics Framework**

| Metric | Question It Answers | Common Mistake |
|---|---|---|
| Activation Rate | Of people who sign up, what % reach real value? | Confusing "signed up" with "activated" — these are not the same milestone |
| Retention Curve | Of people who activate, what % come back in week 2, 4, 8? | Looking only at day-1 retention, which is nearly meaningless on its own |
| Conversion to Paid | Of active users, what % become paying customers? | Calculating this against *all* signups instead of *activated* users, which makes the number meaningless |

Everything else — feature usage breakdowns, funnel micro-steps, session duration — is useful later, once these three core numbers reveal where the actual problem lives.

---

## Reading a Retention Curve Correctly

Retention curves almost always drop sharply at first, then flatten. The flattening point matters more than the initial drop.

```
100% |●
     |  ●
 75% |    ●
     |      ●●
 50% |         ●●●●●●●●●●●●●●●●  ← This flat line is what matters
     |
 25% |
     |________________________
      D1  D7  D14  D30  D60  D90
```

> [!NOTE]
> A curve that flattens at 40% and stays flat is healthier than one that starts at 70% and keeps sliding toward zero. The flattening point represents your **retained core** — the users who genuinely found ongoing value. A still-declining curve at day 90 means you haven't found that core yet, regardless of how good day-1 numbers looked.

---

## Common Misreadings to Avoid

** Survivorship bias in feature usage data.** If you look only at users who are still active and see "80% use Feature X," you're not learning whether Feature X drives retention — you're looking at a population that already survived. Compare feature usage between users who stayed and users who churned to see if it's actually correlated with retention, not just present in current usage.

** Confusing correlation with causation in cohort comparisons.** If users who complete onboarding step 3 retain better, that doesn't prove step 3 *causes* retention — engaged users may simply be more likely to both finish onboarding and stick around for unrelated reasons. Be especially cautious before redesigning a flow based on a single correlation.

** Small sample sizes producing noisy percentages.** "Conversion jumped from 10% to 25%!" means very little if that's 2 out of 20 users versus 5 out of 20. Don't make roadmap decisions off small-n data points — wait for a sample size where the swing isn't just noise.

---

## Using AI to Interpret Analytics Data

AI is useful for spotting patterns across a dataset faster than manual inspection, and for generating hypotheses about *why* a pattern exists — which you then need to verify, not accept as fact.

**Prompt: Cohort and Funnel Analysis**

```
Here is my activation funnel data broken down by signup week:

[paste a table: week, signups, activated, retained at day 30]

1. Identify which week(s) show meaningfully different performance
   from the others — call out if a difference might just be small
   sample noise rather than a real signal.
2. Suggest 2-3 hypotheses for what might explain any real differences
   you find (e.g., a marketing channel change, a product change,
   seasonality).
3. For each hypothesis, suggest what additional data I'd need to
   confirm or rule it out.
```

> ** Why this prompt works**
> Explicitly asking the model to distinguish real signal from noise prevents it from over-interpreting small fluctuations as meaningful trends — a common failure mode when feeding raw numbers to an LLM without that guardrail. Requiring confirmable hypotheses, rather than confident conclusions, keeps you doing the actual verification instead of trusting a plausible-sounding story.

**Token efficiency note:** Bring summarized data (weekly aggregates, cohort tables), not raw event-level exports. A model reasoning over a clean 10-row table produces sharper analysis than one wading through thousands of raw rows — and costs a fraction of the tokens.

---

## Validating AI's Analysis

- **Treat hypotheses as hypotheses, not conclusions.** If AI says "the drop in week 6 was likely caused by your pricing change," verify the actual timeline — did the pricing change ship in week 6, or is the model just pattern-matching a plausible story to a date you mentioned earlier in the conversation?
- **Re-derive any percentage that matters before acting on it.** Quick sanity-check the math yourself (or in your analytics tool directly) before making a decision based on an AI-summarized number — arithmetic errors on dense tables happen.
- **Don't let AI choose your "north star metric" for you.** That decision depends on judgment about your specific business model that the model doesn't have visibility into — use it to analyze the data you give it, not to decide what matters.

---

## Quick Reference: A Healthy Weekly Analytics Habit

1. Check activation rate — did it move, and why?
2. Check retention curve — is the flattening point holding steady or sliding?
3. Check conversion-to-paid — calculated against activated users, not raw signups
4. Cross-reference any unusual shift against your deploy log and marketing calendar before assuming a cause
5. Resist adding a new dashboard widget unless it's answered a real question you had this week

---

## What's Next

With a clear read on activation and retention, move to **Retention** — the deeper module on what actually keeps users coming back, and the product and engagement strategies that move the flattening point of your curve upward.
