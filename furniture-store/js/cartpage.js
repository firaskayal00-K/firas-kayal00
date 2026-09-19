import { renderHeader, renderFooter, art, mountWhatsAppFloat, toast, updateCartBadge, formatPrice } from './components.js';
import { getProducts } from './data.js';
import { getCart, updateCartQty, removeFromCart } from './cart.js';
import { ICONS } from './icons.js';

renderHeader('shop');
renderFooter();
mountWhatsAppFloat();

const products = await getProducts();
const root = document.getElementById('cart-root');

const FREE_SHIP_THRESHOLD = 500;
const FLAT_SHIP = 49;
const PROMO_CODES = { WELCOME10: 0.10, WRENOAK15: 0.15 };
let appliedPromo = null;

function lines() {
  return getCart().map((l) => ({ ...l, product: products.find((p) => p.id === l.id) })).filter((l) => l.product);
}

function render() {
  const items = lines();
  if (!items.length) {
    root.innerHTML = `
      <div class="cart-empty">
        ${ICONS.emptyCart}
        <h3>Your cart is empty</h3>
        <p>Browse the collection and add something you love.</p>
        <a href="shop.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  const subtotal = items.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIP;
  const discount = appliedPromo ? subtotal * appliedPromo.rate : 0;
  const total = subtotal - discount + shipping;

  root.innerHTML = `
    <div class="cart-layout">
      <div id="cart-items">
        ${items.map((l, i) => `
          <div class="cart-item" data-idx="${i}">
            <a href="product.html?id=${l.product.id}">${art(l.product.category, l.product.material)}</a>
            <div>
              <a href="product.html?id=${l.product.id}"><h4>${l.product.name}</h4></a>
              <div class="meta">${l.variant.color || l.product.color} · ${l.variant.size || l.product.size}</div>
              <div class="cart-item-actions">
                <div class="qty-stepper">
                  <button type="button" data-act="minus">${ICONS.minus}</button>
                  <span>${l.qty}</span>
                  <button type="button" data-act="plus">${ICONS.plus}</button>
                </div>
                <button class="remove-link" data-act="remove">Remove</button>
                <button class="remove-link" data-act="save">Save for later</button>
              </div>
            </div>
            <div class="cart-item-price">${formatPrice(l.product.price * l.qty)}</div>
          </div>
        `).join('')}
      </div>

      <div class="summary-card">
        <h3 style="font-size:17px;">Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        ${discount > 0 ? `<div class="summary-row"><span>Discount (${appliedPromo.code})</span><span>-${formatPrice(discount)}</span></div>` : ''}
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>Estimated Total</span><span>${formatPrice(total)}</span></div>
        <p style="font-size:12px;margin-top:10px;">${shipping === 0 ? 'You qualify for free delivery.' : `Add ${formatPrice(FREE_SHIP_THRESHOLD - subtotal)} more for free delivery. Large items may require scheduled delivery.`}</p>

        <div class="promo-row">
          <input type="text" id="promo-input" placeholder="Discount code">
          <button class="btn btn-outline btn-sm" id="promo-apply">Apply</button>
        </div>
        <div class="promo-msg" id="promo-msg"></div>

        <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:16px;">Proceed to Checkout</a>
        <a href="shop.html" class="link-arrow" style="display:block;text-align:center;margin-top:14px;font-size:13px;">Continue Shopping</a>
      </div>
    </div>`;

  root.querySelectorAll('.cart-item').forEach((row) => {
    const idx = Number(row.dataset.idx);
    const line = items[idx];
    row.querySelector('[data-act="minus"]').addEventListener('click', () => {
      updateCartQty(line.id, line.variant, line.qty - 1); updateCartBadge(); render();
    });
    row.querySelector('[data-act="plus"]').addEventListener('click', () => {
      updateCartQty(line.id, line.variant, line.qty + 1); updateCartBadge(); render();
    });
    row.querySelector('[data-act="remove"]').addEventListener('click', () => {
      removeFromCart(line.id, line.variant); updateCartBadge(); toast('Removed from cart'); render();
    });
    row.querySelector('[data-act="save"]').addEventListener('click', () => {
      import('./cart.js').then(({ toggleWishlist }) => toggleWishlist(line.id));
      removeFromCart(line.id, line.variant); updateCartBadge();
      toast('Saved for later — moved to wishlist'); render();
    });
  });

  document.getElementById('promo-apply').addEventListener('click', () => {
    const code = document.getElementById('promo-input').value.trim().toUpperCase();
    const msg = document.getElementById('promo-msg');
    if (!code) return;
    if (PROMO_CODES[code]) {
      appliedPromo = { code, rate: PROMO_CODES[code] };
      msg.textContent = `Code applied — ${Math.round(PROMO_CODES[code] * 100)}% off.`;
      msg.className = 'promo-msg ok';
      render();
    } else {
      appliedPromo = null;
      msg.textContent = 'That code is not valid.';
      msg.className = 'promo-msg err';
    }
  });
}

render();
