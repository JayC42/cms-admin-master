import { _queryCreator } from '../_creator.ts';

export type OfflineDrawGift = {
  giftId: string;
  giftName: string;
  giftImg: string;
  winnerCount: number;
  wonCount: number;
  type: string;
  amount: number;
};

type Response = {
  data: OfflineDrawGift[];
};

export const useGetOfflineDraw = _queryCreator<{
  res: Response;
  pathParams: string;
}>()('offline-draw');
