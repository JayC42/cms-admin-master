import { forwardRef } from 'react';
import { AddImageButton } from '../../../common/buttons/AddImageButton.tsx';
import { TableCell, TableRow } from '@mui/material';

interface Props {
  data: { newGiftId: string; title: string };
  onAction: (data: { newGiftId: string; title: string }) => void;
  uploaded: boolean;
}

export const OutcomeDataRow = forwardRef<HTMLTableRowElement, Props>(
  ({ data, onAction, uploaded }, ref) => {
    return (
      <TableRow ref={ref}>
        <TableCell>{data.newGiftId}</TableCell>
        <TableCell>{data.title}</TableCell>
        <TableCell style={{ textAlign: 'center' }}>
          <AddImageButton onClick={() => onAction(data)} />
        </TableCell>
        <TableCell style={{ textAlign: 'center' }}>{uploaded ? '已上傳' : '未上傳'}</TableCell>
      </TableRow>
    );
  },
);
