# Submission Checklist

You've built the product. You've rehearsed the pitch.

Now you have one job: submit correctly.

Teams get disqualified — or lose points — not because their product was weak, but because their submission was incomplete, broken, or submitted at 11:59pm with a dead link.

This is the last thing between you and the judges. Treat it like a final deployment.

---

## Submission Has Two Phases

```
PHASE A — Submission artifacts (what you hand to organizers)
PHASE B — Presentation readiness (what you bring to the room)
```

Both must be complete before the deadline. Most teams only think about Phase A.

---

## Phase A — Submission Artifacts

These are the files, links, and descriptions you submit to the platform (Devpost, HackerEarth, etc.).

### Project Description

- [ ] Product name is clear and spelled consistently
- [ ] One-paragraph description — what it does, who it's for, why it matters
- [ ] No typos (run it through spellcheck — you've been awake for 20 hours)
- [ ] Tech stack listed (judges and sponsors scan for this)
- [ ] Team members all added to the submission

### Demo Video

Most hackathons require a demo video. Treat it as seriously as the live demo.

- [ ] Video is under the required length (usually 2–3 minutes)
- [ ] Audio is clear — no background noise, no echo
- [ ] Screen recording is high resolution (1080p minimum)
- [ ] Golden-path flow is followed — same as your live demo
- [ ] Product name said aloud in the first 10 seconds
- [ ] Video uploaded to YouTube (unlisted) or Loom — not a Drive link that might break
- [ ] Link tested from an incognito browser tab

> **Warning**
>
> Never submit a Google Drive video link as your primary demo.
> Permissions fail. Links expire. Judges won't chase access.
> YouTube unlisted or Loom. Always.

### GitHub Repository

- [ ] Repo is public (or accessible to judges)
- [ ] README exists and is complete (see README checklist below)
- [ ] Code is committed and pushed — not sitting in local branches
- [ ] No `.env` files, secrets, or API keys in the repo
- [ ] Final commit timestamped before the deadline

### README Must-Haves

- [ ] Project name and one-line description at the top
- [ ] Screenshot or GIF of the product in action
- [ ] Tech stack listed
- [ ] Setup instructions that actually work (`npm install && npm run dev`)
- [ ] Seed command documented (`npm run seed`)
- [ ] Environment variables documented (`.env.example` committed)
- [ ] Live demo link (if deployed)
- [ ] Team names

> **Tip**
>
> A judge trying to run your project locally is a good sign — they're interested.
> A README that fails them in the first step turns that interest into frustration.

### Live Deployment (if required or available)

- [ ] App is deployed and accessible without login friction
- [ ] Demo account credentials listed somewhere judges can find them
- [ ] Deployment is stable — not crashing under cold start
- [ ] Demo data is seeded and visible on first load

> **Warning**
>
> If you're on a free tier (Render, Railway, Vercel), keep a browser tab open and hit the URL 10 minutes before judging starts.
> Cold starts on free tiers can take 30–60 seconds. Wake the server before judges see it.

---

## Phase B — Presentation Readiness

- [ ] Slides exported as PDF (backup if Canva/Figma breaks live)
- [ ] Slides opened on presentation device and displaying correctly
- [ ] Demo app open in browser, logged into golden-path account
- [ ] Demo data verified — no empty states, timestamps correct
- [ ] Backup recording open in a separate tab, ready to play
- [ ] Hotspot enabled on one team member's phone (WiFi backup)
- [ ] Every team member knows their role during the pitch
- [ ] Timer tested against your rehearsed pitch length

---

## Final 30-Minute Checklist

Run this in the last 30 minutes before your slot.

- [ ] Submit on the platform — don't wait until the last 2 minutes
- [ ] All links in the submission tested from a fresh browser tab
- [ ] GitHub repo public and accessible
- [ ] Demo video link working (incognito test)
- [ ] App deployed and responding
- [ ] Demo account loaded and golden path verified end-to-end
- [ ] Slides on correct display
- [ ] Team briefed — who speaks, who clicks, who handles Q&A

---

## Common Submission Failures

| Mistake | Consequence | Fix |
|---------|------------|-----|
| Submitted wrong repo branch | Judges see incomplete code | Merge to main before submitting |
| `.env` committed with API keys | Security disqualification | Add `.env` to `.gitignore` from the start |
| Demo video link requires sign-in | Judges can't watch it | YouTube unlisted, test from incognito |
| Deployment cold starts during judging | Demo loads blank | Wake the server 10 min before judging |
| Team member not added to submission | Teammate doesn't get credit | Add all members before deadline |
| README setup instructions broken | Judge can't run the project | Test instructions on a clean machine |
| Submitted 30 seconds before deadline | Race condition, platform rejects | Submit 30 minutes early |

---

> **Rule**
>
> Submit 30 minutes before the deadline. Not 5. Not 1.
>
> Platforms go down. Links break. Files corrupt.
> The deadline is not the target. It is the absolute outer limit.

---

## You're Done

If every box above is checked, you've done everything a team can do.

The product is built. The pitch is rehearsed. The submission is locked.

Now go present it.

---

> *Good luck isn't what wins hackathons.*
> *Preparation is.*
> *You've prepared. Go win.*
