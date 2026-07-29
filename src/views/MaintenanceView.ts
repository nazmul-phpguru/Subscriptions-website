import { MAINTENANCE_PLANS, calculateAnnualSavings } from '../data/packages';
import { getStoredBillingCycle } from '../utils/storage';

export function renderMaintenanceView(container: HTMLElement, openCheckout: (planId: string, category: string) => void) {
  const cycle = getStoredBillingCycle();

  container.innerHTML = `
    <section style="padding:var(--space-lg) 0;">
      <div class="container">
        <!-- Header -->
        <div style="text-align:center; max-width:800px; margin:0 auto var(--space-md);">
          <span class="badge-discount" style="margin-bottom:var(--space-xs); display:inline-block">MANAGED WEBSITES & SPEED</span>
          <h1 class="section-title text-gradient">Website Maintenance Subscriptions</h1>
          <p class="section-subtitle">
            Hands-off CMS updates, visual regression testing, 24/7 uptime guard, and PageSpeed 95+ score tuning for WordPress, Shopify, Webflow & custom code.
          </p>
        </div>

        <!-- Before vs After Interactive Speed Demonstration -->
        <div class="interactive-panel" style="margin-bottom:var(--space-lg); background:linear-gradient(135deg, rgba(15,22,35,0.9) 0%, rgba(7,10,17,0.95) 100%);">
          <h2 style="font-size:var(--font-md); font-weight:800; text-align:center; margin-bottom:var(--space-sm)">
            ⚡ Google PageSpeed Performance Tuning Guarantee
          </h2>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:var(--gap-grid); align-items:center;">
            <!-- Unoptimized Site -->
            <div style="background:#131822; border:1px solid #ef4444; border-radius:var(--radius-md); padding:var(--space-sm); text-align:center;">
              <div style="color:#ef4444; font-weight:800; font-size:var(--font-xs); margin-bottom:0.25rem;">BEFORE WEBCARE</div>
              <div style="font-size:var(--font-2xl); font-weight:800; color:#ef4444;">42 / 100</div>
              <div style="font-size:var(--font-xs); color:var(--text-muted); margin-top:0.25rem;">Load Time: 4.8s | LCP: 3.9s | CLS: 0.28</div>
              <p style="font-size:0.7rem; color:var(--text-dim); margin-top:0.5rem">Unoptimized images, bloated scripts, slow TTFB, missing database indexes.</p>
            </div>

            <!-- Arrow Indicator -->
            <div style="text-align:center; color:var(--primary); font-weight:800; font-size:var(--font-lg)">
              ➔ WEBCARE OPTIMIZATION ➔
            </div>

            <!-- Optimized Site -->
            <div style="background:#131822; border:1px solid var(--accent-emerald); border-radius:var(--radius-md); padding:var(--space-sm); text-align:center;">
              <div style="color:var(--accent-emerald); font-weight:800; font-size:var(--font-xs); margin-bottom:0.25rem;">AFTER WEBCARE</div>
              <div style="font-size:var(--font-2xl); font-weight:800; color:var(--accent-emerald);">98 / 100</div>
              <div style="font-size:var(--font-xs); color:var(--text-muted); margin-top:0.25rem;">Load Time: 0.6s | LCP: 0.8s | CLS: 0.00</div>
              <p style="font-size:0.7rem; color:var(--text-dim); margin-top:0.5rem">WebP image compression, Redis caching, CSS purge, asset minification.</p>
            </div>
          </div>
        </div>

        <!-- Maintenance Plans Grid -->
        <div class="grid-3">
          ${MAINTENANCE_PLANS.map(plan => {
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
                  ${cycle === 'yearly' ? `<div class="price-savings">Billed $${price * 12}/yr (Saved $${savings}/yr - 40% OFF)</div>` : `<div style="font-size:var(--font-xs); color:var(--text-dim)">Save $${savings}/yr on annual billing</div>`}
                </div>

                <ul class="plan-features">
                  ${plan.features.map(feat => `
                    <li class="feature-item ${feat.included ? 'included' : 'not-included'}">
                      <svg class="feature-icon ${feat.included ? 'check' : 'cross'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        ${feat.included ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M18 6L6 18M6 6l12 12"/>'}
                      </svg>
                      <span class="${feat.highlight ? 'feature-highlight' : ''}">${feat.text}</span>
                    </li>
                  `).join('')}
                </ul>

                <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-sub-maint" data-plan="${plan.id}" style="width:100%">
                  Subscribe to ${plan.name}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  container.querySelectorAll('.btn-sub-maint').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planId = (e.currentTarget as HTMLElement).getAttribute('data-plan');
      if (planId) openCheckout(planId, 'maintenance');
    });
  });
}
