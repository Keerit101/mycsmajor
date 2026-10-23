import '@fontsource-variable/inter';
import '../styles.css';
import { markScrollableCode } from './scrollable.js';
import { initAds } from './ads.js';

const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

for (const el of document.querySelectorAll('[data-year]')) {
  el.textContent = String(new Date().getFullYear());
}

markScrollableCode();

initAds();
