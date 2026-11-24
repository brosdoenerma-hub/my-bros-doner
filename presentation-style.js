(()=>{
 const palettes={auto:{background:'#17181b',heading:'#f4f1e9',text:'#d1d1cc',accent:'#e3c67d'},smoke:{background:'#17181b',heading:'#f4f1e9',text:'#d1d1cc',accent:'#e3c67d'},gold:{background:'#302719',heading:'#fff4d5',text:'#e7d7b5',accent:'#efd083'},red:{background:'#351e26',heading:'#fff2f2',text:'#efd0d4',accent:'#f5a3ae'},green:{background:'#192f29',heading:'#f0fff5',text:'#cce7da',accent:'#a6dfb7'},blue:{background:'#1b293b',heading:'#f2f6ff',text:'#d2dfef',accent:'#afcaf3'}};
 const hex=v=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
 const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const rich=value=>String(value||'').split(/(\*\*[^*]+\*\*)/g).map(t=>t.startsWith('**')&&t.endsWith('**')?'<strong class="presentation-bold">'+safe(t.slice(2,-2))+'</strong>':safe(t)).join('');
 const custom=s=>!!s&&(s.palette&&s.palette!=='auto'||['background','heading','text','accent'].some(k=>hex(s[k])));
 function resolve(s){const base=palettes[s?.palette]||palettes.auto;return Object.fromEntries(Object.keys(palettes.auto).map(k=>[k,hex(s?.[k])?s[k]:base[k]]));}
 function variables(s){return Object.entries(resolve(s)).map(([k,v])=>'--presentation-'+k+':'+v).join(';');}
 function attributes(s){return custom(s)?'style="'+variables(s)+'" ':'';}
 function apply(element,style){element.classList.toggle('presentation-custom',!!custom(style));if(custom(style))for(const [k,v] of Object.entries(resolve(style)))element.style.setProperty('--presentation-'+k,v);}
 function tag(product,tv=false){if(!product?.tag||product.tagStyle?.labelVisible===false)return '';return `<span class="${tv?'presentation-tv-tag':'product-tag'}${custom(product.tagStyle)?' presentation-custom':''}" ${attributes(product.tagStyle)}>${safe(product.tag)}</span>`;}
 function productNotes(product,tv=false){if(!product||product.active===false)return '';const tagLine=tv&&product.tagStyle?tag(product,true):'';const notices=(product.notices||[]).filter(n=>n.enabled!==false&&(tv?n.showOnTv!==false:n.showOnWebsite!==false));if(!notices.length&&!tagLine)return '';return `<div class="presentation-product-notices" data-no-translate>${tagLine}${notices.map(n=>`<aside class="presentation-product-note${custom(n.style)?' presentation-custom':''}" ${attributes(n.style)}>${n.style?.labelVisible!==false&&n.label?`<small class="presentation-label">${safe(n.label)}</small>`:''}${n.title?`<strong class="presentation-heading">${safe(n.title)}</strong>`:''}<span class="presentation-message">${rich(n.message)}</span></aside>`).join('')}</div>`;}
 window.BROS_PRESENTATION={palettes,resolve,custom,rich,attributes,apply,tag,productNotes};
})();
