export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeature {
  text: string;
  included: boolean;
  tooltip?: string;
  highlight?: boolean;
}

export interface ServicePlan {
  id: string;
  category: 'maintenance' | 'security' | 'seo' | 'all-in-one';
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  monthlyPrice: number; // monthly price in USD
  yearlyMonthlyPrice: number; // 40% off monthly price when billed yearly (monthlyPrice * 0.6)
  features: PlanFeature[];
  guarantee: string;
  maxSites?: number;
  slaHours?: number;
}

export interface SeoPackage {
  id: string;
  name: string;
  level: 'Local' | 'Growth' | 'Enterprise';
  monthlyPrice: number;
  yearlyMonthlyPrice: number;
  targetKeywords: number;
  monthlyBacklinks: number;
  features: string[];
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
  children?: NavItem[];
}

export interface CustomPackageConfig {
  cms: string;
  sitesCount: number;
  maintenanceTier: string;
  securityTier: string;
  seoTier: string;
  backupFrequency: 'daily' | 'hourly' | 'realtime';
  devHoursPerMonth: number;
  billingCycle: BillingCycle;
}

export interface SubscriptionRecord {
  id: string;
  createdAt: string;
  planName: string;
  category: string;
  billingCycle: BillingCycle;
  amount: number;
  domainName: string;
  clientName: string;
  clientEmail: string;
  status: 'active' | 'pending' | 'cancelled';
  nextBillingDate: string;
  tickets: MaintenanceTicket[];
}

export interface MaintenanceTicket {
  id: string;
  date: string;
  subject: string;
  type: 'Bug Fix' | 'Security Alert' | 'Backup Restore' | 'SEO Request' | 'Content Update';
  status: 'In Progress' | 'Resolved' | 'Pending';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
}

export interface AuditReport {
  id: string;
  url: string;
  createdAt: string;
  overallScore: number;
  speedScore: number;
  securityScore: number;
  seoScore: number;
  mobileScore: number;
  lcp?: string;
  cls?: string;
  ttfb?: string;
  fcp?: string;
  issues: {
    severity: 'critical' | 'warning' | 'pass';
    title: string;
    description: string;
    category: 'Speed' | 'Security' | 'SEO' | 'Code Quality';
  }[];
  recommendedPlanId: string;
}
