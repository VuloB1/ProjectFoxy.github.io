(function () {
  'use strict';
  var REPO = 'VuloB1/ProjectFoxy';
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // The page is written in Spanish; this is the English version of each data-i18n key.
  var EN = {
    'nav.features': 'Features', 'nav.shots': 'Screenshots', 'nav.editor': 'Editor', 'nav.download': 'Download', 'nav.faq': 'FAQ',
    'hero.badge': 'Windows & Linux · Free',
    'hero.title': 'View your photos <em>instantly</em>.<br>Edit them without leaving.',
    'hero.lead': 'A modern, light and fast image viewer with a full photo editor, GIF maker, collage and compare view. No accounts, no cloud, no ads.',
    'hero.cta': 'Download', 'hero.more': 'See what it does',
    'hero.fine': 'Windows 10/11 64-bit · installer or portable',
    'stat.effects': 'effects', 'stat.looks': 'look filters', 'stat.adjust': 'tone & color adjustments', 'stat.compare': 'images side by side', 'stat.langs': 'languages',
    'feat.h': 'Everything in one program', 'feat.sub': 'Open a photo and that is it. When you want to touch it up, the editor is one click away.',
    'f.viewer.h': 'Fast viewer', 'f.viewer.p': 'Instantly opens JPEG, PNG, WebP, TIFF, HEIC, AVIF and camera RAW. Browse the folder with thumbnails, GPU zoom and pan, rotation, full screen, EXIF info with histogram, wallpaper and recycle bin.',
    'f.editor.h': 'Complete editor', 'f.editor.p': 'Crop, resize, {adjust} adjustments, levels and curves, 38 filters, {effects} effects, lens correction and frames. Undo and redo for everything.',
    'f.gif.h': 'GIF, APNG and WebP', 'f.gif.p': 'Build animations with their own duration, effect and text per image, plus transitions. Animated files really play.',
    'f.collage.h': 'Unlimited collage', 'f.collage.p': '1 to {photos} photos, adjustable dividers or free layout, and your own templates you can save.',
    'f.compare.h': 'Compare view', 'f.compare.p': '{compareMin} to {compare} images side by side, arranged by their shape, with linked zoom and pan.',
    'f.color.h': 'Correct color', 'f.color.p': 'Display P3 (iPhone) or AdobeRGB photos are converted to sRGB when opened: no washed-out colors.',
    'f.save.h': 'Safe saving', 'f.save.p': 'Atomic writes: a failure never leaves your original half-written. Keeps EXIF, IPTC and XMP, asks before overwriting, warns about unsaved changes and saves in the background without freezing the window.',
    'f.langs.h': '{langs} languages, {themes} themes', 'f.langs.p': 'English, Español, Português, 한국어, 中文, 日本語. They switch instantly, no restart. Light, dark and two Windows 98 style themes.',
    'f.more.h': 'Details that add up', 'f.more.p': 'Eyedropper with Alt, meme caption, batch export and rename, smooth zoom and file names with any character.',
    'shots.h': 'See how it looks', 'shots.sub': 'Screenshots of the real program.',
    'shots.viewer': 'Viewer', 'shots.effects': 'Effects', 'shots.adjust': 'Adjustments', 'shots.filters': 'Filters', 'shots.gif': 'Animated GIF', 'shots.collage': 'Collage', 'shots.compare': 'Compare',
    'ed.h': 'An editor that stays out of the way', 'ed.sub': 'Seven tools, each in its own tab. The preview runs on the GPU and the saved file uses the same math, checked by automated tests.',
    'ed.crop.h': 'Crop', 'ed.crop.p': 'Handles, aspect ratios, rotate, straighten and flip. With <b>Frame</b>: rectangle, ellipse, hexagon, star, heart…, round, soft, cut or concave corners, outline, margin, shadow and background.',
    'ed.size.h': 'Size', 'ed.size.p': 'By pixels or scale, with Lanczos-3 resampling and halo-free sharpening when enlarging.',
    'ed.adj.h': 'Adjustments', 'ed.adj.p': '{adjust} tone, color and detail controls; levels and per-channel curves; auto; live histogram; grain and noise of {noise} types.',
    'ed.fil.h': 'Filters', 'ed.fil.p': '{looks} “looks” with thumbnails of your own photo, amount, vignette and grain.',
    'ed.fx.h': 'Effects', 'ed.fx.p': '{effects} effects in {groups} groups —blur, style, color, drawing, light, distortion and finish— with a preview over the whole image, sliders, presets and mix.',
    'ed.lens.h': 'Lens', 'ed.lens.p': 'Fixes distortion, color fringes and dark corners with the Lensfun profile database; it recognizes camera and lens from the EXIF, or work by hand.',
    'ed.create.h': 'Create', 'ed.create.p': 'Animated GIF/APNG/WebP and collages, from the top bar.',
    'fmt.h': 'Formats', 'fmt.open': 'Opens', 'fmt.save': 'Saves', 'fmt.make': 'Creates',
    'dl.h': 'Download', 'dl.sub': 'Latest version:', 'dl.notes': 'release notes', 'dl.get': 'Download',
    'dl.setup.h': 'Installer', 'dl.setup.p': 'Needs no administrator rights. Creates the shortcut and, if you want, adds Project Foxy to “Open with” and Default apps.',
    'dl.port.h': 'Portable', 'dl.port.p': 'Unzip the whole folder and open ProjectFoxy.exe. It keeps its settings next to it and does not touch the registry.',
    'dl.ai.p': 'No installation. Any 64-bit distribution with glibc 2.35 or newer, on X11 and Wayland.',
    'dl.fp.p': 'Carries its own runtime: works on old or very different distributions (Debian 11, Ubuntu 20.04, RHEL 8-9…).',
    'dl.note': 'Every file comes with its SHA-256 checksum (<a href="https://github.com/VuloB1/ProjectFoxy/releases/latest">SHA256SUMS.txt</a>). Windows may warn “Windows protected your PC” because the program is not signed yet: <em>More info → Run anyway</em>.',
    'os.h': 'Free and open source', 'os.p1': 'Project Foxy is released under the GPL-3.0-or-later license. You can read the code, build it, propose changes or translate it into your language.',
    'os.p2': 'It asks for no account, uses no cloud, and nothing in the program connects to the internet to work.',
    'os.repo': 'See the code on GitHub',
    'os.f1': 'Qt Quick with GPU acceleration', 'os.f2': 'image and RAW decoding', 'os.f3': 'metadata and lens profiles', 'os.f4': 'automated tests on every change, on Windows and Linux',
    'faq.h': 'Frequently asked questions',
    'faq.q1': 'Is it free?', 'faq.a1': 'Yes, completely, and it will stay that way. If you like it you can help with a bug report, a translation or an improvement on GitHub.',
    'faq.q2': 'Why does Windows warn me when I open it?', 'faq.a2': 'Because the program does not have a code-signing certificate yet, which costs money every year. Check the SHA-256 of the download and choose “More info → Run anyway”.',
    'faq.q3': 'Does it work on Mac?', 'faq.a3': 'Not yet: today there are versions for Windows 10/11 and Linux (AppImage and Flatpak).',
    'faq.q4': 'Does it change my original photos?', 'faq.a4': 'Never without telling you: it asks before overwriting and writes the file atomically, so a failure does not leave it half-written.',
    'faq.q5': 'The window freezes when I enlarge it (Radeon cards)', 'faq.a5': 'Seen on a Radeon RX 6750 XT with Direct3D 11. There is a “Sync with the screen (V-Sync)” setting; turning it off fixes it in that case.',
    'faq.q6': 'How do I report a bug or ask for something?', 'faq.a6': 'Open an issue on', 'faq.a6b': '(there are templates).',
    'feat.k': 'Features', 'shots.k': 'Screenshots', 'ed.k': 'Editor', 'fmt.k': 'Compatibility', 'dl.k': 'Download', 'os.k': 'Open source', 'faq.k': 'Questions',
    'shots.viewer.d': 'Thumbnails, GPU zoom and everything at hand.', 'shots.effects.d': '{effects} effects with a preview over the whole image.', 'shots.adjust.d': '{adjust} controls, levels, curves and histogram.',
    'shots.filters.d': '{looks} “looks” with thumbnails of your photo.', 'shots.gif.d': 'Animations with transitions and text.', 'shots.collage.d': 'Grid or free layouts, no limits.', 'shots.compare.d': 'Up to {compare} images with linked zoom.',
    'fmt.raw': 'Camera RAW', 'fmt.anim': 'Animated GIF · APNG · WebP', 'fmt.webpa': 'Animated WebP',
    'foot.lic': 'GPL-3.0-or-later · © 2026 Vulito'
  };
  Object.assign(EN, {
    "fc.1.0": "Crop",
    "fc.1.1": "Adjustments",
    "fc.1.2": "Filters",
    "fc.1.3": "Effects",
    "fc.1.4": "Lens",
    "fc.2.3": "Transitions",
    "fc.2.4": "Text",
    "fc.3.0": "1–{photos} photos",
    "fc.3.1": "Grid",
    "fc.3.2": "Free",
    "fc.3.3": "Your own templates",
    "fc.4.0": "{compareMin}–{compare} images",
    "fc.4.1": "Linked zoom",
    "fc.6.0": "Atomic",
    "fc.6.2": "Background",
    "fc.7.6": "{themes} themes",
    "fc.8.0": "Eyedropper",
    "fc.8.2": "Batch",
    "fc.8.3": "Smooth zoom",
    "f.viewer.p": "JPEG, PNG, WebP, TIFF, HEIC, AVIF and RAW instantly, with thumbnails and GPU zoom.",
    "f.editor.p": "Crop, adjustments, filters, effects and lens. Undo and redo for everything.",
    "f.gif.p": "Animations with transitions and text, as GIF, APNG or WebP.",
    "f.collage.p": "1 to {photos} photos, in a grid or a free layout.",
    "f.compare.p": "Up to {compare} images at once, with linked zoom.",
    "f.color.p": "Display P3 and AdobeRGB are converted to sRGB on opening.",
    "f.save.p": "Atomic writes: your original is never left half-written.",
    "f.langs.p": "{langs} languages and {themes} themes, switched without restarting.",
    "f.more.p": "Eyedropper, meme caption, batch work and smooth zoom.",
    "t.b.editor": "Editor",
    "t.editor.0.t": "Crop",
    "t.editor.0.d": "Handles, aspect ratios, rotate, straighten and flip. <b>Frame</b>: rectangle, ellipse, hexagon, star, heart…; round, soft, cut or concave corners; outline, margin, shadow and background.",
    "t.editor.1.t": "Size",
    "t.editor.1.d": "By pixels or scale; Lanczos-3 resampling with halo-free sharpening when enlarging.",
    "t.editor.2.t": "Adjustments",
    "t.editor.2.d": "{adjust} tone, color and detail controls; levels and per-channel curves; auto; live histogram; grain and noise of {noise} types.",
    "t.editor.3.t": "Filters",
    "t.editor.3.d": "{looks} “looks” with thumbnails of your own photo; amount, vignette and grain.",
    "t.editor.4.t": "Effects",
    "t.editor.4.d": "{effects} effects in {groups} groups (blur, style, color, drawing, light, distortion and finish); preview over the whole image, sliders, presets and mix.",
    "t.editor.5.t": "Lens",
    "t.editor.5.d": "Distortion, color fringes and dark corners with Lensfun profiles; it recognizes camera and lens from the EXIF, or adjust by hand.",
    "t.editor.6.t": "Create",
    "t.editor.6.d": "<b>Animated GIF / APNG / WebP</b>: duration, effect and text per frame, transitions. <b>Collage</b>: 1 to {photos} photos, adjustable grid or free layout, your own templates.",
    "t.b.formats": "Formats",
    "t.formats.0.t": "Opens",
    "t.formats.0.d": "JPEG (CMYK too), PNG, WebP, TIFF (16-bit scaled to 8), BMP, GIF, ICO, HEIC/HEIF, AVIF, camera RAW, animated GIF/APNG/WebP.",
    "t.formats.1.t": "Saves",
    "t.formats.1.d": "PNG, JPG (quality 95, no chroma subsampling), BMP, TIFF, WebP.",
    "t.formats.2.t": "Creates",
    "t.formats.2.d": "GIF, APNG, animated WebP.",
    "t.b.color": "Color and metadata",
    "t.color.0.t": "Color",
    "t.color.0.d": "Display P3 and AdobeRGB are converted to sRGB on opening; what you save is tagged as sRGB.",
    "t.color.1.t": "Orientation",
    "t.color.1.d": "Respects the EXIF orientation of phone photos.",
    "t.color.2.t": "Metadata",
    "t.color.2.d": "Keeps EXIF, IPTC and XMP in JPEG, PNG and WebP; from HEIC or RAW it saves and <b>warns</b> they are not kept.",
    "t.color.3.t": "Names",
    "t.color.3.d": "Files and folders with any character: accents, Japanese, Cyrillic, emoji.",
    "t.b.saving": "Saving",
    "t.saving.0.t": "Atomic",
    "t.saving.0.d": "A failure never leaves the original half-written.",
    "t.saving.1.t": "Background",
    "t.saving.1.d": "Never freezes the window; closing during a save waits for it to finish.",
    "t.saving.2.t": "Warnings",
    "t.saving.2.d": "Asks before overwriting and warns about unsaved changes. “Unsaved” means the screen does not match the file, also after Save and Undo.",
    "t.saving.3.t": "Undo",
    "t.saving.3.d": "Covers everything; a whole slider drag is a single step.",
    "t.b.perf": "Performance",
    "t.perf.0.t": "Rendering",
    "t.perf.0.d": "Qt Quick with RHI: Direct3D 11 on Windows, OpenGL on Linux.",
    "t.perf.1.t": "GPU and CPU",
    "t.perf.1.d": "The Adjustments and Filters preview is computed on the GPU and the saved file on the CPU with the same math, also with semi-transparent images; an automated test (<code>test_gpu_parity</code>) compares them.",
    "t.perf.2.t": "Cache",
    "t.perf.2.d": "Thumbnails with a memory and disk cache.",
    "t.perf.3.t": "V-Sync",
    "t.perf.3.d": "“Sync with the screen” setting, on by default (useful if the window freezes when enlarged).",
    "t.b.platform": "Platforms",
    "t.platform.0.t": "Windows",
    "t.platform.0.d": "10 and 11, 64-bit. Installer needing no administrator rights, or portable without touching the registry.",
    "t.platform.1.t": "AppImage",
    "t.platform.1.d": "Any 64-bit distribution with glibc 2.35 or newer, on X11 and Wayland.",
    "t.platform.2.t": "Flatpak",
    "t.platform.2.d": "Own runtime: works on Debian 11, Ubuntu 20.04, RHEL/Alma/Rocky 8-9.",
    "t.platform.3.t": "Tested on",
    "t.platform.3.d": "Ubuntu 24.04, Debian 13, Fedora 43 and Arch (AppImage and Flatpak); AlmaLinux 9 with Flatpak only.",
    "t.b.stack": "Technology",
    "t.stack.0.t": "Language",
    "t.stack.0.d": "C++20",
    "t.stack.1.t": "Interface",
    "t.stack.1.d": "Qt 6.7 · Qt Quick (QML)",
    "t.stack.2.t": "Images",
    "t.stack.2.d": "libvips · LibRaw · libheif + libde265 + libaom",
    "t.stack.3.t": "Metadata and lenses",
    "t.stack.3.d": "exiv2 · Lensfun (CC BY-SA 3.0)",
    "t.stack.4.t": "Build",
    "t.stack.4.d": "CMake + Ninja · MSVC 2022 / GCC · vcpkg",
    "t.stack.5.t": "Tests",
    "t.stack.5.d": "QtTest, more than {tests} cases; continuous integration on Windows and Linux.",
    "t.k": "Technical details",
    "t.h": "For those who want the details",
    "t.sub": "What is underneath: tools, formats, saving, performance, platforms and technology.",
    "nav.tech": "Technical"
  });

  // Remember the Spanish originals.
  var nodes = document.querySelectorAll('[data-i18n], [data-i18n-html]');
  nodes.forEach(function (n) {
    n._es = n.hasAttribute('data-i18n-html') ? n.innerHTML : n.textContent;
  });

  var lang = store.get('lang') || ((navigator.language || 'es').slice(0, 2) === 'es' ? 'es' : 'en');

  function setLang(l) {
    lang = l; store.set('lang', l);
    root.lang = l;
    nodes.forEach(function (n) {
      var key = n.getAttribute('data-i18n') || n.getAttribute('data-i18n-html');
      var text = (l === 'en' && EN[key] != null ? EN[key] : n._es).replace(/\{(\w+)\}/g, function (m, k) { return NUMBERS[k] != null ? NUMBERS[k] : m; });
      if (n.hasAttribute('data-i18n-html')) n.innerHTML = text; else n.textContent = text;
    });
    document.getElementById('lang').textContent = l === 'es' ? 'EN' : 'ES';
    document.title = l === 'es' ? 'Project Foxy — visor y editor de imágenes' : 'Project Foxy — image viewer and editor';
    shots();
    applyRelease();
  }

  // Screenshots, GIFs and videos of the gallery. A tab's data-shot is a file name (extension included) looked up in
  // img/<language>/ and, if it is not there, in img/ — so one video can serve every language.
  var pool = ['shot-a', 'shot-b', 'shot-v'].map(function (id) { return document.getElementById(id); });
  var isVideo = function (n) { return /\.(mp4|webm)$/i.test(n); };
  function loadMedia(el, name) {
    var retried = lang !== 'es';
    el.onerror = function () { if (!retried) { retried = true; el.src = 'img/' + name; } };
    el.src = (lang === 'es' ? 'img/es/' : 'img/') + name;
  }
  function showShot(name, label) {
    var cur = pool.filter(function (e) { return e.classList.contains('show'); })[0];
    var vid = isVideo(name);
    var n = vid ? pool[2] : (cur === pool[0] ? pool[1] : pool[0]);
    var done = function () {
      if (n !== cur) { n.classList.add('show'); if (cur) { cur.classList.remove('show'); if (cur.pause) cur.pause(); } }
      if (n.play) n.play().catch(function () {});
    };
    n.loading = 'eager';
    if (vid) n.onloadeddata = done; else n.onload = done;
    loadMedia(n, name);
    if (!vid && n.complete && n.naturalWidth) done();
    pool[0].alt = pool[1].alt = label || '';
    if (n.title !== undefined) n.title = label || '';
  }
  function shots() {
    var hero = document.querySelector('.hero-shot img'); loadMedia(hero, hero.dataset.shot);
    var on = document.querySelector('#shot-tabs .on');
    if (on) showShot(on.dataset.shot, on.querySelector('b').textContent);
  }
  document.getElementById('shot-tabs').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.classList.contains('on')) return;
    document.querySelectorAll('#shot-tabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
    showShot(b.dataset.shot, b.querySelector('b').textContent);
  });

  document.getElementById('lang').addEventListener('click', function () { setLang(lang === 'es' ? 'en' : 'es'); });
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', root.dataset.theme);
  });

  // Operating system: shows the matching download first.
  var ua = navigator.userAgent;
  var os = /Windows/.test(ua) ? 'win' : (/Linux|X11/.test(ua) && !/Android/.test(ua) ? 'linux' : 'other');
  document.body.dataset.os = os;

  // Latest release from GitHub (falls back to the static links if it cannot be reached).
  var release = null;
  function size(b) { return b > 1e6 ? Math.round(b / 1e6) + ' MB' : Math.round(b / 1e3) + ' KB'; }
  function applyRelease() {
    var main = document.getElementById('cta-main'), label = document.getElementById('cta-label');
    var fine = document.getElementById('cta-fine');
    var es = lang === 'es';
    if (os === 'linux') { label.textContent = es ? 'Descargar para Linux' : 'Download for Linux'; fine.textContent = es ? 'AppImage o Flatpak · también hay versión para Windows' : 'AppImage or Flatpak · a Windows version is available too'; }
    else if (os === 'win') { label.textContent = es ? 'Descargar para Windows' : 'Download for Windows'; }
    else { label.textContent = es ? 'Ver descargas' : 'See downloads'; fine.textContent = es ? 'Windows 10/11 y Linux' : 'Windows 10/11 and Linux'; }
    if (!release) return;
    var v = release.tag_name.replace(/^v/, '');
    document.getElementById('dl-ver').textContent = v; document.getElementById('dl-latest').hidden = false;
    document.getElementById('dl-notes').href = release.html_url;
    document.getElementById('ver-badge').textContent = (es ? 'Versión ' : 'Version ') + v + (es ? ' · Windows y Linux · Gratis' : ' · Windows & Linux · Free');
    document.querySelectorAll('[data-asset]').forEach(function (a) {
      var m = release.assets.find(function (x) { return x.name.indexOf(a.dataset.asset) >= 0; });
      if (!m) return;
      a.href = m.browser_download_url;
      a.querySelector('small').textContent = size(m.size);
    });
    var pick = release.assets.find(function (x) { return x.name.indexOf(os === 'linux' ? 'AppImage' : 'Setup') >= 0; });
    if (pick && os !== 'other') main.href = pick.browser_download_url;
  }
  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (j) { release = j; applyRelease(); })
    .catch(function () {});


  document.querySelectorAll('[data-n]').forEach(function (b) { b.dataset.count = NUMBERS[b.dataset.n]; b.textContent = NUMBERS[b.dataset.n]; });

  // ---- Motion (all of it is off for prefers-reduced-motion) ----
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = [].slice.call(document.querySelectorAll('[data-reveal]'));
  reveals.forEach(function (n) {
    var sib = [].filter.call(n.parentNode.children, function (c) { return c.hasAttribute('data-reveal'); });
    n.style.setProperty('--rd', Math.min(sib.indexOf(n), 5) * 80 + 'ms');
  });
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
  } else {
    reveals.forEach(function (n) { n.classList.add('in'); });
  }

  var nav = document.getElementById('nav'), bar = document.getElementById('progress'), hero = document.getElementById('hero-shot');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 8);
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (!still) {
      var p = Math.min(y / 520, 1);
      hero.style.setProperty('--tilt', (14 * (1 - p)).toFixed(2) + 'deg');
      hero.style.setProperty('--sc', (.96 + .04 * p).toFixed(3));
      hero.style.setProperty('--lift', (-24 * p).toFixed(1) + 'px');
    }
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();


  // ---- Features: tabs that advance on their own until the visitor takes over ----
  (function () {
    var box = document.getElementById('fx'); if (!box) return;
    var tabs = [].slice.call(box.querySelectorAll('.fx-tab')), panels = [].slice.call(box.querySelectorAll('.fx-panel'));
    var cur = 0, timer = 0, seen = false;
    function pick(i) {
      cur = i;
      tabs.forEach(function (t, k) { t.classList.toggle('on', k === i); t.setAttribute('aria-selected', k === i); });
      panels.forEach(function (p, k) { p.classList.toggle('on', k === i); });
      var t = tabs[i], bar = t.parentNode;
      if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: t.offsetLeft - bar.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
    }
    function stop() { clearTimeout(timer); box.classList.remove('auto'); }
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

  // Light that follows the cursor on the cards.
  document.querySelectorAll('.spot').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Current section in the menu.
  var spy = {}; document.querySelectorAll('#links a').forEach(function (a) { spy[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (list) {
      list.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(spy).forEach(function (k) { spy[k].classList.toggle('on', k === e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(spy).forEach(function (k) { so.observe(document.getElementById(k)); });
  }

  // FAQ: one open at a time.
  var faq = document.querySelectorAll('.faq details');
  faq.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) faq.forEach(function (o) { if (o !== d) o.open = false; }); }); });

  setLang(lang);
})();
