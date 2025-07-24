import { useRef, useState, useMemo, useEffect } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { FilterForm } from './FilterForm.tsx';
import { DataHeader, DataRow } from './DataRow.tsx';
import { PoolSearchDialog } from '../../PoolSearch.dialog.tsx';
import { PoolInfo } from '../view/Pool.view.tsx';
import { ExcelUtils } from '../../../../utils/excel.utils.ts';
import { RewardCategoryListMap } from '../../../consts.ts';
import { listSpacing } from '../../../componentStyles.ts';
import {
  useGetPoolList,
  GetPoolListParams,
  PoolItem,
} from '../../../../services/pools/getList.pool.ts';
import { getLastDayOfMonth } from '../../../../utils/getLastDayOfMonth.ts';
import { getFirstDayOfMonth } from '../../../../utils/getFirstDayOfMonth.ts';
import { keyToLabel } from '../../../../utils/KeyLabelPair.ts';
import { isEqual } from 'lodash-es';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver.ts';

export const PoolList = () => {
  const [toggleDialogPoolSearch, setToggleDialogPoolSearch] = useState(false);
  const [toggleDialogPoolInfo, setToggleDialogPoolInfo] = useState(false);
  const [poolId, setPoolId] = useState<string>('');

  const [list, setList] = useState<PoolItem[]>([]);
  const [queryParams, setQueryParams] = useState<GetPoolListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
    poolStatus: 'all',
    searchBy: 'createdAt',
  });

  const baseQueryParams = useMemo(
    () => ({
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      type: queryParams.type,
      poolStatus: queryParams.poolStatus,
      searchBy: queryParams.searchBy,
    }),
    [
      queryParams.startDate,
      queryParams.endDate,
      queryParams.type,
      queryParams.poolStatus,
      queryParams.searchBy,
    ],
  );

  const [isLoading, setIsLoading] = useState(false);

  const getPoolList = useGetPoolList(
    {
      queryParams,
      options: {
        enabled: false,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
        queryKey: ['pool-list', baseQueryParams],
      },
    },
    {
      onFreshFetched: (newData) => {
        if (newData.success) {
          setList((prev) => [...prev, ...newData.items]);
          setIsLoading(false);
        }
      },
    },
  );

  useEffect(() => {
    if (list.length === 0) {
      setIsLoading(true);
      getPoolList.refetch();
    }
  }, [list.length]);

  const containerRef = useRef(null);
  const lastElementRef = useIntersectionObserver(
    async () => {
      const data = getPoolList.data;
      if (!data?.success || !data.nextRefKey || isLoading) return;
      setIsLoading(true);
      setQueryParams((prev) => ({ ...prev, refKey: data.nextRefKey }));
    },
    {
      threshold: 1.0,
      rootMargin: '100px',
      root: containerRef.current,
    },
  );

  useEffect(() => {
    if (isLoading) {
      getPoolList.refetch();
    }
  }, [queryParams.refKey]);

  const handleFormUpdate = (formData: Omit<GetPoolListParams, 'refKey'>) => {
    if (!isEqual(baseQueryParams, formData)) {
      setList([]);
      setQueryParams({ ...formData });
    }
  };

  const onExport = async () => {
    await ExcelUtils.exportExcel(
      [
        'id',
        '奖池礼品',
        '奖池类型',
        '奖池ID',
        '奖池轮数',
        '开启时间',
        '当前P分',
        '奖池上限',
        '奖池参与度',
      ],
      list.map((item) => ({
        id: item.id,
        奖池礼品: `${item.title} (${item.subTitle})`,
        奖池类型: keyToLabel(RewardCategoryListMap, item.type),
        奖池ID: item.giftId,
        奖池轮数: item.round,
        开启时间: item.timeToOpen,
        当前P分: item.joinedScore,
        奖池上限: item.poolQuota,
        奖池参与度:
          item.poolQuota === 0 ? '∞' : ((item.joinedScore / item.poolQuota) * 100).toFixed(2) + '%',
      })),
      'pool.xlsx',
    );
  };

  return (
    <div>
      <FilterForm
        handleFormUpdate={handleFormUpdate}
        onExport={onExport}
        handlePoolSearch={() => setToggleDialogPoolSearch(!toggleDialogPoolSearch)}
      />
      <div style={listSpacing}></div>
      <TableContainer ref={containerRef} component={Paper} sx={{ maxHeight: '75vh' }}>
        <Table sx={{ minWidth: 500 }} aria-label="Pool Table" size="small">
          <DataHeader />
          <TableBody>
            {list.map((row, index) => (
              <DataRow
                key={row.id}
                data={row}
                handleView={() => {
                  setToggleDialogPoolInfo(true);
                  setPoolId(row.id);
                }}
                ref={index + 1 === list.length ? lastElementRef : null}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PoolSearchDialog
        open={toggleDialogPoolSearch}
        onClose={() => setToggleDialogPoolSearch(false)}
      />

      <PoolInfo
        open={toggleDialogPoolInfo}
        onClose={() => setToggleDialogPoolInfo(false)}
        data={{ poolId }}
      />
    </div>
  );
};
