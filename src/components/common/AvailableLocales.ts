interface LocaleDetails {
  locale: string;
  title: string;
  subTitle: string;
  description: string;
}

export type AvailableLocales = 'zh-CN' | 'en-GB' | 'ms-MY' | 'zh-HK';

export const AVAILABLE_LOCALES: Record<AvailableLocales, LocaleDetails> = {
  'zh-CN': { locale: 'zh-CN', title: '', subTitle: '', description: '' },
  'zh-HK': { locale: 'zh-HK', title: '', subTitle: '', description: '' },
  'en-GB': { locale: 'en-GB', title: '', subTitle: '', description: '' },
  'ms-MY': { locale: 'ms-MY', title: '', subTitle: '', description: '' },
};
