(function(){
 'use strict';
 const storageKey='bros-order-cart-session-v1',doneKey='bros-reorder-done-v1',openKey='bros-order-cart-open-v1';
 const get=(key,fallback)=>{try{return JSON.parse(sessionStorage.getItem(key))??fallback;}catch{return fallback;}};
 const put=(key,value)=>{try{sessionStorage.setItem(key,JSON.stringify(value));}catch{}};
 const valid=item=>item&&typeof item.name==='string'&&item.name.length<=200&&Number.isFinite(item.price)&&item.price>=0&&item.price<=10000&&typeof item.details==='string'&&item.details.length<=5000&&typeof item.size==='string'&&typeof (item.recipient??'')==='string';
 const previous=get(storageKey,[]);
 if(!cart.length&&Array.isArray(previous)&&previous.length<=100&&previous.every(valid))cart=previous;
 const originalUpdate=updateCart;
 updateCart=function(){originalUpdate();put(storageKey,cart);};
 const originalOpen=openCart,originalClose=closeOverlay;
 openCart=function(){originalOpen();put(openKey,true);};
 closeOverlay=function(id){originalClose(id);if(id==='cartOverlay')put(openKey,false);};
 function restoreCart(){
  const stored=get(storageKey,null);
  if(Array.isArray(stored)&&stored.length<=100&&stored.every(valid))cart=stored;
  originalUpdate();
  const overlay=document.getElementById('cartOverlay');
  const rememberedOpen=get(openKey,null);
  if(rememberedOpen===true||(rememberedOpen===null&&overlay&&!overlay.hidden))openCart();
  else if(rememberedOpen===false&&overlay&&!overlay.hidden)originalClose('cartOverlay');
 }
 updateCart();
 let busy=false;
 function status(text,retry){
  let box=document.getElementById('reorderImportStatus');
  if(!box){box=document.createElement('div');box.id='reorderImportStatus';box.className='option-group';box.setAttribute('role','status');box.style.cssText='padding:16px;margin:16px;border:1px solid #d9ad4a;border-radius:12px';document.querySelector('.topbar').after(box);}
  box.replaceChildren();const message=document.createElement('p');message.textContent=text;box.append(message);
  if(retry){const button=document.createElement('button');button.className='primary';button.textContent='Erneut versuchen';button.onclick=importRemembered;box.append(button);const login=document.createElement('a');login.href='https://kunden.mybros-doner.de/';login.textContent=' Zum Kundenkonto';box.append(login);}
 }
 function showProducts(){
  closeOverlay('cartOverlay');
  history.replaceState(null,'',location.pathname+location.search+'#speisekarte');
  const section=document.getElementById('speisekarte');
  if(section){section.style.scrollMarginTop=((document.querySelector('.topbar')?.offsetHeight||100)+12)+'px';section.scrollIntoView({behavior:'smooth',block:'start'});}
 }
 async function importRemembered(){
  if(busy||!location.hash.startsWith('#bros-reorder='))return;
  busy=true;
  try{
   const value=JSON.parse(decodeURIComponent(location.hash.slice('#bros-reorder='.length)));
   if(value.version!==1||typeof value.transferId!=='string'||!/^[a-f0-9-]{36}$/i.test(value.transferId)||!Array.isArray(value.items)||!value.items.length||value.items.length>20)throw new Error('Ungültige Übergabe aus der Merkliste.');
   if(!value.items.every(item=>typeof item.id==='string'&&/^[a-f0-9-]{36}$/i.test(item.id)&&Number.isInteger(item.quantity)&&item.quantity>=1&&item.quantity<=20))throw new Error('Ungültige Artikelmenge.');
   const done=get(doneKey,[]);
   if(Array.isArray(done)&&done.includes(value.transferId)){showProducts();return;}
   if(cart.length+value.items.reduce((n,item)=>n+item.quantity,0)>100)throw new Error('Bitte höchstens 100 Artikel im Warenkorb zusammenstellen.');
   status('Gemerkte Gerichte und aktuelle Preise werden geprüft …');
   const additions=[];
   for(const item of value.items){
    const response=await fetch('https://kunden.mybros-doner.de/api/customer/favorites/'+item.id+'/quote',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:'{}',signal:AbortSignal.timeout(12000)});
    const quote=await response.json();
    if(!response.ok)throw new Error(quote.error?.message||'Bitte im Kundenkonto anmelden und die Merkliste erneut öffnen.');
    if(!Number.isSafeInteger(quote.unitPriceCents)||quote.unitPriceCents<0||quote.unitPriceCents>1000000||typeof quote.name!=='string'||!Array.isArray(quote.options))throw new Error('Der aktuelle Preis konnte nicht bestätigt werden.');
    const favoriteName=String(quote.favoriteName||'');const marker=favoriteName.lastIndexOf(' · für ');
    const recipient=marker>=0?favoriteName.slice(marker+7).trim().slice(0,30):'';
    const variant=quote.options.find(option=>option.label==='Variante');
    const entry={name:quote.name,price:quote.unitPriceCents/100,details:quote.options.map(option=>option.label+': '+option.value).join(', '),size:variant?.value||'',recipient};
    for(let index=0;index<item.quantity;index++)additions.push({...entry});
   }
   // Commit only after every item has passed the server's ownership/availability checks.
   cart.push(...additions);updateCart();put(doneKey,[...(Array.isArray(done)?done:[]),value.transferId].slice(-50));
   status('Aus der Merkliste im Warenkorb: '+additions.length+' Artikel. Du kannst weitere Gerichte hinzufügen und anschließend gemeinsam bestellen.');
   showProducts();
  }catch(error){status(error.message||'Die gemerkten Artikel konnten nicht übernommen werden.',true);}
  finally{busy=false;}
 }
 importRemembered();
 window.addEventListener('pageshow',()=>{restoreCart();importRemembered();});
 window.addEventListener('hashchange',()=>{restoreCart();importRemembered();});
 window.addEventListener('pagehide',()=>{put(storageKey,cart);});
})();
