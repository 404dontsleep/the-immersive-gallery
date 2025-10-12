import { create } from "zustand";
import defaultTheme, { type Theme } from "./themes/default.theme";

const themes = {
  default: defaultTheme,
} as const;

interface ThemeStore {
  theme: Theme;
  themeName: keyof typeof themes;
  setTheme: (theme: keyof typeof themes) => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  theme: defaultTheme,
  themeName: "default",
  setTheme: (theme: keyof typeof themes) =>
    set({
      theme: {
        ...defaultTheme,
        ...themes[theme],
      },
      themeName: theme,
    }),
}));
