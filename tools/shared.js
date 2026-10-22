/* Shared helpers for the build / patch scripts (Node). */
const path = require('path');
const D = require('../assets/js/products-data.js');

const ICON = {
  syringe: '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>',
  flask: '<path d="M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  gem: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  arrowUR: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  pack: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>'
};
const svg = (name, size = 24, extra = '') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${ICON[name]}</svg>`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const uniq = a => [...new Set(a)];
const catById = id => D.CATEGORIES.find(c => c.id === id);
const sizesOf = p => uniq(p.rows.map(r => r[2]));
const marketOf = p => {
  const m = uniq(p.rows.map(r => r[3]).filter(Boolean));
  if (m.includes('Domestic/Export')) return 'Domestic / Export';
  if (m.length) return m[0];
  return uniq(p.rows.map(r => r[4]).filter(Boolean)).join(', ') || '—';
};
const packName = s => /SN$/.test(s) ? 'Staked needle' : /LT$/.test(s) ? 'Luer tip' : /Pen/.test(s) ? 'Pen' : 'Syringe';

/* Header / footer pulled from index.html so every page stays in sync. */
function chrome(indexHtml, prefix, products) {
  const header = indexHtml.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
  const footer = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];
  const fix = h => h.replace(/(href|src)="(?!https?:|#|mailto:|tel:|\.\.\/)([^"]*)"/g, (m, a, v) => `${a}="${prefix}${v}"`);
  const hdr = products ? header.replace(/nav-item active/g, 'nav-item').replace(/mobile-nav-link active/g, 'mobile-nav-link').replace(/(<a href="products.html" class="(?:nav-item|mobile-nav-link))"/g, '$1 active"') : header;
  return { header: fix(hdr), footer: fix(footer) };
}
module.exports = { D, ICON, svg, esc, uniq, catById, sizesOf, marketOf, packName, chrome, path };
