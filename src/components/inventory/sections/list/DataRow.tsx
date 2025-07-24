import { TableCell, TableHead, TableRow } from '@mui/material';
import React, { forwardRef } from 'react';
import { InventoryListItem } from '../../../../services/inventory/getList.inventory.ts';
import { DataRowThumbnail } from '../../../common/DataRowThumbnail.tsx';
import { AddStockButton } from '../../../common/buttons/AddStockButton.tsx';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>禮品名字</TableCell>
        <TableCell align="center">現存數量</TableCell>
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: InventoryListItem;
  handleAdd: (item: InventoryListItem) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, handleAdd }, ref) => {
  return (
    <TableRow ref={ref} key={data.giftId}>
      <TableCell component="th" scope="row" style={{ maxWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <DataRowThumbnail image={data.giftIcon} />
          {data.giftName}
        </div>
      </TableCell>
      <TableCell align="center">{data.amount}</TableCell>
      <TableCell align="center">
        <AddStockButton onClick={() => handleAdd(data)} />
      </TableCell>
    </TableRow>
  );
});
