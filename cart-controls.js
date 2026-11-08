(function(){
 'use strict';
 function boot(){
  if(typeof cart==='undefined'||typeof groupedCart!=='function'||typeof updateCart!=='function'||typeof openCart!=='function')return;
  const model=window.brosCartControlsModel,container=document.getElementById('cartItems'),send=document.getElementById('sendWhatsapp');
  if(!model||!container||!send)return;
  const normalNodes=[...send.childNodes].map(node=>node.cloneNode(true));
  const money=cents=>(cents/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
  let hint=document.getElementById('cartDeliveryShortfall');
  if(!hint){hint=document.createElement('div');hint.id='cartDeliveryShortfall';hint.className='cart-delivery-shortfall';hint.hidden=true;send.before(hint);}
  const message=document.createElement('p');message.setAttribute('role','status');message.setAttribute('aria-live','polite');
  const more=document.createElement('button');more.type='button';more.className='cart-add-more';more.textContent='Weitere Artikel hinzufügen';hint.replaceChildren(message,more);
  let actionStatus=document.getElementById('cartQuantityStatus');
  if(!actionStatus){actionStatus=document.createElement('p');actionStatus.id='cartQuantityStatus';actionStatus.className='cart-quantity-status';actionStatus.setAttribute('role','status');container.after(actionStatus);}
  function shop(){
   closeOverlay('minimumOverlay');closeOverlay('cartOverlay');
   const target=document.getElementById('speisekarte')||document.getElementById('productGrid');
   if(target){target.style.scrollMarginTop=((document.querySelector('.topbar')?.offsetHeight||80)+12)+'px';target.scrollIntoView({behavior:'smooth',block:'start'});}
  }
  more.addEventListener('click',shop);
  function deliveryStatus(){
   const state=model.delivery(cart,mode,22);hint.hidden=!state.blocked;
   send.classList.toggle('cart-delivery-blocked',state.blocked);
   send.setAttribute('aria-disabled',String(state.blocked));
   // Native disabling also prevents keyboard activation. Existing WhatsApp validation remains.
   send.disabled=state.blocked||cart.length===0;
   if(state.blocked){
    const label='Noch '+money(state.missingCents)+' bis zur Lieferung';
    if(send.textContent!==label)send.textContent=label;
    message.textContent='Für die Lieferung fehlen noch '+money(state.missingCents)+' Warenwert. Mindestbestellwert: 22,00 € ohne Liefergebühr. Bitte weitere Artikel hinzufügen oder Abholung wählen.';
    send.title=message.textContent;
   }else{
    if(send.dataset.cartShortfall==='true')send.replaceChildren(...normalNodes.map(node=>node.cloneNode(true)));
    send.title='';
   }
   send.dataset.cartShortfall=String(state.blocked);
  }
  function quantityButton(label,action,index,text){
   const button=document.createElement('button');button.type='button';button.className='cart-quantity-button'+(action==='delete'?' cart-trash':'');
   button.setAttribute('aria-label',label);button.dataset.cartQuantity=action;button.dataset.cartIndex=String(index);
   if(action==='delete'){
    button.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/></svg>';
   }else button.textContent=text;
   return button;
  }
  function enhance(){
   const groups=groupedCart();
   const rows=container.querySelectorAll('.cart-item');
   rows.forEach((row,i)=>{
    if(row.querySelector('.cart-quantity-controls'))return;
    const group=groups[i];if(!group||!group.indices?.length)return;
    const index=group.indices[0],name=group.name+(group.recipient?' für '+group.recipient:'');
    row.classList.add('cart-item-with-controls');
    row.querySelectorAll('[data-remove]').forEach(button=>button.remove());
    const controls=document.createElement('div');controls.className='cart-quantity-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label','Menge für '+name);
    const minus=quantityButton('Ein Stück weniger: '+name,'minus',index,'−');minus.disabled=group.quantity<=1;
    const value=document.createElement('span');value.className='cart-quantity-value';value.textContent=String(group.quantity);value.setAttribute('aria-label','Menge: '+group.quantity);
    const plus=quantityButton('Ein Stück mehr: '+name,'plus',index,'+');plus.disabled=cart.length>=100;
    controls.append(minus,value,plus,quantityButton('Position vollständig entfernen: '+name,'delete',index));row.append(controls);
   });
  }
  container.addEventListener('click',event=>{
   const control=event.target.closest('[data-cart-quantity]');if(!control||!container.contains(control))return;
   event.preventDefault();event.stopPropagation();
   const index=Number(control.dataset.cartIndex),action=control.dataset.cartQuantity;
   const result=model.change(cart,index,action);
   if(result.message)actionStatus.textContent=result.message;
   if(!result.changed)return;
   const label=cart[index]?.name||'Artikel';
   cart=result.items;
   const sheet=document.querySelector('#cartOverlay .sheet'),scroll=sheet?.scrollTop||0;
   updateCart();openCart();enhance();deliveryStatus();
   if(sheet)sheet.scrollTop=scroll;
   actionStatus.textContent=action==='delete'?label+' aus dem Warenkorb entfernt.':'Menge aktualisiert.';
  },true);
  const previousUpdate=updateCart;
  updateCart=function(){const result=previousUpdate.apply(this,arguments);deliveryStatus();return result;};
  // Existing click listeners may retain older openCart references. Observing newly
  // rendered rows also covers those references and browser-back restoration.
  new MutationObserver(enhance).observe(container,{childList:true,subtree:true});
  window.addEventListener('pageshow',()=>{enhance();deliveryStatus();});
  enhance();deliveryStatus();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
