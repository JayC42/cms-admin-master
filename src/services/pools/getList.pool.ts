import { PoolStatus, RewardType, SearchCriteria } from '../../components/consts.ts';
import { _queryCreator } from '../_creator.ts';

export type GetPoolListParams = {
  startDate: string;
  endDate: string;
  type: RewardType;
  poolStatus: PoolStatus;
  searchBy: SearchCriteria;
  refKey?: string | undefined;
};

export type PoolItem = {
  id: string;
  giftId: string;
  round: number;
  type: string;
  timeToOpen: string;
  timeToRemove: string;
  timeToClose: string;
  joinedScore: number;
  poolQuota: number;
  title: string;
  subTitle: string;
};

export const useGetPoolList = _queryCreator<{
  res: {
    items: PoolItem[];
    nextRefKey?: string;
    success: boolean;
  };
  queryParams: GetPoolListParams;
}>()('pool/list');
