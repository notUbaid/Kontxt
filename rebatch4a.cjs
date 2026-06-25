const { updateTopic } = require('./update_topic.cjs');

const topics = [
  {
    key: 'techstackselection',
    content: `# Tech Stack Selection\n\n🕒 **Estimated Time:** 20 min\n\n---\n\n## Why this matters\nYour tech stack dictates your hiring pool, your hosting costs, and your development speed. Changing your stack later is painful and expensive.\n\n## Strategic Guidance\n\n### Hackathon Mode\nUse whatever you are already fastest at. \n\nIf you know Python, use Python. If you know React, use React. Do not try to learn a brand new framework during a 48-hour hackathon unless learning is your primary goal. Speed is your only metric.\n\n### Personal Project\nThis is the perfect time to experiment. \n\nIf you've always used Node.js, try Go or Rust. If you always use React, try Svelte or Vue. Use modern, bleeding-edge frameworks (like Next.js 15 or Nuxt) to see what the hype is about. You don't have to worry about legacy support.\n\n### Production SaaS\nBoring technology is good technology. \n\nUse mature, heavily supported frameworks with massive ecosystems (React, Next.js, Node.js, PostgreSQL). When you hit a bug at 2 AM, you want to be able to find a StackOverflow answer from 3 years ago. Avoid bleeding-edge tech that might be abandoned in a year.\n\n### Custom Mode\nEnterprise tech stacks are often dictated by existing infrastructure and compliance. \n\nIf the client is a Microsoft shop, you are building in C#/.NET and deploying to Azure. If they are an AWS shop, you are using Java or Go. Your stack must be perfectly aligned with their internal security protocols and CI/CD pipelines.\n\n## The Decision\n\`\`\`input\nWrite Here...\n\`\`\`\n`
  },
  {
    key: 'frontendarchitecture',
    content: `# Frontend Architecture\n\n🕒 **Estimated Time:** 15 min\n\n---\n\n## Why this matters\nA poorly architected frontend quickly becomes a "big ball of mud." State management gets tangled, components become massive, and every new feature breaks an old one.\n\n## Strategic Guidance\n\n### Hackathon Mode\nPut everything in one massive ` + '\\`' + `App.tsx` + '\\`' + ` file if you have to. \n\nDon't waste time meticulously organizing your components into folders. Use global state (or just prop drill) without guilt. The codebase will be abandoned on Monday anyway.\n\n### Personal Project\nPractice clean architecture. \n\nSeparate your UI components (dumb components) from your business logic (smart components). Try implementing a modern state management library like Zustand or Jotai just to see how it feels.\n\n### Production SaaS\nYou must establish a strict folder structure and component hierarchy. \n\nUse a feature-based architecture (grouping files by feature rather than by type). Enforce strict linting rules. Decide upfront how you will handle data fetching (e.g., TanStack Query) and global state. Your goal is that a new engineer can join the team and know exactly where a specific file lives within 10 minutes.\n\n### Custom Mode\nEnterprise frontends are often Micro-Frontends. \n\nYou might have 5 different engineering teams working on 5 different sections of the app simultaneously. The architecture must allow these teams to deploy their specific sections independently without breaking the global application shell.\n\n## Accountability Check\n- [ ] I understand my frontend architecture constraints.\n`
  },
  {
    key: 'backendarchitecture',
    content: `# Backend Architecture\n\n🕒 **Estimated Time:** 20 min\n\n---\n\n## Why this matters\nYour backend is the brain of your application. If it is slow, insecure, or brittle, your entire product fails.\n\n## Strategic Guidance\n\n### Hackathon Mode\nUse a Backend-as-a-Service (BaaS) like Supabase or Firebase. \n\nDo not write your own backend from scratch. You don't have time to configure Express, set up a Postgres connection pool, and handle JWT authentication. Let the BaaS do 90% of the work so you can focus on the UI.\n\n### Personal Project\nIf you want to learn backend engineering, build a monolithic server in Node, Go, or Python. \n\nDeploy it on a free tier like Render or Railway. Keep it simple: one server, one database.\n\n### Production SaaS\nA majestic monolith or a modular monolith is usually the best choice for a new SaaS. \n\nDo not build microservices on Day 1; they introduce massive operational complexity (network latency, distributed tracing, complex CI/CD). Build a highly structured monolith that can scale to millions of users on a decent-sized server.\n\n### Custom Mode\nEnterprise backends are heavily distributed, highly available microservices. \n\nYou must design for fault tolerance. If the payment microservice goes down, the rest of the application must stay up. You will use Kafka or RabbitMQ for asynchronous event-driven communication between services. Every service will have its own database.\n\n## Accountability Check\n- [ ] I understand my backend architecture constraints.\n`
  },
  {
    key: 'apidesign',
    content: `# API Design\n\n🕒 **Estimated Time:** 25 min\n\n---\n\n## Why this matters\nAPIs are how your frontend talks to your backend (and how third parties integrate with your software). A messy API leads to brittle integrations and constant breakages.\n\n## Strategic Guidance\n\n### Hackathon Mode\nIf you are using a BaaS like Supabase, you don't even need to design an API; just use their auto-generated client SDKs. \n\nIf you must build an API, make it a simple RPC (Remote Procedure Call) style. Don't worry about perfect REST semantics.\n\n### Personal Project\nTry building a GraphQL API or a tRPC API to learn the benefits of end-to-end type safety. It's a great skill to add to your toolkit.\n\n### Production SaaS\nDesign a clean, versioned RESTful API. \n\nUse standard HTTP verbs (GET, POST, PUT, DELETE) and standard status codes (200, 400, 404, 500). Prefix your routes with ` + '\\`' + `/api/v1/` + '\\`' + `. You *must* implement rate limiting and pagination from the very beginning.\n\n### Custom Mode\nYour API is a standalone product. \n\nIt must be documented with an OpenAPI (Swagger) specification before a single line of code is written. It must support complex filtering, webhooks, and granular API keys (e.g., an API key that only has read access to a specific table). Breaking changes are strictly forbidden without a 1-year deprecation notice.\n\n## API Generation\n\`\`\`prompt\nAct as a Backend Architect. Based on my PRD, design the core REST API endpoints I will need.\n\`\`\`\n- [ ] I have generated my core API design.\n`
  }
];

let allSuccess = true;
for (const u of topics) {
  if (!updateTopic(u.key, u.content)) {
    allSuccess = false;
  }
}

if (allSuccess) {
  console.log("Batch 4a Deep Content applied!");
} else {
  console.error("Errors occurred in Batch 4a.");
  process.exit(1);
}
