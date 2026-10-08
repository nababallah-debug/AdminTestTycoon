const SUPABASE_URL='https://gvyeooqemajnvfbgnagv.supabase.co';
const SUPABASE_KEY='sb_publishable_moYDSTJplgl9XPCiKR96b_CPt3MJ7z';
const sb=window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY)||null;

const KEY='space-mining-v2-test';
const OLD_KEYS=['space-mining-v11','space-mining-v10','space-mining-v9','space-mining-v8','space-mining-v7','space-mining-v6','space-mining-v5','space-mining-v4','space-mining-v3','space-mining-v2'];

const WORLDS=[
 ['🌑','Astéroïde Nova',0,1],['🔴','Mars',1e6,1.6],['🪐','Saturne',5e7,2.4],['💠','Nébuleuse Azur',5e9,3.5],
 ['🌌','Trou noir',1e12,5],['☀️','Étoile Helios',1e14,7.5],['🌀','Dimension X',1e16,11],['🌊','Océan de Nyx',1e18,16],
 ['💎','Géode Prime',1e21,24],['🧊','Crypte d’Oort',1e24,36],['🧿','Singularité Oméga',1e28,55],['✨','Cœur de l’Univers',1e32,85],
 ['🌠','Vespera',5e35,120],['🟣','Nébuleuse Éclipse',2e39,170],['🌟','Quasar Aether',1e43,240],['🔷','Cristallia',5e46,340],
 ['🌋','Forge Stellaire',2e50,480],['🕳️','Abîme Primordial',1e54,680],['🌌','Galaxie Némésis',5e57,950],['🪐','Titania X',2e61,1300],
 ['⚡','Orage Cosmique',1e65,1800],['🌙','Lune Spectrale',5e68,2500],['💫','Puits de Pulsar',2e72,3500],['☄️','Couronne des Comètes',1e76,5000],
 ['🧬','Matrice Cosmique',5e79,7000],['🔱','Royaume des Titans',2e83,10000],['🧿','Œil de l’Éternité',1e87,14000],
 ['♾️','Nexus Infini',5e90,20000],['🪩','Mégasphère',2e94,28000],['🛸','Frontière Omniverselle',1e98,40000],
 ['🌌','Mer des Univers',5e101,56000],['✨','Trône de la Création',1e105,80000]
];

const BUILDING_ROLES=[
 ['extracteur','Extracteur','⛏️'],['mineur','Mineur','🤖'],['raffinerie','Raffinerie','🏭'],['station','Station','🛰️'],
 ['cargo','Flotte cargo','🚚'],['gravite','Extracteur gravitationnel','🧲'],['energie','Collecteur énergétique','☀️'],['portail','Portail quantique','🌀'],
 ['forge','Forge avancée','⚛️'],['anneau','Anneau de singularité','💫'],['matiere','Usine de matière noire','🌑'],['noyau','Noyau d’assemblage','🔮']
];
const PLANET_THEMES=[
 'Nova','Martienne','Saturnienne','Azur','Singulière','Hélios','Dimensionnelle','Néxienne','Cristalline','Oortienne','Oméga','Universelle',
 'Vesperienne','Éclipse','Aethérienne','Cristallienne','Stellaire','Primordiale','Némésienne','Titanienne','Orageuse','Spectrale','Pulsar','Cométaire',
 'Cosmique','Titanique','Éternelle','Infinie','Mégasphérique','Omniverselle','Universale','Créatrice'
];
const PLANET_PREFIX=[
 'de surface','de forage','orbitale','de collecte','abyssale','solaire','dimensionnelle','océanique','cristalline','du nuage','singulière','universelle',
 'de phase','d’éclipse','de quasar','de prisme','thermonucléaire','du néant','galactique','titanesque','ionique','lunaire','pulsar','cométaire',
 'matricielle','titanique','éternelle','infinie','mégastructurée','omniverselle','intergalactique','de création'
];
const ROLE_WORDS=['Extracteur','Unité minière','Raffinerie','Base orbitale','Convoi','Ancre gravitationnelle','Collecteur','Passerelle quantique','Forge','Anneau','Usine de matière noire','Noyau'];
function buildingSet(w){
 const theme=PLANET_THEMES[w], prefix=PLANET_PREFIX[w];
 return BUILDING_ROLES.map((r,i)=>[`${r[1]} ${theme} ${prefix}`.replace(/  /g,' '),r[2]]);
}

const BRANCHES={
 extraction:[['laser','Laser industriel',5e6,'+50% puissance de clic'],['plasma','Foreuses plasma',2e8,'+80% puissance de clic'],['abyss','Forage abyssal',5e11,'x2 clic'],['stellar','Extraction stellaire',5e15,'x3 clic'],['voidmine','Mine du Vide',5e21,'x5 clic']],
 automation:[['ai','IA autonome',2.5e8,'+40% production'],['robots','Essaim robotique',1e10,'+80% production'],['nano','Nanobots industriels',2e13,'+120% production'],['quantum','Calcul quantique',1e18,'x3 production'],['dyson','Réseau Dyson',2e25,'x6 production']],
 energy:[['reactor','Réacteur quantique',2e10,'x1,6 production globale'],['fusion','Fusion contrôlée',2e15,'x2 production globale'],['antimatter','Réacteur antimatière',5e22,'x2,5 production globale'],['singularity','Moteur de singularité',1e28,'x3 production globale'],['deep','Conduit du Vide',5e46,'x6 production globale']],
 economy:[['logistics','Logistique zéro-g',2e11,'-8% coûts bâtiments'],['market','Marché galactique',2e18,'+20% revenus'],['fractal','Économie fractale',1e31,'-15% coûts'],['trade','Réseau commercial',5e36,'-20% coûts'],['galaxy','Marché galactique',1e45,'+50% revenus']],
 exploration:[['survey','Cartographie orbitale',1e7,'-10% seuils de planète'],['colonies','Colonies avancées',1e12,'+25% bonus planétaire'],['wormholes','Routes par trous de ver',1e22,'+50% exploration'],['dimensions','Navigation dimensionnelle',1e35,'accès aux secteurs avancés'],['ascension','Architecture d’ascension',5e49,'+50% bonus de prestige']]
};
const BRANCH_ORDER=Object.keys(BRANCHES);
const DAILY_REWARDS=[5e7,1e8,5e8,1e9];
const DAILY_TEMPLATES=[
 [['click','Forage régulier',250],['build','Petit chantier',15],['earn','Production du jour',2.5e8],['spend','Investissement',1e9]],
 [['click','Forage soutenu',500],['build','Constructeur',30],['earn','Mineur acharné',1e9],['spend','Dépenses industrielles',5e9]],
 [['click','Marathon minier',900],['build','Expansion',60],['earn','Gros rendement',1e10],['spend','Empire industriel',5e10]],
 [['click','Frénésie cosmique',1500],['build','Cent structures',100],['earn','Milliardaire du jour',1e11],['spend','Investisseur galactique',5e11]]
];
const CAMPAIGN=[
 ['first','Premier forage','click',1,250],['collector','Petit capital','lifetime',1e6,2500],['factory','Première usine','build',10,10000],['operator','Opérateur industriel','build',100,75000],
 ['millionaire','Millionnaire','lifetime',1e9,5e5],['billionaire','Milliardaire','lifetime',1e12,2.5e7],['researcher','Chercheur','tech',5,2.5e8],['veteran','Vétéran','level',25,5e8],
 ['tycoon','Magnat galactique','lifetime',1e16,5e9],['legend','Légende','prestige',5,2.5e10],['empire','Empire spatial','build',1000,1e11],
 ['explorer','Premier saut','world',3,5e8],['pionnier','Pionnier galactique','world',8,2e10],['architect','Architecte cosmique','build',2500,5e12],['scientist','Maître scientifique','tech',15,1e13],
 ['veteran2','Amiral minier','world',16,1e15],['creator','Maître des secteurs','world',24,1e20],['omniverse','Frontière omniverselle','world',32,1e30],['industrial','Machine industrielle','build',10000,1e25],['ascendant','Ascendant','prestige',10,1e30]
];
const WEEKLY=[
 ['week_click','Frénésie de forage','click',2500,1e6],['week_build','Semaine industrielle','build',75,5e6],['week_earn','Mineur acharné','run',1e11,2.5e7],['week_spend','Investisseur','spend',1e12,1e8],
 ['week_world','Explorateur','world',5,5e8],['week_tech','Laboratoire galactique','tech',5,2.5e9],['week_build2','Grand chantier','build',500,1e10],['week_earn2','Production massive','run',1e15,5e10]
];


const EVENTS=[
 ['meteor','Pluie de météorites','☄️','Production globale augmentée de 35%.','prod',1.35,12],
 ['solar','Éruption solaire','☀️','Les systèmes énergétiques produisent 50% de plus.','prod',1.50,10],
 ['quantum','Faille quantique','🌀','Les revenus manuels sont doublés.','click',2,8],
 ['crystal','Averse cristalline','💎','Les gains de cristaux sont multipliés.','crystal',3,15],
 ['cargo','Convoi de cargos','🚚','Les constructions coûtent 25% moins cher.','cost',.75,18],
 ['ai','Surcadence IA','🤖','La production automatique est doublée.','prod',2,9],
 ['gravity','Anomalie gravitationnelle','🧲','Les gains manuels sont multipliés par 2,5.','click',2.5,11],
 ['trade','Marché en folie','📈','Les revenus de toutes les sources augmentent de 50%.','income',1.5,20],
 ['void','Souffle du Vide','🌑','La production avancée est fortement accélérée.','prod',1.8,7],
 ['storm','Tempête cosmique','⚡','Les extracteurs manuels sont surchargés.','click',2.2,12]
];
const ACHIEVEMENTS=[
 ['click100','Premiers pas','Effectuer 100 extractions','clicks',100,2e6],
 ['click1000','Mineur acharné','Effectuer 1 000 extractions','clicks',1000,2e7],
 ['build100','Ingénieur','Installer 100 bâtiments','build',100,5e7],
 ['build1000','Architecte','Installer 1 000 bâtiments','build',1000,5e9],
 ['wealth1e9','Fortune locale','Atteindre 1 Md de crédits cumulés','lifetime',1e9,1e8],
 ['wealth1e15','Magnat stellaire','Atteindre 1 Qa de crédits cumulés','lifetime',1e15,1e12],
 ['tech10','Chercheur confirmé','Débloquer 10 technologies','tech',10,1e9],
 ['tech20','Maître scientifique','Débloquer 20 technologies','tech',20,1e12],
 ['world8','Pionnier','Débloquer 8 secteurs','world',8,5e9],
 ['world16','Amiral','Débloquer 16 secteurs','world',16,1e15],
 ['world32','Maître de la galaxie','Débloquer les 32 secteurs','world',32,1e30],
 ['prestige5','Ascendant','Atteindre le prestige 5','prestige',5,2.5e11]
];
function activeEvent(){
 const e=state.event;if(!e||!e.id||Date.now()>=Number(e.activeUntil||0))return null;
 return EVENTS.find(x=>x[0]===e.id)||null;
}
function eventMult(kind){
 const e=activeEvent();if(!e)return 1;
 if(e[4]===kind||e[4]==='income'&&kind==='income')return e[5];
 return 1;
}
function scheduleEvent(){
 const now=Date.now();
 state.event.nextAt=now+(20+Math.random()*70)*60000;
 state.event.id=null;state.event.activeUntil=0;
}
function checkEvent(){
 const now=Date.now();
 if(activeEvent())return;
 if(state.event.id&&now>=state.event.activeUntil){state.event.id=null;state.event.activeUntil=0;}
 if(!state.event.nextAt){scheduleEvent();return;}
 if(now>=state.event.nextAt){
   const e=EVENTS[Math.floor(Math.random()*EVENTS.length)];
   state.event.id=e[0];state.event.activeUntil=now+e[6]*60000;
   scheduleEvent();state.event.id=e[0];state.event.activeUntil=now+e[6]*60000;
   toast(e[2]+' '+e[1]+' · '+e[3]);save();
 }
}
function offlineCap(){return 8*60*60}
function claimOffline(){
 const now=Date.now(),last=Number(state.lastAt||now);
 const seconds=Math.min(offlineCap(),Math.max(0,(now-last)/1000));
 state.lastAt=now;
 if(seconds<30){state.offlineLast=0;return 0}
 const gain=Math.max(0,autoRate()*seconds*.75);
 if(gain>0){earn(gain);state.offlineLast=gain}
 save();return gain;
}
function achievementValue(a){
 switch(a[3]){
  case'clicks':return state.clicks;
  case'build':return totalBuildings();
  case'lifetime':return state.lifetimeTotal;
  case'tech':return Object.keys(state.research).length;
  case'world':return WORLDS.filter((_,i)=>worldUnlocked(i)).length;
  case'prestige':return state.prestige;
  default:return 0;
 }
}
function checkAchievements(){
  ensureMissionState();
  let changed=false;
  ACHIEVEMENTS.forEach(a=>{
    if(achievementValue(a)>=a[4] && !state.achievements.includes(a[0])){
      state.achievements.push(a[0]);
      changed=true;
      toast('🏅 Succès débloqué : '+a[1]);
    }
  });
  if(changed)save();
}

let state=load();
let selectedWorld=Math.max(0,Math.min(WORLDS.length-1,Number(localStorage.getItem('sm-v2-world')||0)));
let screen='control';let missionTab='daily';let accountBusy=false;

function fresh(){
 const buildings={};WORLDS.forEach((_,w)=>BUILDING_ROLES.forEach((_,b)=>buildings[w+'-'+b]=0));
 return {money:0,runTotal:0,lifetimeTotal:0,prestige:0,crystals:0,buildings,research:{},xp:0,level:1,clicks:0,spent:0,
daily:{key:dateKey(),claimed:[],base:{clicks:0,lifetime:0,spent:0,buildings:0}},
weekly:{key:weekKey(),claimed:[]},
campaignClaimed:[],
achievements:[],
event:{id:null,activeUntil:0,nextAt:0},
offlineLast:0,lastAt:Date.now(),account:null};
}
function migrate(z){
 const base=fresh();z=Object.assign(base,z||{});z.buildings=Object.assign({},base.buildings,z.buildings||{});z.research=z.research||{};z.daily=z.daily||base.daily;z.weekly=z.weekly||base.weekly;
 z.prestige=Number(z.prestige)||0;z.lifetimeTotal=Number(z.lifetimeTotal)||0;z.runTotal=Number(z.runTotal)||z.money||0;z.money=Math.max(0,Number(z.money)||0);z.clicks=Number(z.clicks||z.cLICKS)||0;z.spent=Number(z.spent)||0;
z.campaignClaimed=Array.isArray(z.campaignClaimed)?z.campaignClaimed:[];
z.achievements=Array.isArray(z.achievements)?z.achievements:[];
z.achievementClaimed=Array.isArray(z.achievementClaimed)?z.achievementClaimed:[...z.achievements];
z.event=Object.assign({id:null,activeUntil:0,nextAt:0},z.event||{});
z.offlineLast=Number(z.offlineLast)||0;
z.lastAt=Number(z.lastAt)||Date.now();
 for(let w=0;w<WORLDS.length;w++)for(let b=0;b<BUILDING_ROLES.length;b++){const k=w+'-'+b;z.buildings[k]=Math.max(0,Number(z.buildings[k])||0)}
 return z;
}
function load(){try{let raw=null;for(const k of [KEY,...OLD_KEYS]){const x=localStorage.getItem(k);if(x){raw=JSON.parse(x);break}}return migrate(raw)}catch{return fresh()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function fmt(n){if(!Number.isFinite(n))return '∞';n=Math.max(0,n);if(n<1000)return Math.floor(n).toLocaleString('fr-FR');const units=['K','M','Md','Bn','T','Qa','Qi','Sx','Sp','Oc','No','Dc','Ud','Dd','Td','Qad','Qid'];const i=Math.floor(Math.log10(n)/3);return (n/10**(i*3)).toFixed(i>4?2:1)+' '+(units[i-1]||'e'+i*3)}
function dateKey(){return new Date().toISOString().slice(0,10)}
function weekKey(){const d=new Date();const day=d.getDay()||7;d.setDate(d.getDate()-day+1);return d.toISOString().slice(0,10)}
function totalBuildings(){return Object.values(state.buildings).reduce((a,b)=>a+Number(b||0),0)}
function worldUnlocked(w){return w===0||BUILDING_ROLES.every((_,b)=>(state.buildings[(w-1)+'-'+b]||0)>=1)}
function worldProgress(w){return BUILDING_ROLES.reduce((a,_,b)=>a+(state.buildings[w+'-'+b]||0),0)}
function worldFactor(w){const p=Math.min(1,worldProgress(w)/(BUILDING_ROLES.length*20));return 1+w*.22+p*(0.6+w*.06)}
function cost(w,b){
  const n=state.buildings[w+'-'+b]||0;
  const planetInflation=Math.pow(worldFactor(w),1.15);
  const sectorScale=Math.pow(5.5,b);
  const levelScale=Math.pow(1.16,n);
  // V2.4: minimum investment is deliberately much higher than its first-second income.
  return Math.ceil((1500*Math.pow(28,w)*sectorScale*levelScale)*planetInflation*eventMult('cost'));
}
function prestigeMult(){return 1+.18*state.prestige}
function techOwned(id){return !!state.research[id]}
function prodMult(){let m=1+state.prestige*.18;for(const br of BRANCH_ORDER)BRANCHES[br].forEach(t=>{if(techOwned(t[0])&&['automation','energy'].includes(br))m*=br==='automation'?1.25:1.2});return m}
function clickPower(){let m=100*prestigeMult();if(techOwned('laser'))m*=1.5;if(techOwned('plasma'))m*=1.8;if(techOwned('abyss'))m*=2;if(techOwned('stellar'))m*=3;if(techOwned('voidmine'))m*=5;return m*eventMult('click')*eventMult('income')}
function baseProd(w,b){
  // V2.4 economy: lower early output and smoother progression between buildings.
  // Existing building levels are preserved; only their future income is recalculated.
  const planetScale=Math.pow(3.0,w);
  const buildingScale=Math.pow(1.85,b);
  const earlyPenalty=Math.max(.72,1-b*.025);
  const lateBoost=w>=12?Math.pow(1.13,w-11):1;
  return 20*(1+.12*w)*planetScale*buildingScale*earlyPenalty*lateBoost;
}
function autoRate(){let r=0;WORLDS.forEach((_,w)=>BUILDING_ROLES.forEach((__,b)=>r+=(state.buildings[w+'-'+b]||0)*baseProd(w,b)*WORLDS[w][3]));return r*prestigeMult()*prodMult()*eventMult('prod')*eventMult('income')}
function earn(x){if(!Number.isFinite(x)||x<=0)return;state.money+=x;state.runTotal+=x;state.lifetimeTotal+=x;state.xp+=Math.max(1,Math.floor(Math.log10(Math.max(10,x))+2));state.level=Math.floor(Math.sqrt(state.xp/80))+1}
function spend(x){state.money-=x;state.spent+=x}
function toast(t){const e=document.getElementById('toast');if(!e)return;e.textContent=t;e.classList.add('toast-show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('toast-show'),2200)}
function nav(name){screen=name;document.querySelectorAll('.screen').forEach(x=>x.classList.toggle('active',x.dataset.screen===name));document.querySelectorAll('[data-nav]').forEach(x=>x.classList.toggle('active',x.dataset.nav===name));render()}
function render(){
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
 set('money',fmt(state.money));set('rate',fmt(autoRate())+'/s');set('prestige','P'+state.prestige);set('accountName',state.account?.username||'Mineur');set('accountDot',state.account?'CLOUD':'LOCAL');
 set('heroMoney',fmt(state.money));set('heroIncome','+'+fmt(autoRate())+' / sec');set('clickPower',fmt(clickPower()));set('sectorName',WORLDS[selectedWorld][1]);set('sectorMeta','Indice industriel ×'+worldFactor(selectedWorld).toFixed(2));
 set('buildingCount',totalBuildings());set('sectorProgress',WORLDS.filter((_,i)=>worldUnlocked(i)).length+' / '+WORLDS.length);set('techProgress',Object.keys(state.research).length);set('missionProgress',CAMPAIGN.filter(m=>missionValue(m)>=m[3]).length);set('buildingSector',WORLDS[selectedWorld][1]);set('sectorCount',WORLDS.filter((_,i)=>worldUnlocked(i)).length+' / '+WORLDS.length);set('techCount',Object.values(BRANCHES).reduce((a,b)=>a+b.length,0)+' technologies');
 set('missionCount',CAMPAIGN.filter(m=>missionValue(m)>=m[3]).length+' / '+CAMPAIGN.length+' · '+state.achievements.length+'/'+ACHIEVEMENTS.length+' succès');const ev=activeEvent();set('eventStrip',ev?`${ev[2]} ${ev[1]} · ${ev[3]} · encore ${Math.max(1,Math.ceil((state.event.activeUntil-Date.now())/60000))} min`:'Aucun phénomène détecté.');
 renderBuildings();renderMap();renderTech();renderMissions();renderDailyPreview();renderPrestige();renderAccount();
}
function renderBuildings(){
 const box=document.getElementById('buildingList');if(!box)return;const w=WORLDS[selectedWorld];
 if(!worldUnlocked(selectedWorld)){box.innerHTML='<div class="panel"><b>SECTEUR VERROUILLÉ</b><p class="hint">Termine la colonie précédente : au moins 1 unité de chaque bâtiment.</p></div>';return}
 const list=buildingSet(selectedWorld);box.innerHTML=`<div class="planet-building-head"><span>${w[0]}</span><div><strong>${w[1]}</strong><small>Les modèles changent selon le secteur. Les niveaux, prix et revenus de ta sauvegarde restent inchangés.</small></div><b>×${w[3]}</b></div>`+list.map((x,b)=>{const n=state.buildings[selectedWorld+'-'+b]||0,c=cost(selectedWorld,b),income=baseProd(selectedWorld,b)*w[3]*prestigeMult()*prodMult()*eventMult('prod')*eventMult('income');return `<article class="building"><div class="building-icon">${x[1]}</div><div class="building-info"><strong>${x[0]}</strong><small>Niveau ${n} · +${fmt(income)}/s</small><em>Prochain coût · ${fmt(c)}</em></div><button class="buy" data-buy="${b}" ${state.money<c?'disabled':''}>ACHETER</button></article>`}).join('');
}
function renderMap(){
 const box=document.getElementById('galaxyMap');if(!box)return;box.innerHTML='<div class="map-grid-lines"></div><div class="galaxy-core">✦</div>';
 const cols=8,rows=4;
 WORLDS.forEach((w,i)=>{const col=i%cols,row=Math.floor(i/cols);const el=document.createElement('button');el.className='sector-node '+(i===selectedWorld?'active ':'')+(worldUnlocked(i)?'':'locked');el.style.setProperty('--col',col+1);el.style.setProperty('--row',row+1);el.innerHTML=`<span>${w[0]}</span><small>${String(i+1).padStart(2,'0')} · ${w[1]}</small><em>×${w[3]}</em>`;el.onclick=()=>{if(worldUnlocked(i)){selectedWorld=i;localStorage.setItem('sm-v2-world',i);render()}else toast('Secteur verrouillé')};box.appendChild(el)});
 const w=WORLDS[selectedWorld];document.getElementById('sectorDetail').innerHTML=`<div class="panel-title"><b>${w[0]} ${w[1]}</b><span style="margin-left:auto">×${w[3]}</span></div><p class="hint">Secteur ${selectedWorld+1}/${WORLDS.length} · Développement ${Math.round(worldProgress(selectedWorld)/(BUILDING_ROLES.length*20)*100)}% · Indice industriel ×${worldFactor(selectedWorld).toFixed(2)} · ${worldUnlocked(selectedWorld)?'SECTEUR ACTIF':'VERROUILLÉ'}</p>`;
}
function renderTech(){
 const box=document.getElementById('techTree');if(!box)return;box.innerHTML=BRANCH_ORDER.map((br,bi)=>`<section class="tech-branch"><div class="tech-branch-head"><span>${['⛏','🤖','⚡','💰','🌌'][bi]}</span><h3>${branchName(br)}</h3></div><div class="tech-chain">${BRANCHES[br].map((t,i)=>{const prev=i?BRANCHES[br][i-1][0]:null,owned=techOwned(t[0]),available=!prev||techOwned(prev);return `<div class="tech-node ${owned?'owned':''} ${available?'':'locked'}"><div class="tech-node-dot"></div><strong>${owned?'✓ ':''}${t[1]}</strong><small>${t[3]} · ${fmt(t[2])}</small><button class="${available&&!owned?'buy':'secondary'}" data-tech="${t[0]}" ${owned||!available||state.money<t[2]?'disabled':''}>${owned?'ACQUISE':available?'RECHERCHER':'VERROUILLÉE'}</button></div>`}).join('')}</div></section>`).join('');
}
function branchName(x){return ({extraction:'EXTRACTION',automation:'AUTOMATISATION',energy:'ÉNERGIE',economy:'ÉCONOMIE',exploration:'EXPLORATION'})[x]}
function missionValue(m){switch(m[2]){case'click':return state.clicks;case'lifetime':return state.lifetimeTotal;case'run':return state.runTotal;case'build':return totalBuildings();case'spend':return state.spent;case'tech':return Object.keys(state.research).length;case'level':return state.level;case'world':return WORLDS.filter((_,i)=>worldUnlocked(i)).length;default:return 0}}
function ensureDaily(){if(state.daily.key!==dateKey())state.daily={key:dateKey(),claimed:[],base:{clicks:state.clicks,lifetime:state.lifetimeTotal,spent:state.spent,buildings:totalBuildings()}}}
function ensureWeekly(){if(state.weekly.key!==weekKey())state.weekly={key:weekKey(),claimed:[]}}
function ensureMissionState(){
  if(!Array.isArray(state.campaignClaimed))state.campaignClaimed=[];
  if(!Array.isArray(state.achievementClaimed))state.achievementClaimed=[...state.achievements];
}
function dailyValue(d){const base=state.daily.base;switch(d[0]){case'click':return state.clicks-base.clicks;case'build':return totalBuildings()-base.buildings;case'earn':return state.lifetimeTotal-base.lifetime;case'spend':return state.spent-base.spent;default:return 0}}
function dailySet(){ensureDaily();const seed=Number(dateKey().replaceAll('-',''));return DAILY_TEMPLATES.map((_,i)=>DAILY_TEMPLATES[(seed+i*7)%DAILY_TEMPLATES.length][i])}
function renderMissions(){
 ensureDaily();ensureWeekly();ensureMissionState();
 const box=document.getElementById('missionList');if(!box)return;
 if(missionTab==='daily'){
   const ds=dailySet();
   box.innerHTML=ds.map((d,i)=>missionHTML('d'+i,d[1],d[0],d[2],DAILY_REWARDS[i],state.daily.claimed.includes(i),dailyValue(d))).join('');
 }else if(missionTab==='campaign'){
   box.innerHTML=CAMPAIGN.map(m=>missionHTML(m[0],m[1],m[2],m[3],m[4],state.campaignClaimed.includes(m[0]),missionValue(m))).join('');
 }else if(missionTab==='weekly'){
   box.innerHTML=WEEKLY.map((m,i)=>missionHTML(m[0],m[1],m[2],m[3],m[4],state.weekly.claimed.includes(i),missionValue(m))).join('');
 }else{
   box.innerHTML=ACHIEVEMENTS.map(a=>{
     const claimed=state.achievementClaimed.includes(a[0]);
     const value=achievementValue(a);
     const done=value>=a[4];
     const pct=Math.min(100,(value/Math.max(1,a[4]))*100);
     return `<article class=\"mission ${claimed?'achievement-done':''}\"><div class=\"mission-head\"><strong>${claimed?'🏅':done?'●':'○'} ${a[1]}</strong><b>+${fmt(a[5])}</b></div><small>${a[2]} · ${fmt(value)} / ${fmt(a[4])}</small><div class=\"bar\"><i style=\"width:${pct}%\"></i></div><button class=\"${done&&!claimed?'primary':'secondary'}\" data-achievement=\"${a[0]}\" ${done&&!claimed?'':'disabled'}>${claimed?'RÉCLAMÉ':done?'RÉCLAMER':'EN COURS'}</button></article>`;
   }).join('');
 }
}
function missionHTML(id,title,type,need,reward,claimed,value){const done=value>=need;return `<article class="mission"><div class="mission-head"><strong>${claimed?'✓':done?'●':'○'} ${title}</strong><b>+${fmt(reward)}</b></div><small>${fmt(value)} / ${fmt(need)}</small><div class="bar"><i style="width:${Math.min(100,value/need*100)}%"></i></div><button class="${done&&!claimed?'primary':'secondary'}" data-claim="${id}" data-claim-type="${id[0]==='d'?'daily':id.startsWith('week')?'weekly':'campaign'}" ${done&&!claimed?'':'disabled'}>${claimed?'RÉCLAMÉ':done?'RÉCLAMER':'EN COURS'}</button></article>`}
function renderDailyPreview(){const box=document.getElementById('dailyPreview');if(!box)return;ensureDaily();const ds=dailySet();box.innerHTML=ds.map((d,i)=>`<div class="daily-row"><span>${state.daily.claimed.includes(i)?'✓':'○'} ${d[1]}</span><b>+${fmt(DAILY_REWARDS[i])}</b></div>`).join('')}
function renderPrestige(){const target=1e14*Math.pow(18,state.prestige);document.getElementById('prestigeBig').textContent='P'+state.prestige;document.getElementById('runTotal').textContent=fmt(state.runTotal);document.getElementById('prestigeTarget').textContent=fmt(target);document.getElementById('prestigeText').textContent=state.runTotal>=target?'Le seuil est atteint. Une nouvelle ascension est disponible.':'Continue à développer tes secteurs et ton empire pour atteindre le seuil.';document.getElementById('prestigeBtn').disabled=state.runTotal<target}
function renderAccount(){const logged=!!state.account;document.getElementById('authLoggedOut').hidden=logged;document.getElementById('authLoggedIn').hidden=!logged;document.getElementById('cloudState').textContent=logged?'COMPTE':'LOCAL';if(logged){document.getElementById('profileName').textContent=state.account.username;document.getElementById('profileEmail').textContent=state.account.email||''}}
async function createAccount(){if(accountBusy||!sb)return;accountBusy=true;try{const username=document.getElementById('usernameInput').value.trim();const password=document.getElementById('passwordInput').value;const email=document.getElementById('emailInput').value.trim();if(username.length<3||password.length<8||!email.includes('@')){toast('Pseudo 3+, mot de passe 8+, e-mail requis');return}const {data,error}=await sb.auth.signUp({email,password,options:{data:{username}}});if(error){toast(error.message);return}state.account={username,email,userId:data.user?.id||null};save();toast(data.session?'Compte créé':'Compte créé · vérifie ton e-mail');render()}finally{accountBusy=false}}
async function loginAccount(){if(accountBusy||!sb)return;accountBusy=true;try{const email=document.getElementById('emailInput').value.trim();const password=document.getElementById('passwordInput').value;const {data,error}=await sb.auth.signInWithPassword({email,password});if(error){toast(error.message);return}state.account={username:data.user.user_metadata?.username||'Mineur',email:data.user.email,userId:data.user.id};save();toast('Connexion réussie');render()}finally{accountBusy=false}}
async function logout(){if(sb)await sb.auth.signOut();state.account=null;save();render();toast('Session locale conservée')}
function buyBuilding(b){const c=cost(selectedWorld,b);if(state.money<c){toast('Crédits insuffisants');return}spend(c);const k=selectedWorld+'-'+b;state.buildings[k]=(state.buildings[k]||0)+1;state.xp+=20;save();render()}
function buyTech(id){let t=null;for(const br of BRANCH_ORDER){const found=BRANCHES[br].find(x=>x[0]===id);if(found){t=found;break}}if(!t||techOwned(id)||state.money<t[2])return;const br=BRANCH_ORDER.find(k=>BRANCHES[k].some(x=>x[0]===id));const arr=BRANCHES[br],idx=arr.findIndex(x=>x[0]===id);if(idx>0&&!techOwned(arr[idx-1][0])){toast('Technologie précédente requise');return}spend(t[2]);state.research[id]=true;state.xp+=500;save();toast('Technologie acquise');render()}
function mine(){earn(clickPower());state.clicks++;save();render();document.getElementById('mineBtn')?.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:130})}
function claim(id,type){
  ensureMissionState();
  if(type==='daily'){
    const i=Number(id.slice(1));
    const ds=dailySet();
    if(!ds[i]){toast('Mission quotidienne introuvable');return;}
    if(!state.daily.claimed.includes(i)&&dailyValue(ds[i])>=ds[i][2]){
      state.daily.claimed.push(i);
      earn(DAILY_REWARDS[i]);
      save();render();toast('📅 Mission quotidienne : +'+fmt(DAILY_REWARDS[i]));
    }
  }else if(type==='weekly'){
    const i=WEEKLY.findIndex(x=>x[0]===id);
    if(i<0){toast('Mission hebdomadaire introuvable');return;}
    if(!state.weekly.claimed.includes(i)&&missionValue(WEEKLY[i])>=WEEKLY[i][3]){
      state.weekly.claimed.push(i);
      earn(WEEKLY[i][4]);
      save();render();toast('📆 Mission hebdomadaire : +'+fmt(WEEKLY[i][4]));
    }
  }else{
    const m=CAMPAIGN.find(x=>x[0]===id);
    if(m&&!state.campaignClaimed.includes(id)&&missionValue(m)>=m[3]){
      state.campaignClaimed.push(id);
      earn(m[4]);
      save();render();toast('📜 Mission de campagne : +'+fmt(m[4]));
    }else if(m){
      toast('🎯 Objectif de campagne pas encore terminé');
    }
  }
}
function claimAchievement(id){
  ensureMissionState();
  const a=ACHIEVEMENTS.find(x=>x[0]===id);
  if(!a||state.achievementClaimed.includes(id)||achievementValue(a)<a[4])return;
  state.achievementClaimed.push(id);
  earn(a[5]);
  save();
  render();
  toast('🏅 Succès : '+a[1]+' · +'+fmt(a[5]));
}
function prestige(){const target=1e14*Math.pow(18,state.prestige);if(state.runTotal<target)return;const keep={lifetimeTotal:state.lifetimeTotal,prestige:state.prestige+1,crystals:state.crystals,research:{...state.research},xp:state.xp,level:state.level,clicks:state.clicks,spent:state.spent,account:state.account,achievements:[...state.achievements]};state=Object.assign(fresh(),keep);save();toast('Ascension réussie');render()}

document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.nav){nav(b.dataset.nav);return}if(b.id==='mineBtn'){mine();return}if(b.dataset.buy!==undefined){buyBuilding(Number(b.dataset.buy));return}if(b.dataset.tech){buyTech(b.dataset.tech);return}if(b.dataset.claim){claim(b.dataset.claim,b.dataset.claimType);return}if(b.dataset.achievement){claimAchievement(b.dataset.achievement);return}if(b.dataset.mtab){missionTab=b.dataset.mtab;document.querySelectorAll('[data-mtab]').forEach(x=>x.classList.toggle('active',x===b));renderMissions();return}if(b.id==='prestigeBtn'){prestige();return}if(b.id==='createAccount'){createAccount();return}if(b.id==='loginAccount'){loginAccount();return}if(b.id==='logoutAccount'){logout();return}});
setInterval(()=>{ensureDaily();ensureWeekly();checkEvent();checkAchievements();earn(autoRate()/4);if(document.visibilityState==='visible')render();save()},250);
if(sb)sb.auth.getSession().then(({data})=>{if(data.session){state.account={username:data.session.user.user_metadata?.username||'Mineur',email:data.session.user.email,userId:data.session.user.id};save();render()}});
const offlineGain=claimOffline();if(!state.event.nextAt)scheduleEvent();checkEvent();checkAchievements();render();

document.addEventListener('visibilitychange',()=>{
 if(document.hidden){state.lastAt=Date.now();save()}
 else{const gain=claimOffline();checkEvent();checkAchievements();render();if(gain>0)toast('🌙 Revenu hors-ligne : +'+fmt(gain))}
});
window.addEventListener('pagehide',()=>{state.lastAt=Date.now();save()});


/* V2.4 mobile interaction guard: prevent accidental double-tap page zoom. */
document.addEventListener('dblclick',e=>e.preventDefault(),{passive:false});
