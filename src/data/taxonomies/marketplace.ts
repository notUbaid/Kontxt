import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Share2, Network, Code, Globe, Star, FileWarning, HelpCircle, CreditCard, Server
, Presentation } from 'lucide-react';
import { type Category, createTopic } from './types';

const baseMarketplaceTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — MARKETPLACE DISCOVERY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Competitor Analysis', BarChart, [{name:'Lenny: How to Win',url:'https://www.lennysnewsletter.com/p/how-to-win'},{name:'G2',url:'https://www.g2.com/'}], 'marketplacecompetitoranalysis'),
      createTopic('Success Metrics', Target, [{name:'a16z: Marketplace Metrics',url:'https://a16z.com/16-startup-metrics/'},{name:'Lenny: GMV',url:'https://www.lennysnewsletter.com/'}], 'marketplacesuccessmetrics'),
      createTopic('Marketplace Fundamentals', BookOpen, [{name:'Bill Gurley: All Markets Are Not Created Equal',url:'https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal/'}], 'marketplacefundamentals'),
      createTopic('Marketplace Type', Target, [{name:'B2B vs B2C Marketplaces',url:'https://www.sharetribe.com/academy/types-of-online-marketplaces/'}], 'marketplacetype'),
      createTopic('Supply Side', Users, [{name:'Lenny: Kickstarting Supply',url:'https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace'}], 'marketplacesupplyside'),
      createTopic('Demand Side', Users, [{name:'Lenny: Driving Demand',url:'https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace'}], 'marketplacedemandside'),
      createTopic('Marketplace Liquidity', Activity, [{name:'a16z: Liquidity Quality',url:'https://a16z.com/2020/02/18/marketplace-liquidity/'}], 'marketplaceliquidity'),
      createTopic('Chicken & Egg Strategy', TrendingUp, [{name:'The Bowling Pin Strategy',url:'https://review.firstround.com/'},{name:'Paul Graham: Do Things That Dont Scale',url:'http://paulgraham.com/ds.html'}], 'marketplacechickenegg'),
      createTopic('Revenue Model', DollarSign, [{name:'Bill Gurley: A Rake Too Far',url:'https://abovethecrowd.com/2013/04/18/a-rake-too-far-optimal-platform-pricing-strategy/'}], 'marketplacerevenuemodel'),
      createTopic('MVP Scope', Layers, [{name:'Sharetribe MVP',url:'https://www.sharetribe.com/academy/build-minimum-viable-platform/'}], 'marketplacemvpscope'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — PRODUCT DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'Lenny PRD',url:'https://www.lennysnewsletter.com/'}], 'marketplaceprd'),
      createTopic('User Flows', Network, [{name:'Mobbin Marketplace UX',url:'https://mobbin.com/'}], 'marketplaceuserflows'),
      createTopic('Wireframes', Box, [{name:'Balsamiq',url:'https://balsamiq.com/'}], 'marketplacewireframes'),
      createTopic('Design System', Settings, [{name:'Shadcn UI',url:'https://ui.shadcn.com/'}], 'marketplacedesignsystem'),
      createTopic('Accessibility', UserCheck, [{name:'WCAG',url:'https://www.w3.org/WAI/standards-guidelines/wcag/'}], 'marketplaceaccessibility'),
      createTopic('Empty States', Box, [{name:'Empty States Showcase',url:'https://emptystat.es/'}], 'marketplaceemptystates'),
      createTopic('Error States', AlertCircle, [{name:'NNG Error Messages',url:'https://www.nngroup.com/'}], 'marketplaceerrorstates'),
      createTopic('Loading States', Zap, [{name:'Optimistic UI',url:'https://tanstack.com/query/latest/docs/react/guides/optimistic-updates'}], 'marketplaceloadingstates'),
      createTopic('Buyer Journey', Layers, [{name:'NNG Journey Mapping',url:'https://www.nngroup.com/'}], 'marketplacebuyerjourney'),
      createTopic('Seller Journey', Layers, [{name:'Seller Onboarding Best Practices',url:'https://stripe.com/connect'}], 'marketplacesellerjourney'),
      createTopic('Marketplace Policies', ShieldAlert, [{name:'Airbnb Policies',url:'https://www.airbnb.com/help/'}], 'marketplacemarketplacepolicies'),
      createTopic('Trust & Safety Planning', Shield, [{name:'Stripe Identity',url:'https://stripe.com/identity'}], 'marketplacetrustsafetyplanning'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — MARKETPLACE ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Layers, [{name:'Vercel Commerce',url:'https://vercel.com/commerce'}], 'marketplacetechstackselection'),
      createTopic('Authentication', Lock, [{name:'Supabase Auth',url:'https://supabase.com/docs/guides/auth'}], 'marketplaceauthentication'),
      createTopic('Cost Estimation', DollarSign, [{name:'AWS Calculator',url:'https://calculator.aws/'}], 'marketplacecostestimation'),
      createTopic('Reviews & Ratings', Star, [{name:'Double-Blind Reviews',url:'https://www.sharetribe.com/academy/building-trust-with-reviews/'}], 'marketplacereviewsratings'),
      createTopic('Architecture Fundamentals', BookOpen, [{name:'Sharetribe Guide',url:'https://www.sharetribe.com/academy/'}], 'marketplacearchitecturefundamentals'),
      createTopic('User Architecture', Users, [{name:'Multi-tenant DB',url:'https://aws.amazon.com/blogs/database/multi-tenant-data-isolation/'}], 'marketplaceuserarchitecture'),
      createTopic('Authorization', Shield, [{name:'Permit.io RBAC',url:'https://www.permit.io/'}], 'marketplaceauthorization'),
      createTopic('Listing System', List, [{name:'Inventory Logic',url:'https://stripe.com/docs/api'}], 'marketplacelistingsystem'),
      createTopic('Search Architecture', Search, [{name:'Algolia Marketplace',url:'https://www.algolia.com/solutions/marketplaces/'}], 'marketplacesearcharchitecture'),
      createTopic('Payments Architecture', CreditCard, [{name:'Stripe Connect',url:'https://stripe.com/connect'}], 'marketplacepaymentsarchitecture'),
      createTopic('Messaging System', MessageSquare, [{name:'Sendbird',url:'https://sendbird.com/'}], 'marketplacemessagingsystem'),
      createTopic('Dispute Resolution', FileWarning, [{name:'Handling Chargebacks',url:'https://stripe.com/docs/disputes'}], 'marketplacedisputeresolution'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Auth Implementation', Lock, [{name:'Clerk Dual-sided Auth',url:'https://clerk.com/'}], 'marketplaceauthenticationimplementation'),
      createTopic('Database', Database, [{name:'PostGIS (Geospatial)',url:'https://postgis.net/'}], 'marketplacedatabase'),
      createTopic('Backend', Server, [{name:'Inngest Background Jobs',url:'https://www.inngest.com/'}], 'marketplacebackend'),
      createTopic('Frontend', Code, [{name:'TanStack Query',url:'https://tanstack.com/query'}], 'marketplacefrontend'),
      createTopic('Payments', CreditCard, [{name:'Stripe Connect Webhooks',url:'https://docs.stripe.com/connect/webhooks'}], 'marketplacepayments'),
      createTopic('Notifications', Activity, [{name:'Novu',url:'https://novu.co/'}], 'marketplacenotifications'),
      createTopic('Search', Search, [{name:'Typesense',url:'https://typesense.org/'}], 'marketplacesearch'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'}], 'marketplaceanalytics'),
      createTopic('Admin Panel', Settings, [{name:'Retool',url:'https://retool.com/'}], 'marketplaceadminpanel'),
      createTopic('Testing', CheckSquare, [{name:'Playwright E2E',url:'https://playwright.dev/'}], 'marketplacetesting'),
      createTopic('Documentation', BookOpen, [{name:'Mintlify',url:'https://mintlify.com/'}], 'marketplacedocumentation'),
      createTopic('Authorization Rules', Shield, [{name:'Supabase RLS',url:'https://supabase.com/docs/guides/auth/row-level-security'}], 'marketplaceauthorizationimplementation'),
      createTopic('Listings', List, [{name:'Prisma Schema',url:'https://www.prisma.io/'}], 'marketplacelistings'),
      createTopic('Messaging', MessageSquare, [{name:'Stream Chat',url:'https://getstream.io/'}], 'marketplacemessaging'),
      createTopic('Reviews', Star, [{name:'Review Fraud Detection',url:'https://sift.com/'}], 'marketplacereviews'),
      createTopic('Moderation Tools', ShieldAlert, [{name:'OpenAI Moderation API',url:'https://platform.openai.com/docs/guides/moderation'}], 'marketplacemoderationtools'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Stripe Identity KYC',url:'https://stripe.com/identity'}], 'marketplacesecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Next.js Image',url:'https://nextjs.org/docs/app/api-reference/components/image'}], 'marketplaceperformanceoptimization'),
      createTopic('Monitoring', Activity, [{name:'BetterStack',url:'https://betterstack.com/'}], 'marketplacemonitoring'),
      createTopic('Logging', FileText, [{name:'Axiom',url:'https://axiom.co/'}], 'marketplacelogging'),
      createTopic('Error Tracking', AlertCircle, [{name:'Sentry',url:'https://sentry.io/'}], 'marketplaceerrortracking'),
      createTopic('Rate Limiting', Activity, [{name:'Upstash Redis',url:'https://upstash.com/'}], 'marketplaceratelimiting'),
      createTopic('Caching', Database, [{name:'Vercel Edge Cache',url:'https://vercel.com/docs/edge-network/caching'}], 'marketplacecaching'),
      createTopic('Backups', Cloud, [{name:'Supabase PITR',url:'https://supabase.com/docs/guides/platform/backups'}], 'marketplacebackups'),
      createTopic('CI/CD', Rocket, [{name:'GitHub Actions',url:'https://github.com/features/actions'}], 'marketplacecicd'),
      createTopic('Fraud Prevention', ShieldAlert, [{name:'Stripe Radar',url:'https://stripe.com/radar'}], 'marketplacefraudprevention'),
      createTopic('Scalability Planning', TrendingUp, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'marketplacescalabilityplanning'),
      createTopic('Abuse Detection', ShieldAlert, [{name:'Sift',url:'https://sift.com/'}], 'marketplaceabusedetection'),
    ]
  },
  {
    id: 'phase-5-launch',
    name: 'PHASE 5 — LAUNCH',
    topics: [
      createTopic('Privacy Policy', Shield, [{name:'Termly',url:'https://termly.io/'}], 'marketplaceprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'Sharetribe Legal',url:'https://www.sharetribe.com/academy/legal-guide-for-marketplaces/'}], 'marketplacetermsofservice'),
      createTopic('Beta Testing', Target, [{name:'The Mom Test',url:'https://www.momtestbook.com/'}], 'marketplacebetatesting'),
      createTopic('Seller Onboarding', Users, [{name:'Progressive Onboarding',url:'https://stripe.com/connect'}], 'marketplaceselleronboarding'),
      createTopic('Buyer Onboarding', Users, [{name:'Guest Checkout',url:'https://stripe.com/'}], 'marketplacebuyeronboarding'),
      createTopic('Analytics Setup', BarChart, [{name:'Mixpanel',url:'https://mixpanel.com/'}], 'marketplaceanalyticssetup'),
      createTopic('SEO', Search, [{name:'Programmatic SEO',url:'https://www.programmaticseo.com/'}], 'marketplaceseo'),
      createTopic('Legal Documents', FileText, [{name:'Stripe Atlas',url:'https://stripe.com/atlas'}], 'marketplacelegaldocuments'),
      createTopic('Legal Policies', HelpCircle, [{name:'Uber Community Guidelines',url:'https://www.uber.com/legal/en/'}], 'marketplacelegalpolicies'),
      createTopic('Refund Policies', CreditCard, [{name:'Stripe Refunds',url:'https://stripe.com/docs/refunds'}], 'marketplacerefundpolicies'),
      createTopic('Launch Checklist', ListChecks, [{name:'Product Hunt',url:'https://www.producthunt.com/'}], 'marketplacelaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Activity, [{name:'Amplitude Retention',url:'https://amplitude.com/retention'}], 'marketplaceretention'),
      createTopic('Referral Programs', Share2, [{name:'Branch.io',url:'https://branch.io/'}], 'marketplacereferralprograms'),
      createTopic('Roadmap', Layers, [{name:'Linear',url:'https://linear.app/'}], 'marketplaceroadmap'),
      createTopic('Scaling Strategy', Globe, [{name:'Bowling Pin Strategy',url:'https://review.firstround.com/'}], 'marketplacescalingstrategy'),
      createTopic('Supply Growth', TrendingUp, [{name:'Lenny: Scaling Supply',url:'https://www.lennysnewsletter.com/'}], 'marketplacesupplygrowth'),
      createTopic('Demand Growth', TrendingUp, [{name:'Lenny: Scaling Demand',url:'https://www.lennysnewsletter.com/'}], 'marketplacedemandgrowth'),
      createTopic('Reviews Optimization', Star, [{name:'UGC Conversions',url:'https://yotpo.com/'}], 'marketplacereviewsoptimization'),
      createTopic('Liquidity Optimization', Zap, [{name:'Measuring Liquidity',url:'https://a16z.com/2020/02/18/marketplace-liquidity/'}], 'marketplaceliquidityoptimization'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
    ]
  }
];

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