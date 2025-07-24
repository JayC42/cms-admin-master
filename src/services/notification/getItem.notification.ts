import { _queryCreator } from '../_creator.ts';

type GetNotificationItemResponse = {
  output: NotificationDetail;
};

export type NotificationDetail = {
  id: string;
  message: {
    locale: string;
    title: string;
    message: string;
  }[];
  type: string;
  timeToRelease: string;
  headerUrl?: string;
  resourceUrl?: string;
  referenceData?: string;
  payload?: string;
};

export const useGetNotificationItem = _queryCreator<{
  res: GetNotificationItemResponse;
  pathParams: string;
}>()('notification/item');
