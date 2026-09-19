import { ICONS, categoryIcon } from './icons.js';
import { CATEGORIES, COLOR_SWATCH, formatPrice } from './data.js';
import { cartCount, isWishlisted, toggleWishlist } from './cart.js';

export function art(category, material, { className = '' } = {}) {
  return `<div class="art ${className}" data-material="${material || ''}">${categoryIcon(category)}</div>`;
}

export function stars(rating) {
  const full = Math.round(rating);
  return `<span class="rating">${Array.from({ length: 5 }).map((_, i) =>
    `<svg viewBox="0 0 24 24" fill="${i < full ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.4"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 5.9 21l1.4-6.8-5-4.7 6.8-.8L12 2.5Z"/></svg>`
  ).join('')}<span>${rating.toFixed(1)}</span></span>`;
}

export function productCard(p) {
  const wished = isWishlisted(p.id);
  const badges = [];
  if (p.isNew) badges.push('<span class="pill pill-new">New</span>');
  if (p.isBestseller) badges.push('<span class="pill pill-best">Bestseller</span>');
  if (p.compareAt) badges.push('<span class="pill pill-sale">Sale</span>');
  if (p.stock === 'out-of-stock') badges.push('<span class="pill pill-out">Out of stock</span>');

  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-badges">${badges.join('')}</div>
    <button class="wish-btn ${wished ? 'active' : ''}" data-wish="${p.id}" aria-label="Toggle wishlist">${ICONS.heart}</button>
    <a href="product.html?id=${p.id}">${art(p.category, p.material)}</a>
    <div class="product-info">
      <a href="product.html?id=${p.id}"><h3>${p.name}</h3></a>
      <div class="product-meta">${p.category} · ${p.material} · ${p.color}</div>
      <div class="price-row">
        <span>${formatPrice(p.price)}</span>
        ${p.compareAt ? `<span class="price-compare">${formatPrice(p.compareAt)}</span>` : ''}
      </div>
      ${stars(p.rating)}
    </div>
  </div>`;
}

export function renderHeader(active = '') {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
    <div class="announce-bar">Free delivery on orders over $500 · Scheduled white-glove delivery available</div>
    <div class="container header-top">
      <a href="index.html" class="logo">Wren <span>&amp;</span> Oak</a>
      <div class="search-box">
        <span>${ICONS.search}</span>
        <input type="search" id="global-search" placeholder="Search sofas, tables, decor..." autocomplete="off">
        <div class="search-suggest" id="search-suggest"></div>
      </div>
      <div class="header-actions">
        <button class="icon-btn" id="mobile-nav-toggle" aria-label="Menu">${ICONS.menu}</button>
        <a class="icon-btn" href="cart.html" aria-label="Wishlist page" title="Account (demo)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6"/></svg>
        </a>
        <a class="icon-btn" href="cart.html" aria-label="Cart">
          ${ICONS.cart}
          <span class="badge-count" id="cart-badge" style="display:none">0</span>
        </a>
      </div>
    </div>
    <nav class="header-nav">
      <div class="container">
        <ul id="header-nav-list">
          <li><a href="shop.html" data-nav="shop">Shop All</a></li>
          ${CATEGORIES.map((c) => `<li><a href="shop.html?category=${encodeURIComponent(c)}" data-nav="${c}">${c}</a></li>`).join('')}
          <li><a href="about.html" data-nav="about">About</a></li>
          <li><a href="contact.html" data-nav="contact">Contact</a></li>
        </ul>
      </div>
    </nav>`;

  if (active) {
    el.querySelectorAll('[data-nav]').forEach((a) => {
      if (a.dataset.nav === active) a.classList.add('active');
    });
  }

  updateCartBadge();
  wireSearch();
  wireHeaderWishlistDelegation();
}

function wireHeaderWishlistDelegation() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-wish]');
    if (!btn) return;
    e.preventDefault();
    const active = toggleWishlist(btn.dataset.wish);
    btn.classList.toggle('active', active);
    toast(active ? 'Added to wishlist' : 'Removed from wishlist');
  });
}

async function wireSearch() {
  const input = document.getElementById('global-search');
  const box = document.getElementById('search-suggest');
  if (!input || !box) return;
  const { getProducts } = await import('./data.js');
  const all = await getProducts();

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { box.classList.remove('open'); box.innerHTML = ''; return; }
    const matches = all.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 6);
    box.innerHTML = matches.length
      ? matches.map((p) => `<a href="product.html?id=${p.id}">${categoryIcon(p.category)}<span>${p.name}</span></a>`).join('')
      : `<div class="muted">No products found for "${input.value}"</div>`;
    box.classList.add('open');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      window.location.href = `shop.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });

  document.addEventListener('click', (e) => {
    if (!box.contains(e.target) && e.target !== input) box.classList.remove('open');
  });
}

export function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
}

window.addEventListener('wo-storage-change', updateCartBadge);

export function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="index.html" class="logo">Wren <span>&amp;</span> Oak</a>
          <p style="margin-top:12px;max-width:280px;">Thoughtfully made furniture for warmer, calmer homes. Visit our showroom or shop the full collection online.</p>
          <div class="social-row">
            <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            ${CATEGORIES.slice(0, 5).map((c) => `<li><a href="shop.html?category=${encodeURIComponent(c)}">${c}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="about.html">Showroom &amp; Hours</a></li>
            <li><a href="cart.html">Track an Order</a></li>
            <li><a href="#">Delivery &amp; Returns</a></li>
            <li><a href="#">Warranty</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p style="font-size:13.5px;">Style guides, new arrivals, and offers — no spam.</p>
          <form class="footer-signup" style="display:flex;gap:8px;margin-top:10px;">
            <input type="email" required placeholder="Email address" style="flex:1;padding:9px 12px;border-radius:8px;border:1px solid var(--line);font-size:13px;">
            <button class="btn btn-primary btn-sm" type="submit">Join</button>
          </form>
          <div class="newsletter-msg" id="footer-newsletter-msg" style="min-height:16px;"></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Wren &amp; Oak Furniture Co. All rights reserved.</span>
        <span>Prototype storefront — demo data, no real orders are placed.</span>
      </div>
    </div>`;

  const form = el.querySelector('.footer-signup');
  const msg = document.getElementById('footer-newsletter-msg');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = "You're on the list. Thanks for joining!";
    form.reset();
  });
}

let toastTimer = null;
export function toast(message) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

export function mountWhatsAppFloat() {
  const a = document.createElement('a');
  a.href = 'https://wa.me/10000000000?text=' + encodeURIComponent('Hi! I have a question about a product.');
  a.className = 'wa-float';
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Chat on WhatsApp');
  a.innerHTML = ICONS.whatsapp;
  document.body.appendChild(a);
}

export { COLOR_SWATCH, formatPrice };
