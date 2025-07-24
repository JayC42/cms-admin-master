import { _queryCreator } from '../_creator.ts';
interface GetFeatureItemApi {
  res:
    | {
        success: true;
        items: Items;
      }
    | {
        success: false;
        error: string;
      };
}

export type GetFeatureItemParams = {
  startDate: string;
  endDate: string;
  type: string;
};

type FeatureItem = {
  id: string;
  giftName: string;
  description: string;
  previewImageUrl: string;
  weightage: number;
  rewardType: string;
};

export type Items = {
  featuredItems: FeatureItem[];
  nonFeaturedItems: FeatureItem[];
};

export const useGetFeatureItemApi = _queryCreator<{
  res: GetFeatureItemApi['res'];
  queryParams: GetFeatureItemParams;
}>()('gift/feature-list');
