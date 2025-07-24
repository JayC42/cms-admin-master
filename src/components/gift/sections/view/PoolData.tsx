import React, { useState } from 'react';
import { IconButton, TableCell, TableHead, TableRow } from '@mui/material';
import { GiftPoolItem } from '../../../../services/gift/getPoolListById.ts';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { formatDate } from '../../../../utils/dateTimeFormatter.ts';

export const DataHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>遊戲ID</TableCell>
        <TableCell>獎池輪次</TableCell>
        <TableCell>當前參與度</TableCell>
        <TableCell>獎池開啟時間</TableCell>
        <TableCell>獎池關閉時間</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface Props {
  data: GiftPoolItem;
}

export const DataRow: React.FC<Props> = ({ data }) => {
  const [tooltipTitle, setTooltipTitle] = useState('複製禮品ID到剪貼板');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setTooltipTitle('已複製');
        setTimeout(() => setTooltipTitle('複製禮品ID到剪貼板'), 1000);
      },
      () => {
        setTooltipTitle('複製失敗');
      },
    );
  };

  return (
    <TableRow key={data.id}>
      <TableCell component="th" scope="row">
        {data.id}
        <Tooltip title={tooltipTitle}>
          <IconButton onClick={() => copyToClipboard(data.id)} aria-label="copy">
            <ContentCopyIcon fontSize={'small'} />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>{data.round}</TableCell>
      <TableCell>
        {data.joinedScore}/{data.poolQuota}
      </TableCell>
      <TableCell>{formatDate(data.timeToOpen)}</TableCell>
      <TableCell>{formatDate(data.timeToClose ? data.timeToClose : 'N/A')}</TableCell>
    </TableRow>
  );
};
