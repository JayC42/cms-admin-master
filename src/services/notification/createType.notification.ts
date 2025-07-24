import { mutationCreator } from '../__creator.ts';

type CreateNotificationTypeRequest = {
  notificationType: string;
  label: {
    locale: string;
    title: string;
    description?: string;
  }[];
};

type CreateNotificationTypeResponse = {
  output: {
    id: string;
  };
};

export const useCreateNotificationType = mutationCreator<{
  req: CreateNotificationTypeRequest;
  res: CreateNotificationTypeResponse;
}>('notification/create-type', 'PUT');
