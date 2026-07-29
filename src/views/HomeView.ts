import { MAINTENANCE_PLANS, SECURITY_PLANS, SEO_PLANS, ALL_IN_ONE_BUNDLES, CLIENT_REVIEWS, FAQS, calculateYearlyMonthlyPrice, calculateAnnualSavings } from '../data/packages';
import { getStoredBillingCycle, setStoredBillingCycle } from '../utils/storage';
import { BillingCycle } from '../types';

export function renderHomeView(container: HTMLElement, openCheckout: (planId: string, category: string) => void) {
  let billingCycle: BillingCycle = getStoredBillingCycle();

  const updateView = () => {
    container.innerHTML = `
      <!-- Hero Section -->
      <section style="padding: clamp(2rem, 4vw, 4rem) 0; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-80px; left:50%; transform:translateX(-50%); width:900px; height:500px; background:radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(16, 185, 129, 0.04) 40%, transparent 70%); pointer-events:none; z-index:0;"></div>

        <div class="container" style="position:relative; z-index:1;">
          <div class="hero-grid">
            
            <!-- Left Hero Content Column -->
            <div style="max-width:680px;">
              <!-- Compact Glass Badge -->
              <div style="display:inline-flex; align-items:center; gap:0.45rem; padding:0.25rem 0.85rem; border-radius:999px; background:rgba(59, 130, 246, 0.08); border:1px solid rgba(59, 130, 246, 0.25); font-size:0.75rem; font-weight:600; color:#60a5fa; margin-bottom:1rem; box-shadow:0 0 15px rgba(59, 130, 246, 0.1);">
                <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--accent-emerald); box-shadow:0 0 8px var(--accent-emerald);"></span>
                <span>24/7 Managed Website Care & SEO Subscriptions</span>
              </div>

              <!-- Hero Heading -->
              <h1 class="text-hero text-gradient" style="margin-bottom:1rem; line-height:1.15;">
                Zero Downtime. Zero Hacks.<br/>Maximum Search Growth.
              </h1>

              <!-- Subtitle -->
              <p style="font-size:var(--font-sm); color:var(--text-muted); line-height:1.65; margin:0 0 1.5rem 0; font-weight:400; max-width:580px;">
                Turn website maintenance, security hardening, daily backups, and SEO optimization into a smooth hands-off subscription. Senior web engineer protection for a fraction of an in-house hire.
              </p>

              <!-- Compact & Sleek CTA Buttons -->
              <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap; margin-bottom:var(--space-md);">
                <a href="#pricing" class="btn btn-primary btn-lg">
                  Explore Packages (Save 40%)
                </a>
                <a href="#audit-tool" class="btn btn-secondary btn-lg">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  Free Instant Web Audit
                </a>
              </div>

              <!-- Trust Key Stats Glass Bar -->
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:0.75rem; padding:1rem 1.25rem; background:rgba(15, 22, 35, 0.6); border:1px solid var(--border-subtle); border-radius:var(--radius-md); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);">
                <div>
                  <div style="font-size:1.2rem; font-weight:800; color:var(--accent-emerald)">99.99%</div>
                  <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">Uptime SLA</div>
                </div>
                <div>
                  <div style="font-size:1.2rem; font-weight:800; color:var(--primary)">30 Mins</div>
                  <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">SLA Response</div>
                </div>
                <div>
                  <div style="font-size:1.2rem; font-weight:800; color:var(--accent-cyan)">40% OFF</div>
                  <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">Yearly Discount</div>
                </div>
                <div>
                  <div style="font-size:1.2rem; font-weight:800; color:var(--accent-amber)">1,200+</div>
                  <div style="font-size:0.65rem; color:var(--text-muted); font-weight:500;">Sites Managed</div>
                </div>
              </div>
            </div>

            <!-- Right Column: Interactive Pure SVG IT Infrastructure & Service Visual Hub -->
            <div class="hero-visual-container" id="hero-visual-container">
              
              <!-- Floating Glass Badges -->
              <div class="floating-badge badge-top-left" id="hero-badge-left">
                <span style="width:8px; height:8px; border-radius:50%; background:var(--accent-emerald); box-shadow:0 0 8px var(--accent-emerald);"></span>
                <span id="badge-left-text">🛡️ Active WAF • 0 Exploits</span>
              </div>

              <div class="floating-badge badge-bottom-right" id="hero-badge-right">
                <span style="color:var(--accent-cyan)">⚡</span>
                <span id="badge-right-text">PageSpeed Score: 100/100</span>
              </div>

              <!-- Main Hero Card Container -->
              <div class="hero-visual-card" id="hero-3d-card">
                
                <!-- Interactive Service Object Mode Tabs -->
                <div style="display:flex; align-items:center; justify-content:space-between; gap:0.25rem; padding-bottom:0.6rem; margin-bottom:0.6rem; border-bottom:1px solid rgba(255,255,255,0.08); overflow-x:auto;" id="hero-service-tabs">
                  <button class="hero-svc-tab active" data-svc="security">🛡️ WAF Security</button>
                  <button class="hero-svc-tab" data-svc="speed">⚡ Speed 100</button>
                  <button class="hero-svc-tab" data-svc="seo">📈 SEO Radar</button>
                  <button class="hero-svc-tab" data-svc="backup">💾 Cloud Backup</button>
                </div>

                <!-- Pure Vector SVG IT Infrastructure Canvas with Dynamic Telemetry -->
                <div id="hero-svg-canvas-wrapper" style="position:relative;">
                  <svg viewBox="0 0 420 280" style="width:100%; height:auto; display:block;" xmlns="http://www.w3.org/2000/svg" id="hero-telemetry-svg">
                    <defs>
                      <!-- Background Cyber Grid Pattern -->
                      <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
                        <circle cx="20" cy="20" r="1" fill="rgba(59, 130, 246, 0.15)"/>
                      </pattern>

                      <!-- Graph Gradient Fill -->
                      <linearGradient id="heroGraphGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="rgba(16, 185, 129, 0.4)"/>
                        <stop offset="50%" stop-color="rgba(59, 130, 246, 0.15)"/>
                        <stop offset="100%" stop-color="rgba(6, 9, 17, 0)"/>
                      </linearGradient>

                      <!-- Node Glow Filters -->
                      <filter id="glowBlue" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="5" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                      </filter>
                      <filter id="glowGreen" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="6" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                      </filter>
                      <filter id="glowAmber" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="5" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                      </filter>
                    </defs>

                    <!-- Cyber Grid Background -->
                    <rect width="420" height="280" fill="url(#heroGrid)" rx="8"/>

                    <!-- Outer Moving Orbit Concentric Circle 1 -->
                    <g class="animate-orbit-circle">
                      <circle cx="210" cy="135" r="115" stroke="rgba(59, 130, 246, 0.2)" stroke-width="1.5" stroke-dasharray="6 12" fill="none"/>
                      <circle cx="325" cy="135" r="5" fill="#60a5fa" filter="url(#glowBlue)"/>
                      <circle cx="95" cy="135" r="4" fill="#34d399"/>
                    </g>

                    <!-- Inner Moving Orbit Concentric Circle 2 (Reverse Spin) -->
                    <g class="animate-orbit-reverse">
                      <circle cx="210" cy="135" r="75" stroke="rgba(16, 185, 129, 0.25)" stroke-width="1.5" stroke-dasharray="8 8" fill="none"/>
                      <circle cx="210" cy="60" r="5" fill="#10b981" filter="url(#glowGreen)"/>
                      <circle cx="210" cy="210" r="4" fill="#f59e0b" filter="url(#glowAmber)"/>
                    </g>

                    <!-- Central Infrastructure Node & Glowing Core -->
                    <circle cx="210" cy="135" r="24" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(59, 130, 246, 0.7)" stroke-width="2"/>
                    <circle cx="210" cy="135" r="14" fill="#10b981" opacity="0.3"/>
                    <circle cx="210" cy="135" r="7" fill="#10b981" filter="url(#glowGreen)"/>
                    <circle cx="210" cy="135" r="12" stroke="#10b981" fill="none" class="animate-pulse-ring"/>

                    <!-- Interactive Peripheral Nodes -->
                    <!-- Top-Left: Speed Engine Node -->
                    <line x1="210" y1="135" x2="85" y2="65" stroke="rgba(59, 130, 246, 0.35)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <g style="cursor:pointer;" class="hero-node-btn" data-node="speed">
                      <circle cx="85" cy="65" r="16" fill="rgba(15, 23, 42, 0.85)" stroke="#60a5fa" stroke-width="2"/>
                      <text x="85" y="69" font-size="10" font-weight="800" fill="#60a5fa" text-anchor="middle">⚡ 100</text>
                    </g>

                    <!-- Top-Right: Security WAF Node -->
                    <line x1="210" y1="135" x2="335" y2="65" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <g style="cursor:pointer;" class="hero-node-btn" data-node="security">
                      <circle cx="335" cy="65" r="16" fill="rgba(15, 23, 42, 0.85)" stroke="#10b981" stroke-width="2"/>
                      <text x="335" y="69" font-size="11" fill="#10b981" text-anchor="middle">🛡️</text>
                    </g>

                    <!-- Bottom-Left: SEO Ranking Radar Node -->
                    <line x1="210" y1="135" x2="85" y2="205" stroke="rgba(245, 158, 11, 0.35)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <g style="cursor:pointer;" class="hero-node-btn" data-node="seo">
                      <circle cx="85" cy="205" r="16" fill="rgba(15, 23, 42, 0.85)" stroke="#f59e0b" stroke-width="2"/>
                      <text x="85" y="209" font-size="10" font-weight="800" fill="#f59e0b" text-anchor="middle">📈 #1</text>
                    </g>

                    <!-- Bottom-Right: Cloud Backup & Latency Node -->
                    <line x1="210" y1="135" x2="335" y2="205" stroke="rgba(6, 182, 212, 0.35)" stroke-width="1.5" stroke-dasharray="4 4"/>
                    <g style="cursor:pointer;" class="hero-node-btn" data-node="backup">
                      <circle cx="335" cy="205" r="16" fill="rgba(15, 23, 42, 0.85)" stroke="#06b6d4" stroke-width="2"/>
                      <text x="335" y="209" font-size="10" font-weight="800" fill="#06b6d4" text-anchor="middle">💾 12ms</text>
                    </g>

                    <!-- Real-time Organic Performance Graph Line Overlay at Bottom -->
                    <path id="svg-graph-fill" d="M 20 260 Q 70 230, 130 240 T 230 190 T 320 170 T 400 145 L 400 270 L 20 270 Z" fill="url(#heroGraphGradient)"/>
                    <path id="svg-graph-line" d="M 20 260 Q 70 230, 130 240 T 230 190 T 320 170 T 400 145" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" class="animate-graph-line" filter="url(#glowGreen)"/>

                    <!-- Graph Data Pulse Points -->
                    <circle cx="130" cy="240" r="3.5" fill="#10b981"/>
                    <circle cx="230" cy="190" r="3.5" fill="#10b981"/>
                    <circle cx="320" cy="170" r="3.5" fill="#60a5fa"/>
                    <circle cx="400" cy="145" r="5" fill="#10b981" filter="url(#glowGreen)"/>

                    <!-- Animated Vertical Cyber Scan Beam -->
                    <line x1="20" y1="10" x2="400" y2="10" stroke="rgba(59, 130, 246, 0.35)" stroke-width="1.5" stroke-dasharray="8 8" class="animate-scan-line"/>
                  </svg>
                </div>

                <!-- Bottom Telemetry Live Feed Footer -->
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.4rem; padding-top:0.6rem; margin-top:0.4rem; border-top:1px solid rgba(255,255,255,0.08); text-align:center; font-size:0.65rem;" id="hero-telemetry-footer">
                  <div style="background:rgba(255,255,255,0.02); padding:5px 4px; border-radius:4px; border:1px solid rgba(255,255,255,0.04);" id="tel-box-1">
                    <span style="color:var(--text-muted); display:block; font-size:0.6rem;">CORE VITALS</span>
                    <span style="color:var(--accent-emerald); font-weight:800;" id="tel-val-1">LCP 0.8s (PASS)</span>
                  </div>
                  <div style="background:rgba(255,255,255,0.02); padding:5px 4px; border-radius:4px; border:1px solid rgba(255,255,255,0.04);" id="tel-box-2">
                    <span style="color:var(--text-muted); display:block; font-size:0.6rem;">WAF PROTECTION</span>
                    <span style="color:var(--accent-emerald); font-weight:800;" id="tel-val-2">0 Threats / 24h</span>
                  </div>
                  <div style="background:rgba(255,255,255,0.02); padding:5px 4px; border-radius:4px; border:1px solid rgba(255,255,255,0.04);" id="tel-box-3">
                    <span style="color:var(--text-muted); display:block; font-size:0.6rem;">CLOUD BACKUP</span>
                    <span style="color:var(--primary); font-weight:800;" id="tel-val-3">Hourly Synced</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        <!-- Trusted By Agency Social Proof Section -->
        <section class="trusted-by-section">
          <div class="container">
            <div class="trusted-by-header">
              <span class="trusted-by-label">TRUSTED BY 1,200+ INDUSTRY LEADERS & INNOVATIVE BRANDS</span>
            </div>
            
            <div class="trusted-logos-grid">
              <!-- Logo 1: CloudPulse SaaS -->
              <div class="trusted-logo-card" title="CloudPulse SaaS Platform">
                <svg viewBox="0 0 160 40" class="trusted-logo-svg">
                  <path d="M22 24c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2.1C33.3 17.5 36 16 39 16c4.4 0 8 3.6 8 8 0 .4 0 .7-.1 1.1C48.2 25.6 49 27.2 49 29c0 2.8-2.2 5-5 5H22c-2.8 0-5-2.2-5-5 0-2.4 1.7-4.4 4-4.9z" fill="currentColor"/>
                  <text x="56" y="27" font-weight="800" font-size="15" fill="currentColor" letter-spacing="-0.5">CloudPulse</text>
                </svg>
              </div>

              <!-- Logo 2: BioHealth Labs -->
              <div class="trusted-logo-card" title="BioHealth Labs">
                <svg viewBox="0 0 150 40" class="trusted-logo-svg">
                  <circle cx="22" cy="20" r="9" stroke="currentColor" stroke-width="2.8" fill="none"/>
                  <path d="M22 15v10M17 20h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                  <text x="38" y="26" font-weight="800" font-size="15" fill="currentColor">BioHealth</text>
                </svg>
              </div>

              <!-- Logo 3: Nexa Capital -->
              <div class="trusted-logo-card" title="Nexa Capital">
                <svg viewBox="0 0 150 40" class="trusted-logo-svg">
                  <path d="M16 28L24 12L32 28M20 22h8" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <text x="40" y="26" font-weight="800" font-size="15" fill="currentColor" letter-spacing="0.5">NEXA</text>
                </svg>
              </div>

              <!-- Logo 4: Artisan Digital -->
              <div class="trusted-logo-card" title="Artisan Digital">
                <svg viewBox="0 0 160 40" class="trusted-logo-svg">
                  <rect x="16" y="13" width="14" height="14" rx="4" fill="currentColor"/>
                  <circle cx="28" cy="25" r="4.5" fill="currentColor"/>
                  <text x="38" y="26" font-weight="800" font-size="15" fill="currentColor">Artisan</text>
                </svg>
              </div>

              <!-- Logo 5: Apex Scale -->
              <div class="trusted-logo-card" title="Apex Scale E-Commerce">
                <svg viewBox="0 0 150 40" class="trusted-logo-svg">
                  <path d="M16 27l7-14 5 7 7-9" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <text x="42" y="26" font-weight="800" font-size="15" fill="currentColor">APEX</text>
                </svg>
              </div>

              <!-- Logo 6: Volt Media -->
              <div class="trusted-logo-card" title="Volt Media Network">
                <svg viewBox="0 0 150 40" class="trusted-logo-svg">
                  <polygon points="24,11 17,22 23,22 20,29 29,18 23,18" fill="currentColor"/>
                  <text x="36" y="26" font-weight="800" font-size="15" fill="currentColor">VoltMedia</text>
                </svg>
              </div>

              <!-- Logo 7: FinTech Global -->
              <div class="trusted-logo-card" title="FinGlobal Services">
                <svg viewBox="0 0 160 40" class="trusted-logo-svg">
                  <path d="M18 13h14v3.5H22v3.5h9v3.5H22v7h-4V13z" fill="currentColor"/>
                  <text x="38" y="26" font-weight="800" font-size="15" fill="currentColor">FinGlobal</text>
                </svg>
              </div>

              <!-- Logo 8: Starlight Interactive -->
              <div class="trusted-logo-card" title="Starlight Interactive">
                <svg viewBox="0 0 150 40" class="trusted-logo-svg">
                  <path d="M22 12l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" fill="currentColor"/>
                  <text x="36" y="26" font-weight="800" font-size="15" fill="currentColor">Starlight</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <div class="container">
          <!-- Interactive Billing Cycle Switcher -->
          <div class="billing-toggle-wrapper">
            <span class="toggle-label ${billingCycle === 'monthly' ? 'active' : ''}" id="toggle-monthly-lbl">Monthly Billing</span>
            <label class="switch">
              <input type="checkbox" id="home-cycle-toggle" ${billingCycle === 'yearly' ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span class="toggle-label ${billingCycle === 'yearly' ? 'active' : ''}" id="toggle-yearly-lbl">
              Annual Billing
            </span>
            <span class="badge-discount">Save 40%</span>
          </div>

          <!-- Featured Maintenance & SEO Packages Row -->
          <div class="grid-3" style="margin-top:var(--space-md);">
            ${MAINTENANCE_PLANS.map(plan => {
              const price = billingCycle === 'yearly' ? plan.yearlyMonthlyPrice : plan.monthlyPrice;
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
                    ${billingCycle === 'yearly' ? `
                      <div class="price-savings">Billed $${price * 12}/yr (Saved $${savings}/yr - 40% OFF)</div>
                    ` : `
                      <div style="font-size:var(--font-xs); color:var(--text-dim)">Switch to annual & save $${savings}/yr</div>
                    `}
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

                  <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-subscribe" data-plan="${plan.id}" data-category="maintenance" style="width:100%">
                    Subscribe Now
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- All-in-One Featured Suite Banner -->
      <section style="padding:var(--space-xl) 0; background:rgba(15, 22, 35, 0.6); border-y:1px solid var(--border-subtle)">
        <div class="container">
          <div style="background:linear-gradient(135deg, rgba(30, 58, 110, 0.4) 0%, rgba(15, 22, 35, 0.9) 100%); border:1px solid var(--primary); border-radius:var(--radius-lg); padding:var(--space-lg); display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:var(--gap-grid); align-items:center;">
            <div>
              <span class="badge-discount" style="margin-bottom:var(--space-xs); display:inline-block;">360° TOTAL CARE BUNDLE</span>
              <h2 style="font-size:var(--font-xl); font-weight:800; margin-bottom:var(--space-xs);">
                Maintenance + Security + SEO All-In-One
              </h2>
              <p style="color:var(--text-muted); font-size:var(--font-sm); line-height:1.6; margin-bottom:var(--space-sm);">
                Combine our Growth Maintenance, Zero-Trust Security Fortress, and National SEO strategy into a single discounted subscription stack.
              </p>
              <div style="display:flex; align-items:baseline; gap:0.5rem;">
                <span style="font-size:var(--font-2xl); font-weight:800; color:var(--accent-emerald)">$${billingCycle === 'yearly' ? calculateYearlyMonthlyPrice(899) : 899}</span>
                <span style="color:var(--text-muted); font-size:var(--font-sm)">/ month</span>
                ${billingCycle === 'yearly' ? `<span style="font-size:var(--font-xs); color:var(--accent-emerald)">(Includes 40% Annual Discount)</span>` : ''}
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-sm);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                <span>Growth Shield Maintenance ($199/mo value)</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-sm);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                <span>Fortress Zero-Trust Security ($169/mo value)</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-sm);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                <span>National Growth Organic SEO ($599/mo value)</span>
              </div>
              <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-sm); font-weight:700; color:#60a5fa;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                <span>5 Included Monthly Dev Hours + Priority SLA</span>
              </div>

              <button class="btn btn-emerald btn-subscribe" data-plan="bundle-complete-care" data-category="all-in-one" style="margin-top:var(--space-xs); font-size:var(--font-sm)">
                Subscribe to 360° Total Suite
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Pillars of Service -->
      <section style="padding:var(--space-xl) 0;">
        <div class="container">
          <div style="text-align:center;">
            <h2 class="section-title">Everything Your Website Needs to Scale Safely</h2>
            <p class="section-subtitle">
              We handle the complex backend maintenance, cyber security patches, speed tuning, and Google keyword rankings so you can focus on driving revenue.
            </p>
          </div>

          <div class="grid-2" style="margin-top:var(--space-md);">
            <div class="interactive-panel">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:var(--space-xs);">
                <div style="padding:0.6rem; border-radius:var(--radius-md); background:rgba(59, 130, 246, 0.15); color:var(--primary)">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <h3 style="font-size:var(--font-md); font-weight:700">24/7 Security & Firewall Defense</h3>
                  <div style="font-size:var(--font-xs); color:var(--accent-cyan)">WAF Protection & Hack Cleanup</div>
                </div>
              </div>
              <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-sm);">
                Real-time threat monitoring, bot blocking, brute force defense, and guaranteed instant malware removal if your site is ever targeted.
              </p>
              <a href="#security" style="font-size:var(--font-xs); color:var(--primary); font-weight:600; display:inline-flex; align-items:center; gap:0.3rem;">
                Explore Security Guard Subscriptions →
              </a>
            </div>

            <div class="interactive-panel">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:var(--space-xs);">
                <div style="padding:0.6rem; border-radius:var(--radius-md); background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald)">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <h3 style="font-size:var(--font-md); font-weight:700">Maintenance & PageSpeed 95+</h3>
                  <div style="font-size:var(--font-xs); color:var(--accent-emerald)">Core Updates & Visual Testing</div>
                </div>
              </div>
              <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-sm);">
                Proactive CMS & plugin updates tested on staging prior to deployment. Database optimization and caching to guarantee 95+ Google PageSpeed scores.
              </p>
              <a href="#maintenance" style="font-size:var(--font-xs); color:var(--accent-emerald); font-weight:600; display:inline-flex; align-items:center; gap:0.3rem;">
                Explore Website Maintenance →
              </a>
            </div>

            <div class="interactive-panel">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:var(--space-xs);">
                <div style="padding:0.6rem; border-radius:var(--radius-md); background:rgba(245, 158, 11, 0.15); color:var(--accent-amber)">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                </div>
                <div>
                  <h3 style="font-size:var(--font-md); font-weight:700">Organic & Local SEO Growth</h3>
                  <div style="font-size:var(--font-xs); color:var(--accent-amber)">Keyword Ranks & Backlinks</div>
                </div>
              </div>
              <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-sm);">
                Technical SEO, Schema.org markup, local map pack optimization, and high DA editorial backlinks to drive qualified buyer traffic month after month.
              </p>
              <a href="#seo-packages" style="font-size:var(--font-xs); color:var(--accent-amber); font-weight:600; display:inline-flex; align-items:center; gap:0.3rem;">
                Explore Monthly SEO Packages →
              </a>
            </div>

            <div class="interactive-panel">
              <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:var(--space-xs);">
                <div style="padding:0.6rem; border-radius:var(--radius-md); background:rgba(6, 182, 212, 0.15); color:var(--accent-cyan)">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <h3 style="font-size:var(--font-md); font-weight:700">Emergency Bug Fixes & Dev Retainers</h3>
                  <div style="font-size:var(--font-xs); color:var(--accent-cyan)">On-Demand Senior Engineers</div>
                </div>
              </div>
              <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-sm);">
                Broken checkout? Layout glitch after an update? Use your included monthly developer hours to request instant code patches, layout adjustments, or new feature additions.
              </p>
              <a href="#custom-builder" style="font-size:var(--font-xs); color:var(--accent-cyan); font-weight:600; display:inline-flex; align-items:center; gap:0.3rem;">
                Build Custom Dev Retainer →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Client Reviews Section Slider -->
      <section style="padding:var(--space-xl) 0; background:rgba(255, 255, 255, 0.015); border-top:1px solid var(--border-subtle); border-bottom:1px solid var(--border-subtle);">
        <div class="container">
          <div style="text-align:center;">
            <h2 class="section-title">Trusted by 1,200+ Businesses Worldwide</h2>
            <p class="section-subtitle">Read how our maintenance, security, and SEO subscriptions protect revenue and power growth.</p>
          </div>

          <!-- Reviews Slider Component -->
          <div class="reviews-slider-container" id="reviews-slider">
            <div class="reviews-slider-wrapper">
              <div class="reviews-slider-track" id="reviews-track">
                ${CLIENT_REVIEWS.map(rev => `
                  <div class="review-slide">
                    <div class="review-card">
                      <div>
                        <div class="review-stars">${'★'.repeat(rev.rating)}</div>
                        <p class="review-quote">"${rev.quote}"</p>
                      </div>
                      <div class="review-card-bottom">
                        <div class="review-author">${rev.author}</div>
                        <div class="review-role">${rev.role}</div>
                        <div class="review-metrics">${rev.metrics}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Navigation Controls & Dots -->
            <div class="reviews-slider-controls">
              <button class="slider-arrow prev" id="slider-prev" aria-label="Previous review">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div class="slider-dots" id="slider-dots"></div>
              <button class="slider-arrow next" id="slider-next" aria-label="Next review">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Accordion -->
      <section style="padding:var(--space-xl) 0;">
        <div class="container" style="max-width:860px;">
          <div style="text-align:center;">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <p class="section-subtitle">Everything you need to know about our subscription care plans and 40% yearly savings.</p>
          </div>

          <div style="display:flex; flex-direction:column; gap:var(--space-xs); margin-top:var(--space-md);">
            ${FAQS.map((faq, idx) => `
              <div class="interactive-panel" style="padding:var(--space-sm); cursor:pointer;" data-faq-toggle="${idx}">
                <div style="display:flex; align-items:center; justify-content:space-between; font-weight:700; font-size:var(--font-sm)">
                  <span>${faq.q}</span>
                  <span id="faq-icon-${idx}" style="font-size:1.2rem; color:var(--primary)">+</span>
                </div>
                <div id="faq-ans-${idx}" style="display:none; font-size:var(--font-xs); color:var(--text-muted); margin-top:var(--space-xs); line-height:1.6; border-top:1px solid var(--border-subtle); padding-top:var(--space-xs)">
                  ${faq.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Add Event Listeners
    const toggleInput = container.querySelector('#home-cycle-toggle') as HTMLInputElement;
    if (toggleInput) {
      toggleInput.addEventListener('change', (e) => {
        billingCycle = (e.target as HTMLInputElement).checked ? 'yearly' : 'monthly';
        setStoredBillingCycle(billingCycle);
        updateView();
      });
    }

    // Subscribe Buttons
    container.querySelectorAll('.btn-subscribe').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const planId = (e.currentTarget as HTMLElement).getAttribute('data-plan');
        const category = (e.currentTarget as HTMLElement).getAttribute('data-category');
        if (planId && category) openCheckout(planId, category);
      });
    });

    // FAQ Accordion
    container.querySelectorAll('[data-faq-toggle]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = el.getAttribute('data-faq-toggle');
        const ans = container.querySelector(`#faq-ans-${idx}`) as HTMLElement;
        const icon = container.querySelector(`#faq-icon-${idx}`) as HTMLElement;
        if (ans && icon) {
          const isOpen = ans.style.display === 'block';
          ans.style.display = isOpen ? 'none' : 'block';
          icon.textContent = isOpen ? '+' : '−';
        }
      });
    });

    // Reviews Slider Interactive Autoplay Logic
    const sliderTrack = container.querySelector('#reviews-track') as HTMLElement;
    const sliderContainer = container.querySelector('#reviews-slider') as HTMLElement;
    const prevBtn = container.querySelector('#slider-prev') as HTMLElement;
    const nextBtn = container.querySelector('#slider-next') as HTMLElement;
    const dotsContainer = container.querySelector('#slider-dots') as HTMLElement;

    if (sliderTrack && sliderContainer && prevBtn && nextBtn && dotsContainer) {
      let currentIndex = 0;
      let autoPlayTimer: number | null = null;

      const getVisibleCount = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
      };

      const getMaxIndex = () => {
        const visibleCount = getVisibleCount();
        return Math.max(0, CLIENT_REVIEWS.length - visibleCount);
      };

      const updateSlider = () => {
        const maxIdx = getMaxIndex();
        if (currentIndex > maxIdx) currentIndex = maxIdx;
        if (currentIndex < 0) currentIndex = 0;

        const visibleCount = getVisibleCount();
        const stepPct = 100 / visibleCount;
        sliderTrack.style.transform = `translateX(-${currentIndex * stepPct}%)`;

        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((d, idx) => {
          if (idx === currentIndex) {
            d.classList.add('active');
          } else {
            d.classList.remove('active');
          }
        });
      };

      const renderDots = () => {
        const maxIdx = getMaxIndex();
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxIdx; i++) {
          const dot = document.createElement('div');
          dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
          dot.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
            resetAutoPlay();
          });
          dotsContainer.appendChild(dot);
        }
      };

      const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayTimer = window.setInterval(() => {
          const maxIdx = getMaxIndex();
          currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
          updateSlider();
        }, 3600);
      };

      const stopAutoPlay = () => {
        if (autoPlayTimer !== null) {
          clearInterval(autoPlayTimer);
          autoPlayTimer = null;
        }
      };

      const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
      };

      prevBtn.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        currentIndex = currentIndex <= 0 ? maxIdx : currentIndex - 1;
        updateSlider();
        resetAutoPlay();
      });

      nextBtn.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
        updateSlider();
        resetAutoPlay();
      });

      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
      sliderContainer.addEventListener('touchstart', stopAutoPlay, { passive: true });
      sliderContainer.addEventListener('touchend', startAutoPlay, { passive: true });

      window.addEventListener('resize', () => {
        renderDots();
        updateSlider();
      });

      renderDots();
      updateSlider();
      startAutoPlay();
    }

    // --- Pure Vanilla JS Interactive Hero Service Visual Hub & Telemetry Engine ---
    const heroVisualContainer = container.querySelector('#hero-visual-container') as HTMLElement;
    const heroCard = container.querySelector('#hero-3d-card') as HTMLElement;
    const badgeLeftTxt = container.querySelector('#badge-left-text') as HTMLElement;
    const badgeRightTxt = container.querySelector('#badge-right-text') as HTMLElement;
    const telVal1 = container.querySelector('#tel-val-1') as HTMLElement;
    const telVal2 = container.querySelector('#tel-val-2') as HTMLElement;
    const telVal3 = container.querySelector('#tel-val-3') as HTMLElement;
    const svgGraphLine = container.querySelector('#svg-graph-line') as SVGPathElement;
    const svgGraphFill = container.querySelector('#svg-graph-fill') as SVGPathElement;

    // Data configurations for the 4 core service objects
    const SVC_CONFIGS: Record<string, {
      badgeLeft: string;
      badgeRight: string;
      v1: string;
      v2: string;
      v3: string;
      linePath: string;
      fillPath: string;
      lineColor: string;
    }> = {
      security: {
        badgeLeft: '🛡️ Active WAF • 0 Exploits',
        badgeRight: 'SSL Header Score: A+ Grade',
        v1: 'LCP 0.8s (PASS)',
        v2: '0 Threats / 24h',
        v3: 'Hourly Synced',
        linePath: 'M 20 260 Q 70 230, 130 240 T 230 190 T 320 170 T 400 145',
        fillPath: 'M 20 260 Q 70 230, 130 240 T 230 190 T 320 170 T 400 145 L 400 270 L 20 270 Z',
        lineColor: '#10b981'
      },
      speed: {
        badgeLeft: '⚡ Lighthouse Engine: 100/100',
        badgeRight: 'TTFB: 14ms Global CDN',
        v1: 'LCP 0.5s (ULTRA)',
        v2: 'Gzip + Brotli 100%',
        v3: 'Edge Cache 99.8%',
        linePath: 'M 20 270 Q 80 200, 140 180 T 240 150 T 330 120 T 400 100',
        fillPath: 'M 20 270 Q 80 200, 140 180 T 240 150 T 330 120 T 400 100 L 400 270 L 20 270 Z',
        lineColor: '#60a5fa'
      },
      seo: {
        badgeLeft: '📈 Google Organic Rank: #1',
        badgeRight: 'Schema.org Markup: Verified',
        v1: 'Organic +340%',
        v2: 'Domain Auth 78',
        v3: '1,420 Keywords',
        linePath: 'M 20 250 Q 90 240, 160 190 T 260 140 T 350 110 T 400 85',
        fillPath: 'M 20 250 Q 90 240, 160 190 T 260 140 T 350 110 T 400 85 L 400 270 L 20 270 Z',
        lineColor: '#f59e0b'
      },
      backup: {
        badgeLeft: '💾 1-Click Instant Restore',
        badgeRight: 'Offsite Cloud Snapshot',
        v1: 'RTO &lt; 5 mins',
        v2: 'AES-256 Encrypted',
        v3: 'Database Safe',
        linePath: 'M 20 220 Q 80 225, 150 210 T 250 195 T 340 180 T 400 160',
        fillPath: 'M 20 220 Q 80 225, 150 210 T 250 195 T 340 180 T 400 160 L 400 270 L 20 270 Z',
        lineColor: '#06b6d4'
      }
    };

    const switchHeroService = (svcKey: string) => {
      const cfg = SVC_CONFIGS[svcKey];
      if (!cfg) return;

      // Update active tab buttons
      container.querySelectorAll('.hero-svc-tab').forEach(tab => {
        if (tab.getAttribute('data-svc') === svcKey) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      // Update Telemetry Text Content
      if (badgeLeftTxt) badgeLeftTxt.textContent = cfg.badgeLeft;
      if (badgeRightTxt) badgeRightTxt.textContent = cfg.badgeRight;
      if (telVal1) telVal1.innerHTML = cfg.v1;
      if (telVal2) telVal2.innerHTML = cfg.v2;
      if (telVal3) telVal3.innerHTML = cfg.v3;

      // Update SVG Path & Stroke Color dynamically
      if (svgGraphLine) {
        svgGraphLine.setAttribute('d', cfg.linePath);
        svgGraphLine.setAttribute('stroke', cfg.lineColor);
      }
      if (svgGraphFill) {
        svgGraphFill.setAttribute('d', cfg.fillPath);
      }
    };

    // Attach click handlers to service tabs
    container.querySelectorAll('.hero-svc-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-svc');
        if (key) switchHeroService(key);
      });
    });

    // Attach click handlers to node buttons inside SVG
    container.querySelectorAll('.hero-node-btn').forEach(node => {
      node.addEventListener('click', () => {
        const key = node.getAttribute('data-node');
        if (key) switchHeroService(key);
      });
    });

    // Vanilla JS 3D Interactive Parallax Mouse Tilt Effect
    if (heroVisualContainer && heroCard) {
      heroVisualContainer.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = heroVisualContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        heroCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        heroCard.style.transition = 'transform 0.1s ease-out';
      });

      heroVisualContainer.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        heroCard.style.transition = 'transform 0.5s ease-out';
      });
    }
  };

  updateView();
}
