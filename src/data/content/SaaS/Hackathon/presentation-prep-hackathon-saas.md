# Presentation Prep

🕒 **Estimated Time:** 15 Minutes

---

You are not presenting a project.

You are selling a vision to a panel of skeptics who have already seen eleven other demos today.

The teams that win aren't always building the best tech. They're the ones who make judges *feel* the problem, *believe* the solution, and *remember* the product when voting happens twenty minutes later.

That is a craft. And it's learnable in the next few hours.

---

## What Judges Actually Evaluate

Before you build your presentation, understand what judges are scoring.

Most hackathon rubrics weight these factors:

| Dimension | What Judges Are Really Asking |
|-----------|-------------------------------|
| **Problem** | Do I believe this is real and worth solving? |
| **Solution** | Does this actually solve it, or just touch it? |
| **Demo** | Does the product work, and does it look credible? |
| **Technical** | Did they build something real, or glue APIs together? |
| **Impact** | Could this matter at scale? |
| **Presentation** | Do I trust this team to execute? |

Optimize for all six — but if you have to choose, **Demo** and **Problem** carry the most weight.

---

## The Shape of a Winning Pitch

This is not a template. It's a proven narrative arc.

```
Hook (30 sec)
  → A story, a stat, or a question that makes the problem undeniable

Problem (45 sec)
  → Who suffers. How badly. Why existing solutions fail.

Solution (30 sec)
  → One sentence. What you built. What it does.

Demo (2–3 min)
  → Show it working. Use your golden-path flow. Don't narrate too much.

How It Works (30 sec)
  → Just enough tech to show it's real. Don't get lost here.

Impact (30 sec)
  → Numbers, market size, or before/after. Make it feel inevitable.

Team (15 sec)
  → Names, one relevant detail each. Fast.

Ask / Close (15 sec)
  → What you want. What's next.
```

Total: **~5–6 minutes**. Leave 1–2 minutes for Q&A if the format allows.

---

## The Hook Is Everything

Judges make subconscious judgments in the first 30 seconds.

Three hooks that work:

**1. The Story**
> *"Last March, my co-founder's sister missed a critical medical appointment because the reminder system at her clinic failed. She found out two weeks later. That's the problem we're solving."*

**2. The Statistic**
> *"47% of small business invoices are paid late. The average delay costs a business $8,400 a year. Most of them are still chasing payments over email."*

**3. The Question**
> *"How many of you have ever lost a client because something slipped through the cracks?"*

Don't open with: *"Hi, we're Team X and today we're going to present..."*

That sentence has already lost the room.

---

> **Rule**
>
> Never begin your pitch with your team name, your project name, or an agenda slide.
> Begin with the problem. The audience will figure out who you are.

---

## Demo Strategy

The demo is the centerpiece. Protect it.

### The Golden Path
Design a single, uninterrupted flow through your app's core value.

```
Login as your demo account
  → Show the dashboard (rich with demo data)
    → Perform the key action (the thing your product uniquely does)
      → Show the result
        → One secondary feature that adds credibility
```

Never freestyle during a live demo. Every click should be rehearsed.

### Fallback Plan

Something will go wrong. Prepare for it.

| Risk | Mitigation |
|------|-----------|
| App crashes | Screen recording of full demo flow, ready to play |
| WiFi fails | App running locally, hotspot on standby |
| DB resets | Seed script runnable in under 60 seconds |
| Slow API | Mock the slow endpoint with hardcoded response |

> **Warning**
>
> If you have a live AI call in your demo (LLM, image gen, etc.) — pre-generate a cached response.
> LLM latency during a live pitch kills momentum. Show the result instantly.

---

## Slide Structure

Keep it tight. Judges are not reading slides — they're watching your demo.

**Slides are scene-setters, not content delivery.**

| Slide | Purpose | Max Content |
|-------|---------|-------------|
| 1 | Hook / Problem | 1 headline, maybe 1 stat |
| 2 | Solution | 1 sentence + product name |
| 3 | Demo (live or embedded) | Hand off to app |
| 4 | How It Works | Simple architecture or tech stack |
| 5 | Impact / Traction | 2–3 numbers or outcomes |
| 6 | Team | Names + one-liners |
| 7 | Close | What's next, what you want |

7 slides maximum. If you have 10+, cut.

> **Tip**
>
> Use large text. Judges in the back of the room should be able to read every slide without squinting.
> Minimum 28pt body text. Headlines 48pt+.

---

## AI Prompt — Generate Your Pitch Script

Use this once you know your product, user, and core demo flow.

```
You are a startup pitch coach helping a team win a hackathon.

**Product:** [one sentence]
**Target user:** [who and their pain point]
**Core feature we're demoing:** [what the demo shows]
**Tech stack highlight:** [most impressive technical element]
**Pitch length:** 5 minutes

Write a complete pitch script following this arc:
- Hook (story or statistic that makes the problem undeniable)
- Problem (who suffers, how badly, why existing solutions fail)
- Solution (one sentence)
- Demo handoff (transition line into the live demo)
- How it works (2–3 sentences, technical but accessible)
- Impact (market size or before/after outcome)
- Team (one line each)
- Close (what's next)

Write it as spoken words, not bullet points.
Make it sound confident, not salesy.
The audience is technical judges at a hackathon.
```

> **Copy Prompt**

---

## Handling Q&A

Q&A is where underprepared teams lose points they earned in the pitch.

**Common judge questions and how to handle them:**

| Question | What They're Really Asking | How to Answer |
|----------|---------------------------|---------------|
| "How is this different from X?" | Did you do your research? | Name X, acknowledge it, explain the specific gap you fill |
| "How does it scale?" | Is this a toy or a real product? | Name one real scaling path — even theoretical |
| "What's your business model?" | Have you thought beyond the hack? | Give one clear monetization model, even if unvalidated |
| "What would you build next?" | Do you have vision beyond this weekend? | 2–3 prioritized features with reasoning |
| "How did you split the work?" | Are you a real team or one person? | Name who owned what. Be specific. |

> **Tip**
>
> If you don't know the answer, say: *"We haven't solved that yet — here's how we'd think about it."*
> Honest reasoning beats a bluffed answer every time.

---

## Rehearsal Protocol

Do not skip this. Timing and confidence come only from repetition.

- [ ] Full run-through with timer — at least twice
- [ ] Demo flow run-through with no narration — just clicks
- [ ] Each team member knows exactly when to speak
- [ ] One person owns the demo handoff transition
- [ ] Q&A practice: teammates ask the hardest questions you can think of
- [ ] Test slides on the presentation display if possible

> **Warning**
>
> If your demo is showing on a projector or external display, test it there.
> Resolution changes, browser zoom defaults change, fonts render differently.
> "It worked on my laptop" is not a fallback plan.

---

## The Close

Don't trail off. End with intent.

Strong closes:

> *"We built this in 24 hours. We're continuing it. We're [looking for users / open to feedback / planning to launch by X]. Thank you."*

> *"The problem isn't going away. We're not either. Thank you."*

Weak closes:

> *"Yeah so... that's basically it. Any questions?"*

---

## Presentation Checklist

**Before the pitch:**
- [ ] Demo data loaded, golden-path account ready
- [ ] Fallback recording ready in a separate browser tab
- [ ] Slides on correct display, font sizes readable from the back
- [ ] All team members know their role and transitions
- [ ] Timer tested — you know exactly where you'll be at 3 min and 5 min
- [ ] WiFi tested, hotspot as backup

**During the pitch:**
- [ ] Start with the problem, not the team intro
- [ ] Demo is unscripted-feeling but fully rehearsed
- [ ] No one reads from slides
- [ ] Confident close — no trailing off

**After the pitch:**
- [ ] Q&A answers are honest, not defensive
- [ ] Team agrees on one spokesperson for primary answers

---

> **Final thought**
>
> The team that wins usually isn't the most technically impressive.
> It's the team that made the judges *feel* the problem and *believe* in the product.
>
> You've built something real this weekend.
> Now make sure the room knows it.

---

## Next

**Phase 4: Submission** → Pitch deck, demo script, and final submission checklist.
