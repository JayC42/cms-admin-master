import React, { useRef, useState } from 'react';
import {
  useGetNotificationList,
  GetNotificationListParams,
  NotificationItem,
} from '../../../services/notification/getList.notification';
import { DataRow, RowAction } from './list/DataRow';
import { FilterForm } from './list/FilterForm';
import { listSpacing } from '../../componentStyles';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { DataHeader } from './list/DataHeader';
import { NotificationView } from './view/Notification.view';
import { NotificationDelete } from './Notification.delete';
import { isEqual } from 'lodash-es';
import { getFirstDayOfMonth } from '../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../utils/getLastDayOfMonth.ts';

export const NotificationList: React.FC = () => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);
  const [toggleDeleteDialogOpen, setToggleDeleteDialogOpen] = useState(false);
  const [notificationId, setNotificationId] = useState<string>('');
  const [notificationName, setNotificationName] = useState<string>('');

  const [list, setList] = useState<NotificationItem[]>([]);
  const [queryParams, setQueryParams] = useState<GetNotificationListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
  });
  const lastElementRef = useRef<HTMLTableRowElement | null>(null);

  const { refetch } = useGetNotificationList(
    { queryParams },
    {
      onFreshFetched: (data) => {
        if (data) {
          setList(data.items);
        }
      },
    },
  );

  const handleFormUpdate = (formData: GetNotificationListParams) => {
    if (!isEqual(queryParams, formData)) {
      // Only update if changed
      setList([]); // Clear list first
      setQueryParams(formData); // This will trigger the query automatically
    }
  };

  const handleAction = (object: NotificationItem, action: RowAction) => {
    switch (action) {
      case 'view': {
        setNotificationId(object.id);
        setToggleViewDialogOpen(true);
        break;
      }
      case 'delete': {
        setToggleDeleteDialogOpen(true);
        setNotificationId(object.id);
        setNotificationName(object.message);
      }
    }
  };

  return (
    <div>
      <FilterForm handleFormUpdate={handleFormUpdate} />
      <div style={listSpacing}></div>
      <Paper sx={sxStyles.listPaper}>
        <TableContainer sx={sxStyles.tableContainer}>
          <Table stickyHeader aria-label="Notification Table" size="small">
            <DataHeader />
            <TableBody>
              {list.map((row, index) => (
                <DataRow
                  key={row.id}
                  data={row}
                  onAction={handleAction}
                  ref={index === list.length - 1 ? lastElementRef : null}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <NotificationView
        open={toggleViewDialogOpen}
        notificationId={notificationId}
        onClose={() => setToggleViewDialogOpen(false)}
      />

      <NotificationDelete
        open={toggleDeleteDialogOpen}
        data={{ notificationId, notificationMessage: notificationName }}
        onClose={() => {
          setToggleDeleteDialogOpen(false);
          setList([]);
          refetch();
        }}
      />
    </div>
  );
};

const sxStyles = {
  listPaper: {
    width: '100%',
    height: 'calc(100vh - 240px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tableContainer: {
    flex: 1,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
    },
  },
};
