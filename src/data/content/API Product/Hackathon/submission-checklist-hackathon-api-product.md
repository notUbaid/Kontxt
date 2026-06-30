---
title: Submission Checklist
slug: submission-checklist
phase: Phase 6
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Submission Checklist

This is the last module before the deadline, and the stakes are unforgiving: a broken submission link or a missing README field can disqualify work that's otherwise excellent. Nothing here is about building more — it's about making sure what you already built actually gets seen.

## The Decision You're Actually Making

Not "is the project good." It's: **if a judge opens only what we submitted, with zero context and zero chance to ask us anything, can they evaluate it fairly?**

Submission day is not the time to discover your demo link is dead or your repo is private.

## The Non-Negotiables, Checked in This Order

- [ ] Deployed API URL is live right now — open it in an incognito window to confirm
- [ ] GitHub repo is **public**, not private
- [ ] README renders correctly on GitHub (check formatting, broken image links, broken markdown tables)
- [ ] Demo API key in the README is current and actually works
- [ ] Submission form fields match your actual project name, not a placeholder from earlier

> **⚠️ Warning:** A private repo is the single most common cause of a strong project scoring zero — judges can't request access mid-review, and most won't ask. Set it to public and verify by opening it in an incognito browser, logged out of GitHub entirely.

## What Your README Needs, At Minimum

| Section | Why judges need it |
|---|---|
| One-line project description | First thing read, decides if they keep reading |
| Problem statement | Context for why the API exists |
| Quick Start (from Phase 5) | Lets them try it themselves |
| Live deployed URL | Proof it's real, not just local code |
| Tech stack (brief, not a slide) | Quick technical context, not the headline |
| Team name / hackathon name | Required by most submission systems |

> **✅ Best Practice:** Put the live URL and Quick Start near the top of the README, not buried after a long tech stack and architecture section. Judges decide whether to keep reading in the first 10 seconds — lead with what they can act on.

## Final Verification Pass

Run through every artifact you built across this phase, fresh, as if you're a judge seeing it for the first time:

- [ ] Postman collection — import it cold, run every request top to bottom
- [ ] Example requests/responses — copy-paste each one, confirm it still matches reality
- [ ] Quick Start — follow it literally, time how long it takes
- [ ] Pitch deck — open the file format judges will actually use (PDF, not editable slides, unless specified)
- [ ] Demo script — confirm it still works against the current deployed URL

> **⚠️ Warning:** The most common late-stage failure is a last-minute code change that breaks something documented hours earlier — a renamed field, a changed status code, an expired key. Run this full pass *after* your last commit, not before it.

## Use AI for a Final Cold Read

**Prompt — Submission Readiness Review**
```
Act as a hackathon judge seeing this project for the first time, with 
no context beyond what's in this README. Read it and tell me:
1. What's unclear in the first 30 seconds
2. Any claim that isn't backed up by something in the README itself
3. Whether you could successfully make an API call using only these 
   instructions
4. Anything that looks unfinished or inconsistent

[paste your full README]
```

> **💡 Token Efficiency:** Run this once, at the very end, against your final README — not repeatedly during drafting. This prompt is a final gate check, not an editing tool; using it earlier just re-surfaces issues you'll fix again anyway before submission.

## Submission-Day Mistakes That Cost Real Points

- Repo still set to private at submission deadline
- README references a `localhost` URL instead of the deployed one
- Demo API key revoked or rotated after the README was written
- Submission form has an old project name or outdated description from an earlier pivot
- Video/deck file in a format the judging platform can't open

## Quick Reference

| Must-have | Nice-to-have | Skip entirely |
|---|---|---|
| Public repo, verified incognito | Badges/shields in README | Private repo with "request access" note |
| Live, working deployed URL | Contributor list | Editable-only deck format |
| Working demo API key | Architecture diagram | Long roadmap section |
| Quick Start near the top | Cold-read AI review | Last-minute unverified code changes |

## You're Done

Every module in this project, from problem definition through submission, is built to compound: each artifact made the next one faster and stronger. The API you're submitting isn't just functional — it's documented, demoed, and pitched the way an experienced engineering team would present real work. That's the difference judges actually notice.
