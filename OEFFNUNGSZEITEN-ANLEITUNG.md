# Öffnungszeiten & Sondertage ändern

Datei:

`hours-config.js`

## Normale Öffnungszeiten

Die Zahlen bedeuten:

- `0` = Sonntag
- `1` = Montag
- `2` = Dienstag
- `3` = Mittwoch
- `4` = Donnerstag
- `5` = Freitag
- `6` = Samstag

Beispiel Montag bis Samstag 11:30 bis 21:00:

```js
weekly: {
  1: [{ open: "11:30", close: "21:00" }],
  2: [{ open: "11:30", close: "21:00" }],
  3: [{ open: "11:30", close: "21:00" }],
  4: [{ open: "11:30", close: "21:00" }],
  5: [{ open: "11:30", close: "21:00" }],
  6: [{ open: "11:30", close: "21:00" }],
  0: [{ closed: true, label: "Demnächst geöffnet" }]
}
```

## Sondertag: früher schließen

```js
specialDays: [
  {
    date: "2026-10-10",
    hours: [{ open: "11:30", close: "18:00" }],
    title: "Sonderöffnungszeit",
    note: "Heute schließen wir bereits um 18:00 Uhr."
  }
]
```

## Sondertag: komplett geschlossen

```js
specialDays: [
  {
    date: "2026-10-12",
    closed: true,
    title: "Heute geschlossen",
    note: "Wegen Familienfeier bleibt der Laden heute geschlossen."
  }
]
```


## Wo trage ich spezielle Tage ein?

Öffne `hours-config.js` und suche diesen Bereich:

```js
specialDays: [
  // hier kommen Sondertage rein
]
```

Mehrere Sondertage werden mit Komma getrennt:

```js
specialDays: [
  {
    date: "2026-10-10",
    hours: [{ open: "11:30", close: "18:00" }],
    title: "Sonderöffnungszeit",
    note: "Heute schließen wir bereits um 18:00 Uhr."
  },
  {
    date: "2026-10-12",
    closed: true,
    title: "Heute geschlossen",
    note: "Wegen Familienfeier bleibt der Laden heute geschlossen."
  }
]
```

Wichtig: Das Datum immer als `JJJJ-MM-TT` schreiben, z. B. `2026-10-12`.

## Live-Anzeige

Die Webseite zeigt automatisch:

- `Geöffnet` / `Geschlossen`
- `bis 21.00 Uhr`
- `heute ab 11.30 Uhr`
- Sonderhinweise in der Öffnungszeiten-Klappe

Die Anzeige aktualisiert sich alle 60 Sekunden.
