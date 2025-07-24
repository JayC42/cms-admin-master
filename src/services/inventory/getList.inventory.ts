import { _queryCreator } from '../_creator.ts';

export type GetInventoryListParams = {
  search?: string | undefined;
};

export type InventoryListItem = {
  amount: number;
  giftIcon: string;
  giftName: string;
  giftId: string;
};

type GetInventoryListResponse = {
  items: InventoryListItem[];
  nextRefKey?: string;
};

export const useGetInventoryList = _queryCreator<{
  res: GetInventoryListResponse;
  queryParams: GetInventoryListParams;
}>()('inventory/inventoryList');
