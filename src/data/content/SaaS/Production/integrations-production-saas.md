---
title: Integrations
slug: integrations
phase: Phase 3
mode: production
projectType: saas
estimatedTime: 30–45 min
---

# Integrations

Integrations are a growth lever disguised as an engineering task. When your SaaS connects to the tools your users already live in — Slack, Notion, HubSpot, Google Workspace — your product becomes stickier, your users get more value, and switching costs increase.

The engineering challenge is doing this without turning your codebase into a brittle web of third-party dependencies.

---

## Two Categories of Integrations

**Integrations you build** fall into two distinct categories with very different engineering approaches:

| Category | What it means | Examples |
|---|---|---|
| **Inbound** | External services push data into your product | Webhooks from Stripe, GitHub, Intercom |
| **Outbound** | Your product pushes data into external services | Posting to Slack, syncing to HubSpot, writing to Google Sheets |

Most SaaS products eventually need both. Start with whichever your users are actively requesting.

---

## Architecture First: The Integration Layer

Before writing integration code, decide where integrations live in your codebase.

The worst pattern: scattering integration logic across your feature code.

```typescript
// ❌ Integration logic buried in feature code
async function createDocument(data: DocumentInput, userId: string) {
  const doc = await db.document.create({ data });

  // This doesn't belong here
  if (user.slackConnected) {
    await slack.chat.postMessage({ channel: user.slackChannel, text: `New doc: ${doc.title}` });
  }
  if (user.hubspotConnected) {
    await hubspot.crm.contacts.update(...);
  }

  return doc;
}
```

The right pattern: an event-driven integration layer.

```typescript
// ✓ Feature code emits an event
async function createDocument(data: DocumentInput, userId: string) {
  const doc = await db.document.create({ data });
  await events.emit('document.created', { doc, userId });
  return doc;
}

// Integration handlers subscribe separately
events.on('document.created', slackIntegration.handleDocumentCreated);
events.on('document.created', hubspotIntegration.handleDocumentCreated);
```

Your core feature code should never know integrations exist. Integrations are consumers of your internal events, not collaborators with your business logic.

---

## OAuth: The Right Way to Connect Third-Party Services

Most modern integrations use OAuth 2.0. The user authorizes your app to act on their behalf within the external service.

### The OAuth Flow

```
1. User clicks "Connect Slack" in your app
2. Your app redirects to Slack's authorization URL
3. User approves in Slack's UI
4. Slack redirects back to your callback URL with a `code`
5. Your server exchanges the `code` for access + refresh tokens
6. You store the tokens encrypted in your database
7. Your app uses the access token to call Slack's API
```

### Implementing OAuth

```typescript
// Step 1: Initiate — redirect user to provider
// GET /api/integrations/slack/connect
async function initiateSlackOAuth(req: Request, res: Response) {
  const state = crypto.randomBytes(16).toString('hex');

  // Store state in session to prevent CSRF
  req.session.oauthState = state;
  req.session.oauthUserId = req.user.id;

  const authUrl = new URL('https://slack.com/oauth/v2/authorize');
  authUrl.searchParams.set('client_id', process.env.SLACK_CLIENT_ID!);
  authUrl.searchParams.set('scope', 'chat:write,channels:read');
  authUrl.searchParams.set('redirect_uri', `${process.env.APP_URL}/api/integrations/slack/callback`);
  authUrl.searchParams.set('state', state);

  res.redirect(authUrl.toString());
}

// Step 2: Callback — exchange code for tokens
// GET /api/integrations/slack/callback
async function handleSlackCallback(req: Request, res: Response) {
  const { code, state } = req.query;

  // Validate state to prevent CSRF
  if (state !== req.session.oauthState) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  const tokenResponse = await fetch('https://slack.com/api/oauth.v2.access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code: code as string,
      redirect_uri: `${process.env.APP_URL}/api/integrations/slack/callback`,
    }),
  }).then(r => r.json());

  if (!tokenResponse.ok) {
    return res.redirect('/settings/integrations?error=slack_auth_failed');
  }

  // Store tokens encrypted — never store plaintext OAuth tokens
  await db.integration.upsert({
    where: {
      organizationId_provider: {
        organizationId: req.session.oauthUserId,
        provider: 'slack',
      },
    },
    create: {
      organizationId: req.session.oauthUserId,
      provider: 'slack',
      accessToken: encrypt(tokenResponse.access_token),
      refreshToken: tokenResponse.refresh_token ? encrypt(tokenResponse.refresh_token) : null,
      tokenExpiresAt: tokenResponse.expires_in
        ? new Date(Date.now() + tokenResponse.expires_in * 1000)
        : null,
      metadata: {
        teamId: tokenResponse.team?.id,
        teamName: tokenResponse.team?.name,
        botUserId: tokenResponse.bot_user_id,
      },
      status: 'active',
    },
    update: {
      accessToken: encrypt(tokenResponse.access_token),
      refreshToken: tokenResponse.refresh_token ? encrypt(tokenResponse.refresh_token) : null,
      status: 'active',
    },
  });

  res.redirect('/settings/integrations?success=slack_connected');
}
```

### Token Storage Schema

```sql
CREATE TABLE integrations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES organizations(id),
  provider          TEXT NOT NULL,           -- 'slack', 'hubspot', 'google'
  access_token      TEXT NOT NULL,           -- encrypted
  refresh_token     TEXT,                    -- encrypted, nullable
  token_expires_at  TIMESTAMPTZ,
  scopes            TEXT[],
  metadata          JSONB,                   -- provider-specific data
  status            TEXT NOT NULL DEFAULT 'active',  -- active | revoked | error
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(organization_id, provider)
);
```

**Encrypt tokens at rest.** Use AES-256-GCM with a key stored in your secrets manager (not in your .env file in production). An exposed database backup should not expose your users' OAuth tokens.

---

## Token Refresh

Access tokens expire. Your integration must handle this gracefully.

```typescript
async function getValidAccessToken(organizationId: string, provider: string): Promise<string> {
  const integration = await db.integration.findUnique({
    where: { organizationId_provider: { organizationId, provider } },
  });

  if (!integration) throw new Error(`No ${provider} integration found`);

  // Check if token is expired or expiring within 5 minutes
  const isExpiring = integration.tokenExpiresAt &&
    integration.tokenExpiresAt < new Date(Date.now() + 5 * 60 * 1000);

  if (isExpiring && integration.refreshToken) {
    const refreshed = await refreshOAuthToken(provider, decrypt(integration.refreshToken));

    await db.integration.update({
      where: { organizationId_provider: { organizationId, provider } },
      data: {
        accessToken: encrypt(refreshed.access_token),
        tokenExpiresAt: new Date(Date.now() + refreshed.expires_in * 1000),
      },
    });

    return refreshed.access_token;
  }

  return decrypt(integration.accessToken);
}
```

---

## Receiving Webhooks (Inbound Integrations)

When external services send events to your app, you receive them via a webhook endpoint.

### Webhook Security

```typescript
// POST /api/webhooks/stripe
async function stripeWebhook(req: Request, res: Response) {
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    // Verify the webhook is genuinely from Stripe
    // req.body must be the raw buffer — do not parse JSON before this
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Acknowledge immediately — process asynchronously
  res.status(200).json({ received: true });

  // Hand off to a queue for processing
  await queue.add('process-stripe-event', { event });
}
```

**Two rules for webhooks:**

1. **Verify the signature.** Every major provider (Stripe, GitHub, Slack) provides a signing secret. Always verify — an unverified webhook endpoint accepts requests from anyone on the internet.

2. **Acknowledge immediately, process asynchronously.** Return `200` within 5 seconds or the provider will retry. Do real work in a background job.

### Idempotency

Webhooks are delivered at-least-once. The same event may arrive multiple times.

```typescript
async function processStripeEvent(event: Stripe.Event) {
  // Check if we've already processed this event
  const existing = await db.processedWebhook.findUnique({
    where: { eventId: event.id },
  });

  if (existing) {
    console.log(`Skipping duplicate event: ${event.id}`);
    return;
  }

  // Process the event
  switch (event.type) {
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;
    // ...
  }

  // Mark as processed
  await db.processedWebhook.create({
    data: { eventId: event.id, processedAt: new Date() },
  });
}
```

---

## Integration Settings UI

Users need to connect, configure, and disconnect integrations themselves. This is a standard settings page, not a product feature — keep it simple.

**What every integration card needs:**

- Connection status (connected / not connected)
- Who connected it and when
- What permissions were granted
- Configuration options (e.g. which Slack channel to post to)
- Disconnect button
- Last activity or sync timestamp

```typescript
// GET /api/integrations — list all integrations and their status
async function listIntegrations(req: Request, res: Response) {
  const SUPPORTED_INTEGRATIONS = ['slack', 'hubspot', 'google', 'notion'];

  const connected = await db.integration.findMany({
    where: { organizationId: req.user.organizationId, status: 'active' },
    select: {
      provider: true,
      metadata: true,
      createdAt: true,
      scopes: true,
    },
  });

  const connectedProviders = new Set(connected.map(i => i.provider));

  const integrations = SUPPORTED_INTEGRATIONS.map(provider => ({
    provider,
    connected: connectedProviders.has(provider),
    details: connected.find(i => i.provider === provider) ?? null,
  }));

  res.json({ integrations });
}
```

---

## AI Prompt — Integration Design

Use this when scoping a new integration.

```
You are a senior backend engineer helping design a third-party integration for a SaaS product.

Product context:
[Describe your product — what it does and who uses it]

Integration I'm building:
[e.g. Slack — notify a channel when a document is published]

User story:
[As a [user type], I want to [action] so that [outcome]]

My planned approach:
[OAuth flow / webhook / API polling — and your data model]

Please review this and:
1. Identify missing edge cases in the OAuth or webhook flow
2. Flag any security issues (token storage, webhook verification, CSRF)
3. Tell me what happens when the integration breaks mid-flow
4. Suggest what configuration options users will actually want
5. Point out what I might be overbuilding for an MVP integration

Be specific and direct.
```

---

## Implementation Checklist

### OAuth Flow

- [ ] State parameter generated and validated to prevent CSRF
- [ ] Authorization URL built with minimal required scopes
- [ ] Token exchange happens server-side only
- [ ] Access tokens encrypted at rest
- [ ] Refresh token flow implemented for providers that expire tokens
- [ ] Disconnect flow revokes token at provider and deletes from DB

### Webhook Handling

- [ ] Signature verification implemented for every provider
- [ ] Raw request body preserved for signature verification (not parsed JSON)
- [ ] Immediate `200` response before processing
- [ ] Processing done in a background queue
- [ ] Idempotency check against event ID
- [ ] Failed jobs retried with backoff

### Data Model

- [ ] Integrations table scoped to organization
- [ ] Tokens stored encrypted (not plaintext)
- [ ] Integration status tracked (active / revoked / error)
- [ ] Token expiry tracked for providers that use it

### Integration Layer

- [ ] Integration logic decoupled from feature code via events
- [ ] Each integration handler is independently testable
- [ ] Integration failures do not fail core product operations
- [ ] Integration errors logged with enough context to debug

### Settings UI

- [ ] Connected / disconnected status visible per integration
- [ ] Connect and disconnect flows work end-to-end
- [ ] Post-connect configuration options available
- [ ] Last sync or activity timestamp shown

---

## Common Mistakes

> **⚠️ Storing OAuth tokens in plaintext**
> A database backup, a misconfigured log, or a compromised admin account exposes every user's third-party access. Encrypt tokens with a key stored outside the database.

> **⚠️ Skipping webhook signature verification**
> An unverified webhook endpoint will process any POST request from anywhere. This is a remote code execution risk if your handler mutates data. Always verify.

> **⚠️ Processing webhooks synchronously**
> If your webhook handler takes more than 5 seconds, the provider retries. This causes duplicate processing and cascading failures under load. Always queue and acknowledge immediately.

> **⚠️ Requesting too many OAuth scopes**
> Users and security-conscious organizations review the permissions your app requests. Request only what you need right now. You can always request additional scopes later with an incremental OAuth flow.

> **⚠️ No graceful degradation when integrations fail**
> If Slack is down, posting a Slack notification should not fail your core product operation. Integration failures must be isolated. Log, retry, and move on.

---

## What's Next

Integrations are designed and your first one is implemented. Before moving on, confirm:

- OAuth state validation is tested (attempt the callback with a mismatched state)
- Webhook signature verification rejects a request with a tampered body
- Disconnecting an integration fully revokes access at the provider
- A failed integration does not surface an error to the end user in core flows

Next up: **Testing**
