import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>禮品名字</TableCell>
        <TableCell align="right">P分上限</TableCell>
        <TableCell align="right">禮品種類</TableCell>
        <TableCell align="right">公開時間</TableCell>
        <TableCell align="right">參與時間</TableCell>
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};
