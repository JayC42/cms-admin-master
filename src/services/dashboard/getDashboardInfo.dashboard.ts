import { queryCreator } from '../__creator';

export type DashboardInfo = {
  currentPlayer: number;
  playersAdded: number;
  openedPool: number;
  newOpenedPool: number;
  totalPfund: number;
  newPfund: number;
};

export type PastPFundData = {
  month: string;
  data: Array<{
    name: string;
    value: number;
  }>;
};

export type TopActivePlayer = {
  name: string;
  gameId: string;
  gamesPlayed: number;
};

export type TopActiveReward = {
  itemName: string;
  category: string;
  sold: number;
};

type GetDashboardInfoResponse = {
  success: boolean;
  info: DashboardInfo;
  pastPFund: PastPFundData[];
  topActivePlayers: TopActivePlayer[];
  topActiveRewards: TopActiveReward[];
};

export const useGetDashboardInfo = queryCreator<{
  res: GetDashboardInfoResponse;
}>()('dashboard/info');
