(()=>{
 'use strict';
 const cfg=typeof shopNotice==='object'&&shopNotice?shopNotice.eventBanner:null;
 if(!cfg||cfg.enabled!==true||typeof cfg.title!=='string'||!cfg.title.trim())return;
 const banner=document.createElement('aside');banner.id='brosEventBanner';banner.className='bros-event-banner';banner.setAttribute('aria-label','Veranstaltungsmitteilung');
 const content=document.createElement('div');content.className='bros-event-content';
 for(const [key,tag] of [['label','small'],['title','strong'],['details','span']]){if(typeof cfg[key]==='string'&&cfg[key].trim()){const node=document.createElement(tag);node.textContent=cfg[key];content.append(node);}}
 banner.append(content);
 try{const link=new URL(cfg.link);if(link.protocol==='https:'&&!link.username&&!link.password){const a=document.createElement('a');a.href=link.href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=(typeof cfg.linkText==='string'&&cfg.linkText.trim()?cfg.linkText:'Weitere Informationen')+' ↗';banner.append(a);}}catch{}
 const anchor=document.querySelector('.shop-notices')||document.querySelector('.hero');if(anchor)anchor.after(banner);else document.querySelector('main')?.prepend(banner);
})();
