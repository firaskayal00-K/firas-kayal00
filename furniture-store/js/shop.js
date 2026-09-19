import { renderHeader, renderFooter, productCard, mountWhatsAppFloat } from './components.js';
import { getProducts, CATEGORIES, MATERIALS, COLORS, COLOR_SWATCH, applyFiltersAndSort, formatPrice } from './data.js';

renderHeader('shop');
renderFooter();
mountWhatsAppFloat();

const products = await getProducts();
const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)) / 50) * 50;

const params = new URLSearchParams(location.search);
const state = {
  category: params.get('category') || '',
  materials: params.get('materials') ? params.get('materials').split(',') : [],
  colors: params.get('colors') ? params.get('colors').split(',') : [],
  availability: params.get('availability') ? params.get('availability').split(',') : [],
  maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : MAX_PRICE,
  sort: params.get('sort') || 'featured',
  query: params.get('q') || '',
};

const filtersEl = document.getElementById('filters');
const gridEl = document.getElementById('product-grid');
const emptyEl = document.getElementById('empty-state');
const resultCountEl = document.getElementById('result-count');
const activeFiltersEl = document.getElementById('active-filters');
const sortSelect = document.getElementById('sort-select');
const shopTitle = document.getElementById('shop-title');
const crumb = document.getElementById('crumb-current');

sortSelect.value = state.sort;

function syncUrl() {
  const p = new URLSearchParams();
  if (state.category) p.set('category', state.category);
  if (state.materials.length) p.set('materials', state.materials.join(','));
  if (state.colors.length) p.set('colors', state.colors.join(','));
  if (state.availability.length) p.set('availability', state.availability.join(','));
  if (state.maxPrice !== MAX_PRICE) p.set('maxPrice', state.maxPrice);
  if (state.sort !== 'featured') p.set('sort', state.sort);
  if (state.query) p.set('q', state.query);
  history.replaceState(null, '', p.toString() ? `shop.html?${p}` : 'shop.html');
}

function toggleArrayValue(arr, val) {
  const i = arr.indexOf(val);
  if (i >= 0) arr.splice(i, 1); else arr.push(val);
}

function renderFilters() {
  filtersEl.innerHTML = `
    <div class="filter-group">
      <div class="filter-title">Category</div>
      <label class="filter-option"><input type="radio" name="cat" value="" ${!state.category ? 'checked' : ''}> All Categories</label>
      ${CATEGORIES.map((c) => `<label class="filter-option"><input type="radio" name="cat" value="${c}" ${state.category === c ? 'checked' : ''}> ${c}</label>`).join('')}
    </div>

    <div class="filter-group">
      <div class="filter-title">Price</div>
      <div class="price-range">
        <input type="range" id="price-range" min="0" max="${MAX_PRICE}" step="10" value="${state.maxPrice}">
        <div class="val"><span>$0</span><span id="price-range-val">Up to ${formatPrice(state.maxPrice)}</span></div>
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-title">Material</div>
      ${MATERIALS.map((m) => `<label class="filter-option"><input type="checkbox" data-material="${m}" ${state.materials.includes(m) ? 'checked' : ''}> ${m}</label>`).join('')}
    </div>

    <div class="filter-group">
      <div class="filter-title">Color</div>
      ${COLORS.map((c) => `<label class="filter-option"><input type="checkbox" data-color="${c}" ${state.colors.includes(c) ? 'checked' : ''}> <span class="swatch" style="background:${COLOR_SWATCH[c]}"></span> ${c}</label>`).join('')}
    </div>

    <div class="filter-group">
      <div class="filter-title">Availability</div>
      <label class="filter-option"><input type="checkbox" data-avail="in-stock" ${state.availability.includes('in-stock') ? 'checked' : ''}> In stock</label>
      <label class="filter-option"><input type="checkbox" data-avail="pre-order" ${state.availability.includes('pre-order') ? 'checked' : ''}> Pre-order</label>
    </div>
  `;

  filtersEl.querySelectorAll('input[name="cat"]').forEach((el) => el.addEventListener('change', () => {
    state.category = el.value; refresh();
  }));
  filtersEl.querySelector('#price-range').addEventListener('input', (e) => {
    state.maxPrice = Number(e.target.value);
    document.getElementById('price-range-val').textContent = `Up to ${formatPrice(state.maxPrice)}`;
    renderResults();
  });
  filtersEl.querySelector('#price-range').addEventListener('change', syncUrl);
  filtersEl.querySelectorAll('[data-material]').forEach((el) => el.addEventListener('change', () => {
    toggleArrayValue(state.materials, el.dataset.material); refresh();
  }));
  filtersEl.querySelectorAll('[data-color]').forEach((el) => el.addEventListener('change', () => {
    toggleArrayValue(state.colors, el.dataset.color); refresh();
  }));
  filtersEl.querySelectorAll('[data-avail]').forEach((el) => el.addEventListener('change', () => {
    toggleArrayValue(state.availability, el.dataset.avail); refresh();
  }));
}

function renderActiveChips() {
  const chips = [];
  if (state.category) chips.push({ label: state.category, clear: () => (state.category = '') });
  state.materials.forEach((m) => chips.push({ label: m, clear: () => toggleArrayValue(state.materials, m) }));
  state.colors.forEach((c) => chips.push({ label: c, clear: () => toggleArrayValue(state.colors, c) }));
  state.availability.forEach((a) => chips.push({ label: a === 'in-stock' ? 'In stock' : 'Pre-order', clear: () => toggleArrayValue(state.availability, a) }));
  if (state.maxPrice !== MAX_PRICE) chips.push({ label: `Under ${formatPrice(state.maxPrice)}`, clear: () => (state.maxPrice = MAX_PRICE) });
  if (state.query) chips.push({ label: `"${state.query}"`, clear: () => (state.query = '') });

  activeFiltersEl.innerHTML = chips.map((c, i) => `<span class="chip" data-chip="${i}">${c.label} <button aria-label="Remove">×</button></span>`).join('')
    + (chips.length ? `<button class="clear-all" id="clear-all-chips">Clear all</button>` : '');

  chips.forEach((c, i) => {
    activeFiltersEl.querySelector(`[data-chip="${i}"] button`)?.addEventListener('click', () => { c.clear(); refresh(); });
  });
  document.getElementById('clear-all-chips')?.addEventListener('click', () => {
    state.category = ''; state.materials = []; state.colors = []; state.availability = []; state.maxPrice = MAX_PRICE; state.query = '';
    refresh();
  });
}

function renderResults() {
  const results = applyFiltersAndSort(products, state);
  resultCountEl.textContent = `${results.length} product${results.length === 1 ? '' : 's'}`;
  gridEl.style.display = results.length ? 'grid' : 'none';
  emptyEl.style.display = results.length ? 'none' : 'block';
  gridEl.innerHTML = results.map(productCard).join('');

  shopTitle.textContent = state.category ? state.category : 'Shop All Furniture';
  crumb.textContent = state.category ? state.category : 'Shop';
  document.title = `${state.category || 'Shop All Furniture'} — Wren & Oak`;
}

function refresh() {
  renderFilters();
  renderActiveChips();
  renderResults();
  syncUrl();
}

sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; refresh(); });
document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
  state.category = ''; state.materials = []; state.colors = []; state.availability = []; state.maxPrice = MAX_PRICE; state.query = '';
  refresh();
});

renderFilters();
renderActiveChips();
renderResults();
