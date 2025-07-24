import React, { forwardRef } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { EditButton, VisibilityButton } from '../../common';
import { SettingData } from '../../../services/setting/getList.setting.ts';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>配置名字</TableCell>
        <TableCell>配置類型</TableCell>
        <TableCell>說明</TableCell>
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface ConfigProps {
  data: SettingData;
  handleAction: (operation: 'view' | 'edit', id: string) => void;
}

export const ConfigRow = forwardRef<HTMLTableRowElement, ConfigProps>(
  ({ data, handleAction }, ref) => {
    return (
      <TableRow ref={ref} key={data.id}>
        <TableCell>{data.item}</TableCell>
        <TableCell>{data.type}</TableCell>
        <TableCell>{data.description}</TableCell>
        <TableCell align="center">
          <VisibilityButton onClick={() => handleAction('view', data.id)} />
          <EditButton onClick={() => handleAction('edit', data.id)} />
        </TableCell>
      </TableRow>
    );
  },
);
