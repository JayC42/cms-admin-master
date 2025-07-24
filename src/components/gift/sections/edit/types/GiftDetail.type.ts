import { RewardType } from '../../../../consts.ts';

export type GiftDetailsSubset = {
  type: RewardType;
  poolQuota: number;
  autoSelectWinner: boolean;
  winnerSelectionTime: number;
  badgeCode: string[];
  tags: string[];
};

export const DEFAULT_GIFT_DETAIL = {
  type: 'all' as RewardType,
  poolQuota: 0,
  autoSelectWinner: false,
  winnerSelectionTime: 5,
  badgeCode: [],
  tags: [],
};
