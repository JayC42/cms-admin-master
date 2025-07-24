import { TranslationObject } from '../../models/TranslationObject.ts';
import { _queryCreator } from '../_creator.ts';

export interface BannerDetail {
  id: string;
  label: TranslationObject[];
  startDate: string;
  endDate: string;
  redirectionLink: string;
}

export type GetBannerDetailResponse = {
  banner: BannerDetail;
};

export const useGetBannerDetail = _queryCreator<{
  res: GetBannerDetailResponse;
  pathParams: string;
}>()('banner/item');
