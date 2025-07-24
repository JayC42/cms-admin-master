import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" sx={sxStyles.tableCell}>
          通知內容
        </TableCell>
        <TableCell align="center" sx={sxStyles.tableCell}>
          通知類型
        </TableCell>
        <TableCell align="center" sx={sxStyles.tableCell}>
          發佈時間
        </TableCell>
        <TableCell align="center" sx={sxStyles.tableCell}>
          操作
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const sxStyles = {
  tableCell: {
    bgcolor: 'background.paper',
    fontWeight: 600,
  },
};
