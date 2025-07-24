import { TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { RewardCategoryListMap, WinnerStateListMap } from '../consts';
import { VisibilityButton } from '../common';
import { keyToLabel } from '../../utils/KeyLabelPair';
import { WinnerItem } from '../../services/winner/getList.winner';
import { getLocalizedLabel } from '../../utils/getLocalizedLabel';

export const DataHeader: React.FC = () => {
  return (
    <TableHead style={sxStyle.headerRow}>
      <TableRow>
        <TableCell style={sxStyle.userName}>赢家名字</TableCell>
        <TableCell style={sxStyle.gift}>奖品名字</TableCell>
        <TableCell align="center" style={sxStyle.type}>
          奖品種類
        </TableCell>
        <TableCell align="center" style={sxStyle.status}>
          赢家状态
        </TableCell>
        <TableCell align="center" style={sxStyle.handler}>
          負責人
        </TableCell>
        <TableCell align="center" style={sxStyle.action}>
          操作
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: WinnerItem;
  handleView: (id: string) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, handleView }, ref) => {
  const giftLabel = getLocalizedLabel(data.label);
  const { userName, email } = data.gameUserData;

  return (
    <TableRow ref={ref} hover sx={sxStyle.row}>
      <TableCell>
        <Tooltip title={`電郵: ${email}`} placement="top">
          <Typography style={sxStyle.userName}>{userName}</Typography>
        </Tooltip>
      </TableCell>

      <TableCell>
        <Tooltip title={giftLabel.title} placement="top" arrow>
          <Typography style={sxStyle.gift}>{giftLabel.title}</Typography>
        </Tooltip>
      </TableCell>

      <TableCell style={sxStyle.type}>
        <Tooltip title={keyToLabel(RewardCategoryListMap, data.giftType)} placement="top">
          <span>{keyToLabel(RewardCategoryListMap, data.giftType)}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={sxStyle.status}>
        <Tooltip title={keyToLabel(WinnerStateListMap, data.winnerStatus)} placement="top">
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: data.winnerStatus === 'pending' ? 'warning.main' : 'text.primary',
            }}
          >
            {keyToLabel(WinnerStateListMap, data.winnerStatus)}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell style={sxStyle.handler}>
        <Tooltip title={data.handledBy || '未指派'} placement="top">
          <Typography>{data.handledBy || '未指派'}</Typography>
        </Tooltip>
      </TableCell>

      <TableCell style={sxStyle.action}>
        <VisibilityButton onClick={() => handleView(data.id)} />
      </TableCell>
    </TableRow>
  );
});

DataRow.displayName = 'DataRow';

const sxStyle = {
  userName: {
    width: '200px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  gift: {
    width: '150px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  email: {
    color: '#666',
    fontSize: '0.85em',
  },
  type: {
    width: 120,
    textAlign: 'center' as const,
  },
  status: {
    width: 120,
    textAlign: 'center' as const,
  },
  handler: {
    width: 120,
    textAlign: 'center' as const,
  },
  action: {
    width: 80,
    textAlign: 'center' as const,
  },
  headerRow: {
    backgroundColor: '#fff',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1,
  },
  row: {
    height: '36px',
  },
};
