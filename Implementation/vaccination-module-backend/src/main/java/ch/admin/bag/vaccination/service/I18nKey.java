/**
 * Copyright (c) 2022 eHealth Suisse
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package ch.admin.bag.vaccination.service;

import java.util.Locale;

/**
 *
 * i18n key to generate PDF in several pieces of language
 *
 */
public enum I18nKey {
  VACCINATION_RECORD("Vaccination Record", "Impfausweis", "Carnet de vaccination", "Libretto delle vaccinazioni"), //
  BASIC_VACCINATION("Basic vaccinations", "Basisimpfungen", "Vaccinations de base", "Vaccinazioni di base"), //
  OTHER_VACCINATION("Other vaccinations", "Andere Impfungen", "Autres vaccinations", "Altere vaccinazioni"), //
  ADVERSE_EVENTS("Adverse Events", "Nebenwirkungen (UIE)", "Effets secondaires (EIV)",
      "Effetti indesiderati delle vaccinazioni (EIV)"), //
  PASTILLNESSES("Infectious Diseases", "Infektionskrankheiten", "Maladies infectieuses", "Malattie infettive"), //
  MEDICAL_PROBLEMS("Medical Problems", "Grundkrankheiten", "Maladies chroniques", "Malattie croniche"), //
  PASTILLNESS("Infectious Disease", "Infektionskrankheit", "Maladie", "Malattie"), //
  MEDICAL_PROBLEM("Medical Problem", "Grundkrankheit", "Maladie", "Malattie"), //

  FIRSTNAME("First name", "Vorname", "Prénom", "Nome"), //
  LASTNAME("Last name", "Name", "Nom", "Cognome"), //
  BIRTHDAY("Birthday", "Geburtsdatum", "Date de naissance", "Data di nascita"), //
  GENDER("Gender", "Geschlecht", "Genre", "Genere"), //

  DATE("Date", "Datum", "Date", "Data"), //
  BEGIN("Begin", "Beginn", "Début", "Data di inizio"), //
  END("End", "Ende", "Fin", "Data di fine"), //
  CLINICAL_STATUS("Clinical Status", "Klinischer Status", "Status Clinique", "Stato Clinico"), //
  VACCINE("Vaccine", "Impfstoff", "Vaccin", "Vaccino"), //
  DISEASE("Disease", "Impfschutz", "Maladie", "Malattia"), //
  DOSE("Dose", "Dosis", "Dose", "Dose"), //
  TREATING("Performer", "Geimpft Von", "Vacciné Par", "Vaccinato da"), //
  VALIDATED("Validated", "Validiert", "Validé", "Validato"), //
  PRINTED1("EPR Vaccination record", "EPD Impfausweis", "DEP carnet de vaccination",
      "CCE libretto delle vaccinazioni"), //
  PRINTED2("Printed on: ", "Gedruckt am: ", "Imprimé sur: ", "Stampato su: ");

  private String en;
  private String de;
  private String fr;
  private String it;

  private I18nKey(String en, String de, String fr, String it) {
    this.en = en;
    this.de = de;
    this.fr = fr;
    this.it = it;
  }

  public Locale getLocale(String lang) {
    if (lang == null) {
      return Locale.ENGLISH;
    }
    switch (lang) {
      case "de":
        return Locale.GERMAN;
      case "fr":
        return Locale.FRENCH;
      case "it":
        return Locale.ITALIAN;
      default:
        return Locale.ENGLISH;
    }
  }


  public String getTranslation(String lang) {
    if (lang == null) {
      return en;
    }
    switch (lang) {
      case "de":
        return de;
      case "fr":
        return fr;
      case "it":
        return it;
      default:
        return en;
    }
  }
}
