---
title: Return Policy
slug: return-policy
phase: Phase 5
mode: production
projectType: e-commerce
estimatedTime: 25–35 min
---

# Return Policy

While the Refund Policy dictates the financial math, the Return Policy dictates the physical logistics. 

Returns are the most expensive operational overhead in e-commerce. A chaotic return process leads to "Where is my refund?" support tickets, fraudulent empty-box returns, and inventory that gets lost in a warehouse corner. At production scale, reverse logistics must be entirely automated.

---

## 1. The RMA (Return Merchandise Authorization) Flow

A customer cannot just mail a box to your corporate address with a sticky note inside. You must enforce an RMA pipeline.

**The Implementation:**
1. **Self-Serve Portal:** Do not force customers to email support. Integrate a self-serve portal (e.g., Loop Returns, AfterShip, or a custom Next.js UI). The user enters their Order ID and Zip Code.
2. **Validation:** The backend checks the database: Is it within the 30-day return window? Is the item marked as "Final Sale"? If invalid, the UI blocks the return instantly.
3. **Generation:** The backend hits an API (like Shippo or EasyPost) to generate a Return Shipping Label and a unique RMA Barcode. The user prints this label.

---

## 2. Fraud Prevention (The Empty Box Scam)

The most common e-commerce scam is a user claiming they returned a $1,000 graphics card, but the tracking number shows they mailed back an empty box or a brick.

**The Fatal Mistake:**
If you configure your Returns software to automatically issue a Stripe Refund the moment the carrier (FedEx/USPS) scans the package at the drop-off location, you will be scammed repeatedly.

**The Production Rule (Scan-to-Refund):**
- Refunds must *only* be issued when the physical item arrives at the warehouse, the warehouse worker opens the box, verifies the correct item is inside, and scans the RMA barcode.
- This warehouse scan triggers a webhook to your Node.js backend (`return.verified`), which then executes the secure API call to Stripe to release the funds.

---

## 3. Reverse Inventory Routing

When a product is returned, it cannot blindly go back into your "Available to Promise" (ATP) inventory pool on the website.

**The Architecture:**
Your database must track inventory by Location and State.
- When the warehouse receives a return, it goes into an `INSPECTION` state.
- A worker checks if the shirt is stained or if the electronics are broken.
- If it is pristine, the system moves the item to `SELLABLE` and the website inventory increases by +1.
- If it is damaged, the system moves it to `DAMAGED_QUARANTINE`. It is not added to the website inventory, but the financial refund is still issued to the customer.

---

## 4. Restocking Fees & Label Costs

To protect margins, many e-commerce stores deduct the cost of the return label (e.g., $7) from the customer's final refund.

**The Technical Constraint:**
If your Return Policy says "We deduct $7 for return shipping," your backend must calculate this flawlessly.
- The UI tells the user: "You will receive a refund of $43 ($50 item - $7 label)."
- The backend API must calculate the math securely. It must also ensure it does not deduct $7 if the item was marked as `DAMAGED_ON_ARRIVAL` (which usually legally requires a full refund at the merchant's expense).

---

## AI Prompt — Architect Your Reverse Logistics

```prompt
I am automating the reverse logistics (Returns) pipeline for a production e-commerce store.

Tech Stack:
- Returns Portal: [e.g., Loop Returns / Custom Next.js]
- Shipping API: [e.g., Shippo / EasyPost]
- Backend: [e.g., Postgres / Node.js]

Act as a Principal Operations Engineer:
1. Design the exact backend state machine for a Return (RMA). Define the states from `REQUESTED` to `LABEL_GENERATED` to `RECEIVED_INSPECTION` to `REFUNDED`.
2. Write the business logic required to prevent "Drop-off Refunds." How do we ensure the Stripe refund is explicitly blocked until the warehouse API fires a `return.verified` webhook?
3. Explain the database schema required to quarantine returned items in an `INSPECTION` state before they are allowed to increment the live "Available for Sale" inventory pool.
4. Detail the algorithm for deducting a $7 return label fee from the final refund, including the exception logic for "Damaged Item" claims.
```

---

## Return Policy Checklist

- [ ] Self-serve Returns Portal integrated to deflect customer support tickets
- [ ] Strict 30-day (or similar) window validation enforced via database checks before RMA generation
- [ ] Automated Return Label generation API (Shippo/EasyPost) integrated
- [ ] "Drop-off Refund" automation explicitly disabled to prevent empty-box scams
- [ ] Webhook architecture established so refunds only trigger upon physical warehouse verification scans
- [ ] Inventory quarantine states (`INSPECTION`) implemented in the database to prevent selling damaged returns
- [ ] Label deduction logic ($X restocking fee) securely programmed into the backend refund calculation
