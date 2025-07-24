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
import { IconContext } from 'react-icons';
import { RiCodeBoxLine } from 'react-icons/ri';

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
  excelFormula: string;
  isHtmlPopoverNeeded?: boolean;
}

function createHintRow(
  item: string,
  usage: string,
  acceptableValue: string,
  example: string,
  excelFormula: string = 'N/A',
  isHtmlPopoverNeeded?: boolean,
): HintRow {
  return {
    item,
    usage,
    acceptableValue,
    example,
    excelFormula,
    isHtmlPopoverNeeded: isHtmlPopoverNeeded || false,
  };
}

const HINT_ROWS: HintRow[] = [
  createHintRow('Item', '禮品在文件裡的序號', '數字或文本字串', '1', `=('基礎數據'!A<行號>)`),
  createHintRow(
    '詳細說明',
    '詳細說明初始語言（簡體中文）',
    '文本字串',
    '型号A',
    `=('基礎數據'!D<行號>)`,
  ),
  createHintRow(
    '詳細說明(en-GB)',
    '詳細說明的英語顯示方式',
    '文本字串',
    'Model A',
    undefined,
    true,
  ),
  createHintRow(
    '詳細說明(ms-MY)',
    '詳細說明的馬來語顯示方式',
    '文本字串',
    'Modal A',
    undefined,
    true,
  ),
  createHintRow(
    '詳細說明(zh-HK)',
    '詳細說明的繁體中文顯示方式',
    '文本字串',
    '型號A',
    undefined,
    true,
  ),
];

interface Props {
  callRichTextGenerator: () => void;
}

export const DescriptionDataTab: React.FC<Props> = ({ callRichTextGenerator }) => {
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
              <TableCell style={{ width: 200 }}>
                {row.acceptableValue}
                {row.isHtmlPopoverNeeded && (
                  <span
                    onClick={callRichTextGenerator}
                    style={{ position: 'relative', top: '3px' }}
                  >
                    <IconContext.Provider value={{ size: '1.3em' }}>
                      <RiCodeBoxLine />
                    </IconContext.Provider>
                  </span>
                )}
              </TableCell>
              <TableCell style={{ width: 200 }}>{row.example}</TableCell>
              <TableCell style={{ width: 250 }}>{row.excelFormula}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
