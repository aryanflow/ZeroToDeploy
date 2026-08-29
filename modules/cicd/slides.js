const SLIDES=[

/* 0 — cover */
{label:'START HERE',color:'var(--cicd)',hint:'<b>Click Next</b> — or use arrow keys. 10 slides, ~15 minutes.',html:`
 <div class="inner">
  <h1 class="mega">CI/CD,<br>learned by<br><span class="hl">clicking.</span></h1>
  <p class="lede" style="margin-top:26px">Push code → tests run → app deploys. Automatically. Every time. No scrolling. One idea per slide, and when it's time to try — a <b>simulated pipeline</b> runs right here. By the last slide you'll read YAML, watch jobs pass, and ship on green. <b>Nothing can break production.</b></p>
  <div class="heroart">
   <div class="hbox" style="background:var(--cicd);animation-delay:.05s">PUSH</div>
   <div class="hbox" style="background:var(--blue);animation-delay:.15s">BUILD</div>
   <div class="hbox" style="background:var(--yellow);color:var(--ink);animation-delay:.25s">TEST</div>
   <div class="hbox" style="background:var(--green);animation-delay:.35s">DEPLOY</div>
   <div class="hbox" style="background:var(--violet);animation-delay:.45s">Actions</div>
  </div>
 </div>`},

/* 1 — the idea */
{label:'CH 01 · THE IDEA',color:'var(--blue)',hint:'Three boxes. That is the entire mental model.',html:`
 <div class="inner">
  <h2 class="big">CI/CD = a <em style="background:var(--blue)">robot teammate</em> that ships for you</h2>
  <p class="lede">Every push to your repo can trigger a pipeline: build your app, run tests, deploy if green. You stop SSH-ing into servers at 2am. Only three words matter:</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--blue)">THE TRIGGER</span><div class="bigico">⚡</div><h3>Event</h3><div class="metaphor">push · PR · schedule · manual</div><p>Something happens in git — usually a <b>push to main</b>. That kicks off the pipeline. Like a webhook with superpowers.</p></div>
   <div class="crate"><span class="tag" style="background:var(--cicd)">THE FACTORY</span><div class="bigico">🏭</div><h3>Pipeline</h3><div class="metaphor">jobs · steps · runners</div><p>A sequence of <b>jobs</b> on fresh VMs. Each job has <b>steps</b> — shell commands or actions. Fail one step, whole job fails.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">THE OUTCOME</span><div class="bigico">🚀</div><h3>Deploy</h3><div class="metaphor">artifacts · envs · rollback</div><p>If all jobs pass, ship it. Build output becomes an <b>artifact</b>. Deploy to staging, then prod — or straight to prod if you're brave.</p></div>
  </div>
  <div class="gitstrip">
   <span class="t">You know git → you already know this</span>
   <span><b>push</b><i>≈</i>trigger</span><span><b>workflow file</b><i>≈</i>Dockerfile</span><span><b>job logs</b><i>≈</i>docker logs</span><span><b>green check</b><i>≈</i>tests pass</span><span><b>deploy</b><i>≈</i>docker push</span>
  </div>
 </div>`},

/* 2 — the flow */
{label:'CH 01 · THE FLOW',color:'var(--blue)',hint:'Left to right. Every CI/CD system ever is this picture.',html:`
 <div class="inner">
  <h2 class="big">Everything moves <em style="background:var(--cicd)">left to right</em></h2>
  <p class="lede">GitHub Actions, GitLab CI, Jenkins — same shape. Code lands in git, a runner picks up the job, steps execute, artifacts upload, deploy happens on green.</p>
  <div class="flow">
   <div class="fbox"><div class="b">📝</div><b>Commit</b><small>git push origin main</small></div>
   <div class="farr">trigger<b>→</b></div>
   <div class="fbox"><div class="b">🏭</div><b>Build + Test</b><small>install · lint · test</small></div>
   <div class="farr">on green<b>→</b></div>
   <div class="fbox"><div class="b">📦</div><b>Artifact</b><small>dist/ · image · zip</small></div>
   <div class="farr">deploy<b>→</b></div>
   <div class="fbox"><div class="b">🌐</div><b>Production</b><small>users see it</small></div>
  </div>
  <div class="coach" style="border-left-color:var(--blue);margin-top:36px"><b>Next slide:</b> a live terminal. You'll push, watch a workflow run, and read the logs — step by step.</div>
 </div>`},

/* 3 — playground 1 */
{label:'CH 02 · PLAYGROUND',color:'var(--yellow)',hint:'Complete the 5 steps in the yellow coach box, then hit Next.',html:`
 <div class="inner">
  <h2 class="big">Push. <em style="background:var(--green)">Watch it run.</em></h2>
  <div class="playwrap">
   <div class="term">
    <div class="bar"><i></i><i></i><i></i><span>conveyor — simulated Actions CLI</span></div>
    <div class="tout" id="tout"></div>
    <div class="tinrow"><span class="pr">$</span><input id="tin" placeholder="gh workflow run ci.yml" autocomplete="off" spellcheck="false" aria-label="terminal"></div>
    <div class="chips" id="chips"></div>
   </div>
   <div class="state">
    <h4>🏃 Workflow runs <em id="hbc"></em></h4>
    <div class="zone" id="dz"><div class="none">No runs yet — trigger one.</div></div>
   </div>
  </div>
  <div class="coach" id="coach" style="border-left-color:var(--yellow)"></div>
 </div>`},

/* 4 — yaml concept */
{label:'CH 03 · THE YAML',color:'var(--cicd)',hint:'Read the structure — name, on, jobs, steps. Then Next to run it.',html:`
 <div class="inner">
  <h2 class="big">The pipeline lives in: <em style="background:var(--cicd)">.github/workflows/</em></h2>
  <p class="lede">One YAML file in your repo. GitHub reads it on every matching event. Four blocks — that's the whole file:</p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--cicd)">TOP</span><h3 style="font-size:16px">name + on</h3><p><b>What</b> this workflow is called and <b>when</b> it runs — push to main, pull request, cron schedule.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">MIDDLE</span><h3 style="font-size:16px">jobs</h3><p>Named units of work. Each gets a fresh runner. Jobs can run in <b>parallel</b> or <b>depend</b> on each other.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">INSIDE</span><h3 style="font-size:16px">steps</h3><p>Shell commands or <code style="background:var(--ink);color:#a8f0b8;padding:1px 6px;border-radius:4px;font-size:12px">uses:</code> actions from the marketplace. Run top to bottom.</p></div>
  </div>
  <div class="coach" style="border-left-color:var(--cicd);margin-top:26px"><b>Next slide:</b> press run and watch each job light up — build, test, then deploy only if both pass.</div>
 </div>`},

/* 5 — pipeline playground */
{label:'CH 03 · RUN IT',color:'var(--cicd)',hint:'Press run pipeline. Watch jobs execute in order.',html:`
 <div class="inner">
  <h2 class="big">Press run. <em style="background:var(--blue)">Watch the conveyor.</em></h2>
  <div class="pipewrap">
   <div class="yamlbox">
    <h4>.github/workflows/ci.yml</h4>
    <div class="yaml" id="yaml"><span class="blk" data-j="build"><span class="k">name:</span> <span class="v">CI</span>
<span class="k">on:</span> <span class="v">push: { branches: [main] }</span>
<span class="k">jobs:</span>
  <span class="k">build:</span>
    <span class="k">runs-on:</span> <span class="v">ubuntu-latest</span>
    <span class="k">steps:</span>
      - <span class="k">uses:</span> <span class="v">actions/checkout@v4</span>
      - <span class="k">run:</span> <span class="v">npm ci && npm run build</span></span><span class="blk" data-j="test">  <span class="k">test:</span>
    <span class="k">needs:</span> <span class="v">build</span>
    <span class="k">runs-on:</span> <span class="v">ubuntu-latest</span>
    <span class="k">steps:</span>
      - <span class="k">run:</span> <span class="v">npm test</span></span><span class="blk" data-j="deploy">  <span class="k">deploy:</span>
    <span class="k">needs:</span> <span class="v">[build, test]</span>
    <span class="k">if:</span> <span class="v">success()</span>
    <span class="k">steps:</span>
      - <span class="k">run:</span> <span class="v">./deploy.sh</span></span></div>
   </div>
   <div class="pipeviz">
    <h4>Live run</h4>
    <div class="stages" id="stages">
     <div class="stage off" id="st-build"><span class="ico">🔨</span><div><b>build</b><small>npm ci && npm run build</small></div><span class="dur">—</span></div>
     <div class="stage off" id="st-test"><span class="ico">🧪</span><div><b>test</b><small>npm test · needs build</small></div><span class="dur">—</span></div>
     <div class="stage off" id="st-deploy"><span class="ico">🚀</span><div><b>deploy</b><small>./deploy.sh · needs [build, test]</small></div><span class="dur">—</span></div>
    </div>
    <div class="simlog" id="plog">Idle. One button runs the whole pipeline.</div>
    <div class="bgo"><button class="act cicdgo" id="runbtn">▸ run workflow</button><button class="act alt" id="failbtn">simulate test fail</button></div>
   </div>
  </div>
 </div>`},

/* 6 — secrets & artifacts */
{label:'CH 04 · SECRETS',color:'var(--violet)',hint:'Never commit keys. Artifacts bridge jobs.',html:`
 <div class="inner">
  <h2 class="big">Two things pipelines need: <em style="background:var(--violet)">secrets &amp; artifacts</em></h2>
  <p class="lede">Deploy needs API keys. Build output needs to reach the deploy job. Both have first-class solutions.</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--violet)">SECRETS</span><div class="bigico">🔐</div><h3>GitHub Secrets</h3><p>Store <code style="background:var(--ink);color:#a8f0b8;padding:1px 6px;border-radius:4px;font-size:12px">AWS_KEY</code> in repo settings. Reference as <code style="background:var(--ink);color:#a8f0b8;padding:1px 6px;border-radius:4px;font-size:12px">\${{ secrets.AWS_KEY }}</code>. Never in the YAML value — always masked in logs.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">ARTIFACTS</span><div class="bigico">📦</div><h3>Upload / Download</h3><p>Job A builds <code style="background:var(--ink);color:#a8f0b8;padding:1px 6px;border-radius:4px;font-size:12px">dist/</code>, uploads it. Job B downloads the same bytes. Runners are ephemeral — nothing persists unless you upload it.</p></div>
   <div class="crate"><span class="tag" style="background:var(--cicd)">ENVIRONMENTS</span><div class="bigico">🌍</div><h3>Staging → Prod</h3><p><b>Environments</b> add approval gates. Deploy to staging automatically; prod requires a human click. Protection rules stop cowboy deploys.</p></div>
  </div>
 </div>`},

/* 7 — deploy on green */
{label:'CH 05 · SHIP IT',color:'var(--green)',hint:'Press deploy. Watch the gates check before prod goes live.',html:`
 <div class="inner">
  <h2 class="big">Green means <em style="background:var(--green)">go.</em> Red means stop.</h2>
  <p class="lede">The deploy job only runs when every upstream job passed. That's <code style="background:var(--ink);color:#a8f0b8;padding:1px 7px;border-radius:5px;font-size:12px">needs:</code> + <code style="background:var(--ink);color:#a8f0b8;padding:1px 7px;border-radius:5px;font-size:12px">if: success()</code> in action.</p>
  <div class="deploywrap">
   <div class="deploybox">
    <h4>Pre-deploy gates</h4>
    <div class="gates" id="gates">
     <div class="gate pass" id="g-build"><span class="chk">✓</span> build passed</div>
     <div class="gate pass" id="g-test"><span class="chk">✓</span> test passed</div>
     <div class="gate pass" id="g-lint"><span class="chk">✓</span> lint passed</div>
    </div>
    <div class="bgo"><button class="act cicdgo" id="deploybtn">▸ deploy to production</button></div>
    <div class="simlog" id="dlog">All gates green. Ready to ship.</div>
   </div>
   <div class="deploybox">
    <h4>Production</h4>
    <div class="prod" id="prod"><div><span style="font-size:32px">🌐</span><b>Waiting…</b><small>v1.0.0 not deployed yet</small></div></div>
   </div>
  </div>
 </div>`},

/* 8 — cheat */
{label:'CH 06 · THE 12',color:'var(--sea)',hint:'Click any snippet to copy. This is your daily driver.',html:`
 <div class="inner">
  <h2 class="big">One platform. <em style="background:var(--sea)">Twelve patterns.</em></h2>
  <p class="lede">GitHub Actions YAML you'll write again and again. Click to copy.</p>
  <div class="cheat" id="cheat"></div>
 </div>`},

/* 9 — finish */
{label:'DEPARTURE',color:'var(--green)',hint:'That was the whole model. Go wire up a real workflow.',html:`
 <div class="inner">
  <h1 class="mega" style="font-size:clamp(34px,6vw,72px)">You know<br><span class="hl" style="background:var(--green)">CI/CD now.</span></h1>
  <p class="lede" style="margin-top:24px">Push triggers the pipeline, jobs run steps on fresh runners, artifacts bridge jobs, secrets stay out of git, deploy only on green. That's GitHub Actions — and every other CI system is the same shape. <b>That's the entire working model.</b></p>
  <div class="grid3" style="margin-top:30px">
   <div class="crate"><span class="tag" style="background:var(--green)">DO NOW</span><h3 style="font-size:15px">Add a workflow</h3><p>Create <code style="font-size:12px">.github/workflows/ci.yml</code> in any repo. Start with checkout + one <code style="font-size:12px">run:</code> step. Push and watch the Actions tab.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THIS WEEK</span><h3 style="font-size:15px">Build → test → deploy</h3><p>Three jobs, <code style="font-size:12px">needs:</code> between them. Add a secret for deploy credentials. Break a test on purpose — watch deploy skip.</p></div>
   <div class="crate"><span class="tag" style="background:var(--cicd)">REPLAY</span><h3 style="font-size:15px">Come back anytime</h3><p>The playgrounds reset on reload. Muscle memory: <b>push → watch logs → fix red → ship green.</b></p></div>
  </div>
 </div>`}
];

window.onDeckReady = function () {
const $ = DeckEngine.$;
const wait = DeckEngine.wait;
const rid = () => Math.random().toString(36).slice(2, 10);

/* ================= TERMINAL SIM (slide 3) ================= */
const S = { step: 0, runs: [] };
function P(t, c) { const d = document.createElement('div'); if (c) d.className = 'c-' + c; d.textContent = t; $('tout').appendChild(d); $('tout').scrollTop = 1e9; return d; }
function E(c) { const d = document.createElement('div'); d.innerHTML = '<span class="c-dim">$</span> <span class="c-cmd"></span>'; d.lastElementChild.textContent = c; $('tout').appendChild(d); $('tout').scrollTop = 1e9; }
const STEPS = [
 { c: 'git push origin main', t: '<b>Step 1 / 5</b> — the trigger: <code>git push origin main</code>. GitHub sees the push and queues a workflow run.' },
 { c: 'gh run list --limit 3', t: '<b>Step 2 / 5</b> — see recent runs: <code>gh run list</code>. Each row is one pipeline execution.' },
 { c: 'gh run watch', t: '<b>Step 3 / 5</b> — follow live: <code>gh run watch</code>. Logs stream as each step executes.' },
 { c: 'gh run view --log', t: '<b>Step 4 / 5</b> — read full logs: <code>gh run view --log</code>. This is where you debug red builds.' },
 { c: 'gh run rerun --failed', t: '<b>Step 5 / 5</b> — retry: <code>gh run rerun --failed</code>. Re-runs only the jobs that failed — saves time.' }];
function coach() {
 const el = $('coach'); if (!el) return;
 el.innerHTML = S.step >= STEPS.length
  ? '<b>All 5 done 🎉</b> — push → list → watch → logs → rerun is the daily loop. Free play: <code>gh workflow list</code>… then hit <b>Next</b>.'
  : STEPS[S.step].t;
}
function chips() {
 const b = $('chips'); if (!b) return; b.innerHTML = '';
 const L = [];
 if (S.step < STEPS.length) L.push([STEPS[S.step].c, 1]);
 L.push(['gh workflow list', 0], ['help', 0]);
 L.forEach(([c, n]) => { const x = document.createElement('button'); x.className = 'chip' + (n ? ' go' : ''); x.textContent = c; x.onclick = () => run(c); b.appendChild(x); });
}
function draw() {
 const dz = $('dz'); if (!dz) return;
 dz.innerHTML = S.runs.length ? '' : '<div class="none">No runs yet — trigger one.</div>';
 S.runs.forEach(r => {
  const d = document.createElement('div'); d.className = 'run ' + r.st;
  d.innerHTML = '<span class="led"></span><div><b>' + r.name + '</b><small>' + r.id + ' · ' + r.branch + '</small></div><span class="st">' + r.label + '</span>';
  dz.appendChild(d);
 });
 $('hbc').textContent = S.runs.length ? S.runs.length + ' run(s)' : '';
 chips();
}
const adv = i => { if (S.step === i) { S.step++; coach(); chips(); } };
async function run(raw) {
 E(raw); if ($('tin')) $('tin').value = '';
 const t = raw.trim();
 if (t === 'help') return P('git push origin main · gh run list · gh run watch · gh run view --log · gh run rerun --failed · gh workflow list · clear', 'cy');
 if (t === 'clear') return $('tout').innerHTML = '';
 if (t === 'git push origin main') {
  await wait(300);
  P('Enumerating objects: 5, done.', 'dim');
  P('To github.com:you/app.git', 'dim');
  P('   abc1234..def5678  main -> main', 'ok');
  const id = rid();
  S.runs.unshift({ id: id, name: 'CI', branch: 'main', st: 'run', label: 'IN PROGRESS' });
  draw(); adv(0);
  await wait(800);
  if (S.runs[0]) { S.runs[0].st = 'ok'; S.runs[0].label = 'SUCCESS'; draw(); }
  P('✓ Workflow triggered — run #' + id, 'ok'); return;
 }
 if (t.startsWith('gh run list')) {
  await wait(280);
  if (!S.runs.length) { P('(no runs — push first)', 'dim'); return; }
  P('STATUS    NAME    BRANCH    ID', 'cy');
  S.runs.slice(0, 3).forEach(r => P(r.label.padEnd(10) + 'CI      ' + r.branch.padEnd(8) + r.id, 'cy'));
  adv(1); return;
 }
 if (t === 'gh run watch') {
  await wait(350);
  P('✓ build · npm ci && npm run build · 42s', 'ok');
  await wait(400);
  P('✓ test · npm test · 18s', 'ok');
  await wait(350);
  P('✓ deploy · ./deploy.sh · 12s', 'ok');
  P('Run completed — all jobs passed ✅', 'ok'); adv(2); return;
 }
 if (t.startsWith('gh run view')) {
  await wait(280);
  P('[build] npm ci && npm run build', 'dim');
  P('  added 847 packages', 'cy');
  P('[test] npm test', 'dim');
  P('  Tests: 42 passed, 42 total', 'ok');
  P('[deploy] ./deploy.sh', 'dim');
  P('  Deployed v1.0.0 to production', 'ok'); adv(3); return;
 }
 if (t.startsWith('gh run rerun')) {
  await wait(320);
  P('Re-running failed jobs for run #' + (S.runs[0]?.id || '???') + '…', 'dim');
  P('Workflow re-queued ✅', 'ok'); adv(4); return;
 }
 if (t === 'gh workflow list') {
  await wait(250);
  P('CI          active  .github/workflows/ci.yml', 'cy');
  P('Deploy      active  .github/workflows/deploy.yml', 'cy'); return;
 }
 P(t.split(' ')[0] + ': not found — try: help', 'err');
}
document.addEventListener('keydown', e => { if (e.target.id === 'tin' && e.key === 'Enter' && e.target.value.trim()) run(e.target.value); });
P('🏭 Simulated GitHub CLI. Type freely — nothing real, nothing deployed.', 'cy');
P(''); draw(); coach();

/* ================= PIPELINE SIM (slide 5) ================= */
let simFail = false;
async function runStage(id, label, ms) {
 const el = $(id); if (!el) return false;
 el.className = 'stage run';
 el.querySelector('.dur').textContent = '…';
 $('plog').textContent = 'Running ' + label + '…';
 document.querySelector('[data-j="' + id.replace('st-', '') + '"]')?.classList.add('hot');
 await wait(ms);
 if (simFail && id === 'st-test') {
  el.className = 'stage fail';
  el.querySelector('.dur').textContent = 'FAIL';
  $('plog').textContent = '❌ test failed — deploy skipped. Fix the test, push again.';
  return false;
 }
 el.className = 'stage ok';
 el.querySelector('.dur').textContent = (ms / 1000 | 0) + 's';
 return true;
}
$('runbtn').onclick = async () => {
 simFail = false;
 ['st-build', 'st-test', 'st-deploy'].forEach(id => { const el = $(id); if (el) { el.className = 'stage off'; el.querySelector('.dur').textContent = '—'; } });
 document.querySelectorAll('.yaml .blk').forEach(b => b.classList.remove('hot'));
 $('plog').textContent = 'Starting workflow…';
 await wait(200);
 if (!await runStage('st-build', 'build', 1200)) return;
 if (!await runStage('st-test', 'test', 900)) return;
 await runStage('st-deploy', 'deploy', 700);
 $('plog').innerHTML = '<b>All jobs passed ✅</b> — artifact shipped to production.';
};
$('failbtn').onclick = async () => {
 simFail = true;
 ['st-build', 'st-test', 'st-deploy'].forEach(id => { const el = $(id); if (el) { el.className = 'stage off'; el.querySelector('.dur').textContent = '—'; } });
 $('plog').textContent = 'Simulating a test failure…';
 await wait(200);
 await runStage('st-build', 'build', 800);
 await runStage('st-test', 'test', 600);
 $('st-deploy').className = 'stage off';
 $('st-deploy').querySelector('.dur').textContent = 'skipped';
};

/* ================= DEPLOY SIM (slide 7) ================= */
$('deploybtn').onclick = async () => {
 const allPass = ['g-build', 'g-test', 'g-lint'].every(id => $(id)?.classList.contains('pass'));
 if (!allPass) { $('dlog').textContent = '❌ Gates not green — fix failing jobs first.'; return; }
 $('dlog').textContent = 'Deploying v1.0.0…';
 await wait(400);
 $('dlog').textContent = 'Uploading artifact…'; await wait(350);
 $('dlog').textContent = 'Running ./deploy.sh on production…'; await wait(450);
 $('prod').className = 'prod live';
 $('prod').innerHTML = '<div><span style="font-size:32px">🚀</span><b>Live!</b><small>v1.0.0 · deployed just now · https://app.example.com</small></div>';
 $('dlog').innerHTML = '<b>Deployed ✅</b> — users are on the new version.';
};

/* ================= CHEAT (slide 8) ================= */
const CHEAT = [
 ['on:\n  push:\n    branches: [main]', 'trigger on push to main'],
 ['on:\n  pull_request:', 'trigger on every PR'],
 ['runs-on: ubuntu-latest', 'which OS the job uses'],
 ['needs: build', 'wait for another job'],
 ['if: success()', 'only run if upstream passed'],
 ['uses: actions/checkout@v4', 'clone the repo'],
 ['uses: actions/setup-node@v4', 'install Node.js'],
 ['run: npm test', 'run any shell command'],
 ['uses: actions/upload-artifact@v4', 'save build output'],
 ['uses: actions/download-artifact@v4', 'fetch saved output'],
 ['env:\n  KEY: ${{ secrets.API_KEY }}', 'inject a secret'],
 ['environment: production', 'add approval gate']];
CHEAT.forEach(([c, w]) => {
 const b = document.createElement('button'); b.className = 'cc';
 b.innerHTML = '<div><code></code><small>' + w + '</small></div><span class="cp">COPY</span>';
 b.querySelector('code').textContent = c;
 b.onclick = () => { if (navigator.clipboard) navigator.clipboard.writeText(c); b.classList.add('copied'); b.querySelector('.cp').textContent = '✓'; toast('Copied'); setTimeout(() => { b.classList.remove('copied'); b.querySelector('.cp').textContent = 'COPY'; }, 1500); };
 $('cheat').appendChild(b);
});

};

DeckEngine.init(SLIDES);
