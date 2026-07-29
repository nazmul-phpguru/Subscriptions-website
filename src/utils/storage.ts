import { SubscriptionRecord, MaintenanceTicket, AuditReport, BillingCycle } from '../types';

const KEYS = {
  BILLING_CYCLE: 'webcare_billing_cycle',
  SUBSCRIPTIONS: 'webcare_subscriptions',
  TICKETS: 'webcare_tickets',
  AUDIT_REPORTS: 'webcare_audits',
  SAVED_QUOTE: 'webcare_saved_quote',
  USER_PROFILE: 'webcare_user_profile'
};

export interface UserProfile {
  name: string;
  email: string;
  company: string;
  isLoggedIn: boolean;
  role?: string;
}

export function getStoredBillingCycle(): BillingCycle {
  const saved = localStorage.getItem(KEYS.BILLING_CYCLE);
  return saved === 'yearly' ? 'yearly' : 'monthly';
}

export function setStoredBillingCycle(cycle: BillingCycle): void {
  localStorage.setItem(KEYS.BILLING_CYCLE, cycle);
}

export function getStoredUser(): UserProfile {
  const saved = localStorage.getItem(KEYS.USER_PROFILE);
  if (!saved) {
    const defaultUser: UserProfile = {
      name: 'Alex Mercer',
      email: 'alex@mybusinesssite.com',
      company: 'Acme Corp',
      isLoggedIn: true,
      role: 'VIP Active Client'
    };
    localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(defaultUser));
    return defaultUser;
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return { name: 'Guest Client', email: '', company: '', isLoggedIn: false };
  }
}

export function saveStoredUser(user: UserProfile): void {
  localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent('webcare:authChange', { detail: user }));
}

export function loginUser(email: string, name?: string): UserProfile {
  const current = getStoredUser();
  const updated: UserProfile = {
    ...current,
    email: email || current.email || 'alex@mybusinesssite.com',
    name: name || current.name || 'Alex Mercer',
    isLoggedIn: true
  };
  saveStoredUser(updated);
  return updated;
}

export function logoutUser(): UserProfile {
  const current = getStoredUser();
  const updated: UserProfile = {
    ...current,
    isLoggedIn: false
  };
  saveStoredUser(updated);
  return updated;
}

export function getStoredSubscriptions(): SubscriptionRecord[] {
  const saved = localStorage.getItem(KEYS.SUBSCRIPTIONS);
  if (!saved) {
    // Default initial mock subscription for client portal
    const defaultSub: SubscriptionRecord = {
      id: 'SUB-88421',
      createdAt: new Date().toISOString().split('T')[0],
      planName: 'Growth Shield Maintenance + SEO',
      category: 'maintenance',
      billingCycle: 'yearly',
      amount: 119,
      domainName: 'mybusinesssite.com',
      clientName: 'Alex Mercer',
      clientEmail: 'alex@mybusinesssite.com',
      status: 'active',
      nextBillingDate: '2027-07-28',
      tickets: [
        {
          id: 'TCK-101',
          date: new Date().toISOString().split('T')[0],
          subject: 'Weekly Speed Optimization & Core Update',
          type: 'Bug Fix',
          status: 'Resolved',
          priority: 'Medium'
        },
        {
          id: 'TCK-102',
          date: new Date().toISOString().split('T')[0],
          subject: 'SSL Certificate Auto-Renewal Verification',
          type: 'Security Alert',
          status: 'Resolved',
          priority: 'Low'
        }
      ]
    };
    localStorage.setItem(KEYS.SUBSCRIPTIONS, JSON.stringify([defaultSub]));
    return [defaultSub];
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

export function saveSubscription(subscription: SubscriptionRecord): void {
  const subs = getStoredSubscriptions();
  subs.unshift(subscription);
  localStorage.setItem(KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
}

export function addTicketToSubscription(subscriptionId: string, ticket: MaintenanceTicket): void {
  const subs = getStoredSubscriptions();
  const sub = subs.find(s => s.id === subscriptionId);
  if (sub) {
    sub.tickets.unshift(ticket);
    localStorage.setItem(KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
  }
}

export function saveAuditReport(report: AuditReport): void {
  const reports = getStoredAuditReports();
  reports.unshift(report);
  localStorage.setItem(KEYS.AUDIT_REPORTS, JSON.stringify(reports.slice(0, 5)));
}

export function getStoredAuditReports(): AuditReport[] {
  const saved = localStorage.getItem(KEYS.AUDIT_REPORTS);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (e) {
    return [];
  }
}

export function getSavedQuote(): any {
  const saved = localStorage.getItem(KEYS.SAVED_QUOTE);
  return saved ? JSON.parse(saved) : null;
}

export function saveQuote(quoteData: any): void {
  localStorage.setItem(KEYS.SAVED_QUOTE, JSON.stringify(quoteData));
}
