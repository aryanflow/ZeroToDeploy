const live = MODULES.filter((m) => m.status === 'live');
const sorted = [...MODULES].sort((a, b) => a.order - b.order);

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('ztd-progress') || '{}');
  } catch (_) {
    return {};
  }
}

const progress = getProgress();
const doneCount = sorted.filter((m) => progress[m.id]?.done).length;

document.getElementById('live-count').textContent =
  live.length + ' modules · ' + doneCount + ' completed';

const totalSlides = live.reduce((s, m) => s + m.slides, 0);
const totalMin = live.reduce((s, m) => s + m.minutes, 0);

document.getElementById('stats').innerHTML = [
  { n: live.length, l: 'Modules' },
  { n: totalSlides, l: 'Total slides' },
  { n: '~' + totalMin + ' min', l: 'Total time' },
  { n: '0$', l: 'Cloud spend' },
]
  .map((s) => `<div class="stat"><b>${s.n}</b><span>${s.l}</span></div>`)
  .join('');

const startBtn = document.getElementById('start-cta');
if (startBtn) {
  startBtn.href = '#modules-heading';
  startBtn.textContent = 'Pick a topic';
}

const pipe = document.getElementById('pipeline');
sorted
  .filter((m) => m.status === 'live')
  .forEach((mod, i) => {
    if (i) {
      const arr = document.createElement('span');
      arr.className = 'parr';
      arr.textContent = '·';
      arr.setAttribute('aria-hidden', 'true');
      pipe.appendChild(arr);
    }
    const link = document.createElement('a');
    link.className = 'pbox live' + (progress[mod.id]?.done ? ' done' : '');
    link.href = mod.path;
    link.innerHTML =
      '<span class="dot" style="background:' +
      mod.color +
      '"></span>' +
      mod.title.toUpperCase() +
      (progress[mod.id]?.done ? ' ✓' : '');
    const box = document.createElement('span');
    box.className = 'pstep';
    box.appendChild(link);
    pipe.appendChild(box);
  });

function relatedLabel(m) {
  if (!m.prerequisites?.length) return 'Standalone';
  return 'Related: ' + m.prerequisites.map((id) => MODULES.find((x) => x.id === id)?.title || id).join(', ');
}

document.getElementById('modules').innerHTML = sorted
  .map((m) => {
    const isLive = m.status === 'live';
    const href = isLive ? m.path : '#';
    const cls = 'mod' + (isLive ? '' : ' soon');
    const p = progress[m.id];
    const btn = !isLive
      ? 'Coming soon'
      : p?.done
        ? 'Review module'
        : p?.slide
          ? 'Resume · slide ' + (p.slide + 1)
          : 'Start module';
    return `<${isLive ? 'a' : 'div'} class="${cls}" ${isLive ? `href="${href}"` : ''} style="--accent:${m.color}">
  <span class="tag" style="background:${m.color}">${isLive ? (p?.done ? 'DONE' : 'LIVE') : 'SOON'}</span>
  <div class="codename">${m.codename}</div>
  <h3>${m.title}</h3>
  <p class="desc">${m.desc}</p>
  <div class="meta">
   ${m.tags.map((t) => `<span class="chip">${t}</span>`).join('')}
   <span class="chip time">${m.slides} slides · ~${m.minutes} min</span>
   <span class="chip pre">${relatedLabel(m)}</span>
  </div>
  <span class="launch">${btn}</span>
 </${isLive ? 'a' : 'div'}>`;
  })
  .join('');

document.getElementById('footer-ts').textContent =
  'Built ' + new Date().getFullYear() + ' · static HTML · progress saved in your browser';
