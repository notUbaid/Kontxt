---
title: App Settings
slug: app-settings
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 15-20 min
---

# App Settings

The settings screen is one of the least glamorous parts of an app and one of the most consistently under-built by AI-assisted development — it's easy to defer because no single setting feels urgent. This module covers what a production settings screen actually needs to contain and how it should be architected, so it doesn't become a junk drawer of toggles with inconsistent persistence behavior.

---

## Decision 1 — What Belongs in Settings (and What Doesn't)

| Belongs in Settings | Doesn't Belong in Settings |
|---|---|
| Notification preferences | Anything that's actually a core feature toggle better placed contextually |
| Theme/appearance | One-time onboarding choices that shouldn't be revisited |
| Account management (email, password, linked accounts) | Admin/debug flags — keep those behind a hidden dev menu, never shipped visibly |
| Privacy controls (data export, account deletion) | |
| App permissions deep-link (to OS settings) | |
| Language/region | |
| Legal (privacy policy, terms, licenses) | |
| Support/feedback contact | |
| App version/build info | |

>  If you're unsure whether something belongs in settings, ask: would a user go looking for this, or does it make more sense surfaced at the point of use? A "default sort order" preference belongs in settings; a "sort by price" toggle on a specific list screen belongs on that screen, not buried in a settings menu the user won't think to check.

---

## Decision 2 — Persistence Architecture

Connects directly to your State Management module — settings are exactly the "persisted client state" category decided there.

```typescript
const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      theme: 'system',
      notificationsEnabled: true,
      language: 'en',
      setTheme: (theme) => set({ theme }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    { name: 'settings-store', storage: createJSONStorage(() => AsyncStorage) }
  )
);
```

> ️ **Decide explicitly which settings sync to the server (and across the user's devices) versus which stay purely local.** Theme preference might reasonably be local-only; notification preferences likely should sync server-side, since your Push Notifications backend needs to know whether to send at all, not just whether the local UI shows a toggle. A setting that's only stored locally but is supposed to control server behavior is a common, confusing bug.

---

## Decision 3 — Notification Preferences, Specifically

This is usually the most complex part of a settings screen, and it should connect directly to your Push Notifications architecture from Phase 2:

- **Granular categories, not one global on/off switch** — "order updates," "promotional," "social activity" as separate toggles, if your app sends more than one type of notification. A single global toggle forces users to choose between "all notifications" and "none," and many will choose none rather than accept noise they don't want.
- **Reflect OS-level permission state accurately.** If the user has disabled notifications at the OS level, your in-app toggle should show that, not contradict it — don't show "notifications: on" in your app's UI while the OS is silently blocking everything.
- **Changes here should write through to your backend's per-user notification preferences** (the segment/targeting data from your Push Notifications module), not just update local UI state.

---

## Decision 4 — Account Deletion (Don't Skip This)

> ️ Both the App Store and Play Store require apps that support account creation to provide account deletion within the app itself, not just via a support email — this is checked during review, and missing it is a real rejection reason. Build this now rather than discovering the requirement during submission in Phase 5.

- Deletion should be genuinely reachable — not buried behind multiple unnecessary steps designed to discourage it (this is explicitly against store guidelines, and it's also just bad practice).
- Decide what "delete account" actually does server-side: hard delete vs. anonymization vs. soft-delete-with-grace-period — this connects back to your Database Setup module's soft/hard delete decisions per table, applied here to the user's full data footprint.
- Confirm deletion cascades correctly through dependent data (the `ON DELETE` behavior decided in Database Setup) rather than leaving orphaned records.

---

## Decision 5 — Data Export

If your app handles meaningful user-generated content, and depending on your target markets' privacy regulations (GDPR right to data portability, CCPA, etc.), a data export option may be a compliance requirement, not just a nice-to-have. Decide this now, scoped to what's actually required for your user base's jurisdictions, rather than retrofitting it under regulatory pressure later.

---

## AI Prompts

### Prompt 1 — Settings Screen Implementation

```
Build a settings screen for a production [React Native] app with these
sections: [account, notifications, appearance, privacy, support, legal —
adjust to your app]

Implement: persisted local settings using the project's state management
pattern (Zustand + AsyncStorage), granular notification preference toggles
that write through to the backend (not just local state) and accurately
reflect OS-level permission status, and an in-app account deletion flow
that meets App Store/Play Store requirements.
```

### Prompt 2 — Settings Review

```
Review this settings implementation:

[paste your settings screen/store code]

Check for: settings that should sync server-side but are only stored
locally, a single global notification toggle instead of granular
categories, notification toggle state that doesn't reflect actual OS
permission status, and whether account deletion is reachable in-app
without requiring a support contact.
```

---

## Validating AI Output

- [ ] Settings that need to affect server behavior (notification preferences) write through to the backend, not just local state
- [ ] Notification preferences are granular by category, not a single all-or-nothing toggle, if multiple notification types exist
- [ ] In-app notification toggle state accurately reflects actual OS-level permission status
- [ ] Account deletion is reachable directly in-app, not only via support contact
- [ ] Account deletion correctly cascades through dependent data per the schema's delete behavior
- [ ] Debug/admin-only options are not present in the shipped settings UI

---

## What's Next

- **Analytics Events** (next in this phase) should track settings changes that matter for product decisions (e.g. notification opt-out rate).
- **Privacy Policy** and **Terms of Service** (Phase 5) are what your settings screen's legal links point to — make sure those documents exist before this screen ships.
- **Account Deletion** flow here directly determines what you can truthfully state in your **Privacy Policy** about data retention.
