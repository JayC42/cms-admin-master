import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CmsDateTimePicker from '../../../../common/CmsDateTimePicker.tsx';
import React from 'react';
import { RedeemConfiguration } from '../types/RedeemConfiguration.type.ts';

type fieldName = 'timeToPublic' | 'timeToRelease' | 'timeToRemove';

type Props = {
  redeemConfiguration: RedeemConfiguration;
  onFieldChange: (name: fieldName, value: Date | null) => void;
  disableTimeToPublic: boolean;
  disableTimeToRelease: boolean;
  errors: {
    timeToPublic?: string;
    timeToRelease?: string;
    timeToRemove?: string;
  };
};

export const TimelineSettings = ({
  redeemConfiguration,
  onFieldChange,
  disableTimeToPublic,
  disableTimeToRelease,
  errors,
}: Props) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
      時間設置
    </Typography>
    <Box sx={{ display: 'grid', gap: '24px' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CmsDateTimePicker
          label="公開時間"
          value={redeemConfiguration.timeToPublic}
          onChange={(date) => onFieldChange('timeToPublic', date)}
          minDateTime={new Date()}
          error={!!errors.timeToPublic}
          helperText={errors.timeToPublic || '禮品對用戶可見的時間'}
          disable={disableTimeToPublic}
        />

        <CmsDateTimePicker
          label="參與時間"
          value={redeemConfiguration.timeToRelease}
          onChange={(date) => onFieldChange('timeToRelease', date)}
          minDateTime={new Date()}
          error={!!errors.timeToRelease}
          helperText={errors.timeToRelease || '用戶可以開始參與的時間'}
          disable={disableTimeToRelease}
        />

        <CmsDateTimePicker
          label="移除時間（可選）"
          value={redeemConfiguration.timeToRemove}
          onChange={(date) => onFieldChange('timeToRemove', date)}
          minDateTime={new Date()}
          error={!!errors.timeToRemove}
          helperText={errors.timeToRemove || '留空表示禮品永久有效'}
        />
      </LocalizationProvider>
    </Box>
  </Box>
);
