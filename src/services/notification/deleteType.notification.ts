import { mutationCreator } from '../__creator.ts';

type DeleteNotificationTypeResponse = {
  status: string;
  code: number;
};

export const useDeleteNotificationType = mutationCreator<{
  res: DeleteNotificationTypeResponse;
  pathParams: string;
}>('notification/delete', 'PATCH');
