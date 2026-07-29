import { SECURITY_PLANS, calculateAnnualSavings } from '../data/packages';
import { getStoredBillingCycle } from '../utils/storage';

export function renderSecurityView(container: HTMLElement, openCheckout: (planId: string, category: string) => void) {
  const cycle = getStoredBillingCycle();

  container.innerHTML = `
    <section style="padding:var(--space-lg) 0;">
      <div class="container">
        <!-- Header -->
        <div style="text-align:center; max-width:800px; margin:0 auto var(--space-md);">
          <span class="badge-discount" style="margin-bottom:var(--space-xs); display:inline-block">CYBER SECURITY & WAF GUARD</span>
          <h1 class="section-title text-gradient">Website Security & Backup Subscriptions</h1>
          <p class="section-subtitle">
            24/7 Web Application Firewall (WAF), real-time DDoS mitigation, automated offsite cloud backups, and guaranteed 1-hour malware hack cleanup.
          </p>
        </div>

        <!-- Security Threat Shield Banner -->
        <div class="interactive-panel" style="margin-bottom:var(--space-lg); border-color:var(--accent-cyan); background:rgba(6, 182, 212, 0.05);">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div>
              <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main)">
                🛡️ Active Threat Shield & Real-time WAF Protection
              </h3>
              <p style="font-size:var(--font-xs); color:var(--text-muted); margin-top:0.25rem">
                Every month over 30,000 websites are compromised by automated botnet scanners. Our zero-trust WAF blocks malicious payloads before they hit your web server.
              </p>
            </div>
            <div style="text-align:right">
              <span style="font-size:var(--font-lg); font-weight:800; color:var(--accent-emerald)">100% Hack Cleanup</span>
              <div style="font-size:0.65rem; color:var(--text-muted)">Guaranteed or 100% Money Back</div>
            </div>
          </div>
        </div>

        <!-- Plans Grid -->
        <div class="grid-2">
          ${SECURITY_PLANS.map(plan => {
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

                <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-sub-sec" data-plan="${plan.id}" style="width:100%">
                  Subscribe to ${plan.name}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  container.querySelectorAll('.btn-sub-sec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planId = (e.currentTarget as HTMLElement).getAttribute('data-plan');
      if (planId) openCheckout(planId, 'security');
    });
  });
}
