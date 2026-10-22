const germanLabel=el=>window.brosGermanText?window.brosGermanText(el):el.textContent;
const ingredients=['Salat','Tomaten','Weißkraut','Rotkraut','Zwiebeln'];
const sauces=['Knoblauchsoße','Kräutersoße','Cocktailsoße','Scharfe Soße'];
const basicSauces=['Ketchup','Mayonnaise','Senf'];
const menuDrinks=['Cola','Fanta','Sprite','Uludağ','Ayran','Wasser'];
const extras=[['Käse',1],['Peperoni',1],['Jalapeños',1],['Extra Fleisch',2.5],['Extra Soße',1]];
let cart=[],current=null,mode='Abholung',payment='Barzahlung';
const deliveryServiceFee=2;
function orderAmounts(){const subtotal=cart.reduce((s,x)=>s+x.price,0),fee=mode==='Lieferung'&&cart.length?deliveryServiceFee:0;return {subtotal,fee,total:subtotal+fee}}
function updateOrderSummary(){const amounts=orderAmounts();document.querySelector('#cartTotal').textContent=euro(amounts.total);document.querySelector('#floatingTotal').textContent=euro(amounts.total);document.querySelector('#serviceFeeRow').hidden=mode!=='Lieferung'||!cart.length;document.querySelector('#serviceFeeValue').textContent=euro(amounts.fee);document.querySelector('#goodsSubtotal').textContent=euro(amounts.subtotal)}
const euro=n=>n.toLocaleString('de-DE',{style:'currency',currency:'EUR'});
const itemBasePrice=p=>p.price+(p.deposit||0);
const isHalalProduct=p=>['offer','menu','bowl','doener','dueruem','box'].includes(p.category)||p.id==='nuggets'||p.id==='extra-meat';
const grid=document.querySelector('#productGrid');

function catalogData(){const data=window.brosCatalogData||(typeof brosCatalogData!=='undefined'?brosCatalogData:{});return {...data,options:Object.fromEntries(Object.entries(data.options||{}).map(([key,value])=>[key,Array.isArray(value)?value.filter(item=>item.active!==false):value]))};}
function productImageSource(p){const image=p.configImage||p.image||'';return /^(https?:|\/)/.test(image)?image:'assets/products/'+image;}
function syncMenuCategories(){
 const nav=document.querySelector('.categories');if(!nav)return;
 const labels={daily:'Tagesgerichte'};
 for(const p of products.filter(p=>p.active!==false)){
  if([...nav.querySelectorAll('[data-filter]')].some(b=>b.dataset.filter===p.category))continue;
  const b=document.createElement('button');b.dataset.filter=p.category;b.textContent=(catalogData().categories||[]).find(c=>c.id===p.category)?.name||labels[p.category]||'Weitere Produkte';nav.append(b);
 }
}
function renderProducts(filter='all'){
 syncMenuCategories();
 grid.innerHTML=products.filter(p=>p.active!==false&&(filter==='all'||p.category===filter)).map(p=>`<article class="product visual"><div class="product-image ${p.icon?'symbol-image':''}">${p.category==='offer'||p.id==='nugget-menu'?comboPhoto(p.id):p.icon?`<span aria-hidden="true">${p.icon}</span>`:`<img src="${productImageSource(p)}" alt="${p.name}" loading="lazy">`}</div><div class="product-body"><span class="product-tag">${p.tag||''}</span>${isHalalProduct(p)?'<span class="halal-badge">✓ 100 % Halal</span>':''}<h3>${p.name}</h3><p>${p.desc||''}</p><div class="product-footer"><strong>${p.small||p.category==='menu'?'ab ':''}${euro(p.small||itemBasePrice(p))}${p.deposit?'<small> inkl. Pfand</small>':''}</strong><button data-product="${p.id}">${p.config||p.sizes?'Konfigurieren':'Hinzufügen'} +</button></div></div></article>`).join('');
}
function chip(type,value,label,checked=false,extra=''){return `<label class="chip"><input type="${type}" name="${value.startsWith('size')?'size':value.startsWith('sauce')?'sauce':value.startsWith('drink')?'drink':'option'}" value="${value}" ${checked?'checked':''} data-extra="${extra}"><span>${label}</span></label>`}
function shouldShowSizes(p){return Boolean(p.sizes)&&!p.small}
function saucePriceLabel(){return saucePricing.enabled&&saucePricing.additionalPrice>0?`<strong class="free-sauce">1. gratis</strong> · jede weitere +${euro(saucePricing.additionalPrice)}`:'Soßenauswahl kostenlos'}
function groupedCart(){
 const groups=[];
 cart.forEach((item,index)=>{const key=[item.name,item.price,item.size,item.details,item.recipient||''].join('|');const found=groups.find(group=>group.key===key);if(found){found.quantity+=1;found.indices.push(index)}else groups.push({...item,key,quantity:1,indices:[index]})});
 return groups;
}
function openConfig(id){
 current=products.find(p=>p.id===id&&p.active!==false);if(!current)return; document.querySelector('#configTitle').textContent=current.name; document.querySelector('#configDesc').textContent=current.desc; document.querySelector('#configImage').src=current.image||current.configImage?productImageSource(current):'assets/logo-premium-clean.png'; document.querySelector('#configImage').alt=current.name;
 const opts=catalogData().options||{};
 const menuDrinks=(opts.menuDrinkOptions||[]).map(x=>x.name);
 const sauces=(opts.sauceOptions||[]).map(x=>x.name);
 const basicSauces=opts.dipOptions||[];
 const extras=(opts.extraOptions||[]).filter(x=>current.category!=='box'||(opts.boxExtraIds||[]).includes(x.id)).map(x=>[x.name,x.price]);
 let html='';
 if(current.small)html+=`<div class="option-group"><h3>Portion wählen</h3><div class="chips">${chip('radio','size-large',`Ganzer Döner · ${euro(current.price)}`,true,current.price)}${chip('radio','size-small',`Halber Döner · ${euro(current.small)}`,false,current.small)}</div></div>`;
 if(shouldShowSizes(current))html+=`<div class="option-group"><h3>${current.category==='menu'||current.category==='offer'?'Variante wählen':'Menge wählen'}</h3><div class="chips">${current.sizes.map((s,i)=>chip('radio',`size-${i}`,`${s[0]} · ${euro(s[1])}`,i===0,s[1])).join('')}</div></div>`;
 if(current.drinks)html+=`<div class="option-group"><h3>Inklusivgetränk wählen</h3><div class="chips">${menuDrinks.map((x,i)=>chip('radio',`drink-${i}`,x+(opts.menuDrinkOptions[i].price>0?' · +'+euro(opts.menuDrinkOptions[i].price):''),i===0,opts.menuDrinkOptions[i].price)).join('')}</div></div>`;
 if(current.sauceMode&&current.sauceMode!=='additionalPaid'){const free=current.sauceMode==='oneFree';html+=`<div class="option-group"><h3>${free?'Dip-Soßen · 1 gratis':'Dip-Soßen'}</h3><div class="chips">${basicSauces.map((x,i)=>`<label class="chip"><input type="checkbox" name="sauce" value="basic-${i}" data-sauce-tier="basic" data-sauce-price="${x.price}"><span>${x.name}${x.price>0?` · +${euro(x.price)}`:''}</span></label>`).join('')}</div>${free?'<p class="option-hint">Eine Dip-Soße gratis, weitere zum angezeigten Aufpreis.</p>':''}</div><div class="option-group"><h3>Hausgemachte Soßen</h3><div class="chips">${(opts.homemadeDipOptions||[]).map((x,i)=>chip('checkbox',`sauce-extra-${i}`,`${x.name} · +${euro(x.price)}`,false,x.price)).join('')}</div></div>`}
 if(current.config==='coffee')html+=`<div class="option-group"><h3>Kostenlose Wünsche</h3><div class="chips">${chip('checkbox','Milch','Milch')}${chip('checkbox','Zucker','Zucker')}</div></div>`;
 else if(current.config==='box')html+=`<div class="option-group"><h3>Soße wählen <small>(optional)</small></h3><div class="chips">${sauces.map((x,i)=>chip('checkbox',`sauce-${i}`,x,false)).join('')}</div><p class="option-hint">Erneut antippen zum Abwählen · keine Auswahl = ohne Soße</p></div><div class="option-group"><h3>Extras</h3><div class="chips">${extras.filter(x=>x[0]==='Extra Fleisch'||x[0]==='Extra Soße').map(x=>chip('checkbox',x[0],`${x[0]} · +${euro(x[1])}`,false,x[1])).join('')}</div></div>`;
 else if(current.config==='workflow'){
  const steps=current.workflow||[];
  if(steps.includes('bread'))html+=`<div class="option-group"><h3>Brot wählen</h3><div class="chips">${(opts.breadOptions||[]).map((x,i)=>`<label class="chip"><input type="checkbox" name="bread" value="bread-${i}" data-extra="${x.price}"><span>${x.name} · +${euro(x.price)}</span></label>`).join('')}</div></div>`;
  if(steps.includes('sauces')&&(!current.sauceMode||current.sauceMode==='additionalPaid'))html+=`<div class="option-group"><h3>Soße wählen <small>(optional)</small></h3><div class="chips">${(opts.sauceOptions||sauces.map(name=>({name}))).map((x,i)=>chip('checkbox',`sauce-${i}`,x.name,false)).join('')}</div></div>`;
  if(steps.includes('salad'))html+=`<div class="option-group"><div class="option-heading"><h3>Zutaten wählen</h3><button type="button" class="select-all" data-select-all aria-pressed="false">Mit allem</button></div><div class="chips">${(opts.saladOptions||ingredients.map(name=>({name}))).map(x=>chip('checkbox',x.name,x.name+(x.price>0?' · +'+euro(x.price):''),false,x.price||0).replace('<input','<input data-salad')).join('')}</div></div>`;
  if(steps.includes('extras'))html+=`<div class="option-group"><h3>Extras</h3><div class="chips">${(opts.extraOptions||extras.map(([name,price])=>({name,price}))).map(x=>chip('checkbox',x.name,`${x.name} · +${euro(x.price)}`,false,x.price)).join('')}</div></div>`;
 }
 else if(current.config===true)html+=`<div class="option-group"><h3>Soße wählen <small>(optional)</small></h3><div class="chips">${sauces.map((x,i)=>chip('checkbox',`sauce-${i}`,x,false)).join('')}</div><p class="option-hint">Erneut antippen zum Abwählen · keine Auswahl = ohne Soße</p></div><div class="option-group"><div class="option-heading"><h3>Zutaten wählen</h3><button type="button" class="select-all" data-select-all>Mit allem</button></div><div class="chips">${ingredients.map(x=>chip('checkbox',x,x,false).replace('<input','<input data-salad')).join('')}</div></div><div class="option-group"><h3>Extras</h3><div class="chips">${extras.map(x=>chip('checkbox',x[0],`${x[0]} · +${euro(x[1])}`,false,x[1])).join('')}</div></div>`;
 html+=`<div class="option-group person-option"><label for="itemRecipient"><strong>Für wen ist das?</strong><input id="itemRecipient" type="text" maxlength="30" placeholder="Optional, z. B. Fuat oder Mama"></label><p class="option-hint">Bei mehreren Varianten erzeugen wir sonst automatisch eine Nummer.</p></div>`;
 if(hasDoenerSaucePricing(current))html=html.replace('Soße wählen <small>(optional)</small>',`Soße wählen <small>${saucePriceLabel()}</small>`);
 document.querySelector('#configForm').innerHTML=html; document.querySelector('#configOverlay').hidden=false; document.body.style.overflow='hidden'; updateConfigPrice();
}
function hasDoenerSaucePricing(p){if(p.config==='workflow')return p.workflow?.includes('sauces')&&(!p.sauceMode||p.sauceMode==='additionalPaid');return (['doener','dueruem','offer','menu','bowl','box'].includes(p.category)||['lahmacun','lahmacun-meat'].includes(p.id))&&(p.config===true||p.config==='box')}
function normalSauceFee(count){return saucePricing.enabled?Math.max(0,count-1)*saucePricing.additionalPrice:0}
function sauceTierPrice(checked){const basic=checked.filter(i=>i.dataset.sauceTier==='basic');let dips=basic.reduce((sum,i)=>sum+Number(i.dataset.saucePrice||0),0);if(current.sauceMode==='oneFree'&&basic[0])dips-=Number(basic[0].dataset.saucePrice||0);const normal=checked.filter(i=>/^sauce-\d+$/.test(i.value)).length;return dips+(hasDoenerSaucePricing(current)?normalSauceFee(normal):0)}
function syncSelectAll(checked){const button=document.querySelector('#configForm [data-select-all]');if(!button)return;const salad=[...document.querySelectorAll('#configForm input[data-salad]')];const all=salad.length>0&&salad.every(input=>input.checked);button.textContent=all?'✓ Mit allem':'Mit allem';button.classList.toggle('active',all);button.setAttribute('aria-pressed',String(all))}
function updateConfigPrice(){let base=itemBasePrice(current);const size=document.querySelector('#configForm input[name=size]:checked'),checked=[...document.querySelectorAll('#configForm input:checked')];syncSelectAll(checked);if(size)base=Number(size.dataset.extra)+(current.deposit||0);checked.filter(i=>(i.type==='checkbox'||i.name==='bread'||i.name==='drink')).forEach(i=>base+=Number(i.dataset.extra||0));base+=sauceTierPrice(checked);document.querySelector('#configPrice').textContent=euro(base)}
function addConfigured(){
 if(!current||current.active===false){closeOverlay('configOverlay');return;}
 const checked=[...document.querySelectorAll('#configForm input:checked')]; let price=itemBasePrice(current); const size=checked.find(i=>i.name==='size');if(size)price=Number(size.dataset.extra)+(current.deposit||0);checked.filter(i=>(i.type==='checkbox'||i.name==='bread'||i.name==='drink')).forEach(i=>price+=Number(i.dataset.extra||0));price+=sauceTierPrice(checked);
 const salad=[...document.querySelectorAll('#configForm input[data-salad]')];const allIngredients=salad.length>0&&salad.every(i=>i.checked);
 const detailParts=checked.filter(i=>!i.value.startsWith('size')&&!(allIngredients&&i.hasAttribute('data-salad'))).map(i=>i.value.startsWith('sauce')||i.value.startsWith('drink')||i.name==='bread'||i.dataset.sauceTier?germanLabel(i.nextElementSibling):i.value);
 if(allIngredients)detailParts.unshift('Mit allem');
 const normalSauces=checked.filter(i=>/^sauce-\d+$/.test(i.value)).length;
 if(hasDoenerSaucePricing(current)&&normalSauceFee(normalSauces)>0)detailParts.push(`Soßen-Aufpreis: +${euro(normalSauceFee(normalSauces))}`);
 let details=detailParts.join(', ');
 if(current.deposit)details+=(details?', ':'')+`inkl. ${euro(current.deposit)} Pfand`;
 const recipient=document.querySelector('#itemRecipient').value.trim();cart.push({name:current.name,price,details,size:size?germanLabel(size.nextElementSibling).split(' · ')[0]:'',recipient});closeOverlay('configOverlay');updateCart();
}
function quickAdd(id){const p=products.find(x=>x.id===id&&x.active!==false);if(!p)return;cart.push({name:p.name,price:itemBasePrice(p),details:p.deposit?`inkl. ${euro(p.deposit)} Pfand`:'',size:''});updateCart()}
function updateCart(){const total=cart.reduce((s,x)=>s+x.price,0);document.querySelector('#cartCount').textContent=cart.length;document.querySelector('#floatingCount').textContent=cart.length;updateOrderSummary();document.querySelector('#floatingCart').hidden=!cart.length;const send=document.querySelector('#sendWhatsapp'),blocked=mode==='Lieferung'&&total<22;send.classList.toggle('minimum-blocked',blocked);send.title=blocked?'Mindestbestellwert für Lieferung: 22,00 €':''}
function openCart(){
 const groups=groupedCart();document.querySelector('#cartItems').innerHTML=cart.length?groups.map((x,i)=>{const same=groups.filter(g=>g.name===x.name),auto=same.length>1?`${x.name} ${same.indexOf(x)+1}`:'';return `<div class="cart-item"><div>${x.recipient||auto?`<span class="item-label">${x.recipient?`Für: ${x.recipient}`:auto}</span>`:''}<strong>${x.quantity}× ${x.name}</strong><small>${[x.size,x.details].filter(Boolean).join(' · ')}</small></div><strong>${euro(x.price*x.quantity)}</strong><button class="remove" data-remove="${x.indices[x.indices.length-1]}" aria-label="Ein Stück entfernen">×</button></div>`}).join(''):'<div class="empty">Dein Warenkorb ist noch leer.</div>';
 updateOrderSummary();document.querySelector('#cartOverlay').hidden=false;document.body.style.overflow='hidden';
}
function closeOverlay(id){document.querySelector('#'+id).hidden=true;document.body.style.overflow=''}
function whatsapp(){
 if(!cart.length)return;const orderTotal=cart.reduce((s,x)=>s+x.price,0);if(mode==='Lieferung'&&orderTotal<22){document.querySelector('#minimumMissing').textContent=euro(22-orderTotal);document.querySelector('#minimumOverlay').hidden=false;document.body.style.overflow='hidden';return}const name=document.querySelector('#customerName').value.trim()||'Nicht angegeben',time=document.querySelector('#customerTime').value||'So bald wie möglich',address=document.querySelector('#customerAddress').value.trim(),note=document.querySelector('#customerNote').value.trim();
 const groups=groupedCart();const lines=groups.map(x=>{const same=groups.filter(g=>g.name===x.name),auto=same.length>1?`${x.name} ${same.indexOf(x)+1}`:'';return `${x.quantity}× ${x.name}${x.recipient?` – für ${x.recipient}`:auto?` – ${auto}`:''} – ${euro(x.price*x.quantity)}\n${[x.size,x.details].filter(Boolean).join(' · ')}`}).join('\n\n');const amounts=orderAmounts();const total=euro(amounts.total);const text=`Hallo Bro's Döner! 👋\n\nIch möchte bestellen:\n\n${lines}\n\n${mode==='Lieferung'?`Warenwert: ${euro(amounts.subtotal)}\nServicegebühr Lieferung: ${euro(amounts.fee)}\n`:''}*Gesamt: ${total}*\n\n${mode}: ${time}\nZahlung: ${payment}\nName: ${name}${address?`\nAdresse: ${address}`:''}${note?`\nHinweis: ${note}`:''}\n\nBitte kurz bestätigen. Danke!`;
 window.open(`https://wa.me/491785190405?text=${encodeURIComponent(text)}`,'_blank','noopener');
}
renderProducts();
window.addEventListener('bros:catalog-sync',()=>{const active=document.querySelector('[data-filter].active')?.dataset.filter||'all';renderProducts(active);updateCart();});
document.addEventListener('click',e=>{const p=e.target.closest('[data-product]');if(p){const item=products.find(x=>x.id===p.dataset.product&&x.active!==false);if(!item)return;item.config||item.sizes?openConfig(item.id):quickAdd(item.id)}const all=e.target.closest('[data-select-all]');if(all){document.querySelectorAll('#configForm input[data-salad]').forEach(input=>{input.checked=true});all.textContent='Alles ausgewählt';updateConfigPrice()}const c=e.target.closest('[data-close]');if(c)closeOverlay(c.dataset.close);const r=e.target.closest('[data-remove]');if(r){cart.splice(Number(r.dataset.remove),1);updateCart();openCart()}const f=e.target.closest('[data-filter]');if(f){document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));f.classList.add('active');renderProducts(f.dataset.filter)}const m=e.target.closest('[data-mode]');if(m){mode=m.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('active',x===m));document.querySelector('#addressLabel').hidden=mode!=='Lieferung';document.querySelector('#deliveryNote').hidden=mode!=='Lieferung';const card=document.querySelector('[data-payment="Kartenzahlung"]'),bar=document.querySelector('[data-payment="Barzahlung"]');card.disabled=mode==='Lieferung';document.querySelector('#paymentHint').textContent=mode==='Lieferung'?'Kartenzahlung ist bei Lieferung momentan nicht verfügbar.':'Kartenzahlung ist bei Abholung möglich.';if(mode==='Lieferung'&&payment==='Kartenzahlung'){payment='Barzahlung';card.classList.remove('active');bar.classList.add('active')}updateCart()}const pay=e.target.closest('[data-payment]');if(pay&&!pay.disabled){payment=pay.dataset.payment;document.querySelectorAll('[data-payment]').forEach(x=>x.classList.toggle('active',x===pay))}});
document.querySelector('#configForm').addEventListener('change',event=>{if(event.target.name==='bread'&&event.target.checked)document.querySelectorAll('#configForm input[name=bread]').forEach(input=>{if(input!==event.target)input.checked=false});updateConfigPrice()});document.querySelector('#addToCart').addEventListener('click',addConfigured);document.querySelector('#floatingCart').addEventListener('click',openCart);document.querySelector('#cartTop').addEventListener('click',openCart);document.querySelector('#sendWhatsapp').addEventListener('click',whatsapp);document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)closeOverlay(o.id)}));

const hoursTrigger=document.querySelector('#hoursTrigger'),hoursRoll=document.querySelector('#hoursRoll'),quickHours=document.querySelector('#quickHours');
function setHours(open){hoursRoll.classList.toggle('open',open);hoursRoll.setAttribute('aria-hidden',String(!open));hoursTrigger.setAttribute('aria-expanded',String(open))}
hoursTrigger.addEventListener('click',()=>setHours(!hoursRoll.classList.contains('open')));
quickHours.addEventListener('click',()=>{setHours(true);window.scrollTo({top:0,behavior:'smooth'})});
document.addEventListener('click',e=>{if(hoursRoll.classList.contains('open')&&!hoursRoll.contains(e.target)&&!hoursTrigger.contains(e.target)&&!quickHours.contains(e.target))setHours(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')setHours(false)});
const weekdayNames=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
function toMinutes(time){const [h,m]=String(time||'0:0').split(':').map(Number);return h*60+m}
function fmtTime(time){return String(time||'').replace(':','.')+' Uhr'}
function fmtTimeShort(time){return String(time||'').replace(':','.')+' Uhr'}
function localDateKey(date){const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');return `${y}-${m}-${d}`}
function hoursConfig(){return window.shopHours||(typeof shopHours!=='undefined'?shopHours:{})}
function todaysHours(now=new Date()){const cfg=hoursConfig(),special=(cfg.specialDays||[]).find(day=>day.date===localDateKey(now));if(special)return {...special,isSpecial:true};const day=now.getDay();return {date:localDateKey(now),hours:(cfg.weekly||{})[day]||[],title:weekdayNames[day],isSpecial:false}}
function nextOpening(now=new Date()){for(let add=0;add<8;add++){const d=new Date(now);d.setDate(now.getDate()+add);const info=todaysHours(d);if(info.closed)continue;const slot=(info.hours||[]).find(h=>!h.closed);if(!slot)continue;if(add===0&&toMinutes(slot.open)<=now.getHours()*60+now.getMinutes())continue;return {label:add===0?'heute':weekdayNames[d.getDay()],slot}}return null}
function nextOpeningText(now=new Date()){const next=nextOpening(now);return next?`öffnet ${next.label==='heute'?'heute':next.label} um ${fmtTimeShort(next.slot.open)}`:'bald wieder geöffnet'}
function slotsText(slots){return (slots||[]).some(s=>s.closed)?((slots||[])[0]?.label||'Geschlossen'):(slots||[]).map(s=>`${fmtTime(s.open)} – ${fmtTime(s.close)}`).join(', ')||'Geschlossen'}
function renderHoursRows(){const cfg=hoursConfig(),paper=document.querySelector('.hours-paper');if(!paper)return;paper.querySelectorAll('.hours-row,.hours-special-note').forEach(x=>x.remove());const title=paper.querySelector('h2');const mon=(cfg.weekly||{})[1]||[],sun=(cfg.weekly||{})[0]||[];[['Montag – Samstag',mon],['Sonn- & Feiertage',sun]].reverse().forEach(([label,slots])=>{const row=document.createElement('div');row.className='hours-row';row.innerHTML=`<span>${label}</span><strong>${slotsText(slots)}</strong>`;title.insertAdjacentElement('afterend',row)});const today=todaysHours();if(today.isSpecial){const note=document.createElement('p');note.className='hours-special-note';note.innerHTML=`<strong>${today.title||'Sonderöffnungszeit'}</strong><br>${today.note||''}`;paper.querySelector('.hours-address')?.insertAdjacentElement('beforebegin',note)}}
function updateOpenState(){const now=new Date(),info=todaysHours(now),mins=now.getHours()*60+now.getMinutes(),slots=(info.hours||[]).filter(s=>!s.closed),current=slots.find(s=>mins>=toMinutes(s.open)&&mins<toMinutes(s.close)),isOpen=Boolean(current)&&!info.closed;document.querySelector('#openState').textContent=isOpen?'Geöffnet':'Geschlossen';document.querySelector('#openDetail').textContent=isOpen?`schließt um ${fmtTimeShort(current.close)}`:info.closed?(info.title||nextOpeningText(now)):nextOpeningText(now);hoursTrigger.classList.toggle('is-closed',!isOpen);const quick=quickHours?.querySelector('strong');if(quick)quick.textContent=isOpen?`schließt um ${fmtTimeShort(current.close)}`:(info.closed?(info.title||nextOpeningText(now)):nextOpeningText(now))}
renderHoursRows();
updateOpenState();
setInterval(updateOpenState,60000);
