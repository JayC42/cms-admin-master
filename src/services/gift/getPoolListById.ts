import { _queryCreator } from '../_creator.ts';

type GetPoolListByIdApi =
  | {
      success: true;
      items: GiftPoolItem[];
    }
  | {
      success: false;
      error: string;
    };

export type GiftPoolItem = {
  id: string;
  round: number;
  joinedScore: number;
  timeToOpen: string;
  poolQuota: string;
  timeToClose?: string;
};

export const useGetPoolListByIdApi = _queryCreator<{
  res: GetPoolListByIdApi;
  pathParams: string;
}>()('gift/pool');
