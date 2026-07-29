import { getStoredBillingCycle, setStoredBillingCycle, saveQuote } from '../utils/storage';
import { BillingCycle } from '../types';

export function renderQuoteCalculatorView(container: HTMLElement, openCheckout: (planId: string, category: string) => void) {
  let billingCycle: BillingCycle = getStoredBillingCycle();

  let state = {
    sitesCount: 1,
    cms: 'wordpress',
    maintTier: 199, // Growth level default
    secTier: 169,   // Fortress level default
    devHours: 2,    // 2 extra dev hours ($100/hr base, discounted)
    seoTier: 299,   // Local SEO default
    backupFreq: 'daily'
  };

  const calculateTotals = () => {
    const rawMonthly = (state.maintTier * state.sitesCount) +
                       (state.secTier * state.sitesCount) +
                       state.seoTier +
                       (state.devHours * 45);

    const monthlyCost = billingCycle === 'yearly' ? Math.round(rawMonthly * 0.6) : rawMonthly;
    const annualTotal = monthlyCost * 12;
    const fullPriceAnnual = rawMonthly * 12;
    const totalSavings = fullPriceAnnual - annualTotal;

    return { rawMonthly, monthlyCost, annualTotal, totalSavings };
  };

  const updateView = () => {
    const totals = calculateTotals();

    container.innerHTML = `
      <section style="padding:var(--space-lg) 0;">
        <div class="container" style="max-width:1040px;">
          <!-- Header -->
          <div style="text-align:center; margin-bottom:var(--space-md);">
            <span class="badge-discount" style="margin-bottom:var(--space-xs); display:inline-block">CUSTOM STACK BUILDER</span>
            <h1 class="section-title text-gradient">Custom Package Stack & ROI Calculator</h1>
            <p class="section-subtitle">
              Tailor your website maintenance, security guard, dev hours, and SEO deliverables to your exact requirements.
            </p>

            <!-- Cycle Switcher -->
            <div class="billing-toggle-wrapper">
              <span class="toggle-label ${billingCycle === 'monthly' ? 'active' : ''}">Monthly Billing</span>
              <label class="switch">
                <input type="checkbox" id="calc-cycle-toggle" ${billingCycle === 'yearly' ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
              <span class="toggle-label ${billingCycle === 'yearly' ? 'active' : ''}">
                Annual Billing
              </span>
              <span class="badge-discount">40% OFF</span>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:var(--gap-grid); align-items:start;">
            <!-- Configuration Controls -->
            <div class="interactive-panel">
              <h3 style="font-size:var(--font-md); font-weight:800; margin-bottom:var(--space-sm); border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-xs)">
                1. Configure Stack Parameters
              </h3>

              <!-- Sites Count Slider -->
              <div class="form-group">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem; font-size:var(--font-xs); font-weight:600;">
                  <label class="form-label" style="margin:0">Number of Managed Websites</label>
                  <span style="color:var(--primary); font-weight:800">${state.sitesCount} Site(s)</span>
                </div>
                <input type="range" id="range-sites" min="1" max="10" value="${state.sitesCount}" style="width:100%" />
              </div>

              <!-- CMS Choice -->
              <div class="form-group">
                <label class="form-label">Primary CMS Platform</label>
                <select id="select-cms" class="form-select">
                  <option value="wordpress" ${state.cms === 'wordpress' ? 'selected' : ''}>WordPress / WooCommerce</option>
                  <option value="shopify" ${state.cms === 'shopify' ? 'selected' : ''}>Shopify / Shopify Plus</option>
                  <option value="webflow" ${state.cms === 'webflow' ? 'selected' : ''}>Webflow</option>
                  <option value="custom" ${state.cms === 'custom' ? 'selected' : ''}>Custom Node / React / PHP Stack</option>
                </select>
              </div>

              <!-- Maintenance Tier -->
              <div class="form-group">
                <label class="form-label">Website Maintenance Tier</label>
                <select id="select-maint" class="form-select">
                  <option value="99" ${state.maintTier === 99 ? 'selected' : ''}>Starter Care ($99/mo base)</option>
                  <option value="199" ${state.maintTier === 199 ? 'selected' : ''}>Growth Shield ($199/mo base - Recommended)</option>
                  <option value="399" ${state.maintTier === 399 ? 'selected' : ''}>Pro Enterprise ($399/mo base)</option>
                </select>
              </div>

              <!-- Security Tier -->
              <div class="form-group">
                <label class="form-label">Cyber Security & WAF Tier</label>
                <select id="select-sec" class="form-select">
                  <option value="0" ${state.secTier === 0 ? 'selected' : ''}>None</option>
                  <option value="79" ${state.secTier === 79 ? 'selected' : ''}>CyberShield Basic ($79/mo base)</option>
                  <option value="169" ${state.secTier === 169 ? 'selected' : ''}>Fortress Zero-Trust ($169/mo base)</option>
                </select>
              </div>

              <!-- On-demand Dev Hours -->
              <div class="form-group">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem; font-size:var(--font-xs); font-weight:600;">
                  <label class="form-label" style="margin:0">Extra On-Demand Dev Hours / Mo</label>
                  <span style="color:var(--accent-cyan); font-weight:800">${state.devHours} Hours</span>
                </div>
                <input type="range" id="range-dev" min="0" max="20" value="${state.devHours}" style="width:100%" />
              </div>

              <!-- SEO Subscriptions -->
              <div class="form-group">
                <label class="form-label">SEO Campaign Module</label>
                <select id="select-seo" class="form-select">
                  <option value="0" ${state.seoTier === 0 ? 'selected' : ''}>None</option>
                  <option value="299" ${state.seoTier === 299 ? 'selected' : ''}>Local Dominance SEO ($299/mo base)</option>
                  <option value="599" ${state.seoTier === 599 ? 'selected' : ''}>National Growth SEO ($599/mo base)</option>
                  <option value="1199" ${state.seoTier === 1199 ? 'selected' : ''}>Global Organic Domination ($1199/mo base)</option>
                </select>
              </div>
            </div>

            <!-- Price Breakdown Summary Panel -->
            <div class="interactive-panel" style="border-color:var(--primary); background:linear-gradient(180deg, rgba(30, 58, 110, 0.2) 0%, var(--bg-card) 100%);">
              <h3 style="font-size:var(--font-md); font-weight:800; margin-bottom:var(--space-sm); border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-xs)">
                2. Live Subscription Summary
              </h3>

              <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:var(--font-xs); margin-bottom:var(--space-md)">
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted)">Managed Websites (${state.sitesCount}):</span>
                  <span style="font-weight:600">$${state.maintTier * state.sitesCount}/mo</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted)">Security WAF Guard:</span>
                  <span style="font-weight:600">$${state.secTier * state.sitesCount}/mo</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted)">SEO Campaign Package:</span>
                  <span style="font-weight:600">$${state.seoTier}/mo</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted)">Dev Hours (${state.devHours} hrs):</span>
                  <span style="font-weight:600">$${state.devHours * 45}/mo</span>
                </div>

                <div style="border-top:1px dashed var(--border-subtle); padding-top:0.6rem; margin-top:0.2rem">
                  <div style="display:flex; justify-content:space-between; align-items:baseline;">
                    <span style="font-weight:700">Calculated Rate:</span>
                    <div>
                      <span style="font-size:var(--font-xl); font-weight:800; color:var(--text-main)">$${totals.monthlyCost}</span>
                      <span style="color:var(--text-muted)">/ month</span>
                    </div>
                  </div>

                  ${billingCycle === 'yearly' ? `
                    <div style="font-size:var(--font-xs); color:var(--accent-emerald); font-weight:700; margin-top:4px;">
                      ✓ 40% Annual Discount Applied! (Saved $${totals.totalSavings}/year)
                    </div>
                  ` : `
                    <div style="font-size:var(--font-xs); color:var(--text-dim); margin-top:4px;">
                      Switch to Annual & Save $${totals.totalSavings} instantly!
                    </div>
                  `}
                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:0.6rem;">
                <button class="btn btn-emerald" id="btn-subscribe-custom" style="width:100%;">
                  Subscribe to Custom Stack ($${totals.monthlyCost}/mo)
                </button>
                <button class="btn btn-secondary btn-sm" id="btn-save-quote" style="width:100%;">
                  Save Quote in LocalStorage
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Event Handlers
    const toggleInput = container.querySelector('#calc-cycle-toggle') as HTMLInputElement;
    if (toggleInput) {
      toggleInput.addEventListener('change', (e) => {
        billingCycle = (e.target as HTMLInputElement).checked ? 'yearly' : 'monthly';
        setStoredBillingCycle(billingCycle);
        updateView();
      });
    }

    const rangeSites = container.querySelector('#range-sites') as HTMLInputElement;
    if (rangeSites) {
      rangeSites.addEventListener('input', (e) => {
        state.sitesCount = parseInt((e.target as HTMLInputElement).value) || 1;
        updateView();
      });
    }

    const rangeDev = container.querySelector('#range-dev') as HTMLInputElement;
    if (rangeDev) {
      rangeDev.addEventListener('input', (e) => {
        state.devHours = parseInt((e.target as HTMLInputElement).value) || 0;
        updateView();
      });
    }

    const selectCms = container.querySelector('#select-cms') as HTMLSelectElement;
    if (selectCms) {
      selectCms.addEventListener('change', (e) => {
        state.cms = (e.target as HTMLSelectElement).value;
      });
    }

    const selectMaint = container.querySelector('#select-maint') as HTMLSelectElement;
    if (selectMaint) {
      selectMaint.addEventListener('change', (e) => {
        state.maintTier = parseInt((e.target as HTMLSelectElement).value);
        updateView();
      });
    }

    const selectSec = container.querySelector('#select-sec') as HTMLSelectElement;
    if (selectSec) {
      selectSec.addEventListener('change', (e) => {
        state.secTier = parseInt((e.target as HTMLSelectElement).value);
        updateView();
      });
    }

    const selectSeo = container.querySelector('#select-seo') as HTMLSelectElement;
    if (selectSeo) {
      selectSeo.addEventListener('change', (e) => {
        state.seoTier = parseInt((e.target as HTMLSelectElement).value);
        updateView();
      });
    }

    const saveQuoteBtn = container.querySelector('#btn-save-quote');
    if (saveQuoteBtn) {
      saveQuoteBtn.addEventListener('click', () => {
        saveQuote({ state, totals, billingCycle, savedAt: new Date().toLocaleDateString() });
        alert('Custom quote configuration saved to LocalStorage!');
      });
    }

    const subCustomBtn = container.querySelector('#btn-subscribe-custom');
    if (subCustomBtn) {
      subCustomBtn.addEventListener('click', () => {
        openCheckout('custom-stack', 'all-in-one');
      });
    }
  };

  updateView();
}
