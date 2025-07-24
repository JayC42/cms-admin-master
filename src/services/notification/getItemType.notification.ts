import { _queryCreator } from '../_creator.ts';

type GetNotificationTypeItemResponse = {
  output: NotificationTypeItem;
};

export type NotificationTypeItem = {
  id: string;
  notificationType: string;
  isActive: boolean;
  isPublicMessage: boolean;
  label: {
    locale: string;
    title: string;
    description?: string;
  }[];
  isSystem: false;
};

export const useGetNotificationTypeItem = _queryCreator<{
  res: GetNotificationTypeItemResponse;
  pathParams: string;
}>()('notification/type');
