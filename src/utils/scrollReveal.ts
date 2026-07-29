/**
 * Scroll Reveal Utility - Automatically observes sections, cards, and interactive
 * panels and applies smooth cubic-bezier reveal transitions on scroll.
 */

let observer: IntersectionObserver | null = null;

export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  const targetSelectors = [
    'section',
    '.interactive-panel',
    '.pricing-card',
    '.package-card',
    '.feature-card',
    '.benefit-card',
    '.service-card',
    '.review-card',
    '.audit-card',
    '.hero-content',
    '.pricing-header',
    '.section-title'
  ];

  const elements = document.querySelectorAll(targetSelectors.join(', '));

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers without IntersectionObserver
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer?.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    }
  );

  // Group elements in parent containers to apply subtle staggered delays
  const parentContainers = document.querySelectorAll('.grid-2, .grid-3, .grid-4, .reviews-slider-track');
  
  parentContainers.forEach((container) => {
    const children = container.querySelectorAll(targetSelectors.join(', '));
    children.forEach((child, index) => {
      const htmlChild = child as HTMLElement;
      if (!htmlChild.classList.contains('scroll-reveal')) {
        htmlChild.classList.add('scroll-reveal');
        // Add staggered delay up to 0.4s max
        const delay = Math.min((index % 4) * 0.08, 0.32);
        htmlChild.style.transitionDelay = `${delay}s`;
      }
    });
  });

  elements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (!htmlEl.classList.contains('scroll-reveal')) {
      htmlEl.classList.add('scroll-reveal');
    }

    // If element is already in initial viewport, reveal immediately
    const rect = htmlEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      htmlEl.classList.add('revealed');
    } else {
      observer?.observe(htmlEl);
    }
  });
}
