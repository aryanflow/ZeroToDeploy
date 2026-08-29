const SLIDES=[

/* 0 — cover */
{label:'START HERE',color:'var(--git)',hint:'<b>Click Next</b> — or use arrow keys. 10 slides, ~15 minutes.',html:`
 <div class="inner">
  <h1 class="mega">Git, learned<br>by <span class="hl">clicking.</span></h1>
  <p class="lede" style="margin-top:26px">Git is a <b>time machine for your code</b> — every version saved, nothing ever lost, and a whole team working on the same files without stepping on each other. GitHub is where those timelines meet. One idea per slide; when it is time to try, a <b>simulated terminal opens right here</b>. Nothing can be broken.</p>
  <div class="heroart">
   <div class="hbox" style="background:var(--git);animation-delay:.05s">COMMIT</div>
   <div class="hbox" style="background:var(--blue);animation-delay:.15s">BRANCH</div>
   <div class="hbox" style="background:var(--green);animation-delay:.25s">MERGE</div>
   <div class="hbox" style="background:var(--hub);animation-delay:.35s">PUSH</div>
   <div class="hbox" style="background:var(--violet);animation-delay:.45s">PULL REQUEST</div>
  </div>
 </div>`},

/* 1 — the idea */
{label:'CH 01 · THE IDEA',color:'var(--blue)',hint:'Skim the three crates — that is the whole mental model.',html:`
 <div class="inner">
  <h2 class="big">A photo album <em style="background:var(--git)">for your code</em></h2>
  <p class="lede">Git takes <b>snapshots</b> of your whole project whenever you say so. Every snapshot is kept forever, with a note about what changed and why. You can flip back to any of them, or lay two side by side. Three words carry everything:</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--git)">THE SNAPSHOT</span><div class="bigico">📸</div><h3>Commit</h3><div class="metaphor">frozen · named · forever</div><p>One saved version of the project, with a message and an ID. <b>Commits are cheap</b> — make them small and often, like quicksaves in a game.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THE TIMELINE</span><div class="bigico">🌿</div><h3>Branch</h3><div class="metaphor">parallel universe · disposable</div><p>A <b>separate line of commits</b> where you experiment safely. Main stays clean while you break things on <code>feature-x</code>. Merge when ready, delete when done.</p></div>
   <div class="crate"><span class="tag" style="background:var(--hub)">THE MEETING POINT</span><div class="bigico">☁️</div><h3>Remote</h3><div class="metaphor">GitHub · the shared copy</div><p>A copy of the repo that lives online. <b>push</b> sends your commits up, <b>pull</b> brings teammates commits down. GitHub adds reviews, issues and CI on top.</p></div>
  </div>
  <div class="darkstrip">
   <span class="t">The one diagram to remember — three zones on your machine</span>
   <span><b>working directory</b><i>→</i>files you are editing right now</span>
   <span><b>staging area</b><i>→</i>the photo frame: what goes in the next snapshot</span>
   <span><b>repository</b><i>→</i>the album of committed snapshots</span>
  </div>
 </div>`},

/* 2 — the flow */
{label:'CH 01 · THE FLOW',color:'var(--blue)',hint:'This exact loop is what you will type on the next slide.',html:`
 <div class="inner">
  <h2 class="big">Edit. Stage. <em style="background:var(--green)">Commit.</em> Push.</h2>
  <p class="lede">The daily rhythm of every developer on earth. The <b>staging area</b> is the step people miss: it lets you choose <b>exactly which changes</b> go into the snapshot — not just "everything I touched today".</p>
  <div class="flow">
   <div class="fbox"><div class="b">✍️</div><b>Edit</b><small>change files</small></div>
   <div class="farr">git add<b>→</b></div>
   <div class="fbox"><div class="b">🖼️</div><b>Stage</b><small>frame the shot</small></div>
   <div class="farr">git commit<b>→</b></div>
   <div class="fbox"><div class="b">📸</div><b>Commit</b><small>snapshot saved</small></div>
   <div class="farr">git push<b>→</b></div>
   <div class="fbox"><div class="b">☁️</div><b>GitHub</b><small>team can see it</small></div>
  </div>
  <div class="coach" style="border-left-color:var(--blue);margin-top:36px"><b>Next slide:</b> a live terminal. You will run this exact loop and watch files move between the three zones in real time.</div>
 </div>`},

/* 3 — playground 1 */
{label:'CH 02 · PLAYGROUND',color:'var(--yellow)',hint:'Complete the 6 steps in the coach box, then hit Next.',html:`
 <div class="inner">
  <h2 class="big">Type. <em style="background:var(--git)">Watch files move.</em></h2>
  <div class="playwrap">
   <div class="term">
    <div class="bar"><i></i><i></i><i></i><span>checkpoint — simulated repo · 2 files ready</span></div>
    <div class="tout" id="tout"></div>
    <div class="tinrow"><span class="pr">$</span><input id="tin" placeholder="git init" autocomplete="off" spellcheck="false" aria-label="terminal"></div>
    <div class="chips" id="chips"></div>
   </div>
   <div class="state">
    <h4>The three zones <em id="hbc"></em></h4>
    <div class="threezone">
     <div class="zonebox wd" id="z-wd"><span class="zl">✍️ Working directory</span><div id="wdfiles"></div></div>
     <div class="zonebox sg" id="z-sg"><span class="zl">🖼️ Staging area</span><div id="sgfiles"><span class="zempty">empty — git add moves files here</span></div></div>
     <div class="zonebox rp" id="z-rp"><span class="zl">📸 Repository — commits</span><div id="rpc"><span class="zempty">no commits yet</span></div></div>
    </div>
   </div>
  </div>
  <div class="coach" id="coach" style="border-left-color:var(--git)"></div>
 </div>`},

/* 4 — branching concept */
{label:'CH 03 · BRANCHES',color:'var(--blue)',hint:'Branches are parallel universes. Merging brings them home.',html:`
 <div class="inner">
  <h2 class="big">Branches: <em style="background:var(--blue)">parallel universes</em></h2>
  <p class="lede">A branch is just a <b>movable label pointing at a commit</b> — creating one is instant and free. The rule every team lives by: <b>main stays releasable, all work happens on branches.</b></p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--blue)">WHY</span><div class="bigico">🧪</div><h3 style="font-size:15px">Fearless experiments</h3><p>Break anything on a branch — main is untouched. Bad idea? <b>Delete the branch</b>, nothing happened. Good idea? Merge it in.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">THE REUNION</span><div class="bigico">🤝</div><h3 style="font-size:15px">Merge</h3><p><code>git merge feature</code> replays your branch work onto main as one joined history. Usually automatic and painless.</p></div>
   <div class="crate"><span class="tag" style="background:var(--git)">THE MONSTER</span><div class="bigico">⚔️</div><h3 style="font-size:15px">Conflicts (demystified)</h3><p>Two branches edited <b>the same lines</b>. Git marks the spot with <code>&lt;&lt;&lt;&lt;</code> markers and asks a human to pick. Fix the lines, add, commit. <b>Annoying, never dangerous.</b></p></div>
  </div>
  <div class="coach" style="border-left-color:var(--blue);margin-top:26px"><b>Next slide:</b> you will grow a commit graph yourself — branch off, commit twice, and merge back. Watch the universes split and reunite.</div>
 </div>`},

/* 5 — branch playground */
{label:'CH 03 · GROW THE GRAPH',color:'var(--blue)',hint:'Press the buttons top to bottom. Watch the graph split and reunite.',html:`
 <div class="inner">
  <h2 class="big">Grow a <em style="background:var(--blue)">commit graph</em></h2>
  <div class="buildwrap">
   <div class="graphbox">
    <h4>the repo — every dot is a commit</h4>
    <div id="graph"></div>
    <div class="gmsg" id="gmsg">main has two commits. HEAD is the "you are here" marker. Start pressing buttons →</div>
   </div>
   <div class="gctl">
    <h4>You are on: <span class="headtag" id="headtag">main</span></h4>
    <button class="gbtn" id="g1"><span class="ic">🌿</span><span>Create a branch &amp; switch to it<code>git switch -c feature</code></span></button>
    <button class="gbtn" id="g2" disabled><span class="ic">📸</span><span>Commit on the branch<code>git commit -m "add login form"</code></span></button>
    <button class="gbtn" id="g3" disabled><span class="ic">📸</span><span>Commit again<code>git commit -m "wire it up"</code></span></button>
    <button class="gbtn" id="g4" disabled><span class="ic">↩️</span><span>Switch back to main<code>git switch main</code></span></button>
    <button class="gbtn" id="g5" disabled><span class="ic">🤝</span><span>Merge the branch in<code>git merge feature</code></span></button>
    <button class="gbtn" id="g6" disabled><span class="ic">🗑️</span><span>Delete the branch — work is safe in main<code>git branch -d feature</code></span></button>
   </div>
  </div>
 </div>`},

/* 6 — github PR */
{label:'CH 04 · GITHUB',color:'var(--hub)',hint:'The pull request is how teams actually merge. Click through one.',html:`
 <div class="inner">
  <h2 class="big">GitHub: where branches <em style="background:var(--hub)">ask permission</em></h2>
  <p class="lede">On a team you do not merge into main yourself. You push your branch and open a <b>pull request</b> — "please pull my branch in" — where the work gets <b>reviewed, tested and discussed</b> before it lands. This is the heartbeat of every software team.</p>
  <div class="prwrap">
   <div class="prcard">
    <div class="prhead"><span class="pico">⇅</span><b>Pull request #42 — add login form</b></div>
    <div class="prbody">
     <div class="prstep on" id="p0"><span class="n">1</span><div><b>Push your branch</b><small><code>git push -u origin feature</code> — your commits go to GitHub. Main is untouched.</small></div></div>
     <div class="prstep" id="p1"><span class="n">2</span><div><b>Open the pull request</b><small>GitHub shows every changed line, side by side. You write what and why.</small></div></div>
     <div class="prstep" id="p2"><span class="n">3</span><div><b>Review &amp; CI</b><small>A teammate comments, requests a tweak; tests run automatically on your branch.</small></div></div>
     <div class="prstep" id="p3"><span class="n">4</span><div><b>Merge on GitHub</b><small>Green button. Your branch lands in main — with full history of the discussion.</small></div></div>
     <div class="prstep" id="p4"><span class="n">5</span><div><b>Everyone syncs</b><small>Teammates run <code>git pull</code> and receive your work. The loop closes.</small></div></div>
    </div>
    <div class="mergebar" id="mergebar"><span class="led"></span><span id="mergetxt">Step 1 of 5 — push the branch</span></div>
   </div>
   <div>
    <div class="crate" style="margin-bottom:18px"><span class="tag" style="background:var(--hub)">CLONE VS FORK</span><h3 style="font-size:15px">Getting a repo</h3><p><b>clone</b> = copy any repo to your machine. <b>fork</b> = your own GitHub copy of someone elses repo — how you contribute to open source: fork → branch → PR.</p></div>
    <div class="crate"><span class="tag" style="background:var(--green)">DAILY SYNC</span><h3 style="font-size:15px">Stay current</h3><p>Start every day with <code>git pull</code> on main. Push your branch often — <b>pushed code is backed up code.</b></p></div>
    <div style="margin-top:18px"><button class="act" id="prbtn" style="border:2.5px solid var(--ink);border-radius:11px;padding:12px 22px;font-size:14px;font-weight:700;background:var(--yellow);box-shadow:4px 4px 0 var(--ink)">▸ advance the pull request</button></div>
   </div>
  </div>
 </div>`},

/* 7 — undo */
{label:'CH 05 · UNDO',color:'var(--violet)',hint:'Git means never losing work. These are the escape hatches.',html:`
 <div class="inner ops">
  <h2 class="big">The undo <em style="background:var(--violet)">superpowers</em></h2>
  <p class="lede">The whole point of git: <b>almost nothing is ever truly lost.</b> Four situations, four moves.</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--violet)">OOPS, THE FILE</span><div class="bigico">🩹</div><h3 style="font-size:15px">Discard edits</h3><p>Ruined a file since the last commit? Restore it to how the last snapshot had it.</p><pre>git restore app.js
git restore --staged app.js
<em># ^ un-stage, keep the edits</em></pre></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">OOPS, THE TIMING</span><div class="bigico">🧳</div><h3 style="font-size:15px">Stash it</h3><p>Half-done work but you must switch branches NOW? Shelve everything, come back later.</p><pre>git stash        <em># shelf it</em>
git stash pop    <em># take it back</em></pre></div>
   <div class="crate"><span class="tag" style="background:var(--git)">OOPS, THE COMMIT</span><div class="bigico">⏪</div><h3 style="font-size:15px">Walk it back</h3><p><b>revert</b> makes a new commit that undoes an old one — safe on shared branches. <b>reset</b> rewrites history — only on branches nobody else has.</p><pre>git revert abc123   <em># safe, public</em>
git reset --soft HEAD~1
<em># ^ uncommit, keep changes</em></pre></div>
  </div>
  <div class="darkstrip"><span class="t">And when you are lost</span>
   <span><b>git status</b><i>=</i>where am I, what changed — run it constantly, it is free</span>
   <span><b>git log --oneline --graph</b><i>=</i>the map of everything</span>
   <span><b>git reflog</b><i>=</i>even "deleted" commits are findable for ~90 days</span>
  </div>
 </div>`},

/* 8 — cheat */
{label:'CH 06 · THE 15',color:'var(--sea)',hint:'Click any command to copy. This grid is the whole job.',html:`
 <div class="inner">
  <h2 class="big">Hundreds of commands. <em style="background:var(--sea)">Fifteen matter.</em></h2>
  <p class="lede">This grid is 95% of a working developers git usage. Click to copy.</p>
  <div class="cheat" id="cheat"></div>
 </div>`},

/* 9 — finish */
{label:'DEPARTURE',color:'var(--green)',hint:'That is the whole model. Go commit something.',html:`
 <div class="inner">
  <h1 class="mega" style="font-size:clamp(34px,6vw,72px)">You know<br><span class="hl" style="background:var(--green)">Git now.</span></h1>
  <p class="lede" style="margin-top:24px">Commits are snapshots, branches are parallel universes, GitHub is where they meet. Edit → stage → commit → push is the rhythm, the pull request is the handshake, and <b>nothing committed is ever lost.</b> That is the entire working model.</p>
  <div class="grid3" style="margin-top:30px">
   <div class="crate"><span class="tag" style="background:var(--green)">DO NOW</span><h3 style="font-size:15px">First real repo</h3><p>Any folder: <b>git init</b>, add, commit. Make a GitHub repo, push it. Ten minutes, and the loop from slide 4 is muscle memory.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THIS WEEK</span><h3 style="font-size:15px">Ship one PR</h3><p>Branch → commit → push → open a pull request → merge it yourself. Even solo — <b>PRs are a diary of why things changed.</b></p></div>
   <div class="crate"><span class="tag" style="background:var(--git)">HABIT</span><h3 style="font-size:15px">Commit small, always</h3><p>Tiny commits with honest messages. <b>git status before every command.</b> Pull before you start. That is 90% of git mastery.</p></div>
  </div>
 </div>`}
];

window.onDeckReady = function () {
const $ = DeckEngine.$;
const wait = DeckEngine.wait;
const sha7 = () => [...Array(7)].map(() => '0123456789abcdef'[Math.random() * 16 | 0]).join('');
/* ================= TERMINAL SIM (slide 3) ================= */
/* zones: wd files (clean|mod), staged files, commits */
const S={init:false,wd:{'app.js':'mod','readme.md':'mod'},sg:{},commits:[],step:0};
function P(t,c){const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;$('tout').appendChild(d);$('tout').scrollTop=1e9;return d}
function E(c){const d=document.createElement('div');d.innerHTML='<span class="c-dim">$</span> <span class="c-cmd"></span>';d.lastElementChild.textContent=c;$('tout').appendChild(d);$('tout').scrollTop=1e9}
const STEPS=[
 {c:'git init',t:'<b>Step 1 / 6</b> — birth of a repo: <code>git init</code>. One hidden .git folder appears; this folder is now tracked.'},
 {c:'git status',t:'<b>Step 2 / 6</b> — your compass: <code>git status</code>. Run it before and after everything. It is free and it never lies.'},
 {c:'git add .',t:'<b>Step 3 / 6</b> — frame the shot: <code>git add .</code> stages both files. Watch them jump zones on the right.'},
 {c:'git commit -m "first commit"',t:'<b>Step 4 / 6</b> — take the snapshot: <code>git commit -m "first commit"</code>. The staged files become a permanent commit.'},
 {c:'git log --oneline',t:'<b>Step 5 / 6</b> — the album: <code>git log --oneline</code>. Every snapshot, newest first, with its ID.'},
 {c:'git push -u origin main',t:'<b>Step 6 / 6</b> — go public: <code>git push -u origin main</code>. Your commits travel to GitHub for the team (and as backup).'}];
function coach(){const el=$('coach');if(!el)return;
 el.innerHTML=S.step>=STEPS.length
  ?'<b>All 6 done 🎉</b> — that is the daily loop. Free play: edit a file with <code>touch notes.txt</code>, then status → add → commit again. Hit <b>Next</b> for branches.'
  :STEPS[S.step].t}
function chips(){const b=$('chips');if(!b)return;b.innerHTML='';
 const L=[];if(S.step<STEPS.length)L.push([STEPS[S.step].c,1]);
 L.push(['git status',0],['git log --oneline',0],['help',0]);
 L.forEach(([c,n])=>{const x=document.createElement('button');x.className='chip'+(n?' go':'');x.textContent=c;x.onclick=()=>run(c);b.appendChild(x)})}
function pulse(z){const el=$('z-'+z);el.classList.add('pulse');setTimeout(()=>el.classList.remove('pulse'),700)}
function draw(){
 const wd=$('wdfiles');wd.innerHTML='';
 const wk=Object.keys(S.wd);
 if(!wk.length)wd.innerHTML='<span class="zempty">clean — nothing changed since last commit</span>';
 wk.forEach(f=>{const s=document.createElement('span');s.className='fpill'+(S.wd[f]==='mod'?' mod':'');s.innerHTML='<i>📄</i>'+f+(S.wd[f]==='mod'?' <i style="color:var(--git)">●</i>':'');wd.appendChild(s)});
 const sg=$('sgfiles');sg.innerHTML='';
 const sk=Object.keys(S.sg);
 if(!sk.length)sg.innerHTML='<span class="zempty">empty — git add moves files here</span>';
 sk.forEach(f=>{const s=document.createElement('span');s.className='fpill';s.innerHTML='<i>📄</i>'+f;sg.appendChild(s)});
 const rp=$('rpc');rp.innerHTML='';
 if(!S.commits.length)rp.innerHTML='<span class="zempty">no commits yet</span>';
 [...S.commits].reverse().slice(0,4).forEach(c=>{const d=document.createElement('div');d.className='commitrow';
  d.innerHTML='<span class="dot"></span><b>'+c.id+'</b><small>'+c.msg+(c.pushed?' · ☁️ pushed':'')+'</small>';rp.appendChild(d)});
 $('hbc').textContent=S.commits.length?S.commits.length+' commit'+(S.commits.length>1?'s':''):'';
 chips()}
const adv=i=>{if(S.step===i){S.step++;coach();chips()}};
async function run(raw){E(raw);if($('tin'))$('tin').value='';
 const t=raw.trim().split(/\s+/);
 if(t[0]==='help')return P('init · status · add . · add FILE · commit -m "msg" · log --oneline · push · touch FILE · diff · clear','or');
 if(t[0]==='clear')return $('tout').innerHTML='';
 if(t[0]==='touch'){const f=t[1]||'notes.txt';S.wd[f]='mod';draw();pulse('wd');P('(created '+f+' — a new untracked file appeared in the working directory)','dim');return}
 if(t[0]!=='git')return P(t[0]+': not found — commands start with "git" (or: help / touch FILE)','err');
 const c=t[1];
 if(c==='init'){if(S.init)return P('Reinitialized existing Git repository.','dim');
  S.init=true;P('Initialized empty Git repository in ~/project/.git/','ok');
  P('(the .git folder IS the repository — delete it and the history is gone)','dim');draw();adv(0);return}
 if(!S.init)return P('fatal: not a git repository — run git init first.','err');
 if(c==='status'){const wk=Object.keys(S.wd),sk=Object.keys(S.sg);
  P('On branch main','dim');
  if(sk.length){P('\nChanges to be committed:  (green — in the frame)','ok');sk.forEach(f=>P('        new file:   '+f,'ok'))}
  if(wk.length){P('\nChanges not staged / untracked:  (red — not in the frame)','err');wk.forEach(f=>P('        '+f,'err'))}
  if(!wk.length&&!sk.length)P('nothing to commit, working tree clean ✨','ok');
  if(S.step===1)adv(1);return}
 if(c==='add'){const tgt=t[2];
  if(!tgt)return P('Nothing specified. Try: git add .  (everything) or git add FILE','err');
  const files=tgt==='.'?Object.keys(S.wd):(S.wd[tgt]?[tgt]:[]);
  if(!files.length)return P('fatal: pathspec "'+tgt+'" did not match any files','err');
  files.forEach(f=>{S.sg[f]=1;delete S.wd[f]});draw();pulse('sg');
  P('(staged: '+files.join(', ')+' — they are in the frame now)','dim');
  if(tgt==='.')adv(2);return}
 if(c==='commit'){const sk=Object.keys(S.sg);
  if(!sk.length)return P('nothing to commit — stage something first with git add','err');
  const mi=raw.indexOf('-m');const msg=mi>-1?raw.slice(mi+2).trim().replace(/^["']|["']$/g,''):'update';
  const id=sha7();S.commits.push({id,msg,files:sk,pushed:false});S.sg={};draw();pulse('rp');
  P('[main '+id+'] '+msg,'ok');P(' '+sk.length+' file'+(sk.length>1?'s':'')+' changed — snapshot saved forever 📸','dim');
  adv(3);return}
 if(c==='log'){if(!S.commits.length)return P('fatal: no commits yet','err');
  [...S.commits].reverse().forEach((x,i)=>P(x.id+' '+(i===0?'(HEAD -> main'+(x.pushed?', origin/main':'')+') ':'')+x.msg,i===0?'warn':'dim'));
  adv(4);return}
 if(c==='push'){if(!S.commits.length)return P('error: nothing to push — commit first','err');
  P('Enumerating objects... done.','dim');await wait(320);
  P('Writing objects: 100%','dim');await wait(300);
  P('To github.com:you/project.git','dim');
  P(' * [new branch]      main -> main ☁️','ok');
  P('(your commits now live on GitHub too — backed up and visible to the team)','dim');
  S.commits.forEach(x=>x.pushed=true);draw();pulse('rp');adv(5);return}
 if(c==='diff')return P(S.wd['app.js']?'--- a/app.js\n+++ b/app.js\n@@ -1,3 +1,4 @@\n+console.log("hello");':'(no unstaged changes)','dim');
 P("git: '"+c+"' is not in this simulator. Try: help",'err')}
document.addEventListener('keydown',e=>{if(e.target.id==='tin'&&e.key==='Enter'&&e.target.value.trim())run(e.target.value)});
P('📸 Simulated repo. Two edited files are waiting. Nothing can break.','or');P('');
draw();coach();

/* ================= GRAPH SIM (slide 5) ================= */
const G={stage:0};
function drawGraph(){
 /* commits: main c1 c2 (+cM merge), feature f1 f2 */
 const st=G.stage;
 const W=560,H=250,y1=170,y2=80;
 const xs=[70,170,290,410,500];
 let s='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">';
 const line=(x1,ya,x2,yb,col,dash)=>'<path d="M'+x1+' '+ya+' C '+(x1+45)+' '+ya+' '+(x2-45)+' '+yb+' '+x2+' '+yb+'" stroke="'+col+'" stroke-width="3" fill="none"'+(dash?' stroke-dasharray="6 5" opacity=".55"':'')+'/>';
 const dot=(x,y,col,lbl,sub)=>'<circle cx="'+x+'" cy="'+y+'" r="11" fill="'+col+'" stroke="#161311" stroke-width="3"/>'+(lbl?'<text x="'+x+'" y="'+(y+30)+'" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#b3a89f">'+lbl+'</text>':'')+(sub?'<text x="'+x+'" y="'+(y+43)+'" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#7a7066">'+sub+'</text>':'');
 const tag=(x,y,txt,col)=>'<rect x="'+(x-34)+'" y="'+(y-38)+'" width="68" height="20" rx="6" fill="'+col+'" stroke="#161311" stroke-width="2.5"/><text x="'+x+'" y="'+(y-24)+'" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="700" fill="#161311">'+txt+'</text>';
 /* main line */
 s+=line(xs[0],y1,xs[1],y1,'#F05133');
 if(st>=5)s+=line(xs[1],y1,xs[4],y1,'#F05133');
 /* branch lines */
 if(st>=1)s+=line(xs[1],y1,xs[2],y2,'#1B6CA8',st===1);
 if(st>=2&&st<6)s+=''; 
 if(st>=3)s+=line(xs[2],y2,xs[3],y2,'#1B6CA8');
 if(st>=5)s+=line(xs[3],y2,xs[4],y1,'#2E933C');
 /* dots */
 s+=dot(xs[0],y1,'#F05133','a1b2c3','init');
 s+=dot(xs[1],y1,'#F05133','d4e5f6','readme');
 if(st>=2)s+=dot(xs[2],y2,'#1B6CA8','07c001','login form');
 if(st>=3)s+=dot(xs[3],y2,'#1B6CA8','8badf0','wire it up');
 if(st>=5)s+=dot(xs[4],y1,'#2E933C','feed42','merge!');
 /* labels */
 const mainX=st>=5?xs[4]:xs[1];
 s+=tag(mainX,y1,'main','#F5B700');
 if(st>=1&&st<6){const fx=st>=3?xs[3]:(st>=2?xs[2]:xs[1]);const fy=st>=2?y2:y1;s+=tag(fx,fy-(st>=2?0:44),'feature','#7ec3f7')}
 /* HEAD marker */
 const onFeature=(st>=1&&st<4);
 const hx=onFeature?(st>=3?xs[3]:(st>=2?xs[2]:xs[1])):(st>=5?xs[4]:xs[1]);
 const hy=onFeature&&st>=2?y2:(onFeature?y1:y1);
 s+='<text x="'+hx+'" y="'+(hy-46-((st<2&&onFeature)?44:0))+'" text-anchor="middle" font-family="JetBrains Mono" font-size="10" font-weight="700" fill="#ffd166">▼ HEAD</text>';
 s+='</svg>';
 $('graph').innerHTML=s}
const GM=[
 'main has two commits. HEAD is the "you are here" marker. Start pressing buttons →',
 '<b>Branched.</b> feature points at the same commit as main — creating a branch copies NOTHING. It is just a label. HEAD moved to feature.',
 '<b>Committed on feature.</b> The universes split — main is untouched at d4e5f6, feature moved ahead.',
 '<b>Two commits ahead.</b> This is where you would experiment for days, safely. Main still pristine.',
 '<b>Back on main.</b> Files instantly look like main again — the branch work is safe, just parked on the feature label.',
 '<b>Merged!</b> A merge commit joins both histories. Everything from feature is now in main.',
 '<b>Branch deleted.</b> Only the label is gone — the commits live on in main forever. This is the full lifecycle: branch → work → merge → delete.'];
function gstep(n){G.stage=n;drawGraph();$('gmsg').innerHTML=GM[n];
 $('headtag').textContent=(n>=1&&n<4)?'feature':'main';
 $('headtag').style.background=(n>=1&&n<4)?'#7ec3f7':'var(--yellow)';
 for(let i=1;i<=6;i++)$('g'+i).disabled=(i!==n+1);
 if(n===6){$('g6').disabled=true;$('gmsg').innerHTML+=' <b>Hit Next ↓</b>'}}
for(let i=1;i<=6;i++)$('g'+i).onclick=()=>gstep(i);
gstep(0);$('g1').disabled=false;

/* ================= PR SIM (slide 6) ================= */
let prs=0;
const PRT=['Step 2 of 5 — open the PR','Step 3 of 5 — review and CI running…','Step 4 of 5 — ready: press merge','Step 5 of 5 — teammates pull','✓ Merged & synced. This loop = professional software'];
$('prbtn').onclick=()=>{if(prs>=4)return;prs++;
 $('p'+prs).classList.add('on');
 $('mergetxt').textContent=PRT[prs-1];
 if(prs===4){$('mergebar').classList.add('ok');$('mergetxt').textContent=PRT[4];$('prbtn').textContent='✓ pull request merged';}};

/* ================= CHEAT (slide 8) ================= */
const CHEAT=[
 ['git init','birth of a repo'],
 ['git clone URL','copy a repo from GitHub'],
 ['git status','where am I? run constantly'],
 ['git add .','stage everything changed'],
 ['git commit -m "msg"','take the snapshot'],
 ['git log --oneline --graph','the map of history'],
 ['git switch -c feature','new branch + move to it'],
 ['git switch main','jump between branches'],
 ['git merge feature','bring a branch into this one'],
 ['git push -u origin main','send commits to GitHub'],
 ['git pull','get the teams commits'],
 ['git diff','what exactly changed?'],
 ['git stash','shelve half-done work'],
 ['git restore FILE','discard edits to a file'],
 ['git revert SHA','safely undo a public commit']];
CHEAT.forEach(([c,w])=>{const b=document.createElement('button');b.className='cc';
 b.innerHTML='<div><code></code><small>'+w+'</small></div><span class="cp">COPY</span>';
 b.querySelector('code').textContent=c;
 b.onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(c);b.classList.add('copied');b.querySelector('.cp').textContent='✓';toast('Copied — '+c);setTimeout(()=>{b.classList.remove('copied');b.querySelector('.cp').textContent='COPY'},1500)};
 $('cheat').appendChild(b)});

};

DeckEngine.init(SLIDES);
