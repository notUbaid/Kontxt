---
title: Referrals Strategy
slug: referrals
phase: Phase 6
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Referrals Strategy

A referral program is the only marketing channel where you pay a Customer Acquisition Cost (CAC) *after* the conversion happens. 

If you spend $50 on Facebook to acquire a customer, and they do not buy, you lose $50. If you offer a "$20 for you, $20 for a friend" referral bounty, you only pay the $40 when the friend actually completes a purchase. At production scale, an automated referral engine drives high-margin, viral growth.

---

## 1. The Double-Sided Reward (The Incentive)

If you only reward the referrer ("Invite a friend, get $10"), the friend has no incentive to use the link. If you only reward the friend ("Give a friend $10"), the referrer has no incentive to share it.

**The Production Standard:** The Double-Sided Reward.
- "Give your friends 20% off their first order. When they buy, you get $20 in store credit."
- This creates mutual incentive and removes the social stigma of "profiting off your friends."

---

## 2. Referral Tracking Architecture

You must track exactly who referred whom, and ensure the reward is only paid out when the transaction is finalized.

**The Implementation:**
Use a dedicated Referral API (e.g., **ReferralCandy**, **Friendbuy**, or **Yotpo**).
1. **The Link:** User A is generated a unique link (`store.com/r/user_A_hash`).
2. **The Session:** User B clicks the link. The Next.js frontend reads the query parameter and stores the referrer hash in an HTTP-only cookie.
3. **The Purchase:** User B completes checkout. Your backend passes the order data AND the referrer cookie to the Referral API.
4. **The Payout Delay (Crucial):** Do not issue the $20 reward to User A immediately. If you do, User B can cancel their order 5 minutes later, resulting in User A walking away with free money. The backend must configure a "Holding Period" (e.g., 14 days to clear the return window) before the Referral API generates the $20 discount code for User A.

---

## 3. Self-Referral Fraud Prevention

The moment you launch a referral program, malicious users will attempt to game it. User A will create a fake email account (User B), refer themselves, get the 20% discount on the new account, and earn the $20 reward on the main account.

**The Defense Mechanisms:**
Your Referral API must enforce strict fraud logic:
- **IP Blocking:** If User A and User B check out from the exact same IP address, flag the referral as fraudulent and block the reward.
- **Address Matching:** If the shipping address for User B matches the historical shipping address of User A, block the reward.
- **Device Fingerprinting:** Use browser fingerprinting (if supported by your provider) to ensure the referral link wasn't clicked on the exact same device that generated it.

---

## 4. The Post-Purchase Activation Loop

Users do not wake up thinking about referring your brand. You must catch them at peak excitement.

**The Implementation:**
- Embed the referral link generation directly on the **Order Confirmation (Thank You) Page**.
- Do not ask them to create an account to get their link. The backend should generate the unique link based on their email address and render it instantly on the page.
- "Your order is confirmed! Want $20 off your next order? Share this link with a friend."

---

## AI Prompt — Architect Your Referral Engine

```prompt
I am building an automated Referral engine for a production e-commerce store.

Tech Stack:
- Referral Platform: [e.g., Friendbuy / ReferralCandy]
- Frontend: [e.g., Next.js React]
- Backend: [e.g., Node.js]

Act as a Principal Growth Engineer:
1. Outline the exact cookie-tracking logic required in the Next.js frontend to capture a referral query parameter and persist it safely across a multi-day checkout journey.
2. Explain the "Holding Period" architecture. How does the backend communicate with the Referral API to ensure rewards are only issued AFTER the 14-day return window has expired?
3. Define the top 3 fraud vectors for self-referrals (e.g., IP matching, address matching) and how our backend logic should detect and block them before issuing rewards.
4. Provide the UI/UX strategy for embedding a frictionless, one-click referral link generator directly on the post-purchase Thank You page.
```

---

## Referrals Checklist

- [ ] Double-Sided Reward structure designed to incentivize both the referrer and the referee
- [ ] Cookie-based tracking implemented to accurately attribute referrals across multi-day sessions
- [ ] Payout Holding Period (e.g., 14 days) enforced to prevent rewards from being issued for canceled/returned orders
- [ ] Self-referral fraud prevention rules (IP blocking, address matching) aggressively configured
- [ ] Referral widget integrated natively into the post-purchase Order Confirmation page to maximize virality
