import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const ImportHintHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>項目</TableCell>
        <TableCell>用途</TableCell>
        <TableCell>可接受的值</TableCell>
        <TableCell>例子</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface HintRow {
  item: string;
  usage: string;
  acceptableValue: string;
  example: string;
  extendExplanation: string;
}

function createHintRow(
  item: string,
  usage: string,
  acceptableValue: string,
  example: string,
  extendExplanation: string = '',
): HintRow {
  return {
    item,
    usage,
    acceptableValue,
    example,
    extendExplanation,
  };
}

const HINT_ROWS: HintRow[] = [
  createHintRow('Item', '禮品在文件裡的序號', '數字或文本字串', '1'),
  createHintRow(
    '最大兌換人數',
    '每個時段可以兌換禮品的最大人數',
    '數字',
    '10',
    '選填，如果為空則使用初始設置。',
  ),
  createHintRow(
    '最早可預約時間',
    '贏家最早可以在獲獎後多少天進行預約',
    '數字',
    '10',
    '選填，單位為天，如果為空則使用初始設置。',
  ),
  createHintRow(
    '最遲可預約時間',
    '贏家需要在獲獎後多少內進行預約',
    '數字',
    '10',
    '選填，單位為天，如果為空則使用初始設置。',
  ),
  createHintRow(
    '可預約時間段',
    '贏家進行預約時，可選擇的時間段',
    '文本字串，以逗號區分',
    '10-11, 12-13',
    '選填，如果為空則使用初始設置。',
  ),
  createHintRow('市場', '此禮品面對的市場', 'Malaysia', 'Malaysia', '目前只有Malaysia這個市場。'),
  createHintRow(
    '二次提醒時間',
    '贏家未進行預約的二次提醒',
    '數字',
    '15',
    '選填單位為天，如果為空則使用使用初始設置',
  ),
  createHintRow(
    '配送模式',
    '此禮品可進行的配送方式',
    'delivery, pickup, email',
    'delivery, pickup',
    '選填，如果為空則視為只允許上門取件(pickup)',
  ),
];

export const DeliveryTab = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="Reward Table" size="small">
        <ImportHintHeader />
        <TableBody>
          {HINT_ROWS.map((row) => (
            <TableRow key={row.item}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.usage}
              </TableCell>
              {row.extendExplanation !== '' ? (
                <Tooltip title={row.extendExplanation} placement="top">
                  <TableCell style={{ width: 320 }}>{row.acceptableValue}</TableCell>
                </Tooltip>
              ) : (
                <TableCell style={{ width: 320 }}>{row.acceptableValue}</TableCell>
              )}
              <TableCell style={{ width: 320 }}>{row.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
