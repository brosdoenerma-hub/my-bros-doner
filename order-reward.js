(()=>{
'use strict';
const send=document.getElementById('sendWhatsapp');if(!send)return;
let session=null,chosen=false;
const section=document.createElement('section');section.className='option-group';section.hidden=true;
const title=document.createElement('h3');title.textContent='Dein Gratis-Döner';
const info=document.createElement('p'),label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';
label.append(check,document.createTextNode(' Einen Döner im Brot als Gratis-Prämie anfragen'));
const select=document.createElement('select');select.setAttribute('aria-label','Welcher Döner soll gratis sein?');
const status=document.createElement('p');status.setAttribute('role','status');section.append(title,info,label,select,status);send.before(section);
function eligible(item){
 const p=products.find(p=>p.id===item.productId)||products.find(p=>p.name===item.name);if(!p)return false;
 if(p.category==='doener')return !/halb|halber/i.test(item.size||'');
 return ['offer','menu'].includes(p.category)&&/döner/i.test(item.size||item.details||'')&&!/dürüm/i.test(item.size||'');
}
function lines(){return cart.map((item,index)=>({item,index})).filter(x=>eligible(x.item));}
function render(){
 const items=lines(),n=items.length;section.hidden=!session||!n;if(section.hidden){chosen=false;check.checked=false;return;}
 const balance=Number(session.bonus)||0,possible=balance+n-1>=10;check.disabled=!possible;
 if(!possible){chosen=false;check.checked=false;}
 info.textContent=possible?'Du hast '+balance+' Stempel. Du kannst mit dieser Bestellung einen Gratis-Döner anfragen oder deine Stempel für später behalten.':'Du hast '+balance+' Stempel. Mit allen '+n+' bezahlten Dönern kommst du auf '+(balance+n)+'. Für einen Gratis-Döner müssen nach Abzug des Gratisartikels mindestens zehn Stempel vorhanden sein.';
 const old=select.value;select.replaceChildren();for(const {item,index}of items){const option=document.createElement('option');option.value=String(index);option.textContent=item.name+(item.recipient?' – für '+item.recipient:'')+(item.size?' · '+item.size:'');select.append(option);}if(items.some(x=>String(x.index)===old))select.value=old;
 select.hidden=!chosen;status.textContent=chosen?(n-1)+' bezahlte Döner + 1 Gratis-Döner angefragt · Stempel danach voraussichtlich '+(balance+n-11)+'. Extras sowie Menübeilagen/Getränke bleiben kostenpflichtig. Gesamtbetrag bleibt bis zur Bestätigung unverändert.':'Keine Prämie ausgewählt. Alle bezahlten Döner sammeln Stempel.';
}
check.addEventListener('change',()=>{chosen=check.checked;render();});
const originalUpdate=updateCart;updateCart=function(){const r=originalUpdate.apply(this,arguments);render();return r;};
window.brosRewardOrderText=()=>{
 render();if(!chosen)return '';
 if(document.getElementById('onlineCoupon')?.value.trim()){status.textContent='Gratis-Döner und Newsletter-Gutschein sind nicht kombinierbar. Bitte eine Aktion wählen.';return null;}
 const item=cart[Number(select.value)];if(!item||!eligible(item))return null;
 return 'Gratis-Döner angefragt: '+item.name+(item.recipient?' – für '+item.recipient:'')+'\nKundennummer: '+session.customerId+'\n'+(lines().length-1)+' bezahlte Döner + 1 Gratis-Döner; Extras separat. Bitte Bezahlung und 10-Stempel-Einlösung im OS gemeinsam bestätigen. Bei Lieferung Mindestbestellwert nach Rabatt prüfen. Noch kein Rabatt vom Gesamtbetrag abgezogen.';
};
const validate=window.brosValidateCheckout;window.brosValidateCheckout=()=>validate()&&window.brosRewardOrderText()!==null;
const review=window.brosReviewOrder;window.brosReviewOrder=()=>{if(window.brosRewardOrderText()===null)return;review();const dialog=document.querySelector('.order-review');if(chosen&&dialog?.open){const note=document.createElement('p');note.textContent=window.brosRewardOrderText();dialog.querySelector('.review-actions').before(note);}};
async function load(){try{const r=await fetch('https://kunden.mybros-doner.de/api/customer/website-session',{credentials:'include',cache:'no-store'});session=r.ok?await r.json():null;}catch{session=null;}render();}
window.addEventListener('pageshow',load);load();
})();
