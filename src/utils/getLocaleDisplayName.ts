export const getLocaleDisplayName = (locale: string): string => {
  switch (locale.toUpperCase()) {
    case 'ZH-HK':
      return '繁體中文';
    case 'ZH-CN':
      return '简体中文';
    case 'EN-GB':
      return 'English';
    case 'MS-MY':
      return 'Malay';
    default:
      return locale;
  }
};
