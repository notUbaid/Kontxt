const { updateTopic } = require('./update_topic.cjs');

const topics = {
  'security': `# Security

**Estimated Time:** 4-6 hours

---

## Why this matters
Security is not an afterthought; it is the foundation of trust. A single vulnerability can lead to data breaches, reputational damage, and severe financial consequences. Implementing security correctly from day one is exponentially easier than trying to patch a fundamentally insecure architecture later.

## Strategic Guidance

### Hackathon Mode
For a hackathon, speed is everything and the data is fake. You do not need enterprise-grade security. Do not spend hours configuring strict Row Level Security (RLS) policies or complex OAuth flows unless they are the core mechanic of your demonstration. 

Your goal is to show a working prototype. Hardcode demo user credentials if it saves time. If you use a database like Supabase or Firebase, use the most permissive rules possible to ensure you don't get blocked during your demo. The only security that matters is ensuring your API keys are not accidentally pushed to a public GitHub repository where bots can scrape them. Use environment variables for all secrets.

### Personal Project
When building a personal project, you want to demonstrate competence and learn best practices without over-engineering. This is the perfect time to learn how to properly secure an application. 

You should implement basic authentication and authorization. Ensure that users can only access their own data. If using Supabase, write foundational RLS policies (e.g., user_id = auth.uid()). Secure your API routes so that unauthenticated users are rejected. Store sensitive configuration in environment variables and use a .env file locally. Do not deploy with default passwords or open databases. This level of security shows future employers that you understand the fundamentals of secure software development.

### Production SaaS
In a production environment, security is paramount. You are responsible for your users' sensitive data, and a breach could end your business. You must implement Defense in Depth. 

Start with strict Authentication and Role-Based Access Control (RBAC). Every endpoint and database query must verify the user's identity and permissions. Implement robust Row Level Security (RLS) on your database. Enforce HTTPS everywhere and ensure secure transmission of data. Use secure, HttpOnly cookies for session management to mitigate XSS attacks. 

Furthermore, you must sanitize all user inputs to prevent SQL injection and XSS. Set up automated security scanning in your CI/CD pipeline to catch vulnerable dependencies. Implement rate limiting to prevent brute-force attacks and abuse. Regularly audit your infrastructure and consider a third-party penetration test before a major public launch.

## Security Audit Prompt
\`\`\`prompt
Act as a Senior Security Engineer. I am building a SaaS application using [Insert your Tech Stack here, e.g., React, Node.js, PostgreSQL]. Provide a comprehensive security checklist covering authentication, database security, API protection, and common vulnerabilities (OWASP Top 10). What specific security measures must I implement before launching to production?
\`\`\`

## Validation Checklist
- [ ] Environment variables are used for all secrets and API keys.
- [ ] Secrets have been verified absent from public repositories.
- [ ] Users can only access their own data (e.g., RLS policies).
- [ ] Inputs are sanitized and validated on the backend.
`,

  'performanceoptimization': `# Performance Optimization

**Estimated Time:** 3-5 hours

---

## Why this matters
Performance is a feature. Users have zero tolerance for slow applications. A fast, snappy interface builds trust and engagement, while a sluggish app leads to high bounce rates and churn. Optimizing performance ensures your application scales efficiently and provides a world-class user experience.

## Strategic Guidance

### Hackathon Mode
Performance does not matter in a hackathon unless the app is so slow that it ruins the live demo. Do not spend time optimizing bundle sizes, implementing complex caching layers, or writing highly optimized database queries.

If the app feels a bit sluggish, ignore it. Focus entirely on feature completeness and the visual wow factor. The judges will not look at your Lighthouse score or your database query execution times. If a query takes 2 seconds to load, just add a loading spinner and move on.

### Personal Project
For a personal project, you want to demonstrate that you understand how to build a responsive web application. You do not need to over-optimize, but you should adhere to basic performance best practices.

Ensure your images are compressed and properly sized. Avoid unnecessary re-renders in your frontend framework by using proper state management. Implement basic pagination for long lists of data to avoid overwhelming the browser. This demonstrates a solid understanding of frontend fundamentals and provides a good experience for anyone reviewing your portfolio.

### Production SaaS
In a production SaaS, performance directly impacts your bottom line. You must treat performance as a critical metric. A fast application reduces server costs and increases user retention.

You need to optimize across the entire stack. On the frontend, implement code splitting, lazy loading, and aggressive asset optimization. Aim for excellent Core Web Vitals scores. On the backend, identify and optimize slow database queries by adding indexes and using explain plans. Implement comprehensive caching strategies using Redis or a CDN for static assets.

Continuously monitor performance using tools like New Relic, Datadog, or Sentry. Set up alerts for degraded performance and treat performance regressions as critical bugs. Users expect a seamless, instant experience, and delivering that requires rigorous, ongoing optimization.

## Performance Optimization Prompt
\`\`\`prompt
Act as a Senior Performance Engineer. I am building a SaaS application using [Insert Tech Stack]. Suggest the top 5 most impactful performance optimizations I should implement on the frontend and backend. Include specific techniques for asset optimization, React rendering improvements, and database query optimization.
\`\`\`

## Validation Checklist
- [ ] Images and assets are compressed and served efficiently.
- [ ] Large lists are paginated or virtualized.
- [ ] Database queries are indexed and optimized.
- [ ] Core Web Vitals meet acceptable thresholds.
`,

  'monitoring': `# Monitoring

**Estimated Time:** 2-4 hours

---

## Why this matters
You cannot fix what you cannot see. Monitoring provides visibility into the health, usage, and performance of your application. Without it, you are flying blind, and your users will be the first to tell you when something breaks—usually by leaving angry reviews or churning.

## Strategic Guidance

### Hackathon Mode
Do not implement monitoring for a hackathon. It is a complete waste of time. You will be sitting next to the computer running the code during the demo. 

If something breaks, you will see it immediately. Do not install Sentry, Datadog, or any other monitoring tool. Spend that time polishing the UI or adding one more killer feature to your demo.

### Personal Project
For a personal project, basic monitoring is a good learning experience but not strictly necessary for survival. You want to know if the app goes down while someone is reviewing your portfolio.

Set up a simple uptime monitor using a free service like UptimeRobot. This will ping your app every few minutes and email you if it goes down. You might also want to set up basic error tracking (like a free Sentry tier) just to see what errors occur, but do not spend hours configuring complex dashboards.

### Production SaaS
Production SaaS requires comprehensive, real-time observability. You need to know there is a problem before your users do. This requires a robust monitoring stack.

Implement Application Performance Monitoring (APM) using tools like Datadog, New Relic, or Sentry. You must track uptime, API response times, error rates, and infrastructure metrics (CPU, memory). Create detailed dashboards that visualize the health of your system at a glance.

Furthermore, set up proactive alerting. Route critical alerts to PagerDuty or a dedicated Slack channel so your engineering team can respond immediately. Establish clear Service Level Objectives (SLOs) and monitor your adherence to them. Monitoring is the pulse of a production system.

## Monitoring Strategy Prompt
\`\`\`prompt
Act as a Senior DevOps Engineer. I need to set up comprehensive monitoring for a production SaaS application built with [Insert Tech Stack]. Recommend a tech stack for observability (APM, error tracking, uptime) and list the 5 most critical metrics I should build alerts for immediately.
\`\`\`

## Validation Checklist
- [ ] An uptime monitor is configured to alert on downtime.
- [ ] Application errors are tracked and aggregated automatically.
- [ ] Key performance metrics (latency, error rate) are visible on a dashboard.
- [ ] Critical alerts are routed to the appropriate team members.
`,

  'logging': `# Logging

**Estimated Time:** 2-4 hours

---

## Why this matters
When things go wrong in production, logs are your only source of truth. They provide the context needed to debug complex issues, trace user journeys, and understand the sequence of events that led to a failure. Good logging is the difference between fixing a bug in 10 minutes and spending 3 days guessing.

## Strategic Guidance

### Hackathon Mode
Do not build a logging infrastructure. `console.log()` is your best friend. 

You only need logs to debug issues during the 48-hour development window. Do not integrate external logging services like Logtail or Datadog. Keep your terminal open and read the standard output. Speed is the only priority.

### Personal Project
For a personal project, standard output logging is generally sufficient. You want to ensure your logs are readable and helpful for debugging, but you don't need a centralized logging pipeline.

Use a simple structured logger (like Pino or Winston in Node.js) instead of raw `console.log()`. This teaches you the value of structured data. If you deploy to a platform like Vercel, Heroku, or Render, rely on their built-in log viewers. Focus on logging significant events, such as user logins, database errors, and third-party API failures.

### Production SaaS
In a production SaaS, logs must be centralized, searchable, and structured. You will have multiple servers or serverless functions running simultaneously; you cannot SSH into machines to read text files.

Implement structured JSON logging across your entire stack. Every log entry must include contextual metadata: timestamp, log level, user ID, request ID, and service name. Use a centralized logging platform like Datadog, New Relic, or ELK (Elasticsearch, Logstash, Kibana) to aggregate all logs in one place.

Ensure you are not logging Sensitive Personal Information (PII) or passwords. Establish a log retention policy to manage costs and comply with data privacy regulations. Robust logging is essential for diagnosing distributed system failures and responding to customer support tickets efficiently.

## Logging Implementation Prompt
\`\`\`prompt
Act as a Backend Architect. I am building a production backend in [Insert Language/Framework]. Generate a configuration for a structured logger (e.g., Winston or Pino for Node). Explain how to ensure a unique 'request ID' is attached to every log generated during a single HTTP request lifecycle.
\`\`\`

## Validation Checklist
- [ ] Logs are output in a structured format (e.g., JSON).
- [ ] Logs include contextual information (User ID, Request ID).
- [ ] Sensitive data (PII, passwords, tokens) is scrubbed from logs.
- [ ] Logs are aggregated in a centralized, searchable platform.
`,

  'errortracking': `# Error Tracking

**Estimated Time:** 1-3 hours

---

## Why this matters
Users rarely report bugs; they just leave. Error tracking tools automatically catch exceptions, unhandled promises, and crashes in your application, providing you with the stack traces and context needed to fix them before more users are impacted.

## Strategic Guidance

### Hackathon Mode
Skip error tracking completely. You will be presenting the app yourself, so you will control the exact flow. If an error happens, you will see it on the screen. 

Do not waste time setting up Sentry or LogRocket. If a bug occurs during development, look at your browser console or terminal. Keep moving forward.

### Personal Project
Adding basic error tracking to a personal project is a great way to learn production practices. It shows that you care about the resilience of your code.

Integrate a free tier of a tool like Sentry. It takes 5 minutes to install and will automatically capture unhandled exceptions in your frontend and backend. You do not need to configure complex alerting or release tracking. Just having the tool catch errors and show you the stack trace is a massive step up from relying on user reports.

### Production SaaS
Error tracking is non-negotiable for a production SaaS. You must have deep visibility into every crash and exception experienced by your users.

Integrate a robust error tracking platform (like Sentry, Rollbar, or Bugsnag) across your frontend, backend, and mobile apps. Configure the tool to capture source maps so you can read minified stack traces. Attach user context (User ID, email) to errors so you know exactly who was affected.

Set up alerting rules to notify your team when there is a spike in errors or when a new, critical exception is introduced in a recent deployment. Treat unhandled exceptions as high-priority debt that must be paid down immediately to maintain a high-quality user experience.

## Error Tracking Setup Prompt
\`\`\`prompt
Act as a Full Stack Developer. Provide a step-by-step guide on how to integrate Sentry into a [Insert Tech Stack, e.g., React and Express] application. Include how to configure source maps for the frontend and how to globally catch and report unhandled promise rejections on the backend.
\`\`\`

## Validation Checklist
- [ ] An error tracking tool (e.g., Sentry) is integrated into the frontend and backend.
- [ ] Source maps are uploaded to the error tracking tool for readable stack traces.
- [ ] User context (ID, email) is attached to error reports.
- [ ] Alerts are configured for significant spikes in error rates.
`,

  'ratelimiting': `# Rate Limiting

**Estimated Time:** 2-4 hours

---

## Why this matters
Rate limiting protects your application from abuse, brute-force attacks, and accidental Denial of Service (DoS) caused by runaway scripts. It ensures fair usage of your resources and keeps your infrastructure costs predictable by preventing a single user from overwhelming your system.

## Strategic Guidance

### Hackathon Mode
Do not implement rate limiting. Your app will only be used by you and maybe a few judges for a few minutes. 

No one is going to DDOS your hackathon project. Implementing rate limiting will only slow you down and potentially block you during your own demo if you refresh too many times. Ignore it completely.

### Personal Project
For a personal project, basic rate limiting is a good defensive measure, especially if you have public-facing APIs or are paying for third-party API calls (like OpenAI).

Implement a simple, in-memory rate limiter or a basic Redis-backed limiter using standard middleware (like `express-rate-limit` for Node.js). Apply it primarily to sensitive routes like login (to prevent brute-force password guessing) and any endpoints that cost you money. This shows a solid understanding of basic security and cost-control principles.

### Production SaaS
In production, rate limiting is a critical infrastructure component. You must protect your database and third-party API quotas from malicious actors and poorly written client integrations.

Implement distributed rate limiting using Redis to ensure limits are enforced consistently across all your backend servers. Create tiered rate limits based on pricing plans (e.g., Free tier gets 100 requests/min, Pro gets 1000 requests/min). 

Apply strict rate limits to authentication routes, password resets, and any resource-intensive endpoints. Return clear `429 Too Many Requests` HTTP status codes with `Retry-After` headers so clients can handle the limits gracefully. Monitor rate limit hits to identify potential attacks or users who need to upgrade their plans.

## Rate Limiting Prompt
\`\`\`prompt
Act as a Backend Architect. I am building an API with [Insert Tech Stack, e.g., Node.js, Express, Redis]. Provide code examples and a strategy for implementing tiered rate limiting based on a user's subscription plan. Include strict limits for authentication routes to prevent brute-force attacks.
\`\`\`

## Validation Checklist
- [ ] Rate limiting is applied to all authentication and password reset routes.
- [ ] Rate limiting is applied to resource-intensive or costly API endpoints.
- [ ] The API returns a 429 status code and helpful headers when limits are exceeded.
- [ ] Rate limits are enforced consistently across distributed server instances.
`
};

for (const [key, markdown] of Object.entries(topics)) {
  updateTopic(key, markdown);
}
console.log('Batch 1 (Part 1) of Phase 4 complete.');
