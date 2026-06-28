import fs from 'fs';
import path from 'path';

const taxonomyPath = path.resolve('src/data/taxonomies/marketplace.ts');
let content = fs.readFileSync(taxonomyPath, 'utf8');

// Update imports
content = content.replace(
  'Server\n, Presentation } from \'lucide-react\';',
  'Server\n, Presentation, Compass, ShieldCheck, UserPlus, Gavel, Link, Landmark, Award, ArrowRightLeft, IdCard, Eye, LifeBuoy, HeartPulse, Sparkles } from \'lucide-react\';'
);

// Define the new taxonomy array content
const newTaxonomy = `export const marketplaceProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — MARKETPLACE DISCOVERY',
    topics: [
      createTopic('Marketplace Fundamentals', BookOpen, [{name:'Bill Gurley: All Markets Are Not Created Equal',url:'https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal/'}], 'marketplacefundamentals'),
      createTopic('Marketplace Type', Target, [{name:'B2B vs B2C Marketplaces',url:'https://www.sharetribe.com/academy/types-of-online-marketplaces/'}], 'marketplacetype'),
      createTopic('Problem Definition', HelpCircle, [], 'marketplaceproblemdefinition'),
      createTopic('Marketplace Validation', Search, [], 'marketplacevalidation'),
      createTopic('Supply Side', Users, [{name:'Lenny: Kickstarting Supply',url:'https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace'}], 'marketplacesupplyside'),
      createTopic('Demand Side', Users, [{name:'Lenny: Driving Demand',url:'https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace'}], 'marketplacedemandside'),
      createTopic('Chicken & Egg Strategy', TrendingUp, [{name:'The Bowling Pin Strategy',url:'https://review.firstround.com/'},{name:'Paul Graham: Do Things That Dont Scale',url:'http://paulgraham.com/ds.html'}], 'marketplacechickenegg'),
      createTopic('Cold Start Strategy', Rocket, [], 'marketplacecoldstart'),
      createTopic('Marketplace Liquidity', Activity, [{name:'a16z: Liquidity Quality',url:'https://a16z.com/2020/02/18/marketplace-liquidity/'}], 'marketplaceliquidity'),
      createTopic('Marketplace Moat', Shield, [], 'marketplacemoat'),
      createTopic('Competitor Analysis', BarChart, [{name:'Lenny: How to Win',url:'https://www.lennysnewsletter.com/p/how-to-win'},{name:'G2',url:'https://www.g2.com/'}], 'marketplacecompetitoranalysis'),
      createTopic('Revenue Model', DollarSign, [{name:'Bill Gurley: A Rake Too Far',url:'https://abovethecrowd.com/2013/04/18/a-rake-too-far-optimal-platform-pricing-strategy/'}], 'marketplacerevenuemodel'),
      createTopic('MVP Scope', Layers, [{name:'Sharetribe MVP',url:'https://www.sharetribe.com/academy/build-minimum-viable-platform/'}], 'marketplacemvpscope'),
      createTopic('Success Metrics', Target, [{name:'a16z: Marketplace Metrics',url:'https://a16z.com/16-startup-metrics/'},{name:'Lenny: GMV',url:'https://www.lennysnewsletter.com/'}], 'marketplacesuccessmetrics'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'Lenny PRD',url:'https://www.lennysnewsletter.com/'}], 'marketplaceprd'),
      createTopic('Buyer Journey', Layers, [{name:'NNG Journey Mapping',url:'https://www.nngroup.com/'}], 'marketplacebuyerjourney'),
      createTopic('Seller Journey', Layers, [{name:'Seller Onboarding Best Practices',url:'https://stripe.com/connect'}], 'marketplacesellerjourney'),
      createTopic('Onboarding Experience', UserPlus, [], 'marketplaceonboardingexperience'),
      createTopic('Information Architecture', Network, [{name:'Mobbin Marketplace UX',url:'https://mobbin.com/'}], 'marketplaceinformationarchitecture'),
      createTopic('Wireframes', Box, [{name:'Balsamiq',url:'https://balsamiq.com/'}], 'marketplacewireframes'),
      createTopic('Design System', Settings, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'}], 'marketplacedesignsystem'),
      createTopic('Trust Signals', ShieldCheck, [], 'marketplacetrustsignals'),
      createTopic('Marketplace Rules', Gavel, [], 'marketplacerules'),
      createTopic('Trust & Safety Planning', Shield, [{name:'Stripe Identity',url:'https://stripe.com/identity'}], 'marketplacetrustsafetyplanning'),
      createTopic('Accessibility', UserCheck, [{name:'WCAG',url:'https://www.w3.org/WAI/standards-guidelines/wcag/'}], 'marketplaceaccessibility'),
      createTopic('Loading States', Zap, [{name:'Optimistic UI',url:'https://tanstack.com/query/latest/docs/react/guides/optimistic-updates'}], 'marketplaceloadingstates'),
      createTopic('Empty States', Box, [{name:'Empty States Showcase',url:'https://emptystat.es/'}], 'marketplaceemptystates'),
      createTopic('Error States', AlertCircle, [{name:'NNG Error Messages',url:'https://www.nngroup.com/'}], 'marketplaceerrorstates'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — MARKETPLACE ARCHITECTURE',
    topics: [
      createTopic('Tech Stack', Layers, [{name:'Vercel Commerce',url:'https://vercel.com/commerce'}], 'marketplacetechstack'),
      createTopic('User Architecture', Users, [{name:'Multi-tenant DB',url:'https://aws.amazon.com/blogs/database/multi-tenant-data-isolation/'}], 'marketplaceuserarchitecture'),
      createTopic('Authentication', Lock, [{name:'Supabase Auth',url:'https://supabase.com/docs/guides/auth'}], 'marketplaceauthentication'),
      createTopic('Authorization', Shield, [{name:'Permit.io RBAC',url:'https://www.permit.io/'}], 'marketplaceauthorization'),
      createTopic('Listings', List, [{name:'Inventory Logic',url:'https://stripe.com/docs/api'}], 'marketplacelistingsystem'),
      createTopic('Search & Discovery', Compass, [], 'marketplacesearchdiscovery'),
      createTopic('Matching Strategy', Link, [], 'marketplacematchingstrategy'),
      createTopic('Messaging', MessageSquare, [{name:'Sendbird',url:'https://sendbird.com/'}], 'marketplacemessagingsystem'),
      createTopic('Payments', CreditCard, [{name:'Stripe Connect',url:'https://stripe.com/connect'}], 'marketplacepaymentsarchitecture'),
      createTopic('Escrow Strategy', Landmark, [], 'marketplaceescrowstrategy'),
      createTopic('Reviews & Ratings', Star, [{name:'Double-Blind Reviews',url:'https://www.sharetribe.com/academy/building-trust-with-reviews/'}], 'marketplacereviewsratings'),
      createTopic('Reputation System', Award, [], 'marketplacereputationsystem'),
      createTopic('Dispute Resolution', FileWarning, [{name:'Handling Chargebacks',url:'https://stripe.com/docs/disputes'}], 'marketplacedisputeresolution'),
      createTopic('Cost Estimation', DollarSign, [{name:'AWS Calculator',url:'https://calculator.aws/'}], 'marketplacecostestimation'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Database', Database, [{name:'PostGIS (Geospatial)',url:'https://postgis.net/'}], 'marketplacedatabase'),
      createTopic('Backend', Server, [{name:'Inngest Background Jobs',url:'https://www.inngest.com/'}], 'marketplacebackend'),
      createTopic('Frontend', Code, [{name:'TanStack Query',url:'https://tanstack.com/query'}], 'marketplacefrontend'),
      createTopic('Listings', List, [{name:'Prisma Schema',url:'https://www.prisma.io/'}], 'marketplacelistings'),
      createTopic('Buyer Experience', Users, [], 'marketplacebuyerexperience'),
      createTopic('Seller Experience', Users, [], 'marketplacesellerexperience'),
      createTopic('Search', Search, [{name:'Typesense',url:'https://typesense.org/'}], 'marketplacesearch'),
      createTopic('Messaging', MessageSquare, [{name:'Stream Chat',url:'https://getstream.io/'}], 'marketplacemessaging'),
      createTopic('Transactions', ArrowRightLeft, [], 'marketplacetransactions'),
      createTopic('Payments', CreditCard, [{name:'Stripe Connect Webhooks',url:'https://docs.stripe.com/connect/webhooks'}], 'marketplacepayments'),
      createTopic('Reviews', Star, [{name:'Review Fraud Detection',url:'https://sift.com/'}], 'marketplacereviews'),
      createTopic('Notifications', Activity, [{name:'Novu',url:'https://novu.co/'}], 'marketplacenotifications'),
      createTopic('Moderation', ShieldAlert, [{name:'OpenAI Moderation API',url:'https://platform.openai.com/docs/guides/moderation'}], 'marketplacemoderationtools'),
      createTopic('Admin Panel', Settings, [{name:'Retool',url:'https://retool.com/'}], 'marketplaceadminpanel'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'}], 'marketplaceanalytics'),
      createTopic('Testing', CheckSquare, [{name:'Playwright E2E',url:'https://playwright.dev/'}], 'marketplacetesting'),
      
      // Hackathon specific topics added to Development phase (hidden from production)
      createTopic('Demo Marketplace Data', Database, [], 'marketplacedemodata'),
      createTopic('Fake Messaging', MessageSquare, [], 'marketplacefakemessaging'),
      createTopic('Marketplace UI Polish', Sparkles, [], 'marketplaceuipolish'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Stripe Identity KYC',url:'https://stripe.com/identity'}], 'marketplacesecurity'),
      createTopic('Identity Verification', IdCard, [], 'marketplaceidentityverification'),
      createTopic('Trust & Safety', ShieldAlert, [{name:'Sift',url:'https://sift.com/'}], 'marketplacetrustandsafety'),
      createTopic('Observability', Eye, [{name:'BetterStack',url:'https://betterstack.com/'}], 'marketplaceobservability'),
      createTopic('Performance', Zap, [{name:'Next.js Image',url:'https://nextjs.org/docs/app/api-reference/components/image'}], 'marketplaceperformanceoptimization'),
      createTopic('Caching', Database, [{name:'Vercel Edge Cache',url:'https://vercel.com/docs/edge-network/caching'}], 'marketplacecaching'),
      createTopic('Backups', Cloud, [{name:'Supabase PITR',url:'https://supabase.com/docs/guides/platform/backups'}], 'marketplacebackups'),
      createTopic('CI/CD', Rocket, [{name:'GitHub Actions',url:'https://github.com/features/actions'}], 'marketplacecicd'),
      createTopic('Scalability', TrendingUp, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'marketplacescalabilityplanning'),
    ]
  },
  {
    id: 'phase-5-launch',
    name: 'PHASE 5 — LAUNCH',
    topics: [
      createTopic('Buyer Onboarding', Users, [{name:'Guest Checkout',url:'https://stripe.com/'}], 'marketplacebuyeronboarding'),
      createTopic('Seller Onboarding', Users, [{name:'Progressive Onboarding',url:'https://stripe.com/connect'}], 'marketplaceselleronboarding'),
      createTopic('Marketplace SEO', Search, [{name:'Programmatic SEO',url:'https://www.programmaticseo.com/'}], 'marketplaceseo'),
      createTopic('Analytics', BarChart, [{name:'Mixpanel',url:'https://mixpanel.com/'}], 'marketplaceanalyticssetup'),
      createTopic('Marketplace Policies', HelpCircle, [{name:'Uber Community Guidelines',url:'https://www.uber.com/legal/en/'}], 'marketplacemarketplacepolicies'),
      createTopic('Refund Policies', CreditCard, [{name:'Stripe Refunds',url:'https://stripe.com/docs/refunds'}], 'marketplacerefundpolicies'),
      createTopic('Support Workflow', LifeBuoy, [], 'marketplacesupportworkflow'),
      createTopic('Privacy Policy', Shield, [{name:'Termly',url:'https://termly.io/'}], 'marketplaceprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'Sharetribe Legal',url:'https://www.sharetribe.com/academy/legal-guide-for-marketplaces/'}], 'marketplacetermsofservice'),
      createTopic('Launch Checklist', ListChecks, [{name:'Product Hunt',url:'https://www.producthunt.com/'}], 'marketplacelaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Marketplace Liquidity', Zap, [{name:'Measuring Liquidity',url:'https://a16z.com/2020/02/18/marketplace-liquidity/'}], 'marketplaceliquiditygrowth'),
      createTopic('Supply Growth', TrendingUp, [{name:'Lenny: Scaling Supply',url:'https://www.lennysnewsletter.com/'}], 'marketplacesupplygrowth'),
      createTopic('Demand Growth', TrendingUp, [{name:'Lenny: Scaling Demand',url:'https://www.lennysnewsletter.com/'}], 'marketplacedemandgrowth'),
      createTopic('Network Effects', Network, [], 'marketplacenetworkeffects'),
      createTopic('Marketplace Health', HeartPulse, [], 'marketplacehealth'),
      createTopic('Reviews Optimization', Star, [{name:'UGC Conversions',url:'https://yotpo.com/'}], 'marketplacereviewsoptimization'),
      createTopic('Referral Programs', Share2, [{name:'Branch.io',url:'https://branch.io/'}], 'marketplacereferralprograms'),
      createTopic('Retention', Activity, [{name:'Amplitude Retention',url:'https://amplitude.com/retention'}], 'marketplaceretention'),
      createTopic('Roadmap', Layers, [{name:'Linear',url:'https://linear.app/'}], 'marketplaceroadmap'),
    ]
  }
];`;

content = content.replace(/export const marketplaceProductionTaxonomy: Category\[\] = \[[\s\S]*?\];\n\nconst filterTaxonomy/, newTaxonomy + '\n\nconst filterTaxonomy');

// Update Hackathon filter
// In the original, the hackathon hide list contained: 'Fraud Prevention', 'Dispute Resolution', 'Moderation Systems', 'Marketplace Policies', 'Monitoring', 'Scalability Planning', 'Abuse Detection'
// And the hackathon keep list needed 'Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish'.
content = content.replace(
  /'Demo Data', 'MVP Features'/g,
  `'Demo Data', 'MVP Features', 'Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish'`
);

content = content.replace(
  /'Fraud Prevention', 'Dispute Resolution', 'Moderation Systems', \n    'Marketplace Policies', 'Monitoring', 'Scalability Planning', 'Abuse Detection'/g,
  `'Trust & Safety', 'Dispute Resolution', 'Moderation', \n    'Marketplace Policies', 'Observability', 'Scalability', 'Identity Verification'`
);

// We need to make sure the Hackathon keep list explicitly includes all the Phase 1,2,3 topics they want or hides the production ones
// Actually, since Hackathon uses keep list for topics, I will just make sure they are in the keep list or we just hide the irrelevant ones. Wait, if a topic is in the `keep` array, EVERYTHING ELSE is hidden unless it's in the `keep` array. The original Hackathon taxonomy had a very specific keep array.
// 'Marketplace Type', 'MVP Scope', 'PRD', 'Buyer Journey', 'Seller Journey', 'Database Schema', 'Listings', 'Search', 'Authentication', 'Demo Transactions', 'Pitch Deck', 'Demo Script', 'Submission Checklist', 'Demo Data', 'MVP Features'
// Wait, my Hackathon topics are 'Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish'. I added them to the keep array.
// Note: Since they use `keep.length > 0`, only things in `keep` are kept. The `hide` array is redundant if `keep` is used, but it's evaluated first.

// The original Personal filter hide array:
// 'Enterprise Moderation', 'Advanced Fraud Detection', 'Large-scale Infrastructure', 'Abuse Detection', 'Scalability Planning', 'Fraud Prevention'
// We replace 'Fraud Prevention' and 'Abuse Detection' with 'Trust & Safety' and 'Observability'
content = content.replace(
  /'Abuse Detection', 'Scalability Planning', 'Fraud Prevention'/g,
  `'Trust & Safety', 'Scalability', 'Observability'`
);

// Hide the Hackathon specific topics from Production and Personal by adding them to a filter?
// Wait, the Production array doesn't have a filter!
// Oh, `marketplaceProductionTaxonomy` IS the raw array! So 'Demo Marketplace Data' will show up in Production!
// I need to filter it for Production, OR define it separately.
// Kontxt's design is `marketplaceProductionTaxonomy` is the base.
// If I add Hackathon topics to the base, they will show in Production.
// I should filter them out in `marketplaceCustomTaxonomy`? Wait, `export const marketplaceCustomTaxonomy = marketplaceProductionTaxonomy;`
// No, the UI uses `marketplaceProductionTaxonomy` directly.
// To fix this without breaking the architecture, I should either:
// 1. Not add Hackathon topics to `marketplaceProductionTaxonomy` and instead append them in `marketplaceHackathonTaxonomy`.
// 2. Add them, but modify `marketplaceProductionTaxonomy` export to be a filtered version of a base array.
// Let's modify the file to have a `baseMarketplaceTaxonomy` and then `export const marketplaceProductionTaxonomy = filterTaxonomy([], ['Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish']);`
// Yes, that's much safer and matches the filtering pattern.

// Let's rewrite the whole file structure string replacement for safety to do exactly this.
const fileEndReplacement = `
const filterTaxonomy = (baseTaxonomy: Category[], keep: string[], hide: string[]) => {
  return baseTaxonomy.map(cat => {
    return {
      ...cat,
      topics: cat.topics.filter(t => {
        if (hide.includes(t.name)) return false;
        if (keep.length > 0 && !keep.includes(t.name)) return false;
        return true;
      })
    };
  }).filter(cat => cat.topics.length > 0);
};

export const marketplaceProductionTaxonomy: Category[] = filterTaxonomy(
  baseMarketplaceTaxonomy,
  [],
  ['Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish'] // Hide hackathon stuff
);

export const marketplaceHackathonTaxonomy: Category[] = filterTaxonomy(
  baseMarketplaceTaxonomy,
  [
    'Marketplace Type', 'MVP Scope', 'PRD', 'Buyer Journey', 'Seller Journey', 
    'Database', 'Listings', 'Search', 'Authentication', 'Demo Transactions', 
    'Pitch Deck', 'Demo Script', 'Submission Checklist',
    'Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish',
    'Marketplace Fundamentals', 'Tech Stack'
  ],
  []
);

export const marketplacePersonalTaxonomy: Category[] = filterTaxonomy(
  baseMarketplaceTaxonomy,
  [],
  [
    'Trust & Safety', 'Scalability', 'Observability', 'Identity Verification',
    'Demo Marketplace Data', 'Fake Messaging', 'Marketplace UI Polish'
  ]
);

export const marketplaceCustomTaxonomy = marketplaceProductionTaxonomy;
`;

// Now replace from `const filterTaxonomy =` to end of file
content = content.replace(/export const marketplaceProductionTaxonomy: Category\[\] = \[/g, 'const baseMarketplaceTaxonomy: Category[] = [');
content = content.replace(/const filterTaxonomy = \([\s\S]*/, fileEndReplacement.trim());

fs.writeFileSync(taxonomyPath, content);
console.log("Updated marketplace.ts successfully");
