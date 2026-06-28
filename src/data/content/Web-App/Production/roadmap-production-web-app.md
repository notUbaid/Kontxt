---
title: Roadmap
slug: roadmap
phase: Phase 6
mode: production
projectType: web-app
estimatedTime: 25–35 min
---

# Roadmap

You have shipped.

Now the hardest engineering skill kicks in: deciding what to build next — and what not to build.

A roadmap is not a feature list. It is a prioritisation framework. Without one, you will build whatever feels urgent, whoever asks loudest wins, and your codebase will accumulate features nobody uses while the problems that actually matter go unsolved.

---

## What a Roadmap Actually Does

A roadmap answers three questions continuously:

1. **What do we know?** — What is the current state of the product and users?
2. **What do we believe?** — What hypotheses are we testing?
3. **What are we doing about it?** — What are we building, and in what order?

Notice that features are the last thing on the list. Features are the answer to a problem. If you do not start with the problem, you are guessing.

---

## The Post-launch Priority Framework

In the first 30–90 days after launch, your priorities should follow this order — strictly.

```
1. STABILITY    Fix what is broken
2. RETENTION    Make existing users successful
3. ACQUISITION  Bring in more users
4. EXPANSION    Build more features
```

Most founders and new engineers reverse this. They jump to acquisition and new features before their existing users are succeeding. The result is a leaky bucket: new users arrive, experience the same rough edges as the first users, and leave.

Fix the bucket before filling it.

---

## Building Your First Roadmap

A roadmap needs three inputs before it can be useful:

### Input 1 — User Feedback

What are real users saying, struggling with, or asking for?

Collect this from:
- Direct conversations with early users (the highest-signal source)
- Support emails and messages
- Session recordings (PostHog, Hotjar)
- In-app feedback widgets
- App Store reviews (if applicable)
- Social mentions

> **Do not skip direct conversations.** Reading support tickets tells you what broke. Talking to users tells you why they almost did not sign up, what they wished worked differently, and what they are actually trying to accomplish. These are different things.

### Input 2 — Usage Data

What are users actually doing inside your app?

Look at:
- Which features are used most?
- Where do users drop off in the core flow?
- What pages have high exit rates?
- What actions do retained users take in their first session that churned users do not?

```sql
-- Example: Find the most common last action before a user churns
-- (users active in week 1 but not week 2)
SELECT
  e.event_name,
  COUNT(*) as count
FROM events e
JOIN users u ON u.id = e.user_id
WHERE u.created_at > NOW() - INTERVAL '30 days'
  AND u.id NOT IN (
    SELECT DISTINCT user_id FROM events
    WHERE created_at > NOW() - INTERVAL '7 days'
  )
GROUP BY e.event_name
ORDER BY count DESC
LIMIT 10;
```

### Input 3 — Business Metrics

What does the data say about the health of the product?

Key metrics to review before setting roadmap priorities:

| Metric | What It Tells You |
|---|---|
| Signup to activation rate | Is your onboarding working? |
| Day 7 retention | Do users find lasting value? |
| Feature adoption rates | Which features are actually used? |
| Support ticket topics | Where is the product failing users? |
| Conversion rate (free → paid) | Is the value proposition landing? |

---

## Roadmap Structure

A useful roadmap has three time horizons. The further out you go, the less specific you should be.

### Now (current sprint / 2 weeks)
Specific, committed, engineering-ready items. Every item here should have:
- A clear problem statement
- A defined success metric
- An owner
- An estimated size

### Next (next 1–2 months)
Prioritised and reasonably scoped, but not yet fully specified. Will be refined before engineering begins.

### Later (3–6 months)
Directional themes and strategic bets. Not commitments. These change as you learn more.

> **Anti-pattern:** Treating your "Later" column as a commitment. It is a hypothesis. Communicate this clearly to stakeholders — including yourself.

---

## Prioritisation Methods

Two frameworks are worth understanding. Use whichever fits your current decision.

### RICE

Best for comparing features or projects with different reach and effort levels.

```
Score = (Reach × Impact × Confidence) / Effort

Reach:      How many users affected per month?
Impact:     How much does this move the needle? (1 = minimal, 3 = massive)
Confidence: How sure are you? (0.5 = low, 1.0 = high)
Effort:     Person-weeks of engineering work
```

Higher score = higher priority.

RICE is useful when you have enough data to make reasonable estimates. Early post-launch, you often do not — use it directionally, not precisely.

### Impact vs Effort Matrix

Best for quick triage when you have a long backlog and limited time.

```
High Impact / Low Effort   → Do first (quick wins)
High Impact / High Effort  → Plan carefully (major bets)
Low Impact / Low Effort    → Do if nothing else exists (fill time)
Low Impact / High Effort   → Eliminate (traps)
```

The most dangerous quadrant is **Low Impact / High Effort**. These items feel like they should exist, take months to build, and move nothing that matters.

---

## The Feature Request Trap

After launch, you will receive feature requests. Some from users. Some from investors. Some from yourself.

The default answer to a feature request is: **not yet.**

Before adding anything to your roadmap, answer these questions:

**Is this a problem or a solution?**
Users request solutions. Engineers build for problems. "I want a CSV export" is a solution. The underlying problem might be "I cannot share data with my team." There may be a better solution.

**How many users have this problem?**
One vocal user is not signal. Five users with the same problem, described in the same terms, is signal.

**What happens if we do not build this?**
If the answer is "nothing much," deprioritise it. If the answer is "users churn," prioritise it.

**What are we not building if we build this?**
Every feature you build has an opportunity cost. The right question is not "should we build X?" but "should we build X instead of Y?"

---

## Technical Debt on the Roadmap

Technical debt belongs on your roadmap.

Not everything. Not a comprehensive refactor. But the specific technical issues that are actively slowing down feature development or creating reliability risk deserve explicit prioritisation — not a vague intention to "clean things up eventually."

How to decide what debt to address:

| Type | Action |
|---|---|
| Debt that is causing production incidents | Fix immediately, above feature work |
| Debt that slows down every new feature in that area | Schedule in the current quarter |
| Debt that is annoying but not slowing things down | Add to Later column |
| Debt that bothers you aesthetically but has no real impact | Ignore |

> **Rule:** If a piece of technical debt is not actively hurting velocity, reliability, or security, it is not priority. Premature refactoring is as wasteful as premature optimisation.

---

## AI Prompt — Roadmap Prioritisation

Use this when you have a backlog of ideas and need to triage them.

```
You are a senior product engineer helping me prioritise my post-launch roadmap.

My web app:
- Core purpose: [one sentence]
- Current user count: [rough number]
- Key business metric I am optimising for: [e.g. paid conversions, DAU, activation rate]

Current data:
- Signup to activation rate: [%]
- Day 7 retention: [%]
- Top 3 support topics: [list]
- Most used feature: [name]
- Least used feature: [name]

User feedback themes I am hearing:
[List 3–5 recurring themes from user conversations or support]

My current backlog (unordered):
[List your feature ideas, fixes, and improvements]

Help me:
1. Identify which items address retention vs acquisition vs expansion
2. Flag any items that are solutions in search of a problem
3. Rank the top 5 items by expected impact on [your key metric]
4. Identify anything missing from this list given the data I have shared

Be direct. I want a prioritised list with reasoning, not a framework lecture.
```

> **After receiving output:** The AI does not know your users. Use its output as a structured second opinion, not a directive. Any item it ranks highly should be validated against real user conversations before committing engineering time.

---

## AI Prompt — Feature Scoping

Use this once an item is prioritised and ready to be specified.

```
You are a staff engineer helping me scope a feature before development begins.

My web app: [brief description]
Tech stack: [stack]

Feature to scope: [feature name and one-sentence description]

The user problem it solves: [describe the problem, not the solution]
Who has this problem: [user segment]
How we know this is a real problem: [evidence — user quotes, support tickets, data]

Help me define:
1. The minimum viable version of this feature (what is the smallest thing that solves the problem?)
2. The edge cases and failure modes I need to handle
3. The data model changes required (if any)
4. The API changes required (if any)
5. The success metric — how will I know this feature is working?
6. What I should explicitly NOT include in v1

Flag any assumptions I seem to be making that I should validate before building.
```

---

## Validation Checklist

**Foundation**
- [ ] You have spoken directly to at least 5 users since launch
- [ ] You have session recordings or usage data from real users
- [ ] Your top 3 support topics are documented
- [ ] Your current activation rate is known and measured

**Roadmap structure**
- [ ] Now / Next / Later columns exist somewhere (Linear, Notion, a spreadsheet)
- [ ] Every "Now" item has a clear problem statement and success metric
- [ ] "Later" items are framed as hypotheses, not commitments
- [ ] Technical debt items with real impact are explicitly included

**Prioritisation**
- [ ] Every item in "Now" addresses stability, retention, or a known user problem
- [ ] No items in "Now" are features requested by a single user
- [ ] The opportunity cost of each "Now" item has been considered
- [ ] At least one item on the roadmap reduces technical risk or improves reliability

**Process**
- [ ] Roadmap is reviewed and updated at least every 2 weeks
- [ ] New feature requests have a triage process before entering the backlog
- [ ] You have a way to communicate roadmap status to users (changelog, public roadmap, email)

---

## Communicating Your Roadmap

You do not owe your users a detailed public roadmap. But you do owe them honesty about where the product is going.

Options from lowest to highest commitment:

**Changelog** — What shipped. No commitment. Builds trust by demonstrating momentum.

**Public roadmap** — What is planned. Moderate commitment. Attracts users who care about future features. Creates expectation risk if priorities shift.

**Direct user updates** — Email or message users when something they requested ships. High impact, low effort. The most underused tool in early-stage products.

> A user who feels heard becomes an advocate. A user who submitted feedback and never heard back becomes a critic. Close the loop.

---

## What Good Looks Like at 90 Days Post-launch

Use this as a benchmark:

- Day 7 retention is trending upward week over week
- Your top 3 support topics from launch week are resolved
- You have shipped at least one meaningful improvement based on direct user feedback
- Your activation rate has improved by at least 10 percentage points since launch
- You have cut or deprioritised at least two items from your original backlog that data showed were low value
- You know your riskiest technical debt and have a plan for it

If you can check all six, your post-launch process is working.

If you cannot, the roadmap is not the problem — the inputs are. Go back to talking to users and reviewing the data.
