---
title: Security
slug: security
phase: Phase 4
mode: production
projectType: e-commerce
estimatedTime: 30–40 min
---

# Security

At production scale, e-commerce security is not just about hashing passwords. E-commerce platforms are high-value targets for financial crime.

If your store is compromised, the consequences are not just downtime. You face devastating PCI compliance fines, class-action lawsuits for exposing PII (Personally Identifiable Information), and total loss of customer trust. Security must be implemented at the edge, in the application layer, and at the database.

---

## 1. Web Application Firewall (WAF) & Edge Security

Never expose your application servers directly to the internet.

**The Implementation:**
You must route all traffic through a WAF (e.g., Cloudflare, AWS WAF, or Vercel Edge Firewall).
1. **DDoS Protection:** E-commerce sites are frequently targeted by extortion DDoS attacks right before Black Friday. A WAF absorbs massive volumetric attacks automatically.
2. **Managed Rulesets:** Enable OWASP Top 10 rule sets. This automatically blocks common SQL Injection (SQLi) and Cross-Site Scripting (XSS) payloads before they even reach your Next.js/Node servers.
3. **Bot Management:** E-commerce is plagued by "Sneaker Bots" (inventory hoarding) and "Scraper Bots" (price stealing). Deploy behavioral bot management (like Cloudflare Bot Fight Mode) to challenge suspicious traffic with CAPTCHAs.

---

## 2. API Security (BOLA/IDOR)

The most common API vulnerability in modern applications is **Broken Object Level Authorization (BOLA)**, also known as IDOR (Insecure Direct Object Reference).

**The Exploit:**
1. User A logs in and visits their order history: `GET /api/orders/1001`
2. User A changes the URL to `GET /api/orders/1002` (which belongs to User B).
3. If the backend only checks "Is the user logged in?" but fails to check "Does this specific order belong to this specific user?", User A just stole User B's home address and credit card last 4 digits.

**The Fix:**
Never trust client-side IDs. Always enforce ownership at the database query level.
```typescript
// SECURE IMPLEMENTATION
export async function getOrder(req: Request, orderId: string) {
  const session = await getSession(req);
  if (!session) return new Response('Unauthorized', { status: 401 });

  // Notice the compound WHERE clause
  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id // Enforces that this user owns this order
    }
  });

  if (!order) return new Response('Not Found', { status: 404 });
  return Response.json(order);
}
```

---

## 3. Data Encryption (PII & PCI)

E-commerce databases contain immense amounts of PII (Names, Addresses, Phone Numbers).

**Storage Rules:**
1. **Encryption at Rest:** Ensure your managed database provider (AWS RDS, Supabase) has AES-256 encryption at rest enabled. If a physical hard drive is stolen from the data center, the data is unreadable.
2. **PCI Scope Reduction:** Do not touch raw credit card numbers. Never store them. Never log them. Use Stripe Elements or Adyen Drop-in to send card data directly from the browser to the payment processor. 
3. **Database Column Encryption:** For highly sensitive PII, consider Application-Level Encryption (encrypting the data in Node.js *before* writing it to Postgres) so that even if the database is dumped, the names and addresses are ciphertext.

---

## 4. Supply Chain Attacks (Magecart)

A "Magecart" attack is the deadliest e-commerce exploit. 
Hackers compromise a third-party script you use (e.g., a marketing popup or an analytics pixel). That script is loaded on your checkout page. The script maliciously reads the credit card keystrokes and sends them to the hacker.

**The Defense: Content Security Policy (CSP)**
You must implement a strict CSP in your HTTP response headers.
A CSP explicitly tells the browser which domains are allowed to execute scripts and which domains are allowed to receive data.

```http
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://js.stripe.com https://www.google-analytics.com; 
  connect-src 'self' https://api.stripe.com;
```
If a hacker injects `https://evil-server.com/skimmer.js`, the browser will refuse to load it because it is not in the CSP whitelist.

---

## AI Prompt — Audit Your Security Architecture

```prompt
I am auditing the security posture of a production e-commerce store.

Tech Stack:
- Frontend: [e.g., Next.js]
- Database: [e.g., Postgres on Supabase]
- WAF: [e.g., Cloudflare]

Act as a Principal Security Engineer:
1. Write the exact Next.js Middleware code required to inject a strict Content Security Policy (CSP) header that protects the `/checkout` route from Magecart (XSS) attacks, allowing only Stripe to execute scripts.
2. Provide the database query pattern (Prisma/SQL) to definitively prevent BOLA/IDOR vulnerabilities on endpoints that fetch Customer Addresses and Order Histories.
3. Outline the specific Cloudflare WAF rulesets I must enable to protect my inventory APIs from Sneaker Bots and Scraping.
4. Explain the Incident Response protocol: If we discover that Customer Addresses were exposed via an API bug, what are the immediate technical and legal steps we must take within the first 24 hours?
```

---

## Security Checklist

- [ ] Web Application Firewall (WAF) deployed to block volumetric DDoS and OWASP Top 10 exploits
- [ ] BOLA/IDOR protections strictly enforced on all data-fetching endpoints (verifying resource ownership)
- [ ] Content Security Policy (CSP) strictly defined, especially on checkout routes to prevent Magecart attacks
- [ ] Database Encryption at Rest verified
- [ ] PCI scope minimized by entirely avoiding the storage or transmission of raw PANs (Primary Account Numbers)
- [ ] Dependencies audited for known vulnerabilities (`npm audit` / Dependabot) in the CI pipeline
