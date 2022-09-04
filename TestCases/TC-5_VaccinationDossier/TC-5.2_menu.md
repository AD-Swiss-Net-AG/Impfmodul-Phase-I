
## TC 5.2: Impfausweis Kontextmenu

Ein Benutzer startet das Impfmodul aus einem EPD Portal für Gesundheitsfachpersonen oder Patienten und Patientinnen.  Dabei werden alle erforderlichen Attribute übergeben, damit das Impfmodul die Impfdaten des Patienten oder der Patientin aus dem EPD abfragen kann. Das Zertifikat der digitalen Signatur ist dem Impfmodul bekannt und die Signatur ist gültig.

Der Benutzer öffnet die Ansicht für den Impfausweis. Dem Benutzer werden alle Einträge für Impfungen, Unverträglichkeiten und Kommentaren zu Impfungen und Unverträglichkeiten zeitgeordnet angezeigt. Dabei werden die Informationen für das Lifecycle Management berücksichtigt.

Der Test verifiziert die Optionen zur Bearbeitung via Kontextmenu auf ausgewählten Einträgen.


### Vorbereitung:

Für den Test müssen die folgenden Vorbereitungen getroffen werden:
- Der Benutzer nutzt das EPD Portal über einen Standard Browser
- Der Browser hat bereits eine aktive Session mit dem Identity Provider, bzw. der Benutzer hat sich im EPD Portal authentisiert.
- Der Benutzer startet das Impfmodul aus dem EPD Portal, per Button, Link, o.ä.  
- Das EPD Testsystem ist aufgeschaltet und erreichbar (Gazelle, EPD Playground, Testsystem einer Gemeinschaft, EPD Mock).
- Im EPD Testsystem sind für den Patienten oder die Patientin Testdaten (Impfungen, Unverträglichkeiten und Kommentare) mit dem Dokument Typ Immunization Administration gespeichert.
- Die Testdokumente enthalten die erforderlichen Einträge für Impfungen, Unverträglichkeiten und Kommentare zu Impfungen und Unverträglichkeiten.


### Durchführung:

Der Test wird wie folgt durchgeführt:

Iteration 1: Impfung
- Das Impfmodul aus einem EPD Portal für Gesundheitsfachpersonen mit Patientenkontext und der Rolle GFP und ASSISTANT starten.
- Die Ansicht für den Impfausweis im Menu auswählen.
- Die Ansicht für Impfausweis öffnen.
- In der Tabelle eine Impfung auswählen und das Kontextmenu mit der rechten Maustaste öffnen.
Iteration 2: Unverträglichkeit
- Das Impfmodul aus einem EPD Portal für Gesundheitsfachpersonen mit Patientenkontext und der Rolle GFP und ASSISTANT starten.
- Die Ansicht für den Impfausweis im Menu auswählen.
- Die Ansicht für Impfausweis öffnen.
- In der Tabelle eine Unverträglichkeit auswählen und das Kontextmenu mit der rechten Maustaste öffnen.

Iteration 3: Kommentar
- Das Impfmodul aus einem EPD Portal für Gesundheitsfachpersonen mit Patientenkontext und der Rolle GFP und ASSISTANT starten.
- Die Ansicht für den Impfausweis im Menu auswählen.
- Die Ansicht für Impfausweis öffnen.
- In der Tabelle einen Kommentar auswählen und das Kontextmenu mit der rechten Maustaste öffnen.

### Erwartetes Ergebnis:

Das erwartete Resultat des Tests ist wie folgt:

Das Kontextmenu zeigt die folgenden Aktionen bei Impfungen an:  
1.	Detailansicht (öffnet die Detailansicht aus TC 2.2: Impfungen Detailansicht)
2.	Impfung erfassen (öffnet das Formular zur Erfassung von Impfungen aus TC 2.3: Impfung erfassen)
3.	Unverträglichkeit erfassen (öffnet das Formular zur Erfassung von Unverträglichkeiten aus TC 3.3: Unverträglichkeit erfassen)
4.	Vorerkrankung erfassen (öffnet das Formular zur Erfassung von  aus TC 4.3: Infektionskrankheit erfassen)
5.	Kommentar hinzufügen (öffnet das Formular zur Erfassung von Kommentaren aus TC 6.3: Kommentar erfassen)

Das Kontextmenu zeigt die folgenden Aktionen bei Unverträglichkeit an:  
1.	Detailansicht (öffnet die Detailansicht aus TC 3.2: Unverträglichkeiten Detailansicht)
2.	Unverträglichkeit erfassen (öffnet das Formular zur Erfassung von Unverträglichkeiten aus TC 3.3: Unverträglichkeit erfassen)
3.	Vorerkrankung erfassen (öffnet das Formular zur Erfassung von  aus TC 4.3: Infektionskrankheit erfassen)
4.	Kommentar hinzufügen (öffnet das Formular zur Erfassung von Kommentaren aus TC 6.3: Kommentar erfassen)

Das Kontextmenu zeigt die folgenden Aktionen bei durchgemachten Infektionskrankheiten an:
1.	Detailansicht (öffnet die Detailansicht aus TC 4.2: Infektionskrankheiten Detailansicht)
2.	Vorerkrankung erfassen (öffnet das Formular zur Erfassung von  aus TC 4.3: Infektionskrankheit erfassen)
3.	Kommentar hinzufügen (öffnet das Formular zur Erfassung von Kommentaren aus TC 6.3: Kommentar erfassen)

Das Kontextmenu zeigt die folgenden Aktionen bei Kommentaren an:  
1.	Detailansicht (öffnet die Detailansicht aus TC 6.2: Kommentare Detailansicht)
2.	Bearbeiten (öffnet das Formular zur Erfassung aus TC 6.3: Kommentar erfassen )
3.	Annullieren (öffnet das Formular zur Annullierung aus TC 6.5: Kommentar annullieren)