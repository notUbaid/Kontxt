---
title: User Documentation
slug: user-documentation
phase: Phase 5
mode: personal
projectType: internal-tool
estimatedTime: 15-20 min
---

# User Documentation

Even a tool built entirely for yourself benefits from documentation — you will forget why you built something a certain way, or how an edge case is supposed to be handled, faster than you expect. If this tool has even one other user, documentation is the difference between "ask me every time" and actually saving time.

---

## Write for the Audience You Actually Have

Before writing anything, be honest about who this is for:

| Audience | What documentation actually needs to cover |
|---|---|
| Just you | A short reference for things you'll forget — non-obvious workflows, why a weird decision was made, how to recover from known failure modes |
| You + a small team | Enough for someone else to use the tool without asking you directly for common tasks |
| You + occasional outside users (a contractor, family member for something like a small business tool) | Simple, task-focused instructions — assume zero context about how the tool was built |

Don't write documentation sized for a public product's user base. Match the effort to the real audience.

---

## What's Actually Worth Documenting

Skip a full feature-by-feature manual. Focus on:

- **Non-obvious workflows** — anything that isn't self-explanatory from just using the UI (a specific order of operations, a setting that affects other things unexpectedly)
- **Known limitations** — things the tool deliberately doesn't handle (from decisions made across Phase 2/3), so nobody wastes time assuming it should
- **Recovery steps** — what to do when something goes wrong that you already anticipated (a stuck automation, a failed import) — this doubles as a lightweight version of the backup/restore runbook from earlier, aimed at the user rather than the operator
- **Access/login instructions** — especially if there's any team member who isn't you

>  **Tip:** If you find yourself explaining the same thing to the same person more than once, that's the strongest possible signal of what belongs in the documentation. Let real repeated questions drive the content, not a feature checklist.

---

## Format: Match the Effort to the Audience

For a personal-mode internal tool, a single well-organized document usually beats a full documentation site — the setup cost of a dedicated docs platform is rarely justified here.

- **Just you:** a `NOTES.md` in the repo, or even comments near the relevant code, is often enough
- **Small team:** a shared doc (Google Doc, Notion page) that's easy for you to update without a deploy
- **Occasional outside users:** a short, simple page or PDF — task-focused ("How to submit a request"), not a reference manual

---

## AI Prompt: Generate the Documentation

```
Write user documentation for my internal tool, targeted at [just me / my small team / an outside user like a contractor].

Here's what the tool does: [brief description]

Cover these specifically:
[list the non-obvious workflows, known limitations, and recovery steps you identified above]

Requirements:
- Task-focused structure ("How to do X"), not a feature-by-feature reference
- Assume [the actual baseline knowledge of your real audience — e.g., "no technical background" or "comfortable with spreadsheets but not code"]
- Keep it as short as it can be while still being genuinely useful — don't pad it out
- Include a short section on what to do if something goes wrong: [list the specific failure modes from your Observability/Backup modules that a user might actually encounter]
```

Being specific about your real audience's baseline knowledge matters — documentation written assuming technical familiarity is useless for a non-technical teammate, and documentation over-explaining basics wastes a technical user's time.

---

## Validating the Documentation

-  **Have the actual intended user (if not you) try to complete a real task using only the doc** — this is the only real test; watching where they get stuck reveals gaps you won't find by re-reading it yourself
-  **Check it doesn't reference anything that's since changed** — screenshots, button labels, or steps from an earlier version of the tool are a common source of confusing, wrong documentation
-  **Confirm the recovery/troubleshooting section actually matches your real failure modes**, not generic "if something goes wrong, contact support" — there's no support team, it's you
-  **Re-read it after not looking at it for a week** — this approximates how a real user (or future-you) will experience it: without the context you had while writing it

> ️ **Warning:** Documentation that goes stale is often worse than no documentation — it actively misleads rather than just being absent. If you can't commit to keeping it updated, keep it deliberately minimal and focused only on things unlikely to change often (recovery steps, known limitations) rather than UI walkthroughs that will drift out of date with every feature change.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Writing a full feature manual nobody asked for | Wasted effort; most of it goes unread |
| Assuming the wrong baseline knowledge for the real audience | Either too basic (wastes a technical user's time) or too technical (useless to a non-technical one) |
| Never testing the doc with the actual intended reader | Gaps you can't see yourself are exactly the ones that matter |
| Letting documentation go stale after UI changes | Wrong instructions are worse than no instructions |
| Skipping recovery/troubleshooting content | The moment documentation is most needed is exactly when something's already gone wrong |

---

## Before You Move On — Checklist

- [ ] Documentation is scoped to my actual audience, not a hypothetical larger one
- [ ] It covers non-obvious workflows, known limitations, and recovery steps — not a full feature list
- [ ] The real intended user (if not just me) tested it on an actual task
- [ ] It doesn't reference outdated UI, button labels, or steps
- [ ] I have a realistic plan for keeping it updated, or deliberately kept it minimal enough not to need much updating

---

## What's Next

With documentation in place, the final step before this tool is truly "live" is putting it in front of real use in a controlled way — beta rollout.
