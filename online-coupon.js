(()=>{
'use strict';
const send=document.getElementById('sendWhatsapp');if(!send)return;
const section=document.createElement('section');section.className='option-group';
const title=document.createElement('h3');title.textContent='2-€-Newsletter-Gutschein';
const label=document.createElement('label');label.textContent='Rabattcode (optional)';
const input=document.createElement('input');input.id='onlineCoupon';input.type='text';input.maxLength=40;input.autocomplete='off';input.autocapitalize='characters';input.placeholder='BRO-2-…';input.setAttribute('aria-describedby','onlineCouponHint');label.append(input);
const hint=document.createElement('p');hint.id='onlineCouponHint';hint.textContent='Einmalig 2 € ab 10 € Warenwert, ohne Liefergebühr. Nur bei aktivem Newsletter. Nicht mit Spar-/Sonderangeboten oder weiteren Rabatten kombinierbar. Code wird mit deiner WhatsApp-Anfrage übermittelt und von uns geprüft. Der angezeigte Gesamtbetrag ist vor Gutscheinprüfung.';
const status=document.createElement('p');status.setAttribute('role','status');section.append(title,label,hint,status);send.before(section);
function check(){
 const code=input.value.trim().toUpperCase();if(!code){status.textContent='';return '';}
 let message='';
 if(!/^BRO-2-[A-Z0-9]{6,32}$/.test(code))message='Bitte den vollständigen Gutscheincode aus der E-Mail eingeben.';
 else if(orderAmounts().subtotal<10)message='Für diesen Gutschein sind mindestens 10 € Warenwert erforderlich.';
 else if(cart.some(item=>['offer','special'].includes(item.category)||/sparangebot|sonderangebot/i.test(item.name)))message='Der Gutschein ist nicht mit Spar-/Sonderangeboten kombinierbar. Bitte Code entfernen oder die Bestellung ändern.';
 status.textContent=message||'Code wird zur Prüfung mitgesendet. Noch nicht eingelöst; Rabatt erst nach unserer Bestätigung.';
 if(message){input.focus();return null;}
 return 'Newsletter-Gutscheincode: '+code+'\n2 € Rabatt angefragt – bitte aktiven Newsletter, Einmalnutzung und Ausschluss anderer Aktionen prüfen. Noch nicht vom Gesamtbetrag abgezogen.';
}
input.addEventListener('input',()=>{status.textContent='';});
window.brosCouponOrderText=check;
const previous=window.brosValidateCheckout;window.brosValidateCheckout=()=>previous()&&check()!==null;
const review=window.brosReviewOrder;window.brosReviewOrder=()=>{if(check()===null)return;review();const dialog=document.querySelector('.order-review');if(input.value.trim()&&dialog?.open){const text=document.createElement('p');text.textContent='Gutscheincode '+input.value.trim().toUpperCase()+': 2 € Rabatt angefragt. Gesamtbetrag vor Prüfung; Einlösung erst durch unsere Bestätigung.';dialog.querySelector('.review-actions').before(text);}};
})();
// A choice made in the customer portal is fetched with the existing authenticated
// same-site bridge. Never put coupon codes or customer identifiers in URLs.
(async()=>{
 try{
  const r=await fetch('https://kunden.mybros-doner.de/api/customer/website-session',{credentials:'include',cache:'no-store'});if(!r.ok)return;
  const session=await r.json(),input=document.getElementById('onlineCoupon');if(!input||input.value.trim())return;
  if(/^BRO-2-[A-F0-9]{12}$/.test(session.couponIntent?.code||'')){input.value=session.couponIntent.code;input.dispatchEvent(new Event('input'));}
 }catch{}
})();
