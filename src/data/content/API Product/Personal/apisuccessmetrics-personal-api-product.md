---
title: Success Metrics
slug: success-metrics
phase: Phase 0
mode: personal
projectType: api-product
estimatedTime: 10 min
---

# Success Metrics

Without a definition of success written down now, "is this project working?" quietly gets answered by vibes — and vibes trend negative the moment building gets hard, regardless of whether the project is actually going fine. This module gives you something more honest to check against than a feeling.

## Pick Metrics That Match Why You're Building This

Not every personal API product is being built for the same reason. Your metrics should match your actual motive, not a generic "growth" template that doesn't apply to a solo learning project.

| If you're building this to... | Then success looks like... |
|---|---|
| Learn API design | You can explain every design decision and why you made it — usage is irrelevant |
| Add a portfolio piece | Clean docs, a working demo, code you'd be comfortable showing an interviewer |
| Solve your own problem | You're actually using it yourself, regularly, instead of the old workaround |
| Get real external users | At least one person who isn't you calls it, unprompted |
| Test a business idea | Someone would plausibly pay for this, even if no one has yet |

Pick the one closest to your real reason — not the most impressive-sounding one.

## Write 2–3 Concrete Metrics

Vague goals like "make it good" or "get some users" can't fail, which means they also can't succeed. Make yours checkable.

```
By [milestone — e.g. "Phase 4 complete" or "one month after launch"]:

1. [Specific, checkable outcome]
2. [Specific, checkable outcome]
3. [Specific, checkable outcome — optional]
```

Examples of checkable outcomes: "I can make a full request-response cycle work end to end without checking my own notes," "I've documented every endpoint well enough that I don't need to explain it verbally," "at least one person other than me has made a successful call."

> **Tip:** A metric you can check in under a minute is a good metric. If verifying your own success requires a spreadsheet, it's too complicated for a personal project — simplify it.

## Personal Mode: Protect Against the Wrong Failure Signal

The most common false failure signal on personal projects isn't low usage — it's comparison to production APIs that took a team months to build. Your success metrics exist partly to prevent that comparison from being the thing that makes you quit. If your metric is "usable by me and one friend," a stalled adoption number isn't failure. Check your written metric, not your mood.

## Vanity Metrics to Avoid

- **Raw request count**, with no context — ten requests from you debugging looks identical to ten requests from real interest.
- **Lines of code or endpoint count** — more isn't better; you defined that in **Feature Prioritization**.
- **"It's done"** — not a metric. Done according to what? Tie it to the checkable outcomes above.

## AI Prompt: Make Vague Goals Checkable

```
Here's what I want to be true when I consider this project a success:
"[paste your rough, possibly vague goal]"

Rewrite this as 2-3 specific, checkable outcomes I could verify in under a minute each,
without requiring external users unless I've specifically said I want them.
Flag anything in my original goal that's actually a vanity metric in disguise.
```

## Before You Continue

- [ ] I have 2–3 specific, checkable success outcomes written down
- [ ] They match my actual reason for building this, not a generic template
- [ ] None of them require something outside my control (like guaranteed external adoption) to be the sole measure of success

When all three are checked, move to **MVP Scope**.
