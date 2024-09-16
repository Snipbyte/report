// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to lms system",
          "description": "This is a simple example of internationalization with i18next.",
          // Add more translations here for English
        },
      },
      fr: {
        translation: {
          "welcome": "Bienvenue dans le système lms",
          "description": "Ceci est un exemple simple d'internationalisation avec i18next.",
          // Add more translations here for French
        },
      },
    },
    lng:'en', // Default language
    fallbackLng: 'en', // Fallback language if translation not found
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
