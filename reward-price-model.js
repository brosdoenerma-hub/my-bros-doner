(function(root){
'use strict';
function cents(value){return Number.isFinite(Number(value))?Math.round(Number(value)*100):0;}
function base(item,products){
 const p=products.find(p=>p.id===item?.productId)||products.find(p=>p.name===item?.name);
 if(!p||p.category!=='doener'||/halb|halber/i.test(item.size||''))return 0;
 const snapshot=Number(item.rewardBasePrice);let amount;
 if(Number.isFinite(snapshot)&&snapshot>0)amount=cents(snapshot);
 else{const size=p.sizes?.find(s=>String(item.size||'').trim()===String(s[0]).trim());amount=cents(size?size[1]:p.price);}
 return Math.max(0,Math.min(amount,cents(item.price)));
}
function quote(cart,products,index,active){
 const item=cart[index],discountCents=active&&item?base(item,products):0;
 return {index,discountCents,extrasCents:discountCents?Math.max(0,cents(item.price)-discountCents):0};
}
root.brosRewardPriceModel={base,quote};
})(typeof window==='undefined'?globalThis:window);
