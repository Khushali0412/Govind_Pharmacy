/* Syncs header/footer from index.html and applies brochure copy to about / contact / services. */
const fs = require('fs');
const { D, esc, chrome } = require('./shared.js');
const index = fs.readFileSync('index.html', 'utf8');
const { header, footer } = chrome(index, '');

const PHONE_OLD = /\+91 \(0\) 123 456 7890/g, TEL_OLD = /tel:\+911234567890/g;
const common = s => s
  .replace(PHONE_OLD, D.CONTACT.phone).replace(TEL_OLD, 'tel:+917946033735')
  .replace(/WHO-GMP/g, 'ISO &amp; GMP')
  .replace(/<link rel="stylesheet" href="css\/style.css">(?!\s*<link rel="stylesheet" href="css\/catalog.css">)/, '<link rel="stylesheet" href="css/style.css">\n  <link rel="stylesheet" href="css/catalog.css">');

function sync(file, active, edit) {
  let s = fs.readFileSync(file, 'utf8');
  const hdr = header
    .replace(/nav-item active/g, 'nav-item').replace(/mobile-nav-link active/g, 'mobile-nav-link')
    .replace(new RegExp(`(<a href="${active}" class="nav-item)"`), '$1 active"')
    .replace(new RegExp(`(<a href="${active}" class="mobile-nav-link)"`), '$1 active"');
  s = s.replace(/<header class="site-header">[\s\S]*?<\/header>/, () => hdr);
  s = s.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, () => footer);
  s = common(s);
  if (edit) s = edit(s);
  fs.writeFileSync(file, s);
  console.log('updated', file);
}
const rep = (s, re, to, label) => { if (!re.test(s)) console.warn('MISS:', label); return s.replace(re, () => to); };

/* ---------------- about ---------------- */
sync('about.html', 'about.html', s => {
  s = rep(s, /<meta name="description" content="[^"]*">/, '<meta name="description" content="About Govind Remedies Pvt. Ltd. - advance sterile drug delivery through finished dosage formulations and prefilled syringe technology, ISO &amp; GMP certified.">', 'meta');
  s = rep(s, /25\+ YEARS EXPERIENCE/, 'ISO &amp; GMP CERTIFIED', 'badge');
  s = rep(s, /100% Sterile Quality Assured/, 'Precision | Purity | Performance', 'pill');
  s = rep(s, /Committed to Your Care<br>Every Step of the Way/, 'Advance Sterile<br>Drug Delivery', 'h2');
  s = rep(s, /With a team of world-class formulation scientists[\s\S]*?to every patient\./,
    'Govind Remedies is your trusted partner in sterile injectable formulations and advanced drug delivery. We operate two dedicated facilities &mdash; Finished Dosage Formulation and Prefilled Syringe Technology &mdash; supported by a complete range of empty glass and COC / COP syringes, cartridges and contrast-media syringes.', 'lead');
  s = rep(s, /Highly Qualified Specialists/, 'Finished Dosage Formulation', 'f1');
  s = rep(s, /Advanced Sterile Equipment/, 'Prefilled Syringe Technology', 'f2');
  s = rep(s, /Patient-Centered Formulations/, 'Empty Glass &amp; COC/COP Syringes', 'f5');
  s = rep(s, /Global Dossier Support/, 'ISO &amp; GMP Certified', 'f6');
  s = rep(s, /<div class="stats-exact-num">500\+<\/div>\s*<div class="stats-exact-lbl">Active Formulations<\/div>/, '<div class="stats-exact-num">76</div>\n<div class="stats-exact-lbl">Injectable Presentations</div>', 's1');
  s = rep(s, /<div class="stats-exact-num">50\+<\/div>\s*<div class="stats-exact-lbl">Countries Supplied<\/div>/, '<div class="stats-exact-num">8</div>\n<div class="stats-exact-lbl">Therapeutic Groups</div>', 's2');
  s = rep(s, /<div class="stats-exact-num">25\+<\/div>\s*<div class="stats-exact-lbl">Years of Experience<\/div>/, '<div class="stats-exact-num">2</div>\n<div class="stats-exact-lbl">Dedicated Facilities</div>', 's3');
  s = rep(s, /<div class="stats-exact-num">100%<\/div>\s*<div class="stats-exact-lbl">Quality Assured<\/div>/, '<div class="stats-exact-num">ISO</div>\n<div class="stats-exact-lbl">&amp; GMP Certified</div>', 's4');
  s = rep(s, /Looking for a Reliable Pharmaceutical Manufacturing Partner\?/, 'Looking for a Reliable Sterile Drug Delivery Partner?', 'cta');
  return s;
});

/* ---------------- services ---------------- */
sync('services.html', 'services.html', s => {
  s = rep(s, /<meta name="description" content="[^"]*">/, '<meta name="description" content="Govind Remedies facilities: finished dosage formulation and prefilled syringe technology for sterile injectables, with empty glass and COC/COP syringes. ISO &amp; GMP certified.">', 'meta');
  s = rep(s, /High-precision sterile filling, prefilled syringe packaging \(PFS\), and liquid parenteral manufacturing under strict ISO &amp; GMP compliance\./, 'Two dedicated facilities for advance sterile drug delivery: Finished Dosage Formulation and Prefilled Syringe Technology &mdash; manufactured under ISO and GMP certification.', 'sub');
  s = rep(s, /Specialized <span class="text-gradient">Manufacturing Infrastructure<\/span>/, 'Advance <span class="text-gradient">Sterile Drug Delivery</span>', 'h1');
  const caps = [
    ['Finished Dosage Formulations', 'Sterile injectable formulations spanning anticoagulants, vitamins, critical care, pain management and more.'],
    ['Prefilled Syringe Technology', 'Advanced prefilled syringes with staked-needle (SN) and Luer-tip (LT) presentations for controlled administration.'],
    ['Empty Glass & COC/COP Syringes', 'Bonded / fixed-needle syringes with non-detachable cannula, from 0.5 ml to 50 ml.'],
    ['Cartridges & Contrast Media', '3 ml glass and COC cartridges plus 150 ml PC and COC contrast-media syringes.']
  ];
  let i = 0;
  s = s.replace(/<h3 class="capability-title">[^<]*<\/h3>\s*<p class="capability-desc">[\s\S]*?<\/p>/g, () => {
    const c = caps[i++]; return `<h3 class="capability-title">${esc(c[0])}</h3>\n              <p class="capability-desc">${esc(c[1])}</p>`;
  });
  s = rep(s, /Discuss Your Pharmaceutical <span class="text-gradient">Manufacturing Needs<\/span>/, 'Discuss Your Sterile <span class="text-gradient">Drug Delivery Needs</span>', 'cta');
  return s;
});

/* ---------------- contact ---------------- */
sync('contact.html', 'contact.html', s => {
  s = rep(s, /Manufacturing Campus<\/div>\s*<div style="font-size: 1rem; font-weight: 600; color: #ffffff;">Pharmaceutical Industrial Complex,\s*Gujarat, India<\/div>/,
    `Factory &amp; Reg. Office</div>
                    <div style="font-size: 1rem; font-weight: 600; color: #ffffff;">${esc(D.CONTACT.factory)}</div>
                    <div style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.05em; margin: 0.9rem 0 0.2rem;">Corporate Office</div>
                    <div style="font-size: 1rem; font-weight: 600; color: #ffffff;">${esc(D.CONTACT.corporate)}</div>`, 'address');
  s = rep(s, /<div style="font-size: 1\.05rem; font-weight: 700; color: #ffffff;">info@govindremedies\.com<\/div>/,
    `<div style="font-size: 1.05rem; font-weight: 700; color: #ffffff;">${D.CONTACT.info}</div>
                    <div style="font-size: 0.9rem; font-weight: 600; color: #cbd5e1; margin-top: 0.3rem;">Exports: ${D.CONTACT.exports}</div>
                    <div style="font-size: 0.9rem; font-weight: 600; color: #cbd5e1;">Domestic: ${D.CONTACT.domestic}</div>`, 'emails');
  return s;
});
