const { updateTopic } = require('./update_topic.cjs');

const topics = [
  {
    key: 'systemarchitecturediagram',
    content: `# System Architecture Diagram\n\n🕒 **Estimated Time:** 15 min\n\n---\n\n## Why this matters\nA visual diagram of your system explains how all the pieces (Frontend, Backend, Database, Third-Party APIs) fit together. It is the easiest way to onboard a new developer or explain your tech to an investor.\n\n## Strategic Guidance\n\n### Hackathon Mode\nSkip it. You don't have time to draw boxes and arrows.\n\n### Personal Project\nDraw a quick sketch in Excalidraw. It helps cement your understanding of how the client communicates with the server.\n\n### Production SaaS\nYou must maintain an up-to-date architecture diagram. \n\nUse a tool like Mermaid.js (which lives in markdown) or Eraser.io so you can keep the diagram in version control alongside your code. When a service goes down, this diagram is the first thing incident responders look at.\n\n### Custom Mode\nEnterprise architecture diagrams are incredibly complex and follow strict UML or C4 Model standards. \n\nThey must document network boundaries, VPCs, subnets, load balancers, and firewall rules. A security auditor will require this diagram to verify that sensitive databases are not exposed to the public internet.\n\n## Diagram Generation\n\`\`\`prompt\nAct as a Cloud Architect. Generate a Mermaid.js architecture diagram for my tech stack.\n\`\`\`\n- [ ] I have generated my architecture diagram.\n`
  },
  {
    key: 'costestimation',
    content: `# Cost Estimation\n\n🕒 **Estimated Time:** 15 min\n\n---\n\n## Why this matters\nCloud computing is not free. If you don't estimate your costs upfront, you might accidentally build an architecture that costs more to run than your customers pay you.\n\n## Strategic Guidance\n\n### Hackathon Mode\nUse only free tiers. Vercel for frontend, Supabase for backend. Do not put a credit card into AWS during a hackathon; you will forget to turn it off and get a $500 bill on Monday.\n\n### Personal Project\nStick strictly to free tiers. Your budget is $0.\n\n### Production SaaS\nYou must calculate your Unit Economics. \n\nIf you charge a user $10/month, but they consume $8/month of OpenAI API credits and $1/month of database bandwidth, your gross margin is terrible. You must model your costs at 100 users, 1,000 users, and 10,000 users to ensure the business model actually scales.\n\n### Custom Mode\nEnterprise cost estimation is about Reserved Instances and bulk discounts. \n\nYou will spend hundreds of thousands of dollars on AWS. You need a dedicated FinOps team to negotiate enterprise discounts, purchase compute commitments, and ensure idle resources are aggressively terminated.\n\n## Cost Estimation Generation\n\`\`\`prompt\nAct as a FinOps Specialist. Based on my tech stack, generate a monthly cost estimation model for 1,000 active users.\n\`\`\`\n- [ ] I have modeled my infrastructure costs.\n`
  }
];

let allSuccess = true;
for (const u of topics) {
  if (!updateTopic(u.key, u.content)) {
    allSuccess = false;
  }
}

if (allSuccess) {
  console.log("Batch 4c Deep Content applied!");
} else {
  console.error("Errors occurred in Batch 4c.");
  process.exit(1);
}
