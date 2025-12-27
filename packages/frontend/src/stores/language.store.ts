import { languagePublicControllerGet } from '@api';
import { create } from 'zustand';

type Language = {
  [key: string]: {
    [key: string]: string;
  };
};
type LanguageState = {
  language: string;
  setLanguage: (lang: string) => void;
  languageList: Language;
  fetchLanguageList: () => Promise<void>;
  getLanguage: (code: string, visiteds?: string[]) => string;
};

const defaultLanguage = 'EN';

function getLanguage(
  data: Language,
  country: string,
  code: string,
  visiteds: string[] = [],
): string {
  if (visiteds.includes(code)) {
    return 'recursive_language_error';
  }
  visiteds.push(country);
  const language =
    data[country]?.[code] ?? data[defaultLanguage]?.[code] ?? code;
  const match = language?.match(/{{(.+?)}}/);
  if (match) {
    const refCode = match[1];
    return language.replace(
      match[0],
      getLanguage(data, country, refCode, visiteds),
    );
  }
  return language;
}

const LANGUAGE_STORAGE_KEY = 'xr_language';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved) return saved;
  }
  return defaultLanguage;
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang: string) => {
    set({ language: lang });
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  },
  languageList: {},
  setLanguageList: (list: Language) => set({ languageList: list }),
  fetchLanguageList: async () => {
    const response = await languagePublicControllerGet();
    set({ languageList: (response as unknown as Language) ?? {} });
  },
  getLanguage: (code: string, visiteds: string[] = []): string => {
    return getLanguage(get().languageList, get().language, code, visiteds);
  },
}));
