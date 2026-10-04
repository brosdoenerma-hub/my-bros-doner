(()=>{
 const preview=['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).get('noticePreview')==='1';
 if(!shopNotice.enabled&&!preview)return;
 const tv=Boolean(document.querySelector('#stage'));
 if(tv||!shopNotice.showOnWebsite)return;
 const box=document.createElement('section');box.className=`shop-notice ${shopNotice.tone?`notice-${shopNotice.tone}`:''}`;box.setAttribute('role','note');box.setAttribute('aria-label','Aktuelle Kundenmitteilung');
 const icon=document.createElement('span');icon.className='shop-notice-icon';icon.textContent='!';
 const content=document.createElement('div');content.className='shop-notice-content';
 const eyebrow=document.createElement('small');eyebrow.textContent=preview?'Vorschau':shopNotice.eyebrow||'Aktuelle Mitteilung';
 const title=document.createElement('strong');title.textContent=preview?'Sonderöffnungszeiten / Aktion':shopNotice.title;
 const text=document.createElement('span');text.textContent=preview?'Beispiel: Heute schließen wir früher. Alternativ kannst du hier Aktionen, Urlaub oder Hinweise zur Bestellung anzeigen.':shopNotice.message;
 content.append(eyebrow,title,text);
 if((preview&&!(shopNotice.cta||'').trim())||(shopNotice.cta||'').trim()){
  const cta=document.createElement('b');cta.className='shop-notice-cta';cta.textContent=preview?'Nur für kurze Zeit sichtbar':shopNotice.cta;content.append(cta);
 }
 box.append(icon,content);
 const hero=document.querySelector('.hero');
 if(hero)hero.insertAdjacentElement('afterend',box);else document.querySelector('main')?.prepend(box);
})();
