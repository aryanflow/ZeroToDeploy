const SLIDES=[

/* 0 — cover */
{label:'START HERE',color:'var(--aws)',hint:'<b>Click Next</b> — or use arrow keys. 10 slides, ~15 minutes.',html:`
 <div class="inner">
  <h1 class="mega">AWS Core,<br>learned by<br><span class="hl">clicking.</span></h1>
  <p class="lede" style="margin-top:26px">Four services explain <b>80% of AWS</b>. No console maze, no surprise bills. One idea per slide, and when it's time to try — a <b>simulated AWS CLI terminal</b> opens right here. By the last slide you'll know IAM, VPC, EC2, and S3 cold. <b>Nothing touches real AWS.</b></p>
  <div class="heroart">
   <div class="hbox" style="background:var(--aws);animation-delay:.05s;color:var(--ink)">IAM</div>
   <div class="hbox" style="background:var(--blue);animation-delay:.15s">VPC</div>
   <div class="hbox" style="background:var(--green);animation-delay:.25s">EC2</div>
   <div class="hbox" style="background:var(--yellow);animation-delay:.35s;color:var(--ink)">S3</div>
  </div>
 </div>`},

/* 1 — four crates */
{label:'CH 01 · THE FOUR',color:'var(--blue)',hint:'Skim the four crates — that is 80% of AWS.',html:`
 <div class="inner">
  <h2 class="big">Four services, <em style="background:var(--aws);color:var(--ink)">one mental model</em></h2>
  <p class="lede">AWS has 200+ services. You only need four to understand the rest. Each answers one question — who, where, compute, storage:</p>
  <div class="grid3" style="grid-template-columns:repeat(2,1fr);max-width:900px;margin-left:auto;margin-right:auto">
   <div class="crate"><span class="tag" style="background:var(--aws);color:var(--ink)">WHO</span><div class="bigico">🔐</div><h3>IAM</h3><div class="metaphor">Identity · Access · Policies</div><p><b>Who can do what.</b> Users, roles, and policies gate every API call. Nothing happens in AWS without IAM saying yes.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">WHERE</span><div class="bigico">🕸️</div><h3>VPC</h3><div class="metaphor">your private network · subnets · routes</div><p><b>Your private network in the cloud.</b> Subnets, route tables, gateways — the fence around your resources. Everything lives inside a VPC.</p></div>
   <div class="crate"><span class="tag" style="background:var(--green)">COMPUTE</span><div class="bigico">🖥️</div><h3>EC2</h3><div class="metaphor">virtual servers · on demand</div><p><b>Compute on tap.</b> Launch a Linux box in 30 seconds. Pick size, attach storage, open ports. Your app runs here.</p></div>
   <div class="crate"><span class="tag" style="background:var(--yellow);color:var(--ink)">STORAGE</span><div class="bigico">🪣</div><h3>S3</h3><div class="metaphor">objects · buckets · infinite scale</div><p><b>Object storage for everything.</b> Logs, backups, static sites, build artifacts. Buckets hold files; S3 never runs out of room.</p></div>
  </div>
  <div class="gitstrip">
   <span class="t">You know Docker &amp; Terraform → you already know this</span>
   <span><b>IAM</b><i>≈</i>who can docker pull</span><span><b>VPC</b><i>≈</i>docker network</span><span><b>EC2</b><i>≈</i>a container host</span><span><b>S3</b><i>≈</i>Docker registry for files</span>
  </div>
 </div>`},

/* 2 — the flow */
{label:'CH 01 · THE FLOW',color:'var(--blue)',hint:'One arrow to the next slide, where you type this yourself.',html:`
 <div class="inner">
  <h2 class="big">Every AWS workflow is <em style="background:var(--green)">this path</em></h2>
  <p class="lede">Sign in with IAM credentials, work inside your VPC, launch EC2 for compute, store artifacts in S3. That's the loop — everything else is a variation.</p>
  <div class="flow">
   <div class="fbox"><div class="b">🔐</div><b>Sign in</b><small>IAM credentials</small></div>
   <div class="farr">sts get-caller-identity<b>→</b></div>
   <div class="fbox"><div class="b">🕸️</div><b>VPC</b><small>your network</small></div>
   <div class="farr">run-instances<b>→</b></div>
   <div class="fbox"><div class="b">🖥️</div><b>EC2</b><small>compute runs</small></div>
   <div class="farr">s3 cp<b>→</b></div>
   <div class="fbox"><div class="b">🪣</div><b>S3</b><small>artifacts stored</small></div>
  </div>
  <div class="coach" style="border-left-color:var(--aws);margin-top:36px"><b>Next slide:</b> a live terminal. You'll run <code>aws sts get-caller-identity</code>, discover your VPC, launch EC2, and list S3 — guided, step by step.</div>
 </div>`},

/* 3 — playground */
{label:'CH 02 · PLAYGROUND',color:'var(--yellow)',hint:'Complete the 6 steps in the orange coach box, then hit Next.',html:`
 <div class="inner">
  <h2 class="big">Type. <em style="background:var(--green)">Watch resources appear.</em></h2>
  <div class="playwrap">
   <div class="term">
    <div class="bar"><i></i><i></i><i></i><span>horizon — simulated AWS CLI · us-east-1</span></div>
    <div class="tout" id="tout"></div>
    <div class="tinrow"><span class="pr">$</span><input id="tin" placeholder="aws sts get-caller-identity" autocomplete="off" spellcheck="false" aria-label="terminal"></div>
    <div class="chips" id="chips"></div>
   </div>
   <div class="state">
    <h4>☁️ Your account <em id="hbc"></em></h4>
    <div class="zone" id="dz"><div class="none">Empty. Sign in first.</div></div>
   </div>
  </div>
  <div class="coach" id="coach" style="border-left-color:var(--aws)"></div>
 </div>`},

/* 4 — IAM deep dive */
{label:'CH 03 · IAM',color:'var(--red)',hint:'Users, roles, policies — least privilege is the rule.',html:`
 <div class="inner">
  <h2 class="big">IAM: <em style="background:var(--red)">who can do what</em></h2>
  <p class="lede">Every AWS API call is checked against IAM. No policy = no access. The three building blocks:</p>
  <div class="grid3" style="margin-top:26px">
   <div class="crate"><span class="tag" style="background:var(--red)">PEOPLE</span><h3 style="font-size:16px">Users</h3><p><b>Long-lived humans.</b> Alice, Bob, your CI bot. Each gets access keys or console login. Prefer roles over users for apps.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">SERVICES</span><h3 style="font-size:16px">Roles</h3><p><b>Temporary identity for services.</b> EC2 assumes a role to read S3. Lambda assumes a role to write logs. No keys stored on disk.</p></div>
   <div class="crate"><span class="tag" style="background:var(--aws);color:var(--ink)">RULES</span><h3 style="font-size:16px">Policies</h3><p><b>JSON documents of allow/deny.</b> <code style="font-size:11px">s3:GetObject</code> on <code style="font-size:11px">arn:aws:s3:::my-bucket/*</code>. Attach to users or roles.</p></div>
  </div>
  <div class="gitstrip"><span class="t">The golden rule — least privilege</span>
   <span>Start with <b>zero</b> permissions</span>
   <span>Add only what the job needs</span>
   <span>Never use root for daily work</span>
  </div>
  <div class="coach" style="border-left-color:var(--red);margin-top:24px"><b>Burn this in:</b> IAM is checked on <i>every</i> API call. If something fails with "Access Denied" — it's always IAM. Check the policy first.</div>
 </div>`},

/* 5 — VPC playground */
{label:'CH 04 · VPC',color:'var(--blue)',hint:'Toggle public vs private subnets — watch what changes.',html:`
 <div class="inner">
  <h2 class="big">VPC: <em style="background:var(--blue)">your network fence</em></h2>
  <p class="lede">A VPC is your isolated slice of AWS. Subnets split it into zones — public ones reach the internet, private ones stay hidden.</p>
  <div class="vpcwrap">
   <div class="vpcbox">
    <h4>Network diagram</h4>
    <div class="vpcdiag">
     <span class="vlabel">vpc-0a1b2c3d · 10.0.0.0/16</span>
     <div class="igw" id="igw">🌐 Internet Gateway</div>
     <div class="subnet pub" id="sub-pub"><b>Public subnet · 10.0.1.0/24</b><small>Route to IGW — reachable from internet</small>
      <div class="hosts"><span class="host">🖥️ web-server</span><span class="host">⚖️ load balancer</span></div>
     </div>
     <div class="subnet priv" id="sub-priv"><b>Private subnet · 10.0.2.0/24</b><small>No direct internet — databases live here</small>
      <div class="hosts"><span class="host">🐘 RDS database</span><span class="host">🔒 internal API</span></div>
     </div>
    </div>
   </div>
   <div class="vpcbox">
    <h4>Explore the layout</h4>
    <div class="vpctoggles">
     <button class="vpctgl onn" id="tg-pub"><span class="sw"></span>Public subnet <span style="margin-left:auto;color:var(--green)">internet-facing</span></button>
     <button class="vpctgl onn" id="tg-priv"><span class="sw"></span>Private subnet <span style="margin-left:auto;color:var(--blue)">internal only</span></button>
     <button class="vpctgl onn" id="tg-igw"><span class="sw"></span>Internet Gateway <span style="margin-left:auto;color:var(--aws)">the front door</span></button>
    </div>
    <div class="vpclog" id="vpclog">Both subnets visible. Toggle one off to see what breaks.</div>
   </div>
  </div>
 </div>`},

/* 6 — EC2 + S3 playground */
{label:'CH 05 · EC2 + S3',color:'var(--green)',hint:'Launch an instance, then upload a file to S3.',html:`
 <div class="inner">
  <h2 class="big">Compute + storage, <em style="background:var(--green)">side by side</em></h2>
  <p class="lede">Launch EC2 for the work, push results to S3. This is the daily loop — build on a box, store the output in a bucket.</p>
  <div class="ec2s3wrap">
   <div class="ec2box">
    <h4>EC2 — compute</h4>
    <div class="instgrid" id="instgrid"><div class="none" style="font-family:var(--mono);font-size:12px;color:var(--faint)">No instances — launch one.</div></div>
    <div class="bgo"><button class="act" id="launchbtn">▸ aws ec2 run-instances</button></div>
    <div class="simlog" id="ec2log">Press launch to spin up a t3.micro in your VPC.</div>
   </div>
   <div class="s3box">
    <h4>S3 — object storage</h4>
    <div class="bucketviz" id="bucketviz"><div class="none" style="font-family:var(--mono);font-size:12px;color:var(--faint)">s3://my-artifacts-bucket/ — empty</div></div>
    <div class="bgo"><button class="act awsgo" id="uploadbtn" disabled>▸ aws s3 cp build.tar.gz s3://…</button></div>
    <div class="simlog" id="s3log">Launch EC2 first — then upload the build artifact.</div>
   </div>
  </div>
 </div>`},

/* 7 — day two */
{label:'CH 06 · DAY TWO',color:'var(--violet)',hint:'Logs, security groups, and the free tier — daily awareness.',html:`
 <div class="inner ops">
  <h2 class="big">Day two on AWS: <em style="background:var(--violet)">three habits</em></h2>
  <p class="lede">Beyond the four core services, these three habits keep you safe and sane.</p>
  <div class="grid3">
   <div class="crate"><span class="tag" style="background:var(--violet)">OBSERVE</span><div class="bigico">📊</div><h3>CloudWatch logs</h3><p>Every service writes logs. <b>CloudWatch</b> collects them — your first stop when something breaks. EC2, Lambda, RDS all stream here.</p><pre>aws logs tail /aws/ec2/web --follow
aws cloudwatch get-metric-statistics …</pre></div>
   <div class="crate"><span class="tag" style="background:var(--red)">PROTECT</span><div class="bigico">🛡️</div><h3>Security groups</h3><p>Virtual firewalls on EC2. <b>Inbound rules</b> control who can connect — port 443 from anywhere, port 22 only from your IP. Default: deny all.</p><pre>aws ec2 authorize-security-group-ingress \\
  --group-id sg-abc --protocol tcp --port 443</pre></div>
   <div class="crate"><span class="tag" style="background:var(--aws);color:var(--ink)">COST</span><div class="bigico">💰</div><h3>Free tier awareness</h3><p>750 hrs/month of t2/t3.micro EC2, 5 GB S3, 1M Lambda requests — <b>for 12 months</b>. After that, everything bills. Set a budget alarm on day one.</p><pre>aws budgets create-budget …
<em># or use the Billing dashboard</em></pre></div>
  </div>
 </div>`},

/* 8 — cheat */
{label:'CH 07 · THE 15',color:'var(--sea)',hint:'Click any command to copy. This grid is the whole job.',html:`
 <div class="inner">
  <h2 class="big">Hundreds of services. <em style="background:var(--sea)">Fifteen commands.</em></h2>
  <p class="lede">Same as git and Docker — a handful of CLI commands is the daily driver. Click to copy.</p>
  <div class="cheat" id="cheat"></div>
 </div>`},

/* 9 — finish */
{label:'DEPARTURE',color:'var(--green)',hint:'That is the whole model. Go create a free-tier account.',html:`
 <div class="inner">
  <h1 class="mega" style="font-size:clamp(34px,6vw,72px)">You know<br><span class="hl" style="background:var(--green)">AWS Core now.</span></h1>
  <p class="lede" style="margin-top:24px">IAM gates every call, VPC fences your network, EC2 runs your code, S3 stores everything else. Sign in → VPC → EC2 → S3 is the loop. Security groups are firewalls, CloudWatch is your eyes, free tier has an expiry date. <b>That's the entire working model.</b></p>
  <div class="grid3" style="margin-top:30px">
   <div class="crate"><span class="tag" style="background:var(--green)">DO NOW</span><h3 style="font-size:15px">Free-tier account</h3><p>Create an AWS account, enable MFA on root, create an IAM user. Run <b>aws sts get-caller-identity</b> for real — you know exactly what it returns.</p></div>
   <div class="crate"><span class="tag" style="background:var(--blue)">THIS WEEK</span><h3 style="font-size:15px">Launch &amp; store</h3><p>One t3.micro EC2, one S3 bucket, upload a file. Set a <b>$5 budget alarm</b>. Destroy everything when done.</p></div>
   <div class="crate"><span class="tag" style="background:var(--aws);color:var(--ink)">REPLAY</span><h3 style="font-size:15px">Come back anytime</h3><p>The playgrounds reset on reload. Muscle memory comes from the loop: <b>sts → describe → run → s3 cp.</b></p></div>
  </div>
 </div>`}
];

window.onDeckReady = function () {
const $ = DeckEngine.$;
const wait = DeckEngine.wait;
const rid = () => 'i-0' + [...Array(8)].map(() => '0123456789abcdef'[Math.random() * 16 | 0]).join('');
const aid = () => [...Array(12)].map(() => '0123456789'[Math.random() * 10 | 0]).join('');

/* ================= TERMINAL SIM (slide 3) ================= */
const S = { step: 0, iam: null, vpc: null, ec2: null, s3: null };
function P(t, c) { const d = document.createElement('div'); if (c) d.className = 'c-' + c; d.textContent = t; $('tout').appendChild(d); $('tout').scrollTop = 1e9; return d; }
function E(c) { const d = document.createElement('div'); d.innerHTML = '<span class="c-dim">$</span> <span class="c-cmd"></span>'; d.lastElementChild.textContent = c; $('tout').appendChild(d); $('tout').scrollTop = 1e9; }
const STEPS = [
 { c: 'aws sts get-caller-identity', t: '<b>Step 1 / 6</b> — who am I? <code>aws sts get-caller-identity</code> returns your IAM identity. Every session starts here.' },
 { c: 'aws ec2 describe-vpcs', t: '<b>Step 2 / 6</b> — find your network: <code>aws ec2 describe-vpcs</code>. Every resource lives inside a VPC.' },
 { c: 'aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro', t: '<b>Step 3 / 6</b> — launch compute: <code>aws ec2 run-instances</code>. A virtual server spins up in your VPC.' },
 { c: 'aws ec2 describe-instances', t: '<b>Step 4 / 6</b> — see what\'s running: <code>aws ec2 describe-instances</code>. State, type, IP — your fleet at a glance.' },
 { c: 'aws s3 mb s3://my-artifacts-bucket', t: '<b>Step 5 / 6</b> — create storage: <code>aws s3 mb</code> makes a bucket. Global namespace — names must be unique worldwide.' },
 { c: 'aws s3 ls', t: '<b>Step 6 / 6</b> — list your buckets: <code>aws s3 ls</code>. The S3 equivalent of <code>ls</code>.' }];
function coach() {
 const el = $('coach'); if (!el) return;
 el.innerHTML = S.step >= STEPS.length
  ? '<b>All 6 done 🎉</b> — sts → vpc → ec2 → s3 is the daily loop. Free play: <code>aws s3 cp file.txt s3://my-artifacts-bucket/</code>, <code>aws ec2 terminate-instances</code>… then hit <b>Next</b>.'
  : STEPS[S.step].t;
}
function chips() {
 const b = $('chips'); if (!b) return; b.innerHTML = '';
 const L = [];
 if (S.step < STEPS.length) L.push([STEPS[S.step].c, 1]);
 L.push(['aws ec2 describe-security-groups', 0], ['help', 0]);
 L.forEach(([c, n]) => { const x = document.createElement('button'); x.className = 'chip' + (n ? ' go' : ''); x.textContent = c; x.onclick = () => run(c); b.appendChild(x); });
}
function draw() {
 const dz = $('dz'); if (!dz) return;
 const items = [];
 if (S.iam) items.push({ ico: '🔐', name: 'IAM User', desc: S.iam, st: 'ACTIVE' });
 if (S.vpc) items.push({ ico: '🕸️', name: 'VPC', desc: S.vpc, st: 'ACTIVE' });
 if (S.ec2) items.push({ ico: '🖥️', name: 'EC2 Instance', desc: S.ec2, st: 'RUNNING' });
 if (S.s3) items.push({ ico: '🪣', name: 'S3 Bucket', desc: S.s3, st: 'ACTIVE' });
 dz.innerHTML = items.length ? '' : '<div class="none">Empty. Sign in first.</div>';
 items.forEach(r => {
  const d = document.createElement('div'); d.className = 'res';
  d.innerHTML = '<span class="ico">' + r.ico + '</span><div><b>' + r.name + '</b><small>' + r.desc + '</small></div><span class="st">' + r.st + '</span>';
  dz.appendChild(d);
 });
 $('hbc').textContent = items.length ? items.length + ' resources discovered' : '';
 chips();
}
const adv = i => { if (S.step === i) { S.step++; coach(); chips(); } };
async function run(raw) {
 E(raw); if ($('tin')) $('tin').value = '';
 const t = raw.trim().split(/\s+/);
 if (t[0] === 'help') return P('sts get-caller-identity · ec2 describe-vpcs · ec2 run-instances · ec2 describe-instances · s3 mb · s3 ls · s3 cp · clear', 'cy');
 if (t[0] === 'clear') return $('tout').innerHTML = '';
 if (t[0] !== 'aws') return P(t[0] + ': not found — commands start with "aws" (or: help)', 'err');
 const svc = t[1], cmd = t[2];
 if (svc === 'sts' && cmd === 'get-caller-identity') {
  await wait(280);
  const acct = aid();
  P('{', 'dim');
  P('    "UserId": "AIDAXXXXXXXXXXXXXXXX",', 'cy');
  P('    "Account": "' + acct + '",', 'cy');
  P('    "Arn": "arn:aws:iam::' + acct + ':user/dev-alice"', 'cy');
  P('}', 'dim');
  S.iam = 'dev-alice · account ' + acct; draw(); adv(0); return;
 }
 if (svc === 'ec2' && cmd === 'describe-vpcs') {
  await wait(300);
  P('{', 'dim');
  P('    "Vpcs": [{', 'cy');
  P('        "VpcId": "vpc-0a1b2c3d",', 'cy');
  P('        "CidrBlock": "10.0.0.0/16",', 'cy');
  P('        "State": "available"', 'cy');
  P('    }]', 'cy');
  P('}', 'dim');
  S.vpc = 'vpc-0a1b2c3d · 10.0.0.0/16'; draw(); adv(1); return;
 }
 if (svc === 'ec2' && cmd === 'run-instances') {
  await wait(350);
  const id = rid();
  P('Launching instance…', 'dim'); await wait(400);
  P('{', 'dim');
  P('    "Instances": [{', 'cy');
  P('        "InstanceId": "' + id + '",', 'cy');
  P('        "InstanceType": "t3.micro",', 'cy');
  P('        "State": { "Name": "pending" }', 'cy');
  P('    }]', 'cy');
  P('}', 'dim');
  await wait(500);
  P('Instance ' + id + ' is now running ✅', 'ok');
  S.ec2 = id + ' · t3.micro · running'; draw(); adv(2); return;
 }
 if (svc === 'ec2' && cmd === 'describe-instances') {
  await wait(280);
  if (!S.ec2) { P('(no instances — run aws ec2 run-instances first)', 'dim'); return; }
  const id = S.ec2.split(' · ')[0];
  P('---------------------------------------------------------', 'dim');
  P('|  InstanceId          State    Type      PublicIp     |', 'cy');
  P('---------------------------------------------------------', 'dim');
  P('|  ' + id + '  running  t3.micro  54.' + (Math.random() * 200 | 0) + '.x.x  |', 'cy');
  P('---------------------------------------------------------', 'dim');
  adv(3); return;
 }
 if (svc === 's3' && cmd === 'mb') {
  const bucket = t[3] || 's3://my-artifacts-bucket';
  await wait(320);
  P('make_bucket: ' + bucket.replace('s3://', ''), 'ok');
  S.s3 = bucket.replace('s3://', '') + ' · us-east-1'; draw(); adv(4); return;
 }
 if (svc === 's3' && cmd === 'ls') {
  await wait(250);
  if (!S.s3) { P('(no buckets — run aws s3 mb s3://my-artifacts-bucket first)', 'dim'); return; }
  P('2026-01-15 10:30:00 ' + S.s3.split(' · ')[0], 'cy');
  adv(5); return;
 }
 if (svc === 's3' && cmd === 'cp') {
  const dest = t[t.length - 1];
  if (!S.s3) return P('No bucket yet — create one with aws s3 mb first.', 'err');
  await wait(300);
  P('upload: ./' + (t[3] || 'file.txt') + ' to ' + dest, 'ok');
  P('(simulated — nothing actually uploaded)', 'dim'); return;
 }
 if (svc === 'ec2' && cmd === 'describe-security-groups') {
  await wait(250);
  P('{ "SecurityGroups": [{ "GroupId": "sg-0abc123", "GroupName": "default", "Description": "default VPC security group" }] }', 'cy'); return;
 }
 if (svc === 'ec2' && cmd === 'terminate-instances') {
  if (!S.ec2) return P('No instances to terminate.', 'dim');
  await wait(350);
  P('Terminating ' + S.ec2.split(' · ')[0] + '…', 'dim');
  S.ec2 = null; draw();
  P('Instance terminated.', 'ok'); return;
 }
 P("aws: '" + svc + ' ' + (cmd || '') + "' — not in this simulator. Try: help", 'err');
}
document.addEventListener('keydown', e => { if (e.target.id === 'tin' && e.key === 'Enter' && e.target.value.trim()) run(e.target.value); });
P('☁️  Simulated AWS CLI. Type freely — nothing real, nothing billed.', 'cy');
P(''); draw(); coach();

/* ================= VPC SIM (slide 5) ================= */
const VPC = { pub: true, priv: true, igw: true };
function vpclog() {
 const el = $('vpclog'); if (!el) return;
 if (VPC.pub && VPC.priv && VPC.igw) el.textContent = 'Both subnets + IGW visible. Web servers in public, databases in private — the classic layout.';
 else if (!VPC.igw) el.textContent = '⚠ No Internet Gateway — public subnet can\'t reach the internet. EC2 in public subnet is isolated.';
 else if (!VPC.pub) el.textContent = 'Public subnet hidden — no internet-facing resources. Everything must go through a load balancer or VPN.';
 else if (!VPC.priv) el.textContent = 'Private subnet hidden — databases and internal APIs are invisible from outside. Safer by default.';
}
function vpcdraw() {
 $('sub-pub').classList.toggle('off', !VPC.pub);
 $('sub-priv').classList.toggle('off', !VPC.priv);
 $('igw').classList.toggle('off', !VPC.igw);
 vpclog();
}
[['pub', 'tg-pub'], ['priv', 'tg-priv'], ['igw', 'tg-igw']].forEach(([k, id]) => {
 const btn = $(id);
 if (!btn) return;
 btn.onclick = () => { VPC[k] = !VPC[k]; btn.classList.toggle('onn', VPC[k]); vpcdraw(); };
});
vpcdraw();

/* ================= EC2 + S3 SIM (slide 6) ================= */
let inst = null, uploaded = false;
$('launchbtn').onclick = async () => {
 if (inst) { $('ec2log').textContent = 'Instance already running — terminate it first (reload to reset).'; return; }
 $('ec2log').textContent = 'Launching t3.micro in vpc-0a1b2c3d…';
 await wait(400);
 const id = rid();
 const ip = '54.' + (Math.random() * 200 | 0) + '.' + (Math.random() * 200 | 0) + '.' + (Math.random() * 200 | 0);
 inst = { id, ip };
 $('instgrid').innerHTML = '';
 const d = document.createElement('div'); d.className = 'inst';
 d.innerHTML = '<span class="led"></span><div><b>' + id + '</b><small>t3.micro · running · vpc-0a1b2c3d</small></div><span class="ip">' + ip + '</span>';
 $('instgrid').appendChild(d);
 $('ec2log').innerHTML = '<b>Running ✅</b> — SSH would be: <code>ssh -i key.pem ec2-user@' + ip + '</code>';
 $('uploadbtn').disabled = false;
 $('s3log').textContent = 'Instance is up. Upload the build artifact to S3.';
};
$('uploadbtn').onclick = async () => {
 if (!inst) return;
 $('s3log').textContent = 'Uploading build.tar.gz…';
 await wait(350);
 $('bucketviz').innerHTML = '';
 const o1 = document.createElement('div'); o1.className = 'obj'; o1.textContent = '📄 build.tar.gz · 12.4 MB · just now';
 $('bucketviz').appendChild(o1);
 const o2 = document.createElement('div'); o2.className = 'obj'; o2.textContent = '📄 deploy.log · 2.1 KB · just now';
 $('bucketviz').appendChild(o2);
 uploaded = true;
 $('s3log').innerHTML = '<b>Uploaded ✅</b> — <code>aws s3 cp build.tar.gz s3://my-artifacts-bucket/</code> complete. Artifact safe even if EC2 dies.';
};

/* ================= CHEAT (slide 8) ================= */
const CHEAT = [
 ['aws sts get-caller-identity', 'who am I? — start here'],
 ['aws configure list', 'check your credentials'],
 ['aws ec2 describe-instances', 'list running servers'],
 ['aws ec2 run-instances --image-id AMI --instance-type t3.micro', 'launch a server'],
 ['aws ec2 terminate-instances --instance-ids ID', 'shut one down'],
 ['aws ec2 describe-vpcs', 'see your network'],
 ['aws ec2 describe-security-groups', 'list firewall rules'],
 ['aws s3 ls', 'list all buckets'],
 ['aws s3 mb s3://my-bucket', 'create a bucket'],
 ['aws s3 cp file.txt s3://my-bucket/', 'upload a file'],
 ['aws s3 sync ./dist s3://my-bucket/', 'sync a folder'],
 ['aws s3 rm s3://my-bucket/file.txt', 'delete an object'],
 ['aws iam list-users', 'see IAM users'],
 ['aws logs tail /aws/lambda/my-fn --follow', 'stream CloudWatch logs'],
 ['aws ce get-cost-and-usage', 'check what you spent']];
CHEAT.forEach(([c, w]) => {
 const b = document.createElement('button'); b.className = 'cc';
 b.innerHTML = '<div><code></code><small>' + w + '</small></div><span class="cp">COPY</span>';
 b.querySelector('code').textContent = c;
 b.onclick = () => { if (navigator.clipboard) navigator.clipboard.writeText(c); b.classList.add('copied'); b.querySelector('.cp').textContent = '✓'; toast('Copied — ' + c); setTimeout(() => { b.classList.remove('copied'); b.querySelector('.cp').textContent = 'COPY'; }, 1500); };
 $('cheat').appendChild(b);
});

};

DeckEngine.init(SLIDES);
