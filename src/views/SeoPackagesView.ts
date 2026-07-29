import { SEO_PLANS, calculateAnnualSavings } from '../data/packages';
import { getStoredBillingCycle } from '../utils/storage';

export function renderSeoPackagesView(container: HTMLElement, openCheckout: (planId: string, category: string) => void) {
  const cycle = getStoredBillingCycle();

  container.innerHTML = `
    <section style="padding:var(--space-lg) 0;">
      <div class="container">
        <!-- Header -->
        <div style="text-align:center; max-width:800px; margin:0 auto var(--space-md);">
          <span class="badge-discount" style="margin-bottom:var(--space-xs); display:inline-block">ORGANIC & LOCAL SEO GROWTH</span>
          <h1 class="section-title text-gradient">SEO Subscription Packages</h1>
          <p class="section-subtitle">
            Local Map Pack dominance, technical Schema.org optimization, intent-based content strategy, and contextual DA 60+ backlinks billed monthly or annually with 40% OFF.
          </p>
        </div>

        <!-- SEO Growth Metrics Banner -->
        <div class="interactive-panel" style="margin-bottom:var(--space-lg); background:linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(15, 22, 35, 0.9) 100%); border-color:var(--accent-amber);">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:var(--gap-grid); text-align:center;">
            <div>
              <div style="font-size:var(--font-2xl); font-weight:800; color:var(--accent-amber)">#1 Rank</div>
              <div style="font-size:var(--font-xs); color:var(--text-muted)">Google Local Map Pack Strategy</div>
            </div>
            <div>
              <div style="font-size:var(--font-2xl); font-weight:800; color:var(--accent-emerald)">+320%</div>
              <div style="font-size:var(--font-xs); color:var(--text-muted)">Avg. Organic Traffic Lift in 6 Mo</div>
            </div>
            <div>
              <div style="font-size:var(--font-2xl); font-weight:800; color:var(--primary)">100% White-Hat</div>
              <div style="font-size:var(--font-xs); color:var(--text-muted)">E-E-A-T & Google Helpful Content</div>
            </div>
          </div>
        </div>

        <!-- SEO Cards Grid -->
        <div class="grid-3">
          ${SEO_PLANS.map(seo => {
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
                  ${cycle === 'yearly' ? `<div class="price-savings">Billed $${price * 12}/yr (Saved $${savings}/yr - 40% OFF)</div>` : `<div style="font-size:var(--font-xs); color:var(--text-dim)">Save $${savings}/yr on annual billing</div>`}
                </div>

                <div style="display:flex; gap:0.5rem; margin-bottom:var(--space-xs); padding:0.5rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-sm)">
                  <div style="flex:1; text-align:center">
                    <div style="font-weight:800; color:var(--accent-amber); font-size:var(--font-md)">${seo.targetKeywords}</div>
                    <div style="font-size:0.65rem; color:var(--text-muted)">Target Keywords</div>
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

                <button class="btn btn-primary btn-sub-seo" data-plan="${seo.id}" style="width:100%">
                  Subscribe to ${seo.name}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  container.querySelectorAll('.btn-sub-seo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planId = (e.currentTarget as HTMLElement).getAttribute('data-plan');
      if (planId) openCheckout(planId, 'seo');
    });
  });
}
