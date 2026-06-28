---
title: Demo Prep
slug: demo-prep
phase: Phase 3
mode: hackathon
projectType: web app
estimatedTime: 15–20 min
---

# Demo Prep

Your app is built. Your data is seeded. Your UI is polished.

Now you need to make sure the next 5 minutes — the actual demo — go exactly the way you planned them.

Most teams lose points here. Not because their app is bad. Because they walk into the room unprepared for what presenting under pressure actually feels like.

---

## What a Demo Actually Is

A demo is not a tour of your app. It is not a feature list. It is not a technical explanation.

A demo is a story with a beginning, a conflict, and a resolution — told through your product.

> **💡 Tip**
> The strongest demos follow this structure: **"Here's a real problem. Watch us solve it right now."** Everything else is filler.

If you can't state the problem your app solves in one sentence, that's the first thing to fix.

---

## The Demo Script

Write a script. Not bullet points — an actual script, in the order you will click through the app.

It does not need to be long. It needs to be exact.

**Template: The 3-Minute Demo Script**

```
[0:00 – 0:20] The Hook
State the problem in one or two sentences. Make it visceral. 
Not: "We built a task manager."
Yes: "Every team we talked to loses track of who owns what the moment a Slack thread dies."

[0:20 – 0:30] The Setup
"So we built [Product Name]. Let me show you."
Open the app. It should already be on the right screen.

[0:30 – 2:00] The Core Flow
Walk through the single most impressive end-to-end flow your app supports.
One flow. Not three. The one that best demonstrates your core value.

[2:00 – 2:30] The Wow Moment
The thing that makes someone go "oh, that's clever."
An AI-powered result. A real-time update. A chart that makes the data click.
This should be the peak of the demo. Build to it.

[2:30 – 3:00] The Close
"We built this in [X hours / X days]."
"Here's where we see this going."
Shut up. Let it land.
```

---

## Rehearse the Exact Flow

Run through the demo three times, on the exact device and browser you will present from.

After each run:
- [ ] Did you stumble explaining anything? Simplify that explanation.
- [ ] Did any screen take longer to load than expected? Fix or work around it.
- [ ] Did you skip over something because it looked rough? Either fix it or cut it from the demo.
- [ ] Did the "wow moment" actually land, or did it need more setup?

> **⚠️ Warning**
> Do not rehearse in your head. Rehearse out loud, with your hands on the keyboard, on the actual demo machine. Silent mental walkthroughs don't expose the mistakes that live demos expose.

---

## Failure Modes to Pre-empt

These are the most common ways hackathon demos go wrong. Prepare for each one.

**Network failure**
If your app makes live API calls during the demo, have a plan. Either:
- Pre-load results and cache them so a network hiccup doesn't blank the screen
- Know the venue's wifi situation in advance
- Have a screen recording as a last resort

**Auth getting in the way**
Log in before you present. Never demo a login flow unless login is your product's core feature. Judges don't want to watch someone type a password.

**Wrong starting state**
Your seed script should run right before the demo. If you've been clicking around testing things, the data is dirty. Reset it.

**Someone else breaks the app before you present**
If your app is deployed and teammates are testing it during another team's presentation, they can corrupt the demo data. Designate a demo account nobody touches.

**Slow cold start**
Serverless functions, free-tier databases, and certain hosting providers have cold starts. Open your app and trigger a real request 2–3 minutes before your demo slot. Warm it up.

---

## The Pre-Demo Checklist

Run this 5–10 minutes before you present:

**Environment**
- [ ] Seed script has been run — data is in known clean state
- [ ] App is open in the browser, on the correct starting screen
- [ ] Browser zoom is set to the right level for the display/projector
- [ ] Notifications and Do Not Disturb are configured
- [ ] Laptop is plugged in or battery is above 80%
- [ ] Display mirroring or external display is connected and tested

**App State**
- [ ] You are logged in as the demo account
- [ ] The first screen looks exactly as intended
- [ ] Core demo flow works end to end (run it once right now)
- [ ] No error states visible anywhere in the demo path
- [ ] Any AI features have been triggered once to confirm they respond correctly

**Presentation**
- [ ] You can state the problem in one sentence without reading it
- [ ] You know the demo flow by heart — no reading from notes while clicking
- [ ] You know what to say during any loading moment so silence doesn't fill the room
- [ ] You know who is clicking and who is talking if presenting as a team

---

## Handling Questions

Judges will ask questions after the demo. Some of these questions are traps.

**"How does it scale?"**
Hackathon-honest answer: "We haven't optimized for scale yet — this is an MVP. The architecture supports [X] and we'd address [Y] before going to production." Don't pretend. Judges know it's a hackathon.

**"What would you build next?"**
Have one specific answer ready. Not a list. One clear next feature that would meaningfully expand the value. Shows you've thought past the weekend.

**"Why didn't you use [different tech]?"**
"We made a deliberate call to prioritize shipping speed. [Your choice] let us move fastest." Every tech decision in a hackathon is a tradeoff for velocity. Own it.

**"What was the hardest part?"**
This is an invitation to show technical depth. Pick the most technically interesting problem you solved. If nothing was technically interesting, pick the most interesting product decision.

> **💡 Tip**
> Prepare answers for three likely questions before you present. You will get at least one of them. The difference between a confident answer and a stumbling one is having thought about it once beforehand.

---

## If Something Breaks During the Demo

Stay calm. Judges have seen broken demos before. What they remember is how you handled it.

**Minor glitch (slow load, visual bug):** Keep talking. Don't call attention to it. Move to the next thing.

**Feature doesn't work:** Skip it. "I'll show you X in a moment" and move to something that works. Come back only if you're confident it'll work.

**App crashes or goes blank:** This is what your screen recording is for. Pivot: "Let me show you what this looks like working" and play the recording. Then explain what happened briefly and move on.

> **⚠️ Warning**
> Never apologize excessively for a broken demo. One "sorry about that" is fine. More than one shifts the entire room's energy toward the failure instead of your product.

---

## What's Next

Move to **Submission** — your demo is ready. The last step is making sure everything you submit alongside it represents the work as well as the demo does.
