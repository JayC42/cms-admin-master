import React, { useEffect, useRef, useState } from 'react';
import { RoleData } from '../../models/RoleData.ts';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { DataHeader, DataRow } from './RoleInfo/DataRow.tsx';
import { RoleInfo } from './RoleInfo/Role.edit.dialog.tsx';
import { useGetAllRole } from '../../services/user/getAllRole.user.ts';

export const SettingsRoleList: React.FC = () => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);

  const [data, setData] = useState<RoleData[]>([]);
  const [dataMap, setDataMap] = useState(new Map());
  const [selection, setSelection] = useState<RoleData | undefined>(undefined);
  const [refKey, setRefKey] = useState<string | undefined>(undefined);

  const lastElementRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    setData([]);
    loadRoles();
  }, []);
  const { mutateAsync } = useGetAllRole();

  const loadRoles = async () => {
    try {
      const response = await mutateAsync({ data: { refKey: refKey } });
      setData((prevData) => {
        const updatedData = [...prevData, ...response.roleList];
        setDataMap(new Map(updatedData.map((role) => [role.id, role])));

        return updatedData;
      });
      setRefKey(response.nextRefKey);
    } catch (e) {
      console.error('Error loading roles:', e);
    }
  };

  useEffect(() => {
    const observerInstance = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && refKey) {
          loadRoles();
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
    switch (action) {
      case 'edit':
        const roleData = dataMap.get(id);
        if (roleData) {
          setSelection(roleData);
          setToggleViewDialogOpen(true);
        }
        break;
      case 'delete':
        console.log('Delete:', id);
        break;
      default:
        console.log('Action not supported:', action);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table" size={'small'}>
          <DataHeader />
          <TableBody>
            {data.map((row, index) => (
              <DataRow data={row} handleOperation={handleAction} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RoleInfo
        open={toggleViewDialogOpen}
        data={selection}
        onClose={() => {
          setToggleViewDialogOpen(false);
          setData([]);
          loadRoles();
        }}
      />
    </div>
  );
};
