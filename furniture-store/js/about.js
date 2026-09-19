import { renderHeader, renderFooter, mountWhatsAppFloat } from './components.js';
import { ICONS } from './icons.js';

renderHeader('about');
renderFooter();
mountWhatsAppFloat();

document.getElementById('about-art-1').innerHTML = ICONS.table;
document.getElementById('about-art-2').innerHTML = ICONS.sofa;
