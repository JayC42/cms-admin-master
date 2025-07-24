import { TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { formatDateTime } from '../../../../utils/dateTimeFormatter';
import { RewardCategoryListMap } from '../../../consts';
import { VisibilityButton } from '../../../common';
import type { PoolItem } from '../../../../services/pools/getList.pool';
import { keyToLabel } from '../../../../utils/KeyLabelPair';

const cellStyles = {
  title: {
    maxWidth: '200px', // Increased from default
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  round: {
    width: 90,
    textAlign: 'center' as const,
  },
  type: {
    width: 110,
    textAlign: 'center' as const,
  },
  date: {
    width: 120,
    textAlign: 'center' as const,
  },
  status: {
    width: 110,
    textAlign: 'center' as const,
  },
  action: {
    width: 90,
    textAlign: 'center' as const,
  },
  headerRow: {
    backgroundColor: '#fff', // Ensure header has a background
    position: 'sticky' as const,
    top: 0,
    zIndex: 1, // Keep header above table content
  },
};

const HeaderCell = ({ style, content }: { style?: any; content: string }) => (
  <TableCell align="center" style={style}>
    {content}
  </TableCell>
);

export const DataHeader: React.FC = () => {
  return (
    <TableHead style={cellStyles.headerRow}>
      <TableRow>
        <TableCell>獎池名字</TableCell>
        <HeaderCell style={cellStyles.round} content="獎池輪次" />
        <HeaderCell style={cellStyles.type} content="獎池種類" />
        <HeaderCell style={cellStyles.date} content="獎池開啟時間" />
        <HeaderCell style={cellStyles.date} content="獎池關閉時間" />
        <HeaderCell style={cellStyles.status} content="獎池狀態" />
        <HeaderCell style={cellStyles.action} content="操作" />
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: PoolItem;
  handleView: (id: string) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, handleView }, ref) => {
  const poolStatus = `${data.joinedScore}/${data.poolQuota}`;
  const fullTitle = data.subTitle ? `${data.title} (${data.subTitle})` : data.title;
  const typeLabel = keyToLabel(RewardCategoryListMap, data.type);
  const timeToOpen = formatDateTime(data.timeToOpen);
  const timeToClose = formatDateTime(data.timeToClose);

  return (
    <TableRow ref={ref} key={data.id} hover>
      <TableCell style={{ maxWidth: 0, width: '30%' }}>
        <Tooltip title={fullTitle} placement="top">
          <Typography
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {fullTitle}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell style={cellStyles.round}>{data.round}</TableCell>

      <TableCell style={cellStyles.type}>
        <Tooltip title={typeLabel} placement="top">
          <span>{typeLabel}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={cellStyles.date}>
        <Tooltip title={timeToOpen} placement="top">
          <span>{timeToOpen}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={cellStyles.date}>
        <Tooltip title={timeToClose} placement="top">
          <span>{timeToClose}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={cellStyles.status}>
        <Tooltip title={`已參與: ${data.joinedScore} / 上限: ${data.poolQuota}`} placement="top">
          <span>{poolStatus}</span>
        </Tooltip>
      </TableCell>

      <TableCell style={cellStyles.action}>
        <VisibilityButton onClick={() => handleView(data.id)} />
      </TableCell>
    </TableRow>
  );
});

// Add display name for React DevTools
DataRow.displayName = 'DataRow';
