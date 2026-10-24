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
  "cta": /* bros:auto-cta */ (()=>{const cfg=shopHours;const parts=new Intl.DateTimeFormat('en-CA',{timeZone:cfg.timezone||'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',weekday:'short'}).formatToParts(new Date());const p=Object.fromEntries(parts.map(p=>[p.type,p.value]));const key=p.year+'-'+p.month+'-'+p.day;const day={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[p.weekday];const rows=(cfg.specialDays||[]).find(d=>d.date===key)?.hours||cfg.weekly[day]||[];const open=rows.filter(r=>!r.closed&&r.close);return open.length?'Heute bis '+open[open.length-1].close+' Uhr':'Heute geschlossen';})(),
  "tone": "gold",
  "showOnWebsite": true
};