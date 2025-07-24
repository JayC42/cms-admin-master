import { ExcelUtils } from '../../../../utils/excel.utils.ts';

const ExcelHeader = [
  [
    'Item',
    '品牌',
    '型號',
    '禮品類型',
    '詳細說明',
    '獎池上限',
    '公開時間',
    '參與時間',
    '移除時間',
    '自動選擇得獎者',
    '得獎者選擇時間',
    '特殊標籤',
    '禮品標籤',
  ],
  ['Item', '品牌', '品牌(en-GB)', '品牌(ms-MY)', '品牌(zh-HK)'],
  ['Item', '型號', '型號(en-GB)', '型號(ms-MY)', '型號(zh-HK)'],
  ['Item', '詳細說明', '詳細說明(en-GB)', '詳細說明(ms-MY)', '詳細說明(zh-HK)'],
  [
    'Item',
    '最大兌換人數',
    '最早可預約時間',
    '二次提醒時間',
    '最遲可預約時間',
    '可預約時間段',
    '市場',
    '配送模式',
  ],
];

const width2 = { wch: 10 };
const width3 = { wch: 15 };
const width4 = { wch: 20 };

const SheetList = ['基礎數據', '品牌', '型號', '詳細說明', '運送說明'];
const ColumnWidth = [
  [
    width2,
    width2,
    width2,
    width2,
    width2,
    width2,
    width2,
    width2,
    width2,
    width4,
    width4,
    width2,
    width2,
  ],
  [width3, width3, width3, width3, width3],
  [width3, width3, width3, width3, width3],
  [width4, width4, width4, width4, width4],
  [width2, width4, width4, width4, width4, width4, width2, width2],
];

export async function downloadImportTemplate(name: string) {
  await ExcelUtils.exportExcelWithMultipleSheets(ExcelHeader, SheetList, ColumnWidth, name);
}
