import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (newTheme) => set({ theme: newTheme }),
      toggleTheme: () =>
        set({
          theme: get().theme === 'light' ? 'dark' : 'light',
        }),
    }),
    {
      name: 'sys-theme',
    },
  ),
);
