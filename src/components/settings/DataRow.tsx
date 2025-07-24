import React, { forwardRef } from 'react';
import { IconButton, TableCell, TableHead, TableRow } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { formatDate } from '../../utils/dateTimeFormatter.ts';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { EditButton } from '../common';
import { AdminUserData } from '../../services/user/getList.user.ts';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>用戶名字</TableCell>
        <TableCell>用戶電郵</TableCell>
        <TableCell>用戶身分</TableCell>
        <TableCell>創建時間</TableCell>
        <TableCell>狀態</TableCell>
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};

type Action = 'view' | 'edit' | 'deactivate' | 'activate';

interface Props {
  data: AdminUserData;
  handleAction: (action: Action, id: string) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, handleAction }, ref) => {
  return (
    <TableRow ref={ref} key={data.id}>
      <TableCell>{data.userName}</TableCell>
      <TableCell>{data.userEmail}</TableCell>
      <TableCell>{data.roleName}</TableCell>
      <TableCell>{formatDate(data.createdAt)}</TableCell>
      <TableCell>{data.isActive ? '活躍' : '非活躍'}</TableCell>
      <TableCell align="center">
        <EditButton onClick={() => handleAction('edit', data.id)} />
        {data.isActive ? (
          <IconButton onClick={() => handleAction('deactivate', data.id)}>
            <LockIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleAction('activate', data.id)}>
            <LockOpenIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
});
