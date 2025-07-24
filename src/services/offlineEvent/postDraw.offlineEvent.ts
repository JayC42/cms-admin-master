import { mutationCreator } from '../__creator.ts';

export type PostOfflineDrawRequest = {
  giftName: string;
  giftImg: string;
  winnerCount: number;
  type: 'regular' | 'PFun';
  amount: number;
};

type Response = {
  status: boolean;
  giftId: string;
};

export const usePostOfflineDraw = mutationCreator<{
  req: PostOfflineDrawRequest;
  res: Response;
  pathParams: string;
}>('offline-draw', 'POST');
