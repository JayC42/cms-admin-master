import { mutationCreator } from '../__creator.ts';

type DeleteNotificationTypeResponse = {
  status: string;
  code: number;
};

export const useDeleteNotification = mutationCreator<{
  res: DeleteNotificationTypeResponse;
  pathParams: string;
}>('notification/item', 'DELETE');
