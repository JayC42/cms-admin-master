import {
  useGetAllNotificationType,
  NotificationType,
} from '../../../services/notification/getAllType.notification.ts';
import { useState } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { DataRow, RowAction } from './typelist/DataRow.tsx';
import { DataHeader } from './typelist/DataHeader.tsx';
import { NotificationTypeDelete } from './NotificationType.disable.tsx';
import { NotificationTypeView } from './typeview/NotificationType.view.tsx';
import { useEnableNotificationType } from '../../../services/notification/enableType.notification.ts';

export const NotificationTypeList = () => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);
  const [toggleDeleteDialogOpen, setToggleDeleteDialogOpen] = useState(false);
  const [notificationTypeId, setNotificationTypeId] = useState<string>('');
  const [notificationTypeName, setNotificationTypeName] = useState<string>('');

  const getAllNotificationType = useGetAllNotificationType();

  const onAction = async (object: NotificationType, action: RowAction) => {
    switch (action) {
      case 'template':
        setToggleViewDialogOpen(true);
        setNotificationTypeId(object.id);
        break;
      case 'deactivate':
        setToggleDeleteDialogOpen(true);
        setNotificationTypeId(object.id);
        setNotificationTypeName(object.notificationType);
        break;
      case 'reactivate':
        handleEnable(object.id);
        break;
    }
  };

  const { mutateAsync } = useEnableNotificationType();

  const handleEnable = async (id: string) => {
    try {
      await mutateAsync({ pathParams: id });
      getAllNotificationType.refetch();
    } catch (e) {
      console.error('Error enabling notification type:', e);
    }
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
        <Table aria-label="Notification Type" size="small">
          <DataHeader />
          <TableBody>
            {getAllNotificationType.data?.items.map((row) => (
              <DataRow key={row.id} data={row} onAction={onAction} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NotificationTypeView
        open={toggleViewDialogOpen}
        notificationTypeId={notificationTypeId}
        onClose={() => setToggleViewDialogOpen(false)}
      />

      <NotificationTypeDelete
        open={toggleDeleteDialogOpen}
        data={{ notificationTypeId, notificationMessage: notificationTypeName }}
        onClose={() => {
          setToggleDeleteDialogOpen(false);
          getAllNotificationType.refetch();
        }}
      />
    </div>
  );
};
