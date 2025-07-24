import React, { forwardRef } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { RoleData } from '../../../models/RoleData.ts';
import { EditButton } from '../../common/buttons/EditButton.tsx';
import { DeleteButton } from '../../common/buttons/DeleteButton.tsx';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>權限等級</TableCell>
        <TableCell>擁有的權限</TableCell>
        <TableCell>操作</TableCell>
      </TableRow>
    </TableHead>
  );
};

type Operation = 'edit' | 'delete';

interface Props {
  data: RoleData;
  handleOperation: (operation: Operation, id: string) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, handleOperation }, ref) => {
  return (
    <TableRow ref={ref} key={data.id}>
      <TableCell>{data.name}</TableCell>
      <TableCell>{JSON.stringify(data.allowedModule)}</TableCell>
      <TableCell>
        <EditButton onClick={() => handleOperation('edit', data.id)} disabled={!data.removable} />
        <DeleteButton
          onClick={() => handleOperation('delete', data.id)}
          disabled={!data.removable}
        />
      </TableCell>
    </TableRow>
  );
});
