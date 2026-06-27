# Presentation Prep

**Estimated Time:** 30–45 min

---

A demo that rambles loses the room in 90 seconds.

A demo that is structured, rehearsed, and honest about what exists today will be remembered — even if the product is rough.

This module is not about slide design or public speaking tips. It is about the decisions experienced engineers and founders make before they stand up: what to show, what to skip, how to structure the narrative, and how to handle the moments that go wrong.

---

## What Kind of Presentation Is This?

The right preparation depends on what you are walking into. Be precise.

| Format | Audience | Primary Goal |
|---|---|---|
| **Class / academic demo** | Professors, peers | Show learning + technical depth |
| **Hackathon demo** | Judges (3–5 min) | Win with a memorable hook + live demo |
| **User interview / feedback session** | Potential users | Listen, not impress |
| **Investor intro** | Angels, VCs | Prove the problem is real and you can build |
| **Community showcase** | Indie devs, makers | Build credibility, attract early users |

Each format demands a different emphasis. A class demo rewards technical explanation. A hackathon rewards the wow moment. An investor meeting rewards the problem narrative.

If you are not sure which one this is, ask the organiser directly. Most people do not.

---

## The Core Narrative Structure

Every effective product presentation, regardless of format or length, follows the same underlying structure.

```
BEFORE                    YOUR PRODUCT               AFTER
──────────────────         ─────────────────          ──────────────────
The world as it is now     What you built             The world as it 
without your product       and how it works           could be with it
Pain is real               Solution is specific       Outcome is tangible
```

This is not a template to fill in. It is a test to apply to whatever you have already written.

Ask: does my presentation move clearly from BEFORE → PRODUCT → AFTER?

If someone can watch your demo and not understand what problem existed before you built this, the narrative has failed.

---

## The Opening 30 Seconds

Most presentations lose their audience here. Do not start with:

- Your name (unless asked)
- The history of how you came up with the idea
- A definition of a technology you used
- A slide that says "Overview" or "Agenda"

Start with the problem. Specifically, start with the most relatable, concrete version of the problem.

**Weak opening:**
> "Hi, I built a time tracking app for freelancers. It uses React and a FastAPI backend with..."

**Strong opening:**
> "Every freelancer I talked to has the same problem: they finish a project, open their calendar to write an invoice, and realise they have no idea how many hours they actually worked. Today I'm going to show you how I fixed that."

The second version makes the audience feel the problem before they see the product.

---

## What to Show: The Live Demo

The live demo is the highest-stakes part of any product presentation. Plan it like a script, not an improvisation.

### The Golden Rule

**Show the happy path only.**

Do not explore features. Do not click around to find things. Move through one complete user journey that demonstrates your core value — the single thing your product does that nothing else does as well.

One complete journey, demonstrated flawlessly, is more impressive than five features shown partially.

### Scripting the Demo

Write your demo as a sequence of actions, not a list of features.

```
BAD: Show the dashboard, then the settings, then the reports

GOOD: 
Step 1 — User lands on the app with zero tracked time
Step 2 — Starts a timer on a project with one click
Step 3 — Stops it, timer auto-logs to the project
Step 4 — Opens invoice view — hours are already populated
Step 5 — Exports invoice as PDF in one click
```

The audience should feel the friction of the old world dissolving as each step completes.

### Demo Environment Rules

- [ ] Use a dedicated demo account, never your personal data
- [ ] Pre-populate it with realistic, readable data (not "test123" and "asdf")
- [ ] Test the full demo flow end-to-end, on the exact device you will present on, the day before
- [ ] Have a backup: a screen recording of the demo, ready to play if something breaks
- [ ] Close every unrelated browser tab, Slack, notifications
- [ ] Turn off system notifications (`Do Not Disturb` mode)
- [ ] If presenting remotely, test screen share with your exact setup beforehand

> **The backup recording is not a fallback plan for being unprepared. It is professional practice.** Senior engineers doing investor demos always have one.

---

## Handling What Goes Wrong

Something will go wrong. Prepare your response now, not in the moment.

| What Goes Wrong | What to Do |
|---|---|
| Page won't load | "Let me switch to the recording — same flow, same product." Play backup. |
| Feature breaks mid-demo | "That's a bug I haven't fixed yet — here's what it's supposed to do." Move on. |
| You forget what comes next | Pause. Breathe. Continue. Silence is better than filler noise. |
| Someone asks a question mid-demo | "Great question — I'll come back to that at the end." Finish the flow first. |
| You get a hard question you can't answer | "I don't know — I'll find out and follow up." This is the correct answer. |

Confidence through failure matters more than a flawless demo. Judges and investors have seen polished demos from products that never shipped. They respect composure.

---

## Slides: Only If They Help

You do not need slides for every format. A 5-minute demo does not benefit from 10 slides.

If you do use slides, each one should earn its place by doing something the live demo cannot.

**Slides that earn their place:**
- The problem statement (before you open the product)
- A data point or stat that validates the problem
- Architecture diagram (for a class demo or technical audience)
- Traction slide (if you have real numbers)
- The roadmap (one clean visual, not a list)

**Slides that waste time:**
- "About Me" (say it in one sentence verbally)
- Technology logos ("Built with React, FastAPI, PostgreSQL...")
- Any slide that is a wall of bullet points
- Anything you are going to read aloud word for word

> **If you are reading a slide, the slide has failed.**

### Slide Count by Format

| Format | Recommended Slides |
|---|---|
| 3–5 min hackathon | 1–3 slides maximum, or none |
| 10 min class demo | 4–7 slides |
| 20 min investor meeting | 8–12 slides (see Pitch Deck module) |
| User feedback session | No slides |

---

## Talking About What Is Not Built Yet

Every product at this stage has gaps. How you talk about them signals your engineering maturity.

**Immature:**
> "We're planning to add AI features, Stripe integration, mobile apps, and enterprise SSO."

**Mature:**
> "Right now it handles the core invoicing flow. Next I'm adding recurring project templates, which is the most common request I've heard from the three freelancers I've been testing it with."

The second version shows you have user signal, a prioritised roadmap, and realistic scope. The first sounds like a wish list.

Do not promise. Describe what is next and why, without attaching timelines you cannot keep.

---

## AI Prompt: Demo Script

Use this to draft or stress-test your demo narrative.

```
I am preparing a [format: class demo / hackathon / investor meeting / community showcase] 
for a SaaS product called [name].

What it does: [one sentence description]
Core user problem it solves: [specific problem]
The main demo flow I plan to show: [describe the steps you plan to walk through]
Time available: [X minutes]
Audience: [who they are and what they care about]

Help me:
1. Write an opening 30-second hook that leads with the problem, not the product
2. Review my demo flow — is it telling a story or just showing features?
3. Identify the single most impressive moment in my demo and suggest how to frame it
4. Write 2–3 likely hard questions this audience will ask, and suggest how to answer them honestly
5. Flag anything I should not say (overpromising, jargon, filler phrases)

Be direct. If my demo flow is weak, tell me what to cut or reorder.
```

---

## AI Prompt: Slide Copy Review

Use this if you are using slides.

```
Review the following slide copy for a [format] presentation.

Target audience: [who they are]
Presentation length: [X minutes]

Slides:
[paste each slide title and bullet points]

For each slide:
1. Does it earn its place, or does it repeat what the live demo will show?
2. Is any text something I will just read aloud? If so, rewrite it as a visual or cut it.
3. Flag any jargon the audience may not know
4. Flag any claims that need evidence I have not provided
5. Identify the one slide that is currently weakest and rewrite it

Overall: is the slide count right for the time available?
```

---

## Validating Your Presentation

Run through this before you go live.

### The Mute Test

Watch your demo recording with the sound off. Does the visual flow tell the story without narration? If not, your UI needs clearer labels or you need to slow down.

### The 10-Second Test

Show someone unfamiliar with your product the opening slide (or your opening 10 seconds) and ask: "What problem does this solve?" If they cannot answer, your opening has failed.

### The "So What?" Test

After each section of your presentation, ask: "So what?" If you cannot answer why that moment mattered to the audience, cut it.

### The Timing Test

Do a full run-through with a timer. Present at the pace you will actually use, including pauses. If you are over time, cut — do not speak faster.

> **Going over time is one of the most common reasons presentations lose audience goodwill.** Judges and professors notice. Ending 30 seconds early is a feature, not a failure.

---

## Rehearsal Protocol

| Rehearsal | When | Method |
|---|---|---|
| First run | 3+ days before | Full demo + slides, alone, timed |
| Second run | 2 days before | Same, but record yourself |
| Watch the recording | 2 days before | Note awkward pauses, filler words, anything unclear |
| Third run | Day before | With someone watching, ask them what they understood |
| Final check | Day of | Confirm demo environment works, backup ready |

If you only have time for one rehearsal, make it the one with another person watching. You will catch things you cannot catch alone.

---

## Checklist: Ready to Present

**Narrative**
- [ ] Opening 30 seconds leads with the problem, not the product
- [ ] Demo follows one complete user journey, not a feature tour
- [ ] You can explain what is not built yet without overpromising

**Demo environment**
- [ ] Dedicated demo account with realistic data
- [ ] Full demo flow tested on the exact device you are presenting on
- [ ] Backup screen recording ready and accessible
- [ ] Notifications off, unrelated tabs closed

**Slides (if applicable)**
- [ ] Every slide earns its place
- [ ] No slide is a wall of bullet points you will read aloud
- [ ] Slide count is appropriate for the time available

**Rehearsal**
- [ ] Timed run-through completed
- [ ] Tested with at least one other person
- [ ] Hard questions prepared and answered

**On the day**
- [ ] Arrive / log in early
- [ ] Confirm screen share or HDMI works before it is your turn
- [ ] Backup recording accessible from a second device if possible

---

## What Comes Next

Presentation Prep and the Pitch Deck are closely related.

The difference: a presentation is a live performance optimised for the room you are in. A pitch deck is a document that needs to work without you in the room — sent as a PDF, forwarded to a partner, read by someone who was not there.

The **Pitch Deck** module covers that transition.
