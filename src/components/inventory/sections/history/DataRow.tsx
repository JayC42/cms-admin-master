import { TableCell, TableHead, TableRow } from '@mui/material';
import React, { forwardRef } from 'react';
import { InventoryHistoryItem } from '../../../../services/inventory/getHistory.inventory.ts';
import { formatDate } from '../../../../utils/dateTimeFormatter.ts';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>時間</TableCell>
        <TableCell>禮品名字</TableCell>
        <TableCell align="center">庫存數量</TableCell>
        <TableCell>經手人</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: InventoryHistoryItem;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data }, ref) => {
  return (
    <TableRow ref={ref} key={data.id}>
      <TableCell component="th" scope="row">
        {formatDate(data.createdTime)}
      </TableCell>
      <TableCell scope="row">{data.giftName}</TableCell>
      <TableCell align="center">{data.amount}</TableCell>
      <TableCell>{data.addedByAlias}</TableCell>
    </TableRow>
  );
});
