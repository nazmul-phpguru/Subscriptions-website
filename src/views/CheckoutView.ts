import { setPendingCheckoutPlan } from './StripeCheckoutView';
import { router } from '../utils/router';

export function renderCheckoutModal(container: HTMLElement, planId: string, category: string, onClose: () => void, onSuccess: () => void) {
  // Store pending checkout plan and navigate directly to dedicated Stripe Checkout View (no scrollbar popup)
  setPendingCheckoutPlan(planId, category);
  router.navigate('checkout');
}
