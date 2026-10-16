(() => {
 'use strict';
 const nav=document.querySelector('.categories');
 if(!nav)return;
 const launch=document.createElement('div');launch.className='price-list-launch';
 const trigger=document.createElement('button');trigger.type='button';trigger.className='price-list-button';trigger.textContent='Preisliste';trigger.setAttribute('aria-haspopup','dialog');launch.append(trigger);nav.before(launch);
 const dialog=document.createElement('dialog');dialog.className='price-list-dialog';dialog.setAttribute('aria-labelledby','priceListTitle');
 dialog.innerHTML='<header class="price-list-header"><div><p class="eyebrow">BRO’S · Schnellübersicht</p><h2 id="priceListTitle">Unsere Preisliste</h2><p>Alle Produkte und Varianten auf einen Blick.</p></div><button type="button" class="price-list-close" aria-label="Preisliste schließen">×</button></header><nav class="price-list-nav" aria-label="Preisliste Kategorien"></nav><div class="price-list-content"></div><footer class="price-list-footer"><p>Alle Preise in Euro, inklusive Mehrwertsteuer. Extras und Aufpreise nach Auswahl. Getränke mit Pfand sind entsprechend gekennzeichnet.</p><a href="allergene.html">Allergene ansehen</a><button type="button" class="price-list-back">Zur Bestellung →</button></footer>';
 document.body.append(dialog);
 const money=n=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'}).format(n);
 const categories=[['offer','Sparangebote'],['menu','Menüs'],['doener','Döner'],['dueruem','Dürüm'],['bowl','Bowls'],['box','Boxen'],['snack','Snacks'],['daily','Tagesgerichte'],['extra','Extras'],['drink','Getränke']];
 function node(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
 function render(){
  const content=dialog.querySelector('.price-list-content'),links=dialog.querySelector('.price-list-nav');content.replaceChildren();links.replaceChildren();
  const visible=products.filter(p=>p.active!==false);
  const groups=[...categories];for(const p of visible)if(!groups.some(([id])=>id===p.category))groups.push([p.category,'Weitere Produkte']);
  for(const [category,label] of groups){
   const items=visible.filter(p=>p.category===category);if(!items.length)continue;
   const id='price-category-'+groups.findIndex(g=>g[0]===category),section=node('section','price-list-group');section.id=id;section.append(node('h3','',label));
   const link=node('a','',label);link.href='#'+id;link.addEventListener('click',e=>{e.preventDefault();section.scrollIntoView({behavior:'smooth',block:'start'});});links.append(link);
   for(const p of items){
    const item=node('article','price-list-item');item.append(node('h4','',p.name));
    const variants=p.small?[['Ganzer Döner',p.price],['Halber Döner',p.small]]:p.sizes?.length?p.sizes:[['',p.price]];
    for(const [label,price] of variants){const row=node('div','price-list-row');row.append(node('span','',label||'Preis'),node('strong','',money(Number(price)+Number(p.deposit||0))));item.append(row);}
    if(p.deposit)item.append(node('p','price-list-note','Inklusive '+money(p.deposit)+' Pfand.'));
    if(p.drinks)item.append(node('p','price-list-note','Getränk inklusive.'));
    section.append(item);
   }
   content.append(section);
  }
  if(typeof saucePricing!=='undefined'&&saucePricing.enabled&&saucePricing.additionalPrice>0)content.append(node('p','price-list-sauce','Bei Döner, Dürüm, Bowl, Box und Döner-Menüs: erste Soße gratis, jede weitere +'+money(saucePricing.additionalPrice)+'. Separate Extras und Dips laut Preisliste.'));
 }
 let scrollY=0;
 trigger.addEventListener('click',()=>{render();scrollY=window.scrollY;dialog.showModal();document.body.classList.add('price-list-open');dialog.scrollTop=0;dialog.querySelector('.price-list-close').focus();});
 function close(){dialog.close();}
 dialog.querySelector('.price-list-close').addEventListener('click',close);
 dialog.querySelector('.price-list-back').addEventListener('click',close);
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('price-list-open');window.scrollTo(0,scrollY);trigger.focus();});
 window.addEventListener('bros:catalog-sync',()=>{if(dialog.open)render();});
})();
