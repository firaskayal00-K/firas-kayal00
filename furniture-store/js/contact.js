import { renderHeader, renderFooter, mountWhatsAppFloat } from './components.js';
import { ICONS } from './icons.js';

renderHeader('contact');
renderFooter();
mountWhatsAppFloat();

document.getElementById('ic-pin').innerHTML = ICONS.pin;
document.getElementById('ic-mail').innerHTML = ICONS.mail;
document.getElementById('ic-phone').innerHTML = ICONS.phone;
document.getElementById('ic-wa').innerHTML = ICONS.whatsapp;
document.getElementById('whatsapp-link').href =
  'https://wa.me/10000000000?text=' + encodeURIComponent('Hi! I have a question about a product.');

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('contact-msg').textContent = "Message sent — we'll reply within one business day.";
  e.target.reset();
});
