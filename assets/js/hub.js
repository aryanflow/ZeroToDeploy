const live = MODULES.filter((m) => m.status === 'live');
const sorted = [...MODULES].sort((a, b) => a.order - b.order);

document.getElementById('live-count').textContent =
  live.length + ' live · ' + MODULES.filter((m) => m.status === 'soon').length + ' coming';

document.getElementById('stats').innerHTML = [
  { n: live.length, l: 'Live now' },
  { n: MODULES.reduce((s, m) => s + m.slides, 0), l: 'Total slides' },
  {
    n: '~' + MODULES.filter((m) => m.status === 'live').reduce((s, m) => s + m.minutes, 0) + ' min',
    l: 'To finish live deck',
  },
  { n: '0$', l: 'Cloud spend' },
]
  .map((s) => `<div class="stat"><b>${s.n}</b><span>${s.l}</span></div>`)
  .join('');

const pipe = document.getElementById('pipeline');
const pipeSteps = ['START', ...sorted.filter((m) => m.status === 'live').map((m) => m.title.toUpperCase()), 'DEPLOY'];
pipeSteps.forEach((label, i) => {
  if (i) {
    const arr = document.createElement('span');
    arr.className = 'parr';
    arr.textContent = '→';
    arr.setAttribute('aria-hidden', 'true');
    pipe.appendChild(arr);
  }
  const box = document.createElement('span');
  box.className = 'pstep';
  const inner = document.createElement('span');
  inner.className = 'pbox' + (label !== 'START' && label !== 'DEPLOY' ? ' live' : '');
  if (label !== 'START' && label !== 'DEPLOY') {
    const mod = sorted.find((m) => m.title.toUpperCase() === label);
    if (mod) inner.innerHTML = `<span class="dot" style="background:${mod.color}"></span>${label}`;
    else inner.textContent = label;
  } else inner.textContent = label;
  box.appendChild(inner);
  pipe.appendChild(box);
});

document.getElementById('modules').innerHTML = sorted
  .map((m) => {
    const isLive = m.status === 'live';
    const href = isLive ? m.path : '#';
    const cls = 'mod' + (isLive ? '' : ' soon');
    const btn = isLive ? 'Launch module →' : 'Coming soon';
    return `<${isLive ? 'a' : 'div'} class="${cls}" ${isLive ? `href="${href}"` : ''} style="--accent:${m.color}">
  <span class="tag" style="background:${m.color}">${isLive ? 'LIVE' : 'SOON'}</span>
  <div class="codename">${m.codename}</div>
  <h3>${m.title}</h3>
  <p class="desc">${m.desc}</p>
  <div class="meta">
   ${m.tags.map((t) => `<span class="chip">${t}</span>`).join('')}
   <span class="chip time">${m.slides} slides · ~${m.minutes} min</span>
  </div>
  <span class="launch">${btn}</span>
 </${isLive ? 'a' : 'div'}>`;
  })
  .join('');

document.getElementById('footer-ts').textContent =
  'Built ' + new Date().getFullYear() + ' · static HTML, no build step';
