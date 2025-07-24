import { _queryCreator } from '../_creator.ts';

export type GetNotificationListParams = {
  startDate: string;
  endDate: string;
  type?: string;
  userId?: string;
};

export type NotificationItem = {
  id: string;
  message: string;
  type: string;
  timeToRelease: string;
  recipient: string;
};

export const useGetNotificationList = _queryCreator<{
  res: {
    items: NotificationItem[];
  };
  queryParams: GetNotificationListParams;
}>()('notification/list');
