import { _queryCreator } from '../_creator.ts';

export type GetInventoryHistoryParams = {
  startDate: string;
  endDate: string;
  refKey?: string;
};

export type InventoryHistoryItem = {
  amount: number;
  id: string;
  giftName: string;
  giftId: string;
  addedBy: string;
  createdTime: string;
  addedByAlias: string;
};

type GetInventoryHistoryResponse = {
  items: InventoryHistoryItem[];
  nextRefKey?: string;
  refKey?: string;
};

export const useGetInventoryHistory = _queryCreator<{
  res: GetInventoryHistoryResponse;
  queryParams: GetInventoryHistoryParams;
}>()('inventory/history');
