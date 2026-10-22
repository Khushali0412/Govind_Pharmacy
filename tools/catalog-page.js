    (function () {
      var DATA = window.GOVIND_DATA;
      var ACCENT = __ACCENT__;
      var cats = {};
      DATA.CATEGORIES.forEach(function (c) { cats[c.id] = c; });
      var IMGS = ['syringes-lab', 'syringes-row', 'hand-syringe', 'syringe-lab-hero', 'syringes-white'];
      var state = { cat: 'all', q: '', market: 'all', view: 'cards' };
      var $ = function (id) { return document.getElementById(id); };
      var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
      var uniq = function (a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); };
      var ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>';

      function matches(p, row) {
        if (state.cat !== 'all' && p.cat !== state.cat) return false;
        if (state.market !== 'all') {
          if (state.market === 'Export' ? row[3] !== 'Export' : row[3] !== 'Domestic/Export') return false;
        }
        if (state.q) {
          var hay = (p.name + ' ' + p.desc + ' ' + cats[p.cat].name + ' ' + row[1] + ' ' + row[2]).toLowerCase();
          if (hay.indexOf(state.q) === -1) return false;
        }
        return true;
      }

      function filtered() {
        var out = [];
        DATA.PRODUCTS.forEach(function (p) {
          var rows = p.rows.filter(function (r) { return matches(p, r); });
          if (rows.length) out.push({ p: p, rows: rows });
        });
        return out;
      }

      function cardHtml(g) {
        var p = g.p, sizes = uniq(g.rows.map(function (r) { return r[2]; }));
        return '<a href="products/' + p.slug + '.html" class="pcard" style="--accent:' + ACCENT[p.cat] + '">' +
          '<div class="pcard-img"><img src="assets/images/brochure/' + IMGS[DATA.PRODUCTS.indexOf(p) % IMGS.length] + '.jpg" alt="" loading="lazy"></div>' +
          '<div class="pcard-top"><span class="pcard-cat">' + esc(cats[p.cat].short) + '</span><span class="pcard-arrow">' + ARROW + '</span></div>' +
          '<h3>' + esc(p.name) + '</h3><p>' + esc(p.desc) + '</p>' +
          '<div class="pcard-meta">' +
          '<div class="pcard-meta-row"><span>PFS size</span><span class="pcard-sizes">' + sizes.map(function (s) { return '<span class="gr-chip">' + esc(s) + '</span>'; }).join('') + '</span></div>' +
          '<div class="pcard-meta-row"><span>Strength</span><span>' + (g.rows.length > 1 ? g.rows.length + ' strengths' : esc(g.rows[0][1])) + '</span></div>' +
          '</div></a>';
      }

      function tableHtml(groups) {
        var html = '<div class="catalog-table-wrap"><table class="catalog-table"><thead><tr><th>Sr.</th><th>Product</th><th>Strength</th><th>PFS size</th><th>Market / Material</th></tr></thead><tbody>';
        var last = null;
        groups.forEach(function (g) {
          if (g.p.cat !== last) { last = g.p.cat; html += '<tr class="group-row"><td colspan="5">' + esc(cats[last].name) + '</td></tr>'; }
          g.rows.forEach(function (r) {
            var tag = r[3] ? '<span class="gr-chip is-green">' + esc(r[3].replace('/', ' / ')) + '</span>' : (r[4] ? '<span class="gr-chip is-outline">' + esc(r[4]) + '</span>' : '—');
            html += '<tr><td class="sr">' + r[0] + '</td><td><a href="products/' + g.p.slug + '.html">' + esc(g.p.name) + '</a></td><td>' + esc(r[1]) + '</td><td><span class="gr-chip">' + esc(r[2]) + '</span></td><td>' + tag + '</td></tr>';
          });
        });
        return html + '</tbody></table></div>';
      }

      function render() {
        var groups = filtered();
        var rowCount = groups.reduce(function (a, g) { return a + g.rows.length; }, 0);
        $('catCount').textContent = state.view === 'table' ? rowCount : groups.length;
        $('catCountLabel').textContent = state.view === 'table' ? 'presentations' : (groups.length === 1 ? 'product' : 'products');
        if (!groups.length) { $('catResults').innerHTML = '<div class="catalog-empty">No products match your filters.</div>'; return; }
        $('catResults').innerHTML = state.view === 'table' ? tableHtml(groups) : '<div class="pcard-grid">' + groups.map(cardHtml).join('') + '</div>';
      }

      function setActive(container, attr, val) {
        Array.prototype.forEach.call(container.querySelectorAll('button'), function (b) { b.classList.toggle('active', b.getAttribute(attr) === val); });
      }

      function setMode(mode) {
        Array.prototype.forEach.call(document.querySelectorAll('.catalog-mode-btn'), function (b) { b.classList.toggle('active', b.getAttribute('data-mode') === mode); });
        $('panel-formulations').hidden = mode !== 'formulations';
        $('panel-empty-syringes').hidden = mode !== 'empty-syringes';
      }

      $('catSearch').addEventListener('input', function () { state.q = this.value.trim().toLowerCase(); render(); });
      $('catList').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        state.cat = b.getAttribute('data-cat'); setActive($('catList'), 'data-cat', state.cat); render();
      });
      $('marketToggle').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        state.market = b.getAttribute('data-market'); setActive($('marketToggle'), 'data-market', state.market); render();
      });
      $('viewToggle').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        state.view = b.getAttribute('data-view'); setActive($('viewToggle'), 'data-view', state.view); render();
      });
      $('catReset').addEventListener('click', function () {
        state = { cat: 'all', q: '', market: 'all', view: state.view };
        $('catSearch').value = ''; setActive($('catList'), 'data-cat', 'all'); setActive($('marketToggle'), 'data-market', 'all'); render();
      });
      Array.prototype.forEach.call(document.querySelectorAll('.catalog-mode-btn'), function (b) {
        b.addEventListener('click', function () {
          var m = b.getAttribute('data-mode'); setMode(m);
          history.replaceState(null, '', m === 'empty-syringes' ? '#empty-syringes' : location.pathname + location.search);
        });
      });

      var params = new URLSearchParams(location.search);
      if (params.get('cat') && cats[params.get('cat')]) { state.cat = params.get('cat'); setActive($('catList'), 'data-cat', state.cat); }
      if (location.hash === '#empty-syringes') setMode('empty-syringes');
      render();
    })();
