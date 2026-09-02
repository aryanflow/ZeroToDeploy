/* Live demo terminal on the hub — first win in 5 seconds */
(function () {
  const demos = {
    'git status': {
      out: ['On branch main', 'Changes not staged:', '  modified:   app.js', '  modified:   readme.md'],
      cls: ['dim', 'err', 'err', 'err'],
      link: 'modules/git/index.html?workbench',
    },
    'docker ps': {
      out: ['CONTAINER ID   IMAGE     STATUS        NAMES', 'a1b2c3d4e5f6   nginx     Up 2 min      web'],
      cls: ['cy', 'cy'],
      link: 'modules/docker/index.html?workbench',
    },
    'terraform plan': {
      out: ['Plan: 3 to add, 0 to change, 0 to destroy.', '(preview only — run apply to create resources)'],
      cls: ['warn', 'dim'],
      link: 'modules/terraform/index.html?workbench',
    },
    'kubectl get pods': {
      out: ['NAME                    READY   STATUS', 'web-7d4f8b-x9k2m        1/1     Running'],
      cls: ['cy', 'cy'],
      link: 'modules/kubernetes/index.html?workbench',
    },
  };

  const tout = document.getElementById('hub-tout');
  const tin = document.getElementById('hub-tin');
  const chips = document.getElementById('hub-chips');
  const goLink = document.getElementById('hub-go-module');
  if (!tout || !tin) return;

  let lastLink = 'modules/git/index.html?workbench';

  function line(t, c) {
    const d = document.createElement('div');
    if (c) d.className = 'c-' + c;
    d.textContent = t;
    tout.appendChild(d);
    tout.scrollTop = 1e9;
  }

  function run(cmd) {
    line('$ ' + cmd, 'dim');
    const d = demos[cmd];
    if (!d) {
      line('Try: git status · docker ps · terraform plan · kubectl get pods', 'dim');
      return;
    }
    lastLink = d.link;
    if (goLink) {
      goLink.href = d.link;
      goLink.textContent = 'Open full workbench →';
    }
    d.out.forEach((t, i) => line(t, d.cls[i]));
    line('', '');
  }

  Object.keys(demos).forEach((cmd) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hub-chip';
    b.textContent = cmd;
    b.onclick = () => {
      tin.value = cmd;
      run(cmd);
    };
    chips.appendChild(b);
  });

  tin.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && tin.value.trim()) run(tin.value.trim());
  });

  line('Pick a command or type one. Nothing is real.', 'or');
  line('');
})();
