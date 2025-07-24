import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { RedeemConfiguration } from '../types/RedeemConfiguration.type.ts';

type fieldName =
  | 'redeemCapacity'
  | 'minimumAllowedAppointment'
  | 'maximumAllowedAppointment'
  | 'secondReminder';

type Props = {
  redeemConfiguration: RedeemConfiguration;
  redeemCapacityError?: string;
  minimumAllowedAppointmentError?: string;
  maximumAllowedAppointmentError?: string;
  secondReminderError?: string;
  onFieldChange: (name: fieldName, val: number) => void;
  onFocus: (name: fieldName) => void;
};

export const RedemptionRules = ({
  redeemConfiguration,
  redeemCapacityError,
  minimumAllowedAppointmentError,
  maximumAllowedAppointmentError,
  secondReminderError,
  onFieldChange,
  onFocus,
}: Props) => (
  <Box
    sx={{
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      p: 3,
      bgcolor: 'background.paper',
    }}
  >
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
      兌換規則
    </Typography>
    <Box sx={{ display: 'grid', gap: '24px' }}>
      <TextField
        label="每個時段兌換人數上限"
        type="number"
        value={redeemConfiguration.redeemCapacity}
        onChange={(e) => onFieldChange('redeemCapacity', parseInt(e.target.value, 10))}
        onFocus={() => onFocus('redeemCapacity')}
        error={!!redeemCapacityError}
        helperText={redeemCapacityError || '每個時段可以兌換禮品的最大人數'}
        fullWidth
      />

      <Box sx={{ display: 'grid', gap: '16px' }}>
        <TextField
          label="最早可預約時間（天）"
          type="number"
          value={redeemConfiguration.minimumAllowedAppointment}
          onChange={(e) => onFieldChange('minimumAllowedAppointment', parseInt(e.target.value, 10))}
          onFocus={() => onFocus('minimumAllowedAppointment')}
          error={!!minimumAllowedAppointmentError}
          helperText={minimumAllowedAppointmentError || '贏家最早可以在獲獎後多少天預約'}
          fullWidth
        />
        <TextField
          label="最遲可預約時間（天）"
          type="number"
          value={redeemConfiguration.maximumAllowedAppointment}
          onChange={(e) => onFieldChange('maximumAllowedAppointment', parseInt(e.target.value, 10))}
          onFocus={() => onFocus('maximumAllowedAppointment')}
          error={!!maximumAllowedAppointmentError}
          helperText={maximumAllowedAppointmentError || '贏家必須在獲獎後多少天內預約'}
          fullWidth
        />
        <TextField
          label="二次提醒時間（天）"
          type="number"
          value={redeemConfiguration.secondReminder}
          onChange={(e) => onFieldChange('secondReminder', parseInt(e.target.value, 10))}
          onFocus={() => onFocus('secondReminder')}
          error={!!secondReminderError}
          helperText={secondReminderError || '在最後期限前多少天發送提醒'}
          fullWidth
        />
      </Box>
    </Box>
  </Box>
);
