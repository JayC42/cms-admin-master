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

const ImportHintHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>項目</TableCell>
        <TableCell>用途</TableCell>
        <TableCell>可接受的值</TableCell>
        <TableCell>例子</TableCell>
        <TableCell>對應Excel方程</TableCell>
      </TableRow>
    </TableHead>
  );
};

interface HintRow {
  item: string;
  usage: string;
  acceptableValue: string;
  example: string;
  excelFormula?: string;
}

function createHintRow(
  item: string,
  usage: string,
  acceptableValue: string,
  example: string,
  excelFormula: string = 'N/A',
): HintRow {
  return {
    item,
    usage,
    acceptableValue,
    example,
    excelFormula,
  };
}

const HINT_ROWS: HintRow[] = [
  createHintRow('Item', '禮品在文件裡的序號', '數字或文本字串', '1', `=('基礎數據'!A<行號>)`),
  createHintRow('型號', '型號初始語言（簡體中文）', '文本字串', '型号A', `=('基礎數據'!C<行號>)`),
  createHintRow('型號(en-GB)', '型號的英語顯示方式', '文本字串', 'Model A'),
  createHintRow('型號(ms-MY)', '型號的馬來語顯示方式', '文本字串', 'Modal A'),
  createHintRow('型號(zh-HK)', '型號的繁體中文顯示方式', '文本字串', '型號A'),
];

export const SubtitleDataTab: React.FC = () => {
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
              <TableCell style={{ width: 200 }}>{row.acceptableValue}</TableCell>
              <TableCell style={{ width: 200 }}>{row.example}</TableCell>
              <TableCell style={{ width: 250 }}>{row.excelFormula}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
