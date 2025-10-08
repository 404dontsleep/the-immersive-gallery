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
  welcome: string;
  next: string;
  lorem: string;
};

export default defineTranslation({
  welcome: "Welcome",
  next: "Next",
  lorem:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
});
