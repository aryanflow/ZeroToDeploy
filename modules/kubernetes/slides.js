const SLIDES=[

/* 0 — cover */
{label:'START HERE',color:'var(--k8s)',hint:'<b>Click Next</b> — or use your arrow keys. 10 slides, ~15 minutes.',html:`
 <div class="inner">
  <h1 class="mega">Kubernetes,<br>learned by<br><span class="hl">clicking.</span></h1>
  <p class="lede" style="margin-top:26px">Docker runs one box. Kubernetes runs <b>thousands</b> — and keeps them alive when servers die. No scrolling. No wall of text. One idea per slide, and when it's time to try — a <b>simulated kubectl terminal</b> opens right here. By the last slide you'll deploy, scale, expose and debug workloads. <b>Nothing can break your cluster.</b></p>
  <div class="heroart">
   <div class="hbox" style="background:var(--k8s);animation-delay:.05s">POD</div>
   <div class="hbox" style="background:var(--blue);animation-delay:.15s">DEPLOY</div>
   <div class="hbox" style="background:var(--green);animation-delay:.25s">SERVICE</div>
   <div class="hbox" style="background:var(--yellow);color:var(--ink);animation-delay:.35s">SCALE</div>
   <div class="hbox" style="background:var(--violet);animation-delay:.45s">kubectl</div>
  </div>
 </div>`},

/* 1 — the idea */
{label:'CH 01 · THE IDEA',color:'var(--blue)',hint:'Skim the three crates. That is the entire mental model.',html:`
 <div class="inner">
  <h2 class="big">Kubernetes = a <em style="background:var(--k8s)">fleet manager</em> for containers</h2>
  <p class="lede">You hand it a <b>desired state</b> — "run three copies of my app" — and it continuously fights reality until reality matches. When a pod dies, it spawns another. When traffic spikes, you scale. Only three words matter:</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--k8s)">SMALLEST UNIT</span><div class="bigico">🫛</div><h3>Pod</h3><div class="metaphor">one or few containers · ephemeral · disposable</div><p>The <b>atom</b> of Kubernetes. Usually one main container plus helpers. Gets its own IP — but that IP <b>dies with the pod</b>. Never address pods directly.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THE BOSS</span><div class="bigico">📋</div><h3>Deployment</h3><div class="metaphor">declarative · self-healing · rolling updates</div><p>Says <b>"keep N replicas running"</b>. Creates and replaces pods for you. Change the image → rolling update. Crash a pod → new one in seconds.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">THE ADDRESS</span><div class="bigico">📡</div><h3>Service</h3><div class="metaphor">stable DNS · load-balances · ClusterIP</div><p>A <b>permanent name</b> that routes to whichever pods match right now. Your web app talks to <code style="font-size:11px">db</code> — not to a pod IP that changes every restart.</p></div>
  </div>
  <div class="gitstrip">
   <span class="t">You know Docker → you already know this</span>
   <span><b>Pod</b><i>≈</i>container (but managed)</span><span><b>Deployment</b><i>≈</i>docker compose + auto-heal</span><span><b>Service</b><i>≈</i>Compose network DNS</span><span><b>kubectl apply</b><i>≈</i>compose up</span>
  </div>
 </div>`},

/* 2 — the flow */
{label:'CH 01 · THE FLOW',color:'var(--blue)',hint:'One arrow to the next slide, where you type this yourself.',html:`
 <div class="inner">
  <h2 class="big">You declare. <em style="background:var(--green)">The control plane delivers.</em></h2>
  <p class="lede">Every Kubernetes workflow ever is this picture. You write YAML, kubectl sends it to the API server, controllers schedule pods on nodes. That's it — the rest is detail.</p>
  <div class="flow">
   <div class="fbox"><div class="b">✍️</div><b>You</b><small>deployment.yaml</small></div>
   <div class="farr">kubectl apply<b>→</b></div>
   <div class="fbox"><div class="b">🎛️</div><b>Control plane</b><small>API · scheduler · controllers</small></div>
   <div class="farr">schedule<b>→</b></div>
   <div class="fbox"><div class="b">🫛</div><b>Pods running</b><small>on worker nodes</small></div>
   <div class="farr">kubectl get<b>→</b></div>
   <div class="fbox"><div class="b">👀</div><b>You again</b><small>observing reality</small></div>
  </div>
  <div class="cpstrip">
   <span class="cp">API SERVER</span><span class="arr">→</span>
   <span class="cp">SCHEDULER</span><span class="arr">→</span>
   <span class="cp">CONTROLLER</span><span class="arr">→</span>
   <span class="cp">KUBELET</span>
  </div>
  <div class="coach" style="border-left-color:var(--k8s);margin-top:36px"><b>Next slide:</b> a live terminal. You'll apply a deployment and watch pods appear in the cluster panel — guided, step by step.</div>
 </div>`},

/* 3 — playground 1 */
{label:'CH 02 · PLAYGROUND',color:'var(--yellow)',hint:'Complete the 6 steps in the coach box, then hit Next.',html:`
 <div class="inner">
  <h2 class="big">Type. <em style="background:var(--green)">Watch the cluster.</em></h2>
  <div class="playwrap">
   <div class="term">
    <div class="bar"><i></i><i></i><i></i><span>bridge — simulated cluster · context: minikube</span></div>
    <div class="tout" id="tout"></div>
    <div class="tinrow"><span class="pr">$</span><input id="tin" placeholder="kubectl get pods" autocomplete="off" spellcheck="false" aria-label="terminal"></div>
    <div class="chips" id="chips"></div>
   </div>
   <div class="state">
    <h4>☸️ Cluster <em id="hbc"></em></h4>
    <div class="clusterviz" id="cv"><span class="empty">No workloads yet — apply a deployment.</span></div>
    <h4>📋 Resources</h4>
    <div class="zone" id="dz"><div class="none">Empty namespace.</div></div>
   </div>
  </div>
  <div class="coach" id="coach" style="border-left-color:var(--k8s)"></div>
 </div>`},

/* 4 — pods concept */
{label:'CH 03 · PODS',color:'var(--red)',hint:'Pods are cattle, not pets. Never pin to a pod IP.',html:`
 <div class="inner">
  <h2 class="big">Pods: <em style="background:var(--red)">ephemeral by design</em></h2>
  <p class="lede">A pod wraps one or more containers that <b>share a network and storage</b>. Think of it as a tiny VM-lite — but disposable. Kubernetes treats pods as <b>cattle</b>: when one gets sick, delete it and let the Deployment birth a healthy replacement.</p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--red)">ONE OR FEW</span><h3 style="font-size:16px">Shared context</h3><p>Sidecar pattern: main app + log shipper in one pod. They share <code style="font-size:11px">localhost</code> and volumes. Most pods are just <b>one container</b>.</p></div>
   <div class="crate"><span class="tag" style="background:var(--yellow);color:var(--ink)">EPHEMERAL</span><h3 style="font-size:16px">No immortality</h3><p>Restart = new pod = <b>new IP</b>. Never bookmark a pod address. That's why Services exist — stable front door, shifting pods behind it.</p></div>
   <div class="crate"><span class="tag" style="background:var(--k8s)">LABELS</span><h3 style="font-size:16px">How things find each other</h3><p><code style="font-size:11px">app=web</code> on pods, <code style="font-size:11px">selector: app=web</code> on Services. Labels are the glue — Deployments stamp them, Services route by them.</p></div>
  </div>
  <div class="coach" style="border-left-color:var(--red);margin-top:26px"><b>Next slide:</b> scale a Deployment up and down — watch the pod count change live in the viz.</div>
 </div>`},

/* 5 — scale playground */
{label:'CH 03 · SCALE IT',color:'var(--k8s)',hint:'Press scale or type kubectl scale. Watch pods multiply.',html:`
 <div class="inner">
  <h2 class="big">One command. <em style="background:var(--k8s)">N pods.</em></h2>
  <div class="scalewrap">
   <div class="depbox">
    <div class="bar"><i></i><i></i><i></i><span>deployment.yaml</span></div>
    <div class="depyaml"><span class="k">apiVersion:</span> <span class="v">apps/v1</span>
<span class="k">kind:</span> <span class="v">Deployment</span>
<span class="k">metadata:</span>
  <span class="k">name:</span> <span class="v">web</span>
<span class="k">spec:</span>
  <span class="k">replicas:</span> <span class="v hl" id="rephl">3</span>        <span class="cm"># ← this number is the whole game</span>
  <span class="k">selector:</span>
    <span class="k">matchLabels:</span> <span class="v">{ app: web }</span>
  <span class="k">template:</span>
    <span class="k">spec:</span>
      <span class="k">containers:</span>
      - <span class="k">name:</span> <span class="v">nginx</span>
        <span class="k">image:</span> <span class="v">nginx:1.27</span></div>
   </div>
   <div class="scaleviz">
    <h4>Deployment web — live replica count</h4>
    <div class="repcounter" id="rcount">3<small>replicas desired · <span id="rready">3</span> ready</small></div>
    <div class="podgrid" id="pgrid"></div>
    <div class="sclog" id="sclog">Press scale or run <code style="background:var(--ink);color:#9ec5ff;padding:1px 6px;border-radius:4px;font-size:11px">kubectl scale deployment/web --replicas=5</code></div>
    <div class="bgo">
     <button class="act kgo" id="scalebtn">▸ kubectl scale deployment/web --replicas=5</button>
     <button class="act alt" id="scaledown">scale to 1</button>
    </div>
   </div>
  </div>
 </div>`},

/* 6 — services */
{label:'CH 04 · SERVICES',color:'var(--green)',hint:'Press "expose service" — watch web resolve db by name.',html:`
 <div class="inner">
  <h2 class="big">Services: a <em style="background:var(--green)">stable name</em> over shifting pods</h2>
  <p class="lede"><b>ClusterIP</b> (the default) gives your pods a DNS name inside the cluster — <code style="font-size:12px">web.default.svc.cluster.local</code> — and load-balances across healthy backends. From inside any pod, the database is just <b>db</b>.</p>
  <div class="svcwrap">
   <div class="svcbox">
    <h4>Inside the cluster</h4>
    <div class="svcring"><span class="nl">ClusterIP · kube-dns</span>
     <div class="svcnode" id="sn-web"><div class="bx">🚢</div><b>web</b><small>3 pods behind it</small></div>
     <div class="svcwire" id="svwire"></div>
     <div class="svcnode" id="sn-db"><div class="bx">🐘<span class="dns">db</span></div><b>postgres</b><small>1 pod · port 5432</small></div>
    </div>
    <div class="svcnote" id="svcnote">web pod runs: <b>curl http://db:5432</b> — DNS resolves, traffic load-balances. No pod IPs in your config, ever.</div>
    <div class="bgo"><button class="act kgo" id="exposebtn">▸ kubectl expose deployment db</button></div>
   </div>
   <div class="svcbox">
    <h4>Service types — three you'll meet</h4>
    <div class="grid3" style="margin-top:0;gap:12px">
     <div class="crate" style="padding:16px"><span class="tag" style="background:var(--green)">DEFAULT</span><h3 style="font-size:14px">ClusterIP</h3><p>Internal only. Pod → pod traffic. <b>99% of Services.</b></p></div>
     <div class="crate" style="padding:16px"><span class="tag" style="background:var(--blue)">DEV / LB</span><h3 style="font-size:14px">LoadBalancer</h3><p>Cloud provider assigns a public IP. Production ingress path.</p></div>
     <div class="crate" style="padding:16px"><span class="tag" style="background:var(--yellow);color:var(--ink)">LOCAL DEV</span><h3 style="font-size:14px">NodePort</h3><p>Opens a port on every node. Handy on minikube, rare in prod.</p></div>
    </div>
   </div>
  </div>
 </div>`},

/* 7 — day two ops */
{label:'CH 05 · DAY TWO',color:'var(--violet)',hint:'The three moves every engineer makes daily — in this order.',html:`
 <div class="inner ops">
  <h2 class="big">Something's weird? <em style="background:var(--violet)">Three moves.</em></h2>
  <p class="lede">This is 95% of real-world debugging on a cluster. Always in this order.</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--violet)">MOVE 1</span><div class="bigico">📜</div><h3>Read the logs</h3><p>Containers write to stdout. <b>Always look here first.</b> One pod crashing? Find which replica and tail it.</p><pre>kubectl logs web-7d4f8b-abc12
kubectl logs -f deployment/web    <em># follow all</em>
kubectl logs web-abc12 --previous  <em># last crash</em></pre></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">MOVE 2</span><div class="bigico">🔦</div><h3>Step inside</h3><p>Open a shell <b>inside</b> a running pod — its filesystem, its network namespace. Debug, then exit. Pod keeps running.</p><pre>kubectl exec -it web-abc12 -- sh
<em># inside:</em> curl db:5432 · env · ls
exit</pre></div>
   <div class="crate"><span class="tag" style="background:var(--k8s)">MOVE 3</span><div class="bigico">🔍</div><h3>Describe it</h3><p>When logs aren't enough — <b>Events</b> tell the story. OOMKilled? ImagePullBackOff? Pending forever? It's all here.</p><pre>kubectl describe pod web-abc12
kubectl describe deployment web
kubectl get events --sort-by=.lastTimestamp</pre></div>
  </div>
 </div>`},

/* 8 — cheat */
{label:'CH 06 · THE 15',color:'var(--sea)',hint:'Click any command to copy. This grid is the whole job.',html:`
 <div class="inner">
  <h2 class="big">Hundreds of flags. <em style="background:var(--sea)">Fifteen commands.</em></h2>
  <p class="lede">Same as git and Docker. Click to copy — this grid is your daily driver.</p>
  <div class="cheat" id="cheat"></div>
 </div>`},

/* 9 — finish */
{label:'DEPARTURE',color:'var(--green)',hint:'That was the whole model. Go run it for real.',html:`
 <div class="inner">
  <h1 class="mega" style="font-size:clamp(34px,6vw,72px)">You know<br><span class="hl" style="background:var(--green)">Kubernetes now.</span></h1>
  <p class="lede" style="margin-top:24px">Pods are ephemeral atoms, Deployments keep N of them alive, Services give stable names. <code style="font-size:13px">kubectl apply</code> declares desire, the control plane delivers reality, logs → exec → describe is the daily loop. <b>That's the entire working model.</b></p>
  <div class="grid3" style="margin-top:30px">
   <div class="crate"><span class="tag" style="background:var(--green)">DO NOW</span><h3 style="font-size:15px">Install &amp; verify</h3><p>Get minikube or kind, then <b>kubectl get nodes</b> for real. You know exactly what a healthy cluster looks like.</p></div>
   <div class="crate"><span class="tag" style="background:var(--k8s)">THIS WEEK</span><h3 style="font-size:15px">Deploy one app</h3><p>Write a Deployment + Service YAML, apply it, scale it, break a pod, watch it heal. Read logs, exec in, describe the crash.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">REPLAY</span><h3 style="font-size:15px">Come back anytime</h3><p>The playgrounds reset on reload. Muscle memory comes from the loop: <b>apply → get → logs → scale → describe.</b></p></div>
  </div>
 </div>`}
];

window.onDeckReady = function () {
const $ = DeckEngine.$;
const wait = DeckEngine.wait;

/* ================= KUBECTL SIM (slide 3) ================= */
const S={ctx:false,deployed:false,pods:[],deps:{},step:0};
const sha=()=>[...Array(5)].map(()=>'0123456789abcdef'[Math.random()*16|0]).join('');
function P(t,c){const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;$('tout').appendChild(d);$('tout').scrollTop=1e9;return d}
function E(c){const d=document.createElement('div');d.innerHTML='<span class="c-dim">$</span> <span class="c-cmd"></span>';d.lastElementChild.textContent=c;$('tout').appendChild(d);$('tout').scrollTop=1e9}
const STEPS=[
 {c:'kubectl config use-context minikube',t:'<b>Step 1 / 6</b> — point kubectl at your cluster: <code>kubectl config use-context minikube</code>. One context = one cluster.'},
 {c:'kubectl get pods',t:'<b>Step 2 / 6</b> — empty cluster check: <code>kubectl get pods</code>. Default namespace, no workloads yet.'},
 {c:'kubectl apply -f deployment.yaml',t:'<b>Step 3 / 6</b> — declare desired state: <code>kubectl apply -f deployment.yaml</code>. The control plane takes it from here.'},
 {c:'kubectl get pods -w',t:'<b>Step 4 / 6</b> — watch them boot: <code>kubectl get pods</code>. Pending → Running. See them appear in the cluster panel.'},
 {c:'kubectl get deployments',t:'<b>Step 5 / 6</b> — the boss object: <code>kubectl get deployments</code>. One line = replica count + readiness.'},
 {c:'kubectl describe deployment web',t:'<b>Step 6 / 6</b> — full story: <code>kubectl describe deployment web</code>. Events, conditions, the works.'}];
function coach(){const el=$('coach');if(!el)return;
 el.innerHTML=S.step>=STEPS.length
  ?'<b>All 6 done 🎉</b> — apply → get → describe is the daily loop. Free play: <code>kubectl scale deployment/web --replicas=5</code>, <code>kubectl logs web-...</code>… then hit <b>Next</b>.'
  :STEPS[S.step].t}
function chips(){const b=$('chips');if(!b)return;b.innerHTML='';
 const L=[];if(S.step<STEPS.length)L.push([STEPS[S.step].c,1]);
 if(S.deployed)L.push(['kubectl get pods',0],['kubectl logs web-'+sha(),0]);
 L.push(['help',0]);
 L.forEach(([c,n])=>{const x=document.createElement('button');x.className='chip'+(n?' go':'');x.textContent=c;x.onclick=()=>run(c);b.appendChild(x)})}
function drawCluster(){const cv=$('cv');if(!cv)return;
 if(!S.pods.length){cv.innerHTML='<span class="empty">No workloads yet — apply a deployment.</span>';return}
 cv.innerHTML='<span class="nl">default namespace</span>';
 S.pods.forEach(p=>{const d=document.createElement('div');d.className='pod'+(p.st==='Pending'?' pend':p.st==='Terminating'?' dead':'');
  d.innerHTML='<span class="led"></span><div class="ico">🫛</div><b></b><small></small>';
  d.querySelector('b').textContent=p.name.slice(0,12);
  d.querySelector('small').textContent=p.st;cv.appendChild(d)})}
function drawRes(){const dz=$('dz');if(!dz)return;const ks=Object.keys(S.deps);
 dz.innerHTML=ks.length?'':'<div class="none">Empty namespace.</div>';
 ks.forEach(k=>{const d=S.deps[k],el=document.createElement('div');el.className='res';
  el.innerHTML='<span class="ico">📋</span><div><b></b><small></small></div><span class="st run"></span>';
  el.querySelector('b').textContent='deployment/'+k;
  el.querySelector('small').textContent=d.replicas+'/'+d.ready+' ready · nginx:1.27';
  el.querySelector('.st').textContent='Running';dz.appendChild(el)});
 const run=S.pods.filter(p=>p.st==='Running').length;
 $('hbc').textContent=S.pods.length?run+' running / '+S.pods.length+' pods':'';
 drawCluster();chips()}
async function spawnPods(n){S.pods=[];
 for(let i=0;i<n;i++){const id=sha();S.pods.push({name:'web-7d4f8b-'+id,st:'Pending'})}
 drawRes();
 for(let i=0;i<n;i++){await wait(400+Math.random()*300);S.pods[i].st='Running';drawRes()}}
const adv=i=>{if(S.step===i){S.step++;coach();chips()}};
async function run(raw){E(raw);if($('tin'))$('tin').value='';
 const t=raw.trim().split(/\s+/);
 if(t[0]==='help')return P('get pods · get deployments · apply -f FILE · describe TYPE/NAME · logs POD · scale deployment/NAME --replicas=N · config use-context CTX · clear','cy');
 if(t[0]==='clear')return $('tout').innerHTML='';
 if(t[0]!=='kubectl')return P(t[0]+': not found — commands start with "kubectl" (or: help)','err');
 const c=t[1];
 if(c==='config'&&t[2]==='use-context'){const ctx=t[3]||'minikube';
  if(ctx!=='minikube')return P('error: context "'+ctx+'" not found — try minikube','err');
  S.ctx=true;P('Switched to context "'+ctx+'".','ok');adv(0);return}
 if(c==='get'){
  if(t[2]==='pods'||t[2]==='po'){if(!S.ctx)return P('The connection to the server localhost:8443 was refused — set context first.','err');
   P('NAME                    READY   STATUS    RESTARTS   AGE','cy');
   if(!S.pods.length)P('(no resources found in default namespace.)','dim');
   else S.pods.forEach(p=>P(p.name.padEnd(24)+' 1/1     '+p.st.padEnd(9)+' 0          12s'));
   if(S.deployed&&S.pods.some(p=>p.st==='Running'))adv(3);
   else if(S.ctx&&!S.deployed)adv(1);return}
  if(t[2]==='deployments'||t[2]==='deploy'){if(!S.deployed)return P('(no deployments found)','dim');
   P('NAME   READY   UP-TO-DATE   AVAILABLE   AGE','cy');
   P('web    3/3     3            3           45s');adv(4);return}
  if(t[2]==='nodes'){P('NAME       STATUS   ROLES           AGE','cy');P('minikube   Ready    control-plane   7d','dim');return}
  return P('get what? try: pods · deployments · nodes','err')}
 if(c==='apply'){if(!S.ctx)return P('The connection to the server localhost:8443 was refused.','err');
  if(t.includes('-f')&&t.includes('deployment.yaml')){if(S.deployed)return P('deployment.apps/web unchanged','dim');
   P('deployment.apps/web created','ok');S.deployed=true;S.deps.web={replicas:3,ready:0};
   drawRes();await spawnPods(3);S.deps.web.ready=3;drawRes();adv(2);return}
  return P('error: specify -f deployment.yaml','err')}
 if(c==='describe'){if(!S.deployed)return P('Error from server (NotFound): deployments.apps "web" not found','err');
  P('Name:         web','cy');P('Namespace:    default','dim');
  P('Replicas:     3 desired | 3 updated | 3 total | 3 available','dim');
  P('StrategyType: RollingUpdate','dim');P('Events:','cy');
  P('  Normal  ScalingReplicaSet  deployment-controller  Scaled up replica set to 3','ok');
  P('  Normal  Available          deployment-controller  Deployment has minimum availability','ok');adv(5);return}
 if(c==='logs'){const pod=t[2]||'web';if(!S.pods.length)return P('error: no pods to log from','err');
  P('/docker-entrypoint.sh: Configuration complete; ready for start up','dim');
  P('2026/08/30 12:00:00 [notice] nginx/1.27.0 started','dim');return}
 if(c==='scale'){if(!S.deployed)return P('error: deployment "web" not found','err');
  let rep=null;
  for(const x of t){if(x.startsWith('--replicas='))rep=parseInt(x.split('=')[1],10);
   else if(x==='--replicas')rep=parseInt(t[t.indexOf(x)+1],10)}
  if(!rep||rep<1||rep>10)return P('specify --replicas=N (1-10)','err');
  P('deployment.apps/web scaled','ok');S.deps.web.replicas=rep;
  const cur=S.pods.length;if(rep>cur){for(let i=cur;i<rep;i++)S.pods.push({name:'web-7d4f8b-'+sha(),st:'Running'})}
  else S.pods=S.pods.slice(0,rep);S.deps.web.ready=rep;drawRes();return}
 P("kubectl: '"+c+"' — not in this simulator. Try: help",'err')}
document.addEventListener('keydown',e=>{if(e.target.id==='tin'&&e.key==='Enter'&&e.target.value.trim())run(e.target.value)});
P('☸ Simulated cluster. Type freely — nothing can break.','cy');P('');
drawRes();coach();

/* ================= SCALE SIM (slide 5) ================= */
let replicas=3,scaling=0;
function drawScale(){const g=$('pgrid');if(!g)return;g.innerHTML='';
 for(let i=0;i<replicas;i++){const d=document.createElement('div');d.className='pod';
  d.style.width='64px';d.style.padding='8px 4px';
  d.innerHTML='<span class="led"></span><div class="ico">🫛</div><b>web-'+sha()+'</b><small>Running</small>';
  g.appendChild(d)}
 $('rcount').innerHTML=replicas+'<small>replicas desired · <span id="rready">'+replicas+'</span> ready</small>';
 $('rephl').textContent=replicas}
async function doScale(n,msg){if(scaling)return;scaling=1;
 const g=$('sclog');g.innerHTML='';
 const lines=msg.split('\n');for(const l of lines){const d=document.createElement('div');d.textContent=l;g.appendChild(d);await wait(280)}
 const old=replicas;replicas=n;$('rephl').textContent=n;
 if(n>old){for(let i=old;i<n;i++){await wait(350);drawScale()}}
 else{drawScale()}
 const ok=document.createElement('div');ok.className='ok';ok.textContent='deployment.apps/web scaled — '+n+'/'+n+' ready ✓';g.appendChild(ok);
 scaling=0}
drawScale();
$('scalebtn').onclick=()=>doScale(5,'Scaling deployment/web to 5 replicas…\nPod web-'+sha()+' created\nPod web-'+sha()+' created');
$('scaledown').onclick=()=>doScale(1,'Scaling deployment/web to 1 replica…\nTerminating 2 pods…');

/* ================= SERVICE SIM (slide 6) ================= */
let svcOn=0;
$('exposebtn').onclick=async()=>{if(svcOn)return;svcOn=1;
 $('sn-web').classList.add('on');await wait(500);
 $('sn-db').classList.add('on');$('svwire').classList.add('on');
 $('svcnote').innerHTML='<span class="ok">Service "db" exposed on ClusterIP 10.96.42.17:5432</span><br>web pod runs: <b>curl http://db:5432</b> — DNS resolves, traffic load-balances. No pod IPs in your config, ever.';
 $('exposebtn').textContent='✓ service live';$('exposebtn').disabled=true};
$('sn-web').classList.add('on');

/* ================= CHEAT (slide 8) ================= */
const CHEAT=[
 ['kubectl get pods','see every pod in this namespace'],
 ['kubectl get deployments','replica counts at a glance'],
 ['kubectl get services','ClusterIPs and ports'],
 ['kubectl apply -f manifest.yaml','declare desired state'],
 ['kubectl delete -f manifest.yaml','tear it all down'],
 ['kubectl describe pod NAME','events + why it is stuck'],
 ['kubectl logs POD','read stdout — first debug move'],
 ['kubectl logs -f deployment/NAME','follow live output'],
 ['kubectl exec -it POD -- sh','shell inside a running pod'],
 ['kubectl scale deployment/NAME --replicas=N','instant horizontal scale'],
 ['kubectl rollout status deployment/NAME','watch a rolling update'],
 ['kubectl rollout undo deployment/NAME','revert to previous revision'],
 ['kubectl port-forward svc/NAME 8080:80','reach a service locally'],
 ['kubectl get nodes','is the cluster healthy?'],
 ['kubectl config use-context NAME','switch clusters']];
CHEAT.forEach(([c,w])=>{const b=document.createElement('button');b.className='cc';
 b.innerHTML='<div><code></code><small>'+w+'</small></div><span class="cp">COPY</span>';
 b.querySelector('code').textContent=c;
 b.onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(c);b.classList.add('copied');b.querySelector('.cp').textContent='✓';toast('Copied — '+c);setTimeout(()=>{b.classList.remove('copied');b.querySelector('.cp').textContent='COPY'},1500)};
 $('cheat').appendChild(b)});

};

DeckEngine.init(SLIDES);
