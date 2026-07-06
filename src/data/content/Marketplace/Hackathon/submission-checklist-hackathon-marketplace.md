---
title: Submission Checklist
slug: submission-checklist
phase: Phase 6
mode: hackathon
projectType: marketplace
estimatedTime: 15-20 min
filename: submission-checklist-hackathon-marketplace.md
---

# Submission Checklist

Everything else in this track was about making the project good. This module is about making sure that quality actually gets scored — every year, working projects lose points or get disqualified over submission mechanics that had nothing to do with the build itself. This is the cheapest place left to protect the work you've already done.

Do this with at least 30 minutes of buffer before the deadline. Submission portals slow down, file uploads fail, and Wi-Fi gets congested in the final minutes of every hackathon — assume yours will too.

---

## The Failure Modes That Aren't About Code Quality

| Failure | Why it happens | Cost |
|---|---|---|
| Repo is private | Default GitHub setting, forgotten to flip | Judges can't see code — often a hard disqualifier |
| README has setup instructions that don't actually work | Written early, never re-tested after later changes | Judges can't run it, score drops |
| Demo video missing or wrong format | Left until the last 10 minutes | Some platforms reject submissions without it |
| Deployed link is down or behind a login wall | Free-tier hosting spun down, or env vars missing in production | Judges can't try it themselves |
| Submission form filled with placeholder text | Rushed in the final minutes | Looks unfinished even if the app isn't |
| Team members not credited correctly | Skipped because "everyone knows who's on the team" | Affects individual scoring/credit in some formats |

None of these reflect the quality of your engineering. All of them are fully within your control with 20 minutes of focused checking.

---

## Repo Checklist

- [ ] **Repository is public** — check this explicitly, don't assume; GitHub defaults can catch teams off guard
- [ ] **`.env.example` exists** with every required variable name (no real secrets) so judges or organizers know what's needed to run it
- [ ] **`.env` itself is in `.gitignore`** and was never committed — check `git log` for it if you're unsure, not just the current state
- [ ] **README has install steps that work from a clean clone** — test this on a teammate's machine if possible, not just your own where everything's already configured
- [ ] **No leftover debug code, console.logs of secrets, or commented-out broken attempts** cluttering the diff a judge might browse

> **Decision:** If you only have time to verify one thing in the repo, verify the README setup steps actually work from scratch. This is the single most common reason a good project scores low — judges who can't run it default to scoring only what they can see in the demo video.

---

## README Structure That Judges Actually Use

Keep it short. Judges skim, they don't read documentation end to end.

```markdown
# [Project Name]

One-sentence pitch.

## What it does
2-3 sentences, the problem and the solution.

## Tech stack
Brief list.

## Running locally
1. Clone
2. Install deps
3. Set env vars (see .env.example)
4. Run dev server

## Demo
[Link to video] · [Link to deployed app]

## Team
Names + roles
```

This is enough. A long architecture write-up belongs in a separate `/docs` file if you want it, not the README a judge opens first.

---

## Deployment Checklist

- [ ] **Deployed URL loads without errors** — test in an incognito window, not your logged-in browser, to catch anything that depends on local state
- [ ] **Production environment variables are set** — a common failure is a deploy that works locally but breaks in production because an env var was never added to the hosting platform's dashboard
- [ ] **Database is seeded in production**, not just locally — an empty production database makes your live link look broken even though the code is fine
- [ ] **Free-tier hosting won't spin down mid-judging** — some platforms (free-tier Render, for example) sleep after inactivity and take 30+ seconds to wake; if judges hit a blank loading screen, know that risk and have your screen recording ready as the fallback

> **Warning:** Test the deployed link on a different network than the one you built on (phone hotspot, for example). Some teams unknowingly rely on a local proxy or VPN that masks a production config issue.

---

## Demo Video (If Required)

Many hackathon platforms require a short video regardless of live judging — as a backup if live demos fall through, or for asynchronous review.

- **Length matches the platform's stated limit** — going over often gets auto-cut or rejected by the upload tool
- **Recorded in the actual format requested** (some require unlisted YouTube links specifically, not raw file uploads)
- **Captures the same script from the Demo Script module** — don't improvise a different, untested version for the video
- **Audio is audible** — test with headphones, not just laptop speakers, before calling it done

---

## Submission Form Details

- **Every required field filled**, none left as placeholder or "TBD"
- **Project name matches across deck, repo, and submission form** — inconsistent naming reads as sloppy and can confuse judges scanning a long list of projects
- **Category/track selected correctly** if the hackathon has multiple tracks — submitting to the wrong track can mean judges in the right category never see it
- **All team members listed with correct names/emails** — affects individual credit and any post-event communication
- **Links open without requiring a login or special permission** — double-check Google Drive/Docs links are set to "anyone with the link"

---

## The Final 30 Minutes

Run through in this order, as a team, with someone reading the checklist aloud:

1. Confirm repo is public, README tested on a clean clone
2. Confirm deployed link loads in an incognito tab on a different network
3. Confirm demo video (if required) is uploaded in the correct format
4. Fill and submit the form, double-checking every field before hitting submit
5. Screenshot the submission confirmation — platforms occasionally fail silently, and a screenshot is your proof you submitted on time

> **Tip:** Submit at least 15 minutes before the actual deadline if the platform allows resubmission/edits afterward. A submission that's in the system, even if you keep polishing, is safer than a perfect submission attempted at minute 59.

---

## AI Prompts You Can Use

**Prompt 1 — Audit your README:**

```
Here's my README: [paste it]. Pretend you're a judge with no prior
context, trying to run this project from a clean clone in 5 minutes.
Flag any step that's ambiguous, missing, or assumes context I haven't
provided (like an env var I didn't explain).
```

**Prompt 2 — Final pre-submission check:**

```
I'm about to submit a hackathon project. Here's what I have: [repo link,
deployed link, video link, brief project description]. Walk through a
checklist of common hackathon submission mistakes (private repos, broken
deploy links, missing env setup, wrong track selected) and tell me what
to verify before I submit.
```

---

## Validating What AI Generates

- **Don't blindly trust an AI "looks good" on your README** — actually run the install steps yourself, since AI reviews text plausibility, not whether the commands work in your specific environment
- **Confirm any AI-suggested checklist matches your specific hackathon's actual submission requirements** — generic advice can miss a platform-specific quirk (a required field, a specific video host) that only your hackathon's rules page has

---

## Implementation Checklist

- [ ] Repo confirmed public, README tested on a clean clone
- [ ] `.env` confirmed absent from git history, `.env.example` present
- [ ] Deployed link tested in incognito, on a different network
- [ ] Production database seeded, not empty
- [ ] Demo video uploaded in correct format and length (if required)
- [ ] Submission form fully filled, links set to public access
- [ ] Submission confirmed and screenshotted, with time to spare before the deadline

---

## You're Done

This closes out the Marketplace Hackathon track — from problem scoping through a working, polished, correctly-submitted project. Good luck.
