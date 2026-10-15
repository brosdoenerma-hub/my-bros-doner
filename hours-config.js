// Zentrale Öffnungszeiten-Konfiguration für Webseite.
// Zeiten im Format "HH:MM". Geschlossen: closed:true.
// Spezielle Tage überschreiben den Wochenplan.
const shopHours = {
  "timezone": "Europe/Berlin",
  "weekly": {
    "0": [
      {
        "open": "15:00",
        "close": "21:00"
      }
    ],
    "1": [
      {
        "open": "11:30",
        "close": "21:00"
      }
    ],
    "2": [
      {
        "open": "11:30",
        "close": "21:00"
      }
    ],
    "3": [
      {
        "open": "11:30",
        "close": "21:00"
      }
    ],
    "4": [
      {
        "open": "11:30",
        "close": "21:00"
      }
    ],
    "5": [
      {
        "open": "11:30",
        "close": "21:00"
      }
    ],
    "6": [
      {
        "open": "11:30",
        "close": "21:00"
      }
    ]
  }
};

window.shopHours = shopHours;
