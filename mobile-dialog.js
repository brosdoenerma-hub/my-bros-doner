(function(){
 'use strict';
 const viewport=window.visualViewport;
 let scheduled=false;
 function update(){
  scheduled=false;
  const height=viewport?viewport.height:window.innerHeight;
  const top=viewport?viewport.offsetTop:0;
  if(Number.isFinite(height)&&height>0)document.documentElement.style.setProperty('--bros-viewport-height',height+'px');
  if(Number.isFinite(top)&&top>=0)document.documentElement.style.setProperty('--bros-viewport-top',top+'px');
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
 update();
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('pageshow',schedule);
 if(viewport){viewport.addEventListener('resize',schedule,{passive:true});viewport.addEventListener('scroll',schedule,{passive:true});}
})();
