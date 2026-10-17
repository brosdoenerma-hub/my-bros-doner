const safeTvText=value=>String(value??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const tvParams=new URLSearchParams(location.search);
if(tvParams.has('slide'))document.body.classList.add('tv-slide-fixed');
const tv2Slideshow=tvParams.get('tv')==='2';
const tvSequence=tvParams.get('loop')==='order'?[0,2]:tvParams.get('loop')==='sunday'?[3,5]:tv2Slideshow?[0,3]:null;
if(tvParams.has('export')||tvSequence)document.body.classList.add('export');
const money=n=>n.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const item=id=>products.find(p=>p.id===id);
const photo=(id,cls='')=>`<img class="${cls}" src="assets/products/${item(id).image}" alt="${item(id).name}">`;
const row=(label,value,detail='')=>`<div class="row"><span>${label}${detail?`<small>${detail}</small>`:''}</span><strong>${money(value)}</strong></div>`;
const head=(n,title)=>`<header><div><p class="eyebrow">MY BRO’S DÖNER / ${n}</p><h1>${title}</h1></div><span class="pill">Fleischprodukte · 100 % Halal</span><img src="assets/logo-premium-clean.png" alt="my Bro’s Döner"></header>`;
const allergenLegend=[['A','Glutenhaltiges Getreide'],['B','Krebstiere'],['C','Eier'],['D','Fisch'],['E','Erdnüsse'],['F','Soja'],['G','Milch / Laktose'],['H','Schalenfrüchte'],['I','Sellerie'],['J','Senf'],['K','Sesam'],['L','Schwefeldioxid / Sulfite'],['M','Lupinen'],['N','Weichtiere']];
const foot=()=>`<footer><div class="allergen-title">ALLERGENE · LEGENDE A–N</div><div class="allergen-strip">${allergenLegend.map(([code,name])=>`<div><b>${code}</b><span>${name}</span></div>`).join('')}</div><div class="footer-meta"><span>Alle Preise inkl. MwSt. · Abbildungen können abweichen.</span><span>Allergene je Gericht und Zutat: separate Übersicht / bitte Personal fragen.</span></div></footer>`;
const classic=(id,title,content)=>`<article class="card">${photo(id)}<div class="inside"><h2>${title}</h2>${content}</div></article>`;
const iconCard=(id,title)=>`<article class="card icon-card"><div class="tv-icon">${item(id).icon||'🍽️'}</div><div class="inside"><p class="eyebrow">${item(id).tag}</p><h2>${title}</h2><p>${item(id).desc}</p><div class="price">${money(item(id).price)}</div></div></article>`;
const menuCard=(id,title)=>`<article class="card compact">${photo(id)}<div class="inside"><p class="eyebrow">${item(id).name}</p><h2>${title}</h2><p>Ganzer Döner + Pommes + Getränk</p><div class="row"><span>Döner-Menü</span><strong>${money(item(id).price)}</strong></div><div class="row"><span>Als Dürüm</span><strong>${money(item(id).sizes[1][1])}</strong></div></div></article>`;
const orderSlides=[
 {kicker:'Dein Geschmack entscheidet',title:'Dein Döner.<br><em>Deine Regeln.</em>',copy:'Was kommt bei dir rein?<br>Entdecke deinen Döner im Konfigurator.'},
 {kicker:'So, wie du ihn liebst',title:'Dein Brot.<br><em>Dein Fleisch.</em>',copy:'Brot, Fleisch, Zutaten –<br>stell ihn selbst zusammen.'},
 {kicker:'Finde deinen Favoriten',title:'Welche Sosse<br><em>ist deine?</em>',copy:'Knoblauch, Kräuter oder scharf?<br>Finde deine Lieblingskombination.'},
 {kicker:'Neugierig geworden?',title:'Probier’s aus.<br><em>Dein Döner.</em>',copy:'Scannen & selbst zusammenstellen.<br>Dein Geschmack entscheidet.'}
];
let currentOrderSlide=Math.max(0,Math.min(orderSlides.length-1,(Number(tvParams.get('slide'))||1)-1));
let currentBoard=-1;
const orderMessage=()=>`<div class="tv-order-message" data-slide="${currentOrderSlide+1}"><span class="tv-order-kicker">${orderSlides[currentOrderSlide].kicker}</span><h2 class="tv-order-title">${orderSlides[currentOrderSlide].title}</h2><p class="tv-order-copy">${orderSlides[currentOrderSlide].copy}</p><div class="tv-slide-dots" aria-label="Botschaft ${currentOrderSlide+1} von 4">${orderSlides.map((_,i)=>`<span class="${i===currentOrderSlide?'active':''}"></span>`).join('')}<small>${currentOrderSlide+1} / 4 · DEIN DÖNER-KONFIGURATOR</small></div></div>`;
const panels=[
()=>`${head('01','DEIN GESCHMACK. <em>DEINE ENTSCHEIDUNG.</em>')}<div class="tv-order-layout"><div class="tv-order-left"><div id="orderMessage">${orderMessage()}</div><div class="tv-order-steps"><span><b>1</b>Scannen</span><span><b>2</b>Zusammenstellen</span><span><b>3</b>Bestellen</span></div><p class="tv-order-contact">Abholung & Lieferung · 0178 5190405</p></div><div class="tv-qr-panel"><img src="assets/order-qr-tv.svg" alt="QR-Code zur BRO’S Bestellwebsite"><h2>Kamera auf. Scannen. Los!</h2><p>Direkt auf die Website.<br>Stell deinen Döner selbst zusammen.</p></div></div><div class="tv-simple-footer"><span>Maybachstraße 18 · Mannheim</span><strong>Frisch für dich. Nach deinem Geschmack.</strong></div>`,
()=>`${head('02','Unsere <em>Klassiker.</em>')}<div class="grid four">${classic('chicken','Hähnchen Döner',row('Döner',item('chicken').price)+row('Dürüm',item('dueruem-chicken').price))}${classic('steak','Kalb Steak Döner',row('Döner',item('steak').price)+row('Dürüm',item('dueruem-steak').price))}${classic('bowl-steak','Döner Bowl',row('Hähnchen',item('bowl-chicken').price)+row('Kalb Steak',item('bowl-steak').price)+'<p class="category-intro">Mit Pommes und<br>frischen Zutaten.</p>')}${classic('box-chicken','Döner Box',row('Hähnchen',item('box-chicken').price)+row('Kalb Steak',item('box-steak').price)+'<p class="category-intro">Nur Pommes & Fleisch.<br>Ohne Salat.</p>')}</div><div class="note"><b>Soßen zu Döner & Dürüm:</b> Erste Soße gratis · jede weitere +0,50 €.</div>${foot()}`,
()=>`${head('03','Mehr drin. <em>Unsere Menüs.</em>')}<div class="grid three">${menuCard('menu-1','Kalb Steak')}${menuCard('menu-2','Hähnchen')}<article class="card compact">${photo('kids-menu')}<div class="inside"><p class="eyebrow">Für die Kleinen</p><h2>Kids Menü</h2><p>4 Nuggets<br>+ kleine Pommes + Capri-Sonne</p><div class="price">${money(item('kids-menu').price)}</div><p class="smallprint">1 Dip gratis · jeder weitere +0,50 €</p></div></article></div><div class="menu-bottom"><article class="card mini">${photo('nugget-menu')}<div><h2>Nugget Menü · mit Pommes & Getränk</h2><p>${item('nugget-menu').sizes.map(s=>`${s[0]}: <strong>${money(s[1])}</strong>`).join(' &nbsp; / &nbsp; ')}</p></div></article><div class="note" style="margin:0"><b>Getränk zur Wahl:</b> Cola · Fanta · Sprite · Uludağ · Ayran · Wasser<br><b>Döner-Menüs:</b> 1. Soße gratis, weitere +0,50 €.</div></div>${foot()}`,
()=>`${head('04','Guter Geschmack. <em>Guter Deal.</em>')}<div class="grid two">${[['spar-chicken','Hähnchen'],['spar-steak','Kalb Steak']].map(([id,name])=>`<article class="card offer">${photo(id)}<div class="inside"><p class="eyebrow">Sparangebot</p><h2>Ganzer<br>${name} Döner</h2><p>+ ein Getränk deiner Wahl</p><div class="price">${money(item(id).price)}</div><p>Als Dürüm: <b>${money(item(id).sizes[1][1])}</b></p></div></article>`).join('')}</div><div class="note"><b>Getränk zur Wahl:</b> Cola · Fanta · Sprite · Uludağ · Ayran · Wasser<br>Erste Döner-Soße gratis · jede weitere +0,50 € · Zutaten nach deinem Geschmack.</div>${foot()}`,
()=>`${head('05','Drinks. Snacks. <em>Deine Extras.</em>')}<div class="grid three"><article class="card list"><h2>Gut gekühlt & heiß</h2>${products.filter(p=>p.category==='drink'&&tvAvailable(p)).map(p=>row(p.name,p.price+(p.deposit||0),p.deposit?`${money(p.price)} + 0,25 € Pfand`:p.id==='kaffee'?'Milch & Zucker kostenlos':'')).join('')}</article><article class="card list"><h2>Für den kleinen Hunger</h2>${photo('nuggets','snack-photo')}${row('Pommes',item('pommes').price)}${item('nuggets').sizes.map(s=>row('Nuggets · '+s[0],s[1])).join('')}<div class="note"><b>Pommes:</b> 1 Dip gratis, weitere +0,50 €.<br><b>Nuggets:</b> Dips je +0,50 €.<br>Ketchup · Mayo · Senf<br>Haussoßen als Extra je +1,00 €.</div></article><article class="card list"><h2>Mach’s zu deinem</h2>${products.filter(p=>p.category==='extra'&&tvAvailable(p)).map(p=>row(p.name,p.price)).join('')}<p class="smallprint">Haussoßen: Knoblauch · Kräuter<br>Cocktail · Scharf</p></article></div>${foot()}`,
()=>`${head('06','Neu bei BRO’S. <em>Auch am Sonntag.</em>')}<div class="tv-sunday-layout"><div><span class="tv-sunday-kicker">Jetzt versuchsweise</span><h2 class="tv-sunday-title">Sonntags<br><em>geöffnet.</em></h2><p class="tv-sunday-message">${safeTvText(shopNotice.message)}</p><p class="tv-sunday-tail">Wir freuen uns auf deinen Besuch.</p></div><div class="tv-hours-panel"><p class="tv-hours-label">Dein Sonntag. Dein Döner.</p><h2 class="tv-hours-day">Jeden Sonntag</h2><div class="tv-hours-time">${safeTvText(shopHours.weekly[0][0].open)} – ${safeTvText(shopHours.weekly[0][0].close)}</div><div class="tv-hours-unit">UHR</div><p class="tv-hours-date">Ab <strong>18. Oktober 2026</strong><br>versuchsweise für euch geöffnet</p></div></div><div class="tv-simple-footer"><span>Maybachstraße 18 · Mannheim</span><strong>Auch sonntags dein BRO’S Moment.</strong></div>`
];
// Angaben aus allergene.html, vom Betreiber bestätigt. Keine ungeprüften Codes für Cocktailsoße ergänzen.
const cardAllergens={
 1:['Döner: A · G · K<br>Dürüm: A · G','Döner: A · G · K<br>Dürüm: A · G','Beide Bowls: G','Beide Boxen: G'],
 2:['Döner: A · G · K · Dürüm: A · G<br>Pommes: A* · Ayran bei Auswahl: G','Döner: A · G · K · Dürüm: A · G<br>Pommes: A* · Ayran bei Auswahl: G','Döner: A · G · K · Nuggets: A · C<br>Pommes: A* · Dips je nach Auswahl','Nuggets: A · C · Pommes: A*<br>Ayran bei Auswahl: G · Dips je nach Auswahl'],
 3:['Döner: A · G · K<br>Dürüm: A · G · Ayran bei Auswahl: G','Döner: A · G · K<br>Dürüm: A · G · Ayran bei Auswahl: G'],
 4:['Ayran: G · Milch zum Kaffee: G','Nuggets: A · C · Pommes: A*<br>Mayonnaise: C · J','Käse: G · Knoblauch / Kräuter: C · G<br>Scharfe Soße: J · Mayonnaise: C · J']
};

const tvAvailable=p=>!!p&&p.active!==false&&!['pending','hidden'].includes(p.tvStatus);
const nativeSlots={1:[['chicken','dueruem-chicken'],['steak','dueruem-steak'],['bowl-chicken','bowl-steak'],['box-chicken','box-steak']],2:[['menu-1'],['menu-2'],['kids-menu']],3:[['spar-chicken'],['spar-steak']],4:[[],['nuggets','pommes'],[]]};
function applyTvProductPlan(index,cards){
 const slots=nativeSlots[index]||[];
 const mainCards=[...document.querySelectorAll('#board .grid > article.card')];
 // Keep the slot geometry even when an article is disabled. Approved replacements reuse that space.
 slots.forEach((ids,i)=>{
  const card=mainCards[i];if(!card)return;
  if(ids.length&&!ids.some(id=>tvAvailable(item(id)))){card.style.visibility='hidden';return;}
  if(index===1){[...card.querySelectorAll('.row')].forEach((row,j)=>{if(ids[j]&&!tvAvailable(item(ids[j])))row.style.display='none';});}
 });
 if(index===4){for(const row of mainCards[1]?.querySelectorAll('.row')||[]){const id=row.textContent.startsWith('Pommes')?'pommes':'nuggets';if(!tvAvailable(item(id)))row.style.display='none';}}
 if(index===2&&!tvAvailable(item('nugget-menu')))document.querySelector('#board .menu-bottom .mini')?.remove();
 for(const p of products.filter(p=>tvAvailable(p)&&p.tvPresentation?.board===index+1)){
  const slot=mainCards[p.tvPresentation.slot-1];if(!slot)continue;
  slot.style.visibility='visible';slot.className='card tv-assigned-card';
  const rows=p.sizes?.length?p.sizes.map(([name,price])=>row(safeTvText(name),price+(p.deposit||0))).join(''):`<div class="price">${money(p.price+(p.deposit||0))}</div>`;
  slot.innerHTML=`<img src="${safeTvText(/^(https?:|\/)/.test(p.image||'')?p.image:'assets/products/'+p.image)}" alt="${safeTvText(p.name)}"><div class="inside"><h2>${safeTvText(p.name)}</h2><p class="tv-assigned-description">${safeTvText(p.desc||'')}</p>${rows}<p class="product-allergens">Allergene & Zutaten: bitte Personal fragen.</p></div>`;
 }
}

function showBoard(index){if(index===0&&currentBoard!==-1&&currentBoard!==0&&tvParams.get('loop')!=='order')currentOrderSlide=(currentOrderSlide+1)%orderSlides.length;currentBoard=index;document.querySelector('#board').classList.toggle('tv-order',index===0);document.querySelector('#board').classList.toggle('tv-classics-large',index===1);document.querySelector('#board').classList.toggle('tv-sunday',index===5);const sauceNotice=saucePricing.enabled&&saucePricing.additionalPrice>0?`Erste Soße gratis · jede weitere +${money(saucePricing.additionalPrice)}`:'Soßenauswahl kostenlos';
 document.querySelector('#board').innerHTML=panels[index]()
 .replace('Soßen zu Döner & Dürüm:','Soßen zu Döner, Dürüm, Bowl & Box:')
 .replace('Erste Soße gratis · jede weitere +0,50 €.',sauceNotice+'.')
 .replace('1. Soße gratis, weitere +0,50 €.',sauceNotice+'.')
 .replace('Erste Döner-Soße gratis · jede weitere +0,50 €',sauceNotice);
 const cards=[...document.querySelectorAll('#board article.card')];
 (cardAllergens[index]||[]).forEach((text,i)=>{const label=document.createElement('p');label.className='product-allergens';label.innerHTML='<b>Allergene</b> '+text;const card=cards[i];(card.querySelector('.inside')||card.querySelector('.mini > div')||card).append(label)});
 applyTvProductPlan(index,cards);
 if(index>0&&index<5){const hint=document.createElement('div');hint.className='allergen-selection-hint';hint.textContent='Soßen & Extras je nach Auswahl: separate Übersicht. A* = mögliche Glutenspuren bei Pommes.';document.querySelector('.footer-meta').before(hint)}
 document.querySelectorAll('[data-board]').forEach(b=>b.classList.toggle('active',Number(b.dataset.board)===index));history.replaceState(null,'','#'+(index+1));resize()}
function resize(){document.querySelector('#board').style.transform=`scale(${document.querySelector('#stage').clientWidth/1920})`}
document.querySelectorAll('[data-board]').forEach(button=>button.addEventListener('click',()=>showBoard(Number(button.dataset.board))));window.addEventListener('resize',resize);
showBoard(tvSequence?tvSequence[0]:Math.max(0,Math.min(panels.length-1,(Number(location.hash.slice(1))||1)-1)));
window.addEventListener('bros:catalog-sync',()=>showBoard(Math.max(0,Math.min(panels.length-1,(Number(location.hash.slice(1))||1)-1))));
if(tvSequence){
 let timer;
 if(tvParams.get('loop')==='order'){
  // 01: four uninterrupted messages, 3 s each; 03: 8 s.
  const schedule=()=>{
   if(currentBoard===0){
    timer=setTimeout(()=>{
     if(currentOrderSlide<orderSlides.length-1){currentOrderSlide++;document.querySelector('#orderMessage').innerHTML=orderMessage();}
     else showBoard(2);
     schedule();
    },3000);
   }else{
    timer=setTimeout(()=>{currentOrderSlide=0;showBoard(0);schedule();},8000);
   }
  };
  schedule();
 }else{
  const sequence=tvSequence;let position=0;
  const boardDuration=tvParams.get('loop')==='sunday'?10000:5000;
  const advance=()=>{position=(position+1)%sequence.length;showBoard(sequence[position]);timer=setTimeout(advance,boardDuration);};
  timer=setTimeout(advance,boardDuration);
 }
 window.addEventListener('pagehide',()=>clearTimeout(timer),{once:true});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
}else if(!tvParams.has('slide')){
 // Standalone board: change only the text container, never the QR image.
 const textTimer=setInterval(()=>{if(currentBoard!==0)return;currentOrderSlide=(currentOrderSlide+1)%orderSlides.length;document.querySelector('#orderMessage').innerHTML=orderMessage();},3000);
 window.addEventListener('pagehide',()=>clearInterval(textTimer),{once:true});
}
