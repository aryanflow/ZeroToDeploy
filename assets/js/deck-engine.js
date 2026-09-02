/* Shared slide-deck engine for all ZeroToDeploy modules */
window.DeckEngine = (function () {
  let slides = [];
  let cur = 0;
  let seen = new Set([0]);
  const meta = window.DECK_META || {};

  let termSnapshot = '';
  const $ = (id) => document.getElementById(id);
  const $term = (id) => {
    const active = document.querySelector('.slide.on');
    if (active) {
      const scoped = active.querySelector('#' + id);
      if (scoped) return scoped;
    }
    return document.getElementById(id);
  };
  const wait = (m) => new Promise((r) => setTimeout(r, m));

  window.toast = (m) => {
    const t = $('toast');
    if (!t) return;
    t.textContent = m;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  };

  function saveProgress(i) {
    if (!meta.id) return;
    try {
      const all = JSON.parse(localStorage.getItem('ztd-progress') || '{}');
      all[meta.id] = { slide: i, at: Date.now() };
      if (i === slides.length - 1) all[meta.id].done = true;
      localStorage.setItem('ztd-progress', JSON.stringify(all));
    } catch (_) {}
  }

  function resolveStart() {
    const params = new URLSearchParams(location.search);
    if (params.has('workbench')) {
      const i = slides.findIndex((s) => s.workbench);
      if (i >= 0) return i;
    }
    const slideParam = params.get('slide');
    if (slideParam != null) {
      const n = parseInt(slideParam, 10);
      if (!Number.isNaN(n) && n >= 0 && n < slides.length) return n;
    }
    if (meta.id) {
      try {
        const all = JSON.parse(localStorage.getItem('ztd-progress') || '{}');
        const p = all[meta.id];
        if (p && typeof p.slide === 'number' && p.slide < slides.length) return p.slide;
      } catch (_) {}
    }
    return 0;
  }

  function updateHeader() {
    const logo = document.querySelector('#top .logo');
    if (!logo || !meta.topic) return;
    const mark = logo.querySelector('.logo-mark');
    logo.innerHTML = '';
    if (mark) logo.appendChild(mark.cloneNode(true));
    else {
      const img = document.createElement('img');
      img.src = meta.logo || '../../assets/brand/logo.svg';
      img.alt = 'ZeroToDeploy';
      img.className = 'logo-mark';
      img.width = 28;
      img.height = 28;
      logo.appendChild(img);
    }
    const label = document.createElement('span');
    label.className = 'logo-text';
    label.innerHTML =
      '<b>' + meta.topic + '</b>' + (meta.codename ? '<small>' + meta.codename + '</small>' : '');
    logo.appendChild(label);
  }

  function updateNextBtn(i) {
    const btn = $('next');
    if (!btn) return;
    if (i === slides.length - 1) {
      btn.textContent = 'Back to hub ↑';
      btn.dataset.mode = 'hub';
    } else {
      btn.textContent = 'Next →';
      btn.dataset.mode = 'next';
    }
  }

  function go(i, dir) {
    if (i < 0 || i >= slides.length) return;
    const prevTout = document.querySelector('.slide.on .tout');
    if (prevTout) termSnapshot = prevTout.innerHTML;
    document.querySelectorAll('.slide').forEach((s) => s.classList.remove('on', 'back'));
    const el = $('sl' + i);
    el.classList.add('on');
    if (dir < 0) el.classList.add('back');
    cur = i;
    seen.add(i);
    const prog = $('prog');
    [...prog.children].forEach((p, x) => {
      p.className = x === i ? 'now' : seen.has(x) ? 'done' : '';
    });
    $('counter').textContent = String(i + 1).padStart(2, '0') + ' / ' + slides.length;
    $('hintbar').innerHTML = slides[i].hint || '';
    $('prev').disabled = i === 0;
    updateNextBtn(i);
    saveProgress(i);
    const newTout = document.querySelector('.slide.on .tout');
    if (newTout && termSnapshot) newTout.innerHTML = termSnapshot;
    if (slides[i].terminal) setTimeout(() => { const t = $term('tin'); if (t) t.focus(); }, 350);
  }

  function init(slideData) {
    slides = slideData;
    seen = new Set();
    updateHeader();
    const stage = $('stage');
    const prog = $('prog');
    stage.innerHTML = '';
    prog.innerHTML = '';

    slides.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'slide' + (s.workbench ? ' workbench-slide' : '');
      d.id = 'sl' + i;
      d.innerHTML =
        '<div class="inner' +
        (s.workbench ? ' workbench-inner' : '') +
        '"><div class="stencil"><b style="background:' +
        s.color +
        '"></b>' +
        s.label +
        '</div></div>' +
        s.html;
      stage.appendChild(d);
      const p = document.createElement('button');
      p.type = 'button';
      p.className = 'prog-dot' + (s.workbench ? ' wb' : '');
      p.onclick = () => go(i);
      p.setAttribute('aria-label', 'Slide ' + (i + 1) + ': ' + s.label);
      prog.appendChild(p);
    });

    $('next').onclick = () => {
      const mode = $('next').dataset.mode;
      if (mode === 'hub') {
        window.location.href = meta.hubPath || '../../index.html';
        return;
      }
      go(cur === slides.length - 1 ? 0 : cur + 1, 1);
    };
    $('prev').onclick = () => go(cur - 1, -1);
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') go(Math.min(cur + 1, slides.length - 1), 1);
      if (e.key === 'ArrowLeft') go(cur - 1, -1);
    });

    const start = resolveStart();
    seen.add(start);
    go(start);
    if (typeof window.onDeckReady === 'function') window.onDeckReady();
  }

  return { init, go, $, $term, wait };
})();
