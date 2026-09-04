const products=[
 {id:'spar-steak',name:'Steak Kalb Sparangebot',category:'offer',price:10,tag:'Bestseller · Sparangebot',desc:'Großer Steak-Döner oder Dürüm plus Softgetränk.',image:'kalb-steak.jpg',sizes:[['Großer Döner',10],['Dürüm',10]],drinks:true,config:true},
 {id:'spar-chicken',name:'Hähnchen Sparangebot',category:'offer',price:7.5,tag:'Beliebt · Sparangebot',desc:'Großer Hähnchen-Döner oder Dürüm plus Softgetränk.',image:'haehnchen.jpg',sizes:[['Großer Döner',7.5],['Dürüm',7.5]],drinks:true,config:true},
 {id:'menu-1',name:'Menü 1 · Steak',category:'menu',price:13,tag:'Premium Menü',desc:'Großer Steak-Döner oder Dürüm, Pommes und Softgetränk.',image:'kalb-steak.jpg',sizes:[['Großer Döner',13],['Dürüm',13]],drinks:true,config:true},
 {id:'menu-2',name:'Menü 2 · Hähnchen',category:'menu',price:11,tag:'Bestseller Menü',desc:'Großer Hähnchen-Döner oder Dürüm, Pommes und Softgetränk.',image:'haehnchen.jpg',sizes:[['Großer Döner',11],['Dürüm',11]],drinks:true,config:true},
 {id:'nugget-menu',name:'Nugget Menü',category:'menu',price:9,tag:'Menü-Angebot',desc:'Nuggets, Pommes und ein Softgetränk.',image:'nuggets.jpg',sizes:[['6 Nuggets',9],['9 Nuggets',10],['12 Nuggets',11]],drinks:true},
 {id:'kids-menu',name:'Kids Menü',category:'menu',price:9.9,tag:'Für Kinder',desc:'Kleiner Döner oder 4 Nuggets, kleine Pommes und Fruchtsaft.',image:'kids-menu.jpg',sizes:[['Kleiner Döner',9.9],['4 Nuggets',9.9]]},
 {id:'steak',name:'Kalb Steak Döner',category:'doener',price:8.5,small:6.5,tag:'Bestseller',desc:'Saftiges Kalb-Steakfleisch im knusprigen Brot.',image:'kalb-steak.jpg',config:true},
 {id:'chicken',name:'Hähnchen Döner',category:'doener',price:5,small:4,tag:'Klassiker',desc:'Würziges Hähnchenfleisch, frisch vom Spieß.',image:'haehnchen.jpg',config:true},
 {id:'dueruem-steak',name:'Dürüm Steak',category:'dueruem',price:8.5,tag:'Dürüm',desc:'Kalb-Steakfleisch eingerollt im dünnen Fladen.',image:'dueruem.jpg',config:true},
 {id:'dueruem-chicken',name:'Dürüm Hähnchen',category:'dueruem',price:6,tag:'Dürüm',desc:'Hähnchen und Wunschzutaten im frischen Dürüm.',image:'dueruem.jpg',config:true},
 {id:'box-steak',name:'Kalb Steak Box',category:'box',price:8.5,tag:'Box',desc:'Steakfleisch mit Pommes – ohne Salat.',image:'box-steak.jpg',config:'box'},
 {id:'box-chicken',name:'Hähnchen Box',category:'box',price:6,tag:'Box',desc:'Hähnchenfleisch mit Pommes – ohne Salat.',image:'box-haehnchen.jpg',config:'box'},
 {id:'bowl-steak',name:'Steak Döner Bowl',category:'box',price:13,tag:'Bowl',desc:'Steak-Dönerfleisch, Pommes und frische Zutaten.',image:'bowl.jpg',config:true},
 {id:'bowl-chicken',name:'Hähnchen Döner Bowl',category:'box',price:10,tag:'Bowl',desc:'Hähnchen-Dönerfleisch, Pommes und frische Zutaten.',image:'bowl-haehnchen.jpg',config:true},
 {id:'nuggets',name:'Chicken Nuggets',category:'snack',price:4.5,tag:'Snack',desc:'Knusprige Nuggets – wahlweise 6, 9 oder 12 Stück.',image:'nuggets.jpg',sizes:[['6 Stück',4.5],['9 Stück',6],['12 Stück',7.5]]},
 {id:'pommes',name:'Pommes',category:'snack',price:4,tag:'Snack',desc:'Goldbraun, knusprig und frisch gesalzen.',image:'pommes.jpg'},
 {id:'extra-meat',name:'Extra Fleisch',category:'extra',price:2.5,tag:'Extra',desc:'Eine zusätzliche Portion Dönerfleisch.',icon:'🥩'},
 {id:'extra-cheese',name:'Käse',category:'extra',price:1,tag:'Topping',desc:'Herzhafter Käse als zusätzliches Topping.',icon:'▱'},
 {id:'extra-pepper',name:'Peperoni',category:'extra',price:1,tag:'Topping',desc:'Würzige Peperoni für deinen Extra-Kick.',icon:'♨'},
 {id:'extra-jalapeno',name:'Jalapeños',category:'extra',price:1,tag:'Topping',desc:'Scharfe Jalapeños als zusätzliches Topping.',icon:'◉'},
 {id:'extra-sauce',name:'Extra Soße',category:'extra',price:1,tag:'Extra',desc:'Eine zusätzliche Portion deiner Wunschsoße.',icon:'◒',sizes:[['Knoblauchsoße',1],['Kräutersoße',1],['Scharfe Soße',1]]},
 {id:'redbull',name:'Red Bull',category:'drink',price:2.45,tag:'Energy',desc:'Verschiedene Sorten – deine Auswahl bitte als Anmerkung.',image:'energy.jpg'},
 {id:'softdrink',name:'Softgetränke',category:'drink',price:1.95,tag:'Kaltgetränk',desc:'Uludağ, Cola, Fanta und weitere Sorten.',image:'softdrinks.jpg'},
 {id:'fruchtsaft',name:'Fruchtsaft',category:'drink',price:1.5,tag:'Saft',desc:'Fruchtig und gut gekühlt.',image:'fruchtsaft.jpg'},
 {id:'salgam',name:'Şalgam',category:'drink',price:2,tag:'Türkischer Klassiker',desc:'Würziges Rübensaftgetränk, gut gekühlt.',image:'salgam.jpg'},
 {id:'ayran',name:'Ayran',category:'drink',price:1.5,tag:'Getränk',desc:'Der erfrischende Klassiker zum Döner.',image:'ayran.jpg'},
 {id:'wasser',name:'Wasser 0,5 l',category:'drink',price:1.5,tag:'Getränk',desc:'Still oder sprudelnd – bitte bei der Bestellung angeben.',image:'wasser.jpg'},
 {id:'kaffee',name:'Kaffee Crema',category:'drink',price:2,tag:'Heißgetränk',desc:'Frisch gebrüht mit goldener Crema.',image:'kaffee.jpg'},
 {id:'softdrink-1l',name:'Softgetränk 1 l',category:'drink',price:3.35,tag:'Große Flasche',desc:'Verschiedene Sorten, zuzüglich Pfand.',image:'softdrinks.jpg'}
];
const ingredients=['Salat','Tomaten','Weißkraut','Rotkraut','Zwiebeln'];
const sauces=['Knoblauchsoße','Kräutersoße','Scharfe Soße'];
const menuDrinks=['Cola','Fanta','Sprite','Uludağ','Ayran','Wasser'];
const extras=[['Käse',1],['Peperoni',1],['Jalapeños',1],['Extra Fleisch',2.5],['Extra Soße',1]];
let cart=[],current=null,mode='Abholung',payment='Barzahlung';
const euro=n=>n.toLocaleString('de-DE',{style:'currency',currency:'EUR'});
const grid=document.querySelector('#productGrid');

function renderProducts(filter='all'){
 grid.innerHTML=products.filter(p=>filter==='all'||p.category===filter).map(p=>`<article class="product visual"><div class="product-image ${p.icon?'symbol-image':''}">${p.icon?`<span aria-hidden="true">${p.icon}</span>`:`<img src="assets/products/${p.image}" alt="${p.name}" loading="lazy">`}</div><div class="product-body"><span class="product-tag">${p.tag}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-footer"><strong>ab ${euro(p.small||p.price)}</strong><button data-product="${p.id}">${p.config||p.sizes?'Konfigurieren':'Hinzufügen'} +</button></div></div></article>`).join('');
}
function chip(type,value,label,checked=false,extra=''){return `<label class="chip"><input type="${type}" name="${value.startsWith('size')?'size':value.startsWith('sauce')?'sauce':value.startsWith('drink')?'drink':'option'}" value="${value}" ${checked?'checked':''} data-extra="${extra}"><span>${label}</span></label>`}
function groupedCart(){
 const groups=[];
 cart.forEach((item,index)=>{const key=[item.name,item.price,item.size,item.details].join('|');const found=groups.find(group=>group.key===key);if(found){found.quantity+=1;found.indices.push(index)}else groups.push({...item,key,quantity:1,indices:[index]})});
 return groups;
}
function openConfig(id){
 current=products.find(p=>p.id===id); document.querySelector('#configTitle').textContent=current.name; document.querySelector('#configDesc').textContent=current.desc; document.querySelector('#configImage').src=`assets/products/${current.image}`; document.querySelector('#configImage').alt=current.name;
 let html='';
 if(current.small)html+=`<div class="option-group"><h3>Größe wählen</h3><div class="chips">${chip('radio','size-large',`Groß · ${euro(current.price)}`,true,current.price)}${chip('radio','size-small',`Klein · ${euro(current.small)}`,false,current.small)}</div></div>`;
 if(current.sizes)html+=`<div class="option-group"><h3>${current.category==='menu'||current.category==='offer'?'Variante wählen':'Menge wählen'}</h3><div class="chips">${current.sizes.map((s,i)=>chip('radio',`size-${i}`,`${s[0]} · ${euro(s[1])}`,i===0,s[1])).join('')}</div></div>`;
 if(current.drinks)html+=`<div class="option-group"><h3>Inklusivgetränk wählen</h3><div class="chips">${menuDrinks.map((x,i)=>chip('radio',`drink-${i}`,x,i===0)).join('')}</div></div>`;
 if(current.config==='box')html+=`<div class="option-group"><h3>Soße wählen <small>(optional)</small></h3><div class="chips">${sauces.map((x,i)=>chip('checkbox',`sauce-${i}`,x,false)).join('')}</div><p class="option-hint">Erneut antippen zum Abwählen · keine Auswahl = ohne Soße</p></div><div class="option-group"><h3>Extras</h3><div class="chips">${extras.filter(x=>x[0]==='Extra Fleisch'||x[0]==='Extra Soße').map(x=>chip('checkbox',x[0],`${x[0]} · +${euro(x[1])}`,false,x[1])).join('')}</div></div>`;
 else if(current.config)html+=`<div class="option-group"><div class="option-heading"><h3>Zutaten wählen</h3><button type="button" class="select-all" data-select-all>Mit allem</button></div><div class="chips">${ingredients.map(x=>chip('checkbox',x,x,false)).join('')}</div></div><div class="option-group"><h3>Soße wählen <small>(optional)</small></h3><div class="chips">${sauces.map((x,i)=>chip('checkbox',`sauce-${i}`,x,false)).join('')}</div><p class="option-hint">Erneut antippen zum Abwählen · keine Auswahl = ohne Soße</p></div><div class="option-group"><h3>Extras</h3><div class="chips">${extras.map(x=>chip('checkbox',x[0],`${x[0]} · +${euro(x[1])}`,false,x[1])).join('')}</div></div>`;
 document.querySelector('#configForm').innerHTML=html; document.querySelector('#configOverlay').hidden=false; document.body.style.overflow='hidden'; updateConfigPrice();
}
function updateConfigPrice(){let base=current.price;const size=document.querySelector('#configForm input[name=size]:checked');if(size)base=Number(size.dataset.extra);document.querySelectorAll('#configForm input[type=checkbox]:checked').forEach(i=>base+=Number(i.dataset.extra||0));document.querySelector('#configPrice').textContent=euro(base)}
function addConfigured(){
 const checked=[...document.querySelectorAll('#configForm input:checked')]; let price=current.price; const size=checked.find(i=>i.name==='size');if(size)price=Number(size.dataset.extra);checked.filter(i=>i.type==='checkbox').forEach(i=>price+=Number(i.dataset.extra||0));
 const details=checked.filter(i=>!i.value.startsWith('size')).map(i=>i.value.startsWith('sauce')||i.value.startsWith('drink')?i.nextElementSibling.textContent:i.value).join(', ');
 cart.push({name:current.name,price,details,size:size?size.nextElementSibling.textContent.split(' · ')[0]:''});closeOverlay('configOverlay');updateCart();
}
function quickAdd(id){const p=products.find(x=>x.id===id);cart.push({name:p.name,price:p.price,details:'',size:''});updateCart()}
function updateCart(){const total=cart.reduce((s,x)=>s+x.price,0);document.querySelector('#cartCount').textContent=cart.length;document.querySelector('#floatingCount').textContent=cart.length;document.querySelector('#floatingTotal').textContent=euro(total);document.querySelector('#floatingCart').hidden=!cart.length}
function openCart(){
 document.querySelector('#cartItems').innerHTML=cart.length?groupedCart().map(x=>`<div class="cart-item"><div><strong>${x.quantity}× ${x.name}</strong><small>${[x.size,x.details].filter(Boolean).join(' · ')}</small></div><strong>${euro(x.price*x.quantity)}</strong><button class="remove" data-remove="${x.indices[x.indices.length-1]}" aria-label="Ein Stück entfernen">×</button></div>`).join(''):'<div class="empty">Dein Warenkorb ist noch leer.</div>';
 document.querySelector('#cartTotal').textContent=euro(cart.reduce((s,x)=>s+x.price,0));document.querySelector('#cartOverlay').hidden=false;document.body.style.overflow='hidden';
}
function closeOverlay(id){document.querySelector('#'+id).hidden=true;document.body.style.overflow=''}
function whatsapp(){
 if(!cart.length)return;const name=document.querySelector('#customerName').value.trim()||'Nicht angegeben',time=document.querySelector('#customerTime').value||'So bald wie möglich',address=document.querySelector('#customerAddress').value.trim(),note=document.querySelector('#customerNote').value.trim();
 const lines=groupedCart().map(x=>`${x.quantity}× ${x.name} – ${euro(x.price*x.quantity)}\n${[x.size,x.details].filter(Boolean).join(' · ')}`).join('\n\n');const total=euro(cart.reduce((s,x)=>s+x.price,0));const text=`Hallo Bro's Döner! 👋\n\nIch möchte bestellen:\n\n${lines}\n\n*Gesamt: ${total}*\n\n${mode}: ${time}\nZahlung: ${payment}\nName: ${name}${address?`\nAdresse: ${address}`:''}${note?`\nHinweis: ${note}`:''}\n\nBitte kurz bestätigen. Danke!`;
 window.open(`https://wa.me/491785190405?text=${encodeURIComponent(text)}`,'_blank','noopener');
}
renderProducts();
document.addEventListener('click',e=>{const p=e.target.closest('[data-product]');if(p){const item=products.find(x=>x.id===p.dataset.product);item.config||item.sizes?openConfig(item.id):quickAdd(item.id)}const all=e.target.closest('[data-select-all]');if(all){document.querySelectorAll('#configForm input[type=checkbox]').forEach(input=>{if(ingredients.includes(input.value))input.checked=true});all.textContent='Alles ausgewählt';updateConfigPrice()}const c=e.target.closest('[data-close]');if(c)closeOverlay(c.dataset.close);const r=e.target.closest('[data-remove]');if(r){cart.splice(Number(r.dataset.remove),1);updateCart();openCart()}const f=e.target.closest('[data-filter]');if(f){document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));f.classList.add('active');renderProducts(f.dataset.filter)}const m=e.target.closest('[data-mode]');if(m){mode=m.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('active',x===m));document.querySelector('#addressLabel').hidden=mode!=='Lieferung'}const pay=e.target.closest('[data-payment]');if(pay){payment=pay.dataset.payment;document.querySelectorAll('[data-payment]').forEach(x=>x.classList.toggle('active',x===pay))}});
document.querySelector('#configForm').addEventListener('change',updateConfigPrice);document.querySelector('#addToCart').addEventListener('click',addConfigured);document.querySelector('#floatingCart').addEventListener('click',openCart);document.querySelector('#cartTop').addEventListener('click',openCart);document.querySelector('#sendWhatsapp').addEventListener('click',whatsapp);document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)closeOverlay(o.id)}));

const hoursTrigger=document.querySelector('#hoursTrigger'),hoursRoll=document.querySelector('#hoursRoll');
function setHours(open){hoursRoll.classList.toggle('open',open);hoursRoll.setAttribute('aria-hidden',String(!open));hoursTrigger.setAttribute('aria-expanded',String(open))}
hoursTrigger.addEventListener('click',()=>setHours(!hoursRoll.classList.contains('open')));
document.addEventListener('click',e=>{if(hoursRoll.classList.contains('open')&&!hoursRoll.contains(e.target)&&!hoursTrigger.contains(e.target))setHours(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')setHours(false)});
function updateOpenState(){const now=new Date(),day=now.getDay(),mins=now.getHours()*60+now.getMinutes(),isOpen=day!==0&&mins>=690&&mins<1260;document.querySelector('#openState').textContent=isOpen?'Geöffnet':'Geschlossen';document.querySelector('#openDetail').textContent=isOpen?'bis 21:00':day===0?'Mo. ab 11:30':'ab 11:30';hoursTrigger.classList.toggle('is-closed',!isOpen)}
updateOpenState();
