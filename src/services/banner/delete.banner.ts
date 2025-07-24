import { mutationCreator } from '../__creator.ts';

export const useDeleteBanner = mutationCreator<{ pathParams: string }>('banner/item', 'DELETE');
