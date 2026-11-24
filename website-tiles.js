(()=>{
 'use strict';
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
 // Reuse the portal's shared preference; no second theme storage format.
 const appearance=node('label','website-appearance-choice','Darstellung '),select=node('select');select.setAttribute('aria-label','Darstellung');
 for(const [value,label] of [['system','System'],['light','Hell'],['dark','Dunkel']]){const o=node('option','',label);o.value=value;select.append(o);}select.value=document.documentElement.dataset.appearance||'system';
 select.onchange=()=>{const value=select.value;try{localStorage.setItem('bros-customer-appearance-v1',value);}catch{}if(location.protocol==='https:'&&(location.hostname==='mybros-doner.de'||location.hostname.endsWith('.mybros-doner.de')))document.cookie='bros_appearance='+value+'; Domain=mybros-doner.de; Path=/; Max-Age=31536000; Secure; SameSite=Lax';window.dispatchEvent(new Event('pageshow'));};appearance.append(select);document.querySelector('footer').append(appearance);
 const fields=['customerName','customerPhone','customerAddress','customerPostcode','customerCity'].map(id=>document.getElementById(id));
 function validate(report=false){
  for(const input of fields){input.required=mode==='Lieferung';input.setCustomValidity('');if(input.required&&!input.value.trim())input.setCustomValidity('Bitte ausfüllen.');}
  const phone=document.getElementById('customerPhone');if(phone.value.trim()&&(!/^[+0-9 ()/.\-]+$/.test(phone.value)||phone.value.replace(/\D/g,'').length<7||phone.value.replace(/\D/g,'').length>18))phone.setCustomValidity('Bitte eine gültige Telefonnummer eingeben.');
  const valid=fields.filter(input=>!input.closest('[hidden]')).every(input=>input.checkValidity());if(!valid&&report)fields.find(input=>!input.closest('[hidden]')&&!input.checkValidity())?.reportValidity();return valid&&cart.length>0&&(mode!=='Lieferung'||orderAmounts().subtotal>=22);
 }
 window.brosValidateCheckout=()=>validate(true);
 const review=node('dialog','order-review');review.setAttribute('aria-labelledby','orderReviewTitle');document.body.append(review);
 window.brosReviewOrder=()=>{
  if(!validate(true))return;review.replaceChildren();const header=node('header','review-header');header.append(node('h2','','Bestellvorschau'));header.firstChild.id='orderReviewTitle';const close=node('button','review-close','×');close.type='button';close.setAttribute('aria-label','Vorschau schließen');close.onclick=()=>review.close();header.append(close);review.append(header,node('p','review-mode',mode));
  for(const item of groupedCart()){const row=node('article','review-item'),line=node('div','review-item-main');line.append(node('strong','',item.quantity+'× '+item.name),node('strong','',euro(item.price*item.quantity)));row.append(line);if(item.recipient)row.append(node('p','review-recipient','Für: '+item.recipient));if(item.size||item.details)row.append(node('p','review-options',[item.size,item.details].filter(Boolean).join(' · ')));review.append(row);}
  const amounts=orderAmounts();for(const [label,value,cls] of [['Warenwert',amounts.subtotal,'review-amount'],...(mode==='Lieferung'?[['Liefergebühr',amounts.fee,'review-amount']]:[]),['Gesamt',amounts.total,'review-total']]){const row=node('div',cls);row.append(node('strong','',label),node('strong','',euro(value)));review.append(row);}
  const contact=node('section','review-contact');contact.append(node('h3','','Kontakt & Lieferung'));const val=id=>document.getElementById(id).value.trim();if(val('customerName'))contact.append(node('strong','review-name',val('customerName')));if(val('customerPhone'))contact.append(node('p','','Telefon: '+val('customerPhone')));if(mode==='Lieferung')contact.append(node('p','',val('customerAddress')),node('p','',val('customerPostcode')+' '+val('customerCity')));if(val('customerTime'))contact.append(node('p','','Gewünschte Uhrzeit: '+val('customerTime')));if(val('customerNote'))contact.append(node('p','','Lieferanweisung: '+val('customerNote')));review.append(contact,node('p','review-disclaimer','Deine Bestellanfrage wird erst durch unsere ausdrückliche Bestätigung verbindlich.'));
  const actions=node('div','review-actions'),edit=node('button','','Bearbeiten');edit.type='button';edit.onclick=()=>review.close();const send=node('button','primary','Bestellanfrage über WhatsApp senden');send.type='button';send.onclick=()=>{if(validate(true))sendWhatsappRequest();};actions.append(edit,send);review.append(actions);review.showModal();
 };
 document.querySelector('#sendWhatsapp').firstChild.textContent='Bestellung prüfen ';
 document.querySelectorAll('.customer-fields input,.customer-fields textarea').forEach(input=>input.addEventListener('input',()=>{input.setCustomValidity('');if(review.open)review.close();}));
 // Keep only the category grid in the menu; existing notices and OS settings remain intact.
 const priceLaunch=document.querySelector('.price-list-launch');if(priceLaunch)document.querySelector('.trust').after(priceLaunch);
 const upcoming=document.querySelector('.assortment-news');if(upcoming)document.querySelector('.menu').after(upcoming);
 const info=document.querySelector('.info-strip');document.querySelector('.quality').before(info);
 document.addEventListener('click',event=>{if(event.target.closest('[data-mode]'))validate();});
})();
