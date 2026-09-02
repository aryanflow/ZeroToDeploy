const SLIDES=[

/* 0: */
{label:'CH 01 · THE IDEA',color:'var(--blue)',hint:'Skim the three crates: that is the whole mental model.',html:`
 <div class="inner">
  <h2 class="big">Infrastructure as <em style="background:var(--tfp)">a text file</em></h2>
  <p class="lede">Instead of clicking through a cloud console, you <b>describe what should exist</b> in files. Terraform reads them, compares with reality, and makes reality match. You declare the <b>destination</b>; Terraform figures out the route. Three words carry everything:</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--tfp)">THE BLUEPRINT</span><div class="bigico">📐</div><h3>Config</h3><div class="metaphor">.tf files · declarative · in git</div><p>Text files describing <b>what should exist</b>: "one server, one bucket, this size, this region." Not <i>how</i> to build: just the end state.</p></div>
   <div class="crate"><span class="tag" style="background:var(--yellow);color:var(--ink)">THE MEMORY</span><div class="bigico">🗺️</div><h3>State</h3><div class="metaphor">terraform.tfstate · the map</div><p>Terraform's record of <b>what it actually built</b>: real IDs, real IPs. It diffs config against state to know what to create, change, or destroy.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THE HANDS</span><div class="bigico">🔌</div><h3>Provider</h3><div class="metaphor">aws · google · azure · 1000s more</div><p>The plugin that <b>talks to a real platform's API</b>. Same language, any cloud: AWS today, Cloudflare tomorrow, GitHub too.</p></div>
  </div>
  <div class="gitstrip">
   <span class="t">Declarative config, like a Dockerfile for cloud</span>
   <span><b>.tf config</b><i>≈</i>Dockerfile, but for clouds</span>
   <span><b>plan</b><i>≈</i>git diff</span>
   <span><b>apply</b><i>≈</i>commit + push</span>
   <span><b>state</b><i>≈</i>the index</span>
  </div>
 </div>`},

/* 1: */
{label:'CH 01 · THE LOOP',color:'var(--blue)',hint:'The plan→apply loop. Next slide: run it in the workbench.',html:`
 <div class="inner">
  <h2 class="big">One loop, <em style="background:var(--green)">forever</em></h2>
  <p class="lede">Every Terraform workflow ever is this loop. The magic move is <b>plan</b>: a dry run that shows exactly what would change: <b>before anything actually changes</b>. You always look before you leap.</p>
  <div class="flow">
   <div class="fbox"><div class="b">✍️</div><b>Write</b><small>edit main.tf</small></div>
   <div class="farr">terraform plan<b>→</b></div>
   <div class="fbox"><div class="b">🔍</div><b>Preview</b><small>+ add ~ change − destroy</small></div>
   <div class="farr">terraform apply<b>→</b></div>
   <div class="fbox"><div class="b">☁️</div><b>Real infra</b><small>servers exist now</small></div>
   <div class="farr">edit again<b>→</b></div>
   <div class="fbox"><div class="b">🔁</div><b>Repeat</b><small>infra evolves in git</small></div>
  </div>
 </div>`},

/* 2: */
{label:'WORKBENCH',color:'var(--yellow)',hint:'Run commands from the last two slides. Tap RUN or type below.',workbench:true,terminal:true,html:`
 <div class="workbench-head">
  <h2 class="big">Terraform, learned by <em style="background:var(--tfp)">doing.</em></h2>
  <p class="lede workbench-lede">You saw write→plan→apply. Now run it: watch resources appear in the panel.</p>
 </div>
 <div class="playwrap">
  <div class="term">
   <div class="bar"><i></i><i></i><i></i><span>groundwork: simulated cloud · main.tf loaded</span></div>
   <div class="tout" id="tout"></div>
   <div class="tinrow"><span class="pr">$</span><input id="tin" placeholder="terraform init" autocomplete="off" spellcheck="false" aria-label="terminal"></div>
   <div class="chips" id="chips"></div>
  </div>
  <div class="state">
   <h4>☁️ Your cloud <em id="hbc"></em></h4>
   <div class="zone" id="dz"><div class="none">Empty. Nothing exists yet.</div></div>
   <h4>🗺️ terraform.tfstate</h4>
   <div class="statefile" id="sf">no state file yet: run <b>terraform init</b> then <b>apply</b></div>
  </div>
 </div>
 <div class="coach" id="coach" style="border-left-color:var(--tfp)"></div>
 <div class="cheat-strip">
  <div class="cheat-strip-title">Daily commands <span>tap RUN · typical order</span></div>
  <div class="cheat workbench-cheat" id="cheat"></div>
 </div>`},

/* 3: */
{label:'CH 03 · THE LANGUAGE',color:'var(--red)',hint:'Three block types cover 90% of every .tf file you will ever read.',html:`
 <div class="inner">
  <h2 class="big">HCL: blocks that <em style="background:var(--red)">declare things</em></h2>
  <p class="lede">Terraform config is written in HCL: human-friendly, made of <b>blocks</b>. Every file you'll ever open is mostly these three:</p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--red)">THE STAR</span><h3 style="font-size:16px">resource</h3><p><b>One real thing in the cloud.</b> Type + name + settings. <code style="font-size:11px">resource "aws_instance" "web" {...}</code> = one server. This block is 80% of Terraform.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THE KNOBS</span><h3 style="font-size:16px">variable</h3><p><b>Inputs, so config is reusable.</b> Same files, different values: <code style="font-size:11px">env = "staging"</code> vs <code style="font-size:11px">"prod"</code>. Set defaults, override per environment.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">THE RECEIPT</span><h3 style="font-size:16px">output</h3><p><b>What to print after apply</b>: the server's IP, the bucket's URL. Also how one Terraform project passes values to another.</p></div>
  </div>
  <div class="gitstrip"><span class="t">The quiet superpower: references</span>
   <span><b>aws_instance.web.id</b><i>→</i>use one resource's value inside another</span>
   <span>Terraform reads these and <b>builds things in the right order, automatically</b></span>
  </div>
 </div>`},

/* 4: */
{label:'CH 03 · PLAN & APPLY',color:'var(--red)',hint:'Flip toggles → press plan → read the diff → apply. Repeat with different toggles.',html:`
 <div class="inner">
  <h2 class="big">Flip. Plan. <em style="background:var(--tfp)">Read the diff.</em></h2>
  <div class="buildwrap">
   <div class="hclbox">
    <div class="bar" style="display:flex;align-items:center;gap:7px;padding:11px 15px;background:#241f30;border-bottom:2px solid #000"><i style="width:11px;height:11px;border-radius:50%;background:#ff5f57"></i><i style="width:11px;height:11px;border-radius:50%;background:#febc2e"></i><i style="width:11px;height:11px;border-radius:50%;background:#28c840"></i><span style="margin-left:8px;font-family:var(--mono);font-size:11px;color:#8b83a0">main.tf</span></div>
    <div class="hcl" id="hcl"></div>
    <div class="toggles">
     <button class="tgl" id="tg-size"><span class="sw"></span>Upgrade server: small → large <span style="margin-left:auto;color:#ffd166">~ change</span></button>
     <button class="tgl" id="tg-cdn"><span class="sw"></span>Add a CDN in front <span style="margin-left:auto;color:#5ff0a0">+ create</span></button>
     <button class="tgl" id="tg-bucket"><span class="sw"></span>Delete the logs bucket <span style="margin-left:auto;color:#ff7d70">− destroy</span></button>
    </div>
   </div>
   <div class="planviz">
    <h4>Terminal: the plan is a contract</h4>
    <div class="planout" id="planout">Flip a toggle on the left, then press ▸ terraform plan.

The plan shows what WOULD happen: nothing
changes until you apply. This is the whole
safety model of Terraform.</div>
    <div class="bgo">
     <button class="act" id="planbtn">▸ terraform plan</button>
     <button class="act tfgo" id="applybtn" disabled>terraform apply</button>
     <div class="bmsg" id="bmsg"></div>
    </div>
   </div>
  </div>
 </div>`},

/* 5: */
{label:'CH 04 · STATE',color:'var(--yellow)',hint:'State = the memory of Terraform. Protect it like credentials.',html:`
 <div class="inner">
  <h2 class="big">State: the map <em style="background:var(--yellow);color:var(--ink)">must match the land</em></h2>
  <p class="lede">After every apply, Terraform writes <code>terraform.tfstate</code>: its memory of what exists and the real-world IDs. Every plan is a <b>three-way comparison</b>: your config, the state, and reality.</p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--yellow);color:var(--ink)">WHY IT EXISTS</span><div class="bigico">🧠</div><h3 style="font-size:15px">It maps names to reality</h3><p>Your config says <code style="font-size:11px">aws_instance.web</code>. The cloud says <code style="font-size:11px">i-0abc123f</code>. <b>State is the lookup table between them.</b> Lose it, and Terraform forgets it built anything.</p></div>
   <div class="crate"><span class="tag" style="background:var(--red)">THE DANGER</span><div class="bigico">🌪️</div><h3 style="font-size:15px">Drift</h3><p>Someone edits infra <b>by hand in the console</b>. Now reality ≠ state ≠ config. Next plan flags it and offers to fix it. Rule: <b>once Terraform manages it, only Terraform touches it.</b></p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">TEAM RULE</span><div class="bigico">🤝</div><h3 style="font-size:15px">Remote state + lock</h3><p>On a team, state lives in a <b>shared backend</b> (S3, Terraform Cloud) with <b>locking</b> so two people can't apply at once. Never commit tfstate to git: <b>it contains secrets.</b></p></div>
  </div>
  <div class="coach" style="border-left-color:var(--yellow);margin-top:26px"><b>Burn this in:</b> config is what <i>should</i> exist · state is what Terraform <i>thinks</i> exists · the cloud is what <i>actually</i> exists. <code>plan</code> reconciles all three.</div>
 </div>`},

/* 6: */
{label:'CH 05 · DAY TWO',color:'var(--tfp)',hint:'The daily moves beyond plan & apply.',html:`
 <div class="inner ops">
  <h2 class="big">The daily <em style="background:var(--tfp)">driver moves</em></h2>
  <p class="lede">Beyond the core loop, these are the commands you'll actually reach for every week.</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--tfp)">HYGIENE</span><div class="bigico">🧹</div><h3>Keep it clean</h3><p>Format and sanity-check before every commit. Make it a pre-commit hook and never think about it again.</p><pre>terraform fmt        <em># auto-format</em>
terraform validate   <em># catch typos</em>
terraform output     <em># reprint receipts</em></pre></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">INSPECT</span><div class="bigico">🔎</div><h3>Ask the state</h3><p>What does Terraform think exists? Query its memory directly: the equivalents of <code style="font-size:11px">docker ps</code>.</p><pre>terraform state list  <em># all resources</em>
terraform show        <em># full detail</em>
terraform state show aws_instance.web</pre></div>
   <div class="crate"><span class="tag" style="background:var(--red)">ESCAPE HATCHES</span><div class="bigico">🧯</div><h3>When life happens</h3><p>Adopt hand-made infra into Terraform, or force one resource to be rebuilt from scratch.</p><pre>terraform import ADDR ID
terraform apply -replace=ADDR
terraform destroy    <em># tear it ALL down</em></pre></div>
  </div>
  <div class="gitstrip"><span class="t">Scaling up: two words to recognise</span>
   <span><b>modules</b><i>=</i>reusable folders of config: functions for infra. The registry has thousands prebuilt</span>
   <span><b>workspaces</b><i>=</i>same config, parallel states: dev / staging / prod</span>
  </div>
 </div>`},

/* 7: */
{label:'WRAP UP',color:'var(--green)',hint:'Pick any slide from the dots above.',html:`
 <div class="inner">
  <h1 class="mega" style="font-size:clamp(34px,6vw,72px)">You know<br><span class="hl" style="background:var(--green)">Terraform now.</span></h1>
  <p class="lede" style="margin-top:24px">Config declares the destination, state remembers the terrain, providers do the driving. <b>plan is the contract, apply is the signature.</b> Drift is the enemy, remote state is the team rule, destroy is the undo button. That's the entire working model.</p>
  <div class="grid3" style="margin-top:30px">
   <div class="crate"><span class="tag" style="background:var(--green)">DO NOW</span><h3 style="font-size:15px">Install &amp; first apply</h3><p>Install Terraform, grab the <b>Docker provider</b> (yes: Terraform can manage your local Docker!), and terraform-apply an nginx container. Zero cloud cost, full loop.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THIS WEEK</span><h3 style="font-size:15px">One real resource</h3><p>Free-tier cloud account → one bucket or one tiny VM. Write it, plan it, apply it, <b>change it, plan again</b>: feel the diff. Then destroy it.</p></div>
   <div class="crate"><span class="tag" style="background:var(--tfp)">REMEMBER</span><h3 style="font-size:15px">Plan before apply</h3><p>Forever and always. The person who reads plans carefully <b>never</b> deletes a production database. Be that person.</p></div>
  </div>
 </div>`}
];

window.onDeckReady = function () {
const $ = DeckEngine.$;
const $term = DeckEngine.$term;
const wait = DeckEngine.wait;
const rid = () => 'i-0' + [...Array(8)].map(() => '0123456789abcdef'[Math.random() * 16 | 0]).join('');
function toutEl(){return $term('tout')}
function P(t,c){const o=toutEl();if(!o)return;const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;o.appendChild(d);o.scrollTop=1e9;return d}
function E(c){const o=toutEl();if(!o)return;const d=document.createElement('div');d.innerHTML='<span class="c-dim">$</span> <span class="c-cmd"></span>';d.lastElementChild.textContent=c;o.appendChild(d);o.scrollTop=1e9}
function seedAllTouts(fn){document.querySelectorAll('.slide .tout').forEach(el=>{if(!el.dataset.seeded){el.dataset.seeded='1';fn(el)}})}

/* ================= TERMINAL SIM (workbench) ================= */
const S={init:false,applied:{},step:0,workspace:'default',planFile:false,serial:0};
const PLANNED=[
 {addr:'aws_instance.web',ico:'🖥️',desc:'server · t3.small',type:'server'},
 {addr:'aws_s3_bucket.logs',ico:'🪣',desc:'bucket · app-logs',type:'bucket'},
 {addr:'aws_vpc.main',ico:'🕸️',desc:'network · 10.0.0.0/16',type:'net'}];
const STEPS=[
 {c:'terraform init',t:'every project starts once with <code>terraform init</code>: downloads the providers this config needs.'},
 {c:'terraform plan',t:'the dry run: <code>terraform plan</code>. Read what WOULD be created. Nothing happens yet.'},
 {c:'terraform apply',t:'make it real: <code>terraform apply</code>. Watch three resources appear on the right, and state get written.'},
 {c:'terraform state list',t:'query the memory of Terraform: <code>terraform state list</code>. Like docker ps, but for your cloud.'},
 {c:'terraform plan',t:'run <code>terraform plan</code> again. Config = state = reality → <b>"No changes."</b> This is the calm you are always aiming for.'},
 {c:'terraform destroy',t:'the undo button: <code>terraform destroy</code>. Everything Terraform built, removed in dependency order.'}];
function coach(){const el=$('coach');if(!el)return;
 el.innerHTML='<b>Try it.</b> Type a command, tap a chip, or hit <b>RUN</b> below. Watch the cloud panel update live.';}
function chips(){const b=$('chips');if(!b)return;b.innerHTML='';
 STEPS.forEach(s=>{const x=document.createElement('button');x.className='chip';x.textContent=s.c;x.onclick=()=>run(s.c);b.appendChild(x)});
 ['help'].forEach(c=>{const x=document.createElement('button');x.className='chip';x.textContent=c;x.onclick=()=>run(c);b.appendChild(x)});}
function draw(){const dz=$('dz');if(!dz)return;const ks=Object.keys(S.applied);
 dz.innerHTML=ks.length?'':'<div class="none">Empty. Nothing exists yet.</div>';
 ks.forEach(k=>{const r=S.applied[k],d=document.createElement('div');d.className='res';
  d.innerHTML='<span class="ico">'+r.ico+'</span><div><b>'+r.addr+'</b><small>'+r.desc+' · '+r.id+'</small></div><span class="st">LIVE</span>';
  dz.appendChild(d)});
 $('hbc').textContent=ks.length?ks.length+' resources live':'';
 $('sf').innerHTML=ks.length
  ?'<b>terraform.tfstate</b>: '+ks.length+' resources tracked · serial '+S.serial+' · <span style="color:var(--red)">contains secrets: never commit</span>'
  :(S.init?'initialised · state empty: run <b>apply</b>':'no state yet: run <b>terraform init</b> first');
 chips()}
const adv=i=>{if(S.step===i){S.step++;coach();chips()}};
async function run(raw){E(raw);const tin=$term('tin');if(tin)tin.value='';
 const t=raw.trim().split(/\s+/);
 if(t[0]==='help')return P('init · plan · apply · destroy · state list · show · output · validate · fmt · clear','cy');
 if(t[0]==='clear'){const o=toutEl();if(o)o.innerHTML='';return}
 if(t[0]!=='terraform')return P(t[0]+': not found: commands start with "terraform" (or: help)','err');
 const c=t[1];
 if(c==='init'){P('Initializing the backend...','dim');await wait(350);
  P('Initializing provider plugins...','dim');await wait(300);
  P('- Installing hashicorp/aws v5.61.0...','dim');await wait(450);
  P('- Installed hashicorp/aws (signed by HashiCorp)','ok');
  P('\nTerraform has been initialized! ✅','ok');
  P('(this created .terraform/ with the provider binary: like npm install for clouds)','dim');
  S.init=true;draw();adv(0);return}
 if(!S.init&&['plan','apply','destroy'].includes(c)){
  P('Error: Required plugins are not installed.','err');P('→ run terraform init first: every project starts there.','warn');return}
 if(c==='plan'){const live=Object.keys(S.applied).length;
  await wait(300);
  if(live===PLANNED.length){P('aws_instance.web: Refreshing state... ['+S.applied['aws_instance.web'].id+']','dim');await wait(280);
   P('\nNo changes. Your infrastructure matches the configuration.','ok');
   P('(config = state = reality. The three-way handshake passed.)','dim');adv(4);return}
  P('Terraform will perform the following actions:','dim');await wait(220);
  PLANNED.forEach(r=>{P('\n  # '+r.addr+' will be created','cy');P('  + resource "'+r.addr.split('.')[0]+'" "'+r.addr.split('.')[1]+'" {','add');P('  +   '+r.desc,'add');P('  + }','add')});
  P('\nPlan: 3 to add, 0 to change, 0 to destroy.','warn');
  P('(nothing happened: this is a preview. apply makes it real.)','dim');adv(1);return}
 if(c==='apply'){const live=Object.keys(S.applied).length;
  if(live===PLANNED.length){P('No changes. Your infrastructure matches the configuration.','ok');return}
  P('Plan: 3 to add, 0 to change, 0 to destroy.','warn');
  P('\nDo you want to perform these actions?','dim');await wait(300);
  P('  Enter a value: yes  (auto-confirmed in the simulator)','cy');await wait(350);
  for(const r of PLANNED){P(r.addr+': Creating...','dim');await wait(520);
   const id=rid();S.applied[r.addr]={...r,id};S.serial++;draw();
   P(r.addr+': Creation complete after '+(1+Math.random()*4|0)+'s ['+id+']','ok')}
  P('\nApply complete! Resources: 3 added, 0 changed, 0 destroyed. ✅','ok');
  P('\nOutputs:\n  web_ip = "54.'+(Math.random()*200|0)+'.'+(Math.random()*200|0)+'.'+(Math.random()*200|0)+'"','cy');adv(2);return}
 if(c==='state'&&t[2]==='list'){const ks=Object.keys(S.applied);
  ks.length?ks.forEach(k=>P(k)):P('(state is empty: nothing applied yet)','dim');
  if(ks.length)adv(3);return}
 if(c==='show'){const ks=Object.keys(S.applied);
  if(!ks.length)return P('(state is empty)','dim');
  ks.forEach(k=>{const r=S.applied[k];P('# '+k+':','cy');P('  id = "'+r.id+'"\n  '+r.desc,'dim')});return}
 if(c==='output'){if(!S.applied['aws_instance.web'])return P('No outputs yet: apply first.','dim');
  P('web_ip = "54.'+(Math.random()*200|0)+'.'+(Math.random()*200|0)+'.'+(Math.random()*200|0)+'"','cy');return}
 if(c==='validate'){P('Success! The configuration is valid. ✅','ok');return}
 if(c==='fmt'){P('main.tf','dim');P('(indentation and alignment fixed: zero thought required)','dim');return}
 if(c==='state'&&t[2]==='show'){const addr=t[3]||'aws_instance.web';const r=S.applied[addr];
  if(!r)return P('No state for '+addr,'err');P('# '+addr+':','cy');P('  id = "'+r.id+'"\n  '+r.desc,'dim');return}
 if(c==='import'){const addr=t[2]||'aws_instance.web',id=t[3]||rid();
  S.applied[addr]={addr,ico:'🖥️',desc:'imported resource',id};draw();P('Import successful! Resource imported.','ok');return}
 if(c==='workspace'&&t[2]==='new'){S.workspace=t[3]||'staging';P('Created and switched to workspace "'+S.workspace+'".','ok');return}
 if(c==='plan'&&t.includes('-out')){S.planFile=true;await run('terraform plan');P('Saved plan to tf.plan','ok');return}
 if(c==='apply'&&t[2]==='tf.plan'){if(!S.planFile)return P('No saved plan: run terraform plan -out=tf.plan first','err');return run('terraform apply')}
 if(c==='apply'&&raw.includes('-replace=')){const addr=raw.split('-replace=')[1]?.trim()||'aws_instance.web';
  if(!S.applied[addr])return P('No such resource in state','err');P(addr+': destroying... ['+S.applied[addr].id+']','dim');await wait(400);
  S.applied[addr].id=rid();P(addr+': Creation complete after 2s ['+S.applied[addr].id+']','ok');return}
 if(c==='destroy'){const ks=Object.keys(S.applied);
  if(!ks.length)return P('Nothing to destroy: state is empty.','dim');
  P('Plan: 0 to add, 0 to change, 3 to destroy.','err');
  P('  Enter a value: yes  (auto-confirmed)','cy');await wait(300);
  for(const k of [...ks].reverse()){P(k+': Destroying... ['+S.applied[k].id+']','dim');await wait(430);
   delete S.applied[k];S.serial++;draw();P(k+': Destruction complete','ok')}
  P('\nDestroy complete! Resources: 3 destroyed.','ok');
  P('(reverse dependency order, automatically: network went last)','dim');adv(5);return}
 P("terraform: '"+c+"': not in this simulator. Try: help",'err')}
document.addEventListener('keydown',e=>{if(e.target.matches('.tinrow input')&&e.key==='Enter'&&e.target.value.trim())run(e.target.value)});
seedAllTouts(el=>{[{t:'⛰ Simulated cloud. Type freely: nothing real, nothing billed.',c:'cy'},{t:'main.tf declares: 1 server + 1 bucket + 1 network.',c:'dim'},{t:'',c:''}].forEach(({t,c})=>{const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;el.appendChild(d)})});
draw();coach();

/* ================= PLAN/APPLY SIM (slide 5) ================= */
const TG={size:false,cdn:false,bucket:false};
let applied2={size:false,cdn:false,bucket:false},planReady=false;
function hcl(){
 const ch=x=>TG[x]!==applied2[x];
 $('hcl').innerHTML=
`<span class="k">resource</span> <span class="s">"aws_instance"</span> <span class="s">"web"</span> {
  ami           = <span class="s">"ami-0c55b1"</span>
  instance_type = <span class="mut${ch('size')?' chg':''}"><span class="s">"${TG.size?'t3.large':'t3.small'}"</span>${ch('size')?' <span class="cm"># ~ changed</span>':''}</span>
}
${TG.bucket?'<span class="mut del"><span class="k">resource</span> <span class="s">"aws_s3_bucket"</span> <span class="s">"logs"</span> {\n  bucket = <span class="s">"app-logs"</span>\n}</span>':'<span class="k">resource</span> <span class="s">"aws_s3_bucket"</span> <span class="s">"logs"</span> {\n  bucket = <span class="s">"app-logs"</span>\n}'}
${TG.cdn?'<span class="mut add"><span class="k">resource</span> <span class="s">"aws_cloudfront"</span> <span class="s">"cdn"</span> {\n  origin = aws_instance.web.<span class="fn">public_ip</span>\n}</span>':'<span class="cm"># (no CDN yet)</span>'}

<span class="k">output</span> <span class="s">"web_ip"</span> { value = aws_instance.web.<span class="fn">public_ip</span> }`}
['size','cdn','bucket'].forEach(k=>{$('tg-'+k).onclick=()=>{TG[k]=!TG[k];$('tg-'+k).classList.toggle('onn',TG[k]);planReady=false;$('applybtn').disabled=true;
 $('bmsg').textContent='';hcl()}});
hcl();
$('planbtn').onclick=async()=>{
 const add=TG.cdn&&!applied2.cdn?1:0,chg=TG.size!==applied2.size?1:0,del=TG.bucket&&!applied2.bucket?1:0;
 const o=$('planout');o.textContent='';const L=(t,c)=>{const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;o.appendChild(d)};
 L('$ terraform plan','cmd');await wait(300);
 L('aws_instance.web: Refreshing state...','dim');await wait(320);
 if(!add&&!chg&&!del){L('','');L('No changes. Infrastructure matches configuration.','ok');L('(the calm. config = state = reality)','dim');$('applybtn').disabled=true;return}
 if(chg){L('','');L('  ~ aws_instance.web','chg');L('      instance_type: "t3.small" -> "t3.large"','chg');L('      (update in-place: no downtime)','dim')}
 if(add){L('','');L('  + aws_cloudfront.cdn','add');L('      origin: (known after apply)','add')}
 if(del){L('','');L('  - aws_s3_bucket.logs','del');L('      bucket "app-logs" and ALL its data','del')}
 L('','');L('Plan: '+add+' to add, '+chg+' to change, '+del+' to destroy.','warn');
 if(del)L('⚠ READ destroys twice. This is how prod databases die.','err');
 planReady=true;$('applybtn').disabled=false;
 $('bmsg').innerHTML='Plan looks right? Then: and only then: <b>apply</b>.'};
$('applybtn').onclick=async()=>{if(!planReady)return;
 const o=$('planout');const L=(t,c)=>{const d=document.createElement('div');if(c)d.className='c-'+c;d.textContent=t;o.appendChild(d);o.scrollTop=1e9};
 L('','');L('$ terraform apply','cmd');await wait(350);
 if(TG.size!==applied2.size){L('aws_instance.web: Modifying...','dim');await wait(500);L('aws_instance.web: Modifications complete','ok')}
 if(TG.cdn&&!applied2.cdn){L('aws_cloudfront.cdn: Creating...','dim');await wait(500);L('aws_cloudfront.cdn: Creation complete','ok')}
 if(TG.bucket&&!applied2.bucket){L('aws_s3_bucket.logs: Destroying...','dim');await wait(500);L('aws_s3_bucket.logs: Destruction complete','ok')}
 L('','');L('Apply complete! ✅ State updated.','ok');
 applied2={...TG};planReady=false;$('applybtn').disabled=true;hcl();
 $('bmsg').innerHTML='<b>Applied.</b> Run plan again → "No changes." Or flip more toggles.'};

/* ================= CHEAT (workbench) ================= */
const CHEAT=[
 ['terraform init','1 · set up project (once per clone)'],
 ['terraform fmt','2 · auto-format .tf files'],
 ['terraform validate','3 · catch config errors early'],
 ['terraform plan','4 · dry run: read the diff'],
 ['terraform apply','5 · make reality match config'],
 ['terraform output','6 · read exported values'],
 ['terraform state list','7 · what does TF manage?'],
 ['terraform show','8 · full detail of state'],
 ['terraform state show aws_instance.web','9 · one resource, close up'],
 ['terraform plan -out=tf.plan','10 · freeze a plan for review/CI'],
 ['terraform apply tf.plan','11 · apply exactly that plan'],
 ['terraform apply -replace=aws_instance.web','12 · force rebuild one thing'],
 ['terraform import aws_instance.web i-abc123','13 · adopt hand-made infra'],
 ['terraform workspace new staging','14 · parallel env, same config'],
 ['terraform destroy','15 · tear it all down']];
SimCheats.bind($('cheat'),CHEAT,run);

};

DeckEngine.init(SLIDES);
