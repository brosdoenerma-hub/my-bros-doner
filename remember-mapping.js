(function(root){
 'use strict';
 function build(product,inputs,websiteOptions,catalog){
  const actual=catalog.products.find(p=>p.id===product.id&&p.active!==false);
  if(!actual)throw new Error('Dieses Gericht ist nicht mehr verfügbar.');
  const options=catalog.options;
  const selection={variantId:null,drinkId:null,breadId:null,saladIds:[],sauceIds:[],extraIds:[]};
  const byName=(list,name)=>{const matches=list.filter(x=>x.name===name);if(matches.length!==1)throw new Error('Die Auswahl hat sich geändert. Bitte das Produkt neu öffnen.');return matches[0].id;};
  const indexed=(list,value,prefix)=>{const index=Number(value.slice(prefix.length));const chosen=list?.[index];if(!Number.isInteger(index)||!chosen)throw new Error('Die Auswahl hat sich geändert. Bitte das Produkt neu öffnen.');return chosen;};
  for(const input of inputs){
   if(input.name==='size'){selection.variantId=byName(catalog.variants.filter(v=>v.productId===product.id),input.label);continue;}
   if(input.name==='drink'){const item=indexed(websiteOptions.menuDrinkOptions,input.value,'drink-');selection.drinkId=byName(options.menuDrinkOptions,item.name);continue;}
   if(input.name==='bread'){const item=indexed(websiteOptions.breadOptions,input.value,'bread-');selection.breadId=byName(options.breadOptions,item.name);continue;}
   if(input.salad){selection.saladIds.push(byName(options.saladOptions,input.value));continue;}
   if(/^sauce-extra-\d+$/.test(input.value)){const item=indexed(websiteOptions.homemadeDipOptions,input.value,'sauce-extra-');selection.sauceIds.push(byName(options.homemadeDipOptions,item.name));continue;}
   if(/^basic-\d+$/.test(input.value)){const item=indexed(websiteOptions.dipOptions,input.value,'basic-');selection.sauceIds.push(byName(options.dipOptions,item.name));continue;}
   if(/^sauce-\d+$/.test(input.value)){const item=indexed(websiteOptions.sauceOptions,input.value,'sauce-');selection.sauceIds.push(byName(options.sauceOptions,item.name));continue;}
   const extras=options.extraOptions.filter(x=>x.name===input.value);
   if(extras.length===1){selection.extraIds.push(extras[0].id);continue;}
   throw new Error('Diese Sonderauswahl kann noch nicht im Kundenkonto gespeichert werden. Ohne Häkchen kannst du sie weiter in den Warenkorb legen.');
  }
  return selection;
 }
 root.brosBuildRememberSelection=build;
 if(typeof module!=='undefined')module.exports=build;
})(typeof window!=='undefined'?window:globalThis);
