import type { RewardType } from '../../components/consts.ts';
import type { TranslationObject } from '../../models/TranslationObject.ts';
import type { ImagePairObject } from '../../models/ImagePairObject.ts';
import { queryCreator } from '@/services/__creator.ts';

export type GetGiftListParams = {
  type: RewardType;
  startDate: string;
  endDate: string;
};

export type GiftListItem = {
  id: string;
  label: TranslationObject[];
  poolQuota: number;
  type: RewardType;
  timeToPublic: string;
  timeToRelease: string;
  timeToRemove: string;
  image: ImagePairObject[];
};

type GetGiftListResponse = {
  result: GiftListItem[];
  nextRefKey: string;
};

export const useGetGiftList = queryCreator<{
  res: GetGiftListResponse;
  queryParams: GetGiftListParams;
}>()('gift/list');
