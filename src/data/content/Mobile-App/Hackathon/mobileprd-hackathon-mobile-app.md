---
title: PRD
slug: prd
phase: Phase 1
mode: hackathon
projectType: mobile-app
estimatedTime: 20–30 min
---

# PRD

A Product Requirements Document sounds like corporate overhead.

In a hackathon, it is the opposite.

Without a shared written definition of what you are building, your team will make conflicting assumptions, build mismatched pieces, and spend hours reconciling them instead of shipping. A lean PRD eliminates that waste in 30 minutes.

You are not writing this for a product manager. You are writing it for your team — so everyone builds the same app.

---

## What a Hackathon PRD Is Not

- Not a 20-page specification
- Not a business case
- Not a market analysis
- Not a requirements backlog

It is a single document — one page if possible — that every team member has read and agreed to before writing a line of code.

---

## The Five Sections

A hackathon PRD has exactly five sections. Write each one concisely. Bullet points over prose. Speed over perfection.

---

### 1. The App

```
Name:        [App name]
Tagline:     [One sentence — your pitch]
Demo anchor: [The one moment judges will remember]
```

---

### 2. The User

```
Who:         [Specific user type]
Problem:     [The painful moment in one sentence]
Today:       [How they currently cope — and why it is inadequate]
```

---

### 3. The Demo Flow

Write the exact sequence of screens a judge will see during your demo. This is your north star for the entire build.

```
[Screen 1] → [Screen 2] → [Screen 3] → [WOW] → [Screen 4]
```

Every Core feature must appear in this sequence. If it is not in this flow, it is not Core.

---

### 4. Feature Scope

List only what is in scope for the hackathon build. Three columns.

| Feature | Type | Owner |
|---|---|---|
| [Feature name] | Core / Supporting / Fake | [Team member] |
| [Feature name] | Core / Supporting / Fake | [Team member] |

Keep this list to 8 items maximum. If it is longer, go back and cut.

---

### 5. Out of Scope

Explicitly name what you are not building. This is as important as the feature list.

Writing it down prevents the 3am conversation where someone says "shouldn't we add push notifications?" The answer is already in the document: no, we decided that.

```
Not building for this hackathon:
- [Feature]
- [Feature]
- [Feature]
```

---

## AI Prompt — PRD Generation

Use this to generate a first draft of your PRD immediately. Fill in the brackets, run the prompt, then review and adjust as a team.

```prompt
Generate a lean hackathon PRD for a mobile app.

App details:
- Name: [app name]
- One-sentence pitch: [your pitch]
- Target user: [specific user]
- Problem: [the painful moment]
- Current workaround: [what they do today]
- Demo anchor (wow moment): [describe it]
- Demo flow: [Screen 1 → Screen 2 → Screen 3 → ...]

Core features (must work end-to-end):
[List them]

Supporting features (exist but simplified):
[List them]

Fake features (appear in demo but are hardcoded):
[List them]

Explicitly out of scope:
[List them]

Team:
- [Member 1]: [skills/role]
- [Member 2]: [skills/role]
- [Member 3]: [skills/role]

Format the PRD as a clean, concise document using the five sections:
1. The App
2. The User
3. The Demo Flow
4. Feature Scope (table with Feature / Type / Owner columns)
5. Out of Scope

Keep it to one page. Bullet points over prose. No filler.
```

> **After generating:** Read it aloud as a team. Every disagreement or confusion you surface now saves hours of misaligned work later. Edit until every team member can describe the app consistently without referencing notes.

---

## PRD Review — Team Alignment Check

Run through these questions together before you lock the PRD.

**On the user:**
- Can everyone describe the target user in the same words?
- Does everyone agree on what the painful moment looks like?

**On the demo:**
- Can everyone walk through the demo flow from memory?
- Is the wow moment genuinely surprising or impressive — or just functional?

**On scope:**
- Is every Core feature actually buildable in the time you have?
- Does everyone agree on who owns each feature?
- Is the out-of-scope list specific enough to settle future debates?

**On the PRD itself:**
- Is there anything in the document that someone disagrees with?
- Is there anything missing that someone assumes is included?

Surface disagreements now. Every unresolved assumption becomes a bug, a misbuilt feature, or a conflict at hour 20.

---

## PRD Checklist

- [ ] All five sections are written
- [ ] Demo flow is a specific screen sequence, not a vague description
- [ ] Every feature has a Type (Core / Supporting / Fake) and an Owner
- [ ] Out of scope list is specific — not "everything else"
- [ ] Every team member has read the PRD
- [ ] Team alignment check questions are answered without disagreement
- [ ] PRD is accessible to the whole team (shared doc, Notion, or printed)

---

## What Comes Next

PRD is locked. Now you map how users move through your app.

Next module: **User Flows** — the screens, transitions, and decision points that define the full experience before you touch a design tool.
