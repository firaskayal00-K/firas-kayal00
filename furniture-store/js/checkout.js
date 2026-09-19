import { renderHeader, renderFooter, art, mountWhatsAppFloat, updateCartBadge, formatPrice } from './components.js';
import { getProducts } from './data.js';
import { getCart, clearCart } from './cart.js';
import { ICONS } from './icons.js';

renderHeader('shop');
renderFooter();
mountWhatsAppFloat();

const products = await getProducts();
const root = document.getElementById('checkout-root');

const items = getCart().map((l) => ({ ...l, product: products.find((p) => p.id === l.id) })).filter((l) => l.product);

if (!items.length) {
  root.innerHTML = `
    <div class="cart-empty">
      ${ICONS.emptyCart}
      <h3>Your cart is empty</h3>
      <p>Add something to your cart before checking out.</p>
      <a href="shop.html" class="btn btn-primary">Start Shopping</a>
    </div>`;
} else {
  const subtotal = items.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;
  const minDate = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);

  root.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-steps" id="checkout-form">
        <div class="co-section">
          <h3>Contact &amp; Shipping Address</h3>
          <p style="font-size:12.5px;margin:6px 0 0;">Checking out as a guest. <a href="#" class="link-arrow" style="font-size:12.5px;">Have an account? Sign in</a></p>
          <div class="form-grid">
            <div class="form-field"><label>Full name</label><input required placeholder="Jordan Lee"></div>
            <div class="form-field"><label>Email</label><input type="email" required placeholder="you@example.com"></div>
            <div class="form-field full"><label>Street address</label><input required placeholder="123 Maple Street"></div>
            <div class="form-field"><label>City</label><input required placeholder="Springfield"></div>
            <div class="form-field"><label>Postal code</label><input required placeholder="12345"></div>
            <div class="form-field full"><label>Phone</label><input type="tel" required placeholder="+1 555 123 4567"></div>
          </div>
        </div>

        <div class="co-section">
          <h3>Delivery Date &amp; Time</h3>
          <p style="font-size:12.5px;margin:6px 0 0;">Furniture is scheduled for delivery — pick a window that works for you.</p>
          <div class="form-grid">
            <div class="form-field"><label>Delivery date</label><input type="date" id="delivery-date" required min="${minDate}" value="${minDate}"></div>
            <div class="form-field">
              <label>Preferred time</label>
              <select id="delivery-time" required>
                <option>Morning (8am – 12pm)</option>
                <option>Afternoon (12pm – 4pm)</option>
                <option>Evening (4pm – 8pm)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="co-section">
          <h3>Payment Method</h3>
          <div class="pay-options">
            <label class="pay-opt"><input type="radio" name="pay" value="card" checked> Credit / Debit Card</label>
            <label class="pay-opt"><input type="radio" name="pay" value="cod"> Cash on Delivery</label>
            <label class="pay-opt"><input type="radio" name="pay" value="local"> Local Payment Gateway</label>
          </div>
          <div class="form-grid" id="card-fields">
            <div class="form-field full"><label>Card number</label><input inputmode="numeric" placeholder="4242 4242 4242 4242"></div>
            <div class="form-field"><label>Expiry</label><input placeholder="MM/YY"></div>
            <div class="form-field"><label>CVC</label><input inputmode="numeric" placeholder="123"></div>
          </div>
          <p style="font-size:11.5px;margin-top:10px;">This is a demo checkout — no real payment is processed and no card details are transmitted or stored.</p>
        </div>

        <button class="btn btn-primary btn-block" type="submit">Place Order — ${formatPrice(total)}</button>
      </form>

      <div class="summary-card">
        <h3 style="font-size:17px;">Order Summary</h3>
        ${items.map((l) => `
          <div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line);">
            ${art(l.product.category, l.product.material, { className: 'art-sm' })}
            <div style="flex:1;">
              <div style="font-size:13.5px;font-weight:600;">${l.product.name}</div>
              <div style="font-size:12px;color:var(--ink-soft);">Qty ${l.qty} · ${l.variant.color || l.product.color}</div>
            </div>
            <div style="font-size:13.5px;font-weight:700;color:var(--walnut-deep);">${formatPrice(l.product.price * l.qty)}</div>
          </div>
        `).join('')}
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
      </div>
    </div>`;

  document.querySelectorAll('input[name="pay"]').forEach((r) => r.addEventListener('change', () => {
    document.getElementById('card-fields').style.display = document.querySelector('input[name="pay"]:checked').value === 'card' ? 'grid' : 'none';
  }));

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNumber = 'WO-' + Math.floor(100000 + Math.random() * 900000);
    const date = document.getElementById('delivery-date').value;
    const time = document.getElementById('delivery-time').value;
    clearCart();
    updateCartBadge();
    root.innerHTML = `
      <div class="order-confirm">
        ${ICONS.checkCircle}
        <h2>Thank you — your order is confirmed</h2>
        <p>Order <strong>${orderNumber}</strong> is scheduled for delivery on <strong>${new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</strong>, ${time.toLowerCase()}.</p>
        <p style="font-size:13px;">A confirmation email has been sent (demo only). You can track this order from your account at any time.</p>
        <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
  });
}
