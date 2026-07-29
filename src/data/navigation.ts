import { NavItem } from '../types';

export const NAV_MENU: NavItem[] = [
  {
    title: 'Home',
    href: '#home'
  },
  {
    title: 'Services',
    href: '#services',
    children: [
      {
        title: 'Website Maintenance',
        href: '#maintenance',
        description: '24/7 uptime, core updates, and database tuning',
        children: [
          { title: 'Core & Plugin Updates', href: '#maintenance', description: 'Zero-downtime automated & visual testing updates' },
          { title: 'Performance Optimization', href: '#maintenance', description: 'PageSpeed 95+ score tuning & caching setup' },
          { title: '24/7 Uptime Monitoring', href: '#maintenance', description: 'Instant alert dispatch & automated rollback' }
        ]
      },
      {
        title: 'Security & Backup Guard',
        href: '#security',
        description: 'Malware firewall, hack removal, and cloud backup',
        children: [
          { title: 'Malware Removal & Hack Cleanup', href: '#security', description: 'Guaranteed 1-hour malware isolation & clean recovery' },
          { title: 'Web Application Firewall (WAF)', href: '#security', description: 'DDoS mitigation, brute force & bot blocking' },
          { title: 'Cloud Backups & Restore', href: '#security', description: 'Offsite encrypted backups with 1-click restore' }
        ]
      },
      {
        title: 'Bug Fix & Dev Retainers',
        href: '#custom-builder',
        description: 'On-demand senior web engineering support',
        children: [
          { title: 'Emergency Bug Fixes', href: '#custom-builder', description: 'Resolve broken checkouts, forms & JS errors' },
          { title: 'CMS & Theme Upgrades', href: '#custom-builder', description: 'Version migrations & legacy code refactoring' },
          { title: 'Custom Feature Additions', href: '#custom-builder', description: 'API integrations & visual tweaks' }
        ]
      }
    ]
  },
  {
    title: 'SEO Subscriptions',
    href: '#seo-packages',
    badge: 'HOT',
    children: [
      {
        title: 'Local SEO Dominance',
        href: '#seo-packages',
        description: 'Rank #1 in Google Maps & Local Search',
        children: [
          { title: 'Google Business Profile', href: '#seo-packages', description: 'Local Map Pack keyword optimization' },
          { title: 'Local Citations & Reviews', href: '#seo-packages', description: 'Directory submissions & review management' },
          { title: 'Geo-Targeted Landing Pages', href: '#seo-packages', description: 'Hyper-local content strategy' }
        ]
      },
      {
        title: 'National & Global SEO',
        href: '#seo-packages',
        description: 'High-authority ranking campaigns',
        children: [
          { title: 'Technical SEO & Architecture', href: '#seo-packages', description: 'Schema.org, crawlability & indexation' },
          { title: 'High DA Backlink Outreach', href: '#seo-packages', description: 'Contextual niche editorial links' },
          { title: 'Content & Keyword Strategy', href: '#seo-packages', description: 'Search intent blogs & page optimization' }
        ]
      },
      {
        title: 'E-commerce SEO',
        href: '#seo-packages',
        description: 'Drive organic sales for Shopify & Woo',
        children: [
          { title: 'Product & Category Schema', href: '#seo-packages', description: 'Rich snippet review & price badges' },
          { title: 'Conversion Rate SEO', href: '#seo-packages', description: 'User intent & cart drop-off reduction' }
        ]
      }
    ]
  },
  {
    title: 'Pricing & Plans',
    href: '#pricing',
    badge: '40% OFF',
    children: [
      { title: 'All Subscriptions', href: '#pricing', description: 'Compare monthly vs annual discounted packages' },
      { title: 'Custom Package Builder', href: '#custom-builder', description: 'Tailor your maintenance, security & SEO stack' },
      { title: 'Savings Calculator', href: '#calculator', description: 'Calculate ROI and downtime prevention value' }
    ]
  },
  {
    title: 'Free SEO Audit',
    href: '#audit-tool',
    badge: 'FREE'
  },
  {
    title: 'Client Portal',
    href: '#dashboard'
  }
];
