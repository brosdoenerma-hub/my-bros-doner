// Aktuelle Öffnungszeiten für den heutigen Tag ermitteln
function getTodayClosingTime() {
  const today = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short"
  }).format(new Date());

  const days = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };

  const dayNumber = days[today];
  const hours = shopHours.weekly[dayNumber];

  if (!hours || hours[0]?.closed) {
    return "Heute geschlossen";
  }

  return `Heute bis ${hours[0].close} Uhr`;
}

// Mitteilung
const shopNotice = {
  "enabled": true,
  "eyebrow": "Aktuelle Mitteilung",
  "title": "",
  "message": "Sonntag am 25.10.2026, Geschlossen",
  "cta": "Heute bis 21:00 Uhr",
  "tone": "gold",
  "showOnWebsite": true
};