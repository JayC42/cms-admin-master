import { useGetNotificationItem } from '../../../../../services/notification/getItem.notification';
import { useGetAllNotificationType } from '../../../../../services/notification/getAllType.notification';

export const useNotificationData = (notificationId: string) => {
  const { data } = useGetAllNotificationType({
    options: {
      enabled: !!notificationId,
      refetchOnMount: !!notificationId,
    },
  });

  const { data: item } = useGetNotificationItem({
    pathParams: notificationId,
    options: {
      enabled: !!notificationId,
    },
  });

  return {
    notificationTypes: data?.items || [],
    detail: item?.output,
  };
};
