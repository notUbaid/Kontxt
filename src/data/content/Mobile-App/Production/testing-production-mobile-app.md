---
title: Testing
slug: testing
phase: Phase 3
mode: production
projectType: mobile-app
estimatedTime: 25–35 min
filename: testing-production-mobile-app.md
---

On the web, a bad deploy gets fixed in minutes. On mobile, a bad release can sit in front of users for days waiting on App Store review, and a meaningful chunk of your install base won't update for weeks. Testing isn't optional polish here — it's how you compensate for not being able to instantly undo a mistake.

## The Mobile Testing Pyramid

Not all tests are worth the same. Spend your effort where it pays off fastest.

| Layer | Catches | Speed | Typical Share |
|---|---|---|---|
| Unit | Logic bugs, bad calculations, broken validators | Milliseconds | ~70% |
| Integration | Broken API contracts, bad error handling | Seconds | ~20% |
| End-to-End | Broken critical flows, navigation breaks | Minutes | ~10% |

| Stack | Unit | Integration | E2E |
|---|---|---|---|
| React Native | Jest + React Native Testing Library | Jest + MSW (mock API) | Detox or Maestro |
| Flutter | `flutter test` | `flutter test` + mocked HTTP client | `integration_test` package |
| Native iOS | XCTest | XCTest + URLProtocol mocking | XCUITest |
| Native Android | JUnit + Mockito | JUnit + MockWebServer | Espresso |

> **Best Practice:** If your test suite is mostly E2E, you've built it upside down. E2E tests are slow, flaky on real devices/simulators, and expensive to maintain. They should cover the handful of flows that would be embarrassing to break — not every screen.

## What Actually Deserves a Unit Test

**Test:**
- Business logic (pricing, validation, formatting)
- State management — reducers, stores, view models
- Custom hooks / composables
- Utility functions (date parsing, data transforms)

**Don't test:**
- Third-party library internals
- Simple presentational components with no logic
- Pixel-perfect snapshots of entire screens

> **Warning:** Full-screen snapshot tests look like coverage but catch almost nothing real. They break on every minor styling change, train your team to blindly approve diffs, and add zero confidence. If you use snapshots at all, scope them to small, stable components.

## Integration Testing: The API Boundary

Most production bugs in mobile apps live at the seam between your app and your backend — not inside either one individually. Mock your network layer (MSW, `nock`, or a fake `URLProtocol`/`MockWebServer` depending on stack) and test all four states for every important call, not just the happy path:

- Success with expected payload
- Success with empty/edge-case payload
- Error response (4xx, 5xx)
- No network at all

Skipping the last two is the most common gap. AI-generated tests almost always default to happy-path only unless you explicitly ask for the others.

## End-to-End Testing: Pick Your Battles

| Tool | Speed | Flakiness | CI Friendliness | Best For |
|---|---|---|---|---|
| Detox (RN) | Fast | Low | Good | Gray-box, RN-native |
| Maestro | Fast to write | Low | Good | Cross-platform, YAML-based |
| Appium | Slow | Higher | Harder | Cross-platform, legacy support |
| XCUITest / Espresso | Native speed | Low | Good | Single-platform native apps |

Reserve E2E for flows where a failure means the app is effectively broken for new users: onboarding, sign-up/login, and whatever your core conversion action is (checkout, posting, booking — whatever your app's "it worked" moment is). Five to ten well-chosen E2E tests beat fifty brittle ones.

## Mobile Scenarios Most Teams Forget

These don't show up in a typical unit test suite, but they're where mobile apps actually break in production:

- [ ] App backgrounded mid-request — does it resume correctly or duplicate the action?
- [ ] No network / airplane mode — does the UI degrade gracefully or just spin forever?
- [ ] Push notification tap routes to the correct screen via deep link
- [ ] Permission denied (camera, location, notifications) — app doesn't crash or dead-end
- [ ] App force-killed and relaunched — session and in-progress state restore correctly
- [ ] Older OS version / low-end device — no silent feature failures

Most of these are worth manual test passes before release rather than full automation, at least early on. Automate them once you've been burned by one in production.

## Using AI to Generate Tests

Generic "write tests for this file" prompts produce generic, low-value tests. Give the model the same context a reviewer would need:

```
I need tests for this [function / hook / component].

Stack: [Jest + RTL / flutter test / XCTest]
Purpose: [one sentence — what this does and why it exists]
Edge cases that matter here: [list the specific business edge cases]

Requirements:
- Test behavior and outputs, not implementation details
- Include at least one failure/error-path test
- Point out any edge case in the code I haven't listed but should test
- No full-component snapshot tests

[paste code]
```

> **Validation:** Read every AI-generated test before merging it. Red flags: assertions that just check `toBeDefined()` or `not.toThrow()`, mocks so heavy the test only verifies the mock was called, and an absence of failure-path tests. A test suite that's never red is usually a test suite that isn't testing anything.

## How Much Coverage Is Enough

Don't chase 100%. Aim for 70–80% on code that handles money, auth, or persisted data, and don't bother enforcing coverage on UI glue code — you'll just get hollow tests written to satisfy the number. Coverage percentage is a smell detector, not a target.

## Wiring This Into Your Workflow

Tests should block merges automatically — that's the CI/CD topic next in **Phase 4**. For now: add a pre-push git hook that runs your unit + integration suite locally, and keep a short manual smoke-test checklist (login, core action, offline behavior) you run before every release build.

## Common Mistakes

- Testing implementation details (internal state, function call counts) instead of observable behavior
- Only testing the happy path on network calls
- Chasing coverage percentage instead of testing what actually breaks
- An E2E-heavy suite that becomes too slow and flaky to trust, then gets disabled
- Never testing offline/backgrounded/permission-denied states
- Merging AI-generated tests without reading them

## Before You Move On

- [ ] Core business logic has unit tests
- [ ] API layer has integration tests covering success, error, and offline states
- [ ] A small, deliberate set of E2E tests covers only true critical paths
- [ ] Lifecycle and permission edge cases have been tested at least manually
- [ ] Every AI-generated test has been read, not just run

Next: **Phase 4 — Production Readiness** starts with **Security** — locking down what your tests just proved works.
