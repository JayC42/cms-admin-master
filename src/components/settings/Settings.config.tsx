import React, { useState, useCallback, useEffect } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { ConfigInfo } from './config.info.tsx';
import { ConfigEdit } from './config.edit.tsx';
import { ConfigRow, DataHeader } from './configData/ConfigRow.tsx';
import { useGetSettingList, SettingData } from '../../services/setting/getList.setting.ts';

export const SettingsConfigList: React.FC = () => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);
  const [toggleEditDialogOpen, setToggleEditDialogOpen] = useState(false);
  const [detail, setDetail] = useState<SettingData[]>([]);
  const [selection, setSelection] = useState<string>('');

  const getSettingList = useGetSettingList({});

  const loadSettings = useCallback(() => {
    const response = getSettingList.data;
    if (response) {
      setDetail(response.items);
    }
  }, [getSettingList.data]);

  useEffect(() => {
    loadSettings();
  }, [getSettingList.data, loadSettings]);

  const handleAction = (action: 'view' | 'edit', id: string) => {
    setSelection(id);
    switch (action) {
      case 'view':
        setToggleViewDialogOpen(true);
        break;
      case 'edit':
        setToggleEditDialogOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '70vh',
          overflow: 'auto',
        }}
      >
        <Table aria-label="Config Table" size="small">
          <DataHeader />
          <TableBody>
            {detail.map((item) => (
              <ConfigRow key={item.id} data={item} handleAction={handleAction} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfigInfo
        open={toggleViewDialogOpen}
        onClose={() => setToggleViewDialogOpen(false)}
        data={{ id: selection }}
      />

      <ConfigEdit
        open={toggleEditDialogOpen}
        onClose={() => {
          setToggleEditDialogOpen(false);
          setDetail([]);
          getSettingList.refetch();
        }}
        data={{ id: selection }}
      />
    </div>
  );
};
