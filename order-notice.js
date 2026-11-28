(()=>{'use strict';let loggedIn=false,last=null;
const endpoint='https://kunden.mybros-doner.de/api/customer/';
async function refresh(){try{const r=await fetch(endpoint+'website-session',{credentials:'include',cache:'no-store'});loggedIn=r.ok&&!!(await r.json()).customerId;}catch{loggedIn=false;}}
window.brosPrepareOrderNotice=()=>{if(!loggedIn)return '';try{
 const items=cart.map(item=>{const p=products.find(p=>p.id===item.productId)||products.find(p=>p.name===item.name);if(!p)throw Error();return {productId:p.id,quantity:1,variant:String(item.size||'')};});
 const signature=JSON.stringify({items,reward:!!window.brosRewardDiscount?.().discountCents,coupon:!!document.getElementById('onlineCoupon')?.value.trim()});
 if(!last||last.signature!==signature||Date.now()-last.time>5000){const requestId=crypto.randomUUID();last={signature,time:Date.now(),body:{requestId,reference:'WEB-'+new Date().toISOString().replace(/\.\d{3}Z$/,'Z')+'-'+requestId.slice(0,8),items,rewardRequested:!!window.brosRewardDiscount?.().discountCents,couponRequested:!!document.getElementById('onlineCoupon')?.value.trim()}};}
 const body=last.body;void fetch(endpoint+'order-notice',{method:'POST',credentials:'include',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(r=>{if(!r.ok)throw Error();}).catch(()=>{let n=document.getElementById('orderNoticeStatus');if(!n){n=document.createElement('p');n.id='orderNoticeStatus';n.setAttribute('role','status');document.getElementById('sendWhatsapp')?.after(n);}n.textContent='Die interne Vormerkung ist noch nicht bestätigt. Bitte die WhatsApp-Nachricht tatsächlich senden; Stempel bestätigen wir nach Bezahlung.';});
 return '\n\nKunden-Bestellreferenz: '+body.reference;
}catch{return '';}};
void refresh();window.addEventListener('pageshow',refresh);window.addEventListener('focus',refresh);
})();
