---
title: Hosting & Deployment
slug: hosting-and-deployment
phase: Phase 2
mode: personal
projectType: web app
estimatedTime: 20–30 min
---

# Hosting & Deployment

Getting your app onto a real URL — early, not at the end — is one of the highest-leverage things you can do in a personal project.

It forces you to solve real deployment issues before they compound. It gives you a link to share with actual users. And it removes the psychological barrier of "I'll deploy it when it's ready," which is a delay that kills more personal projects than bugs do.

---

## Deploy Early, Not When It's Done

> ** Tip**
> Deploy on Day 1. Even if all that exists is a React app with a "Hello World" page. The goal is to establish the deployment pipeline while there's nothing to break — not to figure it out under pressure when the app is complex.

Every personal project should have a live URL within the first day of development. From that point, every push to `main` should update it automatically.

---

## The Recommended Hosting Setup

For the personal project stack (React + Vite + Supabase), the right setup is:

```
Frontend     Vercel
Database     Supabase (managed — no hosting decision needed)
Backend      Vercel Serverless Functions (if using Next.js)
             or Railway / Render (if you have a separate Node/FastAPI backend)
```

**Monthly cost at zero users: $0.**

---

## Vercel: Frontend Hosting

Vercel is the best choice for deploying React + Vite or Next.js frontends. It deploys directly from GitHub, builds automatically on every push, and gives you preview URLs for every pull request.

### Setting Up Vercel

**1. Push your project to GitHub.**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

**2. Connect to Vercel.**

- Go to vercel.com → Add New Project
- Import your GitHub repository
- Vercel auto-detects React + Vite. No configuration needed.
- Click Deploy.

That's it. Your app is live.

**3. Add environment variables.**

In Vercel dashboard → Project → Settings → Environment Variables:

```
VITE_SUPABASE_URL         = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY    = your-anon-key
```

Add these for Production, Preview, and Development environments.

> ** Warning**
> Vercel does not read your `.env.local` file. You must add environment variables manually in the Vercel dashboard. If you deploy without doing this, your app will fail silently — the Supabase client will initialize with `undefined` values.

---

## Custom Domain

Vercel gives you a free `your-project.vercel.app` URL immediately. For a personal project you plan to share, a custom domain makes it feel real.

Domains cost ~$10–15/year. For `.site`, `.app`, or `.dev` domains, often less.

**Connecting a domain in Vercel:**
- Project → Settings → Domains → Add Domain
- Follow the DNS instructions (add a CNAME or A record in your registrar's DNS settings)
- Vercel handles SSL automatically — HTTPS is on from the moment the domain propagates

> ** Tip**
> If you're not ready to buy a domain, `your-project.vercel.app` is perfectly shareable and works fine for early users. Buy the domain when you know the project is worth keeping.

---

## Separate Backend Hosting

If your stack includes a separate backend (Node.js/Express, Hono, FastAPI), you need somewhere to host it that isn't Vercel's serverless functions.

| Provider | Best For | Free Tier |
|---|---|---|
| **Railway** | Node.js, Python — one-command deploy, generous free tier | $5 credit/month |
| **Render** | Node.js, Python — simple, reliable | 750 hrs/month free (sleeps after inactivity) |
| **Fly.io** | More control, global edge deployment | Generous free tier |

**Railway** is the easiest for personal projects. Connect your GitHub repo and it deploys automatically, the same way Vercel does for frontends.

> ** Warning**
> Render's free tier puts services to sleep after 15 minutes of inactivity. The first request after sleep takes 30–60 seconds to respond. This is fine for a project you're testing, painful for real users. Upgrade to the $7/month paid tier or use Railway when you have real traffic.

### Railway Setup (Node.js/FastAPI backend)

**1.** Go to railway.app → New Project → Deploy from GitHub repo

**2.** Add environment variables in Railway dashboard:
```
DATABASE_URL    = your-supabase-connection-string
PORT            = 8000
```

**3.** Railway auto-detects `package.json` for Node or `requirements.txt` for Python and deploys automatically.

**4.** Your backend gets a URL like `your-app.railway.app`. Set this as `VITE_API_URL` in Vercel.

---

## Environment Variable Management

You will have environment variables in three places: local development, Vercel (frontend), and Railway/Render (backend). Keep them organized.

**Template: `.env.example`**

Commit this file to your repo (with no real values) so you always know what variables are needed:

```bash
# .env.example — commit this
# Copy to .env.local and fill in real values

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Backend API (if applicable)
VITE_API_URL=

# Server-side only (never in client code)
SUPABASE_SERVICE_ROLE_KEY=
```

```bash
# .gitignore — ensure this is present
.env
.env.local
.env.*.local
```

---

## Deployment Checklist

**Before first deploy:**
- [ ] Project is in a GitHub repository
- [ ] `.env.local` is in `.gitignore` and not committed
- [ ] `.env.example` exists with all required variable names (no values)
- [ ] App builds locally without errors (`npm run build`)

**Vercel setup:**
- [ ] GitHub repo connected to Vercel
- [ ] Environment variables added in Vercel dashboard
- [ ] First deployment succeeded — no build errors in Vercel logs
- [ ] Live URL opens and app loads correctly
- [ ] Supabase connection works on the live URL (not just locally)

**Custom domain (if applicable):**
- [ ] Domain purchased and connected in Vercel
- [ ] SSL certificate issued (automatic — just confirm HTTPS works)
- [ ] Old `vercel.app` URL still works as a fallback

**Backend (if applicable):**
- [ ] Backend deployed to Railway or Render
- [ ] Backend environment variables configured
- [ ] Backend URL set as environment variable in Vercel
- [ ] API calls from the live frontend reach the live backend

---

## Keeping Deployments Clean

Once your pipeline is set up, keep it working with these habits:

**Never push broken code to `main`.** Use a `dev` or feature branch for in-progress work. Merge to `main` only when something works. Every `main` push triggers a production deployment.

**Check the Vercel build logs after every deploy.** A successful push doesn't mean a successful build. Take 30 seconds to verify the deployment completed cleanly.

**Test on the live URL, not just localhost.** Environment variable issues, CORS problems, and API URL misconfigurations only appear on the live deployment. Test there regularly — not just before launch.

---

## What's Next

Move to **Frontend Engineering** — building out your React components, pages, and UI with the design system and user flows you've already defined.
