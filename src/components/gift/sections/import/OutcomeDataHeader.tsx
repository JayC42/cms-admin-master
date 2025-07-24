import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const OutcomeDataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>新禮品ID</TableCell>
        <TableCell>新禮品</TableCell>
        <TableCell style={{ textAlign: 'center' }}>操作</TableCell>
        <TableCell style={{ textAlign: 'center' }}>圖片上傳狀態</TableCell>
      </TableRow>
    </TableHead>
  );
};
