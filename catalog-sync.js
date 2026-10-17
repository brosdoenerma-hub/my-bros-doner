(function () {
  const config = window.BROS_CATALOG_SYNC || {};
  const status = {
    connected: false,
    version: null,
    message: "Lokale Preisliste aktiv",
    lastSync: null,
  };
  window.brosCatalogSyncStatus = status;

  if (!config.enabled || !Array.isArray(window.products || products)) return;

  const localProducts = window.products || products;
  const byId = new Map(localProducts.map((product) => [product.id, product]));
  const oldImageFields = new Map(
    localProducts.map((product) => [
      product.id,
      {
        image: product.image,
        configImage: product.configImage,
        icon: product.icon,
        config: product.config,
        drinks: product.drinks,
        sauceMode: product.sauceMode,
      },
    ]),
  );

  function variantRows(catalog, productId) {
    return (catalog.variants || [])
      .filter((variant) => variant.productId === productId)
      .map((variant) => [variant.name, Number(variant.price)]);
  }

  function syncOne(catalogProduct, catalog) {
    let target = byId.get(catalogProduct.id);
    if (!target) {
      target={id:catalogProduct.id, icon:catalogProduct.icon||'🍽️', tvStatus:catalogProduct.tvStatus||'pending', config:catalogProduct.workflow?.some(s=>['salad','sauces','extras','bread'].includes(s))?'workflow':false, drinks:catalogProduct.workflow?.includes('drink')};
      localProducts.push(target);byId.set(target.id,target);
    }
    target.translations=catalogProduct.translations;
    target.variantTranslations=Object.fromEntries((catalog.variants||[]).filter(v=>v.productId===catalogProduct.id&&v.translations).map(v=>[v.name,v.translations]));
    target.active=catalogProduct.active!==false;
    target.workflow=catalogProduct.workflow;
    target.tvStatus=catalogProduct.tvStatus??target.tvStatus??'ready';
    target.tvPresentation=catalogProduct.tvPresentation;
    const keep = oldImageFields.get(catalogProduct.id) || {};
    target.name = catalogProduct.name ?? target.name;
    target.category = catalogProduct.category ?? target.category;
    target.price = Number(catalogProduct.basePrice ?? target.price);
    target.deposit = catalogProduct.deposit ?? target.deposit;
    target.tag = catalogProduct.tag ?? target.tag;
    target.desc = catalogProduct.description ?? target.desc;
    target.image = keep.image || catalogProduct.sourceImage || target.image;
    if(catalogProduct.imageUrl){target.image=catalogProduct.imageUrl.startsWith('/')?String(config.apiUrl).replace(/\/$/,'')+catalogProduct.imageUrl:catalogProduct.imageUrl;delete target.icon;}
    target.configImage = keep.configImage || target.configImage;
    target.icon = keep.icon ?? target.icon;
    if(catalogProduct.imageUrl||(!keep.icon&&target.image))delete target.icon;
    target.config = ['coffee','box'].includes(keep.config)?keep.config:catalogProduct.workflow?.some(s=>['salad','sauces','extras','bread'].includes(s))?'workflow':false;
    target.drinks = catalogProduct.workflow?.includes('drink');
    target.sauceMode = catalogProduct.sauceMode ?? keep.sauceMode ?? target.sauceMode;

    const rows = variantRows(catalog, catalogProduct.id);
    if (rows.length) target.sizes = rows;
    else delete target.sizes;

    const half = rows.find((row) => row[0] === "Halber Döner");
    const full = rows.find((row) => row[0] === "Ganzer Döner");
    if (half && catalogProduct.category === "doener") target.small = half[1];
    else delete target.small;
    if (full) target.price = full[1];
  }

  function syncSaucePricing(catalog) {
    const pricing = catalog.options?.saucePricing;
    if (!pricing || typeof saucePricing === "undefined") return;
    saucePricing.enabled = pricing.enabled ?? saucePricing.enabled;
    saucePricing.additionalPrice =
      pricing.additionalPrice ?? saucePricing.additionalPrice;
  }

  let base=String(config.apiUrl||'').replace(/\/$/,'');
  if(typeof location!=='undefined'&&/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base)&&!['localhost','127.0.0.1'].includes(location.hostname)){
    if(location.protocol==='http:'&&/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(location.hostname))base=base.replace(/(localhost|127\.0\.0\.1)/,location.hostname);
    else base='';
  }
  if(typeof location!=='undefined'&&location.protocol==='https:'&&base.startsWith('http:'))base='';
  async function loadCatalog() {
    if (!base) return;
    try {
      const response = await fetch(`${base}/api/catalog`, { cache: "no-store" });
      if (!response.ok) throw new Error(`API ${response.status}`);
      const catalog = await response.json();
      const available=new Set((catalog.products||[]).filter(p=>p.active!==false).map(p=>p.id));
      for(const p of localProducts)if(!available.has(p.id))p.active=false;
      (catalog.products || []).forEach((product) => syncOne(product, catalog));
      window.brosCatalogData={categories:catalog.categories||[],options:catalog.options||{}};
      syncSaucePricing(catalog);
      status.connected = true;
      status.version = catalog.version ?? null;
      status.lastSync = new Date().toISOString();
      status.message = `BRO'S-OS Katalog aktiv${status.version ? ` · Version ${status.version}` : ""}`;
      document.documentElement.dataset.catalogSync = "online";
      window.dispatchEvent(new CustomEvent("bros:catalog-sync", { detail: status }));
    } catch (error) {
      status.connected = false;
      status.message = "BRO'S-OS nicht erreichbar · lokale Preisliste aktiv";
      document.documentElement.dataset.catalogSync = "offline";
      window.dispatchEvent(new CustomEvent("bros:catalog-sync", { detail: status }));
    }
  }

  window.brosSyncCatalog = loadCatalog;
  if(!base){status.message='Veröffentlichter BRO’S-OS-Katalog aktiv';return;}
  void loadCatalog();
  const poll=typeof setInterval==='function'?setInterval(loadCatalog,30000):null;
  const events=typeof EventSource==='function'?new EventSource(base+'/api/catalog/events'):null;
  events?.addEventListener('catalog',loadCatalog);
  if(typeof window.addEventListener==='function'){
    window.addEventListener('pagehide',()=>{if(poll)clearInterval(poll);events?.close();},{once:true});
    window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
  }
})();
