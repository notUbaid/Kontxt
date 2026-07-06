---
title: Notifications
slug: notifications
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Notifications

Your automations from the last module can now take action on their own. Notifications are how you — or whoever else uses this tool — actually find out something happened, without having to remember to go check.

---

## Pick the Channel Based on Urgency, Not Habit

Not every notification deserves the same channel. Matching urgency to channel is the whole design decision here.

| Urgency | Channel | Example |
|---|---|---|
| Needs action soon | Email, or in-app + push if you built one | "Approval needed on Order #452" |
| Good to know, no rush | In-app notification / activity feed | "New record added by teammate" |
| Reference / audit trail | Log entry only, no active notification | "Status changed from Draft to Review" |

> ️ **Warning:** The most common notification mistake in a personal internal tool is sending everything through the highest-urgency channel — every change becomes an email. Within a week you'll stop reading them, which defeats the purpose entirely. Reserve interruption-worthy channels for things that are actually interruption-worthy.

---

## In-App Notifications: The Right Default for Solo/Small-Team Tools

For most personal-mode internal tools, an in-app notification (a small list/feed the user checks when they open the tool) is the right default — it's simpler to build than email infrastructure and doesn't risk landing in spam or getting ignored.

**Minimum viable in-app notification system:**

```
Notifications table: id, user_id, message, link, read_at, created_at
```

That's enough. You don't need categories, priorities, or preferences until you've actually felt the need for them.

---

## When Email Actually Earns Its Complexity

Add email only when the notification needs to reach someone who isn't actively in the tool — an approval request to a teammate who checks email but not your internal tool daily, for instance.

**Before adding email, confirm:**
- The recipient genuinely won't see this in-app in a reasonable time
- You have a real, working email-sending service already chosen (not something to figure out mid-build)
- You're comfortable with the added cost/complexity (see your Cost Estimation module) for something a simpler channel might cover

---

## AI Prompt: Build the Notification System

```
Build a notification system for my internal tool.

Notifications needed:
[list them — e.g., "Notify the assignee when a task is assigned to them", "Notify me when an approval is pending more than 24 hours"]

Requirements:
- In-app notifications stored in a table: [paste minimal schema above, or your variant]
- A function to create a notification, callable from anywhere in the app (CRUD functions, automations)
- Mark-as-read functionality
- A simple UI: unread count badge, dropdown/list of recent notifications, click to navigate to the related record
- [If needed] Email for: [list only the truly urgent ones] via [your email service]
- Don't build user notification preferences/settings yet — I'll add that only if I actually need it
```

The last line matters — notification preference systems are a classic case of building configurability before you have a second real use case that needs it.

---

## Validating the Generated System

-  **Confirm notifications are actually created at the right trigger points** — walk through each automation from the previous module and check it fires a notification where you specified
-  **Test mark-as-read** actually persists and reflects in the unread count — a common bug is a UI that shows "read" optimistically but doesn't save it
-  **Check the notification links to the right record** — a notification that doesn't take you to the relevant Order/Task is a dead end, not a shortcut
-  **If using email, test the failure path** — what happens if the email service is down? It shouldn't block the action that triggered it (same principle as the previous module)
-  **Count how many notifications a normal day of usage would generate** — if the honest answer is "a lot," you've likely over-notified and should cut some back to log-only

>  **Tip:** Build this, then use the tool normally for a few days before adding anything more. You'll quickly feel whether you're under-notified (missing things) or over-notified (ignoring the badge) — that real feedback is worth more than trying to guess the right level upfront.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Sending everything via email | Trains you to ignore notifications within days |
| Building preference/settings systems prematurely | Adds complexity for a personalization need you may never actually have |
| Notifications with no link to the relevant record | Forces a manual search instead of a one-click jump |
| No read/unread state | Old and new notifications become indistinguishable, so the feed stops being useful |
| Letting a failed notification block the action that triggered it | A notification failing shouldn't mean the underlying work didn't happen |

---

## Before You Move On — Checklist

- [ ] Each notification's urgency matches its channel (not everything is email)
- [ ] In-app notifications include a working read/unread state
- [ ] Every notification links directly to its related record
- [ ] I did not build notification preferences/settings I don't currently need
- [ ] Email (if used) fails gracefully without blocking the triggering action
- [ ] I've sanity-checked how many notifications a normal day would actually generate

---

## What's Next

With people (or just you) now reliably informed of what's happening, the next step is turning your stored data into something you can actually make decisions from — reports.
