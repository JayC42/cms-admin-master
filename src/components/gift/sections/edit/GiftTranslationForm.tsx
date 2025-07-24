import React, { useEffect, useState } from 'react';
import { TranslationObject } from '../../../../models/TranslationObject.ts';
import { AVAILABLE_LOCALES } from '../../../common/AvailableLocales.ts';
import { Box, Tab, Tabs, TextField, Typography } from '@mui/material';
import RichTextEditor from '../../../common/RichTextEditor/RichTextEditor.tsx';
import { formStyles } from './formStyles.ts';
import { HeaderTitle } from './common/HeaderTitle.tsx';
import { NextStepButton } from './common/NextStepButton.tsx';
import { PreviewSection } from './translationForm/PreviewSection.tsx';

interface Props {
  initialTranslations?: TranslationObject[];
  onNext: (translation: TranslationObject[]) => void;
}

const DEFAULT_LOCALE = 'zh-CN';
const LOCALE_LABELS: { [key: string]: string } = {
  'zh-CN': '簡體中文',
  'zh-HK': '繁體中文',
  'en-GB': '英文',
  'ms-MY': '馬來文',
};

export const GiftTranslationForm: React.FC<Props> = ({ initialTranslations, onNext }) => {
  const [selectedLocaleTab, setSelectedLocaleTab] = useState(0);
  const [localizedText, setLocalizedText] = useState<{ [key: string]: TranslationObject }>({
    ...AVAILABLE_LOCALES,
  });
  const [error, setError] = useState<boolean>(false);
  const locales = Object.keys(AVAILABLE_LOCALES);

  useEffect(() => {
    setLocalizedText(revertLabel(initialTranslations));
  }, [initialTranslations]);

  const handleFormSubmit = () => {
    if (!localizedText[DEFAULT_LOCALE].title) {
      setError(true);
    } else {
      setError(false);
      generateLabelTranslations();
    }
  };

  const generateLabelTranslations = () => {
    const defaultTranslation = localizedText[DEFAULT_LOCALE];
    const label = Object.values(localizedText).map((localeData) =>
      createLabel(localeData, defaultTranslation),
    );
    onNext(label);
  };

  const handleInputChange = (locale: string, field: keyof TranslationObject, value: string) => {
    setLocalizedText((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [field]: value,
      },
    }));
    if (locale === DEFAULT_LOCALE && field === 'title' && value) {
      setError(false); // Clear error when title for zh-CN is filled
    }
  };

  return (
    <Box sx={formStyles.wrapperBox}>
      {/* Header Section - Fixed */}
      <Box sx={formStyles.headerBox}>
        <Box sx={formStyles.headerContent}>
          <HeaderTitle title="添加禮品（一）：禮品名稱" />
          <NextStepButton onClick={handleFormSubmit} />
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={formStyles.scrollableWrapper}>
        <Box sx={sxStyles.scrollableContent}>
          {/* Language Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedLocaleTab}
              onChange={(_, newValue) => setSelectedLocaleTab(newValue)}
              variant="fullWidth"
              sx={sxStyles.tabs}
            >
              {locales.map((locale) => (
                <Tab
                  key={locale}
                  label={
                    <Typography
                      sx={{
                        color: error && locale === DEFAULT_LOCALE ? 'error.main' : 'inherit',
                        fontWeight: locale === DEFAULT_LOCALE ? 600 : 400,
                      }}
                    >
                      {LOCALE_LABELS[locale]}
                    </Typography>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* Translation Content */}
          {locales.map((locale, index) => (
            <Box
              key={locale}
              hidden={selectedLocaleTab !== index}
              sx={{ display: selectedLocaleTab === index ? 'flex' : 'none', gap: '32px' }}
            >
              {/* Form Section */}
              <Box sx={{ flex: '1 1 60%' }}>
                <Box sx={{ display: 'grid', gap: '24px' }}>
                  <TextField
                    fullWidth
                    label="禮品品牌"
                    variant="outlined"
                    value={localizedText[locale].title}
                    onChange={(e) => handleInputChange(locale, 'title', e.target.value)}
                    error={error && locale === DEFAULT_LOCALE}
                    helperText={
                      error && locale === DEFAULT_LOCALE
                        ? '初始（簡體中文）的品牌名字為必填項'
                        : '輸入禮品的品牌名稱'
                    }
                  />
                  <TextField
                    fullWidth
                    label="禮品型號"
                    variant="outlined"
                    value={localizedText[locale].subTitle}
                    onChange={(e) => handleInputChange(locale, 'subTitle', e.target.value)}
                    helperText="輸入禮品的型號或副標題（可選）"
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      禮品詳細說明
                    </Typography>
                    <RichTextEditor
                      content={localizedText[locale].description}
                      onChange={(editor) =>
                        handleInputChange(locale, 'description', editor.getHTML())
                      }
                    />
                  </Box>
                </Box>
              </Box>

              {/* Preview Section */}
              <PreviewSection input={localizedText[locale]} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const sxStyles = {
  scrollableContent: {
    display: 'grid',
    gap: '32px',
    pb: 3,
    minHeight: 'calc(100% + 100px)',
  },
  tabs: {
    '& .MuiTab-root': {
      fontWeight: 500,
    },
  },
};

const revertLabel = (
  labelData: TranslationObject[] | undefined,
): { [key: string]: TranslationObject } => {
  if (!labelData) return AVAILABLE_LOCALES;
  const mergedTranslations: { [key: string]: TranslationObject } = { ...AVAILABLE_LOCALES };
  labelData.forEach((localeData) => {
    mergedTranslations[localeData.locale] = mergeTranslations(
      localeData,
      mergedTranslations[localeData.locale],
    );
  });
  return mergedTranslations;
};

const createLabel = (localeData: TranslationObject, defaultTranslation: TranslationObject) => ({
  locale: localeData.locale,
  title: localeData.title || defaultTranslation.title,
  subTitle: localeData.subTitle || defaultTranslation.subTitle,
  description: localeData.description || defaultTranslation.description,
});

const mergeTranslations = (
  source: TranslationObject,
  target: TranslationObject,
): TranslationObject => ({
  locale: source.locale,
  title: source.title || target.title,
  subTitle: source.subTitle || target.subTitle,
  description: source.description || target.description,
});
