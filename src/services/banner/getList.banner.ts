import { TranslationObject } from '../../models/TranslationObject.ts';
import { _queryCreator } from '../_creator.ts';

export interface BannerListItem {
  id: string;
  label: TranslationObject[];
  image: string;
  availableLocales: string[];
}

export type GetBannerListResponse = {
  banners: BannerListItem[];
  nextRefKey: string;
};

export const useGetBannerList = _queryCreator<{
  res: GetBannerListResponse;
  queryParams: {
    startDate: string;
    endDate: string;
  };
}>()('banner/list');
