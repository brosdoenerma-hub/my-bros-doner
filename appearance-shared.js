(function(){
 'use strict';
 const key='bros-customer-appearance-v1',cookieName='bros_appearance';
 const choices=['light','dark','system'];
 const media=window.matchMedia('(prefers-color-scheme: dark)');
 let mode='system';
 function cookieChoice(){
  const raw=document.cookie.split(';').map(part=>part.trim()).find(part=>part.startsWith(cookieName+'='))?.slice(cookieName.length+1);
  return choices.includes(raw)?raw:null;
 }
 function persist(){
  try{localStorage.setItem(key,mode);}catch{}
  if(location.protocol==='https:'&&(location.hostname==='mybros-doner.de'||location.hostname.endsWith('.mybros-doner.de'))){
   document.cookie=cookieName+'='+mode+'; Domain=mybros-doner.de; Path=/; Max-Age=31536000; Secure; SameSite=Lax';
  }
 }
 function apply(){
  document.documentElement.dataset.theme=mode==='system'?(media.matches?'dark':'light'):mode;
  document.documentElement.dataset.appearance=mode;
  document.querySelectorAll('#appearanceSwitch input[name=appearance]').forEach(input=>{input.checked=input.value===mode;});
 }
 function restore(){
  const shared=cookieChoice();let stored=null;
  try{const value=localStorage.getItem(key);if(choices.includes(value))stored=value;}catch{}
  mode=shared||stored||'system';apply();
  // A default on the main site must not overwrite an older explicit portal choice.
  if(shared||stored)persist();
 }
 restore();
 const changed=()=>{if(mode==='system')apply();};
 if(media.addEventListener)media.addEventListener('change',changed);else media.addListener(changed);
 function mount(){
  // The shared preference applies everywhere; its control stays in the customer area.
  const main=document.querySelector('main');if(!main||!document.getElementById('loginForm')||document.getElementById('appearanceSwitch'))return;
  const fieldset=document.createElement('fieldset');fieldset.id='appearanceSwitch';fieldset.className='appearance-switch';
  const legend=document.createElement('legend');legend.textContent='Darstellung für Website und Kundenbereich';fieldset.append(legend);
  const group=document.createElement('div');group.className='appearance-options';
  for(const [value,text] of [['light','Hell'],['dark','Dunkel'],['system','System']]){
   const label=document.createElement('label');const input=document.createElement('input');input.type='radio';input.name='appearance';input.value=value;input.checked=mode===value;
   const span=document.createElement('span');span.textContent=text;
   input.addEventListener('change',()=>{if(!input.checked)return;mode=value;persist();apply();});label.append(input,span);group.append(label);
  }
  fieldset.append(group);main.prepend(fieldset);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
 window.addEventListener('pageshow',()=>{restore();mount();});
 window.addEventListener('storage',event=>{if(event.key===key||event.key===null)restore();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)restore();});
})();
