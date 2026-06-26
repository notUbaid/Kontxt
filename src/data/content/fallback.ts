export const fallbackContent: Record<string, string> = {
  'internaltechnicaldebt': `
# Technical Debt

🕒 **Estimated Time:** 1-3 Hours

---

## Why this matters
Internal tools suffer from "Good Enough" syndrome. Because the tool isn't public, Engineering is pressured to ship features quickly and ignore refactoring. Over 3 years, the codebase becomes a tangled mess of tech debt. Eventually, adding a single button takes 2 weeks because the frontend architecture is so fragile.

## Strategic Guidance

### Hackathon Mode
The entire project is technical debt. 

### Personal Project
Refactor when you get annoyed.

### Production SaaS / Enterprise
Technical Debt must be managed like a financial budget. You cannot ignore it, and you cannot spend 100% of your time paying it off.

1. **The 20% Rule**:
   Allocate exactly 20% of every Engineering Sprint to paying down technical debt. This means upgrading dependencies (e.g., migrating from React 17 to 18), refactoring massive files, and improving test coverage. Do not ask management for permission to do this; bake it into your velocity estimates.
2. **Dependency Management**:
   Do not let your 'package.json' rot. Use tools like **Dependabot** or **Renovate** to automatically open Pull Requests for minor package updates every week. An internal tool running on a 4-year-old version of Node.js is a massive security liability.
3. **The "Boy Scout" Rule**:
   Always leave the code better than you found it. If you are adding a feature to a file and you notice an unused variable or a poorly named function, fix it in that same Pull Request.

---

## The Data We Need From You

**How will you ensure dependencies stay up to date and secure?**
\`\`\`input
Dependency Strategy (e.g., Dependabot, Weekly manual updates):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Staff Engineer. Our internal tool is 2 years old and the Tech Debt is slowing down feature delivery. Management wants us to spend 100% of our time on new features. Write a persuasive argument for the VP of Engineering explaining why enforcing a strict "20% Tech Debt Allocation" per sprint will actually *increase* feature delivery speed over the next 12 months.
\`\`\`

- [ ] 20% of engineering capacity is dedicated to refactoring and maintenance.
- [ ] Automated dependency updates (Dependabot) are enabled.
- [ ] Security vulnerabilities in third-party packages are patched immediately.
`,

  'internalusagetracking': `
# Usage Tracking

🕒 **Estimated Time:** 1-2 Hours

---

## Why this matters
If you are building an internal tool to replace a legacy system, you need concrete proof that employees are actually migrating to the new tool. If login counts are dropping on the new tool, it means employees have found a workaround (or went back to their spreadsheets). 

## Strategic Guidance

### Hackathon Mode
Check the database to see if anyone created an account.

### Personal Project
Skip this.

### Production SaaS / Enterprise
Usage tracking proves the ROI of the Engineering team to the Executive board.

1. **Daily Active Users (DAU)**:
   Track how many unique employees log in each day. If the department has 500 people, and your DAU peaks at 150, you have an adoption crisis.
2. **Session Depth**:
   Are users logging in, staring at the dashboard for 10 seconds, and leaving? Or are they completing full workflows (e.g., Login -> Search -> Edit -> Save)? Track "Workflow Completion Rate", not just page views.
3. **The Executive Dashboard**:
   Do not force the CEO to log into PostHog to see if the tool is successful. Build a weekly automated email (or Slack message) that sends the Top 3 usage metrics directly to the executive team. "This week: 450 DAU, 12,000 invoices processed, $5M in revenue routed."

---

## The Data We Need From You

**How will you report the success of this tool to the Executive team?**
\`\`\`input
Reporting Method (e.g., Automated Slack weekly summary, Monthly live demo):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Data Engineer. I need to generate a weekly summary of our internal tool's usage to send to the CEO. Write a Postgres SQL query that calculates the Daily Active Users (DAU) over the last 7 days, and calculates the total number of 'Invoices' that successfully reached the 'PAID' state in that same window.
\`\`\`

- [ ] DAU and Workflow Completion Rates are actively monitored.
- [ ] Low adoption triggers immediate UX investigation, not just more feature development.
- [ ] Executives receive automated summaries proving the tool's ROI.
`,

  'internalprocessimprovements': `
# Process Improvements

🕒 **Estimated Time:** 1-2 Hours

---

## Why this matters
Internal tools do not just digitize existing workflows; they present an opportunity to *delete* workflows. If you build software to automate a business process that shouldn't exist in the first place, you are wasting money. Continuous improvement requires analyzing the data the tool generates to find operational bottlenecks.

## Strategic Guidance

### Hackathon Mode
Skip this.

### Personal Project
Look at the tool once a month and see if you can make it faster.

### Production SaaS / Enterprise
Engineering and Operations must hold a monthly "Process Review" meeting.

1. **Identify the Bottlenecks**:
   Look at your Time-to-Resolution (TTR) metrics. If every stage of an invoice approval takes 2 hours, except "Manager Review" which averages 4 days, you have found the bottleneck.
2. **Software vs Policy**:
   If the Manager Review takes 4 days, Engineering might suggest building an "Automated Slack Reminder" system. But the real fix might be a Policy change: "Managers are no longer required to review invoices under $500. They are auto-approved." Always look for Policy solutions before writing code.
3. **Delete Features**:
   If your analytics show a feature hasn't been clicked in 6 months, delete the code. Less code means fewer bugs, faster build times, and a simpler UI.

---

## The Data We Need From You

**Who is responsible for the monthly review of operational bottlenecks?**
\`\`\`input
Owner (e.g., Product Manager, Head of Ops):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as an Operations Consultant. We built an internal tool that tracks our supply chain. Our analytics show that the "Vendor QA" step takes an average of 6 days, delaying all shipments. Provide a framework for a meeting between Engineering and Operations to determine whether this delay requires a Software fix (e.g., better vendor portals) or a Policy fix (e.g., changing QA requirements).
\`\`\`

- [ ] A recurring meeting exists to review tool metrics and identify bottlenecks.
- [ ] Policy changes are prioritized over writing new code to solve human delays.
- [ ] Unused features are aggressively deprecated and deleted from the codebase.
`,

  'internalfeaturerequests': `
# Feature Requests

🕒 **Estimated Time:** 1-2 Hours

---

## Why this matters
If you say "Yes" to every feature request from every department, your internal tool will become a bloated, incomprehensible Frankenstein monster of a UI. You must protect the simplicity of the tool with aggressive pushback.

## Strategic Guidance

### Hackathon Mode
Build whatever sounds cool.

### Personal Project
Build it if you think you'll use it more than once.

### Production SaaS / Enterprise
Feature requests are usually solutions disguised as problems. Your job is to extract the problem.

1. **The "5 Whys" Triage**:
   If Operations says "Add a button to export all users to a PDF," do NOT just build the PDF export. Ask Why. "Why do you need a PDF?" -> "Because I need to email the list to the vendor." -> "Why?" -> "Because the vendor needs to verify active users." -> **Actual Solution**: Build an automated weekly email report sent directly to the vendor, skipping the PDF export entirely.
2. **Saying No**:
   You must be comfortable saying No to the CEO. If a feature only benefits 1 person but adds a confusing new dropdown menu for 500 people, the answer is No. 
3. **The "No-Code" Relief Valve**:
   If a department demands a highly specific, custom report that changes every week, do not build it in React. Expose the raw data to them via a Metabase or Retool dashboard, and let them build their own reports.

---

## The Data We Need From You

**How will you handle highly specific, one-off reporting requests?**
\`\`\`input
Relief Valve Strategy (e.g., Give them Metabase access, Export to CSV):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Senior Product Manager. A Department Head has requested a highly complex, custom React dashboard view that only their 3-person team will ever use. It will take Engineering 3 weeks to build. Write an email to the Department Head declining the request, but offering a compromise using our existing Metabase BI integration.
\`\`\`

- [ ] A formal process exists for triaging feature requests (e.g., The 5 Whys).
- [ ] Engineering aggressively pushes back on UI bloat.
- [ ] "Relief Valves" (BI tools, CSV exports) are used to satisfy one-off reporting needs.
`,

  'internalroadmap': `
# Roadmap

🕒 **Estimated Time:** 1-2 Hours

---

## Why this matters
An internal tool is never "finished". Because it is built for the exact workflows of the company, as the company evolves, the tool must evolve. If Engineering does not publish a clear roadmap, the Operations team will assume the tool is abandoned, and they will start buying off-the-shelf SaaS products to solve their new problems.

## Strategic Guidance

### Hackathon Mode
The roadmap is whatever you build next weekend.

### Personal Project
Keep a To-Do list in Notion.

### Production SaaS / Enterprise
An internal roadmap is a political document. It aligns Engineering resources with Business goals.

1. **Now, Next, Later**:
   Do not publish a roadmap with exact dates (e.g., "Feature X launches on November 14th"). Software estimation is impossible. Use the "Now, Next, Later" format. It communicates priority without making impossible promises.
2. **Public Visibility**:
   The roadmap must be visible to the entire company. Pin a link to the Notion/Jira roadmap in the main Slack channel. When Operations requests a massive new feature, you can point to the roadmap and say, "We can build that, but it will push 'Automated Payroll' into the Later column. Do you agree with that trade-off?"
3. **Sunset Legacy Systems**:
   Your roadmap MUST include the timeline for turning off the old systems. Maintaining two systems indefinitely will drain your Engineering budget.

---

## The Data We Need From You

**Define one major initiative for each phase of your roadmap:**
\`\`\`input
Now (Currently Building):
Next (Coming Soon):
Later (Future Vision):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a VP of Engineering. We just launched V1 of our internal logistics tool. The Operations team is thrilled, but they are already submitting 50 new feature requests. Write a memo to the company explaining our "Now, Next, Later" roadmap philosophy, and explain how new feature requests will be prioritized against our primary goal of sunsetting the legacy MySQL database.
\`\`\`

- [ ] A roadmap exists in a "Now, Next, Later" format.
- [ ] The roadmap is publicly accessible to the entire company.
- [ ] Sunsetting legacy systems is explicitly tracked on the roadmap.
`,

  'internaluserfeedback': `
# User Feedback

🕒 **Estimated Time:** 1-2 Hours

---

## Why this matters
Employees will not open Jira, find the correct project, select the "Bug" issue type, and fill out a 15-field form just to tell you the padding on a button is weird. They will simply suffer in silence, or they will Slack you directly. You need a frictionless way to collect feedback exactly when the user experiences frustration.

## Strategic Guidance

### Hackathon Mode
Put your email address in the footer.

### Personal Project
Add a simple "Contact" form that sends you an email via Resend.

### Production SaaS / Enterprise
Feedback collection must be **In-Context** and **Automated**.

1. **The In-App Widget**:
   Embed a widget (like Sentry User Feedback, or a custom floating button) on every page. When the user clicks it, it should automatically capture their 'user_id', the current URL, and (if possible) a screenshot of the DOM.
2. **Routing Feedback**:
   Do not send feedback to a generic "support@company.com" email where it goes to die. Route all feedback submitted through the internal tool directly into a dedicated Slack channel (e.g., '#internal-tool-feedback'). Engineering must monitor this channel.
3. **Closing the Loop**:
   When an employee submits a good idea, and you build it, you MUST notify them. "Hey Sarah, thanks for suggesting the Bulk Approve feature. It's live now!" This builds immense goodwill and encourages future feedback.

---

## The Data We Need From You

**Where will in-app feedback be routed?**
\`\`\`input
Feedback Destination (e.g., Jira Triage Board, specific Slack channel):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Product Manager. We want to implement a frictionless feedback loop in our internal React tool. Write a React component for a floating 'Feedback' button. When clicked, it opens a modal. When submitted, the Node.js backend should take the user's text, append their current browser URL and User ID, and send it as a formatted message to a Slack Webhook.
\`\`\`

- [ ] A frictionless, in-app feedback widget is implemented.
- [ ] Feedback is routed directly to Engineering via Slack or a Triage board.
- [ ] System automatically captures contextual metadata (URL, User ID).
`,

  'internalanalytics': `
# Analytics

🕒 **Estimated Time:** 1-3 Hours

---

## Why this matters
In consumer apps, analytics are used to optimize advertising spend. In internal tools, analytics are used to measure ROI (Return on Investment). If the company spent $100,000 building this tool to "save the Operations team time," but the analytics show that the average time to process an invoice actually *increased* from 4 minutes to 6 minutes, the project is a failure.

## Strategic Guidance

### Hackathon Mode
Don't install analytics. Ask the judges if they liked it.

### Personal Project
Install Google Analytics (GA4) or Plausible to see if anyone visits the page.

### Production SaaS / Enterprise
1. **Time-to-Resolution (TTR) Metrics**:
   The most important metric for an internal tool is TTR. Track exactly when a user opens an Invoice, and when they click "Approve". Send that duration to your analytics provider. If a specific UI update causes TTR to spike, you need to revert the design.
2. **Feature Adoption Rates**:
   If Engineering spent 3 weeks building a "Bulk Export" feature, but analytics show that 0% of users clicked it this month, you have a product management problem. You must instrument every major feature with a "Feature Used" event.
3. **Data Privacy**:
   Do not send Personally Identifiable Information (PII) to PostHog or Google Analytics. If a user searches for "John Doe SSN", do not log the search query text in the analytics payload. Log the event as "Search Performed".

---

## The Data We Need From You

**What is the single most important metric that determines the success of this tool?**
\`\`\`input
North Star Metric (e.g., Average Time to Process Invoice):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Product Analyst. We are launching an internal tool for our Customer Support team. We use PostHog for event tracking. Write the React code required to track the "Time-to-Resolution" of a support ticket. The timer should start when the React component mounts, and the 'capture' event should fire when the user clicks the 'Resolve Ticket' button, passing the duration (in seconds) as a custom property.
\`\`\`

- [ ] A product analytics tool (PostHog, Mixpanel) is installed.
- [ ] Time-to-Resolution (TTR) is tracked for critical workflows.
- [ ] PII is strictly excluded from analytics payloads.
`,

  'internallaunchchecklist': `
# Launch Checklist

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
A "Big Bang" release (turning off the old system on Friday, and forcing everyone onto the new system on Monday) is the most dangerous maneuver in software engineering. If the new system fails on Monday, the entire company grinds to a halt.

## Strategic Guidance

### Hackathon Mode
Deploy it and tweet the link.

### Personal Project
Start using it immediately.

### Production SaaS / Enterprise
You must de-risk the launch using a **Phased Rollout**.

1. **The Parallel Run**:
   For critical financial or logistical systems, run both systems simultaneously. The Operations team enters data into the Old System AND the New System for two weeks. At the end of the week, compare the reports generated by both systems. If they match perfectly, the New System is validated.
2. **Department-by-Department**:
   Do not launch to everyone. Launch to the "Marketing" team on Week 1. Fix the bugs. Launch to the "Sales" team on Week 2. Fix the bugs. Launch to the core "Operations" team on Week 4.
3. **Feature Flags**:
   The code for the new tool should be deployed in Production weeks before the actual launch, hidden behind a Feature Flag. On launch day, you do not run a risky deployment pipeline; you simply flip a switch in your database or LaunchDarkly to enable the UI.

---

## The Data We Need From You

**What is the sequence of your Phased Rollout?**
\`\`\`input
Phase 1 (Which department/team?):
Phase 2 (Which department/team?):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Release Manager. We are launching a new internal tool that replaces the legacy 'Billing Portal'. Write a Phased Rollout schedule that spans 4 weeks. Include a 'Parallel Run' phase, a 'Department Beta' phase, and the final 'Hard Cutover' phase. Detail the specific success metrics that must be met before advancing from one phase to the next.
\`\`\`

- [ ] "Big Bang" cutovers are strictly avoided.
- [ ] A Phased Rollout (by department or geography) is planned.
- [ ] The code is deployed and dormant (hidden via Feature Flags) well before launch day.
`,

  'internalbetarollout': `
# Beta Rollout

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
If you launch a new internal tool to the entire 500-person Operations department on Monday morning, and it has a critical bug, you just cost the company $50,000 in lost productivity. You must validate the tool with a small, contained group of power users first.

## Strategic Guidance

### Hackathon Mode
Send the localhost URL via ngrok to your buddy.

### Personal Project
Deploy to Vercel and text the link to 3 friends.

### Production SaaS / Enterprise
The Beta Environment (often called Staging or UAT - User Acceptance Testing) must be an exact clone of Production.

1. **Anonymized Production Data**:
   Testing a beta tool with "Test User 1" and "Fake Invoice A" is useless. The beta users need real data to test real workflows. However, for security compliance, you must run a script that sanitizes the production database (e.g., scrambling Social Security Numbers, randomizing email addresses) before loading it into the Beta Environment.
2. **The "Pilot Group"**:
   Select 5 to 10 "Power Users" in the company. These should be the people who complain the loudest about the old system. If you can make them happy in the Beta phase, they will champion the tool to the rest of the company during the full rollout.
3. **Explicit Feedback Loops**:
   Do not ask "How is it?" on Slack. Embed a "Report Bug" button directly into the Beta UI that automatically captures their screen, browser version, and current URL, and creates a Jira ticket.

---

## The Data We Need From You

**Who are the 3 "Power Users" you will select for the Pilot Group?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a QA Manager. We are deploying the Beta environment for our internal tool. Write a structured "User Acceptance Testing (UAT)" script. This script should not be technical; it should be a step-by-step checklist written for a non-technical Operations employee to follow, ensuring they test the 'Create Invoice', 'Approve Invoice', and 'Generate Report' workflows using real-world scenarios.
\`\`\`

- [ ] The Beta environment runs on anonymized production data.
- [ ] A specific Pilot Group of power users has been identified.
- [ ] An explicit, frictionless bug reporting mechanism is built into the UI.
`,

  'internaltrainingmaterials': `
# Training Materials

🕒 **Estimated Time:** 1-3 Hours

---

## Why this matters
Internal tools force behavioral change. The Operations team has used the same Excel spreadsheet for 8 years. You are now taking away their spreadsheet. If you do not actively manage this transition through training, they will sabotage the new tool and secretly keep using the spreadsheet.

## Strategic Guidance

### Hackathon Mode
Skip training.

### Personal Project
Skip training, you are the only user.

### Production SaaS / Enterprise
Training is an exercise in Change Management, not just feature explanation.

1. **"Train the Trainer" Model**:
   If the company has 500 employees, the Engineering team cannot train everyone. Train the 10 Department Managers (the "Champions"). Provide them with the slide decks and Loom videos. They will then train their respective teams.
2. **Focus on "Why", Not Just "How"**:
   Do not just show them how to click the "Submit" button. Explain *why* the new tool exists. ("This new tool automatically calculates the tax rate so you don't have to do it manually anymore.") If they understand how it benefits *them*, they will adopt it.
3. **The 'Office Hours' Phase**:
   For the first two weeks after launch, hold a daily 30-minute open Zoom call called "Office Hours". Anyone in the company can drop in, share their screen, and ask how to perform a specific workflow. This drastically reduces support tickets and builds trust.

---

## The Data We Need From You

**Who are the "Trainers" (Department Champions) that you will personally train?**
\`\`\`input
1. 
2. 
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Change Management Consultant. We are replacing a 10-year-old legacy internal tool with a modern React app. Write an email template to be sent to all employees. The email should NOT focus on technical features; it should focus on empathy, acknowledging the friction of learning a new system, explicitly stating the top 2 benefits to the employees' daily lives, and inviting them to the upcoming "Office Hours".
\`\`\`

- [ ] A "Train the Trainer" model is established.
- [ ] Training materials focus on the employee benefits, not just feature documentation.
- [ ] Engineering has scheduled post-launch "Office Hours" for direct support.
`,

  'internalemployeeonboarding': `
# Employee Onboarding

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
In consumer software, if a user can't figure out the UI, they leave. In enterprise software, if an employee can't figure out the UI, they file a support ticket, complain to their manager, and refuse to do their work. You cannot just email a link and say "Good luck."

## Strategic Guidance

### Hackathon Mode
Explain it to the judges in person.

### Personal Project
Write a quick Markdown guide.

### Production SaaS / Enterprise
Onboarding must be integrated directly into the product.

1. **Contextual Help, Not Manuals**:
   Nobody reads the PDF manual. Use tools like **Intro.js** or **Shepherd.js** to build an interactive product tour that highlights the exact buttons they need to click the first time they log in.
2. **Empty States**:
   If a user logs in and the dashboard is completely blank because they haven't created any records yet, they will think it's broken. Design your empty states to be highly actionable. Instead of "No Data", it should say "You have no active projects. Click here to import your first project from Salesforce."
3. **The "Sandbox" Mode**:
   New employees are terrified of clicking the wrong button and breaking the company database. Provide a "Sandbox Mode" or a dedicated training environment where they can safely create fake invoices to learn the system without fear of repercussions.

---

## The Data We Need From You

**What is the very first action a user should take when they log in to an empty account?**
\`\`\`input
Primary Call to Action:
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a UX Designer. I am building the "Empty State" for the primary dashboard of our internal tool. The user has no data yet. Write the React component structure for an empty state that avoids the generic "No Data Found" message, and instead provides a friendly onboarding checklist with direct links to initiate their first 3 core tasks.
\`\`\`

- [ ] Contextual product tours (Intro.js) are used instead of static PDFs.
- [ ] Empty states are actionable and guide the user to their first success.
- [ ] Employees have a safe way to test the system without breaking production data.
`,

  'internaldomainsetup': `
# Domain Setup

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Domain Setup, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Domain Setup should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Domain Setup can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Domain Setup?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Domain Setup component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Domain Setup.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalhosting': `
# Hosting

🕒 **Estimated Time:** 1-3 Hours

---

## Why this matters
Internal tools have vastly different hosting requirements than B2C apps. A B2C app needs a global CDN so a user in Tokyo gets the site in 50ms. An internal tool is likely used by 500 employees sitting in an office in Chicago. Hosting should optimize for security and database latency, not global edge caching.

## Strategic Guidance

### Hackathon Mode
Deploy the frontend on Vercel and the database on Supabase.

### Personal Project
Deploy a single Docker container on a cheap DigitalOcean droplet.

### Production SaaS / Enterprise
1. **Colocation with the Database**:
   Do not host your React frontend in Vercel (AWS us-east-1) and your database in Google Cloud (us-central1). The latency between the two will cause your tool to feel sluggish. Host your Node.js backend in the exact same data center region as your database.
2. **Private Network Routing**:
   If your company already uses AWS, host the internal tool on AWS ECS/EKS. This allows you to use VPC Peering to connect directly to the existing corporate database without exposing it to the internet.
3. **Internal Subdomains**:
   Do not use \`my-internal-tool.com\`. Use \`tool.internal.mycompany.com\` and configure the DNS so it only resolves if the user is connected to the corporate VPN.

---

## The Data We Need From You

**Where will the application be physically hosted?**
\`\`\`input
Region/Provider (e.g., AWS us-east-1, GCP us-central1):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Cloud Architect. We are deploying an internal tool. The primary legacy database is hosted on an on-premise server in Chicago. Explain the latency tradeoffs between hosting the Node.js backend on Vercel (Edge Functions) versus hosting it on an AWS EC2 instance located in us-east-2 (Ohio), and recommend the best approach for an internal tool.
\`\`\`

- [ ] Backend is physically colocated with the database.
- [ ] Application is hosted on an internal, VPN-restricted subdomain.
`,

  'internaldisasterrecovery': `
# Disaster Recovery

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
Disaster Recovery (DR) is the process of bringing your internal tool back to life after a catastrophic event (e.g., AWS goes down, a disgruntled employee deletes the database, a ransomware attack encrypts your servers). If your internal tool manages logistics for a physical warehouse, every hour the tool is down costs the company millions of dollars in halted shipments.

## Strategic Guidance

### Hackathon Mode
If it breaks, you give up and go home.

### Personal Project
Keep a copy of the source code on your laptop. If the server dies, push it to a new server.

### Production SaaS / Enterprise
Disaster Recovery is measured in two metrics: **RTO** and **RPO**.

1. **RTO (Recovery Time Objective)**: 
   "How long will it take us to get the system back online?" If your infrastructure is defined as Terraform code, your RTO might be 30 minutes (the time it takes to spin up a new cluster in a different region). If your infrastructure was manually configured over 3 years by clicking around the AWS console, your RTO might be 2 weeks.

2. **RPO (Recovery Point Objective)**: 
   "How much data are we willing to lose?" If you do nightly backups, your RPO is 24 hours. If you use continuous replication (PITR), your RPO is 5 minutes. 

3. **The 'Cold Standby'**:
   For critical internal tools, you must maintain a "Cold Standby" environment in a different geographic region. The infrastructure code is ready to deploy, and the database is continuously replicating. If Region A goes offline, you run one script to boot up the servers in Region B, and update the DNS records.

---

## The Data We Need From You

**Define your acceptable limits for downtime and data loss:**
\`\`\`input
RTO (e.g., 4 Hours):
RPO (e.g., 15 Minutes):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Business Continuity Manager. We are hosting a critical internal logistics tool on AWS (us-east-1). Our SLA requires an RTO of 2 hours and an RPO of 15 minutes. Design a Disaster Recovery architecture that allows us to rapidly failover to AWS (us-west-2) in the event of a total region outage, ensuring we meet our RTO and RPO targets.
\`\`\`

- [ ] RTO and RPO targets are explicitly defined and agreed upon by management.
- [ ] Infrastructure as Code (IaC) is fully utilized to guarantee rapid redeployment.
- [ ] Database replication or cross-region backups support the RPO target.
`,

  'internalrbacvalidation': `
# RBAC Validation

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
Role-Based Access Control (RBAC) is useless if it is not enforced at the lowest possible level. If you only hide the "Delete" button on the React frontend, but you forget to add the permission check to the \`DELETE /api/invoice\` backend route, any malicious employee can use Postman to bypass the UI and delete the invoice.

## Strategic Guidance

### Hackathon Mode
Check if \`user.role === 'admin'\` in your Express routes.

### Personal Project
Create a simple middleware that checks an array of allowed roles.

### Production SaaS / Enterprise
Enterprise RBAC must be **Centralized, Granular, and Fail-Closed**.

1. **Fail-Closed Architecture**:
   By default, every single API route should reject all requests with a '403 Forbidden'. You must explicitly opt-in to allow access. If a developer creates a new route and forgets to add the RBAC middleware, the route should be inaccessible, not public.

2. **Attribute-Based Access Control (ABAC)**:
   Roles like "Manager" are often not enough. What if a Manager is only allowed to edit Invoices that belong to *their specific Region*? This requires ABAC. The backend must query the database to verify that 'invoice.region_id === user.region_id' before allowing the update.

3. **Automated RBAC Auditing**:
   Write a script that parses all your backend routes and generates a CSV matrix of [Route] vs [Allowed Roles]. The Security team must review this matrix before every major release to ensure no endpoints were accidentally exposed.

---

## The Data We Need From You

**List one complex Attribute-Based (ABAC) rule your system requires:**
\`\`\`input
Complex Rule (e.g., Regional Managers can only edit their region's users):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as an Application Security Engineer. I am building a Node.js backend. I need to enforce an ABAC rule: "A Sales Rep can view an Order, but they can only UPDATE the Order if they are the original creator of that Order". Write the Express middleware and the Prisma query required to securely enforce this ownership check before the update operation is performed.
\`\`\`

- [ ] The backend API is "Fail-Closed" by default.
- [ ] Permissions are checked at the data-ownership level (ABAC), not just the global role level.
- [ ] The UI securely reflects the backend permissions (hiding unauthorized buttons).
`,

  'internalscalability': `
# Scalability

🕒 **Estimated Time:** 3-5 Hours

---

## Why this matters
In consumer apps, "Scalability" means handling 100,000 concurrent users. In internal tools, "Scalability" means handling 10 concurrent users who are each trying to run a 5-gigabyte export report at the exact same time. If your system is not designed to scale horizontally, a single user running a heavy report will crash the server for everyone else.

## Strategic Guidance

### Hackathon Mode
Don't worry about it. One server is fine.

### Personal Project
Increase the RAM on your single server if it gets slow.

### Production SaaS / Enterprise
Enterprise scalability is about **Resource Isolation** and **Horizontal Scaling**.

1. **Stateless APIs**:
   To scale horizontally (adding more servers behind a load balancer), your API must be perfectly stateless. You cannot store user sessions in local server memory; you must store them in Redis. You cannot upload files to the local disk; you must upload them to S3. If Server A crashes, the load balancer routes the user to Server B, and the user shouldn't even notice.

2. **The "Heavy Lifting" Worker Pool**:
   As mentioned in the Backend section, heavy tasks (like generating a 5GB CSV export) must be pushed to a background queue. You should have a completely separate Auto-Scaling Group of "Worker" servers that only process queue jobs. This ensures the primary API servers remain fast and responsive, no matter how many heavy reports are running.

3. **Database Read Replicas**:
   The primary database (Writer) is the hardest thing to scale. Offload all read-heavy traffic (dashboards, search, reporting) to horizontally scaled Read Replicas.

---

## The Data We Need From You

**Are there any stateful components in your current architecture that will prevent horizontal scaling? (e.g., Local file uploads, Memory caching)**
\`\`\`input
Stateful Components to Remove:
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Systems Architect. We have a Node.js API that currently stores JWT refresh tokens in an in-memory 'Map', and uses Multer to save uploaded CSVs to './uploads'. We are migrating from a single DigitalOcean Droplet to a horizontally scaled AWS ECS cluster with 5 instances. Explain why our current architecture will immediately break, and provide the exact steps to make the API completely stateless using Redis and S3.
\`\`\`

- [ ] The API tier is 100% stateless and stores no local data.
- [ ] Heavy processing is isolated to a separate pool of worker servers.
- [ ] Database read load is distributed across replicas if necessary.
`,

  'internalinfrastructure': `
# Infrastructure

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
Internal tools do not need to scale to millions of concurrent users like TikTok, but they DO need to be highly available, secure, and integrated with the corporate network. If you host your internal tool on a cheap $5 shared server, and it goes down, the entire Operations department stops working. 

## Strategic Guidance

### Hackathon Mode
Use a fully managed Platform-as-a-Service (PaaS) like Vercel, Railway, or Heroku. 

### Personal Project
Host it on a single DigitalOcean Droplet or an AWS EC2 instance.

### Production SaaS / Enterprise
Enterprise infrastructure must balance **Security (VPC)** and **Maintainability**.

1. **Infrastructure as Code (IaC)**:
   Never click around the AWS Console to provision servers. Use **Terraform** or **AWS CDK** to define your infrastructure in code. This allows you to version-control your infrastructure and instantly duplicate your "Production" environment to create a perfect "Staging" environment.

2. **The Virtual Private Cloud (VPC)**:
   Your database must NEVER have a public IP address. It must sit in private subnets inside a VPC. The only things that can talk to the database are the Node.js servers (which are also inside the VPC). 

3. **Zero Trust Access**:
   If an engineer needs to access the production database to debug an issue, they should not use a shared password. They should use a tool like AWS Systems Manager (SSM) or HashiCorp Boundary to temporarily tunnel into the VPC using their SSO credentials, which is fully audit-logged.

---

## The Data We Need From You

**What is your primary hosting strategy?**
\`\`\`input
Hosting Strategy (e.g., Fully Managed PaaS, AWS ECS, Kubernetes):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Cloud Infrastructure Architect. We need to deploy a Node.js backend and a Postgres database for an internal tool on AWS. Write a brief Terraform architecture plan that places the Postgres RDS instance in a Private Subnet (no internet access), and places the Node.js ECS containers in a Public Subnet behind an Application Load Balancer.
\`\`\`

- [ ] Infrastructure is defined as code (Terraform/CDK) where possible.
- [ ] Databases are strictly isolated in private networks without public IPs.
- [ ] Developer access to production infrastructure is brokered via Zero-Trust tunnels.
`,

  'internalcicd': `
# CI/CD

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
"It works on my machine" is an unacceptable excuse in an enterprise environment. If an engineer manually drags and drops a folder onto a server to deploy the internal tool, you have no deployment history, no automated rollback mechanism, and no guarantee that the code actually passed the tests. Continuous Integration and Continuous Deployment (CI/CD) is the automated nervous system of software delivery.

## Strategic Guidance

### Hackathon Mode
Connect your GitHub repo to Vercel or Render. Click "Deploy". It will auto-build on every commit.

### Personal Project
Add a simple GitHub Actions workflow to run 'npm test' before Vercel deploys.

### Production SaaS / Enterprise
Enterprise CI/CD must be **Strict, Automated, and Reversible**.

1. **The Protected Main Branch**:
   No engineer (not even the CTO) is allowed to push code directly to the \`main\` branch. All changes must go through a Pull Request.

2. **The "Continuous Integration" Pipeline**:
   When a Pull Request is opened, the CI pipeline (e.g., GitHub Actions) must automatically run:
   - Type Checking ('tsc --noEmit')
   - Linting ('eslint')
   - Security Scanning (e.g., 'npm audit', Snyk)
   - Unit & Integration Tests
   If *any* of these steps fail, the Pull Request is automatically blocked from being merged.

3. **Database Migration Automation**:
   Deploying the frontend is easy. Deploying the database is hard. Your CD pipeline must automatically execute Prisma/SQL migrations *before* the new Node.js server starts taking traffic. If the migration fails, the pipeline must halt and alert the team.

---

## The Data We Need From You

**Which CI/CD platform will you use to automate your testing and deployment?**
\`\`\`input
CI/CD Platform (e.g., GitHub Actions, GitLab CI, CircleCI):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a DevSecOps Engineer. We are deploying a Next.js/Prisma internal tool. Write a complete GitHub Actions 'deploy.yml' workflow that triggers on a push to 'main'. The workflow must run 'npm ci', run the Jest tests, execute 'npx prisma migrate deploy' against the production database, and finally trigger a Vercel production deployment. Include a step to ping a Slack channel if the deployment fails.
\`\`\`

- [ ] Direct pushes to the production branch are blocked.
- [ ] Automated tests and linting run on every Pull Request.
- [ ] Database migrations are fully integrated into the deployment pipeline.
`,

  'internalbackups': `
# Backups

🕒 **Estimated Time:** 2-3 Hours

---

## Why this matters
There are two types of companies: those who have lost their production database, and those who haven't lost it *yet*. When an engineer accidentally runs a \`DROP TABLE\` command against the production database instead of the staging database, your backups are the only thing standing between you and bankruptcy.

## Strategic Guidance

### Hackathon Mode
No backups. YOLO.

### Personal Project
Write a cron job that runs \`pg_dump\` once a day and saves the SQL file to an S3 bucket.

### Production SaaS / Enterprise
Enterprise backups must be **Automated, Encrypted, and Tested**.

1. **Point-in-Time Recovery (PITR)**:
   Daily backups are not enough. If your database is corrupted at 4:00 PM, and your last backup was at 2:00 AM, you lose 14 hours of company data. Use a managed database provider (AWS RDS, Supabase, Vercel Postgres) that supports PITR. This allows you to restore the database to the exact millisecond before the catastrophic error occurred.

2. **Cross-Region Redundancy**:
   If the entire AWS us-east-1 region goes down, your database and your backups in us-east-1 are inaccessible. Replicate your automated backups to a completely different geographic region (e.g., us-west-2).

3. **The "Restore Drill"**:
   A backup is completely worthless if you don't know how to restore it. Once a quarter, you must run a "Restore Drill". Take the production backup, spin up a temporary staging server, and verify that the data successfully restores within your RTO (Recovery Time Objective).

---

## The Data We Need From You

**How will you achieve Point-in-Time Recovery (PITR) for your database?**
\`\`\`input
Backup Strategy (e.g., AWS RDS Automated Backups, Supabase PITR):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Database Administrator. We are using PostgreSQL on AWS RDS. Explain the difference between standard automated snapshots and Point-in-Time Recovery (PITR) using Write-Ahead Logs (WAL). Write the exact AWS CLI commands I would need to run during an emergency to restore our production database to its exact state 15 minutes ago.
\`\`\`

- [ ] Point-in-Time Recovery (PITR) is enabled on the primary database.
- [ ] Backups are replicated to a separate geographic region.
- [ ] A documented "Restore Drill" process exists and is tested quarterly.
`,

  'internalerrortracking': `
# Error Tracking

🕒 **Estimated Time:** 2-3 Hours

---

## Why this matters
Logs tell you *what* happened. Error tracking tells you *where* it happened and *how many times*. If a React component throws a TypeError in the user's browser, your backend logs will never see it. You need dedicated error tracking to capture stack traces from both the frontend and backend.

## Strategic Guidance

### Hackathon Mode
Rely on users telling you when the screen goes white.

### Personal Project
Wrap your main React app in an Error Boundary so it shows a friendly "Something went wrong" message instead of a blank screen.

### Production SaaS / Enterprise
You must capture unhandled exceptions automatically.

1. **Sentry Integration**:
   Install Sentry (or LogRocket/Bugsnag) on both the frontend and backend. When a user clicks a button and the React app crashes, Sentry captures the exact file, line number, and stack trace, and sends it to the engineering team.

2. **Source Maps**:
   If you minify your production React code, the stack trace will say the error happened on \`line 1, column 4059\` of \`chunk-XYZ.js\`. This is useless. You must configure your CI/CD pipeline to upload your Source Maps to Sentry during the build process, so Sentry can un-minify the stack trace and point to the exact TypeScript line.

3. **Alert Grouping**:
   If an API goes down and causes 10,000 React errors in 5 minutes, you do not want 10,000 Slack messages. Error trackers automatically group identical stack traces into a single "Issue" and send one alert.

---

## The Data We Need From You

**Which error tracking platform will you install on the frontend and backend?**
\`\`\`input
Error Tracker (e.g., Sentry, Bugsnag, LogRocket):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Frontend Reliability Engineer. I am using Vite and React for my internal tool. Provide the exact Vite configuration required to generate Source Maps during the production build, and the GitHub Actions script required to securely upload those Source Maps to Sentry without exposing them to the public internet.
\`\`\`

- [ ] Dedicated Error Tracking (e.g., Sentry) is installed on the frontend and backend.
- [ ] Source Maps are securely uploaded to the tracker during CI/CD.
- [ ] React Error Boundaries are implemented to prevent the entire app from unmounting.
`,

  'internallogging': `
# Logging

🕒 **Estimated Time:** 2-3 Hours

---

## Why this matters
When a critical background job fails silently at 3:00 AM, logs are the only evidence left behind. If you are using standard \`console.log('Error happened')\` scattered throughout your codebase, you will never be able to reconstruct the sequence of events. Structured logging is mandatory for debugging complex distributed systems.

## Strategic Guidance

### Hackathon Mode
Use \`console.log\` and scroll through the terminal output.

### Personal Project
Write logs to a local file using a library like Winston or Pino.

### Production SaaS / Enterprise
Logs must be **Structured, Centralized, and Searchable**.

1. **Structured JSON Logs**:
   Never log plaintext strings: \`console.log("User 123 failed to update invoice 456")\`. 
   Always log structured JSON using a logger like **Pino**.
   \`logger.error({ userId: '123', invoiceId: '456', action: 'update', message: 'Failed to update' })\`.
   This allows you to query your log provider for "Show me all errors where invoiceId = 456".

2. **Correlation IDs**:
   If an API request triggers 5 different microservices, you must pass a \`X-Correlation-ID\` header between them. Every log emitted by any service during that request must include this ID. When a failure occurs, you search the Correlation ID and see the exact waterfall of logs across all services.

3. **Log Aggregation**:
   Stream all logs to a centralized provider (Datadog, AWS CloudWatch, Logflare). Never SSH into a production server to run \`tail -f var/log/app.log\`.

---

## The Data We Need From You

**What logging library and aggregation platform will you use?**
\`\`\`input
Logger (e.g., Pino, Winston):
Aggregation Platform (e.g., Datadog, CloudWatch):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Backend Architect. I am standardizing the logging in my Node.js application. Write a Pino logger configuration that outputs strictly formatted JSON. Then, implement an Express middleware that generates a UUID \`X-Correlation-ID\` for every incoming request, and ensures that ID is automatically attached to every Pino log emitted during the lifecycle of that request.
\`\`\`

- [ ] All logs are output as structured JSON.
- [ ] A Correlation ID is implemented for tracing requests across functions.
- [ ] Logs are streamed to a centralized, searchable aggregation platform.
`,

  'internalmonitoring': `
# Monitoring

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
"I think the tool is down." If you hear this from an Operations Manager on Slack, your monitoring has failed. Engineering should know the system is degraded *before* the users report it. Blindly deploying an internal tool without APM (Application Performance Monitoring) is like driving a car without a dashboard.

## Strategic Guidance

### Hackathon Mode
If it crashes, restart the server manually.

### Personal Project
Use a free Uptime Robot ping to check if the URL returns a 200 OK every 5 minutes.

### Production SaaS / Enterprise
You need deep visibility into CPU, Memory, and Database connections.

1. **APM Integration**:
   Install Datadog, New Relic, or Sentry APM. You must be able to see the P99 latency of your API routes. If the \`/api/reports\` endpoint normally takes 200ms, but suddenly spikes to 4,000ms, APM will alert you before the server crashes.

2. **Database Connection Pooling**:
   Internal tools are notorious for exhausting database connections. If you have 50 serverless functions all trying to open a direct connection to Postgres, the database will lock up. Monitor your active connections and implement a connection pooler (like PgBouncer or Supabase Supavisor).

3. **Custom Business Metrics**:
   Don't just monitor CPU. Monitor business logic. Emit a metric every time a "Payment Fails". If the baseline is 5 failures an hour, and it suddenly spikes to 500, your third-party API integration is probably broken.

---

## The Data We Need From You

**Which APM tool will you use to monitor latency and server health?**
\`\`\`input
APM Tool (e.g., Datadog, Sentry, New Relic):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a DevOps Engineer. We are deploying our Node.js internal tool to production. Write the code required to instrument our Express app with Sentry APM. Explain how we can configure a custom alert that triggers a PagerDuty incident if the P99 latency of our primary database queries exceeds 2 seconds.
\`\`\`

- [ ] An APM tool is installed and monitoring API latency.
- [ ] Database connection limits are monitored and pooled.
- [ ] Alerts are configured for abnormal spikes in error rates.
`,

  'internalperformanceoptimization': `
# Performance Optimization

🕒 **Estimated Time:** 3-5 Hours

---

## Why this matters
An internal tool that takes 10 seconds to load a page costs the company thousands of dollars in wasted productivity. If a clerk has to wait 10 seconds to process a single invoice, and they process 500 invoices a day, you have destroyed their throughput. Internal tool performance is directly tied to operational profitability.

## Strategic Guidance

### Hackathon Mode
Don't worry about it. As long as it doesn't crash during the 3-minute demo, it's fine.

### Personal Project
Add some basic pagination to your database queries so you don't fetch the entire table at once.

### Production SaaS / Enterprise
Performance issues in internal tools usually stem from the Database, not the Frontend.

1. **N+1 Query Elimination**:
   The most common backend bottleneck. If you fetch 50 Invoices, and for *each* invoice you run a separate SQL query to fetch the associated Customer, you are running 51 queries instead of 1. Use SQL \`JOIN\`s or a DataLoader to batch these queries.

2. **Database Indexing**:
   If a search query on the \`email\` column takes 5 seconds, it's because Postgres is scanning every row in the table. Add a B-Tree Index to any column that is frequently used in \`WHERE\` clauses or \`ORDER BY\` statements.

3. **Frontend Bundle Size**:
   Do not import the entire \`lodash\` library if you only need \`lodash/debounce\`. Large JavaScript bundles will freeze older corporate laptops. Use Vite or Webpack chunking to lazy-load routes that are rarely used (like the Admin Settings page).

---

## The Data We Need From You

**Which tables are growing the fastest and require careful Indexing?**
\`\`\`input
1. 
2. 
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Database Optimization Expert. Our internal tool has an endpoint that fetches a list of 1,000 Orders. Currently, it uses Prisma to fetch the Orders, and then loops through them to fetch the User associated with each Order. Explain why this N+1 query is destroying our performance, and rewrite the Prisma query to include the User data in a single, optimized SQL call.
\`\`\`

- [ ] N+1 query bottlenecks are eliminated.
- [ ] High-traffic database columns are properly Indexed.
- [ ] Frontend routes are lazy-loaded to reduce initial bundle size.
`,

  'internalsecurity': `
# Security

🕒 **Estimated Time:** 4-8 Hours

---

## Why this matters
Internal tools are the soft underbelly of corporate security. Attackers rarely try to breach the heavily-fortified public website; they phish an employee's credentials and use the poorly-secured internal dashboard to export the entire customer database. If your internal tool is breached, the company is breached.

## Strategic Guidance

### Hackathon Mode
Don't leak your .env file to public GitHub. 

### Personal Project
Add standard JWT authentication. Do not use default passwords like admin/admin.

### Production SaaS / Enterprise
Security must follow the principle of **Zero Trust**.

1. **Multi-Factor Authentication (MFA)**:
   Every single account with access to the internal tool MUST require MFA (SMS, Authenticator App, or Hardware Key). No exceptions. If an employee's password is stolen, MFA is the only thing preventing a data breach.

2. **Network Isolation (VPN/VPC)**:
   The internal tool should not be accessible to the public internet. It should sit behind a Corporate VPN (like Tailscale or ZeroTier), or require strict IP whitelisting.

3. **Data Masking**:
   If a Customer Service rep needs to verify a user's account, they should never see the user's plaintext Social Security Number or full credit card. The backend API must mask the data *before* it sends it to the React frontend (e.g., \`***-**-1234\`).

---

## The Data We Need From You

**How will you enforce Multi-Factor Authentication for employees?**
\`\`\`input
MFA Strategy (e.g., Auth0, Okta, Custom TOTP):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Cybersecurity Engineer. I am building an internal tool dashboard that accesses highly sensitive PII (Personally Identifiable Information). Provide a 5-point security checklist covering Network Isolation, Database Encryption at Rest, and API Data Masking. Write the Node.js middleware required to automatically mask sensitive fields before the JSON response is sent to the client.
\`\`\`

- [ ] MFA is strictly enforced for all users.
- [ ] The dashboard is isolated from the public internet (VPN/IP Whitelist).
- [ ] PII is masked at the API layer.
`,

  'internalauditlogs': `
# Audit Logs

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
In an enterprise environment, if you cannot prove exactly *who* changed a record and *when* they changed it, your tool will fail compliance audits (SOC2, HIPAA). When an employee makes a catastrophic mistake in the internal tool, you must be able to trace the exact sequence of events to debug the human error. Audit logs are not a feature; they are a fundamental structural requirement.

## Strategic Guidance

### Hackathon Mode
Ignore audit logs completely.

### Personal Project
Add an \`updated_by\` column to your tables.

### Production SaaS / Enterprise
True enterprise audit logs must be **Immutable** and **Comprehensive**.

1. **The Event Schema**:
   Every audit log entry must capture:
   - **Actor**: Who did it? (User ID, IP Address)
   - **Action**: What did they do? (e.g., \`UPDATE_INVOICE_STATUS\`)
   - **Target**: What was affected? (Invoice ID)
   - **Diff**: What exactly changed? (e.g., \`{ previous_status: 'DRAFT', new_status: 'APPROVED' }\`)
   - **Timestamp**: Exact UTC time.

2. **Storage Strategy**:
   Do not store massive audit logs in your primary Postgres database if you have high transaction volume. It will bloat your database and slow down queries. Send audit logs asynchronously to an external system (like Datadog, Elasticsearch, or a dedicated append-only AWS DynamoDB table).

3. **Immutability**:
   The system must be designed so that even a Super Admin cannot delete or modify an audit log entry once it is written. 

---

## The Data We Need From You

**Where will your immutable audit logs be stored?**
\`\`\`input
Storage Location (e.g., Dedicated Postgres Table, Datadog, Elasticsearch):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Compliance Engineer. I need to implement SOC2-compliant audit logging in my Node.js backend. Provide a structured JSON schema for an Audit Event. Then, explain how I can use Node.js \`AsyncLocalStorage\` to automatically attach the current User ID to the audit log deep within my service layer, without having to manually pass the \`req.user\` object through 15 different function calls.
\`\`\`

- [ ] Every destructive action (Create, Update, Delete) triggers an audit event.
- [ ] Audit logs capture the specific "Diff" of what data was changed.
- [ ] Audit logs are stored in an append-only, immutable format.
`,

  'internalfileuploads': `
# File Uploads

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
Handling file uploads (CSVs, PDFs, Images) in an internal tool is a massive security and performance liability. If you allow users to upload files directly to your Node.js server, a 500MB video file will crash your server's memory, and a malicious shell script file could compromise your infrastructure.

## Strategic Guidance

### Hackathon Mode
Upload the file as a base64 string directly into a Postgres text column. (Warning: This will destroy your database performance, but it's fast to build).

### Personal Project
Upload files to a local \`/uploads\` directory on the server using Multer.

### Production SaaS / Enterprise
Enterprise file uploads must completely bypass your backend API server.

**The Pre-Signed URL Architecture:**
1. The React frontend asks your Node.js backend: "I want to upload a file named \`invoice.pdf\`."
2. The Node.js backend authenticates the user, generates a temporary, cryptographically signed URL from AWS S3 (or Google Cloud Storage), and returns it to the frontend.
3. The React frontend uploads the file **directly to S3** using that URL. Your backend server never touches the file bytes, saving massive CPU/Memory load.
4. S3 fires a webhook back to your Node.js server confirming the upload is complete, and you save the S3 URL to the database.

**Security Constraints:**
Always validate MIME types on the frontend *and* enforce strict file extension/size limits on the S3 bucket policies. Never serve user-uploaded HTML or SVG files directly from your domain to prevent Cross-Site Scripting (XSS) attacks.

---

## The Data We Need From You

**Which cloud storage provider will you use for secure file storage?**
\`\`\`input
Storage Provider (e.g., AWS S3, Cloudflare R2, Supabase Storage):
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Cloud Security Architect. I am building an internal tool where employees upload sensitive tax documents (PDFs). Write the exact Node.js logic to generate an AWS S3 Pre-Signed Upload URL. Furthermore, explain how to configure the S3 bucket so that the uploaded files are strictly private and can only be downloaded by users who have the correct RBAC permissions in my application.
\`\`\`

- [ ] Direct file uploads to the Node.js server memory are strictly forbidden.
- [ ] Pre-Signed URLs (or equivalent direct-to-cloud strategies) are used.
- [ ] Uploaded files are stored privately and cannot be accessed via public URLs.
`,

  'internalreporting': `
# Reporting

🕒 **Estimated Time:** 3-5 Hours

---

## Why this matters
Once your internal tool is running, management will ask: "Can you build a report that shows me how many invoices were approved by John last week?" If you haven't architected for reporting, you will be forced to run complex \`JOIN\` queries on your live production database, which will cause the tool to crash for the end-users while the report generates.

## Strategic Guidance

### Hackathon Mode
Write a raw SQL query and output it to an HTML table.

### Personal Project
Build a simple dashboard view using Recharts or Chart.js.

### Production SaaS / Enterprise
Isolate your analytical queries (OLAP) from your transactional queries (OLTP).

1. **Read Replicas**:
   If a manager runs a report that takes 15 seconds to execute, it will lock database resources. Always route heavy reporting queries to a **Postgres Read Replica**, never the primary write database.

2. **BI Tool Integration**:
   Do not build custom charts in React unless absolutely necessary. Building custom reporting UI is a massive time sink. Instead, connect a Business Intelligence (BI) tool like **Metabase**, **Looker**, or **Tableau** directly to your Read Replica. Give the managers access to the BI tool so they can build their own reports without bothering Engineering.

3. **Materialized Views**:
   If you must build in-app dashboards, use Postgres Materialized Views to pre-calculate the data. Instead of aggregating 1,000,000 rows on every page load, the database aggregates them once a night and the UI queries the pre-calculated view.

---

## The Data We Need From You

**Will you build custom charts in React, or use a BI tool (e.g., Metabase)?**
\`\`\`input
Reporting Strategy:
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Data Engineer. Management wants a real-time dashboard showing aggregate statistics across 10 million rows of historical internal tool data. Writing a complex SQL \`GROUP BY\` query causes the API to timeout. Explain how we can use Postgres Materialized Views combined with a pg_cron scheduled refresh to serve this data to the React frontend in under 50ms.
\`\`\`

- [ ] Heavy analytical queries are routed to a Read Replica or handled via Materialized Views.
- [ ] Custom reporting UI is avoided in favor of dedicated BI tools (Metabase) where possible.
- [ ] Management has self-serve access to basic reporting.
`,

  'internalworkflowautomation': `
# Workflow Automation

🕒 **Estimated Time:** 4-8 Hours

---

## Why this matters
The true ROI of an internal tool is unlocked when humans are removed from the loop entirely. If your tool just replaces an Excel sheet with a web form, you've improved data integrity, but you haven't saved much time. Workflow automation involves background jobs, scheduled tasks, and reactive event triggers that do the work while the operations team is asleep.

## Strategic Guidance

### Hackathon Mode
Use a simple \`setInterval\` in your Node.js server.

### Personal Project
Write a Python script and schedule it using a standard Linux \`cron\` job.

### Production SaaS / Enterprise
Enterprise automation must be **Fault Tolerant** and **Observable**.

1. **The Cron Job Problem**:
   If you have 3 instances of your Node.js backend running behind a load balancer, and you use \`node-cron\` inside the app, the scheduled job will execute 3 times simultaneously. You must use a distributed task scheduler (like **BullMQ repeatable jobs**, **EventBridge**, or **Temporal Cron**) to ensure exactly-once execution.

2. **Event-Driven vs Scheduled**:
   - *Scheduled (Batch)*: "Generate a weekly financial report every Friday at 5 PM."
   - *Event-Driven (Reactive)*: "When a customer signs a contract, immediately provision their server."
   Prefer Event-Driven architecture whenever possible. It reduces system load and provides a better user experience.

3. **Idempotent Automation**:
   If an automated job crashes at 99%, and runs again the next day, it should not duplicate the first 99% of the work. Every automated step must check if the work was already completed before executing.

---

## The Data We Need From You

**List one critical Scheduled job and one critical Event-Driven job:**
\`\`\`input
Scheduled Job:
Event-Driven Job:
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Cloud Architect. We need to run a heavy data-processing script every night at midnight that aggregates 500,000 rows in Postgres. Explain the architectural tradeoffs between running this as a scheduled Serverless Function (AWS Lambda / Vercel Edge) versus running it on a dedicated long-running worker container (ECS / Fargate), specifically focusing on maximum timeout limits and memory constraints.
\`\`\`

- [ ] Distributed scheduling is used to prevent duplicate cron executions across load-balanced servers.
- [ ] Heavy batch jobs are offloaded to dedicated workers, not the primary API server.
- [ ] All automated scripts are strictly idempotent.
`,

  'internalcrudoperations': `
# CRUD Operations

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For CRUD Operations, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, CRUD Operations should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for CRUD Operations can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for CRUD Operations?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the CRUD Operations component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for CRUD Operations.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalauthorization': `
# Authorization

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Authorization, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Authorization should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Authorization can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Authorization?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Authorization component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Authorization.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaldocumentation': `
# Documentation

🕒 **Estimated Time:** 2-4 Hours

---

## Why this matters
The biggest risk to an internal tool is the "Bus Factor of 1". If you are the only person who knows how the tool is deployed, and you leave the company, the tool becomes a ticking time bomb. Enterprise documentation is not just about how to *use* the tool, it's about how to *rescue* the tool when it inevitably breaks at 2:00 AM on a Saturday.

## Strategic Guidance

### Hackathon Mode
Add a \`README.md\` with \`npm run dev\`.

### Personal Project
Document any API keys or environment variables required to run the project.

### Production SaaS / Enterprise
Enterprise documentation requires 3 distinct artifacts:

1. **The Runbook (For Engineering)**:
   This is an emergency manual. It must contain:
   - How to restart the server/database.
   - Where the environment variables are stored.
   - How to replay failed Webhooks from third-party APIs.
   - An architecture diagram showing all external dependencies.

2. **The User Manual (For Operations)**:
   Do not write a 50-page PDF. No one will read it. Use tools like **Scribe** or **Loom** to record 30-second video walkthroughs of the core workflows. Embed these videos directly into the UI of the internal tool (e.g., a "Help" icon next to complex forms).

3. **Code Comments (For Future You)**:
   Do not comment *what* the code does (the code itself should be readable). Comment *why* the code does it. 
   *(e.g., \`// We are manually overriding the date here because the legacy Salesforce API hardcodes everything to EST\`)*.

---

## The Data We Need From You

**Where will the Engineering Runbook live? (e.g., Notion, GitHub Wiki)**
\`\`\`input
Runbook Location:
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Technical Writer. I am handing off a custom React/Node internal tool to an IT department that did not build it. Write a template for an "Emergency Runbook" that includes sections for Architecture, Environment Variables, Deployment Pipeline, and a Troubleshooting matrix for common failures (e.g., Database Connection Refused, External API Rate Limited).
\`\`\`

- [ ] An Emergency Runbook exists and is shared with the IT team.
- [ ] User documentation consists of short videos/screencasts rather than dense text.
- [ ] Code comments explain "Why", not "What".
`,

  'internaltesting': `
# Testing

🕒 **Estimated Time:** 4-8 Hours

---

## Why this matters
Testing internal tools requires a different mindset than testing consumer apps. You do not need 100% unit test coverage on your UI components. You *do* need 100% integration test coverage on your critical path workflows (e.g., "Can a user bypass RBAC?", "Does the invoice state machine transition correctly?"). A bug in a consumer app causes a bad review; a bug in an internal tool causes a miscalculated payroll.

## Strategic Guidance

### Hackathon Mode
Manually click through the app once before the demo. 

### Personal Project
Write one or two Playwright End-to-End (E2E) tests for the happy path.

### Production SaaS / Enterprise
Focus your testing budget where it actually matters: **Data Integrity and Security**.

1. **RBAC Integration Tests**:
   Write automated tests for your backend API that explicitly attempt to violate permissions. (e.g., \`test("Employee cannot edit Manager salary")\`).

2. **Database Constraint Tests**:
   Write tests that intentionally try to insert malformed data or violate foreign keys. Ensure the database correctly rejects the payload.

3. **End-to-End (E2E) Smoke Tests**:
   Use **Playwright** or **Cypress** to test the "Happy Path" of the primary workflow. You do not need to test every edge case in E2E (it's too slow and brittle). Just test: *Login -> Create Record -> Approve Record*. 

4. **Snapshot Testing**: Avoid it. Internal tool UIs change rapidly. Snapshot testing will just create annoying pipeline failures every time you add a new column to a table.

---

## The Data We Need From You

**What are the 2 most critical workflows that require automated E2E testing?**
\`\`\`input
1. 
2. 
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a QA Automation Engineer. We are building a Next.js internal tool with a complex RBAC system. Write a suite of Jest/Supertest integration tests that specifically target the \`PUT /api/invoices/:id\` endpoint. Ensure the tests cover: an Admin successfully updating, an Employee failing to update, and a malformed payload being rejected by Zod validation.
\`\`\`

- [ ] Critical path APIs have automated RBAC violation tests.
- [ ] Playwright/Cypress is configured for a Happy Path smoke test.
- [ ] Low-value UI unit tests (e.g., testing if a button is blue) are avoided.
`,

  'internaladminpanel': `
# Admin Panel

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Admin Panel, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Admin Panel should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Admin Panel can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Admin Panel?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Admin Panel component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Admin Panel.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalsearch': `
# Search

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Search, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Search should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Search can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Search?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Search component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Search.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalnotifications': `
# Notifications

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Notifications, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Notifications should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Notifications can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Notifications?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Notifications component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Notifications.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalfrontend': `
# Frontend

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Frontend, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Frontend should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Frontend can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Frontend?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Frontend component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Frontend.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalbackend': `
# Backend

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Backend, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Backend should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Backend can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Backend?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Backend component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Backend.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaldatabase': `
# Database

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Database, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Database should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Database can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Database?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Database component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Database.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalreportingarchitecture': `
# Reporting & Audit Logging

🕒 **Estimated Time:** 1-2 Days

---

## Why this matters
When an internal tool deletes a critical user account, the first question the executive team will ask is: *"Who did it, and when?"* If your internal tool does not have an immutable audit log, you cannot answer that question. In enterprise environments, audit logs are legally required for compliance frameworks like SOC2, HIPAA, and GDPR.

## Strategic Guidance

### Hackathon Mode
Skip this entirely. Audit logs are invisible features that provide zero value in a demo.

### Personal Project
You don't need compliance, but understanding how to track state changes is valuable. Try implementing a simple webhook that posts to a private Discord or Slack channel whenever a destructive action (like deleting a row) occurs. This is a lightweight, free "audit log" that is surprisingly effective for small teams.

### Production SaaS / Enterprise
Audit logs are non-negotiable. Every Create, Update, and Delete (CUD) action performed by an internal user must be logged. 

An audit log entry must be **immutable** (append-only, never updated or deleted) and must contain:
1. **Actor**: Who performed the action? (User ID, IP Address)
2. **Action**: What did they do? (\`update_subscription\`)
3. **Target**: Who was affected? (Customer ID)
4. **Timestamp**: When did it happen? (UTC ISO 8601)
5. **Diff**: What changed? (Old state vs New state)

Do not store massive audit logs in your primary relational database if you have high transaction volume, as they will quickly bloat the storage and degrade performance. Send audit logs asynchronously to a dedicated logging service (like Datadog Audit Trail) or an append-only data warehouse (like BigQuery or AWS Redshift) using a message queue (Kafka/RabbitMQ) or serverless background jobs.

---

## The Data We Need From You

**Which critical entities require strict audit logging?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Data Architect. I need to design an immutable Audit Log system for my Enterprise internal tool. Write the exact JSON schema for an audit log event payload. Explain how I can asynchronously fire these events from a Node.js API without blocking the main request thread.
\`\`\`

- [ ] All destructive actions generate an audit event.
- [ ] Audit events capture the Actor, Action, Target, Time, and Diff.
- [ ] Logs are stored in an append-only datastore.
`,

  'internalworkflowengine': `
# Workflow Engine

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Workflow Engine, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Workflow Engine should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Workflow Engine can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Workflow Engine?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Workflow Engine component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Workflow Engine.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalauthorizationrbac': `
# Authorization (RBAC)

🕒 **Estimated Time:** 8-16 Hours

---

## Why this matters
In consumer apps, users only see their own data. In internal tools, users have access to *company* data. Without strict authorization, a junior customer support rep could accidentally delete a production database table, or view the CEO's payroll information. Role-Based Access Control (RBAC) is the absolute core of internal tool security.

## Strategic Guidance

### Hackathon Mode
If you are building an internal tool for a hackathon, ignore RBAC. Hardcode a single "Admin" password to gate the entire app. Your goal is to show the workflow automation, not the permission matrices.

### Personal Project
For a personal project, this is a great time to learn the difference between Authentication (Who are you?) and Authorization (What are you allowed to do?). 

Implement a simple \`role\` column on your user table (e.g., \`user\`, \`admin\`). In your API routes, write a middleware function that checks if \`req.user.role === 'admin'\` before allowing a DELETE request. This simple check forms the foundation of all application security.

### Production SaaS / Enterprise
Enterprise authorization is complex. A simple \`role\` column is no longer enough. You need true RBAC (Role-Based Access Control), or even ABAC (Attribute-Based Access Control).

You must define **Roles** (e.g., \`Support Agent\`, \`Finance Manager\`, \`Super Admin\`) and **Permissions** (e.g., \`read:invoices\`, \`delete:users\`). A Role is simply a collection of Permissions. Users are assigned Roles, not Permissions directly.

Do not build this from scratch. Use an identity provider that supports RBAC natively (like Auth0, Clerk Organizations, or Okta). Furthermore, your internal tool must verify these permissions on the **Backend**. Hiding a "Delete" button on the Frontend is a UX convenience, not a security measure. Any malicious actor can bypass the UI and hit the API directly. **Every single destructive API endpoint must explicitly check the user's permissions.**

---

## The Data We Need From You

**Define the core Roles and their specific Permissions for this tool:**
\`\`\`input
1. Role: [Name] | Permissions: [read:x, write:y]
2. Role: [Name] | Permissions: [read:x]
\`\`\`

## AI Architecture Prompt
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building a B2B internal tool. I need to design a robust RBAC schema in Postgres. Please write the SQL schema to create Users, Roles, Permissions, and the necessary junction tables (UserRoles, RolePermissions). Provide a query to check if a specific user has the 'delete:invoice' permission.
\`\`\`

- [ ] Permissions are explicitly defined for all destructive actions.
- [ ] The backend API enforces RBAC checks before executing logic.
- [ ] UI components gracefully hide based on lack of permissions.
`,

  'internalinternaltoolfundamentals': `
# Internal Tool Fundamentals

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Internal Tool Fundamentals, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Internal Tool Fundamentals should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Internal Tool Fundamentals can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Internal Tool Fundamentals?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Internal Tool Fundamentals component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Internal Tool Fundamentals.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalintegrations': `
# Integrations

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Integrations, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Integrations should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Integrations can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Integrations?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Integrations component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Integrations.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalcostestimation': `
# Cost Estimation

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Cost Estimation, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Cost Estimation should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Cost Estimation can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Cost Estimation?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Cost Estimation component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Cost Estimation.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaldatabaseschema': `
# Database Schema

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Database Schema, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Database Schema should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Database Schema can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Database Schema?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Database Schema component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Database Schema.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalauthentication': `
# Authentication

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Authentication, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Authentication should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Authentication can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Authentication?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Authentication component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Authentication.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaltechstackselection': `
# Tech Stack Selection

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Tech Stack Selection, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Tech Stack Selection should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Tech Stack Selection can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Tech Stack Selection?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Tech Stack Selection component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Tech Stack Selection.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaldataflowdesign': `
# Data Flow Design

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Data Flow Design, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Data Flow Design should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Data Flow Design can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Data Flow Design?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Data Flow Design component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Data Flow Design.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaldashboarddesign': `
# Dashboard Design

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Dashboard Design, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Dashboard Design should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Dashboard Design can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Dashboard Design?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Dashboard Design component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Dashboard Design.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaluserroles': `
# User Roles

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For User Roles, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, User Roles should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for User Roles can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for User Roles?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the User Roles component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for User Roles.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalbusinessprocessmapping': `
# Business Process Mapping

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Business Process Mapping, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Business Process Mapping should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Business Process Mapping can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Business Process Mapping?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Business Process Mapping component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Business Process Mapping.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalloadingstates': `
# Loading States

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Loading States, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Loading States should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Loading States can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Loading States?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Loading States component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Loading States.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalerrorstates': `
# Error States

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Error States, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Error States should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Error States can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Error States?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Error States component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Error States.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalaccessibility': `
# Accessibility

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Accessibility, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Accessibility should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Accessibility can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Accessibility?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Accessibility component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Accessibility.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaldesignsystem': `
# Design System

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Design System, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Design System should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Design System can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Design System?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Design System component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Design System.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalwireframes': `
# Wireframes

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Wireframes, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Wireframes should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Wireframes can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Wireframes?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Wireframes component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Wireframes.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internaluserflows': `
# User Flows

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For User Flows, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, User Flows should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for User Flows can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for User Flows?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the User Flows component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for User Flows.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalprd': `
# PRD

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For PRD, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, PRD should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for PRD can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for PRD?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the PRD component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for PRD.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalmvpscope': `
# MVP Scope

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For MVP Scope, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, MVP Scope should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for MVP Scope can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for MVP Scope?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the MVP Scope component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for MVP Scope.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalrequirementsgathering': `
# Requirements Gathering

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Requirements Gathering, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Requirements Gathering should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Requirements Gathering can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Requirements Gathering?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Requirements Gathering component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Requirements Gathering.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalstakeholdermapping': `
# Stakeholder Mapping

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Stakeholder Mapping, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Stakeholder Mapping should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Stakeholder Mapping can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Stakeholder Mapping?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Stakeholder Mapping component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Stakeholder Mapping.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalexistingpainpoints': `
# Existing Pain Points

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Existing Pain Points, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Existing Pain Points should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Existing Pain Points can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Existing Pain Points?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Existing Pain Points component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Existing Pain Points.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalcurrentworkflowanalysis': `
# Current Workflow Analysis

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Current Workflow Analysis, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Current Workflow Analysis should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Current Workflow Analysis can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Current Workflow Analysis?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Current Workflow Analysis component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Current Workflow Analysis.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalproblemdefinition': `
# Problem Definition

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Problem Definition, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Problem Definition should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Problem Definition can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Problem Definition?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Problem Definition component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Problem Definition.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalsuccessmetrics': `
# Success Metrics

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Success Metrics, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Success Metrics should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Success Metrics can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Success Metrics?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Success Metrics component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Success Metrics.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,

  'internalfeatureprioritization': `
# Feature Prioritization

🕒 **Estimated Time:** 2-6 Hours

---

## Strategic Guidance

### Hackathon Mode
When building an internal tool during a hackathon, aesthetics and rigorous access controls do not matter. Your entire goal is to build a functional prototype that automates a painful manual process or displays critical data. For Feature Prioritization, do not over-engineer a custom solution if an off-the-shelf low-code builder (like Retool, Appsmith, or Glide) can do it in 5 minutes. 

Mock the data if the real database is too hard to connect to, or hardcode the API keys if you must (just don't commit them to a public repo!). If your hackathon project requires an admin panel, just build a single page with a generic password rather than implementing full Role-Based Access Control (RBAC). Optimize strictly for the "wow" factor of a working automation workflow.

### Personal Project
If you are building an internal tool for your own use, Feature Prioritization should be optimized for zero maintenance and maximum utility. Use serverless databases (like Supabase or Firebase) and free-tier hosting (Vercel or Cloudflare Pages) so that your tool runs forever without costing you a dime.

Take this opportunity to learn modern dashboard frameworks (like Tremor or Shadcn UI) to make the data look beautiful, even if you are the only user. Document your API connections and database schemas so that if you abandon the project for 6 months, you can easily pick it back up. Focus on building an architecture that scales with your own personal data needs.

### Production SaaS / Enterprise
In a Production enterprise environment, internal tools are the backbone of the company's operations. A poorly built internal tool for Feature Prioritization can lead to catastrophic data leaks, compliance violations, or massive operational inefficiencies. 

You must prioritize **Security, Auditability, and Access Control**. Do not build custom UI components if a robust component library exists; your engineers' time is better spent on core product features. Ensure strict Role-Based Access Control (RBAC) so that customer support reps cannot accidentally delete production database records. Furthermore, every critical action taken within this tool must be logged in an immutable audit trail. Treat this internal tool with the same architectural rigor as your public-facing SaaS application, because the risks of failure are often much higher.

---

## Actionable Execution

**What are the primary business requirements or data models for Feature Prioritization?**
\`\`\`input
1. 
2. 
3. 
\`\`\`

## AI Architecture Prompt
Use this prompt to generate the optimal architecture for this component:
\`\`\`prompt
Act as a Principal Enterprise Architect. I am building the Feature Prioritization component for a new internal company tool. Based on best practices for enterprise security, RBAC, and data integrity, how should I design the schema, UI flow, and integration points for this feature? Provide a concrete example.
\`\`\`

- [ ] I have reviewed the architectural recommendations.
- [ ] I have implemented the core logic for Feature Prioritization.
- [ ] I have verified that access controls and audit logs are functioning correctly.
`,
  'apifeaturerequests': `# featurerequests\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nThis is where API products win or lose the Developer Experience (DX) war.\n\n## Strategic Guidance\n\n### Hackathon Mode\nMove fast, don't over-engineer DX.\n\n### Personal Project\nProvide basic examples and a simple status page.\n\n### Production SaaS / Enterprise\nInvest heavily in automated DX. Changelogs should be tied to Git releases. Status pages must auto-update based on Datadog alerts. Example requests must be automatically tested in CI so documentation never falls out of sync with production code.\n\n- [ ] DX assets are automated and verified in CI/CD.`,
  'apiproblemdefinition': `# Problem Definition\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nIf you don't explicitly define the problem your API solves, you will build endpoints for everything. Focus on the core friction.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSolve a fun problem fast.\n\n### Personal Project\nSolve your own problem.\n\n### Production SaaS / Enterprise\nDefine the business cost of the problem. If the API doesn't save the company $10,000 in engineering time or generate revenue, the Engineering Manager won't buy it.\n\n- [ ] The core problem is explicitly defined in business value.`,
  'apiapiusecase': `# API Use Case\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nAn API must be opinionated about *how* it is used.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus on the frontend demo.\n\n### Personal Project\nSupport a single core flow.\n\n### Production SaaS / Enterprise\nDefine "Golden Paths". The exact sequence of 3 API calls a developer must make to achieve value. Document these paths aggressively.\n\n- [ ] Golden paths are defined.`,
  'apitargetdevelopers': `# Target Developers\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nKnowing your audience changes your API design.\n\n## Strategic Guidance\n\n### Hackathon Mode\nAnyone.\n\n### Personal Project\nJavaScript devs.\n\n### Production SaaS / Enterprise\nEnterprise APIs are often integrated by System Integrators (SIs) or legacy backend engineers. Design for strict types and robust error handling over "clever" dynamic payloads.\n\n- [ ] Developer constraints are understood.`,
  'apimonetizationmodel': `# Monetization Model\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nYou must integrate billing before you scale, otherwise tracking usage retroactively is impossible.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFree.\n\n### Personal Project\nDonations or a single flat tier.\n\n### Production SaaS / Enterprise\nImplement Metered Billing (Usage-based). Track every single API call through a high-throughput queue (like Kafka or Redis Streams) and aggregate it before sending it to Stripe. Never block an API request to call the Stripe API.\n\n- [ ] Usage tracking is asynchronous to prevent latency.`,
  'apiusecases': `# Use Cases\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nMapping exact use cases prevents scope creep.\n\n## Strategic Guidance\n\n### Hackathon Mode\nJust the demo flow.\n\n### Personal Project\nCRUD for your app.\n\n### Production SaaS / Enterprise\nWrite sequence diagrams for every major integration flow. If an integration requires 15 API calls, redesign it to require 2.\n\n- [ ] Sequence diagrams exist for core flows.`,
  'apiprd': `# API PRD\n\n🕒 **Estimated Time:** 2-4 Hours\n\n---\n\n## Why this matters\nThe Product Requirements Document for an API is the source of truth for the Engineering team.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip.\n\n### Personal Project\nA simple markdown list.\n\n### Production SaaS / Enterprise\nThe PRD must define the SLAs (Service Level Agreements), rate limits, latency targets, and compliance requirements (SOC2, HIPAA) before a single line of code is written.\n\n- [ ] SLAs and latency targets are defined.`,
  'apiapistandards': `# API Standards\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nInconsistency kills DX.\n\n## Strategic Guidance\n\n### Hackathon Mode\nUse whatever JSON looks good.\n\n### Personal Project\nTry to be consistent with casing.\n\n### Production SaaS / Enterprise\nAdopt a global standard. Use ISO-8601 for all dates. Always return objects, never raw arrays (to prevent JSON hijacking and allow pagination metadata). Standardize on snake_case.\n\n- [ ] A formal standards document exists.`,
  'apiversioningstrategy': `# Versioning Strategy\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nBreaking changes destroy trust. You must be able to upgrade your API without breaking old clients.\n\n## Strategic Guidance\n\n### Hackathon Mode\nNo versioning.\n\n### Personal Project\nURL versioning (\`/v1/\`).\n\n### Production SaaS / Enterprise\nDo not use URL versioning for minor changes. Adopt Header-based versioning (e.g., Stripe's \`Stripe-Version: 2023-10-15\`). Build a middleware layer that automatically mutates incoming requests from old versions to the new internal schema, and mutates responses back.\n\n- [ ] Header-based, date-driven versioning is implemented.`,
  'apiauthorizationstrategy': `# Authorization Strategy\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nAuthentication proves WHO you are. Authorization proves WHAT you can do. Mixing them up causes data leaks.\n\n## Strategic Guidance\n\n### Hackathon Mode\nIf they have an API key, they can do anything.\n\n### Personal Project\nBasic Role-Based Access Control (RBAC).\n\n### Production SaaS / Enterprise\nImplement OAuth 2.0 Scopes (e.g., \`read:invoices\`, \`write:users\`). If a developer generates an API key, they must explicitly grant it minimum-privilege scopes. The backend must enforce these scopes at the routing layer.\n\n- [ ] OAuth Scopes or granular permissions are enforced.`,
  'apirequestdesign': `# Request Design\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nStrict request design prevents injection attacks and simplifies client code.\n\n## Strategic Guidance\n\n### Hackathon Mode\nAccept any JSON.\n\n### Personal Project\nBasic validation.\n\n### Production SaaS / Enterprise\nStrictly type every request using Zod or JSON Schema. Reject any request with unknown fields (strict mode) to prevent developers from thinking a typo'd field was saved. Use idempotency keys for POSTs.\n\n- [ ] Requests are strictly validated.`,
  'apiresponsedesign': `# Response Design\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nPredictable responses make parsing easy.\n\n## Strategic Guidance\n\n### Hackathon Mode\nReturn whatever the DB outputs.\n\n### Personal Project\nConsistent JSON.\n\n### Production SaaS / Enterprise\nAlways envelope your data. E.g., \`{ "data": [...], "meta": { "pagination": ... } }\`. Never return a top-level array. Exclude null fields to save bandwidth, or explicitly include them based on team standards. Be consistent.\n\n- [ ] All responses are enveloped and consistent.`,
  'apidatabasearchitecture': `# Database Architecture\n\n🕒 **Estimated Time:** 3-5 Hours\n\n---\n\n## Why this matters\nAPIs are inherently read-heavy. If your database architecture cannot scale reads, your API will collapse under load.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSingle Postgres instance or MongoDB.\n\n### Personal Project\nManaged Serverless Postgres (e.g., Neon, Supabase).\n\n### Production SaaS / Enterprise\nImplement a Primary/Replica architecture. Route all \`GET\` requests (Reads) to Read Replicas. Route \`POST/PUT/DELETE\` (Writes) to the Primary node. Implement Connection Pooling (PgBouncer) to prevent API spikes from exhausting database connections.\n\n- [ ] Read/Write separation strategy is mapped out.\n- [ ] Connection pooling is architected.`,
  'apicostestimation': `# costestimation\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiapifundamentals': `# apifundamentals\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiratelimits': `# ratelimits\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiapikeys': `# apikeys\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apioauth': `# oauth\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apijwt': `# jwt\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiserviceaccounts': `# serviceaccounts\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiusagetracking': `# usagetracking\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apimetering': `# metering\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiquotas': `# quotas\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apisubscriptions': `# subscriptions\n\n🕒 **Estimated Time:** 1 Hour\n\n---\n\n## Why this matters\nCore architecture decisions made here dictate the stability of your platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nKeep it incredibly simple. Bypass complex logic.\n\n### Personal Project\nImplement the standard pattern using managed services.\n\n### Production SaaS / Enterprise\nArchitect for 100x your current load. Decouple synchronous operations into background queues. Enforce strict SLAs and fallback mechanisms in case primary services fail.\n\n- [ ] The enterprise pattern is documented and understood.`,
  'apiapiimplementation': `# API Implementation (Coding)\n\n🕒 **Estimated Time:** 2-4 Days\n\n---\n\n## Why this matters\nThis is where you write the actual business logic. If your controllers are 1,000 lines long, your API will be a nightmare to test and maintain.\n\n## Strategic Guidance\n\n### Hackathon Mode\nPut all logic directly in the Express/Next.js route handlers.\n\n### Personal Project\nSeparate route definitions from controller functions.\n\n### Production SaaS / Enterprise\nImplement a strict 3-tier architecture: Routes -> Controllers -> Services. Controllers only handle HTTP parsing (status codes, headers). Services handle the pure business logic and do not know about HTTP at all. This makes your business logic 100% unit-testable.\n\n- [ ] Business logic is decoupled from HTTP handlers.`,
  'apidatabase': `# database\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nRobust development practices prevent massive refactors during the scaling phase.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus purely on getting it working for the demo.\n\n### Personal Project\nImplement basic integration tests to prevent regressions.\n\n### Production SaaS / Enterprise\nAchieve 80%+ test coverage. Implement strictly typed input validation (e.g., Zod). All infrastructure should be declared as code (Terraform). Ensure horizontal scalability by keeping all nodes strictly stateless.\n\n- [ ] Tests and validation logic are comprehensively executed.`,
  'apitesting': `# testing\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nRobust development practices prevent massive refactors during the scaling phase.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus purely on getting it working for the demo.\n\n### Personal Project\nImplement basic integration tests to prevent regressions.\n\n### Production SaaS / Enterprise\nAchieve 80%+ test coverage. Implement strictly typed input validation (e.g., Zod). All infrastructure should be declared as code (Terraform). Ensure horizontal scalability by keeping all nodes strictly stateless.\n\n- [ ] Tests and validation logic are comprehensively executed.`,
  'apidocumentation': `# documentation\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nRobust development practices prevent massive refactors during the scaling phase.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus purely on getting it working for the demo.\n\n### Personal Project\nImplement basic integration tests to prevent regressions.\n\n### Production SaaS / Enterprise\nAchieve 80%+ test coverage. Implement strictly typed input validation (e.g., Zod). All infrastructure should be declared as code (Terraform). Ensure horizontal scalability by keeping all nodes strictly stateless.\n\n- [ ] Tests and validation logic are comprehensively executed.`,
  'apiratelimiting': `# ratelimiting\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nRobust development practices prevent massive refactors during the scaling phase.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus purely on getting it working for the demo.\n\n### Personal Project\nImplement basic integration tests to prevent regressions.\n\n### Production SaaS / Enterprise\nAchieve 80%+ test coverage. Implement strictly typed input validation (e.g., Zod). All infrastructure should be declared as code (Terraform). Ensure horizontal scalability by keeping all nodes strictly stateless.\n\n- [ ] Tests and validation logic are comprehensively executed.`,
  'apiauthorization': `# authorization\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nRobust development practices prevent massive refactors during the scaling phase.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus purely on getting it working for the demo.\n\n### Personal Project\nImplement basic integration tests to prevent regressions.\n\n### Production SaaS / Enterprise\nAchieve 80%+ test coverage. Implement strictly typed input validation (e.g., Zod). All infrastructure should be declared as code (Terraform). Ensure horizontal scalability by keeping all nodes strictly stateless.\n\n- [ ] Tests and validation logic are comprehensively executed.`,
  'apibilling': `# billing\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nRobust development practices prevent massive refactors during the scaling phase.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFocus purely on getting it working for the demo.\n\n### Personal Project\nImplement basic integration tests to prevent regressions.\n\n### Production SaaS / Enterprise\nAchieve 80%+ test coverage. Implement strictly typed input validation (e.g., Zod). All infrastructure should be declared as code (Terraform). Ensure horizontal scalability by keeping all nodes strictly stateless.\n\n- [ ] Tests and validation logic are comprehensively executed.`,
  'apiperformanceoptimization': `# performanceoptimization\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nThese are the operational requirements that differentiate an amateur API from an enterprise-grade platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip completely to save time.\n\n### Personal Project\nRely on PaaS providers (Vercel, Render, Supabase) to handle this automatically.\n\n### Production SaaS / Enterprise\nImplement aggressive defensive mechanisms. Configure WAFs (Web Application Firewalls) to drop malicious traffic at the Edge. Set up cross-region read replicas. Automate daily backups and test disaster recovery restores quarterly.\n\n- [ ] The enterprise operational standard is implemented.`,
  'apimonitoring': `# monitoring\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nThese are the operational requirements that differentiate an amateur API from an enterprise-grade platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip completely to save time.\n\n### Personal Project\nRely on PaaS providers (Vercel, Render, Supabase) to handle this automatically.\n\n### Production SaaS / Enterprise\nImplement aggressive defensive mechanisms. Configure WAFs (Web Application Firewalls) to drop malicious traffic at the Edge. Set up cross-region read replicas. Automate daily backups and test disaster recovery restores quarterly.\n\n- [ ] The enterprise operational standard is implemented.`,
  'apilogging': `# logging\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nThese are the operational requirements that differentiate an amateur API from an enterprise-grade platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip completely to save time.\n\n### Personal Project\nRely on PaaS providers (Vercel, Render, Supabase) to handle this automatically.\n\n### Production SaaS / Enterprise\nImplement aggressive defensive mechanisms. Configure WAFs (Web Application Firewalls) to drop malicious traffic at the Edge. Set up cross-region read replicas. Automate daily backups and test disaster recovery restores quarterly.\n\n- [ ] The enterprise operational standard is implemented.`,
  'apierrortracking': `# errortracking\n\n🕒 **Estimated Time:** 2 Hours\n\n---\n\n## Why this matters\nThese are the operational requirements that differentiate an amateur API from an enterprise-grade platform.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip completely to save time.\n\n### Personal Project\nRely on PaaS providers (Vercel, Render, Supabase) to handle this automatically.\n\n### Production SaaS / Enterprise\nImplement aggressive defensive mechanisms. Configure WAFs (Web Application Firewalls) to drop malicious traffic at the Edge. Set up cross-region read replicas. Automate daily backups and test disaster recovery restores quarterly.\n\n- [ ] The enterprise operational standard is implemented.`,
  'apisdks': `# sdks\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nThis is where API products win or lose the Developer Experience (DX) war.\n\n## Strategic Guidance\n\n### Hackathon Mode\nMove fast, don't over-engineer DX.\n\n### Personal Project\nProvide basic examples and a simple status page.\n\n### Production SaaS / Enterprise\nInvest heavily in automated DX. Changelogs should be tied to Git releases. Status pages must auto-update based on Datadog alerts. Example requests must be automatically tested in CI so documentation never falls out of sync with production code.\n\n- [ ] DX assets are automated and verified in CI/CD.`,
  'apipostmancollection': `# postmancollection\n\n🕒 **Estimated Time:** 1-2 Hours\n\n---\n\n## Why this matters\nThis is where API products win or lose the Developer Experience (DX) war.\n\n## Strategic Guidance\n\n### Hackathon Mode\nMove fast, don't over-engineer DX.\n\n### Personal Project\nProvide basic examples and a simple status page.\n\n### Production SaaS / Enterprise\nInvest heavily in automated DX. Changelogs should be tied to Git releases. Status pages must auto-update based on Datadog alerts. Example requests must be automatically tested in CI so documentation never falls out of sync with production code.\n\n- [ ] DX assets are automated and verified in CI/CD.`,
};