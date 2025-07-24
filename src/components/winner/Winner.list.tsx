import { useEffect, useMemo, useRef, useState } from 'react';
import { Paper, Table, TableContainer, TableBody, CircularProgress } from '@mui/material';
import { DataHeader, DataRow } from './DataRow.tsx';
import { FilterForm } from './FilterForm.tsx';
import { WinnerInfo } from './WinnerInfo.view.tsx';
import { ExcelUtils } from '../../utils/excel.utils.ts';
import { RewardCategoryListMap, WinnerStateListMap } from '../consts.ts';
import { listSpacing } from '../componentStyles.ts';
import { keyToLabel } from '../../utils/KeyLabelPair.ts';
import {
  useGetWinnerList,
  GetWinnerListParams,
  WinnerItem,
} from '../../services/winner/getList.winner.ts';
import { getFirstDayOfMonth } from '../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../utils/getLastDayOfMonth.ts';
import { getLocalizedLabel } from '../../utils/getLocalizedLabel.ts';
import { isEqual } from 'lodash-es';
import useIntersectionObserver from '../../hooks/useIntersectionObserver.ts';

export const WinnerList = () => {
  const [toggleDialogWinnerInfo, setToggleDialogWinnerInfo] = useState(false);
  const [winnerId, setWinnerId] = useState<string>('');

  const [list, setList] = useState<WinnerItem[]>([]);
  const [queryParams, setQueryParams] = useState<GetWinnerListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
    status: 'all',
  });

  const baseQueryParams = useMemo(
    () => ({
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      type: queryParams.type,
      poolStatus: queryParams.status,
    }),
    [queryParams.startDate, queryParams.endDate, queryParams.type, queryParams.status],
  );

  const [isLoading, setIsLoading] = useState(false);

  const getWinnerList = useGetWinnerList(
    {
      queryParams,
      options: {
        enabled: false,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
        queryKey: ['winner-list', baseQueryParams],
      },
    },
    {
      onFreshFetched: (data) => {
        setList((prev) => [...prev, ...data.items]);
        setIsLoading(false);
      },
    },
  );

  useEffect(() => {
    if (list.length === 0) {
      setIsLoading(true);
      getWinnerList.refetch();
    }
  }, [list.length]);

  // Trigger new API call when query parameters change (excluding refKey)
  useEffect(() => {
    if (list.length === 0) {
      setIsLoading(true);
      getWinnerList.refetch();
    }
  }, [queryParams.startDate, queryParams.endDate, queryParams.type, queryParams.status]);

  const containerRef = useRef(null);
  const lastElementRef = useIntersectionObserver(
    async () => {
      const data = getWinnerList.data;
      if (!data?.success || !data.nextRefKey || isLoading) return;
      setIsLoading(true);
      setQueryParams((prev) => ({ ...prev, refKey: data.nextRefKey }));
    },
    { threshold: 1.0, rootMargin: '100px', root: containerRef.current },
  );

  useEffect(() => {
    if (isLoading) {
      getWinnerList.refetch();
    }
  }, [queryParams.refKey]);

  const handleFormUpdate = (formData: GetWinnerListParams) => {
    if (!isEqual(queryParams, formData)) {
      setList([]);
      setQueryParams({ ...formData });
    }
  };

  const onExport = async () => {
    await ExcelUtils.exportExcel(
      [
        'ID',
        '奖池ID',
        '禮品内容',
        '禮品種類',
        '得獎者名字',
        '得獎者電郵',
        '得獎者狀態',
        '中獎時間',
      ],
      list.map((item) => ({
        ID: item.id,
        奖池ID: item.poolId,
        禮品内容: getLocalizedLabel(item.label).title,
        禮品種類: keyToLabel(RewardCategoryListMap, item.giftType),
        得獎者名字: item.gameUserData.userName,
        得獎者電郵: item.gameUserData.email,
        得獎者狀態: keyToLabel(WinnerStateListMap, item.winnerStatus),
        中獎時間: item.timeToAnnouncement,
      })),
      'winner.xlsx',
    );
  };

  return (
    <div>
      <FilterForm handleFormUpdate={handleFormUpdate} onExport={onExport} />
      <div style={listSpacing}></div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} style={sxStyles.container}>
          <Table sx={{ minWidth: 500 }} aria-label="Winner Table" size="small">
            <DataHeader />
            <TableBody>
              {list.map((row, index) => (
                <DataRow
                  key={row.id}
                  data={row}
                  handleView={() => {
                    setToggleDialogWinnerInfo(true);
                    setWinnerId(row.id);
                  }}
                  ref={index + 1 === list.length ? lastElementRef : null}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <WinnerInfo
        open={toggleDialogWinnerInfo}
        onClose={() => {
          setList([]);
          setToggleDialogWinnerInfo(false);
        }}
        winnerId={winnerId}
      />
    </div>
  );
};

const sxStyles = {
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
