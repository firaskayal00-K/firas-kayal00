import { renderHeader, renderFooter, productCard, art, mountWhatsAppFloat } from './components.js';
import { getProducts, CATEGORIES, applyFiltersAndSort } from './data.js';
import { ICONS } from './icons.js';

renderHeader('shop');
renderFooter();
mountWhatsAppFloat();

document.getElementById('hero-art').innerHTML = ICONS.sofa;
document.getElementById('story-art').innerHTML = ICONS.chair;

const CAT_MATERIAL = { Chairs: 'Wood', Tables: 'Marble', Sofas: 'Fabric', Mirrors: 'Metal', Storage: 'Wood', Lighting: 'Metal', Decor: 'Glass' };

const catGrid = document.getElementById('cat-grid');
catGrid.innerHTML = CATEGORIES.map((c) => `
  <a class="cat-card" href="shop.html?category=${encodeURIComponent(c)}">
    ${art(c, CAT_MATERIAL[c])}
    <span>${c}</span>
  </a>`).join('');

const products = await getProducts();

document.getElementById('bestsellers-grid').innerHTML = applyFiltersAndSort(products, { sort: 'bestselling' })
  .slice(0, 4).map(productCard).join('');

document.getElementById('new-grid').innerHTML = applyFiltersAndSort(products, { sort: 'newest' })
  .slice(0, 4).map(productCard).join('');

document.getElementById('home-newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('home-newsletter-msg').textContent = "You're subscribed — welcome to Wren & Oak!";
  e.target.reset();
});
