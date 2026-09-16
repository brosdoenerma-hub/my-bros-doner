(()=>{
 const preview=['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).get('noticePreview')==='1';
 if(!shopNotice.enabled&&!preview)return;
 const tv=Boolean(document.querySelector('#stage'));
 if(tv||!shopNotice.showOnWebsite)return;
 const box=document.createElement('section');box.className='shop-notice';box.setAttribute('role','note');
 const title=document.createElement('strong');title.textContent=preview?'VORSCHAU · Sonderöffnungszeiten':shopNotice.title;
 const text=document.createElement('span');text.textContent=preview?'Beispiel: Heute schließen wir früher. Vielen Dank für euer Verständnis!':shopNotice.message;
 box.append(title,text);
 document.querySelector('main')?.prepend(box);
})();
