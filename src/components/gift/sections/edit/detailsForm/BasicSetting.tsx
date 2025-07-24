import { Box, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Dropdown from '../../../../common/Dropdown.tsx';
import { CreateGiftRequest } from '../../../../../services/gift/create.gift.ts';
import { REWARD_OPTION_LIST, RewardType } from '../../../../consts.ts';
import React from 'react';

interface Props {
  type: RewardType;
  onTypeChange: (name: keyof CreateGiftRequest, e: SelectChangeEvent) => void;
  typeError?: string;
  poolQuota: number;
  onPoolQuotaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  poolQuotaError?: string;
}

export const BasicSettings = ({
  type,
  onTypeChange,
  typeError,
  poolQuota,
  onPoolQuotaChange,
  poolQuotaError,
}: Props) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
      基本設置
    </Typography>
    <Box sx={{ display: 'grid', gap: '24px' }}>
      <Dropdown<keyof CreateGiftRequest>
        name="type"
        label="禮品種類"
        listItem={REWARD_OPTION_LIST}
        onChange={onTypeChange}
        value={type ?? 'all'}
        error={!!typeError}
        helperText={typeError ?? ''}
      />
      <TextField
        name="poolQuota"
        label="P分上限"
        type="number"
        value={poolQuota}
        onChange={onPoolQuotaChange}
        fullWidth
        error={!!poolQuotaError}
        helperText={poolQuotaError || 'Pool完成所需的P分總額'}
      />
    </Box>
  </Box>
);
