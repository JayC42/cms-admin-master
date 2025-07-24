import { mutationCreator } from '../__creator.ts';

type CreateNotificationRequest = {
  message: {
    locale: string;
    title: string;
    message: string;
  }[];
  type: string;
  timeToRelease: Date;
  isPublic: boolean;
  isImportant: boolean;
  headerUrl?: string;
  resourceUrl?: string;
  referenceData?: string;
  payload?: string;
};

export const useCreateNotification = mutationCreator<{
  req: CreateNotificationRequest;
}>('notification/create', 'PUT');
