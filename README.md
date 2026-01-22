# Elementor Control Grid

Ein WordPress-Plugin für Elementor, das ein Grid-Overlay-System im Live-Editor und Frontend hinzufügt.

## Features

- **Grid-Icon im Elementor Editor**: Icon erscheint unten rechts im Elementor Live-Editor
- **Frontend-Support**: Eingeloggte User können das Grid auch im Frontend über die Admin Bar aktivieren
- **Anpassbares Modal**: Einstellungen können über ein übersichtliches Modal gesteuert werden
- **Flexible Grid-Einstellungen**:
  - Anzahl der Zeilen (Rows)
  - Anzahl der Spalten (Columns)
  - Padding (Abstand vom Rand)
  - Farbe der Hilfslinien
  - Transparenz der Hilfslinien
  - Linienstärke
  - Fixed oder Absolute Positionierung
- **Persistente Einstellungen**: Die Einstellungen werden im LocalStorage gespeichert
- **Live-Update**: Grid wird sofort nach Änderungen aktualisiert

## Installation

1. Lade den kompletten Plugin-Ordner in das WordPress-Verzeichnis `/wp-content/plugins/`
2. Aktiviere das Plugin im WordPress-Dashboard unter "Plugins"
3. Öffne einen Elementor-Editor - das Grid-Icon erscheint unten rechts

## Verwendung

### Im Elementor Editor

1. **Grid aktivieren**: Klicke auf das Grid-Icon (unten rechts im Elementor-Editor)
2. **Einstellungen anpassen**: Im Modal kannst du folgende Einstellungen vornehmen:
   - Aktiviere/Deaktiviere das Grid mit der Checkbox "Grid aktivieren"
   - Passe die Anzahl der Zeilen und Spalten an
   - Stelle das Padding (Abstand vom Rand) ein
   - Wähle eine Farbe für die Hilfslinien
   - Passe die Transparenz an
   - Ändere die Linienstärke
   - Wähle zwischen "Fixed" (bleibt beim Scrollen) oder "Absolute" (scrollt mit)
3. **Anwenden**: Klicke auf "Anwenden" um die Einstellungen zu speichern
4. **Zurücksetzen**: Klicke auf "Zurücksetzen" um die Standardeinstellungen wiederherzustellen

### Im Frontend (für eingeloggte User)

1. Wenn du als eingeloggter User die Website besuchst, siehst du ein "Grid Overlay" Icon in der Admin Bar (oben)
2. Klicke auf das Icon, um die Grid-Einstellungen zu öffnen
3. Das Grid wird auch im Frontend angezeigt und die Einstellungen bleiben synchronisiert mit dem Editor

## Technische Details

### Dateistruktur

```
elementor-control-grid/
├── elementor-control-grid.php    # Haupt-Plugin-Datei
├── assets/
│   ├── js/
│   │   └── control-grid.js       # JavaScript-Funktionalität
│   └── css/
│       └── control-grid.css      # Styling
└── README.md
```

### Systemanforderungen

- WordPress 5.0 oder höher
- Elementor Plugin (aktiv)
- PHP 7.0 oder höher

## Features im Detail

### Grid-Overlay
Das Grid-Overlay wird als Canvas-Element über die Elementor-Preview gelegt und zeigt Hilfslinien an, die beim Design helfen.

### Positionierung
- **Fixed**: Das Grid bleibt beim Scrollen an Ort und Stelle (ideal für Above-the-Fold-Design)
- **Absolute**: Das Grid scrollt mit dem Inhalt (ideal für Full-Page-Design)

### Persistenz
Alle Einstellungen werden im LocalStorage des Browsers gespeichert und beim nächsten Öffnen des Editors automatisch wiederhergestellt.

## Fehlerbehebung

### Grid erscheint nicht im Elementor Editor

Das Plugin nutzt mehrere Initialisierungs-Methoden für maximale Kompatibilität:

1. **Console-Logs prüfen**: Öffne die Browser-Konsole (F12) und suche nach "Elementor Grid" Meldungen
2. **Icon-Position**: Das Icon sollte unten rechts erscheinen. Falls nicht, prüfe ob andere Plugins die Position blockieren
3. **Browser-Cache**: Leere den Browser-Cache und lade die Seite neu (Strg+F5)
4. **Elementor-Version**: Das Plugin ist mit Elementor 3.0+ kompatibel

### Grid erscheint nicht im Frontend

1. **Einloggen**: Du musst als WordPress-User eingeloggt sein
2. **Admin Bar**: Die WordPress Admin Bar muss aktiviert sein
3. **Aktivierung**: Klicke auf "Grid Overlay" in der Admin Bar und aktiviere das Grid im Modal

### Einstellungen werden nicht gespeichert

- Das Plugin nutzt den LocalStorage des Browsers
- Stelle sicher, dass LocalStorage in deinem Browser aktiviert ist
- Private/Inkognito-Modus kann LocalStorage blockieren

## Entwicklung

Das Plugin nutzt:
- jQuery (bereits von Elementor geladen)
- Canvas API für das Grid-Rendering
- LocalStorage API für die Persistenz
- Elementor Hooks für die Integration

## Lizenz

Dieses Plugin ist Open Source und kann frei verwendet werden.
