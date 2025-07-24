import { KeyLabelPair } from '../utils/KeyLabelPair';

export type RewardType =
  | 'all'
  | 'electronic'
  | 'home-appliances'
  | 'vouchers'
  | 'wellness-beauty'
  | 'travel-experiences'
  | 'luxury'
  | 'others'
  | 'offline-market-event';

export const REWARD_CATEGORY_LIST: KeyLabelPair[] = [
  { key: 'all', label: '所有禮品' },
  { key: 'electronic', label: '電子產品' },
  { key: 'home-appliances', label: '家居生活' },
  { key: 'vouchers', label: '禮券' },
  { key: 'wellness-beauty', label: '健康及美容' },
  { key: 'travel-experiences', label: '旅遊及體驗' },
  { key: 'luxury', label: '尊貴禮品' },
  { key: 'others', label: '其他' },
  { key: 'offline-market-event', label: '市集限定' },
];

export const RewardCategoryListMap = new Map(
  REWARD_CATEGORY_LIST.map((item) => [item.key, item.label]),
);

export const REWARD_OPTION_LIST: KeyLabelPair[] = [
  { key: 'all', label: '' },
  { key: 'electronic', label: '電子產品' },
  { key: 'home-appliances', label: '家居生活' },
  { key: 'vouchers', label: '禮券' },
  { key: 'wellness-beauty', label: '健康及美容' },
  { key: 'travel-experiences', label: '旅遊及體驗' },
  { key: 'luxury', label: '尊貴禮品' },
  { key: 'others', label: '其他' },
  { key: 'offline-market-event', label: '市集限定' },
];

export const RewardOptionListMap = new Map(
  REWARD_OPTION_LIST.map((item) => [item.key, item.label]),
);

export type PoolStatus = 'all' | 'upcoming' | 'ongoing' | 'fullWithWinner' | 'fullWithoutWinner';

export const POOL_STATUS_LIST: KeyLabelPair[] = [
  { key: 'all', label: '所有獎池' },
  { key: 'upcoming', label: '即將開始' },
  { key: 'ongoing', label: '進行中' },
  { key: 'fullWithWinner', label: '已滿並有得獎者' },
  { key: 'fullWithoutWinner', label: '已滿但無得獎者' },
];

interface WinnerStateItem {
  key: WinnerState;
  label: string;
}

export type WinnerState =
  | 'all'
  | 'winnerSelected'
  | 'winnerRegistered'
  | 'rewardOrdering'
  | 'rewardReceived'
  | 'rewardRedeemed';

export const WINNER_STATE_LIST: WinnerStateItem[] = [
  { key: 'all', label: '所有得獎者' },
  { key: 'winnerSelected', label: '得獎者已選定' },
  { key: 'winnerRegistered', label: '得獎者已登記' },
  { key: 'rewardRedeemed', label: '已兌換禮品' },
];

export const WinnerStateListMap = new Map(WINNER_STATE_LIST.map((item) => [item.key, item.label]));

export const BADGE_CODE_LIST: KeyLabelPair[] = [
  { key: 'new', label: '新' },
  { key: 'limited', label: '限' },
];

export const MARKET_LIST: KeyLabelPair[] = [{ key: 'Malaysia', label: '馬來西亞' }];

export type SearchCriteria = 'createdAt' | 'timeToOpen' | 'timeToClose' | 'timeToPublic';

export const SEARCH_CRITERIA: KeyLabelPair[] = [
  { key: 'createdAt', label: '創建时間' },
  { key: 'timeToOpen', label: '開始時間' },
  { key: 'timeToClose', label: '結束時間' },
  { key: 'timeToPublic', label: '公開時間' },
];
