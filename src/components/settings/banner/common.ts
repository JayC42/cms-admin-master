export interface LocaleData {
  locale: string;
  title: string;
  description: string;
  image?: File;
}

export type BannerFormData = {
  data: LocaleData[];
  startDate: Date;
  endDate: Date;
  redirectionLink: string;
};

export const DEFAULT_BANNER_DATA = {
  data: [],
  startDate: new Date(),
  endDate: new Date(),
  redirectionLink: '',
};
