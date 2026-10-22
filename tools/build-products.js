/*
 * Generates products.html and products/<slug>.html from assets/js/products-data.js
 * Run from the project root:  node tools/build-products.js
 * Header/footer are copied from index.html, so edit those there first.
 */
const fs = require('fs');
const { D, svg, esc, uniq, catById, sizesOf, marketOf, packName, chrome } = require('./shared.js');

const ACCENT = {
  'anticoagulants': '#012D85', 'vitamins': '#549C36', 'nutrient-replenishers': '#0E7490', 'anticancer': '#6D28D9',
  'weight-antidiabetic': '#B45309', 'pain-management': '#BE123C', 'critical-care': '#0A1F4D', 'others': '#475569'
};

const IMG = ['syringes-lab', 'syringes-row', 'hand-syringe', 'syringe-lab-hero', 'syringes-white'];
const imgFor = (p, prefix) => `${prefix}assets/images/brochure/${IMG[D.PRODUCTS.indexOf(p) % IMG.length]}.jpg`;
const PORTFOLIO = `<div class="syringe-legend" style="display:grid;gap:.5rem;"><strong>Product portfolio</strong><span>&bull; Empty glass and COC / COP RTU prefilled syringes: 0.5 mL to 50 mL</span><span>&bull; Glass and COC RTU pen cartridges</span><span>&bull; PC and COC disposable syringe kits for contrast media</span><span>&bull; Customized medical device solutions</span><strong style="margin-top:.5rem">Quality &amp; regulatory commitment</strong><span>Supported by a medical device manufacturing licence from CDSCO and ISO 13485 certification.</span></div>`;
const index = fs.readFileSync('index.html', 'utf8');
const oldProducts = fs.existsSync('products.html') ? fs.readFileSync('products.html', 'utf8') : '';
const bannerMatch = oldProducts.match(/<section class="page-banner">[\s\S]*?<\/section>/);
const banner = (bannerMatch ? bannerMatch[0].replace(/<p style="color:#cbd5e1;max-width:640px[\s\S]*?<\/p>/, '') : '<section class="page-banner"><div class="container"><h1 class="page-banner-title"></h1></div></section>')
  .replace(/<h1 class="page-banner-title">[\s\S]*?<\/h1>/, `<h1 class="page-banner-title">
            Sterile Injectable <span class="text-gradient">Product Portfolio</span>
          </h1>`);

const head = (title, desc, prefix) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="icon" type="image/svg+xml" href="${prefix}assets/images/favicon.svg">
  <link rel="stylesheet" href="${prefix}css/style.css">
  <link rel="stylesheet" href="${prefix}css/catalog.css">
</head>
<body>
`;

/* ------------------------------------------------------------------ syringe illustration */
function syringeSvg(pack) {
  const isPen = /Pen/.test(pack), isLT = /LT$/.test(pack);
  const tip = isPen
    ? '<rect x="330" y="56" width="40" height="18" rx="4" fill="#e2e8f0"/><rect x="370" y="60" width="26" height="10" rx="3" fill="#cbd5e1"/>'
    : isLT
      ? '<path d="M296 54 L332 61 L332 69 L296 76 Z" fill="#e2e8f0"/><rect x="332" y="58" width="30" height="14" rx="3" fill="#cbd5e1"/><rect x="362" y="55" width="8" height="20" rx="2" fill="#e2e8f0"/>'
      : '<path d="M296 54 L330 62 L330 68 L296 76 Z" fill="#e2e8f0"/><rect x="330" y="59" width="14" height="12" rx="2" fill="#cbd5e1"/><path d="M344 65 L412 65" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round"/>';
  const ticks = Array.from({ length: 9 }, (_, i) => `<path d="M${140 + i * 18} 86 v${i % 2 ? 5 : 9}" stroke="#fff" stroke-opacity=".75" stroke-width="1.5"/>`).join('');
  return `<svg viewBox="0 0 420 130" role="img" aria-label="Prefilled syringe illustration">
    <rect x="4" y="46" width="12" height="38" rx="6" fill="#e2e8f0"/>
    <rect x="14" y="60" width="74" height="10" rx="3" fill="#cbd5e1"/>
    <rect x="84" y="38" width="10" height="54" rx="4" fill="#e2e8f0"/>
    <rect x="94" y="44" width="204" height="42" rx="9" fill="rgba(255,255,255,.14)" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>
    <rect x="130" y="49" width="164" height="32" rx="6" fill="#8CC63F" fill-opacity=".9"/>
    <rect x="120" y="49" width="14" height="32" rx="4" fill="#0A1F4D" stroke="#fff" stroke-opacity=".6"/>
    ${ticks}
    ${tip}
  </svg>`;
}

/* ------------------------------------------------------------------ detail pages */
function detailPage(p) {
  const cat = catById(p.cat), accent = ACCENT[p.cat];
  const sizes = sizesOf(p), market = marketOf(p);
  const hasMaterial = p.rows.some(r => r[4]);
  const hasMarket = p.rows.some(r => r[3]);
  const codes = uniq(sizes.map(s => /SN$/.test(s) ? 'SN' : /LT$/.test(s) ? 'LT' : 'PEN'));
  const { header, footer } = chrome(index, '../', true);
  const related = D.PRODUCTS.filter(x => x.cat === p.cat && x.slug !== p.slug);
  for (let i = (D.PRODUCTS.indexOf(p) + 1) % D.PRODUCTS.length; related.length < 3; i = (i + 1) % D.PRODUCTS.length) {
    const x = D.PRODUCTS[i]; if (x !== p && !related.includes(x)) related.push(x);
  }
  const rel = related.slice(0, 3);

  const rows = p.rows.map(r => `
              <tr>
                <td class="sr">${r[0]}</td>
                <td><span class="strength">${esc(r[1])}</span></td>
                <td><span class="gr-chip">${esc(r[2])}</span><small>${packName(r[2])}</small></td>
                ${hasMarket ? `<td>${r[3] ? `<span class="gr-chip is-green">${esc(r[3].replace('/', ' / '))}</span>` : '—'}</td>` : ''}
                ${hasMaterial ? `<td>${r[4] ? `<span class="gr-chip is-outline">${esc(r[4])}</span>` : '—'}</td>` : ''}
                <td style="text-align:right"><a class="pd-row-link" href="../contact.html?product=${encodeURIComponent(p.name + ' ' + r[1])}">Enquire &rarr;</a></td>
              </tr>`).join('');

  const notes = [];
  if (codes.includes('SN')) notes.push(`<div><b>SN</b><span><strong>Staked needle</strong>Needle permanently bonded to the syringe barrel for a ready-to-administer, single-piece presentation.</span></div>`);
  if (codes.includes('LT')) notes.push(`<div><b>LT</b><span><strong>Luer tip</strong>Luer-tip syringe presentation that accepts a needle or administration set of choice.</span></div>`);
  if (codes.includes('PEN')) notes.push(`<div><b>PEN</b><span><strong>3 ml pen</strong>Pen presentation designed for convenient, controlled self-administration.</span></div>`);

  return head(`${p.name} | Govind Remedies Pvt. Ltd.`, `${p.name} (${cat.name}) - ${p.desc} Available in ${sizes.join(', ')}.`, '../') + `
  <!-- Header -->
  ${header}

  <main class="pd-page">
    <div class="container container-wide">

      <nav class="pd-crumbs" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span class="sep">/</span>
        <a href="../products.html">Products</a><span class="sep">/</span>
        <a href="../products.html?cat=${cat.id}">${esc(cat.short)}</a><span class="sep">/</span>
        <span class="cur">${esc(p.name)}</span>
      </nav>

      <section class="pd-hero" style="--accent:${accent}">
        <div>
          <div class="pd-cat-pill">${svg('flask', 14)} ${esc(cat.name)}</div>
          <h1>${esc(p.name)}</h1>
          <p class="pd-hero-desc">${esc(p.desc)}</p>
          <div class="pd-facts">
            ${sizes.map(s => `<span class="gr-chip">${svg('syringe', 14)} ${esc(s)}</span>`).join('\n            ')}
            <span class="gr-chip">${p.rows.length} ${p.rows.length > 1 ? 'configurations' : 'configuration'}</span>
          </div>
          <div class="pd-hero-cta">
            <a href="../contact.html?product=${encodeURIComponent(p.name)}" class="btn btn-gradient">${svg('mail', 18)}<span>Enquire about ${esc(p.name)}</span></a>
            <a href="../products.html?cat=${cat.id}" class="btn-ghost-light">More in ${esc(cat.short)}</a>
          </div>
        </div>
        <div class="pd-visual">
          <div class="pd-visual-card">
            <div class="pd-photo"><img src="${imgFor(p, '../')}" alt="${esc(p.name)} prefilled syringe"></div>
            <div class="pd-visual-label">
              <span class="gr-chip">${esc(sizes[0])}</span>
              <span class="gr-chip">${esc(p.rows[0][1])}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="pd-summary" aria-label="At a glance">
        <div class="pd-summary-cell"><small>Category</small><strong>${esc(cat.short)}</strong></div>
        <div class="pd-summary-cell"><small>PFS size</small><strong>${esc(sizes.join(' · '))}</strong></div>
        <div class="pd-summary-cell"><small>${hasMarket ? 'Supply market' : 'Container'}</small><strong>${esc(market)}</strong></div>
        <div class="pd-summary-cell"><small>Strengths</small><strong>${p.rows.length}</strong></div>
      </section>

      <div class="pd-main">
        <div>
          <section class="pd-block">
            <h2>${svg('file', 22)} Available configurations</h2>
            <div class="pd-table-wrap">
              <table class="pd-table">
                <thead><tr>
                  <th>Sr. No.</th><th>Strength</th><th>PFS size</th>${hasMarket ? '<th>Market</th>' : ''}${hasMaterial ? '<th>Material</th>' : ''}<th></th>
                </tr></thead>
                <tbody>${rows}
                </tbody>
              </table>
            </div>
            <p class="pd-disclaimer">Specifications follow the Govind Remedies product list. For regulatory dossiers, commercial terms and supply availability for your market, please submit an enquiry.</p>
          </section>
          ${notes.length ? `<section class="pd-block"><h2>${svg('syringe', 22)} Presentation</h2><div class="pd-pack-note">${notes.join('')}</div></section>` : ''}
        </div>

        <aside class="pd-side">
          <div class="pd-enquiry">
            <h3>Request a quote</h3>
            <p>Share your market, quantity and presentation needs and our team will respond with availability.</p>
            <a href="../contact.html?product=${encodeURIComponent(p.name)}" class="btn btn-gradient"><span>Enquire now</span></a>
            <div class="pd-contact-lines">
              <div>Exports: <a href="mailto:${D.CONTACT.exports}">${D.CONTACT.exports}</a></div>
              <div>Domestic: <a href="mailto:${D.CONTACT.domestic}">${D.CONTACT.domestic}</a></div>
              <div>Phone: <a href="tel:+917946033735">${D.CONTACT.phone}</a></div>
            </div>
          </div>
          <div class="pd-why">
            <h3>Why Govind Remedies</h3>
            <ul>
              <li>Advance sterile drug delivery</li>
              <li>Prefilled syringe technology</li>
              <li>ISO &amp; GMP certified</li>
              <li>Domestic and export supply</li>
            </ul>
          </div>
        </aside>
      </div>

      <section class="pd-related">
        <h2>You may also need</h2>
        <div class="pcard-grid">
          ${rel.map(x => card(x, '')).join('\n          ')}
        </div>
      </section>

    </div>
  </main>

  <!-- Footer -->
  ${footer}

</body>
</html>
`;
}

function card(p, prefix) {
  const cat = catById(p.cat);
  const sizes = sizesOf(p);
  return `<a href="${prefix}${p.slug}.html" class="pcard" style="--accent:${ACCENT[p.cat]}">
            <div class="pcard-img"><img src="${imgFor(p, prefix ? '' : '../')}" alt="" loading="lazy"></div>
            <div class="pcard-top"><span class="pcard-cat">${esc(cat.short)}</span><span class="pcard-arrow">${svg('arrowUR', 16)}</span></div>
            <h3>${esc(p.name)}</h3>
            <p>${esc(p.desc)}</p>
            <div class="pcard-meta">
              <div class="pcard-meta-row"><span>PFS size</span><span class="pcard-sizes">${sizes.map(s => `<span class="gr-chip">${esc(s)}</span>`).join('')}</span></div>
              <div class="pcard-meta-row"><span>Strength</span><span>${p.rows.length > 1 ? p.rows.length + ' strengths' : esc(p.rows[0][1])}</span></div>
            </div>
          </a>`;
}

/* ------------------------------------------------------------------ listing page */
function listingPage() {
  const { header, footer } = chrome(index, '', true);
  const total = D.PRODUCTS.reduce((a, p) => a + p.rows.length, 0);
  const synCount = D.EMPTY_SYRINGES.groups.reduce((a, g) => a + g.items.length, 0);
  const sideCats = [`<li><button type="button" class="active" data-cat="all">All formulations <span class="n" data-n="all">${total}</span></button></li>`]
    .concat(D.CATEGORIES.map(c => `<li><button type="button" data-cat="${c.id}">${esc(c.name)} <span class="n" data-n="${c.id}">${D.PRODUCTS.filter(p => p.cat === c.id).reduce((a, p) => a + p.rows.length, 0)}</span></button></li>`)).join('\n              ');
  const syr = D.EMPTY_SYRINGES.groups.map(g => `
          <div class="syringe-type-card">
            <h3 class="syringe-type-name">${esc(g.name)} <span class="syringe-type-count">${g.items.length} sizes</span></h3>
            <ul class="syringe-items">${g.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
          </div>`).join('');

  return head('Product Portfolio | Govind Remedies Pvt. Ltd.', 'Browse Govind Remedies\' sterile injectable finished dosage formulations in prefilled syringes, plus empty glass and COC/COP syringes, cartridges and contrast-media syringes.', '') + `
  <!-- Header -->
  ${header}

  <main>
    ${banner}

    <section class="catalog-section">
      <div class="container container-wide">

        <div class="catalog-modes" role="tablist">
          <button type="button" class="catalog-mode-btn active" role="tab" data-mode="formulations">Finished Dosage Formulations <span class="gr-count">${total}</span></button>
          <button type="button" class="catalog-mode-btn" role="tab" data-mode="empty-syringes">Empty Syringes &amp; Cartridges <span class="gr-count">${synCount}</span></button>
        </div>

        <!-- Formulations -->
        <div class="catalog-panel" id="panel-formulations">
          <div class="catalog-layout">
            <aside class="catalog-sidebar">
              <div class="catalog-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="search" id="catSearch" placeholder="Search name, strength, category…" autocomplete="off" aria-label="Search products">
              </div>
              <div class="catalog-side-title">Therapeutic group</div>
              <ul class="cat-list" id="catList">
              ${sideCats}
              </ul>
              <div class="catalog-side-title">Market</div>
              <div class="market-toggle" id="marketToggle">
                <button type="button" class="active" data-market="all">All</button>
                <button type="button" data-market="Export">Export</button>
                <button type="button" data-market="Domestic/Export">Domestic</button>
              </div>
              <button type="button" class="catalog-reset" id="catReset">Reset filters</button>
            </aside>

            <div>
              <div class="catalog-toolbar">
                <div class="catalog-count">Showing <strong id="catCount">0</strong> <span id="catCountLabel">products</span></div>
                <div class="view-toggle" id="viewToggle">
                  <button type="button" class="active" data-view="cards">Cards</button>
                  <button type="button" data-view="table">Product list</button>
                </div>
              </div>
              <div id="catResults"></div>
            </div>
          </div>
        </div>

        <!-- Empty syringes -->
        <div class="catalog-panel" id="panel-empty-syringes" hidden>
          <div class="empty-syr-intro">
            <div class="gr-eyebrow">Empty Syringes</div>
            <h2 class="section-title">Bonded Needle. <span class="text-gradient">Non-Detachable Cannula.</span></h2>
            <p class="section-subtitle">Precision | Purity | Performance &mdash; empty syringes and cartridges in glass and COC / COP, manufactured under ISO and GMP certification.</p>
          </div>
          <div class="syringe-banner"><img src="assets/images/brochure/syringe-lab-hero.jpg" alt="Empty glass and polymer syringes"></div>
          <div class="syringe-range-grid">${syr}
          </div>
          <div class="syringe-legend"><span><strong>SN</strong> &ndash; Staked (fixed) needle</span><span><strong>LT</strong> &ndash; Luer tip</span><span><strong>COC / COP</strong> &ndash; Cyclic olefin copolymer / polymer</span><span><strong>PC</strong> &ndash; Polycarbonate</span></div>
          ${PORTFOLIO}
          <div style="text-align:center;margin-top:2rem;"><a href="contact.html" class="btn btn-primary"><span>Request syringe specifications</span></a></div>
        </div>

      </div>
    </section>

    <section class="assurance-section">
      <div class="container">
        <div class="assurance-grid">
          ${[['gem', 'Premium Quality', 'Consistent, inspected components'], ['iso', 'ISO & GMP Certified', 'ISO certified company · GMP certificate'], ['target', 'Precise Accuracy', 'Controlled dimensions and dosing'], ['globe', 'Trusted Worldwide', 'Domestic and export supply']].map(i => `<div class="assurance-item"><div class="assurance-icon">${i[0] === 'iso' ? '<img src="assets/images/brochure/iso-logo.png" alt="ISO">' : svg(i[0], 30)}</div><h3>${esc(i[1])}</h3><p>${esc(i[2])}</p></div>`).join(' ')}
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  ${footer}

  <script src="assets/js/products-data.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () { document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) { el.classList.add('is-revealed'); }); });
  </script>
  <script>
${fs.readFileSync(__dirname + '/catalog-page.js', 'utf8').replace('__ACCENT__', JSON.stringify(ACCENT))}
  </script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ write */
fs.mkdirSync('products', { recursive: true });
fs.readdirSync('products').filter(f => f.endsWith('.html')).forEach(f => fs.unlinkSync('products/' + f));
D.PRODUCTS.forEach(p => fs.writeFileSync(`products/${p.slug}.html`, detailPage(p)));
fs.writeFileSync('products.html', listingPage());
console.log(`built products.html + ${D.PRODUCTS.length} product pages`);
