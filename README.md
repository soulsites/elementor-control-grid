# Elementor Control Grid

Ein WordPress-Plugin für Elementor, das ein Grid-Overlay-System im Live-Editor hinzufügt.

## Features

- **Grid-Icon im Elementor Editor**: Icon erscheint unten rechts im Elementor Live-Editor
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

## Entwicklung

Das Plugin nutzt:
- jQuery (bereits von Elementor geladen)
- Canvas API für das Grid-Rendering
- LocalStorage API für die Persistenz
- Elementor Hooks für die Integration

## Lizenz

Dieses Plugin ist Open Source und kann frei verwendet werden.
