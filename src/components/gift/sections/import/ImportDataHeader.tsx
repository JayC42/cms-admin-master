import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const ImportDataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width="30%">獎品名稱</TableCell>
        <TableCell width="10%">類型</TableCell>
        <TableCell width="15%">標籤</TableCell>
        <TableCell width="15%" align="center">
          名額
        </TableCell>
        <TableCell width="20%">開放時間</TableCell>
        <TableCell width="10%" align="right">
          操作
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
