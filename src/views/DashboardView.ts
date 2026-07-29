import { getStoredSubscriptions, addTicketToSubscription, getStoredUser, logoutUser, loginUser, saveStoredUser } from '../utils/storage';
import { MaintenanceTicket } from '../types';
import { router } from '../utils/router';

export function renderDashboardView(container: HTMLElement) {
  let activeTab: 'sites' | 'tickets' | 'seo' | 'security' | 'billing' | 'account' = 'sites';
  let authTab: 'login' | 'signup' = 'login';
  let ticketFilter: 'all' | 'active' | 'resolved' = 'all';

  // Mock SEO Keyword Rankings
  const seoKeywords = [
    { keyword: 'website maintenance subscription', position: 1, change: '+2', volume: '3,600/mo', url: '/services/maintenance', status: 'Top 1' },
    { keyword: '24/7 web security retainer', position: 2, change: '+4', volume: '1,900/mo', url: '/services/security', status: 'Top 3' },
    { keyword: 'emergency website bug fix agency', position: 1, change: '0', volume: '2,400/mo', url: '/bug-fix', status: 'Top 1' },
    { keyword: 'local seo packages small business', position: 3, change: '+3', volume: '5,100/mo', url: '/seo-packages', status: 'Top 3' },
    { keyword: 'wordpress speed optimization service', position: 2, change: '+1', volume: '4,200/mo', url: '/speed-opt', status: 'Top 3' }
  ];

  // Mock Security Threat Log
  const securityLogs = [
    { time: 'Today 10:42 AM', type: 'SQL Injection Blocked', origin: 'IP 185.220.101.4 (Russia)', status: 'Mitigated by WAF' },
    { time: 'Today 08:15 AM', type: 'Brute Force WP Login', origin: 'IP 45.142.214.2 (Netherlands)', status: 'IP Banned (24h)' },
    { time: 'Yesterday 11:30 PM', type: 'Malicious Scanner', origin: 'IP 194.26.29.112 (Ukraine)', status: 'Dropped by Cloud Shield' },
    { time: '2026-07-26 03:00 AM', type: 'Automated Offsite Cloud Backup', origin: 'AWS S3 Vault #4910', status: 'Encrypted Snapshot Saved' }
  ];

  // Mock Invoices
  const invoices = [
    { id: 'INV-2026-008', date: '2026-07-28', description: 'Growth Shield Maintenance + SEO (Yearly Subscription)', amount: 1428, status: 'Paid', pdfUrl: '#' },
    { id: 'INV-2025-008', date: '2025-07-28', description: 'Growth Shield Maintenance + SEO (Yearly Subscription)', amount: 1428, status: 'Paid', pdfUrl: '#' }
  ];

  const render = () => {
    const user = getStoredUser();
    const subscriptions = getStoredSubscriptions();
    const allTickets = subscriptions.flatMap(s => s.tickets);

    // ==========================================
    // PAGE STATE 1: LOGGED OUT - CLIENT ACCESS PAGE (TABBED LOGIN/SIGNUP)
    // ==========================================
    if (!user.isLoggedIn) {
      container.innerHTML = `
        <section style="padding:var(--space-xl) 0 var(--space-2xl) 0; background:radial-gradient(circle at 50% 0%, #0d1527 0%, var(--bg-dark) 80%); min-height:80vh; display:flex; align-items:center;">
          <div class="container" style="max-width:1100px;">

            <!-- PAGE HEADER -->
            <div style="text-align:center; max-width:680px; margin:0 auto var(--space-xl) auto;">
              <span class="badge-discount" style="font-size:0.7rem; letter-spacing:0.08em; background:linear-gradient(135deg, #2563eb, #06b6d4)">WEBCARE VIP CLIENT PORTAL</span>
              <h1 style="font-size:var(--font-xl); font-weight:800; margin:0.5rem 0; color:var(--text-main); line-height:1.2;">
                Client Portal Login & Account Access
              </h1>
              <p style="font-size:var(--font-sm); color:var(--text-muted); line-height:1.6;">
                Manage active domain subscriptions, request emergency SLA bug fixes, track organic search keyword rankings, and access downloadable tax receipts.
              </p>
            </div>

            <!-- SPLIT LAYOUT CONTAINER -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:var(--gap-grid); align-items:stretch;">

              <!-- LEFT HIGHLIGHT PANEL: AGENCY VALUE & SECURITY -->
              <div style="background:linear-gradient(135deg, #0d182e 0%, #11203b 100%); border:1px solid var(--border-accent); border-radius:var(--radius-lg); padding:var(--space-lg); display:flex; flex-direction:column; justify-content:space-between; box-shadow:var(--shadow-card);">
                <div>
                  <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:var(--space-md);">
                    <div style="width:48px; height:48px; border-radius:12px; background:linear-gradient(135deg, var(--primary), var(--accent-cyan)); display:flex; align-items:center; justify-content:center; color:white; font-size:1.4rem; box-shadow:0 0 20px var(--primary-glow);">
                      🛡️
                    </div>
                    <div>
                      <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main);">WebCare SLA Guarantee</h3>
                      <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700;">● 24/7/365 DevOps Monitoring Active</span>
                    </div>
                  </div>

                  <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-md);">
                    Your portal provides direct access to dedicated senior DevOps engineers, automated visual testing, 1-click cloud restoration, and live SERP rank intelligence.
                  </p>

                  <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:var(--space-md);">
                    <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-xs); color:var(--text-main);">
                      <span style="color:var(--accent-emerald); font-weight:800;">✓</span>
                      <span><strong>15-Minute SLA Response</strong> on emergency production outages</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-xs); color:var(--text-main);">
                      <span style="color:var(--accent-emerald); font-weight:800;">✓</span>
                      <span><strong>Zero-Downtime Core Updates</strong> with visual regression testing</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-xs); color:var(--text-main);">
                      <span style="color:var(--accent-emerald); font-weight:800;">✓</span>
                      <span><strong>Encrypted AWS S3 Snapshot Vault</strong> with 30-day retention</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.6rem; font-size:var(--font-xs); color:var(--text-main);">
                      <span style="color:var(--accent-emerald); font-weight:800;">✓</span>
                      <span><strong>40% Discount Applied</strong> on all annual billing plans</span>
                    </div>
                  </div>
                </div>

                <!-- TESTIMONIAL / SECURITY FOOTNOTE -->
                <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:var(--space-sm); border-radius:var(--radius-md); font-size:0.75rem; color:var(--text-muted); line-height:1.5;">
                  <div style="color:var(--accent-cyan); font-weight:700; margin-bottom:0.2rem;">"Zero checkout drops since switching to WebCare"</div>
                  <div>"Our e-commerce store stays at 100% PageSpeed. The client portal makes submitting task requests effortless."</div>
                  <div style="font-size:0.65rem; color:var(--text-dim); margin-top:0.3rem;">— Marcus Thorne, VP of Technology at RetailFlow</div>
                </div>
              </div>

              <!-- RIGHT FORM PANEL: TABBED LOGIN & SIGNUP CARD -->
              <div style="background:linear-gradient(135deg, #0b1426 0%, #13223f 100%); border:1px solid var(--border-accent); border-radius:var(--radius-lg); padding:var(--space-lg); box-shadow:var(--shadow-glow);">

                <!-- TAB SWITCHER NAVIGATION -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; background:rgba(0,0,0,0.3); padding:0.3rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle); margin-bottom:var(--space-md);">
                  <button id="tab-auth-login" class="auth-page-tab ${authTab === 'login' ? 'active' : ''}">
                    🔑 Client Sign In
                  </button>
                  <button id="tab-auth-signup" class="auth-page-tab ${authTab === 'signup' ? 'active' : ''}">
                    ✨ Register VIP Account
                  </button>
                </div>

                <!-- TAB 1: LOGIN FORM -->
                ${authTab === 'login' ? `
                  <form id="form-page-login" style="display:flex; flex-direction:column; gap:1rem;">
                    <div>
                      <label style="display:block; font-size:var(--font-xs); font-weight:700; color:var(--text-muted); margin-bottom:0.35rem;">
                        Business Email Address
                      </label>
                      <div style="position:relative;">
                        <input type="email" id="page-login-email" class="form-input" placeholder="alex@mybusinesssite.com" value="alex@mybusinesssite.com" required style="padding-left:2.5rem; width:100%;">
                        <span style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); font-size:0.9rem; opacity:0.6;">📧</span>
                      </div>
                    </div>

                    <div>
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                        <label style="font-size:var(--font-xs); font-weight:700; color:var(--text-muted);">
                          Account Password
                        </label>
                        <a href="#contact" style="font-size:0.7rem; color:var(--primary); text-decoration:none;">Forgot Password?</a>
                      </div>
                      <div style="position:relative;">
                        <input type="password" id="page-login-password" class="form-input" placeholder="••••••••••••" value="demo123456" required style="padding-left:2.5rem; width:100%;">
                        <span style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); font-size:0.9rem; opacity:0.6;">🔒</span>
                      </div>
                    </div>

                    <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.75rem; color:var(--text-muted);">
                      <input type="checkbox" id="page-remember-me" checked style="accent-color:var(--primary)">
                      <label for="page-remember-me" style="cursor:pointer">Remember this browser session</label>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; font-size:var(--font-xs); padding:0.75rem;">
                      🔑 Sign In to Client Portal
                    </button>

                    <div style="position:relative; text-align:center; margin:0.2rem 0;">
                      <div style="position:absolute; inset:0; display:flex; align-items:center;"><div style="width:100%; border-top:1px solid var(--border-subtle)"></div></div>
                      <span style="position:relative; background:#13223f; padding:0 0.5rem; font-size:0.65rem; color:var(--text-dim); text-transform:uppercase;">Or Instant Access</span>
                    </div>

                    <button type="button" id="btn-one-click-demo" class="btn btn-secondary" style="width:100%; justify-content:center; border-color:var(--accent-emerald); color:var(--accent-emerald); font-size:0.75rem;">
                      ⚡ One-Click Demo Account (Alex Mercer)
                    </button>
                  </form>
                ` : ''}

                <!-- TAB 2: REGISTER FORM -->
                ${authTab === 'signup' ? `
                  <form id="form-page-signup" style="display:flex; flex-direction:column; gap:0.85rem;">
                    <div>
                      <label style="display:block; font-size:var(--font-xs); font-weight:700; color:var(--text-muted); margin-bottom:0.25rem;">
                        Full Name
                      </label>
                      <input type="text" id="page-signup-name" class="form-input" placeholder="e.g. Sarah Connor" required style="width:100%;">
                    </div>

                    <div>
                      <label style="display:block; font-size:var(--font-xs); font-weight:700; color:var(--text-muted); margin-bottom:0.25rem;">
                        Company or Brand Name
                      </label>
                      <input type="text" id="page-signup-company" class="form-input" placeholder="e.g. Acme Tech Solutions" required style="width:100%;">
                    </div>

                    <div>
                      <label style="display:block; font-size:var(--font-xs); font-weight:700; color:var(--text-muted); margin-bottom:0.25rem;">
                        Work Email Address
                      </label>
                      <input type="email" id="page-signup-email" class="form-input" placeholder="sarah@acmetech.com" required style="width:100%;">
                    </div>

                    <div>
                      <label style="display:block; font-size:var(--font-xs); font-weight:700; color:var(--text-muted); margin-bottom:0.25rem;">
                        Account Password
                      </label>
                      <input type="password" id="page-signup-password" class="form-input" placeholder="At least 8 characters" required style="width:100%;">
                    </div>

                    <div>
                      <label style="display:block; font-size:var(--font-xs); font-weight:700; color:var(--text-muted); margin-bottom:0.25rem;">
                        Primary Service Needed
                      </label>
                      <select id="page-signup-service" class="form-input" style="width:100%; background:var(--bg-card); color:var(--text-main);">
                        <option value="maintenance">Managed Website Maintenance & Speed</option>
                        <option value="security">24/7 Security WAF & Cloud Backup</option>
                        <option value="seo">Organic SEO Growth Campaign</option>
                        <option value="bundle">All-In-One WebCare Bundle (Save 40%)</option>
                      </select>
                    </div>

                    <div style="display:flex; align-items:flex-start; gap:0.5rem; font-size:0.7rem; color:var(--text-muted); margin-top:0.2rem;">
                      <input type="checkbox" id="page-signup-terms" required checked style="margin-top:2px; accent-color:var(--accent-emerald)">
                      <label for="page-signup-terms" style="cursor:pointer">I agree to the WebCare 24/7 SLA Terms of Service & Privacy Policy</label>
                    </div>

                    <button type="submit" class="btn btn-emerald" style="width:100%; justify-content:center; font-size:var(--font-xs); padding:0.75rem; margin-top:0.2rem;">
                      ✨ Register VIP Client Account
                    </button>
                  </form>
                ` : ''}

                <div style="margin-top:var(--space-md); padding-top:var(--space-xs); border-top:1px dashed var(--border-subtle); text-align:center; font-size:0.7rem; color:var(--text-dim);">
                  Protected by 256-bit SSL & AWS Vault Shield. Need team onboarding? <a href="#contact" style="color:var(--primary)">Speak with Support</a>
                </div>

              </div>

            </div>

          </div>
        </section>
      `;

      // Inject Tab Styles
      if (!document.getElementById('auth-page-tab-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'auth-page-tab-styles';
        styleEl.innerHTML = `
          .auth-page-tab {
            background: transparent;
            border: none;
            color: var(--text-muted);
            padding: 0.6rem;
            border-radius: var(--radius-sm);
            font-size: var(--font-xs);
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
          }
          .auth-page-tab:hover {
            color: var(--text-main);
          }
          .auth-page-tab.active {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 12px var(--primary-glow);
          }
        `;
        document.head.appendChild(styleEl);
      }

      // Tab switcher event handlers
      const btnTabLogin = container.querySelector('#tab-auth-login');
      const btnTabSignup = container.querySelector('#tab-auth-signup');

      if (btnTabLogin) {
        btnTabLogin.addEventListener('click', () => {
          authTab = 'login';
          render();
        });
      }

      if (btnTabSignup) {
        btnTabSignup.addEventListener('click', () => {
          authTab = 'signup';
          render();
        });
      }

      // Login form handler
      const loginForm = container.querySelector('#form-page-login');
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = (container.querySelector('#page-login-email') as HTMLInputElement).value.trim();
          if (!email) return;

          const derivedName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Client User';
          loginUser(email, derivedName);
          window.dispatchEvent(new CustomEvent('webcare:authChange'));
          render();
        });
      }

      // Demo login handler
      const demoBtn = container.querySelector('#btn-one-click-demo');
      if (demoBtn) {
        demoBtn.addEventListener('click', () => {
          loginUser('alex@mybusinesssite.com', 'Alex Mercer');
          window.dispatchEvent(new CustomEvent('webcare:authChange'));
          render();
        });
      }

      // Signup form handler
      const signupForm = container.querySelector('#form-page-signup');
      if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = (container.querySelector('#page-signup-name') as HTMLInputElement).value.trim();
          const company = (container.querySelector('#page-signup-company') as HTMLInputElement).value.trim();
          const email = (container.querySelector('#page-signup-email') as HTMLInputElement).value.trim();
          if (!email) return;

          saveStoredUser({
            name: name || 'VIP Client',
            email,
            company: company || 'My Business',
            isLoggedIn: true,
            role: 'VIP Active Client'
          });
          window.dispatchEvent(new CustomEvent('webcare:authChange'));
          render();
        });
      }

      return;
    }

    // ==========================================
    // PAGE STATE 2: LOGGED IN - PREMIUM CLIENT PORTAL & MY ACCOUNT PAGE
    // ==========================================
    container.innerHTML = `
      <section style="padding:var(--space-md) 0 var(--space-2xl) 0; background:radial-gradient(circle at 50% 0%, #0d1527 0%, var(--bg-dark) 80%);">
        <div class="container" style="max-width:1280px;">

          <!-- TOP VIP BANNER & KPI METRICS -->
          <div style="background:linear-gradient(135deg, #0e182a 0%, #16243d 100%); border:1px solid var(--border-accent); border-radius:var(--radius-lg); padding:var(--space-md) var(--space-lg); margin-bottom:var(--space-md); box-shadow:var(--shadow-card);">
            
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:var(--space-md); border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-md);">
              <div style="display:flex; align-items:center; gap:1rem;">
                <div style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--accent-cyan)); display:flex; align-items:center; justify-content:center; font-size:1.4rem; font-weight:800; color:white; box-shadow:0 0 15px var(--primary-glow); flex-shrink:0;">
                  ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.2rem; flex-wrap:wrap;">
                    <span class="badge-discount" style="font-size:0.65rem; background:linear-gradient(135deg, #3b82f6, #06b6d4)">${user.role || 'VIP ENTERPRISE CLIENT'}</span>
                    <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700">● 24/7/365 DevOps Guard Active</span>
                  </div>
                  <h1 style="font-size:var(--font-lg); font-weight:800; color:var(--text-main); line-height:1.2;">
                    Welcome back, ${user.name} <span style="font-size:var(--font-xs); font-weight:500; color:var(--text-muted)">(${user.company || 'Acme Corp'})</span>
                  </h1>
                  <div style="font-size:var(--font-xs); color:var(--text-muted); margin-top:0.2rem;">
                    Account Email: <strong style="color:var(--text-main)">${user.email}</strong>
                  </div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
                <button id="btn-nav-account" class="btn btn-secondary btn-sm" style="border-color:var(--primary); color:var(--primary)">
                  👤 My Account & Settings
                </button>
                <a href="#custom-builder" class="btn btn-primary btn-sm">+ Add Domain</a>
                <button id="btn-quick-emergency" class="btn btn-emerald btn-sm">🚨 SLA Emergency Support</button>
                <button id="btn-dash-logout" class="btn btn-secondary btn-sm" style="border-color:rgba(239,68,68,0.4); color:#f87171;">
                  🔓 Log Out
                </button>
              </div>
            </div>

            <!-- KPI Cards Grid -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:0.85rem;">
              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700">PROTECTED DOMAINS</div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--text-main); line-height:1.2; margin-top:2px;">
                  ${subscriptions.length} <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700">Active</span>
                </div>
                <div style="font-size:0.65rem; color:var(--text-dim); margin-top:2px">100% SLA Uptime Shield</div>
              </div>

              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700">GLOBAL SLA UPTIME</div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--accent-emerald); line-height:1.2; margin-top:2px;">
                  99.99%
                </div>
                <div style="font-size:0.65rem; color:var(--text-dim); margin-top:2px">Avg Response: 184ms</div>
              </div>

              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700">WAF THREATS BLOCKED</div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--accent-cyan); line-height:1.2; margin-top:2px;">
                  1,842
                </div>
                <div style="font-size:0.65rem; color:var(--text-dim); margin-top:2px">Zero Zero-Day Breaches</div>
              </div>

              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700">DEV RETAINER HOURS</div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--text-main); line-height:1.2; margin-top:2px;">
                  6.5 <span style="font-size:0.85rem; color:var(--text-muted)">/ 10 hrs</span>
                </div>
                <div style="font-size:0.65rem; color:var(--accent-emerald); margin-top:2px">3.5 hrs left this cycle</div>
              </div>

              <div style="background:rgba(16, 185, 129, 0.08); border:1px solid rgba(16, 185, 129, 0.25); padding:0.75rem 1rem; border-radius:var(--radius-md);">
                <div style="font-size:0.65rem; color:var(--accent-emerald); font-weight:700">ANNUAL DISCOUNTS</div>
                <div style="font-size:1.5rem; font-weight:800; color:var(--accent-emerald); line-height:1.2; margin-top:2px;">
                  $1,420<span style="font-size:0.75rem">/yr</span>
                </div>
                <div style="font-size:0.65rem; color:var(--accent-emerald); margin-top:2px">✓ 40% Yearly Discount Saved</div>
              </div>
            </div>

          </div>

          <!-- MAIN PORTAL SUB-NAVIGATION TABS -->
          <div style="display:flex; gap:0.5rem; overflow-x:auto; padding-bottom:0.5rem; margin-bottom:var(--space-md); border-bottom:1px solid var(--border-subtle);">
            <button class="portal-tab ${activeTab === 'sites' ? 'active' : ''}" data-tab="sites">
              🌐 Monitored Sites (${subscriptions.length})
            </button>
            <button class="portal-tab ${activeTab === 'tickets' ? 'active' : ''}" data-tab="tickets">
              🚨 Support Tickets (${allTickets.length})
            </button>
            <button class="portal-tab ${activeTab === 'seo' ? 'active' : ''}" data-tab="seo">
              📈 SEO Rank Tracker
            </button>
            <button class="portal-tab ${activeTab === 'security' ? 'active' : ''}" data-tab="security">
              🔒 Security & Cloud Vault
            </button>
            <button class="portal-tab ${activeTab === 'billing' ? 'active' : ''}" data-tab="billing">
              💳 Billing & Invoices
            </button>
            <button class="portal-tab ${activeTab === 'account' ? 'active' : ''}" data-tab="account">
              👤 My Account & Profile
            </button>
          </div>

          <!-- TAB CONTENT AREAS -->

          <!-- TAB 1: WEBSITES & SUBSCRIPTIONS -->
          ${activeTab === 'sites' ? `
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm); flex-wrap:wrap; gap:0.5rem">
                <h2 style="font-size:var(--font-md); font-weight:800; color:var(--text-main);">Active Managed Domains</h2>
                <span style="font-size:var(--font-xs); color:var(--text-muted)">Real-time SLA health, cloud backups, & PageSpeed scores</span>
              </div>

              <div style="display:flex; flex-direction:column; gap:var(--space-sm);">
                ${subscriptions.map(sub => `
                  <div class="interactive-panel" style="border-left:4px solid var(--primary);">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:var(--space-sm);">
                      <div>
                        <div style="display:flex; align-items:center; gap:0.6rem;">
                          <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main)">${sub.domainName}</h3>
                          <span class="badge-discount" style="font-size:0.6rem; padding:0.15rem 0.5rem">${sub.status.toUpperCase()}</span>
                          <span style="font-size:0.7rem; color:var(--accent-emerald); font-weight:700">● Live 100% Uptime</span>
                        </div>
                        <div style="font-size:var(--font-xs); color:var(--text-muted); margin-top:2px;">
                          Package: <strong style="color:var(--text-main)">${sub.planName}</strong> | Billed <strong style="color:var(--accent-emerald); text-transform:capitalize">${sub.billingCycle} ($${sub.amount}/mo)</strong>
                        </div>
                      </div>

                      <div style="display:flex; gap:0.5rem;">
                        <button class="btn btn-secondary btn-sm btn-audit-sim" data-domain="${sub.domainName}">⚡ Run Instant Audit</button>
                        <button class="btn btn-emerald btn-sm btn-new-ticket-for" data-domain="${sub.domainName}">+ Request Task</button>
                      </div>
                    </div>

                    <!-- Health Grid -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem; background:#090e17; padding:var(--space-xs) var(--space-sm); border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:var(--space-xs);">
                      <div>
                        <div style="font-size:0.65rem; color:var(--text-dim);">UPTIME GUARD</div>
                        <div style="font-size:var(--font-xs); font-weight:700; color:var(--accent-emerald)">99.99% (Checked 1m ago)</div>
                      </div>
                      <div>
                        <div style="font-size:0.65rem; color:var(--text-dim);">PAGESPEED SCORE</div>
                        <div style="font-size:var(--font-xs); font-weight:700; color:var(--accent-cyan)">Mobile 96 / Desktop 99</div>
                      </div>
                      <div>
                        <div style="font-size:0.65rem; color:var(--text-dim);">CLOUD BACKUP SNAPSHOT</div>
                        <div style="font-size:var(--font-xs); font-weight:700; color:var(--text-main)">Today 03:00 AM (OK)</div>
                      </div>
                      <div>
                        <div style="font-size:0.65rem; color:var(--text-dim);">WAF SECURITY SHIELD</div>
                        <div style="font-size:var(--font-xs); font-weight:700; color:var(--primary)">Active (0 Threats)</div>
                      </div>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:var(--font-xs); color:var(--text-dim); padding-top:0.3rem; border-top:1px dashed var(--border-subtle);">
                      <span>Subscription ID: <strong>${sub.id}</strong> | Activated: ${sub.createdAt}</span>
                      <span>Next Renewal: <strong style="color:var(--text-main)">${sub.nextBillingDate}</strong></span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- TAB 2: SUPPORT & EMERGENCY BUG TICKETS -->
          ${activeTab === 'tickets' ? `
            <div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:var(--gap-grid);">

                <!-- Submit Ticket Form Panel -->
                <div class="interactive-panel" style="height:fit-content;">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--space-xs)">
                    <h3 style="font-size:var(--font-md); font-weight:800; color:var(--accent-cyan)">
                      🚨 Submit SLA Task or Fix
                    </h3>
                    <span style="font-size:0.65rem; color:var(--accent-emerald); font-weight:700">15m Response SLA</span>
                  </div>
                  <p style="font-size:var(--font-xs); color:var(--text-muted); margin-bottom:var(--space-sm);">
                    Need code changes, plugin updates, or emergency bug fixes? Our senior web engineers resolve tasks directly.
                  </p>

                  <form id="ticket-form" style="display:flex; flex-direction:column; gap:0.75rem;">
                    <div>
                      <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">Task Subject</label>
                      <input type="text" id="tck-subject" class="form-input" placeholder="e.g. Broken checkout button or PageSpeed fix" required style="width:100%;">
                    </div>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem">
                      <div>
                        <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">Category</label>
                        <select id="tck-type" class="form-input" style="width:100%; background:var(--bg-card); color:var(--text-main);">
                          <option value="Bug Fix">Emergency Bug Fix</option>
                          <option value="Update">Core / Plugin Update</option>
                          <option value="SEO Audit">SEO Optimization</option>
                          <option value="Custom Dev">Custom Feature Add-on</option>
                        </select>
                      </div>

                      <div>
                        <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">Priority Level</label>
                        <select id="tck-priority" class="form-input" style="width:100%; background:var(--bg-card); color:var(--text-main);">
                          <option value="Normal">Normal (24h SLA)</option>
                          <option value="High">High (4h SLA)</option>
                          <option value="Emergency">🚨 Emergency Critical (15m SLA)</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; margin-top:0.25rem;">
                      🚀 Dispatch SLA Engineer Task
                    </button>
                  </form>
                </div>

                <!-- Ticket History List -->
                <div class="interactive-panel">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-xs); flex-wrap:wrap; gap:0.5rem">
                    <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main)">SLA Ticket Queue</h3>
                    
                    <div style="display:flex; gap:0.25rem;">
                      <button id="flt-all" class="btn btn-xs ${ticketFilter === 'all' ? 'btn-primary' : 'btn-secondary'}">All (${allTickets.length})</button>
                      <button id="flt-active" class="btn btn-xs ${ticketFilter === 'active' ? 'btn-primary' : 'btn-secondary'}">Active</button>
                      <button id="flt-resolved" class="btn btn-xs ${ticketFilter === 'resolved' ? 'btn-primary' : 'btn-secondary'}">Resolved</button>
                    </div>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:0.5rem; max-height:450px; overflow-y:auto; padding-right:0.25rem;">
                    ${allTickets.filter(t => ticketFilter === 'all' ? true : ticketFilter === 'active' ? t.status !== 'Resolved' : t.status === 'Resolved').map(t => `
                      <div style="background:#090e17; border:1px solid var(--border-subtle); padding:0.75rem; border-radius:var(--radius-sm); border-left:3px solid ${t.priority === 'Emergency' ? '#ef4444' : t.priority === 'High' ? '#f59e0b' : '#2563eb'}">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.25rem;">
                          <span style="font-size:0.7rem; font-weight:800; color:var(--text-main)">${t.id}: ${t.subject}</span>
                          <span class="badge-discount" style="font-size:0.55rem; padding:0.1rem 0.4rem; background:${t.status === 'Resolved' ? 'rgba(16,185,129,0.2)' : 'rgba(37,99,235,0.2)'}; color:${t.status === 'Resolved' ? 'var(--accent-emerald)' : 'var(--primary)'}">${t.status}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.65rem; color:var(--text-dim)">
                          <span>Type: <strong style="color:var(--text-muted)">${t.type}</strong> | Priority: <strong style="color:${t.priority === 'Emergency' ? '#ef4444' : 'var(--text-muted)'}">${t.priority}</strong></span>
                          <span>Opened: ${t.date}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

              </div>
            </div>
          ` : ''}

          <!-- TAB 3: LIVE SEO KEYWORD RANK TRACKER -->
          ${activeTab === 'seo' ? `
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm); flex-wrap:wrap; gap:0.5rem">
                <div>
                  <h2 style="font-size:var(--font-md); font-weight:800; color:var(--text-main)">Google SERP Keyword Intelligence</h2>
                  <p style="font-size:var(--font-xs); color:var(--text-muted)">Live daily rank positions for client search targets</p>
                </div>
                <button class="btn btn-emerald btn-sm" id="btn-add-keyword">+ Track New Keyword Target</button>
              </div>

              <div class="interactive-panel" style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; text-align:left; font-size:var(--font-xs);">
                  <thead>
                    <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted)">
                      <th style="padding:0.75rem 1rem">Target Keyword</th>
                      <th style="padding:0.75rem 1rem">Google Position</th>
                      <th style="padding:0.75rem 1rem">24h Change</th>
                      <th style="padding:0.75rem 1rem">Monthly Volume</th>
                      <th style="padding:0.75rem 1rem">Ranking Landing Page</th>
                      <th style="padding:0.75rem 1rem">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${seoKeywords.map(kw => `
                      <tr style="border-bottom:1px solid var(--border-subtle)">
                        <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-main)">${kw.keyword}</td>
                        <td style="padding:0.75rem 1rem"><strong style="font-size:1rem; color:var(--accent-emerald)">#${kw.position}</strong></td>
                        <td style="padding:0.75rem 1rem; color:${kw.change.startsWith('+') ? 'var(--accent-emerald)' : 'var(--text-muted)'}; font-weight:700">${kw.change}</td>
                        <td style="padding:0.75rem 1rem; color:var(--text-muted)">${kw.volume}</td>
                        <td style="padding:0.75rem 1rem; color:var(--primary)">${kw.url}</td>
                        <td style="padding:0.75rem 1rem"><span class="badge-discount" style="font-size:0.6rem; padding:0.15rem 0.45rem">${kw.status}</span></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- TAB 4: 24/7 SECURITY & CLOUD SNAPSHOT VAULT -->
          ${activeTab === 'security' ? `
            <div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:var(--gap-grid);">

                <!-- Threat Logs Panel -->
                <div class="interactive-panel">
                  <h3 style="font-size:var(--font-md); font-weight:800; color:var(--accent-cyan); margin-bottom:var(--space-xs)">
                    🛡️ Live WAF Security Threat Log
                  </h3>
                  <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    ${securityLogs.map(log => `
                      <div style="background:#090e17; border:1px solid var(--border-subtle); padding:0.75rem; border-radius:var(--radius-sm)">
                        <div style="display:flex; justify-content:space-between; font-size:0.7rem; font-weight:700; color:var(--text-main); margin-bottom:2px">
                          <span>${log.type}</span>
                          <span style="color:var(--accent-emerald)">${log.status}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:var(--text-dim)">
                          <span>${log.origin}</span>
                          <span>${log.time}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Cloud Backup Snapshots Panel -->
                <div class="interactive-panel">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-xs);">
                    <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main)">
                      💾 AWS Cloud Backup Vault
                    </h3>
                    <button class="btn btn-emerald btn-xs" id="btn-trigger-backup">⚡ Create Snapshot Now</button>
                  </div>
                  <p style="font-size:var(--font-xs); color:var(--text-muted); margin-bottom:var(--space-sm)">
                    Automated encrypted daily offsite backups with 1-click staging sandbox recovery.
                  </p>

                  <div style="display:flex; flex-direction:column; gap:0.5rem">
                    <div style="background:#090e17; border:1px solid var(--border-subtle); padding:0.75rem; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
                      <div>
                        <div style="font-size:0.75rem; font-weight:700; color:var(--text-main)">AWS Vault Snapshot #4910</div>
                        <div style="font-size:0.65rem; color:var(--text-dim)">Created today 03:00 AM | Size: 1.24 GB</div>
                      </div>
                      <button class="btn btn-secondary btn-xs btn-restore-sim">Restore Sandbox</button>
                    </div>

                    <div style="background:#090e17; border:1px solid var(--border-subtle); padding:0.75rem; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
                      <div>
                        <div style="font-size:0.75rem; font-weight:700; color:var(--text-main)">AWS Vault Snapshot #4909</div>
                        <div style="font-size:0.65rem; color:var(--text-dim)">Created 2026-07-28 03:00 AM | Size: 1.22 GB</div>
                      </div>
                      <button class="btn btn-secondary btn-xs btn-restore-sim">Restore Sandbox</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ` : ''}

          <!-- TAB 5: BILLING & INVOICE HISTORY -->
          ${activeTab === 'billing' ? `
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm); flex-wrap:wrap; gap:0.5rem">
                <h2 style="font-size:var(--font-md); font-weight:800; color:var(--text-main)">Billing Receipts & Invoices</h2>
                <a href="#checkout" class="btn btn-primary btn-sm">Update Stripe Payment Method</a>
              </div>

              <div class="interactive-panel" style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; text-align:left; font-size:var(--font-xs);">
                  <thead>
                    <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted)">
                      <th style="padding:0.75rem 1rem">Invoice ID</th>
                      <th style="padding:0.75rem 1rem">Date</th>
                      <th style="padding:0.75rem 1rem">Description</th>
                      <th style="padding:0.75rem 1rem">Amount</th>
                      <th style="padding:0.75rem 1rem">Status</th>
                      <th style="padding:0.75rem 1rem">Tax Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoices.map(inv => `
                      <tr style="border-bottom:1px solid var(--border-subtle)">
                        <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-main)">${inv.id}</td>
                        <td style="padding:0.75rem 1rem; color:var(--text-muted)">${inv.date}</td>
                        <td style="padding:0.75rem 1rem; color:var(--text-main)">${inv.description}</td>
                        <td style="padding:0.75rem 1rem; font-weight:800">$${inv.amount}</td>
                        <td style="padding:0.75rem 1rem"><span class="badge-discount" style="font-size:0.6rem; padding:0.15rem 0.45rem">${inv.status}</span></td>
                        <td style="padding:0.75rem 1rem">
                          <button class="btn btn-secondary btn-sm btn-dl-invoice" data-inv="${inv.id}">PDF Receipt</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- TAB 6: MY ACCOUNT & PROFILE SETTINGS -->
          ${activeTab === 'account' ? `
            <div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:var(--gap-grid);">

                <!-- Profile Information Card -->
                <div class="interactive-panel">
                  <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:var(--space-md); border-bottom:1px solid var(--border-subtle); padding-bottom:var(--space-sm);">
                    <div style="width:52px; height:52px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--accent-cyan)); display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:800; color:white;">
                      ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main);">${user.name}</h3>
                      <div style="font-size:var(--font-xs); color:var(--text-muted);">${user.email}</div>
                      <span class="badge-discount" style="font-size:0.55rem; padding:0.1rem 0.4rem; margin-top:0.25rem; display:inline-block;">${user.role || 'VIP Client'}</span>
                    </div>
                  </div>

                  <h4 style="font-size:var(--font-xs); font-weight:800; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:var(--space-xs);">
                    Personal & Business Information
                  </h4>

                  <form id="form-update-profile" style="display:flex; flex-direction:column; gap:0.75rem;">
                    <div>
                      <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">Full Name</label>
                      <input type="text" id="acc-name" class="form-input" value="${user.name || ''}" style="width:100%;">
                    </div>

                    <div>
                      <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">Business Email Address</label>
                      <input type="email" id="acc-email" class="form-input" value="${user.email || ''}" style="width:100%;">
                    </div>

                    <div>
                      <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">Company / Organization</label>
                      <input type="text" id="acc-company" class="form-input" value="${user.company || ''}" style="width:100%;">
                    </div>

                    <button type="submit" class="btn btn-primary btn-sm" style="width:fit-content; margin-top:0.25rem;">
                      💾 Save Profile Changes
                    </button>
                  </form>
                </div>

                <!-- Security, Password & API Key Panel -->
                <div style="display:flex; flex-direction:column; gap:var(--gap-grid);">

                  <!-- Password & Security -->
                  <div class="interactive-panel">
                    <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main); margin-bottom:var(--space-xs);">
                      🔒 Security & Authentication
                    </h3>

                    <form id="form-update-password" style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:var(--space-md);">
                      <div>
                        <label style="display:block; font-size:0.7rem; color:var(--text-muted); margin-bottom:2px">New Password</label>
                        <input type="password" id="acc-new-pass" class="form-input" placeholder="At least 8 characters" style="width:100%;">
                      </div>
                      <button type="submit" class="btn btn-secondary btn-sm" style="width:fit-content;">Update Password</button>
                    </form>

                    <div style="border-top:1px dashed var(--border-subtle); padding-top:var(--space-xs);">
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                          <div style="font-size:var(--font-xs); font-weight:700; color:var(--text-main);">Two-Factor Authentication (2FA)</div>
                          <div style="font-size:0.65rem; color:var(--text-muted);">Authenticator App & SMS Codes</div>
                        </div>
                        <span class="badge-discount" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald)">ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  <!-- WebCare API Key & Integrations -->
                  <div class="interactive-panel">
                    <h3 style="font-size:var(--font-md); font-weight:800; color:var(--accent-cyan); margin-bottom:var(--space-xs);">
                      🔑 WebCare CMS Integration Token
                    </h3>
                    <p style="font-size:var(--font-xs); color:var(--text-muted); margin-bottom:0.5rem;">
                      Use this token in your WordPress, Webflow, or Shopify plugin to enable automated 1-click bug reporting and speed monitoring.
                    </p>

                    <div style="display:flex; gap:0.5rem; margin-bottom:var(--space-xs);">
                      <input type="text" readonly value="webcare_live_8f92a10b4c81d923" class="form-input" style="font-family:monospace; font-size:0.7rem; width:100%; background:#090e17; color:var(--accent-emerald);">
                      <button class="btn btn-secondary btn-sm" id="btn-copy-api-key">Copy</button>
                    </div>
                  </div>

                  <!-- Danger Zone -->
                  <div class="interactive-panel" style="border-color:rgba(239, 68, 68, 0.3); background:rgba(239, 68, 68, 0.03);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div>
                        <div style="font-size:var(--font-xs); font-weight:800; color:#f87171;">Portal Sign Out</div>
                        <div style="font-size:0.65rem; color:var(--text-muted);">Terminate current VIP Client session</div>
                      </div>
                      <button id="btn-account-logout" class="btn btn-secondary btn-sm" style="border-color:#f87171; color:#f87171;">
                        🔓 Sign Out
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ` : ''}

        </div>
      </section>
    `;

    // Inject styles for portal tabs
    if (!document.getElementById('portal-tab-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'portal-tab-styles';
      styleEl.innerHTML = `
        .portal-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-pill);
          font-size: var(--font-xs);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .portal-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
        }
        .portal-tab.active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: 0 4px 15px var(--primary-glow);
        }
      `;
      document.head.appendChild(styleEl);
    }

    // Attach Event Listeners
    container.querySelectorAll('.portal-tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        activeTab = tabBtn.getAttribute('data-tab') as any;
        render();
      });
    });

    const btnNavAccount = container.querySelector('#btn-nav-account');
    if (btnNavAccount) {
      btnNavAccount.addEventListener('click', () => {
        activeTab = 'account';
        render();
      });
    }

    // Logout
    const dashLogoutBtn = container.querySelector('#btn-dash-logout');
    const accountLogoutBtn = container.querySelector('#btn-account-logout');

    const handleLogout = () => {
      logoutUser();
      window.dispatchEvent(new CustomEvent('webcare:authChange'));
      render();
    };

    if (dashLogoutBtn) dashLogoutBtn.addEventListener('click', handleLogout);
    if (accountLogoutBtn) accountLogoutBtn.addEventListener('click', handleLogout);

    // Profile update form handler
    const profileForm = container.querySelector('#form-update-profile');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (container.querySelector('#acc-name') as HTMLInputElement).value.trim();
        const email = (container.querySelector('#acc-email') as HTMLInputElement).value.trim();
        const company = (container.querySelector('#acc-company') as HTMLInputElement).value.trim();

        if (!email) return;

        saveStoredUser({
          ...user,
          name: name || user.name,
          email: email || user.email,
          company: company || user.company
        });
        alert('Profile information successfully saved!');
        render();
      });
    }

    // Password update handler
    const passForm = container.querySelector('#form-update-password');
    if (passForm) {
      passForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Password updated successfully!');
        (container.querySelector('#acc-new-pass') as HTMLInputElement).value = '';
      });
    }

    // Copy API key
    const copyKeyBtn = container.querySelector('#btn-copy-api-key');
    if (copyKeyBtn) {
      copyKeyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('webcare_live_8f92a10b4c81d923');
        alert('WebCare CMS Integration Token copied to clipboard!');
      });
    }

    // Ticket filters
    const fltAll = container.querySelector('#flt-all');
    const fltActive = container.querySelector('#flt-active');
    const fltResolved = container.querySelector('#flt-resolved');
    if (fltAll) fltAll.addEventListener('click', () => { ticketFilter = 'all'; render(); });
    if (fltActive) fltActive.addEventListener('click', () => { ticketFilter = 'active'; render(); });
    if (fltResolved) fltResolved.addEventListener('click', () => { ticketFilter = 'resolved'; render(); });

    // Ticket Form submit
    const ticketForm = container.querySelector('#ticket-form') as HTMLFormElement;
    if (ticketForm) {
      ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = (container.querySelector('#tck-subject') as HTMLInputElement).value;
        const type = (container.querySelector('#tck-type') as HTMLSelectElement).value as any;
        const priority = (container.querySelector('#tck-priority') as HTMLSelectElement).value as any;

        const activeSub = subscriptions[0];
        if (activeSub) {
          const newTicket: MaintenanceTicket = {
            id: 'TCK-' + Math.floor(100 + Math.random() * 900),
            date: new Date().toISOString().split('T')[0],
            subject: subject || 'General Maintenance Task',
            type,
            status: 'In Progress',
            priority
          };

          addTicketToSubscription(activeSub.id, newTicket);
          alert(`Support Ticket #${newTicket.id} dispatched! Our senior engineers are on it.`);
          activeTab = 'tickets';
          render();
        }
      });
    }

    // Interactive action buttons
    const emergencyBtn = container.querySelector('#btn-quick-emergency');
    if (emergencyBtn) {
      emergencyBtn.addEventListener('click', () => {
        activeTab = 'tickets';
        render();
        const subjectInput = container.querySelector('#tck-subject') as HTMLInputElement;
        if (subjectInput) subjectInput.focus();
      });
    }

    container.querySelectorAll('.btn-audit-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        const domain = btn.getAttribute('data-domain');
        alert(`Running instant PageSpeed & Security scan for ${domain}...\n\nResult: 100% Uptime | SSL Valid | Mobile Score 96/100 | Page Speed 0.4s | WAF Active`);
      });
    });

    container.querySelectorAll('.btn-new-ticket-for').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = 'tickets';
        render();
      });
    });

    const addKwBtn = container.querySelector('#btn-add-keyword');
    if (addKwBtn) {
      addKwBtn.addEventListener('click', () => {
        const kw = prompt('Enter new keyword target to track (e.g. "top ecommerce agency"):');
        if (kw) {
          alert(`Keyword "${kw}" added to SERP rank tracking queue! Initial crawl starting.`);
        }
      });
    }

    const triggerBackupBtn = container.querySelector('#btn-trigger-backup');
    if (triggerBackupBtn) {
      triggerBackupBtn.addEventListener('click', () => {
        alert('Creating on-demand Cloud Snapshot to AWS S3 Vault...\n\nSnapshot #4911 successfully created and verified!');
      });
    }

    container.querySelectorAll('.btn-restore-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Simulate 1-Click Restore to staging sandbox? (Zero downtime guarantee)')) {
          alert('Snapshot successfully staged! Live site untouched.');
        }
      });
    });

    container.querySelectorAll('.btn-dl-invoice').forEach(btn => {
      btn.addEventListener('click', () => {
        const invId = btn.getAttribute('data-inv');
        alert(`Downloading Tax Invoice Receipt ${invId}...`);
      });
    });

  };

  render();
}
