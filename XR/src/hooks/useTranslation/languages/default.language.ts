export function defineTranslation(translation: Translation): Translation {
  return translation;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function defineExtendTranslation(
  translation: DeepPartial<Translation>,
): DeepPartial<Translation> {
  return {
    ...translation,
  };
}

export type Translation = {
  tutorial: {
    title: string;
  };
  setting: {
    language: {
      [key: string]: string;
    };
    mode: {
      title: string;
      enter_vr: string;
      enter_xr: string;
      exit: string;
    };
  };
};

export default defineTranslation({
  tutorial: {
    title: 'Chào mừng bạn đến với bảo tàng ảo Việt Nam',
  },
  setting: {
    language: {
      title: 'Ngôn ngữ',
      default: 'Tiếng Việt',
      english: 'Tiếng Anh',
      vn2: 'Tiếng Việt 2',
    },
    mode: {
      title: 'Chế độ',
      enter_vr: 'Chế độ VR',
      enter_xr: 'Chế độ XR',
      exit: 'Thoát',
    },
  },
});
