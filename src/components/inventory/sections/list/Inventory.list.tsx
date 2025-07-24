import {
  useGetInventoryList,
  GetInventoryListParams,
  InventoryListItem,
} from '../../../../services/inventory/getList.inventory.ts';
import { useState } from 'react';
import { isEqual } from 'lodash-es';
import { FilterForm } from './FilterForm.tsx';
import { listSpacing } from '../../../componentStyles.ts';
import { DataHeader, DataRow } from './DataRow.tsx';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { AddStock } from './AddStock.tsx';

export const InventoryList = () => {
  const [toggleAddDialogOpen, setToggleAddDialogOpen] = useState(false);
  const [giftId, setGiftId] = useState<string>('');
  const [giftName, setGiftName] = useState<string>('');

  const [data, setData] = useState<InventoryListItem[]>([]);
  const [cachedData, setCachedData] = useState<GetInventoryListParams>({
    search: '',
  });

  const getInventoryList = useGetInventoryList(
    { queryParams: cachedData },
    {
      onFreshFetched: (data) => {
        setData((prev) => [...prev, ...data.items]);
      },
    },
  );

  const handleFormUpdate = async (formData: GetInventoryListParams) => {
    if (!isEqual(cachedData, formData)) {
      setData([]);
      setCachedData(formData);
    }
  };

  const handleAdd = (item: InventoryListItem) => {
    setGiftId(item.giftId);
    setGiftName(item.giftName);
    setToggleAddDialogOpen(true);
  };

  return (
    <div>
      <FilterForm handleFormUpdate={handleFormUpdate} />
      <div style={listSpacing}></div>
      <TableContainer component={Paper} className="custom-scrollbar" style={styles.container}>
        <Table stickyHeader aria-label="Inventory Table" size="small">
          <DataHeader />
          <TableBody>
            {data.map((row) => (
              <DataRow data={row} key={row.giftId} handleAdd={handleAdd} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddStock
        open={toggleAddDialogOpen}
        onClose={() => {
          setToggleAddDialogOpen(false);
          setData([]);
          getInventoryList.refetch();
        }}
        giftId={giftId}
        giftName={giftName}
      />
    </div>
  );
};

const styles = {
  container: {
    height: 'calc(100vh - 200px)',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#c1c1c1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#a8a8a8',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#c1c1c1 #f1f1f1',
  } as const,
};
