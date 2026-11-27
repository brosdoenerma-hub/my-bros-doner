(()=>{
'use strict';
const send=document.getElementById('sendWhatsapp');if(!send)return;
let session=null,chosen=false;
const section=document.createElement('section');section.className='option-group';section.hidden=true;
const title=document.createElement('h3');title.textContent='Dein Gratis-Döner';
const info=document.createElement('p'),label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';
label.append(check,document.createTextNode(' Einen Döner im Brot als Gratis-Prämie anfragen'));
const select=document.createElement('select');select.setAttribute('aria-label','Welcher Döner soll gratis sein?');
const selectLabel=document.createElement('p');selectLabel.textContent='Welcher Döner soll gratis sein?';selectLabel.style.cssText='display:block;margin:22px 0 10px;font-weight:800';
select.style.cssText='display:block;width:100%;max-width:100%;min-height:58px;padding:14px 16px;font-size:18px;font-weight:700;border:2px solid var(--gold,#d9ad4a);border-radius:12px;background:var(--surface2,#1a1916);color:var(--cream,#f5f0e5);margin:0 0 20px;box-sizing:border-box';
label.style.display='block';
const status=document.createElement('p');status.setAttribute('role','status');section.append(title,info,label,selectLabel,select,status);send.before(section);
function eligible(item){
 const p=products.find(p=>p.id===item.productId)||products.find(p=>p.name===item.name);if(!p)return false;
 if(p.category==='doener')return !/halb|halber/i.test(item.size||'');
 return ['offer','menu'].includes(p.category)&&/döner/i.test(item.size||item.details||'')&&!/dürüm/i.test(item.size||'');
}
function lines(){return cart.map((item,index)=>({item,index})).filter(x=>eligible(x.item));}
function render(){
 const all=lines(),items=all.filter(x=>window.brosRewardPriceModel.base(x.item,products)>0),n=all.length;section.hidden=!session||!n||!items.length;if(section.hidden){chosen=false;check.checked=false;return;}
 const balance=Number(session.bonus)||0,possible=balance+n-1>=10;check.disabled=!possible;
 if(!possible){chosen=false;check.checked=false;}
 info.textContent=possible?'Du hast '+balance+' Stempel. Du kannst mit dieser Bestellung einen Gratis-Döner anfragen oder deine Stempel für später behalten.':'Du hast '+balance+' Stempel. Mit allen '+n+' bezahlten Dönern kommst du auf '+(balance+n)+'. Für einen Gratis-Döner müssen nach Abzug des Gratisartikels mindestens zehn Stempel vorhanden sein.';
 const old=select.value;select.replaceChildren();for(const {item,index}of items){const option=document.createElement('option');option.value=String(index);option.textContent=item.name+(item.recipient?' – für '+item.recipient:'')+(item.size?' · '+item.size:'');select.append(option);}if(items.some(x=>String(x.index)===old))select.value=old;
 select.hidden=!chosen;select.style.display=chosen?'block':'none';selectLabel.hidden=!chosen;selectLabel.style.display=chosen?'block':'none';status.textContent=chosen?(n-1)+' bezahlte Döner + 1 Gratis-Döner angefragt · Stempel danach voraussichtlich '+(balance+n-11)+'. Der Grundpreis des gewählten Döners wird unten abgezogen. Extras sowie Menübeilagen/Getränke bleiben kostenpflichtig. Extras werden separat ausgewiesen; die Bestellung bleibt bis zu unserer Bestätigung unverbindlich.':'Keine Prämie ausgewählt. Alle bezahlten Döner sammeln Stempel.';
}
function refreshPrice(){updateCart();if(!document.getElementById('cartOverlay')?.hidden)openCart();}
check.addEventListener('change',()=>{chosen=check.checked;render();refreshPrice();});
select.addEventListener('change',refreshPrice);
window.brosRewardDiscount=()=>window.brosRewardPriceModel.quote(cart,products,Number(select.value),chosen&&!!session&&(Number(session.bonus)||0)+lines().length-1>=10);
window.brosRewardForIndices=indices=>{const q=window.brosRewardDiscount();return indices.includes(q.index)?q:{discountCents:0,extrasCents:0};};
const originalUpdate=updateCart;updateCart=function(){const r=originalUpdate.apply(this,arguments);render();updateOrderSummary();return r;};
window.brosRewardOrderText=()=>{
 render();if(!chosen)return '';
 if(document.getElementById('onlineCoupon')?.value.trim()){status.textContent='Gratis-Döner und Newsletter-Gutschein sind nicht kombinierbar. Bitte eine Aktion wählen.';return null;}
 const item=cart[Number(select.value)];if(!item||!eligible(item))return null;
 return 'Gratis-Döner angefragt: '+item.name+(item.recipient?' – für '+item.recipient:'')+'\nKundennummer: '+session.customerId+'\n'+(lines().length-1)+' bezahlte Döner + 1 Gratis-Döner; Nur Döner-Grundpreis abziehen; Extras, Menübeilagen und Getränke separat berechnen. Bitte Bezahlung und 10-Stempel-Einlösung im OS gemeinsam bestätigen. Bei Lieferung Mindestbestellwert nach Rabatt prüfen. Döner-Grundpreis abgezogen: '+euro(window.brosRewardDiscount().discountCents/100)+'. Für diesen Artikel verbleiben Extras: '+euro(window.brosRewardDiscount().extrasCents/100)+'.';
};
const validate=window.brosValidateCheckout;window.brosValidateCheckout=()=>validate()&&window.brosRewardOrderText()!==null;
const review=window.brosReviewOrder;window.brosReviewOrder=()=>{if(window.brosRewardOrderText()===null)return;review();const dialog=document.querySelector('.order-review');if(chosen&&dialog?.open){const note=document.createElement('p');note.textContent=window.brosRewardOrderText();dialog.querySelector('.review-actions').before(note);}};
async function load(){try{const r=await fetch('https://kunden.mybros-doner.de/api/customer/website-session',{credentials:'include',cache:'no-store'});session=r.ok?await r.json():null;}catch{session=null;}render();updateCart();}
window.addEventListener('pageshow',load);load();
})();
