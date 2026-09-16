# Urlaub / Sonderöffnungszeiten anzeigen

Öffne `notice-config.js` in VS Code.

```js
const shopNotice={
 enabled:true,
 title:'Wir machen Urlaub',
 message:'Vom 20. bis 27. Oktober geschlossen. Ab 28. Oktober sind wir wieder für euch da!',
 showOnWebsite:true
};
```

Die Daten sind nur Beispiele, bitte eigene Daten einsetzen.

- Einschalten: `enabled:true`.
- Ausschalten: `enabled:false`.
- `title`: kurze Überschrift.
- `message`: Hinweistext fuer die Webseite.
- `showOnWebsite:true`: Hinweis auf der Webseite anzeigen. Mit `false` bleibt er trotz `enabled:true` unsichtbar.

Speichern, Vorschau pruefen, dann im tatsaechlichen Website-Git-Projekt veroeffentlichen (`goupdate`). Bereits geoeffnete Webseiten danach neu laden.

Wichtig: Der Rahmen ist nur fuer die Webseite gedacht. Er erscheint nicht auf den TV-Tafeln, sperrt KEINE Bestellungen und aendert NICHT automatisch den Geoeffnet/Geschlossen-Status oder die hinterlegten Oeffnungszeiten. Falls eine Bestellsperre gewuenscht ist, muss diese zusaetzlich eingerichtet werden.

Vorschau lokal: `index.html?noticePreview=1` zeigt einen Beispielhinweis, ohne die Einstellung dauerhaft einzuschalten.
