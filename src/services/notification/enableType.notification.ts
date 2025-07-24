import { mutationCreator } from '../__creator.ts';

type Response = {
  status: string;
  code: number;
};

export const useEnableNotificationType = mutationCreator<{
  res: Response;
  pathParams: string;
}>('notification/enable', 'PATCH');
