import './index.css';
import './styles/main.css';
import { renderHeader } from './components/Header';
import { renderFooter } from './components/Footer';
import { router } from './utils/router';
import { initScrollReveal } from './utils/scrollReveal';

import { renderHomeView } from './views/HomeView';
import { renderPricingView } from './views/PricingView';
import { renderMaintenanceView } from './views/MaintenanceView';
import { renderSecurityView } from './views/SecurityView';
import { renderSeoPackagesView } from './views/SeoPackagesView';
import { renderAuditToolView } from './views/AuditToolView';
import { renderQuoteCalculatorView } from './views/QuoteCalculatorView';
import { renderDashboardView } from './views/DashboardView';
import { renderContactView } from './views/ContactView';
import { renderCheckoutModal } from './views/CheckoutView';
import { renderStripeCheckoutView, setPendingCheckoutPlan } from './views/StripeCheckoutView';

const headerMount = document.getElementById('header-mount')!;
const appMount = document.getElementById('app')!;
const footerMount = document.getElementById('footer-mount')!;
const modalMount = document.getElementById('modal-mount')!;

function openCheckout(planId: string, category: string) {
  setPendingCheckoutPlan(planId, category);
  router.navigate('checkout');
}

function renderApp(route: string) {
  if (!appMount) return;

  // Clear any modal mount contents
  if (modalMount) modalMount.innerHTML = '';

  // Re-render Header & Footer to update active links, cycle state & breadcrumbs
  if (headerMount) {
    renderHeader(headerMount, () => {
      renderApp(router.getCurrentRoute());
    });
  }
  if (footerMount) {
    renderFooter(footerMount);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Smooth View Transition Animation Trigger (0.7s cubic-bezier)
  appMount.classList.remove('view-transition-fade');
  void appMount.offsetWidth;
  appMount.classList.add('view-transition-fade');

  switch (route) {
    case 'maintenance':
      renderMaintenanceView(appMount, openCheckout);
      break;
    case 'security':
      renderSecurityView(appMount, openCheckout);
      break;
    case 'seo-packages':
      renderSeoPackagesView(appMount, openCheckout);
      break;
    case 'pricing':
      renderPricingView(appMount, openCheckout);
      break;
    case 'custom-builder':
    case 'calculator':
      renderQuoteCalculatorView(appMount, openCheckout);
      break;
    case 'audit-tool':
      renderAuditToolView(appMount, openCheckout);
      break;
    case 'checkout':
      renderStripeCheckoutView(appMount);
      break;
    case 'login':
    case 'dashboard':
      renderDashboardView(appMount);
      break;
    case 'contact':
      renderContactView(appMount);
      break;
    case 'home':
    default:
      renderHomeView(appMount, openCheckout);
      break;
  }

  // Initialize Smooth Scroll Reveal Animations across the page
  requestAnimationFrame(() => {
    initScrollReveal();
  });
}

// Subscribe to route changes
router.subscribe((route) => {
  renderApp(route);
});

// Subscribe to auth state changes (Login / Signup / Logout)
window.addEventListener('webcare:authChange', () => {
  renderApp(router.getCurrentRoute());
});

// Initialize application safely regardless of DOM loading state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    router.init();
  });
} else {
  router.init();
}
