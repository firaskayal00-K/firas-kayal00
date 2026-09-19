import { renderHeader, renderFooter, productCard, art, stars, mountWhatsAppFloat, toast, updateCartBadge, COLOR_SWATCH, formatPrice } from './components.js';
import { getProductById, getRelated, COLORS } from './data.js';
import { addToCart, isWishlisted, toggleWishlist } from './cart.js';
import { ICONS } from './icons.js';

renderHeader('shop');
renderFooter();
mountWhatsAppFloat();

const id = new URLSearchParams(location.search).get('id');
const product = id ? await getProductById(id) : null;
const root = document.getElementById('pd-content');

if (!product) {
  root.innerHTML = `
    <div class="empty-state">
      <h3>We couldn't find that product</h3>
      <p>It may have sold out or the link is out of date.</p>
      <a href="shop.html" class="btn btn-primary">Back to Shop</a>
    </div>`;
} else {
  document.title = `${product.name} — Wren & Oak`;
  document.getElementById('page-title').textContent = document.title;
  document.getElementById('pd-breadcrumbs').innerHTML = `
    <a href="index.html">Home</a><span>/</span>
    <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a><span>/</span>
    <span>${product.name}</span>`;

  const stockLabel = { 'in-stock': ['stock-in', 'In stock, ready to ship'], 'pre-order': ['stock-pre', 'Available for pre-order'], 'out-of-stock': ['stock-out', 'Out of stock'] };
  const [stockClass, stockText] = stockLabel[product.stock];

  const colorOptions = Array.from(new Set([product.color, ...COLORS.filter((c) => c !== product.color)])).slice(0, 4);
  const sizeOptions = ['Small', 'Medium', 'Large'];

  root.innerHTML = `
    <div class="pd-layout">
      <div>
        <div class="pd-gallery-main" id="pd-gallery-main">${art(product.category, product.material)}</div>
        <div class="pd-thumbs" id="pd-thumbs">
          ${['Front view', 'Detail', 'In a room'].map((label, i) => `
            <div class="art ${i === 0 ? 'active' : ''}" data-material="${product.material}" data-label="${label}" title="${label}" tabindex="0"></div>
          `).join('')}
        </div>
      </div>

      <div class="pd-info">
        <span class="eyebrow">${product.category} · ${product.material}</span>
        <h1>${product.name}</h1>
        ${stars(product.rating)}
        <div class="pd-price">
          <span>${formatPrice(product.price)}</span>
          ${product.compareAt ? `<span class="price-compare">${formatPrice(product.compareAt)}</span>` : ''}
        </div>
        <div class="stock-badge ${stockClass}"><span class="stock-dot"></span>${stockText}</div>

        <p style="margin-top:16px;">${product.description}</p>

        <div class="variant-group">
          <div class="variant-label">Color</div>
          <div class="variant-options" id="color-options">
            ${colorOptions.map((c, i) => `<button type="button" class="variant-opt ${i === 0 ? 'selected' : ''}" data-color="${c}"><span class="swatch" style="background:${COLOR_SWATCH[c]};margin-right:6px;vertical-align:-2px;"></span>${c}</button>`).join('')}
          </div>
        </div>
        <div class="variant-group">
          <div class="variant-label">Size</div>
          <div class="variant-options" id="size-options">
            ${sizeOptions.map((s) => `<button type="button" class="variant-opt ${s === product.size ? 'selected' : ''}" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>

        <div class="qty-row">
          <div class="qty-stepper">
            <button type="button" id="qty-minus">${ICONS.minus}</button>
            <span id="qty-val">1</span>
            <button type="button" id="qty-plus">${ICONS.plus}</button>
          </div>
        </div>

        <div class="pd-actions">
          <button class="btn btn-primary btn-block" id="add-to-cart-btn" ${product.stock === 'out-of-stock' ? 'disabled' : ''}>
            ${product.stock === 'out-of-stock' ? 'Out of Stock' : product.stock === 'pre-order' ? 'Pre-order Now' : 'Add to Cart'}
          </button>
          <button class="icon-btn" id="pd-wish-btn" style="border:1px solid var(--line);width:48px;height:48px;flex-shrink:0;" aria-label="Wishlist">
            ${ICONS.heart}
          </button>
        </div>
        <div class="add-confirm" id="add-confirm">${ICONS.check} Added to your cart</div>

        <div class="pd-tabs">
          <div class="tab-headers">
            <div class="tab-header active" data-tab="desc">Description</div>
            <div class="tab-header" data-tab="dims">Dimensions &amp; Care</div>
            <div class="tab-header" data-tab="reviews">Reviews (${product.reviews})</div>
          </div>
          <div class="tab-panel active" data-panel="desc">
            <p>${product.description}</p>
            <p>Every piece is inspected before it leaves our workshop. Because materials are natural, slight variation in grain and tone is normal and part of the character of the piece.</p>
          </div>
          <div class="tab-panel" data-panel="dims">
            <p><strong>Dimensions:</strong> ${product.dimensions}</p>
            <p><strong>Material:</strong> ${product.material}</p>
            <p><strong>Care:</strong> ${product.care}</p>
          </div>
          <div class="tab-panel" data-panel="reviews">
            <div class="reviews-summary">
              <div class="score">${product.rating.toFixed(1)}</div>
              <div>
                ${stars(product.rating)}
                <div style="font-size:12.5px;color:var(--ink-soft);">Based on ${product.reviews} reviews</div>
              </div>
            </div>
            ${mockReviews(product).map((r) => `
              <div class="review-item">
                <div class="review-head"><span>${r.name}</span><span>${stars(r.rating)}</span></div>
                <p style="margin:0;">${r.text}</p>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;

  // gallery thumbs
  document.querySelectorAll('#pd-thumbs .art').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('#pd-thumbs .art').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // variants
  let selectedColor = colorOptions[0];
  let selectedSize = sizeOptions.includes(product.size) ? product.size : sizeOptions[1];
  document.querySelectorAll('#color-options .variant-opt').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('#color-options .variant-opt').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedColor = btn.dataset.color;
  }));
  document.querySelectorAll('#size-options .variant-opt').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('#size-options .variant-opt').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSize = btn.dataset.size;
  }));

  // quantity
  let qty = 1;
  const qtyVal = document.getElementById('qty-val');
  document.getElementById('qty-minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); qtyVal.textContent = qty; });
  document.getElementById('qty-plus').addEventListener('click', () => { qty = Math.min(20, qty + 1); qtyVal.textContent = qty; });

  // add to cart
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    addToCart(product.id, { color: selectedColor, size: selectedSize }, qty);
    updateCartBadge();
    const confirm = document.getElementById('add-confirm');
    confirm.classList.add('show');
    setTimeout(() => confirm.classList.remove('show'), 2500);
    toast(`Added ${qty} × ${product.name} to cart`);
  });

  // wishlist
  const wishBtn = document.getElementById('pd-wish-btn');
  if (isWishlisted(product.id)) wishBtn.classList.add('active');
  wishBtn.addEventListener('click', () => {
    const active = toggleWishlist(product.id);
    wishBtn.classList.toggle('active', active);
    toast(active ? 'Added to wishlist' : 'Removed from wishlist');
  });

  // tabs
  document.querySelectorAll('.tab-header').forEach((h) => h.addEventListener('click', () => {
    document.querySelectorAll('.tab-header').forEach((x) => x.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((x) => x.classList.remove('active'));
    h.classList.add('active');
    document.querySelector(`.tab-panel[data-panel="${h.dataset.tab}"]`).classList.add('active');
  }));

  // related
  const related = await getRelated(product, 4);
  if (related.length) {
    document.getElementById('related-section').style.display = 'block';
    document.getElementById('related-grid').innerHTML = related.map(productCard).join('');
  }
}

function mockReviews(p) {
  const bank = [
    { name: 'Amara T.', text: 'Even better in person — the material quality is obvious the moment it arrives.' },
    { name: 'Daniel K.', text: 'Took a bit longer to arrive than expected, but well worth the wait. Solid and comfortable.' },
    { name: 'Priya S.', text: 'Exactly as described. Assembly (what little there was) took 10 minutes.' },
  ];
  return bank.map((r, i) => ({ ...r, rating: Math.max(3, Math.round(p.rating) - (i === 1 ? 1 : 0)) }));
}
