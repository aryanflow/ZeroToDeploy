const SLIDES=[

/* 0 — cover */
{label:'START HERE',color:'var(--red)',hint:'<b>Click Next</b> — or use your arrow keys. 10 slides, ~15 minutes.',html:`
 <div class="inner">
  <h1 class="mega">Docker,<br>learned by<br><span class="hl">clicking.</span></h1>
  <p class="lede" style="margin-top:26px">No scrolling. No wall of text. One idea per slide, and when it's time to try — a <b>real simulated terminal</b> opens right here. By the last slide you'll run, build, compose, debug and ship containers. <b>Nothing can break your machine.</b></p>
  <div class="heroart">
   <div class="hbox" style="background:var(--red);animation-delay:.05s">RUN</div>
   <div class="hbox" style="background:var(--blue);animation-delay:.15s">BUILD</div>
   <div class="hbox" style="background:var(--green);animation-delay:.25s">COMPOSE</div>
   <div class="hbox" style="background:var(--violet);animation-delay:.35s">DEBUG</div>
   <div class="hbox" style="background:var(--sea);animation-delay:.45s">SHIP</div>
  </div>
 </div>`},

/* 1 — what is docker */
{label:'CH 01 · THE IDEA',color:'var(--blue)',hint:'Skim the three crates. That is the entire mental model.',html:`
 <div class="inner">
  <h2 class="big">Docker = your app in a <em style="background:var(--blue)">sealed box</em></h2>
  <p class="lede">The box contains your code <b>plus everything it needs</b> — runtime, libraries, settings. So it runs <b>identically</b> on your laptop, a teammate's, or a server. That kills "works on my machine" forever. Only three words matter:</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--blue)">THE RECIPE</span><div class="bigico">📦</div><h3>Image</h3><div class="metaphor">frozen · read-only · shareable</div><p>A <b>snapshot</b> of app + environment. You never run it directly — you make containers <b>from</b> it. Like a class in code.</p></div>
   <div class="crate"><span class="tag" style="background:var(--red)">THE DISH</span><div class="bigico">🚢</div><h3>Container</h3><div class="metaphor">live · isolated · disposable</div><p>A <b>running copy</b> of an image with its own thin writable layer. Start ten from one image. Delete freely — <b>the image is untouched.</b></p></div>
   <div class="crate"><span class="tag" style="background:var(--violet)">THE SHELF</span><div class="bigico">🏛️</div><h3>Registry</h3><div class="metaphor">remote · shared · Docker Hub</div><p>GitHub, but for images. <b>pull</b> brings one down, <b>push</b> ships yours up. This is how a whole team shares one environment.</p></div>
  </div>
  <div class="gitstrip">
   <span class="t">You know git → you already know this</span>
   <span><b>pull</b><i>≈</i>clone</span><span><b>push</b><i>≈</i>push</span><span><b>image layers</b><i>≈</i>commits</span><span><b>Dockerfile</b><i>≈</i>commit history</span><span><b>run</b><i>≈</i>checkout</span>
  </div>
 </div>`},

/* 2 — the flow */
{label:'CH 01 · THE FLOW',color:'var(--blue)',hint:'One arrow to the next slide, where you type this yourself.',html:`
 <div class="inner">
  <h2 class="big">Everything moves <em style="background:var(--red)">left to right</em></h2>
  <p class="lede">Every Docker workflow ever is this picture. An image lives on a registry, you pull it to your machine, you run containers from it. That's it — the rest is detail.</p>
  <div class="flow">
   <div class="fbox"><div class="b">🏛️</div><b>Registry</b><small>hub.docker.com</small></div>
   <div class="farr">docker pull<b>→</b></div>
   <div class="fbox"><div class="b">📦</div><b>Image</b><small>on your machine</small></div>
   <div class="farr">docker run<b>→</b></div>
   <div class="fbox"><div class="b">🚢</div><b>Container</b><small>alive · doing work</small></div>
   <div class="farr">logs / exec<b>→</b></div>
   <div class="fbox"><div class="b">🔦</div><b>You</b><small>observing it</small></div>
  </div>
  <div class="coach" style="border-left-color:var(--blue);margin-top:36px"><b>Next slide:</b> a live terminal. You'll pull and run your first containers — guided, step by step.</div>
 </div>`},

/* 3 — playground 1 */
{label:'CH 02 · PLAYGROUND',color:'var(--yellow)',hint:'Complete the 6 steps in the yellow coach box, then hit Next.',html:`
 <div class="inner">
  <h2 class="big">Type. <em style="background:var(--green)">Watch it live.</em></h2>
  <div class="playwrap">
   <div class="term">
    <div class="bar"><i></i><i></i><i></i><span>dockyard — simulated engine</span></div>
    <div class="tout" id="tout"></div>
    <div class="tinrow"><span class="pr">$</span><input id="tin" placeholder="docker run hello-world" autocomplete="off" spellcheck="false" aria-label="terminal"></div>
    <div class="chips" id="chips"></div>
   </div>
   <div class="state">
    <h4>🚢 Containers <em id="hbc"></em></h4>
    <div class="zone" id="dz"><div class="none">None yet — run one.</div></div>
    <h4>📦 Images on this machine</h4>
    <div class="shelf" id="shelf"><span class="none" style="font-family:var(--mono);font-size:12px;color:var(--faint)">Empty — run or pull fetches them.</span></div>
   </div>
  </div>
  <div class="coach" id="coach" style="border-left-color:var(--yellow)"></div>
 </div>`},

/* 4 — dockerfile concept */
{label:'CH 03 · DOCKERFILE',color:'var(--red)',hint:'Read the 6 lines — each becomes one layer. Then Next to build it.',html:`
 <div class="inner">
  <h2 class="big">Where images come from: <em style="background:var(--red)">the Dockerfile</em></h2>
  <p class="lede">A plain text file, six-ish lines, sitting in your repo. Each instruction bakes one <b>layer</b> — an immutable slice, exactly like a git commit. Run <code style="background:var(--ink);color:#ffd166;padding:2px 8px;border-radius:6px;font-size:13px">docker build</code> and the recipe becomes an image.</p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--red)">LINE 1</span><h3 style="font-size:16px">FROM</h3><p>Start from a <b>base image</b> — a tiny Linux with your runtime pre-installed. Every image stands on another one's shoulders.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">MIDDLE</span><h3 style="font-size:16px">COPY + RUN</h3><p>Copy files in, run install commands. <b>Each line = one cached layer.</b> Order them from least-changing to most-changing.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">LAST</span><h3 style="font-size:16px">CMD</h3><p>Not executed at build time! Just <b>records what to launch</b> when a container starts from this image.</p></div>
  </div>
  <div class="coach" style="border-left-color:var(--red);margin-top:26px"><b>Next slide:</b> press build and watch each line drop a layer — then build <i>again</i> and meet the cache, Docker's best trick.</div>
 </div>`},

/* 5 — build playground */
{label:'CH 03 · BUILD IT',color:'var(--red)',hint:'Press build. Then press it AGAIN — watch the green CACHED badges.',html:`
 <div class="inner">
  <h2 class="big">Press build. <em style="background:var(--blue)">Twice.</em></h2>
  <div class="buildwrap">
   <div class="dfile">
    <div class="bar" style="display:flex;align-items:center;gap:7px;padding:11px 15px;background:#1b2732;border-bottom:2px solid #000"><i style="width:11px;height:11px;border-radius:50%;background:#ff5f57"></i><i style="width:11px;height:11px;border-radius:50%;background:#febc2e"></i><i style="width:11px;height:11px;border-radius:50%;background:#28c840"></i><span style="margin-left:8px;font-family:var(--mono);font-size:11px;color:#7d8ea0">Dockerfile</span></div>
    <div id="dlines"></div>
    <div class="dnote" id="dnote">Hover any line for its story. Press <b>▸ build</b> to run the recipe top-to-bottom.</div>
   </div>
   <div class="bviz">
    <h4>Image layers — newest on top, like commits</h4>
    <div class="lstack" id="lstack"></div>
    <div class="bgo">
     <button class="act" id="buildbtn">▸ docker build -t myapp .</button>
     <div class="bmsg" id="bmsg"></div>
    </div>
   </div>
  </div>
 </div>`},

/* 6 — compose concept + playground */
{label:'CH 04 · COMPOSE',color:'var(--green)',hint:'Press compose up. Watch the boot order: db → healthy → web.',html:`
 <div class="inner">
  <h2 class="big">Real apps are a <em style="background:var(--green)">fleet</em> — Compose runs the fleet</h2>
  <p class="lede">Your app <b>plus</b> a database <b>plus</b> a cache = three containers with ports, volumes and startup order. Typing all that daily is misery. <b>compose.yaml declares it once</b>; one command raises everything, in order, on a private network with built-in DNS — inside <code style="background:var(--ink);color:#ffd166;padding:1px 7px;border-radius:5px;font-size:12px">web</code>, the database is just the hostname <b>db</b>.</p>
  <div class="compwrap">
   <div class="yaml" id="yaml"><span class="blk" data-s="db"><span class="k">services:</span>
  <span class="k">db:</span>
    <span class="k">image:</span> <span class="v">postgres:16</span>
    <span class="k">environment:</span> <span class="v">{ POSTGRES_PASSWORD: dev }</span>
    <span class="k">volumes:</span> <span class="v">[dbdata:/var/lib/postgresql/data]</span>
    <span class="k">healthcheck:</span> <span class="v">{ test: ["CMD","pg_isready"] }</span></span><span class="blk" data-s="web">  <span class="k">web:</span>
    <span class="k">build:</span> <span class="v">.</span>            <span class="cm"># the Dockerfile you just built</span>
    <span class="k">ports:</span> <span class="v">["8080:3000"]</span>
    <span class="k">depends_on:</span>
      <span class="k">db:</span> <span class="v">{ condition: service_healthy }</span></span><span class="blk" data-s="vol"><span class="k">volumes:</span>
  <span class="k">dbdata:</span>        <span class="cm"># data OUTLIVES containers</span></span></div>
   <div class="cviz">
    <h4 style="font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--faint)">The fleet</h4>
    <div class="ring"><span class="nl">private network · DNS included</span>
     <div class="svc" id="s-db"><div class="bx">🐘<span class="hb" id="h-db">…</span></div><b>db</b><small>postgres:16</small></div>
     <div class="wire" id="wire"></div>
     <div class="svc" id="s-web"><div class="bx">🚢<span class="hb" id="h-web">…</span></div><b>web</b><small>:8080 → :3000</small></div>
    </div>
    <div class="clog" id="clog">Nothing running yet. One command starts everything, in the right order.</div>
    <div class="bgo"><button class="act" id="upbtn">▸ docker compose up</button><button class="act alt" id="downbtn">compose down</button></div>
   </div>
  </div>
 </div>`},

/* 7 — day two ops */
{label:'CH 05 · DAY TWO',color:'var(--violet)',hint:'The three moves every engineer makes daily — in this order.',html:`
 <div class="inner ops">
  <h2 class="big">Something's weird? <em style="background:var(--violet)">Three moves.</em></h2>
  <p class="lede">This is 95% of real-world debugging and shipping. Always in this order.</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--violet)">MOVE 1</span><div class="bigico">📜</div><h3>Read the logs</h3><p>Containers write everything to stdout. <b>Always look here first.</b> Works even after the container died.</p><pre>docker logs web
docker logs -f web    <em># live</em>
docker logs --tail 50 web</pre></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">MOVE 2</span><div class="bigico">🔦</div><h3>Step inside</h3><p>Open a shell <b>inside</b> the running container — its files, its network, its world. Look around, leave. It keeps running.</p><pre>docker exec -it web sh
<em># inside:</em> ls · env · ping db
exit</pre></div>
   <div class="crate"><span class="tag" style="background:var(--sea)">MOVE 3</span><div class="bigico">🚀</div><h3>Ship it</h3><p>Deploying <b>is</b> push + pull. Any server pulls your exact bytes and runs them. Same image, dev to prod.</p><pre>docker build -t me/app:1.2 .
docker push me/app:1.2
<em># on the server:</em>
docker run -d -p 80:3000 me/app:1.2</pre></div>
  </div>
 </div>`},

/* 8 — cheat */
{label:'CH 06 · THE 15',color:'var(--sea)',hint:'Click any command to copy it. This grid is the whole job.',html:`
 <div class="inner">
  <h2 class="big">Hundreds exist. <em style="background:var(--sea)">Fifteen matter.</em></h2>
  <p class="lede">Same as git. Click to copy — this grid is your daily driver.</p>
  <div class="cheat" id="cheat"></div>
 </div>`},

/* 9 — finish */
{label:'DEPARTURE',color:'var(--green)',hint:'That was the whole model. Go run it for real.',html:`
 <div class="inner">
  <h1 class="mega" style="font-size:clamp(34px,6vw,72px)">You know<br><span class="hl" style="background:var(--green)">Docker now.</span></h1>
  <p class="lede" style="margin-top:24px">Images are recipes, containers are dishes, registries are the shelf. Dockerfiles bake layers, the cache skips unchanged ones, Compose runs the fleet, logs → exec → ship is the daily loop. <b>That's the entire working model.</b></p>
  <div class="grid3" style="margin-top:30px">
   <div class="crate"><span class="tag" style="background:var(--green)">DO NOW</span><h3 style="font-size:15px">Install &amp; verify</h3><p>Get Docker Desktop, then run <b>docker run hello-world</b> for real. You know exactly what will happen — pull, create, start, exit.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THIS WEEK</span><h3 style="font-size:15px">Containerise one thing</h3><p>Take any small project, write the 6-line Dockerfile from slide 6, build it, run it, break it, read logs, exec in.</p></div>
   <div class="crate"><span class="tag" style="background:var(--red)">REPLAY</span><h3 style="font-size:15px">Come back anytime</h3><p>The playgrounds reset on reload. Muscle memory comes from the loop: <b>run → ps → logs → stop → rm.</b></p></div>
  </div>
 </div>`}
];

window.onDeckReady = function () {
const $ = DeckEngine.$;
const wait = DeckEngine.wait;

/* ================= TERMINAL SIM (slide 3) ================= */
const CAT={'hello-world':{sz:'13kB'},'nginx':{sz:'188MB',port:80},'redis':{sz:'117MB',port:6379},'alpine':{sz:'8MB'},'postgres':{sz:'432MB',port:5432}};
const S={img:{},ctr:{},step:0};
const sha=()=>[...Array(12)].map(()=>'0123456789abcdef'[Math.random()*16|0]).join('');
function P(t,c){const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;$('tout').appendChild(d);$('tout').scrollTop=1e9;return d}
function E(c){const d=document.createElement('div');d.innerHTML='<span class="c-dim">$</span> <span class="c-cmd"></span>';d.lastElementChild.textContent=c;$('tout').appendChild(d);$('tout').scrollTop=1e9}
const STEPS=[
 {c:'docker run hello-world',t:'<b>Step 1 / 6</b> — your first container: <code>docker run hello-world</code>. One command = pull + create + start.'},
 {c:'docker run -d --name web -p 8080:80 nginx',t:'<b>Step 2 / 6</b> — a real web server: <code>docker run -d --name web -p 8080:80 nginx</code>. <code>-d</code> background · <code>-p</code> your port 8080 → its 80.'},
 {c:'docker ps -a',t:'<b>Step 3 / 6</b> — see everything: <code>docker ps -a</code>. Without <code>-a</code> you miss stopped containers — they still exist!'},
 {c:'docker logs web',t:'<b>Step 4 / 6</b> — what did it say? <code>docker logs web</code>. Always the first debugging move.'},
 {c:'docker stop web',t:'<b>Step 5 / 6</b> — graceful shutdown: <code>docker stop web</code>. Stopped, not deleted — files remain.'},
 {c:'docker rm web',t:'<b>Step 6 / 6</b> — clear the berth: <code>docker rm web</code>. Container gone forever; the image stays.'}];
function coach(){const el=$('coach');if(!el)return;
 el.innerHTML=S.step>=STEPS.length
  ?'<b>All 6 done 🎉</b> — that loop (run → ps → logs → stop → rm) is daily Docker. Free play: <code>docker run -d --name cache redis</code>, <code>docker exec -it cache sh</code>… then hit <b>Next</b>.'
  :STEPS[S.step].t}
function chips(){const b=$('chips');if(!b)return;b.innerHTML='';
 const L=[];if(S.step<STEPS.length)L.push([STEPS[S.step].c,1]);
 Object.keys(S.ctr).filter(k=>S.ctr[k].up).slice(0,1).forEach(k=>L.push(['docker exec -it '+k+' sh',0]));
 L.push(['docker images',0],['help',0]);
 L.forEach(([c,n])=>{const x=document.createElement('button');x.className='chip'+(n?' go':'');x.textContent=c;x.onclick=()=>run(c);b.appendChild(x)})}
function draw(){const dz=$('dz');if(!dz)return;const ks=Object.keys(S.ctr);
 dz.innerHTML=ks.length?'':'<div class="none">None yet — run one.</div>';
 ks.forEach(k=>{const c=S.ctr[k],d=document.createElement('div');d.className='ctr '+(c.up?'up':'down');
  d.innerHTML='<span class="led"></span><div><b></b><small></small></div>'+(c.port?'<span class="prt">:'+c.port+'</span>':'');
  d.querySelector('b').textContent=k;d.querySelector('small').textContent=c.img+' · '+(c.up?'running':'exited');dz.appendChild(d)});
 $('hbc').textContent=ks.length?ks.filter(k=>S.ctr[k].up).length+' running / '+ks.length:'';
 const sh=$('shelf'),ik=Object.keys(S.img);
 sh.innerHTML=ik.length?'':'<span class="none" style="font-family:var(--mono);font-size:12px;color:var(--faint)">Empty — run or pull fetches them.</span>';
 ik.forEach(k=>{const s=document.createElement('span');s.className='imgtag';s.textContent='📦 '+k+' · '+CAT[k].sz;sh.appendChild(s)});
 chips()}
async function pull(img){if(S.img[img])return 1;
 if(!CAT[img]){P('pull access denied for '+img+' — stocked: '+Object.keys(CAT).join(', '),'err');return 0}
 P("Unable to find image '"+img+":latest' locally",'dim');
 for(let i=0,n=2+(Math.random()*3|0);i<n;i++){const l=P(sha()+': Downloading…','cy');await wait(200);l.textContent=l.textContent.replace('Downloading…','Pull complete');l.className='c-ok'}
 P('Status: Downloaded newer image for '+img+':latest','ok');S.img[img]=1;draw();return 1}
const adv=i=>{if(S.step===i){S.step++;coach();chips()}};
async function run(raw){E(raw);if($('tin'))$('tin').value='';
 const t=raw.trim().split(/\s+/);
 if(t[0]==='help')return P('run [-d] [--name N] [-p H:C] IMG · ps [-a] · logs N · stop/start N · rm N · images · pull IMG · exec -it N sh · clear','cy');
 if(t[0]==='clear')return $('tout').innerHTML='';
 if(t[0]!=='docker')return P(t[0]+': not found — commands start with "docker" (or: help)','err');
 const c=t[1];
 if(c==='run'){let d=0,name=null,port=null,img=null;
  for(let i=2;i<t.length;i++){const x=t[i];
   if(x==='-d')d=1;else if(x==='--name')name=t[++i];else if(x==='-p')port=(t[++i]||'').split(':')[0];
   else if(x==='-it'||x==='--rm'){}else if(!x.startsWith('-')){img=x;break}}
  if(!img)return P('run needs an image. Try: docker run hello-world','err');
  img=img.split(':')[0];
  if(name&&S.ctr[name])return P('Conflict: name "'+name+'" in use. docker rm '+name+' first.','err');
  if(!(await pull(img)))return;
  name=name||'eager_'+sha().slice(0,4);
  S.ctr[name]={img,up:true,port,logs:[]};draw();
  if(img==='hello-world'){await wait(240);
   P('\nHello from Docker! 🎉','ok');P('Docker pulled the image, created a container, ran it,\nstreamed this text — and the container exited.','dim');
   S.ctr[name].up=false;S.ctr[name].logs.push('Hello from Docker!');draw();adv(0);return}
  S.ctr[name].logs.push(img+' up'+(port?' — mapped to localhost:'+port:''));
  P(sha()+sha(),'dim');
  if(!d)P('(tip: -d keeps your terminal free — added it for you in spirit)','warn');
  if(port)P('→ live at localhost:'+port+' 🌐','ok');
  if(name==='web')adv(1);return}
 if(c==='ps'){const all=t.includes('-a'),ks=Object.keys(S.ctr).filter(k=>all||S.ctr[k].up);
  P('CONTAINER ID   IMAGE      STATUS        NAMES','cy');
  ks.length?ks.forEach(k=>{const x=S.ctr[k];P(sha()+'   '+x.img.padEnd(10)+' '+(x.up?'Up 2 min     ':'Exited (0)   ')+' '+k)}):P(all?'(none at all)':'(none running — try ps -a)','dim');
  if(all)adv(2);return}
 if(c==='logs'){const x=S.ctr[t[2]];if(!x)return P('No such container: '+(t[2]||'?'),'err');
  x.logs.length?x.logs.forEach(l=>P(l,'dim')):P('(no output yet)','dim');if(t[2]==='web')adv(3);return}
 if(c==='stop'){const x=S.ctr[t[2]];if(!x)return P('No such container: '+(t[2]||'?'),'err');
  x.up=false;P(t[2]);draw();if(t[2]==='web')adv(4);return}
 if(c==='start'){const x=S.ctr[t[2]];if(!x)return P('No such container: '+(t[2]||'?'),'err');x.up=true;P(t[2]);draw();return}
 if(c==='rm'){const x=S.ctr[t[2]];if(!x)return P('No such container: '+(t[2]||'?'),'err');
  if(x.up)return P('Cannot remove a running container — docker stop '+t[2]+' first.','err');
  delete S.ctr[t[2]];P(t[2]);draw();if(t[2]==='web')adv(5);return}
 if(c==='images'){P('REPOSITORY     TAG      SIZE','cy');const ks=Object.keys(S.img);
  ks.length?ks.forEach(k=>P(k.padEnd(14)+' latest   '+CAT[k].sz)):P('(none yet)','dim');return}
 if(c==='pull')return t[2]?void await pull(t[2].split(':')[0]):P('pull what? e.g. docker pull nginx','err');
 if(c==='exec'){const n=t.filter(x=>!x.startsWith('-')).slice(2)[0],x=S.ctr[n];
  if(!x)return P('No such container: '+(n||'?'),'err');
  if(!x.up)return P(n+' is not running — exec needs a live container.','err');
  P('# you are INSIDE '+n+' now — its own files, its own network','ok');
  P('/ # ls\nbin  etc  usr  var          (its filesystem, not yours)','dim');
  P('/ # exit                     (you left; it keeps running)','dim');return}
 P("docker: '"+c+"' — not in this simulator. Try: help",'err')}
document.addEventListener('keydown',e=>{if(e.target.id==='tin'&&e.key==='Enter'&&e.target.value.trim())run(e.target.value)});
P('⚓ Simulated. Type freely — nothing can break.','cy');P('');
draw();coach();

/* ================= BUILD SIM (slide 5) ================= */
const DF=[
 ['FROM','node:20-alpine','Start from a base image — tiny Linux + Node pre-installed. Layer 1.','base image','#1B6CA8'],
 ['WORKDIR','/app','Set the working folder inside the image. All later lines run here.','workdir','#6fd3ff'],
 ['COPY','package.json .','Copy ONLY the dependency list first — deliberately. You will see why on build #2.','deps manifest','#6D4AFF'],
 ['RUN','install dependencies','Execute and freeze the result as a layer. 40 MB of packages live here.','packages · 40MB','#F5B700'],
 ['COPY','. .','NOW copy your source code — the file that changes every day gets its own layer.','your code · 2MB','#E4572E'],
 ['CMD','["node","server.js"]','Not run at build! Just records what a container should launch at start.','start command','#2E933C']];
const dl=$('dlines');
DF.forEach((d,i)=>{const r=document.createElement('div');r.className='dline';r.id='dl'+i;
 r.innerHTML='<span class="no">'+(i+1)+'</span><span><span class="kw">'+d[0]+'</span> <span class="rest"></span></span>';
 r.querySelector('.rest').textContent=d[1];
 r.onmouseenter=()=>{if(!building)$('dnote').innerHTML='<b>'+d[0]+'</b> — '+d[2]};dl.appendChild(r)});
let built=0,building=0;
$('buildbtn').onclick=async()=>{if(building)return;building=1;
 const again=built;$('lstack').innerHTML='';$('bmsg').textContent='';
 document.querySelectorAll('.dline').forEach(x=>x.className='dline');
 for(let i=0;i<DF.length;i++){const d=DF[i],r=$('dl'+i);
  r.classList.add('hot');$('dnote').innerHTML='<b>Step '+(i+1)+'/6 · '+d[0]+'</b> — '+d[2];
  const cached=again&&i<4;await wait(cached?240:760);
  const b=document.createElement('div');b.className='blay';
  b.style.cssText='background:'+d[4]+'22;border-color:var(--ink)';
  b.innerHTML='<span>'+d[0]+' · '+d[3]+'</span><small>'+(cached?'':'sha '+sha().slice(0,7))+'</small>'+(cached?'<span class="cb">CACHED</span>':'');
  $('lstack').appendChild(b);
  r.classList.remove('hot');r.classList.add('done');if(cached)r.classList.add('cached')}
 $('bmsg').innerHTML=again
  ?'<b>0.9s ⚡</b> Layers 1–4 straight from cache — only your code re-copied. THIS is why line order matters.'
  :'<b>Built in 24s.</b> 6 instructions → 6 layers → image <b>myapp</b>. Now press again — pretend you just edited server.js…';
 $('dnote').innerHTML=again
  ?'<b>The cache rule:</b> nothing above the first changed line ever rebuilds. Volatile stuff goes at the bottom.'
  :'<b>Done.</b> Build a second time to watch Docker skip unchanged layers.';
 $('buildbtn').textContent=again?'▸ docker build -t myapp .':'▸ build again (you edited server.js)';
 built=!built;building=0};

/* ================= COMPOSE SIM (slide 6) ================= */
const lit=s=>document.querySelectorAll('.yaml .blk').forEach(b=>b.classList.toggle('lit',b.dataset.s===s));
let cU=0,cB=0;
function cl(t,ok){const g=$('clog'),d=document.createElement('div');if(ok)d.className='ok';d.textContent=t;g.appendChild(d);while(g.children.length>4)g.removeChild(g.firstChild)}
$('upbtn').onclick=async()=>{if(cB||cU)return;cB=1;$('clog').innerHTML='';
 lit('db');cl('⠿ Network app_default   Created');await wait(550);
 cl('⠿ Container db          Started');$('s-db').classList.add('on');await wait(850);
 cl('  db: waiting for healthcheck…');await wait(950);
 $('s-db').classList.add('ok');$('h-db').textContent='✓';cl('  db is healthy ✓',1);
 lit('web');await wait(650);
 $('s-web').classList.add('on','ok');$('h-web').textContent='✓';$('wire').classList.add('on');
 cl('⠿ Container web         Started — localhost:8080 live',1);lit(null);cU=1;cB=0};
$('downbtn').onclick=()=>{if(cB)return;cU=0;
 ['s-db','s-web'].forEach(i=>$(i).classList.remove('on','ok'));
 $('h-db').textContent='…';$('h-web').textContent='…';$('wire').classList.remove('on');
 $('clog').innerHTML='';lit('vol');
 cl('⠿ Containers + network removed. The volume dbdata SURVIVES — your data is safe.');
 setTimeout(()=>lit(null),2500)};

/* ================= CHEAT (slide 8) ================= */
const CHEAT=[
 ['docker run -d --name x -p 80:80 IMG','start a container — the big one'],
 ['docker ps -a','list all, dead or alive'],
 ['docker logs -f NAME','watch what it says'],
 ['docker exec -it NAME sh','step inside a live one'],
 ['docker stop NAME','graceful shutdown'],
 ['docker start NAME','wake a stopped one'],
 ['docker rm NAME','delete a container'],
 ['docker images','list local images'],
 ['docker pull IMG','fetch from registry'],
 ['docker push me/IMG:tag','publish yours'],
 ['docker build -t me/app .','Dockerfile → image'],
 ['docker rmi IMG','delete an image'],
 ['docker compose up -d','raise the fleet'],
 ['docker compose down','lower the fleet'],
 ['docker system prune','sweep the dead stuff']];
CHEAT.forEach(([c,w])=>{const b=document.createElement('button');b.className='cc';
 b.innerHTML='<div><code></code><small>'+w+'</small></div><span class="cp">COPY</span>';
 b.querySelector('code').textContent=c;
 b.onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(c);b.classList.add('copied');b.querySelector('.cp').textContent='✓';toast('Copied — '+c);setTimeout(()=>{b.classList.remove('copied');b.querySelector('.cp').textContent='COPY'},1500)};
 $('cheat').appendChild(b)});

};

DeckEngine.init(SLIDES);
