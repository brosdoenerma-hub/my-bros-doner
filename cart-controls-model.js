(function(root){
 'use strict';
 const fields=['name','price','size','details','recipient'];
 const same=(a,b)=>fields.every(key=>(a[key]??'')===(b[key]??''));
 function change(items,index,action){
  if(!Array.isArray(items)||!Number.isInteger(index)||index<0||index>=items.length)return {items,changed:false};
  const chosen=items[index],indices=[];items.forEach((item,i)=>{if(same(item,chosen))indices.push(i);});
  if(action==='plus'){
   if(items.length>=100)return {items,changed:false,message:'Du kannst höchstens 100 Artikel im Warenkorb zusammenstellen.'};
   return {items:[...items,{...chosen}],changed:true};
  }
  if(action==='minus'&&indices.length>1){const remove=indices.at(-1);return {items:items.filter((_,i)=>i!==remove),changed:true};}
  if(action==='delete'){const remove=new Set(indices);return {items:items.filter((_,i)=>!remove.has(i)),changed:true};}
  return {items,changed:false};
 }
 function delivery(items,mode,minimum=22){
  const cents=items.reduce((sum,item)=>sum+Math.round(item.price*100),0);
  const missing=Math.max(0,Math.round(minimum*100)-cents);
  return {blocked:mode==='Lieferung'&&missing>0,missingCents:missing,subtotalCents:cents};
 }
 root.brosCartControlsModel={change,delivery};
})(typeof window==='undefined'?globalThis:window);
