      (function () {
        const DATA = window.GOVIND_DATA;
        const cats = {};
        DATA.CATEGORIES.forEach(c => { cats[c.id] = c; });
        const PER_PAGE = 6;
        const uniq = a => Array.from(new Set(a));
        const productsData = DATA.PRODUCTS.map(p => {
          const markets = uniq(p.rows.map(r => r[3]).filter(Boolean));
          const materials = uniq(p.rows.map(r => r[4]).filter(Boolean));
          return {
            url: 'products/' + p.slug + '.html',
            categoryId: p.cat,
            category: cats[p.cat].short,
            title: p.name,
            desc: p.desc,
            delivery: uniq(p.rows.map(r => r[2])).join(' · '),
            strength: p.rows.length > 1 ? p.rows.length + ' strengths' : p.rows[0][1],
            material: markets.includes('Domestic/Export') ? 'Domestic / Export' : (markets[0] || materials.join(', ') || '—'),
            search: (p.name + ' ' + p.desc + ' ' + cats[p.cat].name + ' ' + p.rows.map(r => r[1]).join(' ')).toLowerCase()
          };
        });

        let currentCategory = 'all', searchQuery = '', currentPage = 1;
        const grid = () => document.getElementById('hpProductsGrid');

        function filtered() {
          const q = searchQuery.trim().toLowerCase();
          return productsData.filter(p => (currentCategory === 'all' || p.categoryId === currentCategory) && (!q || p.search.includes(q)));
        }

        function renderProducts() {
          const list = filtered();
          const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
          if (currentPage > totalPages) currentPage = totalPages;
          const pageItems = list.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
          document.getElementById('hpShowingNum').textContent = pageItems.length;
          document.getElementById('hpTotalNum').textContent = list.length;
          const paginationNav = document.getElementById('hpPaginationNav');

          if (!pageItems.length) {
            grid().innerHTML = '<div class="catalog-empty" style="grid-column:1/-1">No formulations match your search.</div>';
            paginationNav.innerHTML = ''; paginationNav.style.display = 'none';
            return;
          }

          grid().innerHTML = pageItems.map(p => `
            <a href="${p.url}" class="product-card-replica">
              <div>
                <div class="card-head-row">
                  <div class="cat-hashtag-badge"><span># ${p.category}</span></div>
                  <div class="card-arrow-circle">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </div>
                </div>
                <h3 class="card-item-title">${p.title}</h3>
                <p class="card-item-desc">${p.desc}</p>
              </div>
              <div>
                <div class="card-delivery-strip">
                  <div class="delivery-icon-bubble">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>
                  </div>
                  <div>
                    <div class="delivery-tag-label">PFS SIZE</div>
                    <div class="delivery-tag-val">${p.delivery}</div>
                  </div>
                </div>
                <div class="card-specs-footer">
                  <div>
                    <div class="spec-title-tiny">STRENGTH</div>
                    <div class="spec-text-val" title="${p.strength}">${p.strength}</div>
                  </div>
                  <div style="text-align: right;">
                    <div class="spec-title-tiny">MARKET</div>
                    <div class="spec-material-val">${p.material}</div>
                  </div>
                </div>
              </div>
            </a>`).join('');

          if (totalPages <= 1) { paginationNav.innerHTML = ''; paginationNav.style.display = 'none'; return; }
          paginationNav.style.display = 'flex';
          let navHtml = `<button type="button" class="page-nav-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''} aria-label="Previous page"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`;
          for (let i = 1; i <= totalPages; i++) navHtml += `<button type="button" class="page-nav-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
          navHtml += `<button type="button" class="page-nav-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''} aria-label="Next page"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`;
          paginationNav.innerHTML = navHtml;
        }

        function init() {
          renderProducts();
          const searchInput = document.getElementById('hpProductSearch');
          if (searchInput) searchInput.addEventListener('input', function () { searchQuery = this.value; currentPage = 1; renderProducts(); });

          const resetBtn = document.getElementById('hpResetBtn');
          if (resetBtn) resetBtn.addEventListener('click', function () {
            searchQuery = ''; currentCategory = 'all'; currentPage = 1;
            if (searchInput) searchInput.value = '';
            document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
            renderProducts();
          });

          const catContainer = document.getElementById('hpCategoryButtons');
          if (catContainer) catContainer.addEventListener('click', function (e) {
            const btn = e.target.closest('.category-filter-btn');
            if (!btn) return;
            document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            currentPage = 1;
            renderProducts();
          });

          const paginationNav = document.getElementById('hpPaginationNav');
          if (paginationNav) paginationNav.addEventListener('click', function (e) {
            const btn = e.target.closest('.page-nav-btn');
            if (!btn || btn.disabled) return;
            const page = parseInt(btn.getAttribute('data-page'), 10);
            if (page && page !== currentPage) {
              currentPage = page; renderProducts();
              const section = document.getElementById('product');
              if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }

        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
      })();
