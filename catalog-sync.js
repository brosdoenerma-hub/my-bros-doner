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
    const target = byId.get(catalogProduct.id);
    if (!target) return;
    const keep = oldImageFields.get(catalogProduct.id) || {};
    target.name = catalogProduct.name ?? target.name;
    target.category = catalogProduct.category ?? target.category;
    target.price = Number(catalogProduct.basePrice ?? target.price);
    target.deposit = catalogProduct.deposit ?? target.deposit;
    target.tag = catalogProduct.tag ?? target.tag;
    target.desc = catalogProduct.description ?? target.desc;
    target.image = keep.image || catalogProduct.sourceImage || target.image;
    target.configImage = keep.configImage || target.configImage;
    target.icon = keep.icon ?? target.icon;
    target.config = keep.config ?? target.config;
    target.drinks = keep.drinks ?? target.drinks;
    target.sauceMode = catalogProduct.sauceMode ?? keep.sauceMode ?? target.sauceMode;

    const rows = variantRows(catalog, catalogProduct.id);
    if (rows.length) target.sizes = rows;

    const half = rows.find((row) => row[0] === "Halber Döner");
    const full = rows.find((row) => row[0] === "Ganzer Döner");
    if (half) target.small = half[1];
    if (full) target.price = full[1];
  }

  function syncSaucePricing(catalog) {
    const pricing = catalog.options?.saucePricing;
    if (!pricing || typeof saucePricing === "undefined") return;
    saucePricing.enabled = pricing.enabled ?? saucePricing.enabled;
    saucePricing.additionalPrice =
      pricing.additionalPrice ?? saucePricing.additionalPrice;
  }

  async function loadCatalog() {
    const base = String(config.apiUrl || "").replace(/\/$/, "");
    if (!base) return;
    try {
      const response = await fetch(`${base}/api/catalog`, { cache: "no-store" });
      if (!response.ok) throw new Error(`API ${response.status}`);
      const catalog = await response.json();
      (catalog.products || []).forEach((product) => syncOne(product, catalog));
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
})();
