const exportButton=document.querySelector('#exportPng');
exportButton.addEventListener('click',async()=>{
 exportButton.disabled=true;
 const status=document.querySelector('#exportStatus');
 status.textContent='4K-Bild wird erstellt …';
 try{
  if(location.protocol==='file:')throw new Error('Bitte über den lokalen Vorschau-Server öffnen, nicht per Doppelklick. Siehe Anleitung.');
  await document.fonts.ready;
  const board=document.querySelector('#board');
  await Promise.all([...board.querySelectorAll('img')].map(img=>img.decode()));
  // Bake object-fit and brightness into export-only images: html2canvas does not reliably render these CSS features.
  const prepared=[...board.querySelectorAll('img')].map(img=>{
   const style=getComputedStyle(img),w=img.clientWidth,h=img.clientHeight,c=document.createElement('canvas');
   c.width=w*2;c.height=h*2;const ctx=c.getContext('2d');ctx.scale(2,2);
   const fit=style.objectFit,ratio=fit==='contain'?Math.min(w/img.naturalWidth,h/img.naturalHeight):Math.max(w/img.naturalWidth,h/img.naturalHeight);
   const dw=img.naturalWidth*ratio,dh=img.naturalHeight*ratio;
   ctx.filter=style.filter;ctx.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);return c.toDataURL('image/png');
  });
  const canvas=await html2canvas(board,{width:1920,height:1080,scale:2,backgroundColor:'#090908',windowWidth:1920,windowHeight:1080,scrollX:0,scrollY:0,logging:false,onclone:doc=>{
   doc.querySelectorAll('nav,aside,.export-controls').forEach(e=>e.style.display='none');
   const stage=doc.querySelector('#stage');stage.style.cssText='width:1920px;height:1080px;position:relative;overflow:hidden';
   doc.querySelector('#board').style.transform='none';
   doc.querySelectorAll('#board img').forEach((img,i)=>{img.src=prepared[i];img.style.objectFit='fill';img.style.filter='none'});
  }});
  if(canvas.width!==3840||canvas.height!==2160)throw new Error('Exportgröße ist nicht 4K.');
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  if(!blob)throw new Error('PNG konnte nicht erzeugt werden.');
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=`Bros-TV-${location.hash.slice(1)||1}-4K.png`;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),60000);
  status.textContent='PNG erstellt: 3840 × 2160 Pixel. Bitte den Download visuell prüfen.';
 }catch(error){status.textContent='Export fehlgeschlagen: '+error.message}
 finally{exportButton.disabled=false}
});
