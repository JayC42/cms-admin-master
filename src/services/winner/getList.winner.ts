import { RewardType, WinnerState } from '../../components/consts.ts';
import { TranslationObject } from '../../models/TranslationObject.ts';
import { _queryCreator } from '../_creator.ts';

export type GetWinnerListParams = {
  startDate: string;
  endDate: string;
  type: RewardType;
  status: WinnerState;
  refKey?: string | undefined;
};

export type WinnerItem = {
  id: string;
  timeToAnnouncement: string;
  handledBy: string;
  giftId: string;
  poolId: string;
  label: TranslationObject[];
  giftType: string;
  gameUserData: {
    userName: string;
    email: string;
  };
  winnerStatus: string;
  scoreQuotaRatio: number;
};

export const useGetWinnerList = _queryCreator<{
  res: {
    items: WinnerItem[];
    nextRefKey?: string;
    success: boolean;
  };
  queryParams: GetWinnerListParams;
}>()('winner/list');
