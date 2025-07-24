import React from 'react';
import { Box, Paper } from '@mui/material';
import { DetailGridUnit } from '../../../common/DetailGridUnit.tsx';
import { formatDateTime } from '../../../../utils/dateTimeFormatter.ts';
import { NotificationType } from '../../../../services/notification/getAllType.notification.ts';
import { NotificationDetail } from '../../../../services/notification/getItem.notification.ts';

type Props = {
  detail: NotificationDetail;
  notificationTypes: NotificationType[];
};

export const InfoSection: React.FC<Props> = ({ detail, notificationTypes }: Props) => {
  const convertNotificationType = (type: string) => {
    const found = notificationTypes.find((item) => item.notificationType === type);
    return found ? found.label : '';
  };

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <DetailGridUnit title="消息ID" value={detail.id} sm={6} />
        <DetailGridUnit title="消息類型" value={convertNotificationType(detail.type)} sm={6} />
        <DetailGridUnit title="發佈時間" value={formatDateTime(detail.timeToRelease)} sm={12} />
      </Box>
    </Paper>
  );
};
