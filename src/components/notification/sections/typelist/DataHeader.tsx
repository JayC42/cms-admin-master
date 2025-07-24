import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>識別標籤</TableCell>
        <TableCell align="center">通知類型</TableCell>
        <TableCell align="center">可使用</TableCell>
        <TableCell align="center">系統類型</TableCell>
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};
