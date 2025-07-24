import type { ImagePairObject } from '../../models/ImagePairObject.ts';
import type { TranslationObject } from '../../models/TranslationObject.ts';
import { _queryCreator } from '../_creator.ts';

type GetPoolItemResponse = {
  pool: PoolDetail;
};

export type PoolDetail = {
  id: string;
  joinedScore: number;
  metadata: PoolMetadata;
  giftId: string;
  round: number;
  timeToOpen: string;
  poolQuota: number;
  type: string;
  weightage: number;
  timeToRemove?: string;
  timeToClose?: string;
  timeToAnnounceWinner?: string;
};

type PoolMetadata = {
  badgeCode?: string[];
  label: TranslationObject[];
  image?: ImagePairObject[];
};

export const useGetPoolItem = _queryCreator<{ res: GetPoolItemResponse; pathParams: string }>()(
  'pool/item',
);
