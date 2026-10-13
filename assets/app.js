const CONTACT_PHONE='79890824121';
const PRICES={gas:750,brick:1000,concrete:1500,line:1500,facade:1500,extra:750,install:7000};
const cur=new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0});
const money=n=>cur.format(Math.round(n))+' ₽';
const wa=(message)=>'https://wa.me/'+CONTACT_PHONE+'?text='+encodeURIComponent(message);
document.querySelectorAll('[data-wa]').forEach(el=>el.setAttribute('href',wa(el.dataset.wa||'Здравствуйте! Нужна консультация по климатическому оборудованию.')));
const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const expanded=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'✕':'☰'});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}))}
const form=document.getElementById('trace-calculator');
if(form){
let rooms=[{name:'Комната 1',line:4,wall:'concrete',stroke:2,facade:1,extra:0,installation:false}],active=0;
const tabs=document.getElementById('room-tabs'),inputs={line:document.getElementById('line-m'),wall:document.getElementById('wall-type'),stroke:document.getElementById('stroke-m'),facade:document.getElementById('facade-n'),extra:document.getElementById('extra-n'),installation:document.getElementById('installation')},sum=document.getElementById('calc-amount'),details=document.getElementById('calc-details'),send=document.getElementById('calc-send'),copy=document.getElementById('calc-copy');
function bounded(n,min=0,max=2000){const v=Number(n);return Number.isFinite(v)?Math.max(min,Math.min(max,v)):0}
function unit(r){return bounded(r.line)*PRICES.line+bounded(r.stroke)*PRICES[r.wall]+bounded(r.facade,0,20)*PRICES.facade+bounded(r.extra,0,20)*PRICES.extra+(r.installation?PRICES.install:0)}
function snapshot(){const r=rooms[active];r.line=bounded(inputs.line.value);r.wall=['gas','brick','concrete'].includes(inputs.wall.value)?inputs.wall.value:'concrete';r.stroke=bounded(inputs.stroke.value);r.facade=Math.floor(bounded(inputs.facade.value,0,20));r.extra=Math.floor(bounded(inputs.extra.value,0,20));r.installation=inputs.installation.checked}
function draw(){tabs.innerHTML='';rooms.forEach((r,i)=>{const b=document.createElement('button');b.type='button';b.className='room-tab'+(i===active?' active':'');b.textContent=r.name;b.addEventListener('click',()=>{snapshot();active=i;draw()});tabs.appendChild(b)});const r=rooms[active];inputs.line.value=r.line;inputs.wall.value=r.wall;inputs.stroke.value=r.stroke;inputs.facade.value=r.facade;inputs.extra.value=r.extra;inputs.installation.checked=r.installation;recalc()}
function recalc(){snapshot();const total=rooms.reduce((s,r)=>s+unit(r),0);sum.textContent=money(total);details.textContent=rooms.length+' комн. · трасса '+rooms.reduce((s,r)=>s+Number(r.line),0)+' м · предварительная стоимость';return total}
Object.values(inputs).forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',recalc));
document.getElementById('room-add').addEventListener('click',()=>{if(rooms.length>=12){alert('В калькуляторе максимум 12 комнат. Для крупного объекта запросите индивидуальную смету.');return}snapshot();rooms.push({name:'Комната '+(rooms.length+1),line:4,wall:'concrete',stroke:2,facade:1,extra:0,installation:false});active=rooms.length-1;draw()});
function quote(){recalc();return 'Здравствуйте! Прошу уточнить смету на закладку трасс.\n'+rooms.map((r,i)=>(i+1)+'. '+r.name+': трасса '+r.line+' м, штроба '+r.stroke+' м ('+({gas:'газоблок',brick:'кирпич',concrete:'монолит/бетон'}[r.wall])+'), фасадные отверстия '+r.facade+', дополнительные '+r.extra+(r.installation?', стандартный монтаж':'')+'; расчёт '+money(unit(r))).join('\n')+'\nПредварительный итог: '+money(rooms.reduce((s,r)=>s+unit(r),0))+'.\nУточните итоговую цену после согласования условий и объёма работ.'}
send.addEventListener('click',()=>window.open(wa(quote()),'_blank','noopener'));
copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(quote());copy.textContent='✓ Скопировано';setTimeout(()=>copy.textContent='Скопировать смету',2000)}catch(e){copy.textContent='Используйте WhatsApp'}});
draw();
}
const toTop=document.querySelectorAll('[data-current-year]');toTop.forEach(el=>el.textContent=new Date().getFullYear());