---
title: Changelog
slug: changelog
phase: Phase 5
mode: personal
projectType: api-product
estimatedTime: 15–20 min

---

# Changelog

App changelogs are a nice-to-have. API changelogs are load-bearing. When you change a web app, users see the new version and adapt in real time. When you change an API, someone else's production code is running against yours — and if you change something without telling them, their app breaks while they're asleep, with no idea why. A changelog is how you keep that trust intact.

You already defined a versioning strategy in Phase 1. This module is where that strategy becomes something developers can actually read and act on.

---

## The Decision: What Counts as Breaking?

Get this wrong and either your changelog cries wolf on every entry, or it stays silent on the changes that actually break integrations. Use this as your baseline:

| Change | Breaking? |
|---|---|
| Adding a new optional field to a response | No |
| Adding a new endpoint | No |
| Adding a new optional request parameter | No |
| Removing or renaming a field | Yes |
| Changing a field's type (string → number) | Yes |
| Changing a default value's behavior | Yes |
| Changing status codes for an existing case | Yes |
| Tightening validation on existing fields | Yes |
| Fixing a bug that some integrations relied on | Yes — even if it was "wrong" before |

> ** Best Practice:** If you're unsure whether a change is breaking, treat it as breaking. The cost of an unnecessary deprecation notice is a few minutes of developer attention. The cost of a silent breaking change is a production incident on someone else's system, with your name on it.

---

## Format

Use a structure close to [Keep a Changelog](https://keepachangelog.com), adapted with a `Breaking` category since that distinction matters more for APIs than for most software:

```markdown
## [1.4.0] — 2026-06-28

### Breaking
- `GET /v1/items` no longer returns `internal_status`. Use `status` instead. Removed after a 90-day deprecation window (see 2026-03-28 entry).

### Added
- `POST /v1/items` now accepts an optional `tags` array.
- New `GET /v1/items/{id}/history` endpoint.

### Fixed
- `price_cents` was occasionally returned as a string for items created before 2026-01-01. Always returns as an integer now.

### Deprecated
- `sort=name` on `GET /v1/items` is deprecated in favor of `sort=name_asc` / `sort=name_desc`. Will be removed 2026-09-28.
```

Every entry answers one question: **what does this mean for my integration?** Not "what did we merge."

---

## Deprecation Policy

Breaking changes shouldn't appear out of nowhere — they should appear twice: once as a `Deprecated` warning, once as the `Breaking` removal, separated by a real grace period.

1. **Announce** — add a `Deprecated` entry with the replacement and a removal date (30–90 days out is standard for a personal-scale API; give yourself more room than you think you need).
2. **Warn at runtime** — if feasible, add a `Deprecation` response header on affected requests so developers get warned even if they never read the changelog.
3. **Remove** — only after the stated date, with a `Breaking` entry linking back to the original deprecation.

> **️ Warning:** Removing something the same week you deprecate it isn't a deprecation policy, it's a breaking change with extra steps. The entire point of the grace period is giving integrations time to update before they break.

---

## Hand-Curated, Not Auto-Generated

Your git log and PR history are a reasonable input for drafting, but never publish them directly as your changelog. Commit messages describe implementation ("refactor item serializer"); a changelog describes consumer impact ("`price_cents` is now always an integer"). Auto-generating from commits optimizes for the wrong audience.

> ** Tip:** Use your commit/PR history to remember what happened, then hand-write (or AI-assist) the translation into consumer-facing language. The raw list is research material, not the deliverable.

---

## AI Prompt

**Prompt: Translate commits into a changelog entry**

```text
Here are my recent commits/PR titles for this release: [paste list].

Write a changelog entry in this format:

## [version] — date
### Breaking / Added / Changed / Fixed / Deprecated (only include categories that apply)
- One line per change, written for an external API consumer

Requirements:
- Describe consumer-visible impact, not implementation detail ("refactor" or "cleanup" commits should not appear unless they changed behavior)
- Mark anything that changes a field type, removes a field, or changes default behavior as Breaking, even if the commit message doesn't call it that
- Flag any commit you're unsure about instead of guessing its category
```

---

## Validation Checklist

- [ ] Every entry is dated and versioned
- [ ] Breaking changes are in their own clearly labeled category, not buried under "Changed"
- [ ] Every deprecation has a stated removal date
- [ ] Every removal entry links back to its original deprecation entry
- [ ] Entries describe consumer impact, not internal implementation
- [ ] No entry requires reading your source code to understand

---

## Common Mistakes

> **️ Warning:** Burying breaking changes inside a generic "Changed" section. A developer skimming for risk should be able to scan just the `Breaking` headers across every release and know exactly what to check.

> **️ Warning:** Publishing internal security fix details before users have had time to patch. Write these generically ("Improved input validation on the items endpoint") rather than describing the exact exploit — you're documenting for consumers, not disclosing a vulnerability report.

> **️ Warning:** Skipping the deprecation step for a "small" change. There's no such thing as a small breaking change from the consumer's side — their integration either still works or it doesn't.

---

## Security Note

Security-related fixes belong in the changelog, but described by their effect ("tightened rate limiting on authentication endpoints"), never by mechanism. Enough detail to reassure existing users something was addressed; not enough to hand an attacker a roadmap to unpatched instances of similar systems.

---

## Implementation Checklist

- [ ] Changelog format decided and first entries backfilled for existing releases
- [ ] Breaking-change criteria documented so future-you applies it consistently
- [ ] Deprecation window length decided (30–90 days) and applied to any current deprecations
- [ ] Changelog linked from both the quick start and the SDK README
- [ ] Process in place: changelog entry written before or during release, not after

---

## What's Next

Next in Phase 5: **Status Page** — giving developers a place to check uptime and incidents without opening a support ticket.
