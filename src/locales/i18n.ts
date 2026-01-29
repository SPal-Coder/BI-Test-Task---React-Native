import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import hi from './hi.json';

const RESOURCES = {
    en: { translation: en },
    hi: { translation: hi },
};

const LANGUAGE_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: (callback: (lang: string) => void) => {
        const bestLanguage = RNLocalize.findBestLanguageTag(['en', 'hi']);
        callback(bestLanguage?.languageTag || 'en');
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

i18n
    .use(LANGUAGE_DETECTOR as any)
    .use(initReactI18next)
    .init({
        resources: RESOURCES,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
