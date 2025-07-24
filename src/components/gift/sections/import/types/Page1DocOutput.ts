import { keyToLabel } from '../../../../../utils/KeyLabelPair.ts';
import { RewardOptionListMap } from '../../../../consts.ts';
import { isValid, parse } from 'date-fns';

type Page1DocOutcome = {
  autoSelectWinner: string;
  badgeCode: string;
  id: string;
  label: { locale: string; title: string; subTitle: string; description: string }[];
  poolQuota: string;
  tags: string;
  timeToPublic: string;
  timeToRelease: string;
  timeToRemove: string;
  type: string;
  winnerSelectionTime: string;
};

export const validatePage1DocOutcome = (item: Page1DocOutcome) => {
  const { id, label } = item;
  if (!id) {
    return '<ul><li>禮品[' + label[0].title + ']的Item值為空</li></ul>';
  }
  if (!label[0].title || label[0].title.trim() === '') {
    return '<ul><li>禮品[' + item.id + ']的品牌值為空</li></ul>';
  }
  if (!label[0].subTitle || label[0].subTitle.trim() === '') {
    return '<ul><li>禮品[' + item.id + ']的型號值為空</li></ul>';
  }

  const title = label[0].title;

  let errorMessage = '<ul>';
  const poolQuota = parseInt(item.poolQuota);
  if (isNaN(poolQuota)) {
    errorMessage = `${errorMessage}<li>禮品[${label[0].title}]的獎池上限格式錯誤</li>`;
  }

  const { timeToPublic, timeToRelease, timeToRemove } = item;

  const dates = {
    timeToPublic: convertDate(timeToPublic, false),
    timeToRelease: convertDate(timeToRelease, false),
    timeToRemove: convertDate(timeToRemove, true),
  };

  let errorForDates = '';
  Object.entries(dates).forEach(([key, value]) => {
    if (value === null) {
      const errorText = {
        timeToPublic: `禮品[${title}]的公開時間存在錯誤`,
        timeToRelease: `禮品[${title}]的參與時間存在錯誤`,
      }[key];
      errorForDates = `${errorForDates}<li>${errorText}</li>`;
    }
  });
  errorMessage = `${errorMessage}${errorForDates}`;

  if (errorForDates === '') {
    errorMessage = `${errorMessage}${validateDate(title, dates.timeToPublic, dates.timeToRelease, dates.timeToRemove)}`;
  }

  const { type } = item;
  const typeValue = keyToLabel(RewardOptionListMap, type, '');
  if (typeValue === '') {
    errorMessage = `${errorMessage}<li>禮品[${title}]的類型錯誤</li>`;
  }

  const { autoSelectWinner, winnerSelectionTime } = item;
  const validationAutoSelect = validateAutoSelectWinnerAndTime(
    autoSelectWinner,
    winnerSelectionTime,
    title,
  );
  if (validationAutoSelect != '') errorMessage = `${errorMessage}<li>${validationAutoSelect}</li>`;

  const { badgeCode = '', tags = '' } = item;
  const validationTags = validateTags(badgeCode, tags, title);
  if (validationTags !== '') {
    errorMessage = `${errorMessage}<li>${validationTags}</li>`;
  }

  if (errorMessage !== '<ul>') {
    errorMessage = `${errorMessage}</ul>`;
    return errorMessage;
  }

  return {
    id,
    label,
    poolQuota,
    timeToPublic: dates.timeToPublic,
    timeToRelease: dates.timeToRelease,
    timeToRemove: dates.timeToRemove,
    type,
    autoSelectWinner: parseBoolean(autoSelectWinner.toString()),
    winnerSelectionTime: parseInt(winnerSelectionTime.toString()),
    badgeCode: badgeCode.split(','),
    tags: tags.split(','),
  };
};

const validateDate = (
  title: string,
  timeToPublic?: Date | null,
  timeToRelease?: Date | null,
  timeToRemove?: Date | null,
) => {
  let errorMessage = '';
  if (!timeToPublic)
    throw new Error(
      'timeToPublic should not be null or undefined. ' +
        'This error shows prior validation method is malfunction.',
    );
  if (!timeToRelease)
    throw new Error(
      'timeToRelease should not be null or undefined. ' +
        'This error shows prior validation method is malfunction.',
    );
  if (timeToPublic <= new Date()) errorMessage += `<li>禮品[${title}]公開時間必須在未來</li>`;

  if (timeToRelease <= timeToPublic)
    errorMessage += `<li>禮品[${title}]參與時間必須晚於公開時間</li>`;

  if (timeToRemove && timeToRemove <= timeToRelease)
    errorMessage += `<li>禮品[${title}]移除時間必須晚於參與時間</li>`;

  return errorMessage;
};

const validateAutoSelectWinnerAndTime = (
  autoSelectWinner: string,
  winnerSelectionTime: string,
  title: string,
) => {
  let errorMessage = '';

  const _autoSelectWinner = parseBoolean(autoSelectWinner.toString());
  if (_autoSelectWinner === null) {
    errorMessage += `<li>禮品[${title}]的自動選擇得獎者格式錯誤</li>`;
  }

  if (_autoSelectWinner === true) {
    const _winnerSelectionTime = Number.parseInt(winnerSelectionTime);
    if (isNaN(_winnerSelectionTime)) {
      errorMessage += `<li>禮品[${title}]的得獎者選擇時間格式錯誤</li>`;
    }
  }

  return errorMessage;
};

const validateTags = (badgeCode: string, tags: string, title: string) => {
  let errorMessage = '';
  if (badgeCode) {
    const allowedBadgeCodes = ['limited', 'new'];
    const badgeCodes = badgeCode.split(',').map((code) => code.trim());

    const isValidBadgeCode = badgeCodes.every((code) => allowedBadgeCodes.includes(code));
    if (!isValidBadgeCode) {
      errorMessage += `<li>禮品[${title}]的展示標籤不在範圍（'limited', 'new'）內</li>`;
    }
  }

  // Validation for tags
  if (tags) {
    const trimmedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    if (trimmedTags.length === 0 && tags.includes(',')) {
      errorMessage += `<li>禮品[${title}]的標籤格式錯誤</li>`;
    }
  }

  return errorMessage;
};

const SUPPORTED_FORMATS = [
  'd/M/yyyy h:m a', // 13/3/2025 2:00 PM
  'dd/MM/yyyy HH:mm:ss', // 13/03/2025 14:00:00
  'd/M/yyyy HH:mm:ss', // 13/3/2025 14:00:00
  'dd/MM/yyyy h:mm a', // 13/03/2025 2:00 PM
  'd/M/yyyy h:mm a', // 13/3/2025 2:00 PM
  'dd/MM/yyyy HH:mm', // 13/03/2025 14:00
  'd/M/yyyy HH:mm', // 13/3/2025 14:00
];

const convertDate = (input: string | number, optional: boolean) => {
  input = String(input).trim();

  const excelNumber = Number(input);
  if (!isNaN(excelNumber) && excelNumber >= 10000) {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(excelNumber);
    const fraction = excelNumber - days;

    const hours = Math.floor(fraction * 24);
    const minutes = Math.floor((fraction * 1440) % 60);
    const seconds = Math.floor((fraction * 86400) % 60);

    excelEpoch.setDate(excelEpoch.getDate() + days);
    excelEpoch.setHours(hours, minutes, seconds, 0);

    return excelEpoch;
  }

  for (const format of SUPPORTED_FORMATS) {
    const parsedDate = parse(input, format, new Date());
    if (isValid(parsedDate)) return parsedDate;
  }

  return optional ? undefined : null;
};

const parseBoolean = (extractedValue: string) => {
  const trimmedValue = extractedValue.trim().toLowerCase();
  return trimmedValue === 'true' || trimmedValue === '1'
    ? true
    : trimmedValue === 'false' || trimmedValue === '0'
      ? false
      : null;
};
