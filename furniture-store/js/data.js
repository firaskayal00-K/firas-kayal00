// Product catalog access. In a real build this hits an API; here it reads
// the static JSON placeholder catalog once and caches it in memory.
let _cache = null;

export async function getProducts() {
  if (_cache) return _cache;
  const res = await fetch('/data/products.json');
  _cache = await res.json();
  return _cache;
}

export async function getProductById(id) {
  const all = await getProducts();
  return all.find((p) => p.id === id) || null;
}

export async function getRelated(product, limit = 4) {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const CATEGORIES = ['Chairs', 'Tables', 'Sofas', 'Mirrors', 'Storage', 'Lighting', 'Decor'];
export const MATERIALS = ['Wood', 'Metal', 'Glass', 'Fabric', 'Rattan', 'Marble'];
export const COLORS = ['Natural', 'Walnut', 'Black', 'White', 'Gray', 'Beige', 'Green', 'Gold'];

export const COLOR_SWATCH = {
  Natural: '#d8c6a0', Walnut: '#6b4a34', Black: '#232323', White: '#f5f5f0',
  Gray: '#9a9a92', Beige: '#e3d3b8', Green: '#5c7355', Gold: '#b8934f',
};

export function formatPrice(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function applyFiltersAndSort(products, state) {
  let out = products.filter((p) => {
    if (state.category && p.category !== state.category) return false;
    if (state.materials?.length && !state.materials.includes(p.material)) return false;
    if (state.colors?.length && !state.colors.includes(p.color)) return false;
    if (state.availability?.length && !state.availability.includes(p.stock)) return false;
    if (state.maxPrice != null && p.price > state.maxPrice) return false;
    if (state.query) {
      const q = state.query.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.material.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  switch (state.sort) {
    case 'price-asc': out.sort((a, b) => a.price - b.price); break;
    case 'price-desc': out.sort((a, b) => b.price - a.price); break;
    case 'newest': out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    case 'rating': out.sort((a, b) => b.rating - a.rating); break;
    case 'bestselling': out.sort((a, b) => (b.isBestseller === a.isBestseller ? b.reviews - a.reviews : b.isBestseller ? 1 : -1)); break;
    default: break;
  }
  return out;
}
