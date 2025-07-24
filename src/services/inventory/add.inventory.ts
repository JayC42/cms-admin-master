import { mutationCreator } from '../__creator.ts';

type AddInventoryRequest = {
  giftId: string;
  amount: number;
};

export const useAddInventory = mutationCreator<{
  req: AddInventoryRequest;
}>('inventory/addInventory', 'PUT');
