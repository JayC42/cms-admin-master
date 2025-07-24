import { Grid, Paper, Typography } from '@mui/material';
import { keyToLabel } from '../../../utils/KeyLabelPair.ts';
import { RewardCategoryListMap } from '../../consts.ts';
import React from 'react';

type Props = {
  poolId: string;
  giftType: string;
};

export const PrizeInfoSection: React.FC<Props> = ({ poolId, giftType }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        獎品資料
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            遊戲ID
          </Typography>
          <Typography variant="body1">{poolId}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            獎品類型
          </Typography>
          <Typography variant="body1">{keyToLabel(RewardCategoryListMap, giftType)}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
