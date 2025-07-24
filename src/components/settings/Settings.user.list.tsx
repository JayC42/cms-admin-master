import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { DataHeader, DataRow } from './DataRow.tsx';
import { UserActivate } from './UserActivate.dialog.tsx';
import { AdminUserData, useGetUserList } from '../../services/user/getList.user.ts';

export const SettingsUserList: React.FC<{
  onEdit: (id: string) => void;
  onRefresh?: () => void;
}> = ({ onEdit, onRefresh }) => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);

  const [data, setData] = useState<AdminUserData[]>([]);
  const [selection, setSelection] = useState<AdminUserData>();
  const [refKey, setRefKey] = useState('');

  const lastElementRef = useRef<HTMLTableRowElement | null>(null);

  const getUserList = useGetUserList({
    queryParams: { refKey },
  });

  const loadUsers = useCallback(() => {
    const response = getUserList.data;
    if (response) {
      setData((prevData) => [...prevData, ...response.items]);
      setRefKey(response.nextRefKey ? response.nextRefKey : '');
    }
  }, [getUserList.data]);

  useEffect(() => {
    loadUsers();
  }, [getUserList.data, loadUsers]);

  const createDataMap = useCallback(() => {
    return new Map(data.map((item) => [item.id, item]));
  }, [data]);

  useEffect(() => {
    const observerInstance = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && refKey) {
          loadUsers();
        }
      },
      { threshold: 1.0 },
    );

    if (lastElementRef.current) {
      observerInstance.observe(lastElementRef.current);
    }

    return () => {
      observerInstance.disconnect();
    };
  }, [refKey]);

  const handleAction = (action: string, id: string) => {
    const dataMap = createDataMap();
    switch (action) {
      case 'edit':
        onEdit(id);
        break;
      case 'deactivate':
      case 'activate':
        setToggleViewDialogOpen(true);
        setSelection(dataMap.get(id));
        break;
      default:
        console.log('Operation not supported:', action);
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
        <Table sx={{ minWidth: 500 }} aria-label="User Table" size="small">
          <DataHeader />
          <TableBody>
            {data.map((row, index) => (
              <DataRow
                key={index}
                data={row}
                handleAction={handleAction}
                ref={index === data.length - 1 ? lastElementRef : null}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserActivate
        open={toggleViewDialogOpen}
        data={selection}
        onClose={() => {
          setToggleViewDialogOpen(false);
          setData([]);
          setRefKey('');
          getUserList.refetch();
          onRefresh?.();
        }}
      />
    </div>
  );
};
