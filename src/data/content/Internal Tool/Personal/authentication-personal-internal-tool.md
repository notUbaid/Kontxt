---
title: Authentication
slug: authentication
phase: Phase 2
mode: personal
projectType: internal-tool
estimatedTime: 15–20 min
---

# Authentication

User Architecture settled who's using this tool and roughly how much protection your data needs. This module turns that decision into an actual mechanism — or confirms, explicitly, that none is needed.

---

## Match the Mechanism to the Decision You Already Made

Don't re-litigate the access control question here — implement the answer from User Architecture as simply as possible.

| Your User Architecture decision | Authentication approach |
|---|---|
| Single user, low-sensitivity data, local/private network only | None needed — skip this entirely |
| Single user, hosted publicly, some data sensitivity | Simple password gate |
| Shared with one trusted person | Single shared password |
| Full multi-user, distinct accounts needed | Real authentication system (see below) |

> **Rule of thumb**
> If you decided "no access control needed" in User Architecture, don't second-guess that here by adding login screens "just in case." Implement the decision you already made deliberately.

---

## The Simple Password Gate, Done Right

For most personal internal tools reachable by a public URL, a single password gate is genuinely sufficient — but it's worth doing correctly rather than carelessly.

- Is the password stored as plain text anywhere in your code or database? (It should never be — even for a single password, use basic hashing if it's stored at all)
- Is the password sent over HTTPS, not plain HTTP?
- Is there a reasonable session mechanism, so you're not re-entering the password on every single page load?

> **Example**
> A password gate that checks input against an environment variable (not hardcoded in your source code) and sets a session cookie on success is a proportionate, secure-enough approach for this scale — without needing a full user table or account system.

---

## Never Hardcode Credentials Into Your Codebase

This is the one non-negotiable rule regardless of scale. Even for a single-user personal tool, a password or secret committed directly into your source code becomes a real problem the moment that code is pushed to any public repository.

> **Best practice**
> Store your password or any secret in an environment variable, not in a file that gets committed to version control. This is a five-minute setup step that prevents a genuinely common, embarrassing mistake.

---

## If You Do Need Real Authentication

If you've decided you genuinely need full account-based authentication — either because multiple distinct users require separate data, or because you want the practice — don't build this from scratch. Authentication is one of the areas where a well-tested, existing solution meaningfully outperforms a custom implementation, even for learning purposes.

- Does your chosen tech stack have a well-documented, widely-used authentication library or built-in service?
- Does it handle password hashing, session management, and basic security defaults for you?

> **Watch out for building auth from scratch**
> Rolling your own password hashing or session handling is one of the few places where "learn by building it yourself" carries real risk rather than just extra effort — mistakes here are easy to make and hard to notice until they matter. Use an established library, and spend your learning effort elsewhere.

---

## What "Logged In" Should Feel Like for One User

If you do add any login step, make sure it doesn't reintroduce the friction Phase 1's Forms Design worked to remove. A personal tool you check daily shouldn't demand frequent re-authentication.

> **Example**
> A session that stays valid for weeks, on your own trusted device, is a reasonable trade-off for a personal tool — security requirements appropriate for a bank are not appropriate for your invoice tracker.

---

## Using AI to Implement This Correctly

> **Copy this prompt**
> ```
> I'm adding [a simple password gate / basic authentication] to a
> personal internal tool built with [your stack from Tech Stack
> module].
>
> Requirements:
> - [Single password stored securely, not hardcoded] or
>   [describe your actual chosen approach]
> - Session should persist reasonably long, since I'm the only
>   trusted user on my own device
> - Must use HTTPS and avoid storing secrets in source code
>
> Show me the simplest correct implementation for my stack. Flag
> anything in your suggestion that would require a paid service or
> unnecessary complexity for a single-user personal tool.
> ```

> **Validation warning**
> Before accepting AI-generated authentication code, check specifically: is any password or secret hardcoded anywhere in the output? Is it clearly reading from an environment variable instead? This is worth a manual check every time, regardless of how simple the implementation looks.

---

## What You Should Have Now

- Authentication approach matched exactly to your User Architecture decision — nothing added "just in case"
- Confirmation no password or secret is hardcoded in your source code
- HTTPS confirmed for any credential transmission
- A session duration that matches personal-tool usage, not enterprise security norms

With access to the tool decided, the next module — Authorization (RBAC) — addresses what happens *after* login: whether different actions or data need different levels of access, even within a small user base.
