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
import { RiCodeBoxLine } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';

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
  extendExplanation?: string;
  isHtmlPopoverNeeded?: boolean;
}

function createHintRow(
  item: string,
  usage: string,
  acceptableValue: string,
  example: string,
  extendExplanation: string = '',
  isHtmlPopoverNeeded?: boolean,
): HintRow {
  return {
    item,
    usage,
    acceptableValue,
    example,
    extendExplanation,
    isHtmlPopoverNeeded: isHtmlPopoverNeeded || false,
  };
}

const HINT_ROWS: HintRow[] = [
  createHintRow('Item', '禮品在文件裡的序號', '數字或文本字串', '1'),
  createHintRow('品牌', '禮品品牌', '文本字串', 'Apple'),
  createHintRow('型號', '禮品具體型號', '文本字串', 'iPhone 16 Pro Max'),
  createHintRow(
    '禮品類型',
    '禮品種類',
    'electronic, home-appliances, vouchers, wellness-beauty, travel-experiences, luxury, others, offline-market-event',
    'electronic',
  ),
  createHintRow('詳細說明', '禮品說明', 'HTML文本', '<p>鐵窗集團最新旗艦產品</p>', undefined, true),
  createHintRow('獎池上限', '玩家可投入的P分上限', '數字', '100'),
  createHintRow(
    '公開時間',
    '公開給玩家知曉的時間',
    '日/月/年 小時:分鐘上下午',
    '31/12/2024 12:00 PM',
  ),
  createHintRow(
    '參與時間',
    '公開給玩家參與的時間',
    '日/月/年 小時:分鐘上下午',
    '31/12/2024 12:00 PM',
  ),
  createHintRow(
    '移除時間',
    '禮品移除的時間',
    '日/月/年 小時:分鐘上下午',
    '31/12/2024 12:00 PM',
    '如果不填寫，則不會自動移除，如果關閉時間仍有獎池，該獎池會自動進行退款。',
  ),
  createHintRow(
    '自動選擇得獎者',
    '是否自動選擇贏家',
    'true, false',
    'true',
    '如果為false，則需要手動選擇贏家。',
  ),
  createHintRow(
    '得獎者選擇時間',
    '獎池滿額後的等待時間',
    '數字',
    '5',
    '單位為分鐘，如果自動選擇贏家為true，不填寫此值將視為0，即獎池滿額後立即公開贏家。如果自動選擇贏家為false，此值將被無視。',
  ),
  createHintRow(
    '特殊標籤',
    '禮品在列表中顯示的特殊標籤',
    'new, limited',
    'new, limited',
    '多個特殊標籤可以同時存在。',
  ),
  createHintRow(
    '禮品標籤',
    '形容禮品的內部標籤',
    '文本字串，以逗號區分',
    'electronic, phone, apple',
    '此標籤目前不會顯示在用戶界面，用以輔助進行玩家偏好分析。',
  ),
];

interface Props {
  callRichTextGenerator: () => void;
}

export const BasicDataTab: React.FC<Props> = ({ callRichTextGenerator }) => {
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
                  <TableCell style={{ width: 320 }}>
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
                </Tooltip>
              ) : (
                <TableCell style={{ width: 320 }}>
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
              )}
              <TableCell style={{ width: 320 }}>{row.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
