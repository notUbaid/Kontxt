---
title: Admin Dashboard
slug: admin-dashboard
phase: Phase 3
mode: personal
projectType: e-commerce
estimatedTime: 25-30 min
---

# Admin Dashboard

This is the tool you'll personally use every single day once your store is live — adding products, processing orders, checking what sold. It's also the module where it's easiest to either underbuild (no way to manage anything without writing SQL) or wildly overbuild (a full analytics suite nobody but you will ever see). This module is about building exactly what running a personal store actually requires.

---

## Who Uses This, and What Does That Mean for How You Build It?

You. Just you. This single fact should shape every decision in this module.

> **Reframe:** Every other part of your store needs to handle untrusted public users, edge cases, and scale. The admin dashboard has exactly one user, who you can trust completely, on a known set of devices. Build accordingly — this is the one place in your app where you can prioritize your own development speed over robustness, because the cost of a rough edge here is "mildly annoying to you," not "lost sale" or "security incident."

---

## Decision: Separate Admin App, or Routes Within Your Main App?

<table>
<tr><th>Approach</th><th>Tradeoff</th></tr>
<tr><td><strong>Routes within your existing app (e.g., /admin/*)</strong></td><td>Shares auth, deployment, and styling — much less setup</td><td></td></tr>
<tr><td><strong>Separate admin application/repo</strong></td><td>Cleaner separation, but real overhead: separate deploy, separate auth setup, duplicated UI components</td><td></td></tr>
</table>

**Recommendation for Personal Mode:** **Routes within your existing app**, under `/admin`. A separate admin app is a pattern that makes sense for teams with dedicated admin staff and stricter access control needs — for a one-person store, it's pure overhead with no real benefit.

---

## Protecting Admin Routes

This is the one place in this module where security actually matters — you don't want your admin panel publicly accessible.

```javascript
// middleware.ts (Next.js)
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const session = await getSession(req);
    
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return NextResponse.next();
}
```

> **Why a hardcoded admin email check is fine here, but wouldn't be for a multi-admin system:** Since you're the only admin, comparing the authenticated session's email against a single environment variable is simple and effective. Don't build a roles/permissions system (`role = 'admin'` in a database table with admin-management UI) for exactly one administrator — that's solving a problem you don't have. If you ever bring on staff, that's the moment to revisit this.

---

## The Pages You Actually Need

Keep this to the minimum set that lets you run the store day to day:

| Page | Purpose |
|---|---|
| `/admin` | Dashboard overview — today's orders, recent activity, low stock alerts |
| `/admin/products` | Product list with quick status/stock view |
| `/admin/products/new` | Add product form |
| `/admin/products/[id]/edit` | Edit product form |
| `/admin/orders` | Order list, filterable by status |
| `/admin/orders/[id]` | Order detail — view items, customer info, update status, add tracking |

That's the complete set for launch. No customer management page, no discount code management UI (manage codes directly in Stripe's dashboard or your database for now), no analytics dashboard (you already have PostHog for that, from the Analytics module).

---

## Dashboard Overview: Show What You'll Actually Check

The temptation here is to build an impressive-looking metrics dashboard. Resist it — build what you'll actually look at each morning.

```javascript
async function getDashboardSummary() {
  const [todaysOrders, lowStockProducts, recentOrders] = await Promise.all([
    getOrderCountSince(startOfToday()),
    getProductsBelow(LOW_STOCK_THRESHOLD),
    getRecentOrders(10),
  ]);

  return { todaysOrders, lowStockProducts, recentOrders };
}
```

```
┌─────────────────────────────────────┐
│  Today: 3 orders · $142.50           │
│  ⚠ 2 products low on stock            │
├─────────────────────────────────────┤
│  Recent Orders                       │
│  ORD-1042  Jane D.   $45.00  paid    │
│  ORD-1041  Mike R.   $32.50  shipped │
│  ...                                 │
└─────────────────────────────────────┘
```

> **Tip:** This connects directly to the `inventory_movements` table from the Inventory module and the order status fields from the Orders module — you already have the data; this page is just a focused view into it. Don't build new tracking infrastructure for the dashboard; query what already exists.

---

## Product Management: Reuse Your Existing Schema

The admin product form maps directly to the `products` table from the Products module. No new data modeling needed here — just a UI.

```javascript
// app/admin/products/new/page.tsx
function ProductForm({ initialData, onSubmit }) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [price, setPrice] = useState(initialData?.price ?? '');
  const [stock, setStock] = useState(initialData?.stock ?? 0);
  const [status, setStatus] = useState(initialData?.status ?? 'draft');
  // ... category select, image upload, description

  return (
    <div>
      {/* form fields, no <form> tag if this is a React artifact context — 
          standard form is fine in a real Next.js app */}
    </div>
  );
}
```

> **Best Practice:** Default new products to `status: 'draft'`. This means a half-finished product (no images yet, description not written) never accidentally becomes visible to real customers just because you saved your progress. You explicitly flip it to `active` when it's actually ready — a deliberate, visible action rather than an accidental default.

---

## Order Management: The Page You'll Use Most

This is where you'll spend the most time post-launch — processing orders, updating status, adding tracking numbers.

```javascript
function OrderDetailAdmin({ order }) {
  const [status, setStatus] = useState(order.status);
  const [tracking, setTracking] = useState('');

  async function handleMarkShipped() {
    await markOrderShipped(order.id, tracking, 'USPS'); // from Shipping module
    setStatus('shipped');
  }

  return (
    <div>
      <h2>{order.order_number}</h2>
      <p>{order.customer_email}</p>
      
      <h3>Items</h3>
      {order.items.map((item) => (
        <div key={item.id}>
          {item.product_name} × {item.quantity} — ${item.product_price}
        </div>
      ))}

      <h3>Shipping Address</h3>
      <AddressDisplay address={order.shipping_address} />

      <h3>Status: {status}</h3>
      {status === 'paid' && (
        <div>
          <input 
            value={tracking} 
            onChange={(e) => setTracking(e.target.value)} 
            placeholder="Tracking number" 
          />
          <button onClick={handleMarkShipped}>Mark as Shipped</button>
        </div>
      )}
    </div>
  );
}
```

> **Why this form directly calls `markOrderShipped` from the Shipping module:** This is the payoff of the consistent architecture you've built across this phase. The admin dashboard isn't introducing new business logic — it's a UI layer over functions you've already built and tested. If you find yourself writing new order-status-change logic *inside* an admin component instead of calling the shared function, that's a sign of logic duplication to avoid.

---

## AI Prompt: Build the Admin Dashboard

```
I'm building the admin dashboard for a personal e-commerce store using 
Next.js. I'm the only admin user.

Requirements:
1. Middleware protecting all /admin/* routes, checking the authenticated 
   user's email against a single ADMIN_EMAIL environment variable — no 
   roles/permissions system needed for a single admin
2. Dashboard overview page: today's order count + revenue, low stock 
   product list, recent orders table
3. Product list page with status and stock visible at a glance, linking 
   to edit pages
4. Product create/edit form mapping to my existing products schema, 
   defaulting new products to status: 'draft'
5. Order list page, filterable by status
6. Order detail page showing items, shipping address, and a "Mark as 
   Shipped" action that calls my existing markOrderShipped function

My existing schemas and functions: [paste products, orders schema, and 
markOrderShipped from the Shipping module]

Reuse my existing functions — don't duplicate order-status logic inside 
the admin UI.
```

> **Token efficiency tip:** Explicitly instructing AI to reuse existing functions (and pasting them) prevents the common failure mode of AI writing a parallel, slightly different version of logic you already built and tested elsewhere in the app.

---

## Validating AI-Generated Admin Code

- [ ] Are admin routes actually protected by middleware, not just hidden behind a UI link with no real access control?
- [ ] Does the admin email check happen server-side (middleware/API), not just as a client-side conditional render that could be bypassed?
- [ ] Do new products default to `status: 'draft'`, not `active`?
- [ ] Does "Mark as Shipped" call your existing `markOrderShipped` function, or does it duplicate that logic inline in the admin component?
- [ ] Does the order list/detail correctly reflect the order status enum from the Orders module, not an invented different set of statuses?

> **Common AI mistake:** AI sometimes protects admin routes only with a client-side check (`if (user.email !== adminEmail) return null`), which prevents rendering but doesn't actually block the underlying API calls from being made by someone who bypasses the UI. Always confirm protection exists at the middleware/API level, not just the component render level.

---

## What You're Skipping (On Purpose)

In Personal Mode, deliberately skip:

- Roles and permissions system (single admin doesn't need this)
- Bulk product import/export tooling
- Built-in analytics dashboards (you have PostHog already)
- Discount/coupon management UI (manage directly in Stripe or your database for now)
- Customer management pages (you have account pages from the Customer Accounts module; you don't need a separate admin view to browse customers unless support requests make it necessary)
- Audit logs of admin actions (relevant for teams, not a single trusted user)

---

## Implementation Checklist

- [ ] `/admin/*` routes protected by middleware checking authenticated email server-side
- [ ] Dashboard overview page showing today's orders, low stock alerts, recent orders
- [ ] Product list page with status/stock visibility
- [ ] Product create/edit form, defaulting new products to `draft` status
- [ ] Order list page, filterable by status
- [ ] Order detail page showing items, address, and status update actions
- [ ] "Mark as Shipped" reuses the existing `markOrderShipped` function, no logic duplication
- [ ] Verified: attempting to access `/admin` while logged out (or as a non-admin) redirects away, including direct API calls, not just page navigation

---

## What's Next

With your store fully built and manageable, it's time to shift focus to making sure it's secure and resilient before real customers and real money flow through it — that's **Security**, the start of Phase 4: Production Readiness.
