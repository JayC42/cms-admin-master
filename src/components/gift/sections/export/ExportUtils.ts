import { ExcelUtils } from '../../../../utils/excel.utils';
import { formatDate } from '../../../../utils/dateTimeFormatter.ts';
import { ExportListItem } from '../../../../services/gift/export.gift.ts';

const ExportHeader = [
  'Item',
  'id',
  '禮品品牌',
  '禮品型號',
  '禮品P分上限',
  '禮品公開時間',
  '禮品開放時間',
  '禮品下架時間',
  '是否選擇贏家',
  '贏家選擇時間',
];

export async function generateExcelData(
  data: ExportListItem[],
  startDate: string,
  endDate: string,
) {
  const startDateString = getDate(new Date(startDate));
  const endDateString = getDate(new Date(endDate));
  await ExcelUtils.exportExcel(
    ExportHeader,
    data.map((item, index) => {
      return [
        index,
        item.id,
        item.title,
        item.subTitle,
        item.poolQuota,
        formatDate(item.timeToPublic),
        formatDate(item.timeToRelease),

        formatDate(item.timeToRemove),
        item.autoSelectWinner,
        item.winnerSelectionTime ? item.winnerSelectionTime : 0,
      ];
    }),
    `gift-${startDateString}-${endDateString}.xlsx`,
  );
}

function getDate(dateInput: Date) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const day = date.getDate();

  // Pad the month and day with leading zeros if they are less than 10
  const monthFormatted = month < 10 ? `0${month}` : month.toString();
  const dayFormatted = day < 10 ? `0${day}` : day.toString();

  return `${year}${monthFormatted}${dayFormatted}`;
}
