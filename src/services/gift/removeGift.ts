import { mutationCreator } from '../__creator.ts';

type RemoveGiftResponse = {
  status: string;
  code: number;
};

export const useRemoveGift = mutationCreator<{
  res: RemoveGiftResponse;
  pathParams: string;
}>('gift/item', 'DELETE');
