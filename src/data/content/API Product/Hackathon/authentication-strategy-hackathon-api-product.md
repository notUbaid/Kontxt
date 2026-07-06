---
title: Authentication Strategy
slug: authentication-strategy
phase: Phase 1
mode: hackathon
projectType: api-product
estimatedTime: 10-15 min
---

# Authentication Strategy

This is a decision, not an implementation — actual auth code comes in Phase 3. Right now you're choosing the *right* mechanism, matched to the target developer you locked in Phase 0. Most hackathon teams either skip auth entirely (a real problem) or build OAuth they don't need (a bigger waste of time). Both are avoidable.

---

## Match Auth to Your Target Developer

| Target developer (Phase 0) | Right-sized auth |
|---|---|
| Backend service calling server-to-server | API key in a header |
| Frontend/mobile client with end users | Per-user token (still simple — not necessarily full OAuth) |
| Third-party integrator | API key, strong docs around it |
| AI agent / tool-calling system | API key — simplicity matters more than flexibility here |

> **Decision Card — Confirm your match**
> Pull your locked target developer from Phase 0. If it's anything other than "frontend client with real end users who need individual accounts," you almost certainly want a single API key — not a login system.

---

## Auth Options, Compared Honestly

| Method | Setup time | Use when |
|---|---|---|
| **API key (header)** | Minutes | Backend-to-backend, AI agents, most hackathon APIs |
| **Bearer token / JWT** | Under an hour | You need per-user identity without full session infrastructure |
| **Session cookies** | Under an hour | You're also building the frontend yourself, same-origin |
| **OAuth 2.0** | Hours, often days with provider approval | You need third-party delegated access (e.g. "connect your Google account") |

> **Warning — OAuth is the most over-built auth choice in hackathon API projects.**
> Unless your core loop specifically requires a user to grant *your app* access to *their account on another service*, OAuth is solving a problem you don't have. It costs hours you don't have and rarely changes whether the demo proves your purpose statement.

---

## The Hackathon-Default: API Key Auth

For the large majority of API products in this track, this is the right call:

1. Caller sends `Authorization: Bearer <api-key>` on every request.
2. Server validates the key against a stored value.
3. Invalid or missing key → `401`, using the error shape you locked in Response Design.

> **Tip — Header, never query string.**
> `?api_key=abc123` in a URL gets logged in server logs, browser history, and proxy caches. `Authorization: Bearer <key>` does not. This is a five-second decision that prevents a real, avoidable security mistake — not extra hackathon overhead.

---

## Security Baseline (Even at Hackathon Speed)

These aren't "production polish" — they're table stakes regardless of timeline:

- [ ] API keys are never committed to git — use environment variables
- [ ] Keys are compared using a constant-time comparison, not `==` on a stored plaintext value, if you're hand-rolling validation
- [ ] All endpoints run over HTTPS (most hosting platforms give you this by default — verify, don't assume)
- [ ] Auth failures return `401` with no detail about *why* the key was wrong (don't reveal whether a key exists vs. is just invalid)

> **Tip — A `.env` file plus your hosting platform's environment variable settings is enough.**
> You don't need a secrets manager for a hackathon demo. You do need to never hardcode a key into a file that gets pushed to GitHub.

---

## What You're Not Building (And Why That's Correct)

- **Password-based user accounts** — only if your target developer is genuinely an end user managing their own login, not a developer integrating your API.
- **Role-based permissions** — skip unless your demo specifically shows different access levels.
- **Key rotation / expiry** — a real production concern, not a hackathon one. One static key per caller is fine.

---

## Design Your Auth Flow With AI

> **Copy Prompt — Auth Strategy Design**
> ```
> My target developer from Phase 0: "[paste target developer summary]"
> My route table: [paste core loop routes]
>
> Recommend the simplest auth method that fits this target developer —
> default to API key auth unless there's a specific reason OAuth or
> per-user tokens are required. Outline:
- where the key is sent (header) and validated
- the exact 401 error response, matching my locked error shape
- what NOT to build (be specific about what would be over-engineering
>   for this scope)
> ```

> **Tip — Ask explicitly what to skip, not just what to build.**
> AI defaults toward "complete" solutions unless told otherwise. Asking it to name what's unnecessary produces better scope discipline than asking only for a recommendation.

---

## Validate the Output

- If AI recommends OAuth or a full user system without your target developer specifically requiring delegated third-party access, override it — that recommendation doesn't fit hackathon constraints.
- Confirm the suggested `401` response matches the error envelope you locked in the previous module, not a new shape.
- Check that key storage/comparison guidance doesn't suggest logging the key anywhere, including error messages.

---

## Lock Your Auth Strategy

- [ ] Auth method chosen, matched to your actual target developer
- [ ] Key sent via header, never query string
- [ ] 401 response shape matches your locked error envelope
- [ ] Security baseline checklist confirmed
- [ ] Explicitly decided what you're *not* building, and why

---

## What's Next

**API Documentation Strategy** — decide how callers will actually learn to use your API, before you write a single line of implementation code.
