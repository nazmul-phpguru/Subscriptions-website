import { MAINTENANCE_PLANS, SECURITY_PLANS, SEO_PLANS, ALL_IN_ONE_BUNDLES } from '../data/packages';
import { getStoredBillingCycle, saveSubscription } from '../utils/storage';
import { SubscriptionRecord } from '../types';
import { router } from '../utils/router';

let currentPlanId = 'maint-growth';
let currentCategory = 'maintenance';

export function setPendingCheckoutPlan(planId: string, category: string) {
  currentPlanId = planId;
  currentCategory = category;
  localStorage.setItem('webcare_checkout_plan', JSON.stringify({ planId, category }));
}

export function getPendingCheckoutPlan() {
  const saved = localStorage.getItem('webcare_checkout_plan');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
  }
  return { planId: currentPlanId, category: currentCategory };
}

export function renderStripeCheckoutView(container: HTMLElement) {
  const { planId, category } = getPendingCheckoutPlan();
  const cycle = getStoredBillingCycle();

  // Find selected plan
  let planObj: any = null;
  if (category === 'maintenance') planObj = MAINTENANCE_PLANS.find(p => p.id === planId);
  else if (category === 'security') planObj = SECURITY_PLANS.find(p => p.id === planId);
  else if (category === 'seo') planObj = SEO_PLANS.find(p => p.id === planId);
  else if (category === 'all-in-one') planObj = ALL_IN_ONE_BUNDLES.find(p => p.id === planId);

  if (!planObj) {
    planObj = MAINTENANCE_PLANS[1]; // fallback Growth Shield
  }

  const basePrice = planObj.monthlyPrice || 199;
  const finalMonthly = cycle === 'yearly' ? (planObj.yearlyMonthlyPrice || Math.round(basePrice * 0.6)) : basePrice;
  const totalBilledToday = cycle === 'yearly' ? finalMonthly * 12 : finalMonthly;
  const annualSavings = (basePrice - finalMonthly) * 12;

  let activeMethod = 'stripe-card';

  const render = () => {
    container.innerHTML = `
      <section style="padding:var(--space-md) 0 var(--space-xl) 0; background:radial-gradient(circle at 50% 0%, #0d172a 0%, var(--bg-dark) 80%);">
        <div class="container" style="max-width:1120px;">

          <!-- Top Navigation Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-md); flex-wrap:wrap; gap:1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-sm)">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <span class="stripe-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  STRIPE SANDBOX
                </span>
                <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700">● 256-Bit SSL Encrypted</span>
              </div>
              <h1 class="section-title text-gradient" style="margin-bottom:2px;">Complete WebCare Subscription</h1>
              <p style="font-size:var(--font-xs); color:var(--text-muted)">Activate 24/7 website protection, automated backups, and instant SLA emergency support.</p>
            </div>

            <a href="#pricing" class="btn btn-secondary btn-sm">
              ← Back to Pricing Plans
            </a>
          </div>

          <!-- Checkout Grid Layout (No Popup / No Scrollbars) -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:var(--gap-grid); align-items:start;">

            <!-- LEFT COLUMN: Order & Subscription Summary -->
            <div>
              <div class="interactive-panel" style="border-top:3px solid var(--primary); margin-bottom:var(--space-sm);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:var(--space-xs);">
                  <div>
                    <span class="badge-discount" style="font-size:0.6rem">SELECTED PLAN</span>
                    <h3 style="font-size:var(--font-lg); font-weight:800; color:var(--text-main); margin-top:2px;">
                      ${planObj.name}
                    </h3>
                  </div>
                  <span class="badge-discount" style="font-size:0.65rem; background:${cycle === 'yearly' ? 'linear-gradient(135deg, #10b981, #059669)' : 'var(--primary)'}">
                    ${cycle === 'yearly' ? '40% OFF Yearly' : 'Monthly Plan'}
                  </span>
                </div>

                <p style="font-size:var(--font-xs); color:var(--text-muted); margin-bottom:var(--space-sm); line-height:1.5;">
                  ${planObj.tagline || 'Managed website maintenance, security guard & optimization.'}
                </p>

                <!-- Pricing Line Item Breakdown -->
                <div style="background:#090e17; padding:var(--space-sm); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:var(--space-sm)">
                  <div style="display:flex; justify-content:space-between; font-size:var(--font-xs); margin-bottom:0.4rem;">
                    <span style="color:var(--text-muted)">Billing Cycle:</span>
                    <span style="font-weight:700; color:var(--text-main); text-transform:capitalize">${cycle} Billing</span>
                  </div>

                  <div style="display:flex; justify-content:space-between; font-size:var(--font-xs); margin-bottom:0.4rem;">
                    <span style="color:var(--text-muted)">Effective Rate:</span>
                    <span style="font-weight:800; font-size:var(--font-sm); color:var(--text-main)">$${finalMonthly}/month</span>
                  </div>

                  ${cycle === 'yearly' ? `
                    <div style="display:flex; justify-content:space-between; font-size:var(--font-xs); color:var(--accent-emerald); font-weight:700; padding:0.4rem 0; border-top:1px dashed var(--border-subtle)">
                      <span>Annual Discount (40% OFF):</span>
                      <span>-$${annualSavings}/year</span>
                    </div>
                  ` : ''}

                  <div style="display:flex; justify-content:space-between; font-size:var(--font-sm); font-weight:800; padding-top:0.5rem; border-top:1px solid var(--border-subtle); color:var(--accent-cyan)">
                    <span>Total Billed Today:</span>
                    <span>$${totalBilledToday} USD</span>
                  </div>
                </div>

                <!-- SLA & Included Features Highlights -->
                <div style="margin-bottom:var(--space-xs)">
                  <div style="font-size:0.7rem; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem; text-transform:uppercase; letter-spacing:0.05em">
                    ✓ What's Included in Your Subscription:
                  </div>
                  <ul style="list-style:none; display:flex; flex-direction:column; gap:0.35rem; font-size:var(--font-xs); color:var(--text-main);">
                    <li style="display:flex; align-items:center; gap:0.4rem;">
                      <span style="color:var(--accent-emerald)">✓</span> 24/7/365 Uptime Shield & Cloud Backups
                    </li>
                    <li style="display:flex; align-items:center; gap:0.4rem;">
                      <span style="color:var(--accent-emerald)">✓</span> Web Application Firewall (WAF) & Zero-Day Patching
                    </li>
                    <li style="display:flex; align-items:center; gap:0.4rem;">
                      <span style="color:var(--accent-emerald)">✓</span> Emergency Bug Fix SLA (Response under 30 Mins)
                    </li>
                    <li style="display:flex; align-items:center; gap:0.4rem;">
                      <span style="color:var(--accent-emerald)">✓</span> Instant Access to Client Support Portal
                    </li>
                  </ul>
                </div>

                <!-- Guarantee Badge -->
                <div style="padding:0.6rem; background:rgba(59, 130, 246, 0.08); border:1px solid rgba(59, 130, 246, 0.2); border-radius:var(--radius-sm); font-size:0.7rem; color:var(--primary); font-weight:600">
                  🔒 30-Day Unconditional Money-Back Guarantee. Cancel or adjust anytime from your Client Portal.
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: Stripe Sandbox Payment Element -->
            <div>
              <div class="interactive-panel" style="border:1px solid var(--border-accent); box-shadow:var(--shadow-glow);">
                
                <!-- Stripe Header Header -->
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-sm); border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-xs)">
                  <div style="display:flex; align-items:center; gap:0.5rem">
                    <span style="font-weight:900; font-size:1.1rem; letter-spacing:-0.03em; color:#635bff">stripe</span>
                    <span style="font-size:0.65rem; padding:0.1rem 0.4rem; background:rgba(99, 91, 255, 0.15); color:#818cf8; border-radius:4px; font-weight:700">SANDBOX TEST MODE</span>
                  </div>
                  <span style="font-size:0.65rem; color:var(--text-muted)">Secure Checkout</span>
                </div>

                <!-- Payment Method Selector Tabs -->
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.4rem; margin-bottom:var(--space-sm)">
                  <button type="button" class="pay-tab ${activeMethod === 'stripe-card' ? 'active' : ''}" id="tab-card">
                    💳 Card
                  </button>
                  <button type="button" class="pay-tab ${activeMethod === 'apple-pay' ? 'active' : ''}" id="tab-apple">
                    🍏 Apple/GPay
                  </button>
                  <button type="button" class="pay-tab ${activeMethod === 'invoice' ? 'active' : ''}" id="tab-invoice">
                    🏦 Invoice
                  </button>
                </div>

                <!-- Stripe Auto-Fill Test Card Trigger -->
                <div style="margin-bottom:var(--space-sm); background:rgba(99, 91, 255, 0.08); border:1px dashed rgba(99, 91, 255, 0.3); padding:0.5rem 0.75rem; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center; gap:0.5rem">
                  <div style="font-size:0.65rem; color:#a5b4fc">
                    <strong>Stripe Test Card:</strong> <code>4242 •••• •••• 4242</code>
                  </div>
                  <button type="button" id="btn-autofill-stripe" class="btn btn-secondary btn-sm" style="font-size:0.65rem; padding:0.2rem 0.5rem">
                    ⚡ Auto-Fill Test Card
                  </button>
                </div>

                <!-- Stripe Payment Form -->
                <form id="stripe-checkout-form">
                  <div class="form-group">
                    <label class="form-label">Client Full Name</label>
                    <input type="text" id="chk-name" class="form-input" required placeholder="Alex Mercer" value="Alex Mercer" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Client Email (For Portal & Billing Receipts)</label>
                    <input type="email" id="chk-email" class="form-input" required placeholder="alex@mybusiness.com" value="alex@mybusiness.com" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Website Domain To Protect & Monitor</label>
                    <input type="text" id="chk-domain" class="form-input" required placeholder="mybusinesssite.com" value="mybusinesssite.com" />
                  </div>

                  <!-- Simulated Stripe Credit Card Element Container -->
                  <div class="form-group">
                    <label class="form-label" style="display:flex; justify-content:space-between;">
                      <span>Card Details (Stripe Elements)</span>
                      <span style="color:var(--text-dim); font-weight:normal">🔒 Encrypted</span>
                    </label>

                    <div style="background:#060a12; border:1px solid var(--border-accent); border-radius:var(--radius-sm); padding:0.6rem 0.75rem; display:flex; flex-direction:column; gap:0.5rem">
                      <!-- Card Number -->
                      <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.03); padding:0.4rem 0.6rem; border-radius:4px; border:1px solid var(--border-subtle)">
                        <input type="text" id="stripe-card-num" style="background:none; border:none; color:var(--text-main); font-family:monospace; font-size:var(--font-sm); width:100%; outline:none;" placeholder="4242 4242 4242 4242" value="4242 4242 4242 4242" required />
                        <svg width="28" height="18" viewBox="0 0 36 24" fill="none"><rect width="36" height="24" rx="3" fill="#252f3e"/><circle cx="13" cy="12" r="7" fill="#eb001b" fill-opacity="0.8"/><circle cx="23" cy="12" r="7" fill="#f79e1b" fill-opacity="0.8"/></svg>
                      </div>

                      <!-- Exp + CVC + Zip -->
                      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem">
                        <input type="text" id="stripe-card-exp" class="form-input" style="padding:0.4rem; font-size:0.75rem; text-align:center;" placeholder="MM / YY" value="12 / 28" required />
                        <input type="text" id="stripe-card-cvc" class="form-input" style="padding:0.4rem; font-size:0.75rem; text-align:center;" placeholder="CVC" value="123" required />
                        <input type="text" id="stripe-card-zip" class="form-input" style="padding:0.4rem; font-size:0.75rem; text-align:center;" placeholder="Zip" value="90210" required />
                      </div>
                    </div>
                  </div>

                  <!-- Stripe Submit Button -->
                  <button type="submit" id="btn-stripe-submit" class="btn btn-emerald" style="width:100%; font-size:var(--font-sm); padding:0.85rem; margin-top:var(--space-xs); box-shadow:0 0 25px rgba(16,185,129,0.35);">
                    🔒 Pay $${totalBilledToday} USD via Stripe Sandbox
                  </button>
                </form>

                <!-- Processing Overlay (Hidden by default) -->
                <div id="stripe-processing-overlay" style="display:none; margin-top:1rem; text-align:center; padding:1.5rem 1rem; background:rgba(9, 14, 23, 0.95); border:1px solid var(--border-accent); border-radius:var(--radius-md);">
                  <div class="stripe-spinner"></div>
                  <div style="font-weight:800; font-size:var(--font-md); margin-top:0.75rem; color:var(--text-main)">
                    Processing Payment with Stripe...
                  </div>
                  <div style="font-size:var(--font-xs); color:var(--text-muted); margin-top:0.25rem;">
                    Connecting to Stripe Sandbox API & Activating 24/7 SLA Guard
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
    `;

    // Inject payment tabs styles if needed
    if (!document.getElementById('stripe-pay-styles')) {
      const st = document.createElement('style');
      st.id = 'stripe-pay-styles';
      st.innerHTML = `
        .stripe-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(99, 91, 255, 0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99, 91, 255, 0.3);
          border-radius: 999px;
          padding: 0.2rem 0.6rem;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.03em;
        }
        .pay-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          padding: 0.45rem;
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pay-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
        }
        .pay-tab.active {
          background: #635bff;
          color: #ffffff;
          border-color: #635bff;
          box-shadow: 0 4px 15px rgba(99, 91, 255, 0.35);
        }
        .stripe-spinner {
          width: 38px;
          height: 38px;
          border: 3px solid rgba(99, 91, 255, 0.2);
          border-top-color: #635bff;
          border-radius: 50%;
          animation: stripe-spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes stripe-spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(st);
    }

    // Attach Event Listeners
    const tabCard = container.querySelector('#tab-card');
    const tabApple = container.querySelector('#tab-apple');
    const tabInvoice = container.querySelector('#tab-invoice');

    if (tabCard) tabCard.addEventListener('click', () => { activeMethod = 'stripe-card'; render(); });
    if (tabApple) tabApple.addEventListener('click', () => { activeMethod = 'apple-pay'; render(); });
    if (tabInvoice) tabInvoice.addEventListener('click', () => { activeMethod = 'invoice'; render(); });

    // Auto-fill button
    const autoFillBtn = container.querySelector('#btn-autofill-stripe');
    if (autoFillBtn) {
      autoFillBtn.addEventListener('click', () => {
        (container.querySelector('#stripe-card-num') as HTMLInputElement).value = '4242 4242 4242 4242';
        (container.querySelector('#stripe-card-exp') as HTMLInputElement).value = '12 / 28';
        (container.querySelector('#stripe-card-cvc') as HTMLInputElement).value = '123';
        (container.querySelector('#stripe-card-zip') as HTMLInputElement).value = '90210';
        autoFillBtn.textContent = '✓ Test Card Loaded';
        setTimeout(() => { autoFillBtn.textContent = '⚡ Auto-Fill Test Card'; }, 2000);
      });
    }

    // Form Submit
    const form = container.querySelector('#stripe-checkout-form') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientName = (container.querySelector('#chk-name') as HTMLInputElement).value;
        const clientEmail = (container.querySelector('#chk-email') as HTMLInputElement).value;
        const domainName = (container.querySelector('#chk-domain') as HTMLInputElement).value;

        // Show Processing Spinner overlay
        const overlay = container.querySelector('#stripe-processing-overlay') as HTMLElement;
        const submitBtn = container.querySelector('#btn-stripe-submit') as HTMLButtonElement;
        if (overlay) overlay.style.display = 'block';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.5';
        }

        setTimeout(() => {
          const newSub: SubscriptionRecord = {
            id: 'SUB-' + Math.floor(10000 + Math.random() * 90000),
            createdAt: new Date().toISOString().split('T')[0],
            planName: planObj.name,
            category: category as any,
            billingCycle: cycle,
            amount: finalMonthly,
            domainName: domainName || 'mybusinesssite.com',
            clientName: clientName || 'Alex Mercer',
            clientEmail: clientEmail || 'alex@mybusinesssite.com',
            status: 'active',
            nextBillingDate: cycle === 'yearly' ? '2027-07-28' : '2026-08-28',
            tickets: [
              {
                id: 'TCK-' + Math.floor(100 + Math.random() * 900),
                date: new Date().toISOString().split('T')[0],
                subject: 'Initial 24/7 Security WAF Onboarding & Site Health Audit',
                type: 'Security Alert',
                status: 'In Progress',
                priority: 'High'
              }
            ]
          };

          saveSubscription(newSub);
          alert(`🎉 Payment Successful via Stripe Sandbox!\n\nSubscription activated for ${newSub.domainName}. Redirecting to your Client Portal...`);
          router.navigate('dashboard');
        }, 1200);
      });
    }

  };

  render();
}
