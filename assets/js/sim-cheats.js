/* Wire cheat-sheet buttons: copy + run in terminal when simulator exists */
window.SimCheats = {
  normalize(raw) {
    return raw
      .replace(/\bIMG\b/g, 'nginx')
      .replace(/\bNAME\b/g, 'web')
      .replace(/\bFILE\b/g, 'app.js')
      .replace(/\bURL\b/g, 'https://github.com/you/project.git')
      .replace(/\bSHA\b/g, 'a1b2c3d')
      .replace(/\bADDR\b/g, 'aws_instance.web')
      .replace(/\bID\b/g, 'i-abc123')
      .replace(/\bPOD\b/g, 'web')
      .replace(/\bCTX\b/g, 'minikube')
      .replace(/--replicas=N\b/g, '--replicas=3')
      .replace(/me\/IMG:tag/g, 'me/app:1.2');
  },
  bind(cheatEl, cheat, runFn) {
    if (!cheatEl || !cheat) return;
    cheat.forEach(([c, w]) => {
      const b = document.createElement('button');
      b.className = 'cc';
      b.innerHTML = '<div><code></code><small>' + w + '</small></div><span class="cp">RUN</span>';
      b.querySelector('code').textContent = c;
      b.onclick = () => {
        if (navigator.clipboard) navigator.clipboard.writeText(c);
        b.classList.add('copied');
        const slide = document.querySelector('.slide.on');
        const tout = slide?.querySelector('.tout') || document.getElementById('tout');
        if (tout && typeof runFn === 'function') {
          runFn(SimCheats.normalize(c));
          b.querySelector('.cp').textContent = '✓';
          if (typeof toast === 'function') toast('Ran in terminal ↑');
        } else {
          b.querySelector('.cp').textContent = '✓';
          if (typeof toast === 'function') toast('Copied: open Playground slide to run');
        }
        setTimeout(() => {
          b.classList.remove('copied');
          b.querySelector('.cp').textContent = 'RUN';
        }, 1800);
      };
      cheatEl.appendChild(b);
    });
  },
  helpFrom(cheat) {
    return cheat.map(([c]) => c.split('\n')[0]).join(' · ');
  },
};
