import { AvailableLocales } from '@/components/common/AvailableLocales.ts';
import { TranslationObject } from '../models/TranslationObject.ts';

export function getLocalizedLabel(
  labels: TranslationObject[],
  locale?: AvailableLocales,
): TranslationObject {
  if (labels.length === 0) {
    return {
      locale: 'Error',
      title: 'Error',
      subTitle: 'Error',
      description: 'Error',
    };
  }

  let selectedLabel: TranslationObject | null = null;
  const fallbackLabel: TranslationObject = labels[0];

  for (const label of labels) {
    if (label.locale === 'zh-CN' && label.title !== '') {
      return label;
    }

    if (label.locale === 'zh-HK') {
      selectedLabel = label;
    }
  }

  if (locale) {
    const localeLabel = labels.find((label) => label.locale === locale);
    if (localeLabel) {
      return localeLabel;
    }
  }

  return selectedLabel || fallbackLabel;
}
