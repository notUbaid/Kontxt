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

const globalTopicLinks: Record<string, QuickLink[]> = {
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
