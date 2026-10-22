/* One-off content patch for index.html (brochure rewrite). */
const fs = require('fs');
const { D, svg, esc } = require('./shared.js');
let s = fs.readFileSync('index.html', 'utf8');
const rep = (re, to, label) => { if (!re.test(s)) { console.warn('MISS:', label); return; } s = s.replace(re, () => to); };

/* head */
rep(/<title>[^<]*<\/title>/, '<title>Govind Remedies Pvt. Ltd. | Advance Sterile Drug Delivery</title>', 'title');
rep(/<meta name="description"\s+content="[^"]*">/, '<meta name="description" content="Govind Remedies - advance sterile drug delivery through finished dosage formulations and prefilled syringe technology. 76 injectable presentations plus empty glass and COC/COP syringes. ISO &amp; GMP certified.">', 'meta');
if (!s.includes('css/catalog.css')) s = s.replace('<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/catalog.css">');

/* hero */
rep(/<h1 class="hero-title">[\s\S]*?<\/p>/,
`<h1 class="hero-title">
              Advance <span class="text-gradient">Sterile Drug Delivery</span>
            </h1>

            <p class="hero-desc">
              Your trusted partner in sterile injectable formulations and advanced drug delivery &mdash; delivered
              through two dedicated facilities.
            </p>

            <div class="hero-facilities">
              <div class="hero-facility">
                <span class="hero-facility-num">01</span>
                <div>
                  <div class="hero-facility-title">Finished Dosage Formulation</div>
                  <div class="hero-facility-sub">Sterile injectable formulations across 8 therapeutic groups</div>
                </div>
              </div>
              <div class="hero-facility">
                <span class="hero-facility-num">02</span>
                <div>
                  <div class="hero-facility-title">Prefilled Syringe Technology</div>
                  <div class="hero-facility-sub">Ready-to-administer syringes, pens and cartridges</div>
                </div>
              </div>
            </div>`, 'hero title');
rep(/<div class="partner-label">Partner With Us<\/div>/, '<div class="partner-label">Exports &amp; Domestic Supply</div>', 'partner');
rep(/<div class="floating-badge-title">Quality-Driven Manufacturing<\/div>[\s\S]*?<div class="avatar-count">50\+<\/div>\s*<\/div>/,
  `<div class="floating-badge-title">ISO &amp; GMP Certified</div>
              <div style="font-size:.7rem;color:#64748B;margin-top:.25rem;">Precision &middot; Purity &middot; Performance</div>`, 'badge top');
rep(/Pharmaceutical Formulations<\/div>\s*<div style="font-size: 0.65rem; color: #64748B;">Reliable Supply & Support<\/div>/,
  `Prefilled Syringe Technology</div>\n                <div style="font-size: 0.65rem; color: #64748B;">Sterile &middot; Precise &middot; Ready to use</div>`, 'badge bottom');

/* trust stats + copy */
rep(/Built Around Quality\. <span class="text-gradient">Driven by Precision\.<\/span>/, 'Sterile by Design. <span class="text-gradient">Precise by Practice.</span>', 'trust h2');
rep(/From formulation development to finished pharmaceutical products, Govind Remedies focuses on\s+consistency, quality and operational precision at every stage of manufacturing\./,
  'Govind Remedies develops and manufactures sterile injectable finished dosage formulations and prefilled syringes, backed by ISO and GMP certification and a complete range of empty syringes and cartridges.', 'trust p');
rep(/<div class="stat-value">500\+<\/div>\s*<div class="stat-label">Active Formulations<\/div>/, '<div class="stat-value">76</div>\n                    <div class="stat-label">Injectable Presentations</div>', 'stat1');
rep(/<div class="stat-value">50\+<\/div>\s*<div class="stat-label">Countries Served<\/div>/, '<div class="stat-value">8</div>\n                    <div class="stat-label">Therapeutic Groups</div>', 'stat2');
rep(/<div class="stat-value">25\+<\/div>\s*<div class="stat-label">Years of Excellence<\/div>/, '<div class="stat-value">2</div>\n                    <div class="stat-label">Dedicated Facilities</div>', 'stat3');
rep(/<div class="stat-value">100%<\/div>\s*<div class="stat-label">Quality Assured<\/div>/, '<div class="stat-value">ISO &amp; GMP</div>\n                    <div class="stat-label">Certified</div>', 'stat4');

/* capabilities cards */
const caps = [
  ['Finished Dosage Formulations', 'Sterile injectable formulations spanning anticoagulants, vitamins, critical care, pain management and more.'],
  ['Prefilled Syringe Technology', 'Advanced prefilled syringes with staked-needle (SN) and Luer-tip (LT) presentations for controlled administration.'],
  ['Empty Glass & COC/COP Syringes', 'Bonded / fixed-needle syringes with non-detachable cannula, from 0.5 ml to 50 ml.'],
  ['Cartridges & Contrast Media', '3 ml glass and COC cartridges plus 150 ml PC and COC contrast-media syringes.']
];
let ci = 0;
s = s.replace(/<h3 class="capability-title">[^<]*<\/h3>\s*<p class="capability-desc">[\s\S]*?<\/p>/g, () => {
  const c = caps[ci++];
  return `<h3 class="capability-title">${esc(c[0])}</h3>\n              <p class="capability-desc">${esc(c[1])}</p>`;
});
rep(/Our Core <span class="text-gradient">Capabilities<\/span>/, 'Our Core <span class="text-gradient">Capabilities</span>', 'noop');

/* facilities section (before capabilities) */
if (!s.includes('id="facilities"')) {
  const synCount = D.EMPTY_SYRINGES.groups.reduce((a, g) => a + g.items.length, 0);
  const fac = `<!-- TWO FACILITIES -->
    <section class="facilities-section" id="facilities">
      <div class="container">
        <div class="section-header">
          <div class="gr-eyebrow">Advance Sterile Drug Delivery</div>
          <h2 class="section-title">Two Facilities. <span class="text-gradient">One Sterile Delivery Partner.</span></h2>
          <p class="section-subtitle">Everything from finished injectable formulations to prefilled syringe technology, under one roof.</p>
        </div>
        <div class="facilities-grid">
          <article class="facility-card" data-num="01">
            <div class="facility-icon">${svg('flask', 28)}</div>
            <h3 class="facility-title">Finished Dosage Formulation</h3>
            <p class="facility-desc">Sterile injectable formulations for domestic and export markets, presented in ready-to-use syringes.</p>
            <ul class="facility-list">
              <li>Anticoagulants, vitamins and nutrient replenishers</li>
              <li>Anticancer, weight management and antidiabetic injectables</li>
              <li>Pain management, critical care and specialty products</li>
              <li>76 injectable presentations in the current portfolio</li>
            </ul>
            <div class="facility-foot">
              <div class="facility-stat"><strong>76</strong><span>Presentations</span></div>
              <a href="products.html" class="facility-link">View formulations ${svg('arrow', 18)}</a>
            </div>
          </article>
          <article class="facility-card is-dark" data-num="02">
            <div class="facility-icon">${svg('syringe', 28)}</div>
            <h3 class="facility-title">Prefilled Syringe Technology</h3>
            <p class="facility-desc">Advanced prefilled syringe technology and a complete empty-syringe range for partners worldwide.</p>
            <ul class="facility-list">
              <li>Staked-needle (SN) and Luer-tip (LT) formats</li>
              <li>Glass and COC / COP barrels from 0.5 ml to 50 ml</li>
              <li>3 ml cartridges and 150 ml contrast-media syringes</li>
              <li>Bonded / fixed needle with non-detachable cannula</li>
            </ul>
            <div class="facility-foot">
              <div class="facility-stat"><strong>${synCount}</strong><span>Syringe formats</span></div>
              <a href="products.html#empty-syringes" class="facility-link">View syringe range ${svg('arrow', 18)}</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    `;
  s = s.replace('<!-- CORE CAPABILITIES -->', () => fac + '<!-- CORE CAPABILITIES -->');
}

/* empty syringes + assurance (before CTA banner) */
if (!s.includes('id="empty-syringes"')) {
  const cards = D.EMPTY_SYRINGES.groups.map(g => `
          <div class="syringe-type-card">
            <h3 class="syringe-type-name">${esc(g.name)} <span class="syringe-type-count">${g.items.length} sizes</span></h3>
            <ul class="syringe-items">
              ${g.items.map(i => `<li>${esc(i)}</li>`).join('\n              ')}
            </ul>
          </div>`).join('');
  const items = [['gem', 'Premium Quality', 'Consistent, inspected components'], ['award', 'ISO & GMP Certified', 'ISO certified company · GMP certificate'], ['target', 'Precise Accuracy', 'Controlled dimensions and dosing'], ['globe', 'Trusted Worldwide', 'Domestic and export supply']];
  const blk = `<!-- EMPTY SYRINGE RANGE -->
    <section class="syringe-range-section" id="empty-syringes">
      <div class="container container-wide">
        <div class="syringe-range-head">
          <div>
            <div class="gr-eyebrow">Empty Syringes</div>
            <h2 class="section-title">Bonded Needle. <span class="text-gradient">Non-Detachable Cannula.</span></h2>
            <p class="section-subtitle" style="margin:0;">A complete range of empty syringes and cartridges in glass and COC / COP.</p>
          </div>
          <div class="syringe-tagline">Precision<span>|</span>Purity<span>|</span>Performance</div>
        </div>
        <div class="syringe-range-grid">${cards}
        </div>
        <div class="syringe-legend"><span><strong>SN</strong> &ndash; Staked (fixed) needle</span><span><strong>LT</strong> &ndash; Luer tip</span><span><strong>COC / COP</strong> &ndash; Cyclic olefin copolymer / polymer</span><span><strong>PC</strong> &ndash; Polycarbonate</span></div>
        <div style="text-align:center;margin-top:2rem;"><a href="contact.html" class="btn btn-primary"><span>Request syringe specifications</span></a></div>
      </div>
    </section>

    <!-- ASSURANCE -->
    <section class="assurance-section" id="assurance">
      <div class="container">
        <div class="assurance-grid">
          ${items.map(i => `<div class="assurance-item">${svg(i[0], 34)}<h3>${esc(i[1])}</h3><p>${esc(i[2])}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>

    `;
  s = s.replace('<!-- CALL TO ACTION BANNER -->', () => blk + '<!-- CALL TO ACTION BANNER -->');
}

/* product showcase */
rep(/A diverse portfolio of pharmaceutical\s+formulations designed around essential healthcare needs, precision-manufactured in advanced facilities\./,
  'Sterile injectable finished dosage formulations in prefilled syringes &mdash; from anticoagulants to critical care. Every product page lists strengths, pack sizes and supply markets.', 'prod sub');
const btns = ['<button type="button" class="category-filter-btn active" data-category="all">All</button>']
  .concat(D.CATEGORIES.map(c => `<button type="button" class="category-filter-btn" data-category="${c.id}">${esc(c.name)}</button>`)).join('\n              ');
const before = s;
s = s.replace(/(<div class="categories-buttons-wrap" id="hpCategoryButtons">)[\s\S]*?(\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Showing Counter -->)/, (m, a, b) => a + '\n              ' + btns + b);
if (s === before) console.warn('MISS: category buttons');
rep(/Showing <strong id="hpShowingNum">\d+<\/strong> of <strong id="hpTotalNum">\d+<\/strong> Formulations/, `Showing <strong id="hpShowingNum">6</strong> of <strong id="hpTotalNum">${D.PRODUCTS.length}</strong> Formulations`, 'counter');

/* product script */
const script = fs.readFileSync(__dirname + '/home-products.js', 'utf8');
const b2 = s;
s = s.replace(/<!-- Product Showcase Controller Script -->\s*<script>[\s\S]*?<\/script>/, () => `<!-- Product Showcase Controller Script -->\n    <script src="assets/js/products-data.js"></script>\n    <script>\n${script}\n    </script>`);
if (s === b2) console.warn('MISS: script');

/* cta */
rep(/Looking for a Reliable Pharmaceutical Manufacturing <span\s+class="text-gradient">Partner\?<\/span>/, 'Looking for a Reliable Sterile Drug Delivery <span\n            class="text-gradient">Partner?</span>', 'cta');
rep(/Connect with Govind Remedies to discuss your product requirements, manufacturing\s+opportunities and potential partnership\./, 'Connect with Govind Remedies to discuss finished dosage formulations, prefilled syringes or empty syringe requirements for your market.', 'cta p');

fs.writeFileSync('index.html', s);
console.log('index.html patched');
