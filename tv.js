const tvParams=new URLSearchParams(location.search);
const tv2Slideshow=tvParams.get('tv')==='2';
if(tvParams.has('export')||tv2Slideshow)document.body.classList.add('export');
const money=n=>n.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const item=id=>products.find(p=>p.id===id);
const photo=(id,cls='')=>`<img class="${cls}" src="assets/products/${item(id).image}" alt="${item(id).name}">`;
const row=(label,value,detail='')=>`<div class="row"><span>${label}${detail?`<small>${detail}</small>`:''}</span><strong>${money(value)}</strong></div>`;
const head=(n,title)=>`<header><div><p class="eyebrow">MY BRO’S DÖNER / ${n}</p><h1>${title}</h1></div><span class="pill">Fleischprodukte · 100 % Halal</span><img src="assets/logo-premium-clean.png" alt="my Bro’s Döner"></header>`;
const allergenLegend=[['A','Glutenhaltiges Getreide'],['B','Krebstiere'],['C','Eier'],['D','Fisch'],['E','Erdnüsse'],['F','Soja'],['G','Milch / Laktose'],['H','Schalenfrüchte'],['I','Sellerie'],['J','Senf'],['K','Sesam'],['L','Schwefeldioxid / Sulfite'],['M','Lupinen'],['N','Weichtiere']];
const foot=()=>`<footer><div class="allergen-title">ALLERGENE · LEGENDE A–N</div><div class="allergen-strip">${allergenLegend.map(([code,name])=>`<div><b>${code}</b><span>${name}</span></div>`).join('')}</div><div class="footer-meta"><span>Alle Preise inkl. MwSt. · Abbildungen können abweichen.</span><span>Allergene je Gericht und Zutat: separate Übersicht / bitte Personal fragen.</span></div></footer>`;
const classic=(id,title,content)=>`<article class="card">${photo(id)}<div class="inside"><h2>${title}</h2>${content}</div></article>`;
const menuCard=(id,title)=>`<article class="card compact">${photo(id)}<div class="inside"><p class="eyebrow">${item(id).name}</p><h2>${title}</h2><p>Ganzer Döner + Pommes + Getränk</p><div class="row"><span>Döner-Menü</span><strong>${money(item(id).price)}</strong></div><div class="row"><span>Als Dürüm</span><strong>${money(item(id).sizes[1][1])}</strong></div></div></article>`;
const panels=[
()=>`${head('01','Dein Döner. <em>Deine Wahl.</em>')}<div class="hero"><div><span class="pill">Direkt bei uns bestellen</span><h1>ECHTER<br><em>GESCHMACK.</em><br>DEIN DÖNER.</h1><p>Zutaten wählen. Lieblingssoße hinzufügen.<br>Über WhatsApp bestellen und genießen.</p><div class="qrbox"><img src="assets/order-qr.svg" alt="QR-Code zur Webseite"><div><h2>Scannen & loslegen ↗</h2><p>Abholung & Lieferung<br>Maybachstr. 18 · Mannheim<br>0178 5190405</p></div></div></div><img class="hero-photo" src="assets/candidates/hero-variante-3-hell-web.jpg" alt="Bro’s Produktpalette"></div>${foot()}`,
()=>`${head('02','Unsere <em>Klassiker.</em>')}<div class="grid four">${classic('chicken','Hähnchen Döner',row('Halber Döner',item('chicken').small)+row('Ganzer Döner',item('chicken').price)+row('Dürüm',item('dueruem-chicken').price))}${classic('steak','Kalb Steak Döner',row('Halber Döner',item('steak').small)+row('Ganzer Döner',item('steak').price)+row('Dürüm',item('dueruem-steak').price))}${classic('bowl-steak','Döner Bowl',row('Hähnchen',item('bowl-chicken').price)+row('Kalb Steak',item('bowl-steak').price)+'<p class="category-intro">Mit Pommes und<br>frischen Zutaten.</p>')}${classic('box-chicken','Döner Box',row('Hähnchen',item('box-chicken').price)+row('Kalb Steak',item('box-steak').price)+'<p class="category-intro">Nur Pommes & Fleisch.<br>Ohne Salat.</p>')}</div><div class="note"><b>Soßen zu Döner & Dürüm:</b> Erste Soße gratis · jede weitere +0,50 €.</div>${foot()}`,
()=>`${head('03','Mehr drin. <em>Unsere Menüs.</em>')}<div class="grid three">${menuCard('menu-2','Hähnchen')}${menuCard('menu-1','Kalb Steak')}<article class="card compact">${photo('kids-menu')}<div class="inside"><p class="eyebrow">Für die Kleinen</p><h2>Kids Menü</h2><p>Halber Döner oder 4 Nuggets<br>+ kleine Pommes + Capri-Sonne</p><div class="price">${money(item('kids-menu').price)}</div><p class="smallprint">1 Dip gratis · jeder weitere +0,50 €</p></div></article></div><div class="menu-bottom"><article class="card mini">${photo('nugget-menu')}<div><h2>Nugget Menü · mit Pommes & Getränk</h2><p>${item('nugget-menu').sizes.map(s=>`${s[0]}: <strong>${money(s[1])}</strong>`).join(' &nbsp; / &nbsp; ')}</p></div></article><div class="note" style="margin:0"><b>Getränk zur Wahl:</b> Cola · Fanta · Sprite · Uludağ · Ayran · Wasser<br><b>Döner-Menüs:</b> 1. Soße gratis, weitere +0,50 €.</div></div>${foot()}`,
()=>`${head('04','Guter Geschmack. <em>Guter Deal.</em>')}<div class="grid two">${[['spar-chicken','Hähnchen'],['spar-steak','Kalb Steak']].map(([id,name])=>`<article class="card offer">${photo(id)}<div class="inside"><p class="eyebrow">Sparangebot</p><h2>Ganzer<br>${name} Döner</h2><p>+ ein Getränk deiner Wahl</p><div class="price">${money(item(id).price)}</div><p>Als Dürüm: <b>${money(item(id).sizes[1][1])}</b></p></div></article>`).join('')}</div><div class="note"><b>Getränk zur Wahl:</b> Cola · Fanta · Sprite · Uludağ · Ayran · Wasser<br>Erste Döner-Soße gratis · jede weitere +0,50 € · Zutaten nach deinem Geschmack.</div>${foot()}`,
()=>`${head('05','Drinks. Snacks. <em>Deine Extras.</em>')}<div class="grid three"><article class="card list"><h2>Gut gekühlt & heiß</h2>${products.filter(p=>p.category==='drink').map(p=>row(p.name,p.price+(p.deposit||0),p.deposit?`${money(p.price)} + 0,25 € Pfand`:p.id==='kaffee'?'Milch & Zucker kostenlos':'')).join('')}</article><article class="card list"><h2>Für den kleinen Hunger</h2>${photo('nuggets','snack-photo')}${row('Pommes',item('pommes').price)}${item('nuggets').sizes.map(s=>row('Nuggets · '+s[0],s[1])).join('')}<div class="note"><b>Pommes:</b> 1 Dip gratis, weitere +0,50 €.<br><b>Nuggets:</b> Dips je +0,50 €.<br>Ketchup · Mayo · Senf<br>Haussoßen als Extra je +1,00 €.</div></article><article class="card list"><h2>Mach’s zu deinem</h2>${products.filter(p=>p.category==='extra').map(p=>row(p.name,p.price)).join('')}<p class="smallprint">Haussoßen: Knoblauch · Kräuter<br>Cocktail · Scharf</p></article></div>${foot()}`
];
// Angaben aus allergene.html, vom Betreiber bestätigt. Keine ungeprüften Codes für Cocktailsoße ergänzen.
const cardAllergens={
 1:['Döner: A · G · K<br>Dürüm: A · G','Döner: A · G · K<br>Dürüm: A · G','Beide Bowls: G','Beide Boxen: G'],
 2:['Döner: A · G · K · Dürüm: A · G<br>Pommes: A* · Ayran bei Auswahl: G','Döner: A · G · K · Dürüm: A · G<br>Pommes: A* · Ayran bei Auswahl: G','Döner: A · G · K · Nuggets: A · C<br>Pommes: A* · Dips je nach Auswahl','Nuggets: A · C · Pommes: A*<br>Ayran bei Auswahl: G · Dips je nach Auswahl'],
 3:['Döner: A · G · K<br>Dürüm: A · G · Ayran bei Auswahl: G','Döner: A · G · K<br>Dürüm: A · G · Ayran bei Auswahl: G'],
 4:['Ayran: G · Milch zum Kaffee: G','Nuggets: A · C · Pommes: A*<br>Mayonnaise: C · J','Käse: G · Knoblauch / Kräuter: C · G<br>Scharfe Soße: J · Mayonnaise: C · J']
};
function showBoard(index){const sauceNotice=saucePricing.enabled&&saucePricing.additionalPrice>0?`Erste Soße gratis · jede weitere +${money(saucePricing.additionalPrice)}`:'Soßenauswahl kostenlos';
 document.querySelector('#board').innerHTML=panels[index]()
 .replace('Soßen zu Döner & Dürüm:','Soßen zu Döner, Dürüm, Bowl & Box:')
 .replace('Erste Soße gratis · jede weitere +0,50 €.',sauceNotice+'.')
 .replace('1. Soße gratis, weitere +0,50 €.',sauceNotice+'.')
 .replace('Erste Döner-Soße gratis · jede weitere +0,50 €',sauceNotice);
 const cards=[...document.querySelectorAll('#board article.card')];
 (cardAllergens[index]||[]).forEach((text,i)=>{const label=document.createElement('p');label.className='product-allergens';label.innerHTML='<b>Allergene</b> '+text;const card=cards[i];(card.querySelector('.inside')||card.querySelector('.mini > div')||card).append(label)});
 if(index>0){const hint=document.createElement('div');hint.className='allergen-selection-hint';hint.textContent='Soßen & Extras je nach Auswahl: separate Übersicht. A* = mögliche Glutenspuren bei Pommes.';document.querySelector('.footer-meta').before(hint)}
 document.querySelectorAll('[data-board]').forEach(b=>b.classList.toggle('active',Number(b.dataset.board)===index));history.replaceState(null,'','#'+(index+1));resize()}
function resize(){document.querySelector('#board').style.transform=`scale(${document.querySelector('#stage').clientWidth/1920})`}
document.querySelectorAll('[data-board]').forEach(button=>button.addEventListener('click',()=>showBoard(Number(button.dataset.board))));window.addEventListener('resize',resize);
showBoard(tv2Slideshow?0:Math.max(0,Math.min(4,(Number(location.hash.slice(1))||1)-1)));
if(tv2Slideshow){
 // TV2: Tafel 01 und 04, jeweils 15 Sekunden. Andere URLs bleiben statisch.
 const sequence=[0,3];let position=0;
 const timer=setInterval(()=>{position=(position+1)%sequence.length;showBoard(sequence[position])},15000);
 window.addEventListener('pagehide',()=>clearInterval(timer),{once:true});
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
}
