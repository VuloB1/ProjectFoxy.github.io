// Shared behaviour of the project pages (Project Ciel, Twitch Chat Keepalive and the home page).
// Each page defines window.EN (English text by data-i18n key) before loading this file; the HTML itself is Spanish.
(function () {
  'use strict';
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var EN = window.EN || {}, NUM = window.NUMBERS || {};
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Language ----
  var nodes = [].slice.call(document.querySelectorAll('[data-i18n], [data-i18n-html]'));
  nodes.forEach(function (n) { n._es = n.hasAttribute('data-i18n-html') ? n.innerHTML : n.textContent; });
  var titleEs = document.title, lang = store.get('lang') || ((navigator.language || 'es').slice(0, 2) === 'es' ? 'es' : 'en');
  var langBtn = document.getElementById('lang');
  function setLang(l) {
    lang = l; store.set('lang', l); root.lang = l;
    nodes.forEach(function (n) {
      var key = n.getAttribute('data-i18n') || n.getAttribute('data-i18n-html');
      var text = (l === 'en' && EN[key] != null ? EN[key] : n._es).replace(/\{(\w+)\}/g, function (m, k) { return NUM[k] != null ? NUM[k] : m; });
      if (n.hasAttribute('data-i18n-html')) n.innerHTML = text; else n.textContent = text;
    });
    if (langBtn) langBtn.textContent = l === 'es' ? 'EN' : 'ES';
    document.title = l === 'en' && EN['page.title'] ? EN['page.title'] : titleEs;
    document.querySelectorAll('[data-alt-en]').forEach(function (n) { n.alt = l === 'en' ? n.dataset.altEn : n.dataset.altEs; });
    if (window.onLangChange) window.onLangChange(l);
  }
  if (langBtn) langBtn.addEventListener('click', function () { setLang(lang === 'es' ? 'en' : 'es'); });

  // ---- Theme ----
  var themeBtn = document.getElementById('theme');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', root.dataset.theme);
  });

  // ---- Reveal, counters, progress bar, nav ----
  var reveals = [].slice.call(document.querySelectorAll('[data-reveal]'));
  reveals.forEach(function (n) {
    var sib = [].filter.call(n.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
    n.style.setProperty('--rd', Math.min(sib.indexOf(n), 5) * 80 + 'ms');
  });
  document.querySelectorAll('[data-n]').forEach(function (b) { b.dataset.count = NUM[b.dataset.n]; b.textContent = NUM[b.dataset.n]; });
  function countUp(el) {
    var to = +el.dataset.count, t0 = performance.now();
    (function step(t) {
      var k = Math.min((t - t0) / 1100, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  if ('IntersectionObserver' in window && !still) {
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in'); io.unobserve(e.target);
        var c = e.target.querySelector('[data-count]'); if (c) countUp(c);
      });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (n) { io.observe(n); });
  } else reveals.forEach(function (n) { n.classList.add('in'); });

  var nav = document.getElementById('nav'), bar = document.getElementById('progress'), hero = document.getElementById('hero-shot'), ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (hero && !still) {
      var p = Math.min(y / 520, 1);
      hero.style.setProperty('--tilt', (14 * (1 - p)).toFixed(2) + 'deg');
      hero.style.setProperty('--sc', (.96 + .04 * p).toFixed(3));
      hero.style.setProperty('--lift', (-24 * p).toFixed(1) + 'px');
    }
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Current section in the menu.
  var spy = {}; document.querySelectorAll('#links a[href^="#"]').forEach(function (a) { spy[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (list) {
      list.forEach(function (e) { if (e.isIntersecting) Object.keys(spy).forEach(function (k) { spy[k].classList.toggle('on', k === e.target.id); }); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(spy).forEach(function (k) { var s = document.getElementById(k); if (s) so.observe(s); });
  }

  // FAQ: one open at a time.
  var faq = document.querySelectorAll('.faq details');
  faq.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) faq.forEach(function (o) { if (o !== d) o.open = false; }); }); });

  // Light that follows the cursor.
  document.querySelectorAll('.spot').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---- Gallery: tabs that cross-fade two stacked images (files in img/, named by data-shot) ----
  var tabsBox = document.getElementById('shot-tabs');
  if (tabsBox) {
    var a = document.getElementById('shot-a'), b = document.getElementById('shot-b');
    tabsBox.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t || t.classList.contains('on')) return;
      [].forEach.call(tabsBox.children, function (x) { x.classList.toggle('on', x === t); });
      var cur = a.classList.contains('show') ? a : b, n = cur === a ? b : a;
      var done = function () { n.classList.add('show'); cur.classList.remove('show'); };
      n.loading = 'eager'; n.onload = done; n.src = 'img/' + t.dataset.shot;
      if (n.complete && n.naturalWidth) done();
      a.alt = b.alt = t.querySelector('b').textContent;
    });
  }

  // ---- Feature tabs with a big panel, advancing on their own until the visitor takes over ----
  (function () {
    var box = document.getElementById('fx'); if (!box) return;
    var tabs = [].slice.call(box.querySelectorAll('.fx-tab')), panels = [].slice.call(box.querySelectorAll('.fx-panel'));
    var cur = 0, timer = 0;
    function pick(i) {
      cur = i;
      tabs.forEach(function (t, k) { t.classList.toggle('on', k === i); t.setAttribute('aria-selected', k === i); });
      panels.forEach(function (p, k) { p.classList.toggle('on', k === i); });
      var t = tabs[i], bar = t.parentNode;
      if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: t.offsetLeft - bar.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
    }
    function stop() { clearTimeout(timer); box.classList.remove('auto', 'run'); }
    function tick() { timer = setTimeout(function () { pick((cur + 1) % tabs.length); tick(); }, 6000); }
    tabs.forEach(function (t) { t.addEventListener('click', function () { stop(); pick(+t.dataset.i); }); });
    box.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      stop(); pick((cur + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length); tabs[cur].focus();
    });
    if (still || !('IntersectionObserver' in window)) { box.classList.remove('auto'); return; }
    new IntersectionObserver(function (l) {
      if (!box.classList.contains('auto')) return;
      clearTimeout(timer);
      if (l[0].isIntersecting) { box.classList.add('run'); tick(); } else box.classList.remove('run');
    }, { threshold: .4 }).observe(box);
  })();

  // ---- Copy buttons on code blocks ----
  document.querySelectorAll('pre[data-copy]').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'copy'; btn.setAttribute('aria-label', 'Copy');
    btn.textContent = '⧉';
    btn.addEventListener('click', function () {
      var text = pre.querySelector('code').textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () {
        btn.textContent = '✓'; setTimeout(function () { btn.textContent = '⧉'; }, 1400);
      }).catch(function () {});
    });
    pre.appendChild(btn);
  });

  setLang(lang);
})();
