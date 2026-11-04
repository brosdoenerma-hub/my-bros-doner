const safeTvText=value=>String(value??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
const tvParams=new URLSearchParams(location.search);
if(tvParams.has('slide'))document.body.classList.add('tv-slide-fixed');
const tv2Slideshow=tvParams.get('tv')==='2';
const tvSequence=tvParams.get('loop')==='order'?[0,2]:tvParams.get('loop')==='sunday'?[3]:tv2Slideshow?[0,3]:null;
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
 {kicker:'Dein Geschmack',title:'Dein Döner.<br><em>Deine Regeln.</em>',copy:'So, wie du ihn liebst.'},
 {kicker:'1 · Scannen',title:'Kamera auf.<br><em>QR scannen.</em>',copy:'Direkt zur Website.'},
 {kicker:'2 · Zusammenstellen',title:'Dein Brot.<br><em>Deine Zutaten.</em>',copy:'Stell deinen Favoriten zusammen.'},
 {kicker:'3 · Bestellen',title:'Dein Geschmack.<br><em>Dein BRO’S.</em>',copy:'Einfach über WhatsApp bestellen.'}
];
let currentOrderSlide=Math.max(0,Math.min(orderSlides.length-1,(Number(tvParams.get('slide'))||1)-1));
let currentBoard=-1;
const orderMessage=()=>`<div class="tv-order-message" data-slide="${currentOrderSlide+1}"><span class="tv-order-kicker">${orderSlides[currentOrderSlide].kicker}</span><h2 class="tv-order-title">${orderSlides[currentOrderSlide].title}</h2><p class="tv-order-copy">${orderSlides[currentOrderSlide].copy}</p><div class="tv-slide-dots" aria-label="Botschaft ${currentOrderSlide+1} von 4">${orderSlides.map((_,i)=>`<span class="${i===currentOrderSlide?'active':''}"></span>`).join('')}<small>${currentOrderSlide+1} / 4 · DEIN DÖNER-KONFIGURATOR</small></div></div>`;
let tvNoticeConfig=window.BROS_TV_NOTICES||{};
let configuredNoticeSlides=tvNoticeConfig.slides||[{type:'sunday'},{type:'soup'},{type:'configure'},{type:'logo'}];
const sundaySlots=()=>((typeof shopHours!=='undefined'?shopHours.weekly?.[0]:[])||[]).filter(slot=>!slot.closed&&slot.open&&slot.close);
const visibleNoticeSlides=()=>configuredNoticeSlides.filter(slide=>slide.enabled!==false&&(slide.type!=='soup'||tvAvailable(item('mercimek-corba')))&&(slide.type!=='sunday'||sundaySlots().length>0));
let currentNoticeSlide=0;let playlistNoticeFixed=false;
const noticeContent=()=>{
 const slides=visibleNoticeSlides();const slide=slides[currentNoticeSlide%Math.max(1,slides.length)]||{type:'logo'};
 const soup=item('mercimek-corba');let content='';
 if(slide.type==='sunday')content=`<article class="notice-slide notice-sunday"><span class="notice-kicker">Wir sind für euch da</span><h2>Sonn- &amp;<br><em>Feiertags.</em></h2><div class="notice-hours"><span class="notice-hours-label">Sonntags regulär</span>${sundaySlots().map(slot=>safeTvText(slot.open)+' – '+safeTvText(slot.close)).join('<br>')}<small>UHR</small></div><p class="holiday-homepage-note">Gesonderte Öffnungszeiten?<br>Aktuelle Zeiten auf unserer Homepage.</p></article>`;
 else if(slide.type==='soup')content=`<article class="notice-slide notice-soup"><span class="notice-kicker">Neu im Sortiment</span><img class="notice-soup-image" src="${safeTvText(tvImageSource(soup))}" alt="${safeTvText(soup.name)} mit Dönerbrot"><div class="notice-soup-caption"><div><h2>Tagessuppe</h2><p>Linsen- oder Yayla Çorbası<br>Nach Tagesangebot · inklusive Dönerbrot</p></div><strong>${money(soup.price)}</strong></div></article>`;
 else if(slide.type==='upcoming')content=`<article class="notice-slide notice-soup notice-upcoming"><span class="notice-kicker">${safeTvText(slide.kicker||'Freut euch – demnächst bei BRO’S')}</span><img class="notice-soup-image" src="${safeTvText(slide.image||'assets/products/mini-haehnchenschnitzel-vorschau.jpg')}" alt="${safeTvText(slide.title||'Demnächst im Sortiment')}"><div class="notice-upcoming-caption"><h2>${safeTvText(slide.title||'Mini-Hähnchenschnitzel')}</h2><p>${safeTvText(slide.message||'Mit Mini-Kartoffeln und Kräuterjoghurtsoße mit Dill.')}</p></div></article>`;
 else if(slide.type==='configure')content=`<article class="notice-slide notice-configure"><span class="notice-kicker">Schnell. Einfach. Dein Geschmack.</span><h2>Dein Döner.<br><em>Deine Regeln.</em></h2><div class="notice-qr-row"><img src="assets/order-qr-tv.svg" alt="QR-Code zur Bestellwebsite"><p>Scannen.<br>Zusammenstellen.<br><strong>Bestellen.</strong></p></div><p class="notice-config-tail">Stell deinen Döner auf unserer Website<br>genau nach deinem Geschmack zusammen.</p></article>`;
 else if(slide.type==='announcement')content=`<article class="notice-slide notice-announcement"><span class="notice-kicker">${safeTvText(slide.kicker||'Aktuelle Mitteilung')}</span><h2>${safeTvText(slide.title||(typeof shopNotice!=='undefined'?shopNotice.title:''))}</h2><p>${safeTvText(slide.message||(typeof shopNotice!=='undefined'?shopNotice.message:''))}</p>${slide.image?`<img class="notice-custom-image" src="${safeTvText(slide.image)}" alt="${safeTvText(slide.title||'Mitteilung')}">`:''}</article>`;
 else content=`<article class="notice-slide notice-brand"><div class="brand-reveal"><img src="assets/logo-premium-clean.png" alt="my BRO’S Döner"></div><p>Dein Geschmack.<br><strong>Dein BRO’S.</strong></p></article>`;
 return content+`<div class="notice-progress" aria-label="Mitteilung ${(currentNoticeSlide%Math.max(1,slides.length))+1} von ${slides.length}">${slides.map((_,i)=>`<span class="${i===currentNoticeSlide%slides.length?'active':''}"></span>`).join('')}</div>`;
};
const tvImageSource=p=>/^(https?:|\/)/.test(p?.image||'')?p.image:'assets/products/'+(p?.image||'');
const soupStrip=()=>{const soup=item('mercimek-corba');return tvAvailable(soup)?`<article class="tv-soup-strip"><img src="${safeTvText(tvImageSource(soup))}" alt="${safeTvText(soup.name)}"><div><span class="eyebrow">Neu im Sortiment</span><h2>${safeTvText(soup.name)}</h2><p>Linsen- oder Yayla Çorbası · inklusive Dönerbrot</p><small>Allergene: bitte Personal fragen.</small></div><strong>${money(soup.price)}</strong></article>`:'';};
const dealsAndNotices=()=>`${head('04','Deine Deals. <em>Deine Neuigkeiten.</em>')}<div class="tv-deals-notices"><div class="deals-stack grid">${[['spar-chicken','Hähnchen'],['spar-steak','Kalb Steak']].map(([id,name])=>`<article class="card deal-card">${photo(id)}<div class="inside"><p class="eyebrow">Döner + Getränk</p><h2>${name}</h2><div class="row"><span>Döner</span><strong>${money(item(id).price)}</strong></div><div class="row"><span>Dürüm</span><strong>${money(item(id).sizes[1][1])}</strong></div></div></article>`).join('')}<p class="deals-drinks">Getränk zur Wahl: Cola · Fanta · Sprite · Uludağ · Ayran · Wasser</p></div><section class="tv-notice-area" aria-label="Aktuelle Mitteilungen"><div id="tvNoticeContent">${noticeContent()}</div></section></div>${foot()}`;
const panels=[
()=>`${head('01','DEIN GESCHMACK. <em>DEINE ENTSCHEIDUNG.</em>')}<div class="tv-order-layout"><div class="tv-order-left"><div id="orderMessage">${orderMessage()}</div><div class="tv-order-steps"><span><b>1</b>Scannen</span><span><b>2</b>Zusammenstellen</span><span><b>3</b>Bestellen</span></div><p class="tv-order-contact">Abholung & Lieferung · 0178 5190405</p></div><div class="tv-qr-panel"><img src="assets/order-qr-tv.svg" alt="QR-Code zur BRO’S Bestellwebsite"><h2>Kamera auf. Scannen. Los!</h2><p>Direkt auf die Website.<br>Stell deinen Döner selbst zusammen.</p></div></div><div class="tv-simple-footer"><span>Maybachstraße 18 · Mannheim</span><strong>Frisch für dich. Nach deinem Geschmack.</strong></div>`,
()=>`${head('02','Unsere <em>Klassiker.</em>')}<div class="grid four">${classic('chicken','Hähnchen Döner',row('Döner',item('chicken').price)+row('Dürüm',item('dueruem-chicken').price))}${classic('steak','Kalb Steak Döner',row('Döner',item('steak').price)+row('Dürüm',item('dueruem-steak').price))}${classic('bowl-steak','Döner Bowl',row('Hähnchen',item('bowl-chicken').price)+row('Kalb Steak',item('bowl-steak').price)+'<p class="category-intro">Mit Pommes und<br>frischen Zutaten.</p>')}${classic('box-chicken','Döner Box',row('Hähnchen',item('box-chicken').price)+row('Kalb Steak',item('box-steak').price)+'<p class="category-intro">Nur Pommes & Fleisch.<br>Ohne Salat.</p>')}</div>${soupStrip()}<div class="note classics-sauce-note"><b>Soßen zu Döner & Dürüm:</b> Erste Soße gratis · jede weitere +0,50 €.</div>${foot()}`,
()=>`${head('03','Mehr drin. <em>Unsere Menüs.</em>')}<div class="grid three">${menuCard('menu-1','Kalb Steak')}${menuCard('menu-2','Hähnchen')}<article class="card compact">${photo('nugget-menu')}<div class="inside"><p class="eyebrow">Knusprig & komplett</p><h2>Nugget Menü</h2><p>Mit Pommes + Getränk</p>${item('nugget-menu').sizes.map(s=>row(s[0],s[1])).join('')}<p class="smallprint">1 Dip gratis · jeder weitere +0,50 €</p></div></article></div><div class="menu-bottom"><div class="note" style="margin:0;width:100%"><b>Alle Menüs mit Pommes & Getränk.</b> Getränk zur Wahl: Cola · Fanta · Sprite · Uludağ · Ayran · Wasser<br><b>Döner-Menüs:</b> 1. Soße gratis, weitere +0,50 €.</div></div>${foot()}`,
()=>dealsAndNotices(),
()=>`${head('05','Drinks. Snacks. <em>Deine Extras.</em>')}<div class="grid three"><article class="card list"><h2>Gut gekühlt & heiß</h2>${products.filter(p=>p.category==='drink'&&tvAvailable(p)).map(p=>row(p.name,p.price+(p.deposit||0),p.deposit?`${money(p.price)} + 0,25 € Pfand`:p.id==='kaffee'?'Milch & Zucker kostenlos':'')).join('')}</article><article class="card list"><h2>Für den kleinen Hunger</h2>${photo('nuggets','snack-photo')}${row('Pommes',item('pommes').price)}${item('nuggets').sizes.map(s=>row('Nuggets · '+s[0],s[1])).join('')}<div class="note"><b>Pommes:</b> 1 Dip gratis, weitere +0,50 €.<br><b>Nuggets:</b> Dips je +0,50 €.<br>Ketchup · Mayo · Senf<br>Haussoßen als Extra je +1,00 €.</div></article><article class="card list"><h2>Mach’s zu deinem</h2>${products.filter(p=>p.category==='extra'&&tvAvailable(p)).map(p=>row(p.name,p.price)).join('')}<p class="smallprint">Haussoßen: Knoblauch · Kräuter<br>Cocktail · Scharf</p></article></div>${foot()}`,
()=>dealsAndNotices()
];
// Angaben aus allergene.html, vom Betreiber bestätigt. Keine ungeprüften Codes für Cocktailsoße ergänzen.
const cardAllergens={
 1:['Döner: A · G · K<br>Dürüm: A · G','Döner: A · G · K<br>Dürüm: A · G','Beide Bowls: G','Beide Boxen: G'],
 2:['Döner: A · G · K · Dürüm: A · G<br>Pommes: A* · Ayran bei Auswahl: G','Döner: A · G · K · Dürüm: A · G<br>Pommes: A* · Ayran bei Auswahl: G','Nuggets: A · C · Pommes: A*<br>Ayran bei Auswahl: G · Dips je nach Auswahl'],
 3:['Döner: A · G · K<br>Dürüm: A · G · Ayran bei Auswahl: G','Döner: A · G · K<br>Dürüm: A · G · Ayran bei Auswahl: G'],
 4:['Ayran: G · Milch zum Kaffee: G','Nuggets: A · C · Pommes: A*<br>Mayonnaise: C · J','Käse: G · Knoblauch / Kräuter: C · G<br>Scharfe Soße: J · Mayonnaise: C · J']
};

const tvAvailable=p=>!!p&&p.active!==false&&!['pending','hidden'].includes(p.tvStatus);
const nativeSlots={1:[['chicken','dueruem-chicken'],['steak','dueruem-steak'],['bowl-chicken','bowl-steak'],['box-chicken','box-steak']],2:[['menu-1'],['menu-2'],['nugget-menu']],3:[['spar-chicken'],['spar-steak']],4:[[],['nuggets','pommes'],[]]};
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

function showBoard(index){if(currentBoard===-1&&tvParams.has('notice'))currentNoticeSlide=Math.max(0,visibleNoticeSlides().findIndex(s=>s.id===tvParams.get('notice')||s.type===tvParams.get('notice')));if(index===0&&currentBoard!==-1&&currentBoard!==0&&tvParams.get('loop')!=='order')currentOrderSlide=(currentOrderSlide+1)%orderSlides.length;currentBoard=index;document.querySelector('#board').classList.toggle('tv-order',index===0);document.querySelector('#board').classList.toggle('tv-classics-large',index===1);document.querySelector('#board').classList.toggle('tv-sunday',false);document.querySelector('#board').classList.toggle('tv-deals-board',index===3||index===5);document.querySelector('#board').classList.toggle('tv-full-notice-board',index===6);const sauceNotice=saucePricing.enabled&&saucePricing.additionalPrice>0?`Erste Soße gratis · jede weitere +${money(saucePricing.additionalPrice)}`:'Soßenauswahl kostenlos';
 document.querySelector('#board').innerHTML=panels[index]()
 .replace('Soßen zu Döner & Dürüm:','Soßen zu Döner, Dürüm, Bowl & Box:')
 .replace('Erste Soße gratis · jede weitere +0,50 €.',sauceNotice+'.')
 .replace('1. Soße gratis, weitere +0,50 €.',sauceNotice+'.')
 .replace('Erste Döner-Soße gratis · jede weitere +0,50 €',sauceNotice);
 const cards=[...document.querySelectorAll('#board article.card')];
 (cardAllergens[index===5?3:index]||[]).forEach((text,i)=>{const label=document.createElement('p');label.className='product-allergens';label.innerHTML='<b>Allergene</b> '+text;const card=cards[i];if(!card)return;(card.querySelector('.inside')||card.querySelector('.mini > div')||card).append(label)});
 applyTvProductPlan(index===5?3:index,cards);
 if(index>0&&index<=5){const hint=document.createElement('div');hint.className='allergen-selection-hint';hint.textContent='Soßen & Extras je nach Auswahl: separate Übersicht. A* = mögliche Glutenspuren bei Pommes.';document.querySelector('.footer-meta').before(hint)}
 document.querySelectorAll('[data-board]').forEach(b=>b.classList.toggle('active',Number(b.dataset.board)===index));history.replaceState(null,'','#'+(index+1));resize()}
function resize(){document.querySelector('#board').style.transform=`scale(${document.querySelector('#stage').clientWidth/1920})`}
document.querySelectorAll('[data-board]').forEach(button=>button.addEventListener('click',()=>showBoard(Number(button.dataset.board))));window.addEventListener('resize',resize);
const activePlaylist=tvNoticeConfig.playlists?.find(p=>p.id===(tvParams.get('playlist')||(tvParams.get('loop')==='order'?'tv-order':tvParams.get('loop')==='sunday'?'tv-deals':'')));
if(activePlaylist)document.body.classList.add('export');
panels.push(()=>`${head('INFO','Neuigkeiten. <em>Dein BRO’S.</em>')}<section class="tv-full-notice"><div id="tvNoticeContent">${noticeContent()}</div></section>${foot()}`);
showBoard(tvSequence?tvSequence[0]:Math.max(0,Math.min(panels.length-1,(Number(location.hash.slice(1))||1)-1)));
window.addEventListener('bros:catalog-sync',()=>showBoard(Math.max(0,Math.min(panels.length-1,(Number(location.hash.slice(1))||1)-1))));
if(tvSequence&&!activePlaylist){
 let timer;
 if(tvParams.get('loop')==='order'){
  // 01: four short messages, 1 s each (4 s total); 03: 7 s.
  const schedule=()=>{
   if(currentBoard===0){
    timer=setTimeout(()=>{
     if(currentOrderSlide<orderSlides.length-1){currentOrderSlide++;document.querySelector('#orderMessage').innerHTML=orderMessage();}
     else showBoard(2);
     schedule();
    },1000);
   }else{
    timer=setTimeout(()=>{currentOrderSlide=0;showBoard(0);schedule();},7000);
   }
  };
  schedule();
 }else if(tvParams.get('loop')!=='sunday'){
  const sequence=tvSequence;let position=0;
  const boardDuration=tvParams.get('loop')==='sunday'?10000:5000;
  const advance=()=>{position=(position+1)%sequence.length;showBoard(sequence[position]);timer=setTimeout(advance,boardDuration);};
  timer=setTimeout(advance,boardDuration);
 }
 window.addEventListener('pagehide',()=>clearTimeout(timer),{once:true});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
}else if(!tvParams.has('slide')){
 // Standalone board: change only the text container, never the QR image.
 const textTimer=setInterval(()=>{if(currentBoard!==0)return;currentOrderSlide=(currentOrderSlide+1)%orderSlides.length;document.querySelector('#orderMessage').innerHTML=orderMessage();},1000);
 window.addEventListener('pagehide',()=>clearInterval(textTimer),{once:true});
}

// Update only the right half. The permanent offers and their photos never rerender on notice ticks.
if(!tvParams.has('notice')&&!tvParams.has('export')){
 const interval=Math.max(1000,Number(tvNoticeConfig.intervalMs)||3000);
 const noticeTimer=setInterval(()=>{
  if(playlistNoticeFixed||(currentBoard!==3&&currentBoard!==5))return;
  const content=document.querySelector('#tvNoticeContent');if(!content)return;
  currentNoticeSlide=(currentNoticeSlide+1)%Math.max(1,visibleNoticeSlides().length);content.innerHTML=noticeContent();
 },interval);
 window.addEventListener('pagehide',()=>clearInterval(noticeTimer),{once:true});
}

// Any board or individually designed notice can be combined in an OS-managed playlist.
if(activePlaylist?.entries?.length){
 let playlistIndex=0,playlistTimer;
 const playEntry=()=>{
  const e=activePlaylist.entries[playlistIndex];playlistNoticeFixed=e.type==='notice';
  if(e.type==='notice'){
   const i=visibleNoticeSlides().findIndex(s=>s.id===e.slideId);currentNoticeSlide=Math.max(0,i);showBoard(6);
  }else{const index=Math.max(0,Math.min(5,Number(e.board)-1));if(index===0)currentOrderSlide=0;if(currentBoard!==index)showBoard(index);}
  playlistTimer=setTimeout(()=>{playlistIndex=(playlistIndex+1)%activePlaylist.entries.length;playEntry();},Math.max(1,Number(e.seconds)||5)*1000);
 };
 playEntry();window.addEventListener('pagehide',()=>clearTimeout(playlistTimer),{once:true});
}
// Config is public content only. Reload once after a saved/published change, including playlist edits.
const configPoll=setInterval(async()=>{
 try{const response=await fetch('tv-player-config.json',{cache:'no-store'});if(!response.ok)return;const next=await response.json();if(!Array.isArray(next.slides)||!Array.isArray(next.playlists))return;
 if(JSON.stringify(next)!==JSON.stringify(window.BROS_TV_NOTICES))location.reload();}catch{/* offline fallback remains usable */}
},30000);
window.addEventListener('pagehide',()=>clearInterval(configPoll),{once:true});
