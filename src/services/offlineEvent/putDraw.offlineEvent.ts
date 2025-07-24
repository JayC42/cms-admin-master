import { mutationCreator } from '../__creator.ts';

export type PatchOfflineDrawRequest = {
  giftName: string;
  giftImg: string;
  winnerCount: number;
  type: 'regular' | 'PFun';
  amount: number;
};

type Response = {
  status: number;
};

export const usePutOfflineDraw = mutationCreator<{
  req: PatchOfflineDrawRequest;
  res: Response;
  pathParams: string;
}>('offline-draw/76f491d1-3b9a-4096-96cc-84f13f6bdb55/gifts', 'PUT');
