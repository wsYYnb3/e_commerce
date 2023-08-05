import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../translations/en.json";
import es from "../translations/es.json";
import de from "../translations/de.json";
import fr from "../translations/fr.json";
import he from "../translations/he.json";
import hu from "../translations/hu.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    de: { translation: de },
    fr: { translation: fr },
    he: { translation: he },
    hu: { translation: hu },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
