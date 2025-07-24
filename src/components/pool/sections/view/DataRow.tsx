import { TableCell, TableHead, TableRow } from '@mui/material';
import React, { forwardRef } from 'react';
import { PoolParticipant } from '../../../../services/pools/getParticipant.pool.ts';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>玩家ID</TableCell>
        <TableCell>玩家名字</TableCell>
        <TableCell>玩家帳號</TableCell>
        <TableCell>已投入的P分</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: PoolParticipant;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data }, ref) => {
  return (
    <TableRow ref={ref} key={data.gameUserId}>
      <TableCell component="th" scope="row">
        {data.gameUserId}
        {data.winningStatus === 'win' ? <span style={{ fontSize: '18px' }}>🏆</span> : ''}
      </TableCell>
      <TableCell>{data.gameUserData.userName}</TableCell>
      <TableCell>{data.gameUserData.email}</TableCell>
      <TableCell>{data.totalPfundDeposited}</TableCell>
    </TableRow>
  );
});
