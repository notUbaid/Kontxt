---
title: Submission Checklist
slug: submission-checklist
phase: Phase 5
mode: hackathon
projectType: ai tool
estimatedTime: 10-15 min
---

# Submission Checklist

Everything up to this point has been about building and rehearsing a great demo. This module is about the unglamorous, easy-to-overlook administrative work that actually gets your project submitted and judged at all — a strong project that misses a submission requirement scores the same as one that was never built.

---

## The Core Idea: Submission Requirements Are Non-Negotiable, Unlike Almost Everything Else in This Curriculum

Every other module in this curriculum gave you room to cut scope, defer polish, or make judgment calls about what's worth your remaining time. This one doesn't. If the hackathon requires a public repo, a working deployed link, and a submission form filled out by a deadline, those things have to exist exactly as specified — there's no "good enough" version of a missing requirement.

> ** Warning**
> Teams that build an excellent project and then submit minutes late, or with a broken public repo link, or missing a required field, lose points (or get disqualified) for reasons that have nothing to do with how good their actual work was. Treat the submission checklist with the same seriousness as your AI Failure States rehearsal — verify it directly, don't assume it's fine.

---

## Step 1: Verify the Specific Requirements for *Your* Hackathon

Every hackathon's submission requirements differ — don't assume based on a previous event or a generic checklist. Find and re-read the actual submission rules for this specific event, checking for:

**Decision Card — Common Requirements to Verify**

| Requirement | What to Actually Check |
|---|---|
| Public repository | Confirm it's actually set to public, not just that it exists — a private repo by accident is a common, avoidable failure |
| Deployed/live link | Confirm the link works right now, from a fresh browser, not just "it worked when I deployed it earlier" |
| README or project description | Confirm it explains what the project does clearly to someone who hasn't seen your demo — judges may review submissions outside the live demo window |
| Video demo (if required) | Confirm it's uploaded, accessible (correct permissions), and actually plays — test the link yourself, don't assume |
| Team member list / categories entered | Confirm every required field in the actual submission form is filled, not left blank by accident |
| API keys / secrets | Confirm none are exposed in your public repo (see the Hosting module's environment variable guidance) — a public repo with a real key is both a submission risk and a security one |

---

## Step 2: Test Everything From a Fresh, Logged-Out Perspective

Open your deployed link, your repo, and your video in a private/incognito browser window, or ask someone outside your team to check. Things that work because you're still logged in, or because your browser has cached state from earlier testing, can fail completely for someone encountering them cold — exactly how a judge will encounter them.

> ** Tip**
> This is the same discipline as testing your demo on the actual device/screen you'll present on — verify your submission artifacts the way the actual evaluator will experience them, not the way you, with all your accumulated local context, experience them.

---

## Step 3: Submit With Real Time Margin, Not Exactly at the Deadline

Submission platforms can be slow or experience high traffic right before a deadline, especially for popular hackathons. Plan to submit with real buffer — not because the deadline itself moved, but because the platform's behavior under load near a deadline is its own risk factor, separate from your project's actual readiness.

> ** Warning**
> "I'll submit right at the deadline" assumes the submission platform, your internet connection, and every required field will all cooperate perfectly in that exact moment. Submit with at least 15-30 minutes of buffer if your event allows it, specifically to absorb any last-minute platform or connectivity issue.

---

## Using AI for a Final Requirements Cross-Check

This is a quick, mechanical verification task — useful for catching anything you might have skimmed past while focused on the build itself.

**Prompt: Submission Requirements Cross-Check**

```
Here are this hackathon's stated submission requirements:
[paste the actual rules/requirements text from the event]

Here's what I currently have ready: [list what you've prepared —
repo link, deploy link, video, README, form fields completed, etc.]

Identify anything in the stated requirements that I haven't
explicitly confirmed I have ready. Don't assume I have something
just because it seems like a standard hackathon requirement — only
flag based on what's actually stated in the requirements I pasted.
```

> ** Why this prompt works**
> Pasting the actual event requirements rather than relying on the model's general knowledge of "typical hackathon submissions" ensures the check is against your specific event's real rules, which vary meaningfully between hackathons. Instructing the model not to assume standard requirements beyond what's explicitly stated avoids a false sense of completeness from generic assumptions that might not apply to your specific event.

**Token efficiency note:** Run this once, as your final pre-submission check, after you believe everything is ready — its value is in catching a gap in already-prepared work, not in generating a requirements list from scratch. The actual event's stated rules are the source of truth here, not the model's general knowledge.

---

## Final Validation Before Hitting Submit

- [ ] Public repo confirmed actually public, accessed from a logged-out/incognito view
- [ ] Deployed link tested fresh, from a logged-out/incognito view, just now — not relying on an earlier test
- [ ] README or description clearly explains the project to someone with zero prior context
- [ ] Video demo (if required) uploaded, correctly permissioned, and replayed start to finish to confirm it actually works
- [ ] No API keys or secrets exposed anywhere in the public repo
- [ ] Every required field in the actual submission form is completed
- [ ] Submitted with real time buffer before the actual deadline, not at the last possible minute

---

## Closing Note

This completes the AI Tool Hackathon curriculum, from Problem Definition through to actual submission. The thread running through every phase has been the same: AI tools demo brilliantly when the team plans for the model's real variance — not just its best-case behavior — and treats failure handling, transparency, and rehearsal as core engineering work, not afterthoughts. That discipline is what separates a tool that merely works in development from one that performs reliably live, in front of the people deciding your result.
