import { NotificationItem } from '../../../../services/notification/getList.notification.ts';
import React, { forwardRef } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { formatDateTime } from '../../../../utils/dateTimeFormatter.ts';
import { DeleteButton, VisibilityButton } from '../../../common';

export type RowAction = 'view' | 'delete';

interface Props {
  data: NotificationItem;
  onAction: (object: NotificationItem, action: RowAction) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, onAction }, ref) => {
  const displayedDate = new Date(data.timeToRelease);
  const currentDate = new Date();
  const isDeletionAllowed = displayedDate > currentDate;

  return (
    <TableRow ref={ref} key={data.id}>
      <TableCell
        component="th"
        scope="row"
        style={{
          maxWidth: 0,
          width: '40%',
        }}
      >
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.message}
        </div>
      </TableCell>
      <TableCell align="center" sx={{ width: '12%' }}>
        {data.type}
      </TableCell>
      <TableCell align="center" sx={{ width: '14%' }}>
        {formatDateTime(data.timeToRelease)}
      </TableCell>
      <TableCell align="center" sx={{ width: '12%' }}>
        <VisibilityButton onClick={() => onAction(data, 'view')} />
        <DeleteButton onClick={() => onAction(data, 'delete')} disabled={!isDeletionAllowed} />
      </TableCell>
    </TableRow>
  );
});
