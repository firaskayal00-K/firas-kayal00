// Client-side cart + wishlist, persisted to localStorage. There's no backend
// yet, so this *is* the source of truth for the storefront demo.
const CART_KEY = 'wo_cart';
const WISH_KEY = 'wo_wishlist';

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent('wo-storage-change', { detail: { key } }));
}

// ---- Cart ----
// Each line: { id, qty, variant: { color, size } }
export function getCart() { return read(CART_KEY); }

export function addToCart(id, variant = {}, qty = 1) {
  const cart = getCart();
  const key = variantKey(variant);
  const existing = cart.find((l) => l.id === id && variantKey(l.variant) === key);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty, variant });
  write(CART_KEY, cart);
}

export function updateCartQty(id, variant, qty) {
  const cart = getCart();
  const key = variantKey(variant);
  const line = cart.find((l) => l.id === id && variantKey(l.variant) === key);
  if (!line) return;
  line.qty = Math.max(1, qty);
  write(CART_KEY, cart);
}

export function removeFromCart(id, variant) {
  const key = variantKey(variant);
  write(CART_KEY, getCart().filter((l) => !(l.id === id && variantKey(l.variant) === key)));
}

export function clearCart() { write(CART_KEY, []); }

export function cartCount() {
  return getCart().reduce((n, l) => n + l.qty, 0);
}

function variantKey(v = {}) {
  return `${v.color || ''}|${v.size || ''}`;
}

// ---- Wishlist ----
export function getWishlist() { return read(WISH_KEY); }

export function toggleWishlist(id) {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(id);
  write(WISH_KEY, list);
  return list.includes(id);
}

export function isWishlisted(id) {
  return getWishlist().includes(id);
}
