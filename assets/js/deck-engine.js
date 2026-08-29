/* Shared slide-deck engine for all ZeroToDeploy modules */
window.DeckEngine = (function () {
  let slides = [];
  let cur = 0;
  let seen = new Set([0]);

  const $ = (id) => document.getElementById(id);
  const wait = (m) => new Promise((r) => setTimeout(r, m));

  window.toast = (m) => {
    const t = $('toast');
    if (!t) return;
    t.textContent = m;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  };

  function go(i, dir) {
    if (i < 0 || i >= slides.length) return;
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
    $('hintbar').innerHTML = slides[i].hint;
    $('prev').disabled = i === 0;
    $('next').textContent = i === slides.length - 1 ? 'Restart ↺' : 'Next →';
    if (i === 3) setTimeout(() => { const t = $('tin'); if (t) t.focus(); }, 350);
  }

  function init(slideData) {
    slides = slideData;
    cur = 0;
    seen = new Set([0]);
    const stage = $('stage');
    const prog = $('prog');
    stage.innerHTML = '';
    prog.innerHTML = '';

    slides.forEach((s, i) => {
      const d = document.createElement('div');
      d.className = 'slide';
      d.id = 'sl' + i;
      d.innerHTML =
        '<div class="inner"><div class="stencil"><b style="background:' +
        s.color +
        '"></b>' +
        s.label +
        '</div></div>' +
        s.html;
      stage.appendChild(d);
      const p = document.createElement('i');
      p.onclick = () => go(i);
      p.setAttribute('aria-label', 'Slide ' + (i + 1));
      prog.appendChild(p);
    });

    $('next').onclick = () => go(cur === slides.length - 1 ? 0 : cur + 1, 1);
    $('prev').onclick = () => go(cur - 1, -1);
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') go(Math.min(cur + 1, slides.length - 1), 1);
      if (e.key === 'ArrowLeft') go(cur - 1, -1);
    });

    go(0);
    if (typeof window.onDeckReady === 'function') window.onDeckReady();
  }

  return { init, go, $, wait };
})();
