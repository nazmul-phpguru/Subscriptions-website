import { NAV_MENU } from '../data/navigation';
import { ROUTE_CONFIGS, router } from '../utils/router';
import { getStoredBillingCycle, setStoredBillingCycle, getStoredUser } from '../utils/storage';
import { BillingCycle } from '../types';
import { renderAuthModal } from './AuthModal';

export function renderHeader(container: HTMLElement, onBillingChange?: (cycle: BillingCycle) => void) {
  const currentRoute = router.getCurrentRoute();
  const currentCycle = getStoredBillingCycle();
  const user = getStoredUser();

  container.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <!-- Brand Logo -->
        <a href="#home" class="brand-logo" id="logo-link">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="10" fill="url(#logo-grad)"/>
            <path d="M10 18L15 23L26 12" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 26H26" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2563EB"/>
                <stop offset="1" stop-color="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
          <div>
            <span>WebCare</span><span style="color:var(--primary)">.agency</span>
          </div>
        </a>

        <!-- Desktop Navigation (Multi-Level Depth 3) -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <ul class="nav-list">
            ${NAV_MENU.map(item => {
              const isActive = item.href.replace('#', '') === currentRoute;
              const hasLevel2 = item.children && item.children.length > 0;

              return `
                <li class="nav-item ${isActive ? 'active' : ''}">
                  <a href="${item.href}" class="nav-link">
                    <span>${item.title}</span>
                    ${item.badge ? `<span class="nav-badge" style="${item.badge === '40% OFF' ? 'background:linear-gradient(135deg, #10b981, #059669)' : item.badge === 'HOT' ? 'background:linear-gradient(135deg, #3b82f6, #06b6d4)' : 'background:#2563eb'}">${item.badge}</span>` : ''}
                    ${hasLevel2 ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M6 9l6 6 6-6"/></svg>` : ''}
                  </a>

                  ${hasLevel2 ? `
                    <ul class="submenu-level-2">
                      ${item.children!.map(sub2 => {
                        const hasLevel3 = sub2.children && sub2.children.length > 0;
                        return `
                          <li class="submenu-item-2">
                            <a href="${sub2.href}" class="submenu-link-2">
                              <span class="submenu-title">
                                ${sub2.title}
                                ${hasLevel3 ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>` : ''}
                              </span>
                              ${sub2.description ? `<span class="submenu-desc">${sub2.description}</span>` : ''}
                            </a>

                            ${hasLevel3 ? `
                              <ul class="submenu-level-3">
                                ${sub2.children!.map(sub3 => `
                                  <li>
                                    <a href="${sub3.href}" class="submenu-link-2">
                                      <span class="submenu-title">${sub3.title}</span>
                                      ${sub3.description ? `<span class="submenu-desc">${sub3.description}</span>` : ''}
                                    </a>
                                  </li>
                                `).join('')}
                              </ul>
                            ` : ''}
                          </li>
                        `;
                      }).join('')}
                    </ul>
                  ` : ''}
                </li>
              `;
            }).join('')}
          </ul>
        </nav>

        <!-- Quick Billing Toggle & Action CTA -->
        <div class="hdr-actions-group">
          <!-- Compact Billing Switch -->
          <div class="hdr-billing-toggle" title="40% discount on yearly plans">
            <span style="color:${currentCycle === 'monthly' ? 'var(--text-main)' : 'var(--text-muted)'}">Mo</span>
            <label class="switch" style="transform:scale(0.85); margin:0;">
              <input type="checkbox" id="header-cycle-toggle" ${currentCycle === 'yearly' ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <span style="color:${currentCycle === 'yearly' ? 'var(--accent-emerald)' : 'var(--text-muted)'}; font-weight:700">Yr (-40%)</span>
          </div>

          <!-- Client Auth / Portal Button -->
          ${user.isLoggedIn ? `
            <button class="btn btn-secondary btn-sm hdr-auth-btn" id="hdr-auth-btn" style="display:flex; align-items:center; gap:0.35rem; border-color:var(--border-accent);">
              <span style="width:7px; height:7px; border-radius:50%; background:var(--accent-emerald); box-shadow:0 0 6px var(--accent-emerald)"></span>
              <span class="hdr-auth-text">${user.name.split(' ')[0]}</span>
            </button>
          ` : `
            <button class="btn btn-secondary btn-sm hdr-auth-btn" id="hdr-login-btn">
              🔑 <span class="hdr-auth-text">Client Login</span>
            </button>
          `}

          <a href="#custom-builder" class="btn btn-primary btn-sm hdr-cta-btn">Build Stack</a>

          <!-- Mobile Nav Hamburger Button -->
          <button class="mobile-nav-toggle" id="mobile-toggle-btn" aria-label="Toggle navigation menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Breadcrumb Sub-Bar (Hidden on Home Page) -->
    ${currentRoute !== 'home' ? `
      <div class="breadcrumb-bar">
        <div class="container">
          <ul class="breadcrumb-list">
            ${(ROUTE_CONFIGS[currentRoute] || ROUTE_CONFIGS['home']).breadcrumbs.map((crumb, idx, arr) => `
              <li class="breadcrumb-item">
                ${idx === arr.length - 1 ? `<span>${crumb.title}</span>` : `<a href="${crumb.href}">${crumb.title}</a>`}
              </li>
              ${idx < arr.length - 1 ? `<li class="breadcrumb-separator">/</li>` : ''}
            `).join('')}
          </ul>
        </div>
      </div>
    ` : ''}

    <!-- Mobile Navigation Drawer (Depth 3 Accordion) -->
    <div class="mobile-drawer" id="mobile-drawer-el">
      <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop"></div>
      
      <div class="mobile-drawer-content">
        <div class="mobile-drawer-header">
          <a href="#home" class="brand-logo">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:28px; height:28px;">
              <rect width="36" height="36" rx="10" fill="url(#logo-grad)"/>
              <path d="M10 18L15 23L26 12" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 26H26" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <div><span>WebCare</span><span style="color:var(--primary)">.agency</span></div>
          </a>
          <button id="mobile-close-btn" class="mobile-close-btn" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <ul class="mobile-nav-list">
          ${NAV_MENU.map((item, i1) => {
            const hasLevel2 = item.children && item.children.length > 0;
            return `
              <li class="mobile-nav-item">
                <div class="mobile-nav-row">
                  <a href="${item.href}" class="mobile-nav-link-title">
                    <span>${item.title}</span>
                    ${item.badge ? `<span class="nav-badge" style="${item.badge === '40% OFF' ? 'background:linear-gradient(135deg, #10b981, #059669)' : item.badge === 'HOT' ? 'background:linear-gradient(135deg, #3b82f6, #06b6d4)' : 'background:#2563eb'}">${item.badge}</span>` : ''}
                  </a>
                  ${hasLevel2 ? `
                    <button class="mobile-expand-btn" data-mobile-expand="m1-${i1}" aria-label="Expand submenu">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron-icon"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                  ` : ''}
                </div>

                ${hasLevel2 ? `
                  <ul class="mobile-sub-1" id="m1-${i1}">
                    ${item.children!.map((sub2, i2) => {
                      const hasLevel3 = sub2.children && sub2.children.length > 0;
                      return `
                        <li class="mobile-sub-item">
                          <div class="mobile-sub-row">
                            <a href="${sub2.href}" class="mobile-sub-link-title">${sub2.title}</a>
                            ${hasLevel3 ? `
                              <button class="mobile-expand-btn" data-mobile-expand="m2-${i1}-${i2}" aria-label="Expand level 3 submenu">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron-icon"><path d="M6 9l6 6 6-6"/></svg>
                              </button>
                            ` : ''}
                          </div>

                          ${hasLevel3 ? `
                            <ul class="mobile-sub-2" id="m2-${i1}-${i2}">
                              ${sub2.children!.map(sub3 => `
                                <li>
                                  <a href="${sub3.href}" class="mobile-sub-2-link">${sub3.title}</a>
                                </li>
                              `).join('')}
                            </ul>
                          ` : ''}
                        </li>
                      `;
                    }).join('')}
                  </ul>
                ` : ''}
              </li>
            `;
          }).join('')}
        </ul>

        <div class="mobile-drawer-footer">
          <a href="#dashboard" class="btn btn-emerald btn-sm" style="width:100%; justify-content:center;">Client Portal (${user.isLoggedIn ? user.name.split(' ')[0] : 'Login'})</a>
          <a href="#pricing" class="btn btn-primary btn-sm" style="width:100%; justify-content:center;">View Plans (Save 40%)</a>
        </div>
      </div>
    </div>
  `;

  // Sticky Glassmorphism Header Scrolled State
  const siteHeader = container.querySelector('.site-header');
  const handleScroll = () => {
    if (siteHeader) {
      if (window.scrollY > 15) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Setup Event Listeners
  const toggleCheckbox = container.querySelector('#header-cycle-toggle') as HTMLInputElement;
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', (e) => {
      const newCycle: BillingCycle = (e.target as HTMLInputElement).checked ? 'yearly' : 'monthly';
      setStoredBillingCycle(newCycle);
      if (onBillingChange) onBillingChange(newCycle);
    });
  }

  // Auth Page Navigation trigger
  const hdrAuthBtn = container.querySelector('#hdr-auth-btn');
  const hdrLoginBtn = container.querySelector('#hdr-login-btn');

  const goToPortal = () => {
    router.navigate('login');
  };

  if (hdrAuthBtn) hdrAuthBtn.addEventListener('click', goToPortal);
  if (hdrLoginBtn) hdrLoginBtn.addEventListener('click', goToPortal);

  // Mobile Drawer Toggle
  const mobileBtn = container.querySelector('#mobile-toggle-btn');
  const closeBtn = container.querySelector('#mobile-close-btn');
  const backdropEl = container.querySelector('#mobile-drawer-backdrop');
  const drawerEl = container.querySelector('#mobile-drawer-el') as HTMLElement;

  const closeDrawer = () => {
    if (drawerEl) drawerEl.classList.remove('open');
  };

  if (mobileBtn && drawerEl) {
    mobileBtn.addEventListener('click', () => drawerEl.classList.add('open'));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }
  if (backdropEl) {
    backdropEl.addEventListener('click', closeDrawer);
  }

  // Mobile Accordion Expansion
  container.querySelectorAll('.mobile-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-mobile-expand');
      if (targetId) {
        const subList = container.querySelector(`#${targetId}`);
        if (subList) {
          const isOpen = subList.classList.toggle('open');
          btn.classList.toggle('expanded', isOpen);
        }
      }
    });
  });

  // Close Mobile Drawer when clicking navigation links
  container.querySelectorAll('.mobile-drawer-content a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}
