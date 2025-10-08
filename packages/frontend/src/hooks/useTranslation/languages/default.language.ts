export function defineTranslation(translation: Translation): Translation {
  return translation;
}

export function defineExtendTranslation(
  translation: Partial<Translation>,
): Partial<Translation> {
  return {
    ...translation,
  };
}

export type Translation = {
  go_back: string;
};

export default defineTranslation({
  go_back: 'Go Back',
});
