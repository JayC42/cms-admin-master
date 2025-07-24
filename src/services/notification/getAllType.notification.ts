import { _queryCreator } from '../_creator.ts';

export type NotificationType = {
  id: string;
  notificationType: string;
  label: string;
  isActive: boolean;
  isSystem: boolean;
};

type Res = { res: { items: NotificationType[] } };

export const useGetAllNotificationType = _queryCreator<Res>()(
  'notification/getAllNotificationType',
);
