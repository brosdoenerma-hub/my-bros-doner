(()=>{
 const preview=['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).get('noticePreview')==='1';
 if(document.querySelector('#stage'))return;
 const notices=[shopNotice,...(Array.isArray(shopNotice.additional)?shopNotice.additional:[])];
 const host=document.createElement('div');host.className='shop-notices';host.setAttribute('data-no-translate','');
 function formatted(node,text){for(const part of String(text||'').split(/(\*\*[^*]+\*\*)/g)){if(part.startsWith('**')&&part.endsWith('**')){const strong=document.createElement('strong');strong.className='shop-notice-bold';strong.textContent=part.slice(2,-2);node.append(strong);}else node.append(document.createTextNode(part));}}
 function draw(){
  host.replaceChildren();const lang=document.documentElement.lang?.slice(0,2)||'de';
  for(const notice of notices){
   if((!notice.enabled&&!preview)||!notice.showOnWebsite)continue;
   const translation=notice.translations?.[lang]||{};
   const textFor=key=>translation[key]||notice[key]||'';
   const box=document.createElement('section');box.className=`shop-notice ${notice.tone?`notice-${notice.tone}`:''}`;box.setAttribute('role','note');box.setAttribute('aria-label',textFor('title')||'Aktuelle Kundenmitteilung');
   const icon=document.createElement('span');icon.className='shop-notice-icon';icon.textContent='!';
   const content=document.createElement('div');content.className='shop-notice-content';
   const eyebrow=document.createElement('small');eyebrow.textContent=preview?'Vorschau':textFor('eyebrow')||'Aktuelle Mitteilung';
   const title=document.createElement('strong');title.textContent=preview?'Sonderöffnungszeiten / Aktion':textFor('title');
   const text=document.createElement('span');text.className='shop-notice-message';formatted(text,preview?'Beispiel: Hier stehen deine Mitteilungen.':textFor('message'));
   content.append(eyebrow,title,text);
   let ctaText=textFor('cta');
   if(!translation.cta&&lang!=='de'){
    const m=ctaText.match(/^Heute bis (.+) Uhr$/);const until={tr:'Bugün kapanış:',en:'Today until',fr:'Aujourd’hui jusqu’à'};const closed={tr:'Bugün kapalı',en:'Closed today',fr:'Fermé aujourd’hui'};
    if(m&&until[lang])ctaText=until[lang]+' '+m[1];else if(ctaText==='Heute geschlossen'&&closed[lang])ctaText=closed[lang];
   }
   if(ctaText.trim()){const cta=document.createElement('b');cta.className='shop-notice-cta';cta.textContent=ctaText;content.append(cta);}
   box.append(icon,content);host.append(box);
  }
  host.hidden=!host.childNodes.length;
 }
 const hero=document.querySelector('.hero');
 if(hero)hero.insertAdjacentElement('afterend',host);else document.querySelector('main')?.prepend(host);
 draw();
 let previous=document.documentElement.lang;
 const languageObserver=new MutationObserver(()=>{const lang=document.documentElement.lang;if(lang!==previous){previous=lang;draw();}});
 languageObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 window.addEventListener('pagehide',()=>languageObserver.disconnect(),{once:true});
 window.addEventListener('pageshow',e=>{if(e.persisted){languageObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});previous=document.documentElement.lang;draw();}});
})();
