// Alvaro Navarro Mingorance - sitio v1
// Interacciones minimas: menu movil, cookie banner, fade-up on scroll.

(function(){
  'use strict';

  // ---- Menú móvil ----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function(){
      const open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    // Cerrar al pulsar un enlace
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        if (window.innerWidth <= 860) nav.setAttribute('data-open', 'false');
      });
    });
  }

  // ---- Cookie banner ----
  const COOKIE_KEY = 'anm-cookies-v1';
  const banner = document.querySelector('.cookie-banner');
  if (banner) {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) banner.setAttribute('data-visible', 'true');
    } catch (e) { /* localStorage bloqueado, no mostramos */ }

    banner.querySelectorAll('[data-cookie]').forEach(function(btn){
      btn.addEventListener('click', function(){
        const choice = btn.getAttribute('data-cookie');
        try { localStorage.setItem(COOKIE_KEY, JSON.stringify({ choice: choice, date: new Date().toISOString() })); } catch (e) {}
        banner.setAttribute('data-visible', 'false');
      });
    });
  }

  // ---- Fade-up on scroll ----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-5% 0px' });
    document.querySelectorAll('.fade-up').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.fade-up').forEach(function(el){ el.classList.add('is-visible'); });
  }

  // ---- Año dinámico en footer ----
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });

})();
