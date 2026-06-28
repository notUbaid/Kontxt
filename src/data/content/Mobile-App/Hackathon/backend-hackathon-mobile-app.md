---
title: Backend
slug: backend
phase: Phase 3
mode: hackathon
projectType: mobile-app
estimatedTime: 25–35 min
---

# Backend

Most hackathon mobile apps do not need a backend.

Read that again.

Firebase, Supabase, and PocketBase give you a database, auth, file storage, and realtime — without writing a single server. If you are considering spinning up an Express server, a FastAPI service, or a custom REST API, stop and ask:

> Does my app need custom server logic that a BaaS cannot handle?

If the answer is no — skip this module. You are done. Go build features.

If the answer is yes — this module tells you exactly what to build and what to skip.

---

## When You Actually Need a Backend

| You need a backend if... | You don't need one if... |
|---|---|
| You're calling an AI API with a secret key | Firebase/Supabase handles your data |
| You need server-side data processing | You're doing CRUD on user content |
| You're integrating a third-party API that can't be called from mobile | File uploads go directly to Firebase Storage |
| You need webhooks (payment callbacks, etc.) | Auth is handled by Firebase/Supabase |
| You're running scheduled jobs | Realtime features use Firestore listeners |

> The #1 hackathon time sink: building a backend you didn't need.

---

## The Hackathon Backend Stack

If you do need a backend, use exactly this:

| Layer | Choice | Why |
|---|---|---|
| **Runtime** | Node.js + Express or Python + FastAPI | Fast to write, AI knows them perfectly |
| **Deployment** | Railway, Render, or Firebase Cloud Functions | Zero DevOps, deploys in under 5 minutes |
| **Language** | Whichever your team knows best | Not the time to learn a new one |

Do not use:
- Custom VPS / EC2 — you will spend hours on server config
- Docker in production — unnecessary complexity
- Kubernetes — not even worth saying
- A microservices architecture — one service, one deploy

---

## Structure: Keep It Flat

For a hackathon backend, structure is a distraction. Use the minimum viable layout:

```
backend/
├── index.js          # Entry point, middleware, route mounting
├── routes/
│   ├── ai.js         # AI-related endpoints
│   └── webhooks.js   # External callbacks
├── middleware/
│   └── auth.js       # Verify Firebase/Supabase JWT
├── .env              # API keys (never commit)
└── package.json
```

Three folders maximum. If you find yourself creating `services/`, `repositories/`, `controllers/` — you are over-engineering for the timeline you have.

---

## The Only Endpoint Pattern You Need

Every endpoint follows the same shape:

```js
router.post('/generate', verifyAuth, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: 'input is required' });
    }

    const result = await callYourService(input);
    res.json({ data: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
```

Every endpoint: validate input → do the work → return data or error. No exceptions.

---

## Protecting Your API Keys

If your backend calls OpenAI, Anthropic, Google Gemini, or any paid API — the key must never leave your server.

Your mobile app calls your backend. Your backend calls the AI API. The mobile app never touches the key directly.

```
Mobile App → your-backend.railway.app/api/generate → OpenAI API
```

Not:

```
Mobile App → OpenAI API directly 
```

Calling AI APIs directly from mobile exposes your key in the app binary. It will be extracted. You will get a bill.

```
Copy Prompt ↓
```

> I'm building a Node.js/Express (or FastAPI) backend for a hackathon mobile app. Create a POST /api/generate endpoint that:
- Verifies a Firebase Auth JWT in the Authorization header
- Accepts { prompt: string } in the request body
- Calls the [OpenAI/Anthropic/Gemini] API with the prompt using my server-side API key from process.env
- Returns { result: string } on success and { error: string } on failure
- Handles missing input, auth failure, and API errors with appropriate status codes
>
> Keep it under 60 lines. No unnecessary abstraction.

---

## Auth Middleware

Your backend must verify that requests come from your authenticated users — not the open internet.

**Firebase JWT verification (Node.js):**

```js
import admin from 'firebase-admin';

export async function verifyAuth(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

Your mobile app sends the token like this:

```js
const token = await getAuth().currentUser.getIdToken();

fetch('https://your-backend.railway.app/api/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ prompt: userInput }),
});
```

>  Firebase ID tokens expire after 1 hour. Always call `getIdToken(true)` to force-refresh before important requests, or use `getIdToken()` which auto-refreshes.

---

## Deployment in Under 10 Minutes

### Railway (Recommended)

1. Push your backend to a GitHub repo (can be a subfolder of your monorepo)
2. Go to railway.app → New Project → Deploy from GitHub
3. Add environment variables in the Railway dashboard
4. Railway auto-detects Node.js or Python and deploys

You get a live HTTPS URL in under 5 minutes.

### Render

Same flow. Free tier has cold starts (~30s after inactivity). For demo day: keep a cron job or just open the URL 2 minutes before presenting.

### Firebase Cloud Functions

Best if you're already on Firebase and need tight Firestore integration. Slightly more config but zero cold start concerns on paid plan.

```
Copy Prompt ↓
```

> I have a Node.js/Express backend for a hackathon app. Generate a railway.json config and a Procfile for Railway deployment. The entry point is index.js. Include a health check endpoint GET /health that returns { status: 'ok' }.

---

## Environment Variables

Never hardcode secrets. Never commit `.env`.

```
# .env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
PORT=3000
```

Add `.env` to `.gitignore` immediately. Set the same variables in your deployment dashboard.

>  For Firebase Admin SDK in production, store the service account JSON as a single environment variable string and parse it: `JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)`

---

## Validate Your Backend Before Connecting Mobile

Test every endpoint with curl or Postman before wiring it to your app. Every time.

```bash
# Health check
curl https://your-backend.railway.app/health

# Auth-protected endpoint
curl -X POST https://your-backend.railway.app/api/generate \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test input"}'
```

If you can't get a 200 from curl, your mobile app won't either. Fix it at the source.

---

## Common Failure Points

| Mistake | Consequence |
|---|---|
| Calling AI APIs directly from mobile | Key exposed in app binary |
| No auth middleware | Anyone can hit your endpoints and spend your API credits |
| Forgetting CORS config | Mobile requests blocked in certain environments |
| Hardcoded localhost URL in mobile app | Works in dev, breaks in demo build |
| No error handling on API calls | Unhandled promise rejections crash the server |
| Cold start not accounted for | First request in demo takes 30s, looks broken |

**CORS config for Express — add this:**

```js
import cors from 'cors';
app.use(cors({ origin: '*' })); // Restrict in production; fine for hackathon
```

---

## Implementation Checklist

- [ ] Decided: do I actually need a backend? (If no, skip this)
- [ ] Backend repo created, entry point working locally
- [ ] All AI/third-party API keys in `.env`, not hardcoded
- [ ] `.env` in `.gitignore`
- [ ] Auth middleware verifying Firebase/Supabase JWT
- [ ] All endpoints validated with curl before mobile connection
- [ ] CORS configured
- [ ] Health check endpoint at GET /health
- [ ] Deployed to Railway/Render with env vars set
- [ ] Mobile app using production URL, not localhost
- [ ] Cold start handled — backend warmed up before demo

---

## Next Step

Backend is done when your deployed URL returns a valid response to an authenticated request from your mobile app.

Move to **Frontend** next.
