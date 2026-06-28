import { 
  FileText, Database, Settings, Box, CheckSquare, Shield, Rocket, 
  BookOpen, Layers, Cloud, Activity, Zap, Search, ShieldAlert,
  Target, Users, BarChart, DollarSign, Lock, ListChecks,
  UserCheck, MessageSquare, TrendingUp, AlertCircle, List, Share2, Network, Code, Globe, Star, HelpCircle, CreditCard, Server, ShoppingCart, Tag, Package, Truck, Gift, RefreshCcw, Heart, PieChart, Layout, MonitorSmartphone
, Presentation } from 'lucide-react';
import { type Category, createTopic } from './types';

export const ecommerceProductionTaxonomy: Category[] = [
  {
    id: 'phase-0-discovery',
    name: 'PHASE 0 — BUSINESS & STORE STRATEGY',
    topics: [
      createTopic('Welcome', HelpCircle),
      createTopic('Target Audience', Users, [{name:'Meta Lookalike Audiences',url:'https://www.facebook.com/business/help'}], 'ecommercetargetaudience'),
      createTopic('Value Proposition', Gift, [{name:'Value Proposition Canvas',url:'https://www.strategyzer.com/'}], 'ecommercevalueproposition'),
      createTopic('Competitor Analysis', BarChart, [{name:'SimilarWeb',url:'https://www.similarweb.com/'}], 'ecommercecompetitoranalysis'),
      createTopic('Success Metrics', TrendingUp, [{name:'LTV:CAC Ratio',url:'https://www.shopify.com/blog/customer-acquisition-cost'}], 'ecommercesuccessmetrics'),
      createTopic('Store Fundamentals', BookOpen, [{name:'Shopify Anatomy',url:'https://www.shopify.com/partners/blog'}], 'ecommercestorefundamentals'),
      createTopic('Business Definition', Target, [{name:'3PL vs Dropshipping',url:'https://www.shipbob.com/blog/3pl-vs-dropshipping/'}], 'ecommercebusinessdefinition'),
      createTopic('Brand Vision', Star, [{name:'Building a DTC Brand',url:'https://www.shopify.com/blog/dtc-brand'}], 'ecommercebrandvision'),
      createTopic('Product Catalog Planning', List, [{name:'SKU Architecture',url:'https://www.tradegecko.com/blog/sku'}], 'ecommerceproductcatalogplanning'),
      createTopic('Store Economics', PieChart, [{name:'Contribution Margin',url:'https://www.investopedia.com/terms/c/contributionmargin.asp'}], 'ecommercestoreeconomics'),
      createTopic('Pricing Strategy', DollarSign, [{name:'Psychological Pricing',url:'https://www.shopify.com/blog/psychological-pricing'}], 'ecommercepricingstrategy'),
      createTopic('MVP Scope', Layers, [{name:'E-commerce MVP',url:'https://www.sharetribe.com/'}], 'ecommercemvpscope'),
    ]
  },
  {
    id: 'phase-1-design',
    name: 'PHASE 1 — STORE DESIGN',
    topics: [
      createTopic('PRD', FileText, [{name:'Lenny PRD',url:'https://www.lennysnewsletter.com/'}], 'ecommerceprd'),
      createTopic('Information Architecture', Box, [{name:'Baymard Institute Nav',url:'https://baymard.com/blog'}], 'ecommerceinformationarchitecture'),
      createTopic('Wireframes', Box, [{name:'Mobbin E-Commerce',url:'https://mobbin.com/'}], 'ecommercewireframes'),
      createTopic('Design System', Settings, [{name:'Vercel Commerce',url:'https://vercel.com/templates/next.js/nextjs-commerce'}], 'ecommercedesignsystem'),
      createTopic('Branding', Star, [{name:'Typewolf',url:'https://www.typewolf.com/'}], 'ecommercebranding'),
      createTopic('Accessibility', UserCheck, [{name:'WCAG for E-commerce',url:'https://www.w3.org/WAI/'}], 'ecommerceaccessibility'),
      createTopic('Empty States', Box, [{name:'Empty States',url:'https://emptystat.es/'}], 'ecommerceemptystates'),
      createTopic('Error States', AlertCircle, [{name:'Form Validation UX',url:'https://baymard.com/blog/checkout-error-messages'}], 'ecommerceerrorstates'),
      createTopic('Loading States', Zap, [{name:'Skeleton Screens',url:'https://uxdesign.cc/'}], 'ecommerceloadingstates'),
      createTopic('Customer Journey', Layers, [{name:'NNG Journey Map',url:'https://www.nngroup.com/'}], 'ecommercecustomerjourney'),
      createTopic('Store Architecture', Network, [{name:'Headless Commerce',url:'https://www.shopify.com/enterprise/headless-commerce'}], 'ecommercestorearchitecture'),
      createTopic('Product Page Design', Layout, [{name:'Baymard PDP Design',url:'https://baymard.com/blog/product-page-design'}], 'ecommerceproductpagedesign'),
      createTopic('Checkout Flow', CreditCard, [{name:'Stripe Elements UX',url:'https://stripe.com/docs/payments/elements'}], 'ecommercecheckoutflow'),
      createTopic('Mobile Responsiveness', MonitorSmartphone, [{name:'Touch Targets',url:'https://developer.apple.com/design/human-interface-guidelines/'}], 'ecommercemobileresponsiveness'),
    ]
  },
  {
    id: 'phase-2-architecture',
    name: 'PHASE 2 — E-COMMERCE ARCHITECTURE',
    topics: [
      createTopic('Tech Stack Selection', Layers, [{name:'Next.js Commerce',url:'https://vercel.com/commerce'}], 'ecommercetechstackselection'),
      createTopic('Cost Estimation', DollarSign, [{name:'Shopify Pricing',url:'https://www.shopify.com/pricing'}], 'ecommercecostestimation'),
      createTopic('E-commerce Fundamentals', BookOpen, [{name:'Dimensional Weight',url:'https://www.fedex.com/en-us/shipping/dimensional-weight.html'}], 'ecommerceecommercefundamentals'),
      createTopic('Build vs Buy (Shopify)', HelpCircle, [{name:'MedusaJS',url:'https://medusajs.com/'}], 'ecommercebuildvsbuyshopify'),
      createTopic('Product Architecture', Package, [{name:'Prisma E-commerce Schema',url:'https://www.prisma.io/'}], 'ecommerceproductarchitecture'),
      createTopic('Inventory Architecture', Database, [{name:'Available to Promise',url:'https://www.inventory-planner.com/'}], 'ecommerceinventoryarchitecture'),
      createTopic('Cart Architecture', ShoppingCart, [{name:'Redis Cart State',url:'https://upstash.com/blog/redis-cart'}], 'ecommercecartarchitecture'),
      createTopic('Checkout Architecture', CreditCard, [{name:'Stripe Tax',url:'https://stripe.com/tax'}], 'ecommercecheckoutarchitecture'),
      createTopic('Payment Architecture', DollarSign, [{name:'Auth & Capture',url:'https://stripe.com/docs/payments/auth-and-capture'}], 'ecommercepaymentarchitecture'),
      createTopic('Customer Accounts', Users, [{name:'Stripe Customer Portal',url:'https://stripe.com/docs/billing/subscriptions/customer-portal'}], 'ecommercecustomeraccounts'),
      createTopic('Shipping Architecture', Truck, [{name:'Shippo API',url:'https://goshippo.com/'}], 'ecommerceshippingarchitecture'),
      createTopic('Search Architecture', Search, [{name:'Algolia E-commerce',url:'https://www.algolia.com/solutions/ecommerce/'}], 'ecommercesearcharchitecture'),
      createTopic('Analytics Architecture', BarChart, [{name:'Facebook CAPI',url:'https://developers.facebook.com/docs/marketing-api/conversions-api/'}], 'ecommerceanalyticsarchitecture'),
    ]
  },
  {
    id: 'phase-3-development',
    name: 'PHASE 3 — DEVELOPMENT',
    topics: [
      createTopic('Database', Database, [{name:'PostgreSQL Data Types',url:'https://www.postgresql.org/docs/'}], 'ecommercedatabase'),
      createTopic('Backend', Server, [{name:'Inngest Background Jobs',url:'https://www.inngest.com/'}], 'ecommercebackend'),
      createTopic('Frontend', Code, [{name:'TanStack Query',url:'https://tanstack.com/query'}], 'ecommercefrontend'),
      createTopic('Payments', DollarSign, [{name:'Stripe Webhooks',url:'https://docs.stripe.com/webhooks'}], 'ecommercepayments'),
      createTopic('Emails', MessageSquare, [{name:'Resend',url:'https://resend.com/'}], 'ecommerceemails'),
      createTopic('Notifications', Activity, [{name:'Slack API',url:'https://api.slack.com/'}], 'ecommercenotifications'),
      createTopic('Search', Search, [{name:'Typesense',url:'https://typesense.org/'}], 'ecommercesearch'),
      createTopic('Analytics', BarChart, [{name:'PostHog',url:'https://posthog.com/'}], 'ecommerceanalytics'),
      createTopic('Testing', CheckSquare, [{name:'Playwright E2E',url:'https://playwright.dev/'}], 'ecommercetesting'),
      createTopic('Documentation', BookOpen, [{name:'Mintlify',url:'https://mintlify.com/'}], 'ecommercedocumentation'),
      createTopic('Products', Package, [{name:'PIM Systems',url:'https://www.salsify.com/'}], 'ecommerceproducts'),
      createTopic('Inventory', List, [{name:'Stripe Orders API',url:'https://stripe.com/docs/api'}], 'ecommerceinventory'),
      createTopic('Cart', ShoppingCart, [{name:'Zustand Persist',url:'https://docs.pmnd.rs/zustand/integrations/persisting-store-data'}], 'ecommercecart'),
      createTopic('Checkout', CreditCard, [{name:'Lob Address Verification',url:'https://www.lob.com/'}], 'ecommercecheckout'),
      createTopic('Orders', Box, [{name:'ShipStation API',url:'https://www.shipstation.com/'}], 'ecommerceorders'),
      createTopic('Customer Accounts', Users, [{name:'NextAuth',url:'https://next-auth.js.org/'}], 'ecommercecustomeraccounts'),
      createTopic('Shipping', Truck, [{name:'EasyPost',url:'https://www.easypost.com/'}], 'ecommerceshipping'),
      createTopic('Wishlist', Heart, [{name:'Local Storage API',url:'https://developer.mozilla.org/'}], 'ecommercewishlist'),
      createTopic('Admin Dashboard', Settings, [{name:'Retool E-commerce CRM',url:'https://retool.com/'}], 'ecommerceadmindashboard'),
    ]
  },
  {
    id: 'phase-4-production',
    name: 'PHASE 4 — PRODUCTION READINESS',
    topics: [
      createTopic('Security', Shield, [{name:'Card Testing Fraud',url:'https://stripe.com/docs/disputes/prevention/card-testing'}], 'ecommercesecurity'),
      createTopic('Performance Optimization', Zap, [{name:'Next.js Image',url:'https://nextjs.org/docs/api-reference/next/image'}], 'ecommerceperformanceoptimization'),
      createTopic('Monitoring', Activity, [{name:'Checkly Synthetic Monitoring',url:'https://www.checklyhq.com/'}], 'ecommercemonitoring'),
      createTopic('Logging', FileText, [{name:'Axiom',url:'https://axiom.co/'}], 'ecommercelogging'),
      createTopic('Error Tracking', AlertCircle, [{name:'LogRocket Session Replay',url:'https://logrocket.com/'}], 'ecommerceerrortracking'),
      createTopic('Rate Limiting', Activity, [{name:'Cloudflare Bot Management',url:'https://www.cloudflare.com/products/bot-management/'}], 'ecommerceratelimiting'),
      createTopic('Caching', Database, [{name:'Vercel Data Cache',url:'https://vercel.com/docs/infrastructure/data-cache'}], 'ecommercecaching'),
      createTopic('Backups', Cloud, [{name:'Postgres Point in Time Recovery',url:'https://supabase.com/docs/guides/platform/backups'}], 'ecommercebackups'),
      createTopic('CI/CD', Rocket, [{name:'Blue/Green Deployments',url:'https://martinfowler.com/bliki/BlueGreenDeployment.html'}], 'ecommercecicd'),
      createTopic('Payment Security', Lock, [{name:'3D Secure',url:'https://stripe.com/docs/payments/3d-secure'}], 'ecommercepaymentsecurity'),
      createTopic('Fraud Prevention', ShieldAlert, [{name:'Stripe Radar',url:'https://stripe.com/radar'}], 'ecommercefraudprevention'),
      createTopic('Scalability Planning', TrendingUp, [{name:'PgBouncer',url:'https://www.pgbouncer.org/'}], 'ecommercescalabilityplanning'),
    ]
  },
  {
    id: 'phase-5-launch',
    name: 'PHASE 5 — STORE LAUNCH',
    topics: [
      createTopic('Privacy Policy', Shield, [{name:'Termly',url:'https://termly.io/'}], 'ecommerceprivacypolicy'),
      createTopic('Terms of Service', FileText, [{name:'Shopify Legal',url:'https://www.shopify.com/tools/policy-generator'}], 'ecommercetermsofservice'),
      createTopic('Product Photography', Star, [{name:'Soolsa Photography',url:'https://soona.co/'}], 'ecommerceproductphotography'),
      createTopic('Product Descriptions', FileText, [{name:'Copywriting Secrets',url:'https://kopywritingkourse.com/'}], 'ecommerceproductdescriptions'),
      createTopic('SEO Setup', Search, [{name:'JSON-LD Product Schema',url:'https://developers.google.com/search/docs/appearance/structured-data/product'}], 'ecommerceseosetup'),
      createTopic('Analytics Setup', BarChart, [{name:'GA4 E-commerce',url:'https://developers.google.com/analytics/devguides/collection/ga4/ecommerce'}], 'ecommerceanalyticssetup'),
      createTopic('Google Merchant Center', Globe, [{name:'Google Shopping Feed',url:'https://support.google.com/merchants/'}], 'ecommercegooglemerchantcenter'),
      createTopic('Shipping Setup', Truck, [{name:'Rollo Printers',url:'https://www.rollo.com/'}], 'ecommerceshippingsetup'),
      createTopic('Taxes Setup', DollarSign, [{name:'TaxJar',url:'https://www.taxjar.com/'}], 'ecommercetaxessetup'),
      createTopic('Legal Documents', FileText, [{name:'Stripe Atlas',url:'https://stripe.com/atlas'}], 'ecommercelegaldocuments'),
      createTopic('Refund Policy', CreditCard, [{name:'Best Refund Policies',url:'https://www.shopify.com/blog/return-policy'}], 'ecommercerefundpolicy'),
      createTopic('Return Policy', RefreshCcw, [{name:'Loop Returns',url:'https://loopreturns.com/'}], 'ecommercereturnpolicy'),
      createTopic('Launch Checklist', ListChecks, [{name:'Pre-launch Checklist',url:'https://www.shopify.com/blog/ecommerce-launch-checklist'}], 'ecommercelaunchchecklist'),
    ]
  },
  {
    id: 'phase-6-growth',
    name: 'PHASE 6 — GROWTH',
    topics: [
      createTopic('Retention', Activity, [{name:'Skio Subscriptions',url:'https://skio.com/'}], 'ecommerceretention'),
      createTopic('Analytics', BarChart, [{name:'Mixpanel E-commerce',url:'https://mixpanel.com/'}], 'ecommerceanalytics'),
      createTopic('Roadmap', Layers, [{name:'Linear',url:'https://linear.app/'}], 'ecommerceroadmap'),
      createTopic('Conversion Optimization', TrendingUp, [{name:'Optimizely',url:'https://www.optimizely.com/'}], 'ecommerceconversionoptimization'),
      createTopic('Upsells', Tag, [{name:'Post-purchase Upsells',url:'https://www.shopify.com/blog/upselling'}], 'ecommerceupsells'),
      createTopic('Cross-Sells', Tag, [{name:'Amazon Cross-selling',url:'https://www.bigcommerce.com/blog/cross-selling/'}], 'ecommercecrosssells'),
      createTopic('Email Marketing', MessageSquare, [{name:'Klaviyo Flows',url:'https://www.klaviyo.com/'}], 'ecommerceemailmarketing'),
      createTopic('Loyalty Programs', Heart, [{name:'Smile.io',url:'https://smile.io/'}], 'ecommerceloyaltyprograms'),
      createTopic('Referrals', Share2, [{name:'ReferralCandy',url:'https://www.referralcandy.com/'}], 'ecommercereferrals'),
      createTopic('Presentation Prep', Presentation),
      createTopic('Pitch Deck', Presentation),
      createTopic('Demo Script', FileText),
      createTopic('Submission Checklist', CheckSquare),
    ]
  }
];

const filterTaxonomy = (keep: string[], hide: string[]) => {
  return ecommerceProductionTaxonomy.map(cat => {
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

export const ecommerceHackathonTaxonomy: Category[] = filterTaxonomy(
  [
    'Welcome', 'Business Definition', 'Store Fundamentals', 'Product Catalog Planning', 'PRD', 'Customer Journey', 'Product Page Design', 
    'Cart', 'Checkout', 'Payments', 'Products', 'Pitch Deck', 'Presentation Prep', 'Demo Script', 'Submission Checklist',
    // Mapped Aliases
    'Store Fundamentals'
  ],
  [
    'Inventory', 'Payment & Fraud Protection', 'E-commerce SEO', 'Shipping', 
    'Shipping Setup', 'Monitoring', 'Scalability Planning', 'Legal Documents'
  ]
);

export const ecommercePersonalTaxonomy: Category[] = filterTaxonomy(
  [],
  [
    'Enterprise Fraud Detection', 'Observability', 'Multi-region Infrastructure',
    'Payment & Fraud Protection', 'Scalability Planning', 'Google Merchant Center'
  ]
);

export const ecommerceCustomTaxonomy = ecommerceProductionTaxonomy;
