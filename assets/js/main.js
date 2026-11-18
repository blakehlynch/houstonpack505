/**
 * Pack 505 site script.
 * 1. Opens/closes the mobile menu.
 * 2. Highlights the current page in the nav (so the header HTML can be identical on every page).
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', open);
    toggle.classList.toggle('active', open);
    nav.classList.toggle('active', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
