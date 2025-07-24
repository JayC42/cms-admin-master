import {
  useGetInventoryHistory,
  GetInventoryHistoryParams,
  InventoryHistoryItem,
} from '../../../../services/inventory/getHistory.inventory.ts';
import { useRef, useState } from 'react';
import { getFirstDayOfMonth } from '../../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../../utils/getLastDayOfMonth.ts';
import { isEqual } from 'lodash-es';
import { FilterForm } from './FilterForm.tsx';
import { listSpacing } from '../../../componentStyles.ts';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { DataHeader, DataRow } from './DataRow.tsx';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver.ts';

export const InventoryHistoryList = () => {
  const [list, setList] = useState<InventoryHistoryItem[]>([]);
  const [cachedData, setCachedData] = useState<GetInventoryHistoryParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
  });

  const { data } = useGetInventoryHistory(
    {
      queryParams: cachedData,
    },
    {
      onFreshFetched: (data) => {
        setList((prev) => [...prev, ...(data?.items || [])]);
      },
    },
  );

  const containerRef = useRef(null);
  const lastElementRef = useIntersectionObserver(
    async () => {
      setCachedData((prev) => ({
        ...prev,
        ...(data?.nextRefKey ? { refKey: data?.nextRefKey } : {}),
      }));
    },
    {
      threshold: 1.0,
      rootMargin: '100px',
      root: containerRef.current,
    },
  );

  const handleFormUpdate = async (formData: GetInventoryHistoryParams) => {
    if (!isEqual(cachedData, formData)) {
      setList([]);
      setCachedData(formData);
    }
  };

  return (
    <div>
      <FilterForm handleFormUpdate={handleFormUpdate} />
      <div style={listSpacing}></div>
      <TableContainer ref={containerRef} component={Paper} sx={{ maxHeight: '75vh' }}>
        <Table sx={{ minWidth: 500 }} aria-label="Inventory Table" size="small">
          <DataHeader />
          <TableBody>
            {list.map((row, index) => (
              <DataRow
                data={row}
                key={row.id}
                ref={index + 1 === list.length ? lastElementRef : null}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
