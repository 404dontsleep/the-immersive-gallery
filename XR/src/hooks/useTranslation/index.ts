import { create } from "zustand";
import defaultLanguage, {
  type Translation,
} from "./languages/default.language";
import vnLanguage from "./languages/vn.language";

const languageList = {
  default: defaultLanguage,
  vn: vnLanguage,
} as const;

type TranslationStore = {
  translation: Translation;
  language: keyof typeof languageList;
  setLanguage: (language: keyof typeof languageList) => void;
};

export const useTranslation = create<TranslationStore>((set) => ({
  translation: defaultLanguage,
  language: "default",
  setLanguage: (language: keyof typeof languageList) =>
    set({
      translation: {
        ...defaultLanguage,
        ...languageList[language],
      },
      language,
    }),
}));
