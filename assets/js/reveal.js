/*
 * Scroll reveal for every page.
 * Uses the same .reveal-init / .reveal-left / .reveal-right / .reveal-scale
 * classes as the About page. Blocks listed in AUTO get those classes added here,
 * so pages don't need them hard-coded in the HTML. Load at the end of <body>.
 */
(function () {
  var AUTO = [
    ['.banner-content-box, .cta-banner-card, .trust-card, .center-vial-wrapper, .quality-showcase-box', 'reveal-scale'],
    ['.hero-visual, .contact-form-box, .pdp-enquiry-card, .pd-visual', 'reveal-right'],
    ['.contact-info-col, .contact-main-grid > div:first-child', 'reveal-left'],
    ['.section-header, .syringe-range-head, .process-header-row, .testimonials-header-row, ' +
     '.hero-title, .hero-desc, .hero-facility, .hero-cta-group, .stat-item, ' +
     '.facility-card, .capability-card, .step-card, .why-card, .product-filter-container, ' +
     '.products-grid-showcase, .syringe-type-card, .assurance-item, .testimonial-card, .faq-item, ' +
     '.contact-pill-item, .commitment-card, .catalog-sidebar, .pcard-grid, ' +
     '.pd-summary-cell, .pd-block, .pd-side > *, .pd-related, .footer-grid > *', 'reveal-init']
  ];
  var REVEAL = '.reveal-init, .reveal-left, .reveal-right, .reveal-scale';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    AUTO.forEach(function (rule) {
      document.querySelectorAll(rule[0]).forEach(function (el) {
        // skip blocks already animated, or sitting inside one that is
        if (el.matches(REVEAL) || (el.parentElement && el.parentElement.closest(REVEAL))) return;
        el.classList.add(rule[1]);
        el.setAttribute('data-reveal-auto', '');

        // stagger siblings of the same kind (cards in a grid, hero lines, ...)
        var same = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.matches(rule[0]); });
        var i = same.indexOf(el);
        if (same.length > 1 && i > 0) el.classList.add('delay-' + Math.min(i, 6));
      });
    });
  }

  var items = document.querySelectorAll(REVEAL);
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-revealed');
      obs.unobserve(el);

      // Auto-added blocks drop the reveal classes once they've landed, so the
      // card's own hover lift / transitions work again.
      if (el.hasAttribute('data-reveal-auto')) {
        setTimeout(function () {
          el.classList.remove('reveal-init', 'reveal-left', 'reveal-right', 'reveal-scale', 'is-revealed',
            'delay-1', 'delay-2', 'delay-3', 'delay-4', 'delay-5', 'delay-6');
          el.removeAttribute('data-reveal-auto');
        }, 1700);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' }); // a ratio threshold never fires for very tall blocks (product grids)

  items.forEach(function (el) { observer.observe(el); });
})();
