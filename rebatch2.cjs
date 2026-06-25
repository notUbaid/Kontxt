const { updateTopic } = require('./update_topic.cjs');

const topics = [
  {
    key: 'marketresearch',
    content: `# Market Research\n\n🕒 **Estimated Time:** 20 min\n\n---\n\n## Why this matters\nIf you build something nobody wants to buy, you are just doing expensive charity work. Market research validates that there is actually money to be made.\n\n## Strategic Guidance\n\n### Hackathon Mode\nMarket research doesn't matter for a hackathon. Make up a plausible-sounding Total Addressable Market (TAM) statistic for your pitch deck (e.g., "This is a $50 Billion industry"). The judges won't verify it; they just want to see that you understand the format of a pitch.\n\n### Personal Project\nYou are your own market. Research is unnecessary unless you are trying to learn a specific industry's domain knowledge.\n\n### Production SaaS\nDo not write code until you have spoken to at least 5 people in your target market who have explicitly stated they would pay for a solution to their problem. \n\nYou should research exactly where these people hang out online. If you can't find a place where 10,000 of your potential customers congregate (a subreddit, a Facebook group, a LinkedIn niche), your market might be too hard to reach.\n\n### Custom Mode\nEnterprise market research is about identifying macroeconomic trends and regulatory shifts. \n\nAre new data privacy laws passing in Europe that force companies to adopt new compliance tools? Is a legacy competitor being acquired, leaving their customers angry and looking for alternatives? You need a "Why Now?" slide in your pitch deck that proves the market is ripe for disruption *today*.\n\n## Accountability Check\n- [ ] I have validated my market assumptions.\n`
  },
  {
    key: 'competitoranalysis',
    content: `# Competitor Analysis\n\n🕒 **Estimated Time:** 15 min\n\n---\n\n## Why this matters\nIf you have no competitors, you either have a brilliant blue-ocean idea, or (more likely) you are building something useless. Competitors prove the market exists. Analyzing them shows you how to beat them.\n\n## Strategic Guidance\n\n### Hackathon Mode\nFind the biggest, slowest, most hated competitor in the space (like Oracle or Jira) and position your hackathon project as the "AI-native, lightning-fast alternative." It makes for a great David vs. Goliath story during the pitch.\n\n### Personal Project\nLook at competitors to steal their UI/UX patterns. You don't need to reinvent the wheel for a weekend project.\n\n### Production SaaS\nFind 3 direct competitors. Sign up for their free trials. \n\nIdentify their biggest weakness. Do they have terrible customer support? Is their UI from 2010? Are they too expensive for small businesses? Your product must be 10x better on that *one specific axis*. Don't try to beat them on features; they have 100 engineers and you have 1. Beat them on user experience or niche focus.\n\n### Custom Mode\nEnterprise competitors are entrenched. Ripping out a legacy system takes 6-12 months of change management. \n\nYour analysis must focus on switching costs. How hard is it for a Fortune 500 company to export their data from Competitor A and import it into your system? Your product must have an automated migration tool built-in on Day 1, or nobody will switch.\n\n## List Your Top 3 Competitors\n\`\`\`input\nWrite Here...\n\`\`\`\n`
  },
  {
    key: 'mvpfeatures',
    content: `# MVP Features\n\n🕒 **Estimated Time:** 20 min\n\n---\n\n## Why this matters\nThe Minimum Viable Product (MVP) is the absolute bare minimum you can build to solve the core problem. Every extra feature delays your launch and increases your risk of failure.\n\n## Strategic Guidance\n\n### Hackathon Mode\nYour MVP is just whatever you can finish before 8:00 AM on Sunday. \n\nFocus entirely on the "happy path." If a user clicks the wrong button, let the app crash. You will only be clicking the right buttons during the demo anyway.\n\n### Personal Project\nYour MVP should consist of 1 to 3 core features. If it takes you longer than 2 weekends to build your MVP, your scope is too large. Cut features mercilessly.\n\n### Production SaaS\nYour MVP must be robust enough to charge money for, but small enough to launch in 4-6 weeks. \n\nDo not build a "Settings" page with customizable themes. Do not build social login (just use email/password or magic links). Build the one core mechanic that solves the hair-on-fire problem. Everything else is a distraction.\n\n### Custom Mode\nIn enterprise software, the "Minimum" part of MVP is much larger. \n\nYou cannot sell a barebones prototype to a bank. Your MVP *must* include Single Sign-On (SAML/SSO), Role-Based Access Control (RBAC), and Audit Logs. Without these features, the security team will not allow the purchase.\n\n## Define the MVP Features\n\`\`\`input\nWrite Here...\n\`\`\`\n`
  },
  {
    key: 'businessmodel',
    content: `# Business Model\n\n🕒 **Estimated Time:** 15 min\n\n---\n\n## Why this matters\nHow are you going to make money? A great product with a broken business model is a charity. A mediocre product with a brilliant business model is a billion-dollar company.\n\n## Strategic Guidance\n\n### Hackathon Mode\nCompletely ignore this. You are not building a business; you are building a demo.\n\n### Personal Project\nIgnore this. Your goal is learning, not revenue.\n\n### Production SaaS\nThe standard SaaS model is a monthly recurring subscription (MRR). \n\nHowever, consider usage-based pricing (like Stripe or OpenAI) if your costs scale directly with user activity. Do not offer a "freemium" tier unless you have millions of dollars in VC funding to subsidize free users. Instead, offer a 14-day free trial requiring a credit card upfront.\n\n### Custom Mode\nEnterprise business models are driven by Annual Contract Value (ACV). \n\nYou will not have a self-serve checkout page. You will have a "Book a Demo" button. Contracts will be negotiated annually or multi-yearly, starting at $50k+ per year. You must factor in the cost of a dedicated sales team and customer success managers.\n\n## Choose Your Model\n\`\`\`input\nWrite Here...\n\`\`\`\n`
  }
];

let allSuccess = true;
for (const u of topics) {
  if (!updateTopic(u.key, u.content)) {
    allSuccess = false;
  }
}

if (allSuccess) {
  console.log("Batch 2 Deep Content applied!");
} else {
  console.error("Errors occurred in Batch 2.");
  process.exit(1);
}
