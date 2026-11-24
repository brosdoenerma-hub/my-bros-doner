(()=>{
 'use strict';
 const overlay=document.getElementById('configOverlay');if(!overlay)return;
 const start=()=>requestAnimationFrame(()=>{if(overlay.hidden)return;for(const node of [overlay,...overlay.querySelectorAll('.sheet,.sheet-body')])node.scrollTop=0;const heading=document.getElementById('configTitle');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}});
 document.addEventListener('bros:config-open',start);
 new MutationObserver(records=>{if(records.some(r=>r.attributeName==='hidden')&&!overlay.hidden)start();}).observe(overlay,{attributes:true,attributeFilter:['hidden']});
})();
