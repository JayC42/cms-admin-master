import { ExcelUtils } from '../../../../utils/excel.utils.ts';
import { TranslationObject } from '../../../../models/TranslationObject.ts';
import { RewardOptionListMap } from '../../../consts.ts';
import { keyToLabel } from '../../../../utils/KeyLabelPair.ts';

const NON_DEFAULT_LOCALES = ['en-GB', 'ms-MY', 'zh-HK'];

/**
 * The total number of sheets in the xlsx file. Based on the downloaded template.
 */
const TOTAL_AVAILABLE_SHEETS = 5;

const TITLE_SHEET_INDEX = 1;
const SUB_TITLE_SHEET_INDEX = 2;
const DESCRIPTION_SHEET_INDEX = 3;

export interface ExtractionOutput {
  output: ExtractionObject[];
  errorList: ExtractionError[];
}

export interface ExtractionError {
  index: number;
  error: string;
}

export interface ExtractionObject {
  id: string;
  label: TranslationObject[];
  poolQuota: number;
  timeToPublic: Date;
  timeToRelease: Date;
  timeToRemove: Date | undefined;
  type: string;
  autoSelectWinner: boolean;
  winnerSelectionTime: number;
  badgeCode: string[];
  tags: string[];
}

export interface LooselyExtractionOutput {
  id: string;
  label: TranslationObject[];
  poolQuota: string;
  timeToPublic: Date | undefined;
  timeToRelease: Date | undefined;
  timeToRemove: Date | undefined;
  type: string;
  autoSelectWinner: string;
  winnerSelectionTime: string;
  badgeCode: string[];
  tags: string[];
}

export interface ExtractionDelivery {
  id: string;
  redeemCapacity: number | undefined;
  minimumAllowedAppointment: number | undefined;
  maximumAllowedAppointment: number | undefined;
  redeemTimeSlot: string[] | undefined;
  market: string;
  secondReminder: number | undefined;
  deliveryOption: string[] | undefined;
}

export interface LooselyExtractionDeliveryOutput {
  id: string;
  redeemCapacity: string;
  minimumAllowedAppointment: string | undefined;
  maximumAllowedAppointment: string | undefined;
  redeemTimeSlot: string[];
  market: string;
  secondReminder: number | undefined;
  deliveryOption: string[];
}

export function ExtractXlsxForImport(anyItem: any[][]): ExtractionOutput | null {
  if (anyItem.length != TOTAL_AVAILABLE_SHEETS) {
    return null;
  }
  const output: ExtractionObject[] = [];
  const errorList: any[] = [];
  anyItem[0].map((item, index) => {
    const extractedData = convertBasicToGift(item);
    const validationOutput = validate(extractedData);
    if (typeof validationOutput === 'string') {
      errorList.push({ index, error: validationOutput });
    } else {
      output.push(validationOutput);
    }
  });
  output.map((item) => {
    try {
      NON_DEFAULT_LOCALES.forEach((locale) => {
        const translationObject = convertStringToTranslationObject(
          locale,
          item.id,
          anyItem[TITLE_SHEET_INDEX],
          anyItem[SUB_TITLE_SHEET_INDEX],
          anyItem[DESCRIPTION_SHEET_INDEX],
        );
        item.label.push(translationObject);
      });
    } catch (e) {
      console.log('Error in translation', e);
    }
  });
  //anyItem[4].map((item, index) => {
  //  const extractedData = convertBasicDeliveryOption(item);
  //  const validationOutput = validateDelivery(extractedData);
  //  if (typeof validationOutput === 'string') {
  //    errorList.push({ index, error: validationOutput });
  //  } else {
  //    output.push(validationOutput);
  //  }
  //});
  return {
    output,
    errorList,
  };
}

function validate(extractedData: LooselyExtractionOutput): ExtractionObject | string {
  let errorMessage = '<ul>';
  if (!extractedData.id) {
    return '<ul><li>禮品[' + extractedData.label[0].title + ']的Item值為空</li></ul>';
  }
  if (!extractedData.label[0].title || extractedData.label[0].title.trim() === '') {
    return '<ul><li>禮品[' + extractedData.id + ']的品牌值為空</li></ul>';
  }
  if (!extractedData.label[0].subTitle || extractedData.label[0].subTitle.trim() === '') {
    return '<ul><li>禮品[' + extractedData.id + ']的型號值為空</li></ul>';
  }
  const poolQuota = parseInt(extractedData.poolQuota);
  if (isNaN(poolQuota)) {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的獎池上限格式錯誤</li>`;
  }
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (!isValidDate(extractedData.timeToPublic)) {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的公開時間格式錯誤</li>`;
  } else {
    if (!extractedData.timeToPublic) {
      errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的公開時間格式錯誤</li>`;
    } else {
      if (extractedData.timeToPublic < tomorrow) {
        errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的公開時間必須在明天之後</li>`;
      }
    }
  }
  if (!isValidDate(extractedData.timeToRelease)) {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的參與時間格式錯誤</li>`;
  } else {
    if (!extractedData.timeToRelease) {
      errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的參與時間格式錯誤</li>`;
    } else {
      const timeToRelease = new Date(extractedData.timeToRelease);
      let minimumDate = tomorrow;
      if (extractedData.timeToPublic) {
        const timeToPublic = new Date(extractedData.timeToPublic);
        minimumDate = timeToPublic > tomorrow ? timeToPublic : tomorrow;
      }
      if (timeToRelease < minimumDate) {
        errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的參與時間必須在公開時間之後</li>`;
      }
    }
  }
  if (!isValidDate(extractedData.timeToRemove)) {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的移除時間格式錯誤</li>`;
  } else {
    if (extractedData.timeToRemove != undefined) {
      const timeToRemove = new Date(extractedData.timeToRemove);
      let minimumDate = tomorrow;
      if (extractedData.timeToRelease) {
        const timeToRelease = new Date(extractedData.timeToRelease);
        minimumDate = timeToRelease > tomorrow ? timeToRelease : tomorrow;
      }
      if (timeToRemove < minimumDate) {
        errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的移除時間必須在參與時間之後</li>`;
      }
    }
  }
  const typeValue = keyToLabel(RewardOptionListMap, extractedData.type, '');
  if (typeValue === '') {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的類型錯誤</li>`;
  }
  const autoSelectWinner = parseBoolean(extractedData.autoSelectWinner.toString());
  if (autoSelectWinner === null) {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的自動選擇得獎者格式錯誤</li>`;
  }
  const winnerSelectionTime = parseInt(extractedData.winnerSelectionTime);
  if (isNaN(winnerSelectionTime)) {
    errorMessage = `${errorMessage}<li>禮品[${extractedData.label[0].title}]的得獎者選擇時間格式錯誤</li>`;
  }
  if (errorMessage !== '<ul>') {
    errorMessage = `${errorMessage}</ul>`;
    return errorMessage;
  }
  return {
    id: extractedData.id,
    label: extractedData.label,
    poolQuota: poolQuota,
    timeToPublic: extractedData.timeToPublic || new Date(),
    timeToRelease: extractedData.timeToRelease || new Date(),
    timeToRemove: extractedData.timeToRemove,
    type: extractedData.type,
    autoSelectWinner: autoSelectWinner as boolean,
    winnerSelectionTime: winnerSelectionTime,
    badgeCode: extractedData.badgeCode,
    tags: extractedData.tags,
  };
}

function parseBoolean(extractedValue: string): boolean | null {
  const trimmedValue = extractedValue.trim().toLowerCase();
  if (trimmedValue === 'true' || trimmedValue === '1') {
    return true;
  } else if (trimmedValue === 'false' || trimmedValue === '0') {
    return false;
  }
  return null;
}

function convertBasicToGift(basicData: any): LooselyExtractionOutput {
  return {
    id: basicData['Item'],
    label: [
      {
        locale: 'zh-CN',
        title: basicData['品牌'],
        subTitle: basicData['型號'],
        description: basicData['詳細說明'],
      },
    ],
    poolQuota: basicData['獎池上限'],
    timeToPublic: ExcelUtils.convertToExcelDate(basicData['公開時間']),
    timeToRelease: ExcelUtils.convertToExcelDate(basicData['參與時間']),
    timeToRemove: ExcelUtils.convertToExcelDate(basicData['移除時間']),
    type: basicData['禮品類型'],
    autoSelectWinner: basicData['自動選擇得獎者'],
    winnerSelectionTime: basicData['得獎者選擇時間'] || 5,
    badgeCode: convertStringToArray(basicData['特殊標籤']) || [],
    tags: convertStringToArray(basicData['禮品標籤']) || [],
  };
}

function convertStringToArray(input: string): string[] {
  if (!input) {
    return [];
  }
  return input.trim().split(',');
}

interface TranslationItem {
  id: string;
  [key: string]: any;
}

function convertStringToTranslationObject(
  locale: string,
  id: string,
  titleInput: TranslationItem[],
  subTitleInput: TranslationItem[],
  descriptionInput: TranslationItem[],
): TranslationObject {
  const title = fetchLocalizedValue(titleInput, id, locale, '品牌');
  const subTitle = fetchLocalizedValue(subTitleInput, id, locale, '型號');
  const description = fetchLocalizedValue(descriptionInput, id, locale, '詳細說明');
  return { locale, title, subTitle, description };
}

function fetchLocalizedValue(
  items: TranslationItem[],
  id: string,
  locale: string,
  property: string,
): string {
  const index = items.findIndex((item) => item.id == id);
  if (index !== -1) {
    return items[index][`${property}(${locale})`];
  }
  return '';
}

function isValidDate(d: Date | undefined) {
  try {
    return d instanceof Date && !isNaN(d.getTime());
  } catch (e) {
    return false;
  }
}
