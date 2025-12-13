import { create } from 'zustand';
import defaultLanguage, {
  type Translation,
} from './languages/default.language';
import englishLanguage from './languages/english.language';
import vnLanguage from './languages/vn2.languages';

export const languageList = {
  default: defaultLanguage,
  english: englishLanguage,
  vn2: vnLanguage,
} as const;

type TranslationStore = {
  translation: Translation;
  language: keyof typeof languageList;
  setLanguage: (language: keyof typeof languageList) => void;
};

import { persist } from 'zustand/middleware';

export const useTranslation = create<TranslationStore>()(
  persist(
    (set) => ({
      translation: {
        ...defaultLanguage,
        ...languageList['default'],
      },
      language: 'default',
      setLanguage: (language: keyof typeof languageList) =>
        set({
          translation: {
            ...defaultLanguage,
            ...languageList[language],
          },
          language,
        }),
    }),
    {
      name: 'museum_translation_store',
      // Only persist the language key
      partialize: (state) => ({
        language: state.language,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.language) {
          // Khi được hydrate lại, cập nhật translation theo ngôn ngữ đã lưu
          state.setLanguage(state.language);
        }
      },
    },
  ),
);
