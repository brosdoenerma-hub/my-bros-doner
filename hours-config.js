// Zentrale Öffnungszeiten-Konfiguration für Webseite.
// Zeiten im Format "HH:MM". Geschlossen: closed:true.
// Spezielle Tage überschreiben den Wochenplan.
const shopHours = {
  timezone: "Europe/Berlin",
  weekly: {
    1: [{ open: "11:30", close: "21:00" }],
    2: [{ open: "11:30", close: "21:00" }],
    3: [{ open: "11:30", close: "21:00" }],
    4: [{ open: "11:30", close: "21:00" }],
    5: [{ open: "11:30", close: "21:00" }],
    6: [{ open: "11:30", close: "21:00" }],
    0: [{ closed: true, label: "Demnächst geöffnet" }]
  },
  specialDays: [
    {
      date: "2026-10-04",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Messe Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich länger geöffnet."
    },
    {
      date: "2026-10-05",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    },
    {
      date: "2026-10-06",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    },
    {
      date: "2026-10-07",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    },
    {
      date: "2026-10-08",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    },
    {
      date: "2026-10-09",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    },
    {
      date: "2026-10-10",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    },
    {
      date: "2026-10-11",
      hours: [{ open: "11:30", close: "23:00" }],
      title: "Sonderöffnungszeiten",
      note: "Bis einschließlich 11.10.2026 haben wir täglich bis 23:00 Uhr geöffnet."
    }
  ]
};

window.shopHours = shopHours;
