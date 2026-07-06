---
title: Submission Checklist
slug: submission-checklist
phase: Phase 4
mode: hackathon
projectType: web-app
estimatedTime: 15-20 min
---

# Submission Checklist

A great project has lost points at hackathons for a broken submission link, a missing demo video, or a README that doesn't explain what the judges are looking at. This is the least interesting module in the curriculum and the most preventable way to lose points you already earned.

This isn't about your product. It's about making sure the judges can actually access, understand, and evaluate what you built — nothing more.

---

## Why This Gets Skipped (And Why That's Expensive)

> **️ Common Mistake**
> Treating submission as an afterthought at minute 1430 of a 1440-minute hackathon. Most submission failures aren't complex problems — they're a wrong link, an unset environment variable in production, or a demo video that didn't actually upload. Every one of them is 100% preventable with 20 minutes of deliberate checking, and 100% costly if missed.

Build in a hard buffer: treat the actual deadline as 30-60 minutes earlier than it is, and use that buffer exclusively for this checklist.

---

## The Core Checklist

Go through this in order. Each item is something judges will actually check.

**1. The live link works**
- [ ] Open your deployed URL in an incognito window (not your logged-in browser) — this catches auth or session bugs that only show up for a fresh visitor
- [ ] Test on mobile, not just your dev laptop — a meaningful fraction of judges will click your link from their phone
- [ ] Confirm it loads within a few seconds — a cold-start delay on a serverless function can look like a broken app to an impatient judge

**2. The repo is public and clean**
- [ ] Repository visibility is set to public (a private repo a judge can't open is an instant zero on code review)
- [ ] No committed secrets — API keys, database URLs, service role keys. Check your `.env` file isn't tracked in git history.
- [ ] `.gitignore` actually excludes `node_modules`, `.env`, and build artifacts — a bloated repo is a bad first impression

> **️ Warning**
> If you accidentally committed a secret key at any point during the hackathon, rotating it after submission isn't enough — check your commit history and remove it properly, since a public repo's history is visible even after you delete the file in a later commit.

**3. The README does its job**
A hackathon README has exactly one job: let a judge understand your project in 60 seconds without running it. It needs:
- [ ] One-sentence description of what the project does and for whom
- [ ] The problem it solves, stated plainly
- [ ] Tech stack used
- [ ] A link to the live demo (repeated here even though it's elsewhere in the submission — judges land on READMEs from many different places)
- [ ] Setup instructions, if a judge might actually run it locally (only include this if it genuinely works — untested setup instructions are worse than none)

**4. Demo video, if required**
- [ ] Uploaded to the platform actually specified by the hackathon (YouTube, Devpost, etc.) — not just recorded and sitting on your laptop
- [ ] Under the stated time limit — many platforms hard-cut or reject videos over the limit
- [ ] Actually shows the product working, not just slides narrated over
- [ ] Audio is audible — test with headphones, not just your laptop speakers

**5. Submission form itself**
- [ ] Every required field is filled — team members, tracks/categories entered if applicable, links pasted correctly (not a broken copy-paste)
- [ ] Submitted with time to spare, not at the literal deadline second — some platforms have upload delays or brief outages under last-minute load

---

## The Five-Minute Final Pass

Do this exactly once, right before you consider yourself done — ideally with a teammate, not solo, since a second set of eyes catches what you're now too close to see.

1. Open the live link in an incognito tab. Click through the core flow start to finish.
2. Open the repo link in a private/incognito tab. Confirm it's public and the README renders correctly on GitHub.
3. Play the demo video from the actual submitted link, not your local file.
4. Re-read the submission form once, field by field, against the hackathon's stated requirements.

> [!TIP]
> "It worked when I tested it earlier" is not the same as "it works right now." Deployments can silently break from an expired free-tier database pause, a rotated key, or an unrelated last-minute commit. Test from the actual submitted links, at the actual end, not from memory of an earlier check.

---

## AI Prompt

Use this as a final structured pass over your specific submission requirements:

```
I'm about to submit a hackathon project. The submission requires:
[paste the exact requirements from the hackathon rules — repo,
demo video, README, live link, form fields, etc.]

Here's what I have:
- Live link: [url]
- Repo: [url]
- README summary: [paste your README's current content]
- Demo video: [status/link]

Go through the stated requirements one by one and tell me exactly
what's missing or incomplete. Don't comment on code quality or
product ideas — I only need a compliance check against what's
explicitly required.
```

> [!TIP]
> Paste the actual hackathon rules text into this prompt, not a summary from memory. Requirements vary a lot between events, and a generic checklist will miss something specific to this one (e.g., a required tag in your repo name, a specific submission category).

---

## Validation Checklist

- [ ] Live link tested in incognito mode and on mobile
- [ ] Repo is public with no committed secrets
- [ ] README explains the project in under 60 seconds of reading
- [ ] Demo video (if required) is uploaded to the correct platform, under the time limit, with working audio
- [ ] Submission form is fully filled and submitted with buffer time before the deadline
- [ ] A final pass was done from the actual submitted links, not from memory of an earlier test

---

## What's Next

You're done. This is the final module of the hackathon build path — from here, it's presentation day. Trust the prep, demo confidently, and be ready to talk about what you'd build next.
