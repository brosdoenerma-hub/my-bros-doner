(function () {
 'use strict';
 const origin='https://kunden.mybros-doner.de';
 const activeRequests=new WeakSet();
 async function api(path,method='GET',body) {
  const response=await fetch(origin+'/api/customer'+path,{method,credentials:'include',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(12000)});
  const value=await response.json();
  if(!response.ok)throw new Error(value.error?.message||'Speichern nicht möglich. Bitte erneut anmelden.');
  return value;
 }
 function note(text){const element=document.getElementById('rememberStatus');if(element)element.textContent=text;}
 document.addEventListener('bros:config-open',async()=>{
  const checkbox=document.getElementById('rememberForLater');
  if(!checkbox)return;
  checkbox.disabled=true;
  note('Kundenanmeldung wird geprüft …');
  try {
   const session=await api('/website-session');
   if(checkbox!==document.getElementById('rememberForLater'))return;
   checkbox.disabled=false;
   note('Im Kundenkonto speichern'+(session.name?' · '+session.name:'')+'. Es wird noch keine Bestellung gesendet.');
  } catch {
   if(checkbox!==document.getElementById('rememberForLater'))return;
   note('Zum Merken zuerst im Kundenbereich anmelden und danach dieses Produkt erneut öffnen.');
  }
 });
 window.brosRememberSelection=async function(product,form,websiteOptions) {
  const checkbox=document.getElementById('rememberForLater');
  if(!checkbox?.checked)return true;
  if(activeRequests.has(form))return false;
  activeRequests.add(form);
  const button=document.getElementById('addToCart');button.disabled=true;
  const inputs=[...form.querySelectorAll('input:checked')].filter(input=>input!==checkbox).map(input=>({name:input.name,value:input.value,salad:input.hasAttribute('data-salad'),label:(window.brosGermanText?window.brosGermanText(input.nextElementSibling):input.nextElementSibling?.textContent||'').split(' · ')[0].trim()}));
  const controls=[...form.querySelectorAll('input,button,select')].map(element=>[element,element.disabled]);
  controls.forEach(([element])=>{element.disabled=true;});
  try {
   note('Auswahl wird im Kundenkonto gespeichert …');
   const catalog=await api('/catalog');
   const selection=window.brosBuildRememberSelection(product,inputs,websiteOptions,catalog);
   await api('/favorites','POST',{name:product.name.slice(0,80),productId:product.id,selection});
   checkbox.checked=false;
   note('Für später im Kundenkonto gespeichert.');
   return true;
  } catch(error) {
   note(error.message||'Auswahl konnte nicht gespeichert werden.');
   return false;
  } finally {activeRequests.delete(form);controls.forEach(([element,disabled])=>{element.disabled=disabled;});button.disabled=false;}
 };
})();
