import type { Mode } from '../../components/TopNav';

export interface QuickLink {
  name: string;
  url: string;
  icon?: any;
}

export interface CustomLink extends QuickLink {
  id: string;
  scope: 'global' | 'project';
  projectId?: string;
  targetType: 'universal' | 'topic';
  targetTopics?: string[];
}

export interface Topic {
  id: string;
  name: string;
  icon: any;
  modes: Mode[];
  quickLinks: QuickLink[];
}

export interface Category {
  id: string;
  name: string;
  topics: Topic[];
}

export const universalLinks: QuickLink[] = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Analytics', url: 'https://analytics.google.com' },
  { name: 'Vercel', url: 'https://vercel.com' },
];

export const generateId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

export const globalTopicLinks: Record<string, {name: string, url: string}[]> = {
  'welcome': [
    { name: 'Guide: How to build with AI', url: 'https://github.com/notUbaid/Kontxt' },
    { name: 'Tool: Antigravity IDE', url: 'https://deepmind.google/technologies/gemini/' },
    { name: 'Tool: Cursor IDE', url: 'https://cursor.sh/' }
  ],
  'ideadefinition': [
    { name: 'YC: Evaluate Ideas', url: 'https://www.ycombinator.com/library/6e-how-to-evaluate-startup-ideas' },
    { name: 'Tool: Google Trends', url: 'https://trends.google.com/' },
    { name: 'Tool: Exploding Topics', url: 'https://explodingtopics.com/' }
  ],
  'problemstatement': [
    { name: 'Lenny: Validate Idea', url: 'https://www.lennysnewsletter.com/p/validating-your-startup-idea' },
    { name: 'Tool: Typeform (Surveys)', url: 'https://www.typeform.com/' },
    { name: 'Tool: GigaBrain (Reddit Search)', url: 'https://thegigabrain.com/' }
  ],
  'userpainpoints': [
    { name: 'YC: Get Startup Ideas', url: 'https://www.ycombinator.com/library/8g-how-to-get-startup-ideas' },
    { name: 'Tool: G2 (Competitor Reviews)', url: 'https://www.g2.com/' },
    { name: 'Tool: Capterra (Software Reviews)', url: 'https://www.capterra.com/' }
  ],
  'targetusers': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'Tool: Apollo.io (B2B Leads)', url: 'https://www.apollo.io/' },
    { name: 'Tool: LinkedIn Sales Nav', url: 'https://business.linkedin.com/sales-solutions/sales-navigator' }
  ],
  'icpidealcustomerprofile': [
    { name: 'Superhuman PMF Engine', url: 'https://firstround.com/review/how-superhuman-built-an-engine-to-find-product-market-fit/' },
    { name: 'Tool: Apollo.io (B2B Leads)', url: 'https://www.apollo.io/' },
    { name: 'Tool: LinkedIn Sales Nav', url: 'https://business.linkedin.com/sales-solutions/sales-navigator' }
  ],
  'personas': [
    { name: 'Lenny: Jobs to be Done', url: 'https://www.lennysnewsletter.com/p/jobs-to-be-done' },
    { name: 'Tool: ADPList (User Interviews)', url: 'https://adplist.org/' },
    { name: 'Tool: Hubspot Persona Maker', url: 'https://www.hubspot.com/make-my-persona' }
  ],
  'solutionstatement': [
    { name: 'Amazon Working Backwards', url: 'https://www.workingbackwards.com/' },
    { name: 'Template: Coda PR/FAQ', url: 'https://coda.io/@coda/amazon-pr-faq' },
    { name: 'Tool: FigJam (Brainstorming)', url: 'https://www.figma.com/figjam/' }
  ],
  'valueproposition': [
    { name: 'Strategyzer Canvas', url: 'https://www.strategyzer.com/library/the-value-proposition-canvas' },
    { name: 'Tool: Miro Template', url: 'https://miro.com/templates/value-proposition-canvas/' },
    { name: 'First Round: Value Prop', url: 'https://firstround.com/review/this-is-how-you-write-a-value-proposition/' }
  ],
  'elevatorpitch': [
    { name: 'YC: How to Pitch', url: 'https://www.ycombinator.com/library/6p-how-to-pitch-your-startup' },
    { name: 'Video: Michael Seibel', url: 'https://www.youtube.com/watch?v=11h2q_AOSpY' },
    { name: 'Geoffrey Moore Framework', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' }
  ],
  'marketresearch': [
    { name: 'YC: How to Talk to Users', url: 'https://www.youtube.com/watch?v=MT4HgImiXgg' },
    { name: 'Tool: The Mom Test', url: 'https://www.momtestbook.com/' },
    { name: 'Tool: GigaBrain (Reddit)', url: 'https://thegigabrain.com/' }
  ],
  'competitoranalysis': [
    { name: 'Lenny: How to Win', url: 'https://www.lennysnewsletter.com/p/how-to-win' },
    { name: 'Tool: G2 Reviews', url: 'https://www.g2.com/' },
    { name: 'Tool: Similarweb', url: 'https://www.similarweb.com/' }
  ],
  'existingalternatives': [
    { name: 'First Round: Competing with Excel', url: 'https://firstround.com/review/why-excel-is-your-biggest-competitor/' },
    { name: 'Lenny: The Status Quo', url: 'https://www.lennysnewsletter.com/' },
    { name: 'Tool: Zapier (Integrations)', url: 'https://zapier.com/' }
  ],
  'marketpositioning': [
    { name: 'Book: Obviously Awesome', url: 'https://www.aprildunford.com/obviously-awesome' },
    { name: 'First Round: Positioning', url: 'https://firstround.com/review/the-positioning-framework-that-has-helped-founders-cut-through-the-noise/' },
    { name: 'Tool: Figma Brand Boards', url: 'https://www.figma.com/' }
  ],
  'featureplanning': [
    { name: 'Lenny: Writing PRDs', url: 'https://www.lennysnewsletter.com/p/product-requirements-document-prd' },
    { name: 'Tool: Linear (Issue Tracking)', url: 'https://linear.app/' },
    { name: 'Tool: Notion (Roadmaps)', url: 'https://www.notion.so/' }
  ],
  'mvpfeatures': [
    { name: 'YC: How to Plan an MVP', url: 'https://www.ycombinator.com/library/6e-how-to-plan-an-mvp' },
    { name: 'Masters of Scale: Launching', url: 'https://mastersofscale.com/' },
    { name: 'Tool: Vercel (Deployments)', url: 'https://vercel.com/' }
  ],
  'futurefeatures': [
    { name: 'Lenny: Product Roadmaps', url: 'https://www.lennysnewsletter.com/p/product-roadmaps' },
    { name: 'Intercom: Product Strategy', url: 'https://www.intercom.com/blog/product-strategy/' },
    { name: 'Tool: PostHog (Feature Flags)', url: 'https://posthog.com/' }
  ],
  'featureprioritization': [
    { name: 'Intercom: RICE Framework', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
    { name: 'Method: Eisenhower Matrix', url: 'https://todoist.com/productivity-methods/eisenhower-matrix' },
    { name: 'Tool: Jira (Backlog)', url: 'https://www.atlassian.com/software/jira' }
  ],
  'businessmodel': [
    { name: 'Patrick Campbell: Pricing', url: 'https://www.youtube.com/watch?v=2eEwU8G9K1I' },
    { name: 'Lenny: B2B vs B2C', url: 'https://www.lennysnewsletter.com/p/b2b-vs-b2c' },
    { name: 'Tool: Stripe (Payments)', url: 'https://stripe.com/' }
  ]
};

export const createTopic = (name: string, icon: any, customLinks: QuickLink[] = []): Topic => {
  const id = generateId(name);
  return {
    id,
    name,
    icon,
    modes: ['Hackathon', 'Personal', 'Production', 'Custom'],
    quickLinks: [...(globalTopicLinks[id] || []), ...customLinks]
  };
};
