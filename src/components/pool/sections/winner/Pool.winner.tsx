import { useRef, useState, useEffect } from 'react';
import { Paper, Table, TableContainer, TableBody, Box, Container } from '@mui/material';
import { WinnerDataHeader, WinnerDataRow } from '../../WinnerDataRow.tsx';
import { WinnerSelection } from './WinnerSelection.dialog.tsx';
import {
  useGetPoolWithoutWinner,
  PoolWithoutWinner,
} from '../../../../services/pools/getWithoutWinner.pool.ts';
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver.ts';

export const PoolWinner = () => {
  const [poolId, setPoolId] = useState<string>('');

  const [toggleDialogWinnerSelection, setToggleDialogWinnerSelection] = useState(false);

  const [list, setList] = useState<PoolWithoutWinner[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [refKey, setRefKey] = useState(0);

  const getPoolWithoutWinner = useGetPoolWithoutWinner(
    {
      queryParams: { refKey: refKey > 0 ? refKey : undefined },
      options: {
        enabled: false,
        keepPreviousData: true,
        staleTime: Infinity,
        cacheTime: Infinity,
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
      getPoolWithoutWinner.refetch();
    }
  }, [list.length]);

  useEffect(() => {
    if (refKey > 0) {
      getPoolWithoutWinner.refetch();
    }
  }, [refKey]);

  useEffect(() => {
    const data = getPoolWithoutWinner.data;
    if (data?.success && data.nextRefKey && list.length < 10 && !isLoading) {
      setIsLoading(true);
      setRefKey(data.nextRefKey);
    }
  }, [getPoolWithoutWinner.data, list.length, isLoading]);

  const containerRef = useRef(null);
  const lastElementRef = useIntersectionObserver(
    async () => {
      const data = getPoolWithoutWinner.data;
      if (!data?.success || !data.nextRefKey || isLoading) return;
      setIsLoading(true);
      setRefKey(data.nextRefKey);
    },
    {
      threshold: 1.0,
      rootMargin: '100px',
      root: containerRef.current,
    },
  );

  return (
    <Container maxWidth="xl">
      <Box sx={sxStyles.outerBox}>
        <Paper elevation={2} sx={sxStyles.outerPaper}>
          <TableContainer ref={containerRef} sx={sxStyles.tableContainer}>
            <Table stickyHeader sx={sxStyles.table} size="medium">
              <WinnerDataHeader />
              <TableBody>
                {list.map((row, index) => (
                  <WinnerDataRow
                    key={row.id}
                    data={row}
                    handleChooseWinner={() => {
                      setPoolId(row.id);
                      setToggleDialogWinnerSelection(true);
                    }}
                    ref={index + 1 === list.length ? lastElementRef : null}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <WinnerSelection
          open={toggleDialogWinnerSelection}
          onClose={() => {
            setPoolId('');
            setToggleDialogWinnerSelection(false);
            setList([]);
            setRefKey(0);
            setIsLoading(false);
          }}
          data={{ poolId }}
        />
      </Box>
    </Container>
  );
};

const sxStyles = {
  outerBox: {
    height: 'calc(100vh - 80px)',
    display: 'flex',
  },
  outerPaper: {
    width: '100%',
    borderRadius: 1,
    overflow: 'hidden',
  },
  tableContainer: {
    maxHeight: 'calc(100vh - 100px)',
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e0e0e0',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
  table: {
    minWidth: 800,
    '& .MuiTableCell-root': {
      px: 2,
      py: 1.5,
      borderColor: '#f0f0f0',
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: '#fafafa',
    },
  },
};
