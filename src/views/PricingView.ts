import { MAINTENANCE_PLANS, SECURITY_PLANS, SEO_PLANS, ALL_IN_ONE_BUNDLES, calculateAnnualSavings } from '../data/packages';
import { getStoredBillingCycle, setStoredBillingCycle } from '../utils/storage';
import { BillingCycle } from '../types';

export function renderPricingView(container: HTMLElement, openCheckout: (planId: string, category: string) => void) {
  let billingCycle: BillingCycle = getStoredBillingCycle();
  let selectedTab: 'all' | 'maintenance' | 'security' | 'seo' | 'bundles' = 'all';

  const updateView = () => {
    container.innerHTML = `
      <section style="padding:var(--space-lg) 0;">
        <div class="container">
          <div style="text-align:center; max-width:800px; margin:0 auto var(--space-md);">
            <h1 class="section-title text-gradient">Subscription Plans & Pricing</h1>
            <p class="section-subtitle">
              Select monthly or annual billing. All annual packages include an instant <strong style="color:var(--accent-emerald)">40% discount</strong> on calculations!
            </p>

            <!-- Billing Cycle Switcher -->
            <div class="billing-toggle-wrapper">
              <span class="toggle-label ${billingCycle === 'monthly' ? 'active' : ''}">Monthly Billing</span>
              <label class="switch">
                <input type="checkbox" id="pricing-cycle-toggle" ${billingCycle === 'yearly' ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
              <span class="toggle-label ${billingCycle === 'yearly' ? 'active' : ''}">
                Annual Billing
              </span>
              <span class="badge-discount">Save 40%</span>
            </div>

            <!-- Category Filter Tabs -->
            <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem; flex-wrap:wrap; margin-top:var(--space-sm)">
              <button class="btn ${selectedTab === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-tab" data-tab="all">All Plans</button>
              <button class="btn ${selectedTab === 'maintenance' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-tab" data-tab="maintenance">Website Maintenance</button>
              <button class="btn ${selectedTab === 'security' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-tab" data-tab="security">Security & Backup</button>
              <button class="btn ${selectedTab === 'seo' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-tab" data-tab="seo">SEO Subscriptions</button>
              <button class="btn ${selectedTab === 'bundles' ? 'btn-primary' : 'btn-secondary'} btn-sm filter-tab" data-tab="bundles">360° All-in-One</button>
            </div>
          </div>

          <!-- Section 1: Maintenance Plans -->
          ${(selectedTab === 'all' || selectedTab === 'maintenance') ? `
            <div style="margin-bottom:var(--space-xl)">
              <h2 style="font-size:var(--font-lg); font-weight:800; margin-bottom:var(--space-sm); border-left:4px solid var(--primary); padding-left:0.75rem;">
                Website Maintenance Packages
              </h2>
              <div class="grid-3">
                ${MAINTENANCE_PLANS.map(plan => renderPlanCard(plan, billingCycle)).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Section 2: Security & Backup Plans -->
          ${(selectedTab === 'all' || selectedTab === 'security') ? `
            <div style="margin-bottom:var(--space-xl)">
              <h2 style="font-size:var(--font-lg); font-weight:800; margin-bottom:var(--space-sm); border-left:4px solid var(--accent-cyan); padding-left:0.75rem;">
                Cyber Security & Backup Guard
              </h2>
              <div class="grid-2">
                ${SECURITY_PLANS.map(plan => renderPlanCard(plan, billingCycle)).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Section 3: SEO Packages -->
          ${(selectedTab === 'all' || selectedTab === 'seo') ? `
            <div style="margin-bottom:var(--space-xl)">
              <h2 style="font-size:var(--font-lg); font-weight:800; margin-bottom:var(--space-sm); border-left:4px solid var(--accent-amber); padding-left:0.75rem;">
                Organic & Local SEO Subscriptions
              </h2>
              <div class="grid-3">
                ${SEO_PLANS.map(seo => renderSeoCard(seo, billingCycle)).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Section 4: All in One Bundles -->
          ${(selectedTab === 'all' || selectedTab === 'bundles') ? `
            <div style="margin-bottom:var(--space-xl)">
              <h2 style="font-size:var(--font-lg); font-weight:800; margin-bottom:var(--space-sm); border-left:4px solid var(--accent-emerald); padding-left:0.75rem;">
                360° All-in-One Digital Suite
              </h2>
              <div style="background:var(--bg-card); border:1px solid var(--accent-emerald); border-radius:var(--radius-lg); padding:var(--space-md); display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:var(--gap-grid); align-items:center;">
                <div>
                  <span class="badge-discount" style="margin-bottom:0.5rem; display:inline-block">BEST VALUE BUNDLE</span>
                  <h3 style="font-size:var(--font-xl); font-weight:800">${ALL_IN_ONE_BUNDLES[0].name}</h3>
                  <p style="color:var(--text-muted); font-size:var(--font-xs); margin-top:0.25rem; line-height:1.6">${ALL_IN_ONE_BUNDLES[0].tagline}</p>
                </div>
                <div>
                  <div style="font-size:var(--font-2xl); font-weight:800; color:var(--accent-emerald)">
                    $${billingCycle === 'yearly' ? ALL_IN_ONE_BUNDLES[0].yearlyMonthlyPrice : ALL_IN_ONE_BUNDLES[0].monthlyPrice}<span style="font-size:var(--font-xs); color:var(--text-muted)">/mo</span>
                  </div>
                  <div style="font-size:var(--font-xs); color:var(--accent-emerald); margin-bottom:var(--space-xs)">
                    ${billingCycle === 'yearly' ? `Billed $${ALL_IN_ONE_BUNDLES[0].yearlyMonthlyPrice * 12}/yr (Includes 40% yearly discount)` : `Switch to annual for 40% off`}
                  </div>
                  <button class="btn btn-emerald btn-subscribe" data-plan="${ALL_IN_ONE_BUNDLES[0].id}" data-category="all-in-one" style="width:100%">
                    Subscribe to 360° Suite
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Custom Calculator Banner -->
          <div style="background:linear-gradient(135deg, rgba(30, 58, 110, 0.4) 0%, #090e17 100%); border:1px solid var(--border-accent); border-radius:var(--radius-lg); padding:var(--space-md); text-align:center;">
            <h3 style="font-size:var(--font-lg); font-weight:800; margin-bottom:0.25rem;">Need a Custom Stack or Multi-Site Retainer?</h3>
            <p style="color:var(--text-muted); font-size:var(--font-xs); margin-bottom:var(--space-sm);">
              Use our interactive package builder to combine custom developer hours, multi-domain monitoring, and bespoke SEO campaigns.
            </p>
            <a href="#custom-builder" class="btn btn-primary btn-sm">Launch Custom Package Builder</a>
          </div>
        </div>
      </section>
    `;

    // Handlers
    const toggleInput = container.querySelector('#pricing-cycle-toggle') as HTMLInputElement;
    if (toggleInput) {
      toggleInput.addEventListener('change', (e) => {
        billingCycle = (e.target as HTMLInputElement).checked ? 'yearly' : 'monthly';
        setStoredBillingCycle(billingCycle);
        updateView();
      });
    }

    container.querySelectorAll('.filter-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', (e) => {
        selectedTab = (e.currentTarget as HTMLElement).getAttribute('data-tab') as any;
        updateView();
      });
    });

    container.querySelectorAll('.btn-subscribe').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const planId = (e.currentTarget as HTMLElement).getAttribute('data-plan');
        const category = (e.currentTarget as HTMLElement).getAttribute('data-category');
        if (planId && category) openCheckout(planId, category);
      });
    });
  };

  updateView();
}

function renderPlanCard(plan: any, cycle: BillingCycle) {
  const price = cycle === 'yearly' ? plan.yearlyMonthlyPrice : plan.monthlyPrice;
  const savings = calculateAnnualSavings(plan.monthlyPrice);

  return `
    <div class="plan-card ${plan.popular ? 'popular' : ''}">
      ${plan.badge ? `<div class="plan-card-badge">${plan.badge}</div>` : ''}
      <div class="plan-header">
        <h3 class="plan-title">${plan.name}</h3>
        <p class="plan-tagline">${plan.tagline}</p>
      </div>

      <div class="plan-pricing">
        <div class="price-main">
          <span class="price-amount">$${price}</span>
          <span class="price-period">/ month</span>
        </div>
        ${cycle === 'yearly' ? `
          <div class="price-savings">Billed $${price * 12}/yr (Saved $${savings}/yr - 40% OFF)</div>
        ` : `
          <div style="font-size:var(--font-xs); color:var(--text-dim)">Switch to annual & save $${savings}/yr</div>
        `}
      </div>

      <ul class="plan-features">
        ${plan.features.map((feat: any) => `
          <li class="feature-item ${feat.included ? 'included' : 'not-included'}">
            <svg class="feature-icon ${feat.included ? 'check' : 'cross'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              ${feat.included ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M18 6L6 18M6 6l12 12"/>'}
            </svg>
            <span class="${feat.highlight ? 'feature-highlight' : ''}">${feat.text}</span>
          </li>
        `).join('')}
      </ul>

      <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-subscribe" data-plan="${plan.id}" data-category="${plan.category}" style="width:100%">
        Subscribe Now
      </button>
    </div>
  `;
}

function renderSeoCard(seo: any, cycle: BillingCycle) {
  const price = cycle === 'yearly' ? seo.yearlyMonthlyPrice : seo.monthlyPrice;
  const savings = calculateAnnualSavings(seo.monthlyPrice);

  return `
    <div class="plan-card">
      <div class="plan-header">
        <span class="badge-discount" style="font-size:0.65rem; margin-bottom:0.25rem; display:inline-block">${seo.level} LEVEL</span>
        <h3 class="plan-title">${seo.name}</h3>
      </div>

      <div class="plan-pricing">
        <div class="price-main">
          <span class="price-amount">$${price}</span>
          <span class="price-period">/ month</span>
        </div>
        ${cycle === 'yearly' ? `
          <div class="price-savings">Billed $${price * 12}/yr (Saved $${savings}/yr - 40% OFF)</div>
        ` : `
          <div style="font-size:var(--font-xs); color:var(--text-dim)">Switch to annual & save $${savings}/yr</div>
        `}
      </div>

      <div style="display:flex; gap:0.5rem; margin-bottom:var(--space-xs); padding:0.5rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-sm)">
        <div style="flex:1; text-align:center">
          <div style="font-weight:800; color:var(--accent-amber); font-size:var(--font-md)">${seo.targetKeywords}</div>
          <div style="font-size:0.65rem; color:var(--text-muted)">Keywords</div>
        </div>
        <div style="width:1px; background:var(--border-subtle)"></div>
        <div style="flex:1; text-align:center">
          <div style="font-weight:800; color:var(--primary); font-size:var(--font-md)">${seo.monthlyBacklinks}</div>
          <div style="font-size:0.65rem; color:var(--text-muted)">Backlinks/mo</div>
        </div>
      </div>

      <ul class="plan-features">
        ${seo.features.map((feat: string) => `
          <li class="feature-item included">
            <svg class="feature-icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            <span>${feat}</span>
          </li>
        `).join('')}
      </ul>

      <button class="btn btn-primary btn-subscribe" data-plan="${seo.id}" data-category="seo" style="width:100%">
        Subscribe to ${seo.name}
      </button>
    </div>
  `;
}
