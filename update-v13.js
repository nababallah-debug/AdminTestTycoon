/* Space Mining Tycoon v13 — couche "game feel".
   Ne modifie ni game.js, ni la sauvegarde (space-mining-v11), ni les formules d'économie.
   Ses propres données (série, son) sont dans une clé séparée : space-mining-v13-extra. */
(()=>{
const XK='space-mining-v13-extra',X={streak:0,lastDaily:'',sound:true,crits:0,goldens:0};
try{Object.assign(X,JSON.parse(localStorage.getItem(XK)||'{}'));}catch(e){}
const sv=()=>{try{localStorage.setItem(XK,JSON.stringify(X));}catch(e){}};
const $=id=>document.getElementById(id),rnd=(a,b)=>a+Math.random()*(b-a);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
const CRIT=.05; // 5 % de chance de coup critique (x5 sur ce tap)
let ac,lp={x:innerWidth/2,y:innerHeight/2};
document.addEventListener('pointerdown',e=>{lp={x:e.clientX,y:e.clientY};},true);

function beep(f,d=.07,t='sine',v=.03){if(!X.sound)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,ac.currentTime);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d);}catch(e){}}
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n);}catch(e){}};
const fx=el('div');fx.id='fx';document.body.appendChild(fx);
function pop(x,y,txt,c){const e=el('div','pop '+(c||''),txt);e.style.left=x+'px';e.style.top=y+'px';fx.appendChild(e);setTimeout(()=>e.remove(),900);}
function burst(x,y,n=8,em=['✨','💫','⭐']){for(let i=0;i<n;i++){const p=el('div','spark',em[i%em.length]),a=Math.random()*6.28,d=rnd(30,95);p.style.left=x+'px';p.style.top=y+'px';p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');fx.appendChild(p);setTimeout(()=>p.remove(),700);}}

/* ---------- Minage : orbe tactile, critiques, frénésie ---------- */
const card=document.querySelector('.mine-card'),orb=document.querySelector('.mine-orb');
function hit(x,y,viaOrb){
  if(viaOrb)mine();
  const crit=Math.random()<CRIT;
  if(crit){earn(clickPower()*4);X.crits++;sv();}
  pop(x,y-10,'+'+fmt(clickPower()*(crit?5:1)),crit?'crit':'');
  if(crit){burst(x,y,10);beep(880,.15,'triangle',.06);buzz(25);}else beep(300+s.combo*25,.04,'sine',.02);
  orb.classList.remove('hit');void orb.offsetWidth;orb.classList.add('hit');
  card.classList.toggle('frenzy',s.combo>=12);
}
const ctr=()=>{const r=orb.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};};
$('mineBtn').addEventListener('click',e=>{const c=ctr();hit(e.clientX||c.x,e.clientY||c.y,false);});
orb.addEventListener('click',e=>{const c=ctr();hit(e.clientX||c.x,e.clientY||c.y,true);});

/* ---------- Meilleur investissement + barre de niveau ---------- */
const goal=el('div','goal-card','<div class="g-top"><span>⚡ MEILLEUR INVESTISSEMENT</span><b id="gPct"></b></div><div class="g-name" id="gName"></div><div class="bar2"><i id="gBar"></i></div><button class="wide secondary" id="gBtn" hidden></button><div class="g-top lv"><span id="gLv"></span><b id="gXp"></b></div><div class="bar2 xp"><i id="gXpBar"></i></div>');
$('screen-mine').insertBefore(goal,document.querySelector('#screen-mine .quick-grid'));
let gB=-1;
$('gBtn').onclick=()=>{if(gB>=0){lp=ctr();buyBuilding(gB);}};
function refreshGoal(){
  let best=null;
  if(planetUnlocked(selectedWorld))buildingList(selectedWorld).forEach((b,i)=>{const c=buildingCost(selectedWorld,i),r=baseProd(selectedWorld,i)/c;if(!best||r>best.r)best={i,c,r,n:b[0],ic:b[1]};});
  const btn=$('gBtn');
  if(best){
    const pct=Math.min(100,s.money/best.c*100),gain=baseProd(selectedWorld,best.i)*WORLDS[selectedWorld][3]*prestigeMult()*globalMult()*autoMult()*incomeMult();
    gB=best.i;$('gName').textContent=best.ic+' '+best.n+' · +'+fmt(gain)+'/s';$('gPct').textContent=Math.floor(pct)+'% de '+fmt(best.c);$('gBar').style.width=pct+'%';
    goal.classList.toggle('ready',pct>=100);btn.hidden=pct<100;btn.textContent='ACHETER MAINTENANT';
  }else{gB=-1;$('gName').textContent='Débloque cette planète pour investir';$('gPct').textContent='';$('gBar').style.width='0%';btn.hidden=true;goal.classList.remove('ready');}
  const L=s.level,lo=80*(L-1)**2,hi=80*L*L;
  $('gLv').textContent='NIVEAU '+L;$('gXp').textContent=Math.floor(Math.max(0,Math.min(1,(s.xp-lo)/(hi-lo)))*100)+'%';$('gXpBar').style.width=Math.max(0,Math.min(100,(s.xp-lo)/(hi-lo)*100))+'%';
}

/* ---------- Astéroïde doré : bonus aléatoire à attraper ---------- */
function golden(){
  setTimeout(golden,rnd(70,160)*1000);
  if(document.hidden)return;
  const g=el('button','golden','☄️');g.setAttribute('aria-label','Astéroïde doré');g.style.top=rnd(16,60)+'vh';g.style.setProperty('--t',rnd(5,8)+'s');
  g.onclick=e=>{
    const gain=Math.max(autoRate()*rnd(40,120),clickPower()*80),c=Math.random()<.12;
    earn(gain);if(c)s.crystals++;X.goldens++;sv();save();
    const x=e.clientX||lp.x,y=e.clientY||lp.y;pop(x,y,'+'+fmt(gain)+(c?' +1💎':''),'crit');burst(x,y,14,['💰','✨','⭐']);beep(740,.2,'triangle',.06);beep(1100,.25,'sine',.04);buzz([20,30,20]);uiHeader();g.remove();
  };
  fx.parentNode.appendChild(g);setTimeout(()=>g.remove(),9000);
}
setTimeout(golden,25000);

/* ---------- Récompense quotidienne + retour hors-ligne ---------- */
const DAILY=[[5,0],[10,0],[20,1],[30,1],[45,2],[60,2],[90,5]]; // [minutes de production, cristaux]
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
function dailyState(){
  const t=today();if(X.lastDaily===t)return{ready:false};
  const gap=X.lastDaily?Math.round((new Date(t)-new Date(X.lastDaily))/864e5):99,streak=gap===1?X.streak:0;
  return{ready:true,streak,day:streak%7};
}
const dailyGain=r=>Math.max(autoRate()*r[0]*60,clickPower()*300);
function modal(html){
  let m=$('v13m');if(!m){m=el('div','modal hidden');m.id='v13m';document.body.appendChild(m);}
  m.innerHTML='<div class="modal-card">'+html+'</div>';m.classList.remove('hidden');
  m.onclick=e=>{if(e.target===m||e.target.dataset.x)m.classList.add('hidden');};return m;
}
function welcome(){
  const d=dailyState(),off=typeof offlineBonus!=='undefined'?offlineBonus:0,c=d.ready?d.day:(X.streak-1)%7,r=DAILY[c];
  const days=DAILY.map((q,i)=>'<div class="day '+(i===c&&d.ready?'cur':(i<c||(i===c&&!d.ready)?'done':''))+'">J'+(i+1)+'<br>'+(q[1]?'💎'+q[1]:'💰')+'</div>').join('');
  const m=modal('<h2>🎁 Bon retour, '+esc(s.nickname)+' !</h2>'+(off>0?'<p class="off">🌙 Pendant ton absence : <b>+'+fmt(off)+'</b></p>':'')+'<p>🔥 Série : <b>'+(d.ready?d.streak:X.streak)+'</b> jour(s). Reviens chaque jour pour garder ta série et gagner plus.</p><div class="days">'+days+'</div><button class="wide primary" id="dClaim"'+(d.ready?'':' disabled')+'>'+(d.ready?'RÉCLAMER +'+fmt(dailyGain(r))+(r[1]?' +'+r[1]+'💎':''):'REVIENS DEMAIN')+'</button><button class="wide secondary" data-x="1">Fermer</button>');
  m.querySelector('#dClaim').onclick=()=>{
    const q=dailyState();if(!q.ready)return;const rr=DAILY[q.day];
    earn(dailyGain(rr));if(rr[1])s.crystals+=rr[1];X.streak=q.streak+1;X.lastDaily=today();sv();save();uiHeader();syncCloud(true);
    burst(innerWidth/2,innerHeight/2,18,['💰','💎','✨']);beep(660,.12,'triangle',.05);setTimeout(()=>beep(990,.2,'triangle',.05),120);buzz(30);welcome();
  };
}
const top=document.querySelector('.topbar'),acc=$('accountBtn'),wrap=el('div','top-actions'),
  snd=el('button','icon-btn',X.sound?'🔊':'🔇'),gift=el('button','icon-btn','🎁');
snd.setAttribute('aria-label','Son');gift.setAttribute('aria-label','Récompense quotidienne');
snd.onclick=()=>{X.sound=!X.sound;snd.textContent=X.sound?'🔊':'🔇';sv();beep(500);};gift.onclick=welcome;
top.appendChild(wrap);wrap.append(snd,gift,acc);

/* ---------- Retours sensoriels sur les actions existantes ---------- */
const _b=buyBuilding;buyBuilding=function(b){const k=selectedWorld+'-'+b,n=s.buildings[k]||0;_b(b);const m=s.buildings[k]||0;
  if(m>n){beep(620,.07,'square',.025);buzz(8);burst(lp.x,lp.y,m%10?4:16);if(m%10===0){toast('🏆 Palier '+m+' atteint !');beep(990,.2,'triangle',.05);}}};
const _m=claimMission;claimMission=function(id){const o=!!s.missions[id];_m(id);if(!o&&s.missions[id]){burst(lp.x,lp.y,12,['💰','✨','⭐']);beep(760,.18,'triangle',.05);buzz(20);}};
const _w=claimWeekly;claimWeekly=function(id){const o=!!s.weekly.claimed[id];_w(id);if(!o&&s.weekly.claimed[id]){burst(lp.x,lp.y,12,['💰','✨','⭐']);beep(760,.18,'triangle',.05);buzz(20);}};
const _r=doResearch;doResearch=function(id){const o=!!s.research[id];_r(id);if(o===false&&s.research[id]){burst(lp.x,lp.y,12,['🧪','✨','💠']);beep(520,.2,'triangle',.05);buzz(15);}};
const _p=doPrestige;doPrestige=function(){const o=s.prestige;_p();if(s.prestige>o){fx.parentNode.appendChild(el('div','flash'));setTimeout(()=>document.querySelector('.flash')?.remove(),1000);burst(innerWidth/2,innerHeight/2,24,['👑','✨','⭐']);beep(440,.3,'triangle',.06);setTimeout(()=>beep(880,.4,'triangle',.06),200);buzz([30,40,60]);}};

/* ---------- Boucle d'ambiance (500 ms) ---------- */
let lvl=s.level,tick=0;
setInterval(()=>{
  tick++;if(document.hidden)return;
  refreshGoal();
  const ic=$('mineIcon'),p=WORLDS[selectedWorld][0];if(ic&&ic.textContent!==p)ic.textContent=p;
  if(s.combo<12)card.classList.remove('frenzy');
  if(s.level>lvl){lvl=s.level;burst(innerWidth/2,innerHeight/3,16);beep(523,.12,'triangle',.05);setTimeout(()=>beep(784,.2,'triangle',.05),120);}
  gift.classList.toggle('dot',dailyState().ready);
  if(tick%3===0&&currentScreen==='mine'&&autoRate()>0){const c=ctr();pop(c.x+rnd(-40,40),c.y-50,'+'+fmt(autoRate()*1.5),'auto');}
},500);

gift.classList.toggle('dot',dailyState().ready);
const off0=typeof offlineBonus!=='undefined'?offlineBonus:0;
if(dailyState().ready||off0>0)setTimeout(welcome,900);
})();
