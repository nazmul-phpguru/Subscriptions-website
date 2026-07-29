import { getStoredUser, loginUser, logoutUser, saveStoredUser } from '../utils/storage';
import { router } from '../utils/router';

export function renderAuthModal(container: HTMLElement, initialTab: 'login' | 'signup' = 'login', onAuthChange?: () => void) {
  let activeTab: 'login' | 'signup' = initialTab;

  const render = () => {
    const user = getStoredUser();

    container.innerHTML = `
      <div class="modal-backdrop" id="auth-modal-backdrop">
        <div class="modal-content" style="max-width:440px; border:1px solid var(--border-accent); box-shadow:var(--shadow-glow); padding:0; overflow:hidden;">
          
          <!-- Modal Header Bar -->
          <div style="background:linear-gradient(135deg, #0e182a, #16243d); padding:var(--space-sm) var(--space-md); border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--primary)">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <h3 style="font-size:var(--font-md); font-weight:800; color:var(--text-main); margin:0;">
                ${user.isLoggedIn ? 'Client Account Portal' : (activeTab === 'login' ? 'Client Login' : 'Create Client Account')}
              </h3>
            </div>
            <button id="btn-close-auth-modal" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.4rem; line-height:1;">
              &times;
            </button>
          </div>

          <div style="padding:var(--space-md);">
            ${user.isLoggedIn ? `
              <!-- LOGGED IN USER PROFILE SUMMARY -->
              <div style="text-align:center; padding:var(--space-xs) 0;">
                <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--accent-cyan)); display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:800; color:white; margin:0 auto var(--space-xs) auto; box-shadow:0 0 20px var(--primary-glow);">
                  ${user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div style="font-size:var(--font-md); font-weight:800; color:var(--text-main);">${user.name || 'Valued Client'}</div>
                <div style="font-size:var(--font-xs); color:var(--text-muted); margin-bottom:var(--space-xs);">${user.email}</div>

                <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.25rem 0.75rem; background:rgba(16, 185, 129, 0.12); border:1px solid rgba(16, 185, 129, 0.3); border-radius:999px; font-size:0.7rem; font-weight:700; color:var(--accent-emerald); margin-bottom:var(--space-md);">
                  ● ${user.role || 'VIP Active Client'} (${user.company || 'Acme Corp'})
                </div>

                <div style="display:flex; flex-direction:column; gap:0.6rem;">
                  <button id="btn-goto-portal" class="btn btn-primary" style="width:100%;">
                    🚀 Go to Client Portal Dashboard
                  </button>
                  <button id="btn-do-logout" class="btn btn-secondary" style="width:100%; border-color:rgba(239, 68, 68, 0.4); color:#f87171;">
                    🔓 Log Out of Session
                  </button>
                </div>
              </div>
            ` : `
              <!-- LOGGED OUT: TAB SWITCHER -->
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; background:#080d16; padding:0.25rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:var(--space-md);">
                <button id="tab-auth-login" class="btn btn-sm ${activeTab === 'login' ? 'btn-primary' : 'btn-secondary'}" style="width:100%; font-size:0.75rem;">
                  Log In
                </button>
                <button id="tab-auth-signup" class="btn btn-sm ${activeTab === 'signup' ? 'btn-primary' : 'btn-secondary'}" style="width:100%; font-size:0.75rem;">
                  Sign Up
                </button>
              </div>

              <!-- Quick Demo Login Banner -->
              <div style="margin-bottom:var(--space-sm); background:rgba(37, 99, 235, 0.08); border:1px dashed rgba(37, 99, 235, 0.3); padding:0.6rem; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
                <div style="font-size:0.7rem; color:var(--text-muted);">
                  <strong>Demo VIP Client:</strong> alex@mybusinesssite.com
                </div>
                <button id="btn-quick-demo-login" class="btn btn-emerald btn-sm" style="font-size:0.65rem; padding:0.2rem 0.5rem;">
                  ⚡ Quick Demo Login
                </button>
              </div>

              ${activeTab === 'login' ? `
                <!-- LOGIN FORM -->
                <form id="form-auth-login">
                  <div class="form-group">
                    <label class="form-label">Client Email Address</label>
                    <input type="email" id="auth-email" class="form-input" required placeholder="alex@mybusinesssite.com" value="alex@mybusinesssite.com" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" id="auth-password" class="form-input" required placeholder="••••••••" value="password123" />
                  </div>

                  <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.5rem;">
                    Log In to Client Portal
                  </button>
                </form>
              ` : `
                <!-- SIGNUP FORM -->
                <form id="form-auth-signup">
                  <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="signup-name" class="form-input" required placeholder="Alex Mercer" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Business Email Address</label>
                    <input type="email" id="signup-email" class="form-input" required placeholder="alex@mybusinesssite.com" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Company / Website Domain</label>
                    <input type="text" id="signup-company" class="form-input" placeholder="Acme Corp (mybusinesssite.com)" />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Create Password</label>
                    <input type="password" id="signup-password" class="form-input" required placeholder="••••••••" />
                  </div>

                  <button type="submit" class="btn btn-emerald" style="width:100%; margin-top:0.5rem;">
                    Create Free Client Account
                  </button>
                </form>
              `}
            `}
          </div>

        </div>
      </div>
    `;

    // Event listeners
    const closeBtn = container.querySelector('#btn-close-auth-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => { container.innerHTML = ''; });

    const tabLogin = container.querySelector('#tab-auth-login');
    const tabSignup = container.querySelector('#tab-auth-signup');
    if (tabLogin) tabLogin.addEventListener('click', () => { activeTab = 'login'; render(); });
    if (tabSignup) tabSignup.addEventListener('click', () => { activeTab = 'signup'; render(); });

    // Quick demo login
    const demoBtn = container.querySelector('#btn-quick-demo-login');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        loginUser('alex@mybusinesssite.com', 'Alex Mercer');
        container.innerHTML = '';
        if (onAuthChange) onAuthChange();
      });
    }

    // Login Form Submit
    const loginForm = container.querySelector('#form-auth-login') as HTMLFormElement;
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailEl = container.querySelector('#auth-email') as HTMLInputElement;
        const passEl = container.querySelector('#auth-password') as HTMLInputElement;
        const email = emailEl ? emailEl.value.trim() : '';
        const password = passEl ? passEl.value : '';
        if (!email || !password) return;

        const derivedName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Client User';
        loginUser(email, derivedName);
        container.innerHTML = '';
        if (onAuthChange) onAuthChange();
      });
    }

    // Signup Form Submit
    const signupForm = container.querySelector('#form-auth-signup') as HTMLFormElement;
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameEl = container.querySelector('#signup-name') as HTMLInputElement;
        const emailEl = container.querySelector('#signup-email') as HTMLInputElement;
        const companyEl = container.querySelector('#signup-company') as HTMLInputElement;
        const passEl = container.querySelector('#signup-password') as HTMLInputElement;

        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const company = companyEl ? companyEl.value.trim() : '';
        const password = passEl ? passEl.value : '';
        if (!email || !password) return;

        saveStoredUser({
          name: name || 'Valued Client',
          email: email,
          company: company || 'My Company',
          isLoggedIn: true,
          role: 'VIP Active Client'
        });

        container.innerHTML = '';
        if (onAuthChange) onAuthChange();
      });
    }

    // Go to portal
    const gotoBtn = container.querySelector('#btn-goto-portal');
    if (gotoBtn) {
      gotoBtn.addEventListener('click', () => {
        container.innerHTML = '';
        router.navigate('dashboard');
      });
    }

    // Logout
    const logoutBtn = container.querySelector('#btn-do-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        logoutUser();
        container.innerHTML = '';
        if (onAuthChange) onAuthChange();
      });
    }

    // Backdrop click
    const backdrop = container.querySelector('#auth-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          container.innerHTML = '';
        }
      });
    }
  };

  render();
}
