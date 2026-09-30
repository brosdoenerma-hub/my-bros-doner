// Zentrale Katalog-Anbindung.
// Wenn BRO'S-OS läuft, werden Preise/Varianten automatisch aus dieser API gelesen.
// Wenn die API nicht erreichbar ist, bleibt products.js als sichere lokale Fallback-Liste aktiv.
window.BROS_CATALOG_SYNC = {
  enabled: true,
  apiUrl: "http://localhost:8790",
};
