import { MARKET_LIST } from '../../../../consts.ts';

type Page5DocOutcome = {
  id: string;
  redeemCapacity: string;
  maximumAllowedAppointment: string;
  minimumAllowedAppointment: string;
  secondReminder: string;
  redeemTimeSlot: string;
  market: string;
  deliveryOption: string;
};

export const validatePage5DocOutcome = (title: string, item: Page5DocOutcome) => {
  const { redeemCapacity } = item;
  let errorMessage = '<ul>';
  if (isNaN(Number.parseInt(redeemCapacity, 10)))
    errorMessage = `${errorMessage}<li>禮品[${title}]的最大兌換人數存在錯誤</li>`;

  errorMessage = `${errorMessage}${validateAppointmentLimit(title, item)}`;

  errorMessage = `${errorMessage}${validateRedeemTimeSlot(title, item.redeemTimeSlot)}`;

  errorMessage = `${errorMessage}${validateMarket(title, item.market)}`;

  errorMessage = `${errorMessage}${validateDeliveryOption(title, item.deliveryOption)}`;

  if (errorMessage !== '<ul>') {
    errorMessage = `<li>禮品[${title}]設置存在錯誤，將使用初始設定</li>${errorMessage}</ul>`;
    return errorMessage;
  }

  return {
    ...item,
    redeemCapacity: parseNumberOrUndefined(item.redeemCapacity),
    maximumAllowedAppointment: parseNumberOrUndefined(item.maximumAllowedAppointment),
    minimumAllowedAppointment: parseNumberOrUndefined(item.minimumAllowedAppointment),
    secondReminder: parseNumberOrUndefined(item.secondReminder),
    redeemTimeSlot: item.redeemTimeSlot ? item.redeemTimeSlot.split(',') : undefined,
    market: item.market,
    deliveryOption: processDeliveryOption(item.deliveryOption),
  };
};

const validateAppointmentLimit = (title: string, item: Page5DocOutcome) => {
  const { minimumAllowedAppointment, secondReminder, maximumAllowedAppointment } = item;

  const allExist =
    minimumAllowedAppointment !== undefined &&
    secondReminder !== undefined &&
    maximumAllowedAppointment !== undefined;

  const noneExist =
    minimumAllowedAppointment === undefined &&
    secondReminder === undefined &&
    maximumAllowedAppointment === undefined;
  if (!(allExist || noneExist)) {
    return `<li>禮品[${title}]的最早可預約時間，二次提醒時間，最遲可預約時間必須同時存在或同時為空（使用內置設定）</li>`;
  }
  if (noneExist) {
    return '';
  }

  const minAppointment = parseInt(minimumAllowedAppointment);
  const secondReminderValue = parseInt(secondReminder);
  const maxAppointment = parseInt(maximumAllowedAppointment);

  if (isNaN(minAppointment) || isNaN(secondReminderValue) || isNaN(maxAppointment)) {
    return `<li>禮品[${title}]的最早可預約時間，二次提醒時間，最遲可預約時間必須同時為整數</li>`;
  }

  if (minAppointment <= 0 || secondReminderValue <= 0 || maxAppointment <= 0) {
    return `<li>禮品[${title}]的最早可預約時間，二次提醒時間，最遲可預約時間必須同時為正整數</li>`;
  }

  let errorMessage = '';

  if (minAppointment >= maxAppointment) {
    errorMessage = `${errorMessage}<li>禮品[${title}]的最早可預約時間必須小於最遲可預約時間</li>`;
  }

  if (secondReminderValue >= maxAppointment) {
    errorMessage = `${errorMessage}<li>禮品[${title}]的二次提醒時間必須小於最遲可預約時間</li>`;
  }

  return errorMessage;
};

const validateRedeemTimeSlot = (title: string, input: string) => {
  if (!input) input = '';
  let trimmedInput;
  try {
    trimmedInput = input.trim();
  } catch {
    return '<li>禮品[${title}]的時間段格式存在錯誤，請檢查該欄的格式。</li>';
  }
  if (trimmedInput === '') return '';

  const segments = trimmedInput.split(',');

  let errorMessage = '';
  if (trimmedInput.startsWith(',') || trimmedInput.endsWith(','))
    errorMessage = `${errorMessage}<li>禮品[${title}]的可預約時間段格式存在錯誤</li>`;

  for (const segment of segments) {
    const trimmedSegment = segment.trim();
    if (trimmedSegment === '') {
      errorMessage = `${errorMessage}<li>禮品[${title}]的發現無法被處理的可預約時間段</li>`;
    }
  }

  return errorMessage;
};

const validateMarket = (title: string, input: string) => {
  const isValid = MARKET_LIST.some((market) => market.key.toLowerCase() === input.toLowerCase());
  return !isValid ? `目前禮品[${title}]的市場只有馬來西亞(Malaysia)` : '';
};

const validateDeliveryOption = (title: string, input: string) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '') return '';
  const segments = trimmedInput.split(',').map((segment) => segment.trim());
  const validOptions = ['delivery', 'pickup', 'email'];
  const isValid = segments.every((segment) => validOptions.includes(segment));
  if (!isValid) {
    return `<li>禮品[${title}]的配送方式存在無法處理的選項</li>`;
  }
  return '';
};

const processDeliveryOption = (input: string) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '') return ['pickup'];

  const segments = trimmedInput.split(',').map((segment) => segment.trim().toLowerCase());
  const validOptions = ['delivery', 'pickup', 'email'];
  return [...new Set(segments.filter((segment) => validOptions.includes(segment)))];
};

const parseNumberOrUndefined = (value: string) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
};
