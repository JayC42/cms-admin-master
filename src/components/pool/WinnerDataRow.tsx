import { Button, TableCell, Tooltip, TableRow, TableHead } from '@mui/material';
import React, { forwardRef } from 'react';
import { formatDate } from '../../utils/dateTimeFormatter.ts';
import { RewardCategoryListMap } from '../consts.ts';
import { PoolWithoutWinner } from '../../services/pools/getWithoutWinner.pool.ts';
import { keyToLabel } from '../../utils/KeyLabelPair.ts';

export const WinnerDataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>獎池名字</TableCell>
        <TableCell align="center">獎池輪次</TableCell>
        <TableCell align="center">獎池種類</TableCell>
        <TableCell align="center">獎池開啟時間</TableCell>
        <TableCell align="center">獎池關閉時間</TableCell>
        <TableCell align="center">獎池狀態</TableCell>
        <TableCell align="center">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: PoolWithoutWinner;
  handleChooseWinner: (id: string) => void;
}

export const WinnerDataRow = forwardRef<HTMLTableRowElement, Props>(
  ({ data, handleChooseWinner }, ref) => {
    const fullTitle = `${data.title} (${data.subTitle})`;

    return (
      <TableRow ref={ref} key={data.id}>
        <TableCell
          component="th"
          scope="row"
          sx={{
            width: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px',
          }}
        >
          <Tooltip title={fullTitle} placement="top">
            <span>{fullTitle}</span>
          </Tooltip>
        </TableCell>
        <TableCell scope="row" align="center" sx={{ width: '100px' }}>
          {data.round}
        </TableCell>
        <TableCell scope="row" align="center" sx={{ width: '100px' }}>
          {keyToLabel(RewardCategoryListMap, data.type)}
        </TableCell>
        <TableCell scope="row" align="center" sx={{ width: '90px' }}>
          {formatDate(data.timeToOpen)}
        </TableCell>
        <TableCell scope="row" align="center" sx={{ width: '90px' }}>
          {formatDate(data.timeToClose)}
        </TableCell>
        <TableCell scope="row" align="center" sx={{ width: '100px' }}>
          {data.joinedScore}/{data.poolQuota}
        </TableCell>
        <TableCell align="center" sx={{ width: '100px' }}>
          <Button onClick={() => handleChooseWinner(data.id)}>選擇贏家</Button>
        </TableCell>
      </TableRow>
    );
  },
);
