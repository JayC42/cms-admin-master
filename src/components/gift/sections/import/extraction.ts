import { convertPage1ToObject } from './types/Page1DocInput.ts';
import { validatePage1DocOutcome } from './types/Page1DocOutput.ts';
import { convertPage5ToObject, extractItemIndex } from './types/Page5DocInput.ts';
import { validatePage5DocOutcome } from './types/Page5DocOutcome.ts';
import { TranslationObject } from '../../../../models/TranslationObject.ts';
import { ExtractionErrorObject } from './types/ExtractionErrorObject.ts';

const NON_DEFAULT_LOCALES = ['en-GB', 'ms-MY', 'zh-HK'];

const TITLE_SHEET_INDEX = 1;
const SUB_TITLE_SHEET_INDEX = 2;
const DESCRIPTION_SHEET_INDEX = 3;

export function extraction(anyItem: any[][]) {
  if (anyItem.length != 5) return null;
  const basicData: any[] = [];
  const errorList: ExtractionErrorObject[] = [];
  anyItem[0].map((item, index) => {
    const data = convertPage1ToObject(item);
    const validation = validatePage1DocOutcome(data);
    if (typeof validation === 'string') {
      errorList.push({ index: `基礎數據：第${index + 1}列`, error: validation });
    } else {
      basicData.push(validation);
    }
  });
  const page5DocInputIdList = anyItem[4].map((item, index) => {
    return {
      id: extractItemIndex(item),
      index,
    };
  });
  const updatedData = basicData.map((item, index) => {
    const indexInDocInput = checkExistence(item.id, page5DocInputIdList);
    if (indexInDocInput >= 0) {
      const data = convertPage5ToObject(anyItem[4][indexInDocInput]);
      const validatedData = validatePage5DocOutcome(item.id, data);
      if (typeof validatedData === 'string') {
        errorList.push({ index: `運送說明：第${index + 1}列`, error: validatedData });
      } else {
        item = {
          ...item,
          ...validatedData,
        };
      }
    } else {
      console.log('This user follows default value.');
      item = {
        ...item,
        deliveryOption: ['pickup'],
      };
    }
    return item;
  });
  const output = updatedData.map((item) => {
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
    return item;
  });
  return { errorList, output };
}

const checkExistence = (targetId: string, source: { id: string; index: number }[]) => {
  const match = source.find((any) => any.id === targetId);
  if (match) return match.index;
  else return -1;
};

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
  const index = items.findIndex((item) => item.Item == id);
  if (index !== -1) {
    return items[index][`${property}(${locale})`];
  }
  return '';
}
