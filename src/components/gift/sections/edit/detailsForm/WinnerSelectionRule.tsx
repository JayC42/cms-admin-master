import { Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import React from 'react';

interface Props {
  isWinnerAutoSelected: boolean;
  onAutoSelectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  winnerSelectionTime: number;
  onWinnerSelectionChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMessage: string;
}

export const WinnerSelectionRule = ({
  isWinnerAutoSelected,
  onAutoSelectionChange,
  winnerSelectionTime,
  onWinnerSelectionChange,
  errorMessage,
}: Props) => (
  <Box sx={sxStyles.winnerSelectionWrapper}>
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
      贏家選擇規則
    </Typography>
    <Box sx={{ display: 'grid', gap: '24px' }}>
      <FormControlLabel
        label={
          <Box>
            <Typography>自動選擇贏家</Typography>
            <Typography variant="caption" color="text.secondary">
              當Pool達到P分上限時自動選擇贏家
            </Typography>
          </Box>
        }
        control={
          <Checkbox
            checked={isWinnerAutoSelected}
            onChange={onAutoSelectionChange}
            name="autoSelectWinner"
          />
        }
      />
      <TextField
        name="winnerSelectionTime"
        label="贏家挑選時間（分鐘）"
        type="number"
        value={winnerSelectionTime}
        onChange={onWinnerSelectionChange}
        fullWidth
        disabled={!isWinnerAutoSelected}
        error={!!errorMessage}
        helperText={errorMessage || '非自動選擇時，達到P分上限後等待選擇贏家的時間'}
      />
    </Box>
  </Box>
);

const sxStyles = {
  winnerSelectionWrapper: {
    border: '1px solid #e0e0e0',
    borderRadius: 2,
    p: 3,
    bgcolor: 'background.paper',
  },
};
