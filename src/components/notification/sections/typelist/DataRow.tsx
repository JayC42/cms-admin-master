import { NotificationType } from '../../../../services/notification/getAllType.notification.ts';
import React, { forwardRef } from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import { DeleteButton } from '../../../common';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export type RowAction = 'deactivate' | 'template' | 'reactivate';

interface Props {
  data: NotificationType;
  onAction: (object: NotificationType, action: RowAction) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, onAction }, ref) => {
  return (
    <TableRow ref={ref} key={data.id}>
      <TableCell component="th" scope="row">
        {data.notificationType}
      </TableCell>
      <TableCell align="center">{data.label}</TableCell>
      <TableCell align="center">{data.isActive ? '是' : '否'}</TableCell>
      <TableCell align="center">{data.isSystem ? '是' : '否'}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => onAction(data, 'template')}>
          <EditNoteIcon />
        </IconButton>
        {data.isActive ? (
          <DeleteButton onClick={() => onAction(data, 'deactivate')} disabled={data.isSystem} />
        ) : (
          <IconButton onClick={() => onAction(data, 'reactivate')} disabled={data.isSystem}>
            <RestartAltIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
});
