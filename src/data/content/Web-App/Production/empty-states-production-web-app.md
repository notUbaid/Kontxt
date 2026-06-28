---
title: Empty States
slug: empty-states
phase: Phase 1
mode: production
projectType: web-app
estimatedTime: 15–20 min
---

# Empty States

An empty state is what users see when there's no data to display.

It happens constantly: a new user with no activity, a search with no results, a filter that matches nothing, a feed with no posts, an inbox with no messages.

Most apps treat this as a null case. Great apps treat it as a moment.

---

## Why Empty States Are a Product Decision

Empty states are not a UI edge case. They are often the **first experience a user has with a feature.**

A new user who signs up and lands on an empty dashboard will immediately ask: *Am I in the right place? What am I supposed to do?*

If you don't answer that question, they leave.

Empty states are your opportunity to:
- Orient the user
- Drive the first meaningful action
- Build confidence that the product works
- Reduce churn from confusion

---

## The Three Types of Empty States

Not all empty states are equal. Identify which type you're dealing with before designing.

### 1. First-Use Empty State
**Trigger:** User has never created any content yet.

This is the most important type. The user is new, possibly unfamiliar with the product, and looking for a signal. This state should:
- Explain what belongs here
- Tell the user what to do next
- Provide a direct action (a button, not a link)

> **Example:** A project management tool where a new user has no projects. Show an illustration or icon, one sentence explaining what projects are, and a "Create your first project" button.

---

### 2. User-Cleared Empty State
**Trigger:** User has completed all items (read all notifications, resolved all issues, finished all tasks).

This is actually a positive moment. The user did something — reward it.

> **Example:** An inbox at zero. "You're all caught up." is far better than showing the same confused empty state as a first-time user.

Treat completion differently from absence.

---

### 3. No-Results Empty State
**Trigger:** A search or filter returned nothing.

This state must communicate:
- Why there are no results (the query, the filter)
- What the user can do about it (clear filter, try a different search, broaden criteria)

Never show a no-results state without giving the user a next action.

---

## Anatomy of a Good Empty State

```
┌──────────────────────────────────────┐
│                                      │
│          [Illustration / Icon]       │  ← Visual anchor
│                                      │
│         No projects yet              │  ← Clear headline
│                                      │
│   Create your first project to       │  ← One-sentence explanation
│   start tracking your work.          │    (what belongs here)
│                                      │
│      [ + Create Project ]            │  ← Primary CTA
│                                      │
│   or import from GitHub →            │  ← Optional secondary path
│                                      │
└──────────────────────────────────────┘
```

**Every empty state needs:**
- A visual signal (icon or illustration)
- A clear headline (what is empty)
- An explanation (what belongs here, or why it's empty)
- A primary action (what to do next)

**Optional but valuable:**
- A secondary action or link
- A reassuring tone for completion states

---

## What to Avoid

**A blank white void**
The worst empty state. No icon, no text, no action. Users think the page is broken.

**Generic placeholder text**
"No data available" tells the user nothing. Be specific: "No invoices found for this period."

**Treating all empty states the same**
A first-use state and a no-results state have completely different emotional contexts. Design them separately.

**Hiding empty states behind loading states**
If the page loads successfully but returns empty, do not keep showing a skeleton. Show the empty state.

**Dead-end empty states**
Any empty state without a next action is a dead end. Every empty state should give the user somewhere to go.

---

## Copy Standards

| Bad | Good |
|---|---|
| No data available | You haven't created any reports yet |
| Nothing to show | No results for "invoice" — try a different keyword |
| Empty | You're all caught up — no new notifications |
| No items found | This filter returned no results. Clear filters to see all items |

Write from the user's perspective. Be specific. Tell them what happened and what they can do.

---

## Empty States by Feature Type

| Feature | First-Use Copy | Action |
|---|---|---|
| Dashboard | "Your dashboard is empty — add your first widget." | Add Widget |
| Inbox | "No messages yet." | Compose Message |
| Search results | "No results for '[query]'." | Clear Search |
| Activity feed | "No activity yet. Invite your team to get started." | Invite Team |
| Notifications | "You're all caught up." | (no action needed) |
| Saved items | "Nothing saved yet. Bookmark items to find them here." | Browse Items |

---

## Implementation Checklist

- [ ] Every list, table, or feed has an explicit empty state component
- [ ] First-use empty states are distinct from no-results empty states
- [ ] Completion states (inbox zero, all-done) have a positive tone
- [ ] Every empty state has at minimum: an icon, a headline, and one action
- [ ] No-results states repeat what the user searched/filtered, so they understand why
- [ ] Copy is specific to the feature, not generic ("No data")
- [ ] Empty states are tested by actually clearing all data, not just assumed to work

---

## AI Prompt — Empty State Copy

Use this when you know the feature but haven't written the empty state copy yet:

```
You are a product writer for a [describe your app in one sentence].

Write empty state copy for the following features. For each, provide:
- Headline (under 6 words)
- Subtext (one sentence, specific, helpful)
- Primary CTA button label (2–4 words)
- Tone: [choose: professional / friendly / minimal]

Features needing empty state copy:
[list your features — e.g. "Projects list, Notifications, Search results, Activity feed"]

Rules:
- Never use "No data available" or any generic placeholder
- Subtext must say what belongs here OR what the user can do
- CTA must be an action verb
- Completion states (inbox zero, all tasks done) should feel rewarding, not neutral
```

---

## When Empty States Are Not Enough

Some features have a cold-start problem that an empty state alone can't solve.

If your product requires other users or external data to be useful (a social feed, a marketplace, a team inbox), consider:

**Demo/sample content** — pre-populate with realistic example data so the user immediately sees the value of a full state. Make it clearly marked as sample data with a dismiss option.

**Onboarding prompts** — an empty state that links to a setup flow, not just a single action.

**Progressive disclosure** — only show features once a prerequisite is met (e.g., don't show "Team Activity" to a user who hasn't invited anyone).

Empty states are a symptom. If too many users are seeing them too often, the answer is onboarding design, not better illustration.
