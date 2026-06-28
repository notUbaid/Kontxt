---
title: Submission
slug: submission
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 20–30 min
---

# Submission

The demo is done. Now everything you submit gets read by judges who weren't in the room — or re-read by judges who were.

A weak submission undersells a strong product. A strong submission can recover ground lost in a rushed demo. This module gets your submission right in the least amount of time.

---

## What Judges Actually Read

Most hackathon submissions include: a project title, a description, a link, a repo, maybe a video. Judges skim all of it. They are reading 20–40 submissions in a session.

Your submission needs to answer three questions immediately — without making them search:

1. **What does this do?** (One sentence.)
2. **Why does it matter?** (One sentence.)
3. **Does it work?** (A live link or a video that proves it.)

Everything else is supporting evidence.

---

## The Project Description

This is the most important text field in your submission. Most teams waste it on feature lists or vague mission statements.

**What not to write:**
> "Our app helps users manage their tasks more efficiently using the power of AI to streamline workflows and improve productivity across teams."

This says nothing. Every second app at every hackathon could have this description.

**What to write:**

Lead with the problem. Follow with what you built. End with the thing that makes it different.

```
[Specific problem in one sentence.]
[Product name] [does the specific thing that solves it].
[The one detail that makes it technically or conceptually interesting.]
```

**Example:**
> Engineering teams spend more time filing bug reports than fixing bugs. BugSnap watches your terminal output in real time and auto-drafts a GitHub issue with steps to reproduce — in under 3 seconds. It uses structured diff analysis to link the error to the most recent code change automatically.

That's 51 words. A judge reading it knows exactly what was built and why it's interesting.

---

## The README

If your repo is part of the submission, the README is the second thing judges look at after the live link.

Minimum viable hackathon README:

```markdown
# [Product Name]

[One sentence: what it does and who it's for.]

## The Problem
[Two to three sentences on the real pain point.]

## What We Built
[What the product does. Bullet points are fine here.]

## Tech Stack
- Frontend: [e.g. React + Vite + Tailwind]
- Backend: [e.g. FastAPI on Cloud Run]
- Database: [e.g. Supabase PostgreSQL]
- AI: [e.g. Claude claude-sonnet-4-6 via Anthropic API]

## Running Locally
[Exact commands to clone, install, and run. If it needs env vars, list the keys — not the values.]

## Team
[Names and optionally roles. Keep it one line per person.]
```

> **💡 Tip**
> Add one screenshot or GIF to the README. Not five. One. The most impressive screen in the app. Judges who didn't attend your demo will form their entire opinion of the product from this image.

---

## The Demo Video

Many hackathons require or allow a short video. Treat it as insurance — the thing that works even if your live link is down during judging.

**Rules for a good demo video:**

- 60–90 seconds maximum. Judges will not watch 4 minutes.
- Screen record the actual app, not slides about the app.
- Narrate while you click. Silence is dead air.
- Show the one core flow — not every feature.
- Include the "wow moment" from your demo script.
- End with the product name on screen.

> **⚠️ Warning**
> Do not spend more than 30 minutes on the video. Record one clean take. Trim the start and end. Upload it. A real recording of a working app is worth more than an overproduced video of a product that barely works.

**Tooling:**
- Mac: QuickTime screen recording + iMovie trim
- Windows: Xbox Game Bar (`Win + G`) or OBS
- Cross-platform: Loom (free, shareable link in 2 minutes)

---

## The Live Link

If your app is deployed, test the link from a browser you haven't used for development — ideally a different device entirely.

- [ ] Link opens without error
- [ ] App loads in under 3 seconds on a normal connection
- [ ] Demo account credentials are provided if login is required
- [ ] The landing screen is the best first impression your app has

> **⚠️ Warning**
> If your app requires signup and there's no demo account, judges will not create an account. They will move on. Either remove the auth wall for judging or provide a working demo account: email and password, in the submission itself.

**Include in your submission:**
```
Demo account: demo@yourapp.com / password: hackathon2024
```

---

## The Submission Checklist

**Content**
- [ ] Project title is your actual product name (not "Project X" or your team name)
- [ ] Description leads with the problem, not the solution
- [ ] Description is under 100 words and could be read in 20 seconds
- [ ] Live link works and doesn't require account creation to see core features
- [ ] Demo video is under 90 seconds and shows the app actually working
- [ ] README has a screenshot and working local setup instructions

**Technical**
- [ ] Repository is public (or submitted correctly to the platform)
- [ ] No API keys or secrets in the repo — check `.env` is in `.gitignore`
- [ ] Environment variables are documented (key names only, not values)
- [ ] App doesn't crash on the first screen without specific test data

**Final**
- [ ] You've opened the submission form and confirmed every required field is filled
- [ ] Submission is in before the deadline — not at the deadline
- [ ] You have a local backup of the project in case anything happens to deployment

---

## One Last Thing

After you submit, stop building.

> **⚠️ Warning**
> The most dangerous moment in a hackathon is the 20 minutes after submission. Teams push one more feature, break something that was working, and walk into judging with a broken demo. Submission is the freeze point. Nothing changes after it.

If you have time left, use it to rehearse the demo one more time. Not to ship more code.

---

You're done. Go win.
