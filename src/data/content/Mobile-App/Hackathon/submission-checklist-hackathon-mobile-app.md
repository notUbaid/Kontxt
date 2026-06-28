---
title: Submission Checklist
slug: submission-checklist
phase: Phase 5
mode: hackathon
projectType: mobile-app
estimatedTime: 15–20 min
---

# Submission Checklist

Submissions close on time. Not on "almost on time."

Teams get disqualified or marked down for missing assets, broken links, and incomplete forms — not because their product was bad, but because they ran out of time to submit properly.

This module is your final gate. Nothing ships until this checklist is clear.

---

## The Submission Window

Start your submission at least **2 hours before the deadline.**

Not 30 minutes. Not 1 hour.

Submission platforms crash under load near deadlines. Video uploads stall. Links break. Forms time out. You need buffer to fix what goes wrong — and something always goes wrong.

> Set a hard internal deadline: submission complete 2 hours before official close.

---

## Universal Submission Assets

Every hackathon requires some version of these. Prepare them all regardless of what the specific form asks for.

| Asset | Format | Where It Comes From |
|---|---|---|
| **Project name** | Text | Finalised early |
| **One-line description** | Text, ~140 chars | Pitch deck solution slide |
| **Full description** | Text, 200–500 words | Generated below |
| **Demo video** | MP4, 2–5 min | Screen recording + narration |
| **Pitch deck** | PDF or link | Phase 5 Pitch Deck module |
| **Screenshots** | PNG, 3–5 images | Phase 3 Play Store Mockups |
| **Project banner / cover** | PNG, varies by platform | Feature Graphic from mockups |
| **GitHub / source link** | URL | Your repo |
| **Live demo link** | URL | Deployed app or TestFlight/APK |
| **Team member details** | Names + emails | Collected from team |
| **Tech stack tags** | Multi-select | Know your stack |

Prepare every one of these before opening the submission form. Filling out the form should take 10 minutes, not 90.

---

## The Project Description

Most submission platforms ask for a short and a long description. Write both now.

```
Copy Prompt ↓
```

> Write two descriptions for a hackathon submission for a mobile app called [App Name].
>
> Context:
- Problem: [describe]
- Solution: [describe]
- Core features: [list 3–5]
- Tech stack: [list]
- Target user: [who]
>
> Output:
> 1. One-liner (under 140 characters) — punchy, benefit-focused, no jargon
> 2. Full description (250–400 words) — problem, solution, how it works, what makes it technically interesting, what you'd build next. Tone: confident, clear, human. Avoid startup clichés.

---

## The Demo Video

This is the highest-impact submission asset after the product itself.

Judges who cannot attend the live demo will watch this. Judges who did attend will rewatch it during scoring.

**Minimum viable demo video:**
- 2–5 minutes
- Screen recording of the app running on a physical device
- Narration (your voice, or a teammate's)
- Covers: problem intro → core flow → key feature → close

**How to record:**

| Platform | Tool |
|---|---|
| iOS device to Mac | QuickTime Player → File → New Movie Recording → select iPhone |
| Android device | Scrcpy (free, open source) + OBS or QuickTime |
| Simulator | QuickTime screen record or macOS screenshot tool |
| Flutter / Expo | `adb screenrecord` for Android |

**Edit in:** CapCut, iMovie, DaVinci Resolve, or Descript for quick narration + trim.

>  Upload your demo video to YouTube (unlisted) or Loom immediately after recording. Do not rely on direct file upload to the submission platform — large files fail near deadlines.

```
Copy Prompt ↓
```

> Write a narration script for a 3-minute demo video for a mobile app called [App Name]. Structure: 20-second intro (problem + app name), 90-second core demo walkthrough (beat by beat for these screens: [list screens]), 30-second technical highlight ([what's technically interesting]), 20-second close (vision + call to action). Narration should be natural and spoken, not read like a script. Under 350 words total.

---

## GitHub Repository Checklist

Judges and technical reviewers will look at your repo.

- [ ] README.md exists and explains: what the app is, how to run it, tech stack
- [ ] `.env.example` included with all required variable names (no real values)
- [ ] `.env` and `firebase-config.js` / `google-services.json` are in `.gitignore`
- [ ] No API keys, service account JSONs, or secrets committed to the repo
- [ ] Final working code is on `main` branch
- [ ] Commit history is not empty (shows real development activity)
- [ ] If monorepo: clear folder structure with `/mobile`, `/backend` labelled

```
Copy Prompt ↓
```

> Write a README.md for a hackathon mobile app called [App Name]. Include: one-paragraph description, tech stack list, prerequisites, setup instructions (clone → install → env setup → run), key features list, and team credits. Tone: clean and professional. Format: proper Markdown with headers and code blocks.

---

## App Access for Judges

Judges need to try your app. Make this frictionless.

**Options in order of preference:**

| Method | Effort | Judge Experience |
|---|---|---|
| Expo Go QR code | Very low | Instant on iOS + Android |
| TestFlight (iOS) | Medium | Native install, best experience |
| APK direct download | Low | Android only, requires "unknown sources" |
| Screen recording only | None | Judges cannot interact |
| Web preview (if applicable) | Low | Limited native features |

For most hackathons: **Expo Go QR code** is the fastest path. Include it in your README, your submission form, and a slide in your deck.

If you have an Expo app:
```bash
npx expo start --tunnel
```
Screenshot the QR code. Upload it everywhere.

>  If using Expo Go: confirm your app works in Expo Go, not just in a development build. Some libraries require a custom dev client and will silently fail in Expo Go.

---

## Pre-Submission App Audit

Walk the entire app one final time as a stranger would.

- [ ] App opens without crashing
- [ ] Login / guest flow works end to end
- [ ] Core feature works with demo data loaded
- [ ] No visible console errors during demo flow
- [ ] No placeholder text visible ("TODO", "Lorem ipsum", "Test")
- [ ] All images load on the demo device
- [ ] Loading states appear on all data screens
- [ ] Empty states appear correctly on empty screens
- [ ] Native feature works on physical device
- [ ] App does not crash on back navigation
- [ ] Dark/light mode consistent throughout

---

## Final Submission Checklist

Work through this in order. Do not submit until every box is checked.

**Assets ready:**
- [ ] One-liner description written
- [ ] Full description written (250–400 words)
- [ ] Demo video recorded, edited, and uploaded to YouTube/Loom
- [ ] Pitch deck exported as PDF
- [ ] 3–5 polished screenshots ready
- [ ] Feature Graphic / banner ready
- [ ] App icon is not the default placeholder

**Repository:**
- [ ] README complete
- [ ] No secrets in the repo
- [ ] `.env.example` present
- [ ] Final code on `main`

**App access:**
- [ ] Expo QR / TestFlight / APK link working
- [ ] Demo account signed in on demo device
- [ ] QR code screenshot ready to paste

**Submission form:**
- [ ] All team member details collected
- [ ] Tech stack tags selected
- [ ] All required fields filled
- [ ] All links tested (repo, demo video, live app)
- [ ] Submitted with at least 2 hours to spare

---

## After Submission

**Do not keep building after submitting.**

Bugfix-driven commits after the deadline look like you missed it. A clean final state is better than a rushed last-minute push.

Instead:
- Rehearse the demo one more time
- Confirm the demo device is charged and configured
- Rest

You shipped something real. That matters regardless of the outcome.

---

## Next Step

Submission is done when the form is submitted, the confirmation email is in your inbox, and your demo device is ready.

Move to **Presentation Prep** — your final step.
