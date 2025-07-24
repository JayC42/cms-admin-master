import React, { useState } from 'react';
import {
  Button,
  Grid,
  Tabs,
  Tab,
  Box,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import { AVAILABLE_LOCALES } from '../../common/AvailableLocales.ts';
import { TranslationObject } from '../../../models/TranslationObject.ts';
import { useCreateNotification } from '../../../services/notification/create.notification.ts';
import { useGetAllNotificationType } from '../../../services/notification/getAllType.notification.ts';
import CmsDateTimePicker from '../../common/CmsDateTimePicker';
import { getMinimumDate } from '../../../utils/getMinimumDate.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dropdown from '../../common/Dropdown.tsx';
import { DEFAULT_CREATE_NOTIFICATION_REQUEST } from './add/DefaultCreateNotificationRequest.ts';
import MessageInput from './add/MessageInput.tsx';
import ContentDuplicateButton from './add/ContentDuplicateButton.tsx';

interface Props {
  onClose: () => void;
}

type AvailableLocales = 'zh-CN' | 'zh-HK' | 'en-GB' | 'ms-MY';

type TranslationsState = {
  [K in AvailableLocales]: {
    locale: K;
    title: string;
    subTitle: string;
    description: string;
  };
};

export const AddNotification = ({ onClose }: Props) => {
  const [translations, setTranslations] = useState<TranslationsState>({
    'zh-CN': { locale: 'zh-CN', title: '', subTitle: '', description: '' },
    'zh-HK': { locale: 'zh-HK', title: '', subTitle: '', description: '' },
    'en-GB': { locale: 'en-GB', title: '', subTitle: '', description: '' },
    'ms-MY': { locale: 'ms-MY', title: '', subTitle: '', description: '' },
  });
  const [formData, setFormData] = useState(DEFAULT_CREATE_NOTIFICATION_REQUEST);

  const [activeTab, setActiveTab] = useState<AvailableLocales>('zh-CN');

  const getAllNotificationType = useGetAllNotificationType();

  const handleTranslationChange = (
    locale: keyof typeof AVAILABLE_LOCALES,
    field: keyof TranslationObject,
    value: string,
  ) => {
    setTranslations((prevTranslations) => ({
      ...prevTranslations,
      [locale]: {
        ...prevTranslations[locale],
        [field]: value,
      },
    }));
  };

  const handleDateChange = (newDate: Date | null) => {
    if (!newDate) return;
    setFormData({ ...formData, timeToRelease: newDate });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isImportant: event.target.checked });
  };

  const padMissingTranslations = (translations: typeof AVAILABLE_LOCALES) => {
    const defaultLocale = translations['zh-CN'];
    const paddedTranslations = { ...translations };

    Object.keys(paddedTranslations).forEach((localeKey) => {
      if (localeKey !== 'zh-CN') {
        const locale = paddedTranslations[localeKey as AvailableLocales];
        locale.title = locale.title || defaultLocale.title;
        locale.subTitle = locale.subTitle || defaultLocale.subTitle;
        locale.description = locale.description || defaultLocale.description;
      }
    });

    return paddedTranslations;
  };

  const { mutateAsync } = useCreateNotification();

  const handleSubmit = async () => {
    const paddedTranslations = padMissingTranslations(translations);

    const request = {
      ...formData,
      timeToRelease: formData.timeToRelease,
      message: Object.values(paddedTranslations).map((translations) => ({
        locale: translations.locale,
        title: translations.title,
        message: translations.subTitle,
      })),
    };
    try {
      await mutateAsync({ data: request });
      onClose();
    } catch (e) {
      console.error('Error creating notification:', e);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          新增通知
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Dropdown
              label="通知類型"
              listItem={
                getAllNotificationType.data?.items.map((type) => ({
                  key: type.notificationType,
                  label: type.label,
                })) || []
              }
              name="type"
              onChange={(name, e) => setFormData({ ...formData, type: e.target.value })}
              value={formData.type || ''}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CmsDateTimePicker
                label="發佈時間"
                value={formData.timeToRelease}
                onChange={(date) => handleDateChange(date)}
                minDateTime={getMinimumDate()}
                sx={{ width: '100%', paddingLeft: '0.5vw' }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isPublic}
                    onChange={(event) =>
                      setFormData({ ...formData, isPublic: event.target.checked })
                    }
                  />
                }
                label="公開"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={formData.isImportant} onChange={handleCheckboxChange} />
                }
                label="重要"
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)}>
              <Tab value="zh-CN" label="简体中文" />
              <Tab value="zh-HK" label="繁體中文" />
              <Tab value="en-GB" label="English" />
              <Tab value="ms-MY" label="Malay" />
            </Tabs>
            {activeTab !== 'zh-CN' && (
              <ContentDuplicateButton
                onClick={() => {
                  const zhCNTranslations = translations['zh-CN'];
                  handleTranslationChange(activeTab, 'title', zhCNTranslations.title);
                  handleTranslationChange(activeTab, 'subTitle', zhCNTranslations.subTitle);
                }}
              />
            )}
          </Box>

          <MessageInput
            title={translations[activeTab].title}
            subTitle={translations[activeTab].subTitle}
            onInputChange={(name, e) => handleTranslationChange(activeTab, name, e.target.value)}
          />
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large" onClick={handleSubmit}>
          確認
        </Button>
      </Box>
    </Box>
  );
};
