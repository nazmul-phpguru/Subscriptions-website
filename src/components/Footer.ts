import { getStoredUser, logoutUser } from '../utils/storage';
import { renderAuthModal } from './AuthModal';
import { router } from '../utils/router';

export function renderFooter(container: HTMLElement) {
  const user = getStoredUser();

  container.innerHTML = `
    <footer class="site-footer">
      <div class="container" style="max-width:1380px;">
        <!-- Single Horizontal Row with 4 Columns -->
        <div class="footer-4col-row">
          
          <!-- Column 1: Brand & Mission -->
          <div class="footer-col">
            <a href="#home" class="brand-logo" style="text-decoration:none; margin-bottom:0.75rem; display:inline-flex; align-items:center; gap:0.5rem;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary); flex-shrink:0;">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style="color:var(--text-main); font-weight:800; font-size:var(--font-sm);">WebCare<span style="color:var(--primary)">.agency</span></span>
            </a>
            <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.5; margin-bottom:0.75rem;">
              24/7 DevOps web maintenance, zero-day threat security, and automated search rank growth.
            </p>
            <div style="font-size:0.65rem; color:var(--accent-emerald); font-weight:700;">
              ● AWS S3 Multiregion Encrypted Vault
            </div>
          </div>

          <!-- Column 2: Web Care Services -->
          <div class="footer-col">
            <h4 style="font-size:var(--font-xs); font-weight:800; color:var(--text-main); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.75rem;">
              Web Care & Services
            </h4>
            <ul class="footer-links-list">
              <li><a href="#maintenance">Website Maintenance</a></li>
              <li><a href="#security">Security & WAF Shield</a></li>
              <li><a href="#calculator">ROI Quote Calculator</a></li>
              <li><a href="#audit-tool">Instant Speed & Health Audit</a></li>
            </ul>
          </div>

          <!-- Column 3: SEO Growth & Plans -->
          <div class="footer-col">
            <h4 style="font-size:var(--font-xs); font-weight:800; color:var(--text-main); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.75rem;">
              SEO & Subscriptions
            </h4>
            <ul class="footer-links-list">
              <li><a href="#seo-packages">SEO Subscription Plans</a></li>
              <li><a href="#pricing">All-in-One Bundles (40% Off)</a></li>
              <li><a href="#dashboard">SERP Keyword Rank Tracker</a></li>
              <li><a href="#contact">24/7 SLA Emergency Support</a></li>
            </ul>
          </div>

          <!-- Column 4: Client Portal & Auth (Login / Signup / Logout) -->
          <div class="footer-col">
            <h4 style="font-size:var(--font-xs); font-weight:800; color:var(--text-main); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.75rem;">
              Client Account & Auth
            </h4>
            <ul class="footer-links-list">
              <li><a href="#dashboard" style="color:var(--primary); font-weight:700;">🌐 Client VIP Portal</a></li>
              ${user.isLoggedIn ? `
                <li><button id="ft-btn-logout" class="ft-auth-link" style="color:#f87171;">🔓 Log Out (${user.name.split(' ')[0]})</button></li>
              ` : `
                <li><button id="ft-btn-login" class="ft-auth-link">🔐 Client Login</button></li>
                <li><button id="ft-btn-signup" class="ft-auth-link">✨ Create Client Account</button></li>
              `}
              <li><a href="#checkout">Stripe Sandbox Billing</a></li>
            </ul>
          </div>

        </div>

        <!-- Divider Line -->
        <div style="border-top:1px solid rgba(255, 255, 255, 0.08); margin:var(--space-md) 0 var(--space-sm) 0;"></div>

        <!-- Footer Bottom Bar Below -->
        <div class="footer-bottom-bar">
          <span class="footer-copy">© ${new Date().getFullYear()} WebCare Agency. All rights reserved.</span>
          <div style="display:flex; align-items:center; gap:1rem;">
            <span class="footer-status-pill">
              <span class="status-dot-green"></span>
              99.99% SLA Uptime Guard Active
            </span>
          </div>
        </div>

      </div>
    </footer>
  `;

  // Attach Footer Auth Buttons
  const loginBtn = container.querySelector('#ft-btn-login');
  const signupBtn = container.querySelector('#ft-btn-signup');
  const logoutBtn = container.querySelector('#ft-btn-logout');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      router.navigate('login');
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      router.navigate('login');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      window.dispatchEvent(new CustomEvent('webcare:authChange'));
      router.navigate('login');
    });
  }
}
