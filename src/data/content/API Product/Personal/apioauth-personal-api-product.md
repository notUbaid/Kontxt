---
title: OAuth
slug: oauth
phase: Phase 2
mode: personal
projectType: api-product
estimatedTime: 15 min
---

# OAuth

You decided in **Authentication Strategy** that API keys, not OAuth, are the right mechanism for your MVP — and for most personal API products, that decision holds. This module exists anyway, for two reasons: understanding OAuth well enough to recognize when you'd actually need it, and having a real architectural sketch ready if a future use case genuinely requires it.

## What OAuth Actually Solves

OAuth exists for one specific problem API keys can't solve: **letting your API act on behalf of a user, at a third-party service, without ever seeing that user's password for that service.**

If your API needs to say "connect your Google Calendar" or "post to this user's Twitter account," that's OAuth's problem to solve — not because it's more secure in general, but because it's the only mechanism designed for delegated, revocable, third-party access.

> **Tip:** The test is specific: does your API need to act *as* someone *at another service*? If the answer is no — if your API only manages its own data, accessed by callers using their own key — you don't need OAuth, no matter how "official" or scalable it sounds.

## The Flow, Conceptually

```
1. Your app redirects the user to the third-party service's authorization page
2. User approves access (at the third party's site, entering the third party's credentials — never yours)
3. Third party redirects back to your app with a temporary authorization code
4. Your backend exchanges that code for an access token (server-to-server, not visible to the browser)
5. Your API uses that access token to make requests to the third party, on the user's behalf
6. Access tokens expire; a refresh token (if granted) is used to get new ones without re-prompting the user
```

Every step matters for security — particularly step 4 happening server-to-server. A client-side exchange of the authorization code for a token would expose your client secret, which defeats the entire model.

## Where This Gets Genuinely Complex

This is exactly why deferring OAuth until you have a real need is the right call for a personal project:

| Complexity | Why it's real work |
|---|---|
| Token storage | Access and refresh tokens need secure, encrypted storage — a bigger surface than hashed API keys |
| Expiry handling | Access tokens expire (often in an hour); your API needs to detect this and use the refresh token transparently, or fail gracefully |
| Refresh token rotation | Some providers rotate refresh tokens on use — your system needs to handle that correctly or lose access permanently |
| Per-provider quirks | Google, GitHub, Twitter/X, and others each implement OAuth with real differences in scopes, token formats, and edge cases |

> **Warning:** A broken OAuth implementation doesn't fail loudly — it fails as "user's access randomly stops working after an hour" or "refresh silently breaks after the third rotation." These bugs are genuinely harder to catch than a bad API key check, which is one more reason to only take this on when a real use case demands it.

## If a Real Use Case Emerges

Should a future phase of this project genuinely need OAuth — say, "let a caller connect their own third-party weather station account" — the architecture you'd add:

```
oauth_connections
  id (PK)
  owner_id (FK, indexed)
  provider (e.g. "google")
  access_token (encrypted at rest)
  refresh_token (encrypted at rest)
  expires_at
```

This lives alongside, not instead of, your existing `api_keys` table — a caller still authenticates to *your* API with their own API key; the OAuth tokens are what *your API* then uses to act on their behalf at the third-party service. These are two separate, layered concerns.

## Personal Mode: Confirm the Deferral, Don't Just Assume It

```
My API's use cases: "[paste from MVP Scope]"

Confirm: does any of these use cases require my API to act on behalf of a caller at a third-party service (not just call third-party APIs with my own credentials)?
If yes, identify exactly which use case and which third-party provider.
If no, confirm API keys remain sufficient and OAuth can stay deferred.
```

Run this once, as a genuine check rather than a formality — it's easy to conflate "my API calls a third-party API" (which just needs your own service-level credentials, no OAuth) with "my API acts as a specific user at a third-party service" (which does need OAuth). Only the second one applies here.

## Before You Continue

- [ ] I understand OAuth solves delegated third-party access, not general API authentication
- [ ] I've confirmed none of my current use cases require it
- [ ] I know where OAuth tokens would live in my schema if a future use case requires adding it

When all three are checked, move to **JWT**.
