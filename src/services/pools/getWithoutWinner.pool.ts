import { _queryCreator } from '../_creator.ts';

export type PoolWithoutWinner = {
  id: string;
  giftId: string;
  joinedScore: number;
  poolQuota: number;
  round: number;
  subTitle: string;
  timeToClose: string;
  timeToOpen: string;
  title: string;
  type: string;
};

export const useGetPoolWithoutWinner = _queryCreator<{
  res: {
    items: PoolWithoutWinner[];
    nextRefKey?: number;
    success: boolean;
  };
}>()('pool/list-without-winner');
