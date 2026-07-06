---
title: Usage Tracking
slug: usage-tracking
phase: Phase 6
mode: personal
projectType: internal-tool
estimatedTime: 10-15 min
---

# Usage Tracking

The Analytics module answered "is this tool achieving what I built it for" at a monthly, goal-level view. Usage Tracking is the finer-grained layer underneath that — which specific features are actually touched, by whom, and how often — used sparingly, and only where it changes a real decision.

---

## Ask First: Do You Actually Need This Module

For a solo user, you generally don't. You already know which features you use — you're the one clicking them. This module earns its place mainly once there's more than one person using the tool, or once a specific question from the Analytics module ("which feature is barely used?") needs a more precise answer than the monthly summary can give.

>  **Tip:** If you're the only user and nothing from the Analytics module raised a specific unanswered question, it's reasonable to skip building anything further here. Revisit this module later if a real question comes up — don't build tracking speculatively.

---

## The One Distinction Worth Making: Per-Feature, Not Per-Person (Usually)

If you do build this out, there's a meaningful design choice: track *what* is used, or track *who* uses *what*.

| Approach | When it's the right call |
|---|---|
| Feature-level counts only (no user attached) | Solo use, or a small team where individual attribution isn't the goal — you just want to know what's touched |
| Per-user tracking (who did what) | A small team where understanding individual adoption matters — e.g., confirming everyone's actually using the new tool, not reverted to the old process |

Per-user tracking is a bigger step — it means storing who-did-what, which has its own quiet privacy weight even inside a trusted small team. Only take it on if you have a specific reason (like the Beta Rollout module's adoption-confirmation goal) rather than by default.

> ️ **Warning:** Per-user usage tracking, even well-intentioned, can read as surveillance if introduced without being upfront about it — especially to teammates. If you add this, be transparent about what's tracked and why, the same way you'd want to know if it were tracked on you.

---

## Implementation: Reuse What You Already Have

If a specific question genuinely needs feature-level tracking that your existing data (record timestamps, report views) doesn't answer, the lightest addition is a single events table:

```
Events table: id, event_name, user_id (nullable if not per-user), created_at
```

That's sufficient. No need for a dedicated tracking service or SDK at this scale — this is the same principle from Analytics, applied one level deeper.

---

## AI Prompt: Add Targeted Feature Tracking

Only use this once you have a specific, named question.

```
Add lightweight usage tracking to answer this specific question: [e.g., "is the search feature actually being used, and by roughly how often"]

Requirements:
- A minimal events table: event name, [user_id if per-user tracking is genuinely needed], timestamp
- Log the event at the specific point in the code where [the feature] is used — don't add broad tracking across the whole app
- No tracking of anything beyond what's needed to answer this question
- Build a simple view/query to answer the question, reusing existing report/table components
```

Scoping the prompt to one named question, rather than "add usage tracking," is what keeps this from growing into a broader system than you actually need.

---

## Validating It

-  **Confirm it only tracks what you specified** — check the actual logged events don't capture more (extra fields, unnecessary context) than the question required
-  **Confirm it actually answers the question** you built it for — if it doesn't, the tracking was scoped wrong, not necessarily insufficient
-  **If per-user, confirm you've been transparent with any other users** about what's tracked

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Building this speculatively, with no specific question in mind | Effort spent on data nobody ends up using |
| Defaulting to per-user tracking without a specific reason | Adds unnecessary privacy weight for a solo/trusted-team tool |
| Tracking broadly "just in case" instead of one named question at a time | Turns a five-minute addition into a mini analytics system |
| Not being transparent with teammates about per-user tracking | Reasonable, well-intentioned tracking can still feel like surveillance if it's a surprise |

---

## Before You Move On — Checklist

- [ ] I confirmed there's a real, specific question this tracking answers — not built speculatively
- [ ] Per-user tracking (if used) has a genuine reason, not just a default choice
- [ ] Tracking captures only what's needed for the specific question, nothing extra
- [ ] Any teammates affected by per-user tracking know it exists and why

---

## What's Next

With visibility into what's actually being used, the next step is closing the loop with the people using the tool directly — user feedback.
