---
title: Backend
slug: backend
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 30–40 min
---

# Backend

This is where the architecture from Phase 2 becomes real code. The decisions are already made — layered structure, error handling shape, authorization patterns, database access. This module is about implementation discipline: building features in a way that stays consistent as you add the 10th, 30th, and 100th endpoint, not just the first one.

---

## Decision 1: Build Vertically, Not Horizontally

> **Decision Card**
> Build one feature **completely** — route, service, repository, validation, error handling, tests — before starting the next feature. Don't build all your routes first, then all your services, then all your repositories. Vertical slices catch integration problems immediately; horizontal layers hide them until everything's wired together at the end.

---

## Decision 2: Validate at the Boundary

> ️ **Warning**
> Every request payload must be validated **before** it reaches your service layer — using the same Zod schemas (or equivalent) you defined for forms in State Management, ideally shared between frontend and backend so validation rules can't drift apart. Never let unvalidated data reach business logic; if a service has to defensively check whether a field exists, validation happened in the wrong place.

---

## Decision 3: Apply the Error Handling Pattern Consistently

You defined custom error classes in Backend Architecture (`ValidationError`, `NotFoundError`, `ForbiddenError`). Every service must actually use them:

- [ ] Services throw the appropriate error class — never return `null`/`undefined` and leave the controller to guess what happened
- [ ] Controllers never contain their own try/catch-and-format logic — the centralized error middleware handles that, consistently, for every route
- [ ] Every error path has been deliberately considered, not just the happy path — what happens if the resource doesn't exist? If the user doesn't have permission? If the input is malformed?

---

## Decision 4: Structured Logging

>  **Best Practice**
> Use structured logging (JSON logs with consistent fields), not scattered `console.log` statements. Every log line should include enough context to trace a single request: a request ID, the user/workspace involved, and the action being performed. This is what makes Phase 4's Logging and Error Tracking actually useful — logging discipline starts here, not as a separate retrofit later.

> ️ **Warning**
> Remove debug `console.log` statements before committing. They're easy to leave in during AI-assisted development since each generation pass might add its own, and they're a different problem than the structured logs you actually want in production — noisy, unstructured, and not tied to anything you can search or alert on.

---

## Decision 5: Don't Duplicate Business Logic

> ️ **Warning**
> When building similar features (e.g., several CRUD resources), AI tools often regenerate near-identical logic per feature instead of recognizing a shared pattern. If three resources all need "verify the user owns this workspace, then soft-delete the record, then log the action," that's a shared service function, not three near-identical copies with subtle differences that will drift over time. Watch specifically for this when building several similar features back to back.

---

## Decision 6: Write Testable Services

Services should be callable and verifiable without spinning up an HTTP server:

- [ ] A service function takes plain arguments (validated input, the authenticated user/workspace context) and returns a plain result or throws a defined error
- [ ] No service function reaches into `req`/`res` objects directly — that's the controller's job to extract from and pass down

This isn't just style — it's what makes the Testing module (coming up in this phase) straightforward instead of requiring a full integration test for every business rule.

---

## Decision 7: Review Every Generated File

> ️ **Warning**
> You are accountable for what ships, not the AI tool that generated it. Read every generated file before committing — especially the error paths, the authorization checks, and any database query. This isn't about distrusting AI broadly; it's about the same discipline a senior engineer applies to any pull request, including their own.

---

## Common AI Mistakes to Watch For

- **Puts business logic directly in route handlers** — push back and require the three-layer split every time.
- **Skips backend validation** because frontend already validates — always require both; frontend validation is UX, backend validation is the actual security boundary.
- **Returns inconsistent shapes on error** ("sometimes throws, sometimes returns null") — require the defined error class pattern explicitly.
- **Leaves `console.log` debug statements** in generated code — review for these before committing.
- **Duplicates near-identical logic across similar features** instead of extracting a shared function — actively look for this when building several similar resources in sequence.

---

## AI Prompt: Build a Complete Feature Vertical Slice

```
Implement the complete backend for the [feature name] feature in a production SaaS, as one vertical slice: route, service, repository, validation, and tests.

Follow these patterns exactly:
- Validate input with a Zod schema before it reaches the service layer
- Service layer throws ValidationError / NotFoundError / ForbiddenError as appropriate — no HTTP knowledge in the service
- Repository layer is the only code that queries the database directly
- Use structured logging (not console.log) including a request ID and the acting user/workspace at key decision points
- If this resembles [an existing feature], reuse its shared logic rather than duplicating it — point out explicitly if you find a shared pattern worth extracting

Feature requirements: [describe the feature]

After generating, list every error path you handled (not just the happy path) so I can verify nothing was skipped.
```

---

## Validate Before You Move On

- [ ] Each feature was built as a complete vertical slice before moving to the next
- [ ] Every request is validated at the boundary before reaching business logic
- [ ] Every service throws the correct defined error class — no silent `null` returns on failure
- [ ] Logging is structured and includes request/user/workspace context — no leftover `console.log`
- [ ] No business logic is duplicated across similar features where a shared function would do
- [ ] Services are testable without an HTTP server
- [ ] You've personally read every generated file, not just skimmed the diff

> [!TIP]
> Keep a running note of any shared logic you extract while building — it's exactly the kind of pattern worth mentioning explicitly in future prompts ("reuse the `assertWorkspaceMembership` helper") instead of letting AI regenerate it slightly differently each time.

---

**Next:** Frontend — build the UI that consumes these endpoints.
