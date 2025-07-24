import { mutationCreator } from '../__creator.ts';

type Response = {
  status: number;
};

export const useDeleteOfflineDraw = mutationCreator<{
  res: Response;
  pathParams: string;
}>('offline-draw', 'DELETE');
