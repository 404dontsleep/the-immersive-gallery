export type Theme = {
  baseBackground: string;
  baseText: string;
};

export function defineTheme(theme: Theme): Theme {
  return theme;
}

export function defineExtendTheme(theme: Partial<Theme>): Partial<Theme> {
  return {
    ...theme,
  };
}

export default defineTheme({
  baseBackground: "#F8F5F0",
  baseText: "#111111",
});
