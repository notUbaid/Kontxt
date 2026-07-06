---
title: Admin Panel
slug: admin-panel
phase: Phase 3
mode: personal
projectType: internal-tool
estimatedTime: 15-25 min
---

# Admin Panel

Every internal tool eventually needs a space for the operations that aren't part of the normal day-to-day flow — managing users, fixing a bad record, adjusting settings. This module is about building that space without turning it into a second application.

---

## Define "Admin" Before You Build It

For a personal-mode internal tool, "admin panel" often means one thing: **you, doing something you don't do often enough to deserve a polished UI, but do need to do occasionally.**

Before building, list what actually belongs here:

- User/access management (if others use the tool)
- Correcting bad data that a normal form wouldn't allow (e.g., manually fixing a status that got stuck)
- Viewing system-level info (recent errors, automation logs from the Workflow Automation module)
- Adjusting configuration values that shouldn't live in a `.env` file you have to redeploy to change

If your list is short, your admin panel should be short. Don't build a settings page with 20 options because "admin panels have settings pages" — build the 3-4 things you'll actually reach for.

>  **Tip:** A personal-mode admin panel is often just: a Users table view, a link to your automation/notification logs, and a couple of manual-override actions. That's a complete, useful admin panel — resist the pull to add more structure than you need.

---

## Access Control for the Admin Panel Itself

Even in a personal-mode tool used by a small team, the admin panel is the highest-consequence part of the UI — it's where bad data gets manually overridden and where user access gets managed. It deserves its own explicit check, not just "logged in."

**Minimum bar:**
- A role or flag on the user (`is_admin`, or reuse your RBAC roles from Phase 2) that's checked on every admin route/action
- The check happens server-side, not just by hiding a UI link — hiding a button is not access control

> ️ **Warning:** A common generated-code shortcut is hiding admin navigation links from non-admins in the UI while leaving the underlying routes/functions unprotected. Anyone who knows or guesses the URL can still act on them. Always enforce the check where the actual database write happens, not just where the link is rendered.

---

## AI Prompt: Build the Admin Panel

```
Build an admin panel section for my internal tool.

What it needs to do:
[list your actual needs — e.g., "view/manage users and their roles", "manually override an Order's status", "view recent automation failure logs"]

Requirements:
- Restrict access using [your role/flag from Phase 2 authorization], checked server-side on every admin action — not just hidden in the UI
- Keep this scoped to exactly what I listed above, don't add a general settings/configuration system I haven't asked for
- For manual data overrides, log who made the change and when — I need an audit trail for anything done outside the normal workflow
- Reuse existing table/form components from earlier modules where possible, don't build a separate UI system just for admin
```

The audit-trail requirement matters specifically here: admin actions bypass your normal workflow rules, which is exactly why you need a record of when that happened and by whom — even if "whom" is just future-you trying to remember what you changed.

---

## Validating the Generated Admin Panel

-  **Test the access check by hitting the admin route/action directly** (not through the UI) as a non-admin user — confirm it's actually blocked server-side, not just hidden from navigation
-  **Confirm manual overrides are logged** with who, what, and when — check the log actually gets written, not just that a log table exists
-  **Check it reuses your existing components** (tables, forms) rather than introducing a parallel UI pattern that now needs separate maintenance
-  **Confirm the scope matches your actual list** — if the generated panel includes a settings page or feature you didn't ask for, cut it rather than let it become unused surface area

>  **Tip:** If you're the only user, "admin panel" doesn't need a separate visual identity from the rest of the tool — a `/admin` route with the same design system is enough. Don't spend design effort here that the rest of the tool doesn't already have.

---

## Common Beginner Mistakes

| Mistake | Why it hurts |
|---|---|
| Access control that only hides UI, not the underlying action | Anyone with the URL can bypass it entirely |
| Building a general settings system nobody asked for | Unused surface area that still needs maintaining |
| No audit trail on manual overrides | You lose the ability to answer "wait, who changed this and why" |
| A separate UI system just for admin | Doubles the components you have to maintain for no real benefit |
| Treating the admin panel as low-stakes because "it's just for me" | It's still where the highest-consequence actions in the tool happen |

---

## Before You Move On — Checklist

- [ ] Admin access is enforced server-side on every admin action, not just hidden in the UI
- [ ] The panel covers exactly the needs I listed, nothing speculative
- [ ] Manual overrides are logged with who/what/when
- [ ] The panel reuses existing table/form components rather than a parallel UI system
- [ ] I tested a non-admin user hitting an admin action directly and confirmed it's blocked

---

## What's Next

With a controlled space for the exceptional cases, the next step is making the tool's normal data actually findable at scale — search.
