import { ServicePlan, SeoPackage } from '../types';

export const YEARLY_DISCOUNT_PERCENT = 40; // 40% OFF for yearly

export function calculateYearlyMonthlyPrice(monthlyPrice: number): number {
  return Math.round(monthlyPrice * (1 - YEARLY_DISCOUNT_PERCENT / 100));
}

export function calculateAnnualTotal(monthlyPrice: number, billingCycle: 'monthly' | 'yearly'): number {
  if (billingCycle === 'yearly') {
    return calculateYearlyMonthlyPrice(monthlyPrice) * 12;
  }
  return monthlyPrice * 12;
}

export function calculateAnnualSavings(monthlyPrice: number): number {
  const fullYearCost = monthlyPrice * 12;
  const discountedYearCost = calculateAnnualTotal(monthlyPrice, 'yearly');
  return fullYearCost - discountedYearCost;
}

export const MAINTENANCE_PLANS: ServicePlan[] = [
  {
    id: 'maint-starter',
    category: 'maintenance',
    name: 'Starter Care',
    tagline: 'Essential maintenance & core security for small business websites',
    monthlyPrice: 99,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(99), // $59/mo billed yearly
    guarantee: '24/7 Uptime & Weekly Backups',
    slaHours: 24,
    features: [
      { text: 'Weekly Cloud Backups (Offsite)', included: true },
      { text: 'CMS & Plugin Core Updates', included: true },
      { text: '24/7 Uptime Monitoring (1-min checks)', included: true },
      { text: 'Basic Malware Scanning & SSL Monitoring', included: true },
      { text: '1 Hour Dev & Bug Fix / month', included: true, highlight: true },
      { text: 'Monthly Performance & Executive Report', included: true },
      { text: 'Web Application Firewall (WAF)', included: false },
      { text: 'Dedicated Account Manager', included: false }
    ]
  },
  {
    id: 'maint-growth',
    category: 'maintenance',
    name: 'Growth Shield',
    tagline: 'Complete website maintenance, security hardening & monthly optimization',
    badge: 'MOST POPULAR',
    popular: true,
    monthlyPrice: 199,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(199), // $119/mo billed yearly
    guarantee: '2-Hour Emergency SLA & Free Hack Cleanup',
    slaHours: 4,
    features: [
      { text: 'Daily Cloud Backups with 30-day Retention', included: true },
      { text: 'Managed CMS, Plugin & Security Patches', included: true },
      { text: 'Real-time Security Guard & Hack Cleanup', included: true, highlight: true },
      { text: 'Database Cleanup & Speed Tuning', included: true },
      { text: '3 Hours Dev, Design & Bug Fix / month', included: true, highlight: true },
      { text: 'Form & Checkout Testing Verification', included: true },
      { text: 'Web Application Firewall (WAF)', included: true },
      { text: 'Priority Slack / Email Support', included: true }
    ]
  },
  {
    id: 'maint-pro',
    category: 'maintenance',
    name: 'Pro Enterprise',
    tagline: 'High-traffic e-commerce, custom stack & mission-critical SLA protection',
    badge: 'ENTERPRISE SLA',
    monthlyPrice: 399,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(399), // $239/mo billed yearly
    guarantee: '30-Minute Emergency SLA & Dedicated Engineer',
    slaHours: 1,
    features: [
      { text: 'Real-Time Hourly Cloud Backups (Instant Rollback)', included: true },
      { text: 'Staging Environment Visual Testing', included: true },
      { text: 'Zero-Downtime Patching & Security Guard', included: true },
      { text: 'PageSpeed 90+ Score Guarantee', included: true, highlight: true },
      { text: '8 Hours Dev, Custom Bug Fix & Feature Enhancements', included: true, highlight: true },
      { text: 'Full E-commerce Checkout & API Guard', included: true },
      { text: 'Dedicated Senior DevOps & Web Engineer', included: true },
      { text: '24/7 Hotline & Emergency Phone Support', included: true }
    ]
  }
];

export const SECURITY_PLANS: ServicePlan[] = [
  {
    id: 'sec-shield',
    category: 'security',
    name: 'CyberShield Basic',
    tagline: 'Essential malware firewall & proactive vulnerability monitoring',
    monthlyPrice: 79,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(79), // $47/mo
    guarantee: 'Malware Free Guarantee',
    features: [
      { text: 'Web Application Firewall (Cloudflare / Sucuri DNS)', included: true },
      { text: 'Daily Malware & Vulnerability Scans', included: true },
      { text: 'SSL Certificate Auto-Renewal & HSTS Enforcer', included: true },
      { text: 'Brute Force & Bot Attack Blocker', included: true },
      { text: 'Single Hack Remediation / Year', included: true },
      { text: 'DDoS Protection (Layer 7)', included: false }
    ]
  },
  {
    id: 'sec-fortress',
    category: 'security',
    name: 'Fortress Zero-Trust',
    tagline: 'Advanced cyber security, immediate hack removal & active threat blocking',
    badge: 'MAX PROTECTION',
    popular: true,
    monthlyPrice: 169,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(169), // $101/mo
    guarantee: 'Guaranteed 1-Hour Hack Removal or Money Back',
    features: [
      { text: 'Enterprise WAF & DDoS Mitigation', included: true },
      { text: 'Real-time File Change Detection & Isolation', included: true },
      { text: 'Unlimited Free Virus & Hack Removal', included: true, highlight: true },
      { text: 'Google Blacklist Removal & Clean Resubmission', included: true },
      { text: 'Database Hardening & Security Headers Enforcement', included: true },
      { text: 'Monthly Penetration Test Summary', included: true }
    ]
  }
];

export const SEO_PLANS: SeoPackage[] = [
  {
    id: 'seo-local',
    name: 'Local Dominance SEO',
    level: 'Local',
    monthlyPrice: 299,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(299), // $179/mo billed yearly
    targetKeywords: 15,
    monthlyBacklinks: 5,
    features: [
      'Google Business Profile (GBP) Optimization',
      'Local Map Pack Ranking Strategy',
      '15 Target Local Keywords Tracked',
      '5 High DA Local Citations & Backlinks / month',
      'On-Page Schema.org Structured Data Injection',
      'Monthly Ranking & Call Lead Reports'
    ]
  },
  {
    id: 'seo-growth',
    name: 'National Growth SEO',
    level: 'Growth',
    monthlyPrice: 599,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(599), // $359/mo billed yearly
    targetKeywords: 40,
    monthlyBacklinks: 15,
    features: [
      'Technical SEO Audit & Core Web Vitals Fixes',
      '40 High-Intent Keyword Strategy',
      '15 High-Authority Contextual Backlinks / month',
      '2 Optimized Blog Content Articles / month',
      'Competitor Keyword Gap Analysis',
      'Bi-Weekly Ranking Updates & Analytics Dashboard'
    ]
  },
  {
    id: 'seo-enterprise',
    name: 'Global Organic Domination',
    level: 'Enterprise',
    monthlyPrice: 1199,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(1199), // $719/mo billed yearly
    targetKeywords: 100,
    monthlyBacklinks: 35,
    features: [
      'Full Technical, E-E-A-T & Architecture SEO',
      '100+ Commercial & Informational Keywords',
      '35 Premium DA 60+ Backlink Outreach Campaign',
      '4 In-Depth SEO Optimized Articles / month',
      'E-commerce Product & Category Schema Optimization',
      'Dedicated Senior SEO Strategist & Weekly Calls'
    ]
  }
];

export const ALL_IN_ONE_BUNDLES = [
  {
    id: 'bundle-complete-care',
    name: '360° Total Digital Suite',
    tagline: 'Website Maintenance + Security Fortress + National SEO combined at maximum value',
    badge: '40% OFF YEARLY + EXTRA 15% BUNDLE SAVINGS',
    popular: true,
    monthlyPrice: 899,
    yearlyMonthlyPrice: calculateYearlyMonthlyPrice(899), // $539/mo
    features: [
      'Includes Growth Shield Maintenance ($199 value)',
      'Includes Fortress Zero-Trust Security ($169 value)',
      'Includes National Growth SEO ($599 value)',
      '5 Hours Included Monthly Dev & Design Requests',
      'Priority 1-Hour SLA Emergency Hotline',
      'Single Consolidated Monthly or Annual Invoice'
    ]
  }
];

export const ADDONS = [
  { id: 'addon-speed', name: 'Speed Boost 95+ PageSpeed Guarantee', price: 149, unit: 'one-time' },
  { id: 'addon-dev', name: 'Extra On-Demand Dev Block (5 Hours)', price: 250, unit: 'per month' },
  { id: 'addon-backlink', name: 'Premium DA 60+ Niche Backlink Pack (+5)', price: 299, unit: 'per month' },
  { id: 'addon-staging', name: 'Isolated Staging Server & Sync Pipeline', price: 49, unit: 'per month' }
];

export const CLIENT_REVIEWS = [
  {
    quote: "Switching to WebCare saved our online store during Black Friday. Their 24/7 uptime guard and instant bug fixes kept our checkout 100% operational while processing $450k in sales.",
    author: "Marcus Vance",
    role: "E-commerce Director, Vance Fashion",
    rating: 5,
    metrics: "99.99% Uptime | +140% Organic Sales"
  },
  {
    quote: "Our WordPress site was infected with malware that crashed our Google Search rankings. WebCare cleaned the hack in 40 minutes and boosted our PageSpeed score from 42 to 98!",
    author: "Elena Rostova",
    role: "Founder, Apex Legal Partners",
    rating: 5,
    metrics: "PageSpeed 98/100 | #1 Local Google Pack"
  },
  {
    quote: "The 40% yearly savings made their Enterprise SEO and Maintenance package an absolute no-brainer. We get dedicated senior developers and top ranking keywords for less than one in-house salary.",
    author: "David Chen",
    role: "CTO, CloudPulse SaaS",
    rating: 5,
    metrics: "45 Top 3 Keyword Rankings | 0% Downtime"
  },
  {
    quote: "Their emergency response SLA is real. When our SSL certificate expired on a Sunday night, their automated monitor renewed it before a single customer noticed an error.",
    author: "Sarah Jenkins",
    role: "Operations VP, BioHealth Labs",
    rating: 5,
    metrics: "15 Min Emergency SLA | Zero Security Incidents"
  },
  {
    quote: "In 6 months of their National SEO Growth plan, our organic inbound leads grew by 210%. The weekly reports and keyword tracking give our executive board complete visibility.",
    author: "Robert Sterling",
    role: "Marketing Head, Nexa Capital",
    rating: 5,
    metrics: "+210% Organic Inbound | 80+ Keywords Ranked"
  },
  {
    quote: "Hands down the best website maintenance service on the market. From daily offsite cloud backups to core updates, everything runs seamlessly on autopilot.",
    author: "Aisha Patel",
    role: "Founder, Artisan Digital Agency",
    rating: 5,
    metrics: "100% Core Updates Tested | 12 Sites Managed"
  }
];

export const FAQS = [
  {
    q: "How does the 40% yearly subscription discount work?",
    a: "When you choose Annual Billing on any of our Maintenance, Security, Bug Fix, or SEO plans, your equivalent monthly rate is automatically reduced by 40%. For example, a $199/month package becomes just $119/month when paid yearly ($1,428/year instead of $2,388/year—saving you $960 annually!)."
  },
  {
    q: "What types of websites and CMS platforms do you support?",
    a: "We support WordPress, WooCommerce, Shopify, Webflow, Custom Node/React/Vue apps, PHP, Laravel, Magento, Wix, Squarespace, and custom HTML/CSS stacks. Our engineers are certified across multi-stack infrastructure."
  },
  {
    q: "What is guaranteed in your Emergency Response SLA?",
    a: "Depending on your plan, our team responds to critical site outages, security breaches, or checkout failures within 30 minutes to 2 hours, 24/7/365. We begin immediate rollbacks, malware isolation, and server patches."
  },
  {
    q: "Can I upgrade, downgrade, or pause my subscription anytime?",
    a: "Yes! You can adjust your plan tier or add-ons directly from your client dashboard at any time. Unused dev hours roll over for active subscribers."
  },
  {
    q: "How do SEO subscription deliverables get reported?",
    a: "Every 30 days (and live in your portal), you receive an executive PDF report detailing keyword rank changes, organic traffic growth, backlink acquisition proofs, technical audit scores, and completed on-page enhancements."
  }
];
