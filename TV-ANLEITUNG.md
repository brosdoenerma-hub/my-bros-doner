# Bro’s TV-Tafeln bearbeiten und exportieren

## TV2: automatischer Wechsel

Lokale Vorschau: `http://localhost:4175/tv.html?tv=2`

Nach Veröffentlichung: `https://brosdoenerma-hub.github.io/my-bros-doner/tv.html?tv=2`

Dieser Modus zeigt Tafel 01 und 04 im endlosen Wechsel, jeweils 15 Sekunden, ohne Bedienleiste. Die Browserleisten am Fernseher über dessen Vollbildfunktion ausblenden. Andere TV-Adressen bleiben statisch. Keine automatische Aktualisierung veröffentlichter Dateiänderungen: dafür die TV-Seite neu laden.

## 1. Ordner öffnen

In VS Code „Datei → Ordner öffnen“ wählen und diesen Entwurfsordner öffnen:
`/Users/a1/Documents/Codex/2026-09-04/ich/outputs/bros-ordering-v2`

Vor Änderungen eine Kopie des gesamten Ordners als Backup erstellen.

## 2. Was steht in welcher Datei?

- `products.js`: Artikel, Preise, Varianten. Diese Daten werden von Webseite UND TV genutzt.
- `tv.js`: Texte, Aufbau der fünf Tafeln und Allergene-Legende A–N.
- `tv.css`: Farben, Schriftgrößen, Karten und Bilder.
- `tv-allergens.css`: Abstände und Allergene-Leiste; überschreibt teilweise tv.css.
- `assets/products/`: Produktbilder. Dateinamen nicht ohne Anpassung in products.js ändern.
- `tv-export.js`: PNG-Export; normalerweise nicht bearbeiten.

## 3. Preise ändern – Beispiel

In `products.js` nach `id:'chicken'` suchen.
`price:6,small:4` bedeutet: ganzer Döner 6,00 €, halber Döner 4,00 €.
Dezimalzahlen im Code immer mit Punkt schreiben: `8.5`, nicht `8,5`.
Anführungszeichen, Kommas und Klammern erhalten!

Dürüm steht in eigenen Artikeln: `dueruem-chicken` und `dueruem-steak`.
Menüs und Sparangebote haben eigene Preise. Beispiel:
`sizes:[['Ganzer Döner',11],['Dürüm',11.5]]`
Das sind vollständige Variantenpreise, nicht Aufpreise. Auch `price:11` muss zum Grundpreis passen.
Eine Änderung am einzelnen Döner passt Menüpreise NICHT automatisch an. Alle betroffenen Menü- und Sparartikel mitprüfen.

Neue Artikel: einen passenden vorhandenen Datensatz kopieren, eine eindeutige `id` vergeben und Name, Kategorie, Preis und Bild anpassen. Die Website zeigt ihn in der passenden Kategorie. Getränke und Extras erscheinen auch automatisch auf Tafel 5. Andere TV-Tafeln haben feste Plätze: dafür muss auch `tv.js` angepasst werden, damit nichts überläuft.

## 4. Vorschau starten

Im VS-Code-Terminal im geöffneten Ordner:

```sh
python3 -m http.server 4175 --bind 127.0.0.1
```

Dann im Browser `http://localhost:4175/tv.html` öffnen.
Falls Port 4175 bereits läuft, einfach die bestehende Vorschau nutzen. Alternativ Port 4176 in Befehl und URL einsetzen.
Nach dem Speichern mit Cmd+Shift+R neu laden (Cache umgehen).
Zum Stoppen im Terminal Ctrl+C drücken.

## 5. Als 4K-PNG speichern

Oben die gewünschte Tafel wählen und „4K-PNG speichern“ anklicken.
Der Browser lädt `Bros-TV-…-4K.png` mit 3840 × 2160 Pixeln herunter.
Für jede Tafel wiederholen. Internet wird zum Laden der Web-Schriften benötigt; erst exportieren, wenn Bilder und Schriften vollständig sichtbar sind.
Nicht über eine `file://`-Adresse exportieren: den lokalen Server verwenden.
PNG nach dem Download öffnen und Preise, Bildausschnitte und Allergene-Leiste prüfen. PNG ist ein fertiges Bild, keine editierbare Vorlage. Spätere Änderungen immer in den Quelldateien machen und erneut exportieren.

## 6. Google Drive und Fernseher

Den vollständigen Ordner in Google Drive sichern/synchronisieren, nicht nur tv.html. HTML benötigt CSS, JavaScript und Bilder im gleichen Ordneraufbau.
Google Drive ist hier Ablage, kein Webserver: ein Drive-Freigabelink führt nicht zur laufenden TV-Seite. Zum Bearbeiten den synchronisierten Ordner lokal öffnen und den Server darin starten.
Die exportierten PNGs kannst du dagegen in Drive ablegen, herunterladen und per USB-Stick bzw. Bildanzeige deines Fernsehers zeigen (Unterstützung hängt vom TV ab).
Für eine direkt aufrufbare Online-HTML-Version können die Dateien später auf eurem Webhosting veröffentlicht werden – erst nach Freigabe.

## 7. Allergene und Freigabe

Die Leiste zeigt die Legende A–N aus der bestehenden Website. Sie ersetzt keine geprüfte Allergenkennzeichnung der einzelnen Gerichte, Soßen und Varianten. Die alten TV-Bilder hatten widersprüchliche Kürzel; diese wurden nicht ungeprüft übernommen. Zutaten-/Lieferantenangaben vor Veröffentlichung abgleichen.

Diese Dateien sind ein lokaler Entwurf. Speichern oder PNG-Export lädt nichts auf die Live-Webseite hoch. `goupdate` nicht blind ausführen: der Befehl muss auf den tatsächlich vorgesehenen Veröffentlichungsordner zeigen.
