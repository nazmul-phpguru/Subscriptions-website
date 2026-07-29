import { generateBreadcrumbSchema } from '../data/schema';

export type RouteHandler = (route: string, params?: Record<string, string>) => void;

interface RouteConfig {
  path: string;
  title: string;
  metaDesc: string;
  breadcrumbs: { title: string; href: string }[];
}

export const ROUTE_CONFIGS: Record<string, RouteConfig> = {
  'home': {
    path: '#home',
    title: 'WebCare & SEO Subscriptions | 24/7 Website Maintenance & Growth Agency',
    metaDesc: 'Subscription-based website maintenance, 24/7 security, daily cloud backups, emergency bug fixes, and organic SEO growth with 40% yearly savings.',
    breadcrumbs: [{ title: 'Home', href: '#home' }]
  },
  'maintenance': {
    path: '#maintenance',
    title: 'Website Maintenance & Speed Subscriptions | WebCare Agency',
    metaDesc: 'Managed WordPress, Shopify & Webflow maintenance. 24/7 uptime monitoring, automated visual regression testing, and core updates.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Services', href: '#services' }, { title: 'Website Maintenance', href: '#maintenance' }]
  },
  'security': {
    path: '#security',
    title: 'Website Security, WAF & Backup Subscriptions | WebCare Agency',
    metaDesc: '24/7 cyber security guard, malware removal, Web Application Firewall, Layer 7 DDoS mitigation, and offsite cloud backups.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Services', href: '#services' }, { title: 'Security & Backup', href: '#security' }]
  },
  'seo-packages': {
    path: '#seo-packages',
    title: 'Monthly & Yearly SEO Subscriptions | WebCare Agency',
    metaDesc: 'Local SEO, Technical SEO, Contextual Link Building & E-commerce organic traffic growth packages with 40% annual billing discount.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'SEO Subscriptions', href: '#seo-packages' }]
  },
  'pricing': {
    path: '#pricing',
    title: 'Subscription Plans & Pricing (Save 40% Billed Yearly) | WebCare Agency',
    metaDesc: 'Transparent subscription package pricing for website care, security, emergency bug fixes, and local/national SEO campaigns.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Pricing & Plans', href: '#pricing' }]
  },
  'custom-builder': {
    path: '#custom-builder',
    title: 'Custom Package Builder & Dev Retainer | WebCare Agency',
    metaDesc: 'Build your custom subscription stack with maintenance, malware protection, custom dev hours, and SEO add-ons.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Pricing', href: '#pricing' }, { title: 'Custom Builder', href: '#custom-builder' }]
  },
  'calculator': {
    path: '#calculator',
    title: 'Website Downtime & Savings Calculator | WebCare Agency',
    metaDesc: 'Calculate your annual ROI, downtime prevention value, and 40% yearly subscription discount.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Pricing', href: '#pricing' }, { title: 'Savings Calculator', href: '#calculator' }]
  },
  'audit-tool': {
    path: '#audit-tool',
    title: 'Free Website Performance, Security & SEO Scanner | WebCare Agency',
    metaDesc: 'Scan your website live for speed bottlenecks, SSL vulnerabilities, mobile responsiveness, and SEO errors in seconds.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Free Audit Tool', href: '#audit-tool' }]
  },
  'dashboard': {
    path: '#dashboard',
    title: 'Client Subscription Portal | WebCare Agency',
    metaDesc: 'Manage active subscriptions, request emergency bug fixes, view real-time uptime status, and download billing invoices.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Client Portal', href: '#dashboard' }]
  },
  'login': {
    path: '#login',
    title: 'Client Login & Account Registration | WebCare Agency Portal',
    metaDesc: 'Log in to your WebCare agency client account or register a new account to manage website subscriptions, SEO campaigns, and support tickets.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Client Access', href: '#login' }]
  },
  'checkout': {
    path: '#checkout',
    title: 'Stripe Sandbox Checkout | WebCare & SEO Agency',
    metaDesc: 'Complete your subscription securely via Stripe Sandbox with 256-bit encryption and 30-day money-back guarantee.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Pricing', href: '#pricing' }, { title: 'Stripe Checkout', href: '#checkout' }]
  },
  'contact': {
    path: '#contact',
    title: 'Contact WebCare Agency | 24/7 Client Support',
    metaDesc: 'Get in touch with our web engineering & SEO strategist team or schedule a free website evaluation call.',
    breadcrumbs: [{ title: 'Home', href: '#home' }, { title: 'Contact Us', href: '#contact' }]
  }
};

class Router {
  private listeners: RouteHandler[] = [];
  private currentRoute: string = 'home';

  constructor() {
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  public init() {
    this.handleHashChange();
  }

  public subscribe(handler: RouteHandler) {
    this.listeners.push(handler);
  }

  public navigate(route: string) {
    const cleanRoute = route.startsWith('#') ? route : `#${route}`;
    if (window.location.hash === cleanRoute) {
      this.handleHashChange();
    } else {
      window.location.hash = cleanRoute;
    }
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  private handleHashChange() {
    let hash = window.location.hash.replace('#', '') || 'home';
    if (!ROUTE_CONFIGS[hash]) {
      hash = 'home';
    }
    this.currentRoute = hash;
    this.updatePageMeta(hash);
    this.notifyListeners(hash);
  }

  private notifyListeners(route: string) {
    this.listeners.forEach(fn => fn(route));
  }

  private updatePageMeta(routeKey: string) {
    const config = ROUTE_CONFIGS[routeKey] || ROUTE_CONFIGS['home'];
    document.title = config.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', config.metaDesc);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);

    // Update Breadcrumb JSON-LD
    let scriptBreadcrumb = document.getElementById('json-ld-breadcrumbs');
    if (!scriptBreadcrumb) {
      scriptBreadcrumb = document.createElement('script');
      scriptBreadcrumb.id = 'json-ld-breadcrumbs';
      scriptBreadcrumb.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptBreadcrumb);
    }
    scriptBreadcrumb.textContent = JSON.stringify(generateBreadcrumbSchema(config.breadcrumbs));
  }
}

export const router = new Router();
