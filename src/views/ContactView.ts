export function renderContactView(container: HTMLElement) {
  container.innerHTML = `
    <section style="padding:var(--space-lg) 0;">
      <div class="container" style="max-width:960px;">
        <div style="text-align:center; margin-bottom:var(--space-md);">
          <span class="badge-discount" style="margin-bottom:var(--space-xs); display:inline-block">24/7 CLIENT SUPPORT</span>
          <h1 class="section-title text-gradient">Speak With Senior Web Engineers & SEO Strategists</h1>
          <p class="section-subtitle">
            Have questions about our 40% yearly subscription discounts, custom multi-site SLA retainers, or emergency hack cleanup guarantees?
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:var(--gap-grid);">
          <!-- Contact Info -->
          <div class="interactive-panel">
            <h3 style="font-size:var(--font-md); font-weight:800; margin-bottom:var(--space-xs); color:var(--primary)">
              WebCare Agency HQ
            </h3>
            <p style="font-size:var(--font-xs); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-sm)">
              Our team operates 24/7/365 across global DevOps & Security centers to guarantee 30-minute emergency outage SLAs.
            </p>

            <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:var(--font-xs)">
              <div style="display:flex; align-items:center; gap:0.6rem">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                <span><strong>Hotline:</strong> +1 (800) 555-CARE (24/7 Emergency Response)</span>
              </div>

              <div style="display:flex; align-items:center; gap:0.6rem">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span><strong>Email:</strong> support@webcare-seo-agency.com</span>
              </div>

              <div style="display:flex; align-items:center; gap:0.6rem">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span><strong>Address:</strong> 500 Tech Boulevard, Suite 400, San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="interactive-panel">
            <h3 style="font-size:var(--font-md); font-weight:800; margin-bottom:var(--space-xs)">
              Send Us a Message
            </h3>
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-input" required placeholder="John Doe" />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" required placeholder="john@company.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Message / Website URL</label>
                <textarea class="form-input" rows="3" required placeholder="Tell us about your website maintenance or SEO needs..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%">
                Send Inquiry to Senior Team
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  const form = container.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Senior Web Strategist assigned. We will get back to you within 15 minutes.');
      (form as HTMLFormElement).reset();
    });
  }
}
